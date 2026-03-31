import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

/**
 * Guard that ensures authenticated user with an active organization.
 * Returns session with guaranteed currentOrg, or a NextResponse error.
 */
export async function requireOrg() {
  const session = await auth();
  if (!session) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  if (!session.currentOrg) {
    return { error: NextResponse.json({ error: 'No organization selected' }, { status: 400 }) };
  }
  return { session, orgId: session.currentOrg.id };
}
