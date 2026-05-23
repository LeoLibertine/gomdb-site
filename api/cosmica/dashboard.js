import { getCollection } from '../_lib/mongodb.js'

/**
 * GET /api/cosmica/dashboard — aggregated statistics for the dashboard view.
 * Returns totals, breakdowns by state and vendedor, and recent activity.
 */
export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      return res.status(405).json({ error: 'Método no permitido' })
    }

    const clientes = await getCollection('clientes')
    const now = new Date()
    const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1)
    const inicioSemana = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)

    const [
      total,
      totalMes,
      totalSemana,
      porEstado,
      porVendedor,
      porGiro,
      recientes
    ] = await Promise.all([
      clientes.countDocuments({}),
      clientes.countDocuments({ fecha_registro: { $gte: inicioMes } }),
      clientes.countDocuments({ fecha_registro: { $gte: inicioSemana } }),
      clientes.aggregate([
        { $group: { _id: '$estado', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 15 }
      ]).toArray(),
      clientes.aggregate([
        { $group: { _id: '$vendedor', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]).toArray(),
      clientes.aggregate([
        { $group: { _id: '$giro', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]).toArray(),
      clientes.find().sort({ fecha_registro: -1 }).limit(5).toArray()
    ])

    return res.status(200).json({
      total,
      totalMes,
      totalSemana,
      porEstado: porEstado.map((x) => ({ estado: x._id || 'Sin estado', count: x.count })),
      porVendedor: porVendedor.map((x) => ({ vendedor: x._id || 'Sin asignar', count: x.count })),
      porGiro: porGiro.map((x) => ({ giro: x._id || 'Sin giro', count: x.count })),
      recientes
    })
  } catch (err) {
    return res.status(500).json({ error: 'Error interno', detail: String(err.message || err) })
  }
}
