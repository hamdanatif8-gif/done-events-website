import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import AnimatedSection from '../components/AnimatedSection'
import EventImage from '../components/EventImage'
import './Services.css'

const services = [
  {
    id: 'beach-brunch',
    title: 'Beach & Brunch',
    subtitle: 'Sun, Sand & Celebration',
    desc: 'Transform any waterfront venue into a paradise of leisure and luxury. Our beach and brunch events combine gourmet dining, live entertainment, and the perfect ambiance for unforgettable daytime celebrations.',
    features: ['Beachfront venue curation', 'Live DJ & entertainment', 'Gourmet brunch menus', 'Décor & styling', 'VIP lounge setups'],
    image: 'Beach party setup with elegant decor',
    photo: 'beach.jpg',
    accent: '#e8d5b7',
  },
  {
    id: 'club-events',
    title: 'Club Events',
    subtitle: 'Nightlife Redefined',
    desc: 'From exclusive launch parties to weekly nightlife concepts, we create electric atmospheres that keep Dubai talking. Our club events are where energy meets elegance.',
    features: ['Artist & DJ booking', 'Sound & lighting design', 'Brand activations', 'VIP management', 'Marketing & promotion'],
    image: 'Nightclub event with colorful lighting',
    photo: 'club.jpg',
    accent: '#d4c5e8',
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    subtitle: 'Business Meets Brilliance',
    desc: 'Elevate your corporate presence with events that command respect and inspire action. From intimate board dinners to large-scale conferences, every detail reflects your brand\'s excellence.',
    features: ['Conference management', 'Product launches', 'Award ceremonies', 'Team building', 'Gala dinners'],
    image: 'Corporate gala dinner setup',
    photo: 'corporate.jpg',
    accent: '#c5d8e8',
  },
  {
    id: 'concerts',
    title: 'Concerts & Live Shows',
    subtitle: 'World-Class Entertainment',
    desc: 'Bringing the world\'s biggest names to Dubai\'s most iconic stages. Our concert production expertise ensures every note resonates and every moment captivates.',
    features: ['Artist management', 'Stage production', 'Ticketing solutions', 'Sound engineering', 'Security planning'],
    image: 'Concert stage with dramatic lighting',
    photo: 'concerts.jpg',
    accent: '#e8c5c5',
  },
  {
    id: 'catering',
    title: 'Catering & Hospitality',
    subtitle: 'Culinary Excellence',
    desc: 'Every great event deserves exceptional cuisine. Our catering and hospitality division delivers world-class dining experiences that tantalize every palate.',
    features: ['Bespoke menu design', 'International cuisine', 'Mixology & beverages', 'Service staff', 'Venue catering'],
    image: 'Elegant catering display',
    photo: 'catering.jpg',
    accent: '#c5e8d4',
  },
  {
    id: 'weddings',
    title: 'Private & Weddings',
    subtitle: 'Dreams Made Real',
    desc: 'Your most important celebration deserves nothing less than perfection. We craft bespoke wedding experiences and private celebrations that tell your unique love story.',
    features: ['Full wedding planning', 'Venue selection', 'Floral & décor design', 'Entertainment curation', 'Day-of coordination'],
    image: 'Luxury wedding setup',
    photo: 'weddings.jpg',
    accent: '#f0e0d0',
  },
  {
    id: 'production',
    title: 'Production & Technical',
    subtitle: 'Behind the Magic',
    desc: 'State-of-the-art technical production that brings any vision to life. From intimate setups to arena-scale productions, our technical team delivers flawless execution.',
    features: ['Stage & set design', 'AV engineering', 'Lighting design', 'LED & video walls', 'Rigging & structures'],
    image: 'Technical production setup',
    photo: 'production.jpg',
    accent: '#d8d4e8',
  },
]

export default function Services() {
  return (
    <main className="services-page">
      {/* Hero */}
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
            Each world represents a unique facet of our expertise, perfected
            over 1500+ events and 15+ years of excellence.
          </p>
        </motion.div>
      </section>

      {/* Services List */}
      <section className="services-list">
        {services.map((service, i) => (
          <div key={service.id} id={service.id} className={`service-section section-padding ${i % 2 === 1 ? 'alt-bg' : ''}`}>
            <div className="container">
              <div className={`service-grid ${i % 2 === 1 ? 'reverse' : ''}`}>
                <AnimatedSection direction={i % 2 === 0 ? 'left' : 'right'} className="service-image">
                  <EventImage
                    name={service.photo}
                    alt={service.image}
                    className="service-img"
                    style={{ '--accent': service.accent }}
                  />
                </AnimatedSection>
                <AnimatedSection direction={i % 2 === 0 ? 'right' : 'left'} className="service-content">
                  <span className="section-label">{service.subtitle}</span>
                  <h2 className="section-title">{service.title}</h2>
                  <p className="service-desc">{service.desc}</p>
                  <ul className="service-features">
                    {service.features.map(f => (
                      <li key={f}><FaCheckCircle className="check-icon" /> {f}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn btn-dark">
                    Enquire Now <FaArrowRight />
                  </Link>
                </AnimatedSection>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="services-cta section-padding">
        <div className="container">
          <AnimatedSection>
            <div className="cta-content">
              <span className="section-label">Can't Decide?</span>
              <h2 className="cta-title">We'll Help You Find<br />Your Perfect Event</h2>
              <p className="cta-text">
                Tell us your vision and we'll craft a bespoke package that combines
                elements from all our event worlds.
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
