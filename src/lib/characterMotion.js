import { gsap, ScrollTrigger, reducedMotion } from './motion'

// ---------------------------------------------------------------------------
// Movement languages.
//
// Each member of the crew moves differently — that is most of what makes them
// read as characters rather than as decorations. `ambient` is what the
// character does continuously while it is on screen, whether or not anyone is
// scrolling; `gestures` is the scroll-linked travel its scene gives it.
//
// The two never touch the same element. Scroll drives the wrapper `<div>`;
// ambient drives groups inside the `<svg>`. So a character keeps performing
// while it is being carried across a scene, and neither animation can
// overwrite the other's transform.
//
// Every loop is built from tweens that return to their own start, so there is
// no reset frame. Periods are deliberately co-prime-ish: layering a 1.5s sway
// against a 2.3s drift gives a combined cycle long enough that the eye never
// catches the repeat.
//
// Loops are paused whenever the character is off screen, so the page runs a
// couple of timelines at a time rather than thirty.
// ---------------------------------------------------------------------------

const q = (root, sel) => root.querySelector(sel)
const qa = (root, sel) => [...root.querySelectorAll(sel)]

/** Every character breathes, at its own rate, underneath its own language. */
function breathe(root, period) {
  return gsap.to(q(root, '.ch-body'), {
    scaleY: 1.014,
    scaleX: 0.992,
    duration: period,
    transformOrigin: '50% 100%',
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })
}

const languages = {
  // A flame. Rises, flickers, arms drift; the light inside it travels.
  rise(root) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } })
    tl.to(q(root, '.ch-torso'), { scaleY: 1.05, scaleX: 0.972, duration: 1.5, transformOrigin: '50% 100%' }, 0)
      .to(q(root, '.ch-armL'), { rotate: 9, duration: 1.9, transformOrigin: '100% 40%' }, 0)
      .to(q(root, '.ch-armR'), { rotate: -9, duration: 2.3, transformOrigin: '0% 40%' }, 0)
      .to(q(root, '.ch-eyes'), { y: -3.5, duration: 1.5 }, 0)
    return [
      tl,
      gsap.to(root, { rotate: 2.2, duration: 3.7, transformOrigin: '50% 100%', ease: 'sine.inOut', yoyo: true, repeat: -1 }),
      gsap.to(q(root, '.ch-volume'), { x: 4, duration: 5.3, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
    ]
  },

  // A lamp. The head sweeps the room; the beam brightens as it turns.
  sweep(root) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 2.6 } })
    tl.to(qa(root, '.ch-head, .ch-beam'), { rotate: -14, transformOrigin: '100px 170px' }, 0)
      .to(q(root, '.ch-stalk'), { rotate: -5, transformOrigin: '100px 170px' }, 0)
      .to(q(root, '.ch-beam'), { opacity: 0.52, duration: 1.3, yoyo: true, repeat: 1 }, 0)
      .to(q(root, '.ch-eyes'), { x: -4, duration: 2.6 }, 0)
    return [tl, breathe(root, 2.9)]
  },

  // Architectural. Does not drift — it takes a step, holds, and steps back.
  step(root) {
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power4.inOut', duration: 0.32 } })
    tl.to(q(root, '.ch-body'), { x: 13 }, 0.9)
      .to(q(root, '.ch-armL'), { x: -9, rotate: -3, transformOrigin: '100% 50%' }, 0.9)
      .to(q(root, '.ch-head'), { y: -4 }, 0.96)
      .to(q(root, '.ch-head'), { y: 0 }, 1.3)
      .to(q(root, '.ch-body'), { x: 0 }, 2.5)
      .to(q(root, '.ch-armL'), { x: 0, rotate: 0 }, 2.5)
      .to(q(root, '.ch-head'), { y: -4 }, 2.56)
      .to(q(root, '.ch-head'), { y: 0 }, 2.9)
      .to({}, { duration: 1.1 })
    return [tl]
  },

  // Folds inward around what it is holding, then eases open again.
  fold(root) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 2.4 } })
    tl.to(q(root, '.ch-drape'), { scaleY: 1.08, y: -5, transformOrigin: '50% 0%' }, 0)
      .to(q(root, '.ch-torso'), { scaleX: 0.975, transformOrigin: '50% 100%' }, 0)
      .to(q(root, '.ch-eyes'), { y: 2.5, duration: 3.1 }, 0)
    return [
      tl,
      gsap.to(root, { rotate: -1.8, duration: 4.3, transformOrigin: '50% 100%', ease: 'sine.inOut', yoyo: true, repeat: -1 }),
    ]
  },

  // Two ribbons taking turns in front of each other.
  orbit(root) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 2.8 } })
    tl.to(q(root, '.ch-strandA'), { rotate: 6, x: 3, transformOrigin: '100px 240px' }, 0)
      .to(q(root, '.ch-strandB'), { rotate: -6, x: -3, transformOrigin: '100px 240px' }, 0)
      .to(q(root, '.ch-eyes'), { y: -3, duration: 2.1 }, 0)
    return [tl, breathe(root, 3.3)]
  },

  // A speaker. Rings leave the cone in sequence; the body pumps on the beat.
  beat(root) {
    const rings = qa(root, '.ch-ring1, .ch-ring2, .ch-ring3')
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.out' } })
    tl.to(q(root, '.ch-torso'), { scaleY: 0.96, scaleX: 1.035, duration: 0.15, transformOrigin: '50% 100%' }, 0)
      .to(q(root, '.ch-torso'), { scaleY: 1, scaleX: 1, duration: 0.72, ease: 'elastic.out(1, 0.4)' }, 0.15)
      .to(qa(root, '.ch-armL, .ch-armR'), { y: -5, duration: 0.16 }, 0)
      .to(qa(root, '.ch-armL, .ch-armR'), { y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' }, 0.16)
      .fromTo(
        rings,
        { scale: 0.86, opacity: 0.14 },
        { scale: 1.07, opacity: 1, duration: 0.5, stagger: 0.11, transformOrigin: '100px 70px' },
        0,
      )
      .to(rings, { opacity: 0.32, duration: 0.5, stagger: 0.11 }, 0.55)
      .to({}, { duration: 0.46 })
    return [tl]
  },

  // Mechanical. The boom swings, the segments shunt, nothing is organic.
  travel(root) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'power2.inOut', duration: 1.5 } })
    tl.to(qa(root, '.ch-boom, .ch-hook'), { rotate: 10, transformOrigin: '128px 50px' }, 0)
      .to(q(root, '.ch-hook'), { y: 5, duration: 0.9 }, 0.3)
      .to(q(root, '.ch-seg2'), { x: 5 }, 0)
      .to(q(root, '.ch-seg3'), { x: -4 }, 0)
      .to(q(root, '.ch-torso'), { x: -3 }, 0)
    return [
      tl,
      gsap.to(q(root, '.ch-eyes'), { x: 3, duration: 2.2, ease: 'steps(3)', yoyo: true, repeat: -1 }),
    ]
  },

  // A vessel. Leans in to pour, comes back upright, settles.
  pour(root) {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.1, defaults: { ease: 'power2.inOut' } })
    tl.to(q(root, '.ch-body'), { rotate: -9, duration: 1.1, transformOrigin: '60% 95%' })
      .to(q(root, '.ch-arm'), { rotate: 7, duration: 1.1, transformOrigin: '160px 150px' }, 0)
      .to(q(root, '.ch-eyes'), { x: -3, duration: 1.1 }, 0)
      .to(q(root, '.ch-body'), { rotate: 0, duration: 1.2 }, 1.7)
      .to(q(root, '.ch-arm'), { rotate: 0, duration: 1.2 }, 1.7)
      .to(q(root, '.ch-eyes'), { x: 0, duration: 1.2 }, 1.7)
    return [tl, breathe(root, 2.6)]
  },

  // The whole system, holding itself together and breathing.
  assemble(root) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 2.2 } })
    tl.to(q(root, '.ch-head'), { y: -7 }, 0)
      .to(q(root, '.ch-rings'), { y: -11, opacity: 0.9, duration: 2.9 }, 0)
      .to(q(root, '.ch-armL'), { rotate: 8, transformOrigin: '100% 40%', duration: 2.5 }, 0)
      .to(q(root, '.ch-armR'), { rotate: -8, transformOrigin: '0% 40%', duration: 3.1 }, 0)
      .to(q(root, '.ch-torso'), { scaleX: 1.022, transformOrigin: '50% 100%' }, 0)
    return [tl, breathe(root, 3.4)]
  },
}

/**
 * Starts a character's idle loop.
 *
 * By default the loop is paused whenever the character is outside the
 * viewport. Pass `ambientOnly` for characters that live in an overlay, where
 * a ScrollTrigger has nothing meaningful to measure against.
 */
export function animateCharacter(root, motion, { ambientOnly = false } = {}) {
  const build = languages[motion]
  if (!build || !root || reducedMotion()) return
  if (root.dataset.animated === 'true') return
  root.dataset.animated = 'true'

  // Every tween the language created, including the secondary layers — all of
  // them have to stop together, or a character left off screen keeps paying
  // for its own breathing.
  const parts = build(root).filter(Boolean)

  if (ambientOnly) {
    parts.forEach((part) => part.play())
    return
  }

  parts.forEach((part) => part.pause())
  ScrollTrigger.create({
    trigger: root,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: ({ isActive }) => parts.forEach((part) => (isActive ? part.play() : part.pause())),
  })
}

/**
 * The scroll-driven gesture: how the character crosses its scene. Each one
 * travels differently, so no two chapters move the same way.
 */
export const gestures = {
  rise: { from: { yPercent: 26, rotate: -5 }, to: { yPercent: -30, rotate: 4 } },
  sweep: { from: { xPercent: -22, yPercent: 12 }, to: { xPercent: 14, yPercent: -14 } },
  step: { from: { xPercent: 20, yPercent: 8 }, to: { xPercent: -16, yPercent: -10 } },
  fold: { from: { yPercent: 22, scale: 0.9 }, to: { yPercent: -22, scale: 1.06 } },
  orbit: { from: { rotate: -14, yPercent: 18 }, to: { rotate: 12, yPercent: -20 } },
  beat: { from: { yPercent: 30, scale: 0.88 }, to: { yPercent: -26, scale: 1.1 } },
  travel: { from: { xPercent: -30, yPercent: 6 }, to: { xPercent: 26, yPercent: -8 } },
  pour: { from: { yPercent: 24, rotate: 8 }, to: { yPercent: -24, rotate: -6 } },
  assemble: { from: { yPercent: 28, scale: 0.86, rotate: -6 }, to: { yPercent: -26, scale: 1.08, rotate: 4 } },
}
