import { authorized, privateHeaders } from '@/lib/auth';
import {
  parseDateRange,
  sameOrigin,
  readLimitedBody,
  consumeLimit,
  requestBucket,
} from '@/lib/analytics-server';
import { getRuntimeStore, parseResult } from '@/lib/analytics-store';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
function error(message: string, status: number) {
  return Response.json({ error: message }, { status, headers: privateHeaders });
}
export async function GET(request: Request) {
  if (!authorized(request)) return error('Unauthorized', 401);
  const range = parseDateRange(new URL(request.url).searchParams);
  if (!range) return error('90일 이내의 유효한 날짜 범위를 선택해 주세요.', 400);
  try {
    return Response.json(
      { results: await (await getRuntimeStore()).results(range) },
      { headers: privateHeaders },
    );
  } catch {
    return error('실적 조회에 실패했습니다. 다시 시도해 주세요.', 503);
  }
}
export async function POST(request: Request) {
  if (!authorized(request)) return error('Unauthorized', 401);
  if (!sameOrigin(request)) return error('Forbidden', 403);
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return error('JSON required', 415);
  if (!consumeLimit(`results:${requestBucket(request)}`, 60))
    return error('잠시 후 다시 저장해 주세요.', 429);
  let result;
  try {
    result = parseResult(JSON.parse(await readLimitedBody(request)));
  } catch (cause) {
    return error('입력 내용을 확인해 주세요.', cause instanceof RangeError ? 413 : 400);
  }
  if (!result)
    return error(
      '날짜·집계 범위·건수를 확인해 주세요. 사이트 실적은 전용 추적 설정 이후에만 입력할 수 있습니다.',
      400,
    );
  try {
    return Response.json(
      { result: await (await getRuntimeStore()).saveResult(result) },
      { headers: privateHeaders },
    );
  } catch {
    return error('실적 저장에 실패했습니다. 입력 내용을 유지하고 다시 시도해 주세요.', 503);
  }
}
