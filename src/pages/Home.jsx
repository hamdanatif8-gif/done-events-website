import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import EventImage from '../components/EventImage'
import HeroVideo from '../components/HeroVideo'
import AnimatedSection from '../components/AnimatedSection'
import './Home.css'

const eventWorlds = [
  { number: '01', id: 'beach-brunch', title: 'Beach & Brunch', desc: 'Waterfront gatherings shaped around food, music and the rhythm of the day.' },
  { number: '02', id: 'club-events', title: 'Club Events', desc: 'Nightlife concepts built through sound, lighting, talent and atmosphere.' },
  { number: '03', id: 'corporate', title: 'Corporate', desc: 'Brand-led events, launches, conferences and executive experiences.' },
  { number: '04', id: 'concerts', title: 'Concerts', desc: 'Live shows coordinated from stage planning through audience experience.' },
  { number: '05', id: 'catering', title: 'Catering & Hospitality', desc: 'Considered menus, service and guest journeys for every format.' },
  { number: '06', id: 'weddings', title: 'Private Events & Weddings', desc: 'Personal celebrations planned with care, clarity and a strong sense of place.' },
  { number: '07', id: 'production', title: 'Production', desc: 'Technical direction, staging, lighting, video and show delivery.' },
]

const selectedWork = [
  { category: 'Corporate', title: 'Corporate Experiences', photo: 'corporate.jpg', className: 'featured-large', alt: 'A large-scale corporate event environment in Dubai' },
  { category: 'Beach & Brunch', title: 'Destination Events', photo: 'beach-skyline.jpg', className: '', alt: 'An outdoor event beside the Dubai skyline' },
  { category: 'Private Events', title: 'Private Celebrations', photo: 'weddings.jpg', className: '', alt: 'A refined private celebration setting' },
  { category: 'Concerts', title: 'Live Entertainment', photo: 'concerts.jpg', className: '', alt: 'Live entertainment with stage lighting and an audience' },
  { category: 'Production', title: 'Show Production', photo: 'production.jpg', className: 'featured-wide', alt: 'Technical stage production in progress' },
]

export default function Home() {
  const reduceMotion = useReducedMotion()
  const reveal = (delay, y = 18, duration = 0.7) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : duration, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <main className="home">
      <section className="hero">
        <HeroVideo />

        <motion.div className="hero-content">
          <motion.div
            {...reveal(0.18, 14, 0.62)}
            className="hero-label"
          >
            Dubai Events & Entertainment
          </motion.div>

          <motion.h1
            className="hero-title"
            {...reveal(0.3, 22, 0.74)}
          >
            Day to Night.<br />
            <span className="hero-highlight">Done Right.</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            {...reveal(0.44, 16, 0.68)}
          >
            Creative direction, planning, hospitality and production brought together
            for events across Dubai and beyond.
          </motion.p>

          <motion.div
            className="hero-buttons"
            {...reveal(0.56, 14, 0.62)}
          >
            <Link to="/portfolio" className="btn btn-primary hero-btn">
              Explore Our Work <FaArrowRight />
            </Link>
            <Link to="/contact" className="btn btn-outline hero-btn-outline">
              Start Your Event
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-scroll-indicator"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.9 }}
          aria-hidden="true"
        >
          <span>Scroll</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      <section className="featured-work section-padding">
        <AnimatedSection className="container">
          <div className="section-intro-row">
            <div>
              <span className="section-label">Selected Work</span>
              <h2 className="section-title">The Work Comes First</h2>
            </div>
            <p className="section-intro-copy">
              A concise view of the environments, formats and production disciplines
              that define DONE Events.
            </p>
          </div>

          <div className="featured-grid">
            {selectedWork.map((work) => (
              <article key={work.title} className={`featured-item ${work.className}`.trim()}>
                <EventImage name={work.photo} alt={work.alt} className="img-featured" />
                <div className="featured-overlay">
                  <span className="featured-cat">{work.category}</span>
                  <h3>{work.title}</h3>
                </div>
              </article>
            ))}
          </div>

          <div className="featured-cta">
            <Link to="/portfolio" className="btn btn-outline">
              View Portfolio <FaArrowRight />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <section className="event-worlds section-padding">
        <AnimatedSection className="container worlds-layout">
          <div className="worlds-heading">
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Seven Connected<br />Event Disciplines</h2>
            <p className="section-subtitle">
              Each service connects naturally to the next, giving every event one clear
              creative and operational direction.
            </p>
            <Link to="/services" className="text-link">
              Explore all services <FaArrowRight />
            </Link>
          </div>

          <div className="worlds-list">
            {eventWorlds.map((world) => (
              <Link key={world.id} to={`/services#${world.id}`} className="world-row">
                <span className="world-number">{world.number}</span>
                <div>
                  <h3 className="world-title">{world.title}</h3>
                  <p className="world-desc">{world.desc}</p>
                </div>
                <FaArrowRight className="world-arrow" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="about-intro section-padding">
        <AnimatedSection className="container about-intro-grid">
          <div className="about-intro-image">
            <EventImage
              name="candlelit.jpg"
              alt="Warm candlelit table styling at a Dubai event"
              className="img-tall"
            />
          </div>
          <div className="about-intro-content">
            <span className="section-label">One Coordinated Team</span>
            <h2 className="section-title">Where Vision<br />Meets Execution</h2>
            <p className="about-intro-text">
              DONE Events & Entertainment brings creative direction, planning,
              hospitality and technical production into one coordinated experience.
            </p>
            <p className="about-intro-text">
              From destination gatherings to corporate events, live shows and private
              celebrations, every detail is shaped around the audience and the occasion.
            </p>
            <Link to="/about" className="btn btn-dark">
              About DONE <FaArrowRight />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <section className="home-cta section-padding">
        <AnimatedSection className="container home-brief-layout">
          <div className="home-brief-copy">
            <span className="section-label">Start a Conversation</span>
            <h2 className="cta-title">Start with<br />the Essentials</h2>
            <p className="cta-text">
              Tell us what you are planning, who it is for and when it needs to happen.
              We will help shape the next step.
            </p>
          </div>
          <div className="home-brief-details">
            <div className="brief-row">
              <span>01</span>
              <div><strong>The event</strong><p>Format, setting and purpose.</p></div>
            </div>
            <div className="brief-row">
              <span>02</span>
              <div><strong>The audience</strong><p>Who is joining and how it should feel.</p></div>
            </div>
            <div className="brief-row">
              <span>03</span>
              <div><strong>The timing</strong><p>Date, scale and the practical essentials.</p></div>
            </div>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Share Your Brief <FaArrowRight />
              </Link>
              <a href="https://wa.me/971585554446" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  )
}
