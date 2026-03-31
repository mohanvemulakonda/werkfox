import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// Valid status transitions for PATCH
const validTransitions: Record<string, string[]> = {
  DRAFT: ['SENT', 'CANCELLED'],
  SENT: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PARTIAL_RECEIVED', 'RECEIVED', 'CANCELLED'],
  PARTIAL_RECEIVED: ['RECEIVED'],
};

// GET /api/purchase-orders/[id] - Get single purchase order with all relations
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
    const poId = parseInt(id);

    if (isNaN(poId)) {
      return NextResponse.json({ error: 'Invalid purchase order ID' }, { status: 400 });
    }

    const purchaseOrder = await prisma.purchase_orders.findFirst({
      where: { id: poId, organizationId: session.currentOrg.id },
      include: {
        vendor: true,
        location: { select: { id: true, name: true, code: true } },
        items: {
          include: {
            product: { select: { name: true, sku: true } },
          },
        },
        goodsReceiptNotes: {
          select: { id: true, grnNumber: true, status: true, receivedDate: true },
        },
      },
    });

    if (!purchaseOrder) {
      return NextResponse.json({ error: 'Purchase order not found' }, { status: 404 });
    }

    return NextResponse.json(purchaseOrder);
  } catch (error) {
    console.error('Error fetching purchase order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch purchase order' },
      { status: 500 }
    );
  }
}

// PUT /api/purchase-orders/[id] - Update purchase order (only if DRAFT)
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
    const poId = parseInt(id);

    if (isNaN(poId)) {
      return NextResponse.json({ error: 'Invalid purchase order ID' }, { status: 400 });
    }

    // Check if PO exists, belongs to org, and is in DRAFT status
    const existingPO = await prisma.purchase_orders.findFirst({
      where: { id: poId, organizationId: session.currentOrg.id },
    });

    if (!existingPO) {
      return NextResponse.json({ error: 'Purchase order not found' }, { status: 404 });
    }

    if (existingPO.status !== 'DRAFT') {
      return NextResponse.json(
        { error: 'Only DRAFT purchase orders can be edited' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      vendorId,
      locationId,
      vendorName,
      vendorEmail,
      vendorGst,
      vendorState,
      currency,
      expectedDate,
      paymentTerms,
      notes,
      internalNotes,
      shippingCost,
      discount,
      items,
    } = body;

    if (!vendorId || !locationId || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'vendorId, locationId, and at least one item are required' },
        { status: 400 }
      );
    }

    // Calculate totals from items
    const itemsData = items.map((item: any) => {
      const totalCost = item.orderedQuantity * item.unitCost;
      return {
        productId: item.productId,
        productName: item.productName,
        productSku: item.productSku,
        orderedQuantity: item.orderedQuantity,
        receivedQuantity: 0,
        unitCost: item.unitCost,
        taxRate: item.taxRate || 0,
        totalCost,
      };
    });

    const subtotal = itemsData.reduce(
      (sum: number, item: any) => sum + Number(item.totalCost),
      0
    );
    const taxAmount = itemsData.reduce(
      (sum: number, item: any) =>
        sum + Number(item.totalCost) * (Number(item.taxRate) / 100),
      0
    );
    const shippingCostVal = parseFloat(shippingCost) || 0;
    const discountVal = parseFloat(discount) || 0;
    const total = subtotal + taxAmount + shippingCostVal - discountVal;

    // Delete existing items and recreate within a transaction
    const updatedPO = await prisma.$transaction(async (tx) => {
      // Delete existing items
      await tx.purchase_order_items.deleteMany({
        where: { purchaseOrderId: poId },
      });

      // Update PO and create new items
      return tx.purchase_orders.update({
        where: { id: poId },
        data: {
          vendorId: parseInt(vendorId),
          locationId: parseInt(locationId),
          vendorName,
          vendorEmail: vendorEmail || null,
          vendorGst: vendorGst || null,
          vendorState: vendorState || null,
          subtotal,
          taxAmount,
          shippingCost: shippingCostVal,
          discount: discountVal,
          total,
          currency: currency || 'INR',
          expectedDate: expectedDate ? new Date(expectedDate) : null,
          paymentTerms: paymentTerms || null,
          notes: notes || null,
          internalNotes: internalNotes || null,
          items: {
            create: itemsData,
          },
        },
        include: {
          vendor: { select: { name: true, code: true } },
          items: true,
        },
      });
    });

    return NextResponse.json(updatedPO);
  } catch (error) {
    console.error('Error updating purchase order:', error);
    return NextResponse.json(
      { error: 'Failed to update purchase order' },
      { status: 500 }
    );
  }
}

// PATCH /api/purchase-orders/[id] - Status transition only
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
    const poId = parseInt(id);

    if (isNaN(poId)) {
      return NextResponse.json({ error: 'Invalid purchase order ID' }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Fetch current PO (verify org ownership)
    const existingPO = await prisma.purchase_orders.findFirst({
      where: { id: poId, organizationId: session.currentOrg.id },
    });

    if (!existingPO) {
      return NextResponse.json({ error: 'Purchase order not found' }, { status: 404 });
    }

    // Validate status transition
    const allowedStatuses = validTransitions[existingPO.status];
    if (!allowedStatuses || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status transition from ${existingPO.status} to ${status}. Allowed transitions: ${allowedStatuses?.join(', ') || 'none'}`,
        },
        { status: 400 }
      );
    }

    // Build update data
    const updateData: any = { status };

    // Set receivedDate when status changes to RECEIVED
    if (status === 'RECEIVED') {
      updateData.receivedDate = new Date();
    }

    const updatedPO = await prisma.purchase_orders.update({
      where: { id: poId },
      data: updateData,
      include: {
        vendor: { select: { name: true, code: true } },
        items: true,
      },
    });

    return NextResponse.json(updatedPO);
  } catch (error) {
    console.error('Error updating purchase order status:', error);
    return NextResponse.json(
      { error: 'Failed to update purchase order status' },
      { status: 500 }
    );
  }
}
