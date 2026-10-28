import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Security headers
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
      {
        // CORS for API routes
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_SITE_URL || '*' // Update in production
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400'
          },
        ],
      },
    ];
  },
  // The old CRM/ERP on werkfox.com is retired: the app lives at app.werkfox.com
  // (same database, same logins). Query strings (redirect, reset token) carry over.
  // Temporary (307) for now so a rollback is not stuck in browser caches.
  async redirects() {
    const app = 'https://app.werkfox.com';
    return [
      { source: '/login', destination: `${app}/login`, permanent: false },
      { source: '/sign-in/:path*', destination: `${app}/login`, permanent: false },
      { source: '/sign-up/:path*', destination: `${app}/signup`, permanent: false },
      { source: '/signup', destination: `${app}/signup`, permanent: false },
      { source: '/forgot-password', destination: `${app}/forgot-password`, permanent: false },
      { source: '/reset-password', destination: `${app}/reset-password`, permanent: false },
      { source: '/admin/:path*', destination: `${app}/home`, permanent: false },
      { source: '/dashboard/:path*', destination: `${app}/home`, permanent: false },
      { source: '/super-admin/:path*', destination: `${app}/platform`, permanent: false },
    ];
  },
};

export default nextConfig;
