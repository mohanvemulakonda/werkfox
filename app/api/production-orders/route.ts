import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// GET /api/production-orders - List all production orders with optional filters
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

    const where: any = { organizationId: session.currentOrg.id };

    if (status) {
      where.status = status;
    }

    const orders = await prisma.production_orders.findMany({
      where,
      include: {
        product: { select: { name: true, sku: true } },
        items: { select: { id: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching production orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch production orders' },
      { status: 500 }
    );
  }
}

// POST /api/production-orders - Create a new production order with BOM items
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

    // Validate required fields
    if (!productId || !productName || !plannedQuantity) {
      return NextResponse.json(
        { error: 'productId, productName, and plannedQuantity are required' },
        { status: 400 }
      );
    }

    // Auto-generate production order number
    const prodNumber = await generateDocumentNumber('PROD');

    // Build items data
    const itemsData = items && items.length > 0
      ? items.map((item: any) => ({
          productId: item.productId,
          productName: item.productName,
          requiredQuantity: item.requiredQuantity,
          unitCost: item.unitCost || 0,
        }))
      : [];

    const productionOrder = await prisma.production_orders.create({
      data: {
        organizationId: session.currentOrg.id,
        prodNumber,
        productId: parseInt(productId),
        productName,
        plannedQuantity: parseInt(plannedQuantity),
        completedQuantity: 0,
        rejectedQuantity: 0,
        salesOrderId: salesOrderId ? parseInt(salesOrderId) : null,
        priority: priority || 'MEDIUM',
        status: 'PLANNED',
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

    return NextResponse.json(productionOrder, { status: 201 });
  } catch (error: any) {
    console.error('Error creating production order:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A production order with this number already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create production order' },
      { status: 500 }
    );
  }
}
