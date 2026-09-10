import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Ruler,
  Layers3,
  House,
  Moon,
  Sparkles,
  ClipboardCheck,
} from 'lucide-react';
import { getCategory, helperHref, type ContentPost, type GuideCategory } from '@/lib/content';
import { absoluteUrl, site } from '@/lib/site';
import { AffiliateLink } from '@/components/affiliate-link';
import { GuideImage } from '@/components/guide-image';
import { getImageBySrc } from '@/lib/guide-images';

export function GuideIcon({ category, size = 24 }: { category: string; size?: number }) {
  const Icon =
    {
      installation: Ruler,
      companies: ClipboardCheck,
      interior: Layers3,
      'living-room': House,
      bedroom: Moon,
      'newlywed-home': Sparkles,
    }[category] || Ruler;
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="현재 위치" className="guide-breadcrumb">
      <ol>
        {[{ name: '홈', href: '/' }, ...items].map((item, i) => (
          <li key={item.href}>
            {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
            {i === items.length ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.href}>{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function GuideStructuredData({
  items,
  article,
  collection,
}: {
  items: { name: string; href: string }[];
  article?: ContentPost;
  collection?: {
    name: string;
    description: string;
    href: string;
    entries: { title: string; href: string }[];
  };
}) {
  const data: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: '홈', href: '/' }, ...items].map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: absoluteUrl(item.href),
      })),
    },
  ];
  if (article)
    data.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': absoluteUrl(`${article.href}#article`),
      headline: article.title,
      description: article.description,
      datePublished: `${article.date}T00:00:00+09:00`,
      dateModified: `${article.dateModified || article.date}T00:00:00+09:00`,
      image: absoluteUrl(article.image || '/images/curtain-natural.webp'),
      inLanguage: 'ko-KR',
      mainEntityOfPage: absoluteUrl(article.href),
      isPartOf: { '@id': absoluteUrl('/#website') },
      author: {
        '@type': 'Organization',
        '@id': absoluteUrl('/about#editorial-method'),
        name: site.editorialName,
        url: absoluteUrl('/about#editorial-method'),
      },
      publisher: {
        '@type': 'Organization',
        '@id': absoluteUrl('/#publisher'),
        name: site.name,
        url: absoluteUrl('/'),
      },
    });
  if (collection)
    data.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': absoluteUrl(`${collection.href}#webpage`),
      name: collection.name,
      description: collection.description,
      url: absoluteUrl(collection.href),
      inLanguage: 'ko-KR',
      isPartOf: { '@id': absoluteUrl('/#website') },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: collection.entries.length,
        itemListElement: collection.entries.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: entry.title,
          url: absoluteUrl(entry.href),
        })),
      },
    });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export function CategoryCard({ category, count }: { category: GuideCategory; count?: number }) {
  return (
    <Link href={`/guides/${category.slug}`} className="guide-category-card">
      <GuideImage
        category={category.slug}
        className="guide-card-image"
        sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 1100px) 44vw, (max-width: 1500px) 29vw, 432px"
      />
      <div className="guide-category-card-copy">
        <div className="guide-category-card-heading">
          <h3>{category.navTitle}</h3>
          <GuideIcon category={category.slug} size={21} />
        </div>
        <p>
          {
            {
              installation: '창 크기와 레일, 설치 전에 무엇을 확인해야 할까요?',
              companies: '견적 금액이 다르면 어떤 항목부터 비교해야 할까요?',
              interior: '쉬폰·암막·블라인드 중 어떤 구성이 맞을까요?',
              'living-room': '채광·TV 반사·외부 시선을 어떻게 조절할까요?',
              bedroom: '수면 시간에 맞는 암막과 빛샘 대책은 무엇일까요?',
              'newlywed-home': '방별 요구사항과 입주 일정을 어떻게 준비할까요?',
            }[category.slug]
          }
        </p>
        <span className="guide-card-bottom">
          <span>{count !== undefined ? `${count}개의 가이드` : '선택 기준 살펴보기'}</span>
          <ArrowRight size={18} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function PostCard({ post, thumbnail = false }: { post: ContentPost; thumbnail?: boolean }) {
  const category = getCategory(post.category)!;
  return (
    <Link
      className={`guide-post-card${thumbnail ? ' guide-post-card-with-image' : ''}`}
      href={post.href}
    >
      {thumbnail && post.image && (
        <GuideImage
          image={getImageBySrc(post.image)}
          className="guide-post-thumbnail"
          sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 1100px) 44vw, 30vw"
        />
      )}
      <div className="guide-post-card-copy">
        <div className="guide-post-card-top">
          <span className="guide-post-category">{category.navTitle}</span>
          <ArrowRight size={18} aria-hidden="true" />
        </div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <span className="guide-post-intent">
          {post.ctaIntent === 'helper' ? '선택을 돕는 가이드' : '상담을 준비하는 가이드'}
        </span>
      </div>
    </Link>
  );
}

export function GuideCta({
  category,
  placement = 'guide-bottom',
  intent,
  preset,
  title,
  description,
}: {
  category: GuideCategory;
  from: string;
  placement?: string;
  intent?: 'helper' | 'apply';
  preset?: GuideCategory['helperPreset'];
  title?: string;
  description?: string;
}) {
  const bottom = placement.endsWith('bottom');
  const action = bottom ? 'apply' : (intent ?? category.ctaIntent);
  const preparationHref = helperHref(preset ?? category.helperPreset);
  return (
    <section
      className={`guide-cta ${bottom ? '' : 'guide-cta-compact'}`}
      aria-label="견적 신청 안내"
    >
      <div>
        <h2>
          {title ??
            (bottom
              ? '준비한 내용으로 상담을 이어가세요'
              : action === 'helper'
                ? '읽은 기준을 우리 집 조건으로 정리하세요'
                : '확인할 조건이 정리됐다면 상담을 이어가세요')}
        </h2>
        <p>
          {description ??
            (action === 'helper'
              ? '창 치수와 필요한 기능을 도우미에 기록할 수 있습니다.'
              : '제품 구성과 설치 조건을 견적 상담에서 확인하세요.')}
        </p>
        {action === 'apply' && (
          <p className="guide-cta-note">이름·연락처·제품 종류·창문 개수·설치 주소를 준비하세요.</p>
        )}
        <p className="guide-cta-note">
          입력한 치수와 요구사항은 신청 양식에 자동 전달되지 않습니다. 상담할 때 직접 공유하세요.
        </p>
        {bottom && (
          <p className="guide-cta-note">
            이 링크를 통한 신청으로 운영자에게 수수료가 발생할 수 있습니다.
          </p>
        )}
      </div>
      <div className="guide-cta-actions">
        {action === 'helper' && (
          <Link className="button button-primary" href={preparationHref}>
            우리 집 치수 정리하기 <ArrowRight size={18} aria-hidden="true" />
          </Link>
        )}
        <AffiliateLink
          className={action === 'apply' ? 'button button-primary' : 'guide-simple-link'}
          cta={placement}
          category={category.slug}
        >
          무료 견적 신청 <ArrowRight size={18} aria-hidden="true" />
        </AffiliateLink>
        {action === 'apply' && (
          <Link className="guide-simple-link" href={preparationHref}>
            치수 먼저 정리하기 <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}

export function GuideToc({ post, mobile = false }: { post: ContentPost; mobile?: boolean }) {
  if (post.headings.length < 3) return null;
  const links = (
    <ol>
      {post.headings.map((heading) => (
        <li key={heading.id}>
          <a href={`#${heading.id}`}>{heading.text}</a>
        </li>
      ))}
    </ol>
  );
  return mobile ? (
    <details className="guide-toc guide-toc-mobile">
      <summary>이 글의 목차</summary>
      <nav aria-label="글 목차">{links}</nav>
    </details>
  ) : (
    <nav className="guide-toc" aria-label="글 목차">
      <h2>이 글의 목차</h2>
      {links}
    </nav>
  );
}

export function MeasurementSketch() {
  return (
    <figure className="guide-measure-figure">
      <svg
        className="guide-measure-svg"
        viewBox="0 0 390 238"
        role="img"
        aria-labelledby="guide-measure-title"
      >
        <title id="guide-measure-title">
          가로는 좌우, 세로는 위아래로 재고 창문 치수와 설치 범위를 구분하는 그림
        </title>
        <defs>
          <pattern id="guide-folds" width="13" height="13" patternUnits="userSpaceOnUse">
            <path d="M1 0v13" stroke="#d5dce2" strokeWidth="4" />
          </pattern>
        </defs>
        <rect x="26" y="8" width="338" height="220" rx="10" fill="#f0f3f5" />
        <rect
          x="85"
          y="54"
          width="220"
          height="148"
          rx="1"
          fill="#dbe9ef"
          stroke="#acbdc5"
          strokeWidth="5"
        />
        <path d="M195 55v145M86 131h218" stroke="#b4c5cd" strokeWidth="4" />
        <path d="M53 37h284" stroke="#647782" strokeWidth="4" strokeLinecap="round" />
        <path
          d="M63 41h43l-6 159H63zM284 41h43v159h-36z"
          fill="url(#guide-folds)"
          stroke="#c1ccd4"
        />
        <path
          d="M85 22h220m-220-5v10m220-10v10M346 53v148m-5-148h10m-10 148h10"
          stroke="#3a647e"
          strokeWidth="1.5"
        />
        <rect x="177" y="12" width="36" height="19" rx="8" fill="#f0f3f5" />
        <text x="195" y="25" textAnchor="middle" fontSize="14" fill="#3a647e">
          가로
        </text>
        <rect x="334" y="115" width="25" height="20" rx="6" fill="#f0f3f5" />
        <text x="346" y="129" textAnchor="middle" fontSize="14" fill="#3a647e">
          세로
        </text>
        <path d="M59 208h272" stroke="#bac6ce" />
        <text x="195" y="223" textAnchor="middle" fontSize="14" fill="#687d8d">
          측정 방향을 보여주는 예시 · 제작 치수 아님
        </text>
      </svg>
      <figcaption>어디를 쟀는지, 치수 기준까지 함께 남기세요.</figcaption>
    </figure>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="guide-checklist">
      {items.map((item) => (
        <li key={item}>
          <Check size={16} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
