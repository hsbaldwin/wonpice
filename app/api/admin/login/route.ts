import { NextResponse } from 'next/server';
import {
  authConfigured,
  createSession,
  privateHeaders,
  SESSION_AGE,
  SESSION_COOKIE,
  verifyPassword,
} from '@/lib/auth';
import { consumeLimit, readLimitedBody, requestBucket, sameOrigin } from '@/lib/analytics-server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!sameOrigin(request))
    return new Response('Forbidden', { status: 403, headers: privateHeaders });
  if (!authConfigured())
    return new Response('관리자 인증 설정이 필요합니다.', { status: 503, headers: privateHeaders });
  if (!consumeLimit(`login:${requestBucket(request)}`, 10, 15 * 60_000))
    return new Response('잠시 후 다시 시도해 주세요.', {
      status: 429,
      headers: { ...privateHeaders, 'Retry-After': '900' },
    });
  if (Number(request.headers.get('content-length') || 0) > 2048)
    return new Response('Payload too large', { status: 413, headers: privateHeaders });
  let password: string | null = null;
  try {
    const body = await readLimitedBody(request);
    password = new URLSearchParams(body).get('password');
  } catch (error) {
    if (error instanceof RangeError)
      return new Response('Payload too large', { status: 413, headers: privateHeaders });
  }
  if (!verifyPassword(password))
    return NextResponse.redirect(new URL('/admin/login?error=1', request.headers.get('origin')!), {
      status: 303,
      headers: privateHeaders,
    });
  // sameOrigin validated this browser origin; request.url may name an internal proxy host.
  const response = NextResponse.redirect(new URL('/admin', request.headers.get('origin')!), {
    status: 303,
    headers: privateHeaders,
  });
  response.cookies.set(SESSION_COOKIE, createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_AGE,
  });
  return response;
}
