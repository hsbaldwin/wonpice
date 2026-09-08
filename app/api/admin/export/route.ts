import { getRuntimeStore } from '@/lib/analytics-store';
import { authorized, privateHeaders } from '@/lib/auth';
import { parseDateRange, toCsv } from '@/lib/analytics-server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  if (!authorized(request))
    return Response.json({ error: 'Unauthorized' }, { status: 401, headers: privateHeaders });
  const range = parseDateRange(new URL(request.url).searchParams);
  if (!range)
    return Response.json(
      { error: '유효한 날짜 범위를 90일 이내로 지정해 주세요.' },
      { status: 400, headers: privateHeaders },
    );
  try {
    return new Response(toCsv(await (await getRuntimeStore()).exportRows(range)), {
      headers: {
        ...privateHeaders,
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="masters-analytics-${range.from}-${range.to}.csv"`,
      },
    });
  } catch {
    return Response.json(
      { error: '통계 저장소에 연결할 수 없습니다.' },
      { status: 503, headers: privateHeaders },
    );
  }
}
