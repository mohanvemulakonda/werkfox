import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import Image from 'next/image';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/sign-in');
  }

  // Require a selected organization for admin routes
  if (!session.currentOrg) {
    redirect('/admin/organizations/select');
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Logo Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <div className="relative opacity-[0.03]">
          <Image
            src="/fox-icon.svg"
            alt=""
            width={600}
            height={600}
            className="select-none"
            priority={false}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <AdminHeader user={session.user} organizations={session.organizations} currentOrg={session.currentOrg} />
        <div className="flex">
          <AdminSidebar enabledModules={session.currentOrg.enabledModules} />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
