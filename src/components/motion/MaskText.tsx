import { motion } from 'framer-motion';
import type { ElementType } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type Driver = 'inview' | 'external';

interface MaskTextProps {
  /** One entry per visual line. Lines are never split into words or letters. */
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  id?: string;
  /** `inview` self-animates via Framer Motion. `external` renders inert markup
   *  for GSAP to drive, so the two libraries never share a transform. */
  driver?: Driver;
  delay?: number;
  stagger?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Editorial headline reveal: each line rises out of an overflow-hidden mask. */
export function MaskText({
  lines,
  as: Tag = 'span',
  className,
  id,
  driver = 'inview',
  delay = 0,
  stagger = 0.075,
}: MaskTextProps) {
  const reduced = useReducedMotion();

  if (driver === 'external' || reduced) {
    return (
      <Tag className={className} id={id}>
        {lines.map((line) => (
          <span key={line} className="mask-line-wrap">
            <span className="mask-line" data-mask-line="">
              {line}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} id={id}>
      {lines.map((line, i) => (
        <span key={line} className="mask-line-wrap">
          <motion.span
            className="mask-line"
            initial={{ y: '105%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.82, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
