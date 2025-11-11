import React, { useState } from 'react'
import './ArquitecturaDRP.css'

const ArquitecturaDRP = () => {
  const [activeOption, setActiveOption] = useState(1)
  const [selectedMetric, setSelectedMetric] = useState(null)

  return (
    <div className="arquitectura-drp">
      {/* Header */}
      <header className="doc-header">
        <div className="header-bg"></div>
        <div className="header-content">
          <div className="client-badge">BDP</div>
          <h1 className="doc-title">Arquitecturas DRP Híbrido</h1>
          <p className="doc-subtitle">MongoDB Atlas a On-Premise</p>
          <div className="doc-meta">
            <span className="meta-item">📊 Análisis Técnico</span>
            <span className="meta-item">🔒 Disaster Recovery</span>
            <span className="meta-item">☁️ Híbrido Cloud</span>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="section executive-summary">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Resumen Ejecutivo</h2>
            <div className="title-underline"></div>
          </div>

          <div className="summary-grid">
            <div className="summary-card">
              <div className="card-icon">🎯</div>
              <h3>Objetivo</h3>
              <p>Implementar estrategia de Disaster Recovery desde MongoDB Atlas hacia infraestructura on-premise</p>
            </div>
            <div className="summary-card">
              <div className="card-icon">⚠️</div>
              <h3>Riesgo a Mitigar</h3>
              <p>Caída total del proveedor de nube o desconexión prolongada</p>
            </div>
            <div className="summary-card">
              <div className="card-icon">📐</div>
              <h3>Enfoque</h3>
              <p>2 arquitecturas basadas en métricas de negocio: RPO y RTO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Métricas Clave */}
      <section className="section metrics-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Métricas Clave de Negocio</h2>
            <div className="title-underline"></div>
          </div>

          <div className="metrics-grid">
            <div
              className={`metric-card ${selectedMetric === 'rpo' ? 'active' : ''}`}
              onClick={() => setSelectedMetric(selectedMetric === 'rpo' ? null : 'rpo')}
            >
              <div className="metric-header">
                <div className="metric-icon rpo-icon">📍</div>
                <h3>RPO</h3>
              </div>
              <div className="metric-label">Recovery Point Objective</div>
              <div className="metric-question">¿Cuánta pérdida de datos es aceptable?</div>
              <div className="metric-impact">
                <strong>Impacto Técnico:</strong>
                <p>Define la frecuencia y método de replicación. RPO de "horas" vs "segundos" requiere arquitecturas totalmente diferentes.</p>
              </div>
            </div>

            <div
              className={`metric-card ${selectedMetric === 'rto' ? 'active' : ''}`}
              onClick={() => setSelectedMetric(selectedMetric === 'rto' ? null : 'rto')}
            >
              <div className="metric-header">
                <div className="metric-icon rto-icon">⏱️</div>
                <h3>RTO</h3>
              </div>
              <div className="metric-label">Recovery Time Objective</div>
              <div className="metric-question">¿En cuánto tiempo debe estar operativo el DRP?</div>
              <div className="metric-impact">
                <strong>Impacto Técnico:</strong>
                <p>Define el estado del sistema DRP (cold/warm/hot) y la complejidad de automatización del failover.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selector de Opciones */}
      <section className="options-selector">
        <div className="container">
          <h2 className="selector-title">Selecciona una Arquitectura</h2>
          <div className="selector-buttons">
            <button
              className={`selector-btn ${activeOption === 1 ? 'active' : ''}`}
              onClick={() => setActiveOption(1)}
            >
              <span className="btn-icon">🔄</span>
              <span className="btn-text">Opción 1: Warm DRP</span>
              <span className="btn-label">Backup & Restore</span>
            </button>
            <button
              className={`selector-btn ${activeOption === 2 ? 'active' : ''}`}
              onClick={() => setActiveOption(2)}
            >
              <span className="btn-icon">⚡</span>
              <span className="btn-text">Opción 2: Hot DRP</span>
              <span className="btn-label">Replicación por Eventos</span>
            </button>
          </div>
        </div>
      </section>

      {/* Opción 1: Warm DRP */}
      {activeOption === 1 && (
        <section className="section architecture-detail">
          <div className="container">
            <div className="option-header option-1">
              <h2>Opción 1: DRP "Warm" (Backup & Restore)</h2>
              <p className="option-tagline">Arquitectura simple y robusta para RPO/RTO de horas</p>
            </div>

            {/* Diagrama Opción 1 */}
            <div className="diagram-container">
              <h3 className="diagram-title">Arquitectura de Implementación</h3>

              <svg className="architecture-diagram" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
                {/* Cloud Section */}
                <rect x="50" y="50" width="400" height="200" rx="10" className="cloud-box" />
                <text x="250" y="80" className="section-label">☁️ MongoDB Atlas (Cloud)</text>

                {/* Atlas Cluster */}
                <g className="component atlas-cluster">
                  <rect x="80" y="110" width="150" height="100" rx="8" className="component-box atlas" />
                  <text x="155" y="140" className="component-title">Atlas Cluster</text>
                  <text x="155" y="165" className="component-subtitle">Producción</text>
                  <circle cx="120" cy="190" r="8" className="node-circle" />
                  <circle cx="155" cy="190" r="8" className="node-circle" />
                  <circle cx="190" cy="190" r="8" className="node-circle" />
                </g>

                {/* Snapshots */}
                <g className="component snapshots">
                  <rect x="270" y="110" width="150" height="100" rx="8" className="component-box snapshot" />
                  <text x="345" y="140" className="component-title">Snapshots</text>
                  <text x="345" y="165" className="component-subtitle">Backups</text>
                  <rect x="290" y="175" width="30" height="25" rx="3" className="snapshot-icon" />
                  <rect x="330" y="175" width="30" height="25" rx="3" className="snapshot-icon" />
                  <rect x="370" y="175" width="30" height="25" rx="3" className="snapshot-icon" />
                </g>

                {/* Arrow from Atlas to Snapshots */}
                <path d="M 230 160 L 270 160" className="flow-arrow" markerEnd="url(#arrowhead)" />
                <text x="235" y="150" className="flow-label">Automated</text>

                {/* Script/API Section */}
                <g className="component api-script">
                  <rect x="500" y="110" width="180" height="100" rx="8" className="component-box script" />
                  <text x="590" y="140" className="component-title">Script Automatizado</text>
                  <text x="590" y="165" className="component-subtitle">API de Atlas</text>
                  <text x="590" y="190" className="script-code">📥 Download Snapshot</text>
                </g>

                {/* Arrow from Snapshots to Script */}
                <path d="M 420 160 L 500 160" className="flow-arrow" markerEnd="url(#arrowhead)" />
                <text x="430" y="150" className="flow-label">API Call</text>

                {/* On-Premise Section */}
                <rect x="50" y="350" width="850" height="200" rx="10" className="onprem-box" />
                <text x="475" y="380" className="section-label">🏢 On-Premise</text>

                {/* Local Storage */}
                <g className="component storage">
                  <rect x="80" y="410" width="180" height="100" rx="8" className="component-box storage" />
                  <text x="170" y="440" className="component-title">Local Storage</text>
                  <text x="170" y="465" className="component-subtitle">Snapshot Files</text>
                  <rect x="110" y="480" width="120" height="15" rx="3" className="file-bar" />
                </g>

                {/* Arrow from Script to Storage */}
                <path d="M 590 210 L 590 300 L 170 300 L 170 410" className="flow-arrow download" markerEnd="url(#arrowhead)" />
                <text x="450" y="290" className="flow-label">Download (Scheduled)</text>

                {/* EA Cluster (Warm) */}
                <g className="component ea-cluster">
                  <rect x="320" y="410" width="180" height="100" rx="8" className="component-box ea-warm" />
                  <text x="410" y="440" className="component-title">MongoDB EA</text>
                  <text x="410" y="465" className="component-subtitle">Estado: WARM</text>
                  <circle cx="365" cy="490" r="8" className="node-circle inactive" />
                  <circle cx="410" cy="490" r="8" className="node-circle inactive" />
                  <circle cx="455" cy="490" r="8" className="node-circle inactive" />
                </g>

                {/* Restore Arrow */}
                <path d="M 260 460 L 320 460" className="flow-arrow restore" markerEnd="url(#arrowhead)" strokeDasharray="8,4" />
                <text x="265" y="450" className="flow-label failover">mongorestore</text>
                <text x="270" y="475" className="flow-label-small">(en Desastre)</text>

                {/* Applications */}
                <g className="component apps">
                  <rect x="720" y="410" width="150" height="100" rx="8" className="component-box apps" />
                  <text x="795" y="440" className="component-title">Aplicaciones</text>
                  <circle cx="755" cy="475" r="12" className="app-circle" />
                  <circle cx="795" cy="475" r="12" className="app-circle" />
                  <circle cx="835" cy="475" r="12" className="app-circle" />
                </g>

                {/* Connection Switch Arrow */}
                <path d="M 500 460 L 720 460" className="flow-arrow failover" markerEnd="url(#arrowhead)" strokeDasharray="8,4" />
                <text x="570" y="450" className="flow-label failover">Connection Switch</text>
                <text x="585" y="475" className="flow-label-small">(Failover)</text>

                {/* Arrow definitions */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#00ED64" />
                  </marker>
                </defs>
              </svg>

              <div className="diagram-legend">
                <div className="legend-item">
                  <div className="legend-line solid"></div>
                  <span>Flujo Normal</span>
                </div>
                <div className="legend-item">
                  <div className="legend-line dashed"></div>
                  <span>Proceso de Failover</span>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="process-steps">
              <h3 className="steps-title">Proceso de Failover</h3>
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <h4>Declarar Desastre</h4>
                  <p>Se activa el protocolo de DRP y se detienen operaciones en Atlas</p>
                </div>
                <div className="step-card">
                  <div className="step-number">2</div>
                  <h4>Seleccionar Snapshot</h4>
                  <p>Se toma el último snapshot descargado (ej. snapshot_0400am.tar.gz)</p>
                </div>
                <div className="step-card">
                  <div className="step-number">3</div>
                  <h4>Ejecutar Restore</h4>
                  <p>Se ejecuta mongorestore en el clúster EA on-prem</p>
                </div>
                <div className="step-card">
                  <div className="step-number">4</div>
                  <h4>Cambiar Conexiones</h4>
                  <p>Se actualizan connection strings o DNS para apuntar a on-prem</p>
                </div>
              </div>
            </div>

            {/* Características */}
            <div className="characteristics-grid">
              <div className="char-card rpo">
                <h4>📍 RPO: Alto (Horas)</h4>
                <p>Determinado por la frecuencia de descarga de snapshots</p>
              </div>
              <div className="char-card rto">
                <h4>⏱️ RTO: Alto (Horas)</h4>
                <p>Determinado por el tiempo de mongorestore (depende del tamaño de datos)</p>
              </div>
              <div className="char-card complexity">
                <h4>🔧 Complejidad: Baja</h4>
                <p>Requiere scripting para API y gestión de almacenamiento</p>
              </div>
              <div className="char-card maintenance">
                <h4>🔨 Mantenimiento: Bajo</h4>
                <p>Monitorear que los scripts de copia no fallen</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Opción 2: Hot DRP */}
      {activeOption === 2 && (
        <section className="section architecture-detail">
          <div className="container">
            <div className="option-header option-2">
              <h2>Opción 2: DRP "Hot" (Replicación por Eventos)</h2>
              <p className="option-tagline">Arquitectura avanzada para RPO/RTO de segundos/minutos</p>
            </div>

            {/* Diagrama Opción 2 */}
            <div className="diagram-container">
              <h3 className="diagram-title">Arquitectura de Implementación</h3>

              <svg className="architecture-diagram hot" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
                {/* Cloud Section */}
                <rect x="50" y="50" width="500" height="280" rx="10" className="cloud-box" />
                <text x="300" y="80" className="section-label">☁️ MongoDB Atlas + Cloud Services</text>

                {/* Atlas Cluster with Oplog */}
                <g className="component atlas-cluster">
                  <rect x="80" y="110" width="180" height="120" rx="8" className="component-box atlas" />
                  <text x="170" y="140" className="component-title">Atlas Cluster</text>
                  <text x="170" y="165" className="component-subtitle">Producción</text>
                  <circle cx="120" cy="200" r="8" className="node-circle active" />
                  <circle cx="170" cy="200" r="8" className="node-circle active" />
                  <circle cx="220" cy="200" r="8" className="node-circle active" />
                </g>

                {/* Change Streams */}
                <g className="component change-streams">
                  <rect x="80" y="250" width="180" height="60" rx="8" className="component-box streams" />
                  <text x="170" y="275" className="component-title">Change Streams</text>
                  <text x="170" y="295" className="component-subtitle">📡 Oplog Seguro</text>
                </g>

                {/* Cloud Consumer */}
                <g className="component cloud-consumer">
                  <rect x="320" y="110" width="200" height="80" rx="8" className="component-box consumer" />
                  <text x="420" y="140" className="component-title">Consumidor Cloud</text>
                  <text x="420" y="165" className="component-subtitle">Worker / Lambda</text>
                </g>

                {/* Message Queue (Kafka/RabbitMQ) */}
                <g className="component message-queue">
                  <rect x="320" y="210" width="200" height="100" rx="8" className="component-box queue" />
                  <text x="420" y="240" className="component-title">Cola de Mensajes</text>
                  <text x="420" y="265" className="component-subtitle">Kafka / RabbitMQ</text>
                  <rect x="340" y="280" width="35" height="20" rx="2" className="message-box" />
                  <rect x="385" y="280" width="35" height="20" rx="2" className="message-box" />
                  <rect x="430" y="280" width="35" height="20" rx="2" className="message-box" />
                  <rect x="475" y="280" width="35" height="20" rx="2" className="message-box" />
                </g>

                {/* Arrow from Change Streams to Consumer */}
                <path d="M 260 280 L 290 280 L 290 150 L 320 150" className="flow-arrow realtime" markerEnd="url(#arrowhead-hot)" />
                <text x="270" y="140" className="flow-label realtime">Subscribe</text>

                {/* Arrow from Consumer to Queue */}
                <path d="M 420 190 L 420 210" className="flow-arrow realtime" markerEnd="url(#arrowhead-hot)" />
                <text x="430" y="205" className="flow-label realtime">Publish</text>

                {/* Internet/VPN Bridge */}
                <rect x="570" y="200" width="120" height="120" rx="10" className="bridge-box" />
                <text x="630" y="230" className="section-label-small">🌐 VPN /</text>
                <text x="630" y="255" className="section-label-small">Secure</text>
                <text x="630" y="280" className="section-label-small">Connection</text>

                {/* Arrow from Queue to Bridge */}
                <path d="M 520 260 L 570 260" className="flow-arrow realtime" markerEnd="url(#arrowhead-hot)" />
                <text x="525" y="250" className="flow-label realtime">Stream</text>

                {/* On-Premise Section */}
                <rect x="50" y="400" width="1100" height="250" rx="10" className="onprem-box" />
                <text x="600" y="430" className="section-label">🏢 On-Premise Infrastructure</text>

                {/* OnPrem Consumer */}
                <g className="component onprem-consumer">
                  <rect x="80" y="460" width="220" height="140" rx="8" className="component-box consumer-onprem" />
                  <text x="190" y="490" className="component-title">Consumidor On-Prem</text>
                  <text x="190" y="515" className="component-subtitle">Microservicio</text>
                  <text x="190" y="545" className="script-code">• Lee de Cola</text>
                  <text x="190" y="565" className="script-code">• Traduce Eventos</text>
                  <text x="190" y="585" className="script-code">• Aplica Cambios</text>
                </g>

                {/* Arrow from Bridge to OnPrem Consumer */}
                <path d="M 630 320 L 630 380 L 190 380 L 190 460" className="flow-arrow realtime" markerEnd="url(#arrowhead-hot)" />
                <text x="500" y="370" className="flow-label realtime">Subscribe to Queue</text>

                {/* EA Cluster (Hot) */}
                <g className="component ea-cluster-hot">
                  <rect x="360" y="460" width="220" height="140" rx="8" className="component-box ea-hot" />
                  <text x="470" y="490" className="component-title">MongoDB EA</text>
                  <text x="470" y="515" className="component-subtitle">Estado: HOT 🔥</text>
                  <text x="470" y="545" className="script-code">Actualizado en</text>
                  <text x="470" y="565" className="script-code">Tiempo Real</text>
                  <circle cx="410" cy="580" r="10" className="node-circle hot" />
                  <circle cx="470" cy="580" r="10" className="node-circle hot" />
                  <circle cx="530" cy="580" r="10" className="node-circle hot" />
                </g>

                {/* Arrow from Consumer to EA */}
                <path d="M 300 530 L 360 530" className="flow-arrow realtime" markerEnd="url(#arrowhead-hot)" />
                <text x="305" y="520" className="flow-label realtime">Apply Ops</text>

                {/* Monitor/Lag Tracking */}
                <g className="component monitor">
                  <rect x="640" y="460" width="200" height="80" rx="8" className="component-box monitor" />
                  <text x="740" y="490" className="component-title">Monitoreo</text>
                  <text x="740" y="515" className="component-subtitle">📊 Lag Tracking</text>
                </g>

                {/* Arrow from EA to Monitor */}
                <path d="M 580 500 L 640 500" className="flow-arrow" markerEnd="url(#arrowhead)" strokeDasharray="4,2" />

                {/* Applications */}
                <g className="component apps-hot">
                  <rect x="900" y="460" width="220" height="140" rx="8" className="component-box apps" />
                  <text x="1010" y="490" className="component-title">Aplicaciones</text>
                  <text x="1010" y="515" className="component-subtitle">Production Apps</text>
                  <circle cx="945" cy="555" r="15" className="app-circle" />
                  <circle cx="1010" cy="555" r="15" className="app-circle" />
                  <circle cx="1075" cy="555" r="15" className="app-circle" />
                </g>

                {/* Failover Arrow */}
                <path d="M 580 540 L 750 540 L 750 530 L 900 530" className="flow-arrow failover" markerEnd="url(#arrowhead-failover)" strokeDasharray="8,4" />
                <text x="700" y="530" className="flow-label failover">Failover (Mínimo)</text>

                {/* Arrow definitions */}
                <defs>
                  <marker id="arrowhead-hot" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#FF6B6B" />
                  </marker>
                  <marker id="arrowhead-failover" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#FFA500" />
                  </marker>
                </defs>
              </svg>

              <div className="diagram-legend">
                <div className="legend-item">
                  <div className="legend-line realtime"></div>
                  <span>Flujo en Tiempo Real</span>
                </div>
                <div className="legend-item">
                  <div className="legend-line dashed"></div>
                  <span>Monitoreo</span>
                </div>
                <div className="legend-item">
                  <div className="legend-line failover-line"></div>
                  <span>Failover Mínimo</span>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="process-steps">
              <h3 className="steps-title">Proceso de Failover</h3>
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-number hot">1</div>
                  <h4>Declarar Desastre</h4>
                  <p>Se activa protocolo de DRP</p>
                </div>
                <div className="step-card">
                  <div className="step-number hot">2</div>
                  <h4>Monitorear Lag</h4>
                  <p>Verificar que consumidor procese últimos mensajes</p>
                </div>
                <div className="step-card">
                  <div className="step-number hot">3</div>
                  <h4>Validar Sincronización</h4>
                  <p>Confirmar que EA está totalmente actualizado</p>
                </div>
                <div className="step-card">
                  <div className="step-number hot">4</div>
                  <h4>Switch Inmediato</h4>
                  <p>Cambio de DNS/config - RTO mínimo</p>
                </div>
              </div>
            </div>

            {/* Características */}
            <div className="characteristics-grid hot">
              <div className="char-card rpo hot">
                <h4>📍 RPO: Muy Bajo (Segundos/Minutos)</h4>
                <p>Determinado por latencia del pipeline de eventos</p>
              </div>
              <div className="char-card rto hot">
                <h4>⏱️ RTO: Muy Bajo (Minutos)</h4>
                <p>Determinado por tiempo de cambio de DNS/configuración</p>
              </div>
              <div className="char-card complexity hot">
                <h4>🔧 Complejidad: Extremadamente Alta</h4>
                <p>Proyecto completo de desarrollo de software distribuido</p>
              </div>
              <div className="char-card maintenance hot">
                <h4>🔨 Mantenimiento: Alto</h4>
                <p>Monitoreo activo de pipeline, latencia, errores, offsets</p>
              </div>
              <div className="char-card risk hot">
                <h4>⚠️ Riesgo: Failback Complejo</h4>
                <p>Regresar a Atlas requiere diseño cuidadoso para no perder datos generados on-prem</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Comparativa */}
      <section className="section comparison-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Comparativa de Arquitecturas</h2>
            <div className="title-underline"></div>
          </div>

          <div className="comparison-table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Estrategia</th>
                  <th>RPO<br/><span className="table-subtitle">(Pérdida de Datos)</span></th>
                  <th>RTO<br/><span className="table-subtitle">(Tiempo de Caída)</span></th>
                  <th>Complejidad<br/><span className="table-subtitle">(Implementación)</span></th>
                  <th>Mantenimiento</th>
                </tr>
              </thead>
              <tbody>
                <tr className="row-warm">
                  <td className="strategy-cell">
                    <strong>Opción 1</strong><br/>
                    Backup & Restore
                  </td>
                  <td className="metric-cell high">
                    <div className="metric-badge rpo-high">Horas</div>
                  </td>
                  <td className="metric-cell high">
                    <div className="metric-badge rto-high">Horas</div>
                  </td>
                  <td className="metric-cell low">
                    <div className="metric-badge complexity-low">Baja</div>
                  </td>
                  <td className="metric-cell low">
                    <div className="metric-badge maintenance-low">Bajo</div>
                  </td>
                </tr>
                <tr className="row-hot">
                  <td className="strategy-cell">
                    <strong>Opción 2</strong><br/>
                    Replicación (Eventos)
                  </td>
                  <td className="metric-cell low">
                    <div className="metric-badge rpo-low">Segundos / Minutos</div>
                  </td>
                  <td className="metric-cell low">
                    <div className="metric-badge rto-low">Minutos</div>
                  </td>
                  <td className="metric-cell high">
                    <div className="metric-badge complexity-high">Extremadamente Alta</div>
                  </td>
                  <td className="metric-cell high">
                    <div className="metric-badge maintenance-high">Alto</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Nota sobre MongoSync */}
      <section className="section warning-section">
        <div className="container">
          <div className="warning-box">
            <div className="warning-icon">⚠️</div>
            <div className="warning-content">
              <h3>Nota Importante sobre MongoSync</h3>
              <p>La herramienta <code>mongosync</code> está diseñada y optimizada para <strong>migraciones</strong> (movimientos de datos unidireccionales para poblar un clúster nuevo).</p>
              <p><strong>No está diseñada, soportada, ni recomendada</strong> para ser usada como mecanismo de DRP continuo.</p>
              <p>Su uso en este escenario introduce <strong>riesgos significativos de pérdida de datos</strong> y complejidad operativa, especialmente en los procesos de failover y failback.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="doc-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="mongo-logo">MongoDB</div>
              <div className="client-name">BDP</div>
            </div>
            <div className="footer-meta">
              <p>Documento Técnico de Arquitectura</p>
              <p>© 2025 MongoDB Inc. - Confidencial</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ArquitecturaDRP
