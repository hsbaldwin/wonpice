import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Ruler } from 'lucide-react';
import { getCategory, getPost, getPosts, getRelatedPosts, helperHref } from '@/lib/content';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import {
  Breadcrumbs,
  Checklist,
  GuideCta,
  GuideToc,
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
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: post.href,
    image: post.image,
    published: post.date,
    modified: post.dateModified,
  });
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
            <Link href="/about">{site.name} 편집</Link>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{post.date.replaceAll('-', '.')} 발행</time>
            {post.dateModified && (
              <time dateTime={post.dateModified}>
                {post.dateModified.replaceAll('-', '.')} 수정
              </time>
            )}
          </div>
        </header>
        <section className="guide-summary" aria-label="핵심 요약">
          <h2>핵심 요약</h2>
          <Checklist items={post.summary} />
        </section>
        <GuideCta
          category={category}
          from={post.href}
          placement="post-top"
          preset={post.helperPreset}
        />
        <div className="guide-article-layout">
          <article className="guide-article" aria-label={post.title}>
            <GuideToc post={post} mobile />
            {slug === 'measurement-basics' && <MeasurementSketch />}
            <div className="guide-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
            <section className="guide-preparation">
              <h2>상담 전에 준비할 내용</h2>
              <Checklist items={post.preparation} />
            </section>
            <div className="guide-article-footnote">
              <Ruler size={17} aria-hidden="true" />
              <div>
                <p>
                  입력 치수는 상담 준비용입니다. 제작 규격·원단·금액·설치 조건은 실측 및 견적
                  상담에서 확정하세요.
                </p>
                <p>
                  자료: {site.name} 편집 자료. 비교표·작성 예시는 선택과 상담 준비를 위한 자체
                  자료입니다. 제품별 사양과 현장 조건을 확인하세요.
                </p>
                <p>
                  신청 항목·절차는 연결된 신청 양식을 참고했습니다.{' '}
                  <Link href="/about#application-process">서비스 범위와 참고 출처</Link>
                </p>
              </div>
            </div>
          </article>
          <aside className="guide-article-sidebar">
            <div className="guide-sidebar-sticky">
              <GuideToc post={post} />
              <Link href={helperHref(post.helperPreset)} className="button button-secondary">
                치수 먼저 정리하기 <ArrowRight size={17} aria-hidden="true" />
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
