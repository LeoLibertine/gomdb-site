import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'
import { AccessModal } from './AccessModal'

/**
 * ProtectedRoute - Wrapper para rutas que requieren código de acceso
 *
 * Protege contenido de cliente requiriendo un código de acceso válido.
 * Soporta códigos específicos por cliente y código maestro de MongoDB.
 *
 * @param {string} client - Nombre del cliente (debe coincidir con key en ACCESS_CODES)
 * @param {ReactNode} children - Contenido a proteger
 *
 * @example
 * <ProtectedRoute client="bancolombia">
 *   <BancolombiaDashboard />
 * </ProtectedRoute>
 */
export const ProtectedRoute = ({ client, children }) => {
  const { hasAccess, validateCode, checkAccess } = useAuth(client)

  // Check access on mount
  useEffect(() => {
    checkAccess()
  }, [])

  const handleSubmit = (code) => {
    const isValid = validateCode(code)
    return isValid
  }

  const handleCancel = () => {
    // Redirect to home if user cancels
    window.location.href = '/'
  }

  // Capitalize first letter for display
  const displayClient = client.charAt(0).toUpperCase() + client.slice(1)

  // Show modal if no access
  if (!hasAccess) {
    return (
      <AccessModal
        client={displayClient}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    )
  }

  // Render protected content
  return <>{children}</>
}

ProtectedRoute.propTypes = {
  client: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
