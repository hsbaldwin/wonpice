# Vercel 배포 준비

기준: 2026-09-09. 코드와 설정 안내를 준비했으며, 추가 요청에 따라 운영 연결을 진행 중입니다. 실제 배포·검색 공개 완료 여부는 [공개 및 운영 점검](release-runbook.md)에 따라 별도로 확인합니다.

1. GitHub에 변경 내용을 검토 가능한 상태로 준비합니다. `.env.local`, DB, `.next`, `node_modules`, 생성된 로그는 올리지 않습니다.
2. Vercel의 Next.js 프로젝트에서 Install Command `npm ci`, Build Command `npm run build`, Output Directory 기본값을 사용합니다. `VERCEL=1`에서는 standalone 출력 대신 Vercel 어댑터가 패키징합니다.
3. [운영 통계 설정](analytics-setup.md)에 따라 Neon의 서버 전용 `DATABASE_URL`을 준비하고 `npm run analytics:setup`으로 스키마를 먼저 생성합니다. Vercel 임시 디스크에 SQLite 통계를 저장하지 않습니다.
4. `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`, `NEXT_PUBLIC_ANALYTICS_ENABLED=true`를 설정합니다. 관리자 해시의 `$`는 Vercel 입력창에 원문 그대로 넣으며 `.env` 파일용 역슬래시를 복사하지 않습니다.
5. `NEXT_PUBLIC_SITE_URL`을 해당 환경의 HTTPS origin으로 설정합니다. 운영 도메인은 `https://curtain.wonpice.com`입니다. 검토 단계는 `SITE_INDEXABLE=false`를 유지합니다. Preview에는 별도 DB와 주소를 사용합니다.
6. 홈 입력·저장 복원, 19페이지 HTTP·메타데이터·목차·링크, 관리자 로그인과 실적 입력을 확인합니다. 실제 외부 상담 신청 양식은 테스트 제출하지 않습니다.
7. 검색 공개 결정을 내린 뒤 Production의 `SITE_INDEXABLE=true`로 재빌드·배포합니다. 공개 모드는 사이트맵 19개, 비공개 모드는 빈 사이트맵과 noindex입니다.
8. Search Console·네이버에서 소유권과 사이트맵·대표 URL 수집 상태를 확인합니다. 실제 검색 노출·클릭률은 해당 자료를 기준으로 검토합니다.

현재 공유 추적 링크는 그대로 사용합니다. 공식 사이트 전용 링크가 확보되면 `SITE_TRACKING_URL`, `SITE_TRACKING_FROM`, `SITE_TRACKING_CONFIRMED`의 조건을 [운영 통계 설정](analytics-setup.md)에 따라 적용합니다. 공유 실적으로 사이트 신청 전환율을 계산하지 않습니다.

접속정보는 소스·문서·채팅에 남기지 않습니다. 서비스 주소를 바꾸면 브라우저 저장소도 달라져 기존 작성 내용이 자동으로 이전되지 않습니다. 배포 플랜의 사용 범위와 비용은 Vercel의 현재 약관·설정을 확인하세요.

공식 참고: [Next.js 배포](https://vercel.com/docs/frameworks/full-stack/nextjs), [환경변수](https://vercel.com/docs/environment-variables), [Neon Next.js 연결](https://neon.com/docs/guides/nextjs).
