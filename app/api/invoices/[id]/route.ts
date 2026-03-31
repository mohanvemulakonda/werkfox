import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

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
    const invoiceId = parseInt(id);

    if (isNaN(invoiceId)) {
      return NextResponse.json({ error: 'Invalid invoice ID' }, { status: 400 });
    }

    const invoice = await prisma.invoices.findFirst({
      where: { id: invoiceId, organizationId: session.currentOrg.id },
      include: {
        items: {
          include: {
            product: {
              select: { name: true, sku: true },
            },
          },
        },
        customer: true,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (error: any) {
    console.error('Error fetching invoice:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoice' },
      { status: 500 }
    );
  }
}

export async function PATCH(
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
    const body = await request.json();

    // Verify invoice belongs to org
    const existing = await prisma.invoices.findFirst({
      where: { id: parseInt(id), organizationId: session.currentOrg.id },
    });
    if (!existing) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    const invoice = await prisma.invoices.update({
      where: { id: parseInt(id) },
      data: {
        status: body.status,
      }
    });

    return NextResponse.json(invoice);
  } catch (error: any) {
    console.error('Error updating invoice:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update invoice' },
      { status: 500 }
    );
  }
}

export async function PUT(
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
    const invoiceId = parseInt(id);
    const body = await request.json();

    // Verify invoice belongs to org
    const existingInvoice = await prisma.invoices.findFirst({
      where: { id: invoiceId, organizationId: session.currentOrg.id },
    });
    if (!existingInvoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Delete existing items
    await prisma.invoice_items.deleteMany({
      where: { invoiceId }
    });

    const totalAmount = parseFloat(body.total || 0);
    const paidAmount = parseFloat(body.amountPaid || 0);

    // Update invoice with new items
    const invoice = await prisma.invoices.update({
      where: { id: invoiceId },
      data: {
        type: body.type,
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
        companyGstNumber: body.companyGstNumber || null,
        companyState: body.companyState || null,
        paymentTerms: body.paymentTerms || 'Due on Receipt',
        poReference: body.poReference || null,
        notes: body.notes || null,
        termsAndConditions: body.termsAndConditions || null,
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
      include: { items: true }
    });

    return NextResponse.json(invoice);
  } catch (error: any) {
    console.error('Error updating invoice:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update invoice' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
    const invoiceId = parseInt(id);

    // Verify invoice belongs to org
    const existingInv = await prisma.invoices.findFirst({
      where: { id: invoiceId, organizationId: session.currentOrg.id },
    });
    if (!existingInv) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    await prisma.invoices.delete({ where: { id: invoiceId } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting invoice:', error);
    return NextResponse.json(
      { error: 'Failed to delete invoice' },
      { status: 500 }
    );
  }
}
