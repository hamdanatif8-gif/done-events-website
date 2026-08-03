import { useEffect } from 'react';
import type { RefObject } from 'react';
import { ScrollTrigger } from '../lib/gsap';

export type ScrubTier = 'full' | 'throttled' | 'off';

interface UseVideoScrubOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
  tier: ScrubTier;
  /** Only true once the element reports a finite duration and a decoded frame. */
  ready: boolean;
  /** Called when seeking repeatedly stalls, so the caller can drop to poster. */
  onUnstable?: () => void;
}

interface TierProfile {
  /** Interpolation factor applied every animation frame. */
  smoothing: number;
  /** Minimum time delta, in seconds, that justifies a seek. */
  threshold: number;
  /** Minimum wall-clock gap, in ms, between two seeks. */
  minGap: number;
}

const PROFILES: Record<Exclude<ScrubTier, 'off'>, TierProfile> = {
  full: { smoothing: 0.12, threshold: 0.03, minGap: 0 },
  throttled: { smoothing: 0.18, threshold: 0.09, minGap: 70 },
};

const STALL_MS = 1200;
const STALL_LIMIT = 3;

/**
 * Drives `video.currentTime` from scroll progress.
 *
 * Progress is read from a single ScrollTrigger, smoothed on a requestAnimation-
 * Frame loop and only committed when the delta is large enough to be worth a
 * seek. No React state is touched per frame, no frames are extracted, and all
 * work stops while the document is hidden.
 */
export function useVideoScrub({
  videoRef,
  triggerRef,
  tier,
  ready,
  onUnstable,
}: UseVideoScrubOptions): void {
  useEffect(() => {
    const video = videoRef.current;
    const trigger = triggerRef.current;
    if (!video || !trigger || tier === 'off' || !ready) return;

    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;

    const profile = PROFILES[tier];
    const span = Math.max(0.05, duration - 0.05);

    let target = 0;
    let smoothed = 0;
    let frame = 0;
    let lastSeekAt = 0;
    let seekStartedAt = 0;
    let stalls = 0;
    let suspended = document.hidden;
    let disposed = false;

    const scrollTrigger = ScrollTrigger.create({
      trigger,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        target = self.progress;
      },
      onRefresh: (self) => {
        target = self.progress;
      },
    });

    target = scrollTrigger.progress;
    smoothed = target;

    const giveUp = () => {
      if (disposed) return;
      disposed = true;
      onUnstable?.();
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (suspended || disposed) return;

      smoothed += (target - smoothed) * profile.smoothing;
      if (Math.abs(target - smoothed) < 0.0005) smoothed = target;

      const now = performance.now();

      // A seek that never resolves is the classic mobile failure mode.
      if (video.seeking) {
        if (seekStartedAt && now - seekStartedAt > STALL_MS) {
          stalls += 1;
          seekStartedAt = now;
          if (stalls >= STALL_LIMIT) giveUp();
        }
        return;
      }
      seekStartedAt = 0;

      if (profile.minGap > 0 && now - lastSeekAt < profile.minGap) return;

      const wanted = smoothed * span;
      if (Math.abs(wanted - video.currentTime) < profile.threshold) return;

      lastSeekAt = now;
      seekStartedAt = now;
      try {
        video.currentTime = wanted;
      } catch {
        // A seek can throw while the element is re-buffering; the next frame retries.
      }
    };

    const onVisibility = () => {
      suspended = document.hidden;
      // Snap on resume so the video never plays catch-up across a long gap.
      if (!suspended) smoothed = target;
    };

    document.addEventListener('visibilitychange', onVisibility);
    frame = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', onVisibility);
      scrollTrigger.kill();
    };
  }, [videoRef, triggerRef, tier, ready, onUnstable]);
}
