import React, { useState } from 'react'
import { ClientDocumentLayout } from '../../../components/layouts'
import { CodeBlock, MetricsCard } from '../../../components/shared'
import {
  Building2 as BankIcon,
  Network as ArchitectureIcon,
  Brain as AIIcon,
  Laptop as TechIcon,
  Cable as IntegrationIcon,
  Target as StrategyIcon,
  FileText as DocumentIcon,
  Search as SearchIcon,
  GitCompare as CompareIcon,
  ChevronDown,
  ChevronUp,
  Users
} from 'lucide-react'
import './OrgChartAlvaroCarmona.css'

// Componente colapsable para Managers
const ManagersSection = ({ directorName, children }) => {
  const [isOpen, setIsOpen] = useState(false)

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

export const OrgChartAlvaroCarmona = () => {
  return (
    <ClientDocumentLayout
      client="Bancolombia"
      title="Org Chart Álvaro Carmona - Use Cases MongoDB"
      subtitle="VP Servicios de Tecnología - Casos de Uso Estratégicos"
      author="Leo Alarcón"
      date="2025-01-11"
      tags={['orgchart', 'use-cases', 'arquitectura', 'estrategia']}
      showExportButton={true}
    >
      {/* Hero Section */}
      <section className="org-hero">
        <div className="org-hero-content">
          <div className="org-hero-icon">
            <BankIcon size={80} />
          </div>
          <div className="org-hero-text">
            <h1>Álvaro Carmona</h1>
            <p className="org-hero-title">VP Servicios de Tecnología</p>
            <p className="org-hero-desc">
              Casos de uso estratégicos de MongoDB mapeados por rol, prioridad y capacidad de negocio
            </p>
          </div>
        </div>
      </section>

      {/* VP Level */}
      <section className="org-section">
        <div className="section-header">
          <StrategyIcon size={32} />
          <h2>VP Level - Visión Estratégica</h2>
        </div>

        <div className="persona-card vp-card">
          <div className="persona-header">
            <div className="persona-avatar">
              <StrategyIcon size={48} />
            </div>
            <div className="persona-info">
              <h3>Álvaro Carmona</h3>
              <p className="persona-role">VP Servicios de Tecnología</p>
            </div>
          </div>

          <div className="use-case-container">
            <div className="use-case-badge strategic">ESTRATÉGICO</div>
            <h4 className="use-case-title">Digital Transformation & Modernization Dashboard</h4>
            <p className="use-case-desc">
              Panel ejecutivo unificado para toma de decisiones estratégicas, mostrando KPIs de modernización,
              time-to-market, FinOps y velocidad de innovación en tiempo real.
            </p>

            <div className="tech-features">
              <div className="tech-feature">
                <CompareIcon size={24} />
                <div>
                  <strong>Atlas Charts</strong>
                  <p>Visualización nativa en tiempo real sin ETLs complejos</p>
                </div>
              </div>
              <div className="tech-feature">
                <ArchitectureIcon size={24} />
                <div>
                  <strong>Aggregation Pipeline</strong>
                  <p>Consolidación de métricas dispares en vista coherente</p>
                </div>
              </div>
              <div className="tech-feature">
                <IntegrationIcon size={24} />
                <div>
                  <strong>Atlas Data Federation</strong>
                  <p>Vista 360 unificando silos existentes (S3, SQL, data lakes)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directores */}
      <section className="org-section">
        <div className="section-header">
          <TechIcon size={32} />
          <h2>Directores - Líderes de Área</h2>
        </div>

        {/* Diana Carolina Pulgarin */}
        <div className="persona-card director-card">
          <div className="persona-header">
            <div className="persona-avatar">
              <DocumentIcon size={42} />
            </div>
            <div className="persona-info">
              <h3>Diana Carolina Pulgarin López</h3>
              <p className="persona-role">Líder Habilitadores de Producto y Operación</p>
            </div>
          </div>

          {/* Use Case 1 */}
          <div className="use-case-container">
            <div className="use-case-badge high-priority">ALTA PRIORIDAD</div>
            <h4 className="use-case-title">
              <SearchIcon size={20} /> Customer 360 Platform
            </h4>
            <p className="use-case-desc">
              Vista única y accionable del cliente consolidando productos, canales, interacciones,
              transacciones recientes y perfiles de riesgo en un solo lugar.
            </p>

            <MetricsCard
              title="Beneficios Clave"
              variant="success"
              metrics={[
                { label: 'Impacto', value: 'Estratégico' },
                { label: 'Time to Market', value: '3-4', unit: 'meses' },
                { label: 'ROI', value: 'Alto', trend: 'up' }
              ]}
            />

            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Modelo Flexible:</strong>
                <span>Embebe data frecuente, referencias para histórico</span>
              </div>
              <div className="tech-feature">
                <strong>Atlas Search:</strong>
                <span>Búsqueda fuzzy tolerante a errores</span>
              </div>
              <div className="tech-feature">
                <strong>Change Streams:</strong>
                <span>Reacción en tiempo real a eventos del cliente</span>
              </div>
            </div>
          </div>

          {/* Use Case 2 */}
          <div className="use-case-container">
            <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
            <h4 className="use-case-title">
              <DocumentIcon size={20} /> Product Catalog Management
            </h4>
            <p className="use-case-desc">
              Catálogo de productos financieros centralizado y dinámico, permitiendo lanzar nuevas ofertas
              y promociones en horas, no meses.
            </p>

            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Esquema Flexible:</strong>
                <span>Nuevos atributos sin downtime ni ALTER TABLE</span>
              </div>
              <div className="tech-feature">
                <strong>Document Versioning:</strong>
                <span>Histórico de productos para auditoría</span>
              </div>
              <div className="tech-feature">
                <strong>Schema Validation:</strong>
                <span>Calidad de datos y compliance garantizado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Managers bajo Diana Carolina Pulgarin */}
        <ManagersSection directorName="Diana Carolina Pulgarin">

          {/* Juan Esteban Tobon Mendez */}
          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <IntegrationIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>Juan Esteban Tobon Mendez</h4>
                <p className="persona-role">Evolución Core Productos Canales</p>
                <p className="reports-to">Reporta a: Diana Carolina Pulgarin</p>
              </div>
            </div>

            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title">
                <IntegrationIcon size={18} /> Core Banking Modernization (Strangler Pattern)
              </h5>
              <p className="use-case-desc">
                Desacople gradual del core bancario legacy hacia microservicios, empezando por productos de alta demanda.
              </p>

              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Multi-Document ACID:</strong>
                  <span>Consistencia en transferencias complejas</span>
                </div>
                <div className="tech-feature">
                  <strong>Change Streams:</strong>
                  <span>Sincronización bidireccional core ↔ microservicios</span>
                </div>
                <div className="tech-feature">
                  <strong>Modelo Flexible:</strong>
                  <span>Cuentas y productos sin rigidez relacional</span>
                </div>
              </div>
            </div>
          </div>

          {/* Natalia Maria Hernandez */}
          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <TechIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>Natalia Maria Hernandez</h4>
                <p className="persona-role">Evolución Digital TI</p>
                <p className="reports-to">Reporta a: Diana Carolina Pulgarin</p>
              </div>
            </div>

            <div className="use-case-container compact">
              <div className="use-case-badge high-priority">ALTA PRIORIDAD</div>
              <h5 className="use-case-title">
                <TechIcon size={18} /> Mobile Banking Backend (App Bancolombia/Nequi)
              </h5>
              <p className="use-case-desc">
                Backend de alto performance para aplicación móvil con capacidad de sincronización offline y alta disponibilidad.
              </p>

              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Baja Latencia:</strong>
                  <span>Queries en milisegundos para millones de usuarios</span>
                </div>
                <div className="tech-feature">
                  <strong>Geospatial Queries:</strong>
                  <span>Cajeros cercanos, sucursales por ubicación</span>
                </div>
                <div className="tech-feature">
                  <strong>Alta Disponibilidad:</strong>
                  <span>Multi-region deployment para 99.99% uptime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Juan Alejandro Arias */}
          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <ArchitectureIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>Juan Alejandro Arias</h4>
                <p className="persona-role">Modernización Procesos y Ops</p>
                <p className="reports-to">Reporta a: Diana Carolina Pulgarin</p>
              </div>
            </div>

            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title">
                <ArchitectureIcon size={18} /> Business Process Management (BPM) & Workflow
              </h5>
              <p className="use-case-desc">
                Motor de workflows complejos (aprobación de créditos, onboarding) con seguimiento de estados, SLAs y auditoría.
              </p>

              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>State Machine Pattern:</strong>
                  <span>Modelado natural de estados y transiciones</span>
                </div>
                <div className="tech-feature">
                  <strong>Change Streams:</strong>
                  <span>Notificaciones automáticas de cambios de estado</span>
                </div>
                <div className="tech-feature">
                  <strong>TTL Indexes:</strong>
                  <span>Escalamiento automático por SLA vencido</span>
                </div>
              </div>
            </div>
          </div>

        </ManagersSection>

        {/* Juan Carlos Sepúlveda */}
        <div className="persona-card director-card">
          <div className="persona-header">
            <div className="persona-avatar">
              <AIIcon size={42} />
            </div>
            <div className="persona-info">
              <h3>Juan Carlos Sepúlveda Villegas</h3>
              <p className="persona-role">Líder Entorno Datos, AI, Analítica e Integración</p>
            </div>
          </div>

          {/* Use Case 1 - Vector Search */}
          <div className="use-case-container">
            <div className="use-case-badge high-priority">ALTA PRIORIDAD</div>
            <h4 className="use-case-title">
              <AIIcon size={20} /> Vector Search para Gen AI (RAG)
            </h4>
            <p className="use-case-desc">
              Potenciar aplicaciones de IA Generativa con RAG para dar respuestas precisas basadas en
              documentación interna del banco (políticas, manuales, KBs).
            </p>

            <MetricsCard
              title="Capacidades IA"
              variant="info"
              metrics={[
                { label: 'Innovación', value: 'Diferenciador' },
                { label: 'Eficiencia', value: '+60%', trend: 'up' },
                { label: 'Accuracy', value: '>90%' }
              ]}
            />

            <div className="code-example">
              <CodeBlock language="javascript" title="Ejemplo Vector Search">
{`// Búsqueda semántica en documentos del banco
db.documentos.aggregate([
  {
    $vectorSearch: {
      index: "knowledge_base_vectors",
      queryVector: embedding_de_pregunta,
      path: "embedding",
      numCandidates: 100,
      limit: 5
    }
  },
  {
    $project: {
      titulo: 1,
      contenido: 1,
      score: { $meta: "vectorSearchScore" }
    }
  }
])`}
              </CodeBlock>
            </div>

            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Atlas Vector Search:</strong>
                <span>Búsqueda por similitud semántica nativa</span>
              </div>
              <div className="tech-feature">
                <strong>Integración Nativa:</strong>
                <span>LangChain, LlamaIndex listos para usar</span>
              </div>
              <div className="tech-feature">
                <strong>Datos + Vectores:</strong>
                <span>Sin necesidad de base vectorial separada</span>
              </div>
            </div>
          </div>

          {/* Use Case 2 - Real-time Analytics */}
          <div className="use-case-container">
            <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
            <h4 className="use-case-title">
              <ArchitectureIcon size={20} /> Real-time Analytics Platform
            </h4>
            <p className="use-case-desc">
              Plataforma de analítica operacional sobre datos transaccionales en caliente sin impactar
              performance de aplicaciones core.
            </p>

            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Aggregation Pipeline:</strong>
                <span>Millones de docs procesados en segundos</span>
              </div>
              <div className="tech-feature">
                <strong>Nodos Analíticos:</strong>
                <span>Workload isolation para BI sin impacto</span>
              </div>
              <div className="tech-feature">
                <strong>Time Series:</strong>
                <span>Compresión 90% para métricas masivas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Managers bajo Juan Carlos Sepúlveda */}
        <ManagersSection directorName="Juan Carlos Sepúlveda">

          {/* Marco Antonio Estrada */}
          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <IntegrationIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>Marco Antonio Estrada</h4>
                <p className="persona-role">Servicios e Integraciones, API Management</p>
                <p className="reports-to">Reporta a: Juan Carlos Sepúlveda</p>
              </div>
            </div>

            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title">
                <IntegrationIcon size={18} /> API Gateway Metadata Store
              </h5>
              <p className="use-case-desc">
                Almacén de configuración para API Gateway (Kong, Apigee) con políticas, rate limits, tokens y routing.
              </p>

              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Lecturas Ultra-Rápidas:</strong>
                  <span>Cacheo y reads &lt;1ms para routing en tiempo real</span>
                </div>
                <div className="tech-feature">
                  <strong>Esquema Flexible:</strong>
                  <span>APIs REST, GraphQL, gRPC en un solo lugar</span>
                </div>
                <div className="tech-feature">
                  <strong>Change Streams:</strong>
                  <span>Propagación instantánea de cambios a todos los nodos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Helder Ivan Ramirez */}
          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <AIIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>Helder Ivan Ramirez</h4>
                <p className="persona-role">Datos, Analítica, IA, Blockchain</p>
                <p className="reports-to">Reporta a: Juan Carlos Sepúlveda</p>
              </div>
            </div>

            <div className="use-case-container compact">
              <div className="use-case-badge high-priority">ALTA PRIORIDAD</div>
              <h5 className="use-case-title">
                <AIIcon size={18} /> Feature Store para ML
              </h5>
              <p className="use-case-desc">
                Almacenamiento y serving de features pre-calculados para modelos de ML (scoring de riesgo, propensión).
              </p>

              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Baja Latencia (Serving):</strong>
                  <span>Entrega features en &lt;5ms para inferencia real-time</span>
                </div>
                <div className="tech-feature">
                  <strong>Time Series Collections:</strong>
                  <span>Features temporales (gasto últimos 30 días)</span>
                </div>
                <div className="tech-feature">
                  <strong>Aggregation Pipeline:</strong>
                  <span>Feature engineering dentro de la BD</span>
                </div>
              </div>
            </div>
          </div>

        </ManagersSection>

        {/* Camilo Piedrahita */}
        <div className="persona-card director-card">
          <div className="persona-header">
            <div className="persona-avatar">
              <TechIcon size={42} />
            </div>
            <div className="persona-info">
              <h3>Camilo Piedrahita Macias</h3>
              <p className="persona-role">Líder Centro Excelencia Desarrollo</p>
            </div>
          </div>

          {/* Fraud Detection */}
          <div className="use-case-container">
            <div className="use-case-badge high-priority">ALTA PRIORIDAD - ROI INMEDIATO</div>
            <h4 className="use-case-title">
              <SearchIcon size={20} /> Real-time Fraud Detection
            </h4>
            <p className="use-case-desc">
              Detección de patrones de fraude en milisegundos durante la transacción,
              antes de que el dinero salga del banco.
            </p>

            <MetricsCard
              title="Performance Crítico"
              variant="warning"
              metrics={[
                { label: 'Latencia', value: '<10', unit: 'ms' },
                { label: 'Throughput', value: '100K+', unit: 'TPS' },
                { label: 'Reducción Fraude', value: '40%', trend: 'up' }
              ]}
            />

            <div className="code-example">
              <CodeBlock language="javascript" title="Scoring en Tiempo Real">
{`// Evaluación de riesgo en <10ms
db.transacciones.aggregate([
  {
    $match: {
      cliente_id: "123456",
      fecha: { $gte: new Date(Date.now() - 86400000) }
    }
  },
  {
    $group: {
      _id: "$categoria",
      total: { $sum: "$monto" },
      count: { $sum: 1 }
    }
  },
  {
    $addFields: {
      risk_score: {
        $cond: {
          if: { $gt: ["$total", 5000000] },
          then: "HIGH",
          else: "LOW"
        }
      }
    }
  }
])`}
              </CodeBlock>
            </div>
          </div>

          {/* Developer Platform */}
          <div className="use-case-container">
            <div className="use-case-badge strategic">ESTRATÉGICO</div>
            <h4 className="use-case-title">
              <TechIcon size={20} /> Developer Data Platform (Self-Service)
            </h4>
            <p className="use-case-desc">
              Plataforma self-service para developers sin depender de DBAs, acelerando time-to-market.
            </p>

            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Atlas + Data API:</strong>
                <span>Aprovisionamiento vía Terraform/API automático</span>
              </div>
              <div className="tech-feature">
                <strong>RBAC Granular:</strong>
                <span>Seguridad sin ser cuello de botella</span>
              </div>
              <div className="tech-feature">
                <strong>Compass + Validation:</strong>
                <span>Exploración visual con gobernabilidad</span>
              </div>
            </div>
          </div>
        </div>

        {/* Managers bajo Camilo Piedrahita */}
        <ManagersSection directorName="Camilo Piedrahita">

          {/* Ruben Dario Cardenas */}
          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <TechIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>Ruben Dario Cardenas</h4>
                <p className="persona-role">Capacidades Ciclovida TI</p>
                <p className="reports-to">Reporta a: Camilo Piedrahita</p>
              </div>
            </div>

            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title">
                <TechIcon size={18} /> CI/CD Pipeline Metadata (Trazabilidad DevOps)
              </h5>
              <p className="use-case-desc">
                Repositorio centralizado de trazabilidad completa del ciclo de vida: commits, builds, deploys, ambientes, resultados de pruebas.
              </p>

              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Change Streams:</strong>
                  <span>Notificaciones push a Slack/Jira cuando falla un deploy</span>
                </div>
                <div className="tech-feature">
                  <strong>Modelo de Documento:</strong>
                  <span>Jerarquía del pipeline en un solo documento</span>
                </div>
                <div className="tech-feature">
                  <strong>TTL Indexes:</strong>
                  <span>Limpieza automática de logs antiguos (&gt;90 días)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Youlin Alejandro Varela */}
          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <SearchIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>Youlin Alejandro Varela</h4>
                <p className="persona-role">Gestión Fraude TI</p>
                <p className="reports-to">Reporta a: Camilo Piedrahita</p>
              </div>
            </div>

            <div className="use-case-container compact">
              <div className="use-case-badge high-priority">ALTA PRIORIDAD - ROI DIRECTO</div>
              <h5 className="use-case-title">
                <SearchIcon size={18} /> Fraud Rules Engine (Motor de Reglas)
              </h5>
              <p className="use-case-desc">
                Backend para motor de reglas de fraude que evalúa cientos de reglas contra perfil de cliente en &lt;50ms.
              </p>

              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Aggregation Pipeline:</strong>
                  <span>Reglas complejas ejecutadas en milisegundos</span>
                </div>
                <div className="tech-feature">
                  <strong>Índices Optimizados:</strong>
                  <span>Pattern matching rápido sobre historial transaccional</span>
                </div>
                <div className="tech-feature">
                  <strong>Updates Atómicos:</strong>
                  <span>Actualización de scores y contadores concurrente y segura</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emanuel Medina Gomez */}
          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <ArchitectureIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>Emanuel Medina Gomez</h4>
                <p className="persona-role">Ingeniería Plataformas TI</p>
                <p className="reports-to">Reporta a: Camilo Piedrahita</p>
              </div>
            </div>

            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title">
                <ArchitectureIcon size={18} /> Internal Developer Platform (IDP) Backend
              </h5>
              <p className="use-case-desc">
                Backend para portal self-service de developers (IDP/Backstage), gestionando catálogo de servicios, APIs y recursos cloud.
              </p>

              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Multi-Tenancy (RBAC):</strong>
                  <span>Cada equipo solo ve sus propios servicios</span>
                </div>
                <div className="tech-feature">
                  <strong>Atlas Data API:</strong>
                  <span>API REST/GraphQL automática para el frontend</span>
                </div>
                <div className="tech-feature">
                  <strong>Schema Validation:</strong>
                  <span>Servicios cumplen estándares de gobernabilidad</span>
                </div>
              </div>
            </div>
          </div>

        </ManagersSection>

        {/* David Jaramillo */}
        <div className="persona-card director-card">
          <div className="persona-header">
            <div className="persona-avatar">
              <ArchitectureIcon size={42} />
            </div>
            <div className="persona-info">
              <h3>David Alberto Jaramillo Morales</h3>
              <p className="persona-role">Líder Centro Excelencia Infraestructura</p>
            </div>
          </div>

          {/* Mainframe Offloading */}
          <div className="use-case-container">
            <div className="use-case-badge medium-priority">MEDIA PRIORIDAD - AHORRO COSTOS</div>
            <h4 className="use-case-title">
              <IntegrationIcon size={20} /> Mainframe Offloading
            </h4>
            <p className="use-case-desc">
              Reducir costos de MIPS descargando queries pesadas del mainframe a plataforma moderna y escalable.
            </p>

            <MetricsCard
              title="Ahorro Proyectado"
              variant="success"
              metrics={[
                { label: 'Reducción MIPS', value: '60%', trend: 'down' },
                { label: 'Performance', value: '100x', unit: 'más rápido' },
                { label: 'Ahorro Anual', value: '$2M+' }
              ]}
            />

            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>CDC en Tiempo Real:</strong>
                <span>Sincronización desde DB2/IMS vía Qlik/Debezium</span>
              </div>
              <div className="tech-feature">
                <strong>Réplicas de Lectura:</strong>
                <span>Analítica 100x más rápida y 90% más barata</span>
              </div>
              <div className="tech-feature">
                <strong>Data Federation:</strong>
                <span>Join mainframe + S3 sin mover datos</span>
              </div>
            </div>
          </div>

          {/* Observability */}
          <div className="use-case-container">
            <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
            <h4 className="use-case-title">
              <ArchitectureIcon size={20} /> Observability Platform (Logs, Métricas, Traces)
            </h4>
            <p className="use-case-desc">
              Centralizar logs, métricas y traces de toda la infraestructura en plataforma unificada.
            </p>

            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Time Series:</strong>
                <span>Millones de métricas/seg con 90% compresión</span>
              </div>
              <div className="tech-feature">
                <strong>Esquema Flexible:</strong>
                <span>Logs heterogéneos sin pre-procesamiento</span>
              </div>
              <div className="tech-feature">
                <strong>Aggregation + Search:</strong>
                <span>RCA (Root Cause Analysis) en segundos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Managers bajo David Jaramillo */}
        <ManagersSection directorName="David Jaramillo">

          {/* Ana Catalina Cedeivid Lopez */}
          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <SearchIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>Ana Catalina Cedeivid Lopez</h4>
                <p className="persona-role">Conocimiento Plataformas</p>
                <p className="reports-to">Reporta a: David Jaramillo</p>
              </div>
            </div>

            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title">
                <SearchIcon size={18} /> Knowledge Base con Search Semántica
              </h5>
              <p className="use-case-desc">
                Base de conocimiento técnico (KEDB) para infraestructura y operaciones con búsqueda semántica inteligente.
              </p>

              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Atlas Search & Vector Search:</strong>
                  <span>Combina búsqueda full-text con semántica</span>
                </div>
                <div className="tech-feature">
                  <strong>Filtros Facetados:</strong>
                  <span>Filtrar por plataforma, tipo de error, tecnología</span>
                </div>
                <div className="tech-feature">
                  <strong>Highlighting:</strong>
                  <span>Resalta respuestas exactas dentro del documento</span>
                </div>
              </div>
            </div>
          </div>

          {/* Managers restantes de David Jaramillo - Formato compacto */}
          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><TechIcon size={36} /></div>
              <div className="persona-info">
                <h4>Daniel Umberto Avila</h4>
                <p className="persona-role">Ingeniería DEVEXP (Developer Experience)</p>
                <p className="reports-to">Reporta a: David Jaramillo</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><TechIcon size={18} /> Developer Sandbox Automation</h5>
              <p className="use-case-desc">Aprovisionamiento automático de ambientes de desarrollo efímeros con datos de prueba.</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><IntegrationIcon size={36} /></div>
              <div className="persona-info">
                <h4>Diego Leon Gamboa</h4>
                <p className="persona-role">Integración Continua</p>
                <p className="reports-to">Reporta a: David Jaramillo</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><IntegrationIcon size={18} /> Test Results Repository & Analytics</h5>
              <p className="use-case-desc">Almacenamiento masivo de resultados de tests unitarios, integración y E2E para análisis de calidad.</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><ArchitectureIcon size={36} /></div>
              <div className="persona-info">
                <h4>Walter Anibal Duque</h4>
                <p className="persona-role">Plataformas Centrales</p>
                <p className="reports-to">Reporta a: David Jaramillo</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><ArchitectureIcon size={18} /> Multi-tenant Platform Backend</h5>
              <p className="use-case-desc">Backend para plataforma compartida con aislamiento de datos por tenant (cliente interno o área).</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><ArchitectureIcon size={36} /></div>
              <div className="persona-info">
                <h4>John Alexander Sierra</h4>
                <p className="persona-role">Integrada Operación TI</p>
                <p className="reports-to">Reporta a: David Jaramillo</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><ArchitectureIcon size={18} /> Unified Monitoring Dashboard</h5>
              <p className="use-case-desc">Consolidación de métricas de múltiples fuentes en un dashboard unificado de operaciones.</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><IntegrationIcon size={36} /></div>
              <div className="persona-info">
                <h4>Gerardo Plazas</h4>
                <p className="persona-role">Diseño Operación Telco TI</p>
                <p className="reports-to">Reporta a: David Jaramillo</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><IntegrationIcon size={18} /> Network Performance Monitoring</h5>
              <p className="use-case-desc">Métricas de red en tiempo real (CDRs, performance) con time series collections.</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><TechIcon size={36} /></div>
              <div className="persona-info">
                <h4>Jorge Andres Ochoa</h4>
                <p className="persona-role">Plataformas Servicios X86 TI</p>
                <p className="reports-to">Reporta a: David Jaramillo</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><TechIcon size={18} /> VM Inventory & Dynamic CMDB</h5>
              <p className="use-case-desc">Inventario dinámico de activos (CMDB), VMs y configuraciones con auto-discovery.</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><ArchitectureIcon size={36} /></div>
              <div className="persona-info">
                <h4>Juan David Franco</h4>
                <p className="persona-role">EMMA TI</p>
                <p className="reports-to">Reporta a: David Jaramillo</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><ArchitectureIcon size={18} /> Enterprise Monitoring Aggregation</h5>
              <p className="use-case-desc">Agregación de datos de monitoreo de múltiples herramientas (Prometheus, DataDog, etc).</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><TechIcon size={36} /></div>
              <div className="persona-info">
                <h4>Rogelio Adolfo Duque</h4>
                <p className="persona-role">Análisis ING Confiabilidad (SRE)</p>
                <p className="reports-to">Reporta a: David Jaramillo</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><TechIcon size={18} /> SRE Metrics & Post-mortems</h5>
              <p className="use-case-desc">Tracking de MTBF, MTTR, error budgets, incidents y post-mortems con time series.</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><DocumentIcon size={36} /></div>
              <div className="persona-info">
                <h4>Hernan Zuleta</h4>
                <p className="persona-role">Conocimiento Plataforma Aplicaciones</p>
                <p className="reports-to">Reporta a: David Jaramillo</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><DocumentIcon size={18} /> Application Portfolio Repository (APM)</h5>
              <p className="use-case-desc">Inventario centralizado de aplicaciones del banco con tech stack, propietarios y dependencias.</p>
            </div>
          </div>

        </ManagersSection>

        {/* Juan David Vergara */}
        <div className="persona-card director-card">
          <div className="persona-header">
            <div className="persona-avatar">
              <ArchitectureIcon size={42} />
            </div>
            <div className="persona-info">
              <h3>Juan David Vergara Pérez</h3>
              <p className="persona-role">Líder Centro Excelencia Arquitectura</p>
            </div>
          </div>

          {/* ADR Repository */}
          <div className="use-case-container">
            <div className="use-case-badge strategic">ESTRATÉGICO - GOVERNANCE</div>
            <h4 className="use-case-title">
              <DocumentIcon size={20} /> Architecture Decision Records (ADR) Repository
            </h4>
            <p className="use-case-desc">
              Repositorio centralizado y versionado de decisiones arquitectónicas, patrones y blueprints
              para estandarizar desarrollo.
            </p>

            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Document Versioning:</strong>
                <span>Histórico completo de evolución de estándares</span>
              </div>
              <div className="tech-feature">
                <strong>Atlas Search:</strong>
                <span>Búsqueda full-text y facetada en ADRs</span>
              </div>
              <div className="tech-feature">
                <strong>$graphLookup:</strong>
                <span>Análisis de dependencias entre decisiones</span>
              </div>
            </div>
          </div>

          {/* Technology Radar */}
          <div className="use-case-container">
            <div className="use-case-badge strategic">ESTRATÉGICO</div>
            <h4 className="use-case-title">
              <StrategyIcon size={20} /> Technology Radar & Portfolio Management
            </h4>
            <p className="use-case-desc">
              Gestión del portafolio de tecnologías y aplicaciones con Tech Radar del banco
              (Adopt, Trial, Assess, Hold).
            </p>

            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Esquema Flexible:</strong>
                <span>Assessments heterogéneos en una sola plataforma</span>
              </div>
              <div className="tech-feature">
                <strong>Aggregation Pipeline:</strong>
                <span>Visualización radar y reportes de deuda técnica</span>
              </div>
              <div className="tech-feature">
                <strong>Atlas Charts:</strong>
                <span>Dashboards de portafolio tecnológico en tiempo real</span>
              </div>
            </div>
          </div>
        </div>

        {/* Managers bajo Juan David Vergara */}
        <ManagersSection directorName="Juan David Vergara">

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><AIIcon size={36} /></div>
              <div className="persona-info">
                <h4>Sebastian Osorio</h4>
                <p className="persona-role">Arquitectura Innovación TI</p>
                <p className="reports-to">Reporta a: Juan David Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge strategic">ESTRATÉGICO</div>
              <h5 className="use-case-title"><AIIcon size={18} /> Innovation Lab Project Tracker</h5>
              <p className="use-case-desc">Seguimiento de POCs, experimentos de innovación y evaluaciones de tecnología (Gen AI, Blockchain, etc).</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><StrategyIcon size={36} /></div>
              <div className="persona-info">
                <h4>Yenni Andrea Cano</h4>
                <p className="persona-role">FINOPS TI</p>
                <p className="reports-to">Reporta a: Juan David Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <div className="use-case-badge high-priority">ALTA PRIORIDAD - AHORRO COSTOS</div>
              <h5 className="use-case-title"><StrategyIcon size={18} /> Cloud Cost Analytics & Optimization (FinOps)</h5>
              <p className="use-case-desc">Plataforma de FinOps para análisis granular de costos de nube (AWS, Azure, GCP) con atribución detallada.</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><ArchitectureIcon size={36} /></div>
              <div className="persona-info">
                <h4>Alexis Eduardo Ocampo</h4>
                <p className="persona-role">Arquitectura Solución TI</p>
                <p className="reports-to">Reporta a: Juan David Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><ArchitectureIcon size={18} /> Solution Architecture Repository & Standards</h5>
              <p className="use-case-desc">Repositorio de blueprints de arquitectura y patrones de diseño con GridFS para diagramas grandes.</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><ArchitectureIcon size={36} /></div>
              <div className="persona-info">
                <h4>Esnaider Estrada</h4>
                <p className="persona-role">Arquitectura Solución TI</p>
                <p className="reports-to">Reporta a: Juan David Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><ArchitectureIcon size={18} /> Microservices Catalog</h5>
              <p className="use-case-desc">Inventario de microservicios con APIs y dependencias usando graph queries para service mesh topology.</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><TechIcon size={36} /></div>
              <div className="persona-info">
                <h4>Bryan Camilo Mosquera</h4>
                <p className="persona-role">Arquitectura Técnica TI</p>
                <p className="reports-to">Reporta a: Juan David Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><TechIcon size={18} /> Technical Debt Registry</h5>
              <p className="use-case-desc">Tracking de deuda técnica con priorización usando aggregations para scoring y Atlas Charts para visibility.</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><ArchitectureIcon size={36} /></div>
              <div className="persona-info">
                <h4>Luis Eduardo Gonzalez</h4>
                <p className="persona-role">Arquitectura de TI</p>
                <p className="reports-to">Reporta a: Juan David Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><ArchitectureIcon size={18} /> Enterprise Architecture Roadmap</h5>
              <p className="use-case-desc">Roadmap de arquitectura empresarial con capabilities y esquema flexible para diferentes tipos de initiatives.</p>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar"><DocumentIcon size={36} /></div>
              <div className="persona-info">
                <h4>Erick Allan Wales</h4>
                <p className="persona-role">Arquitectura de TI</p>
                <p className="reports-to">Reporta a: Juan David Vergara</p>
              </div>
            </div>
            <div className="use-case-container compact">
              <h5 className="use-case-title"><DocumentIcon size={18} /> Security Controls Catalog</h5>
              <p className="use-case-desc">Inventario de controles de seguridad y compliance con Field-Level Encryption para datos sensibles.</p>
            </div>
          </div>

        </ManagersSection>

        {/* Alicia Cano */}
        <div className="persona-card director-card">
          <div className="persona-header">
            <div className="persona-avatar">
              <DocumentIcon size={42} />
            </div>
            <div className="persona-info">
              <h3>Alicia María Cano Cano</h3>
              <p className="persona-role">Líder Oficina Gobierno TI</p>
            </div>
          </div>

          {/* Governance Dashboard */}
          <div className="use-case-container">
            <div className="use-case-badge high-priority">ALTA PRIORIDAD - COMPLIANCE</div>
            <h4 className="use-case-title">
              <DocumentIcon size={20} /> IT Governance & Compliance Dashboard
            </h4>
            <p className="use-case-desc">
              KPIs de gobierno, compliance (PCI, Superfinanciera) y auditoría en un solo lugar
              con trazabilidad completa.
            </p>

            <MetricsCard
              title="Compliance & Security"
              variant="info"
              metrics={[
                { label: 'Audit Logs', value: 'Nativo' },
                { label: 'Encryption', value: 'Field-Level' },
                { label: 'Certificaciones', value: 'PCI, SOC2, ISO' }
              ]}
            />

            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Audit Logs Nativos:</strong>
                <span>Registro automático de todas las acciones con export a SIEM</span>
              </div>
              <div className="tech-feature">
                <strong>Queryable Encryption:</strong>
                <span>Encriptación a nivel de campo para PII</span>
              </div>
              <div className="tech-feature">
                <strong>Atlas Charts:</strong>
                <span>Dashboards para auditores consolidando logs y políticas</span>
              </div>
            </div>
          </div>

          {/* Policy Management */}
          <div className="use-case-container">
            <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
            <h4 className="use-case-title">
              <DocumentIcon size={20} /> Policy & Procedure Management
            </h4>
            <p className="use-case-desc">
              Ciclo de vida completo de políticas y procedimientos de TI y seguridad
              (creación, aprobación, versionado, publicación).
            </p>

            <div className="tech-features compact">
              <div className="tech-feature">
                <strong>Document Versioning:</strong>
                <span>Quién cambió qué y cuándo en cada política</span>
              </div>
              <div className="tech-feature">
                <strong>Atlas Search:</strong>
                <span>Búsqueda full-text en el cuerpo de políticas</span>
              </div>
              <div className="tech-feature">
                <strong>TTL Indexes:</strong>
                <span>Archivado automático según mandatos de compliance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Managers bajo Alicia Cano */}
        <ManagersSection directorName="Alicia María Cano">

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <DocumentIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>Maria Elsy Giraldo</h4>
                <p className="persona-role">NEON TI</p>
                <p className="reports-to">Reporta a: Alicia María Cano</p>
              </div>
            </div>

            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title">
                <DocumentIcon size={18} /> Operating Model Documentation (NEON/ITIL)
              </h5>
              <p className="use-case-desc">
                Documentación centralizada del modelo operativo ITIL/NEON con procesos,
                procedimientos y flujos de trabajo de TI.
              </p>
              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Atlas Search:</strong>
                  <span>Búsqueda en procedimientos operativos</span>
                </div>
                <div className="tech-feature">
                  <strong>Change Streams:</strong>
                  <span>Notificaciones automáticas de actualizaciones a procesos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="persona-card manager-card">
            <div className="persona-header">
              <div className="persona-avatar manager-avatar">
                <ArchitectureIcon size={36} />
              </div>
              <div className="persona-info">
                <h4>David Elias Marin</h4>
                <p className="persona-role">Modelo Operativo TI</p>
                <p className="reports-to">Reporta a: Alicia María Cano</p>
              </div>
            </div>

            <div className="use-case-container compact">
              <div className="use-case-badge medium-priority">MEDIA PRIORIDAD</div>
              <h5 className="use-case-title">
                <ArchitectureIcon size={18} /> Team Topology & Resource Allocation
              </h5>
              <p className="use-case-desc">
                Estructura de equipos, asignación de recursos y métricas de productividad
                del modelo operativo de TI.
              </p>
              <div className="tech-features compact">
                <div className="tech-feature">
                  <strong>Time Series:</strong>
                  <span>Métricas de carga de trabajo por equipo</span>
                </div>
                <div className="tech-feature">
                  <strong>Atlas Charts:</strong>
                  <span>Dashboards de resource allocation y capacity planning</span>
                </div>
              </div>
            </div>
          </div>

        </ManagersSection>
      </section>

      {/* Prioridades */}
      <section className="org-section priorities-section">
        <div className="section-header">
          <StrategyIcon size={32} />
          <h2>Prioridades y Quick Wins</h2>
        </div>

        <div className="priorities-grid">
          <div className="priority-card high">
            <div className="priority-header">
              <h3>🎯 ALTA PRIORIDAD</h3>
              <span className="priority-badge">Impacto Inmediato</span>
            </div>
            <ul className="priority-list">
              <li>
                <strong>Fraud Detection</strong> (Youlin Varela)<br />
                <span>ROI medible, real-time, alta visibilidad</span>
              </li>
              <li>
                <strong>Customer 360</strong> (Diana Pulgarin)<br />
                <span>Estratégico, habilitador de personalización</span>
              </li>
              <li>
                <strong>Vector Search/AI</strong> (Helder Ramirez)<br />
                <span>Innovación, diferenciador competitivo</span>
              </li>
              <li>
                <strong>FinOps</strong> (Yenni Cano)<br />
                <span>Ahorro de costos cuantificable</span>
              </li>
            </ul>
          </div>

          <div className="priority-card medium">
            <div className="priority-header">
              <h3>⚙️ MEDIA PRIORIDAD</h3>
              <span className="priority-badge">Impacto 3-6 meses</span>
            </div>
            <ul className="priority-list">
              <li>
                <strong>Mainframe Offloading</strong><br />
                <span>David Jaramillo + Juan David Vergara</span>
              </li>
              <li>
                <strong>API Management</strong><br />
                <span>Marco Estrada - Agilidad y gobernabilidad</span>
              </li>
              <li>
                <strong>Observability</strong><br />
                <span>John Sierra + Juan David Franco</span>
              </li>
            </ul>
          </div>

          <div className="priority-card strategic">
            <div className="priority-header">
              <h3>🚀 ESTRATÉGICO</h3>
              <span className="priority-badge">Largo plazo - Fundacional</span>
            </div>
            <ul className="priority-list">
              <li>
                <strong>Platform Engineering</strong><br />
                <span>Emanuel Medina + Walter Duque</span>
              </li>
              <li>
                <strong>Architecture Governance</strong><br />
                <span>Todo el equipo de Juan David Vergara</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Webinars */}
      <section className="org-section webinars-section">
        <div className="section-header">
          <AIIcon size={32} />
          <h2>Plan de Webinars 2025</h2>
        </div>

        <div className="webinars-timeline">
          <div className="webinar-quarter">
            <h3>Q1 2025</h3>
            <div className="webinar-card">
              <div className="webinar-number">1</div>
              <div className="webinar-content">
                <h4>MongoDB Decision Matrix para Arquitectos</h4>
                <p className="webinar-target">
                  <strong>Target:</strong> Todo el equipo de Juan David Vergara
                </p>
                <p className="webinar-desc">
                  Cuándo (y cuándo NO) usar MongoDB en el sector financiero
                </p>
              </div>
            </div>
            <div className="webinar-card">
              <div className="webinar-number">2</div>
              <div className="webinar-content">
                <h4>Real-time Fraud Detection</h4>
                <p className="webinar-target">
                  <strong>Target:</strong> Youlin Varela + Camilo Piedrahita
                </p>
                <p className="webinar-desc">
                  Workshop: Detección de fraude en &lt;50ms
                </p>
              </div>
            </div>
          </div>

          <div className="webinar-quarter">
            <h3>Q2 2025</h3>
            <div className="webinar-card">
              <div className="webinar-number">3</div>
              <div className="webinar-content">
                <h4>Mainframe Offloading Strategies</h4>
                <p className="webinar-target">
                  <strong>Target:</strong> David Jaramillo + Juan Esteban Tobon
                </p>
                <p className="webinar-desc">
                  De MIPS a la nube: Estrategias prácticas
                </p>
              </div>
            </div>
            <div className="webinar-card">
              <div className="webinar-number">4</div>
              <div className="webinar-content">
                <h4>Gen AI & Vector Search</h4>
                <p className="webinar-target">
                  <strong>Target:</strong> Helder Ramirez + Sebastian Osorio
                </p>
                <p className="webinar-desc">
                  Creando chatbot bancario con Atlas Vector Search (RAG)
                </p>
              </div>
            </div>
          </div>

          <div className="webinar-quarter">
            <h3>Q3 2025</h3>
            <div className="webinar-card">
              <div className="webinar-number">5</div>
              <div className="webinar-content">
                <h4>Platform Engineering con MongoDB</h4>
                <p className="webinar-target">
                  <strong>Target:</strong> Emanuel Medina + Walter Duque
                </p>
                <p className="webinar-desc">
                  Acelerando time-to-market con IDP
                </p>
              </div>
            </div>
            <div className="webinar-card">
              <div className="webinar-number">6</div>
              <div className="webinar-content">
                <h4>FinOps & Cost Optimization</h4>
                <p className="webinar-target">
                  <strong>Target:</strong> Yenni Cano
                </p>
                <p className="webinar-desc">
                  Guía práctica de optimización de costos cloud
                </p>
              </div>
            </div>
          </div>

          <div className="webinar-quarter">
            <h3>Q4 2025</h3>
            <div className="webinar-card">
              <div className="webinar-number">7</div>
              <div className="webinar-content">
                <h4>Observability & SRE at Scale</h4>
                <p className="webinar-target">
                  <strong>Target:</strong> John Sierra + Juan Franco + Rogelio Duque
                </p>
                <p className="webinar-desc">
                  Gestionando SLOs y Error Budgets con Time Series
                </p>
              </div>
            </div>
            <div className="webinar-card">
              <div className="webinar-number">8</div>
              <div className="webinar-content">
                <h4>Construyendo el Cliente 360</h4>
                <p className="webinar-target">
                  <strong>Target:</strong> Diana Pulgarin + Natalia Hernandez
                </p>
                <p className="webinar-desc">
                  Más allá del dato, hacia la acción
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="org-section">
        <div className="section-header">
          <StrategyIcon size={32} />
          <h2>Próximos Pasos</h2>
        </div>

        <div className="next-steps">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Validación con Stakeholders</h4>
              <p>Revisar prioridades y use cases con cada director</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>POC Quick Win</h4>
              <p>Iniciar con Fraud Detection o Customer 360</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Roadmap de Webinars</h4>
              <p>Confirmar fechas y speakers para Q1 2025</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Sizing & Architecture</h4>
              <p>Dimensionamiento técnico de los casos priorizados</p>
            </div>
          </div>
        </div>
      </section>
    </ClientDocumentLayout>
  )
}
