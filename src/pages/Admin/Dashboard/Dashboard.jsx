import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getCountFromServer } from 'firebase/firestore'
import { db } from '@config/firebase'
import StatisticCard from '@components/common/StatisticCard/StatisticCard'
import Spinner from '@components/ui/Spinner/Spinner'
import './Dashboard.css'

const ACCIONES = [
  { to: '/admin/articulos', icon: '📝', label: 'Gestionar artículos', desc: 'Crear, editar y publicar contenido editorial de cada módulo.' },
  { to: '/admin/noticias', icon: '📰', label: 'Gestionar noticias', desc: 'Publicar y administrar las noticias de salud de la plataforma.' },
  { to: '/admin/mensajes', icon: '✉️', label: 'Ver mensajes', desc: 'Lee y responde los mensajes recibidos desde el formulario de contacto.' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [artRef, notRef, msgRef] = [
          collection(db, 'articulos'),
          collection(db, 'noticias'),
          collection(db, 'mensajes'),
        ]
        const [art, not, msg] = await Promise.all([
          getCountFromServer(artRef),
          getCountFromServer(notRef),
          getCountFromServer(msgRef),
        ])
        setStats({
          articulos: art.data().count,
          noticias: not.data().count,
          mensajes: msg.data().count,
        })
      } catch {
        setStats({ articulos: 0, noticias: 0, mensajes: 0 })
      }
    }
    fetchCounts()
  }, [])

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1 className="admin-header__title">Dashboard</h1>
        <p className="admin-header__subtitle">Resumen del estado de la plataforma VitaPrevent</p>
      </header>

      <section aria-labelledby="stats-dash-title">
        <h2 id="stats-dash-title" className="dashboard-section-title">Estadísticas</h2>
        {stats ? (
          <div className="dashboard-stats">
            <StatisticCard value={stats.articulos} label="Artículos totales" variant="blue" />
            <StatisticCard value={stats.noticias} label="Noticias totales" variant="teal" />
            <StatisticCard value={stats.mensajes} label="Mensajes recibidos" variant="purple" />
          </div>
        ) : (
          <div style={{ padding: 'var(--space-8)' }}>
            <Spinner size="md" label="Cargando estadísticas…" />
          </div>
        )}
      </section>

      <section aria-labelledby="acciones-title">
        <h2 id="acciones-title" className="dashboard-section-title">Acciones rápidas</h2>
        <div className="dashboard-acciones">
          {ACCIONES.map((a) => (
            <Link key={a.to} to={a.to} className="dashboard-accion">
              <span className="dashboard-accion__icon" aria-hidden="true">{a.icon}</span>
              <div>
                <strong className="dashboard-accion__label">{a.label}</strong>
                <p className="dashboard-accion__desc">{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
