import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateInvoicePDF } from '@/lib/pdf-generator-jspdf';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const invoice = await prisma.invoices.findUnique({
      where: { id: parseInt(id) },
      include: { items: true }
    });

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Convert Prisma Decimal types to numbers for PDF generation
    const invoiceData = {
      ...invoice,
      subtotal: Number(invoice.subtotal),
      totalTax: Number((invoice as any).totalTax || invoice.taxAmount || 0),
      igstAmount: Number((invoice as any).igstAmount || invoice.igst || 0),
      cgstAmount: Number((invoice as any).cgstAmount || invoice.cgst || 0),
      sgstAmount: Number((invoice as any).sgstAmount || invoice.sgst || 0),
      total: Number(invoice.total),
      paidAmount: invoice.amountPaid ? Number(invoice.amountPaid) : null,
      items: invoice.items.map(item => ({
        ...item,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
        taxableAmount: Number((item as any).taxableAmount || item.total || 0),
        gstRate: Number((item as any).gstRate || item.taxRate || 0),
        igst: item.igst ? Number(item.igst) : undefined,
        cgst: item.cgst ? Number(item.cgst) : undefined,
        sgst: item.sgst ? Number(item.sgst) : undefined
      }))
    };

    // Generate PDF with jsPDF (now async)
    const pdfBuffer = await generateInvoicePDF(invoiceData as any);

    // Return PDF as response
    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Invoice-${invoice.invoiceNumber}.pdf"`
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
