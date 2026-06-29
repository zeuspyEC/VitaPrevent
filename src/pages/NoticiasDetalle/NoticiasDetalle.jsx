import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import PageWrapper from '@components/layout/PageWrapper/PageWrapper'
import Breadcrumb from '@components/layout/Breadcrumb/Breadcrumb'
import Badge from '@components/ui/Badge/Badge'
import Spinner from '@components/ui/Spinner/Spinner'
import { getNoticiaById } from '@services/noticias.service'
import './NoticiasDetalle.css'

export default function NoticiasDetalle() {
  const { id } = useParams()
  const [noticia, setNoticia] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    getNoticiaById(id)
      .then((data) => {
        if (!data || !data.publicado) { setNotFound(true); return }
        setNoticia(data)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <PageWrapper title="Cargando noticia…">
        <div className="noticias-detalle-loading"><Spinner size="lg" label="Cargando noticia…" /></div>
      </PageWrapper>
    )
  }

  if (notFound) return <Navigate to="/noticias" replace />

  const fecha = noticia.creadoEn?.toDate?.()
  const fechaStr = fecha?.toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })
  const fechaISO = fecha?.toISOString()

  return (
    <PageWrapper title={noticia.titulo} description={noticia.resumen}>
      <div className="noticias-detalle container">
        <Breadcrumb />

        <article className="noticia-articulo" aria-labelledby="noticia-titulo">
          {noticia.imagen?.url && (
            <div className="noticia-articulo__hero">
              <img
                src={noticia.imagen.url}
                alt={noticia.imagen.alt || ''}
                className="noticia-articulo__img"
                loading="eager"
              />
            </div>
          )}

          <header className="noticia-articulo__header">
            <div className="noticia-articulo__meta">
              {noticia.categoria && <Badge variant="primary">{noticia.categoria}</Badge>}
              {fechaStr && (
                <time dateTime={fechaISO} className="noticia-articulo__fecha">
                  {fechaStr}
                </time>
              )}
            </div>

            <h1 id="noticia-titulo" className="noticia-articulo__titulo">
              {noticia.titulo}
            </h1>

            {noticia.resumen && (
              <p className="noticia-articulo__resumen">{noticia.resumen}</p>
            )}
          </header>

          {noticia.contenido && (
            <div
              className="prose noticia-articulo__body"
              dangerouslySetInnerHTML={{ __html: noticia.contenido }}
            />
          )}

          <footer className="noticia-articulo__footer">
            <Link to="/noticias" className="noticia-volver">
              ← Volver a noticias
            </Link>
          </footer>
        </article>
      </div>
    </PageWrapper>
  )
}
