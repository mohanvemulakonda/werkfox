import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// POST /api/sales-orders/[id]/create-dispatch - Create dispatch from sales order
export async function POST(
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

    // Fetch sales order with items and customer
    const salesOrder = await prisma.sales_orders.findUnique({
      where: { id: soId },
      include: {
        items: {
          include: {
            product: { select: { name: true, sku: true } },
          },
        },
        customer: true,
      },
    });

    if (!salesOrder) {
      return NextResponse.json({ error: 'Sales order not found' }, { status: 404 });
    }

    // Verify status is CONFIRMED or IN_PROGRESS
    if (!['CONFIRMED', 'IN_PROGRESS'].includes(salesOrder.status)) {
      return NextResponse.json(
        { error: `Only CONFIRMED or IN_PROGRESS sales orders can create dispatch orders. Current status: ${salesOrder.status}` },
        { status: 400 }
      );
    }

    // Generate dispatch number
    const dispatchNumber = await generateDocumentNumber('DC');

    // Pre-fill shipping from customer/SO data
    const dispatchOrder = await prisma.dispatch_orders.create({
      data: {
        dispatchNumber,
        salesOrderId: soId,
        customerId: salesOrder.customerId,
        status: 'PENDING',
        shippingAddress: salesOrder.shippingAddress || salesOrder.customer.shippingAddress || salesOrder.customer.address || null,
        shippingCity: salesOrder.customer.city || null,
        shippingState: salesOrder.customerState || salesOrder.customer.state || null,
        shippingPincode: salesOrder.customer.pincode || null,
        shippingCountry: salesOrder.customer.country || 'India',
        contactName: salesOrder.customer.contactPerson || null,
        contactPhone: salesOrder.customer.contactPhone || salesOrder.customer.phone || null,
        items: {
          create: salesOrder.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            orderedQuantity: item.quantity,
            dispatchedQuantity: item.quantity,
          })),
        },
      },
      include: {
        salesOrder: { select: { soNumber: true } },
        customer: { select: { name: true } },
        items: true,
      },
    });

    return NextResponse.json(dispatchOrder, { status: 201 });
  } catch (error: any) {
    console.error('Error creating dispatch from sales order:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A dispatch order with this number already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create dispatch order from sales order' },
      { status: 500 }
    );
  }
}
