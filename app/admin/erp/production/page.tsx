import Link from 'next/link';
import prisma from '@/lib/prisma';

const statusColors: Record<string, string> = {
  PLANNED: 'bg-blue-100 text-blue-800 border-blue-300',
  MATERIAL_REQUESTED: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  IN_PROGRESS: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  QC: 'bg-purple-100 text-purple-800 border-purple-300',
  COMPLETED: 'bg-green-100 text-green-800 border-green-300',
};

const priorityColors: Record<string, string> = {
  LOW: 'text-gray-500',
  MEDIUM: 'text-blue-600',
  HIGH: 'text-orange-600',
  URGENT: 'text-red-600',
};

async function getProductionOrders() {
  const orders = await prisma.production_orders.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      product: { select: { name: true, sku: true } },
      items: { select: { id: true } },
    },
  });

  const total = orders.length;
  const planned = orders.filter(o => o.status === 'PLANNED').length;
  const inProgress = orders.filter(o => ['IN_PROGRESS', 'MATERIAL_REQUESTED'].includes(o.status)).length;
  const completed = orders.filter(o => o.status === 'COMPLETED').length;

  return { orders, stats: { total, planned, inProgress, completed } };
}

export default async function ProductionOrdersPage() {
  const { orders, stats } = await getProductionOrders();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Production Orders</h1>
          <p className="text-gray-600 font-inter font-light">Manage manufacturing and production workflows</p>
        </div>
        <Link
          href="/admin/erp/production/create"
          className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
        >
          <span className="relative z-10 text-sm tracking-wide">+ New Production Order</span>
          <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 font-open-sans">{stats.total}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Planned</p>
          <p className="text-2xl font-bold text-blue-600 font-open-sans">{stats.planned}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">In Progress</p>
          <p className="text-2xl font-bold text-indigo-600 font-open-sans">{stats.inProgress}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-600 font-inter">Completed</p>
          <p className="text-2xl font-bold text-green-600 font-open-sans">{stats.completed}</p>
        </div>
      </div>

      {/* Production Orders Table */}
      <div className="bg-white shadow-sm border border-gray-100">
        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-open-sans">No production orders yet</h3>
            <p className="text-gray-600 mb-6 font-inter font-light">Create your first production order to start manufacturing</p>
            <Link
              href="/admin/erp/production/create"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white overflow-hidden font-inter"
            >
              <span className="relative z-10 text-sm tracking-wide">Create Production Order</span>
              <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Prod Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Planned Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Completed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">BOM Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 font-inter">
                      <Link href={`/admin/erp/production/${order.id}`} className="hover:underline">{order.prodNumber}</Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 font-inter">{order.product?.name || order.productName}</div>
                      <div className="text-xs text-gray-500 font-inter">{order.product?.sku || ''}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-inter font-medium">{order.plannedQuantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-inter">
                      <span style={{ color: order.completedQuantity >= order.plannedQuantity ? '#065f46' : order.completedQuantity > 0 ? '#92400e' : 'inherit' }}>
                        {order.completedQuantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded border ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${priorityColors[order.priority] || 'text-gray-600'}`}>{order.priority}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {order.plannedStartDate?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                      {order.plannedEndDate?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">{order.items.length} items</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                      <Link href={`/admin/erp/production/${order.id}`} className="text-blue-600 hover:text-blue-700 font-medium font-inter">View</Link>
                      {order.status === 'PLANNED' && (
                        <Link href={`/admin/erp/production/${order.id}/edit`} className="text-gray-600 hover:text-gray-700 font-medium font-inter">Edit</Link>
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
