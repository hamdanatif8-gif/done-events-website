import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaQuoteLeft } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
import './About.css'

const timeline = [
  { year: '2009', title: 'The Beginning', desc: 'Founded in Dubai with a vision to transform the events landscape in the Middle East.' },
  { year: '2012', title: 'First Major Milestone', desc: 'Delivered our 100th event and expanded into corporate entertainment.' },
  { year: '2015', title: 'Seven Worlds Born', desc: 'Launched our signature seven event worlds framework, defining our unique approach.' },
  { year: '2018', title: 'Regional Expansion', desc: 'Extended operations across the UAE and into neighboring GCC countries.' },
  { year: '2021', title: '1000+ Events', desc: 'Celebrated our 1000th event milestone with a star-studded anniversary gala.' },
  { year: '2024', title: 'Industry Leaders', desc: 'Recognized as one of Dubai\'s top event management companies with 1500+ events delivered.' },
]

const values = [
  { title: 'Excellence', desc: 'Every detail matters. We pursue perfection in every event we create, from the grandest gesture to the smallest touch.', icon: '✦' },
  { title: 'Innovation', desc: 'We push boundaries and embrace new ideas, technologies, and approaches to create events that set new standards.', icon: '◆' },
  { title: 'Passion', desc: 'Events are not just our business — they are our calling. Every celebration ignites our creative fire.', icon: '♦' },
  { title: 'Integrity', desc: 'Trust is the foundation of every relationship. We deliver on our promises, every single time.', icon: '●' },
]

const team = [
  { name: 'Ahmed Al Rashid', role: 'Founder & CEO', initial: 'A' },
  { name: 'Sophia Chen', role: 'Creative Director', initial: 'S' },
  { name: 'Omar Hassan', role: 'Head of Production', initial: 'O' },
  { name: 'Maria Santos', role: 'Client Relations Director', initial: 'M' },
  { name: 'David Kim', role: 'Technical Director', initial: 'D' },
  { name: 'Layla Mahmoud', role: 'Events Manager', initial: 'L' },
]

export default function About() {
  return (
    <main className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <motion.div
          className="page-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">About Us</span>
          <h1 className="page-hero-title">The Story Behind<br />The Spectacle</h1>
          <p className="page-hero-sub">
            15+ years of passion, creativity, and unwavering dedication to crafting
            Dubai's most extraordinary events.
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="about-story section-padding">
        <div className="container about-story-grid">
          <AnimatedSection direction="left" className="about-story-images">
            <div className="img-placeholder about-img-1">
              <span>Done Events Team</span>
            </div>
            <div className="img-placeholder about-img-2">
              <span>Behind the Scenes</span>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right" className="about-story-content">
            <span className="section-label">Our Story</span>
            <h2 className="section-title">From a Dream to<br />Dubai's Finest</h2>
            <p>
              What began as a bold dream in 2009 has blossomed into one of Dubai's most
              respected event management companies. Done Events & Entertainment was founded
              on a simple belief: that every event has the power to create lasting memories.
            </p>
            <p>
              Over the years, we've evolved from a small team of passionate event enthusiasts
              into a full-service entertainment powerhouse. Our seven event worlds represent
              the breadth of our expertise, each refined through hundreds of successful events.
            </p>
            <div className="about-quote">
              <FaQuoteLeft className="quote-icon" />
              <blockquote>
                "We don't just plan events. We architect moments that become part of
                people's life stories."
              </blockquote>
              <cite>— Ahmed Al Rashid, Founder & CEO</cite>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="about-values section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Our Values</span>
              <h2 className="section-title">What Drives<br />Everything We Do</h2>
            </div>
          </AnimatedSection>
          <div className="values-grid">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="value-card">
                  <span className="value-icon">{v.icon}</span>
                  <h3 className="value-title">{v.title}</h3>
                  <p className="value-desc">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Our Journey</span>
              <h2 className="section-title light">15+ Years of<br />Making Magic</h2>
            </div>
          </AnimatedSection>
          <div className="timeline">
            {timeline.map((item, i) => (
              <AnimatedSection key={item.year} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-content">
                    <span className="timeline-year">{item.year}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                  <div className="timeline-dot" />
                </div>
              </AnimatedSection>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Our Team</span>
              <h2 className="section-title">The People Behind<br />The Magic</h2>
            </div>
          </AnimatedSection>
          <div className="team-grid">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.08}>
                <div className="team-card">
                  <div className="team-avatar">
                    <span>{member.initial}</span>
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="cta-content">
              <span className="section-label">Join Our Story</span>
              <h2 className="cta-title">Let's Write the<br />Next Chapter Together</h2>
              <p className="cta-text">
                Every great event starts with a conversation. Let's start ours.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Get in Touch <FaArrowRight />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
