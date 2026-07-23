import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
import EventImage from '../components/EventImage'
import HeroVideo from '../components/HeroVideo'
import Marquee from '../components/Marquee'
import {
  capabilityTicker,
  disciplinesWithCategories,
  homeWork,
  operatingStandards,
  processSteps,
  sectors,
} from '../content/siteContent'
import './Home.css'

export default function Home() {
  return (
    <main id="main-content" className="home">
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
            A Dubai events company that runs creative direction, production and hospitality as one
            team — from the first brief to the final cue.
          </p>
          <div className="hero__actions">
            <Link to="/contact" className="button button--light">
              Start an event brief <FaArrowRight aria-hidden="true" />
            </Link>
            <Link to="/portfolio" className="text-action text-action--light">
              View selected work
            </Link>
          </div>
        </div>
        <div className="hero__scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </section>

      <section className="home-ticker" aria-label="What we do">
        <Marquee items={capabilityTicker} ariaLabel="DONE capabilities" variant="petrol" speed={46} />
      </section>

      <section className="home-positioning section-shell">
        <div className="container home-positioning__grid">
          <AnimatedSection className="home-positioning__lead">
            <span className="eyebrow">Who we are</span>
            <p className="home-positioning__statement">
              DONE plans, builds and runs events across Dubai — corporate and brand, weddings and
              private, concerts and live shows, hospitality and outdoor. One team holds the idea and
              the operation together, so nothing gets lost between them.
            </p>
          </AnimatedSection>
          <AnimatedSection className="home-positioning__facts" delay={0.08}>
            <dl>
              <div>
                <dt>Based in</dt>
                <dd>Dubai, UAE</dd>
              </div>
              <div>
                <dt>Built around</dt>
                <dd>Creative · Production · Hospitality</dd>
              </div>
              <div>
                <dt>Held together by</dt>
                <dd>Brief · Build · Live</dd>
              </div>
            </dl>
            <Link to="/about" className="text-action">
              More about DONE <FaArrowRight aria-hidden="true" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="selected-work section-shell section-shell--compact">
        <div className="container">
          <AnimatedSection className="selected-work__intro">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2 className="section-heading">Made for the room,<br />built for the night.</h2>
            </div>
            <div>
              <p className="lede">
                A view across corporate stages, private celebrations and destination hospitality —
                three formats, one standard of delivery.
              </p>
              <Link to="/portfolio" className="text-action">
                Explore the portfolio <FaArrowRight aria-hidden="true" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="work-mosaic">
            {homeWork.map((item, index) => (
              <AnimatedSection
                key={item.title}
                className={`work-card work-card--${index + 1}`}
                delay={index * 0.06}
              >
                <Link to="/portfolio" aria-label={`${item.title}: view portfolio`}>
                  <EventImage
                    name={item.photo}
                    alt={item.alt}
                    className="work-card__image"
                    sizes="(max-width: 720px) calc(100vw - 44px), (max-width: 1100px) 90vw, 44vw"
                  />
                  <div className="work-card__overlay" aria-hidden="true" />
                  <div className="work-card__copy">
                    <span className="work-card__index">{item.number}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p className="work-card__label">{item.label}</p>
                      <p className="work-card__desc">{item.description}</p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="home-services">
        <div className="container">
          <AnimatedSection className="home-services__intro">
            <div>
              <span className="eyebrow eyebrow--light">What we do</span>
              <h2 className="section-heading section-heading--light">
                Twelve services.<br />One team to run them.
              </h2>
            </div>
            <div>
              <p>
                Hire DONE for a single element or the whole event. Whatever the scope, the same team
                stays responsible for how it comes together on the night.
              </p>
              <Link to="/services" className="text-action text-action--light">
                See all services <FaArrowRight aria-hidden="true" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="home-services__grid">
            {disciplinesWithCategories.map((discipline, index) => (
              <AnimatedSection
                key={discipline.id}
                className="home-discipline"
                delay={index * 0.05}
              >
                <div className="home-discipline__head">
                  <span className="home-discipline__number">{discipline.number}</span>
                  <h3>{discipline.title}</h3>
                  <p>{discipline.statement}</p>
                </div>
                <ul className="home-discipline__list">
                  {discipline.categories.map((category) => (
                    <li key={category.id}>
                      <Link to={`/services#${category.id}`}>
                        <span>{category.title}</span>
                        <FaArrowRight aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cinematic" aria-label="Waterfront hospitality in Dubai">
        <EventImage
          name="beach.jpg"
          alt="A daytime waterfront beach club setting overlooking the Dubai skyline"
          className="home-cinematic__media"
          sizes="100vw"
        />
        <div className="home-cinematic__scrim" aria-hidden="true" />
        <div className="container home-cinematic__content">
          <AnimatedSection>
            <span className="eyebrow eyebrow--light">Day to night</span>
            <p className="home-cinematic__line">
              A sunrise brand breakfast and a midnight rooftop close carry the same discipline. The
              hour changes. The standard does not.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="home-advantage section-shell">
        <div className="container home-advantage__layout">
          <AnimatedSection className="home-advantage__media">
            <EventImage
              name="production.jpg"
              alt="Technicians at a live event production control desk in Dubai"
              className="home-advantage__image"
              sizes="(max-width: 980px) calc(100vw - 44px), 46vw"
            />
            <span className="home-advantage__caption">Behind the room · live show control</span>
          </AnimatedSection>

          <div className="home-advantage__content">
            <AnimatedSection>
              <span className="eyebrow">Why DONE</span>
              <h2 className="section-heading">Creative ambition,<br />operational calm.</h2>
              <p className="lede">
                The part guests see and the plan behind it are built together. Fewer gaps, clearer
                calls, and a team that stays in the room through the live event.
              </p>
            </AnimatedSection>
            <div className="advantage-list">
              {operatingStandards.map((standard, index) => (
                <AnimatedSection key={standard.title} className="advantage-item" delay={index * 0.04}>
                  <span className="advantage-item__number">{standard.number}</span>
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

      <section className="home-process section-shell">
        <div className="container">
          <AnimatedSection className="home-process__intro">
            <div>
              <span className="eyebrow">How we work</span>
              <h2 className="section-heading">From first brief<br />to final cue.</h2>
            </div>
            <p className="lede">
              Four stages, each one resolving what the next depends on — so the plan is ready long
              before the doors open.
            </p>
          </AnimatedSection>
          <ol className="process-track">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.title} className="process-step" delay={index * 0.06}>
                <span className="process-step__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      <section className="home-sectors section-shell">
        <div className="container">
          <AnimatedSection className="home-sectors__intro">
            <div>
              <span className="eyebrow">Where we work</span>
              <h2 className="section-heading">Trusted across<br />Dubai's event calendar.</h2>
            </div>
            <p className="lede">
              From boardroom launches to waterfront weddings, DONE is built to move between formats
              without dropping the standard.
            </p>
          </AnimatedSection>

          <div className="sector-grid">
            {sectors.map((sector, index) => (
              <AnimatedSection key={sector.title} className="sector-card" delay={index * 0.04}>
                <span className="sector-card__index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{sector.title}</h3>
                <p>{sector.note}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
