import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'werkfox-secret-change-in-production'
);

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
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}
