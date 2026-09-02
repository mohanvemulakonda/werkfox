import SubNav from '../components/SubNav';

const foxcutNavItems = [
  { name: 'Panels', href: '/admin/foxcut' },
  { name: 'Saved Plans', href: '/admin/foxcut/history' },
];

export default function FoxCutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubNav items={foxcutNavItems} />
      <div className="admin-content-area">
        {children}
      </div>
    </>
  );
}
