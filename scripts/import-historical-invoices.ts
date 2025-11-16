import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerName: string;
  customerAddress: string;
  customerGSTIN: string;
  placeOfSupply: string;
  items: Array<{
    description: string;
    hsnCode: string;
    quantity: number;
    rate: number;
    gstRate: number;
    amount: number;
  }>;
  subtotal: number;
  gstAmount: number;
  total: number;
  notes?: string;
  poReference?: string;
}

// Historical invoices from 2024
const historicalInvoices: InvoiceData[] = [
  {
    invoiceNumber: 'RI1734',
    date: '2024-06-19',
    dueDate: '2024-06-19',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: 'Sotanala Industrial area Plot No C21, Behror, 301701 Rajasthan, India',
    customerGSTIN: '08AAACL5557E1ZJ',
    placeOfSupply: 'Rajasthan',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 15000,
        rate: 0.68,
        gstRate: 18,
        amount: 10200
      }
    ],
    subtotal: 10200,
    gstAmount: 1836,
    total: 12036,
    notes: 'Thanks for your business.\nTransport: Jaipur Golden Transport',
    poReference: 'PO No 453017895 dated 12.06.2024'
  },
  {
    invoiceNumber: 'RI1736',
    date: '2024-07-10',
    dueDate: '2024-07-10',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: 'No-13,old no-18 B, Link road Mettu street, Maduvangari,Guindy, Chennai, 600032 Tamil Nadu, India',
    customerGSTIN: '33AAACL5557E1ZQ',
    placeOfSupply: 'Tamil Nadu',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 50000,
        rate: 0.68,
        gstRate: 18,
        amount: 34000
      },
      {
        description: 'Labels 50mm X 50mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 50000,
        rate: 0.17,
        gstRate: 18,
        amount: 8500
      }
    ],
    subtotal: 42500,
    gstAmount: 7650,
    total: 50150,
    notes: 'Thanks for your business',
    poReference: 'PO No. 4500018158 dated 08.07.2024'
  },
  {
    invoiceNumber: 'RI1775',
    date: '2024-08-12',
    dueDate: '2024-08-27',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: 'No-13,old no-18 B, Link road Mettu street, Maduvangari,Guindy, Chennai, 600032 Tamil Nadu, India',
    customerGSTIN: '33AAACL5557E1ZQ',
    placeOfSupply: 'Tamil Nadu',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 1500000,
        rate: 0.68,
        gstRate: 18,
        amount: 1020000
      }
    ],
    subtotal: 1020000,
    gstAmount: 18360,
    total: 1020360,
    notes: '',
    poReference: 'Ref PO No.4500021747 Dated 02.08.2025'
  }
];

async function main() {
  console.log('🔄 Starting import of historical invoices...\n');

  let importedCount = 0;
  let skippedCount = 0;

  for (const invoiceData of historicalInvoices) {
    // Check if invoice already exists
    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        invoiceNumber: invoiceData.invoiceNumber
      }
    });

    if (existingInvoice) {
      console.log(`⏭️  Skipping ${invoiceData.invoiceNumber} - already exists`);
      skippedCount++;
      continue;
    }

    console.log(`📄 Importing invoice ${invoiceData.invoiceNumber}...`);

    // Create invoice with items
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: invoiceData.invoiceNumber,
        type: 'INVOICE',
        customerName: invoiceData.customerName,
        customerEmail: 'info@myklaticrete.com',
        customerPhone: '+91-7010043720',
        customerGstNumber: invoiceData.customerGSTIN,
        billingAddress: invoiceData.customerAddress,
        shippingAddress: invoiceData.customerAddress,
        placeOfSupply: invoiceData.placeOfSupply,
        dueDate: new Date(invoiceData.dueDate),
        currency: 'INR',
        subtotal: invoiceData.subtotal,
        totalTax: invoiceData.gstAmount,
        igstAmount: invoiceData.gstAmount, // Since these are interstate invoices
        total: invoiceData.total,
        paidAmount: invoiceData.total, // Mark as paid since these are historical
        paidAt: new Date(invoiceData.date),
        status: 'PAID',
        paymentTerms: 'Net 15',
        notes: invoiceData.notes,
        termsAndConditions: 'All prices are in INR\nCredit terms as agreed 15 days',
        createdAt: new Date(invoiceData.date), // Use invoice date as creation date
        items: {
          create: invoiceData.items.map((item, index) => ({
            itemName: item.description.split('\n')[0], // First line as item name
            description: item.description,
            hsnCode: item.hsnCode,
            quantity: item.quantity,
            unit: 'Pcs',
            unitPrice: item.rate,
            taxableAmount: item.amount,
            gstRate: item.gstRate,
            igst: (item.amount * item.gstRate) / 100,
            total: item.amount + (item.amount * item.gstRate) / 100
          }))
        }
      },
      include: {
        items: true
      }
    });

    console.log(`   ✅ Invoice ${invoiceData.invoiceNumber} created`);
    console.log(`   📅 Date: ${invoiceData.date}`);
    console.log(`   💰 Total: ₹${invoiceData.total.toLocaleString('en-IN')}`);
    console.log(`   📦 Items: ${invoiceData.items.length}`);
    console.log('');

    importedCount++;
  }

  console.log('═══════════════════════════════════════');
  console.log(`✅ Import completed!`);
  console.log(`   Imported: ${importedCount} invoices`);
  console.log(`   Skipped: ${skippedCount} invoices (already exist)`);
  console.log('═══════════════════════════════════════\n');
}

main()
  .catch((error) => {
    console.error('❌ Error importing invoices:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
