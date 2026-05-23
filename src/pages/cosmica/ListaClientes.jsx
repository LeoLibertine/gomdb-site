import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Download, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { listClientes, listVendedores, exportarUrl } from './api/client'
import { FilterBar } from './components/FilterBar'
import { ClientesTable } from './components/ClientesTable'
import { CosmicaNavbar } from './components/CosmicaNavbar'
import './styles/cosmica-theme.css'
import './components/FilterBar.css'
import './components/ClientesTable.css'

const DEFAULT_FILTERS = {
  busqueda: '',
  vendedor: '',
  estado: '',
  fecha_desde: '',
  fecha_hasta: ''
}

/**
 * Page: searchable + filterable list of all clients with Excel export.
 */
const ListaClientes = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [page, setPage] = useState(1)
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [vendedores, setVendedores] = useState([])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await listClientes({ ...filters, page, limit: 50 })
      setItems(data.items || [])
      setTotal(data.total || 0)
      setTotalPages(data.totalPages || 1)
    } catch {
      setItems([])
      setTotal(0)
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }, [filters, page])

  useEffect(() => {
    const t = setTimeout(fetchData, 200)
    return () => clearTimeout(t)
  }, [fetchData])

  useEffect(() => {
    listVendedores().then((r) => setVendedores(r.items || [])).catch(() => setVendedores([]))
  }, [])

  const handleFiltersChange = (next) => {
    setFilters(next)
    setPage(1)
  }

  const handleClear = () => {
    setFilters(DEFAULT_FILTERS)
    setPage(1)
  }

  return (
    <div className="cosmica-app">
      <div className="stars-bg" aria-hidden="true" />
      <CosmicaNavbar />
      <div className="cosmica-container">
        <div className="cosmica-page-header">
          <div>
            <h1 className="cosmica-page-title">Clientes</h1>
            <p className="cosmica-page-subtitle">
              {total} {total === 1 ? 'cliente registrado' : 'clientes registrados'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a
              href={exportarUrl(filters)}
              className="cosmica-btn cosmica-btn-secondary"
              download
            >
              <Download size={16} /> Exportar Excel
            </a>
            <Link to="/cosmica/nuevo" className="cosmica-btn cosmica-btn-primary">
              <Plus size={16} /> Nuevo cliente
            </Link>
          </div>
        </div>

        <FilterBar
          filters={filters}
          onChange={handleFiltersChange}
          onClear={handleClear}
          vendedores={vendedores}
        />

        <ClientesTable items={items} loading={loading} />

        {totalPages > 1 && (
          <div className="cosmica-pagination">
            <button
              type="button"
              className="cosmica-btn cosmica-btn-secondary cosmica-btn-sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={14} /> Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button
              type="button"
              className="cosmica-btn cosmica-btn-secondary cosmica-btn-sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Siguiente <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .cosmica-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--cosmica-spacing-md);
          margin-top: var(--cosmica-spacing-lg);
          color: var(--cosmica-text-secondary);
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  )
}

export default ListaClientes
