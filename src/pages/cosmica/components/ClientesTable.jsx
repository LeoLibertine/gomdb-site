import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Edit3, Phone, MapPin, User, Briefcase, Tag } from 'lucide-react'

/**
 * Responsive list of clientes. Renders a real table on wider screens
 * and a stack of cards on narrow screens via CSS.
 */
export const ClientesTable = ({ items, loading, emptyMessage }) => {
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="cosmica-loading">
        <div className="cosmica-spinner" />
        <span>Cargando clientes…</span>
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="cosmica-empty">
        <p>{emptyMessage || 'No hay clientes que coincidan con los filtros.'}</p>
      </div>
    )
  }

  return (
    <div className="cosmica-table-wrap">
      <table className="cosmica-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Tipo</th>
            <th>Vendedor</th>
            <th>Estado</th>
            <th>Giro</th>
            <th>Registro</th>
            <th aria-label="Acciones" />
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c._id}>
              <td><span className="cosmica-cell-id">#{c.numero_cliente}</span></td>
              <td><strong>{c.nombre}</strong></td>
              <td>{formatPhoneDisplay(c.telefono_principal)}</td>
              <td>{c.tipo_cliente ? <span className="cosmica-tipo-badge">{c.tipo_cliente}</span> : '—'}</td>
              <td>{c.vendedor || '—'}</td>
              <td>{c.estado || '—'}</td>
              <td>{c.giro || '—'}</td>
              <td>{c.fecha_registro ? new Date(c.fecha_registro).toLocaleDateString('es-MX') : '—'}</td>
              <td>
                <button
                  type="button"
                  className="cosmica-btn cosmica-btn-secondary cosmica-btn-sm"
                  onClick={() => navigate(`/cosmica/clientes/${c._id}`)}
                >
                  <Edit3 size={14} /> Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cosmica-cards">
        {items.map((c) => (
          <article key={c._id} className="cosmica-client-card">
            <header>
              <span className="cosmica-cell-id">#{c.numero_cliente}</span>
              <button
                type="button"
                className="cosmica-btn cosmica-btn-secondary cosmica-btn-sm"
                onClick={() => navigate(`/cosmica/clientes/${c._id}`)}
              >
                <Edit3 size={14} /> Editar
              </button>
            </header>
            <h3 className="cosmica-client-card-name">{c.nombre}</h3>
            <ul>
              <li><Phone size={14} /> {formatPhoneDisplay(c.telefono_principal)}</li>
              {c.tipo_cliente && <li><Tag size={14} /> <span className="cosmica-tipo-badge">{c.tipo_cliente}</span></li>}
              {c.vendedor && <li><User size={14} /> {c.vendedor}</li>}
              {c.estado && <li><MapPin size={14} /> {c.estado}</li>}
              {c.giro && <li><Briefcase size={14} /> {c.giro}</li>}
            </ul>
            <footer>
              Registrado: {c.fecha_registro ? new Date(c.fecha_registro).toLocaleDateString('es-MX') : '—'}
            </footer>
          </article>
        ))}
      </div>
    </div>
  )
}

ClientesTable.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string
}

ClientesTable.defaultProps = {
  items: [],
  loading: false,
  emptyMessage: ''
}

function formatPhoneDisplay(phone) {
  if (!phone) return '—'
  const digits = String(phone).replace(/\D/g, '')
  if (digits.length !== 10) return phone
  return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`
}
