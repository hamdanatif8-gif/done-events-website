import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaArrowRight } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
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

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const subject = `Event enquiry${formData.eventType ? ` — ${formData.eventType}` : ''}`
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone || 'Not provided'}`,
      `Event type: ${formData.eventType || 'Not specified'}`,
      `Event date: ${formData.date || 'Not specified'}`,
      `Expected guests: ${formData.guests || 'Not specified'}`,
      '',
      'Event brief:',
      formData.message,
    ].join('\n')

    window.location.href = `mailto:info@doneevents.ae?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <main className="contact-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <motion.div
          className="page-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Contact Us</span>
          <h1 className="page-hero-title">Let's Plan<br />What Comes Next</h1>
          <p className="page-hero-sub">
            Ready to start planning your next event? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      <section className="contact-section section-padding">
        <div className="container contact-grid">
          <AnimatedSection className="contact-info">
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">Start the<br />Conversation</h2>
            <p className="contact-intro">
              Whether you have a clear vision or the beginning of an idea, share the essentials
              and the DONE Events team can help shape the next step.
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
                  <a href="tel:+971585554446">+971 58 555 4446</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><FaEnvelope /></div>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:info@doneevents.ae">info@doneevents.ae</a>
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

          <AnimatedSection className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3 className="form-title">Share Your Event Brief</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} autoComplete="name" placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" placeholder="your@email.com" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" placeholder="+971 XX XXX XXXX" />
                </div>
                <div className="form-group">
                  <label htmlFor="eventType">Event Type</label>
                  <select id="eventType" name="eventType" value={formData.eventType} onChange={handleChange}>
                    <option value="">Select event type</option>
                    {eventTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Event Date</label>
                  <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="guests">Expected Guests</label>
                  <input type="text" id="guests" name="guests" value={formData.guests} onChange={handleChange} inputMode="numeric" placeholder="Approximate number" />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Your Message *</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your event vision..." rows="5" required />
              </div>

              <button type="submit" className="btn btn-primary form-submit">
                Prepare Email <FaArrowRight />
              </button>
              <p className="form-note">This opens your email app with the event details ready to send.</p>
            </form>
          </AnimatedSection>
        </div>
      </section>

      <section className="contact-location" aria-label="Location">
        <div className="container location-panel">
          <div className="location-marker" aria-hidden="true"><FaMapMarkerAlt /></div>
          <div>
            <span className="section-label">Based in Dubai</span>
            <h2>Dubai, United Arab Emirates</h2>
            <p>Connect directly by phone, email, or WhatsApp to discuss your event.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
