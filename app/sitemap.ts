import type { MetadataRoute } from 'next';
import { categories, getPosts } from '@/lib/content';
import { getGuideImage, getImageBySrc } from '@/lib/guide-images';
import { absoluteUrl, site } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!site.indexable) return [];
  const posts = await getPosts();
  return [
    {
      url: absoluteUrl('/'),
      changeFrequency: 'monthly',
      priority: 1,
      images: ['living-room', 'bedroom', 'newlywed-home'].map((slug) =>
        absoluteUrl(getGuideImage(slug).src),
      ),
    },
    {
      url: absoluteUrl('/guides'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: categories.map((category) => absoluteUrl(getGuideImage(category.slug).src)),
    },
    ...categories.map((category) => ({
      url: absoluteUrl(`/guides/${category.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [absoluteUrl(getGuideImage(category.slug).src)],
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(post.href),
      lastModified: post.dateModified || post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      images: [absoluteUrl(getImageBySrc(post.image).src)],
    })),
    {
      url: absoluteUrl('/about'),
      changeFrequency: 'yearly',
      priority: 0.3,
      images: [absoluteUrl(getGuideImage('companies').src)],
    },
  ];
}
