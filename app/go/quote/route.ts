import { analyticsEnabled } from '@/lib/analytics-config';
import { NextResponse } from 'next/server';
import {
  consumeLimit,
  getAnalyticsStore,
  isAutomatedRequest,
  outboundEvent,
  requestBucket,
} from '@/lib/analytics-server';
import { site } from '@/lib/site';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (
    analyticsEnabled() &&
    !isAutomatedRequest(request.headers) &&
    consumeLimit(`outbound:${requestBucket(request)}`, 300)
  ) {
    try {
      getAnalyticsStore().record(outboundEvent(new URL(request.url).searchParams));
    } catch {
      console.error('Outbound analytics write failed; redirect continues');
    }
  }
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: site.affiliateUrl,
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
      Location: site.affiliateUrl,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
