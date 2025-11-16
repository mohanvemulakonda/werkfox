import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

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
    const body = await request.json();

    // Update invoice
    const invoice = await prisma.invoice.update({
      where: { id: parseInt(id) },
      data: {
        status: body.status,
        ...(body.status === 'PAID' && !body.paidAt ? { paidAt: new Date() } : {}),
        ...(body.status === 'SENT' && !body.sentAt ? { sentAt: new Date() } : {})
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

    const { id } = await params;
    const body = await request.json();

    // Delete existing items
    await prisma.invoiceItem.deleteMany({
      where: { invoiceId: parseInt(id) }
    });

    // Update invoice with new items
    const invoice = await prisma.invoice.update({
      where: { id: parseInt(id) },
      data: {
        type: body.type,
        customerName: body.customerName,
        customerEmail: body.customerEmail || null,
        customerPhone: body.customerPhone || null,
        billingAddress: body.billingAddress || null,
        shippingAddress: body.shippingAddress || null,
        customerGstNumber: body.customerGstNumber || null,
        customerState: body.customerState || null,
        placeOfSupply: body.placeOfSupply || null,
        companyState: body.companyState || null,
        paymentTerms: body.paymentTerms || 'Due on Receipt',
        notes: body.notes || null,
        subtotal: body.subtotal,
        discountAmount: body.discountAmount || 0,
        cgstAmount: body.cgstAmount,
        sgstAmount: body.sgstAmount,
        igstAmount: body.igstAmount,
        totalTax: body.totalTax,
        total: body.total,
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId || null,
            itemName: item.itemName,
            description: item.description || null,
            hsnCode: item.hsnCode,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            discount: item.discount || 0,
            discountType: 'AMOUNT',
            taxableAmount: item.amount,
            gstRate: item.gstRate,
            cgst: body.cgstAmount > 0 ? (item.amount * item.gstRate / 100) / 2 : 0,
            sgst: body.sgstAmount > 0 ? (item.amount * item.gstRate / 100) / 2 : 0,
            igst: body.igstAmount > 0 ? (item.amount * item.gstRate / 100) : 0,
            total: item.amount + (item.amount * item.gstRate / 100)
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
