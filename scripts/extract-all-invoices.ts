import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

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
  paidAmount?: number;
  notes: string;
  items: InvoiceItem[];
  pdfPath: string;
  extractionErrors: string[];
}

interface ExtractionResult {
  success: ExtractedInvoice[];
  failed: Array<{ path: string; error: string }>;
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

// Helper function to extract text from PDF
async function extractTextFromPDF(pdfPath: string): Promise<string> {
  try {
    const dataBuffer = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = pdfjsLib.getDocument({ data: dataBuffer });
    const pdfDocument = await loadingTask.promise;

    let fullText = '';
    // Usually first page has all the data, but we'll check all pages
    for (let pageNum = 1; pageNum <= Math.min(pdfDocument.numPages, 3); pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  } catch (err: any) {
    throw new Error(`Failed to extract text: ${err.message}`);
  }
}

// Extract invoice number
function extractInvoiceNumber(text: string): string {
  const match = text.match(/(?:RETAIL INVOICE|INVOICE)\s+(RI-\d+)/i);
  return match ? match[1] : '';
}

// Extract dates
function extractDate(text: string, label: string): string {
  // Look for DATE 01/12/2021 or DUE DATE 01/12/2021
  const regex = new RegExp(`${label}\\s+(\\d{2}/\\d{2}/\\d{4})`, 'i');
  const match = text.match(regex);
  if (match) {
    const [day, month, year] = match[1].split('/');
    return `${year}-${month}-${day}`;
  }
  return '';
}

// Extract payment terms
function extractPaymentTerms(text: string): string {
  const match = text.match(/TERMS\s+([^D]+?)(?=DUE DATE|$)/i);
  return match ? match[1].trim() : 'Due on Receipt';
}

// Extract customer name
function extractCustomerName(text: string): string {
  // Try to find company name pattern - usually all caps or mixed case company names
  // Look for patterns like "MYK LATICRETE INDIA PRIVATE LIMITED" or "United Technologies"

  // First try: Look for company name before GSTIN in BILL TO section
  const gstPattern = text.match(/(?:BILL TO|SHIP TO)[^]*?([A-Z][A-Z\s&]+(?:PRIVATE LIMITED|LIMITED|LTD|INDUSTRIES|TECHNOLOGIES|SOLUTIONS|LATICRETE|SYSTEMS))\s+(?:Mr|Ms|Mrs|Dr)?[^]*?GSTIN/i);
  if (gstPattern) {
    return gstPattern[1].trim();
  }

  // Second try: Look for the company name in a cleaner way
  const billToSection = text.match(/BILL TO\s+SHIP TO\s+(.*?)(?=PLACE OF SUPPLY|RETAIL INVOICE)/is);
  if (billToSection) {
    const section = billToSection[1];
    // Look for company keywords
    const companyMatch = section.match(/([A-Z][A-Z\s&]+(?:PRIVATE LIMITED|LIMITED|LTD|INDUSTRIES|TECHNOLOGIES|SOLUTIONS|LATICRETE|SYSTEMS|INDIA))/i);
    if (companyMatch) {
      return companyMatch[1].trim();
    }

    // Fallback: Try to get text before Mr/contact person
    const beforeMrMatch = section.match(/^\s*([A-Z\s]+?)(?=\s+Mr|Ms|Mrs|Dr|\d{10})/i);
    if (beforeMrMatch) {
      return beforeMrMatch[1].trim();
    }
  }

  return '';
}

// Extract customer GST number
function extractGSTNumber(text: string): string {
  const match = text.match(/GST(?:\s*IN)?[\s:-]+([0-9A-Z]{15})/i);
  return match ? match[1].trim() : '';
}

// Extract customer phone
function extractPhone(text: string): string {
  const match = text.match(/CONTACT[:\s]*(\d{10})/i);
  return match ? match[1] : '';
}

// Extract billing address
function extractBillingAddress(text: string): string {
  // Extract address between BILL TO and SHIP TO sections
  const regex = /BILL TO\s+.*?(?:GST[^A-Z]*)?([^\n]*(?:Plot|No-|Sy\.|HNo|H No|Cellar)[^]+?)(?=State Code|SHIP TO|PLACE OF SUPPLY)/i;
  const match = text.match(regex);
  if (match) {
    let address = match[1].trim();
    // Clean up the address
    address = address
      .replace(/GST(?:\s*IN)?[\s:-]+[0-9A-Z]{15}/gi, '')
      .replace(/CONTACT[:\s]*\d{10}/gi, '')
      .replace(/state code[:\s-]*\d+/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    // Format with line breaks
    return address.replace(/\s+(?=Plot|Sy\.|HNo|H No|Cellar|No-)/g, '\n').trim();
  }
  return '';
}

// Extract shipping address
function extractShippingAddress(text: string): string {
  const regex = /SHIP TO\s+.*?(?:GST[^A-Z]*)?([^\n]*(?:Plot|No-|Sy\.|HNo|H No|Cellar)[^]+?)(?=PLACE OF SUPPLY|RETAIL INVOICE)/i;
  const match = text.match(regex);
  if (match) {
    let address = match[1].trim();
    address = address
      .replace(/GST(?:\s*IN)?[\s:-]+[0-9A-Z]{15}/gi, '')
      .replace(/CONTACT[:\s]*\d{10}/gi, '')
      .replace(/state code[:\s-]*\d+/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    return address.replace(/\s+(?=Plot|Sy\.|HNo|H No|Cellar|No-)/g, '\n').trim();
  }
  return '';
}

// Extract state from place of supply
function extractState(text: string): string {
  const match = text.match(/PLACE OF SUPPLY\s+\d+\s*-\s*([A-Za-z\s]+)/i);
  return match ? match[1].trim() : '';
}

// Extract company state from state code in BILL TO
function extractCompanyState(text: string): string {
  // Look for state code in the billing section
  const stateCodeMatch = text.match(/State Code:\s*(\d+)/);
  if (stateCodeMatch) {
    const stateCode = stateCodeMatch[1];
    const stateMap: { [key: number]: string } = {
      29: 'Karnataka',
      36: 'Telangana',
      33: 'Tamil Nadu',
      8: 'Rajasthan',
      // Add more as needed
    };
    return stateMap[parseInt(stateCode)] || 'Telangana';
  }
  return 'Telangana'; // Default
}

// Extract subtotal and tax amounts
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

  // Extract subtotal
  const subtotalMatch = text.match(/SUBTOTAL\s+([\d,]+\.?\d*)/i);
  if (subtotalMatch) {
    amounts.subtotal = parseFloat(subtotalMatch[1].replace(/,/g, ''));
  }

  // Extract CGST
  const cgstMatch = text.match(/CGST\s*@\s*[\d.]+%\s*on\s*[\d,]+\.?\d*\s+([\d,]+\.?\d*)/i);
  if (cgstMatch) {
    amounts.cgstAmount = parseFloat(cgstMatch[1].replace(/,/g, ''));
  }

  // Extract SGST
  const sgstMatch = text.match(/SGST\s*@\s*[\d.]+%\s*on\s*[\d,]+\.?\d*\s+([\d,]+\.?\d*)/i);
  if (sgstMatch) {
    amounts.sgstAmount = parseFloat(sgstMatch[1].replace(/,/g, ''));
  }

  // Extract IGST
  const igstMatch = text.match(/IGST\s*@\s*[\d.]+%\s*on\s*[\d,]+\.?\d*\s+([\d,]+\.?\d*)/i);
  if (igstMatch) {
    amounts.igstAmount = parseFloat(igstMatch[1].replace(/,/g, ''));
  }

  // Calculate total tax
  amounts.totalTax = amounts.cgstAmount + amounts.sgstAmount + amounts.igstAmount;

  // Extract total
  const totalMatch = text.match(/(?:TOTAL|INR)\s+([\d,]+\.?\d*)\s+TOTAL DUE/i);
  if (totalMatch) {
    amounts.total = parseFloat(totalMatch[1].replace(/,/g, ''));
  }

  return amounts;
}

// Extract notes
function extractNotes(text: string): string {
  // Notes typically appear before SUBTOTAL
  const regex = /(?:PO NO|PO N0|VENDOR CODE)[^]*?(?=SUBTOTAL)/i;
  const match = text.match(regex);
  if (match) {
    return match[0].trim().replace(/\s+/g, ' ');
  }
  return '';
}

// Extract line items
function extractLineItems(text: string): InvoiceItem[] {
  const items: InvoiceItem[] = [];

  // Find the items section between NO HSN/SAC and SUBTOTAL
  const itemsSectionMatch = text.match(/NO\s+HSN\/SAC\s+DATE\s+ACTIVITY\s+DESCRIPTION\s+TAX\s+UNIT\s+QTY\s+RATE\s+AMOUNT\s+(.*?)(?=SUBTOTAL)/is);

  if (!itemsSectionMatch) return items;

  const itemsText = itemsSectionMatch[1];

  // Match individual line items with pattern:
  // Number HSN Date Activity Description Tax Unit Qty Rate Amount
  const lineItemRegex = /(\d+)\s+(\d{6,8}|\d{4})\s+(\d{2}\/\d{2}\/\d{4})\s+(.*?)\s+(18\.0%|12\.0%|5\.0%)\s*(IGST|CGST|SGST|GST)\s+([A-Z]+)\s+([\d,]+)\s+([\d,]+\.?\d*)\s+([\d,]+\.?\d*)/g;

  let match;
  while ((match = lineItemRegex.exec(itemsText)) !== null) {
    try {
      const [, lineNo, hsnCode, date, activityAndDesc, gstRateStr, taxType, unit, qtyStr, rateStr, amountStr] = match;

      // Parse the activity and description (they are combined in the text)
      // Split on double spaces to get activity and description
      const activityDescParts = activityAndDesc.trim().split(/\s{2,}/);
      let itemName = activityDescParts[0]?.trim() || '';
      let description = activityDescParts.length > 1 ? activityDescParts.slice(1).join(' ').trim() : itemName;

      // If they're the same text repeated, just use one
      if (itemName === description) {
        description = itemName;
      }

      const gstRate = parseFloat(gstRateStr);
      const quantity = parseFloat(qtyStr.replace(/,/g, ''));
      const unitPrice = parseFloat(rateStr.replace(/,/g, ''));
      const amount = parseFloat(amountStr.replace(/,/g, ''));

      items.push({
        itemName,
        description,
        hsnCode,
        quantity,
        unit,
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

// Parse invoice from extracted text
function parseInvoice(text: string, pdfPath: string): ExtractedInvoice {
  const errors: string[] = [];

  const invoiceNumber = extractInvoiceNumber(text);
  if (!invoiceNumber) errors.push('Invoice number not found');

  const createdAt = extractDate(text, 'DATE');
  if (!createdAt) errors.push('Invoice date not found');

  const dueDate = extractDate(text, 'DUE DATE');
  if (!dueDate) errors.push('Due date not found');

  const customerName = extractCustomerName(text);
  if (!customerName) errors.push('Customer name not found');

  const customerState = extractState(text);
  if (!customerState) errors.push('Customer state not found');

  const amounts = extractAmounts(text);
  const items = extractLineItems(text);

  if (items.length === 0) errors.push('No line items found');

  return {
    invoiceNumber,
    type: 'INVOICE',
    status: 'DRAFT',
    createdAt,
    dueDate,
    paymentTerms: extractPaymentTerms(text),
    customerName,
    customerEmail: '', // Not in PDF, will need manual mapping
    customerPhone: extractPhone(text),
    billingAddress: extractBillingAddress(text),
    shippingAddress: extractShippingAddress(text),
    customerGstNumber: extractGSTNumber(text),
    customerState,
    placeOfSupply: customerState,
    companyState: extractCompanyState(text),
    ...amounts,
    notes: extractNotes(text),
    items,
    pdfPath,
    extractionErrors: errors,
  };
}

// Find all invoice PDFs
function findAllInvoicePDFs(baseDir: string): string[] {
  const pdfFiles: string[] = [];

  function scanDirectory(dir: string) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          // Skip certain directories (case-insensitive check for purchase, po, e-way)
          const skipDirs = ['Cancelled invoices', 'Confidential', 'Bank statement'];
          const skipDirsLower = entry.name.toLowerCase();
          const shouldSkip = skipDirs.includes(entry.name) ||
                            skipDirsLower.includes('purchase') ||
                            skipDirsLower.includes('po') ||
                            skipDirsLower.includes('e-way') ||
                            skipDirsLower.includes('eway');

          if (!shouldSkip) {
            scanDirectory(fullPath);
          }
        } else if (entry.isFile()) {
          // Match patterns like:
          // - RI-1234.pdf, RI-1234-name.pdf, RI-1234_name.pdf
          // - RI1234.pdf, RI1234-name.pdf, RI1234.pdf.pdf (double extension)
          // - Livato Invoice RI1234.pdf
          // - Copy of RI-1234.pdf, Copy of Copy of RI-1234.pdf
          // - 1234.pdf (in sale/Sale/sales/Sales folder)
          const dirLower = dir.toLowerCase();
          const isInvoicePDF =
            entry.name.match(/^RI-?\d+.*\.pdf/i) ||  // RI-1234.pdf OR RI1234.pdf (including .pdf.pdf)
            entry.name.match(/^Livato\s+Invoice.*RI-?\d+.*\.pdf/i) ||  // Livato Invoice RI1234.pdf
            entry.name.match(/^Copy\s+of.*RI-?\d+.*\.pdf/i) ||  // Copy of RI-1234.pdf (multiple copies)
            (entry.name.match(/^\d+\.pdf/i) && dirLower.includes('/sale'));  // 1234.pdf in sale folder

          if (isInvoicePDF) {
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

// Main extraction function
async function extractAllInvoices(baseDir: string, outputFile: string): Promise<ExtractionResult> {
  console.log('Finding all invoice PDFs...');
  const pdfFiles = findAllInvoicePDFs(baseDir);
  console.log(`Found ${pdfFiles.length} invoice PDFs\n`);

  const result: ExtractionResult = {
    success: [],
    failed: [],
    summary: {
      total: pdfFiles.length,
      successful: 0,
      failed: 0,
    },
  };

  let processed = 0;

  for (const pdfPath of pdfFiles) {
    processed++;
    const fileName = path.basename(pdfPath);

    try {
      console.log(`[${processed}/${pdfFiles.length}] Processing: ${fileName}`);

      const text = await extractTextFromPDF(pdfPath);
      const invoice = parseInvoice(text, pdfPath);

      result.success.push(invoice);
      result.summary.successful++;

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
      result.summary.failed++;
    }

    // Progress update every 10 files
    if (processed % 10 === 0) {
      console.log(`\nProgress: ${processed}/${pdfFiles.length} (${result.summary.successful} successful, ${result.summary.failed} failed)\n`);
    }
  }

  // Save results to JSON
  console.log('\nSaving results to:', outputFile);
  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));

  // Also save just the successful extractions for easier import
  const successFile = outputFile.replace('.json', '-success-only.json');
  fs.writeFileSync(successFile, JSON.stringify(result.success, null, 2));

  console.log('Saved successful extractions to:', successFile);

  return result;
}

// Run extraction
const baseDir = '/Users/mohanvemulakonda/Downloads/livato_invoices/LIVATO SOLUTIONS';
const outputFile = '/Users/mohanvemulakonda/projects/LivatoSolutions/scripts/extracted-invoices.json';

extractAllInvoices(baseDir, outputFile)
  .then((result) => {
    console.log('\n' + '='.repeat(80));
    console.log('EXTRACTION COMPLETE');
    console.log('='.repeat(80));
    console.log(`Total PDFs: ${result.summary.total}`);
    console.log(`Successfully extracted: ${result.summary.successful}`);
    console.log(`Failed: ${result.summary.failed}`);
    console.log(`Success rate: ${((result.summary.successful / result.summary.total) * 100).toFixed(1)}%`);
    console.log('='.repeat(80));

    if (result.failed.length > 0) {
      console.log('\nFailed extractions:');
      result.failed.forEach((f) => {
        console.log(`  - ${path.basename(f.path)}: ${f.error}`);
      });
    }

    process.exit(0);
  })
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
