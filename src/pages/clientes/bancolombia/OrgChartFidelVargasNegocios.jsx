import React, { useState } from 'react'
import { ClientDocumentLayout } from '../../../components/layouts'
import {
  Building2 as BankIcon,
  Users as UsersIcon,
  Target as TargetIcon,
  TrendingUp as GrowthIcon,
  Database as DatabaseIcon,
  Zap as BoltIcon,
  ShoppingCart as CartIcon,
  Store as StoreIcon,
  Code as CodeIcon,
  Search as SearchIcon,
  CreditCard as PaymentIcon,
  Home as HomeIcon,
  Car as CarIcon,
  Heart as HeartIcon,
  Package as PackageIcon,
  Cpu as ApiIcon,
  Globe as GlobeIcon,
  Briefcase as BusinessIcon,
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import './OrgChartAlvaroCarmona.css'

// Componente colapsable para Managers
const ManagersSection = ({ directorName, children, searchTerm = '' }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Auto-expand si hay búsqueda activa
  React.useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      setIsOpen(true)
    }
  }, [searchTerm])

  return (
    <div className="managers-section">
      <button
        className="managers-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Users size={20} />
        <span>Ver Managers de {directorName}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="managers-content">
          {children}
        </div>
      )}
    </div>
  )
}

export const OrgChartFidelVargasNegocios = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Helper para determinar si una persona coincide con la búsqueda
  const matchesSearch = (personName) => {
    if (!searchTerm) return true
    return personName.toLowerCase().includes(searchTerm.toLowerCase())
  }

  // Helper para resaltar texto que coincide con la búsqueda
  const highlightText = (text) => {
    if (!searchTerm || !text) return text

    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? <mark key={index} className="highlight">{part}</mark> : part
    )
  }

  return (
    <ClientDocumentLayout
      client="Bancolombia"
      title="Org Chart Fidel Vargas Negocios - Use Cases MongoDB"
      subtitle="VP Tecnología para Negocios (Marketplaces, BaaS, ECOs)"
      author="Leo Alarcón"
      date="2025-01-12"
      tags={['orgchart', 'use-cases', 'baas', 'marketplace', 'arquitectura']}
      showExportButton={true}
    >
      {/* Hero Section */}
      <div className="org-hero">
        <div className="org-hero-icon">
          <BusinessIcon size={64} />
        </div>
        <h1>BANCOLOMBIA ORG CHART - FIDEL VARGAS (NEGOCIOS)</h1>
        <h2>Fidel Andres Vargas Londoño</h2>
        <p className="org-subtitle">Vicepresidente Tecnología para Negocios (Marketplaces, BaaS, ECOs)</p>
        <p>Casos de Uso Estratégicos de MongoDB por Persona - Enfoque en nuevos negocios digitales: Marketplaces, Banking-as-a-Service, Ecosistemas Digitales y Productos Especializados.</p>
      </div>

      {/* Search Bar */}
      <div className="org-search-container">
        <div className="org-search-wrapper">
          <SearchIcon size={20} className="search-icon" />
          <input
            type="text"
            className="org-search-input"
            placeholder="Buscar persona por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="search-clear"
              onClick={() => setSearchTerm('')}
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>
        {searchTerm && (
          <p className="search-hint">
            Buscando: "<strong>{searchTerm}</strong>" - Las secciones de managers se expandirán automáticamente
          </p>
        )}
      </div>

      {/* VP SECTION */}
      <div className="org-section">
        <div className="section-header">
          <TargetIcon size={32} style={{ color: '#5644D4' }} />
          <h2>VP LEVEL</h2>
        </div>

        <div className={`persona-card vp-card ${!matchesSearch('Fidel Andres Vargas Londoño') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar">
              <BusinessIcon size={40} style={{ color: '#5644D4' }} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Fidel Andres Vargas Londoño')}</h3>
              <p className="persona-role">Vicepresidente Tecnología para Negocios</p>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge strategic">STRATEGIC</span>
            <h4 className="use-case-title">
              <DatabaseIcon size={24} />
              Business Technology Portfolio Dashboard
            </h4>
            <p className="use-case-desc">
              Vista ejecutiva y consolidada del performance de todas las nuevas líneas de negocio digitales
              (DIG, ECO, BAAS, Marketplaces), midiendo KPIs de onboarding de partners, TPV (Total Processing Volume) y ROI de iniciativas.
            </p>
            <div className="tech-features">
              <div className="tech-feature">
                <strong>Atlas Data Federation:</strong>
                <span>Consolida métricas de múltiples líneas de negocio (ej. BaaS + Marketplace) en un solo query sin mover datos.</span>
              </div>
              <div className="tech-feature">
                <strong>Atlas Charts:</strong>
                <span>Dashboards ejecutivos en tiempo real embebidos directamente en portales de gestión.</span>
              </div>
              <div className="tech-feature">
                <strong>Aggregation Pipeline:</strong>
                <span>Trazabilidad del ROI y KPIs complejos (ej. "Costo de Adquisición de Partner" vs "Valor de Vida del Partner").</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DIRECTORES SECTION */}
      <div className="org-section">
        <div className="section-header">
          <UsersIcon size={32} style={{ color: '#00ED64' }} />
          <h2>DIRECTORES</h2>
        </div>

        {/* Director 1: Mariluz Echeverri */}
        <div className={`persona-card director-card ${!matchesSearch('Mariluz De La Inmaculada Echeverri') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar">
              <GlobeIcon size={32} style={{ color: '#00ED64' }} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Mariluz De La Inmaculada Echeverri')}</h3>
              <p className="persona-role">Líder Técnico ECO DIG y TEC Bazar</p>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge high-priority">HIGH PRIORITY</span>
            <h4 className="use-case-title">
              <ApiIcon size={20} />
              Digital Ecosystem Platform (Partner Integration)
            </h4>
            <p className="use-case-desc">
              Plataforma de ecosistema digital para integrar partners (Fintechs, retailers) de forma rápida y segura,
              ofreciendo un catálogo de servicios.
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Arquitectura Multi-Tenant:</strong>
                <span>Aislamiento de datos seguro por partner (por BD, colección o documento con shard key).</span>
              </div>
              <div className="tech-feature">
                <strong>Esquema Flexible:</strong>
                <span>Permite integrar partners con diferentes modelos de datos sin fricción ni migraciones de esquema.</span>
              </div>
              <div className="tech-feature">
                <strong>RBAC Granular y API Keys:</strong>
                <span>Gobernabilidad estricta sobre quién puede ver y hacer qué a nivel de API.</span>
              </div>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge medium-priority">MEDIUM PRIORITY</span>
            <h4 className="use-case-title">
              <PackageIcon size={20} />
              TEC Bazar (Internal Tech Marketplace)
            </h4>
            <p className="use-case-desc">
              Marketplace interno de servicios tecnológicos (APIs, componentes reusables, sandboxes) para acelerar el desarrollo.
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Catálogo de Servicios Flexible:</strong>
                <span>Modela diversos "productos" (APIs, datasets, servicios) en un catálogo unificado.</span>
              </div>
              <div className="tech-feature">
                <strong>Atlas Search:</strong>
                <span>Búsqueda y descubrimiento de servicios para developers (ej. "encontrar API de originación de crédito").</span>
              </div>
              <div className="tech-feature">
                <strong>Aggregation Pipeline:</strong>
                <span>Analítica de consumo, popularidad y chargeback de servicios internos.</span>
              </div>
            </div>
          </div>

          {/* Managers bajo Mariluz */}
          <ManagersSection directorName="Mariluz Echeverri" searchTerm={searchTerm}>
            <div className={`manager-card ${!matchesSearch('Edwin Torres Cardona') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <CodeIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Edwin Torres Cardona')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC EXP Digital 3 TI</p>
                  <p className="reports-to">Reports to: Mariluz Echeverri</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <SearchIcon size={18} />
                  Digital Experience Knowledge Base
                </h5>
                <p className="use-case-desc">
                  Base de conocimiento para experiencias digitales con Atlas Search para relevancia, document versioning y content recommendations con ML.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('Sebastian Amezquita') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <CodeIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Sebastian Amezquita')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC Portal Contenidos 1 TI</p>
                  <p className="reports-to">Reports to: Mariluz Echeverri</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <DatabaseIcon size={18} />
                  Headless CMS (Content Management System)
                </h5>
                <p className="use-case-desc">
                  CMS headless centralizado con esquema flexible para content types, GridFS para assets, y Change Streams para propagación a CDNs.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('Yohana Monsalve Suarez') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <CodeIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Yohana Monsalve Suarez')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC EXP Digital 4 TI</p>
                  <p className="reports-to">Reports to: Mariluz Echeverri</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <GrowthIcon size={18} />
                  Customer Experience Analytics
                </h5>
                <p className="use-case-desc">
                  Time Series para behavioral data, aggregation para journey analytics y session replay metadata.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('Fredy Yoana Roman') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <CodeIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Fredy Yoana Roman')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC Portal Contenidos 2 TI</p>
                  <p className="reports-to">Reports to: Mariluz Echeverri</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <GlobeIcon size={18} />
                  Multi-Channel Content Distribution
                </h5>
                <p className="use-case-desc">
                  Change Streams para content propagation, CDN integration metadata y content targeting rules.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('Maria Alejandra Pareja Velez') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <CodeIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Maria Alejandra Pareja Velez')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC Mecánico TI</p>
                  <p className="reports-to">Reports to: Mariluz Echeverri</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <TargetIcon size={18} />
                  Service Request Management (Ticketing)
                </h5>
                <p className="use-case-desc">
                  Workflow state machines, SLA tracking con TTL indexes y ticket routing con aggregations.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('Juan Arturo Villegas Gomez') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <CodeIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Juan Arturo Villegas Gomez')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC EXP Digital 1 TI</p>
                  <p className="reports-to">Reports to: Mariluz Echeverri</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <GrowthIcon size={18} />
                  Digital Channel Optimization (A/B Testing)
                </h5>
                <p className="use-case-desc">
                  Experiment metadata, real-time metrics con Time Series y statistical analysis con aggregations.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('Camila Andrea Arango') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <CodeIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Camila Andrea Arango')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC EXP Digital 2 TI</p>
                  <p className="reports-to">Reports to: Mariluz Echeverri</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <TargetIcon size={18} />
                  Personalization Engine
                </h5>
                <p className="use-case-desc">
                  User profiles con embedded preferences, aggregation para recommendations y Change Streams para real-time updates.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('Alejandro Botero Agudelo') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <CodeIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Alejandro Botero Agudelo')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC EXP Digital 3 TI</p>
                  <p className="reports-to">Reports to: Mariluz Echeverri</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <BoltIcon size={18} />
                  Digital Journey Orchestration
                </h5>
                <p className="use-case-desc">
                  Journey definitions con flexible schema, state tracking y event sourcing con Change Streams.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('David Alonso Silva') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <CodeIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('David Alonso Silva')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC EXP Digital 3 TI</p>
                  <p className="reports-to">Reports to: Mariluz Echeverri</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <GrowthIcon size={18} />
                  Conversion Rate Optimization Platform
                </h5>
                <p className="use-case-desc">
                  Funnel analytics con aggregations, Time Series para conversion metrics y attribution modeling.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('Adriana Maria Botero') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <CodeIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Adriana Maria Botero')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC EXP Digital 1 TI</p>
                  <p className="reports-to">Reports to: Mariluz Echeverri</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <DatabaseIcon size={18} />
                  Digital Product Analytics
                </h5>
                <p className="use-case-desc">
                  Event tracking con Time Series, cohort analysis con aggregations y product usage metrics.
                </p>
              </div>
            </div>
          </ManagersSection>
        </div>

        {/* Director 2: Andres Molina */}
        <div className={`persona-card director-card ${!matchesSearch('Andres Felipe Molina Sanabria') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar">
              <HomeIcon size={32} style={{ color: '#00ED64' }} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Andres Felipe Molina Sanabria')}</h3>
              <p className="persona-role">Líder Técnico ECO TU360 Inmobiliario TI</p>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge high-priority">HIGH PRIORITY</span>
            <h4 className="use-case-title">
              <HomeIcon size={20} />
              Real Estate 360 Platform (TU360)
            </h4>
            <p className="use-case-desc">
              Plataforma 360 de servicios inmobiliarios que consolida el journey completo: búsqueda de propiedades,
              avalúos, solicitud de créditos y servicios legales.
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Geospatial Queries:</strong>
                <span>Búsqueda nativa de propiedades (ej. "en un polígono", "cerca de punto X") y analítica de mercado.</span>
              </div>
              <div className="tech-feature">
                <strong>GridFS:</strong>
                <span>Almacenamiento de documentos asociados (planos, fotos de alta resolución, contratos, certificados).</span>
              </div>
              <div className="tech-feature">
                <strong>Aggregation Pipeline:</strong>
                <span>Analítica de mercado en tiempo real y scoring de propiedades.</span>
              </div>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge medium-priority">MEDIUM PRIORITY</span>
            <h4 className="use-case-title">
              <SearchIcon size={20} />
              Property Marketplace (Matching Engine)
            </h4>
            <p className="use-case-desc">
              Marketplace de propiedades con un motor de matching inteligente que conecta compradores, vendedores, arrendatarios y agentes.
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Atlas Search con Filtros Geoespaciales:</strong>
                <span>Búsqueda facetada (precio, habitaciones, zona) combinada con relevancia geográfica.</span>
              </div>
              <div className="tech-feature">
                <strong>Change Streams:</strong>
                <span>Notificaciones en tiempo real sobre nuevas propiedades que hacen match con búsquedas guardadas.</span>
              </div>
            </div>
          </div>

          {/* Managers bajo Andres Molina */}
          <ManagersSection directorName="Andres Molina" searchTerm={searchTerm}>
            <div className={`manager-card ${!matchesSearch('Juan Felipe Londoño') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <HomeIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Juan Felipe Londoño')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento ECO TU360 Inmobiliario 1 TI</p>
                  <p className="reports-to">Reports to: Andres Molina</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <DatabaseIcon size={18} />
                  Property Valuation Platform (AVM)
                </h5>
                <p className="use-case-desc">
                  Plataforma de avalúos automáticos con Geospatial queries para comparables, ML model metadata y historical valuations con Time Series.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('Laura Escobar Cortez') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <HomeIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Laura Escobar Cortez')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento ECO TU360 Inmobiliario 1 TI</p>
                  <p className="reports-to">Reports to: Andres Molina</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <TargetIcon size={18} />
                  Construction Project Management
                </h5>
                <p className="use-case-desc">
                  Milestone tracking con embedded arrays, document management con GridFS y progress analytics.
                </p>
              </div>
            </div>
          </ManagersSection>
        </div>

        {/* Director 3: Christian Restrepo */}
        <div className={`persona-card director-card ${!matchesSearch('Christian Alexander Restrepo Hernandez') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar">
              <HeartIcon size={32} style={{ color: '#00ED64' }} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Christian Alexander Restrepo Hernandez')}</h3>
              <p className="persona-role">Líder Técnico ECO Bienestar Financiero TI</p>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge high-priority">HIGH PRIORITY</span>
            <h4 className="use-case-title">
              <HeartIcon size={20} />
              Financial Wellness Platform (Asesor Personalizado)
            </h4>
            <p className="use-case-desc">
              Plataforma de bienestar financiero que analiza la salud financiera del cliente y entrega consejos
              y productos personalizados (no genéricos).
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Aggregation Pipeline:</strong>
                <span>Motor de scoring de salud financiera que se ejecuta en tiempo real sobre el perfil del cliente.</span>
              </div>
              <div className="tech-feature">
                <strong>Modelo de Documento (Embebido):</strong>
                <span>Almacena el perfil 360, metas y recomendaciones en un solo documento para lecturas ultra-rápidas.</span>
              </div>
              <div className="tech-feature">
                <strong>Time Series Collections:</strong>
                <span>Seguimiento del progreso del cliente (evolución de ahorros, puntaje de crédito, reducción de deuda).</span>
              </div>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge medium-priority">MEDIUM PRIORITY</span>
            <h4 className="use-case-title">
              <DatabaseIcon size={20} />
              Personal Finance Management (PFM)
            </h4>
            <p className="use-case-desc">
              Herramientas de PFM para categorización automática de gastos, creación de presupuestos y definición de metas de ahorro.
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Aggregation Pipeline:</strong>
                <span>Motor de categorización de transacciones (ej. "IF 'Rappi' THEN 'Domicilios'").</span>
              </div>
              <div className="tech-feature">
                <strong>Change Streams:</strong>
                <span>Alertas en tiempo real (ej. "estás a punto de exceder tu presupuesto de 'Ocio'").</span>
              </div>
            </div>
          </div>

          {/* Managers bajo Christian Restrepo */}
          <ManagersSection directorName="Christian Restrepo" searchTerm={searchTerm}>
            <div className={`manager-card ${!matchesSearch('Juan Camilo Agudelo') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <HeartIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Juan Camilo Agudelo')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC Bienestar Financiero 2 TI</p>
                  <p className="reports-to">Reports to: Christian Restrepo</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <CodeIcon size={18} />
                  Financial Education Platform
                </h5>
                <p className="use-case-desc">
                  Learning paths con flexible schema, progress tracking, gamification metadata y content recommendations.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('Cristian Vargas Ramirez') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <HeartIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Cristian Vargas Ramirez')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC Bienestar Financiero 1 TI</p>
                  <p className="reports-to">Reports to: Christian Restrepo</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <TargetIcon size={18} />
                  Budget & Savings Goals
                </h5>
                <p className="use-case-desc">
                  Goal tracking con milestones, budget categories flexible, alerts con Change Streams y progress analytics.
                </p>
              </div>
            </div>
          </ManagersSection>
        </div>

        {/* Director 4: Guido Bautista */}
        <div className={`persona-card director-card ${!matchesSearch('Guido Andres Bautista Molfin') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar">
              <ApiIcon size={32} style={{ color: '#00ED64' }} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Guido Andres Bautista Molfin')}</h3>
              <p className="persona-role">Líder Técnico ECO Finanzas BAAS TI</p>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge high-priority">HIGH PRIORITY</span>
            <h4 className="use-case-title">
              <ApiIcon size={20} />
              Banking-as-a-Service (BaaS) Platform
            </h4>
            <p className="use-case-desc">
              Plataforma BaaS multi-tenant para que partners (Fintechs, retailers) puedan embeber servicios bancarios
              (ej. "crear cuenta", "enviar pago") en sus propias apps.
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Arquitectura Multi-Tenant:</strong>
                <span>Aislamiento total (por BD o schema) para cada partner (Fintech X no puede ver datos de Fintech Y).</span>
              </div>
              <div className="tech-feature">
                <strong>Atlas Data API:</strong>
                <span>Expone los servicios de la plataforma como APIs REST/GraphQL seguras, acelerando el time-to-market.</span>
              </div>
              <div className="tech-feature">
                <strong>Queryable Encryption:</strong>
                <span>Garantiza que Bancolombia no pueda ver los datos PII de los clientes de sus partners BaaS.</span>
              </div>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge high-priority">HIGH PRIORITY</span>
            <h4 className="use-case-title">
              <BoltIcon size={20} />
              Embedded Finance APIs (White-Label)
            </h4>
            <p className="use-case-desc">
              APIs white-label de alto performance para partners estratégicos (ej. "crédito en el checkout de un e-commerce").
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Backend de API de Alto Performance (p95 &lt; 20ms):</strong>
                <span>Latencia mínima para no afectar la experiencia del partner.</span>
              </div>
              <div className="tech-feature">
                <strong>Esquema Flexible:</strong>
                <span>Permite configuraciones y branding (white-label) por partner sin cambiar el código.</span>
              </div>
            </div>
          </div>

          {/* Managers bajo Guido Bautista */}
          <ManagersSection directorName="Guido Bautista" searchTerm={searchTerm}>
            <div className={`manager-card ${!matchesSearch('Maria Victoria Ospina') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <ApiIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Maria Victoria Ospina')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC Finanzas Abiertas</p>
                  <p className="reports-to">Reports to: Guido Bautista</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <GlobeIcon size={18} />
                  Open Banking Platform
                </h5>
                <p className="use-case-desc">
                  Consent management con TTL indexes, API gateway metadata y RBAC granular para cumplimiento regulatorio.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('Andres Esteban Mejia') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <ApiIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Andres Esteban Mejia')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento Marketplace TI</p>
                  <p className="reports-to">Reports to: Guido Bautista</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <StoreIcon size={18} />
                  Financial Services Marketplace
                </h5>
                <p className="use-case-desc">
                  Provider catalog flexible, rating & reviews, transaction processing y commission tracking.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('Johvany Esteban') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <ApiIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Johvany Esteban')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC BAAS TI</p>
                  <p className="reports-to">Reports to: Guido Bautista</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <BoltIcon size={18} />
                  BaaS API Gateway
                </h5>
                <p className="use-case-desc">
                  API metadata management, rate limiting configuration, usage analytics y partner onboarding.
                </p>
              </div>
            </div>
          </ManagersSection>
        </div>

        {/* Director 5: Laura Villa */}
        <div className={`persona-card director-card ${!matchesSearch('Laura Maria Villa Mendoza') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar">
              <CartIcon size={32} style={{ color: '#00ED64' }} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Laura Maria Villa Mendoza')}</h3>
              <p className="persona-role">Líder Técnico ECO Marketplaces TU360 Compras TI</p>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge high-priority">HIGH PRIORITY</span>
            <h4 className="use-case-title">
              <CartIcon size={20} />
              TU360 Shopping Marketplace (E-commerce)
            </h4>
            <p className="use-case-desc">
              Marketplace de e-commerce (estilo Amazon/MercadoLibre) integrado con el ecosistema financiero del banco.
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Patrón de Catálogo de Productos:</strong>
                <span>Manejo de millones de SKUs con atributos flexibles y variantes (talla, color).</span>
              </div>
              <div className="tech-feature">
                <strong>Atlas Search:</strong>
                <span>Búsqueda de productos full-text, facetada y con typo-tolerance.</span>
              </div>
              <div className="tech-feature">
                <strong>ACID Transactions:</strong>
                <span>Gestión de inventario en tiempo real (evitar sobre-venta) y procesamiento de órdenes atómico.</span>
              </div>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge high-priority">HIGH PRIORITY</span>
            <h4 className="use-case-title">
              <PaymentIcon size={20} />
              Buy Now Pay Later (BNPL) Platform
            </h4>
            <p className="use-case-desc">
              Plataforma de financiamiento en punto de venta (digital y físico) con decisiones de crédito instantáneas (en &lt;1 segundo).
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>ACID Transactions:</strong>
                <span>Atomicidad de la decisión y desembolso del crédito en el momento del checkout.</span>
              </div>
              <div className="tech-feature">
                <strong>Aggregation Pipeline (Motor de Reglas):</strong>
                <span>Evaluación en tiempo real de reglas de fraude y scoring de riesgo.</span>
              </div>
            </div>
          </div>

          {/* Managers bajo Laura Villa */}
          <ManagersSection directorName="Laura Villa" searchTerm={searchTerm}>
            <div className={`manager-card ${!matchesSearch('Arley David Montoya') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <CartIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Arley David Montoya')}</h4>
                  <p className="persona-role">Líder Línea de Conocimiento ECO TU360 Compras TI</p>
                  <p className="reports-to">Reports to: Laura Villa</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <StoreIcon size={18} />
                  E-commerce Platform
                </h5>
                <p className="use-case-desc">
                  Product catalog con millions de SKUs, inventory sync en tiempo real y order management con ACID transactions.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('Christian Camilo Duque') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <CartIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Christian Camilo Duque')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC TU360 Compras 1 TI</p>
                  <p className="reports-to">Reports to: Laura Villa</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <PackageIcon size={18} />
                  Merchant Management Platform
                </h5>
                <p className="use-case-desc">
                  Multi-tenant merchant data, settlement calculations con aggregations y performance analytics.
                </p>
              </div>
            </div>
          </ManagersSection>
        </div>

        {/* Director 6: Carolina Marin */}
        <div className={`persona-card director-card ${!matchesSearch('Carolina Marin Salazar') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar">
              <CarIcon size={32} style={{ color: '#00ED64' }} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Carolina Marin Salazar')}</h3>
              <p className="persona-role">Líder Técnico ECO TU360 Movilidad TI</p>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge medium-priority">MEDIUM PRIORITY</span>
            <h4 className="use-case-title">
              <CarIcon size={20} />
              Mobility-as-a-Service (MaaS) Platform
            </h4>
            <p className="use-case-desc">
              Plataforma de movilidad "TU360 Auto" que integra el journey completo: búsqueda de vehículo, financiamiento, seguros y servicios post-venta.
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Catálogo de Inventario de Vehículos:</strong>
                <span>Esquema flexible para modelar vehículos (nuevos, usados) y sus atributos.</span>
              </div>
              <div className="tech-feature">
                <strong>Geospatial Queries:</strong>
                <span>Búsqueda de concesionarios y vehículos por ubicación.</span>
              </div>
              <div className="tech-feature">
                <strong>State Machine Pattern (Workflows):</strong>
                <span>Gestión del flujo de financiamiento y aprobación de seguros en un solo proceso.</span>
              </div>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge strategic">STRATEGIC</span>
            <h4 className="use-case-title">
              <DatabaseIcon size={20} />
              Connected Car Data Platform
            </h4>
            <p className="use-case-desc">
              Plataforma de ingesta y análisis de datos de vehículos conectados (IoT) para seguros basados en uso (UBI) y mantenimiento predictivo.
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Time Series Collections:</strong>
                <span>Ingesta de alta velocidad (1M+ escrituras/seg) y compresión (90%) de telemetría (GPS, velocidad, aceleración).</span>
              </div>
              <div className="tech-feature">
                <strong>Patrones de IoT:</strong>
                <span>Device twins para manejar el estado de cada vehículo.</span>
              </div>
            </div>
          </div>

          {/* Managers bajo Carolina Marin */}
          <ManagersSection directorName="Carolina Marin" searchTerm={searchTerm}>
            <div className={`manager-card ${!matchesSearch('Ronald Andres Suarez') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <CarIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Ronald Andres Suarez')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento FC ECO TU360 Movilidad TI</p>
                  <p className="reports-to">Reports to: Carolina Marin</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <PaymentIcon size={18} />
                  Vehicle Financing Platform
                </h5>
                <p className="use-case-desc">
                  Credit application workflows, vehicle inventory integration, payment scheduling e insurance bundling.
                </p>
              </div>
            </div>
          </ManagersSection>
        </div>

        {/* Director 7: Oscar Cardona */}
        <div className={`persona-card director-card ${!matchesSearch('Oscar Eduardo Cardona Gonzalez') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar">
              <BusinessIcon size={32} style={{ color: '#00ED64' }} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Oscar Eduardo Cardona Gonzalez')}</h3>
              <p className="persona-role">Líder Técnico ECO NEG Digitales y Transversales</p>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge strategic">STRATEGIC</span>
            <h4 className="use-case-title">
              <BoltIcon size={20} />
              Digital Business Hub (Event-Driven)
            </h4>
            <p className="use-case-desc">
              Hub de negocios digitales que opera como una arquitectura event-driven, permitiendo que los ecosistemas reaccionen a eventos de otros.
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Change Streams (como Event Bus):</strong>
                <span>Los sistemas (ej. "Movilidad") "escuchan" eventos de otros (ej. "Bienestar Financiero").</span>
              </div>
              <div className="tech-feature">
                <strong>Esquema Flexible:</strong>
                <span>Almacenamiento de logs de eventos heterogéneos para auditoría y replay.</span>
              </div>
            </div>
          </div>

          <div className="use-case-container">
            <span className="use-case-badge high-priority">HIGH PRIORITY</span>
            <h4 className="use-case-title">
              <TargetIcon size={20} />
              Cross-Selling Engine
            </h4>
            <p className="use-case-desc">
              Motor de cross-selling que identifica oportunidades entre los distintos negocios digitales
              (ej. "ofrecer crédito de movilidad a un usuario del marketplace").
            </p>
            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Aggregation Pipeline:</strong>
                <span>Ejecución de modelos de propensión (ej. "quién es probable que compre X").</span>
              </div>
              <div className="tech-feature">
                <strong>$graphLookup (Graph Queries):</strong>
                <span>Análisis de afinidad de productos y relaciones entre clientes y servicios.</span>
              </div>
            </div>
          </div>

          {/* Managers bajo Oscar Cardona */}
          <ManagersSection directorName="Oscar Cardona" searchTerm={searchTerm}>
            <div className={`manager-card ${!matchesSearch('Marvin Andres Marin Valencia') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <DatabaseIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('Marvin Andres Marin Valencia')}</h4>
                  <p className="persona-role">Líder Línea de Conocimiento ECO Transversal TI</p>
                  <p className="reports-to">Reports to: Oscar Cardona</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <GrowthIcon size={18} />
                  Cross-Business Analytics
                </h5>
                <p className="use-case-desc">
                  Data Federation para queries cross-collections, aggregations para consolidated metrics y BI Connector.
                </p>
              </div>
            </div>

            <div className={`manager-card ${!matchesSearch('David Alexander Lopez') ? 'search-hidden' : ''}`}>
              <div className="persona-header">
                <div className="persona-avatar manager-avatar">
                  <StoreIcon size={24} style={{ color: '#5644D4' }} />
                </div>
                <div className="persona-info">
                  <h4>{highlightText('David Alexander Lopez')}</h4>
                  <p className="persona-role">Líder Línea Conocimiento Marketplace TI</p>
                  <p className="reports-to">Reports to: Oscar Cardona</p>
                </div>
              </div>
              <div className="use-case-container compact">
                <h5>
                  <GlobeIcon size={18} />
                  Universal Marketplace Platform
                </h5>
                <p className="use-case-desc">
                  Multi-marketplace architecture, unified search con Atlas Search y cross-marketplace recommendations.
                </p>
              </div>
            </div>
          </ManagersSection>
        </div>
      </div>

      {/* PRIORITIES SECTION */}
      <div className="org-section">
        <div className="section-header">
          <TargetIcon size={32} style={{ color: '#FF3B30' }} />
          <h2>PRIORIDADES (Quick Wins)</h2>
        </div>

        <div className="priorities-section">
          <div className="priorities-grid">
            <div className="priority-card high">
              <div className="priority-header">
                <h3>HIGH PRIORITY</h3>
                <span className="priority-badge">Impacto Inmediato</span>
              </div>
              <ul className="priority-list">
                <li>
                  <strong>BaaS Platform</strong>
                  <span>Guido Bautista + team - Nuevo revenue stream estratégico, habilitador de Embedded Finance</span>
                </li>
                <li>
                  <strong>TU360 Compras Marketplace</strong>
                  <span>Laura Villa + team - Crecimiento directo en e-commerce y BNPL</span>
                </li>
                <li>
                  <strong>Financial Wellness</strong>
                  <span>Christian Restrepo - Foco en retención, engagement y cross-selling</span>
                </li>
                <li>
                  <strong>Real Estate Platform</strong>
                  <span>Andres Molina - Diferenciador estratégico en mercado vertical de alto valor</span>
                </li>
              </ul>
            </div>

            <div className="priority-card medium">
              <div className="priority-header">
                <h3>MEDIUM PRIORITY</h3>
                <span className="priority-badge">Impacto Táctico 3-6 meses</span>
              </div>
              <ul className="priority-list">
                <li>
                  <strong>Open Banking</strong>
                  <span>Maria Victoria Ospina - Cumplimiento regulatorio y habilitador del ecosistema BaaS</span>
                </li>
                <li>
                  <strong>Mobility Platform</strong>
                  <span>Carolina Marin - Expansión del ecosistema a otro vertical de alto valor</span>
                </li>
                <li>
                  <strong>Digital Experience Hub</strong>
                  <span>Mariluz Echeverri - Mejora directa de la experiencia de cliente</span>
                </li>
              </ul>
            </div>

            <div className="priority-card strategic">
              <div className="priority-header">
                <h3>STRATEGIC</h3>
                <span className="priority-badge">Largo Plazo Fundacional</span>
              </div>
              <ul className="priority-list">
                <li>
                  <strong>Cross-Business Analytics</strong>
                  <span>Marvin Marin - La "joya de la corona". Habilita decisiones basadas en datos</span>
                </li>
                <li>
                  <strong>Universal Marketplace</strong>
                  <span>David Alexander Lopez - Consolidación de plataformas para eficiencia operativa</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* WEBINARS SECTION */}
      <div className="org-section">
        <div className="section-header">
          <GrowthIcon size={32} style={{ color: '#5644D4' }} />
          <h2>WEBINARS RECOMENDADOS (Plan 2025)</h2>
        </div>

        <div className="webinars-section">
          <div className="webinars-timeline">
            <div className="webinar-quarter">
              <h3>Q1 2025</h3>

              <div className="webinar-card">
                <div className="webinar-number">1</div>
                <div className="webinar-content">
                  <h4>Arquitectura de Banking-as-a-Service (BaaS) Multi-Tenant con MongoDB</h4>
                  <p className="webinar-target">Target: Guido Bautista + todo su equipo (BaaS), Mariluz Echeverri (Ecosistemas)</p>
                  <p className="webinar-desc">
                    Patrones de arquitectura multi-tenant, Atlas Data API, Queryable Encryption y gobernabilidad para plataformas BaaS escalables.
                  </p>
                </div>
              </div>

              <div className="webinar-card">
                <div className="webinar-number">2</div>
                <div className="webinar-content">
                  <h4>Patrones de E-commerce y Marketplace: Catálogo, Inventario y Órdenes a Escala</h4>
                  <p className="webinar-target">Target: Laura Villa, Arley Montoya, Christian Duque, David Alexander Lopez</p>
                  <p className="webinar-desc">
                    Product catalog patterns, Atlas Search para discovery, ACID transactions para órdenes y manejo de inventario en tiempo real.
                  </p>
                </div>
              </div>
            </div>

            <div className="webinar-quarter">
              <h3>Q2 2025</h3>

              <div className="webinar-card">
                <div className="webinar-number">3</div>
                <div className="webinar-content">
                  <h4>De Open Banking a Embedded Finance: Construyendo APIs Seguras y Escalables</h4>
                  <p className="webinar-target">Target: Maria Victoria Ospina, Guido Bautista, Johvany Esteban</p>
                  <p className="webinar-desc">
                    Consent management, API gateway patterns, RBAC granular y compliance para Open Banking y Embedded Finance.
                  </p>
                </div>
              </div>

              <div className="webinar-card">
                <div className="webinar-number">4</div>
                <div className="webinar-content">
                  <h4>Caso de Uso: Plataformas Inmobiliarias (Geospatial, Search y AVMs)</h4>
                  <p className="webinar-target">Target: Andres Molina, Juan Felipe Londoño, Laura Escobar</p>
                  <p className="webinar-desc">
                    Geospatial queries para propiedades, GridFS para documentos, Atlas Search para discovery y ML metadata para AVMs.
                  </p>
                </div>
              </div>
            </div>

            <div className="webinar-quarter">
              <h3>Q3 2025</h3>

              <div className="webinar-card">
                <div className="webinar-number">5</div>
                <div className="webinar-content">
                  <h4>Construyendo Bienestar Financiero: PFM y Motores de Recomendación</h4>
                  <p className="webinar-target">Target: Christian Restrepo, Juan Camilo Agudelo, Cristian Vargas</p>
                  <p className="webinar-desc">
                    Aggregation pipelines para scoring de salud financiera, Time Series para tracking y Change Streams para alertas en tiempo real.
                  </p>
                </div>
              </div>

              <div className="webinar-card">
                <div className="webinar-number">6</div>
                <div className="webinar-content">
                  <h4>De IoT a Business Intelligence: El Caso de la Plataforma de Movilidad Conectada</h4>
                  <p className="webinar-target">Target: Carolina Marin, Ronald Suarez (Cruce con equipo de Time Series de Álvaro)</p>
                  <p className="webinar-desc">
                    Time Series Collections para telemetría de vehículos, IoT patterns, analytics con window functions y UBI scoring.
                  </p>
                </div>
              </div>
            </div>

            <div className="webinar-quarter">
              <h3>Q4 2025</h3>

              <div className="webinar-card">
                <div className="webinar-number">7</div>
                <div className="webinar-content">
                  <h4>Arquitectura SaaS Multi-Tenant: Aislamiento, Seguridad y Gobernabilidad</h4>
                  <p className="webinar-target">Target: Guido Bautista (BaaS), Laura Villa (Marketplace), Mariluz Echeverri (Partners)</p>
                  <p className="webinar-desc">
                    Estrategias de multi-tenancy, shard keys, RBAC, billing y metering, compliance y gobernabilidad para plataformas SaaS.
                  </p>
                </div>
              </div>

              <div className="webinar-card">
                <div className="webinar-number">8</div>
                <div className="webinar-content">
                  <h4>El Ecosistema Conectado: Analítica Transversal con Atlas Data Federation</h4>
                  <p className="webinar-target">Target: Marvin Marin, Oscar Cardona (Cruce con equipo de BI de Álvaro)</p>
                  <p className="webinar-desc">
                    Data Federation para consultas cross-business sin ETLs, BI Connector, aggregations distribuidas y arquitectura de analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientDocumentLayout>
  )
}
