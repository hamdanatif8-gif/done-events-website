import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
import EventImage from '../components/EventImage'
import { capabilities, engagementModels, serviceCategories } from '../content/siteContent'
import './Services.css'

const featured = serviceCategories.filter((service) => service.featured)

export default function Services() {
  return (
    <main id="main-content" className="services-page">
      {/* ── Intro ──────────────────────────────────────────────────────── */}
      <section className="services-intro">
        <div className="container services-intro__grid">
          <div className="services-intro__copy">
            <span className="eyebrow eyebrow--light">Services</span>
            <h1 tabIndex="-1">Twelve services. One delivery standard.</h1>
            <p>
              Hire DONE for a single part of the event or for the whole thing. The scope changes.
              The way it is run does not.
            </p>
          </div>

          <nav className="services-intro__jump" aria-label="Service categories">
            <p>Jump to a service</p>
            <ul>
              {serviceCategories.map((service) => (
                <li key={service.id}>
                  <a href={`#${service.id}`}>
                    <span>{service.number}</span>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ── Featured services ──────────────────────────────────────────── */}
      <section className="services-featured" aria-labelledby="services-featured-title">
        <div className="container">
          <AnimatedSection className="services-featured__head">
            <span className="eyebrow">Most requested</span>
            <h2 id="services-featured-title" className="section-heading">
              Where most briefs begin.
            </h2>
          </AnimatedSection>

          <div className="featured-grid">
            {featured.map((service, index) => (
              <AnimatedSection key={service.id} className="featured-card" delay={index * 0.05}>
                <a href={`#${service.id}`}>
                  <EventImage
                    name={service.image}
                    alt={service.imageAlt}
                    focus={service.imageFocus}
                    className="featured-card__media"
                    sizes="(max-width: 700px) 100vw, (max-width: 1080px) 50vw, 25vw"
                  />
                  <span className="featured-card__veil" aria-hidden="true" />
                  <div className="featured-card__body">
                    <span>{service.pillar}</span>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full catalogue ─────────────────────────────────────────────── */}
      <section className="services-catalogue" aria-labelledby="services-catalogue-title">
        <div className="container">
          <AnimatedSection className="services-catalogue__head">
            <div>
              <span className="eyebrow">The full offer</span>
              <h2 id="services-catalogue-title" className="section-heading">
                Everything DONE delivers.
              </h2>
            </div>
            <p className="lede">
              Each service can stand alone. Combined, they remove the gaps between suppliers that
              normally cost a client time, money and control.
            </p>
          </AnimatedSection>

          <ol className="catalogue-list">
            {serviceCategories.map((service, index) => (
              <AnimatedSection
                as="li"
                key={service.id}
                id={service.id}
                className="catalogue-row"
                delay={(index % 4) * 0.03}
              >
                  <div className="catalogue-row__index">
                    <span>{service.number}</span>
                    <em>{service.pillar}</em>
                  </div>

                  <div className="catalogue-row__main">
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                  </div>

                  <ul className="catalogue-row__includes" aria-label={`${service.title} includes`}>
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                <Link
                  to="/contact"
                  className="catalogue-row__action"
                  aria-label={`Enquire about ${service.title}`}
                >
                  Enquire <FaArrowRight aria-hidden="true" />
                </Link>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Ways to work together ──────────────────────────────────────── */}
      <section className="services-engagement" aria-labelledby="services-engagement-title">
        <div className="container">
          <AnimatedSection className="services-engagement__head">
            <span className="eyebrow eyebrow--light">Ways to work together</span>
            <h2 id="services-engagement-title" className="section-heading section-heading--light">
              Take the whole thing, or the part you need.
            </h2>
          </AnimatedSection>

          <div className="engagement-grid">
            {engagementModels.map((model, index) => (
              <AnimatedSection key={model.id} className="engagement-card" delay={index * 0.05}>
                <h3>{model.title}</h3>
                <p>{model.description}</p>
                <span>
                  <small>Best for</small>
                  {model.bestFor}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disciplines behind the services ────────────────────────────── */}
      <section className="services-disciplines" aria-labelledby="services-disciplines-title">
        <div className="container">
          <AnimatedSection className="services-disciplines__head">
            <span className="eyebrow">Behind the services</span>
            <h2 id="services-disciplines-title">
              Three in-house disciplines carry every service on this page.
            </h2>
          </AnimatedSection>

          <div className="discipline-row">
            {capabilities.map((capability, index) => (
              <AnimatedSection key={capability.id} className="discipline-card" delay={index * 0.05}>
                <article id={capability.id}>
                  <div className="discipline-card__body">
                    <span>{capability.number}</span>
                    <h3>{capability.title}</h3>
                    <p className="discipline-card__statement">{capability.statement}</p>
                    <p>{capability.description}</p>
                    <ul>
                      {capability.scope.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close ──────────────────────────────────────────────────────── */}
      <section className="services-close" aria-labelledby="services-close-title">
        <AnimatedSection className="container services-close__panel">
          <span className="eyebrow">Next step</span>
          <h2 id="services-close-title" className="section-heading">
            Not sure which of these you need?
          </h2>
          <p className="lede">
            Send the date, the format and what is still undecided. We will tell you what the event
            actually requires — including the parts you do not need to pay for.
          </p>
          <div className="services-close__actions">
            <Link to="/contact" className="button button--dark">
              Start an event brief <FaArrowRight aria-hidden="true" />
            </Link>
            <Link to="/portfolio" className="text-action">
              See the work
            </Link>
          </div>
        </AnimatedSection>
      </section>

    </main>
  )
}
