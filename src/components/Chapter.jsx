import ChapterCover from './ChapterCover'
import PosterPlane from './PosterPlane'
import Reel from './Reel'
import PinnedScene from './PinnedScene'
import Glyph from './Glyph'
import { ImagePlane, MaskedType, MassiveType, MetaLine } from './primitives'
import { brand } from '../content/site'
import { useScene, gsap } from '../lib/motion'

/**
 * A chapter: threshold, then paper. The cover is the flat colour field; the
 * body is cream stock carrying the giant chapter word, a short factual column
 * and whichever media mechanism this chapter owns.
 */
export default function Chapter({ chapter }) {
  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)

    // Rows lift on a scrub rather than a fade, so reverse scroll unwinds them.
    q('.rowset').forEach((set) => {
      gsap.fromTo(
        set.children,
        { yPercent: 38, opacity: 0.35 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: { trigger: set, start: 'top 92%', end: 'top 46%', scrub: 0.5 },
        },
      )
    })

    gsap.fromTo(
      q('.chapter__glyph'),
      { rotate: -22, yPercent: 30 },
      {
        rotate: 26,
        yPercent: -30,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
      },
    )
  }, [chapter.id])

  const lines = chapter.heading.split('\n')

  return (
    <article className="chapterwrap" ref={scope}>
      <ChapterCover chapter={chapter} />

      <section className="chapter" aria-labelledby={`${chapter.id}-heading`}>
        <header className="chapter__head">
          <MaskedType tag="h3" className="chapter__word" fit={chapter.title.length}>
            <span id={`${chapter.id}-heading`}>{chapter.title}</span>
          </MaskedType>
          <MetaLine
            className="chapter__meta"
            items={[`CHAPTER ${chapter.number}`, chapter.footLeft, brand.cityShort]}
          />
        </header>

        <div className="chapter__grid">
          <div className="chapter__statement">
            <p className="chapter__lines u-display">
              {lines.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </p>
            <Glyph variant={chapter.glyph} tint={chapter.glyphTint} className="chapter__glyph" />
          </div>

          <div className="chapter__column">
            <p className="chapter__lede">{chapter.lede}</p>
            {chapter.body.map((paragraph, i) => (
              <p className="chapter__para u-body" key={i}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {chapter.standards && (
          <ol className="rowset standards">
            {chapter.standards.map((item) => (
              <li key={item.number} className="standards__item">
                <span className="u-mono standards__num">{item.number}</span>
                <h4 className="standards__title u-display">{item.title}</h4>
                <p className="u-body">{item.description}</p>
              </li>
            ))}
          </ol>
        )}
      </section>

      {chapter.poster && (
        <PosterPlane
          photo={chapter.poster.photo}
          caption={chapter.poster.caption}
          word={chapter.poster.word}
          direction={chapter.poster.direction}
          ghost={chapter.poster.ghost}
        />
      )}

      {chapter.reel && <Reel caption={chapter.reel.caption} />}

      {chapter.pinned && (
        <PinnedScene
          photo={chapter.pinned.photo}
          word={chapter.pinned.word}
          caption={chapter.pinned.caption}
        />
      )}

      {chapter.duo && (
        <section className="chapter chapter--media">
          <div className="duo">
            {chapter.duo.map((item, i) => (
              <ImagePlane
                key={item.photo}
                name={item.photo}
                label={item.label}
                sizes="(max-width: 860px) 92vw, 44vw"
                from={i === 0 ? 'left' : 'right'}
                className={`duo__item duo__item--${i}`}
              />
            ))}
          </div>
        </section>
      )}

      {chapter.image && (
        <section className="chapter chapter--media">
          <ImagePlane
            name={chapter.image}
            label={chapter.footRight}
            sizes="(max-width: 860px) 92vw, 88vw"
            className="wide"
          />
        </section>
      )}

      {chapter.scopeGrid && (
        <section className="chapter">
          <ol className="rowset scopegrid">
            {chapter.scopeGrid.map((item) => (
              <li key={item.number} className="scopegrid__item">
                <span className="u-mono">{item.number}</span>
                <h4 className="u-display">{item.title}</h4>
                <p className="u-body">{item.note}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {chapter.process && (
        <section className="chapter">
          <ol className="rowset process">
            {chapter.process.map((step) => (
              <li key={step.number} className="process__item">
                <span className="u-mono">{step.number}</span>
                <h4 className="u-display">{step.title}</h4>
                <p className="u-body">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {chapter.sectors && (
        <section className="chapter">
          <MassiveType tag="p" className="chapter__massive" from={4} to={-16}>
            WHO WE BUILD FOR
          </MassiveType>
          <ul className="rowset sectors">
            {chapter.sectors.map((sector) => (
              <li key={sector.title} className="sectors__item">
                <h4 className="u-display">{sector.title}</h4>
                <p className="u-mono">{sector.note}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {chapter.services && (
        <section className="chapter">
          <ul className="rowset services">
            {chapter.services.map((service) => (
              <li key={service.title} className="services__item">
                <h4 className="services__title u-display">{service.title}</h4>
                <p className="u-body">{service.summary}</p>
              </li>
            ))}
          </ul>
          {chapter.scope && (
            <ul className="scopeline u-mono">
              {chapter.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      )}
    </article>
  )
}
