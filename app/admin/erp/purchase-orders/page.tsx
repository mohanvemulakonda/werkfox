import Link from 'next/link';
import prisma from '@/lib/prisma';

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-800 border-gray-300',
  SENT: 'bg-blue-100 text-blue-800 border-blue-300',
  CONFIRMED: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  PARTIAL_RECEIVED: 'bg-amber-100 text-amber-800 border-amber-300',
  RECEIVED: 'bg-green-100 text-green-800 border-green-300',
  CANCELLED: 'bg-red-100 text-red-800 border-red-300',
};

const paymentStatusColors: Record<string, string> = {
  UNPAID: 'text-red-600',
  PARTIAL: 'text-amber-600',
  PAID: 'text-green-600',
};

async function getPurchaseOrders() {
  const orders = await prisma.purchase_orders.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      vendor: { select: { name: true, code: true } },
      items: { select: { id: true } },
    },
  });

  const total = orders.length;
  const draft = orders.filter(o => o.status === 'DRAFT').length;
  const pending = orders.filter(o => ['SENT', 'CONFIRMED', 'PARTIAL_RECEIVED'].includes(o.status)).length;
  const totalValue = orders.reduce((sum, o) => sum + Number(o.total), 0);
  const unpaidValue = orders.filter(o => o.paymentStatus !== 'PAID').reduce((sum, o) => sum + Number(o.total), 0);

  return { orders, stats: { total, draft, pending, totalValue, unpaidValue } };
}

export default async function PurchaseOrdersPage() {
  const { orders, stats } = await getPurchaseOrders();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Purchase Orders</h1>
          <p className="text-gray-600 font-inter font-light">Manage supplier orders and track deliveries</p>
        </div>
        <Link
          href="/admin/erp/purchase-orders/create"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">+ New Purchase Order</span>
          <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 font-open-sans">{stats.total}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Draft</p>
          <p className="text-2xl font-bold text-gray-500 font-open-sans">{stats.draft}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Pending Delivery</p>
          <p className="text-2xl font-bold text-amber-600 font-open-sans">{stats.pending}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Total Value</p>
          <p className="text-2xl font-bold text-gray-900 font-open-sans">₹{stats.totalValue > 0 ? (stats.totalValue / 100000).toFixed(1) + 'L' : '0'}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Unpaid Value</p>
          <p className="text-2xl font-bold text-red-600 font-open-sans">₹{stats.unpaidValue > 0 ? (stats.unpaidValue / 100000).toFixed(1) + 'L' : '0'}</p>
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="bg-white shadow-sm border border-gray-100">
        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-open-sans">No purchase orders yet</h3>
            <p className="text-gray-600 mb-6 font-inter font-light">Create your first purchase order to start ordering from vendors</p>
            <Link
              href="/admin/erp/purchase-orders/create"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
            >
              <span className="relative z-10 text-sm tracking-wide">Create Purchase Order</span>
              <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">PO Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Order Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Expected</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 font-inter">
                      <Link href={`/admin/erp/purchase-orders/${order.id}`} className="hover:underline">{order.poNumber}</Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 font-inter">{order.vendor.name}</div>
                      <div className="text-xs text-gray-500 font-inter">{order.vendor.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {order.orderDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {order.expectedDate?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">{order.items.length} items</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">₹{Number(order.total).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded border ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${paymentStatusColors[order.paymentStatus] || 'text-gray-600'}`}>{order.paymentStatus}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                      <Link href={`/admin/erp/purchase-orders/${order.id}`} className="text-blue-600 hover:text-blue-700 font-medium font-inter">View</Link>
                      {order.status === 'DRAFT' && (
                        <Link href={`/admin/erp/purchase-orders/${order.id}/edit`} className="text-gray-600 hover:text-gray-700 font-medium font-inter">Edit</Link>
                      )}
                      {['SENT', 'CONFIRMED', 'PARTIAL_RECEIVED'].includes(order.status) && (
                        <Link href={`/admin/erp/grn/create?poId=${order.id}`} className="text-green-600 hover:text-green-700 font-medium font-inter">Receive</Link>
                      )}
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
