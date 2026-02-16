import Link from 'next/link';
import prisma from '@/lib/prisma';

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  DRAFT: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
  SENT: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  VIEWED: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300' },
  ACCEPTED: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  REJECTED: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  EXPIRED: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  CONVERTED: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
};

async function getQuotations() {
  const quotes = await prisma.quotations.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      customer: { select: { name: true, customerCode: true } },
      items: { select: { id: true } },
    },
  });

  const total = quotes.length;
  const pending = quotes.filter(q => ['SENT', 'VIEWED'].includes(q.status)).length;
  const accepted = quotes.filter(q => q.status === 'ACCEPTED').length;
  const converted = quotes.filter(q => q.status === 'CONVERTED').length;
  const totalValue = quotes.filter(q => !['REJECTED', 'EXPIRED'].includes(q.status)).reduce((sum, q) => sum + Number(q.total), 0);
  const conversionRate = total > 0 ? Math.round((quotes.filter(q => ['ACCEPTED', 'CONVERTED'].includes(q.status)).length / total) * 100) : 0;

  return { quotes, stats: { total, pending, accepted, converted, totalValue, conversionRate } };
}

export default async function QuotesPage() {
  const { quotes, stats } = await getQuotations();

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
          <p className="text-2xl font-bold text-gray-900 font-open-sans">₹{stats.totalValue > 0 ? (stats.totalValue / 100000).toFixed(1) + 'L' : '0'}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Conversion Rate</p>
          <p className="text-2xl font-bold text-indigo-600 font-open-sans">{stats.conversionRate}%</p>
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white shadow-sm border border-gray-100">
        {quotes.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-open-sans">No quotations yet</h3>
            <p className="text-gray-600 mb-6 font-inter font-light">Create your first quote to start tracking sales pipeline</p>
            <Link
              href="/admin/erp/quotes/create"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
            >
              <span className="relative z-10 text-sm tracking-wide">Create Quote</span>
              <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Quote #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Valid Until</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quotes.map((quote) => {
                  const statusStyle = statusColors[quote.status] || statusColors.DRAFT;
                  const isExpiring = quote.status === 'SENT' && quote.validUntil && quote.validUntil < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

                  return (
                    <tr key={quote.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 font-inter">
                        <Link href={`/admin/erp/quotes/${quote.id}`} className="hover:underline">{quote.quoteNumber}</Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 font-inter">{quote.customer.name}</div>
                        <div className="text-xs text-gray-500 font-inter">{quote.customer.customerCode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                        {quote.quoteDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-inter">
                        <span className={isExpiring ? 'text-amber-600 font-medium' : 'text-gray-600'}>
                          {quote.validUntil?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) || '-'}
                        </span>
                        {isExpiring && <span className="block text-xs text-amber-500">Expiring soon</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">{quote.items.length} items</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">₹{Number(quote.total).toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                          {quote.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                        <Link href={`/admin/erp/quotes/${quote.id}`} className="text-blue-600 hover:text-blue-700 font-medium font-inter">View</Link>
                        {quote.status === 'DRAFT' && (
                          <Link href={`/admin/erp/quotes/${quote.id}/edit`} className="text-gray-600 hover:text-gray-700 font-medium font-inter">Edit</Link>
                        )}
                        {['SENT', 'VIEWED', 'ACCEPTED'].includes(quote.status) && (
                          <Link href={`/admin/erp/sales-orders/create?quoteId=${quote.id}`} className="text-green-600 hover:text-green-700 font-medium font-inter">Convert to SO</Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
