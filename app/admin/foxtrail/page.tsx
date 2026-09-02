export default function FoxTrailOverview() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <h1 className="admin-page-title">FoxTrail</h1>
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, #E03B12, #FD9220)',
            color: 'white',
            letterSpacing: '0.5px',
          }}>
            NEW
          </span>
        </div>
        <p className="admin-page-subtitle">Track your field team in real-time — sales, delivery, service</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="Active Now" value="4 / 6" icon="🟢" color="#10B981" />
        <StatCard label="Visits Today" value="12" icon="📍" color="#E03B12" />
        <StatCard label="Total Distance" value="87 mi" icon="🛣️" color="#3B82F6" />
        <StatCard label="Avg Check-in" value="9:08 AM" icon="⏰" color="#F59E0B" />
      </div>

      {/* Two column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Team Activity */}
        <div className="admin-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: '#1d1d1f' }}>Team Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <ActivityRow name="Sam Mitchell" status="At Atlas Manufacturing" statusColor="#10B981" visits={3} time="12:32 PM" />
            <ActivityRow name="Lisa Park" status="En route to Summit Biotech" statusColor="#3B82F6" visits={2} time="12:45 PM" />
            <ActivityRow name="Jake Rivera" status="At HQ — Office" statusColor="#86868B" visits={0} time="9:15 AM" />
            <ActivityRow name="Maria Gonzalez" status="At Clearwater Medical" statusColor="#10B981" visits={4} time="11:20 AM" />
            <ActivityRow name="Chris Bennett" status="Offline" statusColor="#AEAEB2" visits={1} time="9:45 AM" />
          </div>
        </div>

        {/* Recent Visits */}
        <div className="admin-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: '#1d1d1f' }}>Recent Visits</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <VisitRow company="Meridian Health Systems" rep="Sam Mitchell" time="10:00 AM" status="Completed" statusColor="#10B981" />
            <VisitRow company="Atlas Manufacturing Co" rep="Sam Mitchell" time="12:30 PM" status="In Progress" statusColor="#3B82F6" />
            <VisitRow company="Vertex Industrial" rep="Lisa Park" time="10:15 AM" status="Completed" statusColor="#10B981" />
            <VisitRow company="Clearwater Medical" rep="Maria Gonzalez" time="11:20 AM" status="In Progress" statusColor="#3B82F6" />
            <VisitRow company="Summit Biotech" rep="Sam Mitchell" time="3:00 PM" status="Scheduled" statusColor="#AEAEB2" />
          </div>
        </div>
      </div>

      {/* Pending Actions */}
      <div className="admin-card" style={{ padding: '20px', marginTop: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: '#1d1d1f' }}>Pending Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <ActionCard count={3} label="Leave Requests" sublabel="Awaiting approval" color="#F59E0B" />
          <ActionCard count={7} label="Overdue Follow-ups" sublabel="Across 4 reps" color="#EF4444" />
          <ActionCard count={2} label="Unassigned Visits" sublabel="For tomorrow" color="#3B82F6" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  return (
    <div className="admin-card" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: '13px', color: '#86868b', marginBottom: '4px' }}>{label}</p>
          <p style={{ fontSize: '24px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.5px' }}>{value}</p>
        </div>
        <span style={{ fontSize: '24px' }}>{icon}</span>
      </div>
    </div>
  );
}

function ActivityRow({ name, status, statusColor, visits, time }: { name: string; status: string; statusColor: string; visits: number; time: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '10px', background: '#f5f5f7' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #E03B12, #FD9220)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '13px', fontWeight: 600, flexShrink: 0 }}>
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div style={{ marginLeft: '12px', flex: 1 }}>
        <p style={{ fontSize: '14px', fontWeight: 500, color: '#1d1d1f' }}>{name}</p>
        <p style={{ fontSize: '12px', color: statusColor, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColor, display: 'inline-block' }} />
          {status}
        </p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#E03B12' }}>{visits} visits</p>
        <p style={{ fontSize: '11px', color: '#aeaeb2' }}>{time}</p>
      </div>
    </div>
  );
}

function VisitRow({ company, rep, time, status, statusColor }: { company: string; rep: string; time: string; status: string; statusColor: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '14px', fontWeight: 500, color: '#1d1d1f' }}>{company}</p>
        <p style={{ fontSize: '12px', color: '#86868b' }}>{rep} · {time}</p>
      </div>
      <span style={{ fontSize: '12px', fontWeight: 600, color: statusColor, padding: '3px 8px', borderRadius: '6px', background: `${statusColor}15` }}>
        {status}
      </span>
    </div>
  );
}

function ActionCard({ count, label, sublabel, color }: { count: number; label: string; sublabel: string; color: string }) {
  return (
    <div style={{ padding: '14px', borderRadius: '12px', border: `1px solid ${color}30`, background: `${color}08` }}>
      <p style={{ fontSize: '28px', fontWeight: 700, color, letterSpacing: '-1px' }}>{count}</p>
      <p style={{ fontSize: '14px', fontWeight: 500, color: '#1d1d1f', marginTop: '2px' }}>{label}</p>
      <p style={{ fontSize: '12px', color: '#86868b' }}>{sublabel}</p>
    </div>
  );
}
