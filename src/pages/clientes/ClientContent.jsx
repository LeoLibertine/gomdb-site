import { useState, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getClientById } from '../../data/clientsData'
import {
  BankIcon,
  FintechIcon,
  RetailIcon,
  TelecomIcon,
  InsuranceIcon,
  TechIcon,
  DocumentIcon,
  SearchIcon,
  LocationIcon,
  IndustryIcon,
  CompareIcon,
  ArchitectureIcon,
  AIIcon,
  IntegrationIcon,
  StrategyIcon
} from '../../components/icons'
import './ClientContent.css'

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

const getCategoryIcon = (category) => {
  const categoryIcons = {
    'Comparativas': CompareIcon,
    'Casos de Uso': DocumentIcon,
    'Arquitectura': ArchitectureIcon,
    'IA & ML': AIIcon,
    'Integraciones': IntegrationIcon,
    'Estrategia': StrategyIcon,
    'Gobernanza': InsuranceIcon,
    'Infraestructura': ArchitectureIcon,
    'Comercial': DocumentIcon,
    'Sizing': DocumentIcon,
    'Migraciones': IntegrationIcon,
    'FAQ': DocumentIcon,
    'Seguridad': InsuranceIcon,
    'POC': TechIcon,
    'Operaciones': TechIcon,
    'Patrones': ArchitectureIcon,
    'Configuración': TechIcon,
    'Propuestas': StrategyIcon,
    'Optimización': StrategyIcon,
    'General': DocumentIcon
  }
  return categoryIcons[category] || DocumentIcon
}

const ClientContent = () => {
  const { clientId } = useParams()
  const client = getClientById(clientId)

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = useMemo(() => {
    if (!client) return ['all']
    const cats = [...new Set(client.content.map(item => item.category))]
    return ['all', ...cats]
  }, [client])

  const filteredContent = useMemo(() => {
    if (!client) return []
    let filtered = client.content
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }
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

  const groupedContent = useMemo(() => {
    const groups = {}
    filteredContent.forEach(item => {
      if (!groups[item.category]) groups[item.category] = []
      groups[item.category].push(item)
    })
    return groups
  }, [filteredContent])

  if (!client) return <Navigate to="/clientes" replace />

  const ClientIcon = getClientIcon(client.icon)

  return (
    <div className="cc-page">
      {/* Header */}
      <header className="cc-header">
        <div className="cc-header-bg" />
        <div className="cc-header-content">
          <Link to="/clientes" className="cc-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Directorio de Clientes
          </Link>

          <div className="cc-client-info">
            <div className="cc-client-logo">
              <ClientIcon size={64} />
            </div>
            <div className="cc-client-details">
              <h1>{client.name}</h1>
              <div className="cc-meta-row">
                <span className="cc-meta-chip">
                  <IndustryIcon size={14} />
                  {client.industry}
                </span>
                <span className="cc-meta-chip">
                  <LocationIcon size={14} />
                  {client.country}
                </span>
                <span className="cc-meta-chip">
                  <DocumentIcon size={14} />
                  {client.content.length} documentos
                </span>
              </div>
              <p className="cc-client-desc">{client.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="cc-filters">
        <div className="cc-filters-inner">
          <div className="cc-search-box">
            <SearchIcon size={16} className="cc-search-icon" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cc-search-input"
            />
          </div>
          <div className="cc-category-filters">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cc-cat-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category === 'all' ? 'Todos' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="cc-content">
        <div className="cc-content-inner">
          {Object.keys(groupedContent).length > 0 ? (
            Object.entries(groupedContent).map(([category, items]) => {
              const CategoryIcon = getCategoryIcon(category)
              return (
                <div key={category} className="cc-category-section">
                  <h2 className="cc-category-title">
                    <CategoryIcon size={22} className="cc-category-icon" />
                    {category}
                    <span className="cc-category-count">{items.length}</span>
                  </h2>
                  <div className="cc-docs-grid">
                    {items.map((item, index) => (
                      <DocumentCard key={index} item={item} category={category} />
                    ))}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="cc-empty">
              <p>No se encontraron documentos con &ldquo;{searchTerm}&rdquo;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const DocumentCard = ({ item, category }) => {
  const isPlaceholder = item.type === 'placeholder'
  const isExternal = item.path.startsWith('http')
  const isJsx = item.type === 'jsx'
  const DocIcon = getCategoryIcon(category)

  const cardContent = (
    <>
      <div className="cc-doc-icon">
        <DocIcon size={24} />
      </div>
      <div className="cc-doc-body">
        <h3 className="cc-doc-title">{item.title}</h3>
        <p className="cc-doc-desc">{item.description}</p>
        <div className="cc-doc-footer">
          <span className="cc-doc-type">
            {isPlaceholder ? 'Proximamente' : item.type === 'jsx' ? 'React' : 'HTML'}
          </span>
          {!isPlaceholder && (
            <span className="cc-doc-link">
              {isExternal ? 'Abrir' : 'Ver'}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </>
  )

  const className = `cc-doc-card ${isPlaceholder ? 'placeholder' : ''}`

  if (isPlaceholder) return <div className={className}>{cardContent}</div>
  if (isExternal) return <a href={item.path} target="_blank" rel="noopener noreferrer" className={className}>{cardContent}</a>
  if (isJsx) return <Link to={item.path} className={className}>{cardContent}</Link>
  return <a href={item.path} target="_blank" rel="noopener noreferrer" className={className}>{cardContent}</a>
}

export default ClientContent
