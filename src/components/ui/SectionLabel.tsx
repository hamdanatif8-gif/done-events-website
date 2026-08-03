interface SectionLabelProps {
  children: string;
  className?: string;
}

/** `// CAPABILITIES` — the quiet metadata marker that opens each dark scene. */
export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p className={`type-meta flex items-center gap-2.5 text-white/48 ${className}`}>
      <span aria-hidden="true" className="text-[var(--nova-warm)]">
        //
      </span>
      {children}
    </p>
  );
}
