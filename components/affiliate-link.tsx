'use client';
import { AnchorHTMLAttributes, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { sessionId, landingPath, track } from '@/lib/analytics-client';
import { analyticsEnabled } from '@/lib/analytics-config';
export function AffiliateLink({
  cta = 'home-direct',
  category,
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { cta?: string; category?: string }) {
  const path = usePathname();
  const link = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!analyticsEnabled() || !link.current || !window.IntersectionObserver) return;
    let visible = false;
    let sent = false;
    const record = () => {
      if (!sent && visible && document.visibilityState === 'visible') {
        sent = true;
        track('quote_cta_view', { cta, category }, path);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        record();
      },
      { threshold: [0, 0.5] },
    );
    observer.observe(link.current);
    document.addEventListener('visibilitychange', record);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', record);
    };
  }, [path, cta, category]);
  const prepare = (anchor: HTMLAnchorElement) => {
    if (!analyticsEnabled()) return;
    const url = new URL(anchor.href);
    url.searchParams.set('clickid', crypto.randomUUID());
    url.searchParams.set('sessionId', sessionId());
    const landing = landingPath();
    if (landing) url.searchParams.set('landingPath', landing);
    anchor.href = url.toString();
  };
  const params = new URLSearchParams({ path, cta, ...(category ? { category } : {}) });
  return (
    <a
      {...props}
      ref={link}
      className={className}
      href={`/go/quote?${params}`}
      target="_blank"
      rel="sponsored noopener"
      onClick={(e) => {
        props.onClick?.(e);
        if (!e.defaultPrevented) prepare(e.currentTarget);
      }}
      onAuxClick={(e) => {
        props.onAuxClick?.(e);
        if (e.button === 1 && !e.defaultPrevented) prepare(e.currentTarget);
      }}
      onContextMenu={(e) => {
        props.onContextMenu?.(e);
        if (!e.defaultPrevented) prepare(e.currentTarget);
      }}
    >
      {children}
    </a>
  );
}
