import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigation } from '../components/navigation/Navigation';
import { Capabilities } from '../components/sections/Capabilities';
import { CapabilityStrip } from '../components/sections/CapabilityStrip';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Footer } from '../components/sections/Footer';
import { Process } from '../components/sections/Process';
import { ScrollNarrative } from '../components/sections/ScrollNarrative';
import { ScrollVideo } from '../components/video/ScrollVideo';
import { heroMediaDescription } from '../content/media';
import { ScrollTrigger } from '../lib/gsap';

export default function App() {
  // Owned here so the video layer and the narrative share one scroll range.
  const narrativeRef = useRef<HTMLElement>(null);
  const [heroReady, setHeroReady] = useState(false);

  const handleHeroReady = useCallback(() => setHeroReady(true), []);

  // Web fonts change line boxes, which changes every measured start/end.
  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener('load', refresh);
    const settle = window.setTimeout(refresh, 900);

    return () => {
      cancelled = true;
      window.clearTimeout(settle);
      window.removeEventListener('load', refresh);
    };
  }, []);

  return (
    <>
      <a className="nova-skip-link" href="#capabilities">
        Skip to content
      </a>

      <ScrollVideo triggerRef={narrativeRef} onReady={handleHeroReady} />

      <Navigation ready={heroReady} />

      <main>
        <ScrollNarrative sectionRef={narrativeRef} ready={heroReady} />
        <Capabilities />
        <CapabilityStrip />
        <Process />
        <FinalCTA />
      </main>

      <Footer />

      {/* The footage is decorative; this is its textual equivalent. */}
      <p className="sr-only">{heroMediaDescription}</p>
    </>
  );
}
