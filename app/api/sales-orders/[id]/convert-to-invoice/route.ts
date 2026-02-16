import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

const COMPANY_STATE = 'Telangana';

// POST /api/sales-orders/[id]/convert-to-invoice - Convert a sales order to an invoice
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
    const soId = parseInt(id);

    if (isNaN(soId)) {
      return NextResponse.json({ error: 'Invalid sales order ID' }, { status: 400 });
    }

    // Fetch sales order with items
    const salesOrder = await prisma.sales_orders.findUnique({
      where: { id: soId },
      include: {
        items: {
          include: {
            product: { select: { hsnCode: true } },
          },
        },
      },
    });

    if (!salesOrder) {
      return NextResponse.json({ error: 'Sales order not found' }, { status: 404 });
    }

    // Verify status is CONFIRMED or IN_PROGRESS
    if (!['CONFIRMED', 'IN_PROGRESS'].includes(salesOrder.status)) {
      return NextResponse.json(
        { error: `Only CONFIRMED or IN_PROGRESS sales orders can be converted to invoices. Current status: ${salesOrder.status}` },
        { status: 400 }
      );
    }

    // Determine if intra-state (CGST+SGST) or inter-state (IGST)
    const isIntraState = salesOrder.customerState?.toLowerCase() === COMPANY_STATE.toLowerCase();

    // Use a transaction to create invoice and update SO
    const invoice = await prisma.$transaction(async (tx) => {
      // Generate invoice number
      const invoiceNumber = await generateDocumentNumber('INV');

      // Build invoice items with GST breakdown
      const invoiceItems = salesOrder.items.map((item) => {
        const taxableAmount = Number(item.total);
        const taxRate = Number(item.taxRate);
        const taxOnItem = taxableAmount * (taxRate / 100);

        let cgst = 0;
        let sgst = 0;
        let igst = 0;

        if (isIntraState) {
          cgst = taxOnItem / 2;
          sgst = taxOnItem / 2;
        } else {
          igst = taxOnItem;
        }

        return {
          productId: item.productId,
          productName: item.productName,
          productSku: item.productSku,
          hsnCode: item.product?.hsnCode || null,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxRate: item.taxRate,
          cgst,
          sgst,
          igst,
          discount: item.discount,
          total: taxableAmount + taxOnItem,
        };
      });

      // Calculate invoice totals
      const subtotal = Number(salesOrder.subtotal);
      const totalCgst = invoiceItems.reduce((sum, i) => sum + i.cgst, 0);
      const totalSgst = invoiceItems.reduce((sum, i) => sum + i.sgst, 0);
      const totalIgst = invoiceItems.reduce((sum, i) => sum + i.igst, 0);
      const taxAmount = totalCgst + totalSgst + totalIgst;
      const discount = Number(salesOrder.discount);
      const total = subtotal + taxAmount;

      // Create invoice
      const newInvoice = await tx.invoices.create({
        data: {
          invoiceNumber,
          customerId: salesOrder.customerId,
          customerName: salesOrder.customerName,
          customerEmail: salesOrder.customerEmail,
          customerGst: salesOrder.customerGst,
          customerState: salesOrder.customerState,
          invoiceDate: new Date(),
          subtotal,
          cgst: totalCgst,
          sgst: totalSgst,
          igst: totalIgst,
          taxAmount,
          discount,
          total,
          amountPaid: 0,
          balanceDue: total,
          currency: salesOrder.currency,
          status: 'DRAFT',
          paymentStatus: 'UNPAID',
          terms: salesOrder.terms,
          notes: salesOrder.notes,
          items: {
            create: invoiceItems,
          },
        },
        include: {
          customer: { select: { name: true, customerCode: true } },
          items: true,
        },
      });

      // Update SO status to COMPLETED
      await tx.sales_orders.update({
        where: { id: soId },
        data: { status: 'COMPLETED' },
      });

      return newInvoice;
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error('Error converting sales order to invoice:', error);
    return NextResponse.json(
      { error: 'Failed to convert sales order to invoice' },
      { status: 500 }
    );
  }
}
