import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

function generateInvoiceNumber(type: string): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  const prefix = type === 'QUOTE' ? 'QT' : type === 'PROFORMA' ? 'PI' : 'INV';
  return `${prefix}${year}${month}${random}`;
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status;

    const invoices = await prisma.invoice.findMany({
      where,
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                sku: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(invoices);
  } catch (error: any) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.customerName || !body.customerEmail || !body.customerState) {
      return NextResponse.json(
        { error: 'Missing required fields: customerName, customerEmail, customerState' },
        { status: 400 }
      );
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'At least one item is required' },
        { status: 400 }
      );
    }

    // Generate invoice number
    const invoiceNumber = generateInvoiceNumber(body.type || 'QUOTE');

    // Create invoice with items
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        type: body.type || 'QUOTE',
        status: body.status || 'DRAFT',

        // Customer details
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone || null,
        billingAddress: body.billingAddress || null,
        shippingAddress: body.shippingAddress || null,
        customerGstNumber: body.customerGstNumber || null,
        customerState: body.customerState,
        placeOfSupply: body.placeOfSupply || null,

        // Company details
        companyGstNumber: body.companyGstNumber || null,
        companyState: body.companyState || 'Karnataka',

        // Payment terms
        paymentTerms: body.paymentTerms || 'Due on Receipt',

        // Amounts
        subtotal: body.subtotal,
        discountAmount: body.discountAmount || 0,
        cgstAmount: body.cgstAmount || 0,
        sgstAmount: body.sgstAmount || 0,
        igstAmount: body.igstAmount || 0,
        totalTax: body.totalTax,
        total: body.total,

        // Additional info
        notes: body.notes || null,

        // Items
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId ? parseInt(item.productId) : null,
            itemName: item.productName || item.itemName || 'Unnamed Item',
            description: item.description || null,
            hsnCode: item.hsnCode || null,
            quantity: parseFloat(item.quantity),
            unit: item.unit || 'Nos',
            unitPrice: parseFloat(item.unitPrice),
            discount: parseFloat(item.discount || 0),
            gstRate: parseFloat(item.gstRate),
            taxableAmount: parseFloat(item.amount),
            cgst: parseFloat(item.cgst || 0),
            sgst: parseFloat(item.sgst || 0),
            igst: parseFloat(item.igst || 0),
            total: parseFloat(item.amount),
          }))
        }
      },
      include: {
        items: true
      }
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error: any) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
