/*
 * Imported from jose's submodules rather than its index. The index re-exports the JWE encrypt
 * path, which pulls in DecompressionStream — a Node API the Edge Runtime does not have — and
 * middleware runs on the edge. We only sign and verify JWS, so we take only those two.
 */
import { SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify';

/*
 * THE SIGNING SECRET, AND NO FALLBACK IN PRODUCTION (14 Oct 2026).
 *
 * This used to fall back to a fixed string when JWT_SECRET was unset, and the live Vercel project
 * had no JWT_SECRET. Anyone who read that string here could sign a token saying they were any
 * user in any organisation. In production a missing secret now fails closed: nobody can sign in,
 * which is loud and safe, instead of everybody being able to, which is quiet and not.
 */
const RAW_SECRET = (process.env.JWT_SECRET || '').trim();
if (!RAW_SECRET && process.env.NODE_ENV === 'production') {
  console.error('[auth] JWT_SECRET is not set: sign-in is disabled until it is.');
}
const JWT_SECRET = new TextEncoder().encode(RAW_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'werkfox-local-dev-only'));
const secretOk = () => JWT_SECRET.length >= 16;

const JWT_EXPIRY = '7d';

export interface JWTPayload {
  userId: number;
  organizationId: number;
  role: string;
  email: string;
  name: string;
  permissions?: Record<string, boolean>;
  [key: string]: unknown;
}

/**
 * Generate JWT token — Edge-compatible (jose)
 */
export async function generateToken(payload: JWTPayload): Promise<string> {
  if (!secretOk()) throw new Error('JWT_SECRET is not set (at least 16 characters)');
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(JWT_SECRET);
}

/**
 * Verify JWT token — Edge-compatible (jose)
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  if (!secretOk()) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}
