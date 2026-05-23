import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Check, ChevronDown, Plus, X } from 'lucide-react'
import './Autocomplete.css'

/**
 * Searchable dropdown ("combobox") with text filtering and optional "add new" support.
 * Diacritic-insensitive matching: typing "puebla" or "queretaro" finds "Puebla" or "Querétaro".
 *
 * @param {{
 *   value: string,
 *   options: Array<string | { nombre: string }>,
 *   onChange: (val: string) => void,
 *   onCreate?: (name: string) => Promise<string>,
 *   placeholder?: string,
 *   error?: boolean,
 *   id?: string,
 *   required?: boolean
 * }} props
 */
export const Autocomplete = ({
  value,
  options,
  onChange,
  onCreate,
  placeholder,
  error,
  id,
  required
}) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const [adding, setAdding] = useState(false)
  const [creating, setCreating] = useState(false)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  const normalized = useMemo(() => options.map((opt) => {
    const label = typeof opt === 'string' ? opt : opt.nombre
    return { label, search: stripAccents(label).toLowerCase() }
  }), [options])

  const filtered = useMemo(() => {
    const q = stripAccents(query).toLowerCase().trim()
    if (!q) return normalized
    return normalized.filter((opt) => opt.search.includes(q))
  }, [normalized, query])

  useEffect(() => {
    if (!open) return undefined
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
        setAdding(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  useEffect(() => {
    setHighlight(0)
  }, [query, open])

  const selectOption = (label) => {
    onChange(label)
    setOpen(false)
    setQuery('')
    setAdding(false)
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
    setOpen(true)
  }

  const handleKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(filtered.length - 1, h + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(0, h - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const pick = filtered[highlight]
      if (pick) selectOption(pick.label)
    } else if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
      setAdding(false)
    }
  }

  const handleAddNew = async () => {
    if (!onCreate) return
    const trimmed = query.trim()
    if (!trimmed) return
    setCreating(true)
    try {
      const created = await onCreate(trimmed)
      onChange(created)
      setOpen(false)
      setQuery('')
      setAdding(false)
    } catch {
      // swallowed — the parent surfaces errors via toast
    } finally {
      setCreating(false)
    }
  }

  const displayValue = open ? query : value || ''
  const exactMatch = normalized.some((o) => o.label === query.trim())
  const showCreate = onCreate && query.trim().length > 0 && !exactMatch

  return (
    <div className={`cosmica-autocomplete ${open ? 'is-open' : ''}`} ref={containerRef}>
      <div className="cosmica-autocomplete-input-wrap">
        <input
          id={id}
          ref={inputRef}
          type="text"
          className={`cosmica-input ${error ? 'cosmica-input-error' : ''}`}
          value={displayValue}
          placeholder={placeholder || 'Escribe para buscar…'}
          required={required}
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {value && !open && (
          <button
            type="button"
            className="cosmica-autocomplete-clear"
            aria-label="Borrar selección"
            onClick={() => { onChange(''); setQuery('') }}
          >
            <X size={14} />
          </button>
        )}
        <button
          type="button"
          className="cosmica-autocomplete-toggle"
          aria-label={open ? 'Cerrar lista' : 'Abrir lista'}
          tabIndex={-1}
          onClick={() => {
            setOpen((v) => !v)
            if (!open) inputRef.current?.focus()
          }}
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {open && (
        <div className="cosmica-autocomplete-menu" role="listbox">
          {filtered.length === 0 && !showCreate && (
            <div className="cosmica-autocomplete-empty">Sin coincidencias</div>
          )}
          {filtered.map((opt, idx) => (
            <button
              key={opt.label}
              type="button"
              role="option"
              aria-selected={value === opt.label}
              className={`cosmica-autocomplete-item ${idx === highlight ? 'is-highlight' : ''} ${value === opt.label ? 'is-selected' : ''}`}
              onMouseEnter={() => setHighlight(idx)}
              onMouseDown={(e) => { e.preventDefault(); selectOption(opt.label) }}
            >
              <span>{opt.label}</span>
              {value === opt.label && <Check size={14} />}
            </button>
          ))}
          {showCreate && (
            <button
              type="button"
              className="cosmica-autocomplete-create"
              onMouseDown={(e) => { e.preventDefault(); handleAddNew() }}
              disabled={creating}
            >
              <Plus size={14} /> Agregar &quot;{query.trim()}&quot;
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Autocomplete.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  id: PropTypes.string,
  required: PropTypes.bool
}

Autocomplete.defaultProps = {
  value: '',
  onCreate: null,
  placeholder: '',
  error: false,
  id: undefined,
  required: false
}

function stripAccents(str) {
  return String(str || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
}
