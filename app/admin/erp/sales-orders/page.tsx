import Link from 'next/link';
import prisma from '@/lib/prisma';

const statusBadgeClass: Record<string, string> = {
  PENDING: 'admin-badge admin-badge-pending',
  CONFIRMED: 'admin-badge admin-badge-confirmed',
  IN_PROGRESS: 'admin-badge admin-badge-in-progress',
  COMPLETED: 'admin-badge admin-badge-completed',
  CANCELLED: 'admin-badge admin-badge-cancelled',
  ON_HOLD: 'admin-badge admin-badge-on-hold',
};

const paymentBadgeClass: Record<string, string> = {
  UNPAID: 'admin-badge admin-badge-unpaid',
  PARTIAL: 'admin-badge admin-badge-partial',
  PAID: 'admin-badge admin-badge-paid',
  OVERDUE: 'admin-badge admin-badge-overdue',
  REFUNDED: 'admin-badge admin-badge-cancelled',
};

async function getSalesOrders() {
  const orders = await prisma.sales_orders.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      customer: { select: { name: true, customerCode: true } },
      items: { select: { id: true } },
    },
  });

  const total = orders.length;
  const pending = orders.filter(o => o.status === 'PENDING').length;
  const confirmed = orders.filter(o => o.status === 'CONFIRMED').length;
  const inProgress = orders.filter(o => o.status === 'IN_PROGRESS').length;
  const totalValue = orders.reduce((sum, o) => sum + Number(o.total), 0);
  const unpaidValue = orders
    .filter(o => o.paymentStatus !== 'PAID')
    .reduce((sum, o) => sum + Number(o.total), 0);

  return { orders, stats: { total, pending, confirmed, inProgress, totalValue, unpaidValue } };
}

export default async function SalesOrdersPage() {
  const { orders, stats } = await getSalesOrders();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Sales Orders</h1>
          <p className="text-gray-600 font-inter font-light">Manage customer sales orders and track fulfillment</p>
        </div>
        <Link
          href="/admin/erp/sales-orders/create"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">+ New Sales Order</span>
          <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 font-open-sans">{stats.total}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Pending</p>
          <p className="text-2xl font-bold text-amber-600 font-open-sans">{stats.pending}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Confirmed</p>
          <p className="text-2xl font-bold text-indigo-600 font-open-sans">{stats.confirmed}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">In Progress</p>
          <p className="text-2xl font-bold text-blue-600 font-open-sans">{stats.inProgress}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Total Value</p>
          <p className="text-2xl font-bold text-gray-900 font-open-sans">
            {stats.totalValue > 0 ? '₹' + (stats.totalValue / 100000).toFixed(1) + 'L' : '₹0'}
          </p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Unpaid Value</p>
          <p className="text-2xl font-bold text-red-600 font-open-sans">
            {stats.unpaidValue > 0 ? '₹' + (stats.unpaidValue / 100000).toFixed(1) + 'L' : '₹0'}
          </p>
        </div>
      </div>

      {/* Sales Orders Table */}
      <div className="admin-table-container">
        {orders.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="admin-empty-title">No sales orders yet</h3>
            <p className="admin-empty-description">Create your first sales order to start tracking customer orders</p>
            <Link
              href="/admin/erp/sales-orders/create"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter mt-4"
            >
              <span className="relative z-10 text-sm tracking-wide">Create Sales Order</span>
              <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>SO #</th>
                  <th>Customer</th>
                  <th>Order Date</th>
                  <th>Delivery Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="primary">
                      <Link href={`/admin/erp/sales-orders/${order.id}`} className="admin-table-link">
                        {order.soNumber}
                      </Link>
                    </td>
                    <td>
                      <div className="text-sm font-medium text-gray-900 font-inter">{order.customer.name}</div>
                      <div className="text-xs text-gray-500 font-inter">{order.customer.customerCode}</div>
                    </td>
                    <td>
                      {order.orderDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td>
                      {order.deliveryDate?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) || '-'}
                    </td>
                    <td>{order.items.length} items</td>
                    <td className="font-medium text-gray-900">
                      ₹{Number(order.total).toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span className={statusBadgeClass[order.status] || 'admin-badge'}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <span className={paymentBadgeClass[order.paymentStatus] || 'admin-badge'}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="space-x-3">
                      <Link
                        href={`/admin/erp/sales-orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium font-inter text-sm"
                      >
                        View
                      </Link>
                      {order.status === 'PENDING' && (
                        <Link
                          href={`/admin/erp/sales-orders/${order.id}/edit`}
                          className="text-gray-600 hover:text-gray-700 font-medium font-inter text-sm"
                        >
                          Edit
                        </Link>
                      )}
                      {['CONFIRMED', 'IN_PROGRESS'].includes(order.status) && (
                        <Link
                          href={`/admin/erp/sales-orders/${order.id}`}
                          className="text-green-600 hover:text-green-700 font-medium font-inter text-sm"
                        >
                          Convert to Invoice
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
