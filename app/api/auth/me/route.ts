import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const dbUser = await prisma.admin_users.findUnique({
    where: { id: user.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      department: true,
      designation: true,
      phone: true,
    },
  });

  const memberships = await prisma.organization_members.findMany({
    where: { userId: user.userId, isActive: true },
    include: { organization: true },
  });

  return NextResponse.json({
    user: dbUser,
    organizations: memberships.map((m) => ({
      id: m.organization.id,
      name: m.organization.name,
      slug: m.organization.slug,
      role: m.role,
      packageType: m.organization.packageType,
    })),
    currentOrganizationId: user.organizationId,
  });
}
