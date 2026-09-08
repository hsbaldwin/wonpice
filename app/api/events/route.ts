import { analyticsEnabled } from '@/lib/analytics-config';
import {
  consumeLimit,
  getAnalyticsStore,
  isAutomatedRequest,
  parseEvent,
  readLimitedBody,
  requestBucket,
  sameOrigin,
} from '@/lib/analytics-server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' };

export async function POST(request: Request) {
  if (!analyticsEnabled()) return new Response(null, { status: 204, headers });
  if (!sameOrigin(request)) return Response.json({ error: 'Forbidden' }, { status: 403, headers });
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return Response.json({ error: 'JSON required' }, { status: 415, headers });
  if (Number(request.headers.get('content-length') || 0) > 2048)
    return Response.json({ error: 'Payload too large' }, { status: 413, headers });
  if (isAutomatedRequest(request.headers)) return new Response(null, { status: 204, headers });
  if (!consumeLimit(`events-ip:${requestBucket(request)}`, 600))
    return Response.json(
      { error: 'Rate limited' },
      { status: 429, headers: { ...headers, 'Retry-After': '60' } },
    );
  let event;
  try {
    const body = await readLimitedBody(request);
    event = parseEvent(JSON.parse(body));
  } catch (error) {
    return Response.json(
      { error: error instanceof RangeError ? 'Payload too large' : 'Invalid JSON' },
      { status: error instanceof RangeError ? 413 : 400, headers },
    );
  }
  if (!event) return Response.json({ error: 'Invalid event' }, { status: 400, headers });
  if (!consumeLimit(`events-session:${event.sessionId}`, 90))
    return Response.json({ error: 'Rate limited' }, { status: 429, headers });
  try {
    const inserted = getAnalyticsStore().record(event);
    return Response.json({ accepted: true, duplicate: !inserted }, { status: 200, headers });
  } catch {
    console.error('Analytics write failed');
    return Response.json({ error: 'Temporarily unavailable' }, { status: 503, headers });
  }
}
