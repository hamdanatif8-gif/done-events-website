import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
import EventImage from '../components/EventImage'
import './Services.css'

const services = [
  {
    id: 'beach-brunch',
    number: '01',
    title: 'Beach & Brunch',
    subtitle: 'Sun, Sand & Celebration',
    desc: 'Waterfront gatherings designed around relaxed hospitality, considered styling, dining, and live entertainment.',
    features: ['Beachfront venue curation', 'Live DJ & entertainment', 'Brunch menus', 'Décor & styling', 'VIP lounge setups'],
    image: 'Beach party setup with elegant decor',
    photo: 'beach.jpg',
  },
  {
    id: 'club-events',
    number: '02',
    title: 'Club Events',
    subtitle: 'Nightlife Refined',
    desc: 'Nightlife concepts that balance energy, atmosphere, guest flow, entertainment, and polished production.',
    features: ['Artist & DJ booking', 'Sound & lighting design', 'Brand activations', 'VIP management', 'Guest experience planning'],
    image: 'Nightclub event with colorful lighting',
    photo: 'club.jpg',
  },
  {
    id: 'corporate',
    number: '03',
    title: 'Corporate Events',
    subtitle: 'Business Meets Brilliance',
    desc: 'Brand-led business events planned with clear communication, precise coordination, and a strong guest experience.',
    features: ['Conference management', 'Product launches', 'Award ceremonies', 'Team building', 'Gala dinners'],
    image: 'Corporate gala dinner setup',
    photo: 'corporate.jpg',
  },
  {
    id: 'concerts',
    number: '04',
    title: 'Concerts & Live Shows',
    subtitle: 'Live Entertainment',
    desc: 'Live shows coordinated across artists, staging, sound, lighting, audience movement, and operational planning.',
    features: ['Artist coordination', 'Stage production', 'Show planning', 'Sound engineering', 'Security planning'],
    image: 'Concert stage with dramatic lighting',
    photo: 'concerts.jpg',
  },
  {
    id: 'catering',
    number: '05',
    title: 'Catering & Hospitality',
    subtitle: 'Considered Hospitality',
    desc: 'Dining and hospitality experiences shaped around the event format, venue, service rhythm, and guest needs.',
    features: ['Bespoke menu design', 'International cuisine', 'Mixology & beverages', 'Service staff', 'Venue catering'],
    image: 'Elegant catering display',
    photo: 'catering.jpg',
  },
  {
    id: 'weddings',
    number: '06',
    title: 'Private & Weddings',
    subtitle: 'Personal Celebrations',
    desc: 'Weddings and private celebrations planned around the people, setting, details, and moments that matter most.',
    features: ['Full wedding planning', 'Venue selection', 'Floral & décor design', 'Entertainment curation', 'Day-of coordination'],
    image: 'Luxury wedding setup',
    photo: 'weddings.jpg',
  },
  {
    id: 'production',
    number: '07',
    title: 'Production & Technical',
    subtitle: 'Technical Delivery',
    desc: 'Technical production that supports the creative idea with reliable staging, lighting, audio, video, and structures.',
    features: ['Stage & set design', 'AV engineering', 'Lighting design', 'LED & video walls', 'Rigging & structures'],
    image: 'Technical production setup',
    photo: 'production.jpg',
  },
]

export default function Services() {
  return (
    <main className="services-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <motion.div
          className="page-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Our Services</span>
          <h1 className="page-hero-title">Seven Worlds of<br />Entertainment</h1>
          <p className="page-hero-sub">
            Seven connected disciplines, shaped around the needs of each event.
          </p>
        </motion.div>
      </section>

      <section className="services-list">
        {services.map((service, index) => (
          <div key={service.id} id={service.id} className={`service-section section-padding ${index % 2 === 1 ? 'alt-bg' : ''}`}>
            <div className="container">
              <div className={`service-grid ${index % 2 === 1 ? 'reverse' : ''}`}>
                <AnimatedSection className="service-image">
                  <EventImage
                    name={service.photo}
                    alt={service.image}
                    className="service-img"
                  />
                </AnimatedSection>
                <AnimatedSection className="service-content">
                  <span className="service-number" aria-hidden="true">{service.number}</span>
                  <span className="section-label">{service.subtitle}</span>
                  <h2 className="section-title">{service.title}</h2>
                  <p className="service-desc">{service.desc}</p>
                  <ul className="service-features">
                    {service.features.map((feature) => (
                      <li key={feature}><FaCheckCircle className="check-icon" /> {feature}</li>
                    ))}
                  </ul>
                  <div className="service-actions">
                    <Link to="/contact" className="btn btn-dark">
                      Enquire Now <FaArrowRight />
                    </Link>
                    <Link to="/portfolio" className="service-work-link">View Selected Work</Link>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="services-cta section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="cta-content">
              <span className="section-label">Not Sure Where to Start?</span>
              <h2 className="cta-title">Let's Shape the Right<br />Approach Together</h2>
              <p className="cta-text">
                Share the essentials and we'll help connect the services your event needs.
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
