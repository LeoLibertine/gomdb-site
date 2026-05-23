import * as XLSX from 'xlsx'
import { getCollection } from '../../_lib/mongodb.js'

/**
 * GET /api/cosmica/clientes/exportar — download all (or filtered) clients as .xlsx
 * Supports same filter query params as the list endpoint.
 */
export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      return res.status(405).json({ error: 'Método no permitido' })
    }

    const { vendedor, estado, fecha_desde, fecha_hasta } = req.query
    const filter = {}
    if (vendedor) filter.vendedor = vendedor
    if (estado) filter.estado = estado
    if (fecha_desde || fecha_hasta) {
      filter.fecha_registro = {}
      if (fecha_desde) filter.fecha_registro.$gte = new Date(fecha_desde)
      if (fecha_hasta) filter.fecha_registro.$lte = new Date(fecha_hasta)
    }

    const clientes = await getCollection('clientes')
    const docs = await clientes.find(filter).sort({ numero_cliente: 1 }).toArray()

    const rows = docs.map((c) => ({
      'N° de cliente': c.numero_cliente,
      'Fecha de registro': c.fecha_registro ? new Date(c.fecha_registro).toLocaleDateString('es-MX') : '',
      'Teléfono principal': c.telefono_principal || '',
      'Nombre': c.nombre || '',
      'Tipo de cliente': c.tipo_cliente || '',
      'Vendedor': c.vendedor || '',
      'Giro del negocio': c.giro || '',
      'Estado': c.estado || '',
      'Teléfono secundario': c.telefono_secundario || '',
      'Correo electrónico': c.correo || '',
      'Registrado por': c.registrado_por || '',
      'Última actualización': c.fecha_actualizacion ? new Date(c.fecha_actualizacion).toLocaleString('es-MX') : ''
    }))

    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes')

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
    const filename = `cosmica_clientes_${new Date().toISOString().slice(0, 10)}.xlsx`

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    return res.status(200).send(buffer)
  } catch (err) {
    return res.status(500).json({ error: 'Error interno', detail: String(err.message || err) })
  }
}
