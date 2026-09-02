import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyPassword, generateToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const userAgent = headersList.get('user-agent') || '';

  try {
    const { email, password } = await request.json();
    const cleanEmail = email?.toLowerCase().trim();

    if (!cleanEmail || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Find user
    const user = await prisma.admin_users.findUnique({
      where: { email: cleanEmail },
    });

    if (!user || !user.isActive) {
      // Log failed attempt
      await prisma.login_attempts.create({
        data: { email: cleanEmail, success: false, ipAddress: ip, userAgent, errorReason: user ? 'Account inactive' : 'User not found' },
      });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      await prisma.login_attempts.create({
        data: { email: cleanEmail, success: false, ipAddress: ip, userAgent, errorReason: 'Wrong password', userId: user.id },
      });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Find organization membership
    const membership = await prisma.organization_members.findFirst({
      where: { userId: user.id, isActive: true },
      include: { organization: true },
    });

    // Generate JWT — use admin_users.role as primary role (SUPER_ADMIN etc)
    // orgRole is the membership role within the current org
    const token = await generateToken({
      userId: user.id,
      organizationId: membership?.organizationId ?? 0,
      role: user.role, // always from admin_users table
      orgRole: membership?.role ?? 'MEMBER',
      email: user.email,
      name: user.name,
    });

    // Set cookie
    await setAuthCookie(token);

    // Update last login
    await prisma.admin_users.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Log successful login
    await prisma.login_attempts.create({
      data: { email: cleanEmail, success: true, ipAddress: ip, userAgent, userId: user.id },
    });

    // Log platform event
    await prisma.platform_events.create({
      data: { event: 'USER_LOGIN', entityType: 'user', entityId: user.id, userId: user.id, orgId: membership?.organizationId, ipAddress: ip },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: membership?.role ?? user.role,
      },
      organization: membership ? {
        id: membership.organization.id,
        name: membership.organization.name,
        slug: membership.organization.slug,
      } : null,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
