import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import Breadcrumb from '@components/layout/Breadcrumb/Breadcrumb'
import Badge from '@components/ui/Badge/Badge'
import PageWrapper from '@components/layout/PageWrapper/PageWrapper'
import './ArticleDetail.css'

export default function ArticleDetail({ articulo, volverRuta, volverLabel }) {
  const fecha = articulo.actualizadoEn?.toDate?.() ?? articulo.creadoEn?.toDate?.()
  const fechaStr = fecha?.toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <PageWrapper title={articulo.titulo} description={articulo.resumen}>
      <div className="article-detail container">
        <Breadcrumb />

        <article aria-labelledby="articulo-titulo">
          {articulo.imagen?.url && (
            <div className="article-detail__hero" role="img" aria-label={articulo.imagen.alt || articulo.titulo}>
              <img
                src={articulo.imagen.url}
                alt={articulo.imagen.alt || ''}
                className="article-detail__hero-img"
                loading="eager"
                width={1200}
                height={500}
              />
            </div>
          )}

          <header className="article-detail__header">
            <div className="article-detail__meta">
              {articulo.modulo && (
                <Badge variant="primary" size="sm">{articulo.modulo.replace('-', ' ')}</Badge>
              )}
              {articulo.categoria && (
                <Badge variant="info" size="sm">{articulo.categoria}</Badge>
              )}
              {fechaStr && (
                <time dateTime={fecha.toISOString()} className="article-detail__fecha">
                  Actualizado: {fechaStr}
                </time>
              )}
            </div>

            <h1 id="articulo-titulo" className="article-detail__titulo">
              {articulo.titulo}
            </h1>

            {articulo.resumen && (
              <p className="article-detail__resumen">{articulo.resumen}</p>
            )}
          </header>

          <div className="prose article-detail__body">
            <ReactMarkdown>{articulo.contenido || ''}</ReactMarkdown>
          </div>

          {articulo.fuentes && (
            <aside className="article-detail__fuentes" aria-label="Fuentes y referencias del artículo">
              <h2 className="article-detail__fuentes-title">Fuentes y referencias</h2>
              <p className="article-detail__fuentes-text">{articulo.fuentes}</p>
            </aside>
          )}

          <footer className="article-detail__footer">
            <Link to={volverRuta} className="article-detail__volver">
              ← {volverLabel}
            </Link>
          </footer>
        </article>
      </div>
    </PageWrapper>
  )
}

ArticleDetail.propTypes = {
  articulo: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    resumen: PropTypes.string,
    contenido: PropTypes.string,
    imagen: PropTypes.shape({ url: PropTypes.string, alt: PropTypes.string }),
    fuentes: PropTypes.string,
    modulo: PropTypes.string,
    categoria: PropTypes.string,
    actualizadoEn: PropTypes.object,
    creadoEn: PropTypes.object,
  }).isRequired,
  volverRuta: PropTypes.string.isRequired,
  volverLabel: PropTypes.string.isRequired,
}
