import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

interface InvoiceItem {
  itemName: string;
  description: string;
  hsnCode: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  gstRate: number;
  amount: number;
}

interface ExtractedInvoice {
  invoiceNumber: string;
  type: string;
  status: string;
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
  notes: string;
  items: InvoiceItem[];
  pdfPath: string;
  extractionErrors: string[];
}

// Helper function to fix malformed dates (e.g., "202-02-01" -> "2022-12-01")
function fixDate(dateStr: string, pdfPath: string): string {
  // Extract date from PDF path
  // e.g., /2022/December/sale/RI-1683-kalol.pdf or /2023/APRIL/sale/RI-1697-kalol.pdf
  const pathMatch = pdfPath.match(/\/(\d{4})\/(\w+)\//);
  if (pathMatch) {
    const year = pathMatch[1];
    const monthName = pathMatch[2].toLowerCase();
    const monthMap: { [key: string]: string } = {
      'january': '01', 'february': '02', 'march': '03', 'april': '04',
      'may': '05', 'june': '06', 'july': '07', 'august': '08',
      'september': '09', 'october': '10', 'november': '11', 'december': '12'
    };
    const month = monthMap[monthName] || '01';
    return `${year}-${month}-01`;
  }

  // If path matching fails, default to 2022-12-01
  return '2022-12-01';
}

// Helper function to match customer
async function matchCustomer(invoice: ExtractedInvoice): Promise<number> {
  // Try to match by state for MYK Laticrete
  const customerName = invoice.customerName.toUpperCase();

  if (customerName.includes('MYK LATICRETE') || customerName.includes('MYK') || invoice.customerState) {
    // Match by state
    if (invoice.customerState === 'Rajasthan') {
      return 2; // MYK Laticrete - Behror
    } else if (invoice.customerState === 'Tamil Nadu') {
      // Check if it's Perundurai or Chennai from address
      if (invoice.billingAddress.toUpperCase().includes('PERUND')) {
        return 4; // MYK Laticrete - Perundurai
      }
      return 3; // MYK Laticrete - Chennai
    } else if (invoice.customerState === 'Gujarat') {
      return 1; // MYK Laticrete (main)
    }
  }

  // Default to MYK Laticrete main account
  return 1;
}

// Helper function to create placeholder line items if missing
function createPlaceholderItems(invoice: ExtractedInvoice): InvoiceItem[] {
  if (invoice.items.length > 0) {
    return invoice.items;
  }

  // Create a single placeholder item with the total amount
  const subtotal = invoice.subtotal || invoice.total;
  const gstRate = invoice.totalTax > 0 ? (invoice.totalTax / subtotal) * 100 : 18;

  return [
    {
      itemName: 'Label - Manual Import',
      description: 'Item details not extracted - needs manual review',
      hsnCode: '48211020',
      quantity: 1,
      unit: 'NOS',
      unitPrice: subtotal,
      gstRate: Math.round(gstRate),
      amount: subtotal
    }
  ];
}

async function importShopifyInvoices() {
  console.log('Starting Shopify invoice import...\n');

  // Read extracted data
  const dataPath = '/Users/mohanvemulakonda/projects/LivatoSolutions/scripts/extracted-shopify-invoices.json';
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const results = {
    imported: [] as { invoiceNumber: string; customerId: number }[],
    skipped: [] as { invoiceNumber: string; reason: string }[],
    errors: [] as { invoiceNumber: string; error: string }[]
  };

  let processed = 0;
  const totalInvoices = data.success.length;

  for (const invoice of data.success) {
    processed++;

    try {
      console.log(`[${processed}/${totalInvoices}] Processing: ${invoice.invoiceNumber || 'NO-NUMBER'}`);

      // Skip if no invoice number
      if (!invoice.invoiceNumber) {
        console.log('  ⊗ Skipped: No invoice number');
        results.skipped.push({
          invoiceNumber: invoice.invoiceNumber,
          reason: `Extraction errors: ${invoice.extractionErrors.join(', ')}`
        });
        continue;
      }

      // Check if invoice already exists
      const existingInvoice = await prisma.invoice.findUnique({
        where: { invoiceNumber: invoice.invoiceNumber }
      });

      if (existingInvoice) {
        console.log('  ⊗ Skipped: Invoice already exists');
        results.skipped.push({
          invoiceNumber: invoice.invoiceNumber,
          reason: 'Invoice already exists'
        });
        continue;
      }

      // Match customer
      const customerId = await matchCustomer(invoice);

      // Fix dates
      const createdAt = fixDate(invoice.createdAt, invoice.pdfPath);
      const dueDate = fixDate(invoice.dueDate, invoice.pdfPath);

      // Get items (create placeholder if missing)
      const items = createPlaceholderItems(invoice);

      // Get customer name and email
      const customerName = invoice.customerName || 'MYK Laticrete';
      const customerEmail = invoice.customerEmail || '';

      // Create invoice with items
      await prisma.invoice.create({
        data: {
          invoiceNumber: invoice.invoiceNumber,
          type: 'INVOICE',
          status: 'DRAFT',
          createdAt: new Date(createdAt),
          dueDate: new Date(dueDate),
          paymentTerms: invoice.paymentTerms || 'Net 15',
          customer: {
            connect: { id: customerId }
          },
          customerName: customerName,
          customerEmail: customerEmail,
          customerGstNumber: invoice.customerGstNumber || '',
          placeOfSupply: invoice.placeOfSupply || invoice.customerState || 'Gujarat',
          subtotal: invoice.subtotal,
          cgstAmount: invoice.cgstAmount,
          sgstAmount: invoice.sgstAmount,
          igstAmount: invoice.igstAmount,
          totalTax: invoice.totalTax,
          discountAmount: 0,
          total: invoice.total,
          notes: invoice.notes || 'Imported from Shopify PDF - may need review',
          items: {
            create: items.map(item => ({
              itemName: item.itemName,
              description: item.description,
              hsnCode: item.hsnCode,
              quantity: item.quantity,
              unit: item.unit,
              unitPrice: item.unitPrice,
              gstRate: item.gstRate,
              taxableAmount: item.amount,
              total: item.amount
            }))
          }
        }
      });

      console.log(`  ✓ Imported: ${invoice.invoiceNumber} -> Customer ID ${customerId}`);
      if (invoice.extractionErrors.length > 0) {
        console.log(`    ⚠ Warnings: ${invoice.extractionErrors.join(', ')}`);
      }

      results.imported.push({
        invoiceNumber: invoice.invoiceNumber,
        customerId: customerId
      });

    } catch (err: any) {
      console.log(`  ✗ Failed: ${err.message}`);
      results.errors.push({
        invoiceNumber: invoice.invoiceNumber,
        error: err.message
      });
    }

    if (processed % 10 === 0) {
      console.log(`\nProgress: ${processed}/${totalInvoices}\n`);
    }
  }

  // Save results
  const resultsPath = '/Users/mohanvemulakonda/projects/LivatoSolutions/scripts/shopify-import-results.json';
  fs.writeFileSync(resultsPath, JSON.stringify({
    ...results,
    summary: {
      total: totalInvoices,
      imported: results.imported.length,
      skipped: results.skipped.length,
      errors: results.errors.length
    }
  }, null, 2));

  console.log('\n' + '='.repeat(80));
  console.log('SHOPIFY IMPORT COMPLETE');
  console.log('='.repeat(80));
  console.log(`Total invoices: ${totalInvoices}`);
  console.log(`Imported: ${results.imported.length}`);
  console.log(`Skipped: ${results.skipped.length}`);
  console.log(`Errors: ${results.errors.length}`);
  console.log(`Success rate: ${((results.imported.length / totalInvoices) * 100).toFixed(1)}%`);
  console.log('='.repeat(80));
  console.log(`\nResults saved to: ${resultsPath}`);

  await prisma.$disconnect();
  return results;
}

// Run import
importShopifyInvoices()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
