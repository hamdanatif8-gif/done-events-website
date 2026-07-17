import { useEffect, useRef } from 'react'

// A single cinematic, self-hosted showreel band (owned event footage).
// Autoplays muted + looped inline; falls back to the poster still when the
// visitor prefers reduced motion or autoplay is blocked.
export default function Showreel() {
  const videoRef = useRef(null)
  const base = import.meta.env.BASE_URL

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      v.removeAttribute('autoplay')
      v.pause()
      return
    }
    const p = v.play()
    if (p && typeof p.catch === 'function') p.catch(() => {})
  }, [])

  return (
    <section className="showreel" aria-label="Done Events showreel">
      <video
        ref={videoRef}
        className="showreel-video"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        poster={`${base}media/showreel-poster.jpg`}
      >
        <source src={`${base}media/showreel.mp4`} type="video/mp4" />
        <source src={`${base}media/showreel.webm`} type="video/webm" />
      </video>
      <div className="showreel-overlay">
        <span className="section-label showreel-label">Dubai, Our Stage</span>
        <h2 className="showreel-title">Day to Night.<br />Done Right.</h2>
      </div>
    </section>
  )
}
