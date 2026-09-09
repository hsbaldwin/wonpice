'use client';
import { useState, useTransition, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { numberLabel } from '@/lib/admin-format';
import type { PerformanceRow } from '@/lib/analytics-store';

export function RefreshReport() {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      className="admin-button admin-secondary"
      disabled={pending}
      onClick={() => start(() => router.refresh())}
    >
      {pending ? '조회 중…' : '새로고침'}
    </button>
  );
}
export interface ListRow {
  key: string;
  label: ReactNode;
  cells: ReactNode[];
  detail?: ReactNode;
}
export function ReportList({
  title,
  columns,
  rows,
  empty = '선택한 기간의 기록이 없습니다.',
}: {
  title: string;
  columns: string[];
  rows: ListRow[];
  empty?: string;
}) {
  const [limit, setLimit] = useState(10);
  const shown = rows.slice(0, limit);
  if (!rows.length) return <p className="admin-empty">{empty}</p>;
  return (
    <>
      <div
        className="admin-desktop-table admin-table-scroll"
        tabIndex={0}
        role="region"
        aria-label={title}
      >
        <table>
          <thead>
            <tr>
              <th>항목</th>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((row) => (
              <tr key={row.key}>
                <th scope="row">
                  {row.label}
                  {row.detail && (
                    <details className="admin-row-detail">
                      <summary>상세 지표</summary>
                      {row.detail}
                    </details>
                  )}
                </th>
                {row.cells.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-mobile-list">
        {shown.map((row) => (
          <article className="admin-list-card" key={row.key}>
            <h3>{row.label}</h3>
            <dl>
              {row.cells.map((cell, i) => (
                <div key={i}>
                  <dt>{columns[i]}</dt>
                  <dd>{cell}</dd>
                </div>
              ))}
            </dl>
            {row.detail && (
              <details className="admin-row-detail">
                <summary>상세 지표</summary>
                {row.detail}
              </details>
            )}
          </article>
        ))}
      </div>
      {limit < rows.length && (
        <button
          className="admin-button admin-secondary admin-more"
          onClick={() => setLimit((n) => n + 10)}
        >
          10개 더 보기{' '}
          <span>
            ({Math.min(limit, rows.length)}/{rows.length})
          </span>
        </button>
      )}
      <noscript>
        {rows.length > 10 && (
          <p>
            전체 목록의 추가 항목 조회에는 JavaScript를 켜 주세요. 기간 전체 기록은 CSV로 확인할 수
            있습니다.
          </p>
        )}
      </noscript>
    </>
  );
}
export function TrendChart({
  rows,
  rangeLabel,
  includesToday,
}: {
  rows: PerformanceRow[];
  rangeLabel: string;
  includesToday: boolean;
}) {
  const [metric, setMetric] = useState<'visits' | 'clicks'>('visits');
  const label = metric === 'visits' ? '방문수' : '문의 클릭수';
  const maximum = Math.max(1, ...rows.map((row) => row[metric]));
  return (
    <section className="admin-panel" aria-labelledby="trend-title">
      <div className="admin-section-head">
        <div>
          <h2 id="trend-title">일별 추이</h2>
          <p className="admin-caption">
            {rangeLabel}
            {includesToday ? ' · 오늘은 집계 중' : ''}
          </p>
        </div>
        <div className="admin-segment" aria-label="그래프 지표">
          <button aria-pressed={metric === 'visits'} onClick={() => setMetric('visits')}>
            방문수
          </button>
          <button aria-pressed={metric === 'clicks'} onClick={() => setMetric('clicks')}>
            문의 클릭수
          </button>
        </div>
      </div>
      <p className="admin-caption" aria-live="polite">
        {label} · 날짜별 최대{' '}
        {numberLabel(maximum === 1 && !rows.some((row) => row[metric]) ? 0 : maximum)}회
      </p>
      <div className="admin-chart" aria-hidden="true">
        {rows.map((row) => (
          <div key={row.label} title={`${row.label}: ${row[metric]}회`}>
            <span style={{ height: `${(100 * row[metric]) / maximum}%` }} />
          </div>
        ))}
      </div>
      <div className="admin-chart-axis" aria-hidden="true">
        <span>{rows[0]?.label}</span>
        <span>{rows.at(-1)?.label}</span>
      </div>
      {!rows.some((row) => row.views || row.clicks) && (
        <p className="admin-empty">이 기간에는 방문·문의 기록이 없습니다.</p>
      )}
      <details className="admin-definition">
        <summary>날짜별 수치 보기</summary>
        <ReportList
          title="일별 추이 수치"
          columns={['방문수', '문의 클릭수', '페이지 조회']}
          rows={rows.map((row) => ({
            key: row.label,
            label: row.label,
            cells: [numberLabel(row.visits), numberLabel(row.clicks), numberLabel(row.views)],
          }))}
        />
      </details>
    </section>
  );
}
