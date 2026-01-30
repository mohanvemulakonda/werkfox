import Link from 'next/link';

// Demo quotations data
const demoQuotations = [
  {
    id: '1',
    quoteNumber: 'QT-2026-0034',
    customerName: 'Tech Manufacturing Pvt Ltd',
    customerCode: 'CUST-001',
    quoteDate: new Date('2026-01-25'),
    validUntil: new Date('2026-02-25'),
    subtotal: 450000,
    taxAmount: 81000,
    total: 531000,
    status: 'SENT',
    itemCount: 8,
    followUpDate: new Date('2026-01-30'),
  },
  {
    id: '2',
    quoteNumber: 'QT-2026-0033',
    customerName: 'Sharma Steel Works',
    customerCode: 'CUST-002',
    quoteDate: new Date('2026-01-22'),
    validUntil: new Date('2026-02-22'),
    subtotal: 175000,
    taxAmount: 31500,
    total: 206500,
    status: 'ACCEPTED',
    itemCount: 4,
  },
  {
    id: '3',
    quoteNumber: 'QT-2026-0032',
    customerName: 'Patel Plastics Industries',
    customerCode: 'CUST-003',
    quoteDate: new Date('2026-01-20'),
    validUntil: new Date('2026-02-20'),
    subtotal: 890000,
    taxAmount: 160200,
    total: 1050200,
    status: 'VIEWED',
    itemCount: 15,
    followUpDate: new Date('2026-01-28'),
  },
  {
    id: '4',
    quoteNumber: 'QT-2026-0031',
    customerName: 'Delhi Auto Parts',
    customerCode: 'CUST-004',
    quoteDate: new Date('2026-01-15'),
    validUntil: new Date('2026-02-15'),
    subtotal: 67500,
    taxAmount: 12150,
    total: 79650,
    status: 'EXPIRED',
    itemCount: 3,
  },
  {
    id: '5',
    quoteNumber: 'QT-2026-0030',
    customerName: 'Chennai Enterprises',
    customerCode: 'CUST-005',
    quoteDate: new Date('2026-01-10'),
    validUntil: new Date('2026-02-10'),
    subtotal: 320000,
    taxAmount: 57600,
    total: 377600,
    status: 'CONVERTED',
    itemCount: 7,
    convertedTo: 'SO-2026-0012',
  },
  {
    id: '6',
    quoteNumber: 'QT-2026-0029',
    customerName: 'Mumbai Traders Co',
    customerCode: 'CUST-006',
    quoteDate: new Date('2026-01-08'),
    validUntil: new Date('2026-02-08'),
    subtotal: 125000,
    taxAmount: 22500,
    total: 147500,
    status: 'REJECTED',
    itemCount: 5,
    rejectionReason: 'Price too high',
  },
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  DRAFT: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
  SENT: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  VIEWED: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300' },
  ACCEPTED: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  REJECTED: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  EXPIRED: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  CONVERTED: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
};

export default function QuotesPage() {
  const quotes = demoQuotations;

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => ['SENT', 'VIEWED'].includes(q.status)).length,
    accepted: quotes.filter(q => q.status === 'ACCEPTED').length,
    converted: quotes.filter(q => q.status === 'CONVERTED').length,
    totalValue: quotes.filter(q => !['REJECTED', 'EXPIRED'].includes(q.status)).reduce((sum, q) => sum + q.total, 0),
    conversionRate: Math.round((quotes.filter(q => ['ACCEPTED', 'CONVERTED'].includes(q.status)).length / quotes.length) * 100),
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Quotations</h1>
          <p className="text-gray-600 font-inter font-light">Create and track quotes for your customers</p>
        </div>
        <Link
          href="/admin/erp/quotes/create"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">+ New Quote</span>
          <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Total Quotes</p>
          <p className="text-2xl font-bold text-gray-900 font-open-sans">{stats.total}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Pending</p>
          <p className="text-2xl font-bold text-blue-600 font-open-sans">{stats.pending}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Accepted</p>
          <p className="text-2xl font-bold text-green-600 font-open-sans">{stats.accepted}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Converted to SO</p>
          <p className="text-2xl font-bold text-emerald-600 font-open-sans">{stats.converted}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Pipeline Value</p>
          <p className="text-2xl font-bold text-gray-900 font-open-sans">₹{(stats.totalValue / 100000).toFixed(1)}L</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Conversion Rate</p>
          <p className="text-2xl font-bold text-indigo-600 font-open-sans">{stats.conversionRate}%</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button className="px-4 py-2 text-sm font-medium bg-gray-900 text-white font-inter whitespace-nowrap">All</button>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 font-inter whitespace-nowrap">Pending ({stats.pending})</button>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 font-inter whitespace-nowrap">Accepted ({stats.accepted})</button>
        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 font-inter whitespace-nowrap">Converted ({stats.converted})</button>
      </div>

      {/* Quotations Table */}
      <div className="bg-white shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Quote #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Valid Until
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotes.map((quote) => {
                const statusStyle = statusColors[quote.status];
                const isExpiring = quote.status === 'SENT' && quote.validUntil < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

                return (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 font-inter">
                      <Link href={`/admin/erp/quotes/${quote.id}`} className="hover:underline">
                        {quote.quoteNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 font-inter">{quote.customerName}</div>
                      <div className="text-xs text-gray-500 font-inter">{quote.customerCode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {quote.quoteDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-inter">
                      <span className={isExpiring ? 'text-amber-600 font-medium' : 'text-gray-600'}>
                        {quote.validUntil.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </span>
                      {isExpiring && <span className="block text-xs text-amber-500">Expiring soon</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {quote.itemCount} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                      ₹{quote.total.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                        {quote.status}
                      </span>
                      {quote.convertedTo && (
                        <span className="block text-xs text-gray-500 mt-1">→ {quote.convertedTo}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                      <Link
                        href={`/admin/erp/quotes/${quote.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium font-inter"
                      >
                        View
                      </Link>
                      {quote.status === 'DRAFT' && (
                        <Link
                          href={`/admin/erp/quotes/${quote.id}/edit`}
                          className="text-gray-600 hover:text-gray-700 font-medium font-inter"
                        >
                          Edit
                        </Link>
                      )}
                      {['SENT', 'VIEWED', 'ACCEPTED'].includes(quote.status) && (
                        <Link
                          href={`/admin/erp/sales-orders/create?quoteId=${quote.id}`}
                          className="text-green-600 hover:text-green-700 font-medium font-inter"
                        >
                          Convert to SO
                        </Link>
                      )}
                      {quote.status === 'DRAFT' && (
                        <button className="text-indigo-600 hover:text-indigo-700 font-medium font-inter">
                          Send
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Follow-up Reminders */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 font-open-sans">Follow-up Reminders</h2>
        <div className="bg-white shadow-sm border border-gray-100 p-4">
          <div className="space-y-3">
            {quotes
              .filter(q => q.followUpDate && q.followUpDate >= new Date())
              .sort((a, b) => (a.followUpDate?.getTime() || 0) - (b.followUpDate?.getTime() || 0))
              .map((quote) => (
                <div key={quote.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 font-inter">
                        Follow up on {quote.quoteNumber}
                      </p>
                      <p className="text-xs text-gray-500 font-inter">{quote.customerName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600 font-inter">
                      {quote.followUpDate?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </p>
                    <p className="text-xs text-gray-400 font-inter">₹{quote.total.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
