import { useRef } from 'react'
import Character from './Character'
import { useScene, gsap, ScrollTrigger, reducedMotion } from '../lib/motion'
import { animateCharacter } from '../lib/characterMotion'

const base = import.meta.env.BASE_URL

/**
 * THE LIVE PLANE — the one dark moment in the publication.
 *
 * The house lights go down for CH.04: the ground goes to a warm near-black
 * rather than a neutral one, a copper wash rises behind the frame, and the
 * letterbox slot opens as the visitor scrolls through it. Pulse stands at the
 * edge of the stage, lit from the screen.
 *
 * It is an interlude, not a theme. Nothing else on the site goes dark, and the
 * chapter's own colour returns the moment the scene is past.
 */
export default function Reel({ caption }) {
  const video = useRef(null)

  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)
    animateCharacter(q('.reel__char svg')[0], 'beat')

    gsap
      .timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=115%',
          pin: q('.reel__stage')[0],
          scrub: 0.5,
          anticipatePin: 1,
        },
      })
      .fromTo(
        q('.reel__frame'),
        { clipPath: 'inset(22% 13% 22% 13%)', scale: 1.06 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none' },
        0,
      )
      .fromTo(q('.reel__wash'), { opacity: 0, scale: 0.82 }, { opacity: 1, scale: 1.12, ease: 'none' }, 0)
      .fromTo(q('.reel__char'), { xPercent: -60, yPercent: 30 }, { xPercent: 24, yPercent: 0, ease: 'none' }, 0)
      .fromTo(q('.reel__caption'), { yPercent: 120 }, { yPercent: 0, ease: 'none', duration: 0.4 }, 0.2)

    ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: ({ isActive }) => {
        const el = video.current
        if (!el) return
        if (isActive) el.play?.().catch(() => {})
        else el.pause?.()
      },
    })
  }, [])

  return (
    <section className="reel" ref={scope}>
      <div className="reel__stage">
        <span className="reel__wash" aria-hidden="true" />

        <figure className="reel__frame plate">
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="metadata"
            poster={`${base}media/showreel-poster.jpg`}
            autoPlay={!reducedMotion()}
            aria-label="Silent showreel of DONE Events production work"
          >
            <source src={`${base}media/showreel.webm`} type="video/webm" />
            <source src={`${base}media/showreel.mp4`} type="video/mp4" />
          </video>
        </figure>

        <div className="reel__char" aria-hidden="true">
          <Character name="pulse" />
        </div>

        <p className="reel__caption u-mono">{caption}</p>
      </div>
    </section>
  )
}
