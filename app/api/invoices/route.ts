import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// Generate sequential invoice number using database
async function generateInvoiceNumber(type: string): Promise<string> {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');

  // Get company settings for prefix and next number
  const settings = await prisma.company_settings.findFirst();

  let prefix = 'INV';
  let nextNumber = 1;

  if (settings) {
    if (type === 'QUOTE') {
      prefix = settings.quotePrefix || 'QT';
      nextNumber = settings.nextQuoteNumber || 1;
      await prisma.company_settings.update({
        where: { id: settings.id },
        data: { nextQuoteNumber: nextNumber + 1 }
      });
    } else if (type === 'PROFORMA') {
      prefix = settings.proformaPrefix || 'PI';
      nextNumber = settings.nextInvoiceNumber || 1;
    } else {
      prefix = settings.invoicePrefix || 'INV';
      nextNumber = settings.nextInvoiceNumber || 1;
      await prisma.company_settings.update({
        where: { id: settings.id },
        data: { nextInvoiceNumber: nextNumber + 1 }
      });
    }
  }

  const formattedNumber = nextNumber.toString().padStart(4, '0');
  return `${prefix}-${year}${month}-${formattedNumber}`;
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

    const invoices = await prisma.invoices.findMany({
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
    if (!body.customerName || !body.customerId) {
      return NextResponse.json(
        { error: 'Missing required fields: customerName, customerId' },
        { status: 400 }
      );
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'At least one item is required' },
        { status: 400 }
      );
    }

    // Generate invoice number (sequential from database)
    const invoiceNumber = await generateInvoiceNumber(body.type || 'INVOICE');

    const totalAmount = parseFloat(body.total || 0);
    const paidAmount = parseFloat(body.amountPaid || 0);

    // Create invoice with items
    const invoice = await prisma.invoices.create({
      data: {
        invoiceNumber,
        customerId: parseInt(body.customerId),
        type: body.type || 'INVOICE',
        status: body.status || 'DRAFT',

        // Customer details
        customerName: body.customerName,
        customerEmail: body.customerEmail || null,
        customerPhone: body.customerPhone || null,
        customerCompany: body.customerCompany || null,
        customerGst: body.customerGstNumber || body.customerGst || null,
        customerState: body.customerState || null,
        billingAddress: body.billingAddress || null,
        shippingAddress: body.shippingAddress || null,
        shippingContactName: body.shippingContactName || null,
        shippingContactPhone: body.shippingContactPhone || null,
        placeOfSupply: body.placeOfSupply || null,

        // Company details
        companyGstNumber: body.companyGstNumber || null,
        companyState: body.companyState || null,

        // Payment terms and references
        paymentTerms: body.paymentTerms || 'Due on Receipt',
        creditDays: body.creditDays ? parseInt(body.creditDays) : 0,
        poReference: body.poReference || null,
        currency: body.currency || 'INR',

        // Amounts
        subtotal: parseFloat(body.subtotal || 0),
        discountAmount: parseFloat(body.discountAmount || 0),
        discount: parseFloat(body.discount || 0),
        cgstAmount: parseFloat(body.cgstAmount || 0),
        sgstAmount: parseFloat(body.sgstAmount || 0),
        igstAmount: parseFloat(body.igstAmount || 0),
        cgst: parseFloat(body.cgstAmount || body.cgst || 0),
        sgst: parseFloat(body.sgstAmount || body.sgst || 0),
        igst: parseFloat(body.igstAmount || body.igst || 0),
        totalTax: parseFloat(body.totalTax || 0),
        taxAmount: parseFloat(body.totalTax || body.taxAmount || 0),
        total: totalAmount,
        amountPaid: paidAmount,
        balanceDue: totalAmount - paidAmount,

        // Additional info
        notes: body.notes || null,
        terms: body.terms || null,
        termsAndConditions: body.termsAndConditions || null,

        // Items
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId ? parseInt(item.productId) : null,
            productName: item.productName || item.itemName || 'Unnamed Item',
            productSku: item.productSku || item.sku || null,
            itemName: item.itemName || item.productName || 'Unnamed Item',
            description: item.description || null,
            hsnCode: item.hsnCode || null,
            quantity: parseFloat(item.quantity || 1),
            unit: item.unit || 'Nos',
            unitPrice: parseFloat(item.unitPrice || 0),
            discount: parseFloat(item.discount || 0),
            taxRate: parseFloat(item.gstRate || item.taxRate || 0),
            gstRate: parseFloat(item.gstRate || item.taxRate || 0),
            taxableAmount: parseFloat(item.taxableAmount || item.amount || 0),
            cgst: parseFloat(item.cgst || 0),
            sgst: parseFloat(item.sgst || 0),
            igst: parseFloat(item.igst || 0),
            total: parseFloat(item.total || item.amount || 0),
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
