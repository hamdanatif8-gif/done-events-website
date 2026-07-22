import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import EventImage from '../components/EventImage'
import AnimatedSection from '../components/AnimatedSection'
import './About.css'

const values = [
  { number: '01', title: 'Excellence', desc: 'Every detail is considered in relation to the whole experience.' },
  { number: '02', title: 'Originality', desc: 'Each event starts with its own audience, setting and reason to exist.' },
  { number: '03', title: 'Care', desc: 'Thoughtful planning and clear communication guide every stage of delivery.' },
  { number: '04', title: 'Integrity', desc: 'Decisions stay practical, transparent and aligned with the event vision.' },
]

const process = [
  { number: '01', title: 'Listen', desc: 'Understand the audience, the purpose and the feeling the event should create.' },
  { number: '02', title: 'Shape', desc: 'Turn the brief into a focused creative and operational direction.' },
  { number: '03', title: 'Coordinate', desc: 'Bring venues, hospitality, entertainment and production into one plan.' },
  { number: '04', title: 'Deliver', desc: 'Manage the live experience with clarity, care and attention to detail.' },
]

export default function About() {
  return (
    <main className="about-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <motion.div
          className="page-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">About DONE</span>
          <h1 className="page-hero-title">The Thinking Behind<br />The Experience</h1>
          <p className="page-hero-sub">
            Creative direction, planning, hospitality and production working as one.
          </p>
        </motion.div>
      </section>

      <section className="about-story section-padding">
        <AnimatedSection className="container about-story-grid">
          <div className="about-story-images">
            <EventImage name="corporate.jpg" alt="A large-scale DONE Events environment" className="about-img-1" />
            <EventImage name="production.jpg" alt="Technical event production in progress" className="about-img-2" />
          </div>
          <div className="about-story-content">
            <span className="section-label">Our Approach</span>
            <h2 className="section-title">Built Around<br />the Experience</h2>
            <p>
              DONE Events & Entertainment brings every moving part of an event into one
              clear direction. The creative idea, guest journey, hospitality and technical
              delivery are considered together from the beginning.
            </p>
            <p>
              That joined-up approach creates events that feel confident and natural,
              whether the format is corporate, private, hospitality-led or live entertainment.
            </p>
            <div className="about-principle">
              <span>Day to Night. Done Right.</span>
              <p>One standard from the first conversation to the final guest departure.</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="about-values section-padding">
        <AnimatedSection className="container">
          <div className="section-header">
            <span className="section-label">Our Values</span>
            <h2 className="section-title">What Guides the Work</h2>
          </div>
          <div className="values-grid">
            {values.map((value) => (
              <article key={value.title} className="value-card">
                <span className="value-number">{value.number}</span>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.desc}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="about-process section-padding">
        <AnimatedSection className="container process-layout">
          <div className="process-heading">
            <span className="section-label">How We Work</span>
            <h2 className="section-title light">A Clear Path<br />from Brief to Live</h2>
          </div>
          <div className="process-list">
            {process.map((step) => (
              <article key={step.title} className="process-item">
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="about-cta section-padding">
        <AnimatedSection className="container">
          <div className="cta-content">
            <span className="section-label">Start a Conversation</span>
            <h2 className="cta-title">Let’s Shape the<br />Next Experience Together</h2>
            <p className="cta-text">Every strong event starts with a clear brief.</p>
            <Link to="/contact" className="btn btn-primary">
              Get in Touch <FaArrowRight />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </main>
  )
}
