import { useCallback, useState } from 'react';
import { secondaryCta } from '../../content/navigation';
import { MagneticButton } from '../motion/MagneticButton';
import { MaskText } from '../motion/MaskText';
import { Reveal } from '../motion/Reveal';
import { GlassButton } from '../ui/GlassButton';
import { ConsultationForm } from './ConsultationForm';

export function FinalCTA() {
  const [formOpen, setFormOpen] = useState(false);
  const openForm = useCallback(() => setFormOpen(true), []);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-[var(--z-page)] overflow-hidden bg-[var(--nova-black)] pb-[clamp(96px,13vh,160px)] pt-[clamp(72px,10vh,136px)]"
    >
      {/* One subtle warm light field. No second video, no floating objects. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(52% 44% at 22% 34%, rgba(231,161,95,0.13) 0%, rgba(231,161,95,0.035) 44%, rgba(231,161,95,0) 72%)',
        }}
      />

      <div className="nova-shell relative">
        <div className="nova-grid gap-y-12">
          <div className="col-span-6 lg:col-span-7">
            <Reveal>
              <p className="type-meta mb-9 text-white/45">Ready when you are</p>
            </Reveal>

            <MaskText
              as="h2"
              id="contact-heading"
              lines={['Make the work', 'feel lighter.']}
              className="type-section"
            />
          </div>

          <div className="col-span-6 lg:col-span-4 lg:col-start-9 lg:self-end">
            <Reveal delay={0.12}>
              <p className="type-body nova-measure">
                Bring us the process that slows your team down. We will map it, simplify it and show
                you what intelligent automation can change.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <MagneticButton>
                  <GlassButton variant="strong" onClick={openForm} aria-expanded={formOpen}>
                    Get Free Consultation
                  </GlassButton>
                </MagneticButton>
                <GlassButton href={secondaryCta.href} variant="quiet" arrow={false}>
                  {secondaryCta.label}
                </GlassButton>
              </div>
            </Reveal>
          </div>
        </div>

        {formOpen ? (
          <Reveal family="panel" immediate className="mt-[clamp(48px,7vh,88px)]">
            <div className="nova-grid">
              <div className="col-span-6 lg:col-span-7 lg:col-start-6">
                <ConsultationForm />
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
