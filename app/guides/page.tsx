import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories, getPosts } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CategoryCard, GuideStructuredData, PostCard } from '@/components/guide-ui';
import { getGuideImage } from '@/lib/guide-images';
import { AffiliateLink } from '@/components/affiliate-link';

export const metadata = pageMetadata({
  title: '커튼 선택 가이드: 실측부터 견적 준비까지',
  description:
    '커튼 고르는 법부터 사이즈 재는 법, 원단·블라인드 비교와 견적서 확인사항까지. 거실·침실·신혼집에 필요한 커튼 선택 가이드를 찾아보세요.',
  path: '/guides',
  image: getGuideImage('living-room').src,
});

export default async function GuidesPage() {
  const posts = await getPosts();
  return (
    <main id="main" className="guide-main">
      <div className="container">
        <Breadcrumbs items={[{ name: '커튼 가이드', href: '/guides' }]} />
        <header className="guide-hub-heading guide-hub-question-header">
          <div className="guide-hub-copy">
            <span className="eyebrow">커튼 가이드</span>
            <h1>
              커튼 선택 가이드,
              <br />
              <em>실측부터 견적 준비까지</em>
            </h1>
            <p>지금 궁금한 질문부터 찾아보고, 우리 집에 필요한 조건을 정리하세요.</p>
          </div>
        </header>
        <nav className="guide-shortcuts" aria-label="자주 찾는 정보">
          <Link href="/guides/installation/measurement-basics">
            커튼 사이즈는 어디부터 재나요? <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/guides/interior/fabric-layers">
            쉬폰·암막·이중커튼, 어떻게 고르나요? <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/guides/companies/quote-comparison">
            커튼 견적서에서 무엇을 비교하나요? <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </nav>
        {[
          {
            title: '준비할 내용으로 찾기',
            description: '치수부터 원단, 견적까지. 선택의 기준을 먼저 알아보세요.',
            slugs: ['installation', 'companies', 'interior'],
          },
          {
            title: '공간으로 찾기',
            description: '거실과 침실, 신혼집. 생활하는 방식에 맞춰 살펴보세요.',
            slugs: ['living-room', 'bedroom', 'newlywed-home'],
          },
        ].map((group, index) => (
          <section
            className="guide-category-group"
            key={group.title}
            id={index === 0 ? 'guide-categories' : undefined}
          >
            <div className="guide-section-title guide-category-group-title">
              <div>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <span className="guide-section-index" aria-hidden="true">
                0{index + 1}
              </span>
            </div>
            <div className="guide-category-grid">
              {group.slugs.map((slug) => {
                const category = categories.find((c) => c.slug === slug)!;
                return (
                  <CategoryCard
                    key={slug}
                    category={category}
                    count={posts.filter((p) => p.category === slug).length}
                  />
                );
              })}
            </div>
          </section>
        ))}
        <section className="guide-hub-posts">
          <div className="guide-section-title">
            <div>
              <h2>하나씩 알면, 선택이 쉬워져요.</h2>
            </div>
            <span className="guide-count">{posts.length}개의 실용 가이드</span>
          </div>
          <div className="guide-post-grid guide-post-library">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
        <div className="guide-hub-shortcut">
          <div>
            <strong>읽은 내용을 우리 집에 적용해 보세요</strong>
            <p>창 크기와 필요한 기능을 정리해 상담을 준비할 수 있습니다.</p>
          </div>
          <div className="guide-hub-next-actions">
            <AffiliateLink cta="guide-hub-bottom" className="button button-primary">
              무료 견적 신청 <ArrowRight size={18} aria-hidden="true" />
            </AffiliateLink>
            <Link className="guide-simple-link" href="/#helper">
              치수 먼저 정리하기 <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <p className="guide-caption">
              신청 양식으로 이동하며, 링크를 통한 신청 시 운영자에게 수수료가 발생할 수 있습니다.
            </p>
          </div>
        </div>
        <GuideStructuredData
          items={[{ name: '커튼 가이드', href: '/guides' }]}
          collection={{
            name: '커튼 가이드',
            description: '커튼 실측·설치·스타일·공간별 선택과 견적 준비 안내',
            href: '/guides',
          }}
        />
      </div>
    </main>
  );
}
