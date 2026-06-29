import PageWrapper from '@components/layout/PageWrapper/PageWrapper'
import Breadcrumb from '@components/layout/Breadcrumb/Breadcrumb'
import SectionHero from '@components/common/SectionHero/SectionHero'
import './Nosotros.css'

const EQUIPO = [
  {
    nombre: 'Erick Costa',
    rol: 'Líder de proyecto & Desarrollador Full-Stack',
    descripcion: 'Responsable de la arquitectura de la plataforma, la integración con Firebase y la coordinación del equipo de desarrollo.',
    iniciales: 'EC',
    color: 'blue',
    especialidades: ['React 19', 'Firebase', 'Accesibilidad Web', 'CI/CD'],
  },
  {
    nombre: 'Jonathan Tipán',
    rol: 'Desarrollador Front-End & Diseño UX/UI',
    descripcion: 'A cargo del sistema de diseño, la paleta de colores Ocean Breeze, la experiencia de usuario y los componentes accesibles.',
    iniciales: 'JT',
    color: 'teal',
    especialidades: ['CSS Avanzado', 'WCAG 2.2', 'Design Tokens', 'UX Research'],
  },
  {
    nombre: 'Javier Quilumba',
    rol: 'Desarrollador Back-End & Gestión de Datos',
    descripcion: 'Encargado de los servicios de Firestore, el panel de administración, la seguridad de datos y el modelo de información.',
    iniciales: 'JQ',
    color: 'purple',
    especialidades: ['Firestore', 'Firebase Auth', 'Seguridad', 'Datos en salud'],
  },
]

const VALORES = [
  { icon: '🔬', title: 'Rigor científico', desc: 'Todo el contenido de VitaPrevent está basado en evidencia clínica y guías de organizaciones como la OMS, CDC y el MSP Ecuador.' },
  { icon: '♿', title: 'Accesibilidad universal', desc: 'Cumplimos con WCAG 2.2 Nivel AA para garantizar que cualquier persona, independientemente de sus capacidades, pueda acceder a información de salud.' },
  { icon: '🔒', title: 'Privacidad y ética', desc: 'Respetamos la privacidad de los usuarios. No vendemos datos ni generamos perfiles publicitarios. La salud es un derecho, no un producto.' },
  { icon: '💡', title: 'Innovación tecnológica', desc: 'Usamos tecnologías modernas (React, Firebase, PWA) para ofrecer una experiencia rápida, confiable y disponible en cualquier dispositivo.' },
]

export default function Nosotros() {
  return (
    <PageWrapper title="Nosotros" description="Conoce al equipo detrás de VitaPrevent, nuestra misión, valores y el compromiso con la salud preventiva en Ecuador.">
      <SectionHero
        tag="El equipo"
        title="Quiénes somos"
        description="Somos un equipo de la Escuela Politécnica Nacional comprometido con democratizar el acceso a información de salud preventiva confiable y accesible para todos."
        icon="👥"
        gradient="blue"
      />

      <div className="nosotros-page container">
        <Breadcrumb />

        {/* Misión y visión */}
        <section className="mision-section" aria-labelledby="mision-title">
          <div className="mision-card mision-card--primary">
            <span className="mision-card__badge">Misión</span>
            <h2 id="mision-title" className="mision-card__title">Nuestra misión</h2>
            <p>Proporcionar a la ciudadanía ecuatoriana información de salud preventiva basada en evidencia científica, presentada de manera accesible, comprensible y culturalmente pertinente, para empoderar a las personas en el cuidado de su bienestar y el de sus familias.</p>
          </div>
          <div className="mision-card">
            <span className="mision-card__badge">Visión</span>
            <h2 className="mision-card__title">Nuestra visión</h2>
            <p>Ser la plataforma de referencia en salud preventiva del Ecuador, reconocida por su rigor científico, accesibilidad universal y compromiso con la equidad en salud.</p>
          </div>
        </section>

        {/* Equipo */}
        <section aria-labelledby="equipo-title" className="equipo-section">
          <h2 id="equipo-title" className="nosotros-section-title">El equipo de desarrollo</h2>
          <p className="equipo-intro">VitaPrevent es un proyecto académico desarrollado en la Escuela Politécnica Nacional (EPN) de Quito, Ecuador.</p>

          <ul className="equipo-grid" role="list">
            {EQUIPO.map((m) => (
              <li key={m.nombre} className="team-card">
                <div className={`team-card__avatar team-card__avatar--${m.color}`} aria-hidden="true">
                  {m.iniciales}
                </div>
                <div className="team-card__body">
                  <h3 className="team-card__name">{m.nombre}</h3>
                  <span className="team-card__rol">{m.rol}</span>
                  <p className="team-card__desc">{m.descripcion}</p>
                  <ul className="team-card__tags" role="list" aria-label={`Especialidades de ${m.nombre}`}>
                    {m.especialidades.map((e) => (
                      <li key={e} className="team-tag">{e}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Valores */}
        <section aria-labelledby="valores-title" className="valores-section">
          <h2 id="valores-title" className="nosotros-section-title">Nuestros valores</h2>
          <ul className="valores-grid" role="list">
            {VALORES.map((v) => (
              <li key={v.title} className="valor-card">
                <span className="valor-card__icon" aria-hidden="true">{v.icon}</span>
                <h3 className="valor-card__title">{v.title}</h3>
                <p className="valor-card__desc">{v.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Tecnología */}
        <section aria-labelledby="tech-title" className="tech-section">
          <h2 id="tech-title" className="nosotros-section-title">Tecnología utilizada</h2>
          <div className="tech-grid">
            {[
              { name: 'React 19', desc: 'Interfaz de usuario moderna' },
              { name: 'Vite 6', desc: 'Bundler de alto rendimiento' },
              { name: 'Firebase', desc: 'Base de datos y autenticación' },
              { name: 'WCAG 2.2 AA', desc: 'Accesibilidad garantizada' },
              { name: 'GitHub Actions', desc: 'Integración y despliegue continuo' },
              { name: 'CSS Custom Properties', desc: 'Sistema de diseño escalable' },
            ].map((t) => (
              <div key={t.name} className="tech-chip">
                <strong>{t.name}</strong>
                <span>{t.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  )
}
