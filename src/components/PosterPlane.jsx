import { Media } from './primitives'
import { brand } from '../content/site'
import { useScene, gsap } from '../lib/motion'

/**
 * The poster moment. A large printed event poster physically dragged across
 * the canvas: it enters from outside the viewport, rotates as it travels,
 * crosses over the typography, and leaves through the opposite corner. The
 * scene is pinned so the traverse owns real scroll distance, and it reverses
 * exactly when the visitor scrolls back up.
 */
export default function PosterPlane({ photo, caption, word, direction = 'rtl', ghost }) {
  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)
    const dir = direction === 'rtl' ? 1 : -1

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=145%',
        pin: q('.poster__stage')[0],
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.55,
        invalidateOnRefresh: true,
      },
    })

    tl.fromTo(
      q('.poster__plane'),
      { xPercent: 66 * dir, yPercent: 74, rotate: 25 * dir, scale: 1.16 },
      { xPercent: -64 * dir, yPercent: -74, rotate: -12 * dir, scale: 0.9, ease: 'none' },
      0,
    )
      .fromTo(q('.poster__word'), { xPercent: -7 * dir }, { xPercent: 11 * dir, ease: 'none' }, 0)
      .fromTo(q('.poster__ghost'), { yPercent: 26, rotate: -6 * dir }, { yPercent: -26, rotate: 4 * dir, ease: 'none' }, 0)
      .fromTo(q('.poster__meta'), { yPercent: 60 }, { yPercent: -60, ease: 'none' }, 0)
  }, [photo, direction])

  return (
    <section className={`poster poster--${direction}`} ref={scope}>
      <div className="poster__stage">
        {ghost && (
          <figure className="poster__ghost plate">
            <Media name={ghost} sizes="42vw" />
          </figure>
        )}

        <p className="poster__word u-display" aria-hidden="true">
          {word}
        </p>

        <p className="poster__meta u-mono" aria-hidden="true">
          {brand.name} — {brand.cityShort}
        </p>

        <figure className="poster__plane">
          <div className="plate">
            <Media name={photo} sizes="82vw" />
          </div>
          <figcaption className="u-mono">{caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}
