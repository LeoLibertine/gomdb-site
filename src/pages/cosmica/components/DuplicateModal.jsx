import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'

/**
 * Modal shown when a phone number already exists in the database.
 * Offers "Salir" (close & reset form) and "Editar cliente" (navigate to existing record).
 */
export const DuplicateModal = ({ cliente, onClose }) => {
  const navigate = useNavigate()

  if (!cliente) return null

  const handleEdit = () => {
    navigate(`/cosmica/clientes/${cliente._id}`)
  }

  return (
    <div className="cosmica-modal-backdrop" role="dialog" aria-modal="true">
      <div className="cosmica-modal">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{
            background: 'rgba(245, 158, 11, 0.15)',
            borderRadius: '12px',
            padding: '10px',
            display: 'flex'
          }}>
            <AlertTriangle size={24} color="#F59E0B" />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="cosmica-modal-title">Cliente ya guardado</h2>
            <p style={{ margin: '0 0 8px 0', color: 'var(--cosmica-text-secondary)' }}>
              Este teléfono ya está registrado:
            </p>
            <div style={{
              background: 'var(--cosmica-surface)',
              borderRadius: 'var(--cosmica-radius-md)',
              padding: 'var(--cosmica-spacing-md)',
              marginTop: 'var(--cosmica-spacing-sm)'
            }}>
              <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{cliente.nombre}</div>
              <div style={{ color: 'var(--cosmica-text-secondary)', fontSize: '0.9rem', marginTop: 4 }}>
                Cliente #{cliente.numero_cliente} · {cliente.estado}
              </div>
              {cliente.vendedor && (
                <div style={{ color: 'var(--cosmica-text-muted)', fontSize: '0.85rem', marginTop: 2 }}>
                  Vendedor: {cliente.vendedor}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="cosmica-modal-actions">
          <button type="button" className="cosmica-btn cosmica-btn-ghost" onClick={onClose}>
            Salir
          </button>
          <button type="button" className="cosmica-btn cosmica-btn-primary" onClick={handleEdit}>
            Editar cliente
          </button>
        </div>
      </div>
    </div>
  )
}

DuplicateModal.propTypes = {
  cliente: PropTypes.shape({
    _id: PropTypes.string,
    numero_cliente: PropTypes.number,
    nombre: PropTypes.string,
    estado: PropTypes.string,
    vendedor: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired
}

DuplicateModal.defaultProps = {
  cliente: null
}
