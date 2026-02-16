import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/vendors/[id]/outstanding - Get vendor outstanding amounts
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
    const vendorId = parseInt(id);

    if (isNaN(vendorId)) {
      return NextResponse.json({ error: 'Invalid vendor ID' }, { status: 400 });
    }

    // Verify vendor exists
    const vendor = await prisma.vendors.findUnique({
      where: { id: vendorId },
      select: { id: true, name: true, currentBalance: true },
    });

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    // Get unpaid/partial POs
    const purchaseOrders = await prisma.purchase_orders.findMany({
      where: {
        vendorId,
        paymentStatus: { in: ['UNPAID', 'PARTIAL'] },
        status: { notIn: ['CANCELLED'] },
      },
      select: {
        id: true,
        poNumber: true,
        orderDate: true,
        expectedDate: true,
        total: true,
        paymentStatus: true,
        status: true,
      },
      orderBy: { orderDate: 'desc' },
    });

    // Calculate total paid for each PO from allocations
    const posWithBalance = await Promise.all(
      purchaseOrders.map(async (po) => {
        const allocations = await prisma.payment_allocations.findMany({
          where: { purchaseOrderId: po.id },
          include: {
            payment: { select: { status: true } },
          },
        });
        const totalPaid = allocations
          .filter((a) => a.payment.status !== 'CANCELLED' && a.payment.status !== 'BOUNCED')
          .reduce((sum, a) => sum + Number(a.amount), 0);
        const balanceDue = Number(po.total) - totalPaid;

        return {
          ...po,
          amountPaid: totalPaid,
          balanceDue,
        };
      })
    );

    const totalOutstanding = posWithBalance.reduce(
      (sum, po) => sum + po.balanceDue,
      0
    );

    const overduePOs = posWithBalance.filter(
      (po) => po.expectedDate && new Date(po.expectedDate) < new Date()
    );

    const totalOverdue = overduePOs.reduce(
      (sum, po) => sum + po.balanceDue,
      0
    );

    return NextResponse.json({
      vendor: {
        id: vendor.id,
        name: vendor.name,
        currentBalance: Number(vendor.currentBalance || 0),
      },
      purchaseOrders: posWithBalance,
      summary: {
        totalOutstanding,
        totalOverdue,
        unpaidCount: posWithBalance.filter((p) => p.paymentStatus === 'UNPAID').length,
        partialCount: posWithBalance.filter((p) => p.paymentStatus === 'PARTIAL').length,
        overdueCount: overduePOs.length,
      },
    });
  } catch (error) {
    console.error('Error fetching vendor outstanding:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vendor outstanding' },
      { status: 500 }
    );
  }
}
