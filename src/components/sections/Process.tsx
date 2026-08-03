import { useEffect, useRef } from 'react';
import { processStages } from '../../content/process';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from '../../lib/gsap';
import { MaskText } from '../motion/MaskText';
import { Reveal } from '../motion/Reveal';
import { SectionLabel } from '../ui/SectionLabel';

export function Process() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (reduced || !root) return;

    const ctx = gsap.context(() => {
      const line = root.querySelector<HTMLElement>('[data-progress-line]');
      const stages = Array.from(root.querySelectorAll<HTMLElement>('[data-stage]'));

      // Dominant movement: the connecting line draws itself as the section passes.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 76%',
          end: 'bottom 72%',
          scrub: 0.9,
        },
      });

      if (line) tl.fromTo(line, { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: 'none' }, 0);

      // Supporting movement: each stage lifts to full presence in turn.
      stages.forEach((stage, index) => {
        tl.to(stage, { opacity: 1, ease: 'none', duration: 0.22 }, index * 0.26);
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative z-[var(--z-page)] bg-[var(--nova-black)] pb-[clamp(96px,13vh,168px)] pt-[clamp(48px,6vh,88px)]"
    >
      <div className="nova-shell">
        <div className="nova-grid gap-y-12">
          <div className="col-span-6 lg:col-span-9">
            <Reveal>
              <SectionLabel className="mb-9">How it works</SectionLabel>
            </Reveal>
            <MaskText
              as="h2"
              id="process-heading"
              lines={['From complexity', 'to clarity.']}
              className="type-section"
            />
          </div>
        </div>

        <div ref={rootRef} className="mt-[clamp(56px,8vh,104px)]">
          <div className="relative">
            {/* Vertical rail on small screens, horizontal rail from lg up. */}
            <div
              aria-hidden="true"
              className="absolute left-[13px] top-2 h-[calc(100%-16px)] w-px bg-white/12 lg:left-0 lg:top-[13px] lg:h-px lg:w-full"
            >
              <span
                data-progress-line=""
                className="absolute inset-0 origin-top bg-gradient-to-b from-[var(--nova-warm)]/70 to-white/25 lg:origin-left lg:bg-gradient-to-r"
                style={reduced ? undefined : { transform: 'scale(0)' }}
              />
            </div>

            <ol className="grid gap-12 lg:grid-cols-3 lg:gap-[clamp(24px,3vw,64px)]">
              {processStages.map((stage) => (
                <li
                  key={stage.index}
                  data-stage=""
                  className="relative pl-12 lg:pl-0 lg:pt-12"
                  style={reduced ? undefined : { opacity: 0.28 }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-[7px] size-3.5 rounded-full border border-white/35 bg-[var(--nova-black)] lg:left-0 lg:top-[6px]"
                  />
                  <p className="type-numeral text-[1.6rem] leading-none text-[var(--nova-warm)]">
                    {stage.index}
                    <span aria-hidden="true" className="mx-3 text-white/25">
                      —
                    </span>
                    <span className="font-sans text-[0.82rem] font-medium uppercase not-italic tracking-[0.2em] text-white">
                      {stage.title}
                    </span>
                  </p>
                  <p className="mt-5 max-w-[38ch] text-[0.95rem] leading-[1.62] text-white/58">
                    {stage.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
