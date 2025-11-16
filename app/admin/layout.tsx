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
    redirect('/login/admin');
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Logo Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <div className="relative opacity-[0.05]">
          <Image
            src="/Livato Logo.png"
            alt=""
            width={600}
            height={600}
            className="select-none mix-blend-multiply"
            priority={false}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <AdminHeader user={session.user} />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
