import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Cinematic hero loop.
 * Autoplays muted (browser policy). Sound is opt-in through an explicit,
 * always-visible control. Playback pauses when the hero leaves the viewport
 * and respects the reduced-motion preference.
 */
export default function HeroVideo({ soundEnabled = true }) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)
  const base = import.meta.env.BASE_URL

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncPlayback = () => {
      setReduceMotion(motionPreference.matches)
      if (motionPreference.matches) {
        video.pause()
        return
      }
      const playback = video.play()
      if (playback && typeof playback.catch === 'function') playback.catch(() => {})
    }

    syncPlayback()
    motionPreference.addEventListener('change', syncPlayback)

    let observer
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (motionPreference.matches) return
          if (entry.isIntersecting) {
            const playback = video.play()
            if (playback && typeof playback.catch === 'function') playback.catch(() => {})
          } else {
            video.pause()
          }
        },
        { threshold: 0.05 },
      )
      observer.observe(video)
    }

    return () => {
      motionPreference.removeEventListener('change', syncPlayback)
      observer?.disconnect()
    }
  }, [])

  const toggleSound = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    const nextMuted = !video.muted
    video.muted = nextMuted
    if (!nextMuted) {
      video.volume = 0.55
      const playback = video.play()
      if (playback && typeof playback.catch === 'function') playback.catch(() => {})
    }
    setMuted(nextMuted)
  }, [])

  return (
    <div className="hero-media">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        preload="metadata"
        poster={`${base}media/hero-authority-poster.jpg`}
        tabIndex="-1"
        aria-hidden="true"
      >
        <source src={`${base}media/hero-authority.webm`} type="video/webm" />
        <source src={`${base}media/hero-authority.mp4`} type="video/mp4" />
      </video>
      <div className="hero-video-scrim" aria-hidden="true" />

      {soundEnabled && !reduceMotion && (
        <button
          type="button"
          className={`hero-sound${muted ? '' : ' is-live'}`}
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? 'Turn hero sound on' : 'Turn hero sound off'}
        >
          <span className="hero-sound__bars" aria-hidden="true">
            <i /><i /><i /><i />
          </span>
          <span className="hero-sound__label">{muted ? 'Sound off' : 'Sound on'}</span>
        </button>
      )}
    </div>
  )
}
