import React, { useEffect, useState } from 'react'
import { Users, TrendingUp, MapPin, Briefcase, User } from 'lucide-react'
import { getDashboard } from './api/client'
import { CosmicaNavbar } from './components/CosmicaNavbar'
import './styles/cosmica-theme.css'
import './DashboardCosmica.css'

/**
 * Page: aggregated statistics dashboard.
 */
const DashboardCosmica = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getDashboard()
      .then((d) => { if (mounted) setData(d) })
      .catch(() => { if (mounted) setData(null) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  return (
    <div className="cosmica-app">
      <div className="stars-bg" aria-hidden="true" />
      <CosmicaNavbar />
      <div className="cosmica-container">
        <div className="cosmica-page-header">
          <div>
            <h1 className="cosmica-page-title">Estadísticas</h1>
            <p className="cosmica-page-subtitle">Vista general de la base de clientes</p>
          </div>
        </div>

        {loading && (
          <div className="cosmica-loading">
            <div className="cosmica-spinner" />
            <span>Cargando estadísticas…</span>
          </div>
        )}

        {!loading && !data && (
          <div className="cosmica-empty">
            <p>No se pudieron cargar las estadísticas. Verifica la conexión a MongoDB.</p>
          </div>
        )}

        {data && (
          <>
            <section className="cosmica-stats-grid">
              <StatCard icon={Users} label="Clientes totales" value={data.total} accent="primary" />
              <StatCard icon={TrendingUp} label="Nuevos este mes" value={data.totalMes} accent="accent" />
              <StatCard icon={TrendingUp} label="Esta semana" value={data.totalSemana} accent="gold" />
            </section>

            <section className="cosmica-charts-grid">
              <ChartCard title="Por estado" icon={MapPin} items={data.porEstado} keyField="estado" />
              <ChartCard title="Por vendedor" icon={User} items={data.porVendedor} keyField="vendedor" />
              <ChartCard title="Por giro" icon={Briefcase} items={data.porGiro} keyField="giro" />
            </section>

            {data.recientes && data.recientes.length > 0 && (
              <section className="cosmica-card" style={{ marginTop: 'var(--cosmica-spacing-lg)' }}>
                <h2 style={{ margin: '0 0 var(--cosmica-spacing-md) 0' }}>Registros recientes</h2>
                <ul className="cosmica-recientes">
                  {data.recientes.map((r) => (
                    <li key={r._id}>
                      <span className="cosmica-cell-id">#{r.numero_cliente}</span>
                      <div>
                        <strong>{r.nombre}</strong>
                        <span>{r.vendedor || 'sin vendedor'} · {r.estado || '—'}</span>
                      </div>
                      <time>
                        {r.fecha_registro ? new Date(r.fecha_registro).toLocaleDateString('es-MX') : '—'}
                      </time>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <article className={`cosmica-stat-card cosmica-stat-${accent}`}>
    <Icon size={24} />
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  </article>
)

const ChartCard = ({ title, icon: Icon, items, keyField }) => {
  const max = items.reduce((acc, x) => Math.max(acc, x.count), 0)
  return (
    <article className="cosmica-card">
      <h3 className="cosmica-chart-title">
        <Icon size={18} /> {title}
      </h3>
      {items.length === 0 ? (
        <p className="cosmica-text-muted">Sin datos todavía</p>
      ) : (
        <ul className="cosmica-bar-list">
          {items.map((item) => (
            <li key={item[keyField] || 'sin-dato'}>
              <span className="cosmica-bar-label">{item[keyField] || 'Sin dato'}</span>
              <div className="cosmica-bar-track">
                <div
                  className="cosmica-bar-fill"
                  style={{ width: max ? `${(item.count / max) * 100}%` : '0%' }}
                />
              </div>
              <span className="cosmica-bar-count">{item.count}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default DashboardCosmica
