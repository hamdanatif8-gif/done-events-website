export interface Capability {
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

export const capabilities: readonly Capability[] = [
  {
    index: '01',
    title: 'Real-time vision',
    description: 'Reads context as it happens and surfaces what matters before you ask.',
  },
  {
    index: '02',
    title: 'Layered insight',
    description: 'Moves from rough information to clear output without losing the thread.',
  },
  {
    index: '03',
    title: 'Adaptive speed',
    description: 'Learns the cadence of the work and tightens each pass as the system operates.',
  },
];

/** Terms shown in the horizontal capability strip. */
export const connectedTerms: readonly string[] = [
  'AI Automation',
  'AI Integration',
  'Agent Development',
  'Real-time Vision',
  'Operations',
  'Workflows',
  'Analysis',
  'Decision Support',
];
