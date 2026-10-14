/**
 * PASSWORD RESET LINKS, WITHOUT A TABLE (14 Oct 2026).
 *
 * The link carries a signed token: the user's id and a fingerprint of their CURRENT password hash,
 * valid for one hour. Setting a new password changes the hash, so the same link stops working the
 * moment it has been used, and an older link stops working when the password changes any other
 * way. No reset table, no clean-up job, no database change to ship this.
 *
 * Signed with JWT_SECRET plus a purpose label, so a reset token can never pass as a sign-in token.
 */
import { SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify';
import { createHash } from 'crypto';

const key = () => {
  const s = (process.env.JWT_SECRET || '').trim() || (process.env.NODE_ENV === 'production' ? '' : 'werkfox-local-dev-only');
  if (s.length < 16) throw new Error('JWT_SECRET is not set (at least 16 characters)');
  return new TextEncoder().encode(`password-reset:${s}`);
};

const fingerprint = (passwordHash: string) => createHash('sha256').update(passwordHash).digest('base64url').slice(0, 16);

export async function makeResetToken(user: { id: number; password: string }): Promise<string> {
  return new SignJWT({ sub: String(user.id), fp: fingerprint(user.password) })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key());
}

/** The user id the token is for, if it is genuine, unexpired and the password has not changed since. */
export async function readResetToken(token: string, currentHash: (id: number) => Promise<string | null>): Promise<number | null> {
  try {
    const { payload } = await jwtVerify(token, key());
    const id = Number(payload.sub);
    if (!Number.isInteger(id) || id <= 0 || typeof payload.fp !== 'string') return null;
    const hash = await currentHash(id);
    return hash && fingerprint(hash) === payload.fp ? id : null;
  } catch {
    return null;
  }
}

/** One rule for every new password: at least 8 characters, not only spaces. */
export function passwordProblem(pw: unknown): string | null {
  if (typeof pw !== 'string' || pw.trim().length < 8) return 'Use at least 8 characters.';
  if (pw.length > 200) return 'That password is too long.';
  return null;
}
