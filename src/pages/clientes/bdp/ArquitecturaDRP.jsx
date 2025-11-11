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

              <svg className="architecture-diagram" viewBox="0 0 1400 700" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Arrow markers */}
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#00ED64" />
                  </marker>
                  <marker id="arrowhead-failover" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#FFD700" />
                  </marker>

                  {/* Cloud icon SVG */}
                  <g id="cloud-icon">
                    <path d="M 0 8 C 0 3.5 3.5 0 8 0 C 10 0 11.8 0.8 13 2 C 14.7 0.8 16.8 0 19 0 C 24 0 28 4 28 9 C 28 9.3 28 9.6 27.9 9.9 C 30.6 10.6 32.5 13 32.5 16 C 32.5 19.6 29.6 22.5 26 22.5 L 7 22.5 C 3.1 22.5 0 19.4 0 15.5 C 0 12.5 1.8 9.9 4.3 8.9 C 4.1 8.6 4 8.3 4 8 Z" fill="#1E90FF" opacity="0.8"/>
                  </g>

                  {/* Database icon SVG */}
                  <g id="database-icon">
                    <ellipse cx="12" cy="4" rx="12" ry="4" fill="#00ED64" opacity="0.9"/>
                    <path d="M 0 4 L 0 12 C 0 14.2 5.4 16 12 16 C 18.6 16 24 14.2 24 12 L 24 4" fill="#00ED64" opacity="0.7"/>
                    <ellipse cx="12" cy="12" rx="12" ry="4" fill="#00ED64" opacity="0.9"/>
                  </g>

                  {/* Server/Building icon SVG */}
                  <g id="building-icon">
                    <rect x="2" y="4" width="20" height="20" rx="1" fill="#FFA500" opacity="0.8"/>
                    <rect x="5" y="7" width="4" height="4" fill="#0a0e27" opacity="0.5"/>
                    <rect x="5" y="13" width="4" height="4" fill="#0a0e27" opacity="0.5"/>
                    <rect x="10" y="7" width="4" height="4" fill="#0a0e27" opacity="0.5"/>
                    <rect x="10" y="13" width="4" height="4" fill="#0a0e27" opacity="0.5"/>
                    <rect x="15" y="7" width="4" height="4" fill="#0a0e27" opacity="0.5"/>
                    <rect x="15" y="13" width="4" height="4" fill="#0a0e27" opacity="0.5"/>
                    <rect x="8" y="19" width="8" height="5" fill="#0a0e27" opacity="0.7"/>
                  </g>
                </defs>

                {/* Cloud Section */}
                <rect x="50" y="50" width="650" height="250" rx="15" className="cloud-box" />
                <use href="#cloud-icon" x="80" y="60" width="40" height="30"/>
                <text x="130" y="85" className="section-label">MongoDB Atlas (Cloud)</text>

                {/* Atlas Cluster */}
                <g className="component atlas-cluster">
                  <rect x="80" y="120" width="180" height="140" rx="10" className="component-box atlas" />
                  <use href="#database-icon" x="140" y="135" width="35" height="25"/>
                  <text x="170" y="180" className="component-title">Atlas Cluster</text>
                  <text x="170" y="200" className="component-subtitle">Producción</text>
                  <circle cx="130" cy="230" r="10" className="node-circle active" />
                  <circle cx="170" cy="230" r="10" className="node-circle active" />
                  <circle cx="210" cy="230" r="10" className="node-circle active" />
                </g>

                {/* Snapshots */}
                <g className="component snapshots">
                  <rect x="310" y="120" width="180" height="140" rx="10" className="component-box snapshot" />
                  <text x="400" y="155" className="component-title">Snapshots</text>
                  <text x="400" y="175" className="component-subtitle">Automated Backups</text>
                  <rect x="330" y="195" width="40" height="35" rx="4" className="snapshot-icon" />
                  <rect x="380" y="195" width="40" height="35" rx="4" className="snapshot-icon" />
                  <rect x="430" y="195" width="40" height="35" rx="4" className="snapshot-icon" />
                  <text x="400" y="250" className="script-code">Daily/Hourly</text>
                </g>

                {/* Arrow from Atlas to Snapshots */}
                <path d="M 260 190 L 310 190" className="flow-arrow" markerEnd="url(#arrowhead)" />
                <text x="265" y="180" className="flow-label">Auto</text>

                {/* Script/API Section */}
                <g className="component api-script">
                  <rect x="540" y="120" width="140" height="140" rx="10" className="component-box script" />
                  <text x="610" y="155" className="component-title">API Script</text>
                  <text x="610" y="175" className="component-subtitle">Scheduler</text>
                  <circle cx="610" cy="205" r="25" fill="rgba(0,206,209,0.3)" stroke="#00CED1" strokeWidth="2"/>
                  <path d="M 600 205 L 607 212 L 620 195" stroke="#00CED1" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <text x="610" y="245" className="script-code" fontSize="11">Download</text>
                </g>

                {/* Arrow from Snapshots to Script */}
                <path d="M 490 190 L 540 190" className="flow-arrow" markerEnd="url(#arrowhead)" />
                <text x="495" y="180" className="flow-label">API Call</text>

                {/* On-Premise Section */}
                <rect x="50" y="380" width="1300" height="270" rx="15" className="onprem-box" />
                <use href="#building-icon" x="80" y="395" width="35" height="30"/>
                <text x="125" y="420" className="section-label">On-Premise Infrastructure</text>

                {/* Download Arrow (Cloud to OnPrem) */}
                <path d="M 610 260 L 610 330 L 240 330 L 240 450" className="flow-arrow download" markerEnd="url(#arrowhead)" strokeWidth="3"/>
                <text x="500" y="325" className="flow-label">Scheduled Download</text>

                {/* Local Storage */}
                <g className="component storage">
                  <rect x="120" y="450" width="240" height="150" rx="10" className="component-box storage" />
                  <text x="240" y="485" className="component-title">Local Storage</text>
                  <text x="240" y="505" className="component-subtitle">Snapshot Files</text>
                  <rect x="150" y="525" width="180" height="20" rx="4" className="file-bar" />
                  <rect x="150" y="555" width="180" height="20" rx="4" className="file-bar" />
                  <text x="240" y="585" className="script-code" fontSize="11">*.tar.gz</text>
                </g>

                {/* EA Cluster (Warm - Inactive) */}
                <g className="component ea-cluster">
                  <rect x="420" y="450" width="240" height="150" rx="10" className="component-box ea-warm" />
                  <use href="#database-icon" x="510" y="470" width="35" height="25"/>
                  <text x="540" y="515" className="component-title">MongoDB EA</text>
                  <text x="540" y="535" className="component-subtitle">Estado: WARM</text>
                  <circle cx="480" cy="565" r="10" className="node-circle inactive" />
                  <circle cx="540" cy="565" r="10" className="node-circle inactive" />
                  <circle cx="600" cy="565" r="10" className="node-circle inactive" />
                  <text x="540" y="585" className="script-code" fontSize="10">(Standby)</text>
                </g>

                {/* Restore Arrow (Failover - Dashed) */}
                <path d="M 360 525 L 420 525" className="flow-arrow restore" markerEnd="url(#arrowhead-failover)" strokeDasharray="10,5" strokeWidth="3"/>
                <text x="365" y="515" className="flow-label failover">mongorestore</text>
                <text x="370" y="540" className="flow-label-small">(en Desastre)</text>

                {/* Applications */}
                <g className="component apps">
                  <rect x="1050" y="450" width="240" height="150" rx="10" className="component-box apps" />
                  <text x="1170" y="485" className="component-title">Aplicaciones</text>
                  <text x="1170" y="505" className="component-subtitle">Clientes</text>
                  <circle cx="1100" cy="545" r="15" className="app-circle" />
                  <circle cx="1170" cy="545" r="15" className="app-circle" />
                  <circle cx="1240" cy="545" r="15" className="app-circle" />
                  <text x="1095" y="550" className="app-icon">A</text>
                  <text x="1165" y="550" className="app-icon">B</text>
                  <text x="1235" y="550" className="app-icon">C</text>
                </g>

                {/* Connection Switch Arrow (Failover - Dashed) */}
                <path d="M 660 525 L 1050 525" className="flow-arrow failover" markerEnd="url(#arrowhead-failover)" strokeDasharray="10,5" strokeWidth="3"/>
                <text x="800" y="515" className="flow-label failover">Connection Switch</text>
                <text x="830" y="540" className="flow-label-small">(Failover)</text>

                {/* Normal operation connection (dotted - currently not active) */}
                <path d="M 610 60 Q 900 50 1170 450" className="flow-arrow" strokeDasharray="2,4" strokeWidth="1.5" opacity="0.3"/>
                <text x="850" y="200" className="flow-label-small" opacity="0.5">Normal: Atlas → Apps</text>
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

            {/* Concepto Técnico */}
            <div className="concept-section">
              <h3 className="concept-title">📋 Concepto Técnico</h3>
              <p className="concept-text">
                El sistema DRP on-premise se mantiene <strong>"caliente" (hot)</strong>, recibiendo un flujo constante de cambios
                desde Atlas casi en tiempo real. Esto se logra tratando la base de datos como un <strong>productor de eventos</strong>.
              </p>
              <p className="concept-text">
                Esta arquitectura es ideal para sistemas críticos que requieren <strong>RPO y RTO muy bajos</strong> (minutos o segundos),
                donde la pérdida de datos debe ser mínima y el tiempo de recuperación debe ser casi instantáneo.
              </p>
            </div>

            {/* Mecánica de Implementación */}
            <div className="mechanics-section">
              <h3 className="mechanics-title">⚙️ Mecánica de Implementación</h3>
              <div className="mechanics-grid">
                <div className="mechanic-card">
                  <div className="mechanic-number">1</div>
                  <h4>Fuente de Datos</h4>
                  <p><strong>Atlas Change Streams:</strong> Expone el oplog de Atlas de forma segura, permitiendo suscripción a todos los cambios (inserts, updates, deletes) en tiempo real.</p>
                </div>
                <div className="mechanic-card">
                  <div className="mechanic-number">2</div>
                  <h4>Pipeline de Eventos</h4>
                  <p><strong>Consumidor Cloud:</strong> Un microservicio (Lambda/K8s) se suscribe al Change Stream de Atlas.</p>
                  <p><strong>Cola de Mensajería:</strong> Los eventos se publican en Kafka/RabbitMQ para desacoplar sistemas y proporcionar durabilidad.</p>
                </div>
                <div className="mechanic-card">
                  <div className="mechanic-number">3</div>
                  <h4>Consumidor On-Prem</h4>
                  <p>Microservicio on-premise que se suscribe a la cola, traduce eventos y los aplica en el clúster EA local de forma <strong>idempotente</strong>.</p>
                  <p>Gestiona <strong>resume tokens</strong> y offsets para recuperación ante fallas.</p>
                </div>
                <div className="mechanic-card">
                  <div className="mechanic-number">4</div>
                  <h4>Estado DRP</h4>
                  <p>El clúster EA on-prem está <strong>HOT (activo)</strong>, recibiendo y procesando cambios continuamente.</p>
                  <p>Lag típico: <strong>segundos a minutos</strong> dependiendo del volumen de cambios.</p>
                </div>
              </div>
            </div>

            {/* Diagrama Opción 2 */}
            <div className="diagram-container">
              <h3 className="diagram-title">🏗️ Arquitectura de Implementación</h3>
              <p className="diagram-subtitle">Pipeline completo de replicación por eventos en tiempo real</p>

              <svg className="architecture-diagram hot" viewBox="0 0 1600 800" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Arrow markers */}
                  <marker id="arrowhead-hot" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#FF4500" />
                  </marker>
                  <marker id="arrowhead-failover2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#FFD700" />
                  </marker>
                  <marker id="arrowhead-monitor" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#00CED1" />
                  </marker>

                  {/* Shared icons from Option 1 */}
                  <g id="cloud-icon">
                    <path d="M 0 8 C 0 3.5 3.5 0 8 0 C 10 0 11.8 0.8 13 2 C 14.7 0.8 16.8 0 19 0 C 24 0 28 4 28 9 C 28 9.3 28 9.6 27.9 9.9 C 30.6 10.6 32.5 13 32.5 16 C 32.5 19.6 29.6 22.5 26 22.5 L 7 22.5 C 3.1 22.5 0 19.4 0 15.5 C 0 12.5 1.8 9.9 4.3 8.9 C 4.1 8.6 4 8.3 4 8 Z" fill="#1E90FF" opacity="0.8"/>
                  </g>

                  <g id="database-icon">
                    <ellipse cx="12" cy="4" rx="12" ry="4" fill="#00ED64" opacity="0.9"/>
                    <path d="M 0 4 L 0 12 C 0 14.2 5.4 16 12 16 C 18.6 16 24 14.2 24 12 L 24 4" fill="#00ED64" opacity="0.7"/>
                    <ellipse cx="12" cy="12" rx="12" ry="4" fill="#00ED64" opacity="0.9"/>
                  </g>

                  <g id="building-icon">
                    <rect x="2" y="4" width="20" height="20" rx="1" fill="#FFA500" opacity="0.8"/>
                    <rect x="5" y="7" width="4" height="4" fill="#0a0e27" opacity="0.5"/>
                    <rect x="5" y="13" width="4" height="4" fill="#0a0e27" opacity="0.5"/>
                    <rect x="10" y="7" width="4" height="4" fill="#0a0e27" opacity="0.5"/>
                    <rect x="10" y="13" width="4" height="4" fill="#0a0e27" opacity="0.5"/>
                    <rect x="15" y="7" width="4" height="4" fill="#0a0e27" opacity="0.5"/>
                    <rect x="15" y="13" width="4" height="4" fill="#0a0e27" opacity="0.5"/>
                    <rect x="8" y="19" width="8" height="5" fill="#0a0e27" opacity="0.7"/>
                  </g>

                  {/* Wave icon for streams */}
                  <g id="wave-icon">
                    <path d="M 0 10 Q 5 5, 10 10 T 20 10" stroke="#00CED1" strokeWidth="2" fill="none"/>
                    <path d="M 0 15 Q 5 10, 10 15 T 20 15" stroke="#00CED1" strokeWidth="2" fill="none" opacity="0.7"/>
                    <path d="M 0 20 Q 5 15, 10 20 T 20 20" stroke="#00CED1" strokeWidth="2" fill="none" opacity="0.5"/>
                  </g>

                  {/* Gear/Process icon */}
                  <g id="gear-icon">
                    <circle cx="12" cy="12" r="8" fill="none" stroke="#8A2BE2" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" fill="#8A2BE2"/>
                    <rect x="10" y="0" width="4" height="6" fill="#8A2BE2"/>
                    <rect x="10" y="18" width="4" height="6" fill="#8A2BE2"/>
                    <rect x="0" y="10" width="6" height="4" fill="#8A2BE2"/>
                    <rect x="18" y="10" width="6" height="4" fill="#8A2BE2"/>
                  </g>

                  {/* Queue/Message icon */}
                  <g id="queue-icon">
                    <rect x="2" y="4" width="20" height="6" rx="2" fill="#8A2BE2" opacity="0.8"/>
                    <rect x="2" y="12" width="20" height="6" rx="2" fill="#8A2BE2" opacity="0.6"/>
                    <rect x="2" y="20" width="20" height="6" rx="2" fill="#8A2BE2" opacity="0.4"/>
                  </g>

                  {/* Shield/VPN icon */}
                  <g id="shield-icon">
                    <path d="M 12 2 L 4 6 L 4 12 C 4 16.4 7.6 20.5 12 22 C 16.4 20.5 20 16.4 20 12 L 20 6 L 12 2 Z" fill="none" stroke="#8A2BE2" strokeWidth="2"/>
                    <path d="M 9 12 L 11 14 L 15 9" stroke="#8A2BE2" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  </g>

                  {/* Monitor/Chart icon */}
                  <g id="monitor-icon">
                    <rect x="2" y="3" width="20" height="14" rx="2" fill="none" stroke="#00CED1" strokeWidth="2"/>
                    <path d="M 6 12 L 9 9 L 12 11 L 16 6" stroke="#00CED1" strokeWidth="2" fill="none"/>
                    <circle cx="6" cy="12" r="1.5" fill="#00CED1"/>
                    <circle cx="9" cy="9" r="1.5" fill="#00CED1"/>
                    <circle cx="12" cy="11" r="1.5" fill="#00CED1"/>
                    <circle cx="16" cy="6" r="1.5" fill="#00CED1"/>
                  </g>
                </defs>

                {/* Cloud Section */}
                <rect x="50" y="50" width="750" height="320" rx="15" className="cloud-box" />
                <use href="#cloud-icon" x="80" y="60" width="40" height="30"/>
                <text x="130" y="85" className="section-label">MongoDB Atlas + Cloud Services</text>

                {/* Atlas Cluster with Change Streams */}
                <g className="component atlas-cluster">
                  <rect x="80" y="120" width="200" height="180" rx="10" className="component-box atlas" />
                  <use href="#database-icon" x="150" y="135" width="35" height="25"/>
                  <text x="180" y="180" className="component-title">Atlas Cluster</text>
                  <text x="180" y="200" className="component-subtitle">Producción</text>
                  <circle cx="130" cy="235" r="10" className="node-circle active" />
                  <circle cx="180" cy="235" r="10" className="node-circle active" />
                  <circle cx="230" cy="235" r="10" className="node-circle active" />

                  <rect x="95" y="255" width="170" height="30" rx="5" fill="rgba(0,206,209,0.2)" stroke="#00CED1" strokeWidth="2"/>
                  <use href="#wave-icon" x="105" y="260" width="20" height="20"/>
                  <text x="180" y="275" className="component-subtitle" fill="#00CED1">Change Streams</text>
                </g>

                {/* Cloud Consumer Worker */}
                <g className="component cloud-consumer">
                  <rect x="340" y="120" width="220" height="100" rx="10" className="component-box consumer" />
                  <use href="#gear-icon" x="425" y="135" width="30" height="30"/>
                  <text x="450" y="185" className="component-title">Cloud Worker</text>
                  <text x="450" y="205" className="component-subtitle">Lambda/K8s Pod</text>
                </g>

                {/* Arrow from Atlas to Worker */}
                <path d="M 280 210 L 340 180" className="flow-arrow realtime" markerEnd="url(#arrowhead-hot)" strokeWidth="3"/>
                <text x="290" y="190" className="flow-label realtime">Subscribe</text>

                {/* Message Queue (Kafka) */}
                <g className="component message-queue">
                  <rect x="340" y="250" width="220" height="100" rx="10" className="component-box queue" />
                  <use href="#queue-icon" x="425" y="265" width="30" height="30"/>
                  <text x="450" y="315" className="component-title">Message Queue</text>
                  <text x="450" y="335" className="component-subtitle">Kafka/RabbitMQ</text>
                </g>

                {/* Arrow from Worker to Queue */}
                <path d="M 450 220 L 450 250" className="flow-arrow realtime" markerEnd="url(#arrowhead-hot)" strokeWidth="3"/>
                <text x="460" y="240" className="flow-label realtime">Publish</text>

                {/* VPN/Secure Connection Bridge */}
                <g className="component vpn-bridge">
                  <rect x="620" y="180" width="150" height="140" rx="10" className="bridge-box" />
                  <use href="#shield-icon" x="675" y="200" width="30" height="30"/>
                  <text x="695" y="250" className="section-label-small">VPN/Secure</text>
                  <text x="695" y="270" className="section-label-small">Connection</text>
                  <text x="695" y="290" className="section-label-small">Bridge</text>
                </g>

                {/* Arrow from Queue to VPN */}
                <path d="M 560 300 L 620 280" className="flow-arrow realtime" markerEnd="url(#arrowhead-hot)" strokeWidth="3"/>
                <text x="565" y="285" className="flow-label realtime">Stream</text>

                {/* On-Premise Section */}
                <rect x="50" y="430" width="1500" height="320" rx="15" className="onprem-box" />
                <use href="#building-icon" x="80" y="445" width="35" height="30"/>
                <text x="125" y="470" className="section-label">On-Premise Infrastructure</text>

                {/* Arrow from VPN to OnPrem (crossing boundary) */}
                <path d="M 695 320 L 695 390 L 280 390 L 280 500" className="flow-arrow realtime" markerEnd="url(#arrowhead-hot)" strokeWidth="3"/>
                <text x="600" y="385" className="flow-label realtime">Secure Streaming</text>

                {/* OnPrem Consumer Microservice */}
                <g className="component onprem-consumer">
                  <rect x="120" y="500" width="280" height="180" rx="10" className="component-box consumer-onprem" />
                  <use href="#gear-icon" x="240" y="515" width="30" height="30"/>
                  <text x="260" y="565" className="component-title">Consumer Service</text>
                  <text x="260" y="585" className="component-subtitle">Microservicio On-Prem</text>
                  <text x="260" y="610" className="script-code" fontSize="12">• Suscribe a Cola</text>
                  <text x="260" y="630" className="script-code" fontSize="12">• Traduce Eventos</text>
                  <text x="260" y="650" className="script-code" fontSize="12">• Aplica a EA (idempotente)</text>
                  <text x="260" y="670" className="script-code" fontSize="12">• Gestiona Resume Tokens</text>
                </g>

                {/* EA Cluster (Hot - Active) */}
                <g className="component ea-cluster-hot">
                  <rect x="480" y="500" width="280" height="180" rx="10" className="component-box ea-hot" />
                  <use href="#database-icon" x="590" y="515" width="35" height="25"/>
                  <text x="620" y="560" className="component-title">MongoDB EA</text>
                  <text x="620" y="580" className="component-subtitle">Estado: HOT (Activo)</text>
                  <text x="620" y="610" className="script-code" fontSize="11">Actualizado en Tiempo Real</text>
                  <circle cx="550" cy="645" r="12" className="node-circle hot" />
                  <circle cx="620" cy="645" r="12" className="node-circle hot" />
                  <circle cx="690" cy="645" r="12" className="node-circle hot" />
                  <text x="620" y="670" className="script-code" fontSize="10">Lag: ~segundos</text>
                </g>

                {/* Arrow from Consumer to EA */}
                <path d="M 400 590 L 480 590" className="flow-arrow realtime" markerEnd="url(#arrowhead-hot)" strokeWidth="3"/>
                <text x="410" y="580" className="flow-label realtime">Apply Ops</text>

                {/* Monitor/Metrics */}
                <g className="component monitor">
                  <rect x="840" y="500" width="240" height="110" rx="10" className="component-box monitor" />
                  <use href="#monitor-icon" x="935" y="515" width="30" height="25"/>
                  <text x="960" y="560" className="component-title">Monitoreo</text>
                  <text x="960" y="580" className="component-subtitle">Lag & Metrics</text>
                  <text x="960" y="600" className="script-code" fontSize="11">Offset Tracking</text>
                </g>

                {/* Arrow from EA to Monitor */}
                <path d="M 760 555 L 840 555" className="flow-arrow" markerEnd="url(#arrowhead-monitor)" strokeDasharray="4,3" strokeWidth="2"/>

                {/* Applications */}
                <g className="component apps-hot">
                  <rect x="1180" y="500" width="280" height="180" rx="10" className="component-box apps" />
                  <text x="1320" y="545" className="component-title">Aplicaciones</text>
                  <text x="1320" y="565" className="component-subtitle">Production Clients</text>
                  <circle cx="1230" cy="610" r="18" className="app-circle" />
                  <circle cx="1320" cy="610" r="18" className="app-circle" />
                  <circle cx="1410" cy="610" r="18" className="app-circle" />
                  <text x="1223" y="617" className="app-icon">A</text>
                  <text x="1313" y="617" className="app-icon">B</text>
                  <text x="1403" y="617" className="app-icon">C</text>
                  <text x="1320" y="645" className="script-code" fontSize="10">Failover = DNS Switch</text>
                </g>

                {/* Failover Arrow (Minimal) */}
                <path d="M 760 625 L 1180 625" className="flow-arrow failover" markerEnd="url(#arrowhead-failover2)" strokeDasharray="10,5" strokeWidth="4"/>
                <text x="900" y="615" className="flow-label failover">Connection Switch (Failover Mínimo)</text>
                <text x="935" y="640" className="flow-label-small">RTO: Minutos</text>

                {/* Normal operation (Atlas to Apps - currently not used in Hot DRP) */}
                <path d="M 180 50 Q 800 30 1320 500" className="flow-arrow" strokeDasharray="2,4" strokeWidth="1.5" opacity="0.2"/>
                <text x="650" y="200" className="flow-label-small" opacity="0.4">Normal: Atlas → Apps (via Internet)</text>
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
