# 공개 및 운영 점검

기준일: 2026-09-09. 운영 주소는 `https://curtain.wonpice.com`, Vercel 프로젝트는 `gb143/wonpice`, 저장소는 `greybrander-prog/wonpice`입니다.

## 배포 전에

### 현재 진행 기록

- Vercel 운영 프로젝트 및 원격 main 기준 커밋 일치 확인.
- Neon `wonpice Admin` 프로젝트(싱가포르)의 production / neondb에 스키마 생성 완료. 9개 SQL 문장 실행 및 COMMIT 성공.
- Vercel Production에 `DATABASE_URL`을 Secret으로 저장 완료. 실제 앱의 DB 접속은 배포 이후 검증 필요.
- 실제 운영 도메인 canonical로 공개용 로컬 빌드 성공. HTTP·관리자 임시 계정 포함 103개 테스트 통과, 실패·건너뜀 0.
- `npm audit --omit=dev`: 알려진 운영 의존성 취약점 0건. 이는 모든 보안 문제의 부재를 보증하지 않습니다.
- 공개 점검 명령의 정상 공개·정상 검토·잘못된 canonical·DB 누락·잘못된 인증·불완전한 추적 설정 6개 시나리오 확인.
- 관리자 인증 값 두 개의 Production Secret 등록 확인. 통계 플래그는 Config로 교체해 Production=true, Preview=false 저장 완료.
- 작성자 설정을 확인된 GitHub 공개 noreply 주소로 수정한 커밋 `486524f`의 Vercel 배포 `FaUPb12qnCsPE1sxaxZLM1yH35us`가 Ready이며 운영 도메인에 반영됨. 기존 Git 기록은 보존함.
- 운영 도메인의 19페이지 HTTP·메타데이터·링크·구조화 데이터와 검색 차단 상태 검증 통과. 관리자 실제 로그인, Neon 방문 기록, 도우미 시작·완료, 문의 클릭 집계 확인. 홈 240×180cm 및 기능 선택의 저장·새로고침 복원 확인.
- `/go/quote`의 공식 URL 302, 비로그인 실적·CSV API의 401 확인. 실제 문의 버튼으로 공식 양식까지 이동했으나 제출하지 않음. 이번 운영 점검 방문·완료·클릭이 초기 통계에 포함되므로 성과 자료로 해석하지 않음.
- 사용자 검색 공개 승인에 따라 Production `SITE_INDEXABLE=true`, Preview `SITE_INDEXABLE=false`로 분리 저장하고 공개 배포 완료. 운영 19페이지 HTTP 검증 통과, 사이트맵 19개·robots 허용·index 메타데이터 확인.
- Google Search Console URL 접두어 속성 `https://curtain.wonpice.com/` 소유권 인증 완료. 사이트맵 처리 완료 및 발견된 페이지 19개 확인. 홈페이지 색인 생성 요청은 우선순위 크롤링 대기열에 접수됨. 실제 색인·검색 순위는 아직 보장하거나 확인하지 않음.
- 공개 재배포 이후 기존 방문 1세션·조회 3회·도우미 완료 1회·문의 클릭 1회가 관리자에서 유지됨을 확인. 이는 점검 기록이며 영업 성과가 아님.
- 네이버 서치어드바이저는 사용자 로그인 대기. 자동 운영 모니터링은 아직 설정하지 않음.

### 실행 순서

1. Neon 운영 DB와 관리자 인증을 [운영 통계 설정](analytics-setup.md)에 따라 준비합니다. 비밀 값은 Git·채팅·로그에 남기지 않습니다. 기존 운영 DB가 있으면 보존하고 백업·복구 가능 여부부터 확인합니다.
2. Production 환경에 `NEXT_PUBLIC_SITE_URL=https://curtain.wonpice.com`, `NEXT_PUBLIC_ANALYTICS_ENABLED=true`, `DATABASE_URL`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`을 설정합니다. 첫 검토 배포는 `SITE_INDEXABLE=false`입니다. Preview와 운영 DB를 공유하지 않습니다.
3. 같은 환경변수를 가진 배포 준비 환경에서 `npm run release:check -- --staged`를 실행합니다. 공개할 때는 `SITE_INDEXABLE=true`로 `npm run release:check`를 실행합니다. 이 명령은 환경변수의 형식만 검사하며 DB 접속·비밀번호 로그인 성공을 보증하지 않습니다. 로컬 개발 설정에서는 실패하는 것이 정상입니다.
4. `npm run analytics:setup`으로 DB 스키마를 준비합니다. 기존 기록을 삭제하지 않는 초기화입니다. 배포 앱의 정상 권한으로 수집·조회를 별도로 확인합니다.
5. `npm test`, `npm run build`, `npm run format:check`, `git diff --check`를 확인하고 배포 커밋·배포 URL·이전 정상 배포를 기록합니다. `.env.local`, 데이터베이스, 생성된 로그와 `.next`는 배포 소스에 포함하지 않습니다.

## 운영 배포 검증

- 실제 도메인에서 홈 입력·저장·새로고침 복원, 모바일 가이드·목차·표·키보드 탐색을 확인합니다.
- 19개 공개 페이지에 대해 아래 명령으로 HTTP·고유 메타데이터·내부 링크·구조화 데이터·사이트맵을 확인합니다. 이 검사는 신청 링크를 따라 외부 양식을 제출하지 않습니다.

```sh
SEO_TEST_URL=https://curtain.wonpice.com \
SEO_EXPECT_CANONICAL_ORIGIN=https://curtain.wonpice.com \
SEO_EXPECT_INDEXABLE=true \
node --import tsx --test tests/seo-http.test.ts
```

- 검토 배포를 검사할 때는 `SEO_EXPECT_INDEXABLE=false`를 사용합니다. 공개 직전 Production 설정을 변경하고 **새로 빌드**합니다. 로컬·Preview에서 만든 산출물을 그대로 공개용이라고 가정하지 않습니다.
- `/admin` 로그인·로그아웃, 세션 기반 방문 집계, 문의 클릭, 날짜 필터와 CSV를 확인합니다. 운영 실적에는 가짜 신청·승인 건수를 넣지 않습니다. 저장·수정 테스트는 별도 테스트 DB에서 수행하고 운영에서는 실제 확인된 수치만 입력합니다.
- `/go/quote`의 응답 `Location`이 공식 추적 URL인지 확인합니다. 실제 신청 양식은 테스트 제출하지 않습니다.
- 새 배포 이후에도 이전 이벤트가 조회되는지 확인해 영속 저장을 검증합니다. Vercel 오류 로그와 Neon 접속 오류도 확인합니다.
- 운영 도메인의 TLS, `/robots.txt`, `/sitemap.xml`과 신규 글 HTTP 200을 확인합니다. `/admin`, `/saved` 등 비공개 경로는 검색 대상에서 제외되어야 합니다.

## 이상이 생기면

2026-09-09 작업 시작 시 정상 배포 기준은 `RSooUnEu8pRPVqsCob4mSA2F3tEV`, 소스 커밋은 `07deea9651011c746b26e10236dd967e8c4ac336`입니다. 실제 배포 시 최신 기준을 다시 확인합니다.

홈·신청 이동 장애가 생기면 Vercel에서 이전 정상 배포로 롤백하고 실제 도메인에서 복구를 확인합니다. DB 장애만 발생했다면 신청 이동이 계속되는지 먼저 확인하고 통계 오류를 복구합니다. DB를 삭제하거나 초기화해 장애를 숨기지 않습니다. 코드 롤백은 DB 기록을 되돌리지 않습니다.

canonical이나 검색 설정이 잘못되었다면 설정을 수정해 다시 빌드합니다. 환경변수 변경만으로 기존 빌드가 바뀌지 않습니다. 이전 배포로 되돌리면 당시의 검색 차단 상태도 돌아올 수 있으므로 robots와 사이트맵을 재확인합니다.

## 공개 이후

Search Console과 네이버 서치어드바이저에서 소유권을 확인하고 사이트맵을 제출합니다. 수집 요청과 실제 색인은 구분해 기록합니다. 첫날은 오류·신청 이동·통계 저장을 확인하고, 28일마다 검색 유입·문의 클릭·실적 입력 범위를 평가합니다. 공유 링크의 신청 건수로 사이트 전환율을 계산하지 않습니다.

자동 모니터링이나 알림은 이 문서만으로 실행되지 않습니다. 담당자의 수동 확인 또는 별도로 설정한 모니터링이 필요합니다.

공식 참고: [Vercel 환경변수](https://vercel.com/docs/environment-variables), [배포 승격](https://vercel.com/docs/deployments/promoting-a-deployment), [Neon 연결](https://neon.com/docs/connect/connect-from-any-app).
