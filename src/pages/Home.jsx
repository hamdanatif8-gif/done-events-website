import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaStar } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
import EventImage from '../components/EventImage'
import './Home.css'

const eventWorlds = [
  { title: 'Beach & Brunch', desc: 'Sun-kissed celebrations and oceanside soirées', icon: '🏖️', color: '#e8d5b7' },
  { title: 'Club Events', desc: 'Electric nightlife experiences that ignite the senses', icon: '🎶', color: '#d4c5e8' },
  { title: 'Corporate', desc: 'Sophisticated business events that leave lasting impressions', icon: '🏢', color: '#c5d8e8' },
  { title: 'Concerts', desc: 'World-class live entertainment and musical productions', icon: '🎤', color: '#e8c5c5' },
  { title: 'Catering & Hospitality', desc: 'Exquisite culinary journeys for every palate', icon: '🍽️', color: '#c5e8d4' },
  { title: 'Private & Weddings', desc: 'Dream celebrations crafted with love and elegance', icon: '💐', color: '#f0e0d0' },
  { title: 'Production', desc: 'State-of-the-art technical production and staging', icon: '🎬', color: '#d8d4e8' },
]

const stats = [
  { number: '15+', label: 'Years of Excellence' },
  { number: '1500+', label: 'Events Delivered' },
  { number: '200+', label: 'Corporate Clients' },
  { number: '50+', label: 'Award Nominations' },
]

const testimonials = [
  { name: 'Sarah Al Maktoum', role: 'CEO, Luxe Holdings', text: 'Done Events transformed our annual gala into an unforgettable masterpiece. Their attention to detail is unmatched in Dubai.' },
  { name: 'James Mitchell', role: 'Director, Global Corp', text: 'From concept to execution, the team delivered beyond our wildest expectations. A truly world-class event management company.' },
  { name: 'Fatima Al Rashid', role: 'Private Client', text: 'Our wedding was a dream come true. Every single moment was perfectly orchestrated. Thank you, Done Events!' },
]

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main className="home">
      {/* Hero Section - Colorful with Moon Animation */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-gradient-1" />
          <div className="hero-gradient-2" />
          <div className="hero-gradient-3" />
          <div className="hero-stars">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="star" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }} />
            ))}
          </div>
          <div className="moon">
            <div className="moon-glow" />
            <div className="moon-body" />
            <div className="moon-crater moon-crater-1" />
            <div className="moon-crater moon-crater-2" />
            <div className="moon-crater moon-crater-3" />
          </div>
        </div>

        <motion.div className="hero-content" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-label"
          >
            Dubai's Premier Event Company
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Day to Night.<br />
            <span className="hero-highlight">Done Right.</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Crafting extraordinary events across seven worlds of entertainment.
            From intimate gatherings to grand spectacles — we make every moment unforgettable.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link to="/portfolio" className="btn btn-primary hero-btn">
              Explore Our Work <FaArrowRight />
            </Link>
            <Link to="/contact" className="btn btn-outline hero-btn-outline">
              Start Your Event
            </Link>
          </motion.div>

          <motion.div
            className="hero-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="scroll-line" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container stats-grid">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* About Intro */}
      <section className="about-intro section-padding">
        <div className="container about-intro-grid">
          <AnimatedSection direction="left" className="about-intro-image">
            <EventImage
              name="candlelit.jpg"
              alt="Warm, candlelit table styling at a premium Dubai event"
              className="img-tall"
            />
          </AnimatedSection>
          <AnimatedSection direction="right" className="about-intro-content">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">Where Vision<br />Meets Execution</h2>
            <p className="about-intro-text">
              For over 15 years, Done Events & Entertainment has been the trusted partner behind
              Dubai's most talked-about events. We don't just plan events — we architect experiences
              that resonate, inspire, and linger in memory long after the last guest departs.
            </p>
            <p className="about-intro-text">
              From beachside brunches that redefine leisure to corporate galas that command attention,
              our seven event worlds encompass every facet of entertainment. Each event is a canvas,
              and we're the artists who bring your vision to vivid life.
            </p>
            <Link to="/about" className="btn btn-dark">
              Our Story <FaArrowRight />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Seven Event Worlds */}
      <section className="event-worlds section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">What We Do</span>
              <h2 className="section-title">Seven Worlds of<br />Entertainment</h2>
              <p className="section-subtitle">
                Each world represents a realm of expertise, honed over thousands of events
                and perfected through unwavering dedication to excellence.
              </p>
            </div>
          </AnimatedSection>

          <div className="worlds-grid">
            {eventWorlds.map((world, i) => (
              <AnimatedSection key={world.title} delay={i * 0.08}>
                <Link to="/services" className="world-card" style={{ '--card-accent': world.color }}>
                  <div className="world-icon">{world.icon}</div>
                  <h3 className="world-title">{world.title}</h3>
                  <p className="world-desc">{world.desc}</p>
                  <span className="world-arrow"><FaArrowRight /></span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work / Image Grid */}
      <section className="featured-work section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Featured Projects</span>
              <h2 className="section-title">Creating Moments<br />That Matter</h2>
            </div>
          </AnimatedSection>

          <div className="featured-grid">
            <AnimatedSection delay={0} className="featured-item featured-large">
              <EventImage name="corporate.jpg" alt="Grand gala night — corporate event at Dubai Opera" className="img-featured" />
              <div className="featured-overlay">
                <span className="featured-cat">Corporate</span>
                <h3>Grand Gala Night</h3>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1} className="featured-item">
              <EventImage name="beach.jpg" alt="Sunset beach festival by the Dubai coastline" className="img-featured" />
              <div className="featured-overlay">
                <span className="featured-cat">Beach & Brunch</span>
                <h3>Sunset Beach Festival</h3>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15} className="featured-item">
              <EventImage name="weddings.jpg" alt="Royal wedding celebration in a Dubai ballroom" className="img-featured" />
              <div className="featured-overlay">
                <span className="featured-cat">Weddings</span>
                <h3>Royal Wedding</h3>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} className="featured-item">
              <EventImage name="concerts.jpg" alt="Live entertainment and stage production" className="img-featured" />
              <div className="featured-overlay">
                <span className="featured-cat">Concerts</span>
                <h3>EDM Festival</h3>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.25} className="featured-item featured-wide">
              <EventImage name="beach-skyline.jpg" alt="Luxury brand launch on The Palm with Dubai skyline" className="img-featured" />
              <div className="featured-overlay">
                <span className="featured-cat">Corporate</span>
                <h3>Luxury Brand Launch</h3>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="featured-cta">
            <Link to="/portfolio" className="btn btn-outline">
              View All Projects <FaArrowRight />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Client Love</span>
              <h2 className="section-title light">Words That<br />Inspire Us</h2>
            </div>
          </AnimatedSection>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="testimonial-card">
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, j) => <FaStar key={j} />)}
                  </div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{t.name[0]}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="cta-content">
              <span className="section-label">Ready to Begin?</span>
              <h2 className="cta-title">Let's Create Something<br />Extraordinary Together</h2>
              <p className="cta-text">
                Whether it's an intimate dinner for 20 or a festival for 20,000,
                we're ready to bring your vision to life.
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary">
                  Start Planning <FaArrowRight />
                </Link>
                <a href="https://wa.me/971585554446" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
