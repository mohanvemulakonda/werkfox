import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// POST /api/quotations/[id]/convert-to-so - Convert an accepted quotation to a sales order
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const quoteId = parseInt(id);

    if (isNaN(quoteId)) {
      return NextResponse.json({ error: 'Invalid quotation ID' }, { status: 400 });
    }

    // Fetch quotation with items
    const quotation = await prisma.quotations.findUnique({
      where: { id: quoteId },
      include: { items: true },
    });

    if (!quotation) {
      return NextResponse.json({ error: 'Quotation not found' }, { status: 404 });
    }

    // Verify status is ACCEPTED
    if (quotation.status !== 'ACCEPTED') {
      return NextResponse.json(
        { error: `Only ACCEPTED quotations can be converted to sales orders. Current status: ${quotation.status}` },
        { status: 400 }
      );
    }

    // Use a transaction to create SO and update quotation
    const salesOrder = await prisma.$transaction(async (tx) => {
      // Generate SO number
      const soNumber = await generateDocumentNumber('SO');

      // Create sales order copying customer fields and items from quotation
      const newSO = await tx.sales_orders.create({
        data: {
          soNumber,
          customerId: quotation.customerId,
          quotationId: quotation.id,
          customerName: quotation.customerName,
          customerEmail: quotation.customerEmail,
          customerGst: quotation.customerGst,
          customerState: quotation.customerState,
          orderDate: new Date(),
          subtotal: quotation.subtotal,
          taxAmount: quotation.taxAmount,
          discount: quotation.discount,
          total: quotation.total,
          currency: quotation.currency,
          status: 'PENDING',
          paymentStatus: 'UNPAID',
          terms: quotation.terms,
          notes: quotation.notes,
          items: {
            create: quotation.items.map((item) => ({
              productId: item.productId,
              productName: item.productName,
              productSku: item.productSku,
              quantity: item.quantity,
              deliveredQty: 0,
              unitPrice: item.unitPrice,
              taxRate: item.taxRate,
              discount: item.discount,
              total: item.total,
            })),
          },
        },
        include: {
          customer: { select: { name: true, customerCode: true } },
          items: true,
        },
      });

      // Update quotation status to CONVERTED
      await tx.quotations.update({
        where: { id: quoteId },
        data: { status: 'CONVERTED' },
      });

      return newSO;
    });

    return NextResponse.json(salesOrder, { status: 201 });
  } catch (error) {
    console.error('Error converting quotation to sales order:', error);
    return NextResponse.json(
      { error: 'Failed to convert quotation to sales order' },
      { status: 500 }
    );
  }
}
