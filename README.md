# 커튼 견적 도우미

창 치수와 필요한 기능을 정리하고, 커튼 가이드를 읽은 뒤 견적 상담을 신청하는 한국어 사이트입니다. 자체 시공·실시간 업체별 가격 비교는 제공하지 않습니다. Next.js App Router, React, TypeScript를 사용합니다.

## 시작하기

Node.js 22 LTS와 npm을 사용합니다.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

이미 `.env.local`이 있다면 덮어쓰지 말고 필요한 설정만 확인합니다. `NEXT_PUBLIC_SITE_URL`을 실제 사용하는 주소·포트와 맞추세요. 검색 검토 기본값은 `SITE_INDEXABLE=false`입니다.

```sh
npm run typecheck
npm test
npm run build
npm run start
```

현재 Next.js 버전의 규칙은 `AGENTS.md`와 `node_modules/next/dist/docs/`를 확인합니다. `npm run format:check`는 서식 검사, `npm run format`은 서식 정리입니다.

## 사용자 흐름

- 홈: 시작 → 창문/설치 범위·실측/대략·가로·세로 입력 → 필요한 기능 선택 → 저장한 내용 확인 → 견적 문의.
- 저장: 현재 견적 하나를 같은 브라우저에 자동 저장하고 새로고침 후 복원합니다. 여러 방 자료 추가, 문서 보관함, PDF 다운로드는 현재 홈 UI에서 제공하지 않습니다. 관련 이전 코드와 테스트는 호환성을 위해 남아 있습니다.
- 가이드: 준비할 내용 또는 공간으로 탐색 → 핵심 요약·목차·비교표·작성 예시 → 상담 준비사항 → 무료 견적 신청 또는 치수 먼저 정리하기.
- 신청: `/go/quote`를 통해 공식 추적 링크로 이동합니다. `rel="sponsored"`를 유지하며 입력한 치수와 요구사항은 신청 양식으로 자동 전달되지 않습니다.

홈은 도우미와 공간별 가이드의 두 장면이며 마지막 장면 안에 푸터가 있습니다. 홈에는 공통 상단 헤더가 없습니다. 이번 개선은 홈 구성과 도우미 흐름을 유지하고 공통 메뉴를 “서비스 안내”로 바꿉니다.

서비스 안내와 가이드 하단에는 “이 링크를 통한 신청으로 운영자에게 수수료가 발생할 수 있습니다.”를 표시합니다. 메뉴·본문·메타데이터·관리자에서 사용하는 표현은 사용자 중심으로 통일합니다.

## 콘텐츠와 SEO

공개 대상은 홈 1 + 가이드 허브 1 + 카테고리 6 + 글 10 + 서비스 안내 1 = **19페이지**입니다. 지역별 페이지나 별도 블라인드 카테고리는 추가하지 않습니다.

| 카테고리    | 경로                    |
| ----------- | ----------------------- |
| 설치·시공   | `/guides/installation`  |
| 업체·견적   | `/guides/companies`     |
| 스타일·소재 | `/guides/interior`      |
| 거실커튼    | `/guides/living-room`   |
| 침실커튼    | `/guides/bedroom`       |
| 신혼집커튼  | `/guides/newlywed-home` |

`content/posts/*.md`의 파일명은 글 slug입니다. 카테고리·목록·사이트맵·통계 허용 경로에 자동 반영됩니다. 운영 콘텐츠 수정 후에는 재빌드·재시작합니다.

```yaml
---
title: '글 제목'
description: '사용자가 해결할 질문과 짧은 답'
primaryKeyword: '대표 검색 의도'
relatedKeywords: ['관련 주제']
category: 'installation'
ctaIntent: 'helper'
helperPreset: 'other'
relatedPosts: ['measurement-basics', 'rail-check']
date: '2026-09-09'
dateModified: '2026-09-09'
image: '/images/curtain-natural.webp'
summary: ['핵심 요약 1', '핵심 요약 2', '핵심 요약 3']
preparation: ['상담 준비 1', '상담 준비 2', '상담 준비 3']
---
```

`date`는 발행일로 유지하고 실제 본문을 수정한 날짜는 선택 필드 `dateModified`에 기록합니다. `image`도 선택 필드입니다. 요약·준비사항은 각각 세 개입니다. 관련 글은 실제 slug만 사용하며 최대 세 개를 표시합니다. `ctaIntent`는 기존 콘텐츠 분류를 유지하지만 신청 버튼은 모두 무료 견적 신청을 주 행동으로, 치수 정리를 보조 행동으로 제공합니다. `helperPreset`은 기존 입력을 덮어쓰지 않습니다.

H2와 `section-N` 앵커·목차는 Markdown에서 서버가 생성합니다. H2가 세 개 이상이면 목차를 표시하고 모바일에서는 기본 접힘으로 제공합니다. Markdown 표는 가로 스크롤·키보드 포커스·고정 첫 열을 지원합니다. 작성 주체, 발행·수정일, 편집 자료와 신청 절차 출처를 함께 표시합니다.

`lib/seo.ts`가 페이지별 title·description·canonical·OG·Twitter를 생성합니다. 화면과 JSON-LD의 Breadcrumb는 `홈 > 커튼 가이드 > 카테고리 > 글 제목`입니다. `SITE_INDEXABLE=false`이면 noindex·robots 차단·빈 사이트맵, `true`이면 공개 URL 19개를 제공합니다. 관리자·API·이동 경로·저장 북마크는 검색 대상에서 제외합니다.

## 통계와 관리자

운영은 Neon PostgreSQL, 로컬은 기존 SQLite를 사용합니다. 모든 런타임 저장 접근은 비동기입니다. Vercel에서는 `DATABASE_URL`이 없을 때 SQLite로 대체하지 않습니다. 실제 DB 연결과 배포는 설정 후 별도 확인합니다.

```sh
npm run admin:setup
npm run analytics:setup
```

첫 명령은 관리자 인증 설정, 두 번째는 `DATABASE_URL`에 연결해 PostgreSQL 스키마를 준비합니다. 접속정보와 자격증명을 소스·문서·채팅에 넣지 않습니다. 상세 절차는 [운영 통계 설정](docs/analytics-setup.md)을 확인하세요.

`/admin`은 방문수·페이지 조회·문의 클릭·문의 클릭률·도우미 완료율, 일별 추이, 유입 경로, 첫 방문 페이지별 성과와 수동 신청·승인 실적을 보여 줍니다. 날짜는 한국 시간이며 오늘·7일·28일·90일을 지원합니다. 기록 없음·조회 실패·실적 미입력을 구분합니다.

현재 링크는 공유 링크입니다. **전체 채널 신청 실적**으로 사이트 신청 전환율을 계산하지 않습니다. 공식 사이트 전용 링크, 확인 설정, 실제 적용일이 준비된 이후에만 사이트 실적을 입력하고 조건을 충족한 기간 합계의 비율을 제공합니다.

통계에는 신청자의 이름·연락처·주소·치수·자유 입력을 저장하지 않습니다. 이벤트 ID로 중복을 제거하며 저장이 실패해도 문의 페이지 이동은 계속됩니다. 검색어·검색결과 클릭률은 Search Console·네이버 자료에서 별도로 확인합니다.

## 검증

```sh
# 프로덕션 서버의 19페이지·메타데이터·링크·목차·JSON-LD·preview sitemap 검사
SEO_TEST_URL=http://127.0.0.1:3000 SEO_EXPECT_CANONICAL_ORIGIN=http://127.0.0.1:3000 node --import tsx --test tests/seo-http.test.ts
# 별도 임시 서버·DB·인증정보로 관리자 API와 실제 HTTP 검증
ADMIN_HTTP_FIXTURE=true ADMIN_HTTP_PORT=3004 node --import tsx --test tests/admin-http.test.ts
```

첫 명령은 검증 서버를 먼저 실행하고 canonical을 빌드 값과 맞춰 사용합니다. 공개 모드 검증은 `SITE_INDEXABLE=true` 빌드에 `SEO_EXPECT_INDEXABLE=true`를 추가합니다. 일반 `npm test`는 HTTP 테스트 두 개를 제외하고 실행합니다. PGlite 기반 PostgreSQL 테스트는 네트워크나 운영 DB 없이 실제 PostgreSQL SQL을 실행합니다.

검증 결과와 외부 설정이 필요한 항목은 [구현·검증 기록](docs/seo-ui-implementation.md), 배포는 [운영 통계 설정](docs/analytics-setup.md)과 [Vercel 안내](docs/vercel-deployment.md)를 참고하세요.
