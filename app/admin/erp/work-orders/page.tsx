import Link from 'next/link';
import prisma from '@/lib/prisma';

const statusBadgeClass: Record<string, string> = {
  PENDING: 'admin-badge admin-badge-pending',
  ASSIGNED: 'admin-badge admin-badge-confirmed',
  IN_PROGRESS: 'admin-badge admin-badge-in-progress',
  ON_HOLD: 'admin-badge admin-badge-on-hold',
  COMPLETED: 'admin-badge admin-badge-completed',
  INVOICED: 'admin-badge admin-badge-cancelled',
};

const typeBadgeColors: Record<string, string> = {
  SERVICE: 'bg-blue-100 text-blue-800',
  REPAIR: 'bg-red-100 text-red-800',
  INSTALLATION: 'bg-purple-100 text-purple-800',
  MAINTENANCE: 'bg-teal-100 text-teal-800',
};

const priorityBadgeColors: Record<string, string> = {
  LOW: 'bg-gray-100 text-gray-700',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-orange-100 text-orange-800',
  URGENT: 'bg-red-100 text-red-800',
};

async function getWorkOrders() {
  const orders = await prisma.work_orders.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      customer: { select: { name: true } },
      items: { select: { id: true } },
    },
  });

  const total = orders.length;
  const pending = orders.filter(o => o.status === 'PENDING').length;
  const assigned = orders.filter(o => o.status === 'ASSIGNED').length;
  const inProgress = orders.filter(o => o.status === 'IN_PROGRESS').length;
  const completed = orders.filter(o => o.status === 'COMPLETED').length;
  const totalValue = orders.reduce((sum, o) => sum + Number(o.totalCost), 0);

  return { orders, stats: { total, pending, assigned, inProgress, completed, totalValue } };
}

export default async function WorkOrdersPage() {
  const { orders, stats } = await getWorkOrders();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Work Orders</h1>
          <p className="text-gray-600 font-inter font-light">Manage service, repair, installation, and maintenance work orders</p>
        </div>
        <Link
          href="/admin/erp/work-orders/create"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">+ New Work Order</span>
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
          <p className="text-sm text-gray-600 font-inter">Assigned</p>
          <p className="text-2xl font-bold text-blue-600 font-open-sans">{stats.assigned}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">In Progress</p>
          <p className="text-2xl font-bold text-indigo-600 font-open-sans">{stats.inProgress}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Completed</p>
          <p className="text-2xl font-bold text-green-600 font-open-sans">{stats.completed}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Total Value</p>
          <p className="text-2xl font-bold text-gray-900 font-open-sans">
            {stats.totalValue > 0 ? '\u20B9' + (stats.totalValue / 100000).toFixed(1) + 'L' : '\u20B90'}
          </p>
        </div>
      </div>

      {/* Work Orders Table */}
      <div className="admin-table-container">
        {orders.length === 0 ? (
          <div className="admin-empty-state">
            <svg className="admin-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h3 className="admin-empty-title">No work orders yet</h3>
            <p className="admin-empty-description">Create your first work order to start tracking service and maintenance jobs</p>
            <Link
              href="/admin/erp/work-orders/create"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter mt-4"
            >
              <span className="relative z-10 text-sm tracking-wide">Create Work Order</span>
              <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>WO #</th>
                  <th>Type</th>
                  <th>Customer</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assigned To</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="primary">
                      <Link href={`/admin/erp/work-orders/${order.id}`} className="admin-table-link">
                        {order.woNumber}
                      </Link>
                    </td>
                    <td>
                      <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${typeBadgeColors[order.type] || 'bg-gray-100 text-gray-800'}`}>
                        {order.type}
                      </span>
                    </td>
                    <td>
                      <div className="text-sm font-medium text-gray-900 font-inter">{order.customer.name}</div>
                    </td>
                    <td>
                      <div className="text-sm text-gray-900 font-inter max-w-[200px] truncate">{order.title}</div>
                    </td>
                    <td>
                      <span className={statusBadgeClass[order.status] || 'admin-badge'}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${priorityBadgeColors[order.priority] || 'bg-gray-100 text-gray-800'}`}>
                        {order.priority}
                      </span>
                    </td>
                    <td className="text-sm text-gray-600 font-inter">
                      {order.assignedTo || '-'}
                    </td>
                    <td>
                      {order.createdAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="space-x-3">
                      <Link
                        href={`/admin/erp/work-orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium font-inter text-sm"
                      >
                        View
                      </Link>
                      {order.status === 'PENDING' && (
                        <Link
                          href={`/admin/erp/work-orders/${order.id}/edit`}
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
