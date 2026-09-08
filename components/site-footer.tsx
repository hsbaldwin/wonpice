import Link from 'next/link';
import { site } from '@/lib/site';

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  return (
    <footer className={`site-footer${compact ? ' site-footer-compact' : ''}`} role="contentinfo">
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <nav className="footer-nav" aria-label="하단 메뉴">
          <Link href="/">홈</Link>
          <Link href="/guides">커튼 가이드</Link>
          <Link href="/about">서비스 안내</Link>
        </nav>
      </div>
    </footer>
  );
}
