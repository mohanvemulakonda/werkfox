import Link from 'next/link';
import prisma from '@/lib/prisma';

async function getVendors() {
  const vendors = await prisma.vendors.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const total = vendors.length;
  const active = vendors.filter(v => v.isActive).length;
  const totalPayable = vendors.reduce((sum, v) => sum + Number(v.currentBalance || 0), 0);
  const overLimit = vendors.filter(v => Number(v.currentBalance || 0) > Number(v.creditLimit || Infinity)).length;

  return { vendors, stats: { total, active, totalPayable, overLimit } };
}

export default async function VendorsPage() {
  const { vendors, stats } = await getVendors();

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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Vendor Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">GST Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Credit Limit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">{vendor.code || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 font-inter">{vendor.name}</div>
                      {vendor.displayName && vendor.displayName !== vendor.name && (
                        <div className="text-sm text-gray-500 font-inter">{vendor.displayName}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-inter">{vendor.contactPerson || '-'}</div>
                      <div className="text-sm text-gray-500 font-inter">{vendor.phone || ''}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {[vendor.city, vendor.state].filter(Boolean).join(', ') || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter font-mono">{vendor.gstNumber || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      ₹{Number(vendor.creditLimit || 0).toLocaleString('en-IN')}
                      <div className="text-xs text-gray-400">{vendor.creditDays} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-inter">
                      <span className={`font-medium ${
                        Number(vendor.currentBalance || 0) > Number(vendor.creditLimit || Infinity) ? 'text-red-600' :
                        Number(vendor.currentBalance || 0) > 0 ? 'text-amber-600' : 'text-gray-600'
                      }`}>
                        ₹{Number(vendor.currentBalance || 0).toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium bg-gray-100 border border-gray-900 font-inter ${vendor.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                        {vendor.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link href={`/admin/erp/vendors/${vendor.id}`} className="text-blue-600 hover:text-blue-700 font-medium font-inter mr-4">View</Link>
                      <Link href={`/admin/erp/purchase-orders/create?vendorId=${vendor.id}`} className="text-green-600 hover:text-green-700 font-medium font-inter">New PO</Link>
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
