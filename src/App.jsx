import { lazy, Suspense, useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { routeMeta } from './content/siteContent'

const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

function RouteManager() {
  const { pathname, hash } = useLocation()
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')

  useEffect(() => {
    const meta = routeMeta[normalizedPath] || {
      title: 'Page Not Found | DONE Events & Entertainment',
      description: 'The requested page could not be found.',
    }

    document.title = meta.title
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', meta.description)

    let frame
    let attempts = 0

    const finishRouteChange = () => {
      const heading = document.querySelector('main h1')
      const target = hash ? document.getElementById(hash.slice(1)) : null
      const routeIsReady = heading && (!hash || target)

      if (!routeIsReady && attempts < 60) {
        attempts += 1
        frame = window.requestAnimationFrame(finishRouteChange)
        return
      }

      if (target) {
        target.scrollIntoView({ block: 'start' })
        target.tabIndex = -1
        target.focus({ preventScroll: true })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        heading?.focus({ preventScroll: true })
      }
    }

    frame = window.requestAnimationFrame(finishRouteChange)
    return () => window.cancelAnimationFrame(frame)
  }, [normalizedPath, hash])

  return null
}

function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <span className="eyebrow">404</span>
      <h1 tabIndex="-1">This page is not part of the plan.</h1>
      <p>Return to DONE Events or start a new brief with the Dubai team.</p>
      <Link to="/" className="button button--light">Back to DONE</Link>
    </main>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <RouteManager />
      <Navbar />
      <Suspense fallback={<div className="route-loader" aria-hidden="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
