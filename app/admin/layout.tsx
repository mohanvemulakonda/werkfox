import TopBar from './components/TopBar';
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
    <div className="admin-layout-v2">
      <TopBar
        user={session.user}
        organizations={session.organizations}
        currentOrg={session.currentOrg}
      />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
