import prisma from '@/lib/prisma';
import Link from 'next/link';

async function getCustomers() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      parentCustomer: true,
      childAccounts: true,
      _count: {
        select: { invoices: true }
      }
    }
  });

  return customers;
}

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Customers</h1>
          <p className="text-gray-600 font-inter">Manage your customer accounts and shipping locations</p>
        </div>
        <Link
          href="/admin/customers/create"
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 font-inter"
        >
          Add Customer
        </Link>
      </div>

      <div className="bg-white shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  GST Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Invoices
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
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 font-inter">
                      {customer.displayName || customer.companyName}
                    </div>
                    <div className="text-xs text-gray-500 font-inter">
                      {customer.customerCode}
                    </div>
                    {customer.locationName && (
                      <div className="text-xs text-blue-600 font-inter">
                        📍 {customer.locationName}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.isCorporateAccount ? (
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200 font-inter">
                        Corporate
                      </span>
                    ) : customer.parentCustomerId ? (
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 font-inter">
                        Shipping Location
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 font-inter">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-inter">{customer.email}</div>
                    {customer.phone && (
                      <div className="text-sm text-gray-500 font-inter">{customer.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 font-inter">
                      {customer.gstNumber || '-'}
                    </div>
                    {customer.gstType && (
                      <div className="text-xs text-gray-500 font-inter">
                        {customer.gstType}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                    {customer._count.invoices}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.isActive ? (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 border border-green-200 font-inter">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 border border-red-200 font-inter">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium font-inter mr-3"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/customers/${customer.id}/edit`}
                      className="text-gray-600 hover:text-gray-700 font-medium font-inter"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {customers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-inter">No customers found</p>
            <Link
              href="/admin/customers/create"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 font-inter"
            >
              Add Your First Customer
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
