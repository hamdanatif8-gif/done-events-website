import { useId } from 'react'
import { family, STAGE } from './characterFamily'

/**
 * Renders one member of the DONE crew.
 *
 * Volume is built the same way for everyone so the family reads as one hand:
 * a soft contact shadow on the floor, the silhouette filled with a diagonal
 * three-stop gradient, a dark shading blob and a light highlight both clipped
 * to that silhouette, then the eyes. Every moving group carries a `ch-<part>`
 * class so a GSAP timeline can drive limbs independently of the body.
 */
export default function Character({
  name,
  className = '',
  style,
  shadow = true,
  label,
  palette,
}) {
  const spec = family[name]
  const uid = useId().replace(/:/g, '')
  if (!spec) return null

  const [a, b, c] = palette ?? spec.palette
  const gid = `cg-${uid}`
  const did = `cd-${uid}`
  const cid = `cc-${uid}`
  const sid = `cs-${uid}`
  const fid = `cf-${uid}`
  const vid = `cv-${uid}`

  const paint = (part, defaultKind = 'fill') => {
    const kind = part.kind ?? defaultKind
    const stroke = `url(#${part.tone === 'deep' ? did : gid})`
    const common = {
      d: part.d,
      className: `ch-part ch-${part.id}`,
      opacity: part.opacity,
    }
    return kind === 'stroke' ? (
      <path
        key={part.id}
        {...common}
        fill="none"
        stroke={stroke}
        strokeWidth={part.w}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <path key={part.id} {...common} fill={stroke} />
    )
  }

  // Everything that makes up the silhouette, for clipping the shading to.
  const solids = [spec.body, ...(spec.parts ?? []).map((p) => p.kind !== 'stroke' && p.d), ...(spec.front ?? []).map((p) => p.kind !== 'stroke' && p.d)].filter(Boolean)

  return (
    <svg
      className={`ch ch--${name} ${className}`}
      style={style}
      viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
      focusable="false"
    >
      <defs>
        <linearGradient id={gid} x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={a} />
          <stop offset="54%" stopColor={b} />
          <stop offset="100%" stopColor={c} />
        </linearGradient>

        {/* A deeper mix of the same three colours, for cloth and inner parts. */}
        <linearGradient id={did} x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={b} />
          <stop offset="60%" stopColor={c} />
          <stop offset="100%" stopColor={c} />
        </linearGradient>

        <radialGradient id={sid} cx="50%" cy="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>

        {/* Form shading: one soft raking gradient across the whole silhouette,
            so no character carries a hard-edged shadow seam. */}
        <linearGradient id={vid} x1="14%" y1="0%" x2="100%" y2="74%">
          <stop offset="26%" stopColor="#000" stopOpacity="0" />
          <stop offset="72%" stopColor="#000" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.32" />
        </linearGradient>

        <filter id={fid} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>

        <clipPath id={cid}>
          {solids.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </clipPath>
      </defs>

      {shadow && (
        <ellipse
          className="ch-part ch-shadow"
          cx={STAGE.w / 2}
          cy={STAGE.ground + 4}
          rx={STAGE.w * (spec.footprint ?? 0.5)}
          ry="13"
          fill={`url(#${sid})`}
        />
      )}

      <g className="ch-body">
        {(spec.parts ?? []).map((p) => paint(p))}
        {spec.body && <path className="ch-part ch-torso" d={spec.body} fill={`url(#${gid})`} />}
        {(spec.front ?? []).map((p) => paint(p))}

        <g clipPath={`url(#${cid})`} className="ch-volume">
          <rect x="0" y="0" width={STAGE.w} height={STAGE.h} fill={`url(#${vid})`} />
          {spec.light && (
            <ellipse
              cx={spec.light.cx}
              cy={spec.light.cy}
              rx={spec.light.rx}
              ry={spec.light.ry}
              fill="#fff"
              opacity="0.34"
              filter={`url(#${fid})`}
              transform={`rotate(${spec.light.rotate} ${spec.light.cx} ${spec.light.cy})`}
            />
          )}
        </g>

        <g className="ch-part ch-eyes">
          {(spec.eyes ?? []).map(([x, y, r], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y} rx={r} ry={r * 1.12} fill="#171717" />
              <circle cx={x + r * 0.34} cy={y - r * 0.4} r={r * 0.3} fill="#fff" opacity="0.9" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  )
}
