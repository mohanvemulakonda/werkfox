import prisma from '@/lib/prisma';
import Link from 'next/link';
import SalesChart from './components/SalesChart';

async function getStats() {
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
}

async function getSalesData() {
  // Get all invoices (INVOICE type only, excluding quotes)
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

  // Group by month
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

  // Convert to array and sort by date
  const salesData = Object.entries(monthlyData).map(([month, data]) => ({
    month,
    revenue: Math.round(data.revenue * 100) / 100,
    invoiceCount: data.count
  })).sort((a, b) => {
    const dateA = new Date(a.month);
    const dateB = new Date(b.month);
    return dateA.getTime() - dateB.getTime();
  });

  return salesData;
}

export default async function AdminDashboard() {
  const [stats, salesData] = await Promise.all([getStats(), getSalesData()]);

  const statCards = [
    {
      name: 'Total Contacts',
      value: stats.contacts,
      change: `+${stats.newContactsToday} today`,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'bg-gray-100 border border-gray-900 text-gray-900',
      href: '/admin/contacts'
    },
    {
      name: 'Active Subscribers',
      value: stats.subscribers,
      change: 'Newsletter list',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-gray-100 border border-gray-900 text-gray-900',
      href: '/admin/subscribers'
    },
    {
      name: 'Downloads',
      value: stats.downloads,
      change: 'Resource downloads',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      ),
      color: 'bg-gray-100 border border-gray-900 text-gray-900',
      href: '/admin/downloads'
    },
    {
      name: 'Invoices & Quotes',
      value: stats.invoices,
      change: 'Total created',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-gray-100 border border-gray-900 text-gray-900',
      href: '/admin/invoices'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-open-sans">Dashboard</h1>
        <p className="text-gray-600 font-inter font-light">Welcome to Livato Solutions Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1 font-inter">{stat.name}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1 font-open-sans">{stat.value}</p>
            <p className="text-xs text-gray-500 font-inter">{stat.change}</p>
          </Link>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="mb-8">
        <SalesChart initialData={salesData} />
      </div>

      {/* Recent Contacts */}
      <div className="bg-white shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 font-open-sans">Recent Contacts</h2>
          <Link href="/admin/contacts" className="text-sm text-blue-600 hover:text-blue-700 font-inter">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-inter">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-inter">
                    {contact.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                    {contact.company || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-900 border border-gray-900 font-inter">
                      {contact.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-inter">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
