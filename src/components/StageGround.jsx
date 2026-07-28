import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'

/**
 * THE GROUND.
 *
 * The page ground is not a background colour that swaps at a section boundary
 * — it is a surface that gets repainted. Two fixed planes sit behind the whole
 * document: the one currently showing, and the one arriving. When a chapter
 * takes the reading line, the arriving plane wipes across, alternating
 * direction each time, and only then becomes the resting colour.
 *
 * Because the wipe is a clip-path on a fixed element, it costs nothing to
 * scroll over and it never moves the layout.
 */
export default function StageGround({ field }) {
  const base = useRef(null)
  const wipe = useRef(null)
  const current = useRef(null)
  const flip = useRef(false)

  useEffect(() => {
    if (!field || field === current.current) return
    const from = current.current
    current.current = field

    // First paint, or reduced motion: set the ground and stop.
    if (!from || reducedMotion()) {
      gsap.set(base.current, { background: field })
      return
    }

    flip.current = !flip.current
    const fromEdge = flip.current
      ? { start: 'inset(0% 0% 0% 100%)', end: 'inset(0% 0% 0% 0%)' }
      : { start: 'inset(0% 100% 0% 0%)', end: 'inset(0% 0% 0% 0%)' }

    gsap
      .timeline({
        onComplete: () => {
          // Hand the colour to the resting plane and retire the wipe.
          gsap.set(base.current, { background: field })
          gsap.set(wipe.current, { clipPath: 'inset(0% 100% 0% 0%)' })
        },
      })
      .set(wipe.current, { background: field, clipPath: fromEdge.start })
      .to(wipe.current, { clipPath: fromEdge.end, duration: 0.72, ease: 'expo.inOut' })
  }, [field])

  return (
    <div className="ground" aria-hidden="true">
      <div className="ground__plane" ref={base} />
      <div className="ground__plane ground__plane--wipe" ref={wipe} />
    </div>
  )
}
