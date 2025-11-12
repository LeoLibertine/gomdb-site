import React from 'react'
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
  GitCompare as CompareIcon
} from 'lucide-react'
import './OrgChartAlvaroCarmona.css'

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
