import React from 'react'
import PropTypes from 'prop-types'
import './MetricsCard.css'

/**
 * Tarjeta para mostrar métricas y KPIs del cliente
 *
 * @param {string} title - Título de la tarjeta
 * @param {Array<Object>} metrics - Array de métricas {label, value, unit?, trend?, icon?}
 * @param {string} variant - Estilo: 'default' | 'success' | 'warning' | 'info'
 * @param {boolean} compact - Versión compacta
 */
export const MetricsCard = ({
  title,
  metrics = [],
  variant = 'default',
  compact = false
}) => {
  const getTrendIcon = (trend) => {
    if (!trend) return null

    if (trend === 'up') {
      return (
        <svg className="trend-icon trend-up" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    }

    if (trend === 'down') {
      return (
        <svg className="trend-icon trend-down" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
          <polyline points="17 18 23 18 23 12" />
        </svg>
      )
    }

    return null
  }

  return (
    <div className={`metrics-card metrics-card--${variant} ${compact ? 'metrics-card--compact' : ''}`}>
      {title && <h3 className="metrics-card__title">{title}</h3>}

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-item">
            {metric.icon && (
              <div className="metric-icon">
                {metric.icon}
              </div>
            )}

            <div className="metric-content">
              <div className="metric-label">{metric.label}</div>
              <div className="metric-value">
                {metric.value}
                {metric.unit && <span className="metric-unit">{metric.unit}</span>}
                {getTrendIcon(metric.trend)}
              </div>
              {metric.description && (
                <div className="metric-description">{metric.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

MetricsCard.propTypes = {
  title: PropTypes.string,
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      unit: PropTypes.string,
      trend: PropTypes.oneOf(['up', 'down']),
      icon: PropTypes.node,
      description: PropTypes.string
    })
  ).isRequired,
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'info']),
  compact: PropTypes.bool
}
