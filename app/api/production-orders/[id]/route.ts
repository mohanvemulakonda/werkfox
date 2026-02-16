import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// Valid status transitions for PATCH
const validTransitions: Record<string, string[]> = {
  PLANNED: ['MATERIAL_REQUESTED', 'IN_PROGRESS'],
  MATERIAL_REQUESTED: ['IN_PROGRESS'],
  IN_PROGRESS: ['QC', 'COMPLETED'],
  QC: ['COMPLETED', 'IN_PROGRESS'],
};

// GET /api/production-orders/[id] - Get single production order with all relations
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const prodId = parseInt(id);

    if (isNaN(prodId)) {
      return NextResponse.json({ error: 'Invalid production order ID' }, { status: 400 });
    }

    const productionOrder = await prisma.production_orders.findUnique({
      where: { id: prodId },
      include: {
        product: { select: { id: true, name: true, sku: true } },
        items: {
          include: {
            product: { select: { name: true, sku: true } },
          },
        },
        materialRequests: {
          select: { id: true, mrNumber: true, status: true, type: true, createdAt: true },
        },
      },
    });

    if (!productionOrder) {
      return NextResponse.json({ error: 'Production order not found' }, { status: 404 });
    }

    return NextResponse.json(productionOrder);
  } catch (error) {
    console.error('Error fetching production order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch production order' },
      { status: 500 }
    );
  }
}

// PUT /api/production-orders/[id] - Full update (only if PLANNED)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const prodId = parseInt(id);

    if (isNaN(prodId)) {
      return NextResponse.json({ error: 'Invalid production order ID' }, { status: 400 });
    }

    // Check if production order exists and is in PLANNED status
    const existing = await prisma.production_orders.findUnique({
      where: { id: prodId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Production order not found' }, { status: 404 });
    }

    if (existing.status !== 'PLANNED') {
      return NextResponse.json(
        { error: 'Only PLANNED production orders can be edited' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      productId,
      productName,
      plannedQuantity,
      salesOrderId,
      priority,
      plannedStartDate,
      plannedEndDate,
      notes,
      items,
    } = body;

    if (!productId || !productName || !plannedQuantity) {
      return NextResponse.json(
        { error: 'productId, productName, and plannedQuantity are required' },
        { status: 400 }
      );
    }

    // Build items data
    const itemsData = items && items.length > 0
      ? items.map((item: any) => ({
          productId: item.productId,
          productName: item.productName,
          requiredQuantity: item.requiredQuantity,
          unitCost: item.unitCost || 0,
        }))
      : [];

    // Delete existing items and recreate within a transaction
    const updated = await prisma.$transaction(async (tx) => {
      // Delete existing items
      await tx.production_order_items.deleteMany({
        where: { productionOrderId: prodId },
      });

      // Update production order and create new items
      return tx.production_orders.update({
        where: { id: prodId },
        data: {
          productId: parseInt(productId),
          productName,
          plannedQuantity: parseInt(plannedQuantity),
          salesOrderId: salesOrderId ? parseInt(salesOrderId) : null,
          priority: priority || 'MEDIUM',
          plannedStartDate: plannedStartDate ? new Date(plannedStartDate) : null,
          plannedEndDate: plannedEndDate ? new Date(plannedEndDate) : null,
          notes: notes || null,
          items: itemsData.length > 0
            ? { create: itemsData }
            : undefined,
        },
        include: {
          product: { select: { name: true, sku: true } },
          items: true,
        },
      });
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating production order:', error);
    return NextResponse.json(
      { error: 'Failed to update production order' },
      { status: 500 }
    );
  }
}

// PATCH /api/production-orders/[id] - Status transition only
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const prodId = parseInt(id);

    if (isNaN(prodId)) {
      return NextResponse.json({ error: 'Invalid production order ID' }, { status: 400 });
    }

    const body = await request.json();
    const { status, completedQuantity, rejectedQuantity } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Fetch current production order
    const existing = await prisma.production_orders.findUnique({
      where: { id: prodId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Production order not found' }, { status: 404 });
    }

    // Validate status transition
    const allowedStatuses = validTransitions[existing.status];
    if (!allowedStatuses || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status transition from ${existing.status} to ${status}. Allowed transitions: ${allowedStatuses?.join(', ') || 'none'}`,
        },
        { status: 400 }
      );
    }

    // Build update data
    const updateData: any = { status };

    // Set actualStartDate when transitioning to IN_PROGRESS
    if (status === 'IN_PROGRESS' && !existing.actualStartDate) {
      updateData.actualStartDate = new Date();
    }

    // Set actualEndDate when transitioning to COMPLETED
    if (status === 'COMPLETED') {
      updateData.actualEndDate = new Date();
      if (completedQuantity !== undefined) {
        updateData.completedQuantity = parseInt(completedQuantity);
      }
      if (rejectedQuantity !== undefined) {
        updateData.rejectedQuantity = parseInt(rejectedQuantity);
      }
    }

    const updated = await prisma.production_orders.update({
      where: { id: prodId },
      data: updateData,
      include: {
        product: { select: { name: true, sku: true } },
        items: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating production order status:', error);
    return NextResponse.json(
      { error: 'Failed to update production order status' },
      { status: 500 }
    );
  }
}
