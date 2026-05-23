import { getCollection, ensureIndexes } from '../../_lib/mongodb.js'
import { getNextSequence } from '../../_lib/counter.js'
import { validateCliente, sanitizeCliente } from '../../_lib/validators.js'

/**
 * GET /api/cosmica/clientes — list with optional filters and pagination
 * POST /api/cosmica/clientes — create a new client
 */
export default async function handler(req, res) {
  try {
    await ensureIndexes()
    const clientes = await getCollection('clientes')

    if (req.method === 'GET') {
      const {
        page = '1',
        limit = '50',
        vendedor,
        estado,
        fecha_desde,
        fecha_hasta,
        busqueda
      } = req.query

      const pageNum = Math.max(1, parseInt(page, 10) || 1)
      const limitNum = Math.min(200, Math.max(1, parseInt(limit, 10) || 50))
      const skip = (pageNum - 1) * limitNum

      const filter = {}
      if (vendedor) filter.vendedor = vendedor
      if (estado) filter.estado = estado
      if (fecha_desde || fecha_hasta) {
        filter.fecha_registro = {}
        if (fecha_desde) filter.fecha_registro.$gte = new Date(fecha_desde)
        if (fecha_hasta) filter.fecha_registro.$lte = new Date(fecha_hasta)
      }
      if (busqueda) {
        const trimmed = String(busqueda).trim()
        if (/^\d+$/.test(trimmed)) {
          const asNumber = parseInt(trimmed, 10)
          filter.$or = [
            { numero_cliente: asNumber },
            { telefono_principal: trimmed },
            { telefono_secundario: trimmed }
          ]
        } else {
          filter.nombre = { $regex: trimmed, $options: 'i' }
        }
      }

      const [items, total] = await Promise.all([
        clientes.find(filter).sort({ fecha_registro: -1 }).skip(skip).limit(limitNum).toArray(),
        clientes.countDocuments(filter)
      ])

      return res.status(200).json({
        items,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      })
    }

    if (req.method === 'POST') {
      const payload = req.body || {}
      const { valid, errors } = validateCliente(payload)
      if (!valid) {
        return res.status(400).json({ error: 'Datos inválidos', errors })
      }

      const data = sanitizeCliente(payload)
      const existing = await clientes.findOne({ telefono_principal: data.telefono_principal })
      if (existing) {
        return res.status(409).json({
          error: 'duplicado',
          message: 'Cliente ya guardado',
          cliente: existing
        })
      }

      const numero_cliente = await getNextSequence('clientes')
      const now = new Date()
      const doc = {
        numero_cliente,
        ...data,
        fecha_registro: now,
        fecha_actualizacion: now,
        registrado_por: data.vendedor || 'sin asignar'
      }

      const result = await clientes.insertOne(doc)
      return res.status(201).json({ ...doc, _id: result.insertedId })
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Método no permitido' })
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ error: 'duplicado', message: 'Teléfono ya registrado' })
    }
    return res.status(500).json({ error: 'Error interno', detail: String(err.message || err) })
  }
}
