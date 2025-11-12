import React, { useState } from 'react'
import { Database, Cloud, Server, Zap, Clock, AlertCircle, CheckCircle2, Shield, ArrowRight, Lock, Timer, HardDrive, Activity, GitBranch, MessageSquare, Radio, Package } from 'lucide-react'
import './DRPHibrido.css'

const DRPHibrido = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('backup')
  const [expandedStep, setExpandedStep] = useState(null)
  const [selectedBroker, setSelectedBroker] = useState(null)

  const strategies = {
    backup: {
      name: 'Bóveda de Respaldo',
      subtitle: 'Backup y Restauración',
      icon: Lock,
      color: '#4A90E2',
      analogy: 'Piense en esto como tomar una "foto" completa de su base de datos varias veces al día y guardar esa foto en una bóveda local.',
      rpo: { value: 'Horas', description: 'Alta pérdida de datos', color: '#F59E0B' },
      rto: { value: 'Horas', description: 'Tiempo de recuperación alto', color: '#F59E0B' },
      complexity: { value: 'Baja', description: 'Fácil de implementar', color: '#10B981' },
      steps: [
        {
          number: 1,
          title: 'La "Foto" en la Nube',
          description: 'De forma automática, Atlas toma "fotos" (snapshots o copias de seguridad) de toda su base de datos. Digamos que programamos esto para que suceda cada 4 horas (a las 4am, 8am, 12pm, etc.).',
          icon: Cloud,
          tech: 'Atlas Automated Backups'
        },
        {
          number: 2,
          title: 'La "Descarga" a la Bóveda',
          description: 'Creamos un proceso que, tan pronto como la foto de las 4am está lista, la descarga de la nube y la guarda de forma segura en sus servidores on-premise (su "bóveda").',
          icon: HardDrive,
          tech: 'mongorestore + cron job'
        },
        {
          number: 3,
          title: 'El "Clon Frío" Local',
          description: 'Sus servidores locales (con las licencias EA) están instalados, configurados y listos. Están "fríos", esperando instrucciones.',
          icon: Server,
          tech: 'MongoDB Enterprise Advanced'
        },
        {
          number: 4,
          title: 'En Caso de Desastre (Ej. 10:30am)',
          description: 'Atlas deja de responder → Usted declara la emergencia → El equipo va a la "bóveda", saca la última foto buena (la de las 8am) → Se "carga" esa foto en los servidores locales. Esto puede tardar 1 o 2 horas → A las 12:30pm, el sistema local está operativo.',
          icon: AlertCircle,
          tech: 'Manual failover process'
        }
      ],
      pros: [
        'Implementación simple y rápida',
        'Bajo costo operativo',
        'No requiere desarrollo custom',
        'Fácil de mantener y monitorear'
      ],
      cons: [
        'Pérdida de datos significativa (horas)',
        'Tiempo de recuperación alto (horas)',
        'Requiere intervención manual',
        'Sistema local está inactivo ("frío")'
      ],
      idealFor: 'Cargas de trabajo menos críticas, sistemas de reportes o aplicaciones internas donde perder unas horas de trabajo es aceptable.'
    },
    streaming: {
      name: 'Espejo en Vivo',
      subtitle: 'Replicación por Eventos',
      icon: Activity,
      color: '#00ED64',
      analogy: 'Piense en esto como un "mensajero instantáneo" que reporta cada transacción, una por una, desde Atlas a sus servidores locales, creando un "espejo" en tiempo real.',
      rpo: { value: 'Segundos', description: 'Casi cero pérdida de datos', color: '#10B981' },
      rto: { value: 'Minutos', description: 'Recuperación casi inmediata', color: '#10B981' },
      complexity: { value: 'Muy Alta', description: 'Requiere desarrollo', color: '#EF4444' },
      steps: [
        {
          number: 1,
          title: 'El "Mensajero" de Atlas (Change Streams)',
          description: 'Activamos una función en Atlas que actúa como un mensajero. Cada vez que ocurre un cambio (un depósito, un retiro, una actualización de cliente), el mensajero toma nota inmediatamente.',
          icon: Radio,
          tech: 'MongoDB Change Streams API'
        },
        {
          number: 2,
          title: 'El "Tubo de Mensajes" (Pipeline)',
          description: 'No enviamos esos mensajes directamente a su servidor (es riesgoso). En su lugar, el mensajero los deja en un "tubo de mensajes" (como Kafka o un sistema similar) que actúa como intermediario. Este tubo garantiza que ningún mensaje se pierda, incluso si la red falla por un momento.',
          icon: GitBranch,
          tech: 'Kafka / Pulsar / RabbitMQ'
        },
        {
          number: 3,
          title: 'El "Receptor" Local',
          description: 'En sus servidores on-premise (con licencias EA), construimos un software "receptor". El trabajo de este receptor es conectarse al "tubo de mensajes", leer cada mensaje (cada transacción) uno por uno, y aplicarlo exactamente igual en la base de datos local.',
          icon: Server,
          tech: 'Custom Consumer Application'
        },
        {
          number: 4,
          title: 'El "Espejo Caliente" Local',
          description: 'El resultado es que su base de datos local es un "espejo" casi perfecto de la nube, con solo 1 o 2 segundos de retraso. Está "caliente" y lista para usarse en cualquier momento.',
          icon: Database,
          tech: 'Hot Standby MongoDB Cluster'
        },
        {
          number: 5,
          title: 'En Caso de Desastre (Ej. 10:30am)',
          description: 'Atlas deja de responder → El "tubo de mensajes" deja de recibir mensajes nuevos → Su "receptor" local termina de procesar los últimos mensajes que quedaban en el tubo (esto toma segundos) → A las 10:31am, usted simplemente cambia las conexiones de sus aplicaciones para que apunten al servidor local. El sistema está operativo.',
          icon: Zap,
          tech: 'Automated failover'
        }
      ],
      pros: [
        'Pérdida de datos casi cero (segundos)',
        'Recuperación casi inmediata (minutos)',
        'Sistema local siempre actualizado ("caliente")',
        'Permite pruebas y validación continua'
      ],
      cons: [
        'Complejidad extremadamente alta',
        'Requiere proyecto de desarrollo custom',
        'Alto costo de implementación',
        'Requiere equipo especializado para mantenimiento'
      ],
      idealFor: 'Sistemas de misión crítica (Core Bancario, Pagos, Transacciones) donde la pérdida de datos o el tiempo de inactividad no son aceptables.'
    }
  }

  const messageBrokers = [
    {
      id: 'kafka',
      name: 'Apache Kafka',
      category: 'Streaming Platform',
      icon: Activity,
      color: '#231F20',
      description: 'La plataforma de streaming más popular y probada. Diseñada para alto volumen (millones de mensajes/seg).',
      pros: ['Altísima escalabilidad', 'Ecosistema maduro', 'Retención a largo plazo', 'Gran comunidad'],
      cons: ['Complejidad operacional alta', 'Curva de aprendizaje pronunciada', 'Requiere ZooKeeper (legacy) o KRaft'],
      ideal: 'Bancos con alto volumen de transacciones (>100K msg/seg) y equipos con experiencia en Kafka.'
    },
    {
      id: 'rabbitmq',
      name: 'RabbitMQ',
      category: 'Message Broker',
      icon: MessageSquare,
      color: '#FF6600',
      description: 'Broker de mensajería tradicional, muy confiable. Más simple que Kafka para casos de uso básicos.',
      pros: ['Fácil de aprender', 'Muy confiable', 'Flexible (AMQP)', 'Menor complejidad operacional'],
      cons: ['Menor throughput que Kafka', 'No diseñado para retención larga', 'Menos eficiente para streaming'],
      ideal: 'Bancos que buscan simplicidad y confiabilidad, con volumen moderado (<50K msg/seg).'
    },
    {
      id: 'pulsar',
      name: 'Apache Pulsar',
      category: 'Streaming Platform',
      icon: Radio,
      color: '#188FFF',
      description: 'El competidor más moderno de Kafka. Separa cómputo de almacenamiento (muy elástico).',
      pros: ['Multi-tenancy nativo', 'Geo-replicación incluida', 'Más fácil de escalar que Kafka', 'Arquitectura moderna'],
      cons: ['Ecosistema más pequeño', 'Menos adopción que Kafka', 'Requiere BookKeeper'],
      ideal: 'Bancos que buscan una alternativa moderna a Kafka con mejor multi-tenancy y geo-replicación.'
    },
    {
      id: 'nats',
      name: 'NATS JetStream',
      category: 'Message System',
      icon: Zap,
      color: '#27AAE1',
      description: 'Sistema de mensajería extremadamente rápido y ligero. JetStream añade persistencia.',
      pros: ['Velocidad extrema', 'Muy ligero', 'Simple de operar', 'Footprint pequeño'],
      cons: ['Ecosistema limitado', 'Menos features que Kafka/Pulsar', 'Menos adopción enterprise'],
      ideal: 'Bancos con equipos pequeños que necesitan velocidad y simplicidad sobre features avanzados.'
    },
    {
      id: 'redis',
      name: 'Redis Streams',
      category: 'Data Structure Store',
      icon: Database,
      color: '#DC382D',
      description: 'Si ya usan Redis para caché, pueden usar su funcionalidad de Streams como log de eventos.',
      pros: ['Ya lo conocen', 'Muy rápido', 'Bajo overhead', 'Fácil integración'],
      cons: ['No diseñado para este caso de uso', 'Limitaciones de persistencia', 'No recomendado para volumen alto'],
      ideal: 'Bancos que ya usan Redis y tienen volumen bajo. Solución pragmática pero no óptima.'
    },
    {
      id: 'cloud',
      name: 'Cloud Managed (Kinesis, Pub/Sub, Event Hubs)',
      category: 'Cloud Service',
      icon: Cloud,
      color: '#FF9900',
      description: 'Servicios gestionados en la nube (AWS Kinesis, Google Pub/Sub, Azure Event Hubs).',
      pros: ['Cero mantenimiento', 'Escalado automático', 'Alta disponibilidad', 'Integración con cloud'],
      cons: ['Dependencia de nube', 'No es 100% on-premise DRP', 'Costo variable', 'Vendor lock-in'],
      ideal: 'Bancos que aceptan un DRP híbrido parcial (broker en cloud, consumer on-premise).'
    }
  ]

  const currentStrategy = strategies[selectedStrategy]
  const Icon = currentStrategy.icon

  return (
    <div className="drp-hibrido">
      {/* Header */}
      <header className="drp-header">
        <div className="header-gradient"></div>
        <div className="header-content">
          <div className="header-badge">
            <Shield size={16} />
            <span>BPD</span>
          </div>
          <h1 className="header-title">Estrategias de DRP Híbrido</h1>
          <p className="header-subtitle">Atlas a On-Premise: Guía Estratégica Simplificada</p>
          <div className="header-tags">
            <span className="tag">
              <Cloud size={14} />
              Híbrido Cloud
            </span>
            <span className="tag">
              <Shield size={14} />
              Disaster Recovery
            </span>
            <span className="tag">
              <Database size={14} />
              MongoDB Atlas
            </span>
          </div>
        </div>
      </header>

      {/* Objetivo Principal */}
      <section className="objective-section">
        <div className="container">
          <div className="objective-card">
            <div className="objective-icon">
              <AlertCircle size={32} />
            </div>
            <div className="objective-content">
              <h2>Objetivo del DRP Híbrido</h2>
              <p>Crear un plan de recuperación ante desastres (DRP) por si MongoDB Atlas (la nube) falla o se desconecta, permitiendo operar desde sus servidores locales (On-Premise) usando sus licencias Enterprise Advanced.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Clave */}
      <section className="questions-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Dos Preguntas Que Definen Su Estrategia</h2>
            <div className="title-underline"></div>
            <p className="section-description">Para elegir la estrategia correcta, el banco debe responder estas preguntas clave:</p>
          </div>

          <div className="questions-grid">
            <div className="question-card">
              <div className="question-icon rpo-color">
                <Timer size={28} />
              </div>
              <div className="question-number">Pregunta 1</div>
              <h3>¿Cuántos datos podemos darnos el lujo de perder?</h3>
              <div className="question-examples">
                <div className="example">
                  <CheckCircle2 size={16} />
                  <span>¿El trabajo de los últimos 5 minutos?</span>
                </div>
                <div className="example">
                  <CheckCircle2 size={16} />
                  <span>¿O el de las últimas 4 horas?</span>
                </div>
              </div>
              <div className="question-metric">
                <strong>Esta pregunta define su RPO</strong>
                <p>(Recovery Point Objective)</p>
              </div>
            </div>

            <div className="question-card">
              <div className="question-icon rto-color">
                <Clock size={28} />
              </div>
              <div className="question-number">Pregunta 2</div>
              <h3>¿Qué tan rápido necesitamos volver a operar?</h3>
              <div className="question-examples">
                <div className="example">
                  <CheckCircle2 size={16} />
                  <span>¿En menos de 10 minutos?</span>
                </div>
                <div className="example">
                  <CheckCircle2 size={16} />
                  <span>¿O podemos esperar 3 horas?</span>
                </div>
              </div>
              <div className="question-metric">
                <strong>Esta pregunta define su RTO</strong>
                <p>(Recovery Time Objective)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selector de Estrategia */}
      <section className="strategy-selector-section">
        <div className="container">
          <h2 className="selector-title">Selecciona una Estrategia</h2>
          <div className="strategy-selector">
            <button
              className={`strategy-btn ${selectedStrategy === 'backup' ? 'active' : ''}`}
              onClick={() => setSelectedStrategy('backup')}
            >
              <Lock size={24} />
              <div className="btn-content">
                <span className="btn-title">Opción 1</span>
                <span className="btn-subtitle">Bóveda de Respaldo</span>
              </div>
            </button>
            <button
              className={`strategy-btn ${selectedStrategy === 'streaming' ? 'active' : ''}`}
              onClick={() => setSelectedStrategy('streaming')}
            >
              <Activity size={24} />
              <div className="btn-content">
                <span className="btn-title">Opción 2</span>
                <span className="btn-subtitle">Espejo en Vivo</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Detalle de Estrategia */}
      <section className="strategy-detail-section">
        <div className="container">
          {/* Header de Estrategia */}
          <div className="strategy-header" style={{ borderLeftColor: currentStrategy.color }}>
            <div className="strategy-icon" style={{ backgroundColor: currentStrategy.color }}>
              <Icon size={32} />
            </div>
            <div className="strategy-info">
              <h2>{currentStrategy.name}</h2>
              <p>{currentStrategy.subtitle}</p>
            </div>
          </div>

          {/* Analogía */}
          <div className="analogy-card">
            <div className="analogy-header">
              <div className="analogy-icon">💡</div>
              <h3>Analogía Simple</h3>
            </div>
            <p className="analogy-text">{currentStrategy.analogy}</p>
          </div>

          {/* Métricas */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-label">RPO (Pérdida de Datos)</div>
              <div className="metric-value" style={{ color: currentStrategy.rpo.color }}>
                {currentStrategy.rpo.value}
              </div>
              <div className="metric-desc">{currentStrategy.rpo.description}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">RTO (Tiempo de Recuperación)</div>
              <div className="metric-value" style={{ color: currentStrategy.rto.color }}>
                {currentStrategy.rto.value}
              </div>
              <div className="metric-desc">{currentStrategy.rto.description}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Complejidad</div>
              <div className="metric-value" style={{ color: currentStrategy.complexity.color }}>
                {currentStrategy.complexity.value}
              </div>
              <div className="metric-desc">{currentStrategy.complexity.description}</div>
            </div>
          </div>

          {/* Cómo Funciona */}
          <div className="how-it-works">
            <h3 className="subsection-title">¿Cómo Funciona, Paso a Paso?</h3>
            <div className="steps-container">
              {currentStrategy.steps.map((step) => {
                const StepIcon = step.icon
                const isExpanded = expandedStep === step.number
                return (
                  <div
                    key={step.number}
                    className={`step-card ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => setExpandedStep(isExpanded ? null : step.number)}
                  >
                    <div className="step-header">
                      <div className="step-number">{step.number}</div>
                      <div className="step-icon">
                        <StepIcon size={24} />
                      </div>
                      <div className="step-title-group">
                        <h4>{step.title}</h4>
                        <span className="step-tech">{step.tech}</span>
                      </div>
                      <ArrowRight className={`step-arrow ${isExpanded ? 'rotated' : ''}`} size={20} />
                    </div>
                    <div className="step-content">
                      <p>{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pros y Contras */}
          <div className="pros-cons-grid">
            <div className="pros-card">
              <div className="card-header">
                <CheckCircle2 size={24} className="pros-icon" />
                <h3>Ventajas</h3>
              </div>
              <ul className="pros-list">
                {currentStrategy.pros.map((pro, index) => (
                  <li key={index}>
                    <CheckCircle2 size={16} />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="cons-card">
              <div className="card-header">
                <AlertCircle size={24} className="cons-icon" />
                <h3>Desventajas</h3>
              </div>
              <ul className="cons-list">
                {currentStrategy.cons.map((con, index) => (
                  <li key={index}>
                    <AlertCircle size={16} />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ideal Para */}
          <div className="ideal-for-card">
            <div className="ideal-for-header">
              <div className="ideal-for-icon">🎯</div>
              <h3>Ideal Para</h3>
            </div>
            <p>{currentStrategy.idealFor}</p>
          </div>
        </div>
      </section>

      {/* Tabla Comparativa */}
      <section className="comparison-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Resumen Comparativo</h2>
            <div className="title-underline"></div>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Criterio</th>
                  <th className="option-1-col">
                    <Lock size={20} />
                    <span>Opción 1: Bóveda de Respaldo</span>
                  </th>
                  <th className="option-2-col">
                    <Activity size={20} />
                    <span>Opción 2: Espejo en Vivo</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="criteria-cell">
                    <strong>Analogía</strong>
                  </td>
                  <td>"Foto" diaria guardada en bóveda</td>
                  <td>"Mensajero" instantáneo creando un espejo</td>
                </tr>
                <tr>
                  <td className="criteria-cell">
                    <strong>Pérdida de Datos (RPO)</strong>
                  </td>
                  <td className="negative">Horas de datos perdidos</td>
                  <td className="positive">Segundos (casi cero)</td>
                </tr>
                <tr>
                  <td className="criteria-cell">
                    <strong>Tiempo de Recuperación (RTO)</strong>
                  </td>
                  <td className="negative">Horas (tiempo de restauración)</td>
                  <td className="positive">Minutos (tiempo de cambio de conexión)</td>
                </tr>
                <tr>
                  <td className="criteria-cell">
                    <strong>Complejidad</strong>
                  </td>
                  <td className="positive">Baja (un script de copia)</td>
                  <td className="negative">MUY ALTA (requiere un proyecto de desarrollo)</td>
                </tr>
                <tr>
                  <td className="criteria-cell">
                    <strong>Uso de Licencias EA</strong>
                  </td>
                  <td>El servidor local está "frío"</td>
                  <td>El servidor local está "caliente" y activo</td>
                </tr>
                <tr>
                  <td className="criteria-cell">
                    <strong>Costo de Implementación</strong>
                  </td>
                  <td className="positive">Bajo</td>
                  <td className="negative">Alto</td>
                </tr>
                <tr>
                  <td className="criteria-cell">
                    <strong>Mantenimiento</strong>
                  </td>
                  <td className="positive">Simple</td>
                  <td className="negative">Complejo (equipo dedicado)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Alternativas a Kafka */}
      <section className="brokers-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Alternativas al "Tubo de Mensajes"</h2>
            <div className="title-underline"></div>
            <p className="section-description">
              Para la <strong>Opción 2 (Espejo en Vivo)</strong>, necesita un <em>Message Broker</em> o <em>Plataforma de Streaming</em>.
              Kafka es solo una opción. Aquí están las principales alternativas que puede instalar <strong>on-premise</strong>:
            </p>
          </div>

          <div className="brokers-grid">
            {messageBrokers.map((broker) => {
              const BrokerIcon = broker.icon
              const isSelected = selectedBroker === broker.id
              return (
                <div
                  key={broker.id}
                  className={`broker-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedBroker(isSelected ? null : broker.id)}
                >
                  <div className="broker-header">
                    <div className="broker-icon" style={{ backgroundColor: broker.color }}>
                      <BrokerIcon size={28} color="white" />
                    </div>
                    <div className="broker-title-group">
                      <h3>{broker.name}</h3>
                      <span className="broker-category">{broker.category}</span>
                    </div>
                  </div>

                  <p className="broker-description">{broker.description}</p>

                  <div className="broker-lists">
                    <div className="broker-pros">
                      <h4>
                        <CheckCircle2 size={16} />
                        Ventajas
                      </h4>
                      <ul>
                        {broker.pros.map((pro, index) => (
                          <li key={index}>{pro}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="broker-cons">
                      <h4>
                        <AlertCircle size={16} />
                        Desventajas
                      </h4>
                      <ul>
                        {broker.cons.map((con, index) => (
                          <li key={index}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="broker-ideal">
                    <strong>Ideal para:</strong>
                    <p>{broker.ideal}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recomendaciones */}
          <div className="recommendations-card">
            <div className="recommendations-header">
              <Package size={28} />
              <h3>Recomendaciones Finales</h3>
            </div>
            <div className="recommendations-grid">
              <div className="recommendation-item">
                <div className="recommendation-badge rabbitmq">RabbitMQ</div>
                <p>Si buscan <strong>simplicidad y confiabilidad probada</strong> con volumen moderado.</p>
              </div>
              <div className="recommendation-item">
                <div className="recommendation-badge pulsar">Apache Pulsar</div>
                <p>Si buscan <strong>escala masiva y arquitectura moderna</strong>, similar a Kafka pero más fácil de operar.</p>
              </div>
              <div className="recommendation-item">
                <div className="recommendation-badge redis">Redis Streams</div>
                <p>Si <strong>ya usan Redis</strong> y tienen volumen bajo. Solución pragmática pero no óptima.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="drp-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <Database size={24} />
              <span>MongoDB Professional Services</span>
            </div>
            <div className="footer-meta">
              <span>Documento Técnico - BPD</span>
              <span>•</span>
              <span>Estrategias DRP Híbrido</span>
              <span>•</span>
              <span>2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DRPHibrido
