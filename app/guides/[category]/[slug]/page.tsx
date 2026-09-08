import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Ruler } from 'lucide-react';
import { getCategory, getPost, getPosts, getRelatedPosts, helperHref } from '@/lib/content';
import { absoluteUrl } from '@/lib/site';
import {
  Breadcrumbs,
  Checklist,
  GuideCta,
  GuideStructuredData,
  MeasurementSketch,
  PostCard,
} from '@/components/guide-ui';

type Props = { params: Promise<{ category: string; slug: string }> };
export const dynamicParams = false;
export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ category: post.category, slug: post.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPost(category, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: absoluteUrl(post.href) },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: absoluteUrl(post.href),
      publishedTime: post.date,
      modifiedTime: post.date,
      images: ['/images/curtain-natural.webp'],
    },
  };
}
export default async function PostPage({ params }: Props) {
  const { category: categorySlug, slug } = await params;
  const category = getCategory(categorySlug);
  const post = await getPost(categorySlug, slug);
  if (!category || !post) notFound();
  const related = await getRelatedPosts(post);
  const breadcrumbs = [
    { name: '커튼 가이드', href: '/guides' },
    { name: category.navTitle, href: `/guides/${category.slug}` },
    { name: post.title, href: post.href },
  ];
  return (
    <main id="main" className="guide-main guide-article-main">
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
        <header className="guide-article-header">
          <Link className="guide-post-category" href={`/guides/${category.slug}`}>
            {category.navTitle}
          </Link>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="guide-article-meta">
            <span>마스터즈 커튼 가이드</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{post.date.replaceAll('-', '.')} 작성</time>
          </div>
        </header>
        <div className="guide-article-layout">
          <article className="guide-article" aria-label={post.title}>
            {slug === 'measurement-basics' && <MeasurementSketch />}
            <div className="guide-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="guide-article-footnote">
              <Ruler size={17} />
              <p>
                도우미의 추천과 치수는 상담 준비용입니다. 제작 규격·금액·설치 조건은 제휴 상담에서
                확정하세요.
              </p>
            </div>
          </article>
          <aside className="guide-article-sidebar">
            <div className="guide-sidebar-sticky">
              <h2>
                읽은 내용을
                <br />
                우리 집에 적용해요.
              </h2>
              <Checklist items={['창 크기 입력', '원하는 느낌 선택', '추천을 요청서로 저장']} />
              <Link href={helperHref(post.helperPreset)} className="button button-secondary">
                도우미 시작 <ArrowRight size={17} />
              </Link>
              <Link href={`/guides/${category.slug}`} className="guide-sidebar-category">
                {category.navTitle} 한눈에 보기 <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
        <GuideCta
          category={category}
          from={post.href}
          placement="post-bottom"
          intent={post.ctaIntent}
          preset={post.helperPreset}
        />
        <section className="guide-related">
          <div className="guide-section-title">
            <div>
              <h2>함께 보면 좋은 가이드</h2>
            </div>
          </div>
          <div className="guide-post-grid">
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
        <GuideStructuredData items={breadcrumbs} article={post} />
      </div>
    </main>
  );
}
