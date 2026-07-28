import Glyph from './Glyph'
import { brand } from '../content/site'
import { useScene, gsap } from '../lib/motion'

/**
 * The chapter threshold. A flat colour field opens as a band, the brand line
 * and the chapter line drift against each other, the number rises out of the
 * floor and the graphic device turns through the middle of the type.
 */
export default function ChapterCover({ chapter }) {
  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)

    gsap.fromTo(
      q('.cover__panel'),
      { clipPath: 'inset(44% 0% 44% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 34%', scrub: 0.45 },
      },
    )

    const drift = gsap.timeline({
      scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    })
    drift
      .fromTo(q('.cover__brand'), { xPercent: -4 }, { xPercent: 3.5, ease: 'none' }, 0)
      .fromTo(q('.cover__row'), { xPercent: 4 }, { xPercent: -3.5, ease: 'none' }, 0)
      .fromTo(q('.cover__num'), { yPercent: 46, rotate: 6 }, { yPercent: -16, rotate: -2, ease: 'none' }, 0)
      .fromTo(
        q('.cover__glyph'),
        { rotate: -38, yPercent: 34, scale: 0.86 },
        { rotate: 30, yPercent: -30, scale: 1.06, ease: 'none' },
        0,
      )
      .fromTo(q('.cover__foot'), { xPercent: 2 }, { xPercent: -2, ease: 'none' }, 0)
  }, [chapter.id])

  return (
    <section
      className="cover"
      id={chapter.id}
      data-chapter={chapter.id}
      data-stage={chapter.field}
      style={{ '--field': chapter.field, '--field-ink': chapter.ink }}
      aria-labelledby={`${chapter.id}-label`}
      ref={scope}
    >
      <div className="cover__panel">
        <p className="cover__eyebrow u-mono">{brand.name}</p>

        <div className="cover__type">
          <h2 className="cover__brand u-display" id={`${chapter.id}-label`}>
            <span className="u-vh">{`Chapter ${chapter.number} — ${chapter.title}. `}</span>
            <span aria-hidden="true">{brand.shortName}</span>
          </h2>
          <p className="cover__row u-display" aria-hidden="true">
            <span className="cover__word">CHAPTER</span>
            <span className="cover__num">{chapter.number}</span>
          </p>
          <Glyph variant={chapter.glyph} tint={chapter.glyphTint} className="cover__glyph" />
        </div>

        <div className="cover__foot u-mono">
          <span>{chapter.footLeft}</span>
          <span>{chapter.footRight}</span>
        </div>
      </div>
    </section>
  )
}
