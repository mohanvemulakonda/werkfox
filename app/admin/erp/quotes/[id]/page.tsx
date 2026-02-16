import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCompanySettings } from '@/lib/company-settings-cache';
import QuotationActions from './QuotationActions';

async function getQuotation(id: number) {
  const quotation = await prisma.quotations.findUnique({
    where: { id },
    include: {
      customer: true,
      opportunity: { select: { id: true, name: true } },
      items: {
        include: {
          product: {
            select: {
              name: true,
              sku: true,
            },
          },
        },
      },
    },
  });

  return quotation;
}

export default async function QuotationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quotationId = parseInt(id);

  if (isNaN(quotationId)) {
    notFound();
  }

  const [quotation, company] = await Promise.all([
    getQuotation(quotationId),
    getCompanySettings(),
  ]);

  if (!quotation) {
    notFound();
  }

  const companyAddress = [
    company.companyAddress,
    [company.companyCity, company.companyState, company.companyPincode].filter(Boolean).join(' '),
  ].filter(Boolean).join(', ');

  const statusBadgeClass = `admin-badge admin-badge-${quotation.status.toLowerCase()}`;
  const isExpired =
    quotation.validUntil && new Date(quotation.validUntil) < new Date();
  const isExpiringSoon =
    quotation.validUntil &&
    !isExpired &&
    new Date(quotation.validUntil) <
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 font-open-sans">
              {quotation.quoteNumber}
            </h1>
            <span className={statusBadgeClass}>{quotation.status}</span>
          </div>
          <p className="text-gray-600 font-inter font-light">
            Created on{' '}
            {quotation.createdAt.toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/erp/quotes"
            className="admin-btn admin-btn-secondary"
          >
            Back to Quotes
          </Link>
          <QuotationActions quotation={JSON.parse(JSON.stringify(quotation))} />
        </div>
      </div>

      {/* Validity Warning */}
      {quotation.status !== 'EXPIRED' &&
        quotation.status !== 'REJECTED' &&
        quotation.status !== 'CONVERTED' && (
          <>
            {isExpired && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 font-inter">
                This quotation expired on{' '}
                {quotation.validUntil?.toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
                .
              </div>
            )}
            {isExpiringSoon && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-700 font-inter">
                This quotation expires on{' '}
                {quotation.validUntil?.toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
                . Consider following up with the customer.
              </div>
            )}
          </>
        )}

      {/* Source Document */}
      {quotation.opportunity && (
        <div className="admin-detail-section mb-6">
          <h3 className="admin-form-section-title">Source Document</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Created from Opportunity:</span>
            <Link href={`/admin/crm/opportunities/${quotation.opportunity.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
              {quotation.opportunity.name}
            </Link>
          </div>
        </div>
      )}

      {/* Company Header */}
      <div className="admin-detail-section mb-6">
        <div className="flex items-start gap-4">
          {company.logoUrl && (
            <img src={company.logoUrl} alt={company.companyName} className="w-16 h-16 object-contain" />
          )}
          <div>
            <h2 className="text-xl font-bold text-gray-900">{company.companyName}</h2>
            {companyAddress && <p className="text-sm text-gray-600">{companyAddress}</p>}
            {company.companyCountry && <p className="text-sm text-gray-600">{company.companyCountry}</p>}
            <div className="flex gap-4 mt-1 text-sm text-gray-600">
              {company.companyGstNumber && <span>GSTIN: {company.companyGstNumber}</span>}
              {company.companyPhone && <span>Phone: {company.companyPhone}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="admin-detail-section mb-6">
        <h2 className="admin-form-section-title mb-4">Customer Details</h2>
        <div className="admin-detail-grid">
          <div>
            <span className="admin-detail-label">Customer Name</span>
            <span className="admin-detail-value">
              {quotation.customerName}
            </span>
          </div>
          <div>
            <span className="admin-detail-label">Company</span>
            <span className="admin-detail-value">
              {quotation.customer.name || '-'}
            </span>
          </div>
          <div>
            <span className="admin-detail-label">Email</span>
            <span className="admin-detail-value">
              {quotation.customerEmail || '-'}
            </span>
          </div>
          <div>
            <span className="admin-detail-label">GST Number</span>
            <span className="admin-detail-value">
              {quotation.customerGst || '-'}
            </span>
          </div>
          <div>
            <span className="admin-detail-label">State</span>
            <span className="admin-detail-value">
              {quotation.customerState || '-'}
            </span>
          </div>
          <div>
            <span className="admin-detail-label">Valid Until</span>
            <span className="admin-detail-value">
              {quotation.validUntil
                ? quotation.validUntil.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                : '-'}
            </span>
          </div>
          <div>
            <span className="admin-detail-label">Currency</span>
            <span className="admin-detail-value">{quotation.currency}</span>
          </div>
          <div>
            <span className="admin-detail-label">Quote Date</span>
            <span className="admin-detail-value">
              {quotation.quoteDate.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="admin-table-container mb-6">
        <h2 className="admin-form-section-title mb-4 px-6 pt-5">
          Quotation Items
        </h2>
        <div className="overflow-x-auto">
          <table className="admin-line-items-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Description</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Unit Price</th>
                <th className="text-right">Tax Rate</th>
                <th className="text-right">Discount</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {quotation.items.map((item, index) => (
                <tr key={item.id} className="admin-line-item-row">
                  <td>{index + 1}</td>
                  <td className="font-medium">
                    {item.product?.name || item.productName}
                  </td>
                  <td>{item.product?.sku || item.productSku}</td>
                  <td>{item.description || '-'}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">
                    {quotation.currency === 'INR' ? '\u20B9' : quotation.currency}{' '}
                    {Number(item.unitPrice).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="text-right">{Number(item.taxRate)}%</td>
                  <td className="text-right">
                    {quotation.currency === 'INR' ? '\u20B9' : quotation.currency}{' '}
                    {Number(item.discount).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="text-right font-medium">
                    {quotation.currency === 'INR' ? '\u20B9' : quotation.currency}{' '}
                    {Number(item.total).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="admin-detail-section mb-6">
        <h2 className="admin-form-section-title mb-4">Summary</h2>
        <div className="max-w-sm ml-auto space-y-2 font-inter">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">
              {quotation.currency === 'INR' ? '\u20B9' : quotation.currency}{' '}
              {Number(quotation.subtotal).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          {Number(quotation.discount) > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Discount:</span>
              <span className="font-medium">
                -{' '}
                {quotation.currency === 'INR' ? '\u20B9' : quotation.currency}{' '}
                {Number(quotation.discount).toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Tax:</span>
            <span className="font-medium">
              {quotation.currency === 'INR' ? '\u20B9' : quotation.currency}{' '}
              {Number(quotation.taxAmount).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-300">
            <span className="text-gray-900 font-semibold text-lg">Total:</span>
            <span className="font-bold text-lg">
              {quotation.currency === 'INR' ? '\u20B9' : quotation.currency}{' '}
              {Number(quotation.total).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Terms & Notes */}
      {(quotation.terms || quotation.notes) && (
        <div className="admin-detail-section mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quotation.terms && (
              <div>
                <h3 className="admin-form-section-title mb-2">
                  Terms & Conditions
                </h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap font-inter">
                  {quotation.terms}
                </p>
              </div>
            )}
            {quotation.notes && (
              <div>
                <h3 className="admin-form-section-title mb-2">Notes</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap font-inter">
                  {quotation.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
