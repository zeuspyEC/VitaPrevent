import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
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

  const imgUrl = typeof noticia.imagen === 'string' ? noticia.imagen : noticia.imagen?.url
  const imgAlt = typeof noticia.imagen === 'string' ? noticia.titulo : (noticia.imagen?.alt || noticia.titulo)

  return (
    <PageWrapper title={noticia.titulo} description={noticia.resumen}>
      <div className="noticias-detalle container">
        <Breadcrumb />

        <article className="noticia-articulo" aria-labelledby="noticia-titulo">
          {imgUrl && (
            <div className="noticia-articulo__hero">
              <img
                src={imgUrl}
                alt={imgAlt}
                className="noticia-articulo__img"
                loading="eager"
                width={1200}
                height={525}
              />
            </div>
          )}

          <header className="noticia-articulo__header">
            <div className="noticia-articulo__meta">
              {noticia.categoria && <Badge variant="primary">{noticia.categoria}</Badge>}
              {fechaStr && (
                <time dateTime={fechaISO} className="noticia-articulo__fecha">
                  <span className="sr-only">Publicado el </span>{fechaStr}
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
            <div className="prose noticia-articulo__body">
              <ReactMarkdown>{noticia.contenido}</ReactMarkdown>
            </div>
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
