import { NextResponse } from 'next/server';
import { privateHeaders, SESSION_COOKIE } from '@/lib/auth';
import { sameOrigin } from '@/lib/analytics-server';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return new Response('Forbidden', { status: 403, headers: privateHeaders });
  // sameOrigin validated this browser origin; request.url may name an internal proxy host.
  const response = NextResponse.redirect(new URL('/admin/login', request.headers.get('origin')!), {
    status: 303,
    headers: privateHeaders,
  });
  response.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}
