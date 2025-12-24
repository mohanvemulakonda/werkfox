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
            ← Back to Documents
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 font-open-sans">
            {invoice.type === 'QUOTE' ? 'Quotation' : invoice.type === 'PROFORMA' ? 'Proforma Invoice' : 'Tax Invoice'} {invoice.invoiceNumber}
          </h1>
          <p className="text-gray-600 font-inter">
            {invoice.type === 'QUOTE' ? 'Quotation' : invoice.type === 'PROFORMA' ? 'Proforma Invoice' : 'Tax Invoice'}
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
                    <span className="font-semibold text-gray-900 w-28">
                      {invoice.type === 'QUOTE' ? 'Quote Date' : invoice.type === 'PROFORMA' ? 'Proforma Date' : 'Invoice Date'}
                    </span>
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
                  {invoice.poReference && (
                    <div className="flex text-xs font-inter">
                      <span className="font-semibold text-gray-900 w-32">PO Reference</span>
                      <span className="text-gray-600">: {invoice.poReference}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Details - Professional Layout matching PDF */}
              {(() => {
                // Helper to check if a name is a valid contact (not a place name in address)
                const isValidContactName = (name: string | null, address: string | null, company: string | null): boolean => {
                  if (!name || name.trim() === '') return false;
                  if (name === company) return false;
                  // Check if name appears in address (likely a place name)
                  if (address && address.toLowerCase().includes(name.toLowerCase())) return false;
                  // Single word names that are very short might be place names
                  if (name.split(' ').length === 1 && name.length < 15) {
                    // Could be a place, but allow it if it doesn't appear in address
                    // Already checked above
                  }
                  return true;
                };

                const billingContactValid = isValidContactName(invoice.customerName, invoice.billingAddress, invoice.customerCompany);
                const shippingContactValid = isValidContactName(invoice.shippingContactName, invoice.shippingAddress, invoice.customerCompany);
                const fallbackContactValid = !shippingContactValid && isValidContactName(invoice.customerName, invoice.shippingAddress, invoice.customerCompany);

                return (
                  <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
                    {/* Bill To */}
                    <div>
                      <div className="bg-gray-100 px-3 py-2 mb-2">
                        <h4 className="text-sm font-bold text-gray-700 font-inter">BILL TO</h4>
                      </div>
                      {invoice.customerCompany && (
                        <p className="text-sm font-bold text-gray-900 font-inter">{invoice.customerCompany}</p>
                      )}
                      {/* Only show contact name if valid */}
                      {billingContactValid && (
                        <p className="text-sm font-semibold text-gray-900 font-inter">{invoice.customerName}</p>
                      )}
                      {invoice.customerPhone && (
                        <p className="text-xs text-gray-600 font-inter">Phone: {invoice.customerPhone}</p>
                      )}
                      {invoice.customerEmail && (
                        <p className="text-xs text-gray-600 font-inter">Email: {invoice.customerEmail}</p>
                      )}
                      {invoice.billingAddress && (
                        <p className="text-xs text-gray-600 whitespace-pre-line font-inter mt-1">{invoice.billingAddress}</p>
                      )}
                      {invoice.customerGstNumber && (
                        <p className="text-xs font-semibold text-gray-900 font-inter mt-1">GSTIN: {invoice.customerGstNumber}</p>
                      )}
                    </div>
                    {/* Ship To */}
                    <div>
                      <div className="bg-gray-100 px-3 py-2 mb-2">
                        <h4 className="text-sm font-bold text-gray-700 font-inter">SHIP TO</h4>
                      </div>
                      {invoice.customerCompany && (
                        <p className="text-sm font-bold text-gray-900 font-inter">{invoice.customerCompany}</p>
                      )}
                      {/* Only show Contact if we have a valid contact name */}
                      {shippingContactValid ? (
                        <p className="text-sm font-semibold text-blue-600 font-inter">
                          Contact: {invoice.shippingContactName}
                        </p>
                      ) : fallbackContactValid && (
                        <p className="text-sm font-semibold text-blue-600 font-inter">
                          Contact: {invoice.customerName}
                        </p>
                      )}
                      {/* Show phone if available */}
                      {(invoice.shippingContactPhone || invoice.customerPhone) && (
                        <p className="text-xs font-semibold text-gray-900 font-inter">
                          Phone: {invoice.shippingContactPhone || invoice.customerPhone}
                        </p>
                      )}
                      {invoice.shippingAddress && (
                        <p className="text-xs text-gray-600 whitespace-pre-line font-inter mt-1">{invoice.shippingAddress}</p>
                      )}
                      {invoice.customerGstNumber && (
                        <p className="text-xs font-semibold text-gray-900 font-inter mt-1">GSTIN: {invoice.customerGstNumber}</p>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Items Table - Matching PDF format */}
              <div className="mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="text-left py-2 px-2 text-xs font-semibold font-inter">#</th>
                      <th className="text-left py-2 px-2 text-xs font-semibold font-inter">Item & Description</th>
                      <th className="text-left py-2 px-2 text-xs font-semibold font-inter">HSN</th>
                      <th className="text-right py-2 px-2 text-xs font-semibold font-inter">Qty</th>
                      <th className="text-left py-2 px-2 text-xs font-semibold font-inter">Unit</th>
                      <th className="text-right py-2 px-2 text-xs font-semibold font-inter">Rate</th>
                      <th className="text-right py-2 px-2 text-xs font-semibold font-inter">GST%</th>
                      <th className="text-right py-2 px-2 text-xs font-semibold font-inter">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-3 px-2 text-xs text-gray-500 font-inter">{index + 1}</td>
                        <td className="py-3 px-2 text-xs font-inter">
                          <div className="font-semibold text-gray-900">{item.itemName}</div>
                          {item.description && (
                            <div className="text-[10px] text-gray-500 mt-0.5">{item.description}</div>
                          )}
                        </td>
                        <td className="py-3 px-2 text-xs text-gray-600 font-inter">{item.hsnCode || '-'}</td>
                        <td className="py-3 px-2 text-xs text-gray-600 text-right font-inter">
                          {Number(item.quantity).toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-2 text-xs text-gray-600 font-inter">{item.unit || 'Nos'}</td>
                        <td className="py-3 px-2 text-xs text-gray-600 text-right font-inter">
                          INR {Number(item.unitPrice).toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-xs text-gray-600 text-right font-inter">
                          {Number(item.gstRate)}%
                        </td>
                        <td className="py-3 px-2 text-xs font-semibold text-gray-900 text-right font-inter">
                          INR {Number(item.taxableAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
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
                    <span className="text-gray-900 font-semibold">INR {Number(invoice.subtotal).toLocaleString('en-IN')}</span>
                  </div>
                  {Number(invoice.igstAmount) > 0 && (
                    <div className="flex justify-between py-2 text-sm font-inter">
                      <span className="text-gray-600">IGST (18%)</span>
                      <span className="text-gray-900 font-semibold">INR {Number(invoice.igstAmount).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {Number(invoice.cgstAmount) > 0 && (
                    <div className="flex justify-between py-2 text-sm font-inter">
                      <span className="text-gray-600">CGST (9%)</span>
                      <span className="text-gray-900 font-semibold">INR {Number(invoice.cgstAmount).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {Number(invoice.sgstAmount) > 0 && (
                    <div className="flex justify-between py-2 text-sm font-inter">
                      <span className="text-gray-600">SGST (9%)</span>
                      <span className="text-gray-900 font-semibold">INR {Number(invoice.sgstAmount).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 text-base font-bold border-t border-gray-200 mt-2 font-inter">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">INR {Number(invoice.total).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Total in Words */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-900 font-inter">Total In Words:</p>
                <p className="text-xs font-semibold italic text-gray-700 font-inter">{totalInWords}</p>
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
