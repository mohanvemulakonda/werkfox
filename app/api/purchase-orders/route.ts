import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// GET /api/purchase-orders - List all purchase orders with optional filters
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
    const vendorId = searchParams.get('vendorId');

    const where: any = { organizationId: session.currentOrg.id };

    if (status) {
      where.status = status;
    }

    if (vendorId) {
      where.vendorId = parseInt(vendorId);
    }

    const orders = await prisma.purchase_orders.findMany({
      where,
      include: {
        vendor: { select: { name: true, code: true } },
        items: { select: { id: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch purchase orders' },
      { status: 500 }
    );
  }
}

// POST /api/purchase-orders - Create a new purchase order with items
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

    // Validate required fields
    if (!vendorId || !locationId || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'vendorId, locationId, and at least one item are required' },
        { status: 400 }
      );
    }

    // Auto-generate PO number
    const poNumber = await generateDocumentNumber('PO');

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

    const purchaseOrder = await prisma.purchase_orders.create({
      data: {
        organizationId: session.currentOrg.id,
        poNumber,
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
        status: 'DRAFT',
        paymentStatus: 'UNPAID',
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

    return NextResponse.json(purchaseOrder, { status: 201 });
  } catch (error: any) {
    console.error('Error creating purchase order:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A purchase order with this number already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create purchase order' },
      { status: 500 }
    );
  }
}
