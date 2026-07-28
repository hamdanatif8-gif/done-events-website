import { useId } from 'react'
import Character from './Character'
import EditorialPoster from './EditorialPoster'
import { familyOrder, family } from './characterFamily'
import { brand, chapters, img, photos } from '../content/site'
import { useScene, gsap } from '../lib/motion'
import { animateCharacter } from '../lib/characterMotion'

// The sheets that fly in are the chapters that have already been read.
const sheets = chapters
  .filter((chapter) => chapter.poster || chapter.pinned)
  .map((chapter) => ({
    id: chapter.id,
    number: chapter.number,
    word: chapter.title,
    category: chapter.footLeft,
    photo: chapter.poster?.photo ?? chapter.pinned?.photo,
    character: chapter.character,
    field: chapter.field,
  }))

/**
 * THE FINALE.
 *
 * One pinned sequence in four movements. The chapters that have been read come
 * back as printed sheets and stack into a pile; the pile settles; the company
 * name returns at the scale it opened with, filled with the same picture and
 * colour that filled it in the Overture; and the whole crew walks in front of
 * it. The opening and the ending are the same object, seen twice.
 */
export default function Finale() {
  const uid = useId().replace(/:/g, '')
  const clip = `fin-clip-${uid}`
  const hero = photos.corporate ?? Object.values(photos)[0]

  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)

    q('.finale__member').forEach((figure) => {
      animateCharacter(figure.querySelector('svg'), family[figure.dataset.motion]?.motion)
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=340%',
        pin: q('.finale__stage')[0],
        anticipatePin: 1,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    })

    // 1 — the read chapters return, one sheet at a time, and stack.
    q('.finale__sheet').forEach((sheet, i) => {
      const spread = (i - (sheets.length - 1) / 2) * 7
      tl.fromTo(
        sheet,
        { xPercent: i % 2 ? 150 : -150, yPercent: 120, rotate: i % 2 ? 34 : -34, opacity: 0 },
        { xPercent: spread * 1.6, yPercent: spread * 0.5, rotate: spread, opacity: 1, ease: 'none' },
        i * 0.5,
      )
    })

    // 2 — the pile compresses and drops away behind the name.
    tl.to(q('.finale__sheets'), { scale: 0.62, yPercent: 22, ease: 'none' }, sheets.length * 0.5)
      .to(q('.finale__sheets'), { opacity: 0.25, ease: 'none' }, sheets.length * 0.5 + 0.6)

    // 3 — the name returns, at the scale it opened with.
    tl.fromTo(
      q('.finale__type'),
      { scale: 1.5, opacity: 0, yPercent: 8 },
      { scale: 1, opacity: 1, yPercent: 0, ease: 'none', duration: 1.4 },
      sheets.length * 0.5 + 0.3,
    )

    // 4 — the crew walks in and stands in front of it.
    tl.fromTo(
      q('.finale__member'),
      { yPercent: 150, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.12, ease: 'none', duration: 1.4 },
      sheets.length * 0.5 + 1.1,
    ).fromTo(
      q('.finale__sign'),
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, ease: 'none', duration: 0.8 },
      sheets.length * 0.5 + 2.1,
    )
  }, [])

  return (
    <section className="finale" ref={scope} aria-labelledby="finale-heading">
      <div className="finale__stage">
        <h2 className="u-vh" id="finale-heading">
          DONE Events &amp; Entertainment — {brand.tagline}
        </h2>

        <div className="finale__sheets" aria-hidden="true">
          {sheets.map((sheet) => (
            <div className="finale__sheet" key={sheet.id}>
              <EditorialPoster
                photo={sheet.photo}
                word={sheet.word}
                number={sheet.number}
                category={sheet.category}
                character={sheet.character}
                field={sheet.field}
              />
            </div>
          ))}
        </div>

        <div className="finale__type" aria-hidden="true">
          <svg viewBox="0 0 1000 460" preserveAspectRatio="xMidYMid meet">
            <defs>
              <clipPath id={clip}>
                <text className="ov-word" x="0" y="196" textLength="1000" lengthAdjust="spacingAndGlyphs">
                  DONE
                </text>
                <text className="ov-word" x="0" y="430" textLength="1000" lengthAdjust="spacingAndGlyphs">
                  EVENTS
                </text>
              </clipPath>
            </defs>
            <g clipPath={`url(#${clip})`}>
              <rect x="0" y="0" width="1000" height="460" fill="var(--cream)" />
              {hero && (
                <image
                  href={`${img(hero.base, 1200)}.webp`}
                  x="-70"
                  y="-40"
                  width="1200"
                  height="560"
                  preserveAspectRatio="xMidYMid slice"
                />
              )}
              <rect x="-160" y="0" width="420" height="460" fill="var(--pink)" opacity="0.86" />
              <rect x="640" y="0" width="520" height="460" fill="var(--orange)" opacity="0.7" />
              <rect x="0" y="198" width="1000" height="24" fill="var(--yellow)" opacity="0.9" />
            </g>
          </svg>
        </div>

        <div className="finale__crew" aria-hidden="true">
          {familyOrder.map((name) => (
            <div className="finale__member" key={name} data-motion={name}>
              <Character name={name} />
            </div>
          ))}
        </div>

        <p className="finale__sign">
          <span className="finale__signline u-display">Send the brief.</span>
          <span className="finale__signmeta u-mono">
            {brand.cityShort} — {brand.tagline}
          </span>
        </p>
      </div>
    </section>
  )
}
