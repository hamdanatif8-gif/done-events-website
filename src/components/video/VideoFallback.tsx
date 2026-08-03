import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { gsap } from '../../lib/gsap';

interface VideoFallbackProps {
  poster: string;
  /** Adds a light scrubbed drift so the still never feels frozen. */
  drift: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  onLoaded: () => void;
}

/**
 * The poster layer. It sits underneath the video at all times, and becomes the
 * whole experience when scrubbing is unavailable or unwanted.
 */
export function VideoFallback({ poster, drift, triggerRef, onLoaded }: VideoFallbackProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const trigger = triggerRef.current;
    if (!drift || !image || !trigger) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { scale: 1.04, yPercent: 0 },
        {
          scale: 1.13,
          yPercent: -2.5,
          ease: 'none',
          scrollTrigger: { trigger, start: 'top top', end: 'bottom bottom', scrub: 1 },
        }
      );
    });

    return () => ctx.revert();
  }, [drift, triggerRef]);

  return (
    <img
      ref={imageRef}
      src={poster}
      alt=""
      aria-hidden="true"
      decoding="async"
      fetchPriority="high"
      onLoad={onLoaded}
      onError={onLoaded}
      className="absolute inset-0 size-full origin-center scale-[1.04] object-cover"
    />
  );
}
