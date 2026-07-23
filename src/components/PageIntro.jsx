import './PageIntro.css'

export default function PageIntro({ label, title, description, variant = 'default', aside }) {
  return (
    <section className={`page-intro page-intro--${variant}`}>
      <div className="container page-intro__grid">
        <div className="page-intro__copy">
          <span className="eyebrow">{label}</span>
          <h1 tabIndex="-1">{title}</h1>
          <p>{description}</p>
        </div>
        {aside && <div className="page-intro__aside">{aside}</div>}
      </div>
    </section>
  )
}
