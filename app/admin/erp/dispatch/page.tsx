import Link from 'next/link';
import prisma from '@/lib/prisma';

const statusBadgeClass: Record<string, string> = {
  PENDING: 'admin-badge admin-badge-pending',
  PACKED: 'admin-badge admin-badge-confirmed',
  DISPATCHED: 'admin-badge admin-badge-in-progress',
  IN_TRANSIT: 'admin-badge admin-badge-on-hold',
  DELIVERED: 'admin-badge admin-badge-completed',
};

async function getDispatchOrders() {
  const orders = await prisma.dispatch_orders.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      salesOrder: { select: { soNumber: true } },
      customer: { select: { name: true } },
      items: { select: { id: true } },
    },
  });

  const total = orders.length;
  const pending = orders.filter(o => o.status === 'PENDING').length;
  const packed = orders.filter(o => o.status === 'PACKED').length;
  const dispatched = orders.filter(o => o.status === 'DISPATCHED').length;
  const inTransit = orders.filter(o => o.status === 'IN_TRANSIT').length;
  const delivered = orders.filter(o => o.status === 'DELIVERED').length;

  return { orders, stats: { total, pending, packed, dispatched, inTransit, delivered } };
}

export default async function DispatchPage() {
  const { orders, stats } = await getDispatchOrders();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Dispatch Orders</h1>
          <p className="text-gray-600 font-inter font-light">Manage shipping and delivery of sales orders</p>
        </div>
        <Link
          href="/admin/erp/dispatch/create"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">+ New Dispatch</span>
          <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Total</p>
          <p className="text-2xl font-bold text-gray-900 font-open-sans">{stats.total}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Pending</p>
          <p className="text-2xl font-bold text-amber-600 font-open-sans">{stats.pending}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Packed</p>
          <p className="text-2xl font-bold text-blue-600 font-open-sans">{stats.packed}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Dispatched</p>
          <p className="text-2xl font-bold text-indigo-600 font-open-sans">{stats.dispatched}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">In Transit</p>
          <p className="text-2xl font-bold text-purple-600 font-open-sans">{stats.inTransit}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Delivered</p>
          <p className="text-2xl font-bold text-green-600 font-open-sans">{stats.delivered}</p>
        </div>
      </div>

      {/* Dispatch Orders Table */}
      <div className="admin-table-container">
        {orders.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17a5 5 0 01-.916-9.916A5.002 5.002 0 0112 3c2.694 0 4.891 2.096 5.053 4.75A4.5 4.5 0 0117 17H8z" />
            </svg>
            <h3 className="admin-empty-title">No dispatch orders yet</h3>
            <p className="admin-empty-description">Create your first dispatch order to start shipping</p>
            <Link
              href="/admin/erp/dispatch/create"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter mt-4"
            >
              <span className="relative z-10 text-sm tracking-wide">Create Dispatch Order</span>
              <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>DC #</th>
                  <th>Sales Order</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Shipping Method</th>
                  <th>Dispatch Date</th>
                  <th>Delivery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="primary">
                      <Link href={`/admin/erp/dispatch/${order.id}`} className="admin-table-link">
                        {order.dispatchNumber}
                      </Link>
                    </td>
                    <td>
                      <Link href={`/admin/erp/sales-orders/${order.salesOrderId}`} className="text-blue-600 hover:text-blue-700 font-inter text-sm">
                        {order.salesOrder.soNumber}
                      </Link>
                    </td>
                    <td>
                      <div className="text-sm font-medium text-gray-900 font-inter">{order.customer.name}</div>
                    </td>
                    <td>
                      <span className={statusBadgeClass[order.status] || 'admin-badge'}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="text-sm text-gray-600">
                      {order.shippingMethod?.replace('_', ' ') || '-'}
                    </td>
                    <td>
                      {order.dispatchDate?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) || '-'}
                    </td>
                    <td>
                      {order.actualDelivery
                        ? order.actualDelivery.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
                        : order.estimatedDelivery
                        ? `Est: ${order.estimatedDelivery.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}`
                        : '-'}
                    </td>
                    <td className="space-x-3">
                      <Link
                        href={`/admin/erp/dispatch/${order.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium font-inter text-sm"
                      >
                        View
                      </Link>
                      {order.status === 'PENDING' && (
                        <Link
                          href={`/admin/erp/dispatch/${order.id}/edit`}
                          className="text-gray-600 hover:text-gray-700 font-medium font-inter text-sm"
                        >
                          Edit
                        </Link>
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
