import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { QuoteHelper } from '@/components/quote-helper';
import { LoopVideo } from '@/components/loop-video';
import { SiteFooter } from '@/components/site-footer';
import { absoluteUrl, site } from '@/lib/site';
import './home.css';
import './spaces-fit.css';
import './helper-fit.css';

export const metadata = pageMetadata({
  title: '맞춤커튼 사이즈·기능 정리',
  description: site.description,
  path: '/',
});
const spaces = [
  {
    title: '거실커튼',
    description: '햇살은 부드럽게, 공간은 넓게.',
    slug: 'living-room',
    image: '/images/guide-living-room.webp',
    alt: '넓은 창의 흰 쉬폰 커튼과 밝은 소파가 있는 거실',
  },
  {
    title: '침실커튼',
    description: '쉼이 필요한 공간에 아늑함을.',
    slug: 'bedroom',
    image: '/images/guide-bedroom.webp',
    alt: '베이지색 커튼과 침대가 놓인 은은한 빛의 침실',
  },
  {
    title: '신혼집커튼',
    description: '두 사람의 취향을 한 공간에.',
    slug: 'newlywed-home',
    image: '/images/guide-newlywed-home.webp',
    alt: '크림색과 옅은 세이지색 이중커튼 옆에 작은 원형 식탁과 의자 두 개가 놓인 아담한 공간',
  },
];
export default function Home() {
  return (
    <main id="main" data-home-story>
      <section
        id="scene-helper"
        className="story-scene story-helper"
        data-story-scene
        aria-label="견적 도우미"
      >
        <LoopVideo
          className="helper-background"
          src="/videos/curtain-helper-daylight.mp4"
          mobileSrc="/videos/curtain-helper-daylight-mobile.mp4"
          poster="/images/curtain-helper-daylight-poster.webp"
          mobilePoster="/images/curtain-helper-daylight-mobile-poster.webp"
          priority
        />
        <div className="container">
          <QuoteHelper />
        </div>
      </section>
      <section
        id="scene-spaces"
        className="story-scene story-spaces"
        data-story-scene
        aria-labelledby="spaces-title"
      >
        <div className="container spaces-content">
          <div className="section-heading">
            <h2 id="spaces-title">
              공간을 알면, <span>선택이 쉬워져요.</span>
            </h2>
            <Link href="/guides" className="text-link">
              모든 가이드 <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="space-grid">
            {spaces.map((s) => (
              <Link href={`/guides/${s.slug}`} className="space-card" key={s.slug}>
                <div className="space-image">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    width={1200}
                    height={800}
                    sizes="(min-width: 600px) and (max-height: 500px) 30vw, (max-width: 767px) 88px, (max-width: 1216px) 30vw, 352px"
                  />
                </div>
                <div className="space-copy">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
                <span className="space-arrow" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <SiteFooter compact />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site.name,
            url: absoluteUrl(),
            description: site.description,
            inLanguage: 'ko-KR',
          }).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
