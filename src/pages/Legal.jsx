import { Link, useLocation } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { contactDetails } from '../content/siteContent'
import './Legal.css'

// Honest, minimal legal notices. Deliberately free of invented registration
// numbers, jurisdictions beyond Dubai, UAE, or third-party specifics. The client
// should have these reviewed and expanded by their own legal advisor before launch.
const privacy = {
  label: 'Privacy',
  title: 'Privacy notice',
  intro:
    'This notice explains what happens to the information you share with DONE Events & Entertainment through this website.',
  sections: [
    {
      heading: 'What we collect',
      body: 'When you submit the event brief form, we receive the details you enter — your name, email, phone number, event type, preferred date, location, guest estimate and message. We do not ask for anything beyond what helps us respond.',
    },
    {
      heading: 'How we use it',
      body: 'We use those details only to reply to your enquiry and plan the conversation that follows. We do not sell your information, and we do not send marketing you did not ask for.',
    },
    {
      heading: 'How it reaches us',
      body: 'The form is delivered through our hosting provider. If secure delivery is unavailable, the site prepares an email so nothing you typed is lost. Your details travel over an encrypted connection either way.',
    },
    {
      heading: 'Keeping and removing it',
      body: 'We keep enquiry details for as long as we are in contact about your event. To ask what we hold, or to have it removed, contact us using the details below.',
    },
  ],
}

const terms = {
  label: 'Terms',
  title: 'Terms of use',
  intro:
    'These terms cover how you use this website. They are not the agreement for a specific event — that is set out separately in a written proposal and contract.',
  sections: [
    {
      heading: 'The information here',
      body: 'The content on this site describes the kind of work DONE delivers. Images, descriptions and service listings are illustrative of our capabilities and do not form part of any quotation or contract.',
    },
    {
      heading: 'Enquiries',
      body: 'Submitting the event brief starts a conversation. It does not create a booking, hold a date or commit either side. Any engagement is confirmed only in a signed proposal.',
    },
    {
      heading: 'Using the site',
      body: 'You are welcome to browse and share the site. Please do not copy its wording, imagery or design for commercial use without permission.',
    },
    {
      heading: 'Questions',
      body: 'If anything here is unclear, or you would like the full terms for a specific event, reach the team using the details below.',
    },
  ],
}

export default function Legal() {
  const { pathname } = useLocation()
  const content = pathname.replace(/\/+$/, '') === '/terms' ? terms : privacy

  return (
    <main id="main-content" className="legal-page">
      <section className="legal-intro">
        <div className="container">
          <span className="eyebrow eyebrow--light">{content.label}</span>
          <h1 tabIndex="-1">{content.title}</h1>
          <p>{content.intro}</p>
        </div>
      </section>

      <section className="legal-body section-shell">
        <div className="container legal-body__grid">
          <div className="legal-body__sections">
            {content.sections.map((section, index) => (
              <article key={section.heading} className="legal-section">
                <span className="legal-section__number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="legal-aside">
            <span className="footer__label">Contact</span>
            <address>
              <span>{contactDetails.location}</span>
              <a href={`tel:${contactDetails.phoneHref}`}>{contactDetails.phoneDisplay}</a>
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            </address>
            <Link to="/contact" className="text-action">
              Start an event brief <FaArrowRight aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  )
}
