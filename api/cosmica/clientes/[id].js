import { ObjectId } from 'mongodb'
import { getCollection } from '../../_lib/mongodb.js'
import { validateCliente, sanitizeCliente } from '../../_lib/validators.js'

/**
 * GET /api/cosmica/clientes/[id] — fetch a single client by Mongo ObjectId or numero_cliente
 * PUT /api/cosmica/clientes/[id] — update fields on an existing client
 */
export default async function handler(req, res) {
  try {
    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'ID requerido' })

    const clientes = await getCollection('clientes')

    let filter
    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      filter = { _id: new ObjectId(id) }
    } else if (/^\d+$/.test(id)) {
      filter = { numero_cliente: parseInt(id, 10) }
    } else {
      return res.status(400).json({ error: 'ID inválido' })
    }

    if (req.method === 'GET') {
      const cliente = await clientes.findOne(filter)
      if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' })
      return res.status(200).json(cliente)
    }

    if (req.method === 'PUT') {
      const payload = req.body || {}
      const { valid, errors } = validateCliente(payload)
      if (!valid) return res.status(400).json({ error: 'Datos inválidos', errors })

      const data = sanitizeCliente(payload)
      const conflict = await clientes.findOne({
        telefono_principal: data.telefono_principal,
        ...(filter._id ? { _id: { $ne: filter._id } } : { numero_cliente: { $ne: filter.numero_cliente } })
      })
      if (conflict) {
        return res.status(409).json({
          error: 'duplicado',
          message: 'Otro cliente ya usa este teléfono',
          cliente: conflict
        })
      }

      const updateResult = await clientes.findOneAndUpdate(
        filter,
        {
          $set: {
            ...data,
            fecha_actualizacion: new Date()
          }
        },
        { returnDocument: 'after' }
      )

      if (!updateResult) return res.status(404).json({ error: 'Cliente no encontrado' })
      return res.status(200).json(updateResult)
    }

    res.setHeader('Allow', 'GET, PUT')
    return res.status(405).json({ error: 'Método no permitido' })
  } catch (err) {
    return res.status(500).json({ error: 'Error interno', detail: String(err.message || err) })
  }
}
