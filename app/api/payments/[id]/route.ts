import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/payments/[id] - Get single payment with allocations
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const paymentId = parseInt(id);

    if (isNaN(paymentId)) {
      return NextResponse.json({ error: 'Invalid payment ID' }, { status: 400 });
    }

    const payment = await prisma.payments.findUnique({
      where: { id: paymentId },
      include: {
        allocations: true,
        customer: true,
        vendor: true,
      },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Enrich allocations with invoice/PO details
    const enrichedAllocations = await Promise.all(
      payment.allocations.map(async (alloc) => {
        let invoice = null;
        let purchaseOrder = null;

        if (alloc.invoiceId) {
          invoice = await prisma.invoices.findUnique({
            where: { id: alloc.invoiceId },
            select: { invoiceNumber: true, total: true, customerName: true },
          });
        }

        if (alloc.purchaseOrderId) {
          purchaseOrder = await prisma.purchase_orders.findUnique({
            where: { id: alloc.purchaseOrderId },
            select: { poNumber: true, total: true, vendorName: true },
          });
        }

        return { ...alloc, invoice, purchaseOrder };
      })
    );

    return NextResponse.json({
      ...payment,
      allocations: enrichedAllocations,
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment' },
      { status: 500 }
    );
  }
}

// PATCH /api/payments/[id] - Update payment status (CONFIRMED, CANCELLED, BOUNCED)
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
    const paymentId = parseInt(id);

    if (isNaN(paymentId)) {
      return NextResponse.json({ error: 'Invalid payment ID' }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    if (!['CONFIRMED', 'CANCELLED', 'BOUNCED'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be CONFIRMED, CANCELLED, or BOUNCED' },
        { status: 400 }
      );
    }

    const existing = await prisma.payments.findUnique({
      where: { id: paymentId },
      include: { allocations: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    const updatedPayment = await prisma.$transaction(async (tx) => {
      // If CANCELLED or BOUNCED: reverse allocations
      if (status === 'CANCELLED' || status === 'BOUNCED') {
        for (const alloc of existing.allocations) {
          const allocAmount = Number(alloc.amount);

          // Reverse invoice allocation
          if (alloc.invoiceId) {
            const invoice = await tx.invoices.findUnique({
              where: { id: alloc.invoiceId },
            });

            if (invoice) {
              const newAmountPaid = Math.max(0, Number(invoice.amountPaid) - allocAmount);
              const newBalanceDue = Number(invoice.total) - newAmountPaid;
              const paymentStatus = newAmountPaid <= 0 ? 'UNPAID' : 'PARTIAL';

              await tx.invoices.update({
                where: { id: invoice.id },
                data: {
                  amountPaid: newAmountPaid,
                  balanceDue: newBalanceDue,
                  paymentStatus,
                },
              });
            }
          }

          // Reverse PO allocation
          if (alloc.purchaseOrderId) {
            const po = await tx.purchase_orders.findUnique({
              where: { id: alloc.purchaseOrderId },
            });

            if (po) {
              // Recalculate total paid excluding this payment's allocations
              const otherAllocations = await tx.payment_allocations.findMany({
                where: {
                  purchaseOrderId: po.id,
                  paymentId: { not: paymentId },
                },
              });
              const totalPaid = otherAllocations.reduce(
                (sum, a) => sum + Number(a.amount),
                0
              );
              const paymentStatus = totalPaid <= 0 ? 'UNPAID' : totalPaid >= Number(po.total) ? 'PAID' : 'PARTIAL';

              await tx.purchase_orders.update({
                where: { id: po.id },
                data: { paymentStatus },
              });
            }
          }
        }

        // Reverse customer/vendor balance
        if (existing.customerId) {
          const customer = await tx.customers.findUnique({
            where: { id: existing.customerId },
          });
          if (customer) {
            const reverseChange = existing.type === 'RECEIVED' ? Number(existing.amount) : -Number(existing.amount);
            await tx.customers.update({
              where: { id: customer.id },
              data: {
                currentBalance: Number(customer.currentBalance || 0) + reverseChange,
              },
            });
          }
        }

        if (existing.vendorId) {
          const vendor = await tx.vendors.findUnique({
            where: { id: existing.vendorId },
          });
          if (vendor) {
            const reverseChange = existing.type === 'MADE' ? Number(existing.amount) : -Number(existing.amount);
            await tx.vendors.update({
              where: { id: vendor.id },
              data: {
                currentBalance: Number(vendor.currentBalance || 0) + reverseChange,
              },
            });
          }
        }
      }

      return tx.payments.update({
        where: { id: paymentId },
        data: { status },
        include: {
          customer: { select: { name: true } },
          vendor: { select: { name: true } },
          allocations: true,
        },
      });
    });

    return NextResponse.json(updatedPayment);
  } catch (error) {
    console.error('Error updating payment status:', error);
    return NextResponse.json(
      { error: 'Failed to update payment status' },
      { status: 500 }
    );
  }
}
