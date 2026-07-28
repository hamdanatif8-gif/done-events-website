import { useMemo, useState } from 'react'
import Character from './Character'
import { MaskedType } from './primitives'
import { mail, contact, brand } from '../content/site'
import { useScene, gsap } from '../lib/motion'
import { animateCharacter } from '../lib/characterMotion'

const EMPTY = {
  name: '',
  company: '',
  phone: '',
  email: '',
  eventType: '',
  date: '',
  emirate: '',
  venue: '',
  guests: '',
  setting: '',
  services: [],
  entertainment: '',
  catering: '',
  budget: '',
  message: '',
}

const YES_NO = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unsure', label: 'Not sure yet' },
]

/**
 * THE EVENT BRIEF.
 *
 * An enquiry form that behaves like a briefing document. As it is filled in,
 * the panel beside it writes the brief back in the company's own shorthand —
 * event type, emirate, guest count, venue state, setting, services — so the
 * visitor can see exactly what is about to be sent.
 *
 * The summary restates. It does not calculate: there are no crew numbers, no
 * load figures, no lighting values, no timelines and no price. Nothing here
 * implies knowledge the company does not have until it has spoken to you.
 */
export default function MailChapter() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)

  const set = (key) => (event) => {
    const { value, type, checked } = event.target
    setForm((previous) => {
      if (type === 'checkbox' && key === 'services') {
        const services = checked
          ? [...previous.services, value]
          : previous.services.filter((item) => item !== value)
        return { ...previous, services }
      }
      return { ...previous, [key]: value }
    })
  }

  // The brief, restated. Only fields the visitor has actually filled in.
  const summary = useMemo(() => {
    const venue = mail.venueStates.find((v) => v.value === form.venue)?.label
    const setting = mail.settings.find((s) => s.value === form.setting)?.label
    const extras = [
      form.entertainment === 'yes' && 'Entertainment',
      form.catering === 'yes' && 'Catering & hospitality',
    ].filter(Boolean)

    return [
      form.eventType && { k: 'type', v: form.eventType.toUpperCase() },
      form.emirate && { k: 'where', v: form.emirate },
      form.date && {
        k: 'when',
        v: new Date(`${form.date}T00:00:00`).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      },
      form.guests && { k: 'guests', v: `${form.guests} guests` },
      venue && { k: 'venue', v: venue },
      setting && { k: 'setting', v: setting },
      form.services.length > 0 && { k: 'services', v: form.services.join(' + ') },
      extras.length > 0 && { k: 'also', v: extras.join(' + ') },
      form.budget && form.budget !== mail.budgets[0] && { k: 'budget', v: form.budget },
    ].filter(Boolean)
  }, [form])

  const scope = useScene((self, root) => {
    const q = gsap.utils.selector(root)
    animateCharacter(q('.mail__char svg')[0], 'assemble')

    gsap.fromTo(
      q('.mail__char'),
      { yPercent: 34, rotate: -6 },
      {
        yPercent: -30,
        rotate: 4,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: 0.7 },
      },
    )
    gsap.fromTo(
      q('.field'),
      { yPercent: 22, opacity: 0.35 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.03,
        ease: 'none',
        scrollTrigger: { trigger: q('.brief')[0], start: 'top 92%', end: 'top 44%', scrub: 0.5 },
      },
    )
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    const lines = [
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      '',
      `Event type: ${form.eventType || '—'}`,
      `Date: ${form.date || 'not set'}`,
      `Emirate: ${form.emirate || '—'}`,
      `Venue: ${mail.venueStates.find((v) => v.value === form.venue)?.label ?? '—'}`,
      `Guests: ${form.guests || '—'}`,
      `Setting: ${mail.settings.find((s) => s.value === form.setting)?.label ?? '—'}`,
      `Services: ${form.services.join(', ') || '—'}`,
      `Entertainment required: ${form.entertainment || '—'}`,
      `Catering / hospitality required: ${form.catering || '—'}`,
      `Budget range: ${form.budget || '—'}`,
      '',
      'Event vision:',
      form.message,
    ].filter((line) => line !== false && line !== undefined)

    const subject = `Event brief — ${form.eventType || 'Enquiry'}${form.emirate ? `, ${form.emirate}` : ''}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
    setSent(true)
  }

  return (
    <section className="mail" id={mail.id} data-chapter={mail.id} data-stage="var(--blue)" ref={scope}>
      <header className="chapter__head mail__head">
        <MaskedType tag="h2" className="chapter__word">
          {mail.title}
        </MaskedType>
        <div className="mail__char" aria-hidden="true">
          <Character name="composite" />
        </div>
      </header>

      <p className="mail__lede">{mail.lede}</p>

      <div className="mail__layout">
        <form className="brief" onSubmit={onSubmit}>
          <fieldset className="brief__set">
            <legend className="brief__legend u-mono">Who you are</legend>
            <div className="brief__grid">
              <p className="field">
                <label htmlFor="b-name">Name</label>
                <input id="b-name" name="name" autoComplete="name" required value={form.name} onChange={set('name')} />
              </p>
              <p className="field">
                <label htmlFor="b-company">
                  Company <span className="field__opt">optional</span>
                </label>
                <input id="b-company" name="company" autoComplete="organization" value={form.company} onChange={set('company')} />
              </p>
              <p className="field">
                <label htmlFor="b-email">Email</label>
                <input id="b-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={set('email')} />
              </p>
              <p className="field">
                <label htmlFor="b-phone">Phone</label>
                <input id="b-phone" name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={set('phone')} />
              </p>
            </div>
          </fieldset>

          <fieldset className="brief__set">
            <legend className="brief__legend u-mono">The event</legend>
            <div className="brief__grid">
              <p className="field">
                <label htmlFor="b-type">Event type</label>
                <select id="b-type" name="eventType" required value={form.eventType} onChange={set('eventType')}>
                  <option value="">Select…</option>
                  {mail.eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </p>
              <p className="field">
                <label htmlFor="b-date">Date</label>
                <input id="b-date" name="date" type="date" value={form.date} onChange={set('date')} />
              </p>
              <p className="field">
                <label htmlFor="b-emirate">Emirate</label>
                <select id="b-emirate" name="emirate" value={form.emirate} onChange={set('emirate')}>
                  <option value="">Select…</option>
                  {mail.emirates.map((place) => (
                    <option key={place} value={place}>
                      {place}
                    </option>
                  ))}
                </select>
              </p>
              <p className="field">
                <label htmlFor="b-guests">Guest count</label>
                <input
                  id="b-guests"
                  name="guests"
                  inputMode="numeric"
                  placeholder="e.g. 500, or 300–600"
                  value={form.guests}
                  onChange={set('guests')}
                />
              </p>
            </div>

            <fieldset className="choiceset field">
              <legend>Venue</legend>
              <div className="choiceset__row">
                {mail.venueStates.map((option) => (
                  <label className="choice" key={option.value}>
                    <input type="radio" name="venue" value={option.value} checked={form.venue === option.value} onChange={set('venue')} />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="choiceset field">
              <legend>Setting</legend>
              <div className="choiceset__row">
                {mail.settings.map((option) => (
                  <label className="choice" key={option.value}>
                    <input type="radio" name="setting" value={option.value} checked={form.setting === option.value} onChange={set('setting')} />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </fieldset>

          <fieldset className="brief__set">
            <legend className="brief__legend u-mono">What you need</legend>

            <fieldset className="choiceset field">
              <legend>Services required</legend>
              <div className="choiceset__row choiceset__row--wrap">
                {mail.services.map((service) => (
                  <label className="choice" key={service}>
                    <input
                      type="checkbox"
                      name="services"
                      value={service}
                      checked={form.services.includes(service)}
                      onChange={set('services')}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="brief__grid">
              <fieldset className="choiceset field">
                <legend>Entertainment required</legend>
                <div className="choiceset__row">
                  {YES_NO.map((option) => (
                    <label className="choice" key={option.value}>
                      <input type="radio" name="entertainment" value={option.value} checked={form.entertainment === option.value} onChange={set('entertainment')} />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="choiceset field">
                <legend>Catering / hospitality required</legend>
                <div className="choiceset__row">
                  {YES_NO.map((option) => (
                    <label className="choice" key={option.value}>
                      <input type="radio" name="catering" value={option.value} checked={form.catering === option.value} onChange={set('catering')} />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <p className="field">
              <label htmlFor="b-budget">
                Budget range <span className="field__opt">optional</span>
              </label>
              <select id="b-budget" name="budget" value={form.budget} onChange={set('budget')}>
                <option value="">Select…</option>
                {mail.budgets.map((band) => (
                  <option key={band} value={band}>
                    {band}
                  </option>
                ))}
              </select>
            </p>

            <p className="field field--wide">
              <label htmlFor="b-message">Event vision</label>
              <textarea
                id="b-message"
                name="message"
                rows="5"
                required
                placeholder="What the event is for, who is coming, and anything already decided."
                value={form.message}
                onChange={set('message')}
              />
            </p>
          </fieldset>

          <div className="brief__actions">
            <button type="submit" className="brief__submit u-display">
              Send the brief
            </button>
            <span className="u-mono brief__note" role="status">
              {sent
                ? 'Your mail app should now be open with the brief ready to send.'
                : 'Opens in your mail app, addressed to us.'}
            </span>
          </div>
        </form>

        <aside className="mail__aside">
          <div className="digest" aria-live="polite">
            <p className="digest__label u-mono">Your brief</p>
            {summary.length === 0 ? (
              <p className="digest__empty u-mono">Fill in the form and it will be summarised here.</p>
            ) : (
              <ul className="digest__list">
                {summary.map((entry) => (
                  <li key={entry.k} className={`digest__line digest__line--${entry.k} u-display`}>
                    {entry.v}
                  </li>
                ))}
              </ul>
            )}
            <p className="digest__foot u-mono">
              A summary of what you have entered. Scope, schedule and cost are proposed after we
              have spoken.
            </p>
          </div>

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
        </aside>
      </div>

      <footer className="mail__foot">
        <span className="u-mono">{brand.name}</span>
        <span className="u-mono">{brand.tagline}</span>
        <span className="u-mono">
          © {new Date().getFullYear()} — {brand.cityShort}
        </span>
      </footer>
    </section>
  )
}
