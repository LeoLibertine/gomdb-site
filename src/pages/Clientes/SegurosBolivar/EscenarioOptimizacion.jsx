// src/pages/Clientes/SegurosBolivar/EscenarioOptimizacion.jsx

import React from 'react';
import './EscenarioOptimizacion.css';

export default function EscenarioOptimizacion() {
  return (
    <div className="container">
      {/* ------------------ Header ------------------ */}
      <div className="header">
        <div className="mongodb-logo">MongoDB Atlas</div>
        <h1 className="main-title">
          Optimización de Arquitectura Ciencuadras
        </h1>
        <h4 className="subtitle">Escenario Final</h4>
      </div>

      {/* ------------------ Arquitectura MongoDB Atlas ------------------ */}
      <div className="section">
        <h3 className="section-title">
          🏗️ Arquitectura MongoDB Atlas - Escenario 3 nodos transaccionales M40 + 1
          Nodo Analitico + 2 nodos de Search
        </h3>

        {/* Título + SVG dentro de un contenedor con borde */}
        <div className="architecture-diagram" style={{ marginBottom: '40px' }}>
          <div
            style={{
              background: 'white',
              border: '2px solid #00ED64',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #00ED64, #13AA52)',
                color: 'white',
                padding: '15px',
                textAlign: 'center',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>
                🏗️ Arquitectura MongoDB Atlas M40 - Ciencuadras
              </h3>
            </div>
            <div style={{ padding: '20px' }}>
              <img
                src="/CiencuadrasFinal.svg"
                alt="Arquitectura MongoDB Atlas M40 - Ciencuadras"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>

        {/* Componentes de la arquitectura */}
        <div className="architecture-diagram">
          {/* M40 Primary Node (destacado) */}
          <div className="arch-component m50-highlight">
            <h3>
              <div className="arch-icon">⚡</div>
              M40 Primary Node (Cluster Transaccional)
            </h3>
            <p>
              <strong>Descripción:</strong> Nodo principal que maneja operaciones
              de lectura y escritura del core del negocio.
            </p>
            <div className="arch-specs">
              <strong>Especificaciones:</strong>
              <br />
              • <span style={{ color: '#00ED64' }}>4 vCPUs, 16 GB RAM, 300 GB SSD</span>
              <br />
              • Optimizado para transacciones del negocio
              <br />
              • Alta disponibilidad garantizada
            </div>
          </div>

          {/* Replica Set Nodes */}
          <div className="arch-component">
            <h3>
              <div className="arch-icon">🔄</div>
              2 Replica Set Nodes (M40 secundarios)
            </h3>
            <p>
              Réplicas completas del nodo primario para alta disponibilidad y
              recuperación ante fallos (automático). Cada nodo tiene su propia
              instancia M40.
            </p>
          </div>

          {/* Nodo Analítico M30 */}
          <div className="arch-component">
            <h3>
              <div className="arch-icon">📊</div>
              1 Nodo Analítico M30
            </h3>
            <p>
              Servidor dedicado para <strong>Analytics</strong> con 2 vCPUs, 8 GB
              RAM y 500 GB de almacenamiento. Optimizado para reportes, BI y
              agregaciones sin impacto en el cluster transaccional.
            </p>
          </div>

          {/* Nodos de Search S40 */}
          <div className="arch-component">
            <h3>
              <div className="arch-icon">🔍</div>
              2 Nodos de búsqueda S40
            </h3>
            <p>
              Servidores dedicados solo para <strong>Atlas Search</strong>. Cada uno
              tiene 2 vCPUs, 16 GB RAM y 421 GB de almacenamiento NVMe para
              rendimiento óptimo de búsquedas tipo full-text, autocompletar, etc.
            </p>
          </div>

          {/* Continuous Backup */}
          <div className="arch-component">
            <h3>
              <div className="arch-icon">💾</div>
              Continuous Backup (Cloud Snapshots)
            </h3>
            <p>Backups incrementales y automáticos sin impacto operativo.</p>
          </div>

          {/* Networking */}
          <div className="arch-component">
            <h3>
              <div className="arch-icon">🌐</div>
              Networking (Egress/Ingress)
            </h3>
            <p>
              Incluye costos por transferencia de datos entre aplicaciones y la
              base de datos.
            </p>
          </div>

          {/* Soporte Pro */}
          <div className="arch-component">
            <h3>
              <div className="arch-icon">🛡️</div>
              Soporte Pro
            </h3>
            <p>
              Incluye SLAs, soporte 24x7, alertas, VPC Peering, control avanzado
              de acceso, y más.
            </p>
          </div>
        </div>
      </div>

      {/* ------------------ Flujo de Datos ------------------ */}
      <div className="section">
        <h2 className="section-title">🔄 Flujo de Datos - Arquitectura MongoDB Atlas</h2>

        <div className="flow-diagram">
          {/* Paso 1 */}
          <div className="flow-step">
            <div className="flow-number">1</div>
            <div className="flow-title">Ingreso del usuario final</div>
            <p>
              Usuarios interactúan desde apps web/móviles. El tráfico entra por{' '}
              <strong>WAF</strong> y pasa por <strong>API Gateway</strong> que
              gestiona autenticación con <strong>Cognito</strong>.
            </p>
          </div>

          {/* Paso 2 */}
          <div className="flow-step">
            <div className="flow-number">2</div>
            <div className="flow-title">Microservicios de integración</div>
            <p>
              Publicación masiva de inmuebles y proyectos. APIs para aliados y
              constructoras. Envían eventos a través de <strong>SQS</strong> para
              dosificación.
            </p>
          </div>

          {/* Paso 3 */}
          <div className="flow-step">
            <div className="flow-number">3</div>
            <div className="flow-title">Persistencia transaccional</div>
            <p>
              Toda la lógica del negocio vive en colecciones dentro del{' '}
              <strong>clúster MongoDB Atlas M40</strong>. CRUD en tiempo real con
              Replica Set para alta disponibilidad.
            </p>
          </div>

          {/* Paso 4 */}
          <div className="flow-step">
            <div className="flow-number">4</div>
            <div className="flow-title">Procesamiento diferido</div>
            <p>
              En MongoDB Atlas, se reemplaza por <strong>Atlas Search</strong> con
              nodos dedicados (S40), sin necesidad de sincronización externa
              como Logstash.
            </p>
          </div>

          {/* Paso 5 */}
          <div className="flow-step">
            <div className="flow-number">5</div>
            <div className="flow-title">Consultas de búsqueda</div>
            <p>
              <strong>Atlas Search Nodes (S40):</strong> Autocompletado, filtros,
              ranking y resultados. Procesamiento distribuido con agregaciones
              geográficas.
            </p>
          </div>

          {/* Paso 6 */}
          <div className="flow-step">
            <div className="flow-number">6</div>
            <div className="flow-title">Retención de contexto</div>
            <p>
              Replicar patrón Redis usando <strong>TTL Indexes</strong>, colecciones
              separadas para sesiones y documentos embebidos para contexto
              conversacional.
            </p>
          </div>

          {/* Paso 7 */}
          <div className="flow-step">
            <div className="flow-number">7</div>
            <div className="flow-title">Backups y Seguridad</div>
            <p>
              Backups continuos automáticos, integración con VPC, autenticación y
              control de acceso granular con roles y certificados.
            </p>
          </div>
        </div>
      </div>

      {/* ------------------ Comparación de Costos (TCO) ------------------ */}
      <div className="cost-comparison">
        <h2
          style={{
            textAlign: 'center',
            color: '#001E2B',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          💰 TCO (Total Cost of Ownership) - MongoDB Atlas M40 vs AWS Actual
        </h2>

        <div className="cost-summary-cards">
          {/* ==== AWS Actual ==== */}
          <div className="cost-card">
            <div className="cost-card-header">
              <h4>🔴 Infraestructura AWS Actual</h4>
            </div>
            <div className="cost-card-content">
              <div className="cost-amounts">
                <div className="cost-client">
                  <span>RDS + ElastiCache:</span>
                  <span>$2,023.86/mes</span>
                </div>
                <div className="cost-client">
                  <span>Elastic Search:</span>
                  <span>$326.14/mes</span>
                </div>
                <div className="cost-client">
                  <span>MCP Server:</span>
                  <span>Por definir</span>
                </div>
                <div className="cost-client">
                  <span>Pinecone:</span>
                  <span>Por definir</span>
                </div>
                <div className="cost-client">
                  <span>RDS para Analítica:</span>
                  <span>Por definir</span>
                </div>
                <div className="cost-client">
                  <span>Logstash + EC2:</span>
                  <span>Por definir</span>
                </div>
                <div className="cost-client">
                  <span>Redis:</span>
                  <span>Por definir</span>
                </div>
                <div className="cost-client">
                  <span>Backups:</span>
                  <span>Por definir</span>
                </div>
                <div className="cost-client">
                  <span>Egreso/Ingreso Red:</span>
                  <span>Por definir</span>
                </div>
              </div>
              <div className="cost-highlight" style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>$28,200</div>
                <div style={{ opacity: 0.9 }}>Total Anual</div>
              </div>
            </div>
          </div>

          {/* ==== MongoDB Atlas Propuesto ==== */}
          <div className="cost-card">
            <div className="cost-card-header">
              <h4>🟢 MongoDB Atlas M40 Propuesto</h4>
            </div>
            <div className="cost-card-content">
              <div className="cost-amounts">
                <div className="cost-mongo">
                  <span>MongoDB Atlas (3 Nodos):</span>
                  <span>$1,625/mes</span>
                </div>
                <div className="cost-mongo">
                  <span>Atlas Search (2 Nodos HA):</span>
                  <span>Incluido</span>
                </div>
                <div className="cost-mongo">
                  <span>Atlas MCP Server:</span>
                  <span>Incluido</span>
                </div>
                <div className="cost-mongo">
                  <span>Atlas Vector Search:</span>
                  <span>Incluido</span>
                </div>
                <div className="cost-mongo">
                  <span>Nodo Analítico (1 Nodo):</span>
                  <span>Incluido</span>
                </div>
                <div className="cost-mongo">
                  <span>Logstash:</span>
                  <span>No necesario</span>
                </div>
                <div className="cost-mongo">
                  <span>EC2 Logstash:</span>
                  <span>No necesario</span>
                </div>
                <div className="cost-mongo">
                  <span>Redis:</span>
                  <span>No necesario</span>
                </div>
                <div className="cost-mongo">
                  <span>Backup Continuo:</span>
                  <span>Incluido</span>
                </div>
                <div className="cost-mongo">
                  <span>Egreso/Ingreso Red:</span>
                  <span>Incluido</span>
                </div>
              </div>
              <div className="cost-highlight" style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>$19,500</div>
                <div style={{ opacity: 0.9 }}>Total Anual</div>
              </div>
            </div>
          </div>
        </div>

        {/* Resultado de Ahorro */}
        <div className="savings-highlight">
          <div className="savings-box">
            <h3>🎯 Resultado: Ahorro Significativo</h3>
            <div className="savings-amount">
              <span className="savings-number">$8,700</span>
              <span className="savings-description">Ahorro Anual</span>
            </div>
            <div className="savings-amount">
              <span className="savings-number">30.9%</span>
              <span className="savings-description">Reducción de Costos</span>
            </div>
            <div className="savings-amount">
              <span className="savings-number">$725</span>
              <span className="savings-description">Ahorro Mensual</span>
            </div>
            <p className="savings-note">
              🚀 <strong>Beneficio Adicional:</strong> También es posible reemplazar
              Firebase (pendiente revisar caso de uso específico)
            </p>
          </div>
        </div>

        {/* Notas Importantes del TCO */}
        <div
          style={{
            background: '#f8f9fa',
            borderLeft: '4px solid #00ED64',
            padding: '20px',
            marginTop: '30px',
            borderRadius: '0 10px 10px 0',
          }}
        >
          <h4 style={{ color: '#001E2B', marginBottom: '15px' }}>
            📋 Notas Importantes del TCO:
          </h4>
          <ul style={{ color: '#495057', margin: 0, paddingLeft: '20px' }}>
            <li>
              <strong>Consolidación de servicios:</strong> MongoDB Atlas reemplaza
              múltiples servicios AWS
            </li>
            <li>
              <strong>Costos conocidos:</strong> Algunos servicios AWS actuales tienen
              costos por definir
            </li>
            <li>
              <strong>Servicios incluidos:</strong> Search, Analytics, Vector Search y
              Backups sin costo adicional
            </li>
            <li>
              <strong>Simplificación operativa:</strong> Menos servicios = menos
              complejidad y mantenimiento
            </li>
            <li>
              <strong>Escalabilidad:</strong> Crecimiento predictivo de costos con la
              demanda
            </li>
          </ul>
        </div>
      </div>

      {/* ------------------ Beneficios Operativos ------------------ */}
      <div
        style={{
          background: 'white',
          borderRadius: '25px',
          padding: '40px',
          margin: '40px 0',
          border: '2px solid #e9ecef',
        }}
      >
        <h3
          style={{
            color: '#13AA52',
            fontSize: '28px',
            marginBottom: '35px',
            fontWeight: 700,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '32px' }}>🏗️</span>
          Beneficios operativos para Ciencuadras
        </h3>

        <div className="value-grid">
          {/* Ventajas Operativas */}
          <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '15px', padding: '25px', borderLeft: '5px solid #00ED64' }}>
            <h4 style={{ color: '#13AA52', fontSize: '18px', fontWeight: 700, marginBottom: '15px' }}>
              ⚡ Ventajas Operativas
            </h4>
            <ul style={{ color: '#495057', fontSize: '14px', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
              <li><strong>Gestión unificada:</strong> Una sola consola para toda la infraestructura</li>
              <li><strong>Soporte 24/7:</strong> Expertos MongoDB disponibles siempre</li>
              <li><strong>Monitoreo proactivo:</strong> Alertas automáticas y métricas avanzadas</li>
              <li><strong>Backups automáticos:</strong> Point-in-time recovery incluido</li>
            </ul>
          </div>

          {/* Simplificación Técnica */}
          <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '15px', padding: '25px', borderLeft: '5px solid #9c27b0' }}>
            <h4 style={{ color: '#7b1fa2', fontSize: '18px', fontWeight: 700, marginBottom: '15px' }}>
              🔧 Simplificación Técnica
            </h4>
            <ul style={{ color: '#495057', fontSize: '14px', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
              <li><strong>Menos trabajo manual:</strong> Actualizaciones automáticas de seguridad</li>
              <li><strong>Escalabilidad instantanea:</strong> Crece con tu demanda automáticamente</li>
              <li><strong>Réplicas en múltiples AZs:</strong> Disaster recovery incluido</li>
              <li><strong>Configuración optimizada:</strong> Monitoreo Automático e Incluido</li>
            </ul>
          </div>

          {/* Específico Inmobiliario */}
          <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '15px', padding: '25px', borderLeft: '5px solid #ff9800' }}>
            <h4 style={{ color: '#f57c00', fontSize: '18px', fontWeight: 700, marginBottom: '15px' }}>
              🏠 Específico Inmobiliario
            </h4>
            <ul style={{ color: '#495057', fontSize: '14px', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
              <li><strong>Búsquedas geoespaciales:</strong> Filtros por ubicación nativos</li>
              <li><strong>Documentos flexibles:</strong> Propiedades con atributos variables</li>
              <li><strong>Imágenes y documentos:</strong> GridFS para archivos grandes</li>
              <li><strong>Real-time updates:</strong> Actualizaciones de precios en vivo</li>
            </ul>
          </div>

          {/* Reducción de Riesgos */}
          <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '15px', padding: '25px', borderLeft: '5px solid #dc2626' }}>
            <h4 style={{ color: '#b91c1c', fontSize: '18px', fontWeight: 700, marginBottom: '15px' }}>
              🛡️ Reducción de Riesgos
            </h4>
            <ul style={{ color: '#495057', fontSize: '14px', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
              <li><strong>Menos vendors:</strong> Una relación comercial vs múltiples</li>
              <li><strong>SLA unificado:</strong> 99.995% uptime garantizado</li>
              <li><strong>Compliance automático:</strong> SOC2, GDPR, HIPAA incluidos</li>
              <li><strong>Menos complejidad:</strong> Reduce superficie de ataque</li>
            </ul>
          </div>
        </div>

        {/* Resumen Final ------------------ */}
        <div style={{
          background: 'linear-gradient(135deg, #001E2B, #13AA52)',
          borderRadius: '20px',
          padding: '30px',
          textAlign: 'center',
          color: 'white',
          marginTop: '40px',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>💡</div>
          <h4 style={{ color: '#00ED64', fontSize: '24px', marginBottom: '15px', fontWeight: 700 }}>
            Resultado: Infraestructura Simplificada
          </h4>
          <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: 1.6, marginBottom: '20px' }}>
            <strong>5 servicios separados</strong> → <strong>1 plataforma unificada</strong><br />
            Menos complejidad, mayor confiabilidad, mejor soporte
          </p>
          <div style={{
            background: 'rgba(0,237,100,0.2)',
            borderRadius: '10px',
            padding: '15px',
            display: 'inline-block',
          }}>
            <span style={{ fontSize: '18px', fontWeight: 600 }}>
              + Ahorro de $886 anuales con soporte incluido
            </span>
          </div>
        </div>
      </div>

      {/* ------------------ Valor Agregado ------------------ */}
      <div className="value-proposition-enhanced">
        <div className="value-header">
          <h3>
            ✨ <strong>Valor Agregado MongoDB Atlas M40</strong>
          </h3>
          <p className="value-subtitle">Lo que obtienes al cambiar a MongoDB Atlas</p>
        </div>

        <div className="value-grid">
          <div className="value-item">
            <div className="value-icon">💰</div>
            <div className="value-content">
              <h5>Ahorro Comprobado</h5>
              <p>$4,786 menos anuales que la configuración actual</p>
            </div>
          </div>

          <div className="value-item">
            <div className="value-icon">🏗️</div>
            <div className="value-content">
              <h5>Arquitectura Completa</h5>
              <p>Transaccional + Search + Analytics en una plataforma</p>
            </div>
          </div>

          <div className="value-item">
            <div className="value-icon">🔧</div>
            <div className="value-content">
              <h5>Gestión Automática</h5>
              <p>Sin administración manual de infraestructura</p>
            </div>
          </div>

          <div className="value-item">
            <div className="value-icon">💾</div>
            <div className="value-content">
              <h5>Backups Incluidos</h5>
              <p>Protección automática de datos sin costo extra</p>
            </div>
          </div>

          <div className="value-item">
            <div className="value-icon">⚡</div>
            <div className="value-content">
              <h5>Search Nativo</h5>
              <p>Atlas Search optimizado vs ElasticSearch separado</p>
            </div>
          </div>

          <div className="value-item">
            <div className="value-icon">📊</div>
            <div className="value-content">
              <h5>Analytics Integrado</h5>
              <p>Nodo dedicado para análisis sin impacto transaccional</p>
            </div>
          </div>

          <div className="value-item">
            <div className="value-icon">🧠</div>
            <div className="value-content">
              <h5>Vector Search</h5>
              <p>Búsquedas semánticas y AI nativas sin infraestructura adicional</p>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------ Beneficios Detallados por Componente ------------------ */}
      <div className="section">
        <h2 className="section-title">🎯 Beneficios Detallados por Componente</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '30px',
            marginBottom: '40px',
          }}
        >
          {/* Search Nodes */}
          <div
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '2px solid #00ED64',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #00ED64, #13AA52)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  marginBottom: '15px',
                }}
              >
                🔍
              </div>
              <h3 style={{ color: '#13AA52', fontSize: '22px', margin: 0, fontWeight: 700 }}>
                Search Nodes Dedicados
              </h3>
              <p style={{ color: '#6c757d', margin: '5px 0 0 0', fontSize: '14px' }}>
                Atlas Search S40 - Búsquedas Especializadas
              </p>
            </div>

            <div style={{ display: 'grid', rowGap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#28a745', fontSize: '18px' }}>✅</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Full-Text Search Nativo
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Búsquedas por texto completo sin ElasticSearch externo
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#28a745', fontSize: '18px' }}>✅</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Autocompletar Inteligente
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Sugerencias automáticas para inmuebles y proyectos
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#28a745', fontSize: '18px' }}>✅</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Búsquedas Geográficas
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Filtros por ubicación, distancia y mapas nativos
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#28a745', fontSize: '18px' }}>✅</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>Sin Sincronización</strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Datos siempre actualizados, sin latencia de sync
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: '#28a745', fontSize: '18px' }}>✅</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Escalabilidad Automática
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Capacidad que crece con tu demanda
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Nodo Analítico M30 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '2px solid #9c27b0',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #9c27b0, #7b1fa2)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  marginBottom: '15px',
                }}
              >
                📊
              </div>
              <h3 style={{ color: '#7b1fa2', fontSize: '22px', margin: 0, fontWeight: 700 }}>
                Nodo Analítico M30
              </h3>
              <p style={{ color: '#6c757d', margin: '5px 0 0 0', fontSize: '14px' }}>
                Analytics & BI Dedicado
              </p>
            </div>

            <div style={{ display: 'grid', rowGap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#7b1fa2', fontSize: '18px' }}>📈</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Reportes en Tiempo Real
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Dashboards y métricas sin impacto transaccional
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#7b1fa2', fontSize: '18px' }}>🔄</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Agregaciones Complejas
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Análisis de datos masivos sin afectar operaciones
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#7b1fa2', fontSize: '18px' }}>💼</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Business Intelligence
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Integración directa con herramientas de BI
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#7b1fa2', fontSize: '18px' }}>⚡</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Procesamiento Paralelo
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Recursos dedicados para análisis intensivos
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: '#7b1fa2', fontSize: '18px' }}>🎯</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Aislamiento de Cargas
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Analytics separado del cluster transaccional
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reemplazo Firebase */}
          <div
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '2px solid #ff9800',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #ff9800, #f57c00)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  marginBottom: '15px',
                }}
              >
                🔥
              </div>
              <h3 style={{ color: '#f57c00', fontSize: '22px', margin: 0, fontWeight: 700 }}>
                Es posible reemplazar Firebase
              </h3>
              <p style={{ color: '#6c757d', margin: '5px 0 0 0', fontSize: '14px' }}>
                Backend as a Service Nativo
              </p>
              <p style={{ color: '#6c757d', margin: '5px 0 0 0', fontSize: '14px' }}>
                (Caso de uso x revisar)
              </p>
            </div>

            <div style={{ display: 'grid', rowGap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#f57c00', fontSize: '18px' }}>🔐</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Autenticación Integrada
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Sistema de usuarios y roles sin servicios externos
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#f57c00', fontSize: '18px' }}>⚡</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Real-time Updates
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Change Streams para actualizaciones en tiempo real
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#f57c00', fontSize: '18px' }}>💾</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Storage Unificado
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    GridFS para archivos y documentos grandes
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#f57c00', fontSize: '18px' }}>🔄</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Funciones Serverless
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Atlas Functions para lógica backend automática
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: '#f57c00', fontSize: '18px' }}>💰</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Sin Costos Adicionales
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Incluido en tu cluster, sin servicios separados
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vector Search */}
          <div
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '2px solid #6366f1',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  marginBottom: '15px',
                }}
              >
                🧠
              </div>
              <h3 style={{ color: '#4f46e5', fontSize: '22px', margin: 0, fontWeight: 700 }}>
                Vector Search
              </h3>
              <p style={{ color: '#6c757d', margin: '5px 0 0 0', fontSize: '14px' }}>
                Es posible reemplazar Pinecone - AI Nativo
              </p>
              <p style={{ color: '#6c757d', margin: '5px 0 0 0', fontSize: '14px' }}>
                (Caso de uso x revisar)
              </p>
            </div>

            <div style={{ display: 'grid', rowGap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#4f46e5', fontSize: '18px' }}>🤖</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Búsquedas Semánticas
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    IA que entiende el contexto, no solo palabras clave
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#4f46e5', fontSize: '18px' }}>🎯</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Recomendaciones Inteligentes
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Propiedades similares basadas en preferencias
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#4f46e5', fontSize: '18px' }}>⚡</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Embeddings Nativos
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Vectores almacenados junto con tus datos
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#4f46e5', fontSize: '18px' }}>🔗</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Integración Perfecta
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Sin APIs externas ni sincronización
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: '#4f46e5', fontSize: '18px' }}>💸</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Ahorro vs Pinecone
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Sin licencias adicionales de servicios de vectores
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reemplazo Redis */}
          <div
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '2px solid #dc2626',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  marginBottom: '15px',
                }}
              >
                ⚡
              </div>
              <h3 style={{ color: '#b91c1c', fontSize: '22px', margin: 0, fontWeight: 700 }}>
                Es posible reemplazar Redis
              </h3>
              <p style={{ color: '#6c757d', margin: '5px 0 0 0', fontSize: '14px' }}>
                Cache & Sessions Nativas
              </p>
              <p style={{ color: '#6c757d', margin: '5px 0 0 0', fontSize: '14px' }}>
                (Caso de uso x revisar)
              </p>
            </div>

            <div style={{ display: 'grid', rowGap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#b91c1c', fontSize: '18px' }}>⏰</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>TTL Indexes</strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Expiración automática de documentos como Redis
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#b91c1c', fontSize: '18px' }}>🗂️</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Colecciones de Sesión
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Gestión de sesiones de usuario nativa
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#b91c1c', fontSize: '18px' }}>🔍</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>Cache de Consultas</strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Resultados frecuentes en memoria para acceso rápido
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px' }}>
                <span style={{ color: '#b91c1c', fontSize: '18px' }}>📝</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Contexto Conversacional
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Documentos embebidos para historial de chat
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: '#b91c1c', fontSize: '18px' }}>🔧</span>
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>
                    Sin Infraestructura Extra
                  </strong>
                  <p style={{ color: '#6c757d', margin: '3px 0 0 0', fontSize: '13px' }}>
                    Todo dentro de MongoDB, sin servicios separados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------ Resumen Final Actualizado ------------------ */}
      <div
        style={{
          background: 'linear-gradient(135deg, #001E2B 0%, #00684A 100%)',
          borderRadius: '25px',
          padding: '40px',
          textAlign: 'center',
          color: 'white',
          marginTop: '40px',
        }}
      >
        <h3 style={{ color: '#00ED64', fontSize: '28px', marginBottom: '20px', fontWeight: 700 }}>
          🎉 MongoDB Atlas: Todo en Una Plataforma
        </h3>
        <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
          Reemplaza <strong>ElasticSearch + Firebase + Pinecone + Redis</strong> con una sola solución integrada
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
            marginTop: '30px',
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '15px', padding: '20px', border: '1px solid rgba(0,237,100,0.3)' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔍</div>
            <div style={{ color: '#00ED64', fontWeight: 600 }}>Search Nativo</div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>vs ElasticSearch</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '15px', padding: '20px', border: '1px solid rgba(156,39,176,0.3)' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>📊</div>
            <div style={{ color: '#e1bee7', fontWeight: 600 }}>Analytics Dedicado</div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>Nodo M30</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '15px', padding: '20px', border: '1px solid rgba(255,152,0,0.3)' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔥</div>
            <div style={{ color: '#ffcc80', fontWeight: 600 }}>Backend Service</div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>vs Firebase</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '15px', padding: '20px', border: '1px solid rgba(99,102,241,0.3)' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🧠</div>
            <div style={{ color: '#c5cae9', fontWeight: 600 }}>Vector Search</div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>vs Pinecone</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '15px', padding: '20px', border: '1px solid rgba(220,38,38,0.3)' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚡</div>
            <div style={{ color: '#fca5a5', fontWeight: 600 }}>Cache & Sessions</div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>vs Redis</div>
          </div>
        </div>
      </div>
    </div>
  );
}