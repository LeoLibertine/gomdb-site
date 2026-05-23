import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Plus, Check, X } from 'lucide-react'

/**
 * Dropdown that lets the user inline-add a new option without leaving the form.
 * On "Agregar nuevo…" it swaps to a text input; on save it calls onCreate(name)
 * which should persist the option remotely and resolve with the new name string.
 *
 * @param {{
 *   value: string,
 *   options: Array<{ _id?: string, nombre: string }>,
 *   onChange: (val: string) => void,
 *   onCreate: (name: string) => Promise<string>,
 *   placeholder?: string,
 *   error?: boolean,
 *   id?: string
 * }} props
 */
export const EditableSelect = ({ value, options, onChange, onCreate, placeholder, error, id }) => {
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)

  const handleSelect = (e) => {
    const val = e.target.value
    if (val === '__add__') {
      setAdding(true)
      return
    }
    onChange(val)
  }

  const handleSave = async () => {
    const trimmed = newName.trim()
    if (!trimmed) return
    setSaving(true)
    setSaveError(null)
    try {
      const createdName = await onCreate(trimmed)
      onChange(createdName)
      setNewName('')
      setAdding(false)
    } catch (err) {
      setSaveError(err.message || 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setAdding(false)
    setNewName('')
    setSaveError(null)
  }

  if (adding) {
    return (
      <div className="cosmica-editable-add">
        <input
          type="text"
          autoFocus
          className={`cosmica-input ${saveError ? 'cosmica-input-error' : ''}`}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nombre nuevo…"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSave()
            } else if (e.key === 'Escape') {
              handleCancel()
            }
          }}
        />
        <button
          type="button"
          className="cosmica-btn cosmica-btn-primary cosmica-btn-sm"
          onClick={handleSave}
          disabled={saving || !newName.trim()}
        >
          <Check size={16} />
        </button>
        <button
          type="button"
          className="cosmica-btn cosmica-btn-ghost cosmica-btn-sm"
          onClick={handleCancel}
          disabled={saving}
        >
          <X size={16} />
        </button>
        {saveError && <span className="cosmica-error-text">{saveError}</span>}
      </div>
    )
  }

  return (
    <select
      id={id}
      className={`cosmica-select ${error ? 'cosmica-input-error' : ''}`}
      value={value || ''}
      onChange={handleSelect}
    >
      <option value="">{placeholder || 'Selecciona…'}</option>
      {options.map((opt) => (
        <option key={opt._id || opt.nombre} value={opt.nombre}>
          {opt.nombre}
        </option>
      ))}
      <option value="__add__">+ Agregar nuevo…</option>
    </select>
  )
}

EditableSelect.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    nombre: PropTypes.string.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  id: PropTypes.string
}

EditableSelect.defaultProps = {
  value: '',
  placeholder: '',
  error: false,
  id: undefined
}

// Inline-add layout (lives here to keep the component self-contained)
const editableStyles = `
.cosmica-editable-add {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.cosmica-editable-add .cosmica-input {
  flex: 1;
  min-width: 0;
}
`

if (typeof document !== 'undefined' && !document.getElementById('cosmica-editable-styles')) {
  const style = document.createElement('style')
  style.id = 'cosmica-editable-styles'
  style.textContent = editableStyles
  document.head.appendChild(style)
}
