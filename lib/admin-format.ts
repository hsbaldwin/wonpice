export const ADMIN_VIEWS = {
  summary: '요약',
  content: '유입·페이지',
  journey: '도우미·신청 버튼',
  results: '실적 입력',
} as const;
export type AdminView = keyof typeof ADMIN_VIEWS;
export const SOURCE_LABELS: Record<string, string> = {
  direct: '직접 방문·출처 없음',
  google: 'Google',
  naver: '네이버',
  external: '외부 사이트',
  internal: '사이트 내부',
  미확인: '미확인',
};
export const numberLabel = (n: number) => n.toLocaleString('ko-KR');
export const percent = (n: number, d: number) => (d > 0 ? `${((100 * n) / d).toFixed(1)}%` : '—');
export const ratioLabel = (n: number, d: number) =>
  d > 0 ? `${percent(n, d)} (${numberLabel(n)}/${numberLabel(d)})` : '측정 기록 없음';
export const kstTime = (at: string) =>
  new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    dateStyle: 'medium',
    timeStyle: 'short',
    hour12: false,
  }).format(new Date(at));
export function countChange(current: number, previous: number) {
  const diff = current - previous;
  const label = `${diff > 0 ? '+' : ''}${numberLabel(diff)}회`;
  return previous > 0
    ? `${label} (${diff > 0 ? '+' : ''}${((100 * diff) / previous).toFixed(1)}%)`
    : `${label} · 이전 기간 0회`;
}
export function rateChange(n: number, d: number, pn: number, pd: number) {
  if (!d || !pd) return !d ? '현재 기간 분모 없음' : '이전 기간 분모 없음';
  const diff = (100 * n) / d - (100 * pn) / pd;
  return `${diff > 0 ? '+' : ''}${diff.toFixed(1)}%p`;
}
