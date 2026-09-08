'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { DailyResult, ResultScope } from '@/lib/analytics-store';

export function AdminResults({
  rows,
  today,
  siteFrom,
}: {
  rows: DailyResult[];
  today: string;
  siteFrom?: string;
}) {
  const router = useRouter();
  const [date, setDate] = useState(today);
  const [scope, setScope] = useState<ResultScope>('shared');
  const [applications, setApplications] = useState('');
  const [approvals, setApprovals] = useState('');
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);
  function select(nextDate: string, nextScope: ResultScope) {
    setDate(nextDate);
    setScope(nextScope);
    setStatus('');
    const existing = rows.find((row) => row.date === nextDate && row.scope === nextScope);
    setApplications(existing ? String(existing.applications) : '');
    setApprovals(existing ? String(existing.approvals) : '');
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setStatus('');
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
      if (!response.ok) throw new Error(data.error || '저장에 실패했습니다.');
      setStatus(`${date} 실적을 저장했습니다.`);
      router.refresh();
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : '저장에 실패했습니다. 입력 내용을 유지했습니다.',
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <div>
      <p className="admin-caption">
        신청일 기준 신청 건수와 승인일 기준 승인 건수를 입력하세요. 승인 건수는 당일 신청보다 클 수
        있습니다. 확인된 0건도 직접 입력해야 합니다. 같은 날짜·범위를 저장하면 기존 값을 갱신합니다.
      </p>
      <form className="admin-result-form" onSubmit={submit}>
        <label>
          실적 날짜 (한국 시간)
          <input
            type="date"
            value={date}
            max={today}
            min={scope === 'site' ? siteFrom : undefined}
            onChange={(e) => select(e.target.value, scope)}
            required
            disabled={pending}
          />
        </label>
        <label>
          집계 범위
          <select
            value={scope}
            onChange={(e) => select(date, e.target.value as ResultScope)}
            disabled={pending}
          >
            <option value="shared">전체 채널 신청 실적</option>
            {siteFrom && <option value="site">사이트 전용 신청 실적</option>}
          </select>
        </label>
        <label>
          신청 건수
          <input
            type="number"
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
          {pending ? '저장 중…' : '실적 저장'}
        </button>
      </form>
      <p role="status" aria-live="polite">
        {status}
      </p>
      <noscript>
        <p>실적 조회는 JavaScript 없이 가능합니다. 실적 입력·저장에는 JavaScript를 켜 주세요.</p>
      </noscript>
      <div
        className="admin-table-scroll"
        tabIndex={0}
        role="region"
        aria-label="입력된 신청·승인 실적"
      >
        <table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>범위</th>
              <th>신청</th>
              <th>승인</th>
              <th>마지막 입력 (한국 시간)</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row) => (
                <tr key={`${row.date}-${row.scope}`}>
                  <th scope="row">{row.date}</th>
                  <td>{row.scope === 'shared' ? '전체 채널' : '사이트 전용'}</td>
                  <td>{row.applications}</td>
                  <td>{row.approvals}</td>
                  <td>
                    {new Date(row.updatedAt).toLocaleString('ko-KR', {
                      timeZone: 'Asia/Seoul',
                      hour12: false,
                    })}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-button admin-secondary"
                      onClick={() => select(row.date, row.scope)}
                      disabled={pending}
                    >
                      수정
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>선택한 기간에 입력된 실적이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
