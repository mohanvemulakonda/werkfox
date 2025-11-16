import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import InvoiceForm from '../../InvoiceForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditInvoicePage({ params }: PageProps) {
  const { id } = await params;

  const invoice = await prisma.invoice.findUnique({
    where: { id: parseInt(id) },
    include: { items: true }
  });

  if (!invoice) {
    notFound();
  }

  // Convert Prisma types to plain objects and map database fields to form fields
  const invoiceData = {
    ...invoice,
    subtotal: Number(invoice.subtotal),
    totalTax: Number(invoice.totalTax),
    igstAmount: Number(invoice.igstAmount),
    cgstAmount: Number(invoice.cgstAmount),
    sgstAmount: Number(invoice.sgstAmount),
    total: Number(invoice.total),
    paidAmount: invoice.paidAmount ? Number(invoice.paidAmount) : null,
    discountAmount: invoice.discountAmount ? Number(invoice.discountAmount) : null,
    discountPercent: invoice.discountPercent ? Number(invoice.discountPercent) : null,
    otherCharges: invoice.otherCharges ? Number(invoice.otherCharges) : null,
    roundOff: invoice.roundOff ? Number(invoice.roundOff) : null,
    shippingCharges: invoice.shippingCharges ? Number(invoice.shippingCharges) : null,
    items: invoice.items.map(item => ({
      productId: item.productId || 0,
      productName: item.itemName, // Map itemName to productName for the form
      description: item.description || '',
      hsnCode: item.hsnCode || '',
      quantity: Number(item.quantity),
      unit: item.unit || 'Nos',
      unitPrice: Number(item.unitPrice),
      discount: Number(item.discount),
      gstRate: Number(item.gstRate),
      amount: Number(item.taxableAmount) // Map taxableAmount to amount for the form
    }))
  };

  const docType = invoice.type === 'QUOTE' ? 'Quotation' :
                  invoice.type === 'PROFORMA' ? 'Proforma Invoice' :
                  'Tax Invoice';

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">
          Edit {docType} #{invoice.invoiceNumber}
        </h1>
        <p className="text-gray-600 font-inter font-light">
          Update the details of this {docType.toLowerCase()}
        </p>
      </div>

      <InvoiceForm invoice={invoiceData} />
    </div>
  );
}
