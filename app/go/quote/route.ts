import { getRuntimeStore } from '@/lib/analytics-store';
import { analyticsEnabled } from '@/lib/analytics-config';
import { NextResponse } from 'next/server';
import {
  consumeLimit,
  isAutomatedRequest,
  outboundEvent,
  requestBucket,
} from '@/lib/analytics-server';
import { trackingUrl } from '@/lib/tracking';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (
    analyticsEnabled() &&
    !isAutomatedRequest(request.headers) &&
    consumeLimit(`outbound:${requestBucket(request)}`, 300)
  ) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        (async () =>
          (await getRuntimeStore()).record(outboundEvent(new URL(request.url).searchParams)))(),
        new Promise<never>((_, reject) => {
          timer = setTimeout(() => reject(new Error('Analytics timeout')), 1800);
        }),
      ]);
    } catch {
      console.error('Outbound analytics write failed; redirect continues');
    } finally {
      if (timer) clearTimeout(timer);
    }
  }
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: trackingUrl(),
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  });
}
export async function HEAD() {
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: trackingUrl(),
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
