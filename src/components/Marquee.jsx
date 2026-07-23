import './Marquee.css'

// Seamless capability ticker. Content is duplicated so the CSS translate loops
// without a visible seam. Motion is paused under prefers-reduced-motion (CSS).
export default function Marquee({ items, ariaLabel = 'Capabilities', variant = 'default', speed = 42 }) {
  const track = [...items, ...items]

  return (
    <div className={`marquee marquee--${variant}`} aria-label={ariaLabel} role="group">
      <div className="marquee__track" style={{ '--marquee-duration': `${speed}s` }} aria-hidden="true">
        {track.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index}`}>
            <span className="marquee__dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
