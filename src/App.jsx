import { useEffect, useState } from 'react'
import ChapterRail from './components/ChapterRail'
import StageGround from './components/StageGround'
import Overture from './components/Overture'
import Chapter from './components/Chapter'
import WorkIndex from './components/WorkIndex'
import FaqChapter from './components/FaqChapter'
import Finale from './components/Finale'
import MailChapter from './components/MailChapter'
import { chapters } from './content/site'
import { initScroll, scrollToId, ScrollTrigger, reducedMotion } from './lib/motion'
import './styles/overture.css'
import './styles/chapter.css'
import './styles/crew.css'
import './styles/work-mail.css'

// The ground colour each section paints the page. The overture and the finale
// both sit on the electric blue, which is what closes the loop.
const grounds = {
  home: 'var(--blue)',
  ...Object.fromEntries(chapters.map((c) => [c.id, c.field])),
  work: 'var(--cream)',
  faq: 'var(--cream)',
  mail: 'var(--blue)',
}

export default function App() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const teardown = initScroll()
    const triggers = []

    // The active chapter is the last one whose threshold has passed the reading
    // line. State changes on crossings only — no per-frame React work.
    //
    // The threshold sits above the section's own top so the ground has already
    // begun changing colour as the chapter arrives, rather than snapping to it
    // once the chapter is fully in view.
    const sections = [...document.querySelectorAll('[data-chapter]')]
    sections.forEach((section, i) => {
      const id = section.dataset.chapter
      const previous = i === 0 ? 'home' : sections[i - 1].dataset.chapter
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 78%',
          end: 'max',
          onEnter: () => setActive(id),
          onEnterBack: () => setActive(id),
          onLeaveBack: () => setActive(previous),
        }),
      )
    })

    // Honour a deep link once layout has settled.
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const jump = () => scrollToId(hash, { immediate: true })
      requestAnimationFrame(() => requestAnimationFrame(jump))
      window.addEventListener('load', jump, { once: true })
    }

    if (reducedMotion()) document.documentElement.dataset.reducedMotion = 'true'

    return () => {
      triggers.forEach((trigger) => trigger.kill())
      teardown()
    }
  }, [])

  return (
    <>
      <a className="skip" href="#ch00">
        Skip to content
      </a>

      <StageGround field={grounds[active]} />

      <ChapterRail active={active} />

      <main className="stage" id="stage">
        <Overture />
        {chapters.map((chapter, index) => (
          <Chapter key={chapter.id} chapter={chapter} index={index} />
        ))}
        <WorkIndex />
        <FaqChapter />
        <Finale />
        <MailChapter />
      </main>
    </>
  )
}
