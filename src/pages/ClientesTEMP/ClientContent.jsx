import React, { useState, useMemo, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getClientById } from '../../data/clientsData'
import { useAuth } from '../../hooks/useAuth'
import { AccessModal } from '../../components/auth/AccessModal'
import './ClientContent.css'

/**
 * ClientContent - Página de contenido específico de un cliente
 *
 * Muestra:
 * - Información del cliente
 * - Lista categorizada de documentos disponibles
 * - Links a cada documento (JSX o HTML)
 * - Protección con código de acceso
 */
const ClientContent = () => {
  const { clientId } = useParams()
  const client = getClientById(clientId)
  const { hasAccess, validateCode, checkAccess } = useAuth(clientId)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Check access on mount
  useEffect(() => {
    if (client) {
      checkAccess()
    }
  }, [clientId, client])

  // Si no existe el cliente, redirigir al directorio
  if (!client) {
    return <Navigate to="/clientes" replace />
  }

  // Si no tiene acceso, mostrar modal
  if (!hasAccess) {
    const handleSubmit = (code) => {
      return validateCode(code)
    }

    const handleCancel = () => {
      window.location.href = '/clientes'
    }

    const displayClient = client.name

    return (
      <AccessModal
        client={displayClient}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    )
  }

  // Obtener todas las categorías únicas
  const categories = useMemo(() => {
    const cats = [...new Set(client.content.map(item => item.category))]
    return ['all', ...cats]
  }, [client])

  // Filtrar contenido por categoría y búsqueda
  const filteredContent = useMemo(() => {
    let filtered = client.content

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      )
    }

    return filtered
  }, [client, selectedCategory, searchTerm])

  // Agrupar por categoría para mostrar
  const groupedContent = useMemo(() => {
    const groups = {}
    filteredContent.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })
    return groups
  }, [filteredContent])

  return (
    <div className="client-content-page">
      {/* Header */}
      <header className="client-header">
        <div className="header-content">
          <Link to="/clientes" className="back-link">
            ← Directorio de Clientes
          </Link>

          <div className="client-info">
            <div className="client-logo-large">{client.logo}</div>
            <div className="client-details">
              <h1>{client.name}</h1>
              <div className="client-meta-info">
                <span className="meta-item">
                  <span className="meta-icon">🏢</span>
                  {client.industry}
                </span>
                <span className="meta-item">
                  <span className="meta-icon">📍</span>
                  {client.country}
                </span>
                <span className="meta-item">
                  <span className="meta-icon">📄</span>
                  {client.content.length} documentos
                </span>
              </div>
              <p className="client-description">{client.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-container">
          {/* Search */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-small"
            />
            <span className="search-icon-small">🔍</span>
          </div>

          {/* Category Filters */}
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category === 'all' ? 'Todos' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content-section">
        <div className="content-container">
          {Object.keys(groupedContent).length > 0 ? (
            Object.entries(groupedContent).map(([category, items]) => (
              <div key={category} className="category-section">
                <h2 className="category-title">{category}</h2>
                <div className="documents-grid">
                  {items.map((item, index) => (
                    <DocumentCard key={index} item={item} clientId={clientId} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-content">
              <p>No se encontraron documentos con "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * DocumentCard - Tarjeta individual de documento
 */
const DocumentCard = ({ item, clientId }) => {
  const isPlaceholder = item.type === 'placeholder'
  const isExternal = item.path.startsWith('http')
  const isJsx = item.type === 'jsx'

  // Si es placeholder, no renderizar link
  if (isPlaceholder) {
    return (
      <div className="document-card placeholder">
        <div className="document-icon">📝</div>
        <h3 className="document-title">{item.title}</h3>
        <p className="document-description">{item.description}</p>
        <div className="document-footer">
          <span className="document-type">Próximamente</span>
        </div>
      </div>
    )
  }

  // Si es externo, usar <a>
  if (isExternal) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        className="document-card"
      >
        <div className="document-icon">{isJsx ? '⚛️' : '📄'}</div>
        <h3 className="document-title">{item.title}</h3>
        <p className="document-description">{item.description}</p>
        <div className="document-footer">
          <span className="document-type">{item.type === 'jsx' ? 'React' : 'HTML'}</span>
          <span className="document-link">Abrir →</span>
        </div>
      </a>
    )
  }

  // Si es JSX, usar Link de React Router
  if (isJsx) {
    return (
      <Link to={item.path} className="document-card">
        <div className="document-icon">⚛️</div>
        <h3 className="document-title">{item.title}</h3>
        <p className="document-description">{item.description}</p>
        <div className="document-footer">
          <span className="document-type">React</span>
          <span className="document-link">Ver →</span>
        </div>
      </Link>
    )
  }

  // HTML estático - usar <a>
  return (
    <a href={item.path} className="document-card" target="_blank" rel="noopener noreferrer">
      <div className="document-icon">📄</div>
      <h3 className="document-title">{item.title}</h3>
      <p className="document-description">{item.description}</p>
      <div className="document-footer">
        <span className="document-type">HTML</span>
        <span className="document-link">Abrir →</span>
      </div>
    </a>
  )
}

export default ClientContent
