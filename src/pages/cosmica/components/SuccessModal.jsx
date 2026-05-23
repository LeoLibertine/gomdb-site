import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { CheckCircle2, UserPlus, Users, Edit3, Sparkles } from 'lucide-react'
import './SuccessModal.css'

/**
 * Modal shown after successfully creating a new client.
 * Highlights the assigned numero_cliente and offers next-step actions.
 */
export const SuccessModal = ({ cliente, onNuevo, onLista, onEditar }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onLista()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onLista])

  if (!cliente) return null

  return (
    <div className="cosmica-modal-backdrop" role="dialog" aria-modal="true">
      <div className="cosmica-success-modal">
        <div className="cosmica-success-stars" aria-hidden="true" />

        <div className="cosmica-success-icon">
          <CheckCircle2 size={56} />
        </div>

        <h2 className="cosmica-success-title">
          <Sparkles size={18} /> Cliente registrado
        </h2>

        <div className="cosmica-success-number">
          <span className="cosmica-success-label">N° de cliente</span>
          <strong>#{cliente.numero_cliente}</strong>
        </div>

        <div className="cosmica-success-name">{cliente.nombre}</div>

        <ul className="cosmica-success-details">
          {cliente.estado && <li>{cliente.estado}</li>}
          {cliente.vendedor && <li>Vendedor: <strong>{cliente.vendedor}</strong></li>}
          {cliente.giro && <li>Giro: {cliente.giro}</li>}
        </ul>

        <div className="cosmica-success-actions">
          <button type="button" className="cosmica-btn cosmica-btn-secondary" onClick={onEditar}>
            <Edit3 size={16} /> Editar
          </button>
          <button type="button" className="cosmica-btn cosmica-btn-secondary" onClick={onLista}>
            <Users size={16} /> Ver lista
          </button>
          <button type="button" className="cosmica-btn cosmica-btn-primary" onClick={onNuevo}>
            <UserPlus size={16} /> Registrar otro
          </button>
        </div>
      </div>
    </div>
  )
}

SuccessModal.propTypes = {
  cliente: PropTypes.shape({
    _id: PropTypes.string,
    numero_cliente: PropTypes.number,
    nombre: PropTypes.string,
    estado: PropTypes.string,
    vendedor: PropTypes.string,
    giro: PropTypes.string
  }),
  onNuevo: PropTypes.func.isRequired,
  onLista: PropTypes.func.isRequired,
  onEditar: PropTypes.func.isRequired
}

SuccessModal.defaultProps = {
  cliente: null
}
