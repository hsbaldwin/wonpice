# GitHub + Vercel 배포 준비

## 현재 확인 상태

- Next.js 프로덕션 빌드가 성공합니다.
- GitHub에는 소스·공개 이미지·영상·폰트·콘텐츠·package-lock.json을 올립니다.
- .env.local, 데이터베이스, node_modules, .next, .vercel, 생성된 보고서는 Git에서 제외합니다.
- 관리자 통계는 현재 로컬 SQLite입니다. Vercel의 임시 파일 시스템에 통계를 저장하면 영속성이 보장되지 않습니다. Vercel 빌드에서는 자체 통계 수집과 관리자 로그인을 자동 비활성화합니다. 도우미와 제휴 추적 링크는 유지합니다.
- CPA 수익 목적의 운영에는 Vercel의 상업용 플랜을 사용합니다. Hobby는 비상업용 개인 프로젝트에 제한됩니다.

## 배포 순서

1. GitHub에 비공개 저장소를 만들고 이 프로젝트를 push합니다.
2. Vercel에서 해당 GitHub 저장소를 Import합니다.
3. Framework Preset은 Next.js, Root Directory는 프로젝트 루트로 설정합니다. Install Command는 npm ci, Build Command는 npm run build이며 Output Directory는 기본값을 유지합니다.
4. 이번 배포는 자체 통계 없이 운영합니다. DATABASE_PATH, ADMIN_PASSWORD_HASH, ADMIN_SESSION_SECRET은 입력하지 않습니다. 추후 외부 DB 연동 후 통계를 활성화합니다.
5. 첫 검토 배포에는 SITE_INDEXABLE=false를 설정합니다. NEXT_PUBLIC_SITE_URL에는 사용할 배포 주소의 HTTPS origin을 입력합니다.
6. 화면 전환·새로고침 복원·저장·제휴 문의를 확인합니다. 문의 링크는 기존 CPA 추적 URL을 그대로 거쳐야 합니다.
7. 소유한 도메인을 Vercel에 연결하고 안내된 DNS 레코드를 도메인 업체에 설정합니다. 최종 서비스 주소는 별도로 확정합니다.
8. Production의 NEXT_PUBLIC_SITE_URL을 최종 HTTPS 주소로 바꾸고 SITE_INDEXABLE=true를 설정한 뒤 재배포합니다. Preview 환경은 false를 유지합니다.
9. canonical, robots.txt, sitemap.xml과 외부 문의 리다이렉트를 확인합니다.

## 환경변수 주의

실제 비밀번호·관리자 해시·DB 토큰은 저장소나 문서에 넣지 않고 Vercel 환경변수에 입력합니다. ADMIN_PASSWORD_HASH의 달러 기호는 Vercel 입력창에서는 원문 그대로 사용합니다. .env 파일용 역슬래시 이스케이프를 복사하지 않습니다.

도우미의 작성 내용은 방문자 브라우저에 저장됩니다. 서비스 주소를 변경하면 브라우저 저장소가 달라지므로 기존 주소의 작성 내용이 새 주소로 자동 이전되지 않습니다.

## 공식 참고

- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Vercel Git 연동](https://vercel.com/docs/git)
- [Vercel Hobby 사용 범위](https://vercel.com/docs/plans/hobby)
