import React, { useState } from 'react'
import './SizingSuraPersonaUnica.css'

/**
 * SizingSuraPersonaUnica - Propuesta de Dimensionamiento MongoDB Atlas
 *
 * Página interactiva que presenta el análisis de sizing para el proyecto
 * "Persona Única" de Sura México, incluyendo:
 * - Análisis de latencia actual
 * - Arquitectura de Replica Set
 * - Dimensionamiento por ambiente (DEV/QA/PROD)
 * - Cálculo detallado de Working Set
 * - Comparativa M30 vs M40
 */

export const SizingSuraPersonaUnica = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState('prod')
  const [showWorkingSetDetails, setShowWorkingSetDetails] = useState(false)

  return (
    <div className="sura-sizing-page">
      {/* Hero Section */}
      <header className="sura-hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
        </div>
        <div className="hero-content">
          <div className="hero-logo">
            <div className="logo-circle">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#mongoGradient)" opacity="0.3"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#00ED64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="mongoGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00ED64"/>
                    <stop offset="1" stopColor="#00684A"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <h1 className="hero-title">Dimensionamiento MongoDB Atlas</h1>
          <p className="hero-subtitle">Proyecto Persona Única - Sura México</p>
          <div className="hero-meta">
            <span className="meta-item">
              <span className="meta-label">Cliente:</span> Sura Seguros México
            </span>
            <span className="meta-item">
              <span className="meta-label">Fecha:</span> Noviembre 2025
            </span>
            <span className="meta-item">
              <span className="meta-label">Arquitecto:</span> Leo Alarcón
            </span>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="summary-section">
        <div className="container">
          <h2 className="section-title">Resumen Ejecutivo</h2>
          <div className="summary-grid">
            <div className="summary-card highlight">
              <div className="card-icon">⚡</div>
              <h3>Desafío Principal</h3>
              <p>Reducir latencia de lectura de <strong>250ms actuales</strong> a <strong>{'<'}5ms</strong> para procesos críticos de cotización y emisión</p>
            </div>
            <div className="summary-card">
              <div className="card-icon">📊</div>
              <h3>Carga de Escritura</h3>
              <p><strong>~6,100 ops/día</strong> (2,700 en Personas + 3,400 en Domicilios) - Carga modesta manejable por cualquier tier</p>
            </div>
            <div className="summary-card">
              <div className="card-icon">🎯</div>
              <h3>Solución Propuesta</h3>
              <p><strong>M40 para Producción</strong> (16GB RAM) garantiza que todo el Working Set viva en memoria RAM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latency Analysis Section */}
      <section className="latency-section">
        <div className="container">
          <h2 className="section-title">Análisis de Latencia Actual</h2>
          <p className="section-description">
            Basado en el archivo <code>ApiPeople.xlsx</code>, los tiempos de respuesta actuales revelan el problema:
          </p>

          <div className="latency-comparison">
            <div className="latency-card current">
              <div className="latency-header">
                <span className="latency-badge warning">Actual</span>
                <h3>Base de Datos Actual</h3>
              </div>
              <div className="latency-metric">
                <div className="latency-value">220-270ms</div>
                <div className="latency-label">Tiempo de respuesta promedio</div>
              </div>
              <div className="latency-cause">
                <strong>Causa raíz:</strong> Working Set no cabe en RAM → Lecturas desde disco (IOPS lentos)
              </div>
              <div className="latency-icon">🐌</div>
            </div>

            <div className="latency-arrow">→</div>

            <div className="latency-card target">
              <div className="latency-header">
                <span className="latency-badge success">Objetivo</span>
                <h3>MongoDB Atlas M40</h3>
              </div>
              <div className="latency-metric">
                <div className="latency-value">{'<'}5ms</div>
                <div className="latency-label">Tiempo de respuesta objetivo</div>
              </div>
              <div className="latency-cause">
                <strong>Solución:</strong> Working Set 100% en RAM (16GB) → Lecturas en memoria
              </div>
              <div className="latency-icon">⚡</div>
            </div>
          </div>

          <div className="latency-impact">
            <h4>Impacto en el Negocio</h4>
            <div className="impact-grid">
              <div className="impact-item">
                <strong>50x más rápido</strong>
                <span>Cotización y emisión en tiempo real</span>
              </div>
              <div className="impact-item">
                <strong>Mejor UX</strong>
                <span>Respuestas instantáneas para agentes</span>
              </div>
              <div className="impact-item">
                <strong>Escalabilidad</strong>
                <span>Soporta picos de 700K personas/año</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Structure Section */}
      <section className="document-structure-section">
        <div className="container">
          <h2 className="section-title">Estructura del Documento "Persona Única"</h2>
          <p className="section-description">
            El documento es complejo con múltiples arrays anidados, lo que impacta directamente en el tamaño de los índices:
          </p>

          <div className="json-preview">
            <div className="json-header">
              <span className="json-file">Example-Layout-PersonaUnica.json</span>
              <span className="json-size">~1.5KB por documento</span>
            </div>
            <pre className="json-code">
{`{
  "rfc": "GADM801001D01",
  "nombreCompleto": "María Fernanda García Díaz",
  "primerNombre": "María",
  "segundoNombre": "Fernanda",
  "primerApellido": "García",
  "segundoApellido": "Díaz",
  "fechaNacimiento": "2007-03-20",
  "genero": "F",
  "curp": "GXDM661216HCMXXXG1",
  "nacionalidad": "Colombiana",
  "tipoPersona": "Física",
  "activa": true,

  "estructuraComercial": [
    { "tipo": "agente", "clave": "AG001", "activo": true },
    { "tipo": "promotor", "clave": "PR001", "activo": true }
  ],

  "roles": [
    {
      "nombreRol": "Contratante",
      "informacionAdicional": {
        "ocupacion": "Ingeniero",
        "estadoCivil": "Soltero"
      }
    }
  ],

  "contactos": [
    { "tipo": "email", "contacto": "maria.garcia83@example.com" },
    { "tipo": "TelefonoCasa", "contacto": "5551234567" },
    { "tipo": "TelefonoMobil", "contacto": "5512345678" }
  ],

  "direcciones": [
    {
      "tipo": "fiscal",
      "calle": "Av. Reforma",
      "numExterior": "123",
      "numInterior": "4B",
      "colonia": "Centro",
      "municipio": "Álvaro Obregón",
      "ciudad": "CDMX",
      "codigoPostal": "566953"
    }
  ]
}`}
            </pre>
          </div>

          <div className="document-complexity">
            <h4>Índices Requeridos para Búsquedas Rápidas</h4>
            <div className="indices-grid">
              <div className="index-card">
                <div className="index-name">_id</div>
                <div className="index-size">~0.4 GB</div>
                <div className="index-type">Default</div>
              </div>
              <div className="index-card primary">
                <div className="index-name">rfc (único)</div>
                <div className="index-size">~0.7 GB</div>
                <div className="index-type">Crítico</div>
              </div>
              <div className="index-card">
                <div className="index-name">nombreCompleto</div>
                <div className="index-size">~0.6 GB</div>
                <div className="index-type">Búsqueda</div>
              </div>
              <div className="index-card">
                <div className="index-name">contactos.email</div>
                <div className="index-size">~0.5 GB</div>
                <div className="index-type">Multikey</div>
              </div>
              <div className="index-card">
                <div className="index-name">contactos.telefono</div>
                <div className="index-size">~0.4 GB</div>
                <div className="index-type">Multikey</div>
              </div>
              <div className="index-card">
                <div className="index-name">estructuraComercial</div>
                <div className="index-size">~0.5 GB</div>
                <div className="index-type">Compuesto</div>
              </div>
            </div>
            <div className="indices-total">
              <strong>Total Índices Estimado:</strong> ~3.0 - 4.0 GB
            </div>
          </div>
        </div>
      </section>

      {/* Replica Set Architecture */}
      <section className="architecture-section">
        <div className="container">
          <h2 className="section-title">Arquitectura Base: Replica Set de 3 Nodos</h2>
          <p className="section-description">
            Cada clúster de MongoDB Atlas (M10+) se despliega automáticamente con 3 nodos para alta disponibilidad:
          </p>

          <div className="replica-set-diagram">
            <div className="replica-node primary">
              <div className="node-icon">👑</div>
              <div className="node-label">PRIMARY</div>
              <div className="node-description">
                <p>Recibe todas las escrituras</p>
                <p>Maneja lecturas por defecto</p>
              </div>
              <div className="node-status active">Activo</div>
            </div>

            <div className="replica-sync-line"></div>

            <div className="replica-secondaries">
              <div className="replica-node secondary">
                <div className="node-icon">📋</div>
                <div className="node-label">SECONDARY 1</div>
                <div className="node-description">
                  <p>Copia exacta del Primary</p>
                  <p>Listo para elección</p>
                </div>
                <div className="node-status standby">Standby</div>
              </div>

              <div className="replica-node secondary">
                <div className="node-icon">📋</div>
                <div className="node-label">SECONDARY 2</div>
                <div className="node-description">
                  <p>Copia exacta del Primary</p>
                  <p>Listo para elección</p>
                </div>
                <div className="node-status standby">Standby</div>
              </div>
            </div>
          </div>

          <div className="architecture-benefits">
            <h4>Beneficios de la Arquitectura Replica Set</h4>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">✅</div>
                <h5>Alta Disponibilidad</h5>
                <p>Si el Primary falla, un Secondary toma el rol automáticamente en segundos</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🔄</div>
                <h5>Tolerancia a Fallos</h5>
                <p>El clúster sigue operativo incluso si 1 nodo falla completamente</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🚀</div>
                <h5>Sin Downtime</h5>
                <p>Mantenimientos y actualizaciones sin interrumpir el servicio</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">📊</div>
                <h5>Distribución de Lecturas</h5>
                <p>Opción de distribuir lecturas entre Secondary para mayor rendimiento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Comparison */}
      <section className="environments-section">
        <div className="container">
          <h2 className="section-title">Dimensionamiento por Ambiente</h2>

          <div className="environment-selector">
            <button
              className={`env-tab ${selectedEnvironment === 'dev' ? 'active' : ''}`}
              onClick={() => setSelectedEnvironment('dev')}
            >
              Desarrollo
            </button>
            <button
              className={`env-tab ${selectedEnvironment === 'qa' ? 'active' : ''}`}
              onClick={() => setSelectedEnvironment('qa')}
            >
              Calidad
            </button>
            <button
              className={`env-tab ${selectedEnvironment === 'prod' ? 'active' : ''}`}
              onClick={() => setSelectedEnvironment('prod')}
            >
              Producción
            </button>
          </div>

          {/* DEV Environment */}
          {selectedEnvironment === 'dev' && (
            <div className="environment-detail">
              <div className="env-header">
                <h3>Ambiente de Desarrollo (DEV)</h3>
                <div className="env-badge dev">M10</div>
              </div>

              <div className="env-specs">
                <div className="spec-card">
                  <div className="spec-label">RAM</div>
                  <div className="spec-value">2 GB</div>
                </div>
                <div className="spec-card">
                  <div className="spec-label">Storage</div>
                  <div className="spec-value">10 GB</div>
                </div>
                <div className="spec-card">
                  <div className="spec-label">vCPUs</div>
                  <div className="spec-value">2</div>
                </div>
                <div className="spec-card">
                  <div className="spec-label">Arquitectura</div>
                  <div className="spec-value">3 Nodos</div>
                </div>
              </div>

              <div className="env-justification">
                <h4>Justificación</h4>
                <ul>
                  <li>✅ Punto de partida perfecto para el equipo de desarrollo</li>
                  <li>✅ Permite validar el esquema de datos (layout JSON)</li>
                  <li>✅ Soporta desarrollo de APIs y cargas iniciales de prueba</li>
                  <li>✅ Costo-efectivo para iteraciones rápidas</li>
                  <li>✅ Capacidad para hasta 1M de personas de prueba</li>
                  <li>✅ Ya incluye arquitectura de 3 nodos para probar resiliencia</li>
                </ul>
              </div>

              <div className="env-use-cases">
                <h4>Casos de Uso</h4>
                <div className="use-case-grid">
                  <div className="use-case-item">Validación de schema</div>
                  <div className="use-case-item">Desarrollo de APIs</div>
                  <div className="use-case-item">Cargas de datos de prueba</div>
                  <div className="use-case-item">Pruebas unitarias</div>
                </div>
              </div>
            </div>
          )}

          {/* QA Environment */}
          {selectedEnvironment === 'qa' && (
            <div className="environment-detail">
              <div className="env-header">
                <h3>Ambiente de Calidad (QA)</h3>
                <div className="env-badge qa">M30</div>
              </div>

              <div className="env-specs">
                <div className="spec-card">
                  <div className="spec-label">RAM</div>
                  <div className="spec-value">8 GB</div>
                </div>
                <div className="spec-card">
                  <div className="spec-label">Storage</div>
                  <div className="spec-value">40 GB</div>
                </div>
                <div className="spec-card">
                  <div className="spec-label">vCPUs</div>
                  <div className="spec-value">4</div>
                </div>
                <div className="spec-card">
                  <div className="spec-label">Arquitectura</div>
                  <div className="spec-value">3 Nodos</div>
                </div>
              </div>

              <div className="env-justification">
                <h4>Justificación</h4>
                <ul>
                  <li>✅ Ambiente clave para validación de performance</li>
                  <li>✅ 8GB RAM suficientes para Working Set inicial (~4GB datos + índices primarios)</li>
                  <li>✅ Permite ejecutar pruebas de estrés realistas</li>
                  <li>✅ Aquí se validan SLAs de latencia antes de producción</li>
                  <li>✅ Capacidad para datos completos de QA (subset de producción)</li>
                  <li>✅ Simula comportamiento de producción con carga moderada</li>
                </ul>
              </div>

              <div className="env-use-cases">
                <h4>Casos de Uso</h4>
                <div className="use-case-grid">
                  <div className="use-case-item">Pruebas de performance</div>
                  <div className="use-case-item">Validación de SLAs</div>
                  <div className="use-case-item">Pruebas de estrés</div>
                  <div className="use-case-item">Testing end-to-end</div>
                  <div className="use-case-item">Validación de índices</div>
                  <div className="use-case-item">Simulación de carga</div>
                </div>
              </div>
            </div>
          )}

          {/* PROD Environment */}
          {selectedEnvironment === 'prod' && (
            <div className="environment-detail">
              <div className="env-header">
                <h3>Ambiente de Producción (PROD)</h3>
                <div className="env-badge prod">M40</div>
              </div>

              <div className="env-specs highlight">
                <div className="spec-card">
                  <div className="spec-label">RAM</div>
                  <div className="spec-value">16 GB</div>
                </div>
                <div className="spec-card">
                  <div className="spec-label">Storage</div>
                  <div className="spec-value">80 GB</div>
                </div>
                <div className="spec-card">
                  <div className="spec-label">vCPUs</div>
                  <div className="spec-value">8</div>
                </div>
                <div className="spec-card">
                  <div className="spec-label">Arquitectura</div>
                  <div className="spec-value">3 Nodos</div>
                </div>
              </div>

              <div className="env-justification">
                <h4>Justificación Técnica Detallada</h4>
                <p className="justification-intro">
                  El M40 es el tier correcto de ingeniería para garantizar que el proceso más crítico
                  (cotización y emisión) tenga la velocidad que el negocio exige.
                </p>
                <ul>
                  <li>✅ <strong>16GB RAM</strong> garantizan que todo el Working Set (~10.6GB) viva en memoria</li>
                  <li>✅ <strong>5.4GB de buffer</strong> para picos de operación y consultas inesperadas</li>
                  <li>✅ Latencia de lectura {'<'}5ms (vs 250ms actual)</li>
                  <li>✅ Soporta crecimiento de 700K personas/año sin degradación</li>
                  <li>✅ 3.4M registros iniciales + índices completos en RAM</li>
                  <li>✅ Sin "eviction" de datos o índices al disco</li>
                </ul>
              </div>

              <div className="env-capacity">
                <h4>Capacidad y Escalabilidad</h4>
                <div className="capacity-grid">
                  <div className="capacity-item">
                    <strong>3.4M</strong>
                    <span>Registros iniciales</span>
                  </div>
                  <div className="capacity-item">
                    <strong>700K/año</strong>
                    <span>Crecimiento estimado</span>
                  </div>
                  <div className="capacity-item">
                    <strong>6.1K ops/día</strong>
                    <span>Escrituras manejables</span>
                  </div>
                  <div className="capacity-item">
                    <strong>{'<'}5ms</strong>
                    <span>Latencia objetivo</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Working Set Calculation */}
      <section className="working-set-section">
        <div className="container">
          <h2 className="section-title">Cálculo del Working Set (Año 1)</h2>
          <p className="section-description">
            El dimensionamiento de producción se reduce a una fórmula clave:
            <strong> Working Set = Datos + Índices + Crecimiento</strong>
          </p>

          <div className="working-set-formula">
            <div className="formula-card">
              <h4>Fórmula del Working Set</h4>
              <div className="formula-visual">
                <span className="formula-part data">Datos</span>
                <span className="formula-operator">+</span>
                <span className="formula-part indices">Índices</span>
                <span className="formula-operator">+</span>
                <span className="formula-part growth">Crecimiento</span>
                <span className="formula-operator">=</span>
                <span className="formula-result">Working Set</span>
              </div>
              <div className="formula-rule">
                <strong>Regla de Oro:</strong> Working Set {'<'} RAM del clúster
              </div>
            </div>
          </div>

          <div className="working-set-breakdown">
            <div className="breakdown-section">
              <h4>1. Datos Iniciales (Día 1)</h4>
              <div className="breakdown-card">
                <div className="breakdown-metric">
                  <span className="metric-label">Registros iniciales</span>
                  <span className="metric-value">3.4M personas</span>
                </div>
                <div className="breakdown-metric">
                  <span className="metric-label">Tamaño por documento</span>
                  <span className="metric-value">~1.5 KB</span>
                </div>
                <div className="breakdown-total">
                  <span className="total-label">Total Datos</span>
                  <span className="total-value">4.0 - 5.0 GB</span>
                </div>
              </div>
            </div>

            <div className="breakdown-section">
              <h4>2. Índices (Día 1)</h4>
              <div className="breakdown-card">
                <div className="breakdown-metric">
                  <span className="metric-label">Índice _id (Default)</span>
                  <span className="metric-value">~0.4 GB</span>
                </div>
                <div className="breakdown-metric">
                  <span className="metric-label">Índice rfc (Único, Crítico)</span>
                  <span className="metric-value">~0.7 GB</span>
                </div>
                <div className="breakdown-metric">
                  <span className="metric-label">Índices de búsqueda</span>
                  <span className="metric-value">~2.0 - 3.0 GB</span>
                </div>
                <div className="breakdown-note">
                  nombreCompleto, contactos.email, contactos.telefono, estructuraComercial, etc.
                </div>
                <div className="breakdown-total">
                  <span className="total-label">Total Índices</span>
                  <span className="total-value">3.0 - 4.0 GB</span>
                </div>
              </div>
            </div>

            <div className="breakdown-section">
              <h4>3. Crecimiento (Año 1)</h4>
              <div className="breakdown-card">
                <div className="breakdown-metric">
                  <span className="metric-label">Nuevas personas/año</span>
                  <span className="metric-value">700K (~20%)</span>
                </div>
                <div className="breakdown-metric">
                  <span className="metric-label">Crecimiento de datos</span>
                  <span className="metric-value">~1.0 GB</span>
                </div>
                <div className="breakdown-metric">
                  <span className="metric-label">Crecimiento de índices</span>
                  <span className="metric-value">~0.6 GB</span>
                </div>
                <div className="breakdown-total">
                  <span className="total-label">Total Crecimiento</span>
                  <span className="total-value">~1.6 GB</span>
                </div>
              </div>
            </div>
          </div>

          <div className="working-set-total">
            <h3>Total Working Set Estimado (Año 1)</h3>
            <div className="total-calculation">
              <div className="calc-line">
                <span className="calc-label">Datos</span>
                <span className="calc-value">5.0 GB</span>
              </div>
              <div className="calc-operator">+</div>
              <div className="calc-line">
                <span className="calc-label">Índices</span>
                <span className="calc-value">4.0 GB</span>
              </div>
              <div className="calc-operator">+</div>
              <div className="calc-line">
                <span className="calc-label">Crecimiento</span>
                <span className="calc-value">1.6 GB</span>
              </div>
              <div className="calc-divider"></div>
              <div className="calc-result">
                <span className="result-label">Working Set Total</span>
                <span className="result-value">~10.6 GB</span>
              </div>
            </div>
          </div>

          <button
            className="details-toggle"
            onClick={() => setShowWorkingSetDetails(!showWorkingSetDetails)}
          >
            {showWorkingSetDetails ? '▼' : '▶'} Ver detalles técnicos del cálculo
          </button>

          {showWorkingSetDetails && (
            <div className="working-set-details">
              <h4>Metodología del Cálculo</h4>
              <ul>
                <li>
                  <strong>Tamaño de documento:</strong> Estimado a partir del JSON de ejemplo (~1.5KB)
                  multiplicado por 3.4M registros. Incluye overhead de BSON.
                </li>
                <li>
                  <strong>Índice _id:</strong> MongoDB crea este índice por defecto. Tamaño ~12% del tamaño de datos.
                </li>
                <li>
                  <strong>Índice rfc:</strong> Campo crítico para búsquedas. Índice único de tipo string.
                  Tamaño ~20% del tamaño de datos.
                </li>
                <li>
                  <strong>Índices de búsqueda:</strong> Estimación conservadora basada en campos frecuentemente
                  consultados. Incluye índices multikey para arrays (contactos, direcciones).
                </li>
                <li>
                  <strong>Crecimiento:</strong> 700K personas/año a razón de ~1.5KB por documento +
                  crecimiento proporcional de índices.
                </li>
                <li>
                  <strong>Buffer:</strong> La diferencia entre Working Set (10.6GB) y RAM (16GB) actúa como
                  buffer para queries temporales, agregaciones y picos de carga.
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* M30 vs M40 Comparison */}
      <section className="comparison-section">
        <div className="container">
          <h2 className="section-title">¿Por qué M40 y no M30?</h2>
          <p className="section-description">
            Comparativa técnica que demuestra por qué el M40 es el tier correcto de ingeniería:
          </p>

          <div className="tier-comparison">
            {/* M30 Card */}
            <div className="tier-card m30">
              <div className="tier-header">
                <h3>Opción M30</h3>
                <div className="tier-badge warning">No Recomendado</div>
              </div>

              <div className="tier-specs">
                <div className="tier-spec">
                  <span className="spec-label">RAM Total</span>
                  <span className="spec-value">8 GB</span>
                </div>
                <div className="tier-spec">
                  <span className="spec-label">Working Set</span>
                  <span className="spec-value insufficient">10.6 GB</span>
                </div>
              </div>

              <div className="tier-memory-visual">
                <div className="memory-bar">
                  <div className="memory-used" style={{width: '100%'}}>
                    <span className="memory-label">8 GB RAM</span>
                  </div>
                  <div className="memory-overflow" style={{width: '32.5%'}}>
                    <span className="overflow-label">2.6 GB en disco</span>
                  </div>
                </div>
                <div className="memory-legend">
                  <span className="legend-workingset">Working Set: 10.6 GB</span>
                </div>
              </div>

              <div className="tier-analysis">
                <h4>Análisis</h4>
                <div className="analysis-item negative">
                  <strong>❌ Working Set no cabe en RAM</strong>
                  <p>10.6 GB {'>'} 8 GB disponibles</p>
                </div>
                <div className="analysis-item negative">
                  <strong>❌ Eviction constante</strong>
                  <p>MongoDB saca datos/índices de RAM para hacer espacio</p>
                </div>
                <div className="analysis-item negative">
                  <strong>❌ Lecturas desde disco</strong>
                  <p>Queries frecuentes van al disco (IOPS lentos)</p>
                </div>
                <div className="analysis-item negative">
                  <strong>❌ No cumple SLA de latencia</strong>
                  <p>Tiempos de respuesta impredecibles (~50-100ms+)</p>
                </div>
              </div>

              <div className="tier-verdict negative">
                <strong>Resultado:</strong> No cumple requerimientos de performance
              </div>
            </div>

            {/* VS Divider */}
            <div className="vs-divider">
              <span>VS</span>
            </div>

            {/* M40 Card */}
            <div className="tier-card m40">
              <div className="tier-header">
                <h3>Opción M40</h3>
                <div className="tier-badge success">✅ Recomendado</div>
              </div>

              <div className="tier-specs">
                <div className="tier-spec">
                  <span className="spec-label">RAM Total</span>
                  <span className="spec-value">16 GB</span>
                </div>
                <div className="tier-spec">
                  <span className="spec-label">Working Set</span>
                  <span className="spec-value sufficient">10.6 GB</span>
                </div>
              </div>

              <div className="tier-memory-visual">
                <div className="memory-bar">
                  <div className="memory-used" style={{width: '66.25%'}}>
                    <span className="memory-label">10.6 GB Working Set</span>
                  </div>
                  <div className="memory-buffer" style={{width: '33.75%'}}>
                    <span className="buffer-label">5.4 GB Buffer</span>
                  </div>
                </div>
                <div className="memory-legend">
                  <span className="legend-total">RAM Total: 16 GB</span>
                </div>
              </div>

              <div className="tier-analysis">
                <h4>Análisis</h4>
                <div className="analysis-item positive">
                  <strong>✅ Working Set cabe en RAM</strong>
                  <p>10.6 GB {'<'} 16 GB disponibles</p>
                </div>
                <div className="analysis-item positive">
                  <strong>✅ 5.4 GB de buffer</strong>
                  <p>Colchón para picos, agregaciones y queries temporales</p>
                </div>
                <div className="analysis-item positive">
                  <strong>✅ Lecturas en memoria</strong>
                  <p>Todas las consultas frecuentes se sirven desde RAM</p>
                </div>
                <div className="analysis-item positive">
                  <strong>✅ Cumple SLA de latencia</strong>
                  <p>Tiempos de respuesta {'<'}5ms consistentes</p>
                </div>
              </div>

              <div className="tier-verdict positive">
                <strong>Resultado:</strong> Garantiza performance óptima y escalabilidad
              </div>
            </div>
          </div>

          <div className="comparison-conclusion">
            <h3>Conclusión</h3>
            <div className="conclusion-box">
              <p>
                El <strong>M40 no es un lujo, es el tier de ingeniería correcto</strong> para garantizar
                que el proceso más crítico (cotización y emisión) tenga la velocidad que el negocio
                exige, sobre una arquitectura resiliente de 3 nodos.
              </p>
              <p>
                Un M30 ahorraría costos iniciales pero <strong>fallaría el requerimiento principal
                de latencia</strong>, obligando a un upgrade posterior más costoso y disruptivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="next-steps-section">
        <div className="container">
          <h2 className="section-title">Siguientes Pasos</h2>

          <div className="steps-timeline">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Validación del Schema</h4>
                <p>Revisar y validar el layout JSON de "Persona Única" con el equipo técnico</p>
                <span className="step-duration">1 semana</span>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Provisión de Ambientes</h4>
                <p>Desplegar clústeres M10 (DEV), M30 (QA) y M40 (PROD) en MongoDB Atlas</p>
                <span className="step-duration">1 día</span>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Carga Inicial de Datos</h4>
                <p>Migrar 3.4M registros de personas al clúster M40 de producción</p>
                <span className="step-duration">2-3 días</span>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Creación de Índices</h4>
                <p>Implementar índices optimizados basados en patrones de consulta</p>
                <span className="step-duration">1 día</span>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>Pruebas de Performance</h4>
                <p>Validar latencias {'<'}5ms en QA antes de liberar a producción</p>
                <span className="step-duration">1-2 semanas</span>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">6</div>
              <div className="step-content">
                <h4>Go Live</h4>
                <p>Lanzamiento a producción con monitoreo continuo</p>
                <span className="step-duration">Día 1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sura-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Contacto</h4>
              <p>Leo Alarcón</p>
              <p>Solutions Architect - MongoDB</p>
              <p>leo.alarcon@mongodb.com</p>
            </div>
            <div className="footer-section">
              <h4>Documentación</h4>
              <p>Sizing Calculator</p>
              <p>MongoDB Atlas Documentation</p>
              <p>Performance Best Practices</p>
            </div>
            <div className="footer-section">
              <h4>Arquitectura Propuesta</h4>
              <p><strong>DEV:</strong> M10 (2GB RAM)</p>
              <p><strong>QA:</strong> M30 (8GB RAM)</p>
              <p><strong>PROD:</strong> M40 (16GB RAM)</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>MongoDB Atlas - Persona Única Sura México - Noviembre 2025</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SizingSuraPersonaUnica
