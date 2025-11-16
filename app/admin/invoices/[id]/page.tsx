import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import InvoiceActions from './InvoiceActions.tsx';

interface PageProps {
  params: {
    id: string;
  };
}

async function getInvoice(id: string) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: parseInt(id) },
    include: {
      items: true
    }
  });

  if (!invoice) {
    return null;
  }

  return invoice;
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

export default async function InvoiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const invoice = await getInvoice(id);

  if (!invoice) {
    notFound();
  }

  const totalInWords = `Indian Rupee ${numberToWordsIndian(Number(invoice.total))} Only`;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin/invoices"
            className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block font-inter"
          >
            ← Back to Invoices
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 font-open-sans">
            Invoice {invoice.invoiceNumber}
          </h1>
          <p className="text-gray-600 font-inter">
            {invoice.type === 'INVOICE' ? 'Tax Invoice' : 'Quotation'}
          </p>
        </div>
        <InvoiceActions invoiceId={invoice.id} currentStatus={invoice.status} />
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <span className={`inline-flex items-center px-3 py-1 text-sm font-medium border rounded font-inter ${
          invoice.status === 'PAID' ? 'bg-green-50 text-green-800 border-green-200' :
          invoice.status === 'SENT' ? 'bg-blue-50 text-blue-800 border-blue-200' :
          invoice.status === 'DRAFT' ? 'bg-gray-50 text-gray-800 border-gray-200' :
          invoice.status === 'OVERDUE' ? 'bg-red-50 text-red-800 border-red-200' :
          'bg-yellow-50 text-yellow-800 border-yellow-200'
        }`}>
          {invoice.status}
        </span>
      </div>

      {/* Invoice Preview - Professional Layout */}
      <div className="bg-white shadow-lg border-2 border-gray-300 rounded-lg overflow-hidden">
        {/* Outer border padding */}
        <div className="p-4">
          <div className="border-2 border-gray-400 rounded">
            <div className="p-8">
              {/* Logo and Company Header */}
              <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image
                      src="/Livato Logo.png"
                      alt="Livato Solutions"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-open-sans mb-2">Livato Solutions</h2>
                    <p className="text-xs text-gray-600 font-inter">Hyderabad Telangana 500098</p>
                    <p className="text-xs text-gray-600 font-inter">India</p>
                    <p className="text-xs text-gray-600 font-inter">GSTIN: 36AAIFL5524C1ZJ</p>
                    <p className="text-xs text-gray-600 font-inter">Phone: 8008413800</p>
                    <p className="text-xs text-gray-600 font-inter">Email: livatosolutions@gmail.com</p>
                    <p className="text-xs text-gray-600 font-inter">www.livatosolutions.com</p>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="text-3xl font-bold text-blue-600 font-open-sans mb-4">
                    {invoice.type === 'QUOTE' ? 'QUOTATION' :
                     invoice.type === 'PROFORMA' ? 'PROFORMA INVOICE' :
                     'TAX INVOICE'}
                  </h3>
                </div>
              </div>

              {/* Invoice Details Row */}
              <div className="grid grid-cols-2 gap-8 mb-6 pb-6 border-b border-gray-200">
                <div className="space-y-2">
                  <div className="flex text-xs font-inter">
                    <span className="font-semibold text-gray-900 w-28">#</span>
                    <span className="text-gray-600">: {invoice.invoiceNumber}</span>
                  </div>
                  <div className="flex text-xs font-inter">
                    <span className="font-semibold text-gray-900 w-28">Invoice Date</span>
                    <span className="text-gray-600">: {new Date(invoice.createdAt).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex text-xs font-inter">
                    <span className="font-semibold text-gray-900 w-28">Terms</span>
                    <span className="text-gray-600">: {invoice.paymentTerms || 'Due on Receipt'}</span>
                  </div>
                  <div className="flex text-xs font-inter">
                    <span className="font-semibold text-gray-900 w-28">Due Date</span>
                    <span className="text-gray-600">: {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('en-GB') : 'N/A'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex text-xs font-inter">
                    <span className="font-semibold text-gray-900 w-32">Place Of Supply</span>
                    <span className="text-gray-600">: {invoice.placeOfSupply || 'N/A'}</span>
                  </div>
                </div>
              </div>

        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2 font-inter">Bill To</h4>
            <p className="text-sm font-medium text-gray-900 font-inter">{invoice.customerName}</p>
            {invoice.billingAddress && (
              <p className="text-sm text-gray-600 whitespace-pre-line font-inter">{invoice.billingAddress}</p>
            )}
            {invoice.customerGstNumber && (
              <p className="text-sm text-gray-600 font-inter">GSTIN: {invoice.customerGstNumber}</p>
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2 font-inter">Ship To</h4>
            {invoice.shippingAddress && (
              <p className="text-sm text-gray-600 whitespace-pre-line font-inter">{invoice.shippingAddress}</p>
            )}
            {invoice.placeOfSupply && (
              <p className="text-sm text-gray-600 font-inter">Place of Supply: {invoice.placeOfSupply}</p>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-semibold text-gray-900 font-inter">#</th>
                <th className="text-left py-3 text-sm font-semibold text-gray-900 font-inter">Item & Description</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-900 font-inter">HSN/SAC</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-900 font-inter">Qty</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-900 font-inter">Rate</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-900 font-inter">GST %</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-900 font-inter">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-600 font-inter">{index + 1}</td>
                  <td className="py-3 text-sm text-gray-900 font-inter">
                    <div className="font-medium">{item.itemName}</div>
                    {item.description && (
                      <div className="text-xs text-gray-600 mt-1">{item.description}</div>
                    )}
                  </td>
                  <td className="py-3 text-sm text-gray-600 text-right font-inter">{item.hsnCode}</td>
                  <td className="py-3 text-sm text-gray-600 text-right font-inter">
                    {Number(item.quantity).toLocaleString('en-IN')} {item.unit}
                  </td>
                  <td className="py-3 text-sm text-gray-600 text-right font-inter">
                    ₹{Number(item.unitPrice).toFixed(2)}
                  </td>
                  <td className="py-3 text-sm text-gray-600 text-right font-inter">
                    {Number(item.gstRate)}%
                  </td>
                  <td className="py-3 text-sm font-medium text-gray-900 text-right font-inter">
                    ₹{Number(item.taxableAmount).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-80">
            <div className="flex justify-between py-2 text-sm font-inter">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900 font-medium">₹{Number(invoice.subtotal).toLocaleString('en-IN')}</span>
            </div>
            {Number(invoice.igstAmount) > 0 && (
              <div className="flex justify-between py-2 text-sm font-inter">
                <span className="text-gray-600">IGST (18%)</span>
                <span className="text-gray-900 font-medium">₹{Number(invoice.igstAmount).toLocaleString('en-IN')}</span>
              </div>
            )}
            {Number(invoice.cgstAmount) > 0 && (
              <div className="flex justify-between py-2 text-sm font-inter">
                <span className="text-gray-600">CGST (9%)</span>
                <span className="text-gray-900 font-medium">₹{Number(invoice.cgstAmount).toLocaleString('en-IN')}</span>
              </div>
            )}
            {Number(invoice.sgstAmount) > 0 && (
              <div className="flex justify-between py-2 text-sm font-inter">
                <span className="text-gray-600">SGST (9%)</span>
                <span className="text-gray-900 font-medium">₹{Number(invoice.sgstAmount).toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between py-3 text-base font-semibold border-t border-gray-200 mt-2 font-inter">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">₹{Number(invoice.total).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Notes & Terms */}
        {(invoice.notes || invoice.termsAndConditions) && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            {invoice.notes && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 font-inter">Notes</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line font-inter">{invoice.notes}</p>
              </div>
            )}
            {invoice.termsAndConditions && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2 font-inter">Terms & Conditions</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line font-inter">{invoice.termsAndConditions}</p>
              </div>
            )}
          </div>
        )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
