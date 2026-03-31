import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateInvoicePDF } from '@/lib/pdf-generator-jspdf';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 400 });
    }

    const { id } = await params;
    const quotation = await prisma.quotations.findFirst({
      where: { id: parseInt(id), organizationId: session.currentOrg.id },
      include: {
        items: {
          include: {
            product: { select: { name: true, sku: true } },
          },
        },
        customer: true,
      },
    });

    if (!quotation) {
      return NextResponse.json(
        { error: 'Quotation not found' },
        { status: 404 }
      );
    }

    // Map quotation data to the invoice PDF format (reuse the same generator)
    const invoiceData = {
      invoiceNumber: quotation.quoteNumber,
      type: 'QUOTE',
      createdAt: quotation.quoteDate,
      dueDate: quotation.validUntil,
      customerName: quotation.customerName,
      customerCompany: quotation.customer?.name || null,
      customerPhone: quotation.customer?.phone || null,
      customerEmail: (quotation as any).customerEmail || quotation.customer?.email || null,
      billingAddress: quotation.billingAddress || quotation.customer?.address || null,
      shippingAddress: quotation.billingAddress || quotation.customer?.address || null,
      customerGstNumber: quotation.customerGst || null,
      customerGst: quotation.customerGst || null,
      placeOfSupply: (quotation as any).customerState || null,
      paymentTerms: null,
      poReference: null,
      currency: quotation.currency || 'INR',
      subtotal: Number(quotation.subtotal),
      totalTax: Number(quotation.taxAmount),
      igstAmount: 0,
      cgstAmount: Number(quotation.taxAmount) / 2,
      sgstAmount: Number(quotation.taxAmount) / 2,
      total: Number(quotation.total),
      paidAmount: null,
      notes: quotation.notes || null,
      termsAndConditions: quotation.terms || null,
      items: quotation.items.map((item) => ({
        itemName: item.product?.name || item.productName,
        description: item.description || null,
        hsnCode: (item as any).hsnCode || '',
        quantity: Number(item.quantity),
        unit: (item as any).unit || 'Nos',
        unitPrice: Number(item.unitPrice),
        taxableAmount: Number(item.quantity) * Number(item.unitPrice),
        gstRate: Number(item.taxRate),
      })),
    };

    const pdfBuffer = await generateInvoicePDF(invoiceData as any);

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="Quote-${quotation.quoteNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating quotation PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
