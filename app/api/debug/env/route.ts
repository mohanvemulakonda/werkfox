import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  // Only show in development or with admin key
  const isProduction = process.env.NODE_ENV === 'production';

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    hasDatabase: !!process.env.DATABASE_URL,
    databaseHost: process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'not set',
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    nextAuthUrl: process.env.NEXTAUTH_URL || 'not set',
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    timestamp: new Date().toISOString(),
    warning: isProduction ? 'This endpoint should be protected in production' : 'Development mode'
  });
}
