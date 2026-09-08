'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AffiliateLink } from './affiliate-link';
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const dismissOnScroll = () => setOpen(false);
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    window.addEventListener('scroll', dismissOnScroll, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
      window.removeEventListener('scroll', dismissOnScroll);
    };
  }, [open]);

  if (path === '/') return null;

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container header-inner">
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle icon-button"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>
        <nav id="site-menu" className="main-nav" aria-label="주 메뉴" hidden={!open}>
          <Link href="/" onClick={() => setOpen(false)}>
            홈 <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/guides"
            aria-current={path.startsWith('/guides') ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            커튼 가이드 <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/about"
            aria-current={path === '/about' ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            서비스·제휴 안내 <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
        <AffiliateLink cta="home-header" className="header-apply">
          견적 문의 <ArrowUpRight size={14} />
        </AffiliateLink>
      </div>
    </header>
  );
}
