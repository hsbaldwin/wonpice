import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories, getPosts } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CategoryCard, GuideStructuredData, PostCard } from '@/components/guide-ui';

export const metadata = pageMetadata({
  title: '커튼 가이드 | 선택부터 견적 준비까지',
  description:
    '커튼 실측·설치·원단 구성·견적 확인사항과 거실·침실·신혼집 선택 기준을 확인하세요. 필요한 질문부터 찾아보는 실용 가이드입니다.',
  path: '/guides',
});

export default async function GuidesPage() {
  const posts = await getPosts();
  return (
    <main id="main" className="guide-main">
      <div className="container">
        <Breadcrumbs items={[{ name: '커튼 가이드', href: '/guides' }]} />
        <header className="guide-hub-heading">
          <span className="eyebrow">커튼 가이드</span>
          <h1>
            커튼 선택부터
            <br />
            <em>견적 준비까지</em>
          </h1>
          <p>지금 궁금한 질문부터 찾아보고, 우리 집에 필요한 조건을 정리하세요.</p>
        </header>
        <nav className="guide-shortcuts" aria-label="자주 찾는 정보">
          <Link href="/guides/installation/measurement-basics">
            치수 재는 법 <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/guides/interior/fabric-layers">
            원단 구성 비교 <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/guides/companies/quote-comparison">
            견적 확인사항 <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </nav>
        {[
          { title: '준비할 내용으로 찾기', slugs: ['installation', 'companies', 'interior'] },
          { title: '공간으로 찾기', slugs: ['living-room', 'bedroom', 'newlywed-home'] },
        ].map((group) => (
          <section className="guide-category-group" key={group.title}>
            <h2>{group.title}</h2>
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
          <div className="guide-post-grid">
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
          <Link className="guide-simple-link" href="/#helper">
            치수 먼저 정리하기 <ArrowRight size={18} aria-hidden="true" />
          </Link>
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
