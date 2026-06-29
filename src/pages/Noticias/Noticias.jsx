import { useState, useCallback } from 'react'
import PageWrapper from '@components/layout/PageWrapper/PageWrapper'
import Breadcrumb from '@components/layout/Breadcrumb/Breadcrumb'
import SectionHero from '@components/common/SectionHero/SectionHero'
import NewsCard from '@components/common/NewsCard/NewsCard'
import Spinner from '@components/ui/Spinner/Spinner'
import Button from '@components/ui/Button/Button'
import { useAsync } from '@hooks/useAsync'
import { getNoticias } from '@services/noticias.service'
import './Noticias.css'

const PAGE_SIZE = 9

export default function Noticias() {
  const [cursor, setCursor] = useState(null)
  const [acumuladas, setAcumuladas] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const fetchPage = useCallback(
    () =>
      getNoticias(cursor, PAGE_SIZE).then(({ docs, lastDoc, hasMore: more }) => {
        setAcumuladas((prev) => (cursor ? [...prev, ...docs] : docs))
        setCursor(lastDoc)
        setHasMore(more)
        return docs
      }),
    [cursor],
  )

  const { loading, error } = useAsync(fetchPage, true)

  const cargarMas = () => {
    if (!loading && hasMore) fetchPage()
  }

  const [primero, ...resto] = acumuladas

  return (
    <PageWrapper title="Noticias de Salud" description="Últimas noticias, investigaciones y actualizaciones sobre salud preventiva y bienestar.">
      <SectionHero
        tag="Actualidad en salud"
        title="Noticias de salud"
        description="Mantente informado con las últimas investigaciones, recomendaciones oficiales y novedades en salud preventiva y bienestar."
        icon="📰"
        gradient="blue"
      />

      <div className="noticias-page container">
        <Breadcrumb />

        {error && (
          <div role="alert" className="noticias-error">
            No pudimos cargar las noticias. Por favor, recarga la página.
          </div>
        )}

        {loading && acumuladas.length === 0 ? (
          <div className="noticias-loading"><Spinner size="lg" label="Cargando noticias…" /></div>
        ) : acumuladas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">📰</div>
            <h2>Próximamente</h2>
            <p>Estamos preparando las primeras noticias. ¡Vuelve pronto!</p>
          </div>
        ) : (
          <section aria-labelledby="noticias-title">
            <h2 id="noticias-title" className="sr-only">Listado de noticias</h2>

            <div className="noticias-grid">
              {/* Noticia destacada */}
              {primero && <NewsCard noticia={primero} featured />}

              {/* Resto */}
              {resto.map((n) => <NewsCard key={n.id} noticia={n} />)}
            </div>

            {hasMore && (
              <div className="noticias-load-more">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={cargarMas}
                  loading={loading}
                  aria-label="Cargar más noticias"
                >
                  {loading ? 'Cargando…' : 'Cargar más noticias'}
                </Button>
              </div>
            )}

            {!hasMore && acumuladas.length > 0 && (
              <p className="noticias-end" role="status">Has visto todas las noticias disponibles.</p>
            )}
          </section>
        )}
      </div>
    </PageWrapper>
  )
}
