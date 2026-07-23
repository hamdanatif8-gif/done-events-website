import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
import EventImage from '../components/EventImage'
import HeroVideo from '../components/HeroVideo'
import {
  capabilityProof,
  contactDetails,
  deliverables,
  eventFormats,
  operatingStandards,
  portfolioProjects,
  processSteps,
} from '../content/siteContent'
import './Home.css'

const featuredWork = [
  portfolioProjects[0],
  portfolioProjects[1],
  portfolioProjects[5],
]

export default function Home() {
  const [lead, second, third] = featuredWork

  return (
    <main id="main-content" className="home">
      {/* ── 01 · Cinematic opening ─────────────────────────────────────── */}
      <section className="hero">
        <HeroVideo />

        <div className="container hero__content">
          <span className="hero__kicker">Dubai · United Arab Emirates</span>
          <h1 tabIndex="-1">
            Ambitious events.
            <br />
            <span>Precisely delivered.</span>
          </h1>
          <p>
            Creative direction, production and hospitality through one accountable team — from the
            first brief to the final cue.
          </p>
          <div className="hero__actions">
            <Link to="/contact" className="button button--light">
              Start an event brief <FaArrowRight aria-hidden="true" />
            </Link>
            <Link to="/portfolio" className="text-action text-action--light">
              See the work
            </Link>
          </div>
        </div>

        <div className="hero__ticker" aria-hidden="true">
          <div className="hero__ticker-track">
            {[0, 1].map((pass) => (
              <ul key={pass}>
                {eventFormats.map((format) => (
                  <li key={`${pass}-${format.id}`}>{format.title}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 · Positioning ───────────────────────────────────────────── */}
      <section className="home-position">
        <div className="container home-position__grid">
          <AnimatedSection className="home-position__statement">
            <span className="eyebrow">DONE Events &amp; Entertainment</span>
            <h2>
              A Dubai events company built to hold the whole experience together — the idea, the
              build and the day itself.
            </h2>
          </AnimatedSection>

          <AnimatedSection className="home-position__detail" delay={0.06}>
            <p>
              Most events lose their shape between teams. DONE keeps creative, technical and
              hospitality decisions in the same plan, so what was promised in the brief is what
              guests actually walk into.
            </p>
            <dl>
              <div>
                <dt>Disciplines</dt>
                <dd>Creative direction · Production · Hospitality</dd>
              </div>
              <div>
                <dt>Formats</dt>
                <dd>Corporate · Live · Private · Outdoor</dd>
              </div>
              <div>
                <dt>Working base</dt>
                <dd>Dubai, serving all seven emirates</dd>
              </div>
            </dl>
            <Link to="/about" className="text-action">
              How the team works <FaArrowRight aria-hidden="true" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 03 · Selected work ─────────────────────────────────────────── */}
      <section className="home-work">
        <div className="container">
          <AnimatedSection className="home-work__head">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2 className="section-heading">The work, in the room.</h2>
            </div>
            <Link to="/portfolio" className="text-action">
              Full portfolio <FaArrowRight aria-hidden="true" />
            </Link>
          </AnimatedSection>

          <div className="home-work__grid">
            <AnimatedSection className="work-tile work-tile--lead">
              <Link to={`/portfolio#${lead.id}`}>
                <EventImage
                  name={lead.image}
                  alt={lead.imageAlt}
                  focus={lead.imageFocus}
                  className="work-tile__media"
                  sizes="(max-width: 900px) 100vw, 62vw"
                />
                <span className="work-tile__veil" aria-hidden="true" />
                <div className="work-tile__body">
                  <span className="work-tile__meta">
                    {lead.number} · {lead.format} · {lead.location}
                  </span>
                  <h3>{lead.title}</h3>
                  <p>{lead.note}</p>
                  <ul>
                    {lead.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            </AnimatedSection>

            <div className="home-work__stack">
              {[second, third].map((project, index) => (
                <AnimatedSection key={project.id} className="work-tile work-tile--stack" delay={0.06 + index * 0.06}>
                  <Link to={`/portfolio#${project.id}`}>
                    <EventImage
                      name={project.image}
                      alt={project.imageAlt}
                      focus={project.imageFocus}
                      className="work-tile__media"
                      sizes="(max-width: 900px) 100vw, 34vw"
                    />
                    <span className="work-tile__veil" aria-hidden="true" />
                    <div className="work-tile__body">
                      <span className="work-tile__meta">
                        {project.number} · {project.format}
                      </span>
                      <h3>{project.title}</h3>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 · Event categories ──────────────────────────────────────── */}
      <section className="home-categories">
        <div className="container">
          <AnimatedSection className="home-categories__head">
            <span className="eyebrow eyebrow--light">What we are hired for</span>
            <p>
              Six starting points. Every one of them can be delivered as a single service or as a
              complete turnkey event.
            </p>
          </AnimatedSection>

          <div className="category-rail">
            {eventFormats.map((format, index) => (
              <AnimatedSection key={format.id} className="category-card" delay={index * 0.04}>
                <Link to={format.href}>
                  <span className="category-card__index">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{format.title}</h3>
                  <p>{format.description}</p>
                  <span className="category-card__cue" aria-hidden="true">
                    <FaArrowRight />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="home-categories__foot" delay={0.08}>
            <Link to="/services" className="button button--light">
              All twelve services <FaArrowRight aria-hidden="true" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 05 · What DONE delivers ────────────────────────────────────── */}
      <section className="home-deliver">
        <div className="container home-deliver__grid">
          <AnimatedSection className="home-deliver__intro">
            <span className="eyebrow">What you get</span>
            <h2>Not a mood board. A delivery plan.</h2>
            <p>
              Whatever the format, the same six things are on the table before anyone builds
              anything.
            </p>
          </AnimatedSection>

          <ol className="deliver-list">
            {deliverables.map((item, index) => (
              <AnimatedSection as="li" key={item.number} className="deliver-item" delay={index * 0.03}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 06 · Cinematic band ────────────────────────────────────────── */}
      <section className="home-band" aria-label="Live event delivery">
        <EventImage
          name="concerts.jpg"
          alt="A large audience facing a brightly lit stage during a live performance"
          focus="50% 45%"
          className="home-band__media"
          sizes="100vw"
        />
        <span className="home-band__veil" aria-hidden="true" />
        <AnimatedSection className="container home-band__copy">
          <p>Ten thousand decisions happen before the first guest notices one.</p>
          <span>Live delivery · Dubai</span>
        </AnimatedSection>
      </section>

      {/* ── 07 · Why DONE ──────────────────────────────────────────────── */}
      <section className="home-why">
        <div className="container home-why__grid">
          <AnimatedSection className="home-why__media">
            <EventImage
              name="weddings.jpg"
              alt="An outdoor ceremony setting at dusk with floral styling and seated guests"
              focus="50% 50%"
              className="home-why__image"
              sizes="(max-width: 900px) 100vw, 42vw"
            />
            <span>Warmth in the room. Discipline behind it.</span>
          </AnimatedSection>

          <div className="home-why__content">
            <AnimatedSection>
              <span className="eyebrow">Why DONE</span>
              <h2 className="section-heading">
                Creative ambition,
                <br />
                operational calm.
              </h2>
            </AnimatedSection>

            <div className="why-list">
              {operatingStandards.map((standard, index) => (
                <AnimatedSection key={standard.number} className="why-item" delay={index * 0.04}>
                  <span>{standard.number}</span>
                  <div>
                    <h3>{standard.title}</h3>
                    <p>{standard.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 08 · Process ───────────────────────────────────────────────── */}
      <section className="home-process">
        <div className="container">
          <AnimatedSection className="home-process__head">
            <span className="eyebrow eyebrow--light">From brief to live</span>
            <h2 className="section-heading section-heading--light">Four stages. One plan.</h2>
          </AnimatedSection>

          <ol className="process-track">
            {processSteps.map((step, index) => (
              <AnimatedSection as="li" key={step.number} className="process-step" delay={index * 0.05}>
                <span className="process-step__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 09 · Capability proof ──────────────────────────────────────── */}
      <section className="home-proof">
        <AnimatedSection className="container home-proof__grid">
          {capabilityProof.map((item) => (
            <div key={item.id}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </AnimatedSection>
      </section>

      {/* ── 10 · Brief invitation ──────────────────────────────────────── */}
      <section className="home-invite">
        <div className="container home-invite__grid">
          <AnimatedSection className="home-invite__copy">
            <span className="eyebrow">Next step</span>
            <h2 className="section-heading">Tell us what the event has to do.</h2>
            <p className="lede">
              Share the date, the format and what is still undecided. You will get a considered
              response with a clear view of scope, feasibility and next steps.
            </p>
            <Link to="/contact" className="button button--dark">
              Start an event brief <FaArrowRight aria-hidden="true" />
            </Link>
          </AnimatedSection>

          <AnimatedSection className="home-invite__channels" delay={0.06}>
            <p className="home-invite__label">Or reach the team directly</p>
            <a href={contactDetails.phoneHref}>
              <small>Call</small>
              {contactDetails.phone}
            </a>
            <a href={contactDetails.emailHref}>
              <small>Email</small>
              {contactDetails.email}
            </a>
            <a href={contactDetails.whatsapp} target="_blank" rel="noopener noreferrer">
              <small>Message</small>
              WhatsApp
            </a>
            <span className="home-invite__location">{contactDetails.location}</span>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
