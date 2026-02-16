import Link from 'next/link';
import prisma from '@/lib/prisma';

async function getERPStats() {
  const [totalProducts, totalInvoices, pendingInvoices, pendingPOs] = await Promise.all([
    prisma.products.count(),
    prisma.invoices.count(),
    prisma.invoices.count({ where: { status: { in: ['DRAFT', 'SENT'] } } }),
    prisma.purchase_orders.count({ where: { status: { in: ['SENT', 'CONFIRMED', 'PARTIAL_RECEIVED'] } } }),
  ]);

  const paidInvoices = await prisma.invoices.findMany({
    where: { status: 'PAID' },
    select: { total: true },
  });
  const revenueThisMonth = paidInvoices.reduce((sum, inv) => sum + Number(inv.total), 0);

  return { totalProducts, totalInvoices, pendingInvoices, revenueThisMonth, pendingPOs };
}

async function getRecentInvoices() {
  return prisma.invoices.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, invoiceNumber: true, customerName: true, total: true, status: true, currency: true },
  });
}

async function getLowStockProducts() {
  const inventory = await prisma.inventory.findMany({
    where: { quantity: { gt: 0 } },
    include: { product: { select: { name: true, sku: true, reorderLevel: true } } },
    orderBy: { quantity: 'asc' },
    take: 10,
  });
  return inventory.filter(i => i.quantity <= (i.product.reorderLevel || 0)).slice(0, 5);
}

export default async function ERPOverview() {
  const [stats, recentInvoices, lowStockProducts] = await Promise.all([
    getERPStats(),
    getRecentInvoices(),
    getLowStockProducts(),
  ]);

  const statCards = [
    {
      name: 'Total Products',
      value: stats.totalProducts,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      href: '/admin/erp/products',
    },
    {
      name: 'Invoices',
      value: stats.totalInvoices,
      change: stats.pendingInvoices > 0 ? `${stats.pendingInvoices} pending` : undefined,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: '/admin/erp/invoices',
    },
    {
      name: 'Revenue',
      value: stats.revenueThisMonth > 0 ? `₹${(stats.revenueThisMonth / 100000).toFixed(1)}L` : '₹0',
      change: 'Paid invoices',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: '/admin/erp/invoices',
    },
    {
      name: 'Pending POs',
      value: stats.pendingPOs,
      change: 'Purchase orders',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      href: '/admin/erp/purchase-orders',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="admin-page-header">
        <h1 className="admin-page-title">ERP Overview</h1>
        <p className="admin-page-description">Manage inventory, invoicing, and operations</p>
      </div>

      <div className="admin-stats-grid">
        {statCards.map((stat) => (
          <Link key={stat.name} href={stat.href} className="admin-stat-card">
            <div className="admin-stat-icon">{stat.icon}</div>
            <h3 className="admin-stat-label">{stat.name}</h3>
            <p className="admin-stat-value">{stat.value}</p>
            {stat.change && <p className="admin-stat-change">{stat.change}</p>}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="admin-table-container">
          <div className="admin-table-header">
            <h2 className="admin-table-title">Recent Invoices</h2>
            <Link href="/admin/erp/invoices" className="admin-table-link">View all →</Link>
          </div>
          {recentInvoices.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No invoices yet.</p>
              <Link href="/admin/erp/invoices/create" className="text-blue-600 hover:underline mt-2 inline-block">Create your first invoice →</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="primary">{invoice.invoiceNumber}</td>
                      <td>{invoice.customerName}</td>
                      <td>₹{Number(invoice.total).toLocaleString('en-IN')}</td>
                      <td>
                        <span className={`admin-badge ${
                          invoice.status === 'PAID' ? 'admin-badge-success' :
                          invoice.status === 'SENT' ? 'admin-badge-info' :
                          'admin-badge-error'
                        }`}>{invoice.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Low Stock Alert */}
        <div className="admin-table-container">
          <div className="admin-table-header">
            <div className="flex items-center gap-2">
              <h2 className="admin-table-title">Low Stock Alert</h2>
              {lowStockProducts.length > 0 && <span className="admin-badge admin-badge-warning">{lowStockProducts.length}</span>}
            </div>
            <Link href="/admin/erp/inventory" className="admin-table-link">View all →</Link>
          </div>
          {lowStockProducts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No low stock items.</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {lowStockProducts.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-xs text-gray-500">{item.product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-amber-600">{item.quantity} left</p>
                    <p className="text-xs text-gray-500">Reorder at {item.product.reorderLevel || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="p-4 pt-0">
            <Link href="/admin/erp/purchase-orders/create" className="admin-btn admin-btn-primary w-full">
              Create Purchase Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
