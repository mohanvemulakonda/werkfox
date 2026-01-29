import { auth as clerkAuth, currentUser } from '@clerk/nextjs/server';
import prisma from './prisma';
import { cookies } from 'next/headers';
import { getEnabledModules, type ModuleId, type PackageType } from './modules';

/**
 * Auth wrapper that provides session-like object for compatibility
 * with existing code that used NextAuth's getServerSession
 *
 * Now also returns organization membership data to support multi-tenancy.
 * Respects an optional 'werkfox_current_org' cookie to select the user's preferred org.
 */
export async function auth() {
  const { userId } = await clerkAuth();

  if (!userId) {
    return null;
  }

  const user = await currentUser();

  if (!user) {
    return null;
  }

  // Fetch organization memberships for this Clerk user
  const memberships = await prisma.organizationMember.findMany({
    where: { clerkUserId: user.id, isActive: true },
    include: { organization: true },
  });

  const organizations = memberships.map((m) => ({
    id: m.organization.id,
    name: m.organization.name,
    slug: m.organization.slug,
    role: m.role,
    packageType: m.organization.packageType as PackageType,
  }));

  // Default currentOrg is first active org
  let currentOrg: {
    id: number;
    name: string;
    slug: string;
    role: string;
    packageType: PackageType;
    enabledModules: ModuleId[];
  } | null = organizations.length
    ? {
        ...organizations[0],
        enabledModules: getEnabledModules(organizations[0].packageType),
      }
    : null;

  // If a cookie exists with a preferred org, and the user is a member of it, honor it
  try {
    const currentOrgCookie = (await cookies()).get('werkfox_current_org')?.value;
    if (currentOrgCookie) {
      const cookieOrgId = parseInt(currentOrgCookie, 10);
      const match = organizations.find((o) => o.id === cookieOrgId);
      if (match) {
        currentOrg = {
          ...match,
          enabledModules: getEnabledModules(match.packageType),
        };
      }
    }
  } catch (e) {
    // cookies() may throw in some contexts; ignore and use default
  }

  return {
    user: {
      id: user.id,
      name: user.fullName || user.firstName || 'User',
      email: user.emailAddresses[0]?.emailAddress || '',
      image: user.imageUrl,
    },
    organizations,
    currentOrg,
  };
}
