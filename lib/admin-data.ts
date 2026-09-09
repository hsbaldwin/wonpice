import type { CoreMetrics } from './analytics-reporting';
import type { JourneyReport } from './analytics-journey';
import { getRuntimeStore, type DailyResult, type PerformanceRow } from './analytics-store';
import { comparisonReason, type AdminSelection } from './admin-period';
export type ReportResult<T> = { data: T; error?: never } | { error: true; data?: never };
export interface AdminData {
  comparison?: { range: AdminSelection['previous']; available: boolean; reason: string | null };
  metrics?: ReportResult<CoreMetrics>;
  previous?: ReportResult<CoreMetrics>;
  coverage?: ReportResult<{ firstRecord: string | null; firstDetail: string | null }>;
  daily?: ReportResult<PerformanceRow[]>;
  sources?: ReportResult<PerformanceRow[]>;
  landing?: ReportResult<PerformanceRow[]>;
  pages?: ReportResult<JourneyReport['pages']>;
  ctas?: ReportResult<JourneyReport['ctas']>;
  funnel?: ReportResult<JourneyReport['funnel']>;
  actions?: ReportResult<JourneyReport['actions']>;
  transitions?: ReportResult<JourneyReport['transitions']>;
  results?: ReportResult<DailyResult[]>;
}
export async function loadAdminData(
  selection: AdminSelection,
  siteResults: boolean,
  connect = getRuntimeStore,
): Promise<AdminData> {
  const store = connect();
  const data: AdminData = {};
  const pending: Promise<void>[] = [];
  const load = <K extends keyof AdminData>(
    key: K,
    action: (s: Awaited<ReturnType<typeof connect>>) => Promise<unknown>,
  ) => {
    pending.push(
      (async () => {
        try {
          data[key] = { data: await action(await store) } as AdminData[K];
        } catch {
          data[key] = { error: true } as AdminData[K];
        }
      })(),
    );
  };
  const { range, view } = selection;
  if (view === 'summary' || (view === 'results' && siteResults))
    load('metrics', (s) => s.metrics(range));
  if (view !== 'results') load('coverage', (s) => s.coverage());
  if (view === 'summary') {
    load('previous', (s) => s.metrics(selection.previous));
    load('daily', (s) => s.daily(selection.trend));
  }
  if (view === 'summary' || view === 'content')
    load('landing', (s) => s.performance(range, 'landing'));
  if (view === 'content') {
    load('sources', (s) => s.performance(range, 'source'));
    load('pages', (s) => s.journey(range, 'pages'));
  }
  if (view === 'summary' || view === 'journey') {
    load('funnel', (s) => s.journey(range, 'funnel'));
    load('actions', (s) => s.journey(range, 'actions'));
  }
  if (view === 'journey') {
    load('ctas', (s) => s.journey(range, 'ctas'));
    load('transitions', (s) => s.journey(range, 'transitions'));
  }
  if (view === 'results') load('results', (s) => s.results(range));
  await Promise.all(pending);
  if (view === 'summary') {
    const reason =
      data.previous?.error || data.coverage?.error
        ? '비교 정보를 조회하지 못했습니다.'
        : comparisonReason(selection, data.coverage?.data?.firstRecord || null);
    data.comparison = {
      range: selection.previous,
      available: !reason && !!data.previous?.data,
      reason,
    };
  }
  return data;
}
