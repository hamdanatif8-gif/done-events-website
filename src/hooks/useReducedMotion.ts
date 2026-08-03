import { useMediaQuery } from './useMediaQuery';

/** True when the visitor has asked the system to reduce motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
