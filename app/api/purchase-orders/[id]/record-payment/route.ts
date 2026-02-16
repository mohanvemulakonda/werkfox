import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// POST /api/purchase-orders/[id]/record-payment - Record payment against a PO
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
    const poId = parseInt(id);

    if (isNaN(poId)) {
      return NextResponse.json({ error: 'Invalid purchase order ID' }, { status: 400 });
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

    // Fetch PO
    const purchaseOrder = await prisma.purchase_orders.findUnique({
      where: { id: poId },
    });

    if (!purchaseOrder) {
      return NextResponse.json({ error: 'Purchase order not found' }, { status: 404 });
    }

    const paymentAmount = parseFloat(amount);

    // Calculate existing paid amount from allocations
    const existingAllocations = await prisma.payment_allocations.findMany({
      where: { purchaseOrderId: poId },
      include: {
        payment: { select: { status: true } },
      },
    });
    const totalPaid = existingAllocations
      .filter((a) => a.payment.status !== 'CANCELLED' && a.payment.status !== 'BOUNCED')
      .reduce((sum, a) => sum + Number(a.amount), 0);
    const balanceDue = Number(purchaseOrder.total) - totalPaid;

    // Validate amount
    if (paymentAmount <= 0) {
      return NextResponse.json(
        { error: 'Payment amount must be greater than 0' },
        { status: 400 }
      );
    }

    if (paymentAmount > balanceDue) {
      return NextResponse.json(
        { error: `Payment amount (${paymentAmount}) exceeds balance due (${balanceDue.toFixed(2)})` },
        { status: 400 }
      );
    }

    // Generate payment number
    const paymentNumber = await generateDocumentNumber('PAY');

    const payment = await prisma.$transaction(async (tx) => {
      // Create payment
      const newPayment = await tx.payments.create({
        data: {
          paymentNumber,
          type: 'MADE',
          vendorId: purchaseOrder.vendorId,
          amount: paymentAmount,
          currency: purchaseOrder.currency,
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
          purchaseOrderId: poId,
          amount: paymentAmount,
        },
      });

      // Update PO payment status
      const newTotalPaid = totalPaid + paymentAmount;
      const paymentStatus = newTotalPaid >= Number(purchaseOrder.total) ? 'PAID' : 'PARTIAL';

      await tx.purchase_orders.update({
        where: { id: poId },
        data: { paymentStatus },
      });

      // Update vendor currentBalance
      const vendor = await tx.vendors.findUnique({
        where: { id: purchaseOrder.vendorId },
      });
      if (vendor) {
        await tx.vendors.update({
          where: { id: vendor.id },
          data: {
            currentBalance: Number(vendor.currentBalance || 0) - paymentAmount,
          },
        });
      }

      return tx.payments.findUnique({
        where: { id: newPayment.id },
        include: {
          vendor: { select: { name: true } },
          allocations: true,
        },
      });
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error('Error recording payment for PO:', error);
    return NextResponse.json(
      { error: 'Failed to record payment' },
      { status: 500 }
    );
  }
}
