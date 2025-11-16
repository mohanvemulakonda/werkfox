import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCustomer(id: string) {
  // Validate that id is a valid number
  const customerId = parseInt(id);
  if (isNaN(customerId)) {
    return null;
  }

  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      parentCustomer: true,
      childAccounts: true,
      invoices: {
        orderBy: { createdAt: 'desc' },
        take: 10
      }
    }
  });

  if (!customer) {
    return null;
  }

  return customer;
}

export default async function CustomerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const customer = await getCustomer(id);

  if (!customer) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin/customers"
            className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block font-inter"
          >
            ← Back to Customers
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 font-open-sans">
            {customer.displayName || customer.companyName}
          </h1>
          <p className="text-gray-600 font-inter">{customer.customerCode}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/admin/customers/${customer.id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 font-inter"
          >
            Edit Customer
          </Link>
        </div>
      </div>

      {/* Status Badges */}
      <div className="mb-6 flex gap-2">
        {customer.isCorporateAccount && (
          <span className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200 font-inter">
            Corporate Account
          </span>
        )}
        {customer.parentCustomerId && (
          <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200 font-inter">
            Shipping Location
          </span>
        )}
        {customer.isActive ? (
          <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 border border-green-200 font-inter">
            Active
          </span>
        ) : (
          <span className="px-3 py-1 text-sm font-medium bg-red-100 text-red-800 border border-red-200 font-inter">
            Inactive
          </span>
        )}
      </div>

      {/* Customer Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Company Information */}
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Company Information</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600 font-inter">Company Name</label>
              <p className="text-gray-900 font-inter">{customer.companyName}</p>
            </div>
            {customer.displayName && (
              <div>
                <label className="text-sm font-medium text-gray-600 font-inter">Display Name</label>
                <p className="text-gray-900 font-inter">{customer.displayName}</p>
              </div>
            )}
            {customer.locationName && (
              <div>
                <label className="text-sm font-medium text-gray-600 font-inter">Location</label>
                <p className="text-gray-900 font-inter">{customer.locationName}</p>
              </div>
            )}
            {customer.industry && (
              <div>
                <label className="text-sm font-medium text-gray-600 font-inter">Industry</label>
                <p className="text-gray-900 font-inter">{customer.industry}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Contact Information</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600 font-inter">Contact Person</label>
              <p className="text-gray-900 font-inter">{customer.contactPerson || '-'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 font-inter">Email</label>
              <p className="text-gray-900 font-inter">
                <a href={`mailto:${customer.email}`} className="text-blue-600 hover:text-blue-700">
                  {customer.email}
                </a>
              </p>
            </div>
            {customer.phone && (
              <div>
                <label className="text-sm font-medium text-gray-600 font-inter">Phone</label>
                <p className="text-gray-900 font-inter">
                  <a href={`tel:${customer.phone}`} className="text-blue-600 hover:text-blue-700">
                    {customer.phone}
                  </a>
                </p>
              </div>
            )}
            {customer.website && (
              <div>
                <label className="text-sm font-medium text-gray-600 font-inter">Website</label>
                <p className="text-gray-900 font-inter">
                  <a href={`https://${customer.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                    {customer.website}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* GST & Tax Information */}
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">GST & Tax Information</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600 font-inter">GST Number</label>
              <p className="text-gray-900 font-inter">{customer.gstNumber || '-'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 font-inter">GST Type</label>
              <p className="text-gray-900 font-inter">{customer.gstType || '-'}</p>
            </div>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Payment Terms</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600 font-inter">Payment Terms</label>
              <p className="text-gray-900 font-inter">{customer.paymentTerms || '-'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 font-inter">Credit Days</label>
              <p className="text-gray-900 font-inter">{customer.creditDays || 0} days</p>
            </div>
            {customer.creditLimit && (
              <div>
                <label className="text-sm font-medium text-gray-600 font-inter">Credit Limit</label>
                <p className="text-gray-900 font-inter">
                  ₹{Number(customer.creditLimit).toLocaleString('en-IN')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Billing Address */}
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Billing Address</h2>
          {customer.billingAddress ? (
            <div className="text-gray-900 font-inter whitespace-pre-line">
              {customer.billingAddress}
              {customer.billingCity && <><br />{customer.billingCity}</>}
              {customer.billingState && <>, {customer.billingState}</>}
              {customer.billingPincode && <> - {customer.billingPincode}</>}
              {customer.billingCountry && <><br />{customer.billingCountry}</>}
            </div>
          ) : (
            <p className="text-gray-500 font-inter">No billing address</p>
          )}
        </div>

        {/* Shipping Address */}
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Shipping Address</h2>
          {customer.shippingAddress ? (
            <div className="text-gray-900 font-inter whitespace-pre-line">
              {customer.shippingAddress}
              {customer.shippingCity && <><br />{customer.shippingCity}</>}
              {customer.shippingState && <>, {customer.shippingState}</>}
              {customer.shippingPincode && <> - {customer.shippingPincode}</>}
              {customer.shippingCountry && <><br />{customer.shippingCountry}</>}
            </div>
          ) : (
            <p className="text-gray-500 font-inter">No shipping address</p>
          )}
        </div>
      </div>

      {/* Parent/Child Accounts */}
      {(customer.parentCustomer || customer.childAccounts.length > 0) && (
        <div className="bg-white shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Account Hierarchy</h2>

          {customer.parentCustomer && (
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600 font-inter">Parent Account</label>
              <p className="text-gray-900 font-inter">
                <Link href={`/admin/customers/${customer.parentCustomer.id}`} className="text-blue-600 hover:text-blue-700">
                  {customer.parentCustomer.displayName || customer.parentCustomer.companyName}
                </Link>
              </p>
            </div>
          )}

          {customer.childAccounts.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-600 font-inter">Shipping Locations ({customer.childAccounts.length})</label>
              <ul className="mt-2 space-y-2">
                {customer.childAccounts.map((child) => (
                  <li key={child.id}>
                    <Link href={`/admin/customers/${child.id}`} className="text-blue-600 hover:text-blue-700 font-inter">
                      {child.displayName || child.companyName}
                      {child.locationName && <span className="text-gray-500"> - {child.locationName}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Recent Invoices */}
      {customer.invoices.length > 0 && (
        <div className="bg-white shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Recent Invoices</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase font-inter">Invoice #</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase font-inter">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase font-inter">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase font-inter">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase font-inter">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {customer.invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900 font-inter">{invoice.invoiceNumber}</td>
                    <td className="px-4 py-2 text-sm text-gray-600 font-inter">
                      {new Date(invoice.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 font-inter">
                      ₹{Number(invoice.total).toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs font-medium border font-inter ${
                        invoice.status === 'PAID' ? 'bg-green-100 text-green-800 border-green-200' :
                        invoice.status === 'SENT' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <Link href={`/admin/invoices/${invoice.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-inter">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {customer.invoices.length === 10 && (
            <div className="mt-4 text-center">
              <Link href={`/admin/invoices?customer=${customer.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-inter">
                View All Invoices →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {customer.notes && (
        <div className="bg-white shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Notes</h2>
          <p className="text-gray-900 font-inter whitespace-pre-line">{customer.notes}</p>
        </div>
      )}
    </div>
  );
}
