import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// --------------------------------------------------------------------------
// One scroll engine for the whole site: Lenis drives the wheel/touch feel,
// GSAP's ticker drives Lenis, ScrollTrigger scrubs every timeline off it.
// Nothing else may run its own scroll loop.
// --------------------------------------------------------------------------

let lenis = null

export const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initScroll() {
  if (reducedMotion()) {
    ScrollTrigger.config({ ignoreMobileResize: true })
    return () => {}
  }

  lenis = new Lenis({
    lerp: 0.095,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
    smoothWheel: true,
    // Native inertia on touch feels better than emulated smoothing.
    syncTouch: false,
  })

  const onScroll = () => ScrollTrigger.update()
  lenis.on('scroll', onScroll)

  const raf = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  ScrollTrigger.config({ ignoreMobileResize: true })

  // Recalculate once fonts and images have settled.
  const refresh = () => ScrollTrigger.refresh()
  if (document.fonts?.ready) document.fonts.ready.then(refresh)
  window.addEventListener('load', refresh)

  return () => {
    window.removeEventListener('load', refresh)
    gsap.ticker.remove(raf)
    lenis?.destroy()
    lenis = null
  }
}

/**
 * Stop and restart the scroll engine — used while the chapter index is open.
 *
 * This deliberately does not touch `body` overflow or position: doing so
 * changes the layout, which shifts the page under a fixed overlay and loses
 * the reading position. Stopping Lenis freezes the page exactly where it is,
 * and the native fallback only blocks the wheel.
 */
let unlock = null
export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
    return
  }
  // Reduced motion / no Lenis: block wheel and touch without moving anything.
  if (locked && !unlock) {
    const block = (event) => event.preventDefault()
    const options = { passive: false }
    window.addEventListener('wheel', block, options)
    window.addEventListener('touchmove', block, options)
    unlock = () => {
      window.removeEventListener('wheel', block, options)
      window.removeEventListener('touchmove', block, options)
      unlock = null
    }
  } else if (!locked && unlock) {
    unlock()
  }
}

/** Scroll to a section id, respecting the fixed rail bar on small screens. */
export function scrollToId(id, { immediate = false } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  const bar = window.matchMedia('(max-width: 860px)').matches
    ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--railbar')) || 58
    : 0
  const offset = -bar

  if (lenis && !immediate) {
    lenis.scrollTo(el, { offset, duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3) })
  } else {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'auto' })
  }
}

/**
 * gsap.context scoped to a ref. Animations are declared once, cleaned up
 * automatically, and skipped entirely under prefers-reduced-motion so the
 * reduced-motion visitor gets the finished composition rather than a
 * half-played one.
 */
export function useScene(setup, deps = []) {
  const scope = useRef(null)
  useLayoutEffect(() => {
    if (reducedMotion()) return
    if (!scope.current) {
      console.warn('useScene: scope ref was never attached — animations skipped')
      return
    }
    const ctx = gsap.context((self) => setup(self, scope.current), scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return scope
}

export { gsap, ScrollTrigger }
