import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
]);

const isProtectedApiRoute = createRouteMatcher([
  '/api/leads(.*)',
  '/api/opportunities(.*)',
  '/api/activities(.*)',
  '/api/products(.*)',
  '/api/invoices(.*)',
  '/api/customers(.*)',
  '/api/admin(.*)',
  '/api/admin-users(.*)',
  '/api/analytics(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Protected page routes: redirect to sign-in
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Protected API routes: return 401
  if (isProtectedApiRoute(req) && !userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
