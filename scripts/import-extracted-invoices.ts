import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

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

// Extract invoice number from filename when PDF parsing fails
function extractInvoiceNumberFromFilename(pdfPath: string): string {
  const filename = path.basename(pdfPath);
  const patterns = [
    /RI-?(\d{4})/i,  // RI-1234 or RI1234
    /Invoice\s+RI-?(\d{4})/i,  // Livato Invoice RI1234
  ];
  for (const pattern of patterns) {
    const match = filename.match(pattern);
    if (match) return `RI-${match[1]}`;
  }
  return '';
}

// Extract customer location from filename (kalol, sotanala, perundurai, etc.)
function extractCustomerFromFilename(pdfPath: string): { customerId: number; state: string } {
  const filenameLower = path.basename(pdfPath).toLowerCase();
  if (filenameLower.includes('kalol')) return { customerId: 1, state: 'Gujarat' };
  if (filenameLower.includes('sotanala')) return { customerId: 2, state: 'Rajasthan' };
  if (filenameLower.includes('perun')) return { customerId: 4, state: 'Tamil Nadu' };
  if (filenameLower.includes('chennai')) return { customerId: 3, state: 'Tamil Nadu' };
  if (filenameLower.includes('kannod') || filenameLower.includes('indore') || filenameLower.includes('kehran')) {
    return { customerId: 1, state: 'Gujarat' };
  }
  return { customerId: 1, state: 'Gujarat' };  // Default
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
      'january': '01', 'jan': '01', 'february': '02', 'feb': '02', 'march': '03',
      'april': '04', 'may': '05', 'june': '06', 'july': '07', 'august': '08',
      'september': '09', 'october': '10', 'november': '11', 'december': '12', 'dec': '12'
    };
    const month = monthMap[monthName] || '01';
    return `${year}-${month}-15`;  // Use mid-month as default
  }

  // If path matching fails, default to 2022-12-01
  return '2023-01-15';
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
      itemName: 'Label - Requires Manual Entry',
      description: 'Data could not be extracted from PDF - please update manually',
      hsnCode: '48211020',
      quantity: 1,
      unit: 'NOS',
      unitPrice: subtotal || 1000,
      gstRate: Math.round(gstRate),
      amount: subtotal || 1000
    }
  ];
}

async function importAllInvoices() {
  console.log('Starting import of ALL discovered invoices...\n');

  // Read extracted data
  const dataPath = '/Users/mohanvemulakonda/projects/LivatoSolutions/scripts/extracted-invoices.json';
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const results = {
    imported: [] as { invoiceNumber: string; customerId: number; hasErrors: boolean }[],
    skipped: [] as { invoiceNumber: string; reason: string }[],
    errors: [] as { invoiceNumber: string; error: string }[]
  };

  let processed = 0;
  const totalInvoices = data.success.length;

  for (const invoice of data.success) {
    processed++;

    try {
      // Try to get invoice number from extraction or filename
      let invoiceNumber = invoice.invoiceNumber;
      if (!invoiceNumber) {
        invoiceNumber = extractInvoiceNumberFromFilename(invoice.pdfPath);
      }

      console.log(`[${processed}/${totalInvoices}] Processing: ${invoiceNumber || 'NO-NUMBER'} - ${path.basename(invoice.pdfPath)}`);

      // Skip if still no invoice number
      if (!invoiceNumber) {
        console.log('  ⊗ Skipped: Cannot extract invoice number from filename');
        results.skipped.push({
          invoiceNumber: path.basename(invoice.pdfPath),
          reason: 'Cannot extract invoice number'
        });
        continue;
      }

      // Check if invoice already exists
      const existingInvoice = await prisma.invoice.findUnique({
        where: { invoiceNumber: invoiceNumber }
      });

      if (existingInvoice) {
        console.log('  ⊗ Skipped: Invoice already exists');
        results.skipped.push({ invoiceNumber: invoiceNumber, reason: 'Invoice already exists' });
        continue;
      }

      // Match customer - use extracted data if available, otherwise filename
      let customerId: number;
      let placeOfSupply: string;

      if (invoice.customerName && invoice.customerName !== 'Unknown Customer') {
        customerId = await matchCustomer(invoice);
        placeOfSupply = invoice.placeOfSupply || invoice.customerState || 'Gujarat';
      } else {
        const fileInfo = extractCustomerFromFilename(invoice.pdfPath);
        customerId = fileInfo.customerId;
        placeOfSupply = fileInfo.state;
      }

      // Get dates - use extracted if available, otherwise from path
      let createdAt: string;
      let dueDate: string;

      if (invoice.createdAt && !invoice.createdAt.includes('202-')) {
        createdAt = invoice.createdAt;
        dueDate = invoice.dueDate || invoice.createdAt;
      } else {
        createdAt = fixDate(invoice.createdAt, invoice.pdfPath);
        dueDate = fixDate(invoice.dueDate, invoice.pdfPath);
      }

      // Get items (create placeholder if missing)
      const items = createPlaceholderItems(invoice);

      // Get customer name
      const customerName = invoice.customerName && invoice.customerName !== 'Unknown Customer'
        ? invoice.customerName
        : 'MYK Laticrete';

      // Determine if this invoice needs manual review
      const hasExtractionErrors = invoice.extractionErrors.length > 0;
      const needsReview = hasExtractionErrors || items[0]?.itemName === 'Label - Requires Manual Entry';

      // Create invoice with items
      await prisma.invoice.create({
        data: {
          invoiceNumber: invoiceNumber,
          type: 'INVOICE',
          status: 'DRAFT',
          createdAt: new Date(createdAt),
          dueDate: new Date(dueDate),
          paymentTerms: invoice.paymentTerms || 'Net 15',
          customer: { connect: { id: customerId } },
          customerName: customerName,
          customerEmail: invoice.customerEmail || '',
          customerGstNumber: invoice.customerGstNumber || '',
          placeOfSupply: placeOfSupply,
          subtotal: invoice.subtotal || items[0].amount,
          cgstAmount: invoice.cgstAmount || 0,
          sgstAmount: invoice.sgstAmount || 0,
          igstAmount: invoice.igstAmount || 0,
          totalTax: invoice.totalTax || 0,
          discountAmount: 0,
          total: invoice.total || items[0].amount,
          notes: needsReview ? `NEEDS MANUAL REVIEW - Imported from ${path.basename(invoice.pdfPath)} with incomplete data extraction. Please verify all fields.` : (invoice.notes || 'Imported from PDF'),
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

      const status = needsReview ? '⚠ Imported (needs review)' : '✓ Imported';
      console.log(`  ${status}: ${invoiceNumber} -> Customer ID ${customerId}`);
      if (invoice.extractionErrors.length > 0) {
        console.log(`    Issues: ${invoice.extractionErrors.slice(0, 3).join(', ')}`);
      }

      results.imported.push({ invoiceNumber, customerId, hasErrors: needsReview });
    } catch (err: any) {
      console.log(`  ✗ Failed: ${err.message}`);
      results.errors.push({ invoiceNumber: invoice.invoiceNumber || path.basename(invoice.pdfPath), error: err.message });
    }

    if (processed % 20 === 0) {
      console.log(`\nProgress: ${processed}/${totalInvoices}\n`);
    }
  }

  // Save results
  const resultsPath = '/Users/mohanvemulakonda/projects/LivatoSolutions/scripts/import-extracted-results.json';
  fs.writeFileSync(resultsPath, JSON.stringify({
    ...results,
    summary: {
      total: totalInvoices,
      imported: results.imported.length,
      needsReview: results.imported.filter(i => i.hasErrors).length,
      complete: results.imported.filter(i => !i.hasErrors).length,
      skipped: results.skipped.length,
      errors: results.errors.length
    }
  }, null, 2));

  console.log('\n' + '='.repeat(80));
  console.log('IMPORT COMPLETE');
  console.log('='.repeat(80));
  console.log(`Total invoices: ${totalInvoices}`);
  console.log(`Imported: ${results.imported.length}`);
  console.log(`  - Complete data: ${results.imported.filter(i => !i.hasErrors).length}`);
  console.log(`  - Needs review: ${results.imported.filter(i => i.hasErrors).length}`);
  console.log(`Skipped: ${results.skipped.length}`);
  console.log(`Errors: ${results.errors.length}`);
  console.log(`Success rate: ${((results.imported.length / totalInvoices) * 100).toFixed(1)}%`);
  console.log('='.repeat(80));
  console.log(`\nResults saved to: ${resultsPath}`);

  await prisma.$disconnect();
}

// Run import
importAllInvoices()
  .then(() => process.exit(0))
  .catch((err) => { console.error('Fatal error:', err); process.exit(1); });
