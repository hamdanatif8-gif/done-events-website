import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-reveal wrapper.
 * `as` lets the reveal element be the semantic element itself (e.g. an <li>
 * inside an <ol>) instead of inserting an invalid wrapper div.
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  ...rest
}) {
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal-group${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--reveal-delay': `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
