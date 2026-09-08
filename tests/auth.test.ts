import assert from 'node:assert/strict';
import { randomBytes, scryptSync } from 'node:crypto';
import test from 'node:test';
import {
  authConfigured,
  authorized,
  createSession,
  SESSION_AGE,
  verifyPassword,
  verifySession,
} from '../lib/auth';

const salt = randomBytes(32);
const hash = `scrypt$${salt.toString('hex')}$${scryptSync('correct horse curtain paper', salt, 64).toString('hex')}`;
const secret = randomBytes(48).toString('hex');

test('password verification checks scrypt output, rejects malformed hashes and huge inputs', () => {
  assert.equal(verifyPassword('correct horse curtain paper', hash), true);
  assert.equal(verifyPassword('wrong', hash), false);
  assert.equal(verifyPassword(null, hash), false);
  assert.equal(verifyPassword('x'.repeat(1025), hash), false);
  assert.equal(verifyPassword('password', 'scrypt$bad$bad'), false);
});

test('admin session signature rejects tampering, expired tokens and changed secrets', () => {
  const now = Date.parse('2026-09-05T00:00:00.000Z');
  const token = createSession(secret, now);
  assert.equal(verifySession(token, secret, now + 1000), true);
  assert.equal(verifySession(token, secret, now + SESSION_AGE * 1000), false);
  assert.equal(verifySession(token + 'a', secret, now), false);
  assert.equal(verifySession('e30.' + token.split('.')[1], secret, now), false);
  assert.equal(verifySession(token, randomBytes(48).toString('hex'), now), false);
  assert.equal(verifySession(undefined, secret, now), false);
  assert.throws(() => createSession('too-short'));
});

test('missing environment locks both HTML and CSV authorization', async () => {
  const originalHash = process.env.ADMIN_PASSWORD_HASH,
    originalSecret = process.env.ADMIN_SESSION_SECRET;
  delete process.env.ADMIN_PASSWORD_HASH;
  delete process.env.ADMIN_SESSION_SECRET;
  try {
    assert.equal(authConfigured(), false);
    assert.equal(authorized(new Request('http://localhost/admin')), false);
    const { GET } = await import('../app/api/admin/export/route');
    const response = await GET(new Request('http://localhost/api/admin/export'));
    assert.equal(response.status, 401);
    assert.match(response.headers.get('cache-control') || '', /no-store/);
  } finally {
    if (originalHash === undefined) delete process.env.ADMIN_PASSWORD_HASH;
    else process.env.ADMIN_PASSWORD_HASH = originalHash;
    if (originalSecret === undefined) delete process.env.ADMIN_SESSION_SECRET;
    else process.env.ADMIN_SESSION_SECRET = originalSecret;
  }
});

test('configured authorization requires the signed cookie', () => {
  const originalHash = process.env.ADMIN_PASSWORD_HASH,
    originalSecret = process.env.ADMIN_SESSION_SECRET;
  process.env.ADMIN_PASSWORD_HASH = hash;
  process.env.ADMIN_SESSION_SECRET = secret;
  try {
    assert.equal(authConfigured(), true);
    assert.equal(
      authorized(
        new Request('http://localhost/admin', {
          headers: { cookie: `masters_admin=${createSession(secret)}` },
        }),
      ),
      true,
    );
    assert.equal(
      authorized(
        new Request('http://localhost/admin', { headers: { cookie: 'masters_admin=invalid' } }),
      ),
      false,
    );
  } finally {
    if (originalHash === undefined) delete process.env.ADMIN_PASSWORD_HASH;
    else process.env.ADMIN_PASSWORD_HASH = originalHash;
    if (originalSecret === undefined) delete process.env.ADMIN_SESSION_SECRET;
    else process.env.ADMIN_SESSION_SECRET = originalSecret;
  }
});

test('login rejects cross-site submissions and issues a private HttpOnly session after valid credentials', async () => {
  const originalHash = process.env.ADMIN_PASSWORD_HASH,
    originalSecret = process.env.ADMIN_SESSION_SECRET,
    originalUrl = process.env.NEXT_PUBLIC_SITE_URL;
  process.env.ADMIN_PASSWORD_HASH = hash;
  process.env.ADMIN_SESSION_SECRET = secret;
  process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';
  try {
    const { POST } = await import('../app/api/admin/login/route');
    const request = (password: string, origin = 'http://localhost:3000') =>
      new Request('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: { origin, 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ password }).toString(),
      });
    assert.equal(
      (await POST(request('correct horse curtain paper', 'https://evil.invalid'))).status,
      403,
    );
    const wrong = await POST(request('wrong'));
    assert.equal(wrong.status, 303);
    assert.equal(wrong.headers.get('set-cookie'), null);
    const success = await POST(request('correct horse curtain paper'));
    assert.equal(success.status, 303);
    assert.equal(success.headers.get('location'), 'http://localhost:3000/admin');
    assert.match(success.headers.get('set-cookie') || '', /HttpOnly/);
    assert.match(success.headers.get('set-cookie') || '', /SameSite=strict/i);
    assert.match(success.headers.get('cache-control') || '', /no-store/);
    const cookie = success.headers.get('set-cookie')!.split(';')[0];
    assert.equal(
      authorized(new Request('http://localhost:3000/admin', { headers: { cookie } })),
      true,
    );
  } finally {
    if (originalHash === undefined) delete process.env.ADMIN_PASSWORD_HASH;
    else process.env.ADMIN_PASSWORD_HASH = originalHash;
    if (originalSecret === undefined) delete process.env.ADMIN_SESSION_SECRET;
    else process.env.ADMIN_SESSION_SECRET = originalSecret;
    if (originalUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = originalUrl;
  }
});
