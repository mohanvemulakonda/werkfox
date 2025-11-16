import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import prisma from '../lib/prisma';
import fs from 'fs';
import path from 'path';

interface CustomerContact {
  companyName: string;
  displayName?: string;
  email: string;
  phone?: string;
  gstNumber?: string;
  state?: string;
  billingAddress?: string;
  shippingAddress?: string;
  invoiceCount: number;
  totalRevenue: number;
  firstInvoiceDate: Date;
  lastInvoiceDate: Date;
}

async function extractCustomerContacts() {
  console.log('\n📇 Extracting Customer Contacts from Invoices\n');

  // Get all invoices with customer data
  const invoices = await prisma.invoice.findMany({
    select: {
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      customerGstNumber: true,
      customerState: true,
      billingAddress: true,
      shippingAddress: true,
      total: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  console.log(`Found ${invoices.length} invoices to process\n`);

  // Group by customer email (unique identifier)
  const customerMap = new Map<string, CustomerContact>();

  invoices.forEach(invoice => {
    const email = invoice.customerEmail.toLowerCase().trim();

    if (!customerMap.has(email)) {
      customerMap.set(email, {
        companyName: invoice.customerName,
        email: invoice.customerEmail,
        phone: invoice.customerPhone || undefined,
        gstNumber: invoice.customerGstNumber || undefined,
        state: invoice.customerState || undefined,
        billingAddress: invoice.billingAddress || undefined,
        shippingAddress: invoice.shippingAddress || undefined,
        invoiceCount: 0,
        totalRevenue: 0,
        firstInvoiceDate: invoice.createdAt,
        lastInvoiceDate: invoice.createdAt
      });
    }

    const customer = customerMap.get(email)!;
    customer.invoiceCount++;
    customer.totalRevenue += Number(invoice.total);

    // Update last invoice date
    if (invoice.createdAt > customer.lastInvoiceDate) {
      customer.lastInvoiceDate = invoice.createdAt;
    }

    // Update contact info if current invoice has more details
    if (invoice.customerPhone && !customer.phone) {
      customer.phone = invoice.customerPhone;
    }
    if (invoice.customerGstNumber && !customer.gstNumber) {
      customer.gstNumber = invoice.customerGstNumber;
    }
  });

  // Convert to array and sort by total revenue
  const customers = Array.from(customerMap.values()).sort(
    (a, b) => b.totalRevenue - a.totalRevenue
  );

  // Create summary report
  console.log('📊 CUSTOMER CONTACT SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Unique Customers: ${customers.length}`);
  console.log(`Total Revenue: ₹${customers.reduce((sum, c) => sum + c.totalRevenue, 0).toLocaleString('en-IN')}`);
  console.log(`Average Revenue per Customer: ₹${(customers.reduce((sum, c) => sum + c.totalRevenue, 0) / customers.length).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`);
  console.log('='.repeat(80));

  // Top 10 customers by revenue
  console.log('\n💰 TOP 10 CUSTOMERS BY REVENUE:\n');
  customers.slice(0, 10).forEach((customer, index) => {
    console.log(`${index + 1}. ${customer.companyName}`);
    console.log(`   Email: ${customer.email}`);
    console.log(`   Revenue: ₹${customer.totalRevenue.toLocaleString('en-IN')} (${customer.invoiceCount} invoices)`);
    console.log(`   ${customer.phone ? 'Phone: ' + customer.phone : 'No phone'}`);
    console.log(`   ${customer.gstNumber ? 'GST: ' + customer.gstNumber : 'No GST'}`);
    console.log(`   ${customer.state || 'State not specified'}`);
    console.log('');
  });

  // Export to JSON
  const exportPath = path.join(process.cwd(), 'scripts', 'customer-contacts-export.json');
  fs.writeFileSync(exportPath, JSON.stringify(customers, null, 2));
  console.log(`\n✅ Customer contacts exported to: ${exportPath}\n`);

  // Export to CSV for easy import to CRM/Email tools
  const csvPath = path.join(process.cwd(), 'scripts', 'customer-contacts-export.csv');
  const csvHeaders = 'Company Name,Email,Phone,GST Number,State,Invoice Count,Total Revenue,First Invoice,Last Invoice\n';
  const csvRows = customers.map(c =>
    `"${c.companyName}","${c.email}","${c.phone || ''}","${c.gstNumber || ''}","${c.state || ''}",${c.invoiceCount},${c.totalRevenue},"${c.firstInvoiceDate.toISOString().split('T')[0]}","${c.lastInvoiceDate.toISOString().split('T')[0]}"`
  ).join('\n');
  fs.writeFileSync(csvPath, csvHeaders + csvRows);
  console.log(`✅ Customer contacts exported to CSV: ${csvPath}\n`);

  // Print statistics
  console.log('\n📈 STATISTICS:\n');
  console.log(`Customers with GST: ${customers.filter(c => c.gstNumber).length}`);
  console.log(`Customers with phone: ${customers.filter(c => c.phone).length}`);
  console.log(`Customers with 1 invoice: ${customers.filter(c => c.invoiceCount === 1).length}`);
  console.log(`Customers with 2-5 invoices: ${customers.filter(c => c.invoiceCount >= 2 && c.invoiceCount <= 5).length}`);
  console.log(`Customers with 6-10 invoices: ${customers.filter(c => c.invoiceCount >= 6 && c.invoiceCount <= 10).length}`);
  console.log(`Customers with 10+ invoices: ${customers.filter(c => c.invoiceCount > 10).length}`);

  // State distribution
  const stateDistribution = customers.reduce((acc, c) => {
    const state = c.state || 'Unknown';
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\n📍 CUSTOMER DISTRIBUTION BY STATE:\n');
  Object.entries(stateDistribution)
    .sort((a, b) => b[1] - a[1])
    .forEach(([state, count]) => {
      console.log(`${state}: ${count} customers`);
    });

  console.log('\n' + '='.repeat(80) + '\n');

  await prisma.$disconnect();
}

extractCustomerContacts()
  .then(() => {
    console.log('✅ Customer contact extraction completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Extraction failed:', error);
    process.exit(1);
  });
