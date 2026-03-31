import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// GET /api/quotations - List all quotations with filtering
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

    const quotations = await prisma.quotations.findMany({
      where,
      include: {
        customer: {
          select: {
            name: true,
            customerCode: true,
          },
        },
        items: {
          select: {
            id: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(quotations);
  } catch (error) {
    console.error('Error fetching quotations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotations' },
      { status: 500 }
    );
  }
}

// POST /api/quotations - Create a new quotation with items
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
      validUntil,
      currency,
      discount: headerDiscount,
      terms,
      notes,
      items,
    } = body;

    // Validate required fields
    if (!customerId || !customerName || !customerState) {
      return NextResponse.json(
        { error: 'customerId, customerName, and customerState are required' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'At least one item is required' },
        { status: 400 }
      );
    }

    // Generate quote number
    const quoteNumber = await generateDocumentNumber('QT');

    // Calculate item totals
    const processedItems = items.map((item: any) => {
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

    // Calculate subtotal, taxAmount, and total
    const subtotal = processedItems.reduce((sum: number, item: any) => sum + item.total, 0);
    const taxAmount = processedItems.reduce((sum: number, item: any) => {
      return sum + (item.total * item.taxRate) / 100;
    }, 0);
    const discount = parseFloat(headerDiscount) || 0;
    const total = subtotal + taxAmount - discount;

    // Default validUntil to 30 days from now if not provided
    const validUntilDate = validUntil
      ? new Date(validUntil)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const quotation = await prisma.quotations.create({
      data: {
        organizationId: session.currentOrg.id,
        quoteNumber,
        customerId: parseInt(customerId),
        customerName,
        customerEmail: customerEmail || null,
        customerGst: customerGst || null,
        customerState: customerState || null,
        quoteDate: new Date(),
        validUntil: validUntilDate,
        subtotal,
        taxAmount,
        discount,
        total,
        currency: currency || 'INR',
        status: 'DRAFT',
        terms: terms || null,
        notes: notes || null,
        createdBy: null,
        items: {
          create: processedItems,
        },
      },
      include: {
        customer: true,
        items: true,
      },
    });

    return NextResponse.json(quotation, { status: 201 });
  } catch (error: any) {
    console.error('Error creating quotation:', error);
    return NextResponse.json(
      { error: 'Failed to create quotation' },
      { status: 500 }
    );
  }
}
