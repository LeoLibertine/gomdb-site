import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllClients } from '../../data/clientsData'
import { useAuthUser } from '../../hooks/useAuthUser'
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
  const { logout } = useAuthUser()

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const industries = [...new Set(clients.map(c => c.industry))]
  const totalDocs = clients.reduce((acc, c) => acc + c.content.length, 0)

  return (
    <div className="directory-page">
      {/* Header */}
      <header className="directory-hero">
        <div className="directory-hero-bg" />
        <div className="directory-hero-content">
          <div className="directory-hero-text">
            <Link to="/" className="directory-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Inicio
            </Link>
            <h1>Portal de Clientes</h1>
            <p className="directory-subtitle">
              Documentacion tecnica, propuestas comerciales y recursos especializados organizados por cliente.
            </p>
          </div>
          <button onClick={logout} className="directory-logout">
            Cerrar Sesion
          </button>
        </div>
      </header>

      {/* Search + Stats */}
      <div className="directory-toolbar">
        <div className="directory-search-wrap">
          <SearchIcon size={18} className="directory-search-icon" />
          <input
            type="text"
            placeholder="Buscar por cliente, industria o pais..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="directory-search"
          />
        </div>
        <div className="directory-stats">
          <div className="directory-stat">
            <span className="stat-val">{clients.length}</span>
            <span className="stat-lbl">Clientes</span>
          </div>
          <div className="directory-stat">
            <span className="stat-val">{industries.length}</span>
            <span className="stat-lbl">Industrias</span>
          </div>
          <div className="directory-stat">
            <span className="stat-val">{totalDocs}</span>
            <span className="stat-lbl">Documentos</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="directory-grid-wrap">
        <div className="directory-grid">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => {
              const ClientIcon = getClientIcon(client.icon)
              return (
                <Link
                  key={client.id}
                  to={`/clientes/${client.id}`}
                  className="dir-card"
                >
                  <div className="dir-card-top">
                    <div className="dir-card-icon">
                      <ClientIcon size={40} />
                    </div>
                    <div className="dir-card-meta">
                      <span className="dir-meta-item">
                        <IndustryIcon size={12} />
                        {client.industry}
                      </span>
                      <span className="dir-meta-item">
                        <LocationIcon size={12} />
                        {client.country}
                      </span>
                    </div>
                  </div>

                  <h2 className="dir-card-name">{client.name}</h2>
                  <p className="dir-card-desc">{client.description}</p>

                  <div className="dir-card-bottom">
                    <span className="dir-card-count">
                      <DocumentIcon size={14} />
                      {client.content.length} documento{client.content.length !== 1 ? 's' : ''}
                    </span>
                    <span className="dir-card-cta">
                      Ver contenido
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              )
            })
          ) : (
            <div className="directory-empty">
              <p>No se encontraron clientes con &ldquo;{searchTerm}&rdquo;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClientesDirectory
