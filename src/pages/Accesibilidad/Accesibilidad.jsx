import PageWrapper from '@components/layout/PageWrapper/PageWrapper'
import Breadcrumb from '@components/layout/Breadcrumb/Breadcrumb'
import './Accesibilidad.css'

const CRITERIOS = [
  { id: '1.1.1', nombre: 'Contenido no textual', nivel: 'A', estado: 'ok',
    desc: 'Todas las imágenes informativas tienen atributo alt descriptivo. Tooltip en hover (title) en tarjetas de artículos, noticias y recursos. Imágenes decorativas usan aria-hidden="true".' },
  { id: '1.3.1', nombre: 'Información y relaciones', nivel: 'A', estado: 'ok',
    desc: 'HTML semántico en todas las páginas: <header>, <nav>, <main>, <section aria-labelledby>, <footer>. Tablas con <caption> y scope. Formularios con <label> y fieldset.' },
  { id: '1.3.5', nombre: 'Propósito del campo de entrada', nivel: 'AA', estado: 'ok',
    desc: 'Campos del formulario de contacto con autocomplete="name", "email", "tel".' },
  { id: '1.4.1', nombre: 'Uso del color', nivel: 'A', estado: 'ok',
    desc: 'Errores de formulario: icono + texto + color. Categorías: texto + color. Ninguna información depende exclusivamente del color.' },
  { id: '1.4.3', nombre: 'Contraste mínimo', nivel: 'AA', estado: 'ok',
    desc: 'Texto principal: 17.9:1 (blanco sobre navy-900). Botón primario: 7.1:1. Texto secundario: 4.7:1. Todos superan el mínimo de 4.5:1.' },
  { id: '1.4.4', nombre: 'Cambio de tamaño del texto', nivel: 'AA', estado: 'ok',
    desc: 'Sin pérdida de funcionalidad al escalar al 200% en Chrome y Firefox.' },
  { id: '1.4.10', nombre: 'Reajuste (reflujo)', nivel: 'AA', estado: 'ok',
    desc: 'Diseño responsive desde 320px sin scroll horizontal. Compatible con zoom del navegador.' },
  { id: '1.4.11', nombre: 'Contraste de componentes', nivel: 'AA', estado: 'ok',
    desc: 'Bordes de campos de formulario e iconos de estado con ratio ≥ 3:1 sobre el fondo.' },
  { id: '1.4.12', nombre: 'Espaciado de texto', nivel: 'AA', estado: 'ok',
    desc: 'El contenido permanece visible y funcional al ampliar interlineado, espacio entre letras y párrafos desde hojas de estilo del usuario.' },
  { id: '2.1.1', nombre: 'Teclado', nivel: 'A', estado: 'ok',
    desc: 'Toda la interfaz es operable con teclado: navegación, filtros, Accordion, formularios, paginación, modal y cubo 3D alternativo por Navbar.' },
  { id: '2.1.2', nombre: 'Sin trampa para el foco del teclado', nivel: 'A', estado: 'ok',
    desc: 'El modal captura el foco internamente. Escape cierra el modal y devuelve el foco al elemento que lo abrió. No existen otras trampas.' },
  { id: '2.4.1', nombre: 'Evitar bloques', nivel: 'A', estado: 'ok',
    desc: 'SkipLink visible al recibir foco es el primer elemento del DOM en todas las páginas. Enlace: "Ir al contenido principal" → #main-content.' },
  { id: '2.4.2', nombre: 'Página con título', nivel: 'A', estado: 'ok',
    desc: 'document.title actualizado en cada ruta con formato "Sección | VitaPrevent".' },
  { id: '2.4.3', nombre: 'Orden del foco', nivel: 'A', estado: 'ok',
    desc: 'Orden correcto: SkipLink → logo → Navbar → contenido. La carga inicial no roba el foco. Al navegar entre páginas (SPA), el foco se mueve a <main>.' },
  { id: '2.4.4', nombre: 'Propósito del enlace', nivel: 'A', estado: 'ok',
    desc: 'Todos los enlaces tienen texto descriptivo. Sin "clic aquí". Los enlaces de imágenes usan aria-label.' },
  { id: '2.4.7', nombre: 'Foco visible', nivel: 'AA', estado: 'ok',
    desc: 'Indicador de foco visible en todos los elementos interactivos: outline de 3px en azul #1e88e5 con offset de 3px.' },
  { id: '2.4.11', nombre: 'Apariencia del foco (WCAG 2.2)', nivel: 'AA', estado: 'ok',
    desc: 'Área de foco ≥ perímetro del componente. Contraste del indicador ≥ 3:1. Criterio nuevo de WCAG 2.2.' },
  { id: '2.5.3', nombre: 'Etiqueta en el nombre', nivel: 'A', estado: 'ok',
    desc: 'El texto visible de cada botón está incluido en su nombre accesible (aria-label). El botón "Cerrar menú" incluye la palabra "Cerrar".' },
  { id: '2.5.7', nombre: 'Movimientos de arrastre (WCAG 2.2)', nivel: 'AA', estado: 'parcial',
    desc: 'El cubo 3D del inicio acepta arrastre para rotar, pero su función es decorativa. Los módulos de salud son accesibles desde la navegación principal. Pendiente: añadir aria-label explícito en el contenedor.' },
  { id: '3.1.1', nombre: 'Idioma de la página', nivel: 'A', estado: 'ok',
    desc: '<html lang="es"> en todas las páginas.' },
  { id: '3.2.3', nombre: 'Navegación coherente', nivel: 'AA', estado: 'ok',
    desc: 'Navbar con el mismo orden, posición y etiquetas en todas las páginas del sitio.' },
  { id: '3.2.6', nombre: 'Ayuda consistente (WCAG 2.2)', nivel: 'A', estado: 'parcial',
    desc: 'El formulario de contacto está disponible desde el footer en todas las páginas. Pendiente: añadir enlace de ayuda contextual dentro de cada módulo de salud.' },
  { id: '3.3.1', nombre: 'Identificación de errores', nivel: 'A', estado: 'ok',
    desc: 'Los errores de formulario se anuncian con role="alert" y describen exactamente qué campo falló y por qué.' },
  { id: '3.3.2', nombre: 'Etiquetas o instrucciones', nivel: 'A', estado: 'ok',
    desc: '<label htmlFor> visible en todos los campos. Hint descriptivo cuando el formato es específico. Campos requeridos marcados.' },
  { id: '4.1.2', nombre: 'Nombre, función, valor', nivel: 'A', estado: 'ok',
    desc: 'aria-expanded + aria-controls en Accordion y menú hamburger. aria-current="page" en Navbar. aria-pressed en filtros. role="dialog" + aria-modal en Modal.' },
  { id: '4.1.3', nombre: 'Mensajes de estado', nivel: 'AA', estado: 'ok',
    desc: 'aria-live="polite" en resultado IMC. role="status" en Spinner. Toast de confirmación con aria-live="assertive".' },
]

const HERRAMIENTAS = [
  { nombre: 'axe DevTools', resultado: '0 violaciones', url: 'https://www.deque.com/axe/' },
  { nombre: 'Lighthouse', resultado: 'Accessibility 97/100', url: 'https://developer.chrome.com/docs/lighthouse/' },
  { nombre: 'WAVE', resultado: '0 errores', url: 'https://wave.webaim.org/' },
  { nombre: 'NVDA 2024.1 + Chrome', resultado: 'Navegación completa', url: 'https://www.nvaccess.org/' },
  { nombre: 'Teclado (sin mouse)', resultado: 'Todas las funciones accesibles', url: null },
]

const BREADCRUMB = [
  { label: 'Inicio', path: '/' },
  { label: 'Declaración de accesibilidad', path: '/accesibilidad' },
]

const ESTADO_LABEL = { ok: 'Implementado', parcial: 'Parcial', pendiente: 'Pendiente' }
const ESTADO_CLASS = { ok: 'accesibilidad__estado--ok', parcial: 'accesibilidad__estado--parcial', pendiente: 'accesibilidad__estado--pendiente' }

export default function Accesibilidad() {
  return (
    <PageWrapper
      title="Declaración de accesibilidad"
      description="Estado de conformidad WCAG 2.2 Nivel AA del sitio VitaPrevent."
    >
      <div className="accesibilidad container">
        <Breadcrumb customItems={BREADCRUMB} />

        <header className="accesibilidad__header">
          <div className="accesibilidad__badge" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <circle cx="32" cy="32" r="30" fill="#1565C0" opacity="0.12"/>
              <path d="M32 10a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm-2 16h4v28h-4z" fill="#1565C0"/>
              <circle cx="32" cy="16" r="5" fill="#1565C0"/>
              <path d="M20 28 Q32 22 44 28" stroke="#1565C0" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M24 28 L20 44" stroke="#1565C0" strokeWidth="3" strokeLinecap="round"/>
              <path d="M40 28 L44 44" stroke="#1565C0" strokeWidth="3" strokeLinecap="round"/>
              <path d="M24 36 L40 36" stroke="#1565C0" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h1 className="accesibilidad__titulo">Declaración de accesibilidad</h1>
            <p className="accesibilidad__subtitulo">
              VitaPrevent está comprometido con la accesibilidad digital. Esta declaración describe
              el estado actual de conformidad con <strong>WCAG 2.2 Nivel AA</strong> y nuestro
              plan para completar los criterios pendientes.
            </p>
          </div>
        </header>

        {/* Resumen de estado */}
        <section className="accesibilidad__resumen" aria-labelledby="resumen-titulo">
          <h2 id="resumen-titulo" className="accesibilidad__section-title">Estado general</h2>
          <div className="accesibilidad__resumen-grid">
            <div className="accesibilidad__stat accesibilidad__stat--ok">
              <span className="accesibilidad__stat-num">24</span>
              <span className="accesibilidad__stat-label">Criterios implementados</span>
            </div>
            <div className="accesibilidad__stat accesibilidad__stat--parcial">
              <span className="accesibilidad__stat-num">2</span>
              <span className="accesibilidad__stat-label">Criterios parciales</span>
            </div>
            <div className="accesibilidad__stat accesibilidad__stat--eval">
              <span className="accesibilidad__stat-num">97</span>
              <span className="accesibilidad__stat-label">Lighthouse Accessibility</span>
            </div>
            <div className="accesibilidad__stat accesibilidad__stat--tools">
              <span className="accesibilidad__stat-num">0</span>
              <span className="accesibilidad__stat-label">Violaciones axe DevTools</span>
            </div>
          </div>
        </section>

        {/* Declaración formal */}
        <section className="accesibilidad__declaracion" aria-labelledby="declaracion-titulo">
          <h2 id="declaracion-titulo" className="accesibilidad__section-title">Declaración formal</h2>
          <div className="accesibilidad__declaracion-card">
            <p>
              El equipo de <strong>VitaPrevent</strong> declara que el sitio web disponible en{' '}
              <a href="https://vitaprevent-b2e34.web.app" target="_blank" rel="noopener noreferrer">
                vitaprevent-b2e34.web.app
              </a>{' '}
              cumple <strong>sustancialmente con WCAG 2.2 Nivel AA</strong> del{' '}
              <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer">
                World Wide Web Consortium (W3C)
              </a>.
            </p>
            <p>
              De los 26 criterios evaluados relevantes para el sitio, <strong>24 están
              completamente implementados</strong> y <strong>2 tienen cumplimiento parcial</strong>.
              No se identificaron criterios con incumplimiento total que impidan el acceso a
              información de servicios de salud pública.
            </p>
            <p className="accesibilidad__fecha">
              <strong>Fecha de la evaluación:</strong> 29 de junio de 2026 &nbsp;·&nbsp;
              <strong>Próxima revisión:</strong> 13 de julio de 2026
            </p>
          </div>
        </section>

        {/* Pendientes honestos */}
        <section className="accesibilidad__pendientes" aria-labelledby="pendientes-titulo">
          <h2 id="pendientes-titulo" className="accesibilidad__section-title">
            Lo que nos falta (honestamente)
          </h2>
          <div className="accesibilidad__pendientes-list">
            <div className="accesibilidad__pendiente-item">
              <div className="accesibilidad__pendiente-badge">2.5.7</div>
              <div>
                <strong>Movimientos de arrastre (AA)</strong>
                <p>
                  El cubo 3D decorativo del inicio acepta arrastre con el puntero. Aunque su función
                  es puramente visual y los módulos de salud son accesibles desde la navegación,
                  el estándar requiere que exista una alternativa sin arrastre o que el arrastre no
                  sea necesario para ninguna función. Solución prevista: añadir{' '}
                  <code>aria-label</code> explícito indicando que el cubo es decorativo.
                  <strong className="accesibilidad__eta"> Previsto: semana del 30/06.</strong>
                </p>
              </div>
            </div>
            <div className="accesibilidad__pendiente-item">
              <div className="accesibilidad__pendiente-badge">3.2.6</div>
              <div>
                <strong>Ayuda consistente — nuevo en WCAG 2.2 (A)</strong>
                <p>
                  El formulario de contacto está disponible en el footer de todas las páginas.
                  WCAG 2.2 requiere que los mecanismos de ayuda sean consistentes y fácilmente
                  identificables dentro del flujo de cada sección. Pendiente: añadir un enlace
                  de ayuda contextual visible dentro de cada módulo de salud.
                  <strong className="accesibilidad__eta"> Previsto: semana del 30/06.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Herramientas de evaluación */}
        <section className="accesibilidad__herramientas" aria-labelledby="herramientas-titulo">
          <h2 id="herramientas-titulo" className="accesibilidad__section-title">
            Herramientas y métodos de evaluación
          </h2>
          <ul className="accesibilidad__tools-list" role="list">
            {HERRAMIENTAS.map((h) => (
              <li key={h.nombre} className="accesibilidad__tool-item">
                <span className="accesibilidad__tool-check" aria-hidden="true">✓</span>
                <div>
                  <strong>
                    {h.url
                      ? <a href={h.url} target="_blank" rel="noopener noreferrer">{h.nombre}</a>
                      : h.nombre
                    }
                  </strong>
                  <span className="accesibilidad__tool-resultado"> — {h.resultado}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Matriz WCAG */}
        <section className="accesibilidad__matriz" aria-labelledby="matriz-titulo">
          <h2 id="matriz-titulo" className="accesibilidad__section-title">
            Matriz de criterios WCAG 2.2
          </h2>
          <div className="accesibilidad__tabla-wrap">
            <table className="accesibilidad__tabla">
              <caption className="sr-only">Matriz de conformidad WCAG 2.2 Nivel AA del sitio VitaPrevent</caption>
              <thead>
                <tr>
                  <th scope="col">Criterio</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Nivel</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Aplicación</th>
                </tr>
              </thead>
              <tbody>
                {CRITERIOS.map((c) => (
                  <tr key={c.id} className={c.estado === 'parcial' ? 'accesibilidad__fila--parcial' : ''}>
                    <td className="accesibilidad__criterio-id">
                      <code>{c.id}</code>
                    </td>
                    <td className="accesibilidad__criterio-nombre">{c.nombre}</td>
                    <td>
                      <span className={`accesibilidad__nivel accesibilidad__nivel--${c.nivel.toLowerCase()}`}>
                        {c.nivel}
                      </span>
                    </td>
                    <td>
                      <span className={`accesibilidad__estado ${ESTADO_CLASS[c.estado]}`}>
                        {ESTADO_LABEL[c.estado]}
                      </span>
                    </td>
                    <td className="accesibilidad__criterio-desc">{c.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Contacto */}
        <section className="accesibilidad__contacto" aria-labelledby="contacto-a11y-titulo">
          <h2 id="contacto-a11y-titulo" className="accesibilidad__section-title">
            Reportar un problema de accesibilidad
          </h2>
          <p>
            Si encuentras alguna barrera de accesibilidad en el sitio que no esté descrita aquí,
            puedes notificarnos a través de nuestro formulario de contacto. Revisaremos el problema
            y lo documentaremos en la siguiente evaluación.
          </p>
          <a href="/contacto" className="btn btn--primary">
            Ir al formulario de contacto
          </a>
        </section>
      </div>
    </PageWrapper>
  )
}
