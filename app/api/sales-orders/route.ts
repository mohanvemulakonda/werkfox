import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// GET /api/sales-orders - List all sales orders with optional filters
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 400 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const customerId = searchParams.get('customerId');

    const where: any = { organizationId: session.currentOrg.id };

    if (status) {
      where.status = status;
    }

    if (customerId) {
      where.customerId = parseInt(customerId);
    }

    const orders = await prisma.sales_orders.findMany({
      where,
      include: {
        customer: { select: { name: true, customerCode: true } },
        items: { select: { id: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching sales orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales orders' },
      { status: 500 }
    );
  }
}

// POST /api/sales-orders - Create a new sales order with items
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 400 });
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

    // Validate required fields
    if (!customerId || !customerName || !customerState || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'customerId, customerName, customerState, and at least one item are required' },
        { status: 400 }
      );
    }

    // Auto-generate SO number
    const soNumber = await generateDocumentNumber('SO');

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

    const salesOrder = await prisma.sales_orders.create({
      data: {
        organizationId: session.currentOrg.id,
        soNumber,
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
        status: 'PENDING',
        paymentStatus: 'UNPAID',
        orderDate: new Date(),
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

    return NextResponse.json(salesOrder, { status: 201 });
  } catch (error: any) {
    console.error('Error creating sales order:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A sales order with this number already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create sales order' },
      { status: 500 }
    );
  }
}
