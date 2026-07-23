import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
import EventImage from '../components/EventImage'
import { capabilityProof, portfolioProjects } from '../content/siteContent'
import './Portfolio.css'

const firstRow = portfolioProjects.slice(0, 3)
const secondRow = portfolioProjects.slice(3)

function ProjectCard({ project, sizes, delay = 0 }) {
  return (
    <AnimatedSection className={`project-card project-card--${project.size}`} delay={delay}>
      <article id={project.id}>
        <div className="project-card__frame">
          <EventImage
            name={project.image}
            alt={project.imageAlt}
            focus={project.imageFocus}
            className="project-card__media"
            sizes={sizes}
          />
          <span className="project-card__veil" aria-hidden="true" />
          <span className="project-card__number">{project.number}</span>
        </div>

        <div className="project-card__body">
          <div className="project-card__meta">
            <span>{project.format}</span>
            <span>{project.location}</span>
          </div>
          <h2>{project.title}</h2>
          <p>{project.note}</p>
          <ul aria-label={`${project.title} — services delivered`}>
            {project.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </article>
    </AnimatedSection>
  )
}

export default function Portfolio() {
  return (
    <main id="main-content" className="portfolio-page">
      {/* ── Intro ──────────────────────────────────────────────────────── */}
      <section className="portfolio-intro">
        <div className="container portfolio-intro__grid">
          <div className="portfolio-intro__copy">
            <span className="eyebrow eyebrow--light">Selected work</span>
            <h1 tabIndex="-1">
              The atmosphere is visible.
              <br />
              <span>The control is not.</span>
            </h1>
            <p>
              Six formats DONE delivers in Dubai, shown with the disciplines behind each one. Client
              names and figures are published only once they are cleared.
            </p>
          </div>

          <nav className="portfolio-intro__index" aria-label="Selected projects">
            <p>Index</p>
            <ol>
              {portfolioProjects.map((project) => (
                <li key={project.id}>
                  <a href={`#${project.id}`}>
                    <span>{project.number}</span>
                    <em>{project.title}</em>
                    <FaArrowRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* ── Grid, part one ─────────────────────────────────────────────── */}
      <section className="portfolio-grid" aria-label="Selected work, part one">
        <div className="container project-row project-row--lead">
          {firstRow.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={index * 0.06}
              sizes={
                project.size === 'wide'
                  ? '(max-width: 900px) 100vw, 62vw'
                  : '(max-width: 900px) 100vw, 34vw'
              }
            />
          ))}
        </div>
      </section>

      {/* ── Interstitial ───────────────────────────────────────────────── */}
      <section className="portfolio-band" aria-label="Outdoor and destination formats">
        <EventImage
          name="beach.jpg"
          alt="A daytime waterfront setting with loungers and palms prepared for guests"
          focus="50% 52%"
          className="portfolio-band__media"
          sizes="100vw"
        />
        <span className="portfolio-band__veil" aria-hidden="true" />
        <AnimatedSection className="container portfolio-band__copy">
          <p>Indoors, outdoors, on sand or in a ballroom — the delivery standard travels.</p>
          <span>Dubai · all seven emirates</span>
        </AnimatedSection>
      </section>

      {/* ── Grid, part two ─────────────────────────────────────────────── */}
      <section className="portfolio-grid portfolio-grid--second" aria-label="Selected work, part two">
        <div className="container project-row project-row--follow">
          {secondRow.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={index * 0.06}
              sizes={
                project.size === 'wide'
                  ? '(max-width: 900px) 100vw, 62vw'
                  : '(max-width: 900px) 100vw, 34vw'
              }
            />
          ))}
        </div>
      </section>

      {/* ── Proof + CTA ────────────────────────────────────────────────── */}
      <section className="portfolio-close">
        <div className="container portfolio-close__grid">
          <AnimatedSection className="portfolio-close__copy">
            <span className="eyebrow">What sits behind the work</span>
            <h2 className="section-heading">
              One team stays responsible
              <br />
              until the last case is packed.
            </h2>
            <p className="lede">
              Every project on this page was delivered against a single plan covering creative,
              technical and hospitality decisions — with one point of contact throughout.
            </p>
            <div className="portfolio-close__actions">
              <Link to="/contact" className="button button--dark">
                Start an event brief <FaArrowRight aria-hidden="true" />
              </Link>
              <Link to="/services" className="text-action">
                See all services
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection className="portfolio-close__proof" delay={0.06}>
            <dl>
              {capabilityProof.map((item) => (
                <div key={item.id}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
