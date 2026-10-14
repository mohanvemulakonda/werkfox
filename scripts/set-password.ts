/**
 * Give an existing WerkFox account a new temporary password (when there is no mailbox to receive
 * a reset link, e.g. admin@werkfox.com). Prints the password once; the person changes it after
 * signing in (top-right menu > Change password).
 *
 *   npx tsx scripts/set-password.ts admin@werkfox.com [--apply]
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

(async () => {
  const email = (process.argv[2] || '').toLowerCase().trim();
  const user = email ? await prisma.admin_users.findUnique({ where: { email }, select: { id: true, name: true, role: true, isActive: true } }) : null;
  if (!user) { console.error('No WerkFox account for', email || '(no email given)'); process.exit(1); }
  console.log(`${email}: ${user.name}, ${user.role}, ${user.isActive ? 'active' : 'INACTIVE'}`);
  if (!process.argv.includes('--apply')) { console.log('Dry run. Add --apply to set a new temporary password.'); return prisma.$disconnect(); }

  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789';
  const temp = Array.from(randomBytes(12), (b, i) => alphabet[b % alphabet.length] + (i % 4 === 3 && i < 11 ? '-' : '')).join('');
  await prisma.admin_users.update({ where: { id: user.id }, data: { password: await bcrypt.hash(temp, 10), isActive: true } });
  await prisma.platform_events.create({ data: { event: 'PASSWORD_SET_BY_SCRIPT', entityType: 'user', entityId: user.id, userId: user.id } }).catch(() => {});
  console.log(`Temporary password for ${email}: ${temp}`);
  await prisma.$disconnect();
})().catch(async (e) => { console.error('FAILED', e.message); await prisma.$disconnect(); process.exit(1); });
