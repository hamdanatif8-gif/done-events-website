import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
import EventImage from '../components/EventImage'
import PageIntro from '../components/PageIntro'
import {
  disciplinesWithCategories,
  processSteps,
  serviceCategories,
} from '../content/siteContent'
import './Services.css'

const disciplineLabels = {
  creative: 'Creative',
  production: 'Production',
  hospitality: 'Hospitality',
}

export default function Services() {
  const intro = (
    <dl className="services-intro-aside">
      <div>
        <dt>Services</dt>
        <dd>Twelve categories</dd>
      </div>
      <div>
        <dt>Organised in</dt>
        <dd>Three disciplines</dd>
      </div>
      <div>
        <dt>Scope</dt>
        <dd>One element or the whole event</dd>
      </div>
    </dl>
  )

  return (
    <main id="main-content" className="services-page">
      <PageIntro
        label="Services"
        title="What we're hired to do."
        description="Bring DONE a single service or the entire event. Either way, one team stays responsible for how it all comes together on the night."
        variant="petrol"
        aside={intro}
      />

      {/* -------------------------------------------------- CLIENT CATEGORIES */}
      <section className="service-catalogue section-shell" aria-labelledby="catalogue-title">
        <div className="container">
          <AnimatedSection className="service-catalogue__intro">
            <div>
              <span className="eyebrow">The full offer</span>
              <h2 id="catalogue-title" className="section-heading">
                Twelve services,<br />in the language you hire in.
              </h2>
            </div>
            <p className="lede">
              Corporate to private, stage to service. Each sits inside one of three disciplines, so
              the creative, technical and guest decisions never drift apart.
            </p>
          </AnimatedSection>

          <div className="service-catalogue__grid">
            {serviceCategories.map((category, index) => (
              <AnimatedSection
                key={category.id}
                className="service-tile"
                delay={(index % 3) * 0.05}
              >
                <article id={category.id}>
                  <div className="service-tile__top">
                    <span className="service-tile__number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`service-tile__tag service-tile__tag--${category.discipline}`}>
                      {disciplineLabels[category.discipline]}
                    </span>
                  </div>
                  <h3>{category.title}</h3>
                  <p>{category.summary}</p>
                  <Link to="/contact" className="service-tile__link" aria-label={`Enquire about ${category.title}`}>
                    Enquire <FaArrowRight aria-hidden="true" />
                  </Link>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- THREE DISCIPLINES */}
      <section className="service-disciplines" aria-labelledby="disciplines-title">
        <div className="container">
          <AnimatedSection className="service-disciplines__intro">
            <div>
              <span className="eyebrow eyebrow--light">How it's organised</span>
              <h2 id="disciplines-title" className="section-heading section-heading--light">
                Three disciplines.<br />One line of responsibility.
              </h2>
            </div>
            <p>
              The categories above are delivered by three connected teams. Keeping them under one
              roof is what stops the gaps that show up on the night.
            </p>
          </AnimatedSection>
        </div>

        {disciplinesWithCategories.map((discipline, index) => (
          <article
            key={discipline.id}
            id={discipline.id}
            className={`discipline-block discipline-block--${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="container discipline-block__inner">
              <AnimatedSection className="discipline-block__media">
                <EventImage
                  name={discipline.image}
                  alt={discipline.imageAlt}
                  className="discipline-block__image"
                  sizes="(max-width: 940px) calc(100vw - 44px), 48vw"
                />
                <span className="discipline-block__caption">
                  <em>{discipline.number}</em>
                  {discipline.imageLabel}
                </span>
              </AnimatedSection>

              <AnimatedSection className="discipline-block__body" delay={0.08}>
                <span className="discipline-block__eyebrow">Discipline {discipline.number}</span>
                <h3>{discipline.title}</h3>
                <p className="discipline-block__statement">{discipline.statement}</p>
                <p className="discipline-block__desc">{discipline.description}</p>

                <ul className="discipline-block__scope" aria-label={`${discipline.title} scope`}>
                  {discipline.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="discipline-block__services">
                  <span>Includes</span>
                  <div>
                    {discipline.categories.map((category) => (
                      <a key={category.id} href={`#${category.id}`}>
                        {category.title}
                      </a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </article>
        ))}
      </section>

      {/* -------------------------------------------------- PROCESS + CTA */}
      <section className="service-model section-shell" aria-labelledby="service-model-title">
        <div className="container service-model__grid">
          <AnimatedSection className="service-model__intro">
            <span className="eyebrow">How we work</span>
            <h2 id="service-model-title" className="section-heading">
              One plan, first brief to final cue.
            </h2>
            <p>
              Whatever the scope, the work moves through the same four stages — each one settling
              what the next depends on.
            </p>
            <Link to="/contact" className="button button--dark">
              Start an event brief <FaArrowRight aria-hidden="true" />
            </Link>
          </AnimatedSection>

          <ol className="service-model__steps">
            {processSteps.map((step) => (
              <li key={step.title}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}
