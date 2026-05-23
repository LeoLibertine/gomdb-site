import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getCliente } from './api/client'
import { ClientForm } from './components/ClientForm'
import { CosmicaNavbar } from './components/CosmicaNavbar'
import './styles/cosmica-theme.css'
import './components/ClientForm.css'

/**
 * Page: edit an existing client by id (Mongo ObjectId or numero_cliente).
 */
const EditarCliente = () => {
  const { id } = useParams()
  const [cliente, setCliente] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getCliente(id)
      .then((c) => { if (mounted) setCliente(c) })
      .catch((err) => { if (mounted) setError(err.message) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [id])

  return (
    <div className="cosmica-app">
      <div className="stars-bg" aria-hidden="true" />
      <CosmicaNavbar />
      <div className="cosmica-container">
        <div className="cosmica-page-header">
          <div>
            <Link to="/cosmica/clientes" className="cosmica-btn cosmica-btn-ghost cosmica-btn-sm">
              <ArrowLeft size={14} /> Volver a clientes
            </Link>
            <h1 className="cosmica-page-title">Editar cliente</h1>
            {cliente && (
              <p className="cosmica-page-subtitle">
                Cliente #{cliente.numero_cliente} · {cliente.nombre}
              </p>
            )}
          </div>
        </div>

        {loading && (
          <div className="cosmica-loading">
            <div className="cosmica-spinner" />
            <span>Cargando cliente…</span>
          </div>
        )}

        {error && !loading && (
          <div className="cosmica-empty">
            <p>{error}</p>
          </div>
        )}

        {cliente && !loading && (
          <ClientForm
            mode="edit"
            initialData={cliente}
            onSaved={(updated) => setCliente(updated)}
          />
        )}
      </div>
    </div>
  )
}

export default EditarCliente
