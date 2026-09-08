'use client';
import { AnchorHTMLAttributes } from 'react';
import { usePathname } from 'next/navigation';
import { sessionId } from '@/lib/analytics-client';
export function AffiliateLink({
  cta = 'home-direct',
  category,
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { cta?: string; category?: string }) {
  const path = usePathname();
  const params = new URLSearchParams({ path, cta, ...(category ? { category } : {}) });
  return (
    <a
      {...props}
      className={className}
      href={`/go/quote?${params}`}
      target="_blank"
      rel="sponsored noopener"
      onClick={(e) => {
        const url = new URL(e.currentTarget.href);
        url.searchParams.set('clickid', crypto.randomUUID());
        url.searchParams.set('sessionId', sessionId());
        e.currentTarget.href = url.toString();
      }}
    >
      {children}
    </a>
  );
}
