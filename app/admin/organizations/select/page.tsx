import { auth } from '@/lib/auth';
import OrgSelectClient from '../OrgSelectClient';

export default async function OrganizationSelectPage() {
  const session = await auth();

  if (!session) {
    // guard: user must sign in first
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">Sign In Required</h1>
        <p className="mt-2 text-sm text-gray-600">Please sign in to manage organizations.</p>
      </div>
    );
  }

  const organizations = session.organizations || [];

  return (
    <div className="p-8">
      <OrgSelectClient organizations={organizations} />
    </div>
  );
}
