import { motion } from 'framer-motion';
import { Hexagon, Menu } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { navLinks, primaryCta } from '../../content/navigation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MobileMenu } from './MobileMenu';

interface NavigationProps {
  /** Entrance is held until the hero has something to show. */
  ready: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navigation({ ready }: NavigationProps) {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  // Single passive listener with a hysteresis band so the pill never flickers.
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      setCondensed((current) => (current ? y > 40 : y > 80));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 z-[var(--z-nav)]"
        style={{ top: 'calc(env(safe-area-inset-top, 0px) + 14px)' }}
        initial={reduced ? false : { opacity: 0, y: -14 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="nova-shell">
          <nav
            aria-label="Primary"
            data-condensed={condensed ? '' : undefined}
            className="glass flex items-center justify-between gap-6 rounded-[var(--r-pill)] px-4 py-[10px] transition-[background-color,padding] duration-500 ease-[var(--ease-quiet)] data-condensed:bg-white/[0.085] data-condensed:py-[7px] sm:px-5"
          >
            <a
              href="#home"
              className="flex shrink-0 items-center gap-2.5 rounded-[var(--r-pill)] px-1 py-1 text-white"
              aria-label="NovaAI — home"
            >
              <Hexagon aria-hidden="true" className="size-[19px] text-white/85" strokeWidth={1.4} />
              <span className="text-[1.02rem] font-medium lowercase leading-none tracking-[-0.02em]">
                novaai
              </span>
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative flex min-h-[40px] items-center px-3.5 text-[0.8rem] font-normal tracking-[0.01em] text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3.5 bottom-[7px] h-px origin-left scale-x-0 bg-white/55 transition-transform duration-400 ease-[var(--ease-editorial)] group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={primaryCta.href}
                className="hidden min-h-[40px] items-center rounded-[var(--r-pill)] border border-[var(--nova-line)] bg-white/[0.06] px-5 text-[0.74rem] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-white/[0.12] lg:inline-flex"
              >
                {primaryCta.label}
              </a>

              <button
                ref={toggleRef}
                type="button"
                onClick={openMenu}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="nova-mobile-menu"
                className="flex size-11 items-center justify-center rounded-[var(--r-pill)] border border-[var(--nova-line)] text-white/85 transition-colors duration-300 hover:bg-white/[0.08] hover:text-white lg:hidden"
              >
                <Menu aria-hidden="true" className="size-5" strokeWidth={1.5} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} returnFocusRef={toggleRef} />
    </>
  );
}
