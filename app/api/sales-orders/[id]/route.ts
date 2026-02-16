import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// Valid status transitions for PATCH
const validTransitions: Record<string, string[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED', 'ON_HOLD'],
  CONFIRMED: ['IN_PROGRESS', 'CANCELLED', 'ON_HOLD'],
  IN_PROGRESS: ['COMPLETED', 'ON_HOLD'],
  ON_HOLD: ['PENDING', 'CONFIRMED', 'CANCELLED'],
};

// GET /api/sales-orders/[id] - Get single sales order with all relations
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
    const soId = parseInt(id);

    if (isNaN(soId)) {
      return NextResponse.json({ error: 'Invalid sales order ID' }, { status: 400 });
    }

    const salesOrder = await prisma.sales_orders.findUnique({
      where: { id: soId },
      include: {
        customer: true,
        items: {
          include: {
            product: { select: { name: true, sku: true } },
          },
        },
      },
    });

    if (!salesOrder) {
      return NextResponse.json({ error: 'Sales order not found' }, { status: 404 });
    }

    return NextResponse.json(salesOrder);
  } catch (error) {
    console.error('Error fetching sales order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales order' },
      { status: 500 }
    );
  }
}

// PUT /api/sales-orders/[id] - Update sales order (only if PENDING)
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
    const soId = parseInt(id);

    if (isNaN(soId)) {
      return NextResponse.json({ error: 'Invalid sales order ID' }, { status: 400 });
    }

    // Check if SO exists and is in PENDING status
    const existingSO = await prisma.sales_orders.findUnique({
      where: { id: soId },
    });

    if (!existingSO) {
      return NextResponse.json({ error: 'Sales order not found' }, { status: 404 });
    }

    if (existingSO.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Only PENDING sales orders can be edited' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      customerId,
      customerName,
      customerEmail,
      customerGst,
      customerState,
      customerPoNumber,
      currency,
      deliveryDate,
      terms,
      notes,
      items,
    } = body;

    if (!customerId || !customerName || !customerState || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'customerId, customerName, customerState, and at least one item are required' },
        { status: 400 }
      );
    }

    // Calculate totals from items
    const itemsData = items.map((item: any) => {
      const lineTotal = item.quantity * item.unitPrice;
      const discountAmount = Number(item.discount) || 0;
      const total = lineTotal - discountAmount;
      return {
        productId: item.productId,
        productName: item.productName,
        productSku: item.productSku,
        quantity: item.quantity,
        deliveredQty: 0,
        unitPrice: item.unitPrice,
        taxRate: item.taxRate || 0,
        discount: discountAmount,
        total,
      };
    });

    const subtotal = itemsData.reduce(
      (sum: number, item: any) => sum + Number(item.total),
      0
    );
    const taxAmount = itemsData.reduce(
      (sum: number, item: any) =>
        sum + Number(item.total) * (Number(item.taxRate) / 100),
      0
    );
    const discount = itemsData.reduce(
      (sum: number, item: any) => sum + Number(item.discount),
      0
    );
    const total = subtotal + taxAmount;

    // Delete existing items and recreate within a transaction
    const updatedSO = await prisma.$transaction(async (tx) => {
      // Delete existing items
      await tx.sales_order_items.deleteMany({
        where: { salesOrderId: soId },
      });

      // Update SO and create new items
      return tx.sales_orders.update({
        where: { id: soId },
        data: {
          customerId: parseInt(customerId),
          customerName,
          customerEmail: customerEmail || null,
          customerGst: customerGst || null,
          customerState: customerState || null,
          customerPoNumber: customerPoNumber || null,
          subtotal,
          taxAmount,
          discount,
          total,
          currency: currency || 'INR',
          deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
          terms: terms || null,
          notes: notes || null,
          items: {
            create: itemsData,
          },
        },
        include: {
          customer: { select: { name: true, customerCode: true } },
          items: true,
        },
      });
    });

    return NextResponse.json(updatedSO);
  } catch (error) {
    console.error('Error updating sales order:', error);
    return NextResponse.json(
      { error: 'Failed to update sales order' },
      { status: 500 }
    );
  }
}

// PATCH /api/sales-orders/[id] - Status transition only
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
    const soId = parseInt(id);

    if (isNaN(soId)) {
      return NextResponse.json({ error: 'Invalid sales order ID' }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Fetch current SO
    const existingSO = await prisma.sales_orders.findUnique({
      where: { id: soId },
    });

    if (!existingSO) {
      return NextResponse.json({ error: 'Sales order not found' }, { status: 404 });
    }

    // Validate status transition
    const allowedStatuses = validTransitions[existingSO.status];
    if (!allowedStatuses || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status transition from ${existingSO.status} to ${status}. Allowed transitions: ${allowedStatuses?.join(', ') || 'none'}`,
        },
        { status: 400 }
      );
    }

    const updatedSO = await prisma.sales_orders.update({
      where: { id: soId },
      data: { status },
      include: {
        customer: { select: { name: true, customerCode: true } },
        items: true,
      },
    });

    return NextResponse.json(updatedSO);
  } catch (error) {
    console.error('Error updating sales order status:', error);
    return NextResponse.json(
      { error: 'Failed to update sales order status' },
      { status: 500 }
    );
  }
}
