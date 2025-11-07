import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllClients } from '../../data/clientsData'
import {
  BankIcon,
  FintechIcon,
  RetailIcon,
  TelecomIcon,
  InsuranceIcon,
  TechIcon,
  SearchIcon,
  LocationIcon,
  IndustryIcon,
  DocumentIcon
} from '../../components/icons'
import './ClientesDirectory.css'

/**
 * ClientesDirectory - Página principal del directorio de clientes
 *
 * Muestra lista de todos los clientes con:
 * - Logo SVG premium y nombre
 * - Industria y país con iconos
 * - Descripción breve
 * - Cantidad de documentos disponibles
 * - Link a página de contenido del cliente
 */

// Helper para obtener el componente de icono según el tipo
const getClientIcon = (iconType) => {
  const icons = {
    bank: BankIcon,
    fintech: FintechIcon,
    retail: RetailIcon,
    telecom: TelecomIcon,
    insurance: InsuranceIcon,
    tech: TechIcon
  }
  return icons[iconType] || BankIcon
}

const ClientesDirectory = () => {
  const clients = getAllClients()
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar clientes por búsqueda
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Agrupar por industria
  const industries = [...new Set(clients.map(c => c.industry))]

  return (
    <div className="clientes-directory">
      {/* Header */}
      <header className="directory-header">
        <div className="header-content">
          <Link to="/" className="back-link">
            ← Inicio
          </Link>
          <h1>Directorio de Clientes</h1>
          <p className="subtitle">
            Accede a documentación técnica, propuestas y casos de uso específicos para cada cliente
          </p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por cliente, industria o país..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <SearchIcon size={20} className="search-icon" />
        </div>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-number">{clients.length}</span>
          <span className="stat-label">Clientes</span>
        </div>
        <div className="stat">
          <span className="stat-number">{industries.length}</span>
          <span className="stat-label">Industrias</span>
        </div>
        <div className="stat">
          <span className="stat-number">
            {clients.reduce((acc, c) => acc + c.content.length, 0)}
          </span>
          <span className="stat-label">Documentos</span>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="clients-grid">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => {
            const ClientIcon = getClientIcon(client.icon)
            return (
              <Link
                key={client.id}
                to={`/clientes/${client.id}`}
                className="client-card"
              >
                <div className="client-card-header">
                  <div className="client-logo-container">
                    <ClientIcon size={56} className="client-logo-svg" />
                  </div>
                  <div className="client-meta">
                    <span className="client-industry">
                      <IndustryIcon size={14} className="meta-icon-svg" />
                      {client.industry}
                    </span>
                    <span className="client-country">
                      <LocationIcon size={14} className="meta-icon-svg" />
                      {client.country}
                    </span>
                  </div>
                </div>

              <h2 className="client-name">{client.name}</h2>
              <p className="client-description">{client.description}</p>

                <div className="client-card-footer">
                  <span className="content-count">
                    <DocumentIcon size={16} className="doc-icon-svg" />
                    {client.content.length} documento{client.content.length !== 1 ? 's' : ''}
                  </span>
                  <span className="view-link">
                    Ver contenido →
                  </span>
                </div>
              </Link>
            )
          })
        ) : (
          <div className="no-results">
            <p>No se encontraron clientes con "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="directory-footer">
        <p>
          🔐 Todo el contenido está protegido. Necesitas un código de acceso para cada cliente.
        </p>
        <p className="footer-note">
          ¿No tienes código? Contacta a tu Solutions Architect de MongoDB
        </p>
      </footer>
    </div>
  )
}

export default ClientesDirectory
