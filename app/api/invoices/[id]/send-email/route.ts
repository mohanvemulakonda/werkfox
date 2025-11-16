import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateInvoicePDFPro } from '@/lib/pdf-generator-pro';
import { sendEmail, generateInvoiceEmailHTML, generateInvoiceEmailText } from '@/lib/email';

export async function POST(
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

    if (!invoice.customerEmail) {
      return NextResponse.json(
        { error: 'Customer email not found' },
        { status: 400 }
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
        gstRate: Number(item.gstRate)
      }))
    };

    // Generate PDF with professional layout
    const pdf = generateInvoicePDFPro(invoiceData);

    // Get PDF as buffer - pdfkit returns a stream
    const chunks: Buffer[] = [];
    pdf.on('data', (chunk: Buffer) => chunks.push(chunk));

    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      pdf.on('end', () => resolve(Buffer.concat(chunks)));
      pdf.on('error', reject);
      pdf.end();
    });

    // Generate email content
    const htmlContent = generateInvoiceEmailHTML(
      invoice.customerName,
      invoice.invoiceNumber,
      Number(invoice.total),
      invoice.dueDate
    );

    const textContent = generateInvoiceEmailText(
      invoice.customerName,
      invoice.invoiceNumber,
      Number(invoice.total),
      invoice.dueDate
    );

    // Send email with PDF attachment
    const result = await sendEmail({
      to: invoice.customerEmail,
      subject: `Invoice ${invoice.invoiceNumber} from Livato Solutions`,
      text: textContent,
      html: htmlContent,
      attachments: [
        {
          filename: `Invoice-${invoice.invoiceNumber}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });

    if (result.success) {
      // Update invoice status to SENT if it was DRAFT
      if (invoice.status === 'DRAFT') {
        await prisma.invoice.update({
          where: { id: invoice.id },
          data: { status: 'SENT' }
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Invoice sent successfully'
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error sending invoice email:', error);
    return NextResponse.json(
      { error: 'Failed to send invoice email' },
      { status: 500 }
    );
  }
}
