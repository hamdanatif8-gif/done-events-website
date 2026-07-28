import { useCallback, useEffect, useRef, useState } from 'react'
import Character from './Character'
import { family } from './characterFamily'
import { navItems, chapters, brand, contact } from '../content/site'
import { scrollToId, lockScroll, gsap, reducedMotion } from '../lib/motion'
import { animateCharacter } from '../lib/characterMotion'
import './rail.css'

// The rail's compact labels, paired with the full titles the expanded index
// shows. HOME / WORK / FAQ / MAIL have no chapter record of their own.
const titles = {
  home: 'OVERTURE',
  work: 'THE INDEX',
  faq: 'QUESTIONS',
  mail: 'EVENT BRIEF',
  ...Object.fromEntries(chapters.map((c) => [c.id, c.title])),
}
const charFor = {
  home: 'spark',
  work: 'composite',
  faq: 'beacon',
  mail: 'composite',
  ...Object.fromEntries(chapters.map((c) => [c.id, c.character])),
}

/**
 * THE CHAPTER RAIL.
 *
 * Not a header, and it does not collapse into a hamburger on desktop — it is
 * part of the artwork. It carries the compact chapter list at all times, and
 * opens into a full-height index: the rail's own colour pushes across the
 * viewport, then the chapter lines arrive in sequence. Pointing at a line
 * swaps the character standing beside them.
 *
 * The expansion is one paused timeline played forwards to open and reversed to
 * close, so the two directions can never desynchronise. Opening stops the
 * scroll engine rather than touching the body, so nothing jumps and the
 * reading position is exactly where it was when it closes.
 */
export default function ChapterRail({ active }) {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(null)
  const panel = useRef(null)
  const trigger = useRef(null)
  const timeline = useRef(null)

  const shown = hover ?? active
  const shownChar = charFor[shown] ?? 'spark'

  // Back / forward buttons move between chapters.
  useEffect(() => {
    const onPop = () => {
      const id = window.location.hash.replace('#', '')
      if (id) scrollToId(id)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // On phones the rail lies down and scrolls; keep the active chapter in view.
  useEffect(() => {
    if (open || !window.matchMedia('(max-width: 860px)').matches) return
    document
      .querySelector(`.rail__link[data-active='true']`)
      ?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [active, open])

  useEffect(() => {
    if (!panel.current) return

    if (reducedMotion()) {
      gsap.set(panel.current, { clipPath: open ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)' })
      lockScroll(open)
      return
    }

    if (!timeline.current) {
      const q = gsap.utils.selector(panel.current)
      timeline.current = gsap
        .timeline({ paused: true, defaults: { ease: 'expo.out' } })
        .fromTo(
          panel.current,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.66, ease: 'expo.inOut' },
          0,
        )
        .fromTo(
          q('.index__row'),
          { xPercent: -9, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.66, stagger: 0.04 },
          0.2,
        )
        .fromTo(
          q('.index__aside > *'),
          { yPercent: 38, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.58, stagger: 0.06 },
          0.38,
        )
    }

    if (open) timeline.current.play()
    else timeline.current.reverse()
    lockScroll(open)
  }, [open])

  // The character standing in the open index keeps its idle loop.
  useEffect(() => {
    if (!open) return
    const svg = panel.current?.querySelector('.index__char svg')
    if (svg) animateCharacter(svg, family[shownChar]?.motion, { ambientOnly: true })
  }, [open, shownChar])

  // Escape closes; Tab stays inside; focus returns to the control that opened.
  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        trigger.current?.focus()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = panel.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    panel.current?.querySelector('.index__row a')?.focus({ preventScroll: true })
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const go = useCallback((event, id) => {
    event.preventDefault()
    setOpen(false)
    // Let the panel start closing before the page moves under it.
    setTimeout(() => scrollToId(id), reducedMotion() ? 0 : 170)
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, '', `#${id}`)
    }
  }, [])

  return (
    <>
      <nav className="rail" aria-label="Chapters" data-open={open ? 'true' : undefined}>
        <button
          type="button"
          className="rail__toggle"
          ref={trigger}
          aria-expanded={open}
          aria-controls="chapter-index"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="rail__toggle-label">{open ? 'CLOSE' : 'INDEX'}</span>
          <span className="rail__toggle-mark" aria-hidden="true" />
        </button>

        <ul className="rail__list">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                className="rail__link"
                href={`#${item.id}`}
                onClick={(event) => go(event, item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                data-active={active === item.id ? 'true' : undefined}
              >
                <span className="rail__label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="rail__mark u-mono" aria-hidden="true">
          DONE
          <br />
          EVENTS &amp;
          <br />
          ENTERTAINMENT.
          <br />
          DUBAI, UAE.
        </p>

        <span className="rail__edge" aria-hidden="true" />
      </nav>

      <div className="index" id="chapter-index" ref={panel} aria-hidden={!open}>
        <div className="index__inner">
          <ol className="index__list">
            {navItems.map((item, i) => (
              <li
                className="index__row"
                key={item.id}
                data-active={active === item.id ? 'true' : undefined}
              >
                <a
                  href={`#${item.id}`}
                  tabIndex={open ? undefined : -1}
                  onClick={(event) => go(event, item.id)}
                  onMouseEnter={() => setHover(item.id)}
                  onFocus={() => setHover(item.id)}
                  onMouseLeave={() => setHover(null)}
                  onBlur={() => setHover(null)}
                >
                  <span className="index__num u-mono">{String(i).padStart(2, '0')}</span>
                  <span className="index__label u-display">{item.label}</span>
                  <span className="index__title u-mono">{titles[item.id]}</span>
                </a>
              </li>
            ))}
          </ol>

          <div className="index__aside">
            <div className="index__char" aria-hidden="true">
              <Character key={shownChar} name={shownChar} />
            </div>
            <p className="index__caption u-mono">
              {family[shownChar]?.name} — {family[shownChar]?.role}
            </p>
            <dl className="index__contact">
              <div>
                <dt className="u-mono">Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} tabIndex={open ? undefined : -1}>
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="u-mono">Phone</dt>
                <dd>
                  <a href={`tel:${contact.phoneHref}`} tabIndex={open ? undefined : -1}>
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>
            <p className="index__sign u-mono">
              {brand.name} — {brand.cityShort}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
