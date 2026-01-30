import Link from 'next/link';

// Demo invoices data
const demoInvoices = [
  {
    id: 1,
    invoiceNumber: 'INV-2026-001',
    customerName: 'Tech Manufacturing Pvt Ltd',
    customerEmail: 'accounts@techmanufacturing.com',
    type: 'INVOICE',
    currency: 'INR',
    total: 125000,
    status: 'PAID',
    createdAt: new Date('2026-01-25'),
  },
  {
    id: 2,
    invoiceNumber: 'INV-2026-002',
    customerName: 'Sharma Steel Works',
    customerEmail: 'purchase@sharmasteel.in',
    type: 'INVOICE',
    currency: 'INR',
    total: 87500,
    status: 'SENT',
    createdAt: new Date('2026-01-22'),
  },
  {
    id: 3,
    invoiceNumber: 'QUO-2026-001',
    customerName: 'Patel Plastics Industries',
    customerEmail: 'info@patelplastics.com',
    type: 'QUOTE',
    currency: 'INR',
    total: 225000,
    status: 'DRAFT',
    createdAt: new Date('2026-01-20'),
  },
  {
    id: 4,
    invoiceNumber: 'PRO-2026-001',
    customerName: 'Chennai Enterprises',
    customerEmail: 'orders@chennaienterprises.co.in',
    type: 'PROFORMA',
    currency: 'INR',
    total: 156000,
    status: 'SENT',
    createdAt: new Date('2026-01-18'),
  },
];

export default function InvoicesPage() {
  const invoices = demoInvoices;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Invoices & Quotes</h1>
          <p className="text-gray-600 font-inter font-light">Create and manage invoices and quotes</p>
        </div>
        <Link
          href="/admin/erp/invoices/create"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">+ Create New</span>
          <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>

      <div className="bg-white shadow-sm border border-gray-100">
        {invoices.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-open-sans">No invoices yet</h3>
            <p className="text-gray-600 mb-6 font-inter font-light">Create your first invoice or quote to get started</p>
            <Link
              href="/admin/erp/invoices/create"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
            >
              <span className="relative z-10 text-sm tracking-wide">Create Invoice</span>
              <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Invoice #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 font-inter">{invoice.customerName}</div>
                      <div className="text-sm text-gray-500 font-inter">{invoice.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-900 border border-gray-900 font-inter">
                        {invoice.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                      {invoice.currency} {invoice.total.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium border font-inter ${
                        invoice.status === 'PAID' ? 'bg-green-100 text-green-800 border-green-200' :
                        invoice.status === 'SENT' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {invoice.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/admin/erp/invoices/${invoice.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium font-inter"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
