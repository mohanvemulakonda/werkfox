import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { makeResetToken } from '@/lib/password-reset';
import { accountEmail, sendMail } from '@/lib/send-mail';

/**
 * POST /api/auth/forgot { email } — email a one-hour reset link.
 *
 * Always answers the same way, whether or not the address has an account, so this cannot be used
 * to find out who uses WerkFox. A failed send is logged for us, not shown to the person.
 */
export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({}));
  const clean = typeof email === 'string' ? email.toLowerCase().trim() : '';
  const reply = NextResponse.json({ ok: true, message: 'If that email has a WerkFox account, a reset link is on its way.' });
  if (!clean.includes('@')) return reply;

  const user = await prisma.admin_users.findUnique({ where: { email: clean }, select: { id: true, name: true, email: true, password: true, isActive: true } });
  if (!user || !user.isActive) return reply;

  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.werkfox.com').replace(/\/$/, '');
  const url = `${base}/reset-password?token=${encodeURIComponent(await makeResetToken(user))}`;
  const sent = await sendMail(
    user.email,
    'Reset your WerkFox password',
    accountEmail('Reset your password', [`Hello ${user.name},`, 'Use the button below to choose a new password. The link works once and for one hour.', 'If you did not ask for this, ignore this email; your password stays as it is.'], { label: 'Choose a new password', url }),
    `Hello ${user.name},\n\nChoose a new WerkFox password here (works once, for one hour):\n${url}\n\nIf you did not ask for this, ignore this email.`,
  );
  if (!sent.ok) console.error('[auth/forgot] reset email not sent:', sent.error);
  return reply;
}
