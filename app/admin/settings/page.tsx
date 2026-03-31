import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SettingsTabsClient from './SettingsTabsClient';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.currentOrg) {
    redirect('/admin/organizations/select');
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your organization, company profile, and system settings
        </p>
      </div>

      <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E03B12]"></div></div>}>
        <SettingsTabsClient
          organizationId={session.currentOrg.id}
          userRole={session.currentOrg.role}
          initialPackageType={session.currentOrg.packageType}
        />
      </Suspense>
    </div>
  );
}
