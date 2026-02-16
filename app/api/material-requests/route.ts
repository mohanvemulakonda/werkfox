import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// GET /api/material-requests - List all material requests with optional filters
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    const where: any = {};

    if (status) {
      where.status = status;
    }

    const requests = await prisma.material_requests.findMany({
      where,
      include: {
        productionOrder: { select: { prodNumber: true } },
        items: { select: { id: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching material requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch material requests' },
      { status: 500 }
    );
  }
}

// POST /api/material-requests - Create a new material request
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    // Validate required fields
    if (!type || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'type and at least one item are required' },
        { status: 400 }
      );
    }

    // Auto-generate MR number
    const mrNumber = await generateDocumentNumber('MR');

    // Build items data
    const itemsData = items.map((item: any) => ({
      productId: item.productId,
      productName: item.productName,
      requestedQuantity: item.requestedQuantity,
    }));

    const materialRequest = await prisma.material_requests.create({
      data: {
        mrNumber,
        type,
        productionOrderId: productionOrderId ? parseInt(productionOrderId) : null,
        department: department || null,
        requiredDate: requiredDate ? new Date(requiredDate) : null,
        priority: priority || 'MEDIUM',
        status: 'DRAFT',
        notes: notes || null,
        requestedBy: session.user.name || null,
        items: {
          create: itemsData,
        },
      },
      include: {
        productionOrder: { select: { prodNumber: true } },
        items: true,
      },
    });

    return NextResponse.json(materialRequest, { status: 201 });
  } catch (error: any) {
    console.error('Error creating material request:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A material request with this number already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create material request' },
      { status: 500 }
    );
  }
}
