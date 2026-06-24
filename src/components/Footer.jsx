import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top section-padding container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">D</span>
              <div className="logo-text">
                <span className="logo-name">DONE</span>
                <span className="logo-sub">Events & Entertainment</span>
              </div>
            </div>
            <p className="footer-tagline">Day to Night. Done Right.</p>
            <p className="footer-desc">
              Dubai's premier event management company with 15+ years of crafting
              unforgettable experiences across the UAE and beyond.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
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
            <Link to="/services">Beach & Brunch</Link>
            <Link to="/services">Club Events</Link>
            <Link to="/services">Corporate</Link>
            <Link to="/services">Concerts</Link>
            <Link to="/services">Catering</Link>
            <Link to="/services">Weddings</Link>
            <Link to="/services">Production</Link>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <p>Dubai, United Arab Emirates</p>
            <a href="https://wa.me/971585554446">+971 58 555 4446</a>
            <a href="mailto:info@doneevents.ae">info@doneevents.ae</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} Done Events & Entertainment. All rights reserved.</p>
          <p>Crafted with passion in Dubai</p>
        </div>
      </div>
    </footer>
  )
}
