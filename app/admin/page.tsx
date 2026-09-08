import { site } from '@/lib/site';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { authConfigured, SESSION_COOKIE, verifySession } from '@/lib/auth';
import {
  getAnalyticsStore,
  parseDateRange,
  type AnalyticsReport,
  type BreakdownRow,
} from '@/lib/analytics-server';
import type { EventName } from '@/lib/types';

const labels: Record<EventName, string> = {
  page_view: '페이지 조회',
  helper_start: '도우미 시작',
  helper_complete: '추천 결과 확인',
  quote_save: '요청서 저장',
  pdf_generated: 'PDF 생성 성공',
  affiliate_outbound: '제휴 문의 이동',
};
function Breakdown({ title, rows }: { title: string; rows: BreakdownRow[] }) {
  return (
    <section className="admin-panel">
      <h2>{title}</h2>
      <div className="admin-table-scroll">
        <table>
          <thead>
            <tr>
              <th>항목</th>
              <th>조회</th>
              <th>시작</th>
              <th>결과</th>
              <th>문의 이동</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>{row.views}</td>
                  <td>{row.starts}</td>
                  <td>{row.completed}</td>
                  <td>{row.outbound}</td>
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
function percent(numerator: number, denominator: number) {
  return denominator ? `${((100 * numerator) / denominator).toFixed(1)}%` : '—';
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  if (!authConfigured() || !verifySession((await cookies()).get(SESSION_COOKIE)?.value))
    redirect('/admin/login');
  const params = await searchParams;
  const requested = parseDateRange(
    new URLSearchParams({
      ...(typeof params.from === 'string' ? { from: params.from } : {}),
      ...(typeof params.to === 'string' ? { to: params.to } : {}),
    }),
  );
  const range = requested || parseDateRange(new URLSearchParams())!;
  let report: AnalyticsReport | undefined;
  try {
    report = getAnalyticsStore().report(range);
  } catch {
    /* A database failure must leave the rest of the site operational. */
  }
  const exportUrl = `/api/admin/export?from=${range.from}&to=${range.to}`;
  return (
    <main className="admin-dashboard">
      <div className="admin-top">
        <div>
          <div className="admin-eyebrow">{site.name} · ANALYTICS</div>
          <h1>고객 여정 한눈에 보기</h1>
          <p>내부 행동과 제휴 문의 이동 기록 · 날짜 기준 UTC</p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="admin-button admin-secondary">
            로그아웃
          </button>
        </form>
      </div>
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
          <button className="admin-button" type="submit">
            조회
          </button>
        </form>
        <a href={exportUrl} className="admin-button admin-secondary">
          CSV 다운로드 ↓
        </a>
      </div>
      {!requested && (
        <p className="admin-error" role="alert">
          날짜를 90일 이내의 유효한 범위로 선택해 주세요. 최근 30일을 표시합니다.
        </p>
      )}
      <p className="admin-caption">
        최근 180일 기록을 보관하며 한 번에 최대 90일을 조회합니다. 이벤트와 세션 수는 집계 방식이
        다릅니다.
      </p>
      {!report ? (
        <div className="admin-notice" role="alert">
          <h2>통계 저장소에 연결할 수 없습니다</h2>
          <p>
            서버의 DATABASE_PATH와 쓰기 권한을 확인해 주세요. 고객의 견적 문의 이동은 계속
            작동합니다.
          </p>
        </div>
      ) : (
        <>
          <section className="admin-metrics" aria-label="전체 이벤트 통계">
            {(Object.keys(labels) as EventName[]).map((type) => {
              const count = report!.counts.find((row) => row.type === type);
              return (
                <div className="admin-metric" key={type}>
                  <span>{labels[type]}</span>
                  <strong>{(count?.events || 0).toLocaleString('ko-KR')}</strong>
                  <small>{count?.sessions || 0}개 익명 세션</small>
                </div>
              );
            })}
          </section>
          <section className="admin-panel">
            <h2>도우미 전환 흐름</h2>
            <p className="admin-caption">
              같은 익명 세션에서 시작 → 결과 → 문의 이동 순으로 발생한 기록입니다. 선택한 기간 안의
              시작 세션을 기준으로 합니다.
            </p>
            <div className="admin-funnel">
              <div>
                <span>도우미 시작</span>
                <strong>{report.startedSessions}</strong>
              </div>
              <b>→</b>
              <div>
                <span>결과 확인</span>
                <strong>{report.completedStartedSessions}</strong>
                <small>
                  완료율 {percent(report.completedStartedSessions, report.startedSessions)}
                </small>
              </div>
              <b>→</b>
              <div>
                <span>제휴 문의 이동</span>
                <strong>{report.outboundCompletedSessions}</strong>
                <small>
                  결과 이후 이동률{' '}
                  {percent(report.outboundCompletedSessions, report.completedStartedSessions)}
                </small>
              </div>
            </div>
          </section>
          <div className="admin-notice">
            <strong>문의 이동은 신청 완료가 아닙니다.</strong>
            <p>
              외부 제휴 양식의 신청·상담 완료는 수집하지 않습니다. PDF는 생성 성공을 측정하며 기기에
              실제 저장했는지는 확인하지 않습니다. 알려진 봇과 사전 로딩 요청은 제외하지만 자동
              트래픽을 모두 판별할 수는 없습니다.
            </p>
          </div>
          <Breakdown title="페이지별 이벤트" rows={report.byPath} />
          <div className="admin-columns">
            <Breakdown title="카테고리별 이벤트" rows={report.byCategory} />
            <Breakdown title="버튼 위치별 이벤트" rows={report.byCta} />
          </div>
          <Breakdown title="유입 구분별 이벤트" rows={report.bySource} />
          <p className="admin-caption">
            유입 구분은 브라우저가 제공한 방문 출처입니다. 문의 이동은 같은 세션의 첫 출처 기록을
            참고합니다. 실제 검색어·검색 순위·노출은 Google Search Console과 네이버
            서치어드바이저에서 확인하세요. CSV에는 날짜별 집계만 포함되며 세션 ID와 고객의 치수·문서
            내용은 포함하지 않습니다.
          </p>
        </>
      )}
    </main>
  );
}
