import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserPlus, Users, BarChart3, Settings, Sparkles } from 'lucide-react'
import { getDashboard } from './api/client'
import { CosmicaNavbar } from './components/CosmicaNavbar'
import './styles/cosmica-theme.css'
import './CosmicaHome.css'

/**
 * Landing page for the Cósmica admin app.
 * Big tap-friendly tiles for the 4 main actions plus a quick stats teaser.
 */
const CosmicaHome = () => {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    getDashboard().then(setStats).catch(() => setStats(null))
  }, [])

  const tiles = [
    {
      to: '/cosmica/nuevo',
      label: 'Registrar cliente',
      desc: 'Nuevo cliente con número automático',
      icon: UserPlus,
      primary: true
    },
    {
      to: '/cosmica/clientes',
      label: 'Ver clientes',
      desc: 'Buscar, filtrar y editar',
      icon: Users
    },
    {
      to: '/cosmica/dashboard',
      label: 'Estadísticas',
      desc: 'Totales y desempeño',
      icon: BarChart3
    },
    {
      to: '/cosmica/configuracion',
      label: 'Configuración',
      desc: 'Vendedores y giros',
      icon: Settings
    }
  ]

  return (
    <div className="cosmica-app">
      <div className="stars-bg" aria-hidden="true" />
      <CosmicaNavbar />
      <div className="cosmica-container">
        <header className="cosmica-home-hero">
          <div className="cosmica-home-brand">
            <Sparkles size={32} />
            <h1 className="cosmica-home-title">Cósmica</h1>
          </div>
          <p className="cosmica-home-subtitle">
            Registro y gestión de clientes — velas para pastel, artículos de fiesta y papelería.
          </p>
          {stats && (
            <div className="cosmica-home-stats">
              <div>
                <strong>{stats.total}</strong>
                <span>Clientes totales</span>
              </div>
              <div>
                <strong>{stats.totalMes}</strong>
                <span>Este mes</span>
              </div>
              <div>
                <strong>{stats.totalSemana}</strong>
                <span>Esta semana</span>
              </div>
            </div>
          )}
        </header>

        <section className="cosmica-tiles">
          {tiles.map(({ to, label, desc, icon: Icon, primary }) => (
            <Link
              key={to}
              to={to}
              className={`cosmica-tile ${primary ? 'cosmica-tile-primary' : ''}`}
            >
              <div className="cosmica-tile-icon"><Icon size={28} /></div>
              <div className="cosmica-tile-text">
                <h2>{label}</h2>
                <p>{desc}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  )
}

export default CosmicaHome
