import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

config({ path: resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

async function exportMissing() {
  const invoices = await prisma.invoice.findMany({
    where: {
      total: {
        lte: 1000
      }
    },
    select: {
      invoiceNumber: true,
      createdAt: true,
      total: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  // Create CSV
  let csv = 'Invoice Number,Current Date,Current Amount,New Amount (Fill This)\n';
  
  invoices.forEach(inv => {
    const date = inv.createdAt.toISOString().split('T')[0];
    csv += inv.invoiceNumber + ',' + date + ',' + inv.total + ',\n';
  });

  fs.writeFileSync('invoices-to-update.csv', csv);
  
  console.log('Exported ' + invoices.length + ' invoices to invoices-to-update.csv');
  console.log('\nInstructions:');
  console.log('1. Open invoices-to-update.csv');
  console.log('2. Fill in the "New Amount" column with correct amounts from your PDFs');
  console.log('3. Save the file');
  console.log('4. Run the update script to import the amounts');

  await prisma.$disconnect();
}

exportMissing();
