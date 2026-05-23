/**
 * Cliente HTTP para la API de Cósmica.
 * Todas las funciones devuelven la respuesta parseada o lanzan un error con mensaje legible.
 */

const BASE = '/api/cosmica'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  if (res.status === 204) return null

  const isJson = res.headers.get('content-type')?.includes('application/json')
  const data = isJson ? await res.json() : await res.blob()

  if (!res.ok) {
    const error = new Error((data && data.message) || (data && data.error) || `Error ${res.status}`)
    error.status = res.status
    error.payload = data
    throw error
  }

  return data
}

/**
 * @param {object} params
 * @returns {Promise<{ items: any[], total: number, page: number, limit: number, totalPages: number }>}
 */
export function listClientes(params = {}) {
  const qs = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') qs.set(key, value)
  })
  const suffix = qs.toString() ? `?${qs.toString()}` : ''
  return request(`/clientes${suffix}`)
}

export function getCliente(id) {
  return request(`/clientes/${id}`)
}

export function createCliente(payload) {
  return request('/clientes', { method: 'POST', body: JSON.stringify(payload) })
}

export function updateCliente(id, payload) {
  return request(`/clientes/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
}

export function buscarPorTelefono(telefono) {
  return request(`/clientes/buscar?telefono=${encodeURIComponent(telefono)}`)
}

export function buscarPorNumero(numero) {
  return request(`/clientes/buscar?numero=${encodeURIComponent(numero)}`)
}

export function exportarUrl(params = {}) {
  const qs = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') qs.set(key, value)
  })
  const suffix = qs.toString() ? `?${qs.toString()}` : ''
  return `${BASE}/clientes/exportar${suffix}`
}

export function listVendedores() {
  return request('/vendedores')
}

export function createVendedor(nombre) {
  return request('/vendedores', { method: 'POST', body: JSON.stringify({ nombre }) })
}

export function updateVendedor(payload) {
  return request('/vendedores', { method: 'PUT', body: JSON.stringify(payload) })
}

export function deleteVendedor(_id) {
  return request('/vendedores', { method: 'DELETE', body: JSON.stringify({ _id }) })
}

export function listGiros() {
  return request('/giros')
}

export function createGiro(nombre) {
  return request('/giros', { method: 'POST', body: JSON.stringify({ nombre }) })
}

export function updateGiro(payload) {
  return request('/giros', { method: 'PUT', body: JSON.stringify(payload) })
}

export function deleteGiro(_id) {
  return request('/giros', { method: 'DELETE', body: JSON.stringify({ _id }) })
}

export function listTiposCliente() {
  return request('/tipos-cliente')
}

export function createTipoCliente(nombre) {
  return request('/tipos-cliente', { method: 'POST', body: JSON.stringify({ nombre }) })
}

export function updateTipoCliente(payload) {
  return request('/tipos-cliente', { method: 'PUT', body: JSON.stringify(payload) })
}

export function deleteTipoCliente(_id) {
  return request('/tipos-cliente', { method: 'DELETE', body: JSON.stringify({ _id }) })
}

export function getDashboard() {
  return request('/dashboard')
}
