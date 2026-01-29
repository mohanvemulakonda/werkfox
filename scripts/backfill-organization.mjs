import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting tenancy backfill...');

  const org = await prisma.organization.upsert({
    where: { slug: 'default' },
    update: {},
    create: {
      name: 'Default Organization',
      slug: 'default',
    },
  });

  console.log(`Using organization id=${org.id} slug=${org.slug}`);

  const results = {};

  results.customers = await prisma.customer.updateMany({
    where: { organizationId: null },
    data: { organizationId: org.id },
  });

  results.leads = await prisma.lead.updateMany({
    where: { organizationId: null },
    data: { organizationId: org.id },
  });

  results.products = await prisma.product.updateMany({
    where: { organizationId: null },
    data: { organizationId: org.id },
  });

  results.invoices = await prisma.invoice.updateMany({
    where: { organizationId: null },
    data: { organizationId: org.id },
  });

  results.opportunities = await prisma.opportunity.updateMany({
    where: { organizationId: null },
    data: { organizationId: org.id },
  });

  results.quoteRequests = await prisma.quoteRequest.updateMany({
    where: { organizationId: null },
    data: { organizationId: org.id },
  });

  console.log('Backfill results:', results);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
