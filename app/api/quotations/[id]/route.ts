import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// Valid status transitions
const validTransitions: Record<string, string[]> = {
  DRAFT: ['SENT', 'CANCELLED'],
  SENT: ['VIEWED', 'ACCEPTED', 'REJECTED', 'EXPIRED'],
  VIEWED: ['ACCEPTED', 'REJECTED', 'EXPIRED'],
  ACCEPTED: ['CONVERTED'],
};

// GET /api/quotations/[id] - Get single quotation
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
    const quotationId = parseInt(id);

    if (isNaN(quotationId)) {
      return NextResponse.json(
        { error: 'Invalid quotation ID' },
        { status: 400 }
      );
    }

    const quotation = await prisma.quotations.findUnique({
      where: { id: quotationId },
      include: {
        customer: true,
        items: {
          include: {
            product: {
              select: {
                name: true,
                sku: true,
              },
            },
          },
        },
      },
    });

    if (!quotation) {
      return NextResponse.json(
        { error: 'Quotation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(quotation);
  } catch (error) {
    console.error('Error fetching quotation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotation' },
      { status: 500 }
    );
  }
}

// PUT /api/quotations/[id] - Update quotation (only if DRAFT)
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
    const quotationId = parseInt(id);

    if (isNaN(quotationId)) {
      return NextResponse.json(
        { error: 'Invalid quotation ID' },
        { status: 400 }
      );
    }

    // Check if quotation exists and is in DRAFT status
    const existing = await prisma.quotations.findUnique({
      where: { id: quotationId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Quotation not found' },
        { status: 404 }
      );
    }

    if (existing.status !== 'DRAFT') {
      return NextResponse.json(
        { error: 'Only DRAFT quotations can be edited' },
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
      validUntil,
      currency,
      discount: headerDiscount,
      terms,
      notes,
      items,
    } = body;

    // Delete existing items
    await prisma.quotation_items.deleteMany({
      where: { quotationId },
    });

    // Calculate item totals
    const processedItems = (items || []).map((item: any) => {
      const quantity = parseFloat(item.quantity) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      const itemDiscount = parseFloat(item.discount) || 0;
      const total = (quantity * unitPrice) - itemDiscount;

      return {
        productId: parseInt(item.productId),
        productName: item.productName,
        productSku: item.productSku || '',
        description: item.description || null,
        quantity: Math.round(quantity),
        unitPrice,
        taxRate: parseFloat(item.taxRate) || 0,
        discount: itemDiscount,
        total,
      };
    });

    // Recalculate totals
    const subtotal = processedItems.reduce((sum: number, item: any) => sum + item.total, 0);
    const taxAmount = processedItems.reduce((sum: number, item: any) => {
      return sum + (item.total * item.taxRate) / 100;
    }, 0);
    const discount = parseFloat(headerDiscount) || 0;
    const total = subtotal + taxAmount - discount;

    const quotation = await prisma.quotations.update({
      where: { id: quotationId },
      data: {
        ...(customerId !== undefined && { customerId: parseInt(customerId) }),
        ...(customerName !== undefined && { customerName }),
        ...(customerEmail !== undefined && { customerEmail }),
        ...(customerGst !== undefined && { customerGst }),
        ...(customerState !== undefined && { customerState }),
        ...(validUntil !== undefined && { validUntil: new Date(validUntil) }),
        ...(currency !== undefined && { currency }),
        ...(terms !== undefined && { terms }),
        ...(notes !== undefined && { notes }),
        subtotal,
        taxAmount,
        discount,
        total,
        items: {
          create: processedItems,
        },
      },
      include: {
        customer: true,
        items: {
          include: {
            product: {
              select: {
                name: true,
                sku: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(quotation);
  } catch (error: any) {
    console.error('Error updating quotation:', error);
    return NextResponse.json(
      { error: 'Failed to update quotation' },
      { status: 500 }
    );
  }
}

// PATCH /api/quotations/[id] - Status transitions
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
    const quotationId = parseInt(id);

    if (isNaN(quotationId)) {
      return NextResponse.json(
        { error: 'Invalid quotation ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status: newStatus } = body;

    if (!newStatus) {
      return NextResponse.json(
        { error: 'status is required' },
        { status: 400 }
      );
    }

    // Get current quotation
    const existing = await prisma.quotations.findUnique({
      where: { id: quotationId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Quotation not found' },
        { status: 404 }
      );
    }

    // Validate the status transition
    const allowedTransitions = validTransitions[existing.status];
    if (!allowedTransitions || !allowedTransitions.includes(newStatus)) {
      return NextResponse.json(
        {
          error: `Invalid status transition from ${existing.status} to ${newStatus}. Allowed transitions: ${(allowedTransitions || []).join(', ') || 'none'}`,
        },
        { status: 400 }
      );
    }

    const quotation = await prisma.quotations.update({
      where: { id: quotationId },
      data: {
        status: newStatus,
      },
      include: {
        customer: true,
        items: true,
      },
    });

    return NextResponse.json(quotation);
  } catch (error) {
    console.error('Error updating quotation status:', error);
    return NextResponse.json(
      { error: 'Failed to update quotation status' },
      { status: 500 }
    );
  }
}
