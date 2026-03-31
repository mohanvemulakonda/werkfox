import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// Valid status transitions for PATCH
const validTransitions: Record<string, string[]> = {
  PENDING: ['ASSIGNED', 'CANCELLED'],
  ASSIGNED: ['IN_PROGRESS', 'ON_HOLD'],
  IN_PROGRESS: ['COMPLETED', 'ON_HOLD'],
  ON_HOLD: ['IN_PROGRESS'],
  COMPLETED: ['INVOICED'],
};

// GET /api/work-orders/[id] - Get single work order with all relations
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 400 });
    }

    const { id } = await params;
    const woId = parseInt(id);

    if (isNaN(woId)) {
      return NextResponse.json({ error: 'Invalid work order ID' }, { status: 400 });
    }

    const workOrder = await prisma.work_orders.findFirst({
      where: { id: woId, organizationId: session.currentOrg.id },
      include: {
        customer: true,
        items: {
          include: {
            product: { select: { name: true, sku: true } },
          },
        },
      },
    });

    if (!workOrder) {
      return NextResponse.json({ error: 'Work order not found' }, { status: 404 });
    }

    return NextResponse.json(workOrder);
  } catch (error) {
    console.error('Error fetching work order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch work order' },
      { status: 500 }
    );
  }
}

// PUT /api/work-orders/[id] - Full update of work order (only if PENDING)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 400 });
    }

    const { id } = await params;
    const woId = parseInt(id);

    if (isNaN(woId)) {
      return NextResponse.json({ error: 'Invalid work order ID' }, { status: 400 });
    }

    // Check if WO exists, belongs to org, and is in PENDING status
    const existingWO = await prisma.work_orders.findFirst({
      where: { id: woId, organizationId: session.currentOrg.id },
    });

    if (!existingWO) {
      return NextResponse.json({ error: 'Work order not found' }, { status: 404 });
    }

    if (existingWO.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Only PENDING work orders can be edited' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      customerId,
      salesOrderId,
      title,
      type,
      description,
      priority,
      assignedTo,
      scheduledDate,
      estimatedHours,
      notes,
      items,
    } = body;

    if (!customerId || !title || !type) {
      return NextResponse.json(
        { error: 'customerId, title, and type are required' },
        { status: 400 }
      );
    }

    // Calculate costs from items
    const itemsData = (items || []).map((item: any) => {
      const total = Number(item.quantity) * Number(item.unitPrice);
      return {
        type: item.type || 'MATERIAL',
        productId: item.productId ? parseInt(item.productId) : null,
        description: item.description || '',
        quantity: Number(item.quantity) || 1,
        unitPrice: Number(item.unitPrice) || 0,
        total,
      };
    });

    const laborCost = itemsData
      .filter((item: any) => item.type === 'LABOR')
      .reduce((sum: number, item: any) => sum + item.total, 0);

    const materialCost = itemsData
      .filter((item: any) => item.type === 'MATERIAL')
      .reduce((sum: number, item: any) => sum + item.total, 0);

    const expenseCost = itemsData
      .filter((item: any) => item.type === 'EXPENSE')
      .reduce((sum: number, item: any) => sum + item.total, 0);

    const totalCost = laborCost + materialCost + expenseCost;

    // Delete existing items and recreate within a transaction
    const updatedWO = await prisma.$transaction(async (tx) => {
      // Delete existing items
      await tx.work_order_items.deleteMany({
        where: { workOrderId: woId },
      });

      // Update WO and create new items
      return tx.work_orders.update({
        where: { id: woId },
        data: {
          customerId: parseInt(customerId),
          salesOrderId: salesOrderId ? parseInt(salesOrderId) : null,
          title,
          type,
          description: description || null,
          priority: priority || 'MEDIUM',
          assignedTo: assignedTo || null,
          scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
          estimatedHours: estimatedHours ? Number(estimatedHours) : null,
          laborCost,
          materialCost,
          totalCost,
          notes: notes || null,
          items: {
            create: itemsData,
          },
        },
        include: {
          customer: { select: { name: true } },
          items: true,
        },
      });
    });

    return NextResponse.json(updatedWO);
  } catch (error) {
    console.error('Error updating work order:', error);
    return NextResponse.json(
      { error: 'Failed to update work order' },
      { status: 500 }
    );
  }
}

// PATCH /api/work-orders/[id] - Status transition only
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 400 });
    }

    const { id } = await params;
    const woId = parseInt(id);

    if (isNaN(woId)) {
      return NextResponse.json({ error: 'Invalid work order ID' }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Fetch current WO (verify org ownership)
    const existingWO = await prisma.work_orders.findFirst({
      where: { id: woId, organizationId: session.currentOrg.id },
    });

    if (!existingWO) {
      return NextResponse.json({ error: 'Work order not found' }, { status: 404 });
    }

    // Validate status transition
    const allowedStatuses = validTransitions[existingWO.status];
    if (!allowedStatuses || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status transition from ${existingWO.status} to ${status}. Allowed transitions: ${allowedStatuses?.join(', ') || 'none'}`,
        },
        { status: 400 }
      );
    }

    // Build update data
    const updateData: any = { status };

    // When completing, set completedDate
    if (status === 'COMPLETED') {
      updateData.completedDate = new Date();
    }

    const updatedWO = await prisma.work_orders.update({
      where: { id: woId },
      data: updateData,
      include: {
        customer: { select: { name: true } },
        items: true,
      },
    });

    return NextResponse.json(updatedWO);
  } catch (error) {
    console.error('Error updating work order status:', error);
    return NextResponse.json(
      { error: 'Failed to update work order status' },
      { status: 500 }
    );
  }
}

// DELETE /api/work-orders/[id] - Delete work order (only if PENDING)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 400 });
    }

    const { id } = await params;
    const woId = parseInt(id);

    if (isNaN(woId)) {
      return NextResponse.json({ error: 'Invalid work order ID' }, { status: 400 });
    }

    const existingWO = await prisma.work_orders.findFirst({
      where: { id: woId, organizationId: session.currentOrg.id },
    });

    if (!existingWO) {
      return NextResponse.json({ error: 'Work order not found' }, { status: 404 });
    }

    if (existingWO.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Only PENDING work orders can be deleted' },
        { status: 400 }
      );
    }

    // Delete work order (cascades to items due to onDelete: Cascade)
    await prisma.work_orders.delete({
      where: { id: woId },
    });

    return NextResponse.json({
      message: 'Work order deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting work order:', error);
    return NextResponse.json(
      { error: 'Failed to delete work order' },
      { status: 500 }
    );
  }
}
