import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lightweight middleware - authentication is handled by NextAuth at the app level
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Let NextAuth handle authentication in API routes and server components
  // This middleware only handles basic routing
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    // Check for session token (NextAuth.js default cookie name)
    const sessionToken = request.cookies.get('authjs.session-token') ||
                        request.cookies.get('__Secure-authjs.session-token');

    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
