import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

config({ path: resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

async function bulkUpdate() {
  const csvPath = resolve(process.cwd(), 'invoices-to-update.csv');

  if (!fs.existsSync(csvPath)) {
    console.log('ERROR: invoices-to-update.csv not found!');
    console.log('Please run: npx tsx scripts/export-missing-amounts.ts first');
    return;
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n').slice(1); // Skip header

  let updated = 0;
  let skipped = 0;

  console.log('Starting bulk update...\n');

  for (const line of lines) {
    if (!line.trim()) continue;

    const [invoiceNumber, date, currentAmount, newAmount] = line.split(',').map(s => s.trim());

    if (!newAmount || newAmount === '' || isNaN(Number(newAmount))) {
      console.log('Skipped ' + invoiceNumber + ': No new amount provided');
      skipped++;
      continue;
    }

    const amount = Number(newAmount);

    try {
      await prisma.invoice.update({
        where: { invoiceNumber: invoiceNumber },
        data: {
          total: amount,
          subtotal: Math.round(amount / 1.18), // Estimate subtotal (assuming 18% GST)
          totalTax: Math.round(amount - (amount / 1.18))
        }
      });

      console.log('✓ Updated ' + invoiceNumber + ': Rs ' + amount);
      updated++;
    } catch (err: any) {
      console.log('✗ Failed ' + invoiceNumber + ': ' + err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('Bulk Update Complete');
  console.log('='.repeat(60));
  console.log('Updated: ' + updated);
  console.log('Skipped: ' + skipped);
  console.log('='.repeat(60));

  await prisma.$disconnect();
}

bulkUpdate();
