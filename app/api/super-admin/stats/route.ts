import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalOrgs, totalUsers, todayLogins, failedLogins, recentEvents] = await Promise.all([
    prisma.organizations.count(),
    prisma.admin_users.count(),
    prisma.login_attempts.count({ where: { success: true, createdAt: { gte: today } } }),
    prisma.login_attempts.count({ where: { success: false, createdAt: { gte: today } } }),
    prisma.platform_events.findMany({ orderBy: { createdAt: 'desc' }, take: 20, select: { event: true, userId: true, createdAt: true } }),
  ]);

  return NextResponse.json({
    totalOrgs,
    totalUsers,
    activeUsers: totalUsers,
    todayLogins,
    failedLogins,
    recentEvents,
  });
}
