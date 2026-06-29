import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PageWrapper from '@components/layout/PageWrapper/PageWrapper'
import NewsCard from '@components/common/NewsCard/NewsCard'
import { SkeletonGrid } from '@components/common/Skeleton/Skeleton'
import { ROUTES } from '@config/routes'
import { getNoticias } from '@services/noticias.service'
import './Home.css'

function useCounter(target, duration, active) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - t) ** 3
      setVal(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, active])
  return val
}

const DASH_MODS = [
  { icon: '🥗', label: 'Nutrición', path: ROUTES.NUTRICION },
  { icon: '🏃', label: 'Actividad', path: ROUTES.ACTIVIDAD_FISICA },
  { icon: '🧠', label: 'Mental', path: ROUTES.SALUD_MENTAL },
  { icon: '🛡️', label: 'Prevención', path: ROUTES.PREVENCION },
]

function HeroDashboard({ latestNoticia }) {
  const [active, setActive] = useState(false)
  const containerRef = useRef(null)
  const cardRef = useRef(null)

  const artCount = useCounter(47, 1800, active)
  const pctCount = useCounter(100, 1400, active)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true) },
      { threshold: 0.2 }
    )
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const move = (e) => {
      const r = card.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width - 0.5) * 14
      const y = ((e.clientY - r.top) / r.height - 0.5) * -14
      card.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg)`
    }
    const leave = () => { card.style.transform = '' }
    card.addEventListener('mousemove', move)
    card.addEventListener('mouseleave', leave)
    return () => { card.removeEventListener('mousemove', move); card.removeEventListener('mouseleave', leave) }
  }, [])

  return (
    <div className="hero-dash" ref={containerRef}>
      {latestNoticia && (
        <Link to={`/noticias/${latestNoticia.id}`} className="hero-dash__badge" tabIndex="-1">
          <span className="hero-dash__badge-dot" />
          <span className="hero-dash__badge-label">Última noticia</span>
          <span className="hero-dash__badge-title">
            {latestNoticia.titulo?.slice(0, 36)}{latestNoticia.titulo?.length > 36 ? '…' : ''}
          </span>
        </Link>
      )}

      <div className="hero-dash__card" ref={cardRef}>
        <div className="hero-dash__card-header">
          <div className="hero-dash__brand">
            <span className="hero-dash__brand-icon" aria-hidden="true">+</span>
            <span className="hero-dash__brand-name">VitaPrevent</span>
          </div>
          <span className="hero-dash__live-badge">
            <span className="hero-dash__live-dot" />
            EN VIVO
          </span>
        </div>
        <p className="hero-dash__card-subtitle">Panel de bienestar · Ecuador</p>

        <div className="hero-dash__stats">
          <div className="hero-dash__stat">
            <span className="hero-dash__stat-num">{artCount}<sup>+</sup></span>
            <span className="hero-dash__stat-lbl">Artículos</span>
            <div className="hero-dash__bar">
              <div className="hero-dash__bar-fill hero-dash__bar-fill--blue" style={{ width: active ? '82%' : '0%' }} />
            </div>
          </div>
          <div className="hero-dash__stat">
            <span className="hero-dash__stat-num">4</span>
            <span className="hero-dash__stat-lbl">Módulos</span>
            <div className="hero-dash__bar">
              <div className="hero-dash__bar-fill hero-dash__bar-fill--teal" style={{ width: active ? '100%' : '0%' }} />
            </div>
          </div>
          <div className="hero-dash__stat">
            <span className="hero-dash__stat-num">{pctCount}<sup>%</sup></span>
            <span className="hero-dash__stat-lbl">Gratuito</span>
            <div className="hero-dash__bar">
              <div className="hero-dash__bar-fill hero-dash__bar-fill--green" style={{ width: active ? '100%' : '0%' }} />
            </div>
          </div>
        </div>

        <hr className="hero-dash__divider" />

        <p className="hero-dash__access-label">Acceso rápido</p>
        <div className="hero-dash__modules">
          {DASH_MODS.map((m) => (
            <Link key={m.path} to={m.path} className="hero-dash__mod" tabIndex="-1">
              <span className="hero-dash__mod-icon" aria-hidden="true">{m.icon}</span>
              <span className="hero-dash__mod-lbl">{m.label}</span>
            </Link>
          ))}
        </div>

        <Link to={ROUTES.NUTRICION} className="hero-dash__cta" tabIndex="-1">
          Explorar todo el contenido <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}

const MODULES = [
  { icon: '🥗', title: 'Nutrición', description: 'Guías alimenticias, recetas saludables y todo sobre hidratación y vitaminas.', path: ROUTES.NUTRICION, color: 'green' },
  { icon: '🏃', title: 'Actividad Física', description: 'Rutinas para todos los niveles, estiramientos y ejercicios de oficina.', path: ROUTES.ACTIVIDAD_FISICA, color: 'orange' },
  { icon: '🧠', title: 'Salud Mental', description: 'Mindfulness, manejo del estrés, sueño y bienestar emocional.', path: ROUTES.SALUD_MENTAL, color: 'purple' },
  { icon: '🛡️', title: 'Prevención', description: 'Información sobre diabetes, hipertensión, vacunación y chequeos médicos.', path: ROUTES.PREVENCION, color: 'blue' },
]

const STATS = [
  { value: '4', label: 'Módulos temáticos', desc: 'Nutrición, Actividad Física, Salud Mental y Prevención' },
  { value: 'AA', label: 'Cumple WCAG 2.2', desc: 'Accesible para todas las personas' },
  { value: '100%', label: 'Gratuito', desc: 'Sin registros ni pagos requeridos' },
  { value: '24/7', label: 'Disponible', desc: 'Acceso en cualquier dispositivo' },
]

const FEATURES = [
  { icon: '🔬', title: 'Basado en evidencia', desc: 'Contenido respaldado por guías de la OMS, CDC y el Ministerio de Salud del Ecuador.' },
  { icon: '♿', title: 'Universalmente accesible', desc: 'Diseñado bajo WCAG 2.2 Nivel AA para que nadie quede fuera por sus capacidades.' },
  { icon: '🔒', title: 'Sin publicidad ni datos', desc: 'No rastreamos a nuestros usuarios. Tu privacidad es un principio, no una política.' },
  { icon: '📱', title: 'Funciona en todo', desc: 'Optimizado para móvil, tablet y escritorio. Instalable como app desde el navegador.' },
]

export default function Home() {
  const [noticias, setNoticias] = useState([])
  const [loadingNoticias, setLoadingNoticias] = useState(true)

  useEffect(() => {
    getNoticias(null, 3)
      .then(({ docs }) => setNoticias(docs))
      .catch(() => {})
      .finally(() => setLoadingNoticias(false))
  }, [])

  return (
    <PageWrapper
      title="Inicio"
      description="Plataforma digital de salud preventiva. Nutrición, actividad física, salud mental y prevención de enfermedades."
    >
      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__content container">
          <div className="hero__text animate-fade-in-up">
            <span className="hero__tag">Plataforma de salud preventiva · Ecuador</span>
            <h1 id="hero-title" className="hero__title">
              Tu bienestar<br />
              <span className="hero__title-accent">comienza con la</span><br />
              prevención
            </h1>
            <p className="hero__description">
              Información confiable sobre salud física y mental, diseñada para
              todas las personas. Sin publicidad, sin registro, sin barreras.
            </p>
            <div className="hero__actions">
              <Link to={ROUTES.NUTRICION} className="btn btn--primary btn--lg">
                Explorar contenido
              </Link>
              <Link to={ROUTES.BIBLIOTECA} className="btn btn--outline btn--lg hero__btn-outline">
                Ver biblioteca
              </Link>
            </div>
            <div className="hero__trust">
              <span>✓ Basado en evidencia OMS</span>
              <span>✓ WCAG 2.2 AA</span>
              <span>✓ Gratuito</span>
            </div>
          </div>

          <div className="hero__visual animate-fade-in" aria-hidden="true">
            <div className="hero__orb hero__orb--1" />
            <div className="hero__orb hero__orb--2" />
            <div className="hero__orb hero__orb--3" />
            <HeroDashboard latestNoticia={noticias[0]} />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="home-stats section section--sm" aria-labelledby="stats-title">
        <div className="container">
          <h2 id="stats-title" className="sr-only">Datos de la plataforma</h2>
          <ul className="home-stats__list" role="list">
            {STATS.map((s) => (
              <li key={s.label} className="home-stats__item">
                <span className="home-stats__value">{s.value}</span>
                <span className="home-stats__label">{s.label}</span>
                <span className="home-stats__desc">{s.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Módulos ── */}
      <section className="section" aria-labelledby="modules-title">
        <div className="container">
          <header className="section__header">
            <span className="section__tag">Explora</span>
            <h2 id="modules-title" className="section__title">Áreas de salud preventiva</h2>
            <p className="section__subtitle">
              Información organizada por especialidades, accesible para toda la familia.
            </p>
          </header>
          <ul className="modules-grid" role="list">
            {MODULES.map((mod) => (
              <li key={mod.path}>
                <Link to={mod.path} className={`module-card module-card--${mod.color}`}>
                  <span className="module-card__icon" aria-hidden="true">{mod.icon}</span>
                  <h3 className="module-card__title">{mod.title}</h3>
                  <p className="module-card__desc">{mod.description}</p>
                  <span className="module-card__arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Por qué VitaPrevent ── */}
      <section className="section section--alt" aria-labelledby="features-title">
        <div className="container">
          <header className="section__header">
            <span className="section__tag">Nuestra propuesta</span>
            <h2 id="features-title" className="section__title">¿Por qué VitaPrevent?</h2>
            <p className="section__subtitle">
              Una plataforma diseñada con un propósito claro: democratizar el acceso a
              información de salud confiable para todos los ecuatorianos.
            </p>
          </header>
          <ul className="features-grid" role="list">
            {FEATURES.map((f) => (
              <li key={f.title} className="feature-card">
                <span className="feature-card__icon" aria-hidden="true">{f.icon}</span>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Últimas noticias ── */}
      <section className="section" aria-labelledby="news-home-title">
        <div className="container">
          <header className="section__header section__header--row">
            <div>
              <span className="section__tag">Actualidad</span>
              <h2 id="news-home-title" className="section__title">Últimas noticias de salud</h2>
            </div>
            <Link to={ROUTES.NOTICIAS} className="section__link">
              Ver todas las noticias →
            </Link>
          </header>

          {loadingNoticias ? (
            <SkeletonGrid count={3} />
          ) : noticias.length > 0 ? (
            <div className="cards-grid">
              {noticias.map((n) => <NewsCard key={n.id} noticia={n} />)}
            </div>
          ) : (
            <div className="home-news-empty">
              <p>Pronto publicaremos las primeras noticias de salud. ¡Mantente pendiente!</p>
              <Link to={ROUTES.CONTACTO} className="btn btn--outline">Contactar al equipo</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Biblioteca ── */}
      <section className="section section--dark" aria-labelledby="resources-title">
        <div className="container">
          <header className="section__header">
            <span className="section__tag" style={{ color: 'var(--color-blue-300)' }}>Recursos</span>
            <h2 id="resources-title" className="section__title" style={{ color: 'var(--color-white)' }}>
              Accede a nuestra biblioteca digital
            </h2>
            <p className="section__subtitle" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Infografías, videos, podcasts y guías descargables completamente gratuitos.
            </p>
          </header>
          <div className="home-cta-row">
            <Link to={ROUTES.BIBLIOTECA} className="btn btn--primary btn--lg">Ver biblioteca digital</Link>
            <Link to={ROUTES.NOTICIAS} className="btn btn--outline btn--lg home-cta-row__outline">Leer noticias de salud</Link>
          </div>
        </div>
      </section>

      {/* ── Contacto CTA ── */}
      <section className="section section--sm" aria-labelledby="contact-cta-title">
        <div className="container home-contact-cta">
          <div>
            <h2 id="contact-cta-title" className="home-contact-cta__title">¿Tienes preguntas sobre tu salud?</h2>
            <p className="home-contact-cta__desc">Nuestro equipo puede orientarte y recomendarte los recursos más adecuados.</p>
          </div>
          <Link to={ROUTES.CONTACTO} className="btn btn--primary btn--lg">Contactarnos</Link>
        </div>
      </section>
    </PageWrapper>
  )
}
