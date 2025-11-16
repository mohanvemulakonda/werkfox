import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface InvoiceItem {
  itemName: string;
  description: string | null;
  hsnCode: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  taxableAmount: number;
  gstRate: number;
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

export function generateInvoicePDF(invoice: InvoiceData): jsPDF {
  const doc = new jsPDF();

  // Set font
  doc.setFont('helvetica');

  // Company Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Livato Solutions', 14, 20);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Hyderabad Telangana 500098', 14, 27);
  doc.text('India', 14, 32);
  doc.text('GSTIN: 36AAIFL5524C1ZJ', 14, 37);
  doc.text('Phone: 8008413800', 14, 42);
  doc.text('Email: livatosolutions@gmail.com', 14, 47);

  // Invoice Type and Number
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const invoiceTitle = invoice.type === 'INVOICE' ? 'TAX INVOICE' : 'QUOTATION';
  doc.text(invoiceTitle, 200, 20, { align: 'right' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice #: ${invoice.invoiceNumber}`, 200, 30, { align: 'right' });
  doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString('en-IN')}`, 200, 35, { align: 'right' });
  if (invoice.dueDate) {
    doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString('en-IN')}`, 200, 40, { align: 'right' });
  }

  // Customer Details
  let currentY = 60;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', 14, currentY);
  doc.text('Ship To:', 110, currentY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  // Bill To
  currentY += 6;
  doc.text(invoice.customerName, 14, currentY);

  if (invoice.billingAddress) {
    const billLines = doc.splitTextToSize(invoice.billingAddress, 85);
    currentY += 5;
    doc.text(billLines, 14, currentY);
    currentY += (billLines.length * 5);
  }

  if (invoice.customerGstNumber) {
    currentY += 5;
    doc.text(`GSTIN: ${invoice.customerGstNumber}`, 14, currentY);
  }

  // Ship To
  let shipY = 66;
  if (invoice.shippingAddress) {
    const shipLines = doc.splitTextToSize(invoice.shippingAddress, 85);
    doc.text(shipLines, 110, shipY);
    shipY += (shipLines.length * 5);
  }

  if (invoice.placeOfSupply) {
    shipY += 5;
    doc.text(`Place of Supply: ${invoice.placeOfSupply}`, 110, shipY);
  }

  // Items Table
  currentY = Math.max(currentY, shipY) + 15;

  const tableData = invoice.items.map((item, index) => {
    return [
      (index + 1).toString(),
      item.itemName + (item.description ? `\n${item.description}` : ''),
      item.hsnCode,
      `${Number(item.quantity).toLocaleString('en-IN')} ${item.unit}`,
      `₹${Number(item.unitPrice).toFixed(2)}`,
      `${Number(item.gstRate)}%`,
      `₹${Number(item.taxableAmount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    ];
  });

  autoTable(doc, {
    startY: currentY,
    head: [['#', 'Item & Description', 'HSN/SAC', 'Qty', 'Rate', 'GST %', 'Amount']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 8
    },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 60 },
      2: { cellWidth: 20, halign: 'right' },
      3: { cellWidth: 25, halign: 'right' },
      4: { cellWidth: 25, halign: 'right' },
      5: { cellWidth: 20, halign: 'right' },
      6: { cellWidth: 30, halign: 'right' }
    }
  });

  // Get final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY || currentY + 50;

  // Totals Section
  let totalsY = finalY + 10;
  const totalsX = 130;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');

  doc.text('Subtotal:', totalsX, totalsY);
  doc.text(`₹${Number(invoice.subtotal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 200, totalsY, { align: 'right' });
  totalsY += 6;

  if (Number(invoice.igstAmount) > 0) {
    doc.text('IGST (18%):', totalsX, totalsY);
    doc.text(`₹${Number(invoice.igstAmount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 200, totalsY, { align: 'right' });
    totalsY += 6;
  }

  if (Number(invoice.cgstAmount) > 0) {
    doc.text('CGST (9%):', totalsX, totalsY);
    doc.text(`₹${Number(invoice.cgstAmount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 200, totalsY, { align: 'right' });
    totalsY += 6;
  }

  if (Number(invoice.sgstAmount) > 0) {
    doc.text('SGST (9%):', totalsX, totalsY);
    doc.text(`₹${Number(invoice.sgstAmount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 200, totalsY, { align: 'right' });
    totalsY += 6;
  }

  // Total line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.line(totalsX, totalsY - 2, 200, totalsY - 2);
  doc.text('Total:', totalsX, totalsY + 3);
  doc.text(`₹${Number(invoice.total).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 200, totalsY + 3, { align: 'right' });
  totalsY += 9;

  if (invoice.paidAmount && Number(invoice.paidAmount) > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Amount Paid:', totalsX, totalsY);
    doc.text(`₹${Number(invoice.paidAmount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 200, totalsY, { align: 'right' });
    totalsY += 6;

    doc.setFont('helvetica', 'bold');
    doc.text('Balance Due:', totalsX, totalsY);
    doc.text(`₹${(Number(invoice.total) - Number(invoice.paidAmount)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 200, totalsY, { align: 'right' });
  }

  // Notes and Terms
  totalsY += 15;

  if (invoice.notes && totalsY < 250) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Notes:', 14, totalsY);
    doc.setFont('helvetica', 'normal');
    const noteLines = doc.splitTextToSize(invoice.notes, 180);
    doc.text(noteLines, 14, totalsY + 5);
    totalsY += (noteLines.length * 5) + 10;
  }

  if (invoice.termsAndConditions && totalsY < 260) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Terms & Conditions:', 14, totalsY);
    doc.setFont('helvetica', 'normal');
    const termsLines = doc.splitTextToSize(invoice.termsAndConditions, 180);
    doc.text(termsLines, 14, totalsY + 5);
  }

  return doc;
}
