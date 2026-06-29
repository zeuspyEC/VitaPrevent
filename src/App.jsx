import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import SkipLink from '@components/layout/SkipLink/SkipLink'
import Navbar from '@components/layout/Navbar/Navbar'
import Footer from '@components/layout/Footer/Footer'
import Spinner from '@components/ui/Spinner/Spinner'
import { ROUTES } from '@config/routes'

const Home          = lazy(() => import('@pages/Home/Home'))
const Nutricion     = lazy(() => import('@pages/Nutricion/Nutricion'))
const ActividadFisica = lazy(() => import('@pages/ActividadFisica/ActividadFisica'))
const SaludMental   = lazy(() => import('@pages/SaludMental/SaludMental'))
const Prevencion    = lazy(() => import('@pages/Prevencion/Prevencion'))
const Biblioteca    = lazy(() => import('@pages/Biblioteca/Biblioteca'))
const Noticias      = lazy(() => import('@pages/Noticias/Noticias'))
const Contacto      = lazy(() => import('@pages/Contacto/Contacto'))
const Nosotros      = lazy(() => import('@pages/Nosotros/Nosotros'))
const NotFound      = lazy(() => import('@pages/NotFound/NotFound'))

function PageLoader() {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}
      role="status"
      aria-label="Cargando página…"
    >
      <Spinner size="lg" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path={ROUTES.HOME}             element={<Home />} />
          <Route path={ROUTES.NUTRICION}        element={<Nutricion />} />
          <Route path="/nutricion/:slug"        element={<Nutricion />} />
          <Route path={ROUTES.ACTIVIDAD_FISICA} element={<ActividadFisica />} />
          <Route path="/actividad-fisica/:slug" element={<ActividadFisica />} />
          <Route path={ROUTES.SALUD_MENTAL}     element={<SaludMental />} />
          <Route path="/salud-mental/:slug"     element={<SaludMental />} />
          <Route path={ROUTES.PREVENCION}       element={<Prevencion />} />
          <Route path="/prevencion/:slug"       element={<Prevencion />} />
          <Route path={ROUTES.BIBLIOTECA}       element={<Biblioteca />} />
          <Route path={ROUTES.NOTICIAS}         element={<Noticias />} />
          <Route path="/noticias/:id"           element={<Noticias />} />
          <Route path={ROUTES.CONTACTO}         element={<Contacto />} />
          <Route path={ROUTES.NOSOTROS}         element={<Nosotros />} />
          <Route path="*"                       element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}
