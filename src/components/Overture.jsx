import { useId } from 'react'
import Character from './Character'
import { MetaLine } from './primitives'
import { brand, capabilities, contact, img, photos } from '../content/site'
import { useScene, gsap } from '../lib/motion'
import { animateCharacter } from '../lib/characterMotion'

/**
 * THE OVERTURE.
 *
 * The company name is not type sitting on a picture — it is the aperture. Two
 * words are stretched to the exact width of the viewport and used as a clipping
 * window; behind them a real event photograph, two colour fields and one member
 * of the crew all move independently, so the letterforms fill with a picture
 * that is going somewhere. `textLength` forces the fit, which means the
 * composition holds at every width without depending on font metrics.
 *
 * A second Spark stands in front of the word, at the visitor's scale, so the
 * crew is established before the first scroll.
 */
export default function Overture() {
  const uid = useId().replace(/:/g, '')
  const clip = `ov-clip-${uid}`
  const hero = photos.corporate ?? Object.values(photos)[0]

  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)
    animateCharacter(q('.overture__spark svg')[0], 'rise')
    animateCharacter(q('.overture__inner-spark')[0], 'rise')

    // Continuous life before any scroll: the picture and the fields inside the
    // letterforms keep moving, slowly, on their own clocks.
    gsap.to(q('.ov-photo'), { xPercent: -6, duration: 26, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    gsap.to(q('.ov-field-a'), { attr: { x: 220 }, duration: 17, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    gsap.to(q('.ov-field-b'), { attr: { x: -180 }, duration: 21, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    gsap.to(q('.overture__inner-spark'), {
      attr: { x: 700 },
      duration: 19,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Entrance: the two lines arrive as objects, not as a fade.
    gsap
      .timeline({ defaults: { ease: 'expo.out' } })
      .fromTo(q('.overture__type'), { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5 })
      .fromTo(q('.overture__spark'), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.4 }, 0.5)
      .fromTo(q('.metarow span'), { yPercent: 120 }, { yPercent: 0, duration: 1, stagger: 0.06 }, 0.55)
      .fromTo(q('.overture__what'), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1 }, 0.75)

    // Departure: the word grows past the viewport and lets CH.00 through.
    gsap
      .timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 } })
      .fromTo(q('.overture__type'), { scale: 1, yPercent: 0 }, { scale: 1.22, yPercent: -16, ease: 'none' }, 0)
      .fromTo(q('.overture__spark'), { yPercent: 0 }, { yPercent: -46, ease: 'none' }, 0)
      .fromTo(q('.overture__cue'), { opacity: 1 }, { opacity: 0, ease: 'none', duration: 0.3 }, 0)
      .fromTo(q('.overture__rule'), { xPercent: 0 }, { xPercent: -34, ease: 'none' }, 0)
  }, [])

  return (
    <section className="overture" id="home" ref={scope} aria-labelledby="overture-title">
      <h1 className="u-vh" id="overture-title">
        DONE Events &amp; Entertainment — event planning, production, entertainment and
        hospitality in Dubai, United Arab Emirates
      </h1>

      <div className="overture__type" aria-hidden="true">
        <svg viewBox="0 0 1000 460" preserveAspectRatio="xMidYMid meet" className="overture__svg">
          <defs>
            <clipPath id={clip}>
              <text className="ov-word" x="0" y="196" textLength="1000" lengthAdjust="spacingAndGlyphs">
                DONE
              </text>
              <text className="ov-word" x="0" y="430" textLength="1000" lengthAdjust="spacingAndGlyphs">
                EVENTS
              </text>
            </clipPath>
          </defs>

          <g clipPath={`url(#${clip})`}>
            <rect x="0" y="0" width="1000" height="460" fill="var(--cream)" />

            {hero && (
              <image
                className="ov-photo"
                href={`${img(hero.base, 1200)}.webp`}
                x="-70"
                y="-40"
                width="1200"
                height="560"
                preserveAspectRatio="xMidYMid slice"
              />
            )}

            {/* Colour fields travelling behind the picture's own movement. */}
            <rect className="ov-field-a" x="-160" y="0" width="420" height="460" fill="var(--pink)" opacity="0.86" />
            <rect className="ov-field-b" x="640" y="0" width="520" height="460" fill="var(--orange)" opacity="0.7" />
            <rect x="0" y="198" width="1000" height="24" fill="var(--yellow)" opacity="0.9" />

            {/* A glimpse of the crew, seen only through the letterforms. */}
            <svg className="overture__inner-spark" x="120" y="150" width="300" height="390" viewBox="0 0 200 260">
              <Character name="spark" shadow={false} />
            </svg>
          </g>
        </svg>
      </div>

      <div className="overture__spark" aria-hidden="true">
        <Character name="spark" />
      </div>

      <MetaLine items={[brand.name, brand.city, brand.tagline]} />

      <p className="overture__what">{brand.what}</p>

      <p className="overture__rule u-mono" aria-hidden="true">
        {brand.edition} — EDITION 01
      </p>

      <p className="overture__cue u-mono" aria-hidden="true">
        Scroll ↓
      </p>

      <a className="overture__jump u-mono" href={`mailto:${contact.email}`}>
        Start a brief
      </a>

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
