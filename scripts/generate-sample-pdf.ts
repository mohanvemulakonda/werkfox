import { generateInvoicePDF } from '../lib/pdf-generator-jspdf';
import fs from 'fs';
import path from 'path';

// Sample invoice data
const sampleInvoice = {
  invoiceNumber: 'QT2501001',
  type: 'QUOTE',
  createdAt: new Date(),
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  customerName: 'ABC Technologies Pvt Ltd',
  billingAddress: '123 MG Road\nBangalore, Karnataka 560001\nIndia',
  shippingAddress: '456 Park Street\nBangalore, Karnataka 560002\nIndia',
  customerGstNumber: '29ABCDE1234F1Z5',
  placeOfSupply: 'Karnataka',
  paymentTerms: 'Net 30',
  subtotal: 50000,
  cgstAmount: 4500,
  sgstAmount: 4500,
  igstAmount: 0,
  totalTax: 9000,
  total: 59000,
  paidAmount: null,
  notes: 'Thank you for your business!',
  termsAndConditions: '1. Payment is due within 30 days\n2. Late payments will incur interest charges\n3. All prices are in INR',
  items: [
    {
      itemName: 'Custom Software Development',
      description: 'Development of custom CRM system with user management, reporting, and analytics features',
      hsnCode: '998314',
      quantity: 1,
      unit: 'Project',
      unitPrice: 40000,
      taxableAmount: 40000,
      gstRate: 18,
      cgst: 3600,
      sgst: 3600,
      igst: 0
    },
    {
      itemName: 'Website Hosting & Maintenance',
      description: 'Annual hosting and maintenance package including SSL, backups, and security updates',
      hsnCode: '998315',
      quantity: 1,
      unit: 'Year',
      unitPrice: 10000,
      taxableAmount: 10000,
      gstRate: 18,
      cgst: 900,
      sgst: 900,
      igst: 0
    }
  ]
};

console.log('Generating sample PDF...');
const pdfBuffer = generateInvoicePDF(sampleInvoice);
const outputPath = path.join(process.env.HOME || '', 'Downloads', 'Sample-Invoice-Template.pdf');
fs.writeFileSync(outputPath, Buffer.from(pdfBuffer));
console.log(`✓ PDF saved to: ${outputPath}`);
