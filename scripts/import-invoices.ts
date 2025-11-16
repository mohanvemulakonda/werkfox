/**
 * Invoice Import Script
 *
 * This script imports historical invoices from a CSV file into the database.
 *
 * CSV Format Expected:
 * invoiceNumber,date,customerName,customerEmail,customerPhone,customerState,customerGstNumber,type,status,subtotal,cgst,sgst,igst,total,notes,paymentTerms
 * INV210001,2021-01-15,ABC Company,abc@example.com,9876543210,Karnataka,29XXXXX1234X1Z1,INVOICE,PAID,10000,900,900,0,11800,First invoice,Net 30
 *
 * Items CSV Format (separate file or embedded):
 * invoiceNumber,itemName,description,hsnCode,quantity,unit,unitPrice,gstRate
 * INV210001,Product A,Description,12345678,10,Nos,1000,18
 *
 * Usage:
 * 1. Prepare your CSV file with the above format
 * 2. Place it in the project root as 'invoices-import.csv' and 'invoice-items-import.csv'
 * 3. Run: npx ts-node scripts/import-invoices.ts
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface InvoiceRow {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerState: string;
  customerGstNumber?: string;
  companyState?: string;
  companyGstNumber?: string;
  type: 'QUOTE' | 'PROFORMA' | 'INVOICE';
  status: 'DRAFT' | 'SENT' | 'PAID' | 'PARTIALLY_PAID' | 'OVERDUE' | 'CANCELLED';
  subtotal: number;
  discountAmount?: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
  notes?: string;
  paymentTerms?: string;
  paidAmount?: number;
  billingAddress?: string;
  shippingAddress?: string;
  placeOfSupply?: string;
}

interface ItemRow {
  invoiceNumber: string;
  itemName: string;
  description?: string;
  hsnCode?: string;
  quantity: number;
  unit?: string;
  unitPrice: number;
  discount?: number;
  gstRate: number;
}

// Simple CSV parser (for basic CSV files)
function parseCSV(content: string): any[] {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });
}

async function importInvoices() {
  try {
    console.log('Starting invoice import...\n');

    // Read CSV files
    const invoicesPath = path.join(process.cwd(), 'invoices-import.csv');
    const itemsPath = path.join(process.cwd(), 'invoice-items-import.csv');

    if (!fs.existsSync(invoicesPath)) {
      throw new Error(`Invoice CSV file not found at: ${invoicesPath}`);
    }

    if (!fs.existsSync(itemsPath)) {
      throw new Error(`Items CSV file not found at: ${itemsPath}`);
    }

    const invoicesCSV = fs.readFileSync(invoicesPath, 'utf-8');
    const itemsCSV = fs.readFileSync(itemsPath, 'utf-8');

    const invoiceRows: InvoiceRow[] = parseCSV(invoicesCSV);
    const itemRows: ItemRow[] = parseCSV(itemsCSV);

    console.log(`Found ${invoiceRows.length} invoices to import`);
    console.log(`Found ${itemRows.length} items to import\n`);

    let successCount = 0;
    let errorCount = 0;

    // Import each invoice
    for (const row of invoiceRows) {
      try {
        // Get items for this invoice
        const invoiceItems = itemRows.filter(
          item => item.invoiceNumber === row.invoiceNumber
        );

        if (invoiceItems.length === 0) {
          console.warn(`⚠️  No items found for invoice ${row.invoiceNumber}, skipping...`);
          continue;
        }

        // Calculate totals
        const totalTax = Number(row.cgst) + Number(row.sgst) + Number(row.igst);

        // Check if invoice already exists
        const existing = await prisma.invoice.findUnique({
          where: { invoiceNumber: row.invoiceNumber }
        });

        if (existing) {
          console.log(`⏭️  Invoice ${row.invoiceNumber} already exists, skipping...`);
          continue;
        }

        // Create invoice with items
        await prisma.invoice.create({
          data: {
            invoiceNumber: row.invoiceNumber,
            type: row.type,
            status: row.status,

            // Customer details
            customerName: row.customerName,
            customerEmail: row.customerEmail,
            customerPhone: row.customerPhone || null,
            customerState: row.customerState,
            customerGstNumber: row.customerGstNumber || null,
            billingAddress: row.billingAddress || null,
            shippingAddress: row.shippingAddress || null,
            placeOfSupply: row.placeOfSupply || row.customerState,

            // Company details
            companyState: row.companyState || 'Karnataka',
            companyGstNumber: row.companyGstNumber || '36AAIFL5524C1ZJ',

            // Amounts
            subtotal: Number(row.subtotal),
            discountAmount: Number(row.discountAmount || 0),
            cgstAmount: Number(row.cgst),
            sgstAmount: Number(row.sgst),
            igstAmount: Number(row.igst),
            totalTax: totalTax,
            total: Number(row.total),
            paidAmount: row.paidAmount ? Number(row.paidAmount) : null,

            // Dates
            createdAt: new Date(row.date),
            updatedAt: new Date(row.date),
            ...(row.status === 'PAID' ? { paidAt: new Date(row.date) } : {}),
            ...(row.status === 'SENT' ? { sentAt: new Date(row.date) } : {}),

            // Other details
            notes: row.notes || null,
            paymentTerms: row.paymentTerms || null,

            // Items
            items: {
              create: invoiceItems.map(item => {
                const quantity = Number(item.quantity);
                const unitPrice = Number(item.unitPrice);
                const discount = Number(item.discount || 0);
                const gstRate = Number(item.gstRate);

                // Calculate item totals
                const taxableAmount = (quantity * unitPrice) - discount;
                const gstAmount = (taxableAmount * gstRate) / 100;

                // Determine if CGST+SGST or IGST
                const isSameState = row.customerState === (row.companyState || 'Karnataka');
                const cgst = isSameState ? gstAmount / 2 : 0;
                const sgst = isSameState ? gstAmount / 2 : 0;
                const igst = isSameState ? 0 : gstAmount;

                return {
                  itemName: item.itemName,
                  description: item.description || null,
                  hsnCode: item.hsnCode || null,
                  quantity: quantity,
                  unit: item.unit || 'Nos',
                  unitPrice: unitPrice,
                  discount: discount,
                  gstRate: gstRate,
                  taxableAmount: taxableAmount,
                  cgst: cgst,
                  sgst: sgst,
                  igst: igst,
                  total: taxableAmount + gstAmount
                };
              })
            }
          }
        });

        successCount++;
        console.log(`✅ Imported invoice ${row.invoiceNumber} (${invoiceItems.length} items)`);

      } catch (error: any) {
        errorCount++;
        console.error(`❌ Error importing invoice ${row.invoiceNumber}:`, error.message);
      }
    }

    console.log(`\n📊 Import Summary:`);
    console.log(`   ✅ Successfully imported: ${successCount} invoices`);
    console.log(`   ❌ Failed: ${errorCount} invoices`);
    console.log(`   ⏭️  Skipped: ${invoiceRows.length - successCount - errorCount} invoices\n`);

  } catch (error) {
    console.error('Fatal error during import:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
importInvoices()
  .then(() => {
    console.log('Import completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  });
