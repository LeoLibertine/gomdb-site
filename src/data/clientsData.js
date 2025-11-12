/**
 * Datos de clientes y su contenido disponible
 *
 * Estructura:
 * - id: identificador único (usado en URLs y códigos de acceso)
 * - name: nombre completo del cliente
 * - industry: industria/sector
 * - description: descripción breve del cliente
 * - content: array de documentos disponibles
 */

export const CLIENTS_DATA = [
  {
    id: 'bancolombia',
    name: 'Bancolombia',
    industry: 'Banca y Servicios Financieros',
    country: 'Colombia',
    description: 'Grupo Bancolombia es el holding financiero más grande de Colombia y uno de los más importantes de América Latina.',
    icon: 'bank',
    content: [
      {
        title: 'Org Chart Álvaro Carmona - Use Cases MongoDB',
        description: 'Organigrama VP Servicios de Tecnología con 34 personas mapeadas a casos de uso MongoDB',
        path: '/clientes/bancolombia/orgchart-alvaro-carmona',
        type: 'jsx',
        category: 'Estrategia'
      },
      {
        title: 'Org Chart Fidel Vargas - Payment Ecosystem',
        description: 'Organigrama VP Payment Ecosystem con 47 personas y use cases de pagos, canales y arquitectura',
        path: '/clientes/bancolombia/orgchart-fidel-vargas',
        type: 'jsx',
        category: 'Estrategia'
      },
      {
        title: 'Org Chart Fidel Vargas - Negocios Digitales',
        description: 'Organigrama VP Negocios con 28 personas: BaaS, Marketplaces (TU360), ECOs y Bienestar Financiero',
        path: '/clientes/bancolombia/orgchart-fidel-vargas-negocios',
        type: 'jsx',
        category: 'Estrategia'
      },
      {
        title: 'MongoDB vs DocumentDB',
        description: 'Comparativa técnica y de costos entre MongoDB Atlas y Amazon DocumentDB',
        path: '/clientes/bancolombia/document-mongo',
        type: 'jsx',
        category: 'Comparativas'
      },
      {
        title: 'SQL vs NoSQL Decision Matrix',
        description: 'Matriz de decisión para elegir entre bases de datos SQL y NoSQL',
        path: '/clientes/bancolombia/sql-nosql.html',
        type: 'html',
        category: 'Comparativas'
      },
      {
        title: 'Cosmos DB vs MongoDB',
        description: 'Análisis comparativo entre Azure Cosmos DB y MongoDB Atlas',
        path: '/clientes/bancolombia/cosmos-mongo.html',
        type: 'html',
        category: 'Comparativas'
      },
      {
        title: 'DynamoDB vs MongoDB',
        description: 'Comparación técnica entre AWS DynamoDB y MongoDB',
        path: '/clientes/bancolombia/dynamo-mongo.html',
        type: 'html',
        category: 'Comparativas'
      },
      {
        title: 'TDC - Tarjeta de Crédito',
        description: 'Propuesta de arquitectura para sistema de tarjetas de crédito',
        path: '/clientes/bancolombia/tdc.html',
        type: 'html',
        category: 'Casos de Uso'
      },
      {
        title: 'TDC - Arquitectura',
        description: 'Arquitectura detallada del sistema de tarjetas de crédito',
        path: '/clientes/bancolombia/tdc-architecture.html',
        type: 'html',
        category: 'Casos de Uso'
      },
      {
        title: 'TDC - Flujo de Datos',
        description: 'Flujo de datos del sistema de tarjetas de crédito',
        path: '/clientes/bancolombia/tdc-flow.html',
        type: 'html',
        category: 'Casos de Uso'
      },
      {
        title: 'BDTL - Propuesta',
        description: 'Propuesta de modernización de base de datos transaccionales',
        path: '/clientes/bancolombia/bdtl/index.html',
        type: 'html',
        category: 'Casos de Uso'
      },
      {
        title: 'AI Architecture',
        description: 'Arquitectura de inteligencia artificial con MongoDB',
        path: '/clientes/bancolombia/ai-arquitectura.html',
        type: 'html',
        category: 'IA & ML'
      },
      {
        title: 'MongoDB Voyage AI',
        description: 'Capacidades de AI Vector Search en MongoDB',
        path: '/clientes/bancolombia/voyageai.html',
        type: 'html',
        category: 'IA & ML'
      },
      {
        title: 'Bintec 2025 - Fraud Fighter',
        description: 'Sistema de detección de fraudes con MongoDB',
        path: '/clientes/bancolombia/bintec2025/fraud_fighter.html',
        type: 'html',
        category: 'IA & ML'
      },
      {
        title: 'Landing Zone',
        description: 'Arquitectura de landing zone en AWS con MongoDB',
        path: '/clientes/bancolombia/landingzone/lzone.html',
        type: 'html',
        category: 'Infraestructura'
      },
      {
        title: 'Design Review - Data Foundation',
        description: 'Revisión de diseño para fundaciones de datos',
        path: '/clientes/bancolombia/df/designreview.html',
        type: 'html',
        category: 'Casos de Uso'
      },
      {
        title: 'Reporte Ejecutivo - Estrategia',
        description: 'Estrategia y roadmap de MongoDB en Bancolombia',
        path: '/clientes/bancolombia/reporteejecutivo/estrategia.html',
        type: 'html',
        category: 'Estrategia'
      },
      {
        title: 'Why MongoDB',
        description: 'Beneficios y casos de uso de MongoDB',
        path: '/clientes/bancolombia/whymongo.html',
        type: 'html',
        category: 'General'
      }
    ]
  },
  {
    id: 'yape',
    name: 'Yape',
    industry: 'Fintech & Pagos Digitales',
    country: 'Perú',
    description: 'Yape es la billetera digital del BCP, líder en pagos móviles en Perú con millones de usuarios activos.',
    icon: 'fintech',
    content: [
      {
        title: 'Propuesta Final',
        description: 'Propuesta técnica y comercial completa para Yape',
        path: '/clientes/yape/propuesta-final.html',
        type: 'html',
        category: 'Propuestas'
      },
      {
        title: 'Arquitectura Final',
        description: 'Arquitectura recomendada para la plataforma de Yape',
        path: '/clientes/yape/arquitectura-final.html',
        type: 'html',
        category: 'Arquitectura'
      },
      {
        title: 'Arquitectura Horizontal',
        description: 'Escalamiento horizontal y alta disponibilidad',
        path: '/clientes/yape/arquitecturahorizontal.html',
        type: 'html',
        category: 'Arquitectura'
      },
      {
        title: 'Comparativa de Opciones',
        description: 'Comparación entre diferentes alternativas tecnológicas',
        path: '/clientes/yape/comparativa.html',
        type: 'html',
        category: 'Comparativas'
      },
      {
        title: 'Licenciamiento',
        description: 'Opciones de licenciamiento y costos',
        path: '/clientes/yape/licenciamiento.html',
        type: 'html',
        category: 'Comercial'
      },
      {
        title: 'SQL vs NoSQL',
        description: 'Matriz de decisión para caso de uso de Yape',
        path: '/clientes/yape/sql-nosql.html',
        type: 'html',
        category: 'Comparativas'
      },
      {
        title: 'Automatización',
        description: 'Automatización de operaciones con MongoDB',
        path: '/clientes/yape/Automatizacion.html',
        type: 'html',
        category: 'Operaciones'
      }
    ]
  },
  {
    id: 'cencosud',
    name: 'Cencosud',
    industry: 'Retail & Comercio',
    country: 'Chile',
    description: 'Cencosud es uno de los conglomerados de retail más grandes de Latinoamérica, operando en múltiples países.',
    icon: 'retail',
    content: [
      {
        title: 'SQL vs NoSQL Decision Matrix',
        description: 'Guía visual para elegir entre SQL y NoSQL según caso de uso',
        path: '/clientes/cencosud/sql-nosql.html',
        type: 'html',
        category: 'Comparativas'
      },
      {
        title: 'DynamoDB vs MongoDB',
        description: 'Comparación técnica para migración de DynamoDB a MongoDB',
        path: '/clientes/cencosud/dynamo-mongo.html',
        type: 'html',
        category: 'Comparativas'
      }
    ]
  },
  {
    id: 'etb',
    name: 'ETB (Empresa de Telecomunicaciones de Bogotá)',
    industry: 'Telecomunicaciones',
    country: 'Colombia',
    description: 'ETB es una empresa de telecomunicaciones colombiana que provee servicios de telefonía, internet y datos.',
    icon: 'telecom',
    content: [
      {
        title: 'Propuesta Atlas Enterprise Advanced',
        description: 'Propuesta técnica y comercial de MongoDB Atlas EA',
        path: '/clientes/etb/ea-propuesta1.html',
        type: 'html',
        category: 'Propuestas'
      },
      {
        title: 'Optimización de Costos',
        description: 'Estrategias de optimización de costos en MongoDB Atlas',
        path: '/clientes/etb/optimizacion.html',
        type: 'html',
        category: 'Optimización'
      },
      {
        title: 'Licenciamiento',
        description: 'Opciones de licenciamiento MongoDB',
        path: '/clientes/etb/licenciamiento.html',
        type: 'html',
        category: 'Comercial'
      },
      {
        title: 'QA - Sizing',
        description: 'Preguntas y respuestas sobre dimensionamiento',
        path: '/clientes/etb/qasize.html',
        type: 'html',
        category: 'Sizing'
      },
      {
        title: 'QA - Migración',
        description: 'Preguntas frecuentes sobre procesos de migración',
        path: '/clientes/etb/qamigracion.html',
        type: 'html',
        category: 'Migraciones'
      }
    ]
  },
  {
    id: 'kushki',
    name: 'Kushki',
    industry: 'Fintech & Procesamiento de Pagos',
    country: 'Ecuador/LATAM',
    description: 'Kushki es una plataforma de pagos online que procesa transacciones para miles de comercios en América Latina.',
    icon: 'fintech',
    content: [
      {
        title: 'OpenSearch vs MongoDB',
        description: 'Comparativa entre OpenSearch y MongoDB para búsquedas',
        path: '/clientes/kushki/opens-mongo.html',
        type: 'html',
        category: 'Comparativas'
      },
      {
        title: 'OpenSearch vs MongoDB - Costos',
        description: 'Análisis de costos comparativo',
        path: '/clientes/kushki/opens-mongo-cost.html',
        type: 'html',
        category: 'Comparativas'
      },
      {
        title: 'Preguntas sobre OpenSearch',
        description: 'FAQ sobre migración de OpenSearch a MongoDB',
        path: '/clientes/kushki/preguntas-opens.html',
        type: 'html',
        category: 'FAQ'
      },
      {
        title: 'Multi-Factor Authentication',
        description: 'Implementación de MFA con MongoDB',
        path: '/clientes/kushki/mf.html',
        type: 'html',
        category: 'Seguridad'
      }
    ]
  },
  {
    id: 'segurosbolivar',
    name: 'Seguros Bolívar',
    industry: 'Seguros & Servicios Financieros',
    country: 'Colombia',
    description: 'Seguros Bolívar es una de las compañías de seguros más grandes de Colombia, parte del Grupo Bolívar.',
    icon: 'insurance',
    content: [
      {
        title: 'POC - Proof of Concept',
        description: 'Prueba de concepto con MongoDB Atlas',
        path: '/clientes/segurosbolivar/poc.html',
        type: 'html',
        category: 'POC'
      },
      {
        title: 'Escenario Optimizado',
        description: 'Arquitectura optimizada para caso de uso específico',
        path: '/clientes/segurosbolivar/escenario-optimizado.html',
        type: 'html',
        category: 'Arquitectura'
      }
    ]
  },
  {
    id: 'payway',
    name: 'Payway',
    industry: 'Fintech & Procesamiento de Pagos',
    country: 'Argentina',
    description: 'Payway es un procesador de pagos digital que ofrece soluciones de pago online en Argentina.',
    icon: 'fintech',
    content: [
      {
        title: 'Integración con Kafka',
        description: 'Arquitectura de integración MongoDB + Apache Kafka',
        path: '/clientes/payway/kafka.html',
        type: 'html',
        category: 'Integraciones'
      },
      {
        title: 'Kafka - Diagrama',
        description: 'Diagramas de arquitectura con Kafka',
        path: '/clientes/payway/kafkaDiagrama.html',
        type: 'html',
        category: 'Integraciones'
      },
      {
        title: 'Integración con Salesforce',
        description: 'Conectando MongoDB con Salesforce',
        path: '/clientes/payway/salesforce.html',
        type: 'html',
        category: 'Integraciones'
      },
      {
        title: 'Sizing Salesforce',
        description: 'Dimensionamiento para integración con Salesforce',
        path: '/clientes/payway/sizing-sf.html',
        type: 'html',
        category: 'Sizing'
      },
      {
        title: 'Paginación',
        description: 'Patrones de paginación eficiente en MongoDB',
        path: '/clientes/payway/paginacion.html',
        type: 'html',
        category: 'Patrones'
      }
    ]
  },
  {
    id: 'bdp',
    name: 'BDP (Banco de Producción)',
    industry: 'Banca & Servicios Financieros',
    country: 'Ecuador',
    description: 'Banco de desarrollo productivo del Ecuador que financia sectores estratégicos de la economía.',
    icon: 'bank',
    content: [
      {
        title: 'Configuración de Réplica',
        description: 'Setup de replica sets y alta disponibilidad',
        path: '/clientes/bdp/bdp-replica.html',
        type: 'html',
        category: 'Configuración'
      },
      {
        title: 'Arquitecturas DRP Híbrido',
        description: 'Estrategias de Disaster Recovery desde Atlas a On-Premise con análisis de RPO/RTO',
        path: '/clientes/bdp/arquitectura-drp',
        type: 'jsx',
        category: 'Arquitectura'
      },
      {
        title: 'Estrategias DRP Híbrido - Guía Simplificada',
        description: 'Guía estratégica simplificada de DRP Híbrido: Bóveda de Respaldo vs Espejo en Vivo, con alternativas a Kafka',
        path: '/clientes/bdp/drp-hibrido',
        type: 'jsx',
        category: 'Estrategia'
      }
    ]
  },
  {
    id: 'coppel',
    name: 'Coppel',
    industry: 'Retail & Servicios Financieros',
    country: 'México',
    description: 'Coppel es una cadena de tiendas departamentales mexicana con presencia en toda Latinoamérica.',
    icon: 'retail',
    content: [
      {
        title: 'Matriz Universal de Decisión',
        description: 'Framework de decisión para casos de uso de Coppel',
        path: '/clientes/coppel/matriz-universal.html',
        type: 'html',
        category: 'Estrategia'
      }
    ]
  },
  {
    id: 'falape',
    name: 'Falabella Perú',
    industry: 'Retail & E-commerce',
    country: 'Perú',
    description: 'Falabella es una de las cadenas de retail más grandes de Sudamérica con fuerte presencia en Perú.',
    icon: 'retail',
    content: [
      // No hay archivos específicos encontrados en la búsqueda
      {
        title: 'Documentación en desarrollo',
        description: 'Contenido próximamente disponible',
        path: '#',
        type: 'placeholder',
        category: 'General'
      }
    ]
  },
  {
    id: 'bintec',
    name: 'Bintec',
    industry: 'Tecnología & Software',
    country: 'Colombia',
    description: 'Empresa de tecnología especializada en soluciones de software empresarial.',
    icon: 'tech',
    content: [
      // Contenido de Bintec está dentro de la carpeta de Bancolombia
      {
        title: 'Documentación en desarrollo',
        description: 'Ver contenido en sección de Bancolombia/Bintec2025',
        path: '/clientes/bancolombia/bintec2025/fraud_fighter.html',
        type: 'html',
        category: 'General'
      }
    ]
  }
]

/**
 * Obtener cliente por ID
 * @param {string} clientId
 * @returns {Object|null}
 */
export const getClientById = (clientId) => {
  return CLIENTS_DATA.find(client => client.id === clientId) || null
}

/**
 * Obtener todos los clientes
 * @returns {Array}
 */
export const getAllClients = () => {
  return CLIENTS_DATA
}

/**
 * Obtener clientes por industria
 * @param {string} industry
 * @returns {Array}
 */
export const getClientsByIndustry = (industry) => {
  return CLIENTS_DATA.filter(client => client.industry === industry)
}

/**
 * Buscar clientes por término
 * @param {string} searchTerm
 * @returns {Array}
 */
export const searchClients = (searchTerm) => {
  const term = searchTerm.toLowerCase()
  return CLIENTS_DATA.filter(client =>
    client.name.toLowerCase().includes(term) ||
    client.description.toLowerCase().includes(term) ||
    client.industry.toLowerCase().includes(term)
  )
}
