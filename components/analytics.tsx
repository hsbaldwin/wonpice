'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { initAnalytics, track } from '@/lib/analytics-client';
import { observePageEngagement } from '@/lib/analytics-engagement';
export function Analytics() {
  const path = usePathname();
  const last = useRef('');
  useEffect(() => initAnalytics(), []);
  useEffect(() => {
    if (last.current !== path && !path.startsWith('/admin')) {
      last.current = path;
      track('page_view', { category: path.split('/')[2] || undefined });
    }
  }, [path]);
  useEffect(() => observePageEngagement(path), [path]);
  return null;
}
