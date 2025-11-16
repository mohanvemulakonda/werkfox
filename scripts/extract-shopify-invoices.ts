import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';
import path from 'path';

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

// Extract text from PDF
async function extractTextFromPDF(pdfPath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(pdfPath);
  const typedArray = new Uint8Array(dataBuffer);
  const loadingTask = pdfjsLib.getDocument({ data: typedArray });
  const pdfDocument = await loadingTask.promise;

  let fullText = '';
  for (let i = 1; i <= pdfDocument.numPages; i++) {
    const page = await pdfDocument.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}

// Extract invoice number from Shopify format (e.g., "RI 16 9 7" -> "RI-1697")
function extractInvoiceNumber(text: string): string {
  // Pattern: INVOICE # RI 16 9 7 or similar with spaces
  const match = text.match(/INVOICE\s+#\s+RI\s+([\d\s]+)/i);
  if (match) {
    const digits = match[1].replace(/\s+/g, '');
    return `RI-${digits}`;
  }
  return '';
}

// Extract date from Shopify format (e.g., "202 3 - - 04 - 07" -> "2023-04-07")
function extractDate(text: string, label: string): string {
  const regex = new RegExp(`${label}\\s+(\\d{3,4})\\s*-?\\s*-?\\s*(\\d{1,2})\\s*-?\\s*(\\d{1,2})`, 'i');
  const match = text.match(regex);
  if (match) {
    const year = match[1].replace(/\s+/g, '');
    const month = match[2].replace(/\s+/g, '').padStart(2, '0');
    const day = match[3].replace(/\s+/g, '').padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
}

// Extract customer name
function extractCustomerName(text: string): string {
  // Look for "Bill TO:" followed by customer name
  const match = text.match(/BILL?\s+TO:?\s+([A-Z][A-Z\s&]+?)(?=\d{10}|\d{2}\s*-|\s+Ship|PLOT|State Code)/i);
  if (match) {
    return match[1].trim();
  }
  return '';
}

// Extract GST number
function extractGSTNumber(text: string): string {
  // Pattern: 24AAACL5557E1ZP or similar
  const match = text.match(/(\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[A-Z]{1}\d{1})/);
  return match ? match[1] : '';
}

// Extract phone
function extractPhone(text: string): string {
  const match = text.match(/(\d{10})/);
  return match ? match[1] : '';
}

// Extract state from state code
function extractState(text: string): string {
  const stateCodeMatch = text.match(/State Code:\s*(\d+)/);
  if (stateCodeMatch) {
    const stateCode = stateCodeMatch[1].replace(/\s+/g, '');
    const stateMap: { [key: string]: string } = {
      '24': 'Gujarat',
      '29': 'Karnataka',
      '36': 'Telangana',
      '33': 'Tamil Nadu',
      '8': 'Rajasthan',
      '08': 'Rajasthan',
      '27': 'Maharashtra',
      '19': 'West Bengal',
      '7': 'Delhi',
      '07': 'Delhi',
    };
    return stateMap[stateCode] || '';
  }
  return '';
}

// Extract billing/shipping address
function extractAddress(text: string, type: 'BILL' | 'SHIP'): string {
  const regex = new RegExp(`${type}\\s+TO:?\\s+.*?([A-Z][^]+?)(?=State Code|GSTIN|PLACE OF SUPPLY|INVOICE)`, 'is');
  const match = text.match(regex);
  if (match) {
    let address = match[1].trim();
    // Clean up
    address = address
      .replace(/\d{10}/g, '')
      .replace(/GSTIN:?[^\s]+/gi, '')
      .replace(/State Code:?\s*\d+/gi, '')
      .replace(/\s{2,}/g, '\n')
      .trim();
    return address;
  }
  return '';
}

// Extract amounts from Shopify format
function extractAmounts(text: string): {
  subtotal: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalTax: number;
  total: number;
} {
  const amounts = {
    subtotal: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount: 0,
    totalTax: 0,
    total: 0,
  };

  // SUBTOTAL 17 , 0 00.00
  const subtotalMatch = text.match(/SUBTOTAL\s+([\d\s,]+\.?\d*)/i);
  if (subtotalMatch) {
    amounts.subtotal = parseFloat(subtotalMatch[1].replace(/[\s,]/g, ''));
  }

  // TAX (18.0%) 3 , 06 0.00
  const taxMatch = text.match(/TAX\s*\(([\d.]+)%\)\s+([\d\s,]+\.?\d*)/i);
  if (taxMatch) {
    const taxAmount = parseFloat(taxMatch[2].replace(/[\s,]/g, ''));
    // Check if it's IGST or CGST/SGST based on text
    if (text.includes('IGST')) {
      amounts.igstAmount = taxAmount;
    } else {
      amounts.cgstAmount = taxAmount / 2;
      amounts.sgstAmount = taxAmount / 2;
    }
    amounts.totalTax = taxAmount;
  }

  // TOTAL 2 0,0 6 0.00
  const totalMatch = text.match(/TOTAL\s+([\d\s,]+\.?\d*)/i);
  if (totalMatch) {
    amounts.total = parseFloat(totalMatch[1].replace(/[\s,]/g, ''));
  }

  return amounts;
}

// Extract line items from Shopify format
function extractLineItems(text: string): InvoiceItem[] {
  const items: InvoiceItem[] = [];

  // Pattern: Item Description Quantity Unit Cost Line Total
  // Label (48211020) 50 mm X 50 mm... 10 0 , 000.0 0.17 17 , 0 00.00
  const itemRegex = /([A-Za-z\s]+)\s+\((\d{6,8})\)\s+([^]+?)\s+([\d\s,]+\.?\d*)\s+([\d.]+)\s+([\d\s,]+\.?\d*)/g;

  let match;
  while ((match = itemRegex.exec(text)) !== null) {
    try {
      const itemName = match[1].trim();
      const hsnCode = match[2];
      const description = match[3].trim();
      const quantity = parseFloat(match[4].replace(/[\s,]/g, ''));
      const unitPrice = parseFloat(match[5].replace(/[\s,]/g, ''));
      const amount = parseFloat(match[6].replace(/[\s,]/g, ''));

      // Extract GST rate from tax line
      const taxMatch = text.match(/TAX\s*\(([\d.]+)%\)/i);
      const gstRate = taxMatch ? parseFloat(taxMatch[1]) : 18;

      items.push({
        itemName,
        description,
        hsnCode,
        quantity,
        unit: 'NOS',
        unitPrice,
        gstRate,
        amount,
      });
    } catch (err) {
      console.error('Error parsing item:', err);
    }
  }

  return items;
}

// Extract notes
function extractNotes(text: string): string {
  const notesMatch = text.match(/NOTES\s+\/\s+MEMO\s+([^]+?)(?=SUBTOTAL|Item)/is);
  if (notesMatch) {
    return notesMatch[1].trim().replace(/\s+/g, ' ');
  }
  return '';
}

// Parse Shopify invoice
function parseShopifyInvoice(text: string, pdfPath: string): ExtractedInvoice {
  const errors: string[] = [];

  const invoiceNumber = extractInvoiceNumber(text);
  if (!invoiceNumber) errors.push('Invoice number not found');

  const createdAt = extractDate(text, 'INVOICE\\s+DATE');
  if (!createdAt) errors.push('Invoice date not found');

  const customerName = extractCustomerName(text);
  if (!customerName) errors.push('Customer name not found');

  const customerState = extractState(text);
  if (!customerState) errors.push('Customer state not found');

  const amounts = extractAmounts(text);
  const items = extractLineItems(text);

  if (items.length === 0) errors.push('No line items found');

  // Determine if inter-state or intra-state
  const companyState = 'Telangana'; // Livato is in Telangana
  const isInterState = customerState !== companyState;

  return {
    invoiceNumber,
    type: 'INVOICE',
    status: 'DRAFT',
    createdAt,
    dueDate: createdAt, // Use same date as created if not specified
    paymentTerms: 'Net 15',
    customerName,
    customerEmail: '',
    customerPhone: extractPhone(text),
    billingAddress: extractAddress(text, 'BILL'),
    shippingAddress: extractAddress(text, 'SHIP'),
    customerGstNumber: extractGSTNumber(text),
    customerState,
    placeOfSupply: customerState,
    companyState,
    subtotal: amounts.subtotal,
    cgstAmount: amounts.cgstAmount,
    sgstAmount: amounts.sgstAmount,
    igstAmount: amounts.igstAmount,
    totalTax: amounts.totalTax,
    total: amounts.total,
    notes: extractNotes(text),
    items,
    pdfPath,
    extractionErrors: errors,
  };
}

// Find all Shopify invoice PDFs
function findShopifyInvoicePDFs(baseDir: string): string[] {
  const pdfFiles: string[] = [];

  function scanDirectory(dir: string) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          if (!['Cancelled invoices', 'E-way', 'PO', 'po', 'purchase', 'Confidential', 'E-Way', 'e-way', 'Purchase'].includes(entry.name)) {
            scanDirectory(fullPath);
          }
        } else if (entry.isFile()) {
          // Match Shopify invoice patterns: RI-1234-name.pdf, RI-1234_name.pdf
          const isShopifyPDF = entry.name.match(/^RI-\d+[-_][A-Za-z]+.*\.pdf$/i);
          if (isShopifyPDF) {
            pdfFiles.push(fullPath);
          }
        }
      }
    } catch (err) {
      console.error(`Error scanning directory ${dir}:`, err);
    }
  }

  scanDirectory(baseDir);
  return pdfFiles.sort();
}

// Main extraction
async function extractShopifyInvoices(baseDir: string, outputFile: string) {
  console.log('Finding Shopify invoice PDFs...');
  const pdfFiles = findShopifyInvoicePDFs(baseDir);
  console.log(`Found ${pdfFiles.length} Shopify invoice PDFs\n`);

  const result = {
    success: [] as ExtractedInvoice[],
    failed: [] as { path: string; error: string }[],
  };

  let processed = 0;

  for (const pdfPath of pdfFiles) {
    processed++;
    const fileName = path.basename(pdfPath);

    try {
      console.log(`[${processed}/${pdfFiles.length}] Processing: ${fileName}`);

      const text = await extractTextFromPDF(pdfPath);
      const invoice = parseShopifyInvoice(text, pdfPath);

      result.success.push(invoice);

      if (invoice.extractionErrors.length > 0) {
        console.log(`  ⚠ Warnings: ${invoice.extractionErrors.join(', ')}`);
      } else {
        console.log(`  ✓ Extracted: ${invoice.invoiceNumber} - ${invoice.customerName}`);
      }
    } catch (err: any) {
      console.log(`  ✗ Failed: ${err.message}`);
      result.failed.push({
        path: pdfPath,
        error: err.message,
      });
    }

    if (processed % 10 === 0) {
      console.log(`\nProgress: ${processed}/${pdfFiles.length}\n`);
    }
  }

  // Save results
  console.log('\nSaving results to:', outputFile);
  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));

  console.log('\n' + '='.repeat(80));
  console.log('SHOPIFY EXTRACTION COMPLETE');
  console.log('='.repeat(80));
  console.log(`Total PDFs: ${pdfFiles.length}`);
  console.log(`Successfully extracted: ${result.success.length}`);
  console.log(`Failed: ${result.failed.length}`);
  console.log(`Success rate: ${((result.success.length / pdfFiles.length) * 100).toFixed(1)}%`);
  console.log('='.repeat(80));

  return result;
}

// Run extraction
const baseDir = '/Users/mohanvemulakonda/Downloads/livato_invoices/LIVATO SOLUTIONS';
const outputFile = '/Users/mohanvemulakonda/projects/LivatoSolutions/scripts/extracted-shopify-invoices.json';

extractShopifyInvoices(baseDir, outputFile)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
