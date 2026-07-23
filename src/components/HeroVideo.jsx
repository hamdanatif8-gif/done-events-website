import { useEffect, useRef, useState } from 'react'
import { FiPause, FiPlay, FiVolume2, FiVolumeX } from 'react-icons/fi'

// Cinematic hero loop with a licensed audio bed (NCS release supplied by the
// client). Autoplay starts muted per browser policy; the sound control is a
// deliberate user gesture, which also satisfies autoplay-with-audio rules.
export default function HeroVideo() {
  const videoRef = useRef(null)
  const base = import.meta.env.BASE_URL

  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncPlayback = () => {
      const prefersReduced = motionPreference.matches
      setReduced(prefersReduced)
      if (prefersReduced) {
        video.pause()
        setPlaying(false)
        return
      }
      const playback = video.play()
      if (playback && typeof playback.catch === 'function') {
        playback.then(() => setPlaying(true)).catch(() => setPlaying(false))
      }
    }

    syncPlayback()
    motionPreference.addEventListener('change', syncPlayback)
    return () => motionPreference.removeEventListener('change', syncPlayback)
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const next = !muted
    video.muted = next
    if (!next) {
      const playback = video.play()
      if (playback && typeof playback.catch === 'function') playback.catch(() => {})
    }
    setMuted(next)
  }

  const toggleMotion = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      const playback = video.play()
      if (playback && typeof playback.catch === 'function') playback.catch(() => {})
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

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

      <div className="hero-media__controls">
        <button
          type="button"
          className="hero-media__control"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? 'Unmute hero film' : 'Mute hero film'}
        >
          {muted ? <FiVolumeX aria-hidden="true" /> : <FiVolume2 aria-hidden="true" />}
          <span>{muted ? 'Sound off' : 'Sound on'}</span>
        </button>
        {!reduced && (
          <button
            type="button"
            className="hero-media__control hero-media__control--motion"
            onClick={toggleMotion}
            aria-pressed={!playing}
            aria-label={playing ? 'Pause hero film' : 'Play hero film'}
          >
            {playing ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
            <span>{playing ? 'Pause' : 'Play'}</span>
          </button>
        )}
      </div>
    </div>
  )
}
