import { useId } from 'react'

/**
 * The DONE graphic device. An original mark built from event language —
 * a light flare, a spotlight ring, a stage arch — drawn simply enough to
 * rotate, float, overlap and sit at poster scale. It recurs across the
 * chapters as the site's graphic character.
 */
const TINTS = {
  warm: ['#ff9d2f', '#ff4fa8', '#ffe500'],
  cool: ['#83d9f2', '#bfa9ff', '#2318f0'],
}

export default function Glyph({ variant = 'flare', tint = 'warm', className = '' }) {
  const uid = useId().replace(/:/g, '')
  const [a, b, c] = TINTS[tint] ?? TINTS.warm
  const grad = `g-${uid}`

  return (
    <svg
      className={`glyph glyph--${variant} ${className}`}
      viewBox="0 0 200 200"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={grad} x1="12%" y1="0%" x2="88%" y2="100%">
          <stop offset="0%" stopColor={a} />
          <stop offset="52%" stopColor={b} />
          <stop offset="100%" stopColor={c} />
        </linearGradient>
      </defs>

      {variant === 'flare' && (
        <g fill={`url(#${grad})`}>
          <path d="M100 2c7 54 42 89 96 96-54 7-89 42-96 96-7-54-42-89-96-96 54-7 89-42 96-96Z" />
          <path
            d="M160 8c2.6 20 15.4 32.8 35 35-19.6 2.2-32.4 15-35 35-2.6-20-15.4-32.8-35-35 19.6-2.2 32.4-15 35-35Z"
            transform="translate(-6 128) scale(0.46)"
          />
        </g>
      )}

      {variant === 'ring' && (
        <g>
          <circle cx="100" cy="100" r="74" fill="none" stroke={`url(#${grad})`} strokeWidth="34" />
          <rect x="86" y="-6" width="28" height="76" rx="14" fill={`url(#${grad})`} transform="rotate(28 100 100)" />
          <circle cx="100" cy="100" r="16" fill={`url(#${grad})`} />
        </g>
      )}

      {variant === 'ribbon' && (
        <g fill={`url(#${grad})`}>
          <path d="M14 186V116a86 86 0 0 1 172 0v70h-46v-70a40 40 0 0 0-80 0v70Z" />
          <rect x="14" y="150" width="172" height="16" />
        </g>
      )}
    </svg>
  )
}
