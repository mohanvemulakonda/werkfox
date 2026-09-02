import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import prisma from './prisma';
import {
  generateToken as genToken,
  verifyToken as verToken,
  type JWTPayload,
} from './auth-edge';
import { getEnabledModules, type ModuleId, type PackageType } from './modules';

// Re-export Edge-compatible functions
export const generateToken = genToken;
export const verifyToken = verToken;
export type { JWTPayload };

/**
 * Get current user from auth_token cookie
 */
export async function getCurrentUser(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Set auth cookie
 */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

/**
 * Clear auth cookie
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
}

/**
 * Hash password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Verify password
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Full auth() function — replaces Clerk's auth
 * Returns user, organizations, currentOrg with enabled modules
 */
export async function auth() {
  const user = await getCurrentUser();
  if (!user) return null;

  // Fetch organization memberships
  let organizations: {
    id: number;
    name: string;
    slug: string;
    role: string;
    packageType: PackageType;
  }[] = [];

  try {
    const memberships = await prisma.organization_members.findMany({
      where: { userId: user.userId, isActive: true },
      include: { organization: true },
    });

    organizations = memberships.map((m) => ({
      id: m.organization.id,
      name: m.organization.name,
      slug: m.organization.slug,
      role: m.role,
      packageType: m.organization.packageType as PackageType,
    }));
  } catch (e) {
    console.warn('Database not available for org lookup');
  }

  // Determine current org
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

  // Honor org cookie if set
  try {
    const cookieStore = await cookies();
    const currentOrgCookie = cookieStore.get('werkfox_current_org')?.value;
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
  } catch {
    // cookies() may throw in some contexts
  }

  return {
    user: {
      id: String(user.userId),
      name: user.name,
      email: user.email,
      image: undefined as string | undefined,
    },
    organizations,
    currentOrg,
  };
}
