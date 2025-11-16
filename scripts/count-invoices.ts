import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

async function count() {
  const total = await prisma.invoice.count();
  console.log('Total invoices in database:', total);
  await prisma.$disconnect();
}

count();
