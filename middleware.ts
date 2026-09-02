import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth-edge';

// Routes requiring authentication
const protectedRoutes = ['/admin'];

// Routes that redirect to admin if already logged in
const authRoutes = ['/login', '/sign-in', '/signup'];

// Super admin routes (only platform owners)
const superAdminRoutes = ['/super-admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, _next, public assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('/favicon') ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|css|js|ico|woff|woff2|ttf|eot|xml|txt|webmanifest)$/)
  ) {
    return NextResponse.next();
  }

  // Get auth token
  const token = request.cookies.get('auth_token')?.value;
  let user = token ? await verifyToken(token) : null;

  // ─── API routes: add user context headers ──────────────
  if (pathname.startsWith('/api')) {
    // Mobile API uses Bearer token from Authorization header
    if (pathname.startsWith('/api/mobile') && !user) {
      const authHeader = request.headers.get('Authorization');
      if (authHeader?.startsWith('Bearer ')) {
        user = await verifyToken(authHeader.slice(7));
      }
    }

    if (user) {
      const headers = new Headers(request.headers);
      headers.set('x-user-id', String(user.userId));
      headers.set('x-organization-id', String(user.organizationId));
      headers.set('x-user-role', user.role);
      headers.set('x-user-email', user.email);
      headers.set('x-user-name', user.name);

      return NextResponse.next({ request: { headers } });
    }

    // Protected API routes need auth
    if (pathname.startsWith('/api/admin') || pathname.startsWith('/api/mobile')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next();
  }

  // ─── Super admin routes ────────────────────────────────
  if (superAdminRoutes.some((r) => pathname.startsWith(r))) {
    if (!user || user.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // ─── Protected page routes ─────────────────────────────
  if (protectedRoutes.some((r) => pathname.startsWith(r))) {
    if (!user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Add no-cache headers for protected routes
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    return response;
  }

  // ─── Auth routes: redirect if already logged in ────────
  if (authRoutes.some((r) => pathname.startsWith(r))) {
    if (user) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
