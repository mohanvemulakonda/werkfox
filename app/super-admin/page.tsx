'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalOrgs: number;
  totalUsers: number;
  activeUsers: number;
  todayLogins: number;
  failedLogins: number;
  recentEvents: { event: string; userId: number | null; createdAt: string }[];
}

export default function SuperAdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/super-admin/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1d1d1f', marginBottom: '4px' }}>Platform Overview</h1>
      <p style={{ fontSize: '14px', color: '#86868b', marginBottom: '24px' }}>WerkFox platform health and activity</p>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <StatCard label="Organizations" value={stats?.totalOrgs ?? '—'} color="#E03B12" />
        <StatCard label="Total Users" value={stats?.totalUsers ?? '—'} color="#3B82F6" />
        <StatCard label="Active Today" value={stats?.todayLogins ?? '—'} color="#10B981" />
        <StatCard label="Failed Logins" value={stats?.failedLogins ?? '—'} color="#EF4444" />
      </div>

      {/* Recent activity */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1d1d1f', marginBottom: '16px' }}>Recent Platform Events</h2>
        {stats?.recentEvents?.length ? (
          <div>
            {stats.recentEvents.map((e, i) => (
              <div key={i} style={{ display: 'flex', padding: '10px 0', borderBottom: i < stats.recentEvents.length - 1 ? '1px solid #f5f5f7' : 'none', fontSize: '14px' }}>
                <span style={{ color: '#1d1d1f', fontWeight: 500, flex: 1 }}>{e.event}</span>
                <span style={{ color: '#86868b' }}>User #{e.userId}</span>
                <span style={{ color: '#aeaeb2', marginLeft: '16px', fontSize: '13px' }}>{new Date(e.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#aeaeb2', fontSize: '14px' }}>No events yet. Login activity will appear here.</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <p style={{ fontSize: '13px', color: '#86868b', marginBottom: '8px' }}>{label}</p>
      <p style={{ fontSize: '32px', fontWeight: 700, color, letterSpacing: '-1px' }}>{value}</p>
    </div>
  );
}
