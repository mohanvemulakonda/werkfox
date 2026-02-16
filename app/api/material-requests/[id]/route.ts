import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// Valid status transitions for PATCH
const validTransitions: Record<string, string[]> = {
  DRAFT: ['SUBMITTED'],
  SUBMITTED: ['APPROVED', 'DRAFT'],
  APPROVED: ['PO_CREATED', 'FULFILLED'],
  PO_CREATED: ['FULFILLED'],
};

// GET /api/material-requests/[id] - Get single material request with all relations
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
    const mrId = parseInt(id);

    if (isNaN(mrId)) {
      return NextResponse.json({ error: 'Invalid material request ID' }, { status: 400 });
    }

    const materialRequest = await prisma.material_requests.findUnique({
      where: { id: mrId },
      include: {
        productionOrder: {
          select: { id: true, prodNumber: true, productName: true, status: true },
        },
        items: {
          include: {
            product: { select: { name: true, sku: true } },
          },
        },
      },
    });

    if (!materialRequest) {
      return NextResponse.json({ error: 'Material request not found' }, { status: 404 });
    }

    return NextResponse.json(materialRequest);
  } catch (error) {
    console.error('Error fetching material request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch material request' },
      { status: 500 }
    );
  }
}

// PUT /api/material-requests/[id] - Full update (only if DRAFT)
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
    const mrId = parseInt(id);

    if (isNaN(mrId)) {
      return NextResponse.json({ error: 'Invalid material request ID' }, { status: 400 });
    }

    // Check if MR exists and is in DRAFT status
    const existing = await prisma.material_requests.findUnique({
      where: { id: mrId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Material request not found' }, { status: 404 });
    }

    if (existing.status !== 'DRAFT') {
      return NextResponse.json(
        { error: 'Only DRAFT material requests can be edited' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      type,
      productionOrderId,
      department,
      requiredDate,
      priority,
      notes,
      items,
    } = body;

    if (!type || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'type and at least one item are required' },
        { status: 400 }
      );
    }

    // Build items data
    const itemsData = items.map((item: any) => ({
      productId: item.productId,
      productName: item.productName,
      requestedQuantity: item.requestedQuantity,
    }));

    // Delete existing items and recreate within a transaction
    const updated = await prisma.$transaction(async (tx) => {
      // Delete existing items
      await tx.material_request_items.deleteMany({
        where: { materialRequestId: mrId },
      });

      // Update MR and create new items
      return tx.material_requests.update({
        where: { id: mrId },
        data: {
          type,
          productionOrderId: productionOrderId ? parseInt(productionOrderId) : null,
          department: department || null,
          requiredDate: requiredDate ? new Date(requiredDate) : null,
          priority: priority || 'MEDIUM',
          notes: notes || null,
          items: {
            create: itemsData,
          },
        },
        include: {
          productionOrder: { select: { prodNumber: true } },
          items: true,
        },
      });
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating material request:', error);
    return NextResponse.json(
      { error: 'Failed to update material request' },
      { status: 500 }
    );
  }
}

// PATCH /api/material-requests/[id] - Status transition
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
    const mrId = parseInt(id);

    if (isNaN(mrId)) {
      return NextResponse.json({ error: 'Invalid material request ID' }, { status: 400 });
    }

    const body = await request.json();
    const { status, items: itemUpdates } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Fetch current MR
    const existing = await prisma.material_requests.findUnique({
      where: { id: mrId },
      include: { items: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Material request not found' }, { status: 404 });
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

    // When APPROVED, set approvedBy and approvedAt
    if (status === 'APPROVED') {
      updateData.approvedBy = session.user.name || 'System';
      updateData.approvedAt = new Date();
    }

    const updated = await prisma.$transaction(async (tx) => {
      // If approving and item updates include approvedQuantity, update each item
      if (status === 'APPROVED' && itemUpdates && Array.isArray(itemUpdates)) {
        for (const itemUpdate of itemUpdates) {
          if (itemUpdate.id && itemUpdate.approvedQuantity !== undefined) {
            await tx.material_request_items.update({
              where: { id: itemUpdate.id },
              data: { approvedQuantity: itemUpdate.approvedQuantity },
            });
          }
        }
      }

      return tx.material_requests.update({
        where: { id: mrId },
        data: updateData,
        include: {
          productionOrder: { select: { prodNumber: true } },
          items: true,
        },
      });
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating material request status:', error);
    return NextResponse.json(
      { error: 'Failed to update material request status' },
      { status: 500 }
    );
  }
}
