import { redirect } from 'next/navigation';
import SubNav from '../components/SubNav';

// Hidden from customers (14 Oct 2026): not ready to sell. Remove this guard and the TopBar entry to bring it back.
const HIDDEN = true;

const foxcutNavItems = [
  { name: 'Panels', href: '/admin/foxcut' },
  { name: 'Saved Plans', href: '/admin/foxcut/history' },
];

export default function FoxCutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (HIDDEN) redirect('/admin');
  return (
    <>
      <SubNav items={foxcutNavItems} />
      <div className="admin-content-area">
        {children}
      </div>
    </>
  );
}
