import { useState } from 'react'
import Glyph from './Glyph'
import { MaskedType } from './primitives'
import { mail, contact, brand } from '../content/site'
import { useScene, gsap } from '../lib/motion'

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', required: false },
  { name: 'date', label: 'Event date (approximate)', type: 'text', autoComplete: 'off', required: false },
]

/**
 * MAIL — the brief goes out in one action. Experimental surface, ordinary
 * form mechanics: real labels, real validation, real keyboard order.
 */
export default function MailChapter() {
  const [sent, setSent] = useState(false)

  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)
    gsap.fromTo(
      q('.mail__glyph'),
      { rotate: -30, yPercent: 40 },
      {
        rotate: 24,
        yPercent: -40,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: 0.7 },
      },
    )
    gsap.fromTo(
      q('.mail__field'),
      { yPercent: 28, opacity: 0.4 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: q('.mail__form')[0], start: 'top 92%', end: 'top 48%', scrub: 0.5 },
      },
    )
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const lines = [
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Event type: ${data.get('eventType') || ''}`,
      `Approximate date: ${data.get('date') || ''}`,
      '',
      'Brief:',
      `${data.get('message') || ''}`,
    ]
    const subject = `Event brief — ${data.get('eventType') || 'Enquiry'}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
    setSent(true)
  }

  return (
    <section className="mail" id={mail.id} data-chapter={mail.id} data-stage="var(--blue)" ref={scope}>
      <header className="chapter__head mail__head">
        <MaskedType tag="h2" className="chapter__word">
          {mail.title}
        </MaskedType>
        <Glyph variant="flare" tint="warm" className="mail__glyph" />
      </header>

      <div className="mail__layout">
        <div className="mail__details">
          <p className="mail__lede u-body">{mail.lede}</p>

          <dl className="mail__facts">
            <div>
              <dt className="u-mono">Email</dt>
              <dd className="u-display">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            <div>
              <dt className="u-mono">Phone</dt>
              <dd className="u-display">
                <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt className="u-mono">WhatsApp</dt>
              <dd className="u-display">
                <a href={contact.whatsapp} target="_blank" rel="noreferrer noopener">
                  Message the team
                </a>
              </dd>
            </div>
            <div>
              <dt className="u-mono">Location</dt>
              <dd className="u-display">{contact.location}</dd>
            </div>
          </dl>
        </div>

        <form className="mail__form" onSubmit={onSubmit} noValidate={false}>
          {FIELDS.map((field) => (
            <p className="mail__field" key={field.name}>
              <label className="u-mono" htmlFor={`f-${field.name}`}>
                {field.label}
                {field.required && <span aria-hidden="true"> *</span>}
              </label>
              <input
                id={`f-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                required={field.required}
              />
            </p>
          ))}

          <p className="mail__field">
            <label className="u-mono" htmlFor="f-eventType">
              Event type
            </label>
            <select id="f-eventType" name="eventType" defaultValue={mail.eventTypes[0]}>
              {mail.eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </p>

          <p className="mail__field mail__field--wide">
            <label className="u-mono" htmlFor="f-message">
              The brief<span aria-hidden="true"> *</span>
            </label>
            <textarea id="f-message" name="message" rows="5" required />
          </p>

          <div className="mail__actions">
            <button type="submit" className="mail__submit u-display">
              Send the brief
            </button>
            <span className="u-mono mail__note" role="status">
              {sent ? 'Your mail app should now be open with the brief ready to send.' : 'Opens in your mail app, addressed to us.'}
            </span>
          </div>
        </form>
      </div>

      <footer className="mail__foot">
        <span className="u-mono">{brand.name}</span>
        <span className="u-mono">{brand.tagline}</span>
        <span className="u-mono">© {new Date().getFullYear()} — {brand.cityShort}</span>
      </footer>
    </section>
  )
}
