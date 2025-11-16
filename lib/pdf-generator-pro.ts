import PDFDocument from 'pdfkit';
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
    const lakhs = Math.floor(integerPart / 100000);
    result += convertLessThanThousand(lakhs) + ' Lakh ';
    num = integerPart % 100000;
  }

  if (integerPart >= 1000) {
    const thousands = Math.floor(integerPart / 1000);
    result += convertLessThanThousand(thousands) + ' Thousand ';
    num = integerPart % 1000;
  }

  if (integerPart % 1000 !== 0) {
    result += convertLessThanThousand(integerPart % 1000);
  }

  return result.trim();
}

export function generateInvoicePDFPro(invoice: InvoiceData): PDFDocument {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 40,
    bufferPages: true,
    autoFirstPage: true,
    font: 'Helvetica' // Use built-in font
  });

  const logoPath = path.join(process.cwd(), 'public', 'Livato Logo.png');
  const pageWidth = 595; // A4 width in points
  const pageHeight = 842; // A4 height in points
  let yPos = 40;

  // Draw border around the page
  doc.rect(30, 30, pageWidth - 60, pageHeight - 60).stroke();

  // Logo and Company Header
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 50, yPos, { width: 80 });
  }

  doc.fontSize(18).font('Helvetica-Bold').text('Livato Solutions', 140, yPos);
  yPos += 20;
  doc.fontSize(9).font('Helvetica');
  doc.text('Hyderabad Telangana 500098', 140, yPos);
  yPos += 12;
  doc.text('India', 140, yPos);
  yPos += 12;
  doc.text('GSTIN 36AAIFL5524C1ZJ', 140, yPos);
  yPos += 12;
  doc.text('8008413800', 140, yPos);
  yPos += 12;
  doc.text('livatosolutions@gmail.com', 140, yPos);
  yPos += 12;
  doc.text('www.livatosolutions.com', 140, yPos);

  // TAX INVOICE header on right
  doc.fontSize(24).font('Helvetica-Bold').text('TAX INVOICE', 400, 50, { align: 'right', width: 145 });

  // Invoice details table
  yPos = 150;
  const leftCol = 50;
  const rightCol = 320;

  // Left column - Invoice details
  doc.fontSize(8).font('Helvetica-Bold');
  doc.text('#', leftCol, yPos);
  doc.font('Helvetica').text(`: ${invoice.invoiceNumber}`, leftCol + 80, yPos);
  yPos += 15;

  doc.font('Helvetica-Bold').text('Invoice Date', leftCol, yPos);
  doc.font('Helvetica').text(`: ${new Date(invoice.createdAt).toLocaleDateString('en-GB')}`, leftCol + 80, yPos);
  yPos += 15;

  doc.font('Helvetica-Bold').text('Terms', leftCol, yPos);
  doc.font('Helvetica').text(': Due on Receipt', leftCol + 80, yPos);
  yPos += 15;

  doc.font('Helvetica-Bold').text('Due Date', leftCol, yPos);
  doc.font('Helvetica').text(`: ${invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('en-GB') : 'N/A'}`, leftCol + 80, yPos);

  // Right column - Place of supply
  yPos = 165;
  doc.font('Helvetica-Bold').text('Place Of Supply', rightCol, yPos);
  doc.font('Helvetica').text(`: ${invoice.placeOfSupply || 'N/A'}`, rightCol + 80, yPos);

  // Bill To and Ship To section
  yPos = 220;
  doc.rect(40, yPos, pageWidth - 80, 100).stroke();
  doc.moveTo(pageWidth / 2, yPos).lineTo(pageWidth / 2, yPos + 100).stroke();

  doc.fontSize(9).font('Helvetica-Bold').text('Bill To', 50, yPos + 10);
  doc.font('Helvetica-Bold').text('Ship To', pageWidth / 2 + 10, yPos + 10);

  yPos += 25;
  doc.fontSize(8).font('Helvetica-Bold').text(invoice.customerName, 50, yPos, { width: 220 });

  if (invoice.billingAddress) {
    yPos += 15;
    doc.font('Helvetica').text(invoice.billingAddress, 50, yPos, { width: 220 });
  }

  if (invoice.customerGstNumber) {
    yPos += 25;
    doc.font('Helvetica').text(`GSTIN ${invoice.customerGstNumber}`, 50, yPos);
  }

  // Ship To
  yPos = 245;
  if (invoice.shippingAddress) {
    doc.fontSize(8).font('Helvetica').text(invoice.shippingAddress, pageWidth / 2 + 10, yPos, { width: 220 });
  }

  // Subject/PO Reference (if in notes)
  yPos = 335;
  if (invoice.notes && invoice.notes.includes('PO')) {
    doc.rect(40, yPos, pageWidth - 80, 25).stroke();
    doc.fontSize(8).font('Helvetica-Bold').text('Subject :', 50, yPos + 8);
    const poRef = invoice.notes.split('\n').find(line => line.toLowerCase().includes('po') || line.toLowerCase().includes('ref'));
    if (poRef) {
      doc.font('Helvetica').text(poRef, 50, yPos + 18);
    }
    yPos += 35;
  }

  // Items Table
  const tableTop = yPos;
  const col1 = 45;
  const col2 = 70;
  const col3 = 280;
  const col4 = 340;
  const col5 = 385;
  const col6 = 445;
  const col7 = 480;
  const col8 = 520;

  // Table header
  doc.rect(40, tableTop, pageWidth - 80, 20).fillAndStroke('#4169E1', '#000');
  doc.fillColor('#FFF').fontSize(8).font('Helvetica-Bold');
  doc.text('#', col1, tableTop + 6);
  doc.text('Item & Description', col2, tableTop + 6);
  doc.text('HSN/SAC', col3, tableTop + 6);
  doc.text('Qty', col4, tableTop + 6);
  doc.text('Rate', col5, tableTop + 6);
  doc.text('IGST%', col6, tableTop + 6);
  doc.text('Amt', col7, tableTop + 6);
  doc.text('Amount', col8, tableTop + 6);

  yPos = tableTop + 20;
  doc.fillColor('#000');

  // Table rows
  invoice.items.forEach((item, index) => {
    const rowHeight = 30;
    doc.rect(40, yPos, pageWidth - 80, rowHeight).stroke();

    // Vertical lines
    doc.moveTo(col2 - 5, yPos).lineTo(col2 - 5, yPos + rowHeight).stroke();
    doc.moveTo(col3 - 5, yPos).lineTo(col3 - 5, yPos + rowHeight).stroke();
    doc.moveTo(col4 - 5, yPos).lineTo(col4 - 5, yPos + rowHeight).stroke();
    doc.moveTo(col5 - 5, yPos).lineTo(col5 - 5, yPos + rowHeight).stroke();
    doc.moveTo(col6 - 5, yPos).lineTo(col6 - 5, yPos + rowHeight).stroke();
    doc.moveTo(col7 - 5, yPos).lineTo(col7 - 5, yPos + rowHeight).stroke();
    doc.moveTo(col8 - 5, yPos).lineTo(col8 - 5, yPos + rowHeight).stroke();

    doc.fontSize(7).font('Helvetica');
    doc.text((index + 1).toString(), col1, yPos + 5);
    doc.text(item.itemName, col2, yPos + 5, { width: 200 });
    if (item.description) {
      doc.fontSize(6).text(item.description, col2, yPos + 15, { width: 200 });
    }
    doc.fontSize(7);
    doc.text(item.hsnCode, col3, yPos + 10);
    doc.text(`${Number(item.quantity).toLocaleString('en-IN')} ${item.unit}`, col4, yPos + 10);
    doc.text(Number(item.unitPrice).toFixed(2), col5, yPos + 10);
    doc.text(`${Number(item.gstRate)}%`, col6, yPos + 10);
    doc.text(Number(item.igst || (item.taxableAmount * item.gstRate / 100)).toLocaleString('en-IN', {minimumFractionDigits: 2}), col7, yPos + 10);
    doc.text(Number(item.taxableAmount).toLocaleString('en-IN', {minimumFractionDigits: 2}), col8, yPos + 10);

    yPos += rowHeight;
  });

  // Totals section
  yPos += 10;
  const totalLeft = 50;
  const totalRight = 420;

  // Total in words
  doc.fontSize(8).font('Helvetica-Bold').text('Total In Words', totalLeft, yPos);
  yPos += 12;
  const totalInWords = `Indian Rupee ${numberToWordsIndian(invoice.total)} Only`;
  doc.fontSize(8).font('Helvetica-BoldOblique').text(totalInWords, totalLeft, yPos, { width: 300 });

  // Totals column
  let totalsY = yPos - 12;
  doc.fontSize(9).font('Helvetica');
  doc.text('Sub Total', totalRight, totalsY);
  doc.text(Number(invoice.subtotal).toLocaleString('en-IN', {minimumFractionDigits: 2}), 520, totalsY, { align: 'right', width: 50 });
  totalsY += 15;

  if (invoice.igstAmount > 0) {
    doc.text(`IGST18 (18%)`, totalRight, totalsY);
    doc.text(Number(invoice.igstAmount).toLocaleString('en-IN', {minimumFractionDigits: 2}), 520, totalsY, { align: 'right', width: 50 });
    totalsY += 15;
  }

  if (invoice.cgstAmount > 0) {
    doc.text(`CGST (9%)`, totalRight, totalsY);
    doc.text(Number(invoice.cgstAmount).toLocaleString('en-IN', {minimumFractionDigits: 2}), 520, totalsY, { align: 'right', width: 50 });
    totalsY += 15;
  }

  if (invoice.sgstAmount > 0) {
    doc.text(`SGST (9%)`, totalRight, totalsY);
    doc.text(Number(invoice.sgstAmount).toLocaleString('en-IN', {minimumFractionDigits: 2}), 520, totalsY, { align: 'right', width: 50 });
    totalsY += 15;
  }

  doc.font('Helvetica-Bold').text('Total', totalRight, totalsY);
  doc.text(`₹${Number(invoice.total).toLocaleString('en-IN', {minimumFractionDigits: 2})}`, 490, totalsY, { align: 'right', width: 80 });

  // Notes
  yPos += 60;
  if (invoice.notes) {
    doc.fontSize(8).font('Helvetica-Bold').text('Notes', totalLeft, yPos);
    yPos += 12;
    doc.font('Helvetica').text(invoice.notes, totalLeft, yPos, { width: 300 });
    yPos += 40;
  }

  // Terms & Conditions
  if (invoice.termsAndConditions) {
    doc.fontSize(8).font('Helvetica-Bold').text('Terms & Conditions', totalLeft, yPos);
    yPos += 12;
    doc.font('Helvetica').text(invoice.termsAndConditions, totalLeft, yPos, { width: 300 });
  }

  // Authorized Signature
  doc.fontSize(9).font('Helvetica').text('Authorized Signature', 450, pageHeight - 100);

  // Draw a simple circular stamp (since we don't have the actual stamp image)
  doc.circle(510, pageHeight - 150, 40).stroke('#4169E1');
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#4169E1').text('LIVATO', 485, pageHeight - 165);
  doc.fontSize(7).text('SOLUTIONS', 480, pageHeight - 150);
  doc.fillColor('#000');

  return doc;
}
