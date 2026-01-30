import { notFound } from 'next/navigation';
import Link from 'next/link';

// Demo invoices data
const demoInvoices = [
  {
    id: 1,
    invoiceNumber: 'INV-2026-001',
    type: 'INVOICE',
    status: 'PAID',
    customerName: 'Tech Manufacturing Pvt Ltd',
    customerEmail: 'accounts@techmanufacturing.com',
    customerPhone: '+91 98765 43210',
    customerCompany: 'Tech Manufacturing Pvt Ltd',
    customerGstNumber: '27AABCT1234F1ZH',
    billingAddress: 'Plot No. 45, MIDC Industrial Area\nAndheri East, Mumbai 400093\nMaharashtra, India',
    shippingAddress: 'Plot No. 45, MIDC Industrial Area\nAndheri East, Mumbai 400093\nMaharashtra, India',
    placeOfSupply: 'Maharashtra (27)',
    paymentTerms: 'Net 30',
    poReference: 'PO-2026-001',
    dueDate: new Date('2026-02-25'),
    createdAt: new Date('2026-01-25'),
    subtotal: 105932,
    totalTax: 19068,
    igstAmount: 0,
    cgstAmount: 9534,
    sgstAmount: 9534,
    total: 125000,
    notes: 'Thank you for your business!',
    termsAndConditions: '1. Goods once sold will not be taken back.\n2. Subject to Hyderabad jurisdiction.',
    items: [
      { id: 1, productName: 'Thermal Barcode Labels', quantity: 100, unit: 'Rolls', unitPrice: 450, gstRate: 18 },
      { id: 2, productName: 'Desktop Barcode Printer', quantity: 2, unit: 'Pcs', unitPrice: 12500, gstRate: 18 },
    ],
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditInvoicePage({ params }: PageProps) {
  const { id } = await params;
  const invoice = demoInvoices.find(inv => inv.id === parseInt(id));

  if (!invoice) {
    notFound();
  }

  const docType = invoice.type === 'QUOTE' ? 'Quotation' :
                  invoice.type === 'PROFORMA' ? 'Proforma Invoice' :
                  'Tax Invoice';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href={`/admin/erp/invoices/${invoice.id}`}
          className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block font-inter"
        >
          ← Back to {docType}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">
          Edit {docType} #{invoice.invoiceNumber}
        </h1>
        <p className="text-gray-600 font-inter font-light">
          Update the details of this {docType.toLowerCase()}
        </p>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 p-6">
        <form className="space-y-6">
          {/* Customer Details */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Customer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Company Name</label>
                <input
                  type="text"
                  defaultValue={invoice.customerCompany}
                  className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Contact Name</label>
                <input
                  type="text"
                  defaultValue={invoice.customerName}
                  className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Email</label>
                <input
                  type="email"
                  defaultValue={invoice.customerEmail}
                  className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Phone</label>
                <input
                  type="text"
                  defaultValue={invoice.customerPhone}
                  className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">GST Number</label>
                <input
                  type="text"
                  defaultValue={invoice.customerGstNumber}
                  className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Place of Supply</label>
                <input
                  type="text"
                  defaultValue={invoice.placeOfSupply}
                  className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
                />
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Invoice Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Invoice Number</label>
                <input
                  type="text"
                  defaultValue={invoice.invoiceNumber}
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-50 font-inter"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Payment Terms</label>
                <input
                  type="text"
                  defaultValue={invoice.paymentTerms}
                  className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">PO Reference</label>
                <input
                  type="text"
                  defaultValue={invoice.poReference}
                  className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Line Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase font-inter">Item</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase font-inter">Qty</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase font-inter">Unit</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase font-inter">Price</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase font-inter">GST%</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase font-inter">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          defaultValue={item.productName}
                          className="w-full px-2 py-1 border border-gray-300 text-sm font-inter"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          defaultValue={item.quantity}
                          className="w-20 px-2 py-1 border border-gray-300 text-sm font-inter"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          defaultValue={item.unit}
                          className="w-20 px-2 py-1 border border-gray-300 text-sm font-inter"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          defaultValue={item.unitPrice}
                          className="w-24 px-2 py-1 border border-gray-300 text-sm font-inter"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          defaultValue={item.gstRate}
                          className="w-16 px-2 py-1 border border-gray-300 text-sm font-inter"
                        />
                      </td>
                      <td className="px-3 py-2 text-sm font-medium text-gray-900 font-inter">
                        ₹{(item.quantity * item.unitPrice).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-inter">
              + Add Item
            </button>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm font-inter">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{invoice.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-inter">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">₹{invoice.totalTax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t pt-2 font-inter">
                <span>Total</span>
                <span>₹{invoice.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-inter">Notes</label>
            <textarea
              defaultValue={invoice.notes}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-inter"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 font-inter"
            >
              Save Changes
            </button>
            <Link
              href={`/admin/erp/invoices/${invoice.id}`}
              className="px-6 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-inter"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
