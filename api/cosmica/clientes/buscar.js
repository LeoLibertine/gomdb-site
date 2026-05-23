import { getCollection } from '../../_lib/mongodb.js'

/**
 * GET /api/cosmica/clientes/buscar?telefono=XXXXXXXXXX
 * GET /api/cosmica/clientes/buscar?numero=N
 * Used for duplicate detection before creating a new client and for quick lookup.
 */
export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      return res.status(405).json({ error: 'Método no permitido' })
    }

    const { telefono, numero } = req.query
    if (!telefono && !numero) {
      return res.status(400).json({ error: 'Se requiere telefono o numero' })
    }

    const clientes = await getCollection('clientes')

    let cliente = null
    if (telefono) {
      const phone = String(telefono).replace(/\D/g, '')
      cliente = await clientes.findOne({
        $or: [{ telefono_principal: phone }, { telefono_secundario: phone }]
      })
    } else if (numero) {
      const num = parseInt(numero, 10)
      if (!Number.isFinite(num)) return res.status(400).json({ error: 'Número inválido' })
      cliente = await clientes.findOne({ numero_cliente: num })
    }

    return res.status(200).json({ encontrado: Boolean(cliente), cliente })
  } catch (err) {
    return res.status(500).json({ error: 'Error interno', detail: String(err.message || err) })
  }
}
