import React from 'react'
import PropTypes from 'prop-types'

/**
 * 10-digit Mexican phone input. Strips non-digits on input and shows a 55 1234 5678 mask.
 */
export const PhoneInput = ({ value, onChange, onBlur, placeholder, required, error, id }) => {
  const handleChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10)
    onChange(digitsOnly)
  }

  const formatted = formatPhone(value)

  return (
    <input
      id={id}
      type="tel"
      inputMode="numeric"
      autoComplete="tel"
      className={`cosmica-input ${error ? 'cosmica-input-error' : ''}`}
      value={formatted}
      onChange={handleChange}
      onBlur={onBlur}
      placeholder={placeholder || '55 1234 5678'}
      required={required}
      maxLength={13}
    />
  )
}

PhoneInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string
}

PhoneInput.defaultProps = {
  value: '',
  onBlur: undefined,
  placeholder: '',
  required: false,
  error: false,
  id: undefined
}

function formatPhone(raw) {
  if (!raw) return ''
  const digits = String(raw).replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2)}`
  return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`
}
