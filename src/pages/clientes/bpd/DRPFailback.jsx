import React, { useState } from 'react'
import {
  Shield,
  ArrowLeftRight,
  RefreshCw,
  Clock,
  AlertCircle,
  CheckCircle2,
  Users,
  UserCog,
  MessageSquare,
  PhoneCall,
  FileText,
  Pause,
  Download,
  Upload,
  Play,
  CheckCheck,
  Zap,
  Timer,
  Database,
  GitBranch,
  Megaphone,
  ClipboardCheck
} from 'lucide-react'
import './DRPFailback.css'

const DRPFailback = () => {
  const [selectedOption, setSelectedOption] = useState('ventana')
  const [expandedStep, setExpandedStep] = useState(null)
  const [expandedPhase, setExpandedPhase] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)

  const failbackOptions = {
    ventana: {
      name: 'Ventana de Mantenimiento',
      subtitle: 'La Más Segura y Controlada',
      icon: Pause,
      color: '#10B981',
      analogy: '"Cerrar la tienda" temporalmente (fuera de horario) para hacer un inventario completo y mover la mercancía de la bodega temporal (On-Prem) a la tienda principal (Atlas).',
      dataSafety: { value: 'Cero Pérdida', description: 'Método más seguro', color: '#10B981' },
      downtime: { value: 'Horas', description: 'Requiere ventana de mantenimiento', color: '#F59E0B' },
      complexity: { value: 'Media', description: 'Proceso lineal y auditable', color: '#3B82F6' },
      steps: [
        {
          number: 1,
          title: 'Anunciar la Ventana',
          description: 'Se anuncia una ventana de mantenimiento programada (ej. 1 hora, de 2:00am a 3:00am)',
          icon: Megaphone,
          details: [
            'Notificación a todos los stakeholders con días de anticipación',
            'Definir horario de mínimo impacto al negocio',
            'Comunicar el plan de rollback en caso de problemas',
            'Enviar recordatorios 24h y 1h antes del inicio'
          ]
        },
        {
          number: 2,
          title: 'Detener la Operación (Inicia Downtime)',
          description: 'A las 2:00am, se detienen todas las aplicaciones. El sistema deja de recibir transacciones',
          icon: Pause,
          details: [
            'Desactivar balanceadores de carga',
            'Detener aplicaciones en orden secuencial',
            'Verificar que no hay transacciones pendientes',
            'Confirmar que no hay conexiones activas',
            'Marcar el momento exacto del "corte"'
          ]
        },
        {
          number: 3,
          title: 'Hacer la Copia Maestra',
          description: 'Se utiliza mongodump o mongosync para tomar una "foto" final completa del on-premise',
          icon: Download,
          details: [
            'Ejecutar mongodump con consistencia completa',
            'Verificar integridad del dump (checksums)',
            'Registrar timestamp exacto de la copia',
            'Comprimir datos si es necesario',
            'Estimar tiempo de restauración en Atlas'
          ]
        },
        {
          number: 4,
          title: 'Restaurar en la Nube',
          description: 'Se restaura la "foto" completa en Atlas usando mongorestore',
          icon: Upload,
          details: [
            'Preparar cluster de Atlas (escalado si es necesario)',
            'Ejecutar mongorestore con validación',
            'Monitorear progreso y métricas de carga',
            'Verificar índices y collections',
            'Confirmar conteos de documentos'
          ]
        },
        {
          number: 5,
          title: 'Verificación',
          description: 'El equipo valida que los datos en Atlas son correctos y están completos',
          icon: CheckCheck,
          details: [
            'Ejecutar queries de validación pre-definidas',
            'Comparar conteos de documentos vs on-premise',
            'Validar transacciones críticas',
            'Revisar logs de restauración',
            'Sign-off del DBA y líder técnico'
          ]
        },
        {
          number: 6,
          title: 'Re-apuntar Aplicaciones',
          description: 'Se cambian las conexiones de las aplicaciones para que apunten a Atlas',
          icon: GitBranch,
          details: [
            'Actualizar connection strings en configuración',
            'Aplicar cambios en orden secuencial',
            'Verificar conectividad app-por-app',
            'Validar autenticación y autorización',
            'Confirmar que no hay errores en logs'
          ]
        },
        {
          number: 7,
          title: 'Finalizar Downtime',
          description: 'Se inician las aplicaciones. La operación vuelve a la normalidad en Atlas',
          icon: Play,
          details: [
            'Iniciar aplicaciones en orden inverso al apagado',
            'Activar balanceadores de carga',
            'Monitorear métricas de negocio',
            'Validar transacciones en tiempo real',
            'Comunicar fin del mantenimiento a stakeholders'
          ]
        },
        {
          number: 8,
          title: 'Reactivar Replicación DRP (CRÍTICO)',
          description: 'Se vuelve a activar la replicación Atlas → On-Prem para estar listos para futuro desastre',
          icon: RefreshCw,
          details: [
            'Limpiar datos del on-premise (ya obsoletos)',
            'Reconfigurar Change Streams de Atlas',
            'Reiniciar pipeline de replicación',
            'Validar que la replicación está activa',
            'Verificar RPO/RTO del DRP'
          ]
        }
      ],
      pros: [
        'Pérdida de datos: Cero (método más seguro)',
        'Proceso lineal y fácil de auditar',
        'Permite validación exhaustiva antes de volver',
        'Rollback más sencillo si algo falla'
      ],
      cons: [
        'Requiere downtime de varias horas',
        'Impacta la operación del negocio',
        'Debe coordinarse con horarios de baja demanda'
      ],
      idealFor: 'Recomendado para la primera implementación del DRP. Una vez probado y validado, se puede evolucionar a Sincronización Inversa.'
    },
    sincroinversa: {
      name: 'Sincronización Inversa',
      subtitle: 'Failback "en Caliente"',
      icon: RefreshCw,
      color: '#6366F1',
      analogy: '"Pasar la batuta" en una carrera de relevos sin detenerse, lo cual requiere una coordinación perfecta.',
      dataSafety: { value: 'Casi Cero', description: 'Si se ejecuta perfectamente', color: '#10B981' },
      downtime: { value: 'Minutos', description: 'Micro-downtime controlado', color: '#10B981' },
      complexity: { value: 'Alta', description: 'Requiere herramientas especializadas y SRE experto', color: '#EF4444' },
      steps: [
        {
          number: 1,
          title: 'Preparar el Regreso',
          description: 'Atlas está online pero "desactualizado". Las aplicaciones siguen operando on-premise',
          icon: CheckCircle2,
          details: [
            'Validar que Atlas está 100% estable y listo',
            'Verificar conectividad y performance',
            'Preparar cluster de Atlas (escalado preventivo)',
            'Equipo SRE en standby',
            'Confirmar que aplicaciones siguen funcionando en on-prem'
          ]
        },
        {
          number: 2,
          title: 'Iniciar Sincronización Inversa',
          description: 'Se usa mongosync en reversa: on-premise como Master, Atlas como Slave',
          icon: GitBranch,
          details: [
            'Configurar mongosync con on-prem como fuente',
            'Configurar Atlas como destino',
            'Definir filtros y colecciones a sincronizar',
            'Iniciar proceso de sincronización',
            'Validar que mongosync está corriendo sin errores'
          ]
        },
        {
          number: 3,
          title: 'Proceso de Sincronización',
          description: 'mongosync copia datos iniciales, luego entra en modo continuo aplicando cambios en tiempo real',
          icon: RefreshCw,
          details: [
            'Monitorear copia inicial (bulk load)',
            'Verificar progreso y velocidad de sincronización',
            'mongosync entra en modo "continuous sync"',
            'Aplicar cambios en tiempo real (oplog)',
            'Monitorear lag de replicación'
          ]
        },
        {
          number: 4,
          title: 'Esperar Convergencia',
          description: 'Monitorear mongosync hasta que reporte que Atlas está 100% sincronizado',
          icon: Timer,
          details: [
            'Verificar lag de replicación < 1 segundo',
            'Confirmar que no hay errores en logs',
            'Validar conteos de documentos',
            'Verificar índices y metadata',
            'Sign-off del equipo DBA: "Listo para el corte"'
          ]
        },
        {
          number: 5,
          title: 'El "Corte" (Micro-Downtime)',
          description: 'Momento crítico: detener apps, detener sync, cambiar conexiones, reiniciar apps',
          icon: Zap,
          details: [
            '1. Detener mongosync (congelar replicación)',
            '2. Detener aplicaciones (inicia micro-downtime)',
            '3. Cambiar connection strings a Atlas',
            '4. Verificar que no hay conexiones pendientes',
            '5. Iniciar aplicaciones apuntando a Atlas',
            '6. Termina micro-downtime (objetivo: 1-5 minutos)'
          ]
        },
        {
          number: 6,
          title: 'Verificación en Vivo',
          description: 'El sistema está vivo en Atlas. Validar operación en tiempo real',
          icon: CheckCheck,
          details: [
            'Validar que aplicaciones están conectadas a Atlas',
            'Ejecutar transacciones de prueba',
            'Monitorear métricas de negocio',
            'Verificar que no hay errores en logs',
            'Confirmar que el sistema responde correctamente'
          ]
        },
        {
          number: 7,
          title: 'Reactivar Replicación DRP (CRÍTICO)',
          description: 'Destruir sincronización inversa y reactivar replicación normal Atlas → On-Prem',
          icon: Database,
          details: [
            'Detener y destruir configuración de mongosync inversa',
            'Limpiar datos del on-premise',
            'Reconfigurar replicación normal (Atlas → On-Prem)',
            'Validar que Change Streams están activos',
            'Confirmar que el DRP está operativo de nuevo'
          ]
        }
      ],
      pros: [
        'Downtime mínimo (1-5 minutos)',
        'Impacto casi nulo al negocio',
        'Sincronización en tiempo real',
        'Experiencia de usuario casi sin interrupción'
      ],
      cons: [
        'Complejidad muy alta',
        'Requiere herramientas especializadas (mongosync)',
        'Necesita equipo SRE experto',
        'Requiere automatización y orquestación precisa',
        'Mayor riesgo si el "corte" no se ejecuta correctamente'
      ],
      idealFor: 'Ideal para sistemas de misión crítica 24/7 donde el downtime no es aceptable. Requiere inversión significativa en automatización y equipo experto.'
    }
  }

  const governancePhases = [
    {
      number: 0,
      title: 'El "Comité de Crisis" (Gobernanza)',
      icon: Users,
      color: '#8B5CF6',
      description: 'Antes de cualquier incidente, se define un equipo formal con roles claros. No se pueden tomar decisiones en medio de la crisis.',
      content: {
        intro: 'La tecnología es predecible; la confusión humana es el mayor riesgo.',
        roles: [
          {
            title: 'Patrocinador Ejecutivo (Sponsor)',
            icon: Shield,
            description: 'El líder (Director de TI, CTO, COO) que tiene la autoridad final y aprueba el riesgo y costo de activar el DRP',
            responsibilities: [
              'Autoridad final para declarar el desastre',
              'Aprobar costos y recursos del DRP',
              'Comunicación a nivel ejecutivo (Directorio)',
              'Decisiones de negocio estratégicas'
            ]
          },
          {
            title: 'Líder de Incidente (Incident Commander)',
            icon: UserCog,
            description: 'El "director de orquesta" técnico. Es la única persona con autoridad para dirigir a los equipos técnicos durante la crisis',
            responsibilities: [
              'Dirigir todos los equipos técnicos',
              'Tomar decisiones técnicas rápidas',
              'Coordinar el failover y failback',
              'No puede ser el Sponsor (diferente función)',
              'Punto único de contacto técnico'
            ]
          },
          {
            title: 'Líder de Comunicación',
            icon: MessageSquare,
            description: 'Responsable de gestionar todas las comunicaciones a stakeholders. Protege al equipo técnico de interrupciones',
            responsibilities: [
              'Gestionar comunicaciones internas y externas',
              'Plantillas pre-aprobadas por Legal/Marketing',
              'Actualizaciones periódicas a stakeholders',
              'Proteger al equipo técnico de distracciones',
              'Coordinación con medios si es necesario'
            ]
          },
          {
            title: 'Equipos Técnicos',
            icon: Users,
            description: 'Los expertos (DBA, Redes, Apps, Seguridad) que ejecutan las acciones bajo la dirección del Líder de Incidente',
            responsibilities: [
              'Ejecutar acciones técnicas del DRP',
              'Monitoreo y validación continua',
              'Reportar estado al Líder de Incidente',
              'Documentar acciones tomadas',
              'Colaboración inter-equipos'
            ]
          }
        ]
      }
    },
    {
      number: 1,
      title: 'Fase 1: Detección y Declaración (El Failover)',
      icon: AlertCircle,
      color: '#EF4444',
      description: 'La fase más caótica. El objetivo es confirmar el desastre y tomar la decisión de activar el DRP.',
      keyQuestion: '¿Quién tiene la autoridad para "presionar el botón rojo" del Failover?',
      steps: [
        {
          title: 'Monitoreo (Detección)',
          description: 'No puede ser un reporte de usuario. Debe ser monitoreo técnico automático.',
          details: [
            'Ejemplo: "3 de 5 sondas fallan por 60 segundos"',
            'Alertas automáticas a canales de emergencia',
            'Sistema de escalamiento definido',
            'Logs y evidencia automática'
          ]
        },
        {
          title: 'La Decisión ("Declaración")',
          description: 'Proceso formal para declarar el desastre y activar el DRP',
          details: [
            '1. Equipos Técnicos detectan y notifican al Líder de Incidente',
            '2. Líder de Incidente valida la falla (no es error local)',
            '3. Líder de Incidente + Sponsor: "Puente de Crisis" (llamada)',
            '4. Decisión formal de declarar el desastre',
            '5. Activación oficial del DRP'
          ]
        },
        {
          title: 'Canal de Comunicación (War Room)',
          description: 'Canal de emergencia pre-definido e independiente de sistemas caídos',
          details: [
            'Canal dedicado (Teams/Slack/WhatsApp)',
            'Todos los miembros del Comité de Crisis incluidos',
            'Independiente de sistemas internos',
            'Historial completo de decisiones y acciones',
            'Acceso 24/7 garantizado'
          ]
        }
      ]
    },
    {
      number: 2,
      title: 'Fase 2: Comunicación Durante el Incidente',
      icon: Megaphone,
      color: '#F59E0B',
      description: 'Una vez declarado el desastre, el Líder de Comunicación toma el control del flujo de información.',
      keyPrinciples: [
        {
          title: 'Cadencia Fija',
          description: 'Actualizaciones cada 30 minutos, incluso si no hay novedades',
          rationale: 'Reduce la ansiedad de stakeholders'
        },
        {
          title: 'Plantillas Pre-aprobadas',
          description: 'Templates aprobados por Legal y Marketing',
          rationale: 'No se puede improvisar en medio de la crisis'
        }
      ],
      audiences: [
        {
          title: 'Líderes Ejecutivos (Directorio)',
          icon: Shield,
          messages: [
            '¿Qué pasó? (Explicación simple)',
            '¿Qué estamos haciendo? (Activando DRP)',
            '¿Cuándo esperamos volver? (ETA, aunque sea estimado)'
          ]
        },
        {
          title: 'Líderes de Negocio (Gerentes)',
          icon: Users,
          messages: [
            '¿Qué servicios están afectados? (Portal, Pagos, etc.)',
            '¿Existen procesos manuales o alternativos?',
            '¿Cómo afecta esto a nuestros clientes?'
          ]
        },
        {
          title: 'Clientes (Internos y Externos)',
          icon: MessageSquare,
          messages: [
            'Mensaje simple y transparente',
            'Generar confianza',
            'Ejemplo: "Nuestros servicios experimentan una interrupción. Estamos trabajando para resolverlo. Gracias por su paciencia."'
          ]
        },
        {
          title: 'Equipo Técnico (War Room)',
          icon: UserCog,
          messages: [
            'Comunicación constante y técnica',
            'Dirigida por el Líder de Incidente',
            'Updates de progreso en tiempo real',
            'Decisiones técnicas documentadas'
          ]
        }
      ]
    },
    {
      number: 3,
      title: 'Fase 3: Comunicación del Failback',
      icon: RefreshCw,
      color: '#3B82F6',
      description: 'A diferencia del Failover (emergencia), el Failback es un evento de mantenimiento planificado.',
      content: {
        decision: {
          title: 'La Decisión ("All-Clear")',
          description: 'El Comité de Crisis valida que Atlas está 100% estable, probado y listo para recibir la operación',
          validations: [
            'Atlas completamente estable por X horas',
            'Pruebas de carga exitosas',
            'Validación de conectividad',
            'Plan de rollback definido',
            'Equipo técnico listo'
          ]
        },
        planning: {
          title: 'Planificación del Failback',
          options: [
            {
              name: 'Opción A (Ventana de Mantenimiento)',
              communication: [
                'Notificación con días de anticipación',
                'Comunicar ventana de downtime',
                'Recordatorios 24h y 1h antes',
                'Comunicación al inicio: "Iniciamos mantenimiento"',
                'Comunicación al final: "Servicios restablecidos"'
              ]
            },
            {
              name: 'Opción B (Sincronización Inversa)',
              communication: [
                'Notificar al equipo de negocio del momento del "corte"',
                'Aunque el impacto es mínimo, debe haber awareness',
                'Validación inmediata post-corte',
                'Comunicación de éxito tras el micro-downtime'
              ]
            }
          ]
        }
      }
    },
    {
      number: 4,
      title: 'Fase 4: El "Post-Mortem" (Aprender y Mejorar)',
      icon: ClipboardCheck,
      color: '#10B981',
      description: 'Una vez que todo vuelve a la normalidad, se realiza una "autopsia sin culpa" para aprender y mejorar.',
      objectives: [
        '¿Qué salió bien? (Éxitos a replicar)',
        '¿Qué salió mal? (En tecnología Y comunicación)',
        '¿Cómo actualizamos el Plan de Gobernanza?',
        '¿Cómo actualizamos el Plan Técnico?',
        '¿Qué automatización podemos agregar?'
      ],
      deliverables: [
        {
          title: 'Documento Post-Mortem',
          content: [
            'Timeline completo del incidente',
            'Decisiones tomadas y por quién',
            'Acciones ejecutadas',
            'Métricas: RPO real, RTO real, downtime',
            'Lecciones aprendidas'
          ]
        },
        {
          title: 'Plan de Acción',
          content: [
            'Items de mejora identificados',
            'Responsables y fechas compromiso',
            'Actualizaciones a documentación del DRP',
            'Nuevas automatizaciones o herramientas',
            'Capacitación adicional requerida'
          ]
        },
        {
          title: 'Comunicación de Cierre',
          content: [
            'Resumen ejecutivo a stakeholders',
            'Agradecimientos al equipo',
            'Confianza restaurada',
            'Comunicación de mejoras implementadas'
          ]
        }
      ]
    }
  ]

  const selectedData = failbackOptions[selectedOption]

  return (
    <div className="drp-failback">
      {/* Header */}
      <div className="failback-header">
        <div className="header-content">
          <div className="header-badge">
            <Shield size={16} />
            <span>BPD</span>
          </div>
          <h1 className="header-title">
            Estrategia de Failback & Gobernanza del DRP
          </h1>
          <p className="header-subtitle">
            El Regreso Seguro a la Nube y el Plan de Comunicación en Crisis
          </p>
          <div className="header-tags">
            <span className="tag">
              <RefreshCw size={14} />
              Failback Planning
            </span>
            <span className="tag">
              <Users size={14} />
              Crisis Governance
            </span>
            <span className="tag">
              <MessageSquare size={14} />
              Communication Strategy
            </span>
          </div>
        </div>
      </div>

      {/* Introducción */}
      <div className="section intro-section">
        <div className="section-content">
          <div className="intro-card">
            <div className="intro-icon">
              <ArrowLeftRight size={32} />
            </div>
            <h2>El Failback: El Regreso Planificado a la Nube</h2>
            <p className="intro-text">
              En un plan de recuperación ante desastres (DRP), el <strong>Failover</strong> (ir de la Nube a su DRP local) es la parte urgente que protege la continuidad del negocio.
            </p>
            <p className="intro-text">
              Por su parte, el <strong>Failback</strong> (el regreso de sus servidores locales a la Nube) es una etapa que requiere la planificación más detallada para asegurar la integridad total de los datos.
            </p>
          </div>

          <div className="analogy-card">
            <div className="analogy-icon">
              <RefreshCw size={28} />
            </div>
            <div className="analogy-content">
              <h3>Analogía</h3>
              <p>
                Si el <strong>Failover</strong> es saltar del crucero a un bote salvavidas, el <strong>Failback</strong> es el procedimiento planificado para que todos en el bote regresen al crucero, asegurando que toda la tripulación regrese a salvo (sin perder un solo dato).
              </p>
            </div>
          </div>

          <div className="golden-rule">
            <div className="rule-icon">
              <Shield size={24} />
            </div>
            <div className="rule-content">
              <h3>La Regla de Oro del Failback</h3>
              <p>
                El sistema on-premise (el bote salvavidas) se convirtió temporalmente en la <strong>"fuente de la verdad"</strong> y generó nuevos datos (transacciones, clientes). El objetivo es mover el <strong>100% de esos datos nuevos</strong> de regreso a Atlas, de forma íntegra.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* El Escenario */}
      <div className="section scenario-section">
        <div className="section-content">
          <h2 className="section-title">El Escenario</h2>
          <div className="timeline">
            <div className="timeline-item alert">
              <div className="timeline-icon">
                <AlertCircle size={20} />
              </div>
              <div className="timeline-content">
                <div className="timeline-time">10:30 AM</div>
                <div className="timeline-title">Ocurre el Desastre</div>
                <div className="timeline-description">Atlas falla y no responde</div>
              </div>
            </div>
            <div className="timeline-item action">
              <div className="timeline-icon">
                <Zap size={20} />
              </div>
              <div className="timeline-content">
                <div className="timeline-time">10:31 AM</div>
                <div className="timeline-title">Activamos el DRP</div>
                <div className="timeline-description">Servidores on-premise se convierten en base de datos primaria</div>
              </div>
            </div>
            <div className="timeline-item success">
              <div className="timeline-icon">
                <CheckCircle2 size={20} />
              </div>
              <div className="timeline-content">
                <div className="timeline-time">06:00 PM</div>
                <div className="timeline-title">Atlas Vuelve Online</div>
                <div className="timeline-description">8 horas después - Atlas está estable y listo</div>
              </div>
            </div>
          </div>
          <div className="scenario-problem">
            <AlertCircle size={20} />
            <p>
              <strong>La Situación:</strong> Su base de datos on-premise tiene <strong>8 horas de transacciones nuevas</strong> que Atlas no tiene. Atlas está desactualizado.
            </p>
          </div>
          <div className="scenario-question">
            <h3>¿Cómo sincronizamos esas 8 horas de datos de regreso a la nube?</h3>
            <p>Hay dos métodos principales, cada uno con un impacto directo en el negocio.</p>
          </div>
        </div>
      </div>

      {/* Selector de Opciones */}
      <div className="section options-section">
        <div className="section-content">
          <h2 className="section-title">Estrategias de Failback</h2>
          <p className="section-description">
            Seleccione una opción para ver los detalles completos de implementación
          </p>
          <div className="options-selector">
            <button
              className={`option-button ${selectedOption === 'ventana' ? 'active' : ''}`}
              onClick={() => setSelectedOption('ventana')}
            >
              <Pause size={24} />
              <div className="option-button-content">
                <div className="option-button-title">Opción A</div>
                <div className="option-button-subtitle">Ventana de Mantenimiento</div>
              </div>
            </button>
            <button
              className={`option-button ${selectedOption === 'sincroinversa' ? 'active' : ''}`}
              onClick={() => setSelectedOption('sincroinversa')}
            >
              <RefreshCw size={24} />
              <div className="option-button-content">
                <div className="option-button-title">Opción B</div>
                <div className="option-button-subtitle">Sincronización Inversa</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Detalle de la Opción Seleccionada */}
      <div className="section detail-section">
        <div className="section-content">
          <div className="strategy-header" style={{ borderColor: selectedData.color }}>
            <div className="strategy-icon" style={{ backgroundColor: selectedData.color + '20', color: selectedData.color }}>
              <selectedData.icon size={32} />
            </div>
            <div className="strategy-header-content">
              <h2>{selectedData.name}</h2>
              <p className="strategy-subtitle">{selectedData.subtitle}</p>
            </div>
          </div>

          {/* Analogía */}
          <div className="detail-analogy">
            <div className="analogy-icon">
              <MessageSquare size={24} />
            </div>
            <div className="analogy-text">
              <strong>Analogía:</strong> {selectedData.analogy}
            </div>
          </div>

          {/* Métricas */}
          <div className="metrics-grid">
            <div className="metric-card" style={{ borderLeftColor: selectedData.dataSafety.color }}>
              <div className="metric-icon" style={{ color: selectedData.dataSafety.color }}>
                <Shield size={24} />
              </div>
              <div className="metric-content">
                <div className="metric-label">Pérdida de Datos</div>
                <div className="metric-value">{selectedData.dataSafety.value}</div>
                <div className="metric-description">{selectedData.dataSafety.description}</div>
              </div>
            </div>
            <div className="metric-card" style={{ borderLeftColor: selectedData.downtime.color }}>
              <div className="metric-icon" style={{ color: selectedData.downtime.color }}>
                <Clock size={24} />
              </div>
              <div className="metric-content">
                <div className="metric-label">Impacto al Negocio</div>
                <div className="metric-value">{selectedData.downtime.value}</div>
                <div className="metric-description">{selectedData.downtime.description}</div>
              </div>
            </div>
            <div className="metric-card" style={{ borderLeftColor: selectedData.complexity.color }}>
              <div className="metric-icon" style={{ color: selectedData.complexity.color }}>
                <Database size={24} />
              </div>
              <div className="metric-content">
                <div className="metric-label">Complejidad</div>
                <div className="metric-value">{selectedData.complexity.value}</div>
                <div className="metric-description">{selectedData.complexity.description}</div>
              </div>
            </div>
          </div>

          {/* Pasos */}
          <div className="steps-section">
            <h3 className="steps-title">
              ¿Cómo Funciona, Paso a Paso?
            </h3>
            <div className="steps-list">
              {selectedData.steps.map((step) => {
                const isExpanded = expandedStep === step.number
                const StepIcon = step.icon
                return (
                  <div
                    key={step.number}
                    className={`step-item ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => setExpandedStep(isExpanded ? null : step.number)}
                  >
                    <div className="step-header">
                      <div className="step-number">{step.number}</div>
                      <div className="step-icon">
                        <StepIcon size={20} />
                      </div>
                      <div className="step-header-content">
                        <div className="step-title">{step.title}</div>
                        <div className="step-description">{step.description}</div>
                      </div>
                      <div className={`step-arrow ${isExpanded ? 'rotated' : ''}`}>
                        <ArrowLeftRight size={16} />
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="step-details">
                        <ul>
                          {step.details.map((detail, idx) => (
                            <li key={idx}>
                              <CheckCircle2 size={16} />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pros y Contras */}
          <div className="pros-cons-grid">
            <div className="pros-card">
              <div className="card-header">
                <CheckCircle2 size={20} />
                <h4>Lo Bueno</h4>
              </div>
              <ul>
                {selectedData.pros.map((pro, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={16} />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cons-card">
              <div className="card-header">
                <AlertCircle size={20} />
                <h4>Lo Malo</h4>
              </div>
              <ul>
                {selectedData.cons.map((con, idx) => (
                  <li key={idx}>
                    <AlertCircle size={16} />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ideal Para */}
          <div className="ideal-for-card">
            <div className="ideal-icon">
              <CheckCircle2 size={24} />
            </div>
            <div className="ideal-content">
              <h4>Ideal Para</h4>
              <p>{selectedData.idealFor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla Comparativa */}
      <div className="section comparison-section">
        <div className="section-content">
          <h2 className="section-title">Resumen Comparativo</h2>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Método de Failback</th>
                  <th>Impacto (Downtime)</th>
                  <th>Pérdida de Datos</th>
                  <th>Complejidad</th>
                  <th>Gobernanza Requerida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="table-cell-with-icon">
                      <Pause size={18} />
                      <strong>Opción A: Ventana de Mantenimiento</strong>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-warning">Horas</span>
                  </td>
                  <td>
                    <span className="badge badge-success">Cero</span>
                  </td>
                  <td>
                    <span className="badge badge-info">Media</span>
                  </td>
                  <td>
                    <span className="badge badge-info">Estándar</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="table-cell-with-icon">
                      <RefreshCw size={18} />
                      <strong>Opción B: Sincronización Inversa</strong>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-success">Minutos</span>
                  </td>
                  <td>
                    <span className="badge badge-success">Casi Cero</span>
                  </td>
                  <td>
                    <span className="badge badge-danger">Alta</span>
                  </td>
                  <td>
                    <span className="badge badge-danger">Alta</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Gobernanza y Comunicación */}
      <div className="section governance-section">
        <div className="section-content">
          <div className="governance-header">
            <div className="governance-icon">
              <Users size={40} />
            </div>
            <div className="governance-header-content">
              <h2 className="section-title">Gobernanza y Plan de Comunicación del DRP</h2>
              <p className="governance-intro">
                Un plan de DRP exitoso no se basa solo en la tecnología (el failover y failback), sino en un <strong>plan de gobernanza claro</strong> que defina quién toma las decisiones y cómo se comunican.
              </p>
              <div className="governance-quote">
                <MessageSquare size={20} />
                <p>"En una crisis, la tecnología es predecible; la confusión humana es el mayor riesgo."</p>
              </div>
            </div>
          </div>

          {/* Fases de Gobernanza */}
          <div className="phases-list">
            {governancePhases.map((phase) => {
              const isExpanded = expandedPhase === phase.number
              const PhaseIcon = phase.icon
              return (
                <div
                  key={phase.number}
                  className={`phase-item ${isExpanded ? 'expanded' : ''}`}
                  style={{ borderLeftColor: phase.color }}
                >
                  <div
                    className="phase-header"
                    onClick={() => setExpandedPhase(isExpanded ? null : phase.number)}
                  >
                    <div className="phase-icon" style={{ backgroundColor: phase.color + '20', color: phase.color }}>
                      <PhaseIcon size={24} />
                    </div>
                    <div className="phase-header-content">
                      <div className="phase-title">{phase.title}</div>
                      <div className="phase-description">{phase.description}</div>
                    </div>
                    <div className={`phase-arrow ${isExpanded ? 'rotated' : ''}`}>
                      <ArrowLeftRight size={20} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="phase-content">
                      {/* Fase 0: Comité de Crisis */}
                      {phase.number === 0 && (
                        <div className="committee-content">
                          <div className="committee-intro">
                            <AlertCircle size={20} />
                            <p>{phase.content.intro}</p>
                          </div>
                          <div className="roles-grid">
                            {phase.content.roles.map((role, idx) => {
                              const RoleIcon = role.icon
                              const isSelected = selectedRole === idx
                              return (
                                <div
                                  key={idx}
                                  className={`role-card ${isSelected ? 'selected' : ''}`}
                                  onClick={() => setSelectedRole(isSelected ? null : idx)}
                                >
                                  <div className="role-header">
                                    <div className="role-icon">
                                      <RoleIcon size={24} />
                                    </div>
                                    <h4>{role.title}</h4>
                                  </div>
                                  <p className="role-description">{role.description}</p>
                                  {isSelected && (
                                    <div className="role-responsibilities">
                                      <h5>Responsabilidades:</h5>
                                      <ul>
                                        {role.responsibilities.map((resp, ridx) => (
                                          <li key={ridx}>
                                            <CheckCircle2 size={14} />
                                            <span>{resp}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {/* Fase 1: Detección y Declaración */}
                      {phase.number === 1 && (
                        <div className="phase-detail-content">
                          <div className="key-question">
                            <AlertCircle size={20} />
                            <strong>Pregunta Clave:</strong> {phase.keyQuestion}
                          </div>
                          <div className="phase-steps">
                            {phase.steps.map((step, idx) => (
                              <div key={idx} className="phase-step-card">
                                <h4>{step.title}</h4>
                                <p className="phase-step-description">{step.description}</p>
                                <ul>
                                  {step.details.map((detail, didx) => (
                                    <li key={didx}>
                                      <CheckCircle2 size={14} />
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Fase 2: Comunicación Durante el Incidente */}
                      {phase.number === 2 && (
                        <div className="phase-detail-content">
                          <div className="key-principles">
                            <h4>Principios Clave</h4>
                            <div className="principles-grid">
                              {phase.keyPrinciples.map((principle, idx) => (
                                <div key={idx} className="principle-card">
                                  <h5>{principle.title}</h5>
                                  <p className="principle-description">{principle.description}</p>
                                  <p className="principle-rationale">
                                    <CheckCircle2 size={14} />
                                    {principle.rationale}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="audiences-section">
                            <h4>Audiencias Clave (Stakeholders)</h4>
                            <div className="audiences-grid">
                              {phase.audiences.map((audience, idx) => {
                                const AudienceIcon = audience.icon
                                return (
                                  <div key={idx} className="audience-card">
                                    <div className="audience-header">
                                      <AudienceIcon size={20} />
                                      <h5>{audience.title}</h5>
                                    </div>
                                    <ul>
                                      {audience.messages.map((msg, midx) => (
                                        <li key={midx}>
                                          <MessageSquare size={14} />
                                          <span>{msg}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Fase 3: Comunicación del Failback */}
                      {phase.number === 3 && (
                        <div className="phase-detail-content">
                          <div className="failback-decision">
                            <h4>{phase.content.decision.title}</h4>
                            <p>{phase.content.decision.description}</p>
                            <ul>
                              {phase.content.decision.validations.map((validation, idx) => (
                                <li key={idx}>
                                  <CheckCircle2 size={14} />
                                  <span>{validation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="failback-planning">
                            <h4>{phase.content.planning.title}</h4>
                            {phase.content.planning.options.map((option, idx) => (
                              <div key={idx} className="planning-option">
                                <h5>{option.name}</h5>
                                <ul>
                                  {option.communication.map((comm, cidx) => (
                                    <li key={cidx}>
                                      <MessageSquare size={14} />
                                      <span>{comm}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Fase 4: Post-Mortem */}
                      {phase.number === 4 && (
                        <div className="phase-detail-content">
                          <div className="postmortem-objectives">
                            <h4>Objetivos del Post-Mortem</h4>
                            <ul>
                              {phase.objectives.map((objective, idx) => (
                                <li key={idx}>
                                  <ClipboardCheck size={14} />
                                  <span>{objective}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="postmortem-deliverables">
                            <h4>Entregables</h4>
                            {phase.deliverables.map((deliverable, idx) => (
                              <div key={idx} className="deliverable-card">
                                <h5>{deliverable.title}</h5>
                                <ul>
                                  {deliverable.content.map((item, iidx) => (
                                    <li key={iidx}>
                                      <CheckCircle2 size={14} />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Recomendación Final de Gobernanza */}
          <div className="final-recommendation">
            <div className="recommendation-icon">
              <Shield size={32} />
            </div>
            <div className="recommendation-content">
              <h3>Recomendación Clave</h3>
              <p>
                Un plan de comunicación de DRP debe <strong>probarse (simulacros)</strong> junto con las pruebas técnicas.
              </p>
              <div className="recommendation-questions">
                <ul>
                  <li>
                    <AlertCircle size={16} />
                    <span>¿Qué pasa si el Líder de Incidente no contesta el teléfono a las 3:00 AM?</span>
                  </li>
                  <li>
                    <AlertCircle size={16} />
                    <span>¿Quién es su suplente?</span>
                  </li>
                  <li>
                    <AlertCircle size={16} />
                    <span>¿Los canales de comunicación funcionan cuando los sistemas internos fallan?</span>
                  </li>
                  <li>
                    <AlertCircle size={16} />
                    <span>¿Todos los miembros del Comité de Crisis tienen acceso 24/7 al War Room?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recomendación Final General */}
      <div className="section final-section">
        <div className="section-content">
          <div className="final-card">
            <div className="final-icon">
              <CheckCircle2 size={48} />
            </div>
            <h2>Recomendación Final</h2>
            <p className="final-text">
              Un plan de Failback es una parte fundamental de la <strong>gobernanza del DRP</strong>. Debe ser diseñado, documentado, automatizado y (lo más importante) <strong>probado (simulacros) al menos dos veces al año</strong>.
            </p>
            <div className="final-steps">
              <div className="final-step">
                <div className="final-step-number">1</div>
                <div className="final-step-content">
                  <h4>Comenzar con la Opción A</h4>
                  <p>Diseñar, probar y validar la Ventana de Mantenimiento. Hacerla robusta y auditable.</p>
                </div>
              </div>
              <div className="final-step">
                <div className="final-step-number">2</div>
                <div className="final-step-content">
                  <h4>Evolucionar a la Opción B</h4>
                  <p>Una vez validada la Opción A, evolucionar hacia Sincronización Inversa como proyecto de mejora continua.</p>
                </div>
              </div>
              <div className="final-step">
                <div className="final-step-number">3</div>
                <div className="final-step-content">
                  <h4>Probar el Plan de Comunicación</h4>
                  <p>Realizar simulacros que incluyan tanto la tecnología como la gobernanza y comunicación.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="failback-footer">
        <div className="footer-content">
          <div className="footer-meta">
            <span>Documento Técnico - BPD</span>
            <span>•</span>
            <span>2025</span>
            <span>•</span>
            <span>MongoDB Enterprise Advanced</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DRPFailback
