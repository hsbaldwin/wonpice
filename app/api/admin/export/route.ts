import { getRuntimeStore } from '@/lib/analytics-store';
import { authorized, privateHeaders } from '@/lib/auth';
import { parseDateRange, toCsv } from '@/lib/analytics-server';
import { readableCsv } from '@/lib/admin-csv';
import { categories, getPosts } from '@/lib/content';
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
    const rows = await (await getRuntimeStore()).exportRows(range);
    const readable = new URL(request.url).searchParams.get('format') === 'readable';
    const names = readable
      ? {
          '/': '홈',
          '/guides': '커튼 가이드',
          '/saved': '저장한 견적',
          '/about': '서비스 안내',
          ...Object.fromEntries(categories.map((c) => [`/guides/${c.slug}`, c.navTitle])),
          ...Object.fromEntries((await getPosts()).map((p) => [p.href, p.title])),
        }
      : {};
    return new Response(
      readable
        ? readableCsv(rows, names, Object.fromEntries(categories.map((c) => [c.slug, c.navTitle])))
        : toCsv(rows),
      {
        headers: {
          ...privateHeaders,
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="masters-analytics-${range.from}-${range.to}.csv"`,
        },
      },
    );
  } catch {
    return Response.json(
      { error: '통계 저장소에 연결할 수 없습니다.' },
      { status: 503, headers: privateHeaders },
    );
  }
}
