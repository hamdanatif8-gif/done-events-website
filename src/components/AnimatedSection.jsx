import { useEffect, useRef, useState } from 'react'

export default function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }

    const reveal = () => {
      setVisible(true)
      observer.disconnect()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reveal when intersecting, or when the element has already been
        // scrolled past its top (guards against very fast scroll skipping it).
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
          reveal()
        }
      },
      // No negative bottom margin: a shrunk root creates a dead zone the last
      // section on the page can never cross, leaving it stuck hidden.
      { threshold: 0, rootMargin: '0px 0px 0px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal-group${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--reveal-delay': `${delay}s` }}
    >
      {children}
    </div>
  )
}
