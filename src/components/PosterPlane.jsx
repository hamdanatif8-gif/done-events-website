import EditorialPoster from './EditorialPoster'
import { brand } from '../content/site'
import { useScene, gsap } from '../lib/motion'

/**
 * THE POSTER MOMENT.
 *
 * A printed sheet is physically dragged across the canvas: it enters from
 * outside the viewport, turns as it travels, crosses over the typography and
 * leaves through the opposite corner. Two further planes travel at different
 * depths and rates behind it, so the traverse reads as a stack of physical
 * objects moving through a space rather than one image sliding on a plane.
 *
 * The scene is pinned so the traverse owns real scroll distance, and every
 * value is a scrubbed fromTo — scrolling back up rebuilds it exactly.
 */
export default function PosterPlane({ chapter }) {
  const poster = chapter.poster
  const direction = poster.direction ?? 'rtl'

  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)
    const dir = direction === 'rtl' ? 1 : -1

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=155%',
        pin: q('.poster__stage')[0],
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.55,
        invalidateOnRefresh: true,
      },
    })

    tl.fromTo(
      q('.poster__plane'),
      { xPercent: 72 * dir, yPercent: 78, rotate: 21 * dir, scale: 1.08 },
      { xPercent: -70 * dir, yPercent: -78, rotate: -10 * dir, scale: 0.92, ease: 'none' },
      0,
    )
      // Two trailing planes at other depths, offset in time and rate.
      .fromTo(
        q('.poster__trail--1'),
        { xPercent: 96 * dir, yPercent: 104, rotate: 30 * dir },
        { xPercent: -52 * dir, yPercent: -56, rotate: -4 * dir, ease: 'none' },
        0,
      )
      .fromTo(
        q('.poster__trail--2'),
        { xPercent: 118 * dir, yPercent: 128, rotate: 38 * dir },
        { xPercent: -34 * dir, yPercent: -36, rotate: 4 * dir, ease: 'none' },
        0,
      )
      .fromTo(q('.poster__word'), { xPercent: -9 * dir }, { xPercent: 13 * dir, ease: 'none' }, 0)
      .fromTo(q('.poster__meta'), { yPercent: 64 }, { yPercent: -64, ease: 'none' }, 0)
  }, [chapter.id])

  return (
    <section className={`poster poster--${direction}`} ref={scope}>
      <div className="poster__stage">
        <p className="poster__word u-display" aria-hidden="true">
          {poster.word}
        </p>

        <p className="poster__meta u-mono" aria-hidden="true">
          {brand.name} — {brand.cityShort}
        </p>

        <div className="poster__plane poster__trail poster__trail--2" aria-hidden="true">
          <EditorialPoster
            word={poster.word}
            number={chapter.number}
            category={poster.caption}
            field={chapter.field}
            tone="field"
          />
        </div>

        <div className="poster__plane poster__trail poster__trail--1" aria-hidden="true">
          <EditorialPoster
            word={poster.word}
            number={chapter.number}
            category={poster.caption}
            character={chapter.character}
            field={chapter.field}
            tone="ink"
          />
        </div>

        <div className="poster__plane">
          <EditorialPoster
            photo={poster.photo}
            word={poster.word}
            number={chapter.number}
            category={poster.caption}
            line={poster.line}
            character={chapter.character}
            field={chapter.field}
          />
        </div>
      </div>
    </section>
  )
}
