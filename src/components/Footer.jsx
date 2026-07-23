import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import './Footer.css'

const primaryLinks = [
  ['Home', '/'],
  ['Services', '/services'],
  ['Portfolio', '/portfolio'],
  ['About', '/about'],
  ['Contact', '/contact'],
]

const serviceLinks = [
  ['Corporate events', '/services#service-corporate-events'],
  ['Event production', '/services#service-event-production'],
  ['Concerts & live shows', '/services#service-concerts-live-shows'],
  ['Weddings & celebrations', '/services#service-weddings-celebrations'],
  ['Catering & hospitality', '/services#service-catering-hospitality'],
  ['Turnkey management', '/services#service-turnkey'],
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__invitation">
        <div>
          <span className="eyebrow eyebrow--light">New enquiries</span>
          <h2>Have an event in mind?</h2>
        </div>
        <Link to="/contact" className="footer__invitation-link">
          Start an event brief <FaArrowRight aria-hidden="true" />
        </Link>
      </div>

      <div className="container footer__main">
        <div className="footer__brand">
          <Link to="/" className="brand-lockup brand-lockup--footer" aria-label="DONE Events & Entertainment home">
            <span className="brand-lockup__name">DONE</span>
            <span className="brand-lockup__sub">Events &amp; Entertainment</span>
          </Link>
          <p>Creative direction, production and hospitality for corporate, live, destination and private events.</p>
          <span className="footer__location">Dubai, United Arab Emirates</span>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <span className="footer__label">Navigate</span>
          {primaryLinks.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
        </nav>

        <nav className="footer__services" aria-label="Service links">
          <span className="footer__label">Selected services</span>
          {serviceLinks.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
        </nav>

        <div className="footer__contact">
          <span className="footer__label">Contact</span>
          <a href="tel:+971585554446">+971 58 555 4446</a>
          <a href="mailto:info@doneevents.ae">info@doneevents.ae</a>
          <a href="https://wa.me/971585554446" target="_blank" rel="noopener noreferrer">WhatsApp DONE</a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="footer__tagline">Day to Night. Done Right.</p>
        <nav className="footer__legal" aria-label="Legal">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
        <p>© {new Date().getFullYear()} DONE Events &amp; Entertainment</p>
      </div>
    </footer>
  )
}
