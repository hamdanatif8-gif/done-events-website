import { photos, img } from '../content/site'
import { useScene, gsap } from '../lib/motion'

/* --------------------------------------------------------------------------
   Media — responsive picture built from the generated webp/jpg set.
   -------------------------------------------------------------------------- */
export function Media({ name, sizes = '100vw', className = '', priority = false, alt }) {
  const photo = photos[name]
  if (!photo) return null
  const srcSet = photo.widths.map((w) => `${img(photo.base, w)}.webp ${w}w`).join(', ')
  const fallback = photo.fallback
    ? `${import.meta.env.BASE_URL}media/img/${photo.fallback}`
    : `${img(photo.base, 1200)}.jpg`

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={fallback}
        alt={alt ?? photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable="false"
      />
    </picture>
  )
}

/* --------------------------------------------------------------------------
   MetaLine — the tiny editorial rule that sits against the giant type.
   -------------------------------------------------------------------------- */
export function MetaLine({ items, className = '' }) {
  return (
    <div className={`metarow u-mono ${className}`}>
      {items.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
    </div>
  )
}

/* --------------------------------------------------------------------------
   MassiveType — a word wider than the viewport, moved as a graphic object.
   Not a heading with an animation on it: the word IS the composition.
   -------------------------------------------------------------------------- */
export function MassiveType({ children, from = 6, to = -14, tag = 'p', className = '' }) {
  const Tag = tag
  const scope = useScene((self, root) => {
    gsap.fromTo(
      root.querySelector('.massive__inner'),
      { xPercent: from },
      {
        xPercent: to,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
      },
    )
  }, [from, to])

  return (
    <div className={`massive ${className}`} ref={scope}>
      <Tag className="massive__inner u-display">{children}</Tag>
    </div>
  )
}

/* --------------------------------------------------------------------------
   MaskedType — a heading wiped in by scroll rather than faded in.
   -------------------------------------------------------------------------- */
export function MaskedType({ children, tag = 'h2', className = '', fit }) {
  const Tag = tag
  const scope = useScene((self, root) => {
    gsap.fromTo(
      root,
      { clipPath: 'inset(0% 100% -12% 0%)' },
      {
        clipPath: 'inset(0% 0% -12% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 92%', end: 'top 46%', scrub: 0.4 },
      },
    )
  }, [])

  return (
    <Tag
      className={`masked u-display ${className}`}
      style={fit ? { '--len': fit } : undefined}
      ref={scope}
    >
      {children}
    </Tag>
  )
}

/* --------------------------------------------------------------------------
   ImagePlane — media revealed by an edge wipe with the frame held still and
   the picture itself drifting behind it.
   -------------------------------------------------------------------------- */
export function ImagePlane({ name, label, sizes, className = '', from = 'bottom', drift = 12 }) {
  const scope = useScene((self, root) => {
    const inset =
      from === 'left'
        ? 'inset(0% 100% 0% 0%)'
        : from === 'right'
          ? 'inset(0% 0% 0% 100%)'
          : 'inset(100% 0% 0% 0%)'

    gsap
      .timeline({ scrollTrigger: { trigger: root, start: 'top 88%', end: 'top 34%', scrub: 0.5 } })
      .fromTo(root.querySelector('.plate'), { clipPath: inset }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)

    gsap.fromTo(
      root.querySelector('img'),
      { yPercent: -drift, scale: 1.16 },
      {
        yPercent: drift,
        scale: 1.02,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      },
    )
  }, [name, from, drift])

  return (
    <figure className={`imageplane ${className}`} ref={scope}>
      <div className="plate">
        <Media name={name} sizes={sizes} />
      </div>
      {label && <figcaption className="u-mono">{label}</figcaption>}
    </figure>
  )
}
