import SubNav from '../components/SubNav';

const foxtrailNavItems = [
  { name: 'Overview', href: '/admin/foxtrail' },
  { name: 'Live Map', href: '/admin/foxtrail/live-map' },
  { name: 'Team', href: '/admin/foxtrail/team' },
  { name: 'Visits', href: '/admin/foxtrail/visits' },
  { name: 'Attendance', href: '/admin/foxtrail/attendance' },
  { name: 'Leaves', href: '/admin/foxtrail/leaves' },
  { name: 'Geofences', href: '/admin/foxtrail/geofences' },
  { name: 'Reports', href: '/admin/foxtrail/reports' },
  { name: 'Settings', href: '/admin/foxtrail/settings' },
];

export default function FoxTrailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubNav items={foxtrailNavItems} />
      <div className="admin-content-area">
        {children}
      </div>
    </>
  );
}
