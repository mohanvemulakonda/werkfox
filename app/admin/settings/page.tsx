import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import OrgSettingsClient from './OrgSettingsClient';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.currentOrg) {
    redirect('/admin/organizations/select');
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Organization Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your organization&apos;s package and settings
        </p>
      </div>

      <OrgSettingsClient
        organizationId={session.currentOrg.id}
        userRole={session.currentOrg.role}
        initialPackageType={session.currentOrg.packageType}
      />
    </div>
  );
}
