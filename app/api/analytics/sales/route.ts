import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get invoices from the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const invoices = await prisma.invoice.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo
        },
        status: {
          in: ['SENT', 'PAID', 'PARTIALLY_PAID']
        }
      },
      select: {
        total: true,
        createdAt: true
      }
    });

    // Group by month
    const monthlyData: { [key: string]: { revenue: number; count: number } } = {};

    invoices.forEach(invoice => {
      const monthKey = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        year: 'numeric'
      }).format(invoice.createdAt);

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { revenue: 0, count: 0 };
      }

      monthlyData[monthKey].revenue += Number(invoice.total);
      monthlyData[monthKey].count += 1;
    });

    // Convert to array and sort by date
    const salesData = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      revenue: Math.round(data.revenue * 100) / 100,
      invoiceCount: data.count
    })).sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });

    return NextResponse.json(salesData);
  } catch (error: any) {
    console.error('Error fetching sales data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales data' },
      { status: 500 }
    );
  }
}
