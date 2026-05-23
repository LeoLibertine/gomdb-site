import { ObjectId } from 'mongodb'
import { getCollection, ensureIndexes } from '../_lib/mongodb.js'

/**
 * CRUD for the "tipos_cliente" dropdown list (Compra única, Mayorista, Minorista, Distribuidor, etc.)
 */
export default async function handler(req, res) {
  try {
    await ensureIndexes()
    const tipos = await getCollection('tipos_cliente')

    if (req.method === 'GET') {
      const incluirInactivos = req.query.incluir_inactivos === 'true'
      const filter = incluirInactivos ? {} : { activo: true }
      const items = await tipos.find(filter).sort({ orden: 1, nombre: 1 }).toArray()
      return res.status(200).json({ items })
    }

    if (req.method === 'POST') {
      const nombre = String((req.body && req.body.nombre) || '').trim()
      if (!nombre) return res.status(400).json({ error: 'Nombre requerido' })

      const last = await tipos.find().sort({ orden: -1 }).limit(1).toArray()
      const orden = last.length ? (last[0].orden || 0) + 1 : 1

      try {
        const result = await tipos.insertOne({
          nombre,
          activo: true,
          orden,
          created_at: new Date()
        })
        return res.status(201).json({ _id: result.insertedId, nombre, activo: true, orden })
      } catch (err) {
        if (err.code === 11000) return res.status(409).json({ error: 'Tipo ya existe' })
        throw err
      }
    }

    if (req.method === 'PUT') {
      const { _id, nombre, activo, orden } = req.body || {}
      if (!_id) return res.status(400).json({ error: '_id requerido' })

      const update = {}
      if (typeof nombre === 'string' && nombre.trim()) update.nombre = nombre.trim()
      if (typeof activo === 'boolean') update.activo = activo
      if (typeof orden === 'number') update.orden = orden

      if (Object.keys(update).length === 0) {
        return res.status(400).json({ error: 'Nada para actualizar' })
      }

      const result = await tipos.findOneAndUpdate(
        { _id: new ObjectId(_id) },
        { $set: update },
        { returnDocument: 'after' }
      )
      if (!result) return res.status(404).json({ error: 'Tipo no encontrado' })
      return res.status(200).json(result)
    }

    if (req.method === 'DELETE') {
      const { _id } = req.body || {}
      if (!_id) return res.status(400).json({ error: '_id requerido' })

      const result = await tipos.findOneAndUpdate(
        { _id: new ObjectId(_id) },
        { $set: { activo: false } },
        { returnDocument: 'after' }
      )
      if (!result) return res.status(404).json({ error: 'Tipo no encontrado' })
      return res.status(200).json({ ok: true, tipo: result })
    }

    res.setHeader('Allow', 'GET, POST, PUT, DELETE')
    return res.status(405).json({ error: 'Método no permitido' })
  } catch (err) {
    return res.status(500).json({ error: 'Error interno', detail: String(err.message || err) })
  }
}
