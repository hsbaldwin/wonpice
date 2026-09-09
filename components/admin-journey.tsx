import type { ReactNode } from 'react';
import { CTA_LABELS, EVENT_LABELS } from '@/lib/analytics-events';
import { percent } from '@/lib/analytics-store';
import type { JourneyReport } from '@/lib/analytics-journey';

function Table({
  title,
  note,
  columns,
  rows,
}: {
  title: string;
  note: string;
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <section className="admin-panel">
      <h2>{title}</h2>
      <p className="admin-caption">표는 좌우로 스크롤할 수 있습니다.</p>
      <details className="admin-definition">
        <summary>집계 기준 보기</summary>
        <p className="admin-caption">{note}</p>
      </details>
      <div className="admin-table-scroll" tabIndex={0} role="region" aria-label={title}>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th scope="row" key={j}>
                        {cell}
                      </th>
                    ) : (
                      <td key={j}>{cell}</td>
                    ),
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>선택한 기간의 기록이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export function AdminJourney({
  report,
  names,
}: {
  report: JourneyReport;
  names: Record<string, string>;
}) {
  const name = (path: string) => names[path] || path;
  const stages = ['치수 입력 단계', '기능 선택 단계', '결과 확인 단계', '결과 확인 후 신청 이동'];
  const rate = (value: number, total: number) =>
    total ? `${value} (${percent(value, total)})` : '—';
  const actionTypes = [
    'helper_size_error',
    'helper_needs_error',
    'quote_save',
    'quote_restore',
    'quote_storage_error',
    'helper_reset',
    'pdf_generated',
  ] as const;
  return (
    <>
      <div className="admin-notice">
        <strong>외부 신청 전 행동 분석</strong>
        <p>
          {report.firstMeasuredAt
            ? `현재 보관된 상세 측정의 첫 기록: ${new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', dateStyle: 'medium', timeStyle: 'short' }).format(new Date(report.firstMeasuredAt))} (한국 시간).`
            : '상세 행동 기록이 아직 없습니다. 업데이트 이후의 실제 방문부터 쌓입니다.'}{' '}
          이전 방문의 읽기·단계·버튼 노출 정보는 소급하지 않습니다. 외부 신청서 작성이나 신청 완료는
          포함하지 않습니다.
        </p>
      </div>
      <Table
        title="도우미 단계별 진행"
        columns={['단계', '도달 세션', '직전 단계 대비', '다음 단계 미진행']}
        note="같은 기간·세션에서 치수 → 기능 → 결과 → 신청 이동 순서가 확인된 경우만 집계합니다. 미진행에는 아직 작성 중인 방문도 포함됩니다. 저장한 결과로 바로 돌아온 방문과 도우미 없이 신청한 방문은 이 흐름에서 제외합니다."
        rows={stages.map((stage, i) => [
          stage,
          report.funnel[i],
          i ? percent(report.funnel[i], report.funnel[i - 1]) : '—',
          i < stages.length - 1
            ? rate(report.funnel[i] - report.funnel[i + 1], report.funnel[i])
            : '—',
        ])}
      />
      <Table
        title="페이지별 읽기·문의"
        columns={[
          '페이지',
          '방문 세션',
          '페이지 조회',
          '상세 측정 세션',
          '활성 30초',
          '활성 60초',
          '스크롤 25%',
          '스크롤 50%',
          '스크롤 75%',
          '스크롤 90%',
          '문의 클릭',
        ]}
        note="읽기 지표의 분모는 해당 페이지의 상세 측정 세션입니다. 같은 세션의 반복 도달은 한 번만 셉니다. 활성 시간은 한 번의 페이지 열람 중 탭이 보이고 포커스된 누적 시간이며 실제 독서를 보장하지 않습니다. 스크롤은 이동 가능한 거리 기준이고 스크롤 없는 짧은 페이지는 도달로 세지 않습니다."
        rows={report.pages.map((row) => [
          name(row.path),
          row.visits,
          row.views,
          row.measured || '—',
          ...[
            row.active30,
            row.active60,
            row.scroll25,
            row.scroll50,
            row.scroll75,
            row.scroll90,
          ].map((value) => rate(value, row.measured)),
          row.clicks,
        ])}
      />
      <Table
        title="신청 버튼 위치별 성과"
        columns={['페이지 · 버튼 위치', '노출 세션', '클릭 횟수', '클릭 세션', '노출 후 클릭률']}
        note="보이는 탭에서 버튼의 절반 이상이 화면에 들어오면 노출로 기록합니다. 클릭률은 같은 기간·세션·페이지·버튼 위치에서 노출 이후 클릭이 확인된 세션 ÷ 노출 세션입니다. 노출 기록 없는 클릭도 클릭 횟수에는 포함됩니다. 같은 위치의 버튼은 합산합니다."
        rows={report.ctas.map((row) => [
          <>
            {name(row.path)}
            <br />
            <small>{CTA_LABELS[row.cta] || row.cta}</small>
          </>,
          row.shown || '—',
          row.clicks,
          row.clicked,
          percent(row.clickedShown, row.shown),
        ])}
      />
      <Table
        title="입력·저장 상태"
        columns={['행동', '발생 횟수', '세션 수']}
        note="입력값과 오류 문구는 수집하지 않습니다. 자동 저장 성공은 사용자가 내용을 변경한 뒤 저장에 성공했을 때, 저장 복원·오류와 함께 도우미를 연 동안 각 한 번만 기록합니다."
        rows={actionTypes.map((type) => {
          const row = report.actions.find((item) => item.type === type);
          return [EVENT_LABELS[type], row?.events ?? '—', row?.sessions ?? '—'];
        })}
      />
      <Table
        title="많이 이어서 본 페이지"
        columns={['이전 페이지 → 다음 페이지', '이동 횟수', '세션 수']}
        note="선택 기간 내 같은 세션의 연속 페이지 조회를 수신 순서로 연결한 상위 20개 경로입니다. 같은 페이지의 반복 조회는 이동 횟수에서 제외하며, 기록 누락·재전송 지연으로 실제 경로와 다를 수 있습니다."
        rows={report.transitions.map((row) => [
          `${name(row.from)} → ${name(row.to)}`,
          row.moves,
          row.sessions,
        ])}
      />
    </>
  );
}
