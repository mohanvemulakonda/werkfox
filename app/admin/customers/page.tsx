import Link from 'next/link';
import prisma from '@/lib/prisma';

async function getCustomers() {
  const customers = await prisma.customers.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const total = customers.length;
  const active = customers.filter(c => c.isActive).length;
  const totalReceivable = customers.reduce((sum, c) => sum + Number(c.currentBalance || 0), 0);
  const overLimit = customers.filter(c => Number(c.currentBalance || 0) > Number(c.creditLimit || Infinity)).length;

  return { customers, stats: { total, active, totalReceivable, overLimit } };
}

export default async function CustomersPage() {
  const { customers, stats } = await getCustomers();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Customers</h1>
          <p className="text-gray-600 font-inter font-light">Manage your customer accounts and billing</p>
        </div>
        <Link
          href="/admin/customers/create"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">+ Add Customer</span>
          <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Total Customers</p>
          <p className="text-3xl font-bold text-gray-900 font-open-sans">{stats.total}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Active Customers</p>
          <p className="text-3xl font-bold text-green-600 font-open-sans">{stats.active}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Total Receivable</p>
          <p className="text-3xl font-bold text-amber-600 font-open-sans">₹{stats.totalReceivable > 0 ? (stats.totalReceivable / 100000).toFixed(1) + 'L' : '0'}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Over Credit Limit</p>
          <p className="text-3xl font-bold text-red-600 font-open-sans">{stats.overLimit}</p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white shadow-sm border border-gray-100">
        {customers.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-open-sans">No customers yet</h3>
            <p className="text-gray-600 mb-6 font-inter font-light">Add your first customer to start billing</p>
            <Link
              href="/admin/customers/create"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
            >
              <span className="relative z-10 text-sm tracking-wide">Add Customer</span>
              <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Customer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">GST</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">{customer.customerCode}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 font-inter">{customer.name}</div>
                      {customer.displayName && customer.displayName !== customer.name && (
                        <div className="text-sm text-gray-500 font-inter">{customer.displayName}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-inter">{customer.contactPerson || '-'}</div>
                      <div className="text-sm text-gray-500 font-inter">{customer.phone || ''}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {[customer.city, customer.state].filter(Boolean).join(', ') || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 font-inter font-mono">{customer.gstNumber || '-'}</div>
                      <div className="text-xs text-gray-400">{customer.gstType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-inter">
                      <span className={`font-medium ${
                        Number(customer.currentBalance || 0) > Number(customer.creditLimit || Infinity)
                          ? 'text-red-600'
                          : Number(customer.currentBalance || 0) > 0
                            ? 'text-amber-600'
                            : 'text-gray-600'
                      }`}>
                        ₹{Number(customer.currentBalance || 0).toLocaleString('en-IN')}
                      </span>
                      <div className="text-xs text-gray-400">of ₹{(Number(customer.creditLimit || 0) / 100000).toFixed(1)}L</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium bg-gray-100 border border-gray-900 font-inter ${customer.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                        {customer.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link href={`/admin/customers/${customer.id}`} className="text-blue-600 hover:text-blue-700 font-medium font-inter mr-4">View</Link>
                      <Link href={`/admin/erp/invoices/create?customerId=${customer.id}`} className="text-green-600 hover:text-green-700 font-medium font-inter">Invoice</Link>
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
