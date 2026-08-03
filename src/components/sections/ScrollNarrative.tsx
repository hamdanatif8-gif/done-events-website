import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { primaryCta, secondaryCta } from '../../content/navigation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from '../../lib/gsap';
import { MagneticButton } from '../motion/MagneticButton';
import { MaskText } from '../motion/MaskText';
import { Reveal } from '../motion/Reveal';
import { GlassBadge } from '../ui/GlassBadge';
import { GlassButton } from '../ui/GlassButton';

interface ScrollNarrativeProps {
  sectionRef: RefObject<HTMLElement | null>;
  /** Gates the arrival sequence on hero media readiness. */
  ready: boolean;
}

const services = ['AI Automation', 'AI Integration', 'AI Agent Development'];

export function ScrollNarrative({ sectionRef, ready }: ScrollNarrativeProps) {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneA = useRef<HTMLDivElement>(null);
  const sceneB = useRef<HTMLDivElement>(null);
  const sceneC = useRef<HTMLDivElement>(null);
  const warmRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (reduced || !section || !stage) return;

    const ctx = gsap.context(() => {
      const lines = (scene: HTMLElement | null) =>
        scene ? Array.from(scene.querySelectorAll<HTMLElement>('[data-mask-line]')) : [];
      const drifters = (scene: HTMLElement | null) =>
        scene ? Array.from(scene.querySelectorAll<HTMLElement>('[data-drift]')) : [];

      // One master timeline, one ScrollTrigger, for the whole opening sequence.
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // States cross-dissolve: the next one is already arriving as the previous
      // leaves, so no stretch of the scroll is ever empty.

      // ---- State A leaves ------------------------------------------------
      tl.to(sceneA.current, { opacity: 0, yPercent: -5, duration: 0.1 }, 0.2)
        .set(sceneA.current, { pointerEvents: 'none' }, 0.26)

        // ---- State B: from noise to signal --------------------------------
        .set(sceneB.current, { pointerEvents: 'auto' }, 0.23)
        .to(sceneB.current, { opacity: 1, duration: 0.1 }, 0.23)
        .fromTo(
          lines(sceneB.current),
          { yPercent: 105 },
          { yPercent: 0, duration: 0.13, stagger: 0.022 },
          0.24
        )
        .fromTo(
          drifters(sceneB.current),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.1, stagger: 0.02 },
          0.28
        )
        // held still through 0.34 – 0.56 so the statement can actually be read
        .to(sceneB.current, { opacity: 0, duration: 0.08 }, 0.56)
        .set(sceneB.current, { pointerEvents: 'none' }, 0.64)

        // ---- State C: insight on demand -----------------------------------
        .set(sceneC.current, { pointerEvents: 'auto' }, 0.57)
        .to(sceneC.current, { opacity: 1, duration: 0.1 }, 0.57)
        .to(warmRef.current, { opacity: 1, duration: 0.14 }, 0.55)
        .fromTo(
          lines(sceneC.current),
          { yPercent: 105 },
          { yPercent: 0, duration: 0.13, stagger: 0.022 },
          0.58
        )
        .fromTo(
          drifters(sceneC.current),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.1, stagger: 0.02 },
          0.62
        )

        // ---- Settle into the near-black the next scene begins from ---------
        .to(veilRef.current, { opacity: 1, duration: 0.07, ease: 'power1.in' }, 0.93)
        .set({}, {}, 1);
    }, stage);

    return () => ctx.revert();
  }, [reduced, sectionRef]);

  const stacked = reduced;
  const sceneBase = stacked
    ? 'relative flex min-h-[100svh] w-full items-center py-24'
    : 'absolute inset-0 flex size-full';

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="NovaAI — clear, precise, automated"
      className={stacked ? 'relative z-[var(--z-scene)]' : 'narrative-track relative z-[var(--z-scene)]'}
    >
      <div
        ref={stageRef}
        className={
          stacked ? 'relative w-full' : 'narrative-stage sticky top-0 w-full overflow-hidden'
        }
      >
        {/* Warm reflection answering the glowing core. One gradient, low opacity. */}
        <div
          ref={warmRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: stacked ? 0.5 : 0,
            background:
              'radial-gradient(58% 52% at 52% 54%, rgba(231,161,95,0.17) 0%, rgba(231,161,95,0.05) 45%, rgba(231,161,95,0) 72%)',
          }}
        />

        {/* ------------------------------------------------- STATE A — ARRIVAL */}
        <div ref={sceneA} className={sceneBase}>
          <div className="nova-shell flex size-full flex-col justify-between pb-[max(28px,env(safe-area-inset-bottom))] pt-[104px] lg:pb-10 lg:pt-[132px]">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
              <Reveal immediate={ready} delay={0.15}>
                <ul className="flex flex-col gap-1.5">
                  {services.map((service) => (
                    <li
                      key={service}
                      className="type-meta text-white/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.55)]"
                    >
                      <span aria-hidden="true" className="mr-2 text-white/45">
                        /
                      </span>
                      {service}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal immediate={ready} delay={0.28} className="lg:max-w-[36ch] lg:text-right">
                <p className="max-w-[34ch] text-[0.95rem] leading-[1.6] text-white/72 lg:ml-auto">
                  We design automation that brings clarity, precision and efficiency to the way your
                  company operates.
                </p>
              </Reveal>
            </div>

            <div className="mt-10 lg:mt-0">
              <MaskText
                as="h1"
                lines={['Clear. Precise.', 'Automated.']}
                className="type-hero"
                delay={0.52}
              />
            </div>

            <div className="mt-10 flex flex-col gap-6 lg:mt-0 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <Reveal immediate={ready} delay={0.4}>
                <GlassBadge>We automate the work behind the work</GlassBadge>
              </Reveal>

              <Reveal immediate={ready} delay={0.85}>
                <div className="flex flex-wrap items-center gap-3">
                  <MagneticButton>
                    <GlassButton href={primaryCta.href} variant="strong">
                      {primaryCta.label}
                    </GlassButton>
                  </MagneticButton>
                  <GlassButton href={secondaryCta.href} variant="quiet" arrow={false}>
                    {secondaryCta.label}
                  </GlassButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ------------------------------------- STATE B — FROM NOISE TO SIGNAL */}
        <div
          ref={sceneB}
          className={sceneBase}
          style={stacked ? undefined : { opacity: 0, pointerEvents: 'none' }}
        >
          <div className="nova-shell flex size-full items-center pb-16 pt-[104px]">
            <div className="nova-grid w-full">
              <div className="col-span-6 lg:col-span-7 lg:col-start-5">
                <p data-drift="" className="type-meta mb-7 text-white/55">
                  <span className="text-[var(--nova-warm)]">01</span>
                  <span aria-hidden="true" className="mx-2.5 text-white/30">
                    /
                  </span>
                  From noise to signal
                </p>
                <MaskText
                  as="h2"
                  lines={['See the system', 'behind the work.']}
                  className="type-statement"
                  driver="external"
                />
                <p data-drift="" className="type-body nova-measure mt-9">
                  NovaAI connects information, decisions and repetitive operations into one clear
                  working system.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------- STATE C — INSIGHT ON DEMAND */}
        <div
          ref={sceneC}
          className={sceneBase}
          style={stacked ? undefined : { opacity: 0, pointerEvents: 'none' }}
        >
          <div className="nova-shell flex size-full items-end pb-[max(64px,12vh)] pt-[104px]">
            <div className="nova-grid w-full items-end gap-y-10">
              <div className="col-span-6 lg:col-span-7">
                <div data-drift="" className="mb-8">
                  <GlassBadge>Insight on demand</GlassBadge>
                </div>
                <MaskText
                  as="h2"
                  lines={['Learn to see', 'brilliantly.']}
                  className="type-statement"
                  driver="external"
                />
              </div>
              <p data-drift="" className="type-body col-span-6 lg:col-span-4 lg:col-start-9">
                Nova interprets the signal, sharpens the output and delivers what your team needs to
                act with confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Settles onto exactly the colour the next scene starts from. */}
        {!stacked ? (
          <div
            ref={veilRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[var(--nova-black)] opacity-0"
          />
        ) : null}
      </div>
    </section>
  );
}
