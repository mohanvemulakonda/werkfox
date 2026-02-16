import AdminHeader from './components/AdminHeader';
import MainSidebar from './components/MainSidebar';
import Image from 'next/image';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/sign-in');
  }

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
