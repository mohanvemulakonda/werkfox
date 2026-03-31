import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// POST /api/invoices/[id]/record-payment - Record payment against an invoice
export async function POST(
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

    const body = await request.json();
    const { amount, paymentMethod, paymentDate, referenceNumber, bankName, notes } = body;

    // Validate required fields
    if (!amount || !paymentMethod || !paymentDate) {
      return NextResponse.json(
        { error: 'amount, paymentMethod, and paymentDate are required' },
        { status: 400 }
      );
    }

    // Fetch invoice (verify org ownership)
    const invoice = await prisma.invoices.findFirst({
      where: { id: invoiceId, organizationId: session.currentOrg.id },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    const paymentAmount = parseFloat(amount);
    const balanceDue = Number(invoice.balanceDue);

    // Validate amount
    if (paymentAmount <= 0) {
      return NextResponse.json(
        { error: 'Payment amount must be greater than 0' },
        { status: 400 }
      );
    }

    if (paymentAmount > balanceDue) {
      return NextResponse.json(
        { error: `Payment amount (${paymentAmount}) exceeds balance due (${balanceDue})` },
        { status: 400 }
      );
    }

    // Generate payment number
    const paymentNumber = await generateDocumentNumber('PAY');

    const payment = await prisma.$transaction(async (tx) => {
      // Create payment
      const newPayment = await tx.payments.create({
        data: {
          organizationId: session.currentOrg.id,
          paymentNumber,
          type: 'RECEIVED',
          customerId: invoice.customerId,
          amount: paymentAmount,
          currency: invoice.currency,
          paymentMethod,
          paymentDate: new Date(paymentDate),
          referenceNumber: referenceNumber || null,
          bankName: bankName || null,
          status: 'CONFIRMED',
          notes: notes || null,
        },
      });

      // Create allocation
      await tx.payment_allocations.create({
        data: {
          paymentId: newPayment.id,
          invoiceId,
          amount: paymentAmount,
        },
      });

      // Update invoice
      const newAmountPaid = Number(invoice.amountPaid) + paymentAmount;
      const newBalanceDue = Number(invoice.total) - newAmountPaid;
      const paymentStatus = newBalanceDue <= 0 ? 'PAID' : 'PARTIAL';

      await tx.invoices.update({
        where: { id: invoiceId },
        data: {
          amountPaid: newAmountPaid,
          balanceDue: Math.max(0, newBalanceDue),
          paymentStatus,
        },
      });

      // Update customer currentBalance
      const customer = await tx.customers.findUnique({
        where: { id: invoice.customerId },
      });
      if (customer) {
        await tx.customers.update({
          where: { id: customer.id },
          data: {
            currentBalance: Number(customer.currentBalance || 0) - paymentAmount,
          },
        });
      }

      return tx.payments.findUnique({
        where: { id: newPayment.id },
        include: {
          customer: { select: { name: true } },
          allocations: true,
        },
      });
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error('Error recording payment for invoice:', error);
    return NextResponse.json(
      { error: 'Failed to record payment' },
      { status: 500 }
    );
  }
}
