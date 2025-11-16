import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

async function check() {
  // Get all invoices grouped by year
  const allInvoices = await prisma.invoice.findMany({
    select: {
      invoiceNumber: true,
      createdAt: true,
      total: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  const byYear: any = {};
  
  allInvoices.forEach(inv => {
    const year = inv.createdAt.getFullYear();
    if (!byYear[year]) {
      byYear[year] = { count: 0, total: 0, goodData: 0, badData: 0 };
    }
    byYear[year].count++;
    byYear[year].total += inv.total;
    
    // Check if data looks valid (not placeholder)
    if (inv.total > 1000) {
      byYear[year].goodData++;
    } else {
      byYear[year].badData++;
    }
  });

  console.log('Invoice Summary by Year:');
  console.log('='.repeat(70));
  
  Object.keys(byYear).sort().forEach(year => {
    const data = byYear[year];
    console.log('\n' + year + ':');
    console.log('  Total invoices: ' + data.count);
    console.log('  With good data (>Rs1000): ' + data.goodData);
    console.log('  With placeholder/bad data: ' + data.badData);
    console.log('  Total revenue: Rs ' + Math.round(data.total));
    if (data.goodData > 0) {
      console.log('  Avg per good invoice: Rs ' + Math.round(data.total / data.goodData));
    }
  });
  
  console.log('\n' + '='.repeat(70));
  console.log('\nPROBLEM: ' + Object.values(byYear).reduce((sum: any, y: any) => sum + y.badData, 0) + ' invoices need correct amounts for accurate trend analysis');

  await prisma.$disconnect();
}

check();
