import Link from 'next/link';

// Demo vendors data
const demoVendors = [
  {
    id: '1',
    code: 'VEN-001',
    name: 'Rama Industries Pvt Ltd',
    displayName: 'Rama Industries',
    email: 'sales@ramaindustries.com',
    phone: '+91 98765 43210',
    contactPerson: 'Rajesh Kumar',
    city: 'Mumbai',
    state: 'Maharashtra',
    gstNumber: '27AABCR1234F1ZH',
    creditLimit: 500000,
    creditDays: 30,
    currentBalance: 125000,
    isActive: true,
    createdAt: new Date('2025-01-15'),
  },
  {
    id: '2',
    code: 'VEN-002',
    name: 'Sharma Steel Works',
    displayName: 'Sharma Steel',
    email: 'orders@sharmasteel.in',
    phone: '+91 87654 32109',
    contactPerson: 'Amit Sharma',
    city: 'Delhi',
    state: 'Delhi',
    gstNumber: '07AABCS5678G2ZI',
    creditLimit: 300000,
    creditDays: 15,
    currentBalance: 45000,
    isActive: true,
    createdAt: new Date('2025-02-01'),
  },
  {
    id: '3',
    code: 'VEN-003',
    name: 'Patel Packaging Solutions',
    displayName: 'Patel Packaging',
    email: 'info@patelpackaging.com',
    phone: '+91 76543 21098',
    contactPerson: 'Nilesh Patel',
    city: 'Ahmedabad',
    state: 'Gujarat',
    gstNumber: '24AABCP9012H3ZJ',
    creditLimit: 200000,
    creditDays: 7,
    currentBalance: 0,
    isActive: true,
    createdAt: new Date('2025-02-15'),
  },
  {
    id: '4',
    code: 'VEN-004',
    name: 'Chennai Chemicals Ltd',
    displayName: 'Chennai Chemicals',
    email: 'supply@chennaichem.co.in',
    phone: '+91 65432 10987',
    contactPerson: 'Venkat Raman',
    city: 'Chennai',
    state: 'Tamil Nadu',
    gstNumber: '33AABCC3456I4ZK',
    creditLimit: 750000,
    creditDays: 45,
    currentBalance: 320000,
    isActive: false,
    createdAt: new Date('2024-11-20'),
  },
];

export default function VendorsPage() {
  const vendors = demoVendors;

  const stats = {
    total: vendors.length,
    active: vendors.filter(v => v.isActive).length,
    totalPayable: vendors.reduce((sum, v) => sum + (v.currentBalance || 0), 0),
    overLimit: vendors.filter(v => (v.currentBalance || 0) > (v.creditLimit || Infinity)).length,
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Vendors</h1>
          <p className="text-gray-600 font-inter font-light">Manage your suppliers and vendor relationships</p>
        </div>
        <Link
          href="/admin/erp/vendors/create"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">+ Add Vendor</span>
          <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Total Vendors</p>
          <p className="text-3xl font-bold text-gray-900 font-open-sans">{stats.total}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Active Vendors</p>
          <p className="text-3xl font-bold text-green-600 font-open-sans">{stats.active}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Total Payable</p>
          <p className="text-3xl font-bold text-amber-600 font-open-sans">₹{stats.totalPayable.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-600 font-inter">Over Credit Limit</p>
          <p className="text-3xl font-bold text-red-600 font-open-sans">{stats.overLimit}</p>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white shadow-sm border border-gray-100">
        {vendors.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-open-sans">No vendors yet</h3>
            <p className="text-gray-600 mb-6 font-inter font-light">Add your first vendor to start managing supplier relationships</p>
            <Link
              href="/admin/erp/vendors/create"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
            >
              <span className="relative z-10 text-sm tracking-wide">Add Vendor</span>
              <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Vendor Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    GST Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Credit Limit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                    Balance
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
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                      {vendor.code}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 font-inter">{vendor.name}</div>
                      {vendor.displayName && vendor.displayName !== vendor.name && (
                        <div className="text-sm text-gray-500 font-inter">{vendor.displayName}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-inter">{vendor.contactPerson}</div>
                      <div className="text-sm text-gray-500 font-inter">{vendor.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {vendor.city}, {vendor.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter font-mono">
                      {vendor.gstNumber || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      ₹{vendor.creditLimit?.toLocaleString('en-IN') || '-'}
                      <div className="text-xs text-gray-400">{vendor.creditDays} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-inter">
                      <span className={`font-medium ${
                        (vendor.currentBalance || 0) > (vendor.creditLimit || Infinity)
                          ? 'text-red-600'
                          : vendor.currentBalance > 0
                            ? 'text-amber-600'
                            : 'text-gray-600'
                      }`}>
                        ₹{vendor.currentBalance?.toLocaleString('en-IN') || '0'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium bg-gray-100 border border-gray-900 font-inter ${
                        vendor.isActive ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {vendor.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/admin/erp/vendors/${vendor.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium font-inter mr-4"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/erp/purchase-orders/create?vendorId=${vendor.id}`}
                        className="text-green-600 hover:text-green-700 font-medium font-inter"
                      >
                        New PO
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
