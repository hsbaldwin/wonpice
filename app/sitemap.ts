import type { MetadataRoute } from 'next';
import { categories, getPosts } from '@/lib/content';
import { absoluteUrl, site } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!site.indexable) return [];
  const posts = await getPosts();
  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/guides'), changeFrequency: 'monthly', priority: 0.8 },
    ...categories.map((category) => ({
      url: absoluteUrl(`/guides/${category.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(post.href),
      lastModified: post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: absoluteUrl('/about'), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
