import Link from 'next/link';

// Demo data for CRM overview
const crmStats = {
  totalLeads: 234,
  qualifiedLeads: 89,
  opportunities: 45,
  pipelineValue: 1250000,
  activitiesThisWeek: 67,
  conversionRate: 38
};

const recentLeads = [
  { id: '1', name: 'Rajesh Kumar', company: 'Tech Manufacturing Pvt Ltd', stage: 'QUALIFIED', score: 85, createdAt: new Date() },
  { id: '2', name: 'Priya Sharma', company: 'Sharma Steel Works', stage: 'CONTACTED', score: 72, createdAt: new Date(Date.now() - 86400000) },
  { id: '3', name: 'Amit Patel', company: 'Patel Plastics Industries', stage: 'NEW', score: 45, createdAt: new Date(Date.now() - 172800000) },
];

const upcomingActivities = [
  { id: '1', type: 'CALL', subject: 'Follow-up call with Rajesh', scheduledAt: new Date(Date.now() + 3600000), leadName: 'Rajesh Kumar' },
  { id: '2', type: 'MEETING', subject: 'Product demo for Sharma Steel', scheduledAt: new Date(Date.now() + 86400000), leadName: 'Priya Sharma' },
  { id: '3', type: 'EMAIL', subject: 'Send proposal to Patel Plastics', scheduledAt: new Date(Date.now() + 172800000), leadName: 'Amit Patel' },
];

export default function CRMOverview() {
  const statCards = [
    {
      name: 'Total Leads',
      value: crmStats.totalLeads,
      change: `${crmStats.qualifiedLeads} qualified`,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      href: '/admin/crm/leads'
    },
    {
      name: 'Opportunities',
      value: crmStats.opportunities,
      change: `₹${(crmStats.pipelineValue / 100000).toFixed(1)}L pipeline`,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: '/admin/crm/opportunities'
    },
    {
      name: 'Activities',
      value: crmStats.activitiesThisWeek,
      change: 'This week',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      href: '/admin/crm/activities'
    },
    {
      name: 'Conversion Rate',
      value: `${crmStats.conversionRate}%`,
      change: 'Lead to opportunity',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      href: '/admin/crm/leads'
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">CRM Overview</h1>
        <p className="admin-page-description">Manage your sales pipeline and customer relationships</p>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {statCards.map((stat) => (
          <Link key={stat.name} href={stat.href} className="admin-stat-card">
            <div className="admin-stat-icon">
              {stat.icon}
            </div>
            <h3 className="admin-stat-label">{stat.name}</h3>
            <p className="admin-stat-value">{stat.value}</p>
            <p className="admin-stat-change">{stat.change}</p>
          </Link>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="admin-table-container">
          <div className="admin-table-header">
            <h2 className="admin-table-title">Recent Leads</h2>
            <Link href="/admin/crm/leads" className="admin-table-link">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Stage</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="primary">{lead.name}</td>
                    <td>{lead.company}</td>
                    <td>
                      <span className={`admin-badge ${
                        lead.stage === 'QUALIFIED' ? 'admin-badge-success' :
                        lead.stage === 'CONTACTED' ? 'admin-badge-info' : ''
                      }`}>
                        {lead.stage}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-fox-gradient rounded-full"
                            style={{ width: `${lead.score}%` }}
                          />
                        </div>
                        <span className="text-xs">{lead.score}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Activities */}
        <div className="admin-table-container">
          <div className="admin-table-header">
            <h2 className="admin-table-title">Upcoming Activities</h2>
            <Link href="/admin/crm/activities" className="admin-table-link">
              View all →
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {upcomingActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activity.type === 'CALL' ? 'bg-green-100 text-green-600' :
                  activity.type === 'MEETING' ? 'bg-blue-100 text-blue-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'CALL' && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  )}
                  {activity.type === 'MEETING' && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  {activity.type === 'EMAIL' && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.subject}</p>
                  <p className="text-xs text-gray-500">{activity.leadName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-900">
                    {activity.scheduledAt.toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
