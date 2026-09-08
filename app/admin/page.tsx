import { site } from '@/lib/site';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { authConfigured, SESSION_COOKIE, verifySession } from '@/lib/auth';
import { kstDay, parseDateRange } from '@/lib/analytics-server';
import {
  getRuntimeStore,
  percent,
  resultSummary,
  type DashboardReport,
  type DailyResult,
  type PerformanceRow,
} from '@/lib/analytics-store';
import { siteTrackingConfig } from '@/lib/tracking';
import { AdminResults } from '@/components/admin-results';
import { categories, getPosts } from '@/lib/content';

const sourceNames: Record<string, string> = {
  direct: '직접 방문·출처 없음',
  google: 'Google',
  naver: '네이버',
  external: '외부 사이트',
  internal: '사이트 내부',
  미확인: '미확인',
};
function Performance({
  title,
  rows,
  names = {},
  daily = false,
}: {
  title: string;
  rows: PerformanceRow[];
  names?: Record<string, string>;
  daily?: boolean;
}) {
  const max = Math.max(1, ...rows.map((row) => row.visits));
  return (
    <section className="admin-panel">
      <h2>{title}</h2>
      <p className="admin-caption">
        {daily
          ? '막대는 방문수입니다. 표 안에서 스크롤해 날짜와 항목을 확인하세요.'
          : '표는 좌우로 스크롤할 수 있습니다.'}
      </p>
      <div
        className={`admin-table-scroll ${daily ? 'admin-daily-scroll' : ''}`}
        tabIndex={0}
        role="region"
        aria-label={title}
      >
        <table>
          <thead>
            <tr>
              <th>{daily ? '날짜' : '항목'}</th>
              <th>방문수</th>
              <th>페이지 조회</th>
              <th>문의 클릭수</th>
              <th>문의 클릭률</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">
                    {names[row.label] || row.label}
                    {daily && (
                      <span className="admin-trend" aria-hidden="true">
                        <span style={{ width: `${(100 * row.visits) / max}%` }} />
                      </span>
                    )}
                  </th>
                  <td>{row.visits}</td>
                  <td>{row.views}</td>
                  <td>{row.clicks}</td>
                  <td>{percent(row.clickedSessions, row.visits)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>선택한 기간의 기록이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string; period?: string }>;
}) {
  if (!authConfigured() || !verifySession((await cookies()).get(SESSION_COOKIE)?.value))
    redirect('/admin/login');
  const params = await searchParams;
  const requested = parseDateRange(
    new URLSearchParams(
      Object.fromEntries(
        Object.entries(params).filter(
          ([key, value]) => ['from', 'to', 'period'].includes(key) && typeof value === 'string',
        ),
      ) as Record<string, string>,
    ),
  );
  const range = requested || parseDateRange(new URLSearchParams())!;
  let report: DashboardReport | undefined;
  let results: DailyResult[] | undefined;
  const outcomes = await Promise.allSettled([
    (async () => (await getRuntimeStore()).report(range))(),
    (async () => (await getRuntimeStore()).results(range))(),
  ]);
  if (outcomes[0].status === 'fulfilled') report = outcomes[0].value;
  if (outcomes[1].status === 'fulfilled') results = outcomes[1].value;
  const config = siteTrackingConfig();
  const today = kstDay();
  const summaries = (config ? (['shared', 'site'] as const) : (['shared'] as const)).map(
    (scope) => ({ scope, ...resultSummary(results || [], scope, range, report?.visits, today) }),
  );
  const names: Record<string, string> = {
    '/': '홈',
    '/guides': '커튼 가이드',
    '/about': '서비스 안내',
    ...Object.fromEntries(categories.map((c) => [`/guides/${c.slug}`, c.navTitle])),
    ...Object.fromEntries((await getPosts()).map((p) => [p.href, p.title])),
  };
  return (
    <main id="main" className="admin-dashboard">
      <div className="admin-top">
        <div>
          <div className="admin-eyebrow">{site.name}</div>
          <h1>고객 여정 한눈에 보기</h1>
          <p>방문부터 문의 클릭까지 · 한국 시간 (KST, UTC+9)</p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="admin-button admin-secondary">
            로그아웃
          </button>
        </form>
      </div>
      <nav className="admin-periods" aria-label="통계 기간">
        {[
          ['today', '오늘'],
          ['7', '최근 7일'],
          ['28', '최근 28일'],
          ['90', '최근 90일'],
        ].map(([value, label]) => (
          <a
            className="admin-button admin-secondary"
            key={value}
            href={`/admin?period=${value}`}
            aria-current={
              !params.from && !params.to && (params.period || '28') === value ? 'page' : undefined
            }
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="admin-toolbar">
        <form action="/admin" method="get" className="admin-filter">
          <label>
            시작일
            <input type="date" name="from" defaultValue={range.from} required />
          </label>
          <label>
            종료일
            <input type="date" name="to" defaultValue={range.to} required />
          </label>
          <button className="admin-button">조회</button>
        </form>
        <a
          className="admin-button admin-secondary"
          href={`/api/admin/export?from=${range.from}&to=${range.to}`}
        >
          CSV 다운로드 ↓
        </a>
      </div>
      {!requested && (
        <p className="admin-error" role="alert">
          90일 이내의 유효한 날짜 범위를 선택해 주세요. 최근 28일을 표시합니다.
        </p>
      )}
      <p className="admin-caption">
        {range.from} ~ {range.to} · 최근 180일의 방문 기록을 보관합니다. 오늘 실적은 집계 중이며,
        일별 방문수를 더한 값과 기간 전체의 중복 제거 방문수는 다를 수 있습니다.
      </p>
      {!report ? (
        <div className="admin-notice" role="alert">
          <h2>통계 조회에 실패했습니다</h2>
          <p>
            운영 DB 연결과 설정을 확인하고 다시 조회해 주세요. 견적 신청 페이지 이동은 계속
            작동합니다.
          </p>
        </div>
      ) : (
        <>
          {!report.visits && !report.clicks && !report.starts && (
            <p className="admin-notice">
              선택한 기간의 방문·문의 기록이 없습니다. 기록이 없는 상태이며 조회 실패가 아닙니다.
            </p>
          )}
          <section className="admin-metrics" aria-label="방문·문의 핵심 통계">
            {[
              ['방문수', report.visits.toLocaleString('ko-KR'), '페이지를 조회한 익명 세션'],
              ['페이지 조회', report.views.toLocaleString('ko-KR'), '페이지 조회 이벤트 수'],
              ['문의 클릭수', report.clicks.toLocaleString('ko-KR'), '신청 페이지로 이동한 횟수'],
              [
                '문의 클릭률',
                percent(report.clickedSessions, report.visits),
                `${report.visits}개 방문 세션 중 ${report.clickedSessions}개 문의`,
              ],
              [
                '도우미 완료율',
                percent(report.completed, report.starts),
                `${report.starts}개 시작 세션 중 ${report.completed}개 완료`,
              ],
            ].map(([label, value, note]) => (
              <div className="admin-metric" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{note}</small>
              </div>
            ))}
          </section>
          <p className="admin-caption">
            문의 클릭률은 해당 기간에 페이지를 조회한 세션 중 문의를 클릭한 세션의 비율입니다. 여러
            번 클릭해도 분자에는 한 번만 포함합니다. 도우미 완료율은 같은 기간·세션에서 시작 이후
            완료한 비율입니다. 분모가 없으면 —로 표시합니다.
          </p>
          <Performance title="일별 추이" rows={report.daily} daily />
          <Performance title="유입 경로" rows={report.sources} names={sourceNames} />
          <Performance
            title="첫 방문 페이지별 문의 성과"
            rows={report.landingPages}
            names={names}
          />
          <p className="admin-caption">
            첫 방문 페이지와 유입 경로는 세션의 첫 기록을 기준으로 합니다. 페이지를 조회하지 않은
            이동(예: JavaScript 비활성)은 문의 클릭수에는 포함될 수 있지만 방문 기반 클릭률에서는
            제외합니다. 세션은 브라우저 탭의 익명 식별자 기준이며 저장이 차단된 환경에서는 정확도가
            낮아질 수 있습니다. 알려진 봇과 사전 로딩을 제외하되 모든 자동 트래픽을 판별하지는
            못합니다.
          </p>
        </>
      )}
      <section className="admin-panel">
        <h2>신청·승인 실적</h2>
        <div className="admin-notice">
          <strong>문의 클릭은 신청 완료가 아닙니다.</strong>
          <p>
            현재 공유 링크 실적은 다른 채널을 포함한 전체 채널 신청 실적입니다. 이 값으로 이
            사이트의 신청 전환율이나 페이지별 신청 성과를 계산하지 않습니다.
          </p>
          {!config && (
            <p>
              공식 사이트 전용 추적 링크와 적용 시작일을 설정한 이후부터 사이트 실적을 구분할 수
              있습니다.
            </p>
          )}
        </div>
        {results === undefined ? (
          <p role="alert" className="admin-error">
            실적 조회에 실패했습니다. 조회되지 않은 실적을 0건으로 표시하지 않습니다. 새로고침 후
            다시 확인해 주세요.
          </p>
        ) : (
          <>
            <div className="admin-result-summaries">
              {summaries.map((summary) => (
                <div key={summary.scope} className="admin-notice">
                  <h3>
                    {summary.scope === 'shared' ? '전체 채널 신청 실적' : '사이트 전용 신청 실적'}
                  </h3>
                  <p>
                    {summary.enteredDays
                      ? `신청 ${summary.applications}건 · 승인 ${summary.approvals}건${summary.complete ? '' : ' (입력된 날짜의 부분 합계)'}`
                      : '실적 미입력'}
                  </p>
                  <p>
                    {summary.enteredDays} / {summary.days}일 입력 · 미입력 날짜는 0건으로 간주하지
                    않습니다.
                  </p>
                  <p>
                    마지막 입력:{' '}
                    {summary.lastUpdated
                      ? new Date(summary.lastUpdated).toLocaleString('ko-KR', {
                          timeZone: 'Asia/Seoul',
                          hour12: false,
                        })
                      : '입력 이력 없음'}
                  </p>
                  {summary.scope === 'site' && (
                    <p>
                      기간 기준 신청 전환율: {summary.conversionRate ?? '집계 조건 미충족'} · 전용
                      링크 적용일 이후의 종료된 기간 전체를 입력하고 방문수가 조회된 경우에만
                      제공합니다. 방문일과 신청일의 개별 연결을 의미하지 않습니다.
                    </p>
                  )}
                </div>
              ))}
            </div>
            <AdminResults rows={results} today={today} siteFrom={config?.from} />
          </>
        )}
      </section>
      <p className="admin-caption">
        실제 검색어·검색결과 클릭률은 Google Search Console과 네이버 자료에서 확인하세요. 신청자의
        이름·연락처·주소는 이 통계에 수집하지 않습니다. CSV에는 한국 시간 기준 날짜별 집계만
        포함되며 세션 식별자는 포함되지 않습니다.
      </p>
    </main>
  );
}
