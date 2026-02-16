import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// POST /api/work-orders/[id]/convert-to-invoice - Convert a completed work order to an invoice
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
    const woId = parseInt(id);

    if (isNaN(woId)) {
      return NextResponse.json({ error: 'Invalid work order ID' }, { status: 400 });
    }

    // Fetch work order with items and customer
    const workOrder = await prisma.work_orders.findUnique({
      where: { id: woId },
      include: {
        customer: true,
        items: {
          include: {
            product: { select: { hsnCode: true, gstRate: true, name: true, sku: true } },
          },
        },
      },
    });

    if (!workOrder) {
      return NextResponse.json({ error: 'Work order not found' }, { status: 404 });
    }

    // Verify status is COMPLETED
    if (workOrder.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: `Only COMPLETED work orders can be converted to invoices. Current status: ${workOrder.status}` },
        { status: 400 }
      );
    }

    // Determine if intra-state (CGST+SGST) or inter-state (IGST)
    const companySettings = await prisma.company_settings.findFirst();
    const companyState = companySettings?.companyState || 'Telangana';
    const customerState = workOrder.customer.state || '';
    const isIntraState = customerState.toLowerCase() === companyState.toLowerCase();

    // Use a transaction to create invoice and update WO
    const invoice = await prisma.$transaction(async (tx) => {
      // Generate invoice number
      const invoiceNumber = await generateDocumentNumber('INV');

      // Build invoice items with GST breakdown
      const invoiceItems = workOrder.items.map((item) => {
        const taxableAmount = Number(item.total);
        const taxRate = item.product ? Number(item.product.gstRate) : 18;
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
          productName: item.product?.name || item.description,
          productSku: item.product?.sku || null,
          hsnCode: item.product?.hsnCode || null,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxRate,
          taxableAmount,
          gstRate: taxRate,
          cgst,
          sgst,
          igst,
          discount: 0,
          total: taxableAmount + taxOnItem,
        };
      });

      // Calculate invoice totals
      const subtotal = invoiceItems.reduce((sum, i) => sum + Number(i.unitPrice) * Number(i.quantity), 0);
      const totalCgst = invoiceItems.reduce((sum, i) => sum + i.cgst, 0);
      const totalSgst = invoiceItems.reduce((sum, i) => sum + i.sgst, 0);
      const totalIgst = invoiceItems.reduce((sum, i) => sum + i.igst, 0);
      const taxAmount = totalCgst + totalSgst + totalIgst;
      const total = subtotal + taxAmount;

      // Create invoice
      const newInvoice = await tx.invoices.create({
        data: {
          invoiceNumber,
          customerId: workOrder.customerId,
          customerName: workOrder.customer.name,
          customerEmail: workOrder.customer.email,
          customerGst: workOrder.customer.gstNumber,
          customerState: workOrder.customer.state,
          invoiceDate: new Date(),
          subtotal,
          cgst: totalCgst,
          sgst: totalSgst,
          igst: totalIgst,
          taxAmount,
          discount: 0,
          total,
          amountPaid: 0,
          balanceDue: total,
          currency: 'INR',
          status: 'DRAFT',
          paymentStatus: 'UNPAID',
          items: {
            create: invoiceItems,
          },
        },
        include: {
          customer: { select: { name: true, customerCode: true } },
          items: true,
        },
      });

      // Update WO status to INVOICED
      await tx.work_orders.update({
        where: { id: woId },
        data: { status: 'INVOICED' },
      });

      return newInvoice;
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error('Error converting work order to invoice:', error);
    return NextResponse.json(
      { error: 'Failed to convert work order to invoice' },
      { status: 500 }
    );
  }
}
