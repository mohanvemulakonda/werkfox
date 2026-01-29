import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, slug } = body;

  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const userId = session.user.id;

  if (!name || !slug) {
    return NextResponse.json({ error: 'name and slug required' }, { status: 400 });
  }

  try {
    const org = await prisma.organization.create({
      data: { name, slug },
    });

    await prisma.organizationMember.create({
      data: {
        organizationId: org.id,
        clerkUserId: userId,
        role: 'OWNER',
      },
    });

    return NextResponse.json({ ok: true, org });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
