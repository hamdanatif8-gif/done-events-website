import { useState } from 'react'
import { img } from '../imageUrl'

const dimensions = {
  'beach-skyline.jpg': [1536, 864],
  'beach.jpg': [1280, 720],
  'candlelit.jpg': [1400, 787],
  'catering.jpg': [1280, 720],
  'concerts.jpg': [1280, 720],
  'corporate.jpg': [1280, 720],
  'production.jpg': [1280, 720],
  'weddings.jpg': [1280, 720],
}

/**
 * Responsive art-directed image.
 * `focus` sets object-position so the same photograph can be cropped
 * differently in different compositions without duplicating assets.
 */
export default function EventImage({
  name,
  alt,
  className = '',
  style,
  focus,
  eager = false,
  sizes = '(max-width: 640px) calc(100vw - 44px), (max-width: 980px) 90vw, 62vw',
}) {
  const [loaded, setLoaded] = useState(false)
  const [width, height] = dimensions[name] || [1280, 720]
  const stem = name.replace(/\.jpg$/i, '')
  const webpName = name.replace(/\.jpg$/i, '.webp')
  const webpSrcSet = [640, 960]
    .map((candidateWidth) => `${img(`${stem}-${candidateWidth}.webp`)} ${candidateWidth}w`)
    .concat(`${img(webpName)} ${width}w`)
    .join(', ')
  const jpgSrcSet = [640, 960]
    .map((candidateWidth) => `${img(`${stem}-${candidateWidth}.jpg`)} ${candidateWidth}w`)
    .concat(`${img(name)} ${width}w`)
    .join(', ')

  return (
    <div className={`img-placeholder ${className}`.trim()} style={style}>
      <picture>
        <source srcSet={webpSrcSet} sizes={sizes} type="image/webp" />
        <img
          src={img(name)}
          srcSet={jpgSrcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          className={`event-img${loaded ? ' loaded' : ''}`}
          style={focus ? { objectPosition: focus } : undefined}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          {...(eager ? { fetchPriority: 'high' } : {})}
          onLoad={() => setLoaded(true)}
        />
      </picture>
    </div>
  )
}
