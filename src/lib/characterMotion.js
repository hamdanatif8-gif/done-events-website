import { gsap, ScrollTrigger } from './motion'

// ---------------------------------------------------------------------------
// Movement languages.
//
// Each member of the crew moves differently — that is most of what makes them
// read as characters rather than as decorations. `ambient` is the idle loop
// the character performs while it is on screen; `gesture` is the scroll-driven
// action it performs as its scene passes.
//
// Every ambient loop is paused while its character is outside the viewport, so
// the page never runs more than a couple of timelines at once.
// ---------------------------------------------------------------------------

const q = (root, sel) => root.querySelector(sel)
const qa = (root, sel) => [...root.querySelectorAll(sel)]

const languages = {
  // A flame. Breathes upward, arms drift, the whole body flickers in height.
  rise(root) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } })
    tl.to(q(root, '.ch-torso'), { scaleY: 1.045, scaleX: 0.975, duration: 1.5, transformOrigin: '50% 100%' }, 0)
      .to(qa(root, '.ch-armL, .ch-armR'), { rotate: 7, duration: 1.9, transformOrigin: '50% 50%', stagger: 0.2 }, 0)
      .to(q(root, '.ch-eyes'), { y: -3, duration: 1.5 }, 0)
    return tl
  },

  // A lamp. The head sweeps the room; the beam follows it.
  sweep(root) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 2.6 } })
    tl.to(qa(root, '.ch-head, .ch-beam'), { rotate: -13, transformOrigin: '100px 170px' }, 0)
      .to(q(root, '.ch-beam'), { opacity: 0.5, duration: 1.3, yoyo: true, repeat: 1 }, 0)
    return tl
  },

  // Architectural. Does not drift — it takes discrete steps and holds.
  step(root) {
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power4.inOut', duration: 0.34 } })
    tl.to(root, { x: 14 }, 0.9)
      .to(q(root, '.ch-armL'), { x: -8 }, 0.9)
      .to(root, { x: 0 }, 2.4)
      .to(q(root, '.ch-armL'), { x: 0 }, 2.4)
      .to({}, { duration: 1.2 })
    return tl
  },

  // Folds inward around what it is holding, then eases open again.
  fold(root) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 2.4 } })
    tl.to(q(root, '.ch-drape'), { scaleY: 1.07, y: -4, transformOrigin: '50% 0%' }, 0)
      .to(q(root, '.ch-torso'), { scaleX: 0.98, transformOrigin: '50% 100%' }, 0)
    return tl
  },

  // Two ribbons taking turns in front of each other.
  orbit(root) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 2.8 } })
    tl.to(q(root, '.ch-strandA'), { rotate: 5, transformOrigin: '100px 240px' }, 0)
      .to(q(root, '.ch-strandB'), { rotate: -5, transformOrigin: '100px 240px' }, 0)
    return tl
  },

  // A speaker. Rings leave the cone in sequence; the body pumps on the beat.
  beat(root) {
    const rings = qa(root, '.ch-ring1, .ch-ring2, .ch-ring3')
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.out' } })
    tl.to(q(root, '.ch-torso'), { scaleY: 0.965, scaleX: 1.03, duration: 0.16, transformOrigin: '50% 100%' }, 0)
      .to(q(root, '.ch-torso'), { scaleY: 1, scaleX: 1, duration: 0.7, ease: 'elastic.out(1, 0.42)' }, 0.16)
      .fromTo(rings, { scale: 0.86, opacity: 0.15 }, { scale: 1.06, opacity: 1, duration: 0.5, stagger: 0.11, transformOrigin: '100px 70px' }, 0)
      .to(rings, { opacity: 0.35, duration: 0.5, stagger: 0.11 }, 0.55)
      .to({}, { duration: 0.5 })
    return tl
  },

  // Mechanical. The boom swings, the segments shunt, nothing is organic.
  travel(root) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'power2.inOut', duration: 1.5 } })
    tl.to(qa(root, '.ch-boom, .ch-hook'), { rotate: 9, transformOrigin: '128px 50px' }, 0)
      .to(q(root, '.ch-seg2'), { x: 5 }, 0)
      .to(q(root, '.ch-seg3'), { x: -4 }, 0)
      .to(q(root, '.ch-torso'), { x: -3 }, 0)
    return tl
  },

  // A vessel. Leans in to pour, comes back upright.
  pour(root) {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.1, defaults: { ease: 'power2.inOut' } })
    tl.to(root, { rotate: -9, duration: 1.1, transformOrigin: '60% 95%' })
      .to(q(root, '.ch-arm'), { rotate: 6, duration: 1.1, transformOrigin: '160px 150px' }, 0)
      .to(root, { rotate: 0, duration: 1.1 }, 1.6)
      .to(q(root, '.ch-arm'), { rotate: 0, duration: 1.1 }, 1.6)
    return tl
  },

  // The whole system, holding itself together and breathing.
  assemble(root) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 2.2 } })
    tl.to(q(root, '.ch-head'), { y: -6 }, 0)
      .to(q(root, '.ch-rings'), { y: -10, opacity: 0.85 }, 0)
      .to(qa(root, '.ch-armL, .ch-armR'), { rotate: 6, transformOrigin: '50% 50%', stagger: { each: 0.3, from: 'edges' } }, 0)
      .to(q(root, '.ch-torso'), { scaleX: 1.02, transformOrigin: '50% 100%' }, 0)
    return tl
  },
}

/**
 * Starts a character's idle loop and keeps it paused while off screen.
 * Returns nothing — cleanup is handled by the gsap.context the caller is in.
 */
export function animateCharacter(root, motion) {
  const build = languages[motion]
  if (!build || !root) return
  const tl = build(root)
  tl.pause()

  ScrollTrigger.create({
    trigger: root,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: ({ isActive }) => (isActive ? tl.play() : tl.pause()),
  })
}

/**
 * The scroll-driven gesture: how the character crosses its scene. Each one
 * travels differently, so no two chapters move the same way.
 */
export const gestures = {
  rise: { from: { yPercent: 26, rotate: -5 }, to: { yPercent: -30, rotate: 4 } },
  sweep: { from: { xPercent: -22, yPercent: 12 }, to: { xPercent: 14, yPercent: -14 } },
  step: { from: { xPercent: 20, yPercent: 8, rotate: 0 }, to: { xPercent: -16, yPercent: -10, rotate: 0 } },
  fold: { from: { yPercent: 22, scale: 0.9 }, to: { yPercent: -22, scale: 1.06 } },
  orbit: { from: { rotate: -14, yPercent: 18 }, to: { rotate: 12, yPercent: -20 } },
  beat: { from: { yPercent: 30, scale: 0.88 }, to: { yPercent: -26, scale: 1.1 } },
  travel: { from: { xPercent: -30, yPercent: 6 }, to: { xPercent: 26, yPercent: -8 } },
  pour: { from: { yPercent: 24, rotate: 8 }, to: { yPercent: -24, rotate: -6 } },
  assemble: { from: { yPercent: 28, scale: 0.86, rotate: -6 }, to: { yPercent: -26, scale: 1.08, rotate: 4 } },
}
