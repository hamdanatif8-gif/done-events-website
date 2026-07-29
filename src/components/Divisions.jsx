import { useCallback, useRef, useState } from 'react'
import Character from './Character'
import { family } from './characterFamily'
import { divisions, brand } from '../content/site'
import { useScene, gsap, scrollToId, reducedMotion } from '../lib/motion'
import { animateCharacter } from '../lib/characterMotion'

/**
 * THE DIVISIONS.
 *
 * The commercial answer, delivered early and in one piece: ten divisions, each
 * a link into the chapter that covers it. It is set as a numbered editorial
 * table rather than a grid of cards — the rows are the design, and the crew
 * member responsible for each one steps forward as you read down it.
 *
 * This is the part of the site a corporate or private client can scan in ten
 * seconds to decide whether DONE does the thing they need.
 */
export default function Divisions() {
  const [active, setActive] = useState(0)
  const stage = useRef(null)
  const current = divisions[active]

  const focus = useCallback((index) => {
    setActive(index)
    if (reducedMotion() || !stage.current) return
    gsap.fromTo(
      stage.current,
      { yPercent: 14, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out', overwrite: 'auto' },
    )
  }, [])

  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)
    animateCharacter(q('.divisions__char svg')[0], family[current.character]?.motion)

    // The rows arrive as a list being set, one line at a time.
    gsap.fromTo(
      q('.divisions__row'),
      { xPercent: -4, opacity: 0.2 },
      {
        xPercent: 0,
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: q('.divisions__list')[0], start: 'top 92%', end: 'top 34%', scrub: 0.5 },
      },
    )

    gsap.fromTo(
      q('.divisions__rule'),
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: '0% 50%',
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 88%', end: 'top 52%', scrub: 0.4 },
      },
    )
  }, [])

  return (
    <section className="divisions" aria-labelledby="divisions-heading" ref={scope}>
      <span className="divisions__rule" aria-hidden="true" />

      <header className="divisions__head">
        <h4 className="divisions__title u-display" id="divisions-heading">
          What DONE does
        </h4>
        <p className="divisions__meta u-mono">
          TEN DIVISIONS — {brand.cityShort} — ONE TEAM
        </p>
      </header>

      <div className="divisions__layout">
        <ol className="divisions__list">
          {divisions.map((item, i) => (
            <li className="divisions__row" key={item.number} data-active={active === i ? 'true' : undefined}>
              <a
                href={`#${item.chapter}`}
                onMouseEnter={() => focus(i)}
                onFocus={() => focus(i)}
                onClick={(event) => {
                  event.preventDefault()
                  scrollToId(item.chapter)
                  window.history.pushState(null, '', `#${item.chapter}`)
                }}
              >
                <span className="divisions__num u-mono">{item.number}</span>
                <span className="divisions__name u-display">{item.title}</span>
                <span className="divisions__line">{item.line}</span>
                <span className="divisions__go u-mono" aria-hidden="true">
                  {item.chapter.replace('ch', 'CH.')}
                </span>
              </a>
            </li>
          ))}
        </ol>

        <aside className="divisions__aside" aria-hidden="true">
          <div className="divisions__stage" ref={stage}>
            <div className="divisions__char">
              <Character key={current.character} name={current.character} />
            </div>
            <p className="divisions__caption u-display">{current.title}</p>
            <p className="divisions__note u-mono">{family[current.character]?.name}</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
