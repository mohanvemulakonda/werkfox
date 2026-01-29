import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { organizationId } = body;

    if (!organizationId) {
      return NextResponse.json({ error: 'organizationId is required' }, { status: 400 });
    }

    // Set cookie for 30 days
    const cookieOptions = {
      name: 'werkfox_current_org',
      value: String(organizationId),
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === 'production',
    };

    // Using headers() to set cookie isn't directly available here; use NextResponse
    const res = NextResponse.json({ ok: true, organizationId });
    res.cookies.set(cookieOptions as any);
    return res;
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
