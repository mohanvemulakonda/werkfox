import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// GET /api/payments - List all payments with optional filters
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const where: any = {};

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    const payments = await prisma.payments.findMany({
      where,
      include: {
        customer: { select: { name: true } },
        vendor: { select: { name: true } },
      },
      orderBy: { paymentDate: 'desc' },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

// POST /api/payments - Create a new payment
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      type,
      amount,
      paymentDate,
      customerId,
      vendorId,
      paymentMethod,
      referenceNumber,
      bankName,
      currency,
      notes,
      allocations,
    } = body;

    // Validate required fields
    if (!type || !amount || !paymentDate) {
      return NextResponse.json(
        { error: 'type, amount, and paymentDate are required' },
        { status: 400 }
      );
    }

    // Validate type
    if (!['RECEIVED', 'MADE', 'REFUND', 'ADVANCE'].includes(type)) {
      return NextResponse.json(
        { error: 'type must be RECEIVED, MADE, REFUND, or ADVANCE' },
        { status: 400 }
      );
    }

    // Auto-generate payment number
    const paymentNumber = await generateDocumentNumber('PAY');

    const payment = await prisma.$transaction(async (tx) => {
      // Create payment
      const newPayment = await tx.payments.create({
        data: {
          paymentNumber,
          type,
          customerId: customerId ? parseInt(customerId) : null,
          vendorId: vendorId ? parseInt(vendorId) : null,
          amount: parseFloat(amount),
          currency: currency || 'INR',
          paymentMethod: paymentMethod || null,
          paymentDate: new Date(paymentDate),
          referenceNumber: referenceNumber || null,
          bankName: bankName || null,
          status: 'DRAFT',
          notes: notes || null,
        },
      });

      // Process allocations if provided
      if (allocations && allocations.length > 0) {
        for (const alloc of allocations) {
          const allocAmount = parseFloat(alloc.amount);

          // Create allocation
          await tx.payment_allocations.create({
            data: {
              paymentId: newPayment.id,
              invoiceId: alloc.invoiceId ? parseInt(alloc.invoiceId) : null,
              purchaseOrderId: alloc.purchaseOrderId ? parseInt(alloc.purchaseOrderId) : null,
              amount: allocAmount,
            },
          });

          // Update invoice if allocated
          if (alloc.invoiceId) {
            const invoice = await tx.invoices.findUnique({
              where: { id: parseInt(alloc.invoiceId) },
            });

            if (invoice) {
              const newAmountPaid = Number(invoice.amountPaid) + allocAmount;
              const newBalanceDue = Number(invoice.total) - newAmountPaid;
              const paymentStatus = newBalanceDue <= 0 ? 'PAID' : 'PARTIAL';

              await tx.invoices.update({
                where: { id: invoice.id },
                data: {
                  amountPaid: newAmountPaid,
                  balanceDue: Math.max(0, newBalanceDue),
                  paymentStatus,
                },
              });
            }
          }

          // Update PO if allocated
          if (alloc.purchaseOrderId) {
            const po = await tx.purchase_orders.findUnique({
              where: { id: parseInt(alloc.purchaseOrderId) },
            });

            if (po) {
              // Calculate total paid for this PO from all allocations
              const existingAllocations = await tx.payment_allocations.findMany({
                where: { purchaseOrderId: po.id },
              });
              const totalPaid = existingAllocations.reduce(
                (sum, a) => sum + Number(a.amount),
                0
              ) + allocAmount;
              const paymentStatus = totalPaid >= Number(po.total) ? 'PAID' : 'PARTIAL';

              await tx.purchase_orders.update({
                where: { id: po.id },
                data: { paymentStatus },
              });
            }
          }
        }
      }

      // Update customer/vendor currentBalance
      if (customerId) {
        const customer = await tx.customers.findUnique({
          where: { id: parseInt(customerId) },
        });
        if (customer) {
          const balanceChange = type === 'RECEIVED' ? -parseFloat(amount) : parseFloat(amount);
          await tx.customers.update({
            where: { id: customer.id },
            data: {
              currentBalance: Number(customer.currentBalance || 0) + balanceChange,
            },
          });
        }
      }

      if (vendorId) {
        const vendor = await tx.vendors.findUnique({
          where: { id: parseInt(vendorId) },
        });
        if (vendor) {
          const balanceChange = type === 'MADE' ? -parseFloat(amount) : parseFloat(amount);
          await tx.vendors.update({
            where: { id: vendor.id },
            data: {
              currentBalance: Number(vendor.currentBalance || 0) + balanceChange,
            },
          });
        }
      }

      // Return payment with relations
      return tx.payments.findUnique({
        where: { id: newPayment.id },
        include: {
          customer: { select: { name: true } },
          vendor: { select: { name: true } },
          allocations: true,
        },
      });
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error: any) {
    console.error('Error creating payment:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A payment with this number already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}
