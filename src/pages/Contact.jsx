import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaArrowRight, FaClock } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
import EventImage from '../components/EventImage'
import './Contact.css'

const eventTypes = [
  'Beach & Brunch',
  'Club Events',
  'Corporate',
  'Concerts',
  'Catering & Hospitality',
  'Private & Weddings',
  'Production',
  'Other',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guests: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <motion.div
          className="page-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Contact Us</span>
          <h1 className="page-hero-title">Let's Create<br />Something Amazing</h1>
          <p className="page-hero-sub">
            Ready to start planning your next unforgettable event?
            We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section-padding">
        <div className="container contact-grid">
          {/* Contact Info */}
          <AnimatedSection direction="left" className="contact-info">
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">We're Here to<br />Help You Celebrate</h2>
            <p className="contact-intro">
              Whether you have a clear vision or just the seed of an idea,
              our team is ready to help bring it to life. Reach out and let's start the conversation.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon"><FaMapMarkerAlt /></div>
                <div>
                  <strong>Location</strong>
                  <p>Dubai, United Arab Emirates</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><FaPhoneAlt /></div>
                <div>
                  <strong>Phone</strong>
                  <p>+971 58 555 4446</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><FaEnvelope /></div>
                <div>
                  <strong>Email</strong>
                  <p>info@doneevents.ae</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><FaClock /></div>
                <div>
                  <strong>Working Hours</strong>
                  <p>Sun — Thu: 9AM — 6PM</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/971585554446"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection direction="right" className="contact-form-wrapper">
            {submitted ? (
              <motion.div
                className="form-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your message has been sent. Our team will get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 className="form-title">Send Us a Message</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventType">Event Type</label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Event Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="guests">Expected Guests</label>
                    <input
                      type="text"
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      placeholder="Approximate number"
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your event vision..."
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary form-submit">
                  Send Message <FaArrowRight />
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Location banner */}
      <section className="contact-map">
        <EventImage name="beach.jpg" alt="Dubai waterfront and skyline" className="map-placeholder" />
        <div className="map-caption">
          <FaMapMarkerAlt />
          <span>Dubai, United Arab Emirates</span>
        </div>
      </section>
    </main>
  )
}
