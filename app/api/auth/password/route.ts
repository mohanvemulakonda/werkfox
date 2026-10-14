import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser, hashPassword, verifyPassword } from '@/lib/auth';
import { passwordProblem } from '@/lib/password-reset';

/** POST /api/auth/password { current, password } — the signed-in person changes their own password. */
export async function POST(request: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 });
  const { current, password } = await request.json().catch(() => ({}));
  const problem = passwordProblem(password);
  if (problem) return NextResponse.json({ error: problem }, { status: 400 });

  const user = await prisma.admin_users.findUnique({ where: { id: me.userId }, select: { id: true, password: true } });
  if (!user || typeof current !== 'string' || !(await verifyPassword(current, user.password))) {
    return NextResponse.json({ error: 'Your current password is not right.' }, { status: 400 });
  }
  await prisma.admin_users.update({ where: { id: user.id }, data: { password: await hashPassword(password) } });
  await prisma.platform_events.create({ data: { event: 'PASSWORD_CHANGED', entityType: 'user', entityId: user.id, userId: user.id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
