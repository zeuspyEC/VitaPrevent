import { Link } from 'react-router-dom'
import PageWrapper from '@components/layout/PageWrapper/PageWrapper'
import { ROUTES } from '@config/routes'
import './NotFound.css'

export default function NotFound() {
  return (
    <PageWrapper title="Página no encontrada">
      <div className="not-found container">
        <div className="not-found__content">
          <span className="not-found__code" aria-hidden="true">404</span>
          <h1 className="not-found__title">Página no encontrada</h1>
          <p className="not-found__desc">
            Lo sentimos, la página que buscas no existe o fue movida.
            Puedes volver al inicio o explorar nuestros contenidos de salud.
          </p>
          <div className="not-found__actions">
            <Link to={ROUTES.HOME} className="btn btn--primary btn--lg">
              Volver al inicio
            </Link>
            <Link to={ROUTES.NUTRICION} className="btn btn--outline btn--lg">
              Servicios de salud
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
