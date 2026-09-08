import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Ruler } from 'lucide-react';
import { categories, getPosts } from '@/lib/content';
import { absoluteUrl } from '@/lib/site';
import { Breadcrumbs, CategoryCard, GuideStructuredData, PostCard } from '@/components/guide-ui';

export const metadata: Metadata = {
  title: '커튼 가이드 | 실측·스타일·견적 한눈에',
  description:
    '맞춤커튼부터 커튼설치, 거실커튼, 침실커튼, 신혼집커튼까지. 공간별 선택 기준과 견적 준비를 짧고 쉽게 확인하세요.',
  alternates: { canonical: absoluteUrl('/guides') },
  openGraph: {
    title: '공간을 바꾸는 커튼 가이드',
    description: '실측부터 스타일, 견적까지. 필요한 것부터 가볍게.',
    url: absoluteUrl('/guides'),
    images: ['/images/curtain-natural.webp'],
  },
};

export default async function GuidesPage() {
  const posts = await getPosts();
  return (
    <main id="main" className="guide-main">
      <div className="container">
        <Breadcrumbs items={[{ name: '커튼 가이드', href: '/guides' }]} />
        <header className="guide-hub-heading">
          <span className="eyebrow">커튼 가이드</span>
          <h1>
            내 공간을 이해하는
            <br />
            <em>조금 더 쉬운 선택.</em>
          </h1>
          <p>
            실측부터 스타일, 견적까지.
            <br className="guide-mobile-break" /> 지금 필요한 것부터 살펴보세요.
          </p>
        </header>
        <div className="guide-hub-shortcut">
          <span className="guide-shortcut-icon">
            <Ruler size={23} strokeWidth={1.6} />
          </span>
          <div>
            <strong>읽기 전에, 우리 집부터 맞춰볼까요?</strong>
            <p>창 크기 두 개로 시작하는 맞춤커튼 도우미</p>
          </div>
          <Link className="text-link" href="/#helper">
            도우미 시작 <ArrowRight size={17} />
          </Link>
        </div>
        <section aria-label="주제별 커튼 가이드" className="guide-category-grid">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              count={posts.filter((post) => post.category === category.slug).length}
            />
          ))}
        </section>
        <section className="guide-hub-posts">
          <div className="guide-section-title">
            <div>
              <h2>하나씩 알면, 선택이 쉬워져요.</h2>
            </div>
            <span className="guide-count">8개의 실용 가이드</span>
          </div>
          <div className="guide-post-grid">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
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
