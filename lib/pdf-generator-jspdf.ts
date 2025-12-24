import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import fs from 'fs';
import path from 'path';

// Currency configuration - maps currency codes to display formats
const CURRENCY_CONFIG: Record<string, { symbol: string; name: string }> = {
  INR: { symbol: 'INR ', name: 'Indian Rupees' },
  USD: { symbol: 'USD ', name: 'US Dollars' },
  EUR: { symbol: 'EUR ', name: 'Euros' },
  GBP: { symbol: 'GBP ', name: 'British Pounds' },
  AED: { symbol: 'AED ', name: 'UAE Dirhams' },
};

// Helper to get currency display values
function getCurrency(code?: string) {
  const currencyCode = code || 'INR';
  return CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG.INR;
}

interface InvoiceItem {
  itemName: string;
  description: string | null;
  hsnCode: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  taxableAmount: number;
  gstRate: number;
  igst?: number;
  cgst?: number;
  sgst?: number;
}

interface InvoiceData {
  invoiceNumber: string;
  type: string;
  createdAt: Date;
  dueDate: Date | null;
  customerName: string;
  customerCompany?: string | null;
  customerPhone?: string | null;
  customerEmail?: string | null;
  billingAddress: string | null;
  shippingAddress: string | null;
  // Separate shipping contact for delivery
  shippingContactName?: string | null;
  shippingContactPhone?: string | null;
  customerGstNumber: string | null;
  placeOfSupply: string | null;
  paymentTerms?: string | null;
  poReference?: string | null;
  currency?: string;
  subtotal: number;
  totalTax: number;
  igstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  total: number;
  paidAmount: number | null;
  notes: string | null;
  termsAndConditions: string | null;
  items: InvoiceItem[];
}

// Helper function to convert number to words (Indian style)
function numberToWordsIndian(num: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  if (num === 0) return 'Zero';

  function convertLessThanThousand(n: number): string {
    if (n === 0) return '';
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
    return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertLessThanThousand(n % 100) : '');
  }

  const integerPart = Math.floor(num);
  let result = '';

  if (integerPart >= 10000000) {
    const crores = Math.floor(integerPart / 10000000);
    result += convertLessThanThousand(crores) + ' Crore ';
    num = integerPart % 10000000;
  }

  if (integerPart >= 100000) {
    const lakhs = Math.floor((integerPart % 10000000) / 100000);
    result += convertLessThanThousand(lakhs) + ' Lakh ';
    num = integerPart % 100000;
  }

  if (integerPart >= 1000) {
    const thousands = Math.floor((integerPart % 100000) / 1000);
    result += convertLessThanThousand(thousands) + ' Thousand ';
    num = integerPart % 1000;
  }

  if (integerPart % 1000 !== 0) {
    result += convertLessThanThousand(integerPart % 1000);
  }

  return result.trim();
}

export function generateInvoicePDF(invoice: InvoiceData): Uint8Array {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: false,
    precision: 16
  });

  // Get currency configuration for this invoice
  const currency = getCurrency(invoice.currency);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 15;

  // Outer border
  doc.setDrawColor(150);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Inner border
  doc.setDrawColor(100);
  doc.setLineWidth(0.3);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Try to add logo (if it exists)
  const logoPath = path.join(process.cwd(), 'public', 'Livato Logo.png');
  let logoAdded = false;

  try {
    if (fs.existsSync(logoPath)) {
      const logoData = fs.readFileSync(logoPath);
      const base64Logo = `data:image/png;base64,${logoData.toString('base64')}`;
      doc.addImage(base64Logo, 'PNG', 20, yPos, 25, 25);
      logoAdded = true;
    }
  } catch (error) {
    console.log('Could not add logo to PDF');
  }

  // Company Header
  const companyX = logoAdded ? 50 : 20;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Livato Solutions', companyX, yPos + 5);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Hyderabad Telangana 500098', companyX, yPos + 10);
  doc.text('India', companyX, yPos + 14);
  doc.text('GSTIN: 36AAIFL5524C1ZJ', companyX, yPos + 18);
  doc.text('Phone: 8008413800', companyX, yPos + 22);
  doc.text('Email: livatosolutions@gmail.com', companyX, yPos + 26);
  doc.text('www.livatosolutions.com', companyX, yPos + 30);

  // Document Type on right
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(37, 99, 235); // Blue color
  const docType = invoice.type === 'QUOTE' ? 'QUOTATION' :
                  invoice.type === 'PROFORMA' ? 'PROFORMA INVOICE' :
                  'TAX INVOICE';
  doc.text(docType, pageWidth - 20, yPos + 10, { align: 'right' });
  doc.setTextColor(0, 0, 0); // Reset to black

  yPos = 50;

  // Horizontal line
  doc.setDrawColor(200);
  doc.setLineWidth(0.5);
  doc.line(20, yPos, pageWidth - 20, yPos);
  yPos += 8;

  // Invoice Details (left column)
  doc.setFontSize(8);
  const leftCol = 20;
  const valueCol = 50;

  doc.setFont('helvetica', 'bold');
  doc.text('#', leftCol, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${invoice.invoiceNumber}`, valueCol, yPos);
  yPos += 5;

  doc.setFont('helvetica', 'bold');
  const dateLabel = invoice.type === 'QUOTE' ? 'Quote Date' :
                    invoice.type === 'PROFORMA' ? 'Proforma Date' : 'Invoice Date';
  doc.text(dateLabel, leftCol, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${new Date(invoice.createdAt).toLocaleDateString('en-GB')}`, valueCol, yPos);
  yPos += 5;

  doc.setFont('helvetica', 'bold');
  doc.text('Terms', leftCol, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${invoice.paymentTerms || 'Due on Receipt'}`, valueCol, yPos);
  yPos += 5;

  doc.setFont('helvetica', 'bold');
  doc.text('Due Date', leftCol, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('en-GB') : 'N/A'}`, valueCol, yPos);

  // Place of Supply and PO Reference (right column)
  const rightCol = 120;
  const rightValueCol = 155;
  yPos -= 10; // Go back up for right column
  doc.setFont('helvetica', 'bold');
  doc.text('Place Of Supply', rightCol, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${invoice.placeOfSupply || 'N/A'}`, rightValueCol, yPos);

  // PO Reference if exists
  if (invoice.poReference) {
    yPos += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('PO Reference', rightCol, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(`: ${invoice.poReference}`, rightValueCol, yPos);
  }

  yPos += 20;

  // Horizontal line
  doc.line(20, yPos, pageWidth - 20, yPos);
  yPos += 8;

  // Bill To and Ship To sections - Professional layout
  const billToX = 20;
  const shipToX = pageWidth / 2 + 5;
  const colWidth = (pageWidth - 40) / 2 - 5;

  // Section headers with background
  doc.setFillColor(245, 245, 245);
  doc.rect(billToX, yPos - 2, colWidth, 7, 'F');
  doc.rect(shipToX, yPos - 2, colWidth, 7, 'F');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(50, 50, 50);
  doc.text('BILL TO', billToX + 2, yPos + 3);
  doc.text('SHIP TO', shipToX + 2, yPos + 3);
  yPos += 10;

  // Helper to check if a name is a valid contact (not a place name in address)
  const isValidContactName = (name: string | null | undefined, address: string | null | undefined, company: string | null | undefined): boolean => {
    if (!name || name.trim() === '') return false;
    if (name === company) return false;
    // Check if name appears in address (likely a place name)
    if (address && address.toLowerCase().includes(name.toLowerCase())) return false;
    return true;
  };

  // Bill To Content
  let billYPos = yPos;
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);

  // Company name (bold)
  if (invoice.customerCompany) {
    doc.setFont('helvetica', 'bold');
    doc.text(invoice.customerCompany, billToX, billYPos);
    billYPos += 4;
  }

  // Contact person name - only show if valid (not same as company and not in address)
  const billingContactValid = isValidContactName(invoice.customerName, invoice.billingAddress, invoice.customerCompany);
  if (billingContactValid) {
    doc.setFont('helvetica', 'bold');
    doc.text(invoice.customerName, billToX, billYPos);
    billYPos += 4;
  }

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);

  // Phone
  if (invoice.customerPhone) {
    doc.text(`Phone: ${invoice.customerPhone}`, billToX, billYPos);
    billYPos += 4;
  }

  // Email
  if (invoice.customerEmail) {
    doc.text(`Email: ${invoice.customerEmail}`, billToX, billYPos);
    billYPos += 4;
  }

  // Address
  if (invoice.billingAddress) {
    const billLines = doc.splitTextToSize(invoice.billingAddress, colWidth - 5);
    doc.text(billLines, billToX, billYPos);
    billYPos += billLines.length * 4;
  }

  // GST Number
  if (invoice.customerGstNumber) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`GSTIN: ${invoice.customerGstNumber}`, billToX, billYPos);
    billYPos += 4;
  }

  // Ship To Content - Contact info most prominent for delivery
  let shipYPos = yPos;
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);

  // Determine if we have a valid shipping contact (not same as company and not in address)
  const shippingContactValid = isValidContactName(invoice.shippingContactName, invoice.shippingAddress, invoice.customerCompany);
  const fallbackContactValid = !shippingContactValid && isValidContactName(invoice.customerName, invoice.shippingAddress, invoice.customerCompany);
  const shipContactName = shippingContactValid ? invoice.shippingContactName : (fallbackContactValid ? invoice.customerName : null);
  const shipContactPhone = invoice.shippingContactPhone || invoice.customerPhone;

  // Company name (bold) for shipping
  if (invoice.customerCompany) {
    doc.setFont('helvetica', 'bold');
    doc.text(invoice.customerCompany, shipToX, shipYPos);
    shipYPos += 4;
  }

  // Contact person name with label (important for delivery) - HIGHLIGHTED
  // Only show if we have a valid contact name (not a place name)
  if (shipContactName) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235); // Blue to highlight
    doc.text(`Contact: ${shipContactName}`, shipToX, shipYPos);
    shipYPos += 4;
  }

  // Phone for shipping - PROMINENT for delivery guy
  if (shipContactPhone) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`Phone: ${shipContactPhone}`, shipToX, shipYPos);
    shipYPos += 4;
  }

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);

  // Shipping Address
  if (invoice.shippingAddress) {
    const shipLines = doc.splitTextToSize(invoice.shippingAddress, colWidth - 5);
    doc.text(shipLines, shipToX, shipYPos);
    shipYPos += shipLines.length * 4;
  }

  // GST Number on shipping too
  if (invoice.customerGstNumber) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`GSTIN: ${invoice.customerGstNumber}`, shipToX, shipYPos);
    shipYPos += 4;
  }

  yPos = Math.max(billYPos, shipYPos) + 8;

  // Horizontal line
  doc.line(20, yPos, pageWidth - 20, yPos);
  yPos += 5;

  // Draw table with professional header
  const startX = 20;
  const tableWidth = pageWidth - 40;

  // Table header with background
  doc.setFillColor(37, 99, 235); // Blue background
  doc.rect(startX, yPos, tableWidth, 8, 'F');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255); // White text

  // Header row - separate Qty and Unit columns with proper spacing
  const headerY = yPos;
  doc.text('#', startX + 3, headerY + 5);
  doc.text('Item & Description', startX + 10, headerY + 5);
  doc.text('HSN', startX + 68, headerY + 5);
  doc.text('Qty', startX + 90, headerY + 5, { align: 'right' });
  doc.text('Unit', startX + 93, headerY + 5);
  doc.text('Rate', startX + 125, headerY + 5, { align: 'right' });
  doc.text('GST%', startX + 143, headerY + 5, { align: 'right' });
  doc.text('Amount', pageWidth - 22, headerY + 5, { align: 'right' });

  // Move past header
  yPos += 10;
  doc.setTextColor(0, 0, 0);
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(startX, yPos, tableWidth + 20, yPos);
  yPos += 4;

  // Table body
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);

  invoice.items.forEach((item, index) => {
    const rowStartY = yPos;

    // Serial number
    doc.setTextColor(100, 100, 100);
    doc.text((index + 1).toString(), startX + 3, yPos + 4);

    // Item name (bold, black) and description
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    const itemLines = doc.splitTextToSize(item.itemName, 48);
    doc.text(itemLines, startX + 10, yPos + 4);
    let itemHeight = itemLines.length * 4;

    // Description if exists (smaller, gray, normal weight)
    if (item.description) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      const descLines = doc.splitTextToSize(item.description, 48);
      doc.text(descLines, startX + 10, yPos + 4 + itemHeight);
      itemHeight += descLines.length * 3.5;
      doc.setFontSize(8);
    }

    // Data columns
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);

    // HSN/SAC
    doc.text(item.hsnCode || '-', startX + 68, yPos + 4);

    // Qty (right-aligned, separate from unit)
    doc.text(Number(item.quantity).toLocaleString('en-IN'), startX + 90, yPos + 4, { align: 'right' });

    // Unit (left-aligned, separate column)
    doc.text(item.unit || 'Nos', startX + 93, yPos + 4);

    // Rate
    doc.text(`${currency.symbol}${Number(item.unitPrice).toFixed(2)}`, startX + 125, yPos + 4, { align: 'right' });

    // GST %
    doc.text(`${Number(item.gstRate)}%`, startX + 143, yPos + 4, { align: 'right' });

    // Amount (bold, black)
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`${currency.symbol}${Number(item.taxableAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, pageWidth - 22, yPos + 4, { align: 'right' });

    // Move to next row
    yPos += Math.max(10, itemHeight + 3);

    // Row border (very light gray - matching border-gray-100)
    doc.setDrawColor(243, 244, 246);
    doc.setLineWidth(0.3);
    doc.line(startX, yPos, tableWidth + 20, yPos);

    yPos += 4;
  });

  yPos += 5;

  // Totals section (right aligned)
  const totalsX = pageWidth - 80;
  const amountX = pageWidth - 20;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(75, 75, 75); // Gray 600
  doc.text('Subtotal', totalsX, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0); // Black
  doc.text(`${currency.symbol}${Number(invoice.subtotal).toLocaleString('en-IN')}`, amountX, yPos, { align: 'right' });
  yPos += 6;

  if (invoice.igstAmount > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 75, 75);
    doc.text('IGST (18%)', totalsX, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`${currency.symbol}${Number(invoice.igstAmount).toLocaleString('en-IN')}`, amountX, yPos, { align: 'right' });
    yPos += 6;
  }

  if (invoice.cgstAmount > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 75, 75);
    doc.text('CGST (9%)', totalsX, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`${currency.symbol}${Number(invoice.cgstAmount).toLocaleString('en-IN')}`, amountX, yPos, { align: 'right' });
    yPos += 6;
  }

  if (invoice.sgstAmount > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 75, 75);
    doc.text('SGST (9%)', totalsX, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`${currency.symbol}${Number(invoice.sgstAmount).toLocaleString('en-IN')}`, amountX, yPos, { align: 'right' });
    yPos += 6;
  }

  // Total line
  doc.setDrawColor(200);
  doc.setLineWidth(0.3);
  doc.line(totalsX - 5, yPos - 1, amountX, yPos - 1);
  yPos += 5;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Total', totalsX, yPos);
  doc.text(`${currency.symbol}${Number(invoice.total).toLocaleString('en-IN')}`, amountX, yPos, { align: 'right' });

  // Total in words
  yPos += 10;
  if (yPos < pageHeight - 60) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('Total In Words:', 20, yPos);
    yPos += 5;
    const totalInWords = `${currency.name} ${numberToWordsIndian(invoice.total)} Only`;
    doc.setFont('helvetica', 'bolditalic');
    const wordsLines = doc.splitTextToSize(totalInWords, 100);
    doc.text(wordsLines, 20, yPos);
    yPos += wordsLines.length * 4 + 8;
  }

  // Notes and Terms
  if (invoice.notes && yPos < pageHeight - 40) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('Notes:', 20, yPos);
    yPos += 4;
    doc.setFont('helvetica', 'normal');
    const notesLines = doc.splitTextToSize(invoice.notes, 100);
    doc.text(notesLines, 20, yPos);
    yPos += notesLines.length * 4 + 5;
  }

  if (invoice.termsAndConditions && yPos < pageHeight - 35) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('Terms & Conditions:', 20, yPos);
    yPos += 4;
    doc.setFont('helvetica', 'normal');
    const termsLines = doc.splitTextToSize(invoice.termsAndConditions, 100);
    doc.text(termsLines, 20, yPos);
  }

  // Authorized Signature at bottom right
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Authorized Signature', pageWidth - 60, pageHeight - 25);

  return doc.output('arraybuffer') as Uint8Array;
}
