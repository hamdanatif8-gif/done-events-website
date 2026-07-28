import ChapterCover from './ChapterCover'
import PosterPlane from './PosterPlane'
import Reel from './Reel'
import PinnedScene from './PinnedScene'
import CharacterScene from './CharacterScene'
import { ImagePlane, MaskedType, MassiveType, MetaLine } from './primitives'
import { brand } from '../content/site'
import { useScene, gsap } from '../lib/motion'

// ---------------------------------------------------------------------------
// Chapter choreography.
//
// Every chapter animates its own body. The vocabulary is deliberately not
// shared: the corporate chapter steps, the private chapter folds, the live
// chapter beats, production assembles, hospitality pours. A chapter's motion
// is an argument about what the chapter is for.
// ---------------------------------------------------------------------------

const scenes = {
  // INTRO — the statement is wiped open line by line as the lamp sweeps past.
  ch00: (q, root) => {
    gsap.fromTo(
      q('.chapter__lines span'),
      { clipPath: 'inset(0% 100% 0% 0%)', xPercent: -4 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        xPercent: 0,
        stagger: 0.12,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 82%', end: 'top 26%', scrub: 0.5 },
      },
    )
  },

  // CORPORATE — everything arrives on the grid, in orthogonal steps.
  ch01: (q, root) => {
    gsap.fromTo(
      q('.chapter__lines span'),
      { xPercent: -22, opacity: 0.15 },
      {
        xPercent: 0,
        opacity: 1,
        stagger: 0.08,
        ease: 'steps(4)',
        scrollTrigger: { trigger: root, start: 'top 84%', end: 'top 30%', scrub: 0.45 },
      },
    )
    gsap.fromTo(
      q('.scopeline li'),
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.07,
        ease: 'none',
        scrollTrigger: { trigger: q('.scopeline')[0], start: 'top 94%', end: 'top 62%', scrub: 0.4 },
      },
    )
  },

  // PRIVATE — the column folds open from its own centre.
  ch02: (q, root) => {
    gsap.fromTo(
      q('.chapter__column'),
      { clipPath: 'inset(42% 0% 42% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 78%', end: 'top 28%', scrub: 0.5 },
      },
    )
    gsap.fromTo(
      q('.chapter__lines span'),
      { yPercent: 60, rotate: 2 },
      {
        yPercent: 0,
        rotate: 0,
        stagger: 0.09,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 84%', end: 'top 34%', scrub: 0.5 },
      },
    )
  },

  // WEDDINGS — the statement parts around the character in the middle.
  ch03: (q, root) => {
    const lines = q('.chapter__lines span')
    gsap.fromTo(
      lines,
      { xPercent: (i) => (i % 2 ? 26 : -26), opacity: 0.2 },
      {
        xPercent: 0,
        opacity: 1,
        ease: 'none',
        stagger: 0.06,
        scrollTrigger: { trigger: root, start: 'top 86%', end: 'top 32%', scrub: 0.55 },
      },
    )
  },

  // LIVE — the loudest chapter. Type arrives on a beat, services snap in.
  ch04: (q, root) => {
    gsap.fromTo(
      q('.chapter__lines span'),
      { scaleY: 0.5, yPercent: 40, transformOrigin: '0% 100%' },
      {
        scaleY: 1,
        yPercent: 0,
        stagger: 0.07,
        ease: 'back.out(2.2)',
        scrollTrigger: { trigger: root, start: 'top 86%', end: 'top 36%', scrub: 0.4 },
      },
    )
    gsap.fromTo(
      q('.services__item'),
      { yPercent: 44, opacity: 0.2 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.09,
        ease: 'none',
        scrollTrigger: { trigger: q('.services')[0], start: 'top 92%', end: 'top 48%', scrub: 0.45 },
      },
    )
  },

  // PRODUCTION — the scope grid builds itself, module by module, from the
  // sides, with the rule between them drawing across.
  ch05: (q, root) => {
    gsap.fromTo(
      q('.scopegrid__item'),
      { xPercent: (i) => (i % 2 ? 34 : -34), opacity: 0 },
      {
        xPercent: 0,
        opacity: 1,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: { trigger: q('.scopegrid')[0], start: 'top 94%', end: 'top 40%', scrub: 0.5 },
      },
    )
    gsap.fromTo(
      q('.chapter__lines span'),
      { yPercent: 70 },
      {
        yPercent: 0,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 86%', end: 'top 34%', scrub: 0.5 },
      },
    )
  },

  // HOSPITALITY — everything flows in from one side, unhurried.
  ch06: (q, root) => {
    gsap.fromTo(
      q('.chapter__lines span'),
      { xPercent: -16, opacity: 0.25 },
      {
        xPercent: 0,
        opacity: 1,
        stagger: 0.11,
        ease: 'sine.out',
        scrollTrigger: { trigger: root, start: 'top 84%', end: 'top 30%', scrub: 0.7 },
      },
    )
  },

  // DONE — the seven stages assemble as a ladder, and the rule connecting
  // them draws downward as they land.
  ch07: (q) => {
    const steps = q('.process__item')
    gsap.fromTo(
      steps,
      { yPercent: 40, opacity: 0.1 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: q('.process')[0], start: 'top 94%', end: 'bottom 68%', scrub: 0.5 },
      },
    )
    gsap.fromTo(
      q('.process__spine'),
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: '50% 0%',
        ease: 'none',
        scrollTrigger: { trigger: q('.process')[0], start: 'top 92%', end: 'bottom 70%', scrub: 0.4 },
      },
    )
  },
}

export default function Chapter({ chapter, index }) {
  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)

    // The shared floor every chapter still stands on: rows lift on a scrub so
    // that reverse scrolling unwinds them rather than replaying them.
    q('.rowset').forEach((set) => {
      gsap.fromTo(
        set.children,
        { yPercent: 34, opacity: 0.35 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: { trigger: set, start: 'top 92%', end: 'top 46%', scrub: 0.5 },
        },
      )
    })

    scenes[chapter.id]?.(q, root)
  }, [chapter.id])

  const lines = chapter.heading.split('\n')

  return (
    <article className={`chapterwrap chapterwrap--${chapter.id}`} ref={scope}>
      <ChapterCover chapter={chapter} index={index} />

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
            <CharacterScene name={chapter.character} className="chapter__char" depth="back" />
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

      {chapter.poster && <PosterPlane chapter={chapter} />}

      {chapter.reel && <Reel caption={chapter.reel.caption} />}

      {chapter.pinned && (
        <PinnedScene
          photo={chapter.pinned.photo}
          word={chapter.pinned.word}
          caption={chapter.pinned.caption}
          character={chapter.character}
        />
      )}

      {chapter.note && (
        <section className="chapter chapter--note">
          <aside className="note" style={{ '--note-field': chapter.field }}>
            <h4 className="note__title u-display">{chapter.note.title}</h4>
            <p className="note__text">{chapter.note.text}</p>
          </aside>
        </section>
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
          <ol className="scopegrid">
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
        <section className="chapter chapter--process">
          <span className="process__spine" aria-hidden="true" />
          <ol className="process">
            {chapter.process.map((step) => (
              <li key={step.number} className="process__item">
                <span className="u-mono process__num">{step.number}</span>
                <h4 className="u-display process__title">{step.title}</h4>
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
          <ul className="services">
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
