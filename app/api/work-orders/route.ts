import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// GET /api/work-orders - List all work orders with optional filters
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
    const type = searchParams.get('type');

    const where: any = { organizationId: session.currentOrg.id };

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    const workOrders = await prisma.work_orders.findMany({
      where,
      include: {
        customer: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(workOrders);
  } catch (error) {
    console.error('Error fetching work orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch work orders' },
      { status: 500 }
    );
  }
}

// POST /api/work-orders - Create a new work order with items
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

    // Validate required fields
    if (!customerId || !title || !type) {
      return NextResponse.json(
        { error: 'customerId, title, and type are required' },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = ['SERVICE', 'REPAIR', 'INSTALLATION', 'MAINTENANCE'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Auto-generate WO number
    const woNumber = await generateDocumentNumber('WO');

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

    const workOrder = await prisma.work_orders.create({
      data: {
        organizationId: session.currentOrg.id,
        woNumber,
        type,
        customerId: parseInt(customerId),
        salesOrderId: salesOrderId ? parseInt(salesOrderId) : null,
        title,
        description: description || null,
        priority: priority || 'MEDIUM',
        status: 'PENDING',
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

    return NextResponse.json(workOrder, { status: 201 });
  } catch (error: any) {
    console.error('Error creating work order:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A work order with this number already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create work order' },
      { status: 500 }
    );
  }
}
