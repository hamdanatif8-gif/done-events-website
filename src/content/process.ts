export interface ProcessStage {
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

export const processStages: readonly ProcessStage[] = [
  {
    index: '01',
    title: 'Map',
    description: 'Understand the workflow, information and decisions behind the operation.',
  },
  {
    index: '02',
    title: 'Build',
    description: 'Connect the right systems, rules and intelligent agents.',
  },
  {
    index: '03',
    title: 'Refine',
    description: 'Measure the result, improve the process and remove unnecessary work.',
  },
];
