import { Media, MetaLine } from './primitives'
import { brand, capabilities } from '../content/site'
import { useScene, gsap } from '../lib/motion'

/**
 * The opening. A media band cropped by the viewport with the company name set
 * at poster scale in the ground colour, so the letterforms only exist where
 * the media exists and dissolve where it stops.
 */
export default function Overture() {
  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)

    gsap
      .timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 } })
      .fromTo(q('.overture__photo img'), { scale: 1.24, yPercent: -6 }, { scale: 1.02, yPercent: 6, ease: 'none' }, 0)
      .fromTo(q('.overture__block'), { xPercent: -26, yPercent: -4 }, { xPercent: 9, yPercent: 4, ease: 'none' }, 0)
      .fromTo(q('.overture__word'), { yPercent: 0 }, { yPercent: -13, ease: 'none' }, 0)
      .fromTo(q('.overture__cue'), { opacity: 1 }, { opacity: 0, ease: 'none', duration: 0.35 }, 0)

    gsap.fromTo(
      q('.overture__lede'),
      { xPercent: 5 },
      {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: { trigger: q('.overture__lede')[0], start: 'top bottom', end: 'bottom top', scrub: 0.5 },
      },
    )

    // Entrance: the band opens, the name arrives already in place behind it.
    gsap
      .timeline({ defaults: { ease: 'expo.out' } })
      .fromTo(q('.overture__band'), { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5 })
      .fromTo(q('.overture__line'), { yPercent: 26 }, { yPercent: 0, duration: 1.4, stagger: 0.08 }, 0.15)
      .fromTo(q('.metarow span'), { yPercent: 120 }, { yPercent: 0, duration: 1, stagger: 0.06 }, 0.6)
  }, [])

  return (
    <section className="overture" id="home" ref={scope} aria-labelledby="overture-title">
      <div className="overture__band">
        <Media
          name="runway"
          priority
          sizes="100vw"
          className="overture__photo plate"
          alt="An evening event walkway lined with lit tables and greenery leading to an illuminated stage set"
        />
        <span className="overture__block" aria-hidden="true" />

        <h1 className="overture__word u-display" id="overture-title">
          <span className="u-vh">DONE Events &amp; Entertainment — Dubai</span>
          <span className="overture__line" aria-hidden="true">
            DONE EVENTS
          </span>
          <span className="overture__line" aria-hidden="true">
            ENTERTAINMENT
          </span>
        </h1>

        <p className="overture__cue u-mono" aria-hidden="true">
          Scroll ↓
        </p>
      </div>

      <MetaLine items={[brand.name, brand.city, brand.tagline]} />

      <p className="overture__lede u-display">{brand.edition}</p>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[0, 1].map((pass) => (
            <span className="ticker__group u-mono" key={pass}>
              {capabilities.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
