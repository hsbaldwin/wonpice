'use client';

import { useEffect, useRef, useState } from 'react';
import { enhanceLoopVideo, type LoopVideoStatus } from '@/lib/loop-video';
import './loop-video.css';

type LoopVideoProps = {
  src: string;
  mobileSrc?: string;
  poster: string;
  mobilePoster?: string;
  className?: string;
  priority?: boolean;
};

export function LoopVideo({
  src,
  mobileSrc,
  poster,
  mobilePoster,
  className,
  priority = false,
}: LoopVideoProps) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<LoopVideoStatus>('poster');

  useEffect(() => {
    if (!frame.current || !video.current) return;
    setStatus('poster');
    const controller = enhanceLoopVideo({
      frame: frame.current,
      video: video.current,
      src,
      mobileSrc,
      onStatus: setStatus,
    });
    return () => controller.destroy();
  }, [src, mobileSrc]);

  return (
    <div
      ref={frame}
      className={`loop-video${className ? ` ${className}` : ''}`}
      data-playing={status === 'playing'}
      data-video-status={status}
    >
      <video
        ref={video}
        className="loop-video-media"
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
      />
      {/* A plain, already optimized local poster also works before hydration or without JS. */}
      <picture>
        {mobilePoster && <source media="(max-width: 1023px)" srcSet={mobilePoster} />}
        <img
          className="loop-video-poster"
          src={poster}
          alt=""
          aria-hidden="true"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
      </picture>
    </div>
  );
}
