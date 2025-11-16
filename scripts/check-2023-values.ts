import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

async function check() {
  const invoices2023 = await prisma.invoice.findMany({
    where: {
      createdAt: {
        gte: new Date('2023-01-01'),
        lt: new Date('2024-01-01')
      }
    },
    select: {
      invoiceNumber: true,
      total: true,
      subtotal: true,
      notes: true
    },
    orderBy: {
      invoiceNumber: 'asc'
    }
  });

  console.log('Total 2023 invoices:', invoices2023.length);
  console.log('');

  const withPlaceholder = invoices2023.filter(i => i.total === 1000);
  const withActualData = invoices2023.filter(i => i.total !== 1000);

  console.log('With placeholder (Rs 1000):', withPlaceholder.length);
  console.log('With actual data:', withActualData.length);
  console.log('');

  if (withActualData.length > 0) {
    console.log('Sample invoices with actual data:');
    withActualData.slice(0, 5).forEach(inv => {
      console.log('  ' + inv.invoiceNumber + ': Rs ' + inv.total);
    });

    const total2023 = withActualData.reduce((sum, inv) => sum + inv.total, 0);
    console.log('');
    console.log('Total from ' + withActualData.length + ' invoices with data: Rs ' + total2023);
    console.log('Average per invoice: Rs ' + Math.round(total2023 / withActualData.length));
  }

  console.log('');
  console.log('Invoices needing manual review (first 10):');
  withPlaceholder.slice(0, 10).forEach(inv => {
    console.log('  ' + inv.invoiceNumber);
  });

  await prisma.$disconnect();
}

check();
