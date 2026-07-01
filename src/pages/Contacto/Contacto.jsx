import { useState, useRef, useEffect } from 'react'
import PageWrapper from '@components/layout/PageWrapper/PageWrapper'
import Breadcrumb from '@components/layout/Breadcrumb/Breadcrumb'
import FormField from '@components/common/FormField/FormField'
import Button from '@components/ui/Button/Button'
import { useToast } from '@contexts/ToastContext'
import { enviarMensaje } from '@services/mensajes.service'
import { validateContactForm } from '@utils/validators'
import './Contacto.css'

const INITIAL = { nombre: '', email: '', asunto: '', mensaje: '' }

const FIELD_LABELS = {
  nombre: 'Nombre completo',
  email: 'Correo electrónico',
  asunto: 'Asunto',
  mensaje: 'Mensaje',
}

export default function Contacto() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const toast = useToast()
  const errorSummaryRef = useRef(null)
  const successRef = useRef(null)

  // Foco al resumen de errores cuando aparece (WCAG 3.3.1)
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus()
    }
  }, [errors])

  // Foco a la confirmación de éxito (WCAG 2.4.3)
  useEffect(() => {
    if (sent) successRef.current?.focus()
  }, [sent])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateContactForm(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setSubmitting(true)
    try {
      await enviarMensaje(form)
      setSent(true)
      setForm(INITIAL)
      toast.success('Mensaje enviado correctamente. Te responderemos pronto.')
    } catch {
      toast.error('Ocurrió un error al enviar el mensaje. Por favor intenta nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const errorList = Object.entries(errors).filter(([, v]) => v)

  return (
    <PageWrapper
      title="Contacto"
      description="Contáctanos con tus dudas sobre los servicios públicos de salud en Ecuador. Te responderemos lo antes posible."
    >
      <div className="contact-page container">
        <Breadcrumb />

        <header className="contact-page__header">
          <span className="section__tag">Contáctanos</span>
          <h1 className="contact-page__title">¿En qué podemos ayudarte?</h1>
          <p className="contact-page__subtitle">
            Escríbenos tus consultas sobre los servicios públicos de salud del Ecuador y te responderemos a la brevedad.
          </p>
        </header>

        <div className="contact-page__layout">
          <div className="contact-page__form-col">
            {sent ? (
              <div
                ref={successRef}
                className="contact-success"
                role="status"
                tabIndex={-1}
              >
                <span className="contact-success__icon" aria-hidden="true">✅</span>
                <h2>¡Mensaje enviado!</h2>
                <p>Gracias por contactarnos. Te responderemos en los próximos días hábiles.</p>
                <Button variant="outline" onClick={() => setSent(false)}>
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Formulario de contacto"
                className="contact-form"
              >
                {/* Resumen único de errores — WCAG 3.3.1 */}
                {errorList.length > 0 && (
                  <div
                    ref={errorSummaryRef}
                    className="contact-form__error-summary"
                    role="alert"
                    tabIndex={-1}
                  >
                    <p>
                      <strong>
                        {errorList.length === 1
                          ? 'Se encontró 1 error. Corrígelo para continuar:'
                          : `Se encontraron ${errorList.length} errores. Corrígelos para continuar:`}
                      </strong>
                    </p>
                    <ul>
                      {errorList.map(([field, msg]) => (
                        <li key={field}>
                          <a href={`#${field}`}>{FIELD_LABELS[field]}: {msg}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="contact-form__required-note">
                  Los campos marcados con <span aria-hidden="true">*</span>
                  <span className="sr-only">asterisco</span> son obligatorios.
                </p>

                <FormField
                  id="nombre"
                  label="Nombre completo"
                  required
                  error={errors.nombre}
                  value={form.nombre}
                  onChange={handleChange}
                  autoComplete="name"
                  placeholder="Tu nombre completo"
                />

                <FormField
                  id="email"
                  label="Correo electrónico"
                  type="email"
                  required
                  error={errors.email}
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="tu@correo.com"
                />

                <FormField
                  id="asunto"
                  label="Asunto"
                  required
                  error={errors.asunto}
                  value={form.asunto}
                  onChange={handleChange}
                  placeholder="¿Sobre qué nos escribes?"
                />

                <FormField
                  id="mensaje"
                  label="Mensaje"
                  as="textarea"
                  required
                  error={errors.mensaje}
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos con detalle tu consulta…"
                  rows={6}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={submitting}
                  className="contact-form__submit"
                >
                  {submitting ? 'Enviando…' : 'Enviar mensaje'}
                </Button>
              </form>
            )}
          </div>

          <aside className="contact-page__info" aria-label="Información de contacto">
            <div className="contact-info-card">
              <span className="contact-info-card__icon" aria-hidden="true">📍</span>
              <div>
                <h3 className="contact-info-card__title">Ubicación</h3>
                <p>Ecuador — Plataforma 100% digital</p>
              </div>
            </div>
            <div className="contact-info-card">
              <span className="contact-info-card__icon" aria-hidden="true">⏰</span>
              <div>
                <h3 className="contact-info-card__title">Tiempo de respuesta</h3>
                <p>Respondemos en 1–3 días hábiles</p>
              </div>
            </div>
            <div className="contact-info-card">
              <span className="contact-info-card__icon" aria-hidden="true">♿</span>
              <div>
                <h3 className="contact-info-card__title">Accesibilidad</h3>
                <p>Si necesitas adaptaciones, indícanoslo en tu mensaje.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageWrapper>
  )
}
