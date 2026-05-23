import React, { useEffect, useState } from 'react'
import { Plus, Trash2, Check, X } from 'lucide-react'
import {
  listVendedores, createVendedor, updateVendedor, deleteVendedor,
  listGiros, createGiro, updateGiro, deleteGiro,
  listTiposCliente, createTipoCliente, updateTipoCliente, deleteTipoCliente
} from './api/client'
import { Toast } from './components/Toast'
import { CosmicaNavbar } from './components/CosmicaNavbar'
import './styles/cosmica-theme.css'
import './ConfiguracionCosmica.css'

/**
 * Page: manage the editable dropdowns (vendedores + giros).
 */
const ConfiguracionCosmica = () => {
  const [vendedores, setVendedores] = useState([])
  const [giros, setGiros] = useState([])
  const [tiposCliente, setTiposCliente] = useState([])
  const [toast, setToast] = useState({ message: '', type: 'success' })

  const reload = () => {
    listVendedores().then((r) => setVendedores(r.items || [])).catch(() => setVendedores([]))
    listGiros().then((r) => setGiros(r.items || [])).catch(() => setGiros([]))
    listTiposCliente().then((r) => setTiposCliente(r.items || [])).catch(() => setTiposCliente([]))
  }

  useEffect(() => { reload() }, [])

  const handleError = (err) => setToast({ message: err.message || 'Error', type: 'error' })
  const handleSuccess = (msg) => setToast({ message: msg, type: 'success' })

  return (
    <div className="cosmica-app">
      <div className="stars-bg" aria-hidden="true" />
      <CosmicaNavbar />
      <div className="cosmica-container">
        <div className="cosmica-page-header">
          <div>
            <h1 className="cosmica-page-title">Configuración</h1>
            <p className="cosmica-page-subtitle">
              Gestiona vendedores y giros del negocio. Los cambios se reflejan en el formulario de registro.
            </p>
          </div>
        </div>

        <div className="cosmica-config-grid">
          <ManagedList
            title="Vendedores"
            items={vendedores}
            onCreate={async (nombre) => {
              try {
                await createVendedor(nombre)
                reload()
                handleSuccess('Vendedor agregado')
              } catch (err) { handleError(err) }
            }}
            onUpdate={async (item, nombre) => {
              try {
                await updateVendedor({ _id: item._id, nombre })
                reload()
                handleSuccess('Vendedor actualizado')
              } catch (err) { handleError(err) }
            }}
            onDelete={async (item) => {
              try {
                await deleteVendedor(item._id)
                reload()
                handleSuccess('Vendedor eliminado')
              } catch (err) { handleError(err) }
            }}
          />

          <ManagedList
            title="Giros del negocio"
            items={giros}
            onCreate={async (nombre) => {
              try {
                await createGiro(nombre)
                reload()
                handleSuccess('Giro agregado')
              } catch (err) { handleError(err) }
            }}
            onUpdate={async (item, nombre) => {
              try {
                await updateGiro({ _id: item._id, nombre })
                reload()
                handleSuccess('Giro actualizado')
              } catch (err) { handleError(err) }
            }}
            onDelete={async (item) => {
              try {
                await deleteGiro(item._id)
                reload()
                handleSuccess('Giro eliminado')
              } catch (err) { handleError(err) }
            }}
          />

          <ManagedList
            title="Tipos de cliente"
            items={tiposCliente}
            onCreate={async (nombre) => {
              try {
                await createTipoCliente(nombre)
                reload()
                handleSuccess('Tipo agregado')
              } catch (err) { handleError(err) }
            }}
            onUpdate={async (item, nombre) => {
              try {
                await updateTipoCliente({ _id: item._id, nombre })
                reload()
                handleSuccess('Tipo actualizado')
              } catch (err) { handleError(err) }
            }}
            onDelete={async (item) => {
              try {
                await deleteTipoCliente(item._id)
                reload()
                handleSuccess('Tipo eliminado')
              } catch (err) { handleError(err) }
            }}
          />
        </div>

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: toast.type })}
        />
      </div>
    </div>
  )
}

const ManagedList = ({ title, items, onCreate, onUpdate, onDelete }) => {
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')

  const handleAdd = async () => {
    const trimmed = newName.trim()
    if (!trimmed) return
    await onCreate(trimmed)
    setNewName('')
  }

  const startEdit = (item) => {
    setEditingId(item._id)
    setEditingName(item.nombre)
  }

  const saveEdit = async (item) => {
    const trimmed = editingName.trim()
    if (!trimmed) return
    await onUpdate(item, trimmed)
    setEditingId(null)
    setEditingName('')
  }

  return (
    <article className="cosmica-card">
      <h2 className="cosmica-config-title">{title}</h2>

      <div className="cosmica-config-add">
        <input
          type="text"
          className="cosmica-input"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder={`Agregar ${title.toLowerCase().slice(0, -1)}…`}
          onKeyDown={(e) => { if (e.key === 'Enter') handleAdd() }}
        />
        <button
          type="button"
          className="cosmica-btn cosmica-btn-primary"
          onClick={handleAdd}
          disabled={!newName.trim()}
        >
          <Plus size={16} /> Agregar
        </button>
      </div>

      <ul className="cosmica-config-list">
        {items.length === 0 && <li className="cosmica-text-muted">Sin elementos todavía</li>}
        {items.map((item) => (
          <li key={item._id}>
            {editingId === item._id ? (
              <>
                <input
                  type="text"
                  className="cosmica-input"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(item)
                    if (e.key === 'Escape') setEditingId(null)
                  }}
                />
                <button
                  type="button"
                  className="cosmica-btn cosmica-btn-primary cosmica-btn-sm"
                  onClick={() => saveEdit(item)}
                >
                  <Check size={14} />
                </button>
                <button
                  type="button"
                  className="cosmica-btn cosmica-btn-ghost cosmica-btn-sm"
                  onClick={() => setEditingId(null)}
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <>
                <span
                  className="cosmica-config-name"
                  onClick={() => startEdit(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') startEdit(item) }}
                >
                  {item.nombre}
                </span>
                <button
                  type="button"
                  className="cosmica-btn cosmica-btn-danger cosmica-btn-sm"
                  onClick={() => {
                    if (window.confirm(`¿Eliminar "${item.nombre}"?`)) onDelete(item)
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default ConfiguracionCosmica
