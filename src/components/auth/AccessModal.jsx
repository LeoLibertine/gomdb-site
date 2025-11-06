import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './AccessModal.css'

/**
 * Modal for access code input
 * Displays when user tries to access protected client content
 *
 * Features:
 * - MongoDB branding (green/purple colors)
 * - Real-time validation
 * - Error messages
 * - Accessible (keyboard navigation, ARIA labels)
 *
 * @param {string} client - Client name (e.g., 'Bancolombia', 'Yape')
 * @param {Function} onSubmit - Callback when code is submitted (code) => boolean
 * @param {Function} onCancel - Optional callback for cancel button
 */
export const AccessModal = ({ client, onSubmit, onCancel }) => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!code.trim()) {
      setError('Por favor ingresa un código de acceso')
      return
    }

    setIsLoading(true)
    setError('')

    // Simulate small delay for better UX
    setTimeout(() => {
      const isValid = onSubmit(code.trim())

      if (!isValid) {
        setError('Código incorrecto. Por favor verifica con tu contacto de MongoDB.')
        setCode('')
        setIsLoading(false)
      }
      // If valid, the parent component will handle the state change
    }, 300)
  }

  const handleInputChange = (e) => {
    setCode(e.target.value)
    if (error) setError('') // Clear error when user starts typing
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      // Default behavior: go back
      window.history.back()
    }
  }

  return (
    <div className="access-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="access-modal">
        {/* Header */}
        <div className="access-modal__header">
          <div className="access-modal__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 id="modal-title" className="access-modal__title">
            Documento Protegido
          </h2>
        </div>

        {/* Content */}
        <div className="access-modal__content">
          <p className="access-modal__description">
            Este documento requiere un código de acceso.
          </p>
          <p className="access-modal__client">
            Cliente: <strong>{client}</strong>
          </p>
          <p className="access-modal__help">
            Si eres cliente de <strong>{client}</strong> o parte del equipo de MongoDB,
            contacta a tu Solutions Architect para obtener el código de acceso.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="access-modal__form">
            <div className="access-modal__input-group">
              <label htmlFor="access-code" className="access-modal__label">
                Código de Acceso
              </label>
              <input
                id="access-code"
                type="text"
                value={code}
                onChange={handleInputChange}
                placeholder="Ingresa tu código"
                className={`access-modal__input ${error ? 'access-modal__input--error' : ''}`}
                disabled={isLoading}
                autoFocus
                autoComplete="off"
              />
              {error && (
                <div className="access-modal__error" role="alert">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="access-modal__buttons">
              <button
                type="button"
                onClick={handleCancel}
                className="access-modal__button access-modal__button--secondary"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="access-modal__button access-modal__button--primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="access-modal__spinner" />
                    Verificando...
                  </>
                ) : (
                  'Acceder'
                )}
              </button>
            </div>
          </form>

          {/* Footer Help */}
          <div className="access-modal__footer">
            <p className="access-modal__footer-text">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              ¿Necesitas ayuda? Contacta a{' '}
              <a href="mailto:leo.alarcon@mongodb.com" className="access-modal__link">
                leo.alarcon@mongodb.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

AccessModal.propTypes = {
  client: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func
}
