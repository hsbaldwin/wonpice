import type { ReactNode } from 'react';
import type { AdminData, ReportResult } from '@/lib/admin-data';
import { adminHref, type AdminSelection } from '@/lib/admin-period';
import {
  countChange,
  kstTime,
  numberLabel,
  percent,
  rateChange,
  ratioLabel,
  SOURCE_LABELS,
} from '@/lib/admin-format';
import { EVENT_LABELS } from '@/lib/analytics-events';
import { kstDay } from '@/lib/analytics-server';
import type { PerformanceRow } from '@/lib/analytics-store';
import { ReportList, TrendChart } from './admin-widgets';
import { PageExplorer, ButtonExplorer } from './admin-explorer';

export function ReportError({ title, href }: { title: string; href: string }) {
  return (
    <div className="admin-inline-error" role="alert">
      <h3>{title} 조회에 실패했습니다</h3>
      <p>기록을 0건으로 표시하지 않습니다. 잠시 후 다시 조회해 주세요.</p>
      <a className="admin-button admin-secondary" href={href}>
        다시 시도
      </a>
    </div>
  );
}
function Panel<T>({
  title,
  id,
  result,
  href,
  note,
  children,
}: {
  title: string;
  id?: string;
  result?: ReportResult<T>;
  href: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="admin-panel" id={id}>
      <h2>{title}</h2>
      {result?.error ? <ReportError title={title} href={href} /> : children}
      {note && (
        <details className="admin-definition">
          <summary>집계 기준</summary>
          <p>{note}</p>
        </details>
      )}
    </section>
  );
}
function PerformanceList({
  title,
  rows,
  names,
}: {
  title: string;
  rows: PerformanceRow[];
  names: Record<string, string>;
}) {
  return (
    <ReportList
      title={title}
      columns={['방문수', '문의 클릭', '문의 클릭률']}
      rows={rows.map((row) => ({
        key: row.label,
        label: names[row.label] || row.label,
        cells: [
          numberLabel(row.visits),
          numberLabel(row.clicks),
          ratioLabel(row.clickedSessions, row.visits),
        ],
        detail: (
          <p>
            페이지 조회 {numberLabel(row.views)}회 · 문의한 방문 {numberLabel(row.clickedSessions)}
            회
          </p>
        ),
      }))}
    />
  );
}
export function MeasurementNote({
  data,
  selection,
}: {
  data: AdminData;
  selection: AdminSelection;
}) {
  if (data.coverage?.error) return <ReportError title="측정 기간" href={adminHref(selection)} />;
  const first = data.coverage?.data?.firstDetail;
  if (!first)
    return (
      <p className="admin-notice">
        상세 행동 기록이 아직 없습니다. 방문이 기록되면 읽기·단계·버튼 정보를 확인할 수 있습니다.
      </p>
    );
  if (first >= selection.range.end)
    return (
      <p className="admin-notice">
        선택한 기간은 상세 측정 전 기간입니다. 보관된 첫 상세 기록은 {kstTime(first)}입니다.
      </p>
    );
  return (
    <p className="admin-caption">
      보관된 첫 상세 기록: {kstTime(first)} · 이전 방문의 상세 정보는 소급하지 않습니다.
    </p>
  );
}
export function SummaryPanels({
  data,
  selection,
  names,
}: {
  data: AdminData;
  selection: AdminSelection;
  names: Record<string, string>;
}) {
  const m = data.metrics?.data,
    p = data.previous?.data;
  const reason = data.comparison?.reason;
  const canCompare = data.comparison?.available && !!p;
  const insights: { title: string; text: string; href: string }[] = [];
  const errors = data.actions?.data?.find((row) => row.type === 'quote_storage_error');
  if (errors?.sessions)
    insights.push({
      title: '브라우저 저장 오류가 기록됐습니다',
      text: `${numberLabel(errors.sessions)}개 방문에서 ${numberLabel(errors.events)}회 기록됐습니다.`,
      href: adminHref(selection, 'journey', 'storage'),
    });
  const funnel = data.funnel?.data;
  if (funnel?.[0]) {
    const losses = funnel
      .slice(0, -1)
      .map((n, i) => ({ n: n - funnel[i + 1], i }))
      .sort((a, b) => b.n - a.n);
    if (losses[0].n > 0)
      insights.push({
        title: `${['치수 → 기능', '기능 → 결과', '결과 → 신청 이동'][losses[0].i]} 구간을 확인하세요`,
        text: `${numberLabel(losses[0].n)}개 방문에서 다음 단계가 기록되지 않았습니다. 작성 중인 방문도 포함됩니다.`,
        href: adminHref(selection, 'journey', 'funnel'),
      });
  }
  const landing = data.landing?.data?.[0];
  if (landing)
    insights.push({
      title: `유입이 가장 많은 페이지: ${names[landing.label] || landing.label}`,
      text: `방문 ${numberLabel(landing.visits)}회 중 문의를 클릭한 방문은 ${numberLabel(landing.clickedSessions)}회입니다.`,
      href: adminHref(selection, 'content', 'landing'),
    });
  return (
    <>
      {data.metrics?.error && <ReportError title="핵심 통계" href={adminHref(selection)} />}
      {m && (
        <>
          <section className="admin-metrics" aria-label="방문·문의 핵심 통계">
            {[
              {
                title: '방문수',
                value: `${numberLabel(m.visits)}회`,
                note: '페이지를 조회한 익명 방문',
                delta: p && countChange(m.visits, p.visits),
              },
              {
                title: '문의 클릭수',
                value: `${numberLabel(m.clicks)}회`,
                note: '외부 견적 신청 페이지로 이동',
                delta: p && countChange(m.clicks, p.clicks),
              },
              {
                title: '문의 클릭률',
                value: percent(m.clickedSessions, m.visits),
                note: `문의한 방문 ${numberLabel(m.clickedSessions)} / 전체 방문 ${numberLabel(m.visits)}`,
                delta: p && rateChange(m.clickedSessions, m.visits, p.clickedSessions, p.visits),
              },
              {
                title: '도우미 완료율',
                value: percent(m.completed, m.starts),
                note: `완료 ${numberLabel(m.completed)} / 시작 ${numberLabel(m.starts)}`,
                delta: p && rateChange(m.completed, m.starts, p.completed, p.starts),
              },
            ].map((item) => (
              <article className="admin-metric" key={item.title}>
                <h2>{item.title}</h2>
                <strong>{item.value}</strong>
                <span className="admin-delta">
                  {canCompare
                    ? item.delta
                    : data.previous?.error || data.coverage?.error
                      ? '비교 조회 실패'
                      : '비교 기록 부족'}
                </span>
                <small>{item.note}</small>
              </article>
            ))}
          </section>
          <p className="admin-caption">
            페이지 조회 {numberLabel(m.views)}회 · 문의 클릭은 신청 완료가 아닙니다.
          </p>
          <details className="admin-definition admin-comparison">
            <summary>
              {selection.range.from === selection.range.to &&
              selection.range.to === kstDay(new Date(selection.now))
                ? '어제 같은 시각까지와 비교'
                : '이전 기간 비교'}{' '}
              · {selection.previous.from} ~ {selection.previous.to}
            </summary>
            <p>
              {kstTime(selection.previous.start)}부터 {kstTime(selection.previous.end)} 직전까지와
              비교합니다. 오늘이 포함된 기간은 같은 경과 시각에서 비교를 마칩니다.
            </p>
            {reason && <p>{reason}</p>}
            <p>
              방문수는 사람 수가 아닌 브라우저 탭의 익명 세션 기준입니다. 비율의 변화는 %p로
              표시합니다. 하루의 방문수를 더한 값과 기간 전체 방문수는 다를 수 있습니다.
            </p>
          </details>
          {(data.previous?.error || data.coverage?.error) && (
            <ReportError title="이전 기간 비교" href={adminHref(selection)} />
          )}
          {!m.visits && !m.clicks && !m.starts && (
            <p className="admin-notice">
              선택한 기간의 방문·문의 기록이 없습니다. 다른 기간도 확인해 보세요.
            </p>
          )}
        </>
      )}
      <section className="admin-panel">
        <h2>확인할 점</h2>
        <div className="admin-insights">
          {insights.slice(0, 3).map((item) => (
            <a key={item.title} href={item.href}>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
              <span className="admin-insight-action">상세 보기 →</span>
            </a>
          ))}
        </div>
        {data.actions?.error && <ReportError title="입력·저장 상태" href={adminHref(selection)} />}
        {data.funnel?.error && <ReportError title="도우미 단계" href={adminHref(selection)} />}
        {data.landing?.error && <ReportError title="첫 방문 페이지" href={adminHref(selection)} />}
        {!insights.length &&
          !data.actions?.error &&
          !data.funnel?.error &&
          !data.landing?.error && (
            <p className="admin-empty">
              아직 요약할 행동 기록이 없습니다. 기록이 쌓이면 확인할 항목을 표시합니다.
            </p>
          )}
      </section>
      {data.daily?.data && (
        <TrendChart
          rows={data.daily.data}
          includesToday={selection.trend.to === kstDay(new Date(selection.now))}
          rangeLabel={`${selection.trend.from} ~ ${selection.trend.to}${selection.trend.from !== selection.range.from ? ' · 최근 7일 추이' : ''}`}
        />
      )}
      {data.daily?.error && <ReportError title="일별 추이" href={adminHref(selection)} />}
    </>
  );
}
export function ContentPanels({
  data,
  selection,
  names,
  categories,
}: {
  data: AdminData;
  selection: AdminSelection;
  names: Record<string, string>;
  categories: { slug: string; title: string }[];
}) {
  const href = adminHref(selection);
  return (
    <>
      <Panel
        title="유입 경로"
        result={data.sources}
        href={href}
        note="세션의 최초 유입 분류입니다. 검색어와 전체 유입 URL은 수집하지 않습니다. 문의 클릭률은 해당 경로의 방문 중 문의한 방문의 비율입니다."
      >
        {data.sources?.data && (
          <PerformanceList title="유입 경로" rows={data.sources.data} names={SOURCE_LABELS} />
        )}
      </Panel>
      <Panel
        title="첫 방문 페이지별 문의 성과"
        id="landing"
        result={data.landing}
        href={href}
        note="세션이 시작된 페이지 기준입니다. 페이지 조회가 없는 신청 이동은 방문 기반 클릭률에 포함하지 않습니다."
      >
        {data.landing?.data && (
          <PerformanceList title="첫 방문 페이지" rows={data.landing.data} names={names} />
        )}
      </Panel>
      <MeasurementNote data={data} selection={selection} />
      <Panel
        title="페이지별 읽기·문의"
        id="pages"
        result={data.pages}
        href={href}
        note="읽기 비율은 상세 측정 기록이 있는 방문을 분모로 사용합니다. 같은 페이지의 반복 도달은 한 번만 셉니다. 활성 시간은 탭이 보이고 포커스된 시간이며 실제 독서를 보장하지 않습니다. 스크롤은 이동 가능한 거리 기준입니다."
      >
        {data.pages?.data && (
          <PageExplorer rows={data.pages.data} names={names} categories={categories} />
        )}
      </Panel>
    </>
  );
}
export function JourneyPanels({
  data,
  selection,
  names,
}: {
  data: AdminData;
  selection: AdminSelection;
  names: Record<string, string>;
}) {
  const href = adminHref(selection);
  const f = data.funnel?.data;
  const actionTypes = [
    'helper_size_error',
    'helper_needs_error',
    'quote_save',
    'quote_restore',
    'quote_storage_error',
    'consultation_copy',
    'helper_reset',
    'pdf_generated',
  ] as const;
  return (
    <>
      <MeasurementNote data={data} selection={selection} />
      <Panel
        title="도우미 단계별 진행"
        id="funnel"
        result={data.funnel}
        href={href}
        note="같은 기간·세션에서 치수 → 기능 → 결과 → 신청 이동 순서가 확인된 경우만 셉니다. 다음 단계 미진행에는 아직 작성 중인 방문도 포함됩니다. 저장한 결과에서 재개하거나 바로 신청한 방문은 이 흐름에서 제외합니다."
      >
        {f && (
          <ol className="admin-step-list">
            {['치수 입력', '기능 선택', '결과 확인', '결과 확인 후 신청 이동'].map((label, i) => (
              <li key={label}>
                <div>
                  <span>
                    {i + 1}. {label}
                  </span>
                  <strong>{numberLabel(f[i])}회</strong>
                </div>
                <div className="admin-step-bar" aria-hidden="true">
                  <span style={{ width: `${f[0] ? (100 * f[i]) / f[0] : 0}%` }} />
                </div>
                <p>
                  {i > 0 ? `직전 단계 대비 ${ratioLabel(f[i], f[i - 1])}` : '흐름을 시작한 방문'}
                  {i < 3 ? ` · 다음 단계 미진행 ${numberLabel(f[i] - f[i + 1])}회` : ''}
                </p>
              </li>
            ))}
          </ol>
        )}
      </Panel>
      <Panel
        title="입력·저장·복사 상태"
        id="storage"
        result={data.actions}
        href={href}
        note="입력값이나 오류 문구는 수집하지 않습니다. 자동 저장 성공은 사용자 변경 후 도우미를 연 동안 한 번만 기록합니다. 상담 내용 복사는 클립보드 저장 성공이며 신청 완료를 뜻하지 않습니다. 기록 없음은 오류나 실적 미입력과 다릅니다."
      >
        {data.actions?.data && (
          <ReportList
            title="입력·저장·복사 상태"
            columns={['발생 횟수', '방문수']}
            rows={actionTypes.map((type) => {
              const row = data.actions?.data?.find((item) => item.type === type);
              return {
                key: type,
                label: EVENT_LABELS[type],
                cells: [
                  row ? numberLabel(row.events) : '기록 없음',
                  row ? numberLabel(row.sessions) : '기록 없음',
                ],
              };
            })}
          />
        )}
      </Panel>
      <Panel
        title="신청 버튼 위치별 성과"
        id="buttons"
        result={data.ctas}
        href={href}
        note="버튼의 절반 이상이 보이는 탭의 화면에 들어오면 노출로 셉니다. 같은 기간·페이지·위치에서 노출 이후 클릭한 방문 ÷ 노출 방문으로 클릭률을 계산합니다. 노출 없는 클릭도 횟수에는 포함됩니다."
      >
        {data.ctas?.data && <ButtonExplorer rows={data.ctas.data} names={names} />}
      </Panel>
      <Panel
        title="많이 이어서 본 페이지"
        result={data.transitions}
        href={href}
        note="같은 기간·세션의 연속 페이지 조회를 수신 순서로 연결한 상위 20개입니다. 같은 페이지의 반복 조회는 제외하며 기록 누락·재전송 지연으로 실제 경로와 다를 수 있습니다."
      >
        {data.transitions?.data && (
          <ReportList
            title="페이지 이동 경로"
            columns={['이동 횟수', '방문수']}
            rows={data.transitions.data.map((row) => ({
              key: `${row.from}:${row.to}`,
              label: `${names[row.from] || row.from} → ${names[row.to] || row.to}`,
              cells: [numberLabel(row.moves), numberLabel(row.sessions)],
            }))}
          />
        )}
      </Panel>
    </>
  );
}
