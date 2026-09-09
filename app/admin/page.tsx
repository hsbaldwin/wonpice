import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { authConfigured, SESSION_COOKIE, verifySession } from '@/lib/auth';
import { site } from '@/lib/site';
import { categories, getPosts } from '@/lib/content';
import { adminSelection, adminHref } from '@/lib/admin-period';
import { ADMIN_VIEWS, kstTime, type AdminView } from '@/lib/admin-format';
import { loadAdminData } from '@/lib/admin-data';
import { resultSummary } from '@/lib/analytics-store';
import { kstDay } from '@/lib/analytics-server';
import { siteTrackingConfig } from '@/lib/tracking';
import {
  SummaryPanels,
  ContentPanels,
  JourneyPanels,
  ReportError,
} from '@/components/admin-panels';
import { RefreshReport } from '@/components/admin-widgets';
import { AdminResults } from '@/components/admin-results';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!authConfigured() || !verifySession((await cookies()).get(SESSION_COOKIE)?.value))
    redirect('/admin/login');
  const selection = adminSelection(await searchParams);
  const { range, view } = selection;
  const config = siteTrackingConfig();
  const [data, posts] = await Promise.all([loadAdminData(selection, !!config), getPosts()]);
  const names: Record<string, string> = {
    '/': '홈',
    '/guides': '커튼 가이드',
    '/about': '서비스 안내',
    '/saved': '저장한 견적',
    ...Object.fromEntries(categories.map((c) => [`/guides/${c.slug}`, c.navTitle])),
    ...Object.fromEntries(posts.map((p) => [p.href, p.title])),
  };
  const today = kstDay(new Date(selection.now));
  const href = adminHref(selection);
  return (
    <main id="main" className="admin-dashboard">
      <header className="admin-top">
        <div>
          <div className="admin-eyebrow">{site.name}</div>
          <h1>사이트 운영 통계</h1>
        </div>
        <div className="admin-account-actions">
          <a href="/" target="_blank" rel="noopener">
            사이트 보기 ↗
          </a>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="admin-text-button">
              로그아웃
            </button>
          </form>
        </div>
      </header>
      <nav className="admin-views" aria-label="통계 화면">
        {Object.entries(ADMIN_VIEWS).map(([key, label]) => (
          <a
            href={adminHref(selection, key as AdminView)}
            key={key}
            aria-current={view === key ? 'page' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="admin-toolbar">
        <nav className="admin-periods" aria-label="통계 기간">
          {[
            ['today', '오늘'],
            ['7', '7일'],
            ['28', '28일'],
            ['90', '90일'],
          ].map(([value, label]) => (
            <a
              className="admin-button admin-secondary"
              href={`/admin?view=${view}&period=${value}`}
              key={value}
              aria-current={!selection.custom && selection.period === value ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="admin-tools">
          <details className="admin-date-picker" open={selection.custom || selection.invalid}>
            <summary>기간 직접 설정</summary>
            <form action="/admin" method="get" className="admin-filter">
              <input type="hidden" name="view" value={view} />
              <label>
                시작일
                <input type="date" name="from" defaultValue={range.from} max={today} required />
              </label>
              <label>
                종료일
                <input type="date" name="to" defaultValue={range.to} max={today} required />
              </label>
              <button className="admin-button">적용</button>
            </form>
          </details>
          <RefreshReport />
        </div>
      </div>
      {selection.invalid && (
        <p className="admin-inline-error" role="alert">
          오늘까지의 90일 이내 날짜 범위를 선택해 주세요. 현재 오늘의 기록을 표시합니다.
        </p>
      )}
      <p className="admin-range-label">
        {range.from} ~ {range.to}
        {range.to === today ? ' · 집계 중' : ''}
        <span>마지막 조회 {kstTime(selection.now)} · 한국 시간</span>
      </p>
      <div key={`${view}:${range.from}:${range.to}`}>
        {view === 'summary' && <SummaryPanels data={data} selection={selection} names={names} />}
        {view === 'content' && (
          <ContentPanels
            data={data}
            selection={selection}
            names={names}
            categories={categories.map((c) => ({ slug: c.slug, title: c.navTitle }))}
          />
        )}
        {view === 'journey' && <JourneyPanels data={data} selection={selection} names={names} />}
        {view === 'results' && (
          <>
            <p className="admin-notice">
              <strong>전체 채널 신청 실적</strong>
              <br />
              다른 채널의 신청도 포함된 수동 입력 실적입니다. 이 수치를 사이트 방문수로 나누어 신청
              전환율을 계산하지 않습니다.
            </p>
            {data.results?.error ? (
              <ReportError title="신청·승인 실적" href={href} />
            ) : (
              <>
                <section className="admin-result-summaries">
                  {(config ? (['shared', 'site'] as const) : (['shared'] as const)).map((scope) => {
                    const summary = resultSummary(
                      data.results?.data || [],
                      scope,
                      range,
                      data.metrics?.data?.visits,
                      today,
                    );
                    return (
                      <article className="admin-panel" key={scope}>
                        <h2>
                          {scope === 'shared' ? '전체 채널 신청 실적' : '사이트 전용 신청 실적'}
                        </h2>
                        <p className="admin-result-total">
                          {summary.enteredDays
                            ? `신청 ${summary.applications}건 · 승인 ${summary.approvals}건`
                            : '실적 미입력'}
                        </p>
                        <p>
                          {summary.enteredDays}/{summary.days}일 입력
                          {!summary.complete && summary.enteredDays > 0
                            ? ' · 입력된 날짜의 부분 합계'
                            : ''}
                        </p>
                        <p className="admin-caption">
                          마지막 입력:{' '}
                          {summary.lastUpdated ? kstTime(summary.lastUpdated) : '입력 이력 없음'}
                        </p>
                        {scope === 'site' && (
                          <p>
                            기간 기준 신청 전환율: {summary.conversionRate ?? '집계 조건 미충족'}
                          </p>
                        )}
                      </article>
                    );
                  })}
                </section>
                {data.metrics?.error && (
                  <ReportError title="사이트 전용 실적의 방문 기준" href={href} />
                )}
                <section className="admin-panel">
                  <h2>날짜별 실적 입력</h2>
                  <AdminResults
                    rows={data.results?.data || []}
                    today={today}
                    siteFrom={config?.from}
                    from={range.from}
                    to={range.to}
                  />
                </section>
              </>
            )}
          </>
        )}
      </div>
      <footer className="admin-report-footer">
        <a
          className="admin-button admin-secondary"
          href={`/api/admin/export?from=${range.from}&to=${range.to}&format=readable`}
        >
          선택 기간 전체 CSV ↓
        </a>
        <details className="admin-definition">
          <summary>통계 이용 안내</summary>
          <p>
            방문 기록은 최근 180일 보관합니다. 이름·연락처·주소·입력 치수는 수집하지 않습니다.
            클릭은 외부 신청 완료가 아닙니다. 실제 검색어와 검색 노출은 Google Search Console·네이버
            자료로 확인합니다. CSV는 검색·정렬 조건과 무관한 선택 기간 전체의 날짜별 집계이며 세션
            식별자는 포함하지 않습니다.
          </p>
        </details>
      </footer>
    </main>
  );
}
