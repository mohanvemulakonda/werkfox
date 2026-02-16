import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/customers/[id]/outstanding - Get customer outstanding amounts
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
    const customerId = parseInt(id);

    if (isNaN(customerId)) {
      return NextResponse.json({ error: 'Invalid customer ID' }, { status: 400 });
    }

    // Verify customer exists
    const customer = await prisma.customers.findUnique({
      where: { id: customerId },
      select: { id: true, name: true, currentBalance: true },
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Get unpaid/partial invoices
    const invoices = await prisma.invoices.findMany({
      where: {
        customerId,
        paymentStatus: { in: ['UNPAID', 'PARTIAL'] },
        status: { notIn: ['CANCELLED', 'REFUNDED'] },
      },
      select: {
        id: true,
        invoiceNumber: true,
        invoiceDate: true,
        dueDate: true,
        total: true,
        amountPaid: true,
        balanceDue: true,
        paymentStatus: true,
        status: true,
      },
      orderBy: { invoiceDate: 'desc' },
    });

    const totalOutstanding = invoices.reduce(
      (sum, inv) => sum + Number(inv.balanceDue),
      0
    );

    const overdueInvoices = invoices.filter(
      (inv) => inv.dueDate && new Date(inv.dueDate) < new Date()
    );

    const totalOverdue = overdueInvoices.reduce(
      (sum, inv) => sum + Number(inv.balanceDue),
      0
    );

    return NextResponse.json({
      customer: {
        id: customer.id,
        name: customer.name,
        currentBalance: Number(customer.currentBalance || 0),
      },
      invoices,
      summary: {
        totalOutstanding,
        totalOverdue,
        unpaidCount: invoices.filter((i) => i.paymentStatus === 'UNPAID').length,
        partialCount: invoices.filter((i) => i.paymentStatus === 'PARTIAL').length,
        overdueCount: overdueInvoices.length,
      },
    });
  } catch (error) {
    console.error('Error fetching customer outstanding:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer outstanding' },
      { status: 500 }
    );
  }
}
