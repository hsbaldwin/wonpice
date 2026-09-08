import { analyticsEnabled } from '@/lib/analytics-config';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { site, absoluteUrl } from '@/lib/site';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { RouteFooter } from '@/components/route-footer';
import { Analytics } from '@/components/analytics';

const nanumSquareNeo = localFont({
  src: '../public/fonts/NanumSquareNeo-Variable.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-nanum-square-neo',
  fallback: ['Arial', 'Apple SD Gothic Neo', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  robots: { index: site.indexable, follow: true },
  openGraph: {
    title: site.name,
    description: site.description,
    locale: 'ko_KR',
    type: 'website',
    siteName: site.name,
    images: [{ url: absoluteUrl('/images/curtain-natural.webp'), width: 1120, height: 1400 }],
  },
  twitter: { card: 'summary_large_image', title: site.name, description: site.description },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth" className={nanumSquareNeo.variable}>
      <body>
        <a className="skip-link" href="#main">
          본문으로 바로가기
        </a>
        <SiteHeader />
        {children}
        <RouteFooter>
          <SiteFooter />
        </RouteFooter>
        {analyticsEnabled() && <Analytics />}
      </body>
    </html>
  );
}
