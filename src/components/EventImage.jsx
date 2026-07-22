import { useState } from 'react'
import { img } from '../imageUrl'

// Drop-in replacement for the .img-placeholder blocks. Keeps the exact
// container (and its sizing class) so layout is unchanged, and fades the
// photo in once it decodes for a quiet, premium reveal.
export default function EventImage({ name, alt, className = '', style, eager = false }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`img-placeholder ${className}`.trim()} style={style}>
      <img
        src={img(name)}
        alt={alt}
        width="1600"
        height="900"
        className={`event-img${loaded ? ' loaded' : ''}`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        {...(eager ? { fetchPriority: 'high' } : {})}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
