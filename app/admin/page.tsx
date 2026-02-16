import Link from 'next/link';
import SalesChart from './components/SalesChart';
import prisma from '@/lib/prisma';

async function getStats() {
  const [leads, contacts, opportunities, activities, customers, invoices] = await Promise.all([
    prisma.leads.count(),
    prisma.contacts.count(),
    prisma.opportunities.count(),
    prisma.activities.count(),
    prisma.customers.count(),
    prisma.invoices.count(),
  ]);

  const recentLeads = await prisma.leads.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      company: true,
      stage: true,
      status: true,
      createdAt: true,
    },
  });

  return { leads, contacts, opportunities, activities, customers, invoices, recentLeads };
}

async function getSalesData() {
  const invoices = await prisma.invoices.findMany({
    select: {
      total: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  if (invoices.length === 0) return [];

  const monthlyData: { [key: string]: { revenue: number; count: number } } = {};

  invoices.forEach(invoice => {
    const monthKey = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric',
    }).format(invoice.createdAt);

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { revenue: 0, count: 0 };
    }

    monthlyData[monthKey].revenue += Number(invoice.total);
    monthlyData[monthKey].count += 1;
  });

  return Object.entries(monthlyData)
    .map(([month, data]) => ({
      month,
      revenue: Math.round(data.revenue * 100) / 100,
      invoiceCount: data.count,
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
}

const statCards = [
  {
    name: 'Leads',
    key: 'leads',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    href: '/admin/crm/leads',
  },
  {
    name: 'Opportunities',
    key: 'opportunities',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: '/admin/crm/opportunities',
  },
  {
    name: 'Customers',
    key: 'customers',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    href: '/admin/customers',
  },
  {
    name: 'Invoices',
    key: 'invoices',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    href: '/admin/erp/invoices',
  },
];

export default async function AdminDashboard() {
  const [stats, salesData] = await Promise.all([getStats(), getSalesData()]);

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-description">Welcome to WerkFox Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {statCards.map((stat) => {
          const value = stats[stat.key as keyof typeof stats];

          return (
            <Link key={stat.name} href={stat.href} className="admin-stat-card">
              <div className="admin-stat-icon">
                {stat.icon}
              </div>
              <h3 className="admin-stat-label">{stat.name}</h3>
              <p className="admin-stat-value">{typeof value === 'number' ? value : 0}</p>
            </Link>
          );
        })}
      </div>

      {/* Sales Chart */}
      {salesData.length > 0 && (
        <div className="admin-chart-container">
          <SalesChart initialData={salesData} />
        </div>
      )}

      {/* Recent Leads Table */}
      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2 className="admin-table-title">Recent Leads</h2>
          <Link href="/admin/crm/leads" className="admin-table-link">
            View all →
          </Link>
        </div>
        {stats.recentLeads.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No leads yet.</p>
            <Link href="/admin/crm/leads/create" className="text-blue-600 hover:underline mt-2 inline-block">
              Create your first lead →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Stage</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="primary">
                      <Link href={`/admin/crm/leads/${lead.id}`} className="hover:underline">
                        {lead.name}
                      </Link>
                    </td>
                    <td>{lead.email}</td>
                    <td>{lead.company || '-'}</td>
                    <td>
                      <span className="admin-badge">{lead.stage}</span>
                    </td>
                    <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
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
