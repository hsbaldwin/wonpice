import type { MetadataRoute } from 'next';
import { absoluteUrl, site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin', '/go/', '/saved'] },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
