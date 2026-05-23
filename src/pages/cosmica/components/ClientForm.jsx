import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Save, ArrowLeft, AlertTriangle, Loader2 } from 'lucide-react'
import { PhoneInput } from './PhoneInput'
import { Autocomplete } from './Autocomplete'
import { ESTADOS_MEXICO } from '../data/estados'
import { DuplicateModal } from './DuplicateModal'
import { SuccessModal } from './SuccessModal'
import { Toast } from './Toast'
import {
  createCliente,
  updateCliente,
  buscarPorTelefono,
  listVendedores,
  listGiros,
  listTiposCliente,
  createVendedor,
  createGiro,
  createTipoCliente
} from '../api/client'
import './Autocomplete.css'

const EMPTY = {
  nombre: '',
  telefono_principal: '',
  telefono_secundario: '',
  correo: '',
  giro: '',
  vendedor: '',
  tipo_cliente: '',
  estado: '',
  notas: ''
}

/**
 * Shared form for creating and editing clients.
 * @param {{ mode: 'create' | 'edit', initialData?: object, onSaved?: (cliente: object) => void }} props
 */
export const ClientForm = ({ mode, initialData, onSaved }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialData ? { ...EMPTY, ...initialData } : EMPTY)
  const [vendedores, setVendedores] = useState([])
  const [giros, setGiros] = useState([])
  const [tiposCliente, setTiposCliente] = useState([])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [duplicate, setDuplicate] = useState(null)
  const [success, setSuccess] = useState(null)
  const [phoneCheck, setPhoneCheck] = useState({ status: 'idle', cliente: null })
  const [toast, setToast] = useState({ message: '', type: 'success' })
  const lastCheckedPhone = useRef('')

  useEffect(() => {
    listVendedores().then((r) => setVendedores(r.items || [])).catch(() => setVendedores([]))
    listGiros().then((r) => setGiros(r.items || [])).catch(() => setGiros([]))
    listTiposCliente().then((r) => setTiposCliente(r.items || [])).catch(() => setTiposCliente([]))
  }, [])

  useEffect(() => {
    if (initialData) setForm({ ...EMPTY, ...initialData })
  }, [initialData])

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
    if (field === 'telefono_principal') {
      setPhoneCheck({ status: 'idle', cliente: null })
    }
  }

  const checkDuplicate = async () => {
    const phone = form.telefono_principal
    if (!/^\d{10}$/.test(phone)) return
    if (mode === 'edit' && initialData && initialData.telefono_principal === phone) return
    if (lastCheckedPhone.current === phone) return
    lastCheckedPhone.current = phone

    setPhoneCheck({ status: 'checking', cliente: null })
    try {
      const result = await buscarPorTelefono(phone)
      if (result && result.encontrado && result.cliente) {
        if (mode === 'edit' && initialData && result.cliente._id === initialData._id) {
          setPhoneCheck({ status: 'idle', cliente: null })
          return
        }
        setPhoneCheck({ status: 'duplicate', cliente: result.cliente })
      } else {
        setPhoneCheck({ status: 'available', cliente: null })
      }
    } catch {
      setPhoneCheck({ status: 'idle', cliente: null })
    }
  }

  const validate = () => {
    const next = {}
    if (!form.nombre.trim()) next.nombre = 'Nombre obligatorio'
    if (!/^\d{10}$/.test(form.telefono_principal)) next.telefono_principal = 'Debe tener 10 dígitos'
    if (form.telefono_secundario && !/^\d{10}$/.test(form.telefono_secundario)) {
      next.telefono_secundario = 'Debe tener 10 dígitos'
    }
    if (form.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      next.correo = 'Correo inválido'
    }
    if (!form.vendedor || !form.vendedor.trim()) next.vendedor = 'Vendedor obligatorio'
    if (!form.tipo_cliente || !form.tipo_cliente.trim()) next.tipo_cliente = 'Tipo obligatorio'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      if (mode === 'create') {
        if (phoneCheck.status !== 'duplicate') {
          const found = await buscarPorTelefono(form.telefono_principal)
          if (found && found.encontrado) {
            setDuplicate(found.cliente)
            setSubmitting(false)
            return
          }
        } else {
          setDuplicate(phoneCheck.cliente)
          setSubmitting(false)
          return
        }
        const saved = await createCliente(form)
        setSuccess(saved)
      } else {
        const saved = await updateCliente(initialData._id, form)
        setToast({ message: 'Cambios guardados', type: 'success' })
        if (onSaved) onSaved(saved)
      }
    } catch (err) {
      if (err.status === 409 && err.payload && err.payload.cliente) {
        setDuplicate(err.payload.cliente)
      } else {
        setToast({ message: err.message || 'Error al guardar', type: 'error' })
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleAddVendedor = async (nombre) => {
    const created = await createVendedor(nombre)
    setVendedores((prev) => [...prev, created])
    return created.nombre
  }

  const handleAddGiro = async (nombre) => {
    const created = await createGiro(nombre)
    setGiros((prev) => [...prev, created])
    return created.nombre
  }

  const handleAddTipo = async (nombre) => {
    const created = await createTipoCliente(nombre)
    setTiposCliente((prev) => [...prev, created])
    return created.nombre
  }

  const handleSuccessNew = () => {
    setSuccess(null)
    setForm(EMPTY)
    lastCheckedPhone.current = ''
    setPhoneCheck({ status: 'idle', cliente: null })
  }

  const handleSuccessList = () => {
    setSuccess(null)
    navigate('/cosmica/clientes')
  }

  const handleSuccessEdit = () => {
    if (success && success._id) navigate(`/cosmica/clientes/${success._id}`)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="cosmica-form">
        {mode === 'edit' && initialData && (
          <div className="cosmica-form-meta">
            <div>
              <span className="cosmica-label">Cliente #</span>
              <strong>{initialData.numero_cliente}</strong>
            </div>
            <div>
              <span className="cosmica-label">Registrado</span>
              <strong>
                {initialData.fecha_registro
                  ? new Date(initialData.fecha_registro).toLocaleString('es-MX', {
                      year: 'numeric', month: '2-digit', day: '2-digit',
                      hour: '2-digit', minute: '2-digit'
                    })
                  : '—'}
              </strong>
            </div>
          </div>
        )}

        <div className="cosmica-form-grid">
          <div className="cosmica-field">
            <label className="cosmica-label cosmica-label-required" htmlFor="telefono_principal">
              Teléfono principal
            </label>
            <PhoneInput
              id="telefono_principal"
              value={form.telefono_principal}
              onChange={(v) => set('telefono_principal', v)}
              onBlur={checkDuplicate}
              required
              error={Boolean(errors.telefono_principal)}
            />
            {errors.telefono_principal && (
              <span className="cosmica-error-text">{errors.telefono_principal}</span>
            )}
            {phoneCheck.status === 'checking' && (
              <span className="cosmica-phone-status">
                <Loader2 size={14} className="cosmica-spin" /> Verificando…
              </span>
            )}
            {phoneCheck.status === 'duplicate' && phoneCheck.cliente && (
              <span className="cosmica-phone-status cosmica-phone-warning">
                <AlertTriangle size={14} /> Ya registrado:{' '}
                <strong>{phoneCheck.cliente.nombre}</strong> (#{phoneCheck.cliente.numero_cliente})
                {' · '}
                <button
                  type="button"
                  className="cosmica-link"
                  onClick={() => navigate(`/cosmica/clientes/${phoneCheck.cliente._id}`)}
                >
                  Editar
                </button>
              </span>
            )}
            {phoneCheck.status === 'available' && (
              <span className="cosmica-phone-status cosmica-phone-ok">
                Teléfono disponible
              </span>
            )}
          </div>

          <div className="cosmica-field">
            <label className="cosmica-label cosmica-label-required" htmlFor="nombre">
              Nombre o razón social
            </label>
            <input
              id="nombre"
              type="text"
              className={`cosmica-input ${errors.nombre ? 'cosmica-input-error' : ''}`}
              value={form.nombre}
              onChange={(e) => set('nombre', e.target.value)}
              placeholder="Papelería La Estrella"
              required
            />
            {errors.nombre && <span className="cosmica-error-text">{errors.nombre}</span>}
          </div>

          <div className="cosmica-field">
            <label className="cosmica-label" htmlFor="giro">Giro del negocio</label>
            <Autocomplete
              id="giro"
              value={form.giro}
              options={giros}
              onChange={(v) => set('giro', v)}
              onCreate={handleAddGiro}
              placeholder="Escribe o selecciona…"
            />
          </div>

          <div className="cosmica-field">
            <label className="cosmica-label cosmica-label-required" htmlFor="vendedor">Vendedor</label>
            <Autocomplete
              id="vendedor"
              value={form.vendedor}
              options={vendedores}
              onChange={(v) => set('vendedor', v)}
              onCreate={handleAddVendedor}
              placeholder="Escribe o selecciona…"
              required
              error={Boolean(errors.vendedor)}
            />
            {errors.vendedor && <span className="cosmica-error-text">{errors.vendedor}</span>}
          </div>

          <div className="cosmica-field">
            <label className="cosmica-label cosmica-label-required" htmlFor="tipo_cliente">
              Tipo de cliente
            </label>
            <Autocomplete
              id="tipo_cliente"
              value={form.tipo_cliente}
              options={tiposCliente}
              onChange={(v) => set('tipo_cliente', v)}
              onCreate={handleAddTipo}
              placeholder="Mayorista, Minorista…"
              required
              error={Boolean(errors.tipo_cliente)}
            />
            {errors.tipo_cliente && <span className="cosmica-error-text">{errors.tipo_cliente}</span>}
          </div>

          <div className="cosmica-field">
            <label className="cosmica-label" htmlFor="estado">
              Estado de la República
            </label>
            <Autocomplete
              id="estado"
              value={form.estado}
              options={ESTADOS_MEXICO}
              onChange={(v) => set('estado', v)}
              placeholder="Escribe el estado…"
              error={Boolean(errors.estado)}
            />
            {errors.estado && <span className="cosmica-error-text">{errors.estado}</span>}
          </div>

          <div className="cosmica-field">
            <label className="cosmica-label" htmlFor="telefono_secundario">Teléfono secundario</label>
            <PhoneInput
              id="telefono_secundario"
              value={form.telefono_secundario}
              onChange={(v) => set('telefono_secundario', v)}
              error={Boolean(errors.telefono_secundario)}
            />
            {errors.telefono_secundario && (
              <span className="cosmica-error-text">{errors.telefono_secundario}</span>
            )}
          </div>

          <div className="cosmica-field cosmica-field-wide">
            <label className="cosmica-label" htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              className={`cosmica-input ${errors.correo ? 'cosmica-input-error' : ''}`}
              value={form.correo || ''}
              onChange={(e) => set('correo', e.target.value)}
              placeholder="contacto@negocio.com"
            />
            {errors.correo && <span className="cosmica-error-text">{errors.correo}</span>}
          </div>

          <div className="cosmica-field cosmica-field-wide">
            <label className="cosmica-label" htmlFor="notas">Notas (opcional)</label>
            <textarea
              id="notas"
              className="cosmica-textarea"
              rows={3}
              value={form.notas || ''}
              onChange={(e) => set('notas', e.target.value)}
              placeholder="Observaciones, referencias, productos de interés…"
            />
          </div>
        </div>

        <div className="cosmica-form-actions">
          <button
            type="button"
            className="cosmica-btn cosmica-btn-ghost"
            onClick={() => navigate('/cosmica')}
            disabled={submitting}
          >
            <ArrowLeft size={18} /> Cancelar
          </button>
          <button
            type="submit"
            className="cosmica-btn cosmica-btn-primary"
            disabled={submitting || phoneCheck.status === 'duplicate'}
          >
            <Save size={18} />
            {submitting ? 'Guardando…' : (mode === 'create' ? 'Guardar cliente' : 'Guardar cambios')}
          </button>
        </div>
      </form>

      {duplicate && <DuplicateModal cliente={duplicate} onClose={() => setDuplicate(null)} />}
      {success && (
        <SuccessModal
          cliente={success}
          onNuevo={handleSuccessNew}
          onLista={handleSuccessList}
          onEditar={handleSuccessEdit}
        />
      )}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: toast.type })}
      />
    </>
  )
}

ClientForm.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit']).isRequired,
  initialData: PropTypes.object,
  onSaved: PropTypes.func
}

ClientForm.defaultProps = {
  initialData: null,
  onSaved: undefined
}
