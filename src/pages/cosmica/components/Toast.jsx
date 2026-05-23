import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { CheckCircle, AlertCircle } from 'lucide-react'

/**
 * Auto-dismissing toast notification.
 */
export const Toast = ({ message, type, onClose, duration }) => {
  useEffect(() => {
    if (!message) return undefined
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [message, duration, onClose])

  if (!message) return null

  const Icon = type === 'error' ? AlertCircle : CheckCircle
  const color = type === 'error' ? 'var(--cosmica-danger)' : 'var(--cosmica-success)'

  return (
    <div className={`cosmica-toast cosmica-toast-${type}`} role="status">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon size={20} color={color} />
        <span>{message}</span>
      </div>
    </div>
  )
}

Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error']),
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number
}

Toast.defaultProps = {
  message: '',
  type: 'success',
  duration: 3500
}
