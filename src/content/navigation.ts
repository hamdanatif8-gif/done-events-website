export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export const navLinks: readonly NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export const primaryCta = {
  label: 'Get Free Consultation',
  href: '#contact',
} as const;

export const secondaryCta = {
  label: 'Run the Demo',
  href: '#capabilities',
} as const;

/** Placeholder contact route — replace before launch (see README). */
export const contactEmail = 'hello@novaai.systems';
