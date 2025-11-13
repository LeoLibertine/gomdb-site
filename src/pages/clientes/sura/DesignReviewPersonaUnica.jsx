import React, { useState } from 'react'
import './DesignReviewPersonaUnica.css'

/**
 * DesignReviewPersonaUnica - Design Review y Estrategia de Datos
 *
 * Página interactiva que presenta el análisis de diseño para el proyecto
 * "Persona Única" de Sura México, incluyendo:
 * - Diagnóstico de latencia actual basado en ApiPeople.xlsx
 * - Modelo de datos (Extended Reference Pattern)
 * - Estrategia completa de indexación
 * - Justificación técnica M40
 */

export const DesignReviewPersonaUnica = () => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [showDocumentDetails, setShowDocumentDetails] = useState(false)

  const indices = [
    {
      id: 'rfc',
      name: '{ "rfc": 1 }',
      type: 'Llave Principal',
      unique: true,
      sparse: false,
      multikey: false,
      size: '~0.7 GB',
      purpose: 'Garantiza la unicidad del "Golden Record" y es la principal vía de consulta',
      queries: ['Búsqueda por RFC', 'Validación de unicidad', 'Consulta principal'],
      priority: 'Crítico',
      color: '#ff6b6b'
    },
    {
      id: 'curp',
      name: '{ "curp": 1 }',
      type: 'Llave Secundaria',
      unique: true,
      sparse: true,
      multikey: false,
      size: '~0.6 GB',
      purpose: 'Búsqueda rápida por otra llave única nacional',
      queries: ['Búsqueda por CURP', 'Validación de identidad'],
      priority: 'Alto',
      color: '#ffa500'
    },
    {
      id: 'nombreCompleto',
      name: '{ "nombreCompleto": 1 }',
      type: 'Búsqueda',
      unique: false,
      sparse: false,
      multikey: false,
      size: '~0.6 GB',
      purpose: 'Búsqueda tipo "type-ahead" o autocompletar en aplicaciones internas',
      queries: ['Búsqueda por nombre', 'Autocompletar', 'Búsqueda fuzzy'],
      priority: 'Medio',
      color: '#00ED64'
    },
    {
      id: 'claveInsis',
      name: '{ "claveInsis": 1 }',
      type: 'Sincronización',
      unique: false,
      sparse: true,
      multikey: false,
      size: '~0.4 GB',
      purpose: 'Permite encontrar persona usando identificador del sistema legacy Insis',
      queries: ['Sincronización Insis', 'Migración de datos'],
      priority: 'Medio',
      color: '#56AAFA'
    },
    {
      id: 'claveAcsel',
      name: '{ "claveAcsel": 1 }',
      type: 'Sincronización',
      unique: false,
      sparse: true,
      multikey: false,
      size: '~0.4 GB',
      purpose: 'Permite encontrar persona usando identificador del sistema legacy Acsel',
      queries: ['Sincronización Acsel', 'Migración de datos'],
      priority: 'Medio',
      color: '#56AAFA'
    },
    {
      id: 'claveAlea',
      name: '{ "claveAlea": 1 }',
      type: 'Sincronización (Multikey)',
      unique: false,
      sparse: false,
      multikey: true,
      size: '~0.5 GB',
      purpose: 'Permite encontrar persona usando identificadores del sistema legacy Alea (array)',
      queries: ['Sincronización Alea', 'Búsqueda en múltiples claves'],
      priority: 'Medio',
      color: '#56AAFA'
    },
    {
      id: 'contactos',
      name: '{ "contactos.contacto": 1 }',
      type: 'Búsqueda (Multikey)',
      unique: false,
      sparse: false,
      multikey: true,
      size: '~0.8 GB',
      purpose: 'Crítico para negocio: encuentra persona por email o teléfono instantáneamente',
      queries: ['Búsqueda por email', 'Búsqueda por teléfono', 'Validación de contacto'],
      priority: 'Crítico',
      color: '#ff6b6b'
    },
    {
      id: 'estructuraComercial',
      name: '{ "estructuraComercia.clave": 1 }',
      type: 'Búsqueda (Multikey)',
      unique: false,
      sparse: false,
      multikey: true,
      size: '~0.5 GB',
      purpose: 'Encuentra personas asociadas a un agente o promotor específico',
      queries: ['Búsqueda por agente', 'Búsqueda por promotor', 'Reportes comerciales'],
      priority: 'Alto',
      color: '#ffa500'
    }
  ]

  const totalIndexSize = indices.reduce((sum, idx) => {
    const size = parseFloat(idx.size.match(/[\d.]+/)[0])
    return sum + size
  }, 0)

  return (
    <div className="design-review-page">
      {/* Hero Section */}
      <header className="design-hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
        </div>
        <div className="hero-content">
          <div className="hero-icon-large">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#00ED64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="design-hero-title">Design Review: Persona Única</h1>
          <p className="design-hero-subtitle">Modelo de Datos y Estrategia de Indexación</p>
          <div className="hero-meta-design">
            <span className="meta-item-design">
              <span className="meta-label-design">Proyecto:</span> Golden Record Sura México
            </span>
            <span className="meta-item-design">
              <span className="meta-label-design">Patrón:</span> Extended Reference
            </span>
            <span className="meta-item-design">
              <span className="meta-label-design">Review Date:</span> Noviembre 2025
            </span>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="executive-summary-section">
        <div className="container">
          <h2 className="section-title">Resumen Ejecutivo</h2>
          <div className="summary-boxes">
            <div className="summary-box diagnosis">
              <div className="box-header">
                <span className="box-icon">🔍</span>
                <h3>El Diagnóstico</h3>
              </div>
              <p>
                El archivo <code>ApiPeople.xlsx</code> muestra latencias de <strong>220-270ms</strong>.
                Síntoma clásico de una arquitectura limitada por I/O de disco, leyendo datos e índices
                desde almacenamiento en lugar de RAM.
              </p>
            </div>

            <div className="summary-box objective">
              <div className="box-header">
                <span className="box-icon">🎯</span>
                <h3>El Objetivo</h3>
              </div>
              <p>
                Reducir latencia a <strong>{'<'}5ms</strong> para no bloquear procesos críticos de
                cotización y emisión. Criterio de éxito #1 del proyecto.
              </p>
            </div>

            <div className="summary-box solution">
              <div className="box-header">
                <span className="box-icon">💡</span>
                <h3>La Solución</h3>
              </div>
              <p>
                Garantizar que el <strong>conjunto de trabajo completo</strong> (datos + índices)
                resida permanentemente en <strong>RAM</strong>. Arquitectura: <strong>M40 (16GB RAM)</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latency Diagnosis */}
      <section className="latency-diagnosis-section">
        <div className="container">
          <h2 className="section-title">Diagnóstico: Análisis de Latencia</h2>
          <p className="section-description">
            Basado en <code>ApiPeople.xlsx</code> - Evidencia del problema actual
          </p>

          <div className="diagnosis-content">
            <div className="diagnosis-chart">
              <h3>Distribución de Latencias Actual</h3>
              <div className="latency-bars">
                <div className="latency-bar-item">
                  <span className="bar-label">Mínima</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{width: '75%'}}>
                      <span className="bar-value">220ms</span>
                    </div>
                  </div>
                </div>
                <div className="latency-bar-item">
                  <span className="bar-label">Promedio</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{width: '85%'}}>
                      <span className="bar-value">245ms</span>
                    </div>
                  </div>
                </div>
                <div className="latency-bar-item">
                  <span className="bar-label">Máxima</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{width: '100%'}}>
                      <span className="bar-value">270ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="diagnosis-analysis">
              <h3>Causa Raíz Identificada</h3>
              <div className="cause-items">
                <div className="cause-item">
                  <span className="cause-icon">❌</span>
                  <div className="cause-content">
                    <strong>Working Set no cabe en RAM</strong>
                    <p>Datos + Índices {'>'} RAM disponible</p>
                  </div>
                </div>
                <div className="cause-item">
                  <span className="cause-icon">💾</span>
                  <div className="cause-content">
                    <strong>Lecturas desde disco</strong>
                    <p>IOPS limitan velocidad de consultas</p>
                  </div>
                </div>
                <div className="cause-item">
                  <span className="cause-icon">🔄</span>
                  <div className="cause-content">
                    <strong>Eviction constante</strong>
                    <p>Datos e índices entran/salen de RAM</p>
                  </div>
                </div>
                <div className="cause-item">
                  <span className="cause-icon">⏱️</span>
                  <div className="cause-content">
                    <strong>Latencia impredecible</strong>
                    <p>Variación 220ms - 270ms según cache</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Model Pattern */}
      <section className="data-model-section">
        <div className="container">
          <h2 className="section-title">Modelo de Datos: Extended Reference Pattern</h2>
          <p className="section-description">
            El archivo <code>Example-Layout-PersonaUnica.json</code> valida que el patrón de
            Referencia Extendida es el diseño óptimo para el Golden Record
          </p>

          <div className="pattern-explanation">
            <div className="pattern-card">
              <h3>¿Qué es Extended Reference?</h3>
              <p>
                Un patrón de modelado de datos donde <strong>un solo documento</strong> contiene
                toda la información relevante de una entidad (persona), incluyendo:
              </p>
              <ul>
                <li>✅ Datos demográficos (nombre, fecha nacimiento, género)</li>
                <li>✅ Identificadores únicos (RFC, CURP)</li>
                <li>✅ Arrays de contactos (emails, teléfonos)</li>
                <li>✅ Arrays de direcciones (fiscal, casa)</li>
                <li>✅ Estructura comercial (agentes, promotores)</li>
                <li>✅ Claves de sincronización (Insis, Acsel, Alea)</li>
              </ul>
            </div>

            <div className="pattern-benefits">
              <h3>Beneficios del Patrón</h3>
              <div className="benefit-grid-design">
                <div className="benefit-item-design">
                  <span className="benefit-icon-design">⚡</span>
                  <strong>1 Query = Toda la Info</strong>
                  <p>Sin JOINs, sin múltiples consultas</p>
                </div>
                <div className="benefit-item-design">
                  <span className="benefit-icon-design">🎯</span>
                  <strong>Atomicidad</strong>
                  <p>Actualizar persona es 1 operación atómica</p>
                </div>
                <div className="benefit-item-design">
                  <span className="benefit-icon-design">📊</span>
                  <strong>Escalabilidad</strong>
                  <p>Fácil de particionar (shard) por RFC</p>
                </div>
                <div className="benefit-item-design">
                  <span className="benefit-icon-design">🔒</span>
                  <strong>Consistencia</strong>
                  <p>Golden Record siempre completo y consistente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Structure Interactive */}
      <section className="document-structure-interactive">
        <div className="container">
          <h2 className="section-title">Estructura del Documento "Persona Única"</h2>

          <div className="document-viewer">
            <div className="document-header">
              <span className="doc-file">Example-Layout-PersonaUnica.json</span>
              <button
                className="doc-toggle"
                onClick={() => setShowDocumentDetails(!showDocumentDetails)}
              >
                {showDocumentDetails ? 'Ocultar detalles' : 'Mostrar detalles'}
              </button>
            </div>

            <pre className="document-code">
{`{
  // ===== IDENTIFICADORES ÚNICOS =====
  "rfc": "GADM801001D01",                    // Llave principal
  "curp": "GXDM661216HCMXXXG1",              // Llave secundaria
  "claveInsis": "INS2382",                   // Legacy: Insis
  "claveAcsel": "ACSEL1177",                 // Legacy: Acsel
  "claveAlea": [                             // Legacy: Alea (array)
    "ALEA4894",
    "ALEA1836",
    "ALEA9833"
  ],

  // ===== DATOS DEMOGRÁFICOS =====
  "nombreCompleto": "María Fernanda García Díaz",
  "primerNombre": "María",
  "segundoNombre": "Fernanda",
  "primerApellido": "García",
  "segundoApellido": "Díaz",
  "fechaNacimiento": "2007-03-20",
  "genero": "F",
  "nacionalidad": "Colombiana",
  "tipoPersona": "Física",

  // ===== METADATA =====
  "activa": true,
  "arco": true,
  "fechaActualizacion": "2025-10-28",
  "fechaCreacion": "2023-12-30",

  // ===== ESTRUCTURA COMERCIAL (Array) =====
  "estructuraComercia": [
    {
      "tipo": "agente",
      "clave": "AG001",                      // Índice aquí
      "activo": true
    },
    {
      "tipo": "promotor",
      "clave": "PR001",                      // Índice aquí
      "activo": true
    }
  ],

  // ===== ROLES (Array) =====
  "roles": [
    {
      "nombreRol": "Contratante",
      "informacionAdicional": {
        "ocupacion": "Ingeniero",
        "estadoCivil": "Soltero"
      }
    }
  ],

  // ===== CONTACTOS (Array) =====
  "contactos": [
    {
      "tipo": "email",
      "contacto": "María.García83@example.com" // Índice aquí
    },
    {
      "tipo": "TelefonoCasa",
      "contacto": "5551234567"                  // Índice aquí
    },
    {
      "tipo": "TelefonoMobil",
      "contacto": "5512345678"                  // Índice aquí
    }
  ],

  // ===== DIRECCIONES (Array) =====
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
    },
    {
      "tipo": "Casa",
      "calle": "Insurgentes",
      "numExterior": "456",
      "numInterior": "2A",
      "colonia": "Del Valle",
      "municipio": "Benito Juárez",
      "ciudad": "CDMX",
      "codigoPostal": "804745"
    }
  ]
}`}
            </pre>

            {showDocumentDetails && (
              <div className="document-details">
                <h4>Análisis del Documento</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Tamaño Estimado:</strong>
                    <span>~1.5 KB por documento</span>
                  </div>
                  <div className="detail-item">
                    <strong>Campos Indexables:</strong>
                    <span>8+ campos críticos</span>
                  </div>
                  <div className="detail-item">
                    <strong>Arrays:</strong>
                    <span>4 (claveAlea, estructuraComercia, contactos, direcciones)</span>
                  </div>
                  <div className="detail-item">
                    <strong>Índices Multikey:</strong>
                    <span>3 (claveAlea, contactos.contacto, estructuraComercia.clave)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Indexing Strategy */}
      <section className="indexing-strategy-section">
        <div className="container">
          <h2 className="section-title">Estrategia de Indexación</h2>
          <p className="section-description">
            8 índices recomendados para garantizar latencias {'<'}5ms en todas las consultas críticas
          </p>

          <div className="index-stats">
            <div className="stat-box">
              <span className="stat-number">{indices.length}</span>
              <span className="stat-label">Índices Totales</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{totalIndexSize.toFixed(1)} GB</span>
              <span className="stat-label">Tamaño Total</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">3</span>
              <span className="stat-label">Índices Multikey</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">2</span>
              <span className="stat-label">Índices Únicos</span>
            </div>
          </div>

          <div className="indices-grid">
            {indices.map((index) => (
              <div
                key={index.id}
                className={`index-card-detailed ${selectedIndex === index.id ? 'selected' : ''}`}
                onClick={() => setSelectedIndex(selectedIndex === index.id ? null : index.id)}
                style={{borderLeftColor: index.color}}
              >
                <div className="index-card-header">
                  <code className="index-name-code">{index.name}</code>
                  <span className={`priority-badge ${index.priority.toLowerCase()}`}>
                    {index.priority}
                  </span>
                </div>

                <div className="index-card-meta">
                  <span className="index-type">{index.type}</span>
                  <span className="index-size-badge">{index.size}</span>
                </div>

                <div className="index-properties">
                  {index.unique && <span className="prop-badge unique">UNIQUE</span>}
                  {index.sparse && <span className="prop-badge sparse">SPARSE</span>}
                  {index.multikey && <span className="prop-badge multikey">MULTIKEY</span>}
                </div>

                <p className="index-purpose">{index.purpose}</p>

                {selectedIndex === index.id && (
                  <div className="index-details-expanded">
                    <h4>Consultas Soportadas:</h4>
                    <ul>
                      {index.queries.map((query, idx) => (
                        <li key={idx}>{query}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="index-card-footer">
                  {selectedIndex === index.id ? '▲ Ver menos' : '▼ Ver detalles'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Set Calculation */}
      <section className="working-set-detailed-section">
        <div className="container">
          <h2 className="section-title">Cálculo del Working Set (Año 1)</h2>

          <div className="working-set-formula-visual">
            <div className="formula-component data">
              <span className="component-icon">📄</span>
              <span className="component-label">Datos</span>
              <span className="component-value">5.0 GB</span>
            </div>
            <span className="formula-operator">+</span>
            <div className="formula-component indices">
              <span className="component-icon">🔑</span>
              <span className="component-label">Índices</span>
              <span className="component-value">{totalIndexSize.toFixed(1)} GB</span>
            </div>
            <span className="formula-operator">+</span>
            <div className="formula-component growth">
              <span className="component-icon">📈</span>
              <span className="component-label">Crecimiento</span>
              <span className="component-value">1.6 GB</span>
            </div>
            <span className="formula-operator">=</span>
            <div className="formula-component result">
              <span className="component-icon">💾</span>
              <span className="component-label">Working Set</span>
              <span className="component-value">11.1 GB</span>
            </div>
          </div>

          <div className="workingset-breakdown-detailed">
            <div className="breakdown-col">
              <h3>Datos (5.0 GB)</h3>
              <div className="breakdown-item-detail">
                <span className="detail-label">Registros iniciales:</span>
                <span className="detail-value">3.4M personas</span>
              </div>
              <div className="breakdown-item-detail">
                <span className="detail-label">Tamaño por documento:</span>
                <span className="detail-value">~1.5 KB</span>
              </div>
              <div className="breakdown-item-detail">
                <span className="detail-label">Total estimado:</span>
                <span className="detail-value">5.0 GB</span>
              </div>
            </div>

            <div className="breakdown-col">
              <h3>Índices ({totalIndexSize.toFixed(1)} GB)</h3>
              <div className="breakdown-item-detail">
                <span className="detail-label">_id (default):</span>
                <span className="detail-value">0.4 GB</span>
              </div>
              <div className="breakdown-item-detail">
                <span className="detail-label">rfc (único):</span>
                <span className="detail-value">0.7 GB</span>
              </div>
              <div className="breakdown-item-detail">
                <span className="detail-label">Búsquedas + Legacy:</span>
                <span className="detail-value">3.4 GB</span>
              </div>
            </div>

            <div className="breakdown-col">
              <h3>Crecimiento (1.6 GB)</h3>
              <div className="breakdown-item-detail">
                <span className="detail-label">Nuevas personas/año:</span>
                <span className="detail-value">700K (+20%)</span>
              </div>
              <div className="breakdown-item-detail">
                <span className="detail-label">Datos adicionales:</span>
                <span className="detail-value">1.0 GB</span>
              </div>
              <div className="breakdown-item-detail">
                <span className="detail-label">Índices adicionales:</span>
                <span className="detail-value">0.6 GB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* M30 vs M40 Comparison */}
      <section className="tier-comparison-detailed-section">
        <div className="container">
          <h2 className="section-title">¿Por qué M40 y no M30?</h2>

          <div className="comparison-visual">
            <div className="tier-option m30-option">
              <div className="tier-option-header">
                <h3>Opción M30</h3>
                <span className="tier-verdict-badge fail">❌ No Recomendado</span>
              </div>

              <div className="tier-specs-visual">
                <div className="spec-item-visual">
                  <span className="spec-label-visual">RAM Total:</span>
                  <span className="spec-value-visual">8 GB</span>
                </div>
                <div className="spec-item-visual critical">
                  <span className="spec-label-visual">Working Set:</span>
                  <span className="spec-value-visual critical">11.1 GB</span>
                </div>
              </div>

              <div className="memory-visualization">
                <div className="memory-bar-viz">
                  <div className="memory-filled" style={{width: '100%'}}>
                    8 GB RAM
                  </div>
                  <div className="memory-overflow-viz" style={{width: '38.75%'}}>
                    3.1 GB en disco
                  </div>
                </div>
              </div>

              <div className="tier-analysis-detailed">
                <div className="analysis-point negative">
                  <span className="point-icon">❌</span>
                  <div className="point-content">
                    <strong>Working Set NO cabe</strong>
                    <p>11.1 GB {'>'} 8 GB → ~3GB leen desde disco</p>
                  </div>
                </div>
                <div className="analysis-point negative">
                  <span className="point-icon">⚠️</span>
                  <div className="point-content">
                    <strong>Eviction constante</strong>
                    <p>Datos e índices entran/salen de RAM continuamente</p>
                  </div>
                </div>
                <div className="analysis-point negative">
                  <span className="point-icon">🐌</span>
                  <div className="point-content">
                    <strong>Replica latencia actual</strong>
                    <p>Mismo problema: ~250ms por lecturas de disco</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="vs-separator">
              <span>VS</span>
            </div>

            <div className="tier-option m40-option">
              <div className="tier-option-header">
                <h3>Opción M40</h3>
                <span className="tier-verdict-badge success">✅ Recomendado</span>
              </div>

              <div className="tier-specs-visual">
                <div className="spec-item-visual">
                  <span className="spec-label-visual">RAM Total:</span>
                  <span className="spec-value-visual">16 GB</span>
                </div>
                <div className="spec-item-visual success">
                  <span className="spec-label-visual">Working Set:</span>
                  <span className="spec-value-visual success">11.1 GB</span>
                </div>
              </div>

              <div className="memory-visualization">
                <div className="memory-bar-viz">
                  <div className="memory-filled success" style={{width: '69.4%'}}>
                    11.1 GB Working Set
                  </div>
                  <div className="memory-buffer-viz" style={{width: '30.6%'}}>
                    4.9 GB Buffer
                  </div>
                </div>
              </div>

              <div className="tier-analysis-detailed">
                <div className="analysis-point positive">
                  <span className="point-icon">✅</span>
                  <div className="point-content">
                    <strong>Working Set cabe perfectamente</strong>
                    <p>11.1 GB {'<'} 16 GB → Todo en RAM</p>
                  </div>
                </div>
                <div className="analysis-point positive">
                  <span className="point-icon">🛡️</span>
                  <div className="point-content">
                    <strong>Buffer de 4.9 GB</strong>
                    <p>Colchón para picos, agregaciones y queries temporales</p>
                  </div>
                </div>
                <div className="analysis-point positive">
                  <span className="point-icon">⚡</span>
                  <div className="point-content">
                    <strong>Latencia {'<'}5ms garantizada</strong>
                    <p>Todas las consultas se sirven desde RAM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="comparison-conclusion-box">
            <h3>Conclusión Técnica</h3>
            <p>
              El <strong>M40 no es un lujo, es el tier de ingeniería correcto</strong> para garantizar
              que el conjunto de trabajo completo (11.1 GB) viva permanentemente en la RAM.
            </p>
            <p>
              Un M30 ahorraría costos iniciales pero <strong>replicaría la latencia actual de ~250ms</strong>,
              fallando el objetivo principal del proyecto: velocidad en cotización y emisión.
            </p>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="recommendations-section">
        <div className="container">
          <h2 className="section-title">Recomendaciones Finales</h2>

          <div className="recommendations-grid">
            <div className="recommendation-card">
              <div className="rec-number">1</div>
              <h3>Arquitectura de 3 Nodos</h3>
              <p>
                Desplegar todos los ambientes (DEV/QA/PROD) como Replica Sets de 3 nodos
                para alta disponibilidad y tolerancia a fallos automática.
              </p>
            </div>

            <div className="recommendation-card">
              <div className="rec-number">2</div>
              <h3>Implementar Índices Completos</h3>
              <p>
                Crear los 8 índices recomendados desde Día 1. Los índices son tan críticos
                como los datos para lograr latencias {'<'}5ms.
              </p>
            </div>

            <div className="recommendation-card">
              <div className="rec-number">3</div>
              <h3>Validar en QA Primero</h3>
              <p>
                Ejecutar pruebas de estrés realistas en el ambiente M30 (QA) con datos
                completos antes de desplegar a producción M40.
              </p>
            </div>

            <div className="recommendation-card">
              <div className="rec-number">4</div>
              <h3>Monitoreo de Performance</h3>
              <p>
                Configurar alertas en Atlas para monitorear: latencia de queries, uso de RAM,
                page faults y operaciones por segundo.
              </p>
            </div>

            <div className="recommendation-card">
              <div className="rec-number">5</div>
              <h3>Plan de Crecimiento</h3>
              <p>
                Con 700K personas/año, el M40 soporta ~2 años de crecimiento. Evaluar
                upgrade a M50 en Q4 2026.
              </p>
            </div>

            <div className="recommendation-card">
              <div className="rec-number">6</div>
              <h3>Revisión Post-Go-Live</h3>
              <p>
                Agendar sesión de revisión 2 semanas post-lanzamiento para validar latencias
                reales y optimizar índices si es necesario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Meeting */}
      <section className="next-meeting-section">
        <div className="container">
          <div className="meeting-card">
            <div className="meeting-icon">📅</div>
            <h2>Próxima Sesión</h2>
            <p className="meeting-date">Jueves 13 de Noviembre, 12:30 PM</p>
            <div className="meeting-agenda">
              <h3>Agenda:</h3>
              <ul>
                <li>✅ Revisar formalmente esta propuesta de diseño</li>
                <li>✅ Validar estrategia de indexación con equipo técnico</li>
                <li>✅ Discutir detalles de migración de datos desde sistemas legacy</li>
                <li>✅ Planificar aprovisionamiento de ambientes (DEV/QA/PROD)</li>
                <li>✅ Definir timeline de implementación</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="design-footer">
        <div className="container">
          <div className="footer-content-design">
            <div className="footer-col">
              <h4>Contacto</h4>
              <p>Leo Alarcón</p>
              <p>Solutions Architect - MongoDB</p>
              <p>leo.alarcon@mongodb.com</p>
            </div>
            <div className="footer-col">
              <h4>Documentos de Referencia</h4>
              <p>Example-Layout-PersonaUnica.json</p>
              <p>ApiPeople.xlsx</p>
              <p>Sizing MongoDB Atlas - Persona Única</p>
            </div>
            <div className="footer-col">
              <h4>Arquitectura Propuesta</h4>
              <p><strong>Modelo:</strong> Extended Reference Pattern</p>
              <p><strong>Índices:</strong> 8 índices (4.5GB)</p>
              <p><strong>Producción:</strong> M40 (16GB RAM)</p>
            </div>
          </div>
          <div className="footer-bottom-design">
            <p>MongoDB Atlas - Design Review Persona Única - Sura México - Noviembre 2025</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DesignReviewPersonaUnica
