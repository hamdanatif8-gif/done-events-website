import { useState } from 'react'
import CharacterScene from './CharacterScene'
import { MaskedType, MetaLine } from './primitives'
import { faq, brand } from '../content/site'
import { useScene, gsap } from '../lib/motion'

/**
 * FAQ — kept inside the publication rather than dropped into a white box.
 *
 * The questions are set at chapter scale on the cream stock, numbered like
 * everything else in the index. Opening one is a real disclosure widget with
 * real buttons and real aria state; the answer wipes down instead of popping,
 * and the rule under each row draws across as it opens.
 */
export default function FaqChapter() {
  const [open, setOpen] = useState(0)

  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)
    gsap.fromTo(
      q('.faq__item'),
      { yPercent: 26, opacity: 0.25 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: { trigger: q('.faq__list')[0], start: 'top 94%', end: 'top 40%', scrub: 0.5 },
      },
    )
  }, [])

  return (
    <section className="faq" id={faq.id} data-chapter={faq.id} data-stage="var(--cream)" ref={scope}>
      <header className="chapter__head">
        <MaskedType tag="h2" className="chapter__word" fit={faq.title.length}>
          {faq.title}
        </MaskedType>
        <MetaLine className="chapter__meta" items={['BEFORE THE FIRST MEETING', faq.lede, brand.cityShort]} />
      </header>

      <div className="faq__layout">
        <ul className="faq__list">
          {faq.items.map((item, i) => {
            const isOpen = open === i
            const id = `faq-panel-${i}`
            return (
              <li className="faq__item" key={item.q} data-open={isOpen ? 'true' : undefined}>
                <h3 className="faq__heading">
                  <button
                    type="button"
                    className="faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="faq__num u-mono">{String(i + 1).padStart(2, '0')}</span>
                    <span className="faq__q u-display">{item.q}</span>
                    <span className="faq__mark" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq__panel" id={id} hidden={!isOpen}>
                  <p className="faq__a u-body">{item.a}</p>
                </div>
              </li>
            )
          })}
        </ul>

        <CharacterScene name="beacon" className="faq__char" depth="back" />
      </div>
    </section>
  )
}
