import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
import EventImage from '../components/EventImage'
import './Portfolio.css'

const categories = ['All', 'Beach & Brunch', 'Club Events', 'Corporate', 'Concerts', 'Catering', 'Weddings', 'Production']

const projects = [
  { id: 1, title: 'Destination Events', category: 'Beach & Brunch', desc: 'Open-air settings shaped around the shoreline and the Dubai skyline.', size: 'large', photo: 'beach-skyline.jpg' },
  { id: 2, title: 'Corporate Experiences', category: 'Corporate', desc: 'Brand-led environments designed for clear, confident guest experiences.', photo: 'corporate.jpg' },
  { id: 3, title: 'Nightlife Concepts', category: 'Club Events', desc: 'Sound, lighting and atmosphere working as one connected production.', photo: 'club.jpg' },
  { id: 4, title: 'Live Entertainment', category: 'Concerts', desc: 'Stage and audience experiences built around the performance.', photo: 'concerts.jpg' },
  { id: 5, title: 'Private Celebrations', category: 'Weddings', desc: 'Personal event settings with a considered sense of scale and occasion.', size: 'tall', photo: 'weddings.jpg' },
  { id: 6, title: 'Guest Hospitality', category: 'Catering', desc: 'Food, service and presentation aligned with the wider event experience.', photo: 'catering.jpg' },
  { id: 7, title: 'Technical Production', category: 'Production', desc: 'Staging, lighting, video and show delivery working behind the scenes.', size: 'wide', photo: 'production.jpg' },
  { id: 8, title: 'Intimate Weddings', category: 'Weddings', desc: 'Warm, detailed styling for close and personal celebrations.', photo: 'candlelit.jpg' },
  { id: 9, title: 'Brunch & Social Events', category: 'Beach & Brunch', desc: 'Relaxed daytime formats designed around food, music and connection.', photo: 'beach.jpg' },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const reduceMotion = useReducedMotion()

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <main className="portfolio-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <motion.div
          className="page-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Our Portfolio</span>
          <h1 className="page-hero-title">Events That<br />Speak Volumes</h1>
          <p className="page-hero-sub">
            A visual overview of our work across seven connected event disciplines.
          </p>
        </motion.div>
      </section>

      {/* Portfolio Grid */}
      <section className="portfolio-section section-padding">
        <div className="container">
          {/* Filter Bar */}
          <AnimatedSection>
            <div className="filter-bar">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                  aria-pressed={activeFilter === cat}
                  aria-controls="portfolio-grid"
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Grid */}
          <motion.div id="portfolio-grid" className="portfolio-grid" layout={!reduceMotion} aria-live="polite">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  className={`portfolio-item ${project.size || ''}`}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.99, y: 8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.995, y: 6 }}
                  transition={{ duration: reduceMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
                >
                  <EventImage name={project.photo} alt={project.title} className="portfolio-img" />
                  <div className="portfolio-overlay">
                    <span className="portfolio-cat">{project.category}</span>
                    <h3 className="portfolio-title">{project.title}</h3>
                    <p className="portfolio-desc">{project.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="portfolio-cta section-padding">
        <div className="container">
          <div className="portfolio-cta-inner">
            <div>
              <span className="section-label">Your Event</span>
              <h2 className="section-title">Ready to Add the Next Chapter?</h2>
            </div>
            <Link to="/contact" className="btn btn-dark">
              Start a Conversation <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
