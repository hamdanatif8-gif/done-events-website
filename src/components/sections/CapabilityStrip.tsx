import { useEffect, useRef } from 'react';
import { connectedTerms } from '../../content/capabilities';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const CYCLE_SECONDS = 44;

function StripRow({ bright }: { bright: boolean }) {
  // Duplicated exactly once — enough for a seamless -50% loop, no more.
  const run = [...connectedTerms, ...connectedTerms];

  return (
    <div className="strip-track" style={{ opacity: bright ? 1 : 0.42 }}>
      {run.map((term, index) => (
        <span key={`${term}-${index}`} className="flex items-center whitespace-nowrap">
          <span className="font-serif text-[clamp(2rem,4.4vw,3.9rem)] italic leading-none tracking-[-0.03em] text-white">
            {term}
          </span>
          <span className="mx-[clamp(20px,3vw,52px)] text-[0.7rem] font-normal tracking-[0.3em] text-white/30">
            /
          </span>
        </span>
      ))}
    </div>
  );
}

export function CapabilityStrip() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (reduced || !root) return;

    const ctx = gsap.context(() => {
      const tracks = Array.from(root.querySelectorAll<HTMLElement>('.strip-track'));
      if (tracks.length === 0) return;

      const tween = gsap.to(tracks, {
        xPercent: -50,
        duration: CYCLE_SECONDS,
        ease: 'none',
        repeat: -1,
      });

      // Only runs while on screen and while the tab is visible.
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
      });

      const onVisibility = () => {
        if (document.hidden) tween.pause();
        else if (trigger.isActive) tween.play();
      };
      document.addEventListener('visibilitychange', onVisibility);

      if (!trigger.isActive) tween.pause();

      return () => document.removeEventListener('visibilitychange', onVisibility);
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      aria-label="What Nova connects"
      className="relative z-[var(--z-page)] overflow-hidden bg-[var(--nova-black)] pb-[clamp(72px,10vh,128px)]"
    >
      <div className="nova-shell mb-9">
        <p className="type-meta text-white/40">What Nova connects</p>
      </div>

      {/* The marquee itself is decorative; this is the readable equivalent. */}
      {reduced ? null : (
        <ul className="sr-only">
          {connectedTerms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      )}

      {reduced ? (
        <div className="nova-shell">
          <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {connectedTerms.map((term) => (
              <li
                key={term}
                className="font-serif text-[clamp(1.7rem,3.4vw,2.9rem)] italic leading-tight tracking-[-0.03em] text-white/80"
              >
                {term}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div ref={rootRef} className="relative" aria-hidden="true">
          <StripRow bright={false} />

          {/* A soft focal band: the same run at full brightness, revealed only
              through a centred mask, so terms brighten as they pass through. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              maskImage:
                'radial-gradient(38% 130% at 50% 50%, #000 0%, rgba(0,0,0,0.65) 45%, transparent 78%)',
              WebkitMaskImage:
                'radial-gradient(38% 130% at 50% 50%, #000 0%, rgba(0,0,0,0.65) 45%, transparent 78%)',
            }}
          >
            <StripRow bright />
          </div>

          {/* Edge fades back into the page colour. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[16vw] bg-gradient-to-r from-[var(--nova-black)] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-[16vw] bg-gradient-to-l from-[var(--nova-black)] to-transparent"
          />
        </div>
      )}
    </section>
  );
}
