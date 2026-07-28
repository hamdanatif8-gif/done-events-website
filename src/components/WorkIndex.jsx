import { useCallback, useRef, useState } from 'react'
import Character from './Character'
import EditorialPoster from './EditorialPoster'
import { MaskedType, MetaLine } from './primitives'
import { family } from './characterFamily'
import { work, brand } from '../content/site'
import { useScene, gsap, ScrollTrigger, reducedMotion } from '../lib/motion'
import { animateCharacter } from '../lib/characterMotion'

/**
 * WORK — the muster.
 *
 * The whole crew is present at once, standing in a line along the floor. The
 * index above them is the control: pointing at a category, or scrolling it to
 * the reading line, brings that character forward and swaps the printed sheet
 * held in the centre of the room. The ground colour changes with it, so the
 * section repaints itself as the visitor reads down.
 *
 * It is an index of formats, not a portfolio grid, and it names no clients.
 */
export default function WorkIndex() {
  const [active, setActive] = useState(0)
  const crew = useRef(null)
  const row = work.rows[active]

  // Bring one character forward and let the rest step back.
  const focus = useCallback((index) => {
    setActive(index)
    if (reducedMotion() || !crew.current) return
    const figures = [...crew.current.querySelectorAll('.crew__member')]
    figures.forEach((figure, i) => {
      const on = i === index
      gsap.to(figure, {
        yPercent: on ? -14 : 0,
        scale: on ? 1.16 : 0.88,
        opacity: on ? 1 : 0.4,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    })
  }, [])

  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)

    q('.crew__member').forEach((figure, i) => {
      animateCharacter(figure.querySelector('svg'), family[work.rows[i].character]?.motion)
    })

    // The crew walks in along the floor as the section arrives.
    gsap.fromTo(
      q('.crew__member'),
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 0.45,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: q('.work__crew')[0], start: 'top 96%', end: 'top 52%', scrub: 0.5 },
      },
    )

    q('.work__row').forEach((element, i) => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 62%',
        end: 'bottom 62%',
        onEnter: () => focus(i),
        onEnterBack: () => focus(i),
      })

      gsap.fromTo(
        element,
        { xPercent: -6, opacity: 0.3 },
        {
          xPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: element, start: 'top 94%', end: 'top 58%', scrub: 0.5 },
        },
      )
    })

    // The held sheet turns slowly through the whole section.
    gsap.fromTo(
      q('.work__sheet'),
      { rotate: -7, yPercent: 8 },
      {
        rotate: 5,
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
      },
    )
  }, [])

  return (
    <section
      className="work"
      id={work.id}
      data-chapter={work.id}
      data-stage="var(--cream)"
      style={{ '--work-field': row?.field }}
      ref={scope}
    >
      <header className="chapter__head">
        <MaskedType tag="h2" className="chapter__word" fit={work.title.length}>
          {work.title}
        </MaskedType>
        <MetaLine
          className="chapter__meta"
          items={['THE INDEX', 'EVENT FORMATS', brand.cityShort]}
        />
      </header>

      <p className="work__intro u-body">{work.intro}</p>

      <div className="work__layout">
        <ol className="work__list">
          {work.rows.map((item, i) => (
            <li className="work__row" key={item.number} data-active={active === i ? 'true' : undefined}>
              <button
                type="button"
                className="work__button"
                onMouseEnter={() => focus(i)}
                onFocus={() => focus(i)}
                aria-describedby={`work-desc-${item.number}`}
                aria-pressed={active === i}
              >
                <span className="work__num u-mono">{item.number}</span>
                <span className="work__title u-display">{item.title}</span>
                <span className="work__label">{item.label}</span>
              </button>
              <p className="work__desc u-mono" id={`work-desc-${item.number}`}>
                {item.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="work__held" aria-hidden="true">
          <div className="work__sheet">
            <EditorialPoster
              key={row?.number}
              photo={row?.photo}
              word={row?.title}
              number={row?.chapter?.replace('ch', '')}
              category={row?.label}
              line={row?.description}
              character={row?.character}
              field={row?.field}
            />
          </div>
        </div>
      </div>

      <div className="work__crew" ref={crew} aria-hidden="true">
        {work.rows.map((item, i) => (
          <div
            className="crew__member"
            key={item.number}
            data-active={active === i ? 'true' : undefined}
            style={{ '--crew-scale': (family[item.character]?.footprint ?? 0.5) + 0.55 }}
          >
            <Character name={item.character} />
            <span className="crew__tag u-mono">{family[item.character]?.name}</span>
          </div>
        ))}
      </div>

      <p className="work__note u-mono">{work.note}</p>
    </section>
  )
}
