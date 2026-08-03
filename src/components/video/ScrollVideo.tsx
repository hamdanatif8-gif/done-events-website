import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject, SyntheticEvent } from 'react';
import { heroMedia } from '../../content/media';
import { matchesOnce } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useVideoScrub, type ScrubTier } from '../../hooks/useVideoScrub';
import { gsap } from '../../lib/gsap';
import { VideoFallback } from './VideoFallback';

interface ScrollVideoProps {
  /** The narrative section that owns the scroll distance. */
  triggerRef: RefObject<HTMLElement | null>;
  /** Fired as soon as a hero visual is presentable, so the arrival can start. */
  onReady: () => void;
}

const READY_TIMEOUT = 1200;
const MEDIA_ERR_ABORTED = 1;
const NETWORK_NO_SOURCE = 3;

type SourceMode = 'local' | 'remote';

/** Small or coarse-pointer devices get the throttled engine, never the full one. */
const pickInitialTier = (): Exclude<ScrubTier, 'off'> =>
  matchesOnce('(pointer: coarse)') || matchesOnce('(max-width: 820px)') ? 'throttled' : 'full';

/**
 * One fixed, scroll-scrubbed cinematic layer. There is no second video engine
 * anywhere on the page.
 */
export function ScrollVideo({ triggerRef, onReady }: ScrollVideoProps) {
  const reduced = useReducedMotion();

  const layerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const announcedRef = useRef(false);

  // Decided once. Resizing must never swap the source and re-download footage.
  const [initialTier] = useState(pickInitialTier);
  const [tier, setTier] = useState<ScrubTier>(initialTier);
  const [mode, setMode] = useState<SourceMode>('local');
  const [decodable, setDecodable] = useState(false);

  const effectiveTier: ScrubTier = reduced ? 'off' : tier;
  const showVideo = effectiveTier !== 'off';
  const sources =
    mode === 'remote'
      ? heroMedia.remote
      : effectiveTier === 'throttled'
        ? heroMedia.mobile
        : heroMedia.desktop;

  const announceReady = useCallback(() => {
    if (announcedRef.current) return;
    announcedRef.current = true;
    onReady();
  }, [onReady]);

  // Content never waits on media. If the poster is slow, the arrival runs anyway.
  useEffect(() => {
    const id = window.setTimeout(announceReady, READY_TIMEOUT);
    return () => window.clearTimeout(id);
  }, [announceReady]);

  const handleUnstable = useCallback(() => {
    setTier('off');
    setDecodable(false);
  }, []);

  useVideoScrub({
    videoRef,
    triggerRef,
    tier: effectiveTier,
    ready: decodable,
    onUnstable: handleUnstable,
  });

  // Readiness: finite duration plus one decoded frame before any scrubbing.
  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let rvfcHandle = 0;

    const confirm = () => {
      if (cancelled) return;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      setDecodable(true);
      announceReady();
    };

    const onMetadata = () => {
      if (cancelled || !Number.isFinite(video.duration) || video.duration <= 0) return;
      // Nudge the decoder so a real frame exists before the poster hands over.
      try {
        video.currentTime = 0.001;
      } catch {
        /* retried by the readiness events below */
      }
      // iOS will not paint a video that has never played, even when seeking.
      const played = video.play();
      if (played && typeof played.then === 'function') {
        played.then(() => video.pause()).catch(() => undefined);
      }
    };

    if ('requestVideoFrameCallback' in video) {
      rvfcHandle = video.requestVideoFrameCallback(confirm);
    }

    video.addEventListener('loadedmetadata', onMetadata);
    video.addEventListener('seeked', confirm);
    video.addEventListener('loadeddata', confirm);
    video.addEventListener('canplay', confirm);

    if (video.readyState >= 1) onMetadata();
    if (video.readyState >= 2) confirm();

    return () => {
      cancelled = true;
      if (rvfcHandle && 'cancelVideoFrameCallback' in video) {
        video.cancelVideoFrameCallback(rvfcHandle);
      }
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('seeked', confirm);
      video.removeEventListener('loadeddata', confirm);
      video.removeEventListener('canplay', confirm);
    };
  }, [showVideo, mode, effectiveTier, announceReady]);

  // The settle: the cinematic layer recedes into near-black as Capabilities arrives.
  useEffect(() => {
    const layer = layerRef.current;
    const trigger = triggerRef.current;
    if (!layer || !trigger || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        layer,
        { opacity: 1 },
        {
          opacity: 0.08,
          ease: 'power1.in',
          scrollTrigger: { trigger, start: '84% top', end: 'bottom bottom', scrub: 0.8 },
        }
      );
    });

    return () => ctx.revert();
  }, [triggerRef, reduced]);

  const handleError = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const element = event.currentTarget;
      const code = element.error?.code;

      // An element detached mid-request aborts its own download. That is not a
      // media failure and must not trigger a fallback.
      if (code === MEDIA_ERR_ABORTED) return;
      if (code === undefined && element.networkState !== NETWORK_NO_SOURCE) return;

      // Local encodes missing — fall back to the supplied remote asset once.
      if (mode === 'local') {
        setMode('remote');
        setDecodable(false);
        return;
      }
      setTier('off');
      setDecodable(false);
    },
    [mode]
  );

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[var(--z-video)] overflow-hidden bg-[var(--nova-black)]"
    >
      <VideoFallback
        poster={heroMedia.poster}
        drift={!reduced && !decodable}
        triggerRef={triggerRef}
        onLoaded={announceReady}
      />

      {showVideo ? (
        <video
          key={mode}
          ref={videoRef}
          poster={heroMedia.poster}
          muted
          playsInline
          preload={effectiveTier === 'throttled' ? 'metadata' : 'auto'}
          disablePictureInPicture
          tabIndex={-1}
          onError={handleError}
          className="absolute inset-0 size-full origin-center scale-[1.02] object-cover transition-opacity duration-[700ms] ease-out"
          style={{ opacity: decodable ? 1 : 0 }}
        >
          {/* One element, two candidate encodes. The browser fetches one. */}
          {sources.map((candidate) => (
            <source key={candidate.src} src={candidate.src} type={candidate.type} />
          ))}
        </video>
      ) : null}

      {/* One readability gradient. No permanent blur anywhere. */}
      <div className="nova-readability absolute inset-0" />
      <div className="nova-grain absolute inset-0 mix-blend-overlay" />
    </div>
  );
}
