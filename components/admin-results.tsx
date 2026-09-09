'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { DailyResult, ResultScope } from '@/lib/analytics-store';
import { kstTime, numberLabel } from '@/lib/admin-format';
import { ReportList } from './admin-widgets';

export function AdminResults({
  rows,
  today,
  siteFrom,
  from = today,
  to = today,
}: {
  rows: DailyResult[];
  today: string;
  siteFrom?: string;
  from?: string;
  to?: string;
}) {
  const router = useRouter();
  const initial = rows.find((row) => row.date === to && row.scope === 'shared');
  const [knownRows, setKnownRows] = useState(rows);
  const [date, setDate] = useState(to);
  const [scope, setScope] = useState<ResultScope>('shared');
  const [applications, setApplications] = useState(initial ? String(initial.applications) : '');
  const [approvals, setApprovals] = useState(initial ? String(initial.approvals) : '');
  const [status, setStatus] = useState('');
  const [failed, setFailed] = useState(false);
  const [pending, setPending] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => setKnownRows(rows), [rows]);
  const existing = knownRows.find((row) => row.date === date && row.scope === scope);
  const minimum = scope === 'site' && siteFrom && siteFrom > from ? siteFrom : from;
  const missing: string[] = [];
  for (let at = Date.parse(minimum); at <= Date.parse(to); at += 86400_000) {
    const day = new Date(at).toISOString().slice(0, 10);
    if (!knownRows.some((row) => row.date === day && row.scope === scope)) missing.push(day);
  }
  function select(nextDate: string, nextScope: ResultScope, focus = false) {
    setDate(nextDate);
    setScope(nextScope);
    setStatus('');
    setFailed(false);
    const found = knownRows.find((row) => row.date === nextDate && row.scope === nextScope);
    setApplications(found ? String(found.applications) : '');
    setApprovals(found ? String(found.approvals) : '');
    if (focus) {
      input.current?.scrollIntoView({ block: 'center', behavior: 'auto' });
      input.current?.focus({ preventScroll: true });
    }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!applications.trim() || !approvals.trim()) {
      setFailed(true);
      setStatus('확인한 건수를 입력해 주세요. 확인된 0건은 0으로 입력합니다.');
      return;
    }
    setPending(true);
    setStatus('');
    setFailed(false);
    let failureMessage =
      '서버 응답을 확인하지 못했습니다. 연결 상태를 확인하고 다시 저장해 주세요.';
    try {
      const response = await fetch('/api/admin/affiliate-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          scope,
          applications: Number(applications),
          approvals: Number(approvals),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        failureMessage =
          response.status === 401
            ? '로그인이 만료됐습니다. 입력 내용을 보관한 뒤 다시 로그인해 주세요.'
            : response.status === 403
              ? '저장 요청을 확인하지 못했습니다. 관리자 주소를 확인해 주세요.'
              : response.status === 400
                ? '날짜·집계 범위·건수를 확인해 주세요.'
                : '실적 저장에 실패했습니다. 잠시 후 다시 저장해 주세요.';
        throw new Error('Save rejected');
      }
      const saved = data.result as DailyResult;
      setKnownRows((current) =>
        [
          ...current.filter((row) => row.date !== saved.date || row.scope !== saved.scope),
          saved,
        ].sort((a, b) => b.date.localeCompare(a.date) || a.scope.localeCompare(b.scope)),
      );
      setStatus(`${date} 실적을 저장했습니다.`);
      router.refresh();
    } catch {
      setFailed(true);
      setStatus(`${failureMessage} 입력 내용은 유지됩니다.`);
    } finally {
      setPending(false);
    }
  }
  return (
    <div>
      <p className="admin-caption">
        확인된 0건은 0으로 입력해 주세요. 빈 날짜는 실적 미입력으로 남습니다.
      </p>
      <label className="admin-missing-days">
        미입력 날짜 {missing.length}일
        <select
          value=""
          disabled={pending || !missing.length}
          onChange={(e) => {
            if (e.target.value) select(e.target.value, scope, true);
          }}
        >
          <option value="">
            {missing.length ? '미입력 날짜로 바로 이동' : '선택 기간 입력 완료'}
          </option>
          {missing.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </label>
      <p className="admin-result-state">
        {date} · {existing ? '입력된 실적 수정' : '실적 미입력'}
      </p>
      <form className="admin-result-form" onSubmit={submit}>
        <label>
          실적 날짜
          <input
            type="date"
            value={date}
            min={minimum}
            max={to < today ? to : today}
            onChange={(e) => select(e.target.value, scope)}
            required
            disabled={pending}
          />
        </label>
        <label>
          집계 범위
          <select
            value={scope}
            onChange={(e) => {
              const next = e.target.value as ResultScope;
              select(next === 'site' && siteFrom && date < siteFrom ? siteFrom : date, next);
            }}
            disabled={pending}
          >
            <option value="shared">전체 채널 신청 실적</option>
            {siteFrom && siteFrom <= to && <option value="site">사이트 전용 신청 실적</option>}
          </select>
        </label>
        <label>
          신청 건수
          <input
            ref={input}
            type="number"
            inputMode="numeric"
            min="0"
            max="1000000"
            step="1"
            value={applications}
            onChange={(e) => setApplications(e.target.value)}
            required
            disabled={pending}
          />
        </label>
        <label>
          승인 건수
          <input
            type="number"
            inputMode="numeric"
            min="0"
            max="1000000"
            step="1"
            value={approvals}
            onChange={(e) => setApprovals(e.target.value)}
            required
            disabled={pending}
          />
        </label>
        <button className="admin-button" disabled={pending} type="submit">
          {pending ? '저장 중…' : existing ? '변경 사항 저장' : '실적 저장'}
        </button>
      </form>
      <p role="status" aria-live="polite" className={failed ? 'admin-error' : ''}>
        {status}
      </p>
      <details className="admin-definition">
        <summary>실적 입력 기준</summary>
        <p>
          신청일 기준 신청 건수와 승인일 기준 승인 건수를 입력합니다. 승인 건수는 당일 신청보다 클
          수 있습니다. 같은 날짜와 범위를 저장하면 기존 값을 갱신합니다. 다른 날짜를 입력하려면
          상단에서 조회 기간을 변경해 주세요.
        </p>
      </details>
      <noscript>
        <p>실적 조회는 JavaScript 없이 가능합니다. 실적 입력·저장에는 JavaScript를 켜 주세요.</p>
      </noscript>
      <ReportList
        title="입력된 신청·승인 실적"
        columns={['신청', '승인', '수정']}
        empty="선택한 기간에 입력된 실적이 없습니다."
        rows={knownRows.map((row) => ({
          key: `${row.date}:${row.scope}`,
          label: (
            <>
              {row.date}
              <br />
              <small>{row.scope === 'shared' ? '전체 채널' : '사이트 전용'}</small>
            </>
          ),
          cells: [
            numberLabel(row.applications),
            numberLabel(row.approvals),
            <button
              type="button"
              className="admin-button admin-secondary"
              onClick={() => select(row.date, row.scope, true)}
              disabled={pending}
            >
              수정
            </button>,
          ],
          detail: <p>마지막 입력: {kstTime(row.updatedAt)}</p>,
        }))}
      />
    </div>
  );
}
