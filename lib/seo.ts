import type { Metadata } from 'next';
import { absoluteUrl, site } from './site';
import type { GuideImage } from './guide-images';

/** Each page supplies the complete social metadata because nested metadata is replaced. */
export function pageMetadata({
  title,
  description,
  path,
  image = '/images/curtain-natural.webp',
  published,
  modified,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | GuideImage;
  published?: string;
  modified?: string;
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  const imageUrl = absoluteUrl(typeof image === 'string' ? image : image.src);
  const imageMetadata =
    typeof image === 'string'
      ? { url: imageUrl, alt: title }
      : { url: imageUrl, alt: image.alt, width: image.width, height: image.height };
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: site.indexable, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: site.name,
      locale: 'ko_KR',
      type: published ? 'article' : 'website',
      images: [imageMetadata],
      ...(published
        ? {
            publishedTime: `${published}T00:00:00+09:00`,
            modifiedTime: `${modified || published}T00:00:00+09:00`,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageMetadata],
    },
  };
}
