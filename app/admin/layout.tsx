import AdminHeader from './components/AdminHeader';
import MainSidebar from './components/MainSidebar';
import Image from 'next/image';

// Demo user for testing without auth
const demoSession = {
  user: {
    name: 'Demo User',
    email: 'demo@werkfox.com'
  },
  organizations: [
    { id: 'demo-org', name: 'WerkFox Demo', slug: 'werkfox-demo', role: 'admin' }
  ],
  currentOrg: {
    id: 'demo-org',
    name: 'WerkFox Demo',
    enabledModules: ['leads', 'opportunities', 'activities', 'contacts', 'customers', 'products', 'invoices', 'subscribers', 'downloads', 'team', 'settings']
  }
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = demoSession;

  return (
    <div className="admin-layout">
      {/* Background Logo Watermark */}
      <div className="admin-watermark">
        <Image
          src="/logo.png"
          alt=""
          width={600}
          height={600}
          className="select-none"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="admin-content">
        <AdminHeader user={session.user} organizations={session.organizations} currentOrg={session.currentOrg} />
        <div className="flex">
          <MainSidebar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
