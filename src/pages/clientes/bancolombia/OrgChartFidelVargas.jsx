import React, { useState } from 'react'
import { ClientDocumentLayout } from '../../../components/layouts'
import { MetricsCard } from '../../../components/shared'
import {
  Building2 as BankIcon,
  Network as ArchitectureIcon,
  Brain as AIIcon,
  Laptop as TechIcon,
  Cable as IntegrationIcon,
  Target as StrategyIcon,
  FileText as DocumentIcon,
  Search as SearchIcon,
  CreditCard as PaymentIcon,
  Wallet as WalletIcon,
  TrendingUp as InvestmentIcon,
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

export const OrgChartFidelVargas = () => {
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
      title="Org Chart Fidel Vargas - Use Cases MongoDB"
      subtitle="VP Servicios de Tecnología - Payment Ecosystem"
      author="Leo Alarcón"
      date="2025-01-12"
      tags={['orgchart', 'use-cases', 'payment-hub', 'arquitectura']}
      showExportButton={true}
    >
      {/* Hero Section */}
      <div className="org-hero">
        <div className="org-hero-icon">
          <BankIcon size={64} />
        </div>
        <h1>BANCOLOMBIA ORG CHART</h1>
        <h2>Fidel Andres Vargas Londoño</h2>
        <p className="org-subtitle">VP Servicios de Tecnología - Payment Ecosystem & Specialized Products</p>
        <p className="org-description">
          Casos de Uso Estratégicos MongoDB mapeados por persona para la organización de
          Fidel Vargas, enfocada en Canales, Payment Hub, Productos Especializados y Arquitectura Empresarial.
        </p>
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

      {/* VP Level */}
      <section className="org-section">
        <div className="section-header">
          <StrategyIcon size={32} />
          <h2>VP LEVEL</h2>
        </div>

        {/* Fidel Vargas */}
        <div className={`persona-card vp-card ${!matchesSearch('Fidel Andres Vargas Londoño') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar vp-avatar">
              <BankIcon size={48} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Fidel Andres Vargas Londoño')}</h3>
              <p className="persona-role">VP Servicios de Tecnología</p>
            </div>
          </div>

          <div className="use-case-container">
            <div className="use-case-badge strategic">ESTRATÉGICO - EXECUTIVE</div>
            <h4 className="use-case-title">
              <StrategyIcon size={20} /> Payment Ecosystem & Specialized Products Dashboard
            </h4>
            <p className="use-case-desc">
              Vista ejecutiva consolidada de todo el ecosistema de pagos (canales, hub, productos especializados)
              para monitorear TPV, salud del sistema y KPIs de negocio.
            </p>

            <div className="tech-features">
              <div className="tech-feature">
                <strong>Atlas Data Federation:</strong>
                <span>Consultas unificadas cross-collection sin mover datos</span>
              </div>
              <div className="tech-feature">
                <strong>Atlas Charts:</strong>
                <span>Visualización en tiempo real embebida en portales</span>
              </div>
              <div className="tech-feature">
                <strong>Time Series Collections:</strong>
                <span>Métricas de volumen transaccional para análisis de tendencias</span>
              </div>
              <div className="tech-feature">
                <strong>Aggregation Pipeline:</strong>
                <span>Consolidación de KPIs ejecutivos complejos en segundos</span>
              </div>
            </div>

            <div className="metrics-grid">
              <MetricsCard
                title="Payment Ecosystem KPIs"
                metrics={[
                  { label: 'TPV Procesado', value: '100K+', unit: 'TPS' },
                  { label: 'Disponibilidad', value: '99.99', unit: '%' },
                  { label: 'Canales Activos', value: '12', unit: 'canales' }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Directores */}
      <section className="org-section">
        <div className="section-header">
          <ArchitectureIcon size={32} />
          <h2>DIRECTORES</h2>
        </div>

        {/* Luis Gabriel Correa */}
        <div className={`persona-card director-card ${!matchesSearch('Luis Gabriel Correa Gutiérrez') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar">
              <IntegrationIcon size={42} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Luis Gabriel Correa Gutiérrez')}</h3>
              <p className="persona-role">Líder Entorno Canales y Clientes</p>
            </div>
          </div>

          <div className="use-case-container">
            <div className="use-case-badge high-priority">ALTA PRIORIDAD</div>
            <h4 className="use-case-title">
              <IntegrationIcon size={20} /> Omnichannel Session Management
            </h4>
            <p className="use-case-desc">
              Gestión de sesiones de usuario unificadas que persisten a través de todos los canales
              (web, mobile, ATM, sucursal).
            </p>

            <div className="tech-features">
              <div className="tech-feature">
                <strong>TTL Indexes:</strong>
                <span>Expiración automática de sesiones sin jobs de borrado</span>
              </div>
              <div className="tech-feature">
                <strong>Updates Atómicos:</strong>
                <span>Modificación de estado con alta concurrencia sin locks</span>
              </div>
              <div className="tech-feature">
                <strong>Esquema Flexible:</strong>
                <span>Metadatos heterogéneos (geo, dispositivo, canal)</span>
              </div>
            </div>
          </div>

          <div className="use-case-container">
            <div className="use-case-badge strategic">ESTRATÉGICO</div>
            <h4 className="use-case-title">
              <StrategyIcon size={20} /> Customer Journey Orchestration
            </h4>
            <p className="use-case-desc">
              Orquestación de experiencias personalizadas y stateful a través de múltiples touchpoints.
            </p>

            <div className="tech-features">
              <div className="tech-feature">
                <strong>Change Streams:</strong>
                <span>Reacción a eventos del journey en tiempo real</span>
              </div>
              <div className="tech-feature">
                <strong>Aggregation Pipeline:</strong>
                <span>Lógica "Next-Best-Action" basada en perfil del cliente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Managers bajo Luis Gabriel Correa */}
        <ManagersSection directorName="Luis Gabriel Correa" searchTerm={searchTerm}>

          {/* Laura Lily Villa Cardona */}
          <div className={`persona-card manager-card ${!matchesSearch('Laura Lily Villa Cardona') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <TechIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>{highlightText('Laura Lily Villa Cardona')}</h4>
                <p className="persona-role">Habilitador Distri Multicanal</p>
                <p className="reports-to">Reporta a: Luis Gabriel Correa</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title">
                <TechIcon size={18} /> Channel Configuration Management (Feature Flags)
              </h5>
              <p className="use-case-desc">
                Configuración dinámica de features, menús y banners por canal, versión y segmento.
              </p>
              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Change Streams:</strong>
                  <span>Hot-reload de configuraciones en tiempo real</span>
                </div>
                <div className="tech-feature">
                  <strong>Targeting Queries:</strong>
                  <span>Features por segmento y versión de app</span>
                </div>
              </div>
            </div>
          </div>

          {/* Maria Jose Torres Pertuz */}
          <div className={`persona-card manager-card ${!matchesSearch('Maria Jose Torres Pertuz') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <DocumentIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>{highlightText('Maria Jose Torres Pertuz')}</h4>
                <p className="persona-role">Distrib A Distancia (Video Banking)</p>
                <p className="reports-to">Reporta a: Luis Gabriel Correa</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title">
                <DocumentIcon size={18} /> Video Banking Session Management
              </h5>
              <p className="use-case-desc">
                Gestión de sesiones de video banking con transcripts, documentos y grabaciones.
              </p>
              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>GridFS:</strong>
                  <span>Almacenamiento y streaming de grabaciones</span>
                </div>
                <div className="tech-feature">
                  <strong>Atlas Search:</strong>
                  <span>Búsqueda full-text en transcripts para compliance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Santiago Zuluaga */}
          <div className={`persona-card manager-card ${!matchesSearch('Santiago Zuluaga Zuluaga') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <SearchIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>{highlightText('Santiago Zuluaga Zuluaga')}</h4>
                <p className="persona-role">Conocimiento Cliente TI</p>
                <p className="reports-to">Reporta a: Luis Gabriel Correa</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge high-priority">ALTA PRIORIDAD - ESTRATÉGICO</div>
              <h5 className="use-case-title">
                <SearchIcon size={18} /> Customer Data Platform (CDP) & Real-time Segmentation
              </h5>
              <p className="use-case-desc">
                Plataforma centralizada de datos de cliente con segmentación dinámica en tiempo real.
              </p>
              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Aggregation Pipeline:</strong>
                  <span>Segmentación on-the-fly con reglas complejas</span>
                </div>
                <div className="tech-feature">
                  <strong>Atlas Search:</strong>
                  <span>Descubrimiento fuzzy de clientes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cindy Johana Castaño */}
          <div className={`persona-card manager-card ${!matchesSearch('Cindy Johana Castaño') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <DocumentIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>{highlightText('Cindy Johana Castaño')}</h4>
                <p className="persona-role">Ciclo de Crédito</p>
                <p className="reports-to">Reporta a: Luis Gabriel Correa</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title">
                <DocumentIcon size={18} /> Credit Lifecycle Management
              </h5>
              <p className="use-case-desc">
                Gestión end-to-end del ciclo de crédito desde originación hasta servicing.
              </p>
              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>ACID Transactions:</strong>
                  <span>Consistencia en originación y pagos</span>
                </div>
                <div className="tech-feature">
                  <strong>GridFS:</strong>
                  <span>Documentos de soporte del crédito</span>
                </div>
              </div>
            </div>
          </div>

          {/* David Aguirre */}
          <div className={`persona-card manager-card ${!matchesSearch('David Aguirre') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <TechIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>{highlightText('David Aguirre')}</h4>
                <p className="persona-role">Galaxia Modern Canales TI</p>
                <p className="reports-to">Reporta a: Luis Gabriel Correa</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title">
                <TechIcon size={18} /> Progressive Web App (PWA) Backend
              </h5>
              <p className="use-case-desc">
                Backend optimizado para PWAs con capacidad de push notifications.
              </p>
              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Change Streams:</strong>
                  <span>Base para push via WebSockets</span>
                </div>
                <div className="tech-feature">
                  <strong>Payloads Comprimidos:</strong>
                  <span>Reducción de consumo de datos móviles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Jose Jaime Tllano Vega */}
          <div className={`persona-card manager-card ${!matchesSearch('Jose Jaime Tllano Vega') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <IntegrationIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>{highlightText('Jose Jaime Tllano Vega')}</h4>
                <p className="persona-role">Distribución Física TI</p>
                <p className="reports-to">Reporta a: Luis Gabriel Correa</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title">
                <IntegrationIcon size={18} /> Branch & ATM Network Management
              </h5>
              <p className="use-case-desc">
                Gestión de red física de sucursales y ATMs con monitoreo IoT.
              </p>
              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Geospatial Queries:</strong>
                  <span>ATMs cercanos con servicios disponibles</span>
                </div>
                <div className="tech-feature">
                  <strong>Time Series:</strong>
                  <span>Telemetría de miles de ATMs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Millerlley Gonzalez Garcia */}
          <div className={`persona-card manager-card ${!matchesSearch('Millerlley Gonzalez Garcia') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <TechIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>{highlightText('Millerlley Gonzalez Garcia')}</h4>
                <p className="persona-role">Distribución Digital</p>
                <p className="reports-to">Reporta a: Luis Gabriel Correa</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge high-priority">ALTA PRIORIDAD</div>
              <h5 className="use-case-title">
                <TechIcon size={18} /> Digital Banking Platform (Web/Mobile Backend)
              </h5>
              <p className="use-case-desc">
                Backend unificado de alto performance para banca digital con millones de usuarios.
              </p>
              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Queries Optimizadas:</strong>
                  <span>p95 &lt;50ms para experiencia de usuario</span>
                </div>
                <div className="tech-feature">
                  <strong>Atlas Search:</strong>
                  <span>Búsqueda dentro de la app</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lina Maria Herrera Castaño */}
          <div className={`persona-card manager-card ${!matchesSearch('Lina Maria Herrera Castaño') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <IntegrationIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>{highlightText('Lina Maria Herrera Castaño')}</h4>
                <p className="persona-role">Distribución Digital SNAS TI</p>
                <p className="reports-to">Reporta a: Luis Gabriel Correa</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title">
                <IntegrationIcon size={18} /> Self-Service Kiosk Platform
              </h5>
              <p className="use-case-desc">
                Plataforma para kiosks con soporte offline usando patrón store-and-forward.
              </p>
              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Store-and-Forward:</strong>
                  <span>Operación offline garantizada</span>
                </div>
                <div className="tech-feature">
                  <strong>Sync Asíncrona:</strong>
                  <span>Sincronización al recuperar conectividad</span>
                </div>
              </div>
            </div>
          </div>

        </ManagersSection>

        {/* Lina Maria Vergara */}
        <div className={`persona-card director-card ${!matchesSearch('Lina Maria Vergara Villarraga') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar">
              <PaymentIcon size={42} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Lina Maria Vergara Villarraga')}</h3>
              <p className="persona-role">Líder Payment Service Hub</p>
            </div>
          </div>

          <div className="use-case-container">
            <div className="use-case-badge high-priority">ALTA PRIORIDAD - CORE BUSINESS</div>
            <h4 className="use-case-title">
              <PaymentIcon size={20} /> Real-time Payment Processing Hub
            </h4>
            <p className="use-case-desc">
              Hub central para pagos instantáneos (PSE, Transfiya, ACH) con procesamiento en milisegundos
              y alta disponibilidad.
            </p>

            <div className="tech-features">
              <div className="tech-feature">
                <strong>Multi-Document ACID:</strong>
                <span>Atomicidad total en operaciones complejas</span>
              </div>
              <div className="tech-feature">
                <strong>Sharding:</strong>
                <span>Escalabilidad para 100K+ TPS</span>
              </div>
              <div className="tech-feature">
                <strong>Change Streams:</strong>
                <span>Propagación de eventos en tiempo real</span>
              </div>
            </div>

            <div className="metrics-grid">
              <MetricsCard
                title="Payment Hub Performance"
                metrics={[
                  { label: 'TPS Capacity', value: '100K+', unit: 'TPS' },
                  { label: 'Latencia p95', value: '<10', unit: 'ms' },
                  { label: 'Disponibilidad', value: '99.999', unit: '%' }
                ]}
              />
            </div>
          </div>

          <div className="use-case-container">
            <div className="use-case-badge high-priority">ALTA PRIORIDAD</div>
            <h4 className="use-case-title">
              <StrategyIcon size={20} /> Payment Routing Engine
            </h4>
            <p className="use-case-desc">
              Motor de ruteo inteligente de pagos según costo, disponibilidad y reglas de negocio.
            </p>

            <div className="tech-features">
              <div className="tech-feature">
                <strong>Aggregation Pipeline:</strong>
                <span>Evaluación de reglas en &lt;10ms</span>
              </div>
              <div className="tech-feature">
                <strong>In-Memory Indexes:</strong>
                <span>Lookups sub-milisegundo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Managers bajo Lina Maria Vergara - Payment Hub */}
        <ManagersSection directorName="Lina Maria Vergara" searchTerm={searchTerm}>

          <div className={`persona-card manager-card ${!matchesSearch('Jorge Valderrama Beta') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><PaymentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Jorge Valderrama Beta')}</h4>
                <p className="persona-role">Factoring TI</p>
                <p className="reports-to">Reporta a: Lina Maria Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title"><PaymentIcon size={18} /> Factoring & Supply Chain Finance</h5>
              <p className="use-case-desc">Plataforma de factoring con financiamiento automático y gestión documental.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Diego Jose Moreno Rincon') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><PaymentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Diego Jose Moreno Rincon')}</h4>
                <p className="persona-role">Aceptación SLNS Pago Internacional</p>
                <p className="reports-to">Reporta a: Lina Maria Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge high-priority">ALTA PRIORIDAD</div>
              <h5 className="use-case-title"><PaymentIcon size={18} /> International Payment Gateway (SWIFT)</h5>
              <p className="use-case-desc">Gateway de pagos internacionales con SWIFT integration y compliance.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Andres Arias') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><StrategyIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Andres Arias')}</h4>
                <p className="persona-role">Pricing TI</p>
                <p className="reports-to">Reporta a: Lina Maria Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title"><StrategyIcon size={18} /> Dynamic Pricing Engine</h5>
              <p className="use-case-desc">Motor de pricing dinámico para productos financieros con fórmulas complejas.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Sandra Milena Crespo') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><DocumentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Sandra Milena Crespo')}</h4>
                <p className="persona-role">Inmobiliario</p>
                <p className="reports-to">Reporta a: Lina Maria Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title"><DocumentIcon size={18} /> Mortgage Loan Platform</h5>
              <p className="use-case-desc">Plataforma de créditos hipotecarios con gestión de avalúos y geospatial queries.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Andres Felipe Isaza Vergara') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><DocumentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Andres Felipe Isaza Vergara')}</h4>
                <p className="persona-role">Leasing Renta y Uso</p>
                <p className="reports-to">Reporta a: Lina Maria Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title"><DocumentIcon size={18} /> Leasing Contract & Asset Management</h5>
              <p className="use-case-desc">Gestión de contratos de leasing con tracking de depreciación de activos.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Adriana Patricia') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><DocumentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Adriana Patricia')}</h4>
                <p className="persona-role">Seguros TI</p>
                <p className="reports-to">Reporta a: Lina Maria Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title"><DocumentIcon size={18} /> Insurance Policy Management</h5>
              <p className="use-case-desc">Gestión de pólizas de seguros con esquema flexible para diferentes tipos.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Mauricio Alexis Mesa') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><PaymentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Mauricio Alexis Mesa')}</h4>
                <p className="persona-role">Financiación y Proyectos TI</p>
                <p className="reports-to">Reporta a: Lina Maria Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title"><PaymentIcon size={18} /> Project Financing Platform</h5>
              <p className="use-case-desc">Financiamiento de proyectos con desembolsos basados en hitos.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Juan Camilo Largo Gomez') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><WalletIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Juan Camilo Largo Gomez')}</h4>
                <p className="persona-role">Medios de Pago</p>
                <p className="reports-to">Reporta a: Lina Maria Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge high-priority">ALTA PRIORIDAD</div>
              <h5 className="use-case-title"><WalletIcon size={18} /> Payment Method Orchestration (Wallets, QR, NFC)</h5>
              <p className="use-case-desc">Orquestador de múltiples métodos de pago con tokenización EMV.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Yuly Andrea Hernandez') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><PaymentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Yuly Andrea Hernandez')}</h4>
                <p className="persona-role">Transferencias Nvex SIST Pago</p>
                <p className="reports-to">Reporta a: Lina Maria Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge high-priority">ALTA PRIORIDAD - CORE</div>
              <h5 className="use-case-title"><PaymentIcon size={18} /> Transfiya Real-time Transfers</h5>
              <p className="use-case-desc">Procesamiento de transferencias instantáneas con confirmación en &lt;1s.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Cristian Hasbid Herrera') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><PaymentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Cristian Hasbid Herrera')}</h4>
                <p className="persona-role">Cash Management TI</p>
                <p className="reports-to">Reporta a: Lina Maria Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title"><PaymentIcon size={18} /> Corporate Cash Management</h5>
              <p className="use-case-desc">Gestión de tesorería corporativa con cash pooling y sweeping.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Luis Fernando Arbelaez') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><PaymentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Luis Fernando Arbelaez')}</h4>
                <p className="persona-role">Depósitos y CTAS</p>
                <p className="reports-to">Reporta a: Lina Maria Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title"><PaymentIcon size={18} /> Savings & Deposit Platform (CDTs)</h5>
              <p className="use-case-desc">Plataforma de cuentas de ahorro y CDTs con cálculo de intereses.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Miguel Leonardo Alvarado') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><IntegrationIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Miguel Leonardo Alvarado')}</h4>
                <p className="persona-role">Serv Estratégicos Negocio LRU TI</p>
                <p className="reports-to">Reporta a: Lina Maria Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><IntegrationIcon size={18} /> Enterprise Service Bus (ESB) / Event Hub</h5>
              <p className="use-case-desc">Modernización del ESB hacia arquitectura event-driven con Change Streams.</p>
            </div>
          </div>

        </ManagersSection>

        {/* Felipe Restrepo */}
        <div className={`persona-card director-card ${!matchesSearch('Felipe Restrepo Fernandez') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar">
              <InvestmentIcon size={42} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Felipe Restrepo Fernandez')}</h3>
              <p className="persona-role">Líder Productos Especializados</p>
            </div>
          </div>

          <div className="use-case-container">
            <div className="use-case-badge high-priority">ALTA PRIORIDAD</div>
            <h4 className="use-case-title">
              <InvestmentIcon size={20} /> Investment Portfolio Management
            </h4>
            <p className="use-case-desc">
              Gestión y valoración de portafolios de inversión con market data en tiempo real.
            </p>

            <div className="tech-features">
              <div className="tech-feature">
                <strong>Time Series Collections:</strong>
                <span>Market data con 90% compresión</span>
              </div>
              <div className="tech-feature">
                <strong>Aggregation Pipeline:</strong>
                <span>Cálculos P&L y analytics avanzados</span>
              </div>
              <div className="tech-feature">
                <strong>Low-Latency Reads:</strong>
                <span>Pricing en milisegundos</span>
              </div>
            </div>
          </div>

          <div className="use-case-container">
            <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
            <h4 className="use-case-title">
              <StrategyIcon size={20} /> Treasury Position Management
            </h4>
            <p className="use-case-desc">
              Gestión de posiciones de tesorería con proyecciones de cash flow.
            </p>

            <div className="tech-features">
              <div className="tech-feature">
                <strong>ACID Transactions:</strong>
                <span>Consistencia en movimientos de tesorería</span>
              </div>
            </div>
          </div>
        </div>

        {/* Managers bajo Felipe Restrepo */}
        <ManagersSection directorName="Felipe Restrepo" searchTerm={searchTerm}>

          <div className={`persona-card manager-card ${!matchesSearch('Frank Ricardo Muñoz') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><InvestmentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Frank Ricardo Muñoz')}</h4>
                <p className="persona-role">Tesorería TI</p>
                <p className="reports-to">Reporta a: Felipe Restrepo</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge high-priority">ALTA PRIORIDAD</div>
              <h5 className="use-case-title"><InvestmentIcon size={18} /> FX Trading Platform</h5>
              <p className="use-case-desc">Plataforma de trading de divisas con pricing en tiempo real y cálculo de riesgo.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Jonathan Antonio Bayona') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><AIIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Jonathan Antonio Bayona')}</h4>
                <p className="persona-role">Inversiones TI</p>
                <p className="reports-to">Reporta a: Felipe Restrepo</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge high-priority">ALTA PRIORIDAD</div>
              <h5 className="use-case-title"><AIIcon size={18} /> Robo-Advisor Platform</h5>
              <p className="use-case-desc">Asesoría automatizada de inversiones con ML y Atlas Vector Search.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Juan Esteban Echaverry') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><DocumentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Juan Esteban Echaverry')}</h4>
                <p className="persona-role">Negocios Fiduciarios TI</p>
                <p className="reports-to">Reporta a: Felipe Restrepo</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title"><DocumentIcon size={18} /> Trust Management System</h5>
              <p className="use-case-desc">Gestión de fideicomisos con contabilidad fiduciaria y Field-Level Encryption.</p>
            </div>
          </div>

        </ManagersSection>

        {/* Rafael Gustavo Meneses */}
        <div className={`persona-card director-card ${!matchesSearch('Rafael Gustavo Meneses Ramirez') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar">
              <ArchitectureIcon size={42} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Rafael Gustavo Meneses Ramirez')}</h3>
              <p className="persona-role">Líder CDE Arquitectura Empresarial</p>
            </div>
          </div>

          <div className="use-case-container">
            <div className="use-case-badge strategic">ESTRATÉGICO - FUNDACIONAL</div>
            <h4 className="use-case-title">
              <ArchitectureIcon size={20} /> Enterprise Architecture Repository
            </h4>
            <p className="use-case-desc">
              Repositorio unificado para todos los artefactos de arquitectura empresarial
              (capacidades, journeys, aplicaciones, patrones, integraciones).
            </p>

            <div className="tech-features">
              <div className="tech-feature">
                <strong>$graphLookup:</strong>
                <span>Navegación de arquitectura como grafo</span>
              </div>
              <div className="tech-feature">
                <strong>Atlas Search:</strong>
                <span>Búsqueda full-text sobre todos los artefactos</span>
              </div>
              <div className="tech-feature">
                <strong>Schema Validation:</strong>
                <span>Gobernabilidad de artefactos heterogéneos</span>
              </div>
              <div className="tech-feature">
                <strong>GridFS:</strong>
                <span>Almacenamiento de diagramas de arquitectura</span>
              </div>
            </div>
          </div>

          <div className="use-case-container">
            <div className="use-case-badge strategic">ESTRATÉGICO</div>
            <h4 className="use-case-title">
              <StrategyIcon size={20} /> Business Capability Modeling
            </h4>
            <p className="use-case-desc">
              Mapeo de capacidades de negocio a aplicaciones y servicios.
            </p>

            <div className="tech-features">
              <div className="tech-feature">
                <strong>Graph Patterns:</strong>
                <span>Relaciones entre capacidades y activos de TI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Managers bajo Rafael Meneses - 12 Arquitectos */}
        <ManagersSection directorName="Rafael Gustavo Meneses" searchTerm={searchTerm}>

          <div className={`persona-card manager-card ${!matchesSearch('Carlos Andres Ruiz Tobon') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><ArchitectureIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Carlos Andres Ruiz Tobon')}</h4>
                <p className="persona-role">Arquitecto Empresarial</p>
                <p className="reports-to">Reporta a: Rafael Meneses</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><ArchitectureIcon size={18} /> Business Capability Map</h5>
              <p className="use-case-desc">Mapeo de capacidades de negocio del banco con graph patterns.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Diana Patricia Tejada') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><ArchitectureIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Diana Patricia Tejada')}</h4>
                <p className="persona-role">Arquitecto Empresarial</p>
                <p className="reports-to">Reporta a: Rafael Meneses</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><ArchitectureIcon size={18} /> Customer Journey Mapping</h5>
              <p className="use-case-desc">Mapeo de journeys con touchpoints usando graph lookups.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Cristian Andres Cadena') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><IntegrationIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Cristian Andres Cadena')}</h4>
                <p className="persona-role">Arquitecto Empresarial</p>
                <p className="reports-to">Reporta a: Rafael Meneses</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><IntegrationIcon size={18} /> Integration Architecture Catalog</h5>
              <p className="use-case-desc">Catálogo de integraciones y patterns con Change Streams.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Adriana Noguera Rojas') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><DocumentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Adriana Noguera Rojas')}</h4>
                <p className="persona-role">Arquitecto Empresarial</p>
                <p className="reports-to">Reporta a: Rafael Meneses</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><DocumentIcon size={18} /> Master Data Management (MDM)</h5>
              <p className="use-case-desc">Gestión de datos maestros con Schema Validation para calidad.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Danny Yoan Hernandez') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><ArchitectureIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Danny Yoan Hernandez')}</h4>
                <p className="persona-role">Arquitecto Empresarial</p>
                <p className="reports-to">Reporta a: Rafael Meneses</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><ArchitectureIcon size={18} /> Identity & Access Management Repository</h5>
              <p className="use-case-desc">Repositorio de identidades con RBAC granular y nested documents.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Nicolas Alejandro') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><ArchitectureIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Nicolas Alejandro')}</h4>
                <p className="persona-role">Arquitecto Empresarial</p>
                <p className="reports-to">Reporta a: Rafael Meneses</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><ArchitectureIcon size={18} /> Cloud Architecture Inventory</h5>
              <p className="use-case-desc">Inventario multi-cloud con esquema flexible para recursos heterogéneos.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Freddy Arley Parra') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><ArchitectureIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Freddy Arley Parra')}</h4>
                <p className="persona-role">Arquitecto Empresarial</p>
                <p className="reports-to">Reporta a: Rafael Meneses</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><ArchitectureIcon size={18} /> Disaster Recovery Planning</h5>
              <p className="use-case-desc">Plans de DR con Atlas multi-region y point-in-time recovery.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Carlos Mario Velasquez') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><TechIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Carlos Mario Velasquez')}</h4>
                <p className="persona-role">Arquitecto Empresarial</p>
                <p className="reports-to">Reporta a: Rafael Meneses</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><TechIcon size={18} /> Application Modernization Tracker</h5>
              <p className="use-case-desc">Tracking de iniciativas de modernización con change tracking.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Maryon Marin Giraldo') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><TechIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Maryon Marin Giraldo')}</h4>
                <p className="persona-role">Arquitecto Empresarial</p>
                <p className="reports-to">Reporta a: Rafael Meneses</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><TechIcon size={18} /> DevOps Metrics Platform (DORA)</h5>
              <p className="use-case-desc">Métricas DORA con Time Series y Atlas Charts.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Alejandro Pulgarin') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><DocumentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Alejandro Pulgarin')}</h4>
                <p className="persona-role">Arquitecto Empresarial</p>
                <p className="reports-to">Reporta a: Rafael Meneses</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><DocumentIcon size={18} /> Solution Architecture Patterns Library</h5>
              <p className="use-case-desc">Biblioteca de patterns con Atlas Search y GridFS para diagramas.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Sergio Andres Trujillo') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><ArchitectureIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Sergio Andres Trujillo')}</h4>
                <p className="persona-role">Arquitecto Empresarial</p>
                <p className="reports-to">Reporta a: Rafael Meneses</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><ArchitectureIcon size={18} /> Service Mesh Topology</h5>
              <p className="use-case-desc">Visualización de service mesh con graph queries.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Manuel Alejandro') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><AIIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Manuel Alejandro')}</h4>
                <p className="persona-role">Arquitecto Empresarial</p>
                <p className="reports-to">Reporta a: Rafael Meneses</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><AIIcon size={18} /> Real-time Analytics Platform</h5>
              <p className="use-case-desc">Analytics operacionales con Atlas Data Federation y BI Connector.</p>
            </div>
          </div>

        </ManagersSection>

        {/* Alejandra Maria Guillen */}
        <div className={`persona-card director-card ${!matchesSearch('Alejandra Maria Guillen Gallego') ? 'search-hidden' : ''}`}>
          <div className="persona-header">
            <div className="persona-avatar">
              <Users size={42} />
            </div>
            <div className="persona-info">
              <h3>{highlightText('Alejandra Maria Guillen Gallego')}</h3>
              <p className="persona-role">Líder Entorno Ecosistemas y Corporativo</p>
            </div>
          </div>

          <div className="use-case-container">
            <div className="use-case-badge strategic">ESTRATÉGICO</div>
            <h4 className="use-case-title">
              <Users size={20} /> Employee Experience Platform
            </h4>
            <p className="use-case-desc">
              Portal unificado 360 de experiencia del empleado (RRHH, servicios corporativos, comunicaciones).
            </p>

            <div className="tech-features">
              <div className="tech-feature">
                <strong>Client-Side Field Level Encryption:</strong>
                <span>Encriptación para PII del empleado</span>
              </div>
              <div className="tech-feature">
                <strong>$graphLookup:</strong>
                <span>Mapeo de organigramas y jerarquías</span>
              </div>
              <div className="tech-feature">
                <strong>Multi-Tenancy RBAC:</strong>
                <span>Seguridad granular por empleado</span>
              </div>
            </div>
          </div>

          <div className="use-case-container">
            <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
            <h4 className="use-case-title">
              <DocumentIcon size={20} /> Corporate Service Catalog
            </h4>
            <p className="use-case-desc">
              Catálogo self-service de servicios corporativos con workflows de aprobación y SLAs.
            </p>

            <div className="tech-features">
              <div className="tech-feature">
                <strong>State Machine Pattern:</strong>
                <span>Workflows de aprobación en documentos</span>
              </div>
              <div className="tech-feature">
                <strong>Change Streams:</strong>
                <span>Monitoreo de SLAs en tiempo real</span>
              </div>
            </div>
          </div>
        </div>

        {/* Managers bajo Alejandra Guillen */}
        <ManagersSection directorName="Alejandra Maria Guillen" searchTerm={searchTerm}>

          <div className={`persona-card manager-card ${!matchesSearch('Luz Maria Augusto Mejia') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><Users size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Luz Maria Augusto Mejia')}</h4>
                <p className="persona-role">Administrativo Talento y Cultura</p>
                <p className="reports-to">Reporta a: Alejandra Guillen</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><Users size={18} /> HR Management System</h5>
              <p className="use-case-desc">Sistema integral de RRHH con talent search y $graphLookup para org charts.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Carolina Perez') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><StrategyIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Carolina Perez')}</h4>
                <p className="persona-role">Gestión Integral Riesgos TI</p>
                <p className="reports-to">Reporta a: Alejandra Guillen</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><StrategyIcon size={18} /> Enterprise Risk Management (ERM)</h5>
              <p className="use-case-desc">Gestión de riesgos con Time Series para KRIs y Change Streams para alertas.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Marcelino Vasquez') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><ArchitectureIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Marcelino Vasquez')}</h4>
                <p className="persona-role">Analista BANISTMO</p>
                <p className="reports-to">Reporta a: Alejandra Guillen</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO - REGIONAL</div>
              <h5 className="use-case-title"><ArchitectureIcon size={18} /> Regional Data Consolidation (Bancolombia + Banistmo)</h5>
              <p className="use-case-desc">Consolidación regional con Atlas Multi-Region y Data Federation.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Adriana Marcela Ramirez') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><DocumentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Adriana Marcela Ramirez')}</h4>
                <p className="persona-role">Financiero y Contable</p>
                <p className="reports-to">Reporta a: Alejandra Guillen</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title"><DocumentIcon size={18} /> Financial Accounting System (Ledger)</h5>
              <p className="use-case-desc">Sistema de contabilidad con ACID transactions para partida doble.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Jairo Humberto Salazar') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><IntegrationIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Jairo Humberto Salazar')}</h4>
                <p className="persona-role">Línea Conocimiento OFF SHORE TI</p>
                <p className="reports-to">Reporta a: Alejandra Guillen</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title"><IntegrationIcon size={18} /> Global Team Collaboration Platform</h5>
              <p className="use-case-desc">Plataforma de colaboración global con Atlas Multi-Region para baja latencia.</p>
            </div>
          </div>

          <div className={`persona-card manager-card ${!matchesSearch('Fernando Enrique') ? 'search-hidden' : ''}`}>
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><DocumentIcon size={36} /></div>
              <div className="persona-info">
                <h4>{highlightText('Fernando Enrique')}</h4>
                <p className="persona-role">Otras Funciones Corporativas</p>
                <p className="reports-to">Reporta a: Alejandra Guillen</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title"><DocumentIcon size={18} /> Contract Management System</h5>
              <p className="use-case-desc">Gestión de contratos con GridFS, Atlas Search y TTL indexes.</p>
            </div>
          </div>

        </ManagersSection>

      </section>

      {/* Prioridades */}
      <section className="org-section">
        <div className="section-header">
          <StrategyIcon size={32} />
          <h2>PRIORIDADES (QUICK WINS)</h2>
        </div>

        <div className="priority-grid">
          <div className="priority-category high-priority-category">
            <h3>🔥 HIGH PRIORITY - Impacto Inmediato</h3>
            <ul>
              <li><strong>Payment Hub</strong> (Lina Maria Vergara + todos sus managers) - Core business transaccional</li>
              <li><strong>Customer 360 / CDP</strong> (Santiago Zuluaga) - Habilitador estratégico para cross-sell</li>
              <li><strong>Omnichannel Sessions</strong> (Luis Gabriel Correa) - Customer experience crítico</li>
              <li><strong>Investment Portfolio</strong> (Felipe Restrepo team) - Nuevo revenue stream</li>
            </ul>
          </div>

          <div className="priority-category medium-priority-category">
            <h3>⚡ MEDIUM PRIORITY - Impacto 3-6 meses</h3>
            <ul>
              <li><strong>Factoring Platform</strong> (Jorge Valderrama) - Supply chain finance</li>
              <li><strong>Channel Configuration</strong> (Laura Villa) - Operational efficiency</li>
              <li><strong>Video Banking</strong> (Maria Jose Torres) - Digital transformation</li>
            </ul>
          </div>

          <div className="priority-category strategic-category">
            <h3>🎯 STRATEGIC - Largo plazo fundacional</h3>
            <ul>
              <li><strong>Enterprise Architecture</strong> (Rafael Meneses + 12 arquitectos)</li>
              <li><strong>Employee Experience</strong> (Alejandra Guillen)</li>
              <li><strong>Regional Consolidation</strong> (Marcelino Vasquez - Banistmo)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Webinars Recomendados */}
      <section className="org-section">
        <div className="section-header">
          <DocumentIcon size={32} />
          <h2>WEBINARS RECOMENDADOS 2025</h2>
        </div>

        <div className="webinar-timeline">
          <div className="webinar-quarter">
            <h3>Q1 2025</h3>
            <div className="webinar-card">
              <h4>1. Real-time Payment Hub Architecture</h4>
              <p><strong>Target:</strong> Lina Maria Vergara + TODOS sus managers (Payment Hub completo)</p>
              <p><strong>Tema:</strong> Escalando a 100K+ TPS con MongoDB</p>
            </div>
            <div className="webinar-card">
              <h4>2. Omnichannel Customer Experience</h4>
              <p><strong>Target:</strong> Luis Gabriel Correa + sus managers</p>
              <p><strong>Tema:</strong> Gestionando sesiones y journeys en tiempo real</p>
            </div>
          </div>

          <div className="webinar-quarter">
            <h3>Q2 2025</h3>
            <div className="webinar-card">
              <h4>3. Finanzas en Tiempo Real</h4>
              <p><strong>Target:</strong> Felipe Restrepo, Frank Muñoz, Jonathan Bayona</p>
              <p><strong>Tema:</strong> Gestión de Inversiones y Tesorería con Time Series</p>
            </div>
            <div className="webinar-card">
              <h4>4. Enterprise Architecture Repository</h4>
              <p><strong>Target:</strong> Rafael Meneses + todos los arquitectos</p>
              <p><strong>Tema:</strong> De un Excel estático a un Grafo vivo</p>
            </div>
          </div>

          <div className="webinar-quarter">
            <h3>Q3 2025</h3>
            <div className="webinar-card">
              <h4>5. Payment Fraud Detection</h4>
              <p><strong>Target:</strong> Lina Maria Vergara (cruce con equipo de Álvaro)</p>
              <p><strong>Tema:</strong> Patrones de detección de fraude en pagos</p>
            </div>
            <div className="webinar-card">
              <h4>6. Channel Management & Configuration</h4>
              <p><strong>Target:</strong> Laura Villa, David Aguirre, Millerlley Gonzalez</p>
              <p><strong>Tema:</strong> Feature Flags y configuración dinámica</p>
            </div>
          </div>

          <div className="webinar-quarter">
            <h3>Q4 2025</h3>
            <div className="webinar-card">
              <h4>7. Compliance & Security</h4>
              <p><strong>Target:</strong> Adriana Ramirez, Carolina Perez, Danny Hernandez</p>
              <p><strong>Tema:</strong> Queryable Encryption y FLE en servicios financieros</p>
            </div>
            <div className="webinar-card">
              <h4>8. Regional Banking Architecture</h4>
              <p><strong>Target:</strong> Marcelino Vasquez, Jairo Salazar, Rafael Meneses</p>
              <p><strong>Tema:</strong> Consolidando datos con Atlas Multi-Region</p>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos Pasos */}
      <section className="org-section">
        <div className="section-header">
          <StrategyIcon size={32} />
          <h2>PRÓXIMOS PASOS</h2>
        </div>

        <div className="next-steps">
          <div className="step-card">
            <h4>1️⃣ Fase de Discovery</h4>
            <ul>
              <li>Workshop técnico con Payment Hub team</li>
              <li>Deep-dive en arquitectura de canales omnichannel</li>
              <li>Revisión de requisitos de compliance</li>
            </ul>
          </div>

          <div className="step-card">
            <h4>2️⃣ POCs Estratégicos</h4>
            <ul>
              <li>Payment Routing Engine con aggregation pipeline</li>
              <li>Customer 360 con Atlas Search</li>
              <li>Time Series para Investment Portfolio</li>
            </ul>
          </div>

          <div className="step-card">
            <h4>3️⃣ Plan de Webinars</h4>
            <ul>
              <li>Coordinar calendario Q1 2025</li>
              <li>Preparar contenido específico por audiencia</li>
              <li>Invitaciones a managers y directores</li>
            </ul>
          </div>
        </div>
      </section>

    </ClientDocumentLayout>
  )
}
