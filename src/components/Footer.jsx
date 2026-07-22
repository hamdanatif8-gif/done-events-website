import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top section-padding container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-text">
                <span className="logo-name">DONE</span>
                <span className="logo-sub">Events & Entertainment</span>
              </div>
            </div>
            <p className="footer-tagline">Day to Night. Done Right.</p>
            <p className="footer-desc">
              Events, entertainment, hospitality, and technical production,
              brought together by one Dubai-based team.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h4>Event Worlds</h4>
            <Link to="/services#beach-brunch">Beach & Brunch</Link>
            <Link to="/services#club-events">Club Events</Link>
            <Link to="/services#corporate">Corporate</Link>
            <Link to="/services#concerts">Concerts</Link>
            <Link to="/services#catering">Catering</Link>
            <Link to="/services#weddings">Weddings</Link>
            <Link to="/services#production">Production</Link>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <p>Dubai, United Arab Emirates</p>
            <a href="tel:+971585554446">+971 58 555 4446</a>
            <a href="mailto:info@doneevents.ae">info@doneevents.ae</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} Done Events & Entertainment. All rights reserved.</p>
          <p>Dubai, United Arab Emirates</p>
        </div>
      </div>
    </footer>
  )
}
