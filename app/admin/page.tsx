import Link from 'next/link';
import SalesChart from './components/SalesChart';

// Demo data for when database is not connected
const demoStats = {
  contacts: 156,
  subscribers: 89,
  downloads: 234,
  invoices: 45,
  newContactsToday: 3,
  recentContacts: [
    { id: '1', name: 'Rajesh Kumar', email: 'rajesh@techmanufacturing.in', company: 'Tech Manufacturing Pvt Ltd', source: 'contact_form', createdAt: new Date() },
    { id: '2', name: 'Priya Sharma', email: 'priya@steelworks.com', company: 'Sharma Steel Works', source: 'website', createdAt: new Date(Date.now() - 86400000) },
    { id: '3', name: 'Amit Patel', email: 'amit@plasticsind.in', company: 'Patel Plastics Industries', source: 'referral', createdAt: new Date(Date.now() - 172800000) },
    { id: '4', name: 'Sunita Reddy', email: 'sunita@fabricators.co', company: 'Reddy Fabricators', source: 'contact_form', createdAt: new Date(Date.now() - 259200000) },
    { id: '5', name: 'Vikram Singh', email: 'vikram@autoparts.in', company: 'Singh Auto Parts', source: 'website', createdAt: new Date(Date.now() - 345600000) },
  ]
};

const demoSalesData = [
  { month: 'Aug 2025', revenue: 125000, invoiceCount: 8 },
  { month: 'Sep 2025', revenue: 187000, invoiceCount: 12 },
  { month: 'Oct 2025', revenue: 156000, invoiceCount: 10 },
  { month: 'Nov 2025', revenue: 234000, invoiceCount: 15 },
  { month: 'Dec 2025', revenue: 198000, invoiceCount: 13 },
  { month: 'Jan 2026', revenue: 267000, invoiceCount: 18 },
];

async function getStats() {
  try {
    const prisma = (await import('@/lib/prisma')).default;

    const [contacts, subscribers, downloads, invoices] = await Promise.all([
      prisma.contact.count(),
      prisma.subscriber.count({ where: { isActive: true } }),
      prisma.download.count(),
      prisma.invoice.count()
    ]);

    const recentContacts = await prisma.contact.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    const newContactsToday = await prisma.contact.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }
    });

    return { contacts, subscribers, downloads, invoices, recentContacts, newContactsToday };
  } catch {
    return demoStats;
  }
}

async function getSalesData() {
  try {
    const prisma = (await import('@/lib/prisma')).default;

    const invoices = await prisma.invoice.findMany({
      where: {
        type: 'INVOICE'
      },
      select: {
        total: true,
        createdAt: true,
        status: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    const monthlyData: { [key: string]: { revenue: number; count: number } } = {};

    invoices.forEach(invoice => {
      const monthKey = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        year: 'numeric'
      }).format(invoice.createdAt);

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { revenue: 0, count: 0 };
      }

      monthlyData[monthKey].revenue += Number(invoice.total);
      monthlyData[monthKey].count += 1;
    });

    const salesData = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      revenue: Math.round(data.revenue * 100) / 100,
      invoiceCount: data.count
    })).sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });

    return salesData.length > 0 ? salesData : demoSalesData;
  } catch {
    return demoSalesData;
  }
}

const statCards = [
  {
    name: 'Total Contacts',
    key: 'contacts',
    changeKey: 'newContactsToday',
    changePrefix: '+',
    changeSuffix: ' today',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    href: '/admin/contacts'
  },
  {
    name: 'Active Subscribers',
    key: 'subscribers',
    change: 'Newsletter list',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    href: '/admin/subscribers'
  },
  {
    name: 'Downloads',
    key: 'downloads',
    change: 'Resource downloads',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    ),
    href: '/admin/downloads'
  },
  {
    name: 'Invoices & Quotes',
    key: 'invoices',
    change: 'Total created',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    href: '/admin/invoices'
  }
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
          const changeText = stat.changeKey
            ? `${stat.changePrefix}${stats[stat.changeKey as keyof typeof stats]}${stat.changeSuffix}`
            : stat.change;

          return (
            <Link key={stat.name} href={stat.href} className="admin-stat-card">
              <div className="admin-stat-icon">
                {stat.icon}
              </div>
              <h3 className="admin-stat-label">{stat.name}</h3>
              <p className="admin-stat-value">{value}</p>
              <p className="admin-stat-change">{changeText}</p>
            </Link>
          );
        })}
      </div>

      {/* Sales Chart */}
      <div className="admin-chart-container">
        <SalesChart initialData={salesData} />
      </div>

      {/* Recent Contacts Table */}
      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2 className="admin-table-title">Recent Contacts</h2>
          <Link href="/admin/contacts" className="admin-table-link">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Source</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentContacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="primary">{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.company || '-'}</td>
                  <td>
                    <span className="admin-badge">{contact.source}</span>
                  </td>
                  <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
