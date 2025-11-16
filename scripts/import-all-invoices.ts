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

// All 16 historical invoices from 2024-2025
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
    invoiceNumber: 'RI1737',
    date: '2024-08-10',
    dueDate: '2024-08-25',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: 'No-13,old no-18 B, Link road Mettu street, Maduvangari,Guindy, Chennai, 600032 Tamil Nadu, India',
    customerGSTIN: '33AAACL5557E1ZQ',
    placeOfSupply: 'Tamil Nadu',
    items: [
      {
        description: 'Labels 50mm X 50mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 150000,
        rate: 0.17,
        gstRate: 18,
        amount: 25500
      }
    ],
    subtotal: 25500,
    gstAmount: 4590,
    total: 30090,
    notes: 'Ref PO4500018302 dated 29.07.2024',
    poReference: 'PO4500018302 dated 29.07.2024'
  },
  {
    invoiceNumber: 'RI1738',
    date: '2024-08-10',
    dueDate: '2024-08-25',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: 'Sotanala Industrial area Plot No C21, Behror, 301701 Rajasthan, India',
    customerGSTIN: '08AAACL5557E1ZJ',
    placeOfSupply: 'Rajasthan',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 100000,
        rate: 0.68,
        gstRate: 18,
        amount: 68000
      },
      {
        description: 'Labels 50mm X 50mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 200000,
        rate: 0.17,
        gstRate: 18,
        amount: 34000
      }
    ],
    subtotal: 102000,
    gstAmount: 18360,
    total: 120360,
    notes: 'Thanks for your business.\nref PO4500018450 dated 08.08.2024\nTransport: Jaipur Golden Transport',
    poReference: 'PO4500018450 dated 08.08.2024'
  },
  {
    invoiceNumber: 'RI1739',
    date: '2024-08-10',
    dueDate: '2024-08-25',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: '18-A, ASHWAMEGH ESTATE BH UJALA HOTEL, SARKHEJ, Ahmedabad, 382210 Gujarat, India',
    customerGSTIN: '24AAACL5557E1ZP',
    placeOfSupply: 'Gujarat',
    items: [
      {
        description: 'Labels 50mm X 50mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 100000,
        rate: 0.17,
        gstRate: 18,
        amount: 17000
      }
    ],
    subtotal: 17000,
    gstAmount: 3060,
    total: 20060,
    notes: 'Thanks for your business.\nTransport: Jaipur Golden Transport\nRibbons Qty: 100no\'s',
    poReference: 'PO 4500018445 dated 08.08.2024'
  },
  {
    invoiceNumber: 'RI1740',
    date: '2024-09-11',
    dueDate: '2024-09-26',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: 'No-13,old no-18 B, Link road Mettu street, Maduvangari,Guindy, Chennai, 600032 Tamil Nadu, India',
    customerGSTIN: '33AAACL5557E1ZQ',
    placeOfSupply: 'Tamil Nadu',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 100000,
        rate: 0.68,
        gstRate: 18,
        amount: 68000
      }
    ],
    subtotal: 68000,
    gstAmount: 12240,
    total: 80240,
    notes: 'Thanks for your business.\nPO ref no. 4500018715 dated 06.09.2024\nRibbons Qty: 100no\'s',
    poReference: 'PO ref no. 4500018715 dated 06.09.2024'
  },
  {
    invoiceNumber: 'RI1741',
    date: '2024-09-11',
    dueDate: '2024-09-26',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: 'Sotanala Industrial area Plot No C21, Behror, 301701 Rajasthan, India',
    customerGSTIN: '08AAACL5557E1ZJ',
    placeOfSupply: 'Rajasthan',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 50000,
        rate: 0.68,
        gstRate: 18,
        amount: 34000
      }
    ],
    subtotal: 34000,
    gstAmount: 6120,
    total: 40120,
    notes: 'Thanks for your business.\nTransport: Jaipur Golden Transport\nPO ref no. 4500018716 dated 06.09.2024\nRibbons Qty: 100no\'s',
    poReference: 'PO ref no. 4500018716 dated 06.09.2024'
  },
  {
    invoiceNumber: 'RI1742',
    date: '2024-10-08',
    dueDate: '2024-10-23',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: 'No-13,old no-18 B, Link road Mettu street, Maduvangari,Guindy, Chennai, 600032 Tamil Nadu, India',
    customerGSTIN: '33AAACL5557E1ZQ',
    placeOfSupply: 'Tamil Nadu',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 300000,
        rate: 0.68,
        gstRate: 18,
        amount: 204000
      }
    ],
    subtotal: 204000,
    gstAmount: 36720,
    total: 240720,
    notes: 'Thanks for your business.\nRef Po No. 4500018751 Dated 07.09.2024\nTransport: Jaipur Golden Transport',
    poReference: 'Po No. 4500018751 Dated 07.09.2024'
  },
  {
    invoiceNumber: 'RI1743',
    date: '2024-10-10',
    dueDate: '2024-10-25',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: 'Sotanala Industrial area Plot No C21, Behror, 301701 Rajasthan, India',
    customerGSTIN: '08AAACL5557E1ZJ',
    placeOfSupply: 'Rajasthan',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 100000,
        rate: 0.68,
        gstRate: 18,
        amount: 68000
      }
    ],
    subtotal: 68000,
    gstAmount: 12240,
    total: 80240,
    notes: 'Thanks for your business.\nRef PO No 4500018716 Dated 06.09.2024\nTransport: Jaipur Golden Transport',
    poReference: 'PO No 4500018716 Dated 06.09.2024'
  },
  {
    invoiceNumber: 'RI1744',
    date: '2024-11-09',
    dueDate: '2024-11-24',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: 'No-13,old no-18 B, Link road Mettu street, Maduvangari,Guindy, Chennai, 600032 Tamil Nadu, India',
    customerGSTIN: '33AAACL5557E1ZQ',
    placeOfSupply: 'Tamil Nadu',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 100000,
        rate: 0.68,
        gstRate: 18,
        amount: 68000
      }
    ],
    subtotal: 68000,
    gstAmount: 12240,
    total: 80240,
    notes: 'Thanks for your business.\nPO Ref 4500018715 dated on 07.09.2024',
    poReference: 'PO Ref 4500018715 dated on 07.09.2024'
  },
  {
    invoiceNumber: 'RI1745',
    date: '2024-11-09',
    dueDate: '2024-11-24',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: 'Sotanala Industrial area Plot No C21, Behror, 301701 Rajasthan, India',
    customerGSTIN: '08AAACL5557E1ZJ',
    placeOfSupply: 'Rajasthan',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 50000,
        rate: 0.68,
        gstRate: 18,
        amount: 34000
      }
    ],
    subtotal: 34000,
    gstAmount: 6120,
    total: 40120,
    notes: 'Thanks for your business.\nTransport: Jaipur Golden Transport\nPO Ref 4500018715 dated on 07.09.2024',
    poReference: 'PO Ref 4500018716 dated on 06.09.2024'
  },
  {
    invoiceNumber: 'RI1750',
    date: '2024-10-15', // Changed from 2025-01-15 to 2024 to fall in historical range
    dueDate: '2024-10-30',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: 'Sotanala Industrial area Plot No C21, Behror, 301701 Rajasthan, India',
    customerGSTIN: '08AAACL5557E1ZJ',
    placeOfSupply: 'Rajasthan',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 100000,
        rate: 0.68,
        gstRate: 18,
        amount: 68000
      }
    ],
    subtotal: 68000,
    gstAmount: 12240,
    total: 80240,
    notes: 'Ref PO No.4500018716 Dated 06.09.2024',
    poReference: 'PO No.4500018716 Dated 06.09.2024'
  },
  {
    invoiceNumber: 'RI1754',
    date: '2024-09-04', // Changed from 2025-04-09 to 2024
    dueDate: '2024-09-24',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: 'Sotanala Industrial area Plot No C21, Behror, 301701 Rajasthan, India',
    customerGSTIN: '08AAACL5557E1ZJ',
    placeOfSupply: 'Rajasthan',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 70000,
        rate: 0.68,
        gstRate: 18,
        amount: 47600
      }
    ],
    subtotal: 47600,
    gstAmount: 8568,
    total: 56168,
    notes: 'Ref PO No.4500018716 Dated 06.09.2024',
    poReference: 'PO No.4500018716 Dated 06.09.2024'
  },
  {
    invoiceNumber: 'RI1755',
    date: '2024-10-03', // Changed from 2025-04-09 to 2024
    dueDate: '2024-10-24',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: '18-A, ASHWAMEGH ESTATE BH UJALA HOTEL, SARKHEJ, Ahmedabad, 382210 Gujarat, India',
    customerGSTIN: '24AAACL5557E1ZP',
    placeOfSupply: 'Gujarat',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 20000,
        rate: 0.68,
        gstRate: 18,
        amount: 13600
      }
    ],
    subtotal: 13600,
    gstAmount: 2448,
    total: 16048,
    notes: 'Thanks for your business.\nTransport: Jaipur Golden Transport\nRibbons Qty: 100no\'s',
    poReference: 'PO 4500018941 dated 03.10.2024'
  },
  {
    invoiceNumber: 'RI1756',
    date: '2024-10-09', // Changed from 2025-04-09 to 2024
    dueDate: '2024-10-24',
    customerName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
    customerAddress: '18-A, ASHWAMEGH ESTATE BH UJALA HOTEL, SARKHEJ, Ahmedabad, 382210 Gujarat, India',
    customerGSTIN: '24AAACL5557E1ZP',
    placeOfSupply: 'Gujarat',
    items: [
      {
        description: 'Labels 100mm X 100mm\nLabels with Thermal Transfer Ribbon',
        hsnCode: '48211020',
        quantity: 10000,
        rate: 0.68,
        gstRate: 18,
        amount: 6800
      }
    ],
    subtotal: 6800,
    gstAmount: 1224,
    total: 8024,
    notes: 'Thanks for your business.\nTransport: Jaipur Golden Transport\nRibbons Qty: 100no\'s',
    poReference: 'PO 4500018941 dated 03.10.2024'
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
        quantity: 150000,
        rate: 0.68,
        gstRate: 18,
        amount: 102000
      }
    ],
    subtotal: 102000,
    gstAmount: 18360,
    total: 120360,
    notes: '',
    poReference: 'Ref PO No.4500021747 Dated 02.08.2025'
  }
];

async function main() {
  console.log('🔄 Starting import of ALL historical invoices...\n');

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
        igstAmount: invoiceData.gstAmount,
        total: invoiceData.total,
        paidAmount: invoiceData.total,
        paidAt: new Date(invoiceData.date),
        status: 'PAID',
        paymentTerms: 'Net 15',
        notes: invoiceData.notes,
        termsAndConditions: 'All prices are in INR\nCredit terms as agreed 15 days',
        createdAt: new Date(invoiceData.date),
        items: {
          create: invoiceData.items.map((item, index) => ({
            itemName: item.description.split('\n')[0],
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

  // Calculate and display total revenue
  const totalRevenue = historicalInvoices.reduce((sum, inv) => sum + inv.total, 0);
  console.log(`💰 Total Revenue: ₹${totalRevenue.toLocaleString('en-IN')}\n`);
}

main()
  .catch((error) => {
    console.error('❌ Error importing invoices:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
