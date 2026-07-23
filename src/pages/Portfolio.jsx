import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
import EventImage from '../components/EventImage'
import './Portfolio.css'

// Format-led cases. Honest by design: no invented client names, venues or figures.
// When verified case data is supplied, drop the specifics into `meta` and `context`.
const cases = [
  {
    id: 'corporate-brand',
    number: '01',
    category: 'Corporate & brand',
    title: 'A business message, built into a room.',
    context:
      'Conferences, launches and awards where the content, the staging and the guest journey all carry the same idea. The room is directed as carefully as the run of show, and the production plan keeps it moving from first arrival to close.',
    location: 'Dubai',
    focus: ['Creative direction', 'Content & guest flow', 'Technical production'],
    layout: 'duo',
    images: [
      {
        name: 'corporate.jpg',
        alt: 'Guests at a candlelit corporate gala dinner and panel in Dubai',
        caption: 'Gala format · audience, content and room aligned',
        span: 'wide',
      },
      {
        name: 'production.jpg',
        alt: 'Technicians at the production control desk during a live event',
        caption: 'Back of house · live show control',
        span: 'tall',
      },
    ],
  },
  {
    id: 'weddings-private',
    number: '02',
    category: 'Weddings & private',
    title: 'Personal by nature. Precise by design.',
    context:
      'Cultural and contemporary celebrations where the details guests feel most are the ones handled with the greatest care. Setting, service, entertainment and timing are planned together, so the evening stays warm out front and exact behind it.',
    location: 'Dubai',
    focus: ['Venue transformation', 'Catering & hospitality', 'On-site coordination'],
    layout: 'trio',
    images: [
      {
        name: 'weddings.jpg',
        alt: 'Guests gathered at an elegant wedding celebration in Dubai',
        caption: 'Reception · guests and the couple',
        span: 'lead',
      },
      {
        name: 'candlelit.jpg',
        alt: 'A candlelit table setting with white flowers and glassware',
        caption: 'Detail · the table setting',
        span: 'small',
      },
      {
        name: 'catering.jpg',
        alt: 'A candlelit waterfront dinner table prepared for evening guests',
        caption: 'Service · hospitality at the table',
        span: 'small',
      },
    ],
  },
  {
    id: 'destination-outdoor',
    number: '03',
    category: 'Destination & outdoor',
    title: 'The setting becomes the event.',
    context:
      'Waterfront and open-air formats read differently in daylight and after dark. The venue, hospitality and operational plan are shaped around the place and the hour — so the event feels natural to where it is, and controlled behind the scenes.',
    location: 'Dubai',
    focus: ['Beach & outdoor', 'Hospitality', 'Guest operations'],
    layout: 'panorama',
    images: [
      {
        name: 'beach-skyline.jpg',
        alt: 'An outdoor waterfront event setting beside the Dubai skyline',
        caption: 'Waterfront hospitality · Dubai skyline',
        span: 'panorama',
      },
      {
        name: 'beach.jpg',
        alt: 'A daytime beach club dining setting overlooking the Dubai skyline',
        caption: 'Daytime format · place and service rhythm',
        span: 'half',
      },
    ],
  },
  {
    id: 'live-evening',
    number: '04',
    category: 'Live & evening',
    title: 'Sound, light and a room that holds the night.',
    context:
      'Concerts, live shows and late social formats where the performance and the guest experience have to move together. Artist requirements, audience flow and the technical plan are rehearsed as one, so the energy in the room is the only thing that feels spontaneous.',
    location: 'Dubai',
    focus: ['Concerts & live shows', 'Entertainment', 'Lounges & social'],
    layout: 'duo',
    images: [
      {
        name: 'concerts.jpg',
        alt: 'Guests gathered in a candlelit lounge for a live performance',
        caption: 'Live format · performance and hospitality',
        span: 'wide',
      },
      {
        name: 'club.jpg',
        alt: 'An evening rooftop lounge environment overlooking a city skyline',
        caption: 'Late format · sound, light and guest flow',
        span: 'tall',
      },
    ],
  },
]

function CaseFacts({ item }) {
  return (
    <dl className="case-facts">
      <div>
        <dt>Format</dt>
        <dd>{item.category}</dd>
      </div>
      <div>
        <dt>Location</dt>
        <dd>{item.location}</dd>
      </div>
      <div>
        <dt>Delivered</dt>
        <dd>
          <ul>
            {item.focus.map((focus) => (
              <li key={focus}>{focus}</li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
  )
}

export default function Portfolio() {
  return (
    <main id="main-content" className="portfolio-page">
      <section className="portfolio-hero" aria-labelledby="portfolio-title">
        <EventImage
          name="corporate.jpg"
          alt="A candlelit corporate gala dinner in Dubai"
          className="portfolio-hero__media"
          eager
          sizes="100vw"
        />
        <div className="portfolio-hero__scrim" aria-hidden="true" />

        <div className="container portfolio-hero__content">
          <span className="eyebrow eyebrow--light">Selected work</span>
          <h1 id="portfolio-title" tabIndex="-1">
            The atmosphere is visible.<br />The control is not.
          </h1>
          <div className="portfolio-hero__footer">
            <p>
              A format-led view across corporate, private, destination and live events — each shaped
              around its audience, purpose and setting in Dubai.
            </p>
            <nav className="portfolio-hero__index" aria-label="Selected work index">
              {cases.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  <span>{item.number}</span>
                  {item.category}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {cases.map((item, index) => (
        <section
          key={item.id}
          id={item.id}
          className={`portfolio-case portfolio-case--${item.layout} ${index % 2 === 1 ? 'portfolio-case--alt' : ''}`}
          aria-labelledby={`${item.id}-title`}
        >
          <div className="container">
            <AnimatedSection className="portfolio-case__head">
              <div className="portfolio-case__index">
                <span>{item.number}</span>
                <span>{item.category}</span>
              </div>
              <h2 id={`${item.id}-title`}>{item.title}</h2>
              <p className="portfolio-case__context">{item.context}</p>
            </AnimatedSection>

            <div className="portfolio-case__gallery">
              {item.images.map((image, imageIndex) => (
                <AnimatedSection
                  key={image.name}
                  className={`portfolio-frame portfolio-frame--${image.span}`}
                  delay={imageIndex * 0.06}
                >
                  <EventImage
                    name={image.name}
                    alt={image.alt}
                    className="portfolio-frame__image"
                    sizes={image.span === 'panorama'
                      ? '(max-width: 720px) calc(100vw - 44px), 92vw'
                      : '(max-width: 720px) calc(100vw - 44px), 46vw'}
                  />
                  <span className="portfolio-frame__caption">{image.caption}</span>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="portfolio-case__facts" delay={0.1}>
              <CaseFacts item={item} />
            </AnimatedSection>
          </div>
        </section>
      ))}

      <section className="portfolio-cta" aria-labelledby="portfolio-cta-title">
        <div className="container portfolio-cta__inner">
          <AnimatedSection>
            <span className="eyebrow eyebrow--light">Your event next</span>
            <h2 id="portfolio-cta-title" className="section-heading section-heading--light">
              Bring us the one<br />you have in mind.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <Link to="/contact" className="button button--light">
              Start an event brief <FaArrowRight aria-hidden="true" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
