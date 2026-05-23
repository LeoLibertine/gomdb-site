import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Sparkles, UserPlus, Users, BarChart3, Settings, Menu, X } from 'lucide-react'
import './CosmicaNavbar.css'

const LINKS = [
  { to: '/cosmica/nuevo', label: 'Nuevo cliente', icon: UserPlus },
  { to: '/cosmica/clientes', label: 'Clientes', icon: Users },
  { to: '/cosmica/dashboard', label: 'Estadísticas', icon: BarChart3 },
  { to: '/cosmica/configuracion', label: 'Configuración', icon: Settings }
]

/**
 * Top navigation bar specific to the Cósmica app.
 * Mobile-friendly: collapses to a hamburger menu under 720px.
 */
export const CosmicaNavbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="cosmica-navbar">
      <div className="cosmica-navbar-inner">
        <Link to="/cosmica" className="cosmica-navbar-brand" onClick={() => setOpen(false)}>
          <Sparkles size={22} />
          <span>Cósmica</span>
        </Link>

        <button
          type="button"
          className="cosmica-navbar-toggle"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`cosmica-navbar-links ${open ? 'is-open' : ''}`}>
          {LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/cosmica/clientes'}
              className={({ isActive }) =>
                `cosmica-navbar-link ${isActive ? 'is-active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
