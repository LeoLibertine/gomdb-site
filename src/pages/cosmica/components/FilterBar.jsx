import React from 'react'
import PropTypes from 'prop-types'
import { Search, X } from 'lucide-react'
import { ESTADOS_MEXICO } from '../data/estados'

/**
 * Search + filter bar for the clientes list page.
 * @param {{
 *   filters: { busqueda: string, vendedor: string, estado: string, fecha_desde: string, fecha_hasta: string },
 *   onChange: (filters: object) => void,
 *   onClear: () => void,
 *   vendedores: Array<{ nombre: string }>
 * }} props
 */
export const FilterBar = ({ filters, onChange, onClear, vendedores }) => {
  const set = (field, value) => onChange({ ...filters, [field]: value })

  const hasActive =
    filters.busqueda || filters.vendedor || filters.estado ||
    filters.fecha_desde || filters.fecha_hasta

  return (
    <div className="cosmica-filterbar">
      <div className="cosmica-filterbar-search">
        <Search size={18} />
        <input
          type="search"
          className="cosmica-input"
          placeholder="Buscar por nombre, número de cliente o teléfono…"
          value={filters.busqueda || ''}
          onChange={(e) => set('busqueda', e.target.value)}
        />
      </div>

      <select
        className="cosmica-select"
        value={filters.vendedor || ''}
        onChange={(e) => set('vendedor', e.target.value)}
      >
        <option value="">Todos los vendedores</option>
        {vendedores.map((v) => (
          <option key={v._id || v.nombre} value={v.nombre}>{v.nombre}</option>
        ))}
      </select>

      <select
        className="cosmica-select"
        value={filters.estado || ''}
        onChange={(e) => set('estado', e.target.value)}
      >
        <option value="">Todos los estados</option>
        {ESTADOS_MEXICO.map((est) => (
          <option key={est} value={est}>{est}</option>
        ))}
      </select>

      <input
        type="date"
        className="cosmica-input"
        value={filters.fecha_desde || ''}
        onChange={(e) => set('fecha_desde', e.target.value)}
        aria-label="Fecha desde"
      />

      <input
        type="date"
        className="cosmica-input"
        value={filters.fecha_hasta || ''}
        onChange={(e) => set('fecha_hasta', e.target.value)}
        aria-label="Fecha hasta"
      />

      {hasActive && (
        <button
          type="button"
          className="cosmica-btn cosmica-btn-ghost cosmica-btn-sm"
          onClick={onClear}
        >
          <X size={14} /> Limpiar
        </button>
      )}
    </div>
  )
}

FilterBar.propTypes = {
  filters: PropTypes.shape({
    busqueda: PropTypes.string,
    vendedor: PropTypes.string,
    estado: PropTypes.string,
    fecha_desde: PropTypes.string,
    fecha_hasta: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  vendedores: PropTypes.array
}

FilterBar.defaultProps = {
  vendedores: []
}
