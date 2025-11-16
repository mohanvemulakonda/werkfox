import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import fs from 'fs';
import path from 'path';

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
  billingAddress: string | null;
  shippingAddress: string | null;
  customerGstNumber: string | null;
  placeOfSupply: string | null;
  paymentTerms?: string | null;
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
  doc.text('Invoice Date', leftCol, yPos);
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

  // Place of Supply (right column)
  const rightCol = 120;
  const rightValueCol = 155;
  yPos -= 10; // Go back up for right column
  doc.setFont('helvetica', 'bold');
  doc.text('Place Of Supply', rightCol, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${invoice.placeOfSupply || 'N/A'}`, rightValueCol, yPos);

  yPos += 20;

  // Horizontal line
  doc.line(20, yPos, pageWidth - 20, yPos);
  yPos += 8;

  // Bill To and Ship To sections
  const billToX = 20;
  const shipToX = pageWidth / 2 + 5;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To', billToX, yPos);
  doc.text('Ship To', shipToX, yPos);
  yPos += 5;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text(invoice.customerName, billToX, yPos);
  yPos += 4;

  doc.setFont('helvetica', 'normal');
  if (invoice.billingAddress) {
    const billLines = doc.splitTextToSize(invoice.billingAddress, 80);
    doc.text(billLines, billToX, yPos);
    yPos += billLines.length * 4;
  }

  if (invoice.customerGstNumber) {
    doc.text(`GSTIN: ${invoice.customerGstNumber}`, billToX, yPos);
  }

  // Ship To (reset yPos for right column)
  let shipYPos = yPos - (invoice.billingAddress ? doc.splitTextToSize(invoice.billingAddress, 80).length * 4 : 0) - 4;
  if (invoice.shippingAddress) {
    const shipLines = doc.splitTextToSize(invoice.shippingAddress, 80);
    doc.text(shipLines, shipToX, shipYPos);
    shipYPos += shipLines.length * 4;
  }

  yPos = Math.max(yPos + 8, shipYPos + 8);

  // Horizontal line
  doc.line(20, yPos, pageWidth - 20, yPos);
  yPos += 5;

  // Draw table manually to match admin panel EXACTLY
  const startX = 20;
  const tableWidth = pageWidth - 40;

  // Table header
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);

  // Header row
  const headerY = yPos;
  doc.text('#', startX + 2, headerY + 4);
  doc.text('Item & Description', startX + 10, headerY + 4);
  doc.text('HSN/SAC', startX + 95, headerY + 4, { align: 'right' });
  doc.text('Qty', startX + 115, headerY + 4, { align: 'right' });
  doc.text('Rate', startX + 135, headerY + 4, { align: 'right' });
  doc.text('GST %', startX + 155, headerY + 4, { align: 'right' });
  doc.text('Amount', tableWidth + 20, headerY + 4, { align: 'right' });

  // Header bottom border only
  yPos += 6;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(startX, yPos, tableWidth + 20, yPos);
  yPos += 4;

  // Table body
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(75, 75, 75); // Gray 600

  invoice.items.forEach((item, index) => {
    const rowStartY = yPos;

    // Serial number (gray)
    doc.setTextColor(75, 75, 75);
    doc.text((index + 1).toString(), startX + 2, yPos + 4);

    // Item name (medium weight, black) and description
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    const itemLines = doc.splitTextToSize(item.itemName, 70);
    doc.text(itemLines, startX + 10, yPos + 4);
    let itemHeight = itemLines.length * 4;

    // Description if exists (smaller, gray, normal weight)
    if (item.description) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(75, 75, 75);
      const descLines = doc.splitTextToSize(item.description, 70);
      doc.text(descLines, startX + 10, yPos + 4 + itemHeight);
      itemHeight += descLines.length * 4;
      doc.setFontSize(9);
    }

    // All numeric columns: gray text, normal weight, right-aligned
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 75, 75);

    // HSN/SAC
    doc.text(item.hsnCode, startX + 95, yPos + 4, { align: 'right' });

    // Qty
    doc.text(`${Number(item.quantity).toLocaleString('en-IN')} ${item.unit}`, startX + 115, yPos + 4, { align: 'right' });

    // Rate
    doc.text(`₹${Number(item.unitPrice).toFixed(2)}`, startX + 135, yPos + 4, { align: 'right' });

    // GST %
    doc.text(`${Number(item.gstRate)}%`, startX + 155, yPos + 4, { align: 'right' });

    // Amount (medium weight, black)
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`₹${Number(item.taxableAmount).toLocaleString('en-IN')}`, tableWidth + 20, yPos + 4, { align: 'right' });

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
  doc.text(`₹${Number(invoice.subtotal).toLocaleString('en-IN')}`, amountX, yPos, { align: 'right' });
  yPos += 6;

  if (invoice.igstAmount > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 75, 75);
    doc.text('IGST (18%)', totalsX, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`₹${Number(invoice.igstAmount).toLocaleString('en-IN')}`, amountX, yPos, { align: 'right' });
    yPos += 6;
  }

  if (invoice.cgstAmount > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 75, 75);
    doc.text('CGST (9%)', totalsX, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`₹${Number(invoice.cgstAmount).toLocaleString('en-IN')}`, amountX, yPos, { align: 'right' });
    yPos += 6;
  }

  if (invoice.sgstAmount > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 75, 75);
    doc.text('SGST (9%)', totalsX, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`₹${Number(invoice.sgstAmount).toLocaleString('en-IN')}`, amountX, yPos, { align: 'right' });
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
  doc.text(`₹${Number(invoice.total).toLocaleString('en-IN')}`, amountX, yPos, { align: 'right' });

  // Total in words
  yPos += 10;
  if (yPos < pageHeight - 60) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('Total In Words:', 20, yPos);
    yPos += 5;
    const totalInWords = `Indian Rupee ${numberToWordsIndian(invoice.total)} Only`;
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
