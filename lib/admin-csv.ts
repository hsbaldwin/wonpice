import { csvCell, type ExportRow } from './analytics-server';
import { CTA_LABELS, EVENT_LABELS } from './analytics-events';
import { SOURCE_LABELS } from './admin-format';
export function readableCsv(
  rows: ExportRow[],
  names: Record<string, string>,
  categories: Record<string, string>,
) {
  return (
    '\ufeff' +
    [
      [
        '날짜(한국 시간)',
        '행동',
        '페이지',
        '페이지 경로',
        '카테고리',
        '버튼 위치',
        '유입 경로',
        '발생 횟수',
        '방문수',
      ],
      ...rows.map((row) => [
        row.received_at,
        EVENT_LABELS[row.type as keyof typeof EVENT_LABELS] || row.type,
        names[row.path] || row.path,
        row.path,
        row.category ? categories[row.category] || row.category : '해당 없음',
        row.cta ? CTA_LABELS[row.cta] || row.cta : '해당 없음',
        row.source ? SOURCE_LABELS[row.source] || row.source : '미확인',
        row.events,
        row.sessions,
      ]),
    ]
      .map((row) => row.map(csvCell).join(','))
      .join('\r\n')
  );
}
