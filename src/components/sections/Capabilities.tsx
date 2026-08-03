import { ChevronRight } from 'lucide-react';
import { capabilities } from '../../content/capabilities';
import { MaskText } from '../motion/MaskText';
import { Reveal } from '../motion/Reveal';
import { SectionLabel } from '../ui/SectionLabel';

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative z-[var(--z-page)] bg-[var(--nova-black)] py-[clamp(96px,13vh,168px)]"
    >
      <div className="nova-shell">
        <div className="nova-grid gap-y-14">
          <div className="col-span-6 lg:col-span-5">
            <Reveal>
              <SectionLabel className="mb-9">Capabilities</SectionLabel>
            </Reveal>

            <MaskText
              as="h2"
              id="capabilities-heading"
              lines={['Automation,', 'evolved.']}
              className="type-section"
            />

            <Reveal delay={0.14}>
              <p className="type-body nova-measure mt-9">
                From the first workflow to the final output, Nova turns raw intent into systems your
                team can use quietly, precisely and at speed.
              </p>
            </Reveal>
          </div>

          {/* One structured panel — never three competing cards. */}
          <Reveal family="panel" delay={0.1} className="col-span-6 lg:col-span-6 lg:col-start-7">
            <div className="glass glass-sheen overflow-hidden rounded-[var(--r-panel)]">
              <ul>
                {capabilities.map((capability) => (
                  <li
                    key={capability.index}
                    className="group border-b border-white/[0.09] transition-colors duration-400 ease-[var(--ease-quiet)] last:border-b-0 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-start gap-5 px-6 py-8 sm:px-9 sm:py-10">
                      <span className="type-numeral mt-[2px] w-9 shrink-0 text-[1.35rem] text-white/38 transition-colors duration-400 group-hover:text-[var(--nova-warm)]">
                        {capability.index}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[0.82rem] font-medium uppercase tracking-[0.2em] text-white/78 transition-colors duration-400 ease-[var(--ease-quiet)] group-hover:text-white">
                          {capability.title}
                        </h3>
                        <p className="mt-3 max-w-[42ch] text-[0.95rem] leading-[1.6] text-white/58">
                          {capability.description}
                        </p>
                      </div>

                      <ChevronRight
                        aria-hidden="true"
                        strokeWidth={1.4}
                        className="mt-[3px] size-[18px] shrink-0 text-white/28 transition-[transform,color] duration-400 ease-[var(--ease-quiet)] group-hover:translate-x-[4px] group-hover:text-white/60"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
