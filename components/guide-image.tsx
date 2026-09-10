import Image from 'next/image';
import { getGuideImage, type GuideImage as GuideImageData } from '@/lib/guide-images';

export function GuideImage({
  category,
  image,
  sizes,
  className = '',
  preload = false,
}: {
  category?: string;
  image?: GuideImageData;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  const asset = image ?? getGuideImage(category ?? 'interior');
  return (
    <figure className={`guide-editorial-image ${className}`}>
      <div className="guide-editorial-image-frame">
        <Image
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          sizes={sizes}
          preload={preload}
        />
      </div>
      <figcaption>{asset.caption}</figcaption>
    </figure>
  );
}
