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
    const invoice = await prisma.invoice.findUnique({
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
      totalTax: Number(invoice.totalTax),
      igstAmount: Number(invoice.igstAmount),
      cgstAmount: Number(invoice.cgstAmount),
      sgstAmount: Number(invoice.sgstAmount),
      total: Number(invoice.total),
      paidAmount: invoice.paidAmount ? Number(invoice.paidAmount) : null,
      items: invoice.items.map(item => ({
        ...item,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
        taxableAmount: Number(item.taxableAmount),
        gstRate: Number(item.gstRate),
        igst: item.igst ? Number(item.igst) : undefined,
        cgst: item.cgst ? Number(item.cgst) : undefined,
        sgst: item.sgst ? Number(item.sgst) : undefined
      }))
    };

    // Generate PDF with jsPDF
    const pdfBuffer = generateInvoicePDF(invoiceData);

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
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
