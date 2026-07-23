import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '')
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = ''
      return undefined
    }

    document.body.style.overflow = 'hidden'
    const menu = menuRef.current
    const menuFocusable = [...(menu?.querySelectorAll('a[href], button:not([disabled])') || [])]
    const focusable = [toggleRef.current, ...menuFocusable].filter(Boolean)
    menuFocusable[0]?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        toggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  const isActive = (path) => currentPath === path

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}${mobileOpen ? ' is-open' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="brand-lockup" aria-label="DONE Events & Entertainment home">
          <span className="brand-lockup__name">DONE</span>
          <span className="brand-lockup__sub">Events &amp; Entertainment</span>
        </Link>

        <nav className="navbar__links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={isActive(link.path) ? 'is-active' : ''}
              aria-current={isActive(link.path) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className={`navbar__cta${isActive('/contact') ? ' is-active' : ''}`}
          aria-current={isActive('/contact') ? 'page' : undefined}
        >
          Contact
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="navbar__toggle"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          <span>{mobileOpen ? 'Close' : 'Menu'}</span>
          <i aria-hidden="true" />
        </button>
      </div>

      {mobileOpen && (
        <nav ref={menuRef} id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">
          <div className="mobile-navigation__inner">
            {[...navLinks, { path: '/contact', label: 'Contact' }].map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={isActive(link.path) ? 'is-active' : ''}
                style={{ '--item-index': index }}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                <span>0{index + 1}</span>{link.label}
              </Link>
            ))}
            <div className="mobile-navigation__contact">
              <span>Dubai, United Arab Emirates</span>
              <a href="tel:+971585554446">+971 58 555 4446</a>
              <a href="mailto:info@doneevents.ae">info@doneevents.ae</a>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
