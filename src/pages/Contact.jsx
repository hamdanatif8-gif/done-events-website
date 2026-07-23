import { useRef, useState } from 'react'
import { FaArrowRight, FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
import './Contact.css'

const FORM_NAME = 'done-event-brief'

const eventTypes = [
  'Corporate event',
  'Private event',
  'Wedding or celebration',
  'Concert or live show',
  'Brand activation',
  'Beach or outdoor event',
  'Hospitality or catering event',
  'Venue transformation',
  'Production support',
  'Turnkey event management',
  'Other',
]

const emirates = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
  'Other',
]

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  eventType: '',
  date: '',
  location: '',
  guests: '',
  message: '',
}

const fieldOrder = Object.keys(emptyForm)

function getLocalDate() {
  const now = new Date()
  const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
  return localNow.toISOString().slice(0, 10)
}

function validateField(name, value, earliestDate) {
  const cleanValue = value.trim()

  switch (name) {
    case 'name':
      return cleanValue.length >= 2 ? '' : 'Enter your name.'
    case 'email':
      if (!cleanValue) return 'Enter your email address.'
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanValue)
        ? ''
        : 'Enter a valid email address.'
    case 'phone': {
      if (!cleanValue) return 'Enter your phone number.'
      const digits = cleanValue.replace(/\D/g, '')
      return digits.length >= 7 && digits.length <= 15
        ? ''
        : 'Enter a valid phone number, including country code.'
    }
    case 'eventType':
      return cleanValue ? '' : 'Select an event type.'
    case 'date':
      if (!cleanValue) return 'Choose your preferred date.'
      return cleanValue >= earliestDate ? '' : 'Choose today or a future date.'
    case 'location':
      return cleanValue ? '' : 'Select an emirate or location.'
    case 'guests': {
      if (!cleanValue) return 'Enter an estimated guest count.'
      const count = Number(cleanValue.replace(/[\s,]/g, ''))
      return Number.isInteger(count) && count > 0
        ? ''
        : 'Enter a whole number greater than zero.'
    }
    case 'message':
      return cleanValue ? '' : 'Tell us a little about the event.'
    default:
      return ''
  }
}

function getEmailHref(formData) {
  const subject = `Event enquiry${formData.eventType ? ` - ${formData.eventType}` : ''}`
  const body = [
    `Name: ${formData.name || 'Not provided'}`,
    `Email: ${formData.email || 'Not provided'}`,
    `Phone: ${formData.phone || 'Not provided'}`,
    `Event type: ${formData.eventType || 'Not specified'}`,
    `Preferred date: ${formData.date || 'Not specified'}`,
    `Emirate / location: ${formData.location || 'Not specified'}`,
    `Estimated guests: ${formData.guests || 'Not specified'}`,
    '',
    'Event brief:',
    formData.message || 'Not provided',
  ].join('\n')

  return `mailto:info@doneevents.ae?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function isConfirmedNetlifyResponse(response, responseBody) {
  const server = response.headers.get('server')?.toLowerCase() || ''
  const hasNetlifyRequestId = Boolean(response.headers.get('x-nf-request-id'))
  const returnedSiteShell = /id=["']root["']/.test(responseBody)

  return response.ok && !returnedSiteShell && (server.includes('netlify') || hasNetlifyRequestId)
}

export default function Contact() {
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState('idle')
  const [earliestDate] = useState(getLocalDate)
  const formRef = useRef(null)
  const statusRef = useRef(null)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({ ...current, [name]: value }))
    if (submitState !== 'submitting') setSubmitState('idle')

    if (errors[name]) {
      const nextError = validateField(name, value, earliestDate)
      setErrors((current) => ({ ...current, [name]: nextError }))
    }
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    const nextError = validateField(name, value, earliestDate)
    setErrors((current) => ({ ...current, [name]: nextError }))
  }

  const focusStatus = () => {
    window.requestAnimationFrame(() => statusRef.current?.focus())
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submitState === 'submitting') return

    const nextErrors = fieldOrder.reduce((current, field) => {
      const error = validateField(field, formData[field], earliestDate)
      return error ? { ...current, [field]: error } : current
    }, {})

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      setSubmitState('invalid')
      const firstInvalidField = fieldOrder.find((field) => nextErrors[field])
      window.requestAnimationFrame(() => {
        formRef.current?.elements.namedItem(firstInvalidField)?.focus()
      })
      return
    }

    setErrors({})
    setSubmitState('submitting')

    const payload = new URLSearchParams({
      'form-name': FORM_NAME,
      ...formData,
    })
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 12_000)

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          Accept: 'text/html',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
        signal: controller.signal,
      })
      const responseBody = await response.text()

      if (!isConfirmedNetlifyResponse(response, responseBody)) {
        throw new Error('No verified form receipt was returned.')
      }

      setSubmitState('success')
      setFormData(emptyForm)
      focusStatus()
    } catch {
      setSubmitState('fallback')
      focusStatus()
    } finally {
      window.clearTimeout(timeoutId)
    }
  }

  const emailHref = getEmailHref(formData)

  return (
    <main id="main-content" className="contact-page">
      <section className="contact-intro" aria-labelledby="contact-title">
        <div className="container contact-intro__grid">
          <div className="contact-intro__copy">
            <span className="eyebrow eyebrow--light">Start a conversation</span>
            <h1 id="contact-title" tabIndex="-1">Bring us<br />the brief.</h1>
            <p>Tell us what is fixed, what is open, and what the event needs to achieve. We will help shape the rest.</p>
          </div>

          <address className="contact-channels">
            <span className="contact-channels__location">Dubai, United Arab Emirates</span>
            <a href="tel:+971585554446">
              <FaPhoneAlt aria-hidden="true" />
              <span><small>Call</small>+971 58 555 4446</span>
            </a>
            <a href="mailto:info@doneevents.ae">
              <FaEnvelope aria-hidden="true" />
              <span><small>Email</small>info@doneevents.ae</span>
            </a>
            <a href="https://wa.me/971585554446" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp aria-hidden="true" />
              <span><small>Message</small>WhatsApp DONE</span>
            </a>
          </address>
        </div>
      </section>

      <section className="contact-form-section section-shell" aria-labelledby="brief-heading">
        <div className="container contact-form-layout">
          <AnimatedSection className="contact-form-intro">
            <span className="eyebrow">Event brief</span>
            <h2 id="brief-heading" className="section-heading">Give us the essentials.</h2>
            <p>A useful brief does not need to be a finished production plan. Share what you know and our team can take the conversation forward.</p>

            <div className="contact-form-notes" aria-label="What to include">
              <p>Helpful context</p>
              <ul>
                <li>Purpose and audience</li>
                <li>Venue status and timing</li>
                <li>Creative and production priorities</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection className="contact-form-wrapper">
            <form
              ref={formRef}
              className="contact-form"
              name={FORM_NAME}
              method="POST"
              action="/contact/?submitted=true"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={submitState === 'submitting'}
            >
              <input type="hidden" name="form-name" value={FORM_NAME} readOnly />
              <p className="contact-form__honeypot" aria-hidden="true">
                <label>Leave this field empty <input name="bot-field" tabIndex="-1" autoComplete="off" /></label>
              </p>

              <div className="contact-form__header">
                <p>Event enquiry</p>
                <span>All fields are required</span>
              </div>

              {submitState === 'invalid' && (
                <div className="form-status form-status--error" role="alert">
                  Please check the highlighted details before continuing.
                </div>
              )}

              {submitState === 'success' && (
                <div ref={statusRef} className="form-status form-status--success" role="status" tabIndex="-1">
                  <strong>Your brief has been received.</strong>
                  <span>Thank you. The DONE team can now review the details you shared.</span>
                </div>
              )}

              {submitState === 'fallback' && (
                <div ref={statusRef} className="form-status form-status--fallback" role="alert" tabIndex="-1">
                  <strong>This website did not return a verified form receipt.</strong>
                  <span>Your details are still here. Send the prepared email to make sure the team receives them.</span>
                  <a href={emailHref}>Continue by email <FaArrowRight aria-hidden="true" /></a>
                </div>
              )}

              <fieldset className="form-section" disabled={submitState === 'submitting'}>
                <legend><span>01</span> Your details</legend>
                <div className="form-row">
                  <div className={`form-group${errors.name ? ' has-error' : ''}`}>
                    <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      required
                    />
                    {errors.name && <span id="name-error" className="form-error">{errors.name}</span>}
                  </div>

                  <div className={`form-group${errors.email ? ' has-error' : ''}`}>
                    <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="email"
                      inputMode="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      required
                    />
                    {errors.email && <span id="email-error" className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className={`form-group${errors.phone ? ' has-error' : ''}`}>
                  <label htmlFor="phone">Phone <span aria-hidden="true">*</span></label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Include country code"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
                    required
                  />
                  <span id="phone-hint" className="form-hint">For example, +971 50 123 4567</span>
                  {errors.phone && <span id="phone-error" className="form-error">{errors.phone}</span>}
                </div>
              </fieldset>

              <fieldset className="form-section" disabled={submitState === 'submitting'}>
                <legend><span>02</span> Event essentials</legend>
                <div className="form-row">
                  <div className={`form-group${errors.eventType ? ' has-error' : ''}`}>
                    <label htmlFor="eventType">Event type <span aria-hidden="true">*</span></label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(errors.eventType)}
                      aria-describedby={errors.eventType ? 'event-type-error' : undefined}
                      required
                    >
                      <option value="">Select an event type</option>
                      {eventTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                    {errors.eventType && <span id="event-type-error" className="form-error">{errors.eventType}</span>}
                  </div>

                  <div className={`form-group${errors.date ? ' has-error' : ''}`}>
                    <label htmlFor="date">Preferred date <span aria-hidden="true">*</span></label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={earliestDate}
                      value={formData.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(errors.date)}
                      aria-describedby={errors.date ? 'date-error' : undefined}
                      required
                    />
                    {errors.date && <span id="date-error" className="form-error">{errors.date}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className={`form-group${errors.location ? ' has-error' : ''}`}>
                    <label htmlFor="location">Emirate / location <span aria-hidden="true">*</span></label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(errors.location)}
                      aria-describedby={errors.location ? 'location-error' : undefined}
                      required
                    >
                      <option value="">Select an emirate</option>
                      {emirates.map((emirate) => <option key={emirate} value={emirate}>{emirate}</option>)}
                    </select>
                    {errors.location && <span id="location-error" className="form-error">{errors.location}</span>}
                  </div>

                  <div className={`form-group${errors.guests ? ' has-error' : ''}`}>
                    <label htmlFor="guests">Guest count <span aria-hidden="true">*</span></label>
                    <input
                      id="guests"
                      name="guests"
                      type="text"
                      value={formData.guests}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="e.g. 250"
                      aria-invalid={Boolean(errors.guests)}
                      aria-describedby={errors.guests ? 'guests-error' : 'guests-hint'}
                      required
                    />
                    <span id="guests-hint" className="form-hint">An estimate is fine.</span>
                    {errors.guests && <span id="guests-error" className="form-error">{errors.guests}</span>}
                  </div>
                </div>
              </fieldset>

              <fieldset className="form-section form-section--brief" disabled={submitState === 'submitting'}>
                <legend><span>03</span> The brief</legend>
                <div className={`form-group${errors.message ? ' has-error' : ''}`}>
                  <label htmlFor="message">Message / event brief <span aria-hidden="true">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="What are you planning, who is it for, and what matters most?"
                    rows="7"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    required
                  />
                  {errors.message && <span id="message-error" className="form-error">{errors.message}</span>}
                </div>
              </fieldset>

              <div className="form-submit-row">
                <button type="submit" className="button button--dark" disabled={submitState === 'submitting'}>
                  {submitState === 'submitting' ? 'Sending brief...' : 'Send event brief'}
                  {submitState !== 'submitting' && <FaArrowRight aria-hidden="true" />}
                </button>
                <p>If secure form delivery is unavailable, we will keep your details in place and prepare an email instead.</p>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
