import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Plus } from 'lucide-react';
import { categories, getCategory, getPosts } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { getGuideImage } from '@/lib/guide-images';
import { GuideImage } from '@/components/guide-image';
import {
  Breadcrumbs,
  Checklist,
  GuideCta,
  GuideStructuredData,
  PostCard,
} from '@/components/guide-ui';

type Props = { params: Promise<{ category: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return pageMetadata({
    title: category.seoTitle,
    description: category.description,
    path: `/guides/${category.slug}`,
    image: getGuideImage(category.slug).src,
  });
}
export default async function CategoryPage({ params }: Props) {
  const category = getCategory((await params).category);
  if (!category) notFound();
  const posts = await getPosts(category.slug);
  const route = `/guides/${category.slug}`;
  const breadcrumbs = [
    { name: '커튼 가이드', href: '/guides' },
    { name: category.navTitle, href: route },
  ];
  return (
    <main id="main" className="guide-main">
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
        <section className="guide-category-hero guide-category-editorial">
          <div className="guide-category-intro">
            <span className="eyebrow">{category.navTitle} 가이드</span>
            <h1>
              {category.title.split('\n').map((line, i) => (
                <span key={line} className={i ? 'guide-heading-soft' : undefined}>
                  {line}
                </span>
              ))}
            </h1>
            <p>{category.lead}</p>
            <a className="guide-editorial-link" href="#guide-comparison">
              선택 기준 비교하기 <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <GuideImage
            category={category.slug}
            className="guide-category-cover"
            sizes="(max-width: 800px) calc(100vw - 48px), (max-width: 1500px) 48vw, 700px"
            preload
          />
        </section>
        <section className="guide-category-reading" aria-labelledby="category-reading-title">
          <div className="guide-section-title">
            <div>
              <h2 id="category-reading-title">지금 궁금한 내용부터 읽어보세요</h2>
            </div>
            <Link href="/guides" className="text-link">
              전체 가이드 <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="guide-post-grid">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} thumbnail />
            ))}
          </div>
        </section>
        <section aria-label="핵심 선택 기준" className="guide-point-grid">
          {category.points.map((point, index) => (
            <div className="guide-point" key={point.title}>
              <span className="guide-point-number">0{index + 1}</span>
              <h2>{point.title}</h2>
              <p>{point.text}</p>
            </div>
          ))}
        </section>
        <GuideCta category={category} from={route} placement="guide-top" />
        <section id="guide-comparison" className="guide-comparison-section">
          <div className="guide-section-title">
            <div>
              <h2>{category.comparison.heading}</h2>
            </div>
            <span className="guide-caption">기능과 조건으로 비교하세요</span>
          </div>
          <p className="guide-scroll-hint">표는 좌우로 스크롤할 수 있습니다.</p>
          <div
            className="guide-table-wrap"
            role="region"
            aria-label={`${category.comparison.heading} 비교표`}
            tabIndex={0}
          >
            <table className="guide-table">
              <caption className="guide-visually-hidden">{category.comparison.heading}</caption>
              <thead>
                <tr>
                  {category.comparison.columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {category.comparison.rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="guide-check-faq">
          <div className="guide-check-panel">
            <h2>상담 전 체크리스트</h2>
            <Checklist items={category.checklist} />
          </div>
          <div className="guide-faq">
            <h2>조금 더 궁금하다면</h2>
            {category.faq.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <Plus size={17} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <GuideCta category={category} from={route} />
        <GuideStructuredData
          items={breadcrumbs}
          collection={{
            name: category.keywords.join('·') + ' 가이드',
            description: category.description,
            href: route,
          }}
        />
      </div>
    </main>
  );
}
