import { useEffect, useRef, useState } from 'react'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi'

const SOUND_PREFERENCE_KEY = 'done-events-hero-sound'

export default function HeroVideo() {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  // The hero asset ships with an audio track, so the sound control is available
  // by default. Autoplay must stay muted to be allowed, and a muted <video>
  // never decodes audio (webkitAudioDecodedByteCount stays 0 in Chrome, and
  // audioTracks is unavailable there) — so we must not gate *showing* the
  // control on decoding. We only hide it when a browser can prove the media is
  // silent.
  const [hasAudio, setHasAudio] = useState(true)
  const base = import.meta.env.BASE_URL

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const detectAudio = () => {
      // Only act on a definitive "no audio" signal. Firefox exposes mozHasAudio;
      // WebKit/Blink expose an audioTracks list. Everything else keeps the
      // control visible, because the shipped asset has sound.
      if (video.mozHasAudio === false) return setHasAudio(false)
      if (video.audioTracks && video.audioTracks.length === 0) return setHasAudio(false)
      return setHasAudio(true)
    }

    const startVideo = () => {
      video.volume = 0.7
      video.muted = true
      setMuted(true)
      detectAudio()

      if (prefersReducedMotion) {
        video.pause()
        return
      }

      const playback = video.play()
      if (playback && typeof playback.catch === 'function') {
        playback.catch(() => {})
      }
    }

    if (video.readyState >= 1) startVideo()
    else video.addEventListener('loadedmetadata', startVideo, { once: true })

    video.addEventListener('canplay', detectAudio)

    return () => {
      video.removeEventListener('loadedmetadata', startVideo)
      video.removeEventListener('canplay', detectAudio)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasAudio) return

    const soundPreferred = window.sessionStorage.getItem(SOUND_PREFERENCE_KEY) === 'on'
    if (!soundPreferred) return

    video.muted = false
    setMuted(false)
    const playback = video.play()
    if (playback && typeof playback.catch === 'function') {
      playback.catch(() => {
        video.muted = true
        setMuted(true)
        window.sessionStorage.setItem(SOUND_PREFERENCE_KEY, 'off')
      })
    }
  }, [hasAudio])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video || !hasAudio) return

    const nextMuted = !muted
    video.muted = nextMuted
    setMuted(nextMuted)
    window.sessionStorage.setItem(SOUND_PREFERENCE_KEY, nextMuted ? 'off' : 'on')

    if (!nextMuted) {
      const playback = video.play()
      if (playback && typeof playback.catch === 'function') playback.catch(() => {})
    }
  }

  return (
    <div className="hero-media">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        loop
        muted={muted}
        playsInline
        disablePictureInPicture
        preload="auto"
        poster={`${base}media/showreel-poster.jpg`}
        tabIndex="-1"
        aria-hidden="true"
      >
        <source src={`${base}media/showreel.webm`} type="video/webm" />
        <source src={`${base}media/showreel.mp4`} type="video/mp4" />
      </video>
      <div className="hero-video-scrim" aria-hidden="true" />
      {hasAudio && (
        <button
          type="button"
          className="hero-sound-toggle"
          onClick={toggleSound}
          aria-label={muted ? 'Enable hero sound' : 'Mute hero sound'}
          title={muted ? 'Enable sound' : 'Mute sound'}
        >
          {muted ? <HiVolumeOff /> : <HiVolumeUp />}
          <span>{muted ? 'Sound off' : 'Sound on'}</span>
        </button>
      )}
    </div>
  )
}
