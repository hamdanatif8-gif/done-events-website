import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import EventImage from '../components/EventImage'
import './Portfolio.css'

const categories = ['All', 'Beach & Brunch', 'Club Events', 'Corporate', 'Concerts', 'Catering', 'Weddings', 'Production']

const projects = [
  { id: 1, title: 'Sunset Beach Festival 2024', category: 'Beach & Brunch', desc: 'An immersive beachside celebration for 2000+ guests', size: 'large', photo: 'beach-brunch.jpg' },
  { id: 2, title: 'Corporate Excellence Awards', category: 'Corporate', desc: 'Annual black-tie gala for Dubai\'s leading enterprises', photo: 'corporate.jpg' },
  { id: 3, title: 'Neon Nights Club Launch', category: 'Club Events', desc: 'Grand opening of Dubai\'s newest nightlife destination', photo: 'entertainment.jpg' },
  { id: 4, title: 'Symphony Under the Stars', category: 'Concerts', desc: 'Outdoor orchestral experience at Dubai Opera Garden', photo: 'entertainment.jpg' },
  { id: 5, title: 'Al Maktoum Wedding', category: 'Weddings', desc: 'A fairytale celebration for 500 guests', size: 'tall', photo: 'candlelit.jpg' },
  { id: 6, title: 'Dubai Food Festival', category: 'Catering', desc: 'Multi-venue culinary showcase across the city', photo: 'catering.jpg' },
  { id: 7, title: 'Tech Summit 2024', category: 'Corporate', desc: 'International technology conference for 3000 delegates', size: 'wide', photo: 'corporate.jpg' },
  { id: 8, title: 'Full Moon Party', category: 'Beach & Brunch', desc: 'Monthly beach celebration under the moonlight', photo: 'beach-skyline.jpg' },
  { id: 9, title: 'Concert Production - Arena', category: 'Production', desc: 'Full technical production for arena concerts', photo: 'entertainment.jpg' },
  { id: 10, title: 'Royal Garden Wedding', category: 'Weddings', desc: 'Lush garden wedding with floral canopy', photo: 'lounge.jpg' },
  { id: 11, title: 'Brand Launch Experience', category: 'Corporate', desc: 'Luxury automobile launch at Burj Al Arab', size: 'large', photo: 'beach-skyline.jpg' },
  { id: 12, title: 'Underground Sessions', category: 'Club Events', desc: 'Intimate electronic music experience', photo: 'lounge.jpg' },
  { id: 13, title: 'Gourmet Gala', category: 'Catering', desc: 'Five-course dining experience with chef collaborations', photo: 'candlelit.jpg' },
  { id: 14, title: 'Festival of Lights', category: 'Production', desc: 'Spectacular lighting installation at Dubai Creek', photo: 'corporate.jpg' },
  { id: 15, title: 'Poolside Brunch Series', category: 'Beach & Brunch', desc: 'Weekly brunch concept at five-star resort', photo: 'beach-brunch.jpg' },
  { id: 16, title: 'Live Nation Concerts', category: 'Concerts', desc: 'Major artist concerts and live performances', size: 'tall', photo: 'entertainment.jpg' },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')

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
            A curated showcase of our finest work across seven worlds of entertainment.
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
                  className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Grid */}
          <motion.div className="portfolio-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  className={`portfolio-item ${project.size || ''}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
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

      {/* Stats */}
      <section className="portfolio-stats section-padding">
        <div className="container">
          <div className="portfolio-stats-grid">
            <AnimatedSection delay={0}>
              <div className="p-stat">
                <span className="p-stat-num">1500+</span>
                <span className="p-stat-label">Events Completed</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="p-stat">
                <span className="p-stat-num">7</span>
                <span className="p-stat-label">Event Worlds</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="p-stat">
                <span className="p-stat-num">100%</span>
                <span className="p-stat-label">Client Satisfaction</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="p-stat">
                <span className="p-stat-num">24/7</span>
                <span className="p-stat-label">Dedicated Support</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  )
}
