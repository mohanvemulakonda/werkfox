import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Starting import of invoice customers as contacts...\n');

  // Get all invoices with customer details
  const invoices = await prisma.invoice.findMany({
    select: {
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      billingAddress: true,
      customerGstNumber: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  console.log(`Found ${invoices.length} invoices`);

  // Group invoices by email to get unique customers
  const customerMap = new Map();

  for (const invoice of invoices) {
    const email = invoice.customerEmail?.toLowerCase();
    if (!email) continue;

    if (!customerMap.has(email)) {
      customerMap.set(email, {
        name: invoice.customerName,
        email: invoice.customerEmail,
        phone: invoice.customerPhone || '',
        company: invoice.customerName, // Assuming customer name is the company
        billingAddress: invoice.billingAddress || '',
        gstNumber: invoice.customerGstNumber || '',
        firstInvoiceDate: invoice.createdAt
      });
    }
  }

  console.log(`\nFound ${customerMap.size} unique customers\n`);

  let addedCount = 0;
  let skippedCount = 0;

  for (const [email, customer] of customerMap.entries()) {
    // Check if contact already exists
    const existingContact = await prisma.contact.findFirst({
      where: {
        email: email
      }
    });

    if (existingContact) {
      console.log(`⏭️  Skipping ${customer.name} (${email}) - already exists`);
      skippedCount++;
      continue;
    }

    // Create new contact from invoice customer
    await prisma.contact.create({
      data: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        company: customer.company,
        message: `Customer imported from invoices. First invoice: ${customer.firstInvoiceDate.toLocaleDateString()}`,
        source: 'invoice_import',
        status: 'NEW',
        createdAt: customer.firstInvoiceDate
      }
    });

    console.log(`✅ Added ${customer.name} (${email})`);
    addedCount++;
  }

  console.log('\n═══════════════════════════════════════');
  console.log(`✅ Import completed!`);
  console.log(`   Added: ${addedCount} contacts`);
  console.log(`   Skipped: ${skippedCount} contacts (already exist)`);
  console.log('═══════════════════════════════════════\n');
}

main()
  .catch((error) => {
    console.error('❌ Error importing contacts:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
