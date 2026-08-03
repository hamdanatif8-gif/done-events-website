import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Registered exactly once for the whole application. */
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
