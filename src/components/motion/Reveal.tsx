import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type Family = 'copy' | 'panel';

interface RevealProps {
  children: ReactNode;
  /** `copy` = supporting text. `panel` = frosted surfaces and media. */
  family?: Family;
  delay?: number;
  className?: string;
  /** Skip the viewport observer and play immediately (used by the arrival
   *  sequence, which is timed against media readiness rather than scroll). */
  immediate?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const families = {
  copy: {
    hidden: { opacity: 0, y: 24 },
    shown: { opacity: 1, y: 0 },
    duration: 0.68,
  },
  panel: {
    hidden: { opacity: 0, y: 14, scale: 0.985 },
    shown: { opacity: 1, y: 0, scale: 1 },
    duration: 0.78,
  },
} as const;

/** The two non-headline reveal families. Nothing else fades up on this page. */
export function Reveal({ children, family = 'copy', delay = 0, className, immediate }: RevealProps) {
  const reduced = useReducedMotion();
  const spec = families[family];

  if (reduced) return <div className={className}>{children}</div>;

  const animation = immediate
    ? { animate: spec.shown }
    : {
        whileInView: spec.shown,
        viewport: { once: true, margin: '0px 0px -10% 0px' },
      };

  return (
    <motion.div
      className={className}
      initial={spec.hidden}
      {...animation}
      transition={{ duration: spec.duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
