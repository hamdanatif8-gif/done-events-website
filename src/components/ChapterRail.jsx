import { useEffect } from 'react'
import { navItems } from '../content/site'
import { scrollToId } from '../lib/motion'
import './rail.css'

/**
 * The fixed chapter rail. It is not a header and it does not collapse into a
 * menu on desktop — it is part of the artwork. On phones it becomes a fixed
 * top strip that keeps the same lettering, colour and serrated edge.
 */
export default function ChapterRail({ active }) {
  // Back / forward buttons move between chapters.
  useEffect(() => {
    const onPop = () => {
      const id = window.location.hash.replace('#', '')
      if (id) scrollToId(id)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // On phones the rail lies down and scrolls; keep the active chapter in view.
  useEffect(() => {
    if (!window.matchMedia('(max-width: 860px)').matches) return
    const link = document.querySelector(`.rail__link[data-active='true']`)
    link?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [active])

  const go = (event, id) => {
    event.preventDefault()
    scrollToId(id)
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <nav className="rail" aria-label="Chapters">
      <ul className="rail__list">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              className="rail__link"
              href={`#${item.id}`}
              onClick={(event) => go(event, item.id)}
              aria-current={active === item.id ? 'true' : undefined}
              data-active={active === item.id ? 'true' : undefined}
            >
              <span className="rail__label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="rail__mark u-mono" aria-hidden="true">
        DONE
        <br />
        EVENTS &amp;
        <br />
        ENTERTAINMENT.
        <br />
        DUBAI, UAE.
      </p>

      <span className="rail__edge" aria-hidden="true" />
    </nav>
  )
}
