'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export function RouteFooter({ children }: { children: ReactNode }) {
  return usePathname() === '/' ? null : children;
}
