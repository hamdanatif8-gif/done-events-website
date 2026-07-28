import { useRef } from 'react'
import { useScene, gsap, ScrollTrigger, reducedMotion } from '../lib/motion'

const base = import.meta.env.BASE_URL

/**
 * The live plane. A pinned video that opens out of a letterbox slot as it is
 * scrolled through, and only plays while it is on screen.
 */
export default function Reel({ caption }) {
  const video = useRef(null)

  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)

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
        <p className="reel__caption u-mono">{caption}</p>
      </div>
    </section>
  )
}
