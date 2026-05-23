/**
 * Validation helpers for Cósmica entities
 */

const PHONE_REGEX = /^\d{10}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validates client payload for create/update operations.
 * @param {object} payload - Client data
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateCliente(payload) {
  const errors = []

  if (!payload.nombre || typeof payload.nombre !== 'string' || payload.nombre.trim().length === 0) {
    errors.push('El nombre es obligatorio')
  }

  if (!payload.telefono_principal || !PHONE_REGEX.test(String(payload.telefono_principal))) {
    errors.push('El teléfono principal debe tener exactamente 10 dígitos')
  }

  if (payload.telefono_secundario && !PHONE_REGEX.test(String(payload.telefono_secundario))) {
    errors.push('El teléfono secundario debe tener exactamente 10 dígitos')
  }

  if (payload.correo && !EMAIL_REGEX.test(String(payload.correo))) {
    errors.push('El correo electrónico no tiene un formato válido')
  }

  if (!payload.vendedor || typeof payload.vendedor !== 'string' || !payload.vendedor.trim()) {
    errors.push('El vendedor es obligatorio')
  }

  if (!payload.tipo_cliente || typeof payload.tipo_cliente !== 'string' || !payload.tipo_cliente.trim()) {
    errors.push('El tipo de cliente es obligatorio')
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Sanitizes a client payload before persisting.
 * @param {object} payload
 * @returns {object}
 */
export function sanitizeCliente(payload) {
  return {
    nombre: String(payload.nombre || '').trim(),
    telefono_principal: String(payload.telefono_principal || '').trim(),
    telefono_secundario: payload.telefono_secundario ? String(payload.telefono_secundario).trim() : null,
    correo: payload.correo ? String(payload.correo).trim().toLowerCase() : null,
    giro: payload.giro ? String(payload.giro).trim() : null,
    vendedor: String(payload.vendedor || '').trim(),
    tipo_cliente: String(payload.tipo_cliente || '').trim(),
    estado: payload.estado ? String(payload.estado).trim() : null,
    notas: payload.notas ? String(payload.notas).trim() : null
  }
}
