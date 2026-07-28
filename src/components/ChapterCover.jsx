import Character from './Character'
import { family } from './characterFamily'
import { brand } from '../content/site'
import { useScene, gsap } from '../lib/motion'
import { animateCharacter } from '../lib/characterMotion'

/**
 * THE CHAPTER THRESHOLD.
 *
 * One editorial system, art-directed separately for every chapter. The system
 * is fixed — colour field, brand line, CHAPTER + number, footer rule, and the
 * chapter's own character standing in the type. Everything else varies:
 *
 *   stand   the character stands on the baseline, in front of the number
 *   behind  it stands behind the words, only its top half clearing the type
 *   peek    it rises out of the bottom edge of the field, cropped by it
 *   split   the words part around it and it holds the centre
 *
 * Together with per-chapter scale, horizontal position, number placement and
 * entry direction, no two thresholds in the publication are composed alike.
 */
export default function ChapterCover({ chapter, index }) {
  const art = chapter.cover ?? {}
  const layout = art.layout ?? 'stand'
  const spec = family[chapter.character]
  const fromLeft = index % 2 === 0

  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)
    animateCharacter(q('.cover__char svg')[0], spec?.motion)

    // The field opens as a band from the centre out.
    gsap.fromTo(
      q('.cover__panel'),
      { clipPath: 'inset(46% 0% 46% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 32%', scrub: 0.45 },
      },
    )

    const drift = gsap.timeline({
      scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    })

    // Type and number counter-move; the direction alternates down the
    // publication so consecutive thresholds never read the same way.
    const dir = fromLeft ? 1 : -1
    drift
      .fromTo(q('.cover__brand'), { xPercent: -4.5 * dir }, { xPercent: 3.5 * dir, ease: 'none' }, 0)
      .fromTo(q('.cover__row'), { xPercent: 4 * dir }, { xPercent: -4 * dir, ease: 'none' }, 0)
      .fromTo(q('.cover__foot'), { xPercent: 2 * dir }, { xPercent: -2 * dir, ease: 'none' }, 0)

    if (art.numberPlace === 'below') {
      drift.fromTo(q('.cover__num'), { yPercent: 34, xPercent: -6 }, { yPercent: -12, xPercent: 4, ease: 'none' }, 0)
    } else {
      drift.fromTo(q('.cover__num'), { yPercent: 52, rotate: 5 }, { yPercent: -14, rotate: -2, ease: 'none' }, 0)
    }

    // Each character arrives at its threshold differently.
    const entries = {
      stand: [{ yPercent: 42, rotate: -6 }, { yPercent: -14, rotate: 3 }],
      behind: [{ yPercent: 30, xPercent: -14 }, { yPercent: -18, xPercent: 10 }],
      peek: [{ yPercent: 70, scale: 0.88 }, { yPercent: 6, scale: 1.04 }],
      split: [{ yPercent: 34, scale: 0.82 }, { yPercent: -16, scale: 1.12 }],
    }
    const [from, to] = entries[layout] ?? entries.stand
    drift.fromTo(q('.cover__char'), from, { ...to, ease: 'none' }, 0)
  }, [chapter.id])

  return (
    <section
      className={`cover cover--${layout}`}
      id={chapter.id}
      data-chapter={chapter.id}
      data-stage={chapter.field}
      style={{
        '--field': chapter.field,
        '--field-ink': chapter.ink,
        '--char-x': `${art.x ?? 62}%`,
        '--char-scale': art.scale ?? 1,
      }}
      aria-labelledby={`${chapter.id}-label`}
      ref={scope}
    >
      <div className="cover__panel">
        <p className="cover__eyebrow u-mono">{brand.name}</p>

        <div className={`cover__type cover__type--${art.numberPlace ?? 'right'}`}>
          <h2 className="cover__brand u-display" id={`${chapter.id}-label`}>
            <span className="u-vh">{`Chapter ${chapter.number} — ${chapter.title}. `}</span>
            <span aria-hidden="true">{brand.shortName}</span>
          </h2>

          <p className="cover__row u-display" aria-hidden="true">
            <span className="cover__word">CHAPTER</span>
            <span className="cover__num">{chapter.number}</span>
          </p>

          <div className="cover__char" aria-hidden="true">
            <Character name={chapter.character} />
          </div>
        </div>

        <div className="cover__foot u-mono">
          <span>{chapter.footLeft}</span>
          <span>{spec?.name ? `${spec.name.toUpperCase()} — ${spec.role.toUpperCase()}` : ''}</span>
          <span>{chapter.footRight}</span>
        </div>
      </div>
    </section>
  )
}
