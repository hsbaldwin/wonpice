'use client';
import { useMemo, useState } from 'react';
import { ReportList } from './admin-widgets';
import { numberLabel, ratioLabel } from '@/lib/admin-format';
import { CTA_LABELS } from '@/lib/analytics-events';
import type { CtaJourney, PageJourney } from '@/lib/analytics-journey';

export function PageExplorer({
  rows,
  names,
  categories,
}: {
  rows: PageJourney[];
  names: Record<string, string>;
  categories: { slug: string; title: string }[];
}) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState<'visits' | 'clicks'>('visits');
  const filtered = useMemo(
    () =>
      rows
        .filter(
          (row) =>
            (!category || row.path.split('/')[2] === category) &&
            (names[row.path] || row.path)
              .toLocaleLowerCase()
              .includes(search.trim().toLocaleLowerCase()),
        )
        .sort((a, b) => b[sort] - a[sort] || a.path.localeCompare(b.path)),
    [rows, search, category, sort, names],
  );
  return (
    <>
      <div className="admin-explorer-controls">
        <label>
          페이지 제목 검색
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="예: 사이즈, 거실"
          />
        </label>
        <label>
          카테고리
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">전체</option>
            {categories.map((item) => (
              <option value={item.slug} key={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          정렬
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
            <option value="visits">방문수 많은 순</option>
            <option value="clicks">문의 클릭 많은 순</option>
          </select>
        </label>
      </div>
      <p className="admin-caption" role="status">
        {filtered.length}개 페이지
      </p>
      <ReportList
        key={`${search}:${category}:${sort}`}
        title="페이지별 읽기·문의"
        columns={['방문수', '문의 클릭', '활성 30초', '스크롤 50%']}
        empty={
          rows.length
            ? '검색 조건에 맞는 페이지가 없습니다.'
            : '선택한 기간의 페이지 기록이 없습니다.'
        }
        rows={filtered.map((row) => ({
          key: row.path,
          label: (
            <a href={row.path} target="_blank" rel="noopener">
              {names[row.path] || row.path}
            </a>
          ),
          cells: [
            numberLabel(row.visits),
            numberLabel(row.clicks),
            ratioLabel(row.active30, row.measured),
            ratioLabel(row.scroll50, row.measured),
          ],
          detail: (
            <dl className="admin-detail-values">
              <div>
                <dt>페이지 조회</dt>
                <dd>{numberLabel(row.views)}</dd>
              </div>
              <div>
                <dt>상세 측정 방문</dt>
                <dd>{numberLabel(row.measured)}</dd>
              </div>
              <div>
                <dt>활성 60초</dt>
                <dd>{ratioLabel(row.active60, row.measured)}</dd>
              </div>
              {[25, 75, 90].map((n) => (
                <div key={n}>
                  <dt>스크롤 {n}%</dt>
                  <dd>
                    {ratioLabel(
                      row[`scroll${n}` as 'scroll25' | 'scroll75' | 'scroll90'],
                      row.measured,
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ),
        }))}
      />
    </>
  );
}
export function ButtonExplorer({
  rows,
  names,
}: {
  rows: CtaJourney[];
  names: Record<string, string>;
}) {
  const [limit, setLimit] = useState(10);
  const groups = useMemo(() => {
    const grouped = new Map<string, CtaJourney[]>();
    for (const row of rows) grouped.set(row.path, [...(grouped.get(row.path) || []), row]);
    return [...grouped]
      .map(([path, items]) => ({
        path,
        items: items.sort((a, b) => b.clicks - a.clicks || a.cta.localeCompare(b.cta)),
        total: items.reduce((n, row) => n + row.clicks, 0),
      }))
      .sort((a, b) => b.total - a.total || a.path.localeCompare(b.path));
  }, [rows]);
  if (!groups.length)
    return <p className="admin-empty">선택한 기간의 신청 버튼 기록이 없습니다.</p>;
  return (
    <>
      {groups.slice(0, limit).map((group) => (
        <section className="admin-button-group" key={group.path}>
          <h3>
            {names[group.path] || group.path} <small>문의 클릭 {numberLabel(group.total)}회</small>
          </h3>
          <ReportList
            title={`${names[group.path] || group.path} 신청 버튼`}
            columns={['노출 방문', '클릭 횟수', '클릭 방문', '노출 후 클릭률']}
            rows={group.items.map((row) => ({
              key: row.cta,
              label: CTA_LABELS[row.cta] || row.cta,
              cells: [
                numberLabel(row.shown),
                numberLabel(row.clicks),
                numberLabel(row.clicked),
                ratioLabel(row.clickedShown, row.shown),
              ],
            }))}
          />
        </section>
      ))}
      {limit < groups.length && (
        <button className="admin-button admin-secondary" onClick={() => setLimit((n) => n + 10)}>
          10개 페이지 더 보기 ({limit}/{groups.length})
        </button>
      )}
    </>
  );
}
