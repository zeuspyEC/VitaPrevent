import { useState, useEffect } from 'react'
import PageWrapper from '@components/layout/PageWrapper/PageWrapper'
import Breadcrumb from '@components/layout/Breadcrumb/Breadcrumb'
import SectionHero from '@components/common/SectionHero/SectionHero'
import ResourceCard from '@components/common/ResourceCard/ResourceCard'
import SearchBar from '@components/common/SearchBar/SearchBar'
import Spinner from '@components/ui/Spinner/Spinner'
import { getRecursos } from '@services/recursos.service'
import './Biblioteca.css'

const TIPOS = [
  { id: 'todos', label: 'Todos', icon: '📚' },
  { id: 'video', label: 'Videos', icon: '▶️' },
  { id: 'podcast', label: 'Podcasts', icon: '🎧' },
  { id: 'pdf', label: 'PDFs', icon: '📄' },
  { id: 'infografia', label: 'Infografías', icon: '📊' },
  { id: 'guia', label: 'Guías', icon: '📖' },
]

const MODULOS = [
  { id: 'todos', label: 'Todos los módulos' },
  { id: 'nutricion', label: 'Nutrición' },
  { id: 'actividad-fisica', label: 'Actividad Física' },
  { id: 'salud-mental', label: 'Salud Mental' },
  { id: 'prevencion', label: 'Prevención' },
]

export default function Biblioteca() {
  const [recursos, setRecursos] = useState([])
  const [tipoActivo, setTipoActivo] = useState('todos')
  const [moduloActivo, setModuloActivo] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const tipo = tipoActivo === 'todos' ? null : tipoActivo
    const modulo = moduloActivo === 'todos' ? null : moduloActivo
    getRecursos(tipo, modulo).then(setRecursos).finally(() => setLoading(false))
  }, [tipoActivo, moduloActivo])

  const recursosFiltrados = busqueda.trim()
    ? recursos.filter((r) => r.titulo?.toLowerCase().includes(busqueda.toLowerCase()) || r.descripcion?.toLowerCase().includes(busqueda.toLowerCase()))
    : recursos

  return (
    <PageWrapper title="Biblioteca" description="Videos educativos, podcasts, PDFs, infografías y guías de salud preventiva clasificadas por tema y tipo.">
      <SectionHero
        tag="Recursos educativos"
        title="Biblioteca de salud"
        description="Accede a videos, podcasts, guías descargables e infografías elaboradas por profesionales de la salud sobre todos los temas que cubre VitaPrevent."
        icon="📚"
        gradient="blue"
      />

      <div className="biblioteca-page container">
        <Breadcrumb />

        <div className="biblioteca-toolbar">
          <SearchBar
            onSearch={setBusqueda}
            placeholder="Buscar en la biblioteca…"
            label="Buscar recursos en la biblioteca"
          />

          <div className="biblioteca-tipo-tabs" role="tablist" aria-label="Filtrar por tipo de recurso">
            {TIPOS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tipoActivo === t.id}
                onClick={() => setTipoActivo(t.id)}
                className={`tipo-tab ${tipoActivo === t.id ? 'tipo-tab--active' : ''}`}
              >
                <span aria-hidden="true">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          <div className="biblioteca-modulo-filters" role="group" aria-label="Filtrar por módulo">
            {MODULOS.map((m) => (
              <button
                key={m.id}
                onClick={() => setModuloActivo(m.id)}
                className={`filter-btn ${moduloActivo === m.id ? 'filter-btn--active' : ''}`}
                aria-pressed={moduloActivo === m.id}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <section aria-labelledby="recursos-title" aria-live="polite" aria-busy={loading}>
          <h2 id="recursos-title" className="sr-only">Recursos encontrados</h2>

          {loading ? (
            <div className="biblioteca-loading"><Spinner size="lg" label="Cargando recursos de la biblioteca…" /></div>
          ) : recursosFiltrados.length > 0 ? (
            <>
              <p className="biblioteca-count" aria-live="polite">
                {recursosFiltrados.length} {recursosFiltrados.length === 1 ? 'recurso encontrado' : 'recursos encontrados'}
                {busqueda && ` para "${busqueda}"`}
              </p>
              <div className="biblioteca-grid">
                {recursosFiltrados.map((r) => <ResourceCard key={r.id} recurso={r} />)}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-state__icon">📚</div>
              <h3>{busqueda ? 'Sin resultados' : 'Próximamente'}</h3>
              <p>
                {busqueda
                  ? `No encontramos recursos para "${busqueda}". Intenta con otros términos.`
                  : 'Estamos preparando los recursos de la biblioteca. ¡Vuelve pronto!'}
              </p>
            </div>
          )}
        </section>
      </div>
    </PageWrapper>
  )
}
