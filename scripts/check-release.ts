import { loadEnvConfig } from '@next/env';
import { authConfigured } from '../lib/auth';
import { siteTrackingConfig } from '../lib/tracking';

// Read production build settings. Never print credentials or attempt database writes.
loadEnvConfig(process.cwd(), false);
const staging = process.argv.includes('--staged');
const checks: [string, boolean][] = [];
checks.push([
  '운영 canonical: https://curtain.wonpice.com',
  process.env.NEXT_PUBLIC_SITE_URL === 'https://curtain.wonpice.com',
]);
checks.push([
  staging ? '검토 배포: 검색 차단' : '공개 배포: 검색 허용',
  process.env.SITE_INDEXABLE === (staging ? 'false' : 'true'),
]);
checks.push(['운영 통계 활성화', process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true']);
checks.push(['관리자 인증 형식', authConfigured()]);
let databaseConfigured = false;
try {
  const url = new URL(process.env.DATABASE_URL || '');
  databaseConfigured =
    ['postgres:', 'postgresql:'].includes(url.protocol) &&
    url.hostname.endsWith('.neon.tech') &&
    !!url.username &&
    !!url.password &&
    url.pathname.length > 1 &&
    ['require', 'verify-full'].includes(url.searchParams.get('sslmode') || '');
} catch {}
checks.push(['서버 전용 Neon 연결 설정 형식 (접속 검증 별도)', databaseConfigured]);
const trackingRequested = !!(
  process.env.SITE_TRACKING_URL ||
  process.env.SITE_TRACKING_FROM ||
  process.env.SITE_TRACKING_CONFIRMED === 'true'
);
checks.push([
  '신청 추적 설정: 기존 공유 링크 또는 유효한 전용 설정',
  !trackingRequested || !!siteTrackingConfig(),
]);
for (const [label, passed] of checks) console.log(`${passed ? 'PASS' : 'FAIL'} ${label}`);
console.log(
  '설정 검사만 수행했습니다. DB 접속·배포·19페이지 HTTP·관리자 로그인 검증은 별도입니다.',
);
if (checks.some(([, passed]) => !passed)) process.exitCode = 1;
