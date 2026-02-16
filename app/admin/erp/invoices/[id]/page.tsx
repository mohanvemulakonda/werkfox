import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getCompanySettings } from '@/lib/company-settings-cache';

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
  }

  if (integerPart >= 100000) {
    const lakhs = Math.floor((integerPart % 10000000) / 100000);
    if (lakhs > 0) result += convertLessThanThousand(lakhs) + ' Lakh ';
  }

  if (integerPart >= 1000) {
    const thousands = Math.floor((integerPart % 100000) / 1000);
    if (thousands > 0) result += convertLessThanThousand(thousands) + ' Thousand ';
  }

  if (integerPart % 1000 !== 0) {
    result += convertLessThanThousand(integerPart % 1000);
  }

  return result.trim();
}

async function getInvoice(id: number) {
  return prisma.invoices.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: {
            select: { name: true, sku: true },
          },
        },
      },
      customer: true,
    },
  });
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InvoiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const invoiceId = parseInt(id);

  if (isNaN(invoiceId)) {
    notFound();
  }

  const [invoice, company] = await Promise.all([
    getInvoice(invoiceId),
    getCompanySettings(),
  ]);

  if (!invoice) {
    notFound();
  }

  const total = Number(invoice.total);
  const totalInWords = `Indian Rupee ${numberToWordsIndian(total)} Only`;
  const invoiceType = (invoice as any).type || 'INVOICE';
  const cgstAmount = Number((invoice as any).cgstAmount || invoice.cgst || 0);
  const sgstAmount = Number((invoice as any).sgstAmount || invoice.sgst || 0);
  const igstAmount = Number((invoice as any).igstAmount || invoice.igst || 0);
  const subtotal = Number(invoice.subtotal);

  const companyAddress = [
    company.companyAddress,
    [company.companyCity, company.companyState, company.companyPincode].filter(Boolean).join(' '),
  ].filter(Boolean).join(', ');

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin/erp/invoices"
            className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block font-inter"
          >
            &larr; Back to Documents
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 font-open-sans">
            {invoiceType === 'QUOTE' ? 'Quotation' : invoiceType === 'PROFORMA' ? 'Proforma Invoice' : 'Tax Invoice'} {invoice.invoiceNumber}
          </h1>
          <p className="text-gray-600 font-inter">
            {invoiceType === 'QUOTE' ? 'Quotation' : invoiceType === 'PROFORMA' ? 'Proforma Invoice' : 'Tax Invoice'}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/erp/invoices/${invoice.id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 font-inter text-sm"
          >
            Edit
          </Link>
          <button className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 font-inter text-sm">
            Download PDF
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <span className={`inline-flex items-center px-3 py-1 text-sm font-medium border rounded font-inter ${
          invoice.status === 'PAID' ? 'bg-green-50 text-green-800 border-green-200' :
          invoice.status === 'SENT' ? 'bg-blue-50 text-blue-800 border-blue-200' :
          invoice.status === 'DRAFT' ? 'bg-gray-50 text-gray-800 border-gray-200' :
          'bg-yellow-50 text-yellow-800 border-yellow-200'
        }`}>
          {invoice.status}
        </span>
      </div>

      {/* Invoice Preview */}
      <div className="bg-white shadow-lg border-2 border-gray-300 rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="border-2 border-gray-400 rounded">
            <div className="p-8">
              {/* Company Header */}
              <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-200">
                <div className="flex items-start gap-4">
                  {company.logoUrl && (
                    <img
                      src={company.logoUrl}
                      alt={company.companyName}
                      className="w-16 h-16 object-contain"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-open-sans mb-2">{company.companyName}</h2>
                    {companyAddress && <p className="text-xs text-gray-600 font-inter">{companyAddress}</p>}
                    {company.companyCountry && <p className="text-xs text-gray-600 font-inter">{company.companyCountry}</p>}
                    {company.companyGstNumber && <p className="text-xs text-gray-600 font-inter">GSTIN: {company.companyGstNumber}</p>}
                    {company.companyPhone && <p className="text-xs text-gray-600 font-inter">Phone: {company.companyPhone}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="text-3xl font-bold text-blue-600 font-open-sans mb-4">
                    {invoiceType === 'QUOTE' ? 'QUOTATION' :
                     invoiceType === 'PROFORMA' ? 'PROFORMA INVOICE' :
                     'TAX INVOICE'}
                  </h3>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-2 gap-8 mb-6 pb-6 border-b border-gray-200">
                <div className="space-y-2">
                  <div className="flex text-xs font-inter">
                    <span className="font-semibold text-gray-900 w-28">#</span>
                    <span className="text-gray-600">: {invoice.invoiceNumber}</span>
                  </div>
                  <div className="flex text-xs font-inter">
                    <span className="font-semibold text-gray-900 w-28">Invoice Date</span>
                    <span className="text-gray-600">: {invoice.invoiceDate.toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex text-xs font-inter">
                    <span className="font-semibold text-gray-900 w-28">Terms</span>
                    <span className="text-gray-600">: {(invoice as any).paymentTerms || 'Due on Receipt'}</span>
                  </div>
                  <div className="flex text-xs font-inter">
                    <span className="font-semibold text-gray-900 w-28">Due Date</span>
                    <span className="text-gray-600">: {invoice.dueDate ? invoice.dueDate.toLocaleDateString('en-GB') : 'N/A'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex text-xs font-inter">
                    <span className="font-semibold text-gray-900 w-32">Place Of Supply</span>
                    <span className="text-gray-600">: {(invoice as any).placeOfSupply || 'N/A'}</span>
                  </div>
                  {(invoice as any).poReference && (
                    <div className="flex text-xs font-inter">
                      <span className="font-semibold text-gray-900 w-32">PO Reference</span>
                      <span className="text-gray-600">: {(invoice as any).poReference}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Details */}
              <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
                <div>
                  <div className="bg-gray-100 px-3 py-2 mb-2">
                    <h4 className="text-sm font-bold text-gray-700 font-inter">BILL TO</h4>
                  </div>
                  <p className="text-sm font-bold text-gray-900 font-inter">{(invoice as any).customerCompany || invoice.customerName}</p>
                  {(invoice as any).customerPhone && <p className="text-xs text-gray-600 font-inter">Phone: {(invoice as any).customerPhone}</p>}
                  {invoice.customerEmail && <p className="text-xs text-gray-600 font-inter">Email: {invoice.customerEmail}</p>}
                  {(invoice as any).billingAddress && <p className="text-xs text-gray-600 whitespace-pre-line font-inter mt-1">{(invoice as any).billingAddress}</p>}
                  {invoice.customerGst && <p className="text-xs font-semibold text-gray-900 font-inter mt-1">GSTIN: {invoice.customerGst}</p>}
                </div>
                <div>
                  <div className="bg-gray-100 px-3 py-2 mb-2">
                    <h4 className="text-sm font-bold text-gray-700 font-inter">SHIP TO</h4>
                  </div>
                  <p className="text-sm font-bold text-gray-900 font-inter">{(invoice as any).customerCompany || invoice.customerName}</p>
                  {(invoice as any).shippingContactName && (
                    <p className="text-sm font-semibold text-blue-600 font-inter">Contact: {(invoice as any).shippingContactName}</p>
                  )}
                  {(invoice as any).shippingContactPhone && (
                    <p className="text-xs font-semibold text-gray-900 font-inter">Phone: {(invoice as any).shippingContactPhone}</p>
                  )}
                  {(invoice as any).shippingAddress && <p className="text-xs text-gray-600 whitespace-pre-line font-inter mt-1">{(invoice as any).shippingAddress}</p>}
                </div>
              </div>

              {/* Items Table */}
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
                          <div className="font-semibold text-gray-900">{(item as any).itemName || item.productName}</div>
                          {(item as any).description && (
                            <div className="text-[10px] text-gray-500 mt-0.5">{(item as any).description}</div>
                          )}
                        </td>
                        <td className="py-3 px-2 text-xs text-gray-600 font-inter">{item.hsnCode || '-'}</td>
                        <td className="py-3 px-2 text-xs text-gray-600 text-right font-inter">{Number(item.quantity).toLocaleString('en-IN')}</td>
                        <td className="py-3 px-2 text-xs text-gray-600 font-inter">{(item as any).unit || 'Nos'}</td>
                        <td className="py-3 px-2 text-xs text-gray-600 text-right font-inter">INR {Number(item.unitPrice).toFixed(2)}</td>
                        <td className="py-3 px-2 text-xs text-gray-600 text-right font-inter">{Number((item as any).gstRate || item.taxRate)}%</td>
                        <td className="py-3 px-2 text-xs font-semibold text-gray-900 text-right font-inter">
                          INR {Number((item as any).taxableAmount || item.total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
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
                    <span className="text-gray-900 font-semibold">INR {subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {cgstAmount > 0 && (
                    <div className="flex justify-between py-2 text-sm font-inter">
                      <span className="text-gray-600">CGST (9%)</span>
                      <span className="text-gray-900 font-semibold">INR {cgstAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {sgstAmount > 0 && (
                    <div className="flex justify-between py-2 text-sm font-inter">
                      <span className="text-gray-600">SGST (9%)</span>
                      <span className="text-gray-900 font-semibold">INR {sgstAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {igstAmount > 0 && (
                    <div className="flex justify-between py-2 text-sm font-inter">
                      <span className="text-gray-600">IGST (18%)</span>
                      <span className="text-gray-900 font-semibold">INR {igstAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 text-base font-bold border-t border-gray-200 mt-2 font-inter">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">INR {total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Total in Words */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-900 font-inter">Total In Words:</p>
                <p className="text-xs font-semibold italic text-gray-700 font-inter">{totalInWords}</p>
              </div>

              {/* Notes & Terms */}
              {(invoice.notes || (invoice as any).termsAndConditions) && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  {invoice.notes && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 font-inter">Notes</h4>
                      <p className="text-sm text-gray-600 whitespace-pre-line font-inter">{invoice.notes}</p>
                    </div>
                  )}
                  {(invoice as any).termsAndConditions && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 font-inter">Terms & Conditions</h4>
                      <p className="text-sm text-gray-600 whitespace-pre-line font-inter">{(invoice as any).termsAndConditions}</p>
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
