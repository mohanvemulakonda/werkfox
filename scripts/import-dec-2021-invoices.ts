import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import prisma from '../lib/prisma';
import invoicesData from './import-dec-2021-invoices.json';

interface InvoiceItemData {
  itemName: string;
  description: string;
  hsnCode: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  gstRate: number;
  amount: number;
}

interface InvoiceData {
  invoiceNumber: string;
  type: 'INVOICE' | 'QUOTE' | 'PROFORMA';
  status: 'DRAFT' | 'PAID' | 'SENT';
  createdAt: string;
  dueDate: string;
  paymentTerms: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  billingAddress: string;
  shippingAddress: string;
  customerGstNumber: string;
  customerState: string;
  placeOfSupply: string;
  companyState: string;
  subtotal: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalTax: number;
  total: number;
  paidAmount?: number;
  notes: string;
  items: InvoiceItemData[];
}

async function findOrCreateCustomer(invoiceData: InvoiceData) {
  // Try to find existing customer by email or GST number
  let customer = null;

  if (invoiceData.customerEmail) {
    customer = await prisma.customer.findFirst({
      where: {
        email: invoiceData.customerEmail
      }
    });
  }

  if (!customer && invoiceData.customerGstNumber) {
    customer = await prisma.customer.findFirst({
      where: {
        gstNumber: invoiceData.customerGstNumber
      }
    });
  }

  if (customer) {
    console.log(`  ✓ Found existing customer: ${customer.companyName} (ID: ${customer.id})`);
    return customer;
  }

  // Create new customer
  const customerCode = `CUST-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  // Parse address to extract city and pincode
  const billingLines = invoiceData.billingAddress.split('\n');
  const lastLine = billingLines[billingLines.length - 1] || '';

  const newCustomer = await prisma.customer.create({
    data: {
      customerCode,
      companyName: invoiceData.customerName,
      displayName: invoiceData.customerName,
      email: invoiceData.customerEmail || `noemail-${customerCode}@placeholder.com`,
      phone: invoiceData.customerPhone || null,
      gstNumber: invoiceData.customerGstNumber || null,
      gstType: invoiceData.customerGstNumber ? 'REGISTERED' : 'UNREGISTERED',
      billingAddress: invoiceData.billingAddress,
      billingState: invoiceData.customerState,
      billingCountry: lastLine.toLowerCase().includes('india') ? 'India' : 'India',
      shippingAddress: invoiceData.shippingAddress,
      shippingState: invoiceData.customerState,
      shippingCountry: lastLine.toLowerCase().includes('india') ? 'India' : 'India',
      paymentTerms: invoiceData.paymentTerms,
      isActive: true,
    }
  });

  console.log(`  ✓ Created new customer: ${newCustomer.companyName} (ID: ${newCustomer.id})`);
  return newCustomer;
}

async function importInvoices() {
  console.log('\n📦 Starting Invoice Import - December 2021\n');
  console.log(`Total invoices to import: ${invoicesData.length}\n`);

  let successCount = 0;
  let errorCount = 0;
  const errors: Array<{ invoice: string; error: string }> = [];

  for (const invoiceData of invoicesData as InvoiceData[]) {
    try {
      console.log(`\n📄 Processing Invoice: ${invoiceData.invoiceNumber}`);

      // Check if invoice already exists
      const existingInvoice = await prisma.invoice.findUnique({
        where: { invoiceNumber: invoiceData.invoiceNumber }
      });

      if (existingInvoice) {
        console.log(`  ⚠️  Invoice ${invoiceData.invoiceNumber} already exists, skipping...`);
        continue;
      }

      // Find or create customer
      const customer = await findOrCreateCustomer(invoiceData);

      // Create invoice
      const invoice = await prisma.invoice.create({
        data: {
          invoiceNumber: invoiceData.invoiceNumber,
          customerId: customer.id,
          customerName: invoiceData.customerName,
          customerEmail: invoiceData.customerEmail || customer.email,
          customerPhone: invoiceData.customerPhone || null,
          type: invoiceData.type as any,
          status: invoiceData.status as any,
          paymentTerms: invoiceData.paymentTerms,
          dueDate: new Date(invoiceData.dueDate),
          createdAt: new Date(invoiceData.createdAt),
          billingAddress: invoiceData.billingAddress,
          shippingAddress: invoiceData.shippingAddress,
          customerGstNumber: invoiceData.customerGstNumber || null,
          customerState: invoiceData.customerState,
          placeOfSupply: invoiceData.placeOfSupply,
          companyState: invoiceData.companyState,
          subtotal: invoiceData.subtotal,
          cgstAmount: invoiceData.cgstAmount,
          sgstAmount: invoiceData.sgstAmount,
          igstAmount: invoiceData.igstAmount,
          totalTax: invoiceData.totalTax,
          total: invoiceData.total,
          paidAmount: invoiceData.paidAmount || null,
          paidAt: invoiceData.status === 'PAID' && invoiceData.paidAmount ? new Date(invoiceData.createdAt) : null,
          notes: invoiceData.notes || null,
          items: {
            create: invoiceData.items.map(item => {
              const isInterState = invoiceData.customerState !== invoiceData.companyState;
              const taxableAmount = item.amount;
              const totalGst = (taxableAmount * item.gstRate) / 100;

              let cgst = 0, sgst = 0, igst = 0;
              if (isInterState) {
                igst = totalGst;
              } else {
                cgst = totalGst / 2;
                sgst = totalGst / 2;
              }

              return {
                itemName: item.itemName,
                description: item.description || null,
                hsnCode: item.hsnCode || null,
                quantity: item.quantity,
                unit: item.unit,
                unitPrice: item.unitPrice,
                discount: 0,
                discountType: 'percentage',
                taxableAmount,
                gstRate: item.gstRate,
                cgst,
                sgst,
                igst,
                total: taxableAmount + totalGst
              };
            })
          }
        },
        include: {
          items: true
        }
      });

      console.log(`  ✅ Successfully imported invoice ${invoiceData.invoiceNumber}`);
      console.log(`     Customer: ${invoiceData.customerName}`);
      console.log(`     Amount: ₹${invoiceData.total.toLocaleString('en-IN')}`);
      console.log(`     Items: ${invoiceData.items.length}`);
      successCount++;

    } catch (error: any) {
      console.error(`  ❌ Error importing invoice ${invoiceData.invoiceNumber}:`, error.message);
      errors.push({
        invoice: invoiceData.invoiceNumber,
        error: error.message
      });
      errorCount++;
    }
  }

  // Print summary
  console.log('\n\n' + '='.repeat(60));
  console.log('📊 IMPORT SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully imported: ${successCount} invoices`);
  console.log(`❌ Failed to import: ${errorCount} invoices`);
  console.log(`📦 Total processed: ${invoicesData.length} invoices`);

  if (errors.length > 0) {
    console.log('\n❌ ERRORS:');
    errors.forEach(e => {
      console.log(`   - ${e.invoice}: ${e.error}`);
    });
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

// Run the import
importInvoices()
  .then(() => {
    console.log('✅ Import process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Import process failed:', error);
    process.exit(1);
  });
