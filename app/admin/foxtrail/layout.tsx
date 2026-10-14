import { redirect } from 'next/navigation';
import SubNav from '../components/SubNav';

// Hidden from customers (14 Oct 2026): not ready to sell. Remove this guard and the TopBar entry to bring it back.
const HIDDEN = true;

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
  if (HIDDEN) redirect('/admin');
  return (
    <>
      <SubNav items={foxtrailNavItems} />
      <div className="admin-content-area">
        {children}
      </div>
    </>
  );
}
