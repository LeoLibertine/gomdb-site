import React from 'react'
import PropTypes from 'prop-types'
import { ESTADOS_MEXICO } from '../data/estados'

/**
 * Dropdown with the 32 Mexican states. Renders a native select for accessibility.
 */
export const StateSelect = ({ value, onChange, required, error, id }) => (
  <select
    id={id}
    className={`cosmica-select ${error ? 'cosmica-input-error' : ''}`}
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    required={required}
  >
    <option value="">Selecciona un estado…</option>
    {ESTADOS_MEXICO.map((estado) => (
      <option key={estado} value={estado}>{estado}</option>
    ))}
  </select>
)

StateSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string
}

StateSelect.defaultProps = {
  value: '',
  required: false,
  error: false,
  id: undefined
}
