import { useState } from 'react'
import { Media, MaskedType, MetaLine } from './primitives'
import { work, brand } from '../content/site'
import { useScene, gsap, ScrollTrigger } from '../lib/motion'

/**
 * WORK — an index, not a portfolio grid. The rows are the content; a single
 * held media plate changes underneath them as each row takes the reading line.
 */
export default function WorkIndex() {
  const [active, setActive] = useState(0)

  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)

    q('.work__row').forEach((row, i) => {
      ScrollTrigger.create({
        trigger: row,
        start: 'top 62%',
        end: 'bottom 62%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      })

      gsap.fromTo(
        row,
        { yPercent: 30, opacity: 0.38 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: row, start: 'top 94%', end: 'top 58%', scrub: 0.5 },
        },
      )
    })

    gsap.fromTo(
      q('.work__plate img'),
      { scale: 1.14 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
      },
    )
  }, [])

  return (
    <section className="work" id={work.id} data-chapter={work.id} data-stage="var(--cream)" ref={scope}>
      <header className="chapter__head">
        <MaskedType tag="h2" className="chapter__word" fit={work.title.length}>
          {work.title}
        </MaskedType>
        <MetaLine className="chapter__meta" items={['SELECTED FORMATS', 'EVENT ENVIRONMENTS', brand.cityShort]} />
      </header>

      <p className="work__intro u-body">{work.intro}</p>

      <div className="work__layout">
        <ol className="work__list">
          {work.rows.map((row, i) => (
            <li className="work__row" key={row.number} data-active={active === i ? 'true' : undefined}>
              <span className="work__num u-mono">{row.number}</span>
              <h3 className="work__title u-display">{row.title}</h3>
              <p className="work__label u-body">{row.label}</p>
              <p className="work__desc u-mono">{row.description}</p>
              <div className="work__inline plate">
                <Media name={row.photo} sizes="92vw" />
              </div>
            </li>
          ))}
        </ol>

        <div className="work__media" aria-hidden="true">
          <div className="work__plate plate">
            {work.rows.map((row, i) => (
              <Media
                key={row.photo}
                name={row.photo}
                sizes="42vw"
                className={`work__shot ${active === i ? 'is-on' : ''}`}
              />
            ))}
          </div>
          <p className="work__caption u-mono">{work.rows[active]?.title}</p>
        </div>
      </div>
    </section>
  )
}
