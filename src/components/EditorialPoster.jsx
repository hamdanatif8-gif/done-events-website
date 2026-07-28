import Character from './Character'
import { Media } from './primitives'
import { brand } from '../content/site'

/**
 * A printed object, not an image card.
 *
 * Every poster is one sheet of stock at a fixed 3:4 trim, with an ink rule set
 * in from the edge the way a programme cover is. The photograph sits in a
 * window rather than bleeding off the sheet; a colour field crosses it; the
 * category word is set large enough to be cropped by the trim; and the
 * chapter's character stands on the window's bottom edge. The imprint line at
 * the foot carries the publisher, the city and one factual sentence.
 */
export default function EditorialPoster({
  photo,
  word,
  number,
  category,
  line,
  character,
  field = 'var(--yellow)',
  className = '',
  tone = 'cream',
}) {
  return (
    <article className={`sheet sheet--${tone} ${className}`} style={{ '--sheet-field': field }}>
      <div className="sheet__trim">
        <header className="sheet__head u-mono">
          <span>{brand.shortName}</span>
          <span>{number ? `CH.${number}` : 'INDEX'}</span>
        </header>

        <div className="sheet__window">
          {photo && <Media name={photo} sizes="(max-width: 860px) 78vw, 34vw" className="sheet__photo" />}
          <span className="sheet__field" aria-hidden="true" />
          {character && (
            <div className="sheet__char" aria-hidden="true">
              <Character name={character} />
            </div>
          )}
        </div>

        <p className="sheet__word u-display" aria-hidden="true">
          {word}
        </p>

        <footer className="sheet__foot">
          <p className="sheet__category u-mono">{category}</p>
          {line && <p className="sheet__line">{line}</p>}
          <p className="sheet__imprint u-mono">
            <span>{brand.cityShort}</span>
            <span>{brand.tagline}</span>
          </p>
        </footer>
      </div>
    </article>
  )
}
