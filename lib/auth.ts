import { analyticsEnabled } from './analytics-config';
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE = 'masters_admin';
export const SESSION_AGE = 8 * 60 * 60;
const HASH = /^scrypt\$([a-f0-9]{64})\$([a-f0-9]{128})$/;

export function authConfigured(): boolean {
  return (
    analyticsEnabled() &&
    HASH.test(process.env.ADMIN_PASSWORD_HASH || '') &&
    (process.env.ADMIN_SESSION_SECRET?.length || 0) >= 32
  );
}
export function verifyPassword(
  password: unknown,
  hash = process.env.ADMIN_PASSWORD_HASH || '',
): boolean {
  if (typeof password !== 'string' || password.length < 1 || password.length > 1024) return false;
  const match = HASH.exec(hash);
  if (!match) return false;
  const actual = scryptSync(password, Buffer.from(match[1], 'hex'), 64);
  return timingSafeEqual(actual, Buffer.from(match[2], 'hex'));
}
export function createSession(
  secret = process.env.ADMIN_SESSION_SECRET || '',
  now = Date.now(),
): string {
  if (secret.length < 32) throw new Error('Admin session secret is not configured');
  const payload = Buffer.from(
    JSON.stringify({
      exp: Math.floor(now / 1000) + SESSION_AGE,
      nonce: randomBytes(16).toString('hex'),
    }),
  ).toString('base64url');
  return `${payload}.${createHmac('sha256', secret).update(payload).digest('base64url')}`;
}
export function verifySession(
  token: string | undefined,
  secret = process.env.ADMIN_SESSION_SECRET || '',
  now = Date.now(),
): boolean {
  if (!token || token.length > 512 || secret.length < 32) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, signature] = parts;
  const expected = createHmac('sha256', secret).update(payload).digest('base64url');
  if (
    signature.length !== expected.length ||
    !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  )
    return false;
  try {
    const value = JSON.parse(Buffer.from(payload, 'base64url').toString());
    const time = Math.floor(now / 1000);
    return (
      Number.isInteger(value.exp) &&
      value.exp > time &&
      value.exp <= time + SESSION_AGE &&
      /^[a-f0-9]{32}$/.test(value.nonce)
    );
  } catch {
    return false;
  }
}
export function cookieToken(request: Request): string | undefined {
  return request.headers
    .get('cookie')
    ?.split(';')
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);
}
export function authorized(request: Request): boolean {
  return authConfigured() && verifySession(cookieToken(request));
}
export const privateHeaders = {
  'Cache-Control': 'private, no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow',
  Vary: 'Cookie',
};
