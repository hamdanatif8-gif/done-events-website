import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { navLinks, primaryCta } from '../../content/navigation';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  /** Focus returns here when the panel closes. */
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE = 'a[href], button:not([disabled])';
const EASE = [0.22, 1, 0.36, 1] as const;

export function MobileMenu({ open, onClose, returnFocusRef }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useBodyScrollLock(open);

  // Escape to close, Tab kept inside the panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      const active = document.activeElement;
      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // Move focus in on open, restore it on close.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
    return () => returnFocusRef.current?.focus();
  }, [open, returnFocusRef]);

  const handleNavigate = useCallback(() => onClose(), [onClose]);

  const duration = reduced ? 0 : 0.42;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          id="nova-mobile-menu"
          className="fixed inset-0 z-[var(--z-menu)] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration * 0.6, ease: EASE }}
        >
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 size-full cursor-default bg-black/70 backdrop-blur-[6px]"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ y: reduced ? 0 : '-4%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: reduced ? 0 : '-3%', opacity: 0 }}
            transition={{ duration, ease: EASE }}
            className="glass absolute inset-x-3 rounded-[var(--r-panel)] bg-black/55 p-6"
            style={{
              top: 'calc(env(safe-area-inset-top, 0px) + 12px)',
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
            }}
          >
            <div className="mb-7 flex items-center justify-between">
              <span className="type-meta text-white/45">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-[var(--r-pill)] border border-[var(--nova-line)] text-white/80 transition-colors duration-200 hover:text-white"
              >
                <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav aria-label="Primary">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href} className="border-b border-white/10 last:border-b-0">
                    <a
                      href={link.href}
                      onClick={handleNavigate}
                      className="flex min-h-[56px] items-center font-serif text-[2rem] italic leading-none tracking-[-0.02em] text-white/90 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={primaryCta.href}
              onClick={handleNavigate}
              className="glass-strong glass-sheen mt-7 flex min-h-[52px] items-center justify-center rounded-[var(--r-pill)] px-6 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white"
            >
              {primaryCta.label}
            </a>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
