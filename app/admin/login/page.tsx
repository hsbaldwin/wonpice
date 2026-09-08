import { analyticsEnabled } from '@/lib/analytics-config';
import { site } from '@/lib/site';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { authConfigured, SESSION_COOKIE, verifySession } from '@/lib/auth';

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const configured = authConfigured();
  if (configured && verifySession((await cookies()).get(SESSION_COOKIE)?.value)) redirect('/admin');
  const { error } = await searchParams;
  return (
    <main className="admin-login">
      <div className="admin-eyebrow">{site.name} · ANALYTICS</div>
      <h1>사이트 운영 통계</h1>
      {configured ? (
        <>
          <p>관리자 비밀번호로 로그인해 주세요.</p>
          <form action="/api/admin/login" method="post" className="admin-login-form">
            <label htmlFor="password">관리자 비밀번호</label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              maxLength={1024}
            />
            {error && (
              <p className="admin-error" role="alert">
                비밀번호를 확인해 주세요.
              </p>
            )}
            <button className="admin-button" type="submit">
              로그인
            </button>
          </form>
        </>
      ) : !analyticsEnabled() ? (
        <div className="admin-notice">
          <h2>관리자 통계 준비 중입니다</h2>
          <p>현재 배포에서는 자체 통계를 수집하지 않습니다.</p>
        </div>
      ) : (
        <div className="admin-notice">
          <h2>관리자 접근이 잠겨 있습니다</h2>
          <p>
            서버 터미널에서 <code>npm run admin:setup</code>을 실행한 뒤 생성된 환경변수를 설정하고
            서버를 재시작하세요.
          </p>
          <p>
            필수 설정: <code>ADMIN_PASSWORD_HASH</code>, <code>ADMIN_SESSION_SECRET</code>
          </p>
        </div>
      )}
      <a href="/" className="admin-home">
        사이트로 돌아가기 ↗
      </a>
    </main>
  );
}
