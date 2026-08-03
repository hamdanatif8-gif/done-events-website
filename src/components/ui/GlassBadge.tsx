import type { ReactNode } from 'react';

interface GlassBadgeProps {
  children: ReactNode;
  className?: string;
}

/** Subtle glass chip with a restrained white left edge. */
export function GlassBadge({ children, className = '' }: GlassBadgeProps) {
  return (
    <span
      className={`glass relative inline-flex items-center rounded-[var(--r-panel-sm)] py-2.5 pl-5 pr-5 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-1/2 h-[58%] w-px -translate-y-1/2 bg-white/70"
      />
      <span className="type-meta text-white/82">{children}</span>
    </span>
  );
}
