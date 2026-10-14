import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { passwordProblem, readResetToken } from '@/lib/password-reset';

/** POST /api/auth/reset { token, password } — set a new password from an emailed link. */
export async function POST(request: Request) {
  const { token, password } = await request.json().catch(() => ({}));
  const problem = passwordProblem(password);
  if (problem) return NextResponse.json({ error: problem }, { status: 400 });
  if (typeof token !== 'string' || !token) return NextResponse.json({ error: 'This link is not valid.' }, { status: 400 });

  const userId = await readResetToken(token, async (id) => (await prisma.admin_users.findUnique({ where: { id }, select: { password: true, isActive: true } }))?.password ?? null);
  if (!userId) return NextResponse.json({ error: 'This link has expired or was already used. Ask for a new one.' }, { status: 400 });

  await prisma.admin_users.update({ where: { id: userId }, data: { password: await hashPassword(password) } });
  await prisma.platform_events.create({ data: { event: 'PASSWORD_RESET', entityType: 'user', entityId: userId, userId } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
