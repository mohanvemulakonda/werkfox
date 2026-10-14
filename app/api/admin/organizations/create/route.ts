import { NextResponse } from 'next/server';
import { auth, getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, slug, packageType } = body;

  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  // Creating an organisation is a platform job (super-admin), not something any signed-in member may do.
  const me = await getCurrentUser();
  if (me?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Only a WerkFox administrator can create an organisation' }, { status: 403 });
  }

  const userId = Number(me.userId);

  if (!name || !slug) {
    return NextResponse.json({ error: 'name and slug required' }, { status: 400 });
  }

  try {
    const org = await prisma.organizations.create({
      data: { name, slug, packageType: packageType || 'FULL_SUITE' },
    });

    await prisma.organization_members.create({
      data: {
        organizationId: org.id,
        // userId, not clerkUserId: sign-in finds a person's organisation by userId, so a membership
        // written to the old Clerk column left its creator with no organisation at all.
        userId,
        role: 'OWNER',
      },
    });

    return NextResponse.json({ ok: true, org });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
