import AnimatedSection from '../components/AnimatedSection'
import PageIntro from '../components/PageIntro'
import { disciplines, eventFormats, operatingStandards, processSteps } from '../content/siteContent'
import './About.css'

const partnerDisciplines = [
  'Venues',
  'Technical crews',
  'Catering & service',
  'Entertainment',
  'Logistics',
  'Guest operations',
]

export default function About() {
  const aside = (
    <dl className="about-intro-aside">
      <div>
        <dt>Based</dt>
        <dd>Dubai, UAE</dd>
      </div>
      <div>
        <dt>Delivery model</dt>
        <dd>Integrated, end to end</dd>
      </div>
    </dl>
  )

  return (
    <main id="main-content" className="about-page">
      <PageIntro
        label="About DONE"
        title="One point of view. One accountable team."
        description="Creative direction, production and hospitality under one clear line of responsibility."
        aside={aside}
      />

      {/* CONTENT PLACEHOLDER: Add verified founder, founding-year and company-history
          details here only when approved facts are supplied. */}
      <section className="about-profile section-shell">
        <AnimatedSection className="container about-profile__grid">
          <div className="about-profile__label">
            <span className="eyebrow">Who we are</span>
            <span className="about-profile__location">Dubai<br />United Arab Emirates</span>
          </div>

          <div className="about-profile__statement">
            <h2>A Dubai events company built to hold the whole experience together.</h2>
            <div className="about-profile__copy">
              <p>DONE brings creative direction, technical production, hospitality and live operations into one delivery model. The work spans corporate and brand programmes, concerts and live shows, private events and weddings, lounges, catering-led hospitality and outdoor formats.</p>
              <p>Ideas are developed with the practical plan in view. Production decisions account for the guest experience. Hospitality is coordinated with the live schedule. That is how the team protects both the ambition and the day itself.</p>
            </div>
          </div>

          <blockquote className="about-profile__promise">
            <span>Our standard</span>
            <strong>Ambitious events.<br />Precisely delivered.</strong>
            <p>Day to Night. Done Right.</p>
          </blockquote>
        </AnimatedSection>
      </section>

      <section className="about-model section-shell" aria-labelledby="about-model-title">
        <div className="container about-model__grid">
          <AnimatedSection className="about-model__intro">
            <span className="eyebrow eyebrow--light">Integrated delivery</span>
            <h2 id="about-model-title" className="section-heading section-heading--light">Designed together.<br />Delivered together.</h2>
            <p>Each discipline has its own craft. DONE connects them early, giving the client a clearer process and the live event one coordinated plan.</p>
            <div className="about-model__accountability" aria-label="DONE accountability model">
              <span>One brief</span>
              <span>One live plan</span>
              <strong>One accountable team</strong>
            </div>
          </AnimatedSection>

          <div className="about-model__disciplines">
            {disciplines.map((discipline, index) => (
              <AnimatedSection key={discipline.id} className="about-discipline" delay={index * 0.05}>
                <span className="about-discipline__number">{discipline.number}</span>
                <div className="about-discipline__copy">
                  <h3>{discipline.title}</h3>
                  <p>{discipline.description}</p>
                </div>
                <ul aria-label={`${discipline.title} scope`}>
                  {discipline.scope.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="about-partners section-shell">
        <div className="container">
          <AnimatedSection className="about-partners__heading">
            <div>
              <span className="eyebrow">Partner coordination</span>
              <h2 className="section-heading">Specialists aligned.<br />Nothing left between teams.</h2>
            </div>
            <div className="about-partners__copy">
              <p>DONE coordinates venue teams, caterers, entertainment, technical specialists and operational partners against the same brief and live schedule.</p>
              <p>The client keeps one clear line of accountability while every handover remains visible.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="about-partners__disciplines" delay={0.08}>
            {partnerDisciplines.map((discipline, index) => (
              <div key={discipline}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{discipline}</p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      <section className="about-standards section-shell">
        <div className="container">
          <AnimatedSection className="about-standards__heading">
            <span className="eyebrow">Why DONE</span>
            <h2 className="section-heading">Confidence comes from the way the work is run.</h2>
          </AnimatedSection>

          <div className="about-standards__list">
            {operatingStandards.map((standard, index) => (
              <AnimatedSection key={standard.title} className="about-standard" delay={index * 0.04}>
                <span>{standard.number}</span>
                <h3>{standard.title}</h3>
                <p>{standard.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="about-formats section-shell" aria-labelledby="about-formats-title">
        <div className="container about-formats__grid">
          <AnimatedSection className="about-formats__intro">
            <span className="eyebrow eyebrow--light">Formats we serve</span>
            <h2 id="about-formats-title" className="section-heading section-heading--light">The setting changes. The standard does not.</h2>
            <p>From business-led programmes to highly personal occasions, the delivery model adapts to the audience, purpose and place.</p>
          </AnimatedSection>

          <div className="about-formats__list">
            {eventFormats.map((format, index) => (
              <AnimatedSection key={format.id} className="about-format" delay={index * 0.04}>
                <span>0{index + 1}</span>
                <h3>{format.title}</h3>
                <p>{format.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="about-process section-shell" aria-labelledby="about-process-title">
        <div className="container">
          <AnimatedSection className="about-process__heading">
            <div>
              <span className="eyebrow">From brief to live</span>
              <h2 id="about-process-title" className="section-heading">Clarity at every handover.</h2>
            </div>
            <p>Every phase resolves the creative, technical and operational decisions needed for the next one.</p>
          </AnimatedSection>

          <ol className="about-process__steps">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <AnimatedSection className="about-process__step" delay={index * 0.05}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </AnimatedSection>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </main>
  )
}
