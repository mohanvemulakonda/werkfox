/**
 * Set up a new WerkFox customer: the organisation, its owner's account, and the membership that
 * links them. Prints a temporary password for the owner, who should change it after signing in
 * (top-right menu > Change password), or use "Forgot your password?" on the sign-in page.
 *
 *   npx tsx scripts/create-organization.ts --name="Sri Ram Sand Supply" --owner="Sriram" \
 *     --email=sriramrd91@gmail.com [--phone=+91...] [--gst=...] [--city=...] [--state=...] [--apply]
 *
 * Without --apply it only prints what it would create. Refuses an email that already has an
 * account, so it can never take over somebody's login. Written 14 Oct 2026 (WerkFox email +
 * password sign-in, first customer after Clerk).
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();
const arg = (k: string) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split('=').slice(1).join('=').trim();

(async () => {
  const name = arg('name'), owner = arg('owner'), email = arg('email')?.toLowerCase();
  const apply = process.argv.includes('--apply');
  if (!name || !owner || !email || !email.includes('@')) {
    console.error('usage: create-organization.ts --name="Company" --owner="Person" --email=x@y.com [--phone=] [--gst=] [--city=] [--state=] [--apply]');
    process.exit(1);
  }
  if (await prisma.admin_users.findUnique({ where: { email } })) {
    console.error(`${email} already has a WerkFox account. Add them to the organisation instead.`);
    process.exit(1);
  }
  let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'org';
  for (let i = 2; await prisma.organizations.findUnique({ where: { slug } }); i++) slug = `${slug.replace(/-\d+$/, '')}-${i}`;

  const plan = { organisation: { name, slug, phone: arg('phone') ?? null, gstNumber: arg('gst') ?? null, city: arg('city') ?? null, state: arg('state') ?? null, country: 'India' },
    owner: { name: owner, email, role: 'ADMIN (membership OWNER)' } };
  console.log(JSON.stringify(plan, null, 1));
  if (!apply) { console.log('\nDry run. Add --apply to create.'); return prisma.$disconnect(); }

  // Readable but not guessable: 3 groups of 4 letters/digits, no look-alikes.
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789';
  const temp = Array.from(randomBytes(12), (b, i) => alphabet[b % alphabet.length] + (i % 4 === 3 && i < 11 ? '-' : '')).join('');

  const result = await prisma.$transaction(async (tx) => {
    const org = await tx.organizations.create({ data: { ...plan.organisation, packageType: 'FULL_SUITE', isActive: true } });
    const user = await tx.admin_users.create({
      data: {
        email, name: owner, phone: plan.organisation.phone, password: await bcrypt.hash(temp, 10), role: 'ADMIN', isActive: true, updatedAt: new Date(),
        canApproveInvoices: true, canCreateInvoices: true, canCreateLeads: true, canEditLeads: true, canDeleteLeads: true, canViewAllLeads: true,
      },
    });
    await tx.organization_members.create({ data: { organizationId: org.id, userId: user.id, role: 'OWNER', isActive: true } });
    await tx.platform_events.create({ data: { event: 'ORG_CREATED', entityType: 'organization', entityId: org.id, userId: user.id, orgId: org.id } });
    return { org, user };
  });

  console.log(`\nCreated organisation ${result.org.id} "${result.org.name}" and owner ${result.user.id}.`);
  console.log(`Sign in at https://www.werkfox.com/login with ${email} and temporary password ${temp}`);
  await prisma.$disconnect();
})().catch(async (e) => { console.error('FAILED', e.message); await prisma.$disconnect(); process.exit(1); });
