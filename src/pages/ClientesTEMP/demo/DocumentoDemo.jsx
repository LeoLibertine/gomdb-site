import React from 'react'
import { ClientDocumentLayout } from '../../../components/layouts'
import { CodeBlock, MetricsCard } from '../../../components/shared'

/**
 * Documento de Demostración
 * Muestra todos los componentes y estilos del sistema GoMDB
 */
export const DocumentoDemo = () => {
  return (
    <ClientDocumentLayout
      client="Demo Client"
      title="Propuesta de Modernización con MongoDB Atlas"
      subtitle="De SQL Server a MongoDB - Transformación Digital"
      author="Leo Alarcón"
      date="2025-11-06"
      tags={['mongodb', 'atlas', 'migración', 'demo']}
      showExportButton={true}
    >

      {/* RESUMEN EJECUTIVO */}
      <section className="executive-summary">
        <h2>📋 Resumen Ejecutivo</h2>
        <p>
          Este documento presenta la propuesta de modernización de la base de datos SQL Server
          a <strong>MongoDB Atlas</strong> para mejorar la escalabilidad, reducir costos
          operativos y habilitar nuevas capacidades de desarrollo ágil.
        </p>
        <p>
          <strong>Beneficios esperados:</strong>
        </p>
        <ul>
          <li>⚡ Reducción del 70% en latencia de queries complejos</li>
          <li>💰 Ahorro del 45% en costos anuales de infraestructura</li>
          <li>🚀 Time-to-market reducido en 60% para nuevas features</li>
          <li>📈 Escalabilidad horizontal automática</li>
        </ul>
      </section>

      {/* CONTEXTO */}
      <section className="context">
        <h2>🏢 Contexto del Cliente</h2>

        <h3>Situación Actual</h3>
        <p>
          El cliente opera actualmente con SQL Server 2019 en un modelo on-premise,
          enfrentando desafíos de escalabilidad, costos elevados y rigidez en el esquema
          que ralentiza el desarrollo de nuevas funcionalidades.
        </p>

        <MetricsCard
          title="Infraestructura Actual (SQL Server)"
          variant="warning"
          metrics={[
            {
              label: 'Base de Datos',
              value: '850',
              unit: 'GB',
              description: 'Datos en producción'
            },
            {
              label: 'Latency P95',
              value: '380',
              unit: 'ms',
              trend: 'up',
              description: 'Queries complejos'
            },
            {
              label: 'Usuarios Concurrentes',
              value: '12,500',
              description: 'Pico en horas laborales'
            },
            {
              label: 'Costo Anual',
              value: '$28,000',
              unit: 'USD',
              description: 'Licencias + hardware'
            }
          ]}
        />

        <h3>Desafíos Identificados</h3>
        <ol>
          <li>
            <strong>Escalabilidad Limitada:</strong> El esquema relacional rígido dificulta
            la adición de nuevos campos y relaciones
          </li>
          <li>
            <strong>Performance Degradado:</strong> Queries con múltiples JOINs tienen
            latencias superiores a 300ms
          </li>
          <li>
            <strong>Costos Elevados:</strong> Licenciamiento y mantenimiento de hardware
            representan $28,000 USD anuales
          </li>
          <li>
            <strong>Desarrollo Lento:</strong> Cambios en esquema requieren migraciones
            complejas y downtime
          </li>
        </ol>
      </section>

      {/* ARQUITECTURA PROPUESTA */}
      <section className="architecture">
        <h2>🏗️ Arquitectura Propuesta - MongoDB Atlas</h2>

        <h3>Configuración Recomendada</h3>

        <MetricsCard
          title="MongoDB Atlas - Sizing Optimizado"
          variant="success"
          metrics={[
            {
              label: 'Cluster Tier',
              value: 'M40'
            },
            {
              label: 'RAM',
              value: '16',
              unit: 'GB'
            },
            {
              label: 'Storage',
              value: '100',
              unit: 'GB',
              description: 'Con 20% buffer'
            },
            {
              label: 'Réplicas',
              value: '3',
              description: 'Alta disponibilidad'
            },
            {
              label: 'Auto-Scaling',
              value: 'Enabled',
              description: 'M40 → M50 automático'
            },
            {
              label: 'Costo Mensual',
              value: '$1,280',
              unit: 'USD',
              description: '$15,360 USD/año'
            }
          ]}
        />

        <h3>Comparativa de Performance</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          margin: '2rem 0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <thead>
            <tr style={{
              background: 'linear-gradient(135deg, #00ED64 0%, #00C853 100%)',
              color: 'white'
            }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Métrica</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>SQL Server</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>MongoDB Atlas</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Mejora</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: '#fff' }}>
              <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>
                <strong>Latency P95</strong>
              </td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center' }}>
                380 ms
              </td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center', color: '#00ED64', fontWeight: 'bold' }}>
                95 ms
              </td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center', color: '#00ED64', fontWeight: 'bold' }}>
                ↓ 75%
              </td>
            </tr>
            <tr style={{ background: '#F9FAFB' }}>
              <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>
                <strong>Throughput</strong>
              </td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center' }}>
                5,000 ops/s
              </td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center', color: '#00ED64', fontWeight: 'bold' }}>
                25,000 ops/s
              </td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center', color: '#00ED64', fontWeight: 'bold' }}>
                ↑ 400%
              </td>
            </tr>
            <tr style={{ background: '#fff' }}>
              <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>
                <strong>Escalabilidad</strong>
              </td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center' }}>
                Vertical (manual)
              </td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center', color: '#00ED64', fontWeight: 'bold' }}>
                Horizontal (auto)
              </td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center', color: '#00ED64', fontWeight: 'bold' }}>
                ∞
              </td>
            </tr>
            <tr style={{ background: '#F9FAFB' }}>
              <td style={{ padding: '1rem' }}>
                <strong>Costo Anual</strong>
              </td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>
                $28,000
              </td>
              <td style={{ padding: '1rem', textAlign: 'center', color: '#00ED64', fontWeight: 'bold' }}>
                $15,360
              </td>
              <td style={{ padding: '1rem', textAlign: 'center', color: '#00ED64', fontWeight: 'bold' }}>
                ↓ 45%
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Arquitectura de Alta Disponibilidad</h3>
        <div style={{
          background: 'linear-gradient(135deg, #f9fafb 0%, #e5f7ee 100%)',
          border: '2px solid #00ED64',
          borderRadius: '12px',
          padding: '2rem',
          margin: '2rem 0'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#001E2B' }}>
            📊 Componentes de la Arquitectura
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li><strong>Cluster M40:</strong> 3 nodos (Primary + 2 Secondaries)</li>
            <li><strong>Región:</strong> AWS us-east-1 (Virginia)</li>
            <li><strong>VPC Peering:</strong> Conexión segura con infraestructura existente</li>
            <li><strong>Backups:</strong> Snapshots automáticos cada 6 horas, retención 30 días</li>
            <li><strong>Monitoring:</strong> MongoDB Atlas Performance Advisor + Alertas Slack</li>
            <li><strong>Auto-Scaling:</strong> Storage auto-scaling habilitado</li>
          </ul>
        </div>
      </section>

      {/* EJEMPLOS DE CÓDIGO */}
      <section className="code-examples">
        <h2>💻 Ejemplos de Implementación</h2>

        <h3>1. Conexión a MongoDB Atlas (Node.js)</h3>

        <CodeBlock
          language="javascript"
          showLineNumbers
          title="config/database.js"
        >
{`const { MongoClient } = require('mongodb');

// Connection URI desde variable de entorno
const uri = process.env.MONGODB_URI;

// Opciones de conexión optimizadas
const options = {
  maxPoolSize: 50,
  minPoolSize: 10,
  maxIdleTimeMS: 60000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  retryReads: true,
  w: 'majority'
};

const client = new MongoClient(uri, options);

async function connectDatabase() {
  try {
    await client.connect();

    // Verificar conexión
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Conectado exitosamente a MongoDB Atlas');

    return client.db('production');
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await client.close();
  console.log('🔌 Conexión cerrada correctamente');
  process.exit(0);
});

module.exports = { connectDatabase };`}
        </CodeBlock>

        <h3>2. Modelo de Datos - Ejemplo de Documento</h3>

        <CodeBlock
          language="json"
          showLineNumbers
          title="example-document.json"
        >
{`{
  "_id": ObjectId("6548a3c2f1234567890abcde"),
  "customerId": "CUST-2025-001",
  "profile": {
    "firstName": "María",
    "lastName": "González",
    "email": "maria.gonzalez@example.com",
    "phone": "+57 300 123 4567",
    "address": {
      "street": "Calle 100 #15-25",
      "city": "Bogotá",
      "country": "Colombia",
      "postalCode": "110111"
    }
  },
  "preferences": {
    "notifications": {
      "email": true,
      "sms": false,
      "push": true
    },
    "language": "es",
    "timezone": "America/Bogota"
  },
  "orders": [
    {
      "orderId": "ORD-2025-11-001",
      "date": ISODate("2025-11-01T14:30:00Z"),
      "items": [
        {
          "productId": "PROD-001",
          "name": "Laptop Dell XPS 15",
          "quantity": 1,
          "price": 4500000
        }
      ],
      "total": 4500000,
      "status": "delivered",
      "tracking": {
        "carrier": "Servientrega",
        "trackingNumber": "SER-123456789",
        "deliveredAt": ISODate("2025-11-05T16:45:00Z")
      }
    }
  ],
  "metrics": {
    "totalOrders": 15,
    "lifetimeValue": 18750000,
    "averageOrderValue": 1250000,
    "lastPurchase": ISODate("2025-11-01T14:30:00Z")
  },
  "tags": ["premium", "frequent-buyer", "tech-enthusiast"],
  "createdAt": ISODate("2024-01-15T10:00:00Z"),
  "updatedAt": ISODate("2025-11-05T16:45:00Z")
}`}
        </CodeBlock>

        <h3>3. Query Optimizado con Agregación</h3>

        <CodeBlock
          language="javascript"
          showLineNumbers
          title="queries/analytics.js"
        >
{`// Top 10 clientes por valor de compra
async function getTopCustomersByValue(db, limit = 10) {
  return await db.collection('customers').aggregate([
    {
      // Filtrar solo clientes activos
      $match: {
        'metrics.totalOrders': { $gte: 1 },
        status: 'active'
      }
    },
    {
      // Ordenar por lifetime value descendente
      $sort: { 'metrics.lifetimeValue': -1 }
    },
    {
      // Limitar resultados
      $limit: limit
    },
    {
      // Proyectar solo campos necesarios
      $project: {
        _id: 0,
        customerId: 1,
        name: {
          $concat: [
            '$profile.firstName',
            ' ',
            '$profile.lastName'
          ]
        },
        email: '$profile.email',
        totalOrders: '$metrics.totalOrders',
        lifetimeValue: '$metrics.lifetimeValue',
        averageOrderValue: '$metrics.averageOrderValue',
        tags: 1
      }
    }
  ]).toArray();
}

// Índice recomendado para esta query:
// db.customers.createIndex({
//   "metrics.lifetimeValue": -1,
//   "status": 1
// })

module.exports = { getTopCustomersByValue };`}
        </CodeBlock>

        <h3>4. Ejemplo en Python (FastAPI)</h3>

        <CodeBlock
          language="python"
          showLineNumbers
          title="app/database.py"
        >
{`from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI
import os

# MongoDB connection
MONGODB_URI = os.getenv('MONGODB_URI')
client = AsyncIOMotorClient(MONGODB_URI)
db = client.get_database('production')

async def get_database():
    """Get database instance"""
    return db

async def ping_database():
    """Health check for MongoDB connection"""
    try:
        await client.admin.command('ping')
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

# FastAPI startup event
async def connect_to_mongo():
    print("✅ Connected to MongoDB Atlas")

# FastAPI shutdown event
async def close_mongo_connection():
    client.close()
    print("🔌 MongoDB connection closed")`}
        </CodeBlock>
      </section>

      {/* MEJORES PRÁCTICAS */}
      <section className="best-practices">
        <h2>✨ Mejores Prácticas MongoDB</h2>

        <h3>1. Modelado de Datos</h3>
        <div style={{
          background: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '1.5rem',
          margin: '1rem 0'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#5644D4' }}>
            ✅ DO - Hacer
          </h4>
          <ul style={{ margin: 0 }}>
            <li>Embeber datos que se consultan juntos (embed)</li>
            <li>Usar referencias para relaciones many-to-many</li>
            <li>Limitar arrays embebidos a 100-200 elementos</li>
            <li>Desnormalizar datos para queries frecuentes</li>
          </ul>
        </div>

        <div style={{
          background: '#FEF2F2',
          border: '1px solid #FCA5A5',
          borderRadius: '8px',
          padding: '1.5rem',
          margin: '1rem 0'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#DC2626' }}>
            ❌ DON'T - Evitar
          </h4>
          <ul style={{ margin: 0 }}>
            <li>Documentos mayores a 2MB (límite 16MB)</li>
            <li>Arrays sin límite de crecimiento</li>
            <li>Normalización excesiva (anti-patrón en MongoDB)</li>
            <li>JOINs complejos ($lookup en queries críticos)</li>
          </ul>
        </div>

        <h3>2. Índices Optimizados</h3>
        <ul>
          <li>
            <strong>ESR Rule:</strong> Equality → Sort → Range (orden de campos en índice compuesto)
          </li>
          <li>
            <strong>Covered Queries:</strong> Índice que contiene todos los campos del query
          </li>
          <li>
            <strong>Monitoring:</strong> Usar Performance Advisor para identificar índices faltantes
          </li>
          <li>
            <strong>Límite:</strong> Máximo 5-6 índices por colección (balance query vs insert performance)
          </li>
        </ul>

        <h3>3. Seguridad</h3>
        <ul>
          <li>✅ Habilitar autenticación SCRAM-SHA-256</li>
          <li>✅ Usar VPC Peering o Private Link</li>
          <li>✅ IP Whitelisting restrictivo</li>
          <li>✅ Rotar credenciales cada 90 días</li>
          <li>✅ Habilitar audit logs en producción</li>
          <li>✅ Usar roles de usuario con menor privilegio necesario</li>
        </ul>
      </section>

      {/* PLAN DE IMPLEMENTACIÓN */}
      <section className="implementation-plan">
        <h2>🗓️ Plan de Implementación (8 Semanas)</h2>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            background: 'linear-gradient(135deg, #00ED64 0%, #00C853 100%)',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '8px 8px 0 0',
            margin: '0'
          }}>
            Fase 1: Preparación (Semanas 1-2)
          </h3>
          <div style={{
            border: '1px solid #E5E7EB',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            padding: '1.5rem'
          }}>
            <ol style={{ margin: 0 }}>
              <li>
                <strong>Semana 1:</strong> Configuración inicial
                <ul>
                  <li>Crear cluster MongoDB Atlas M40</li>
                  <li>Configurar VPC Peering con infraestructura actual</li>
                  <li>Crear usuarios y configurar roles de seguridad</li>
                  <li>Habilitar monitoreo y alertas</li>
                </ul>
              </li>
              <li>
                <strong>Semana 2:</strong> Diseño y desarrollo
                <ul>
                  <li>Análisis de esquema SQL Server actual</li>
                  <li>Diseño de modelo de datos MongoDB</li>
                  <li>Desarrollo de scripts de migración</li>
                  <li>Plan de validación y rollback</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            background: 'linear-gradient(135deg, #5644D4 0%, #4338CA 100%)',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '8px 8px 0 0',
            margin: '0'
          }}>
            Fase 2: Migración de Datos (Semanas 3-5)
          </h3>
          <div style={{
            border: '1px solid #E5E7EB',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            padding: '1.5rem'
          }}>
            <ol style={{ margin: 0 }}>
              <li>
                <strong>Semana 3:</strong> Migración histórica
                <ul>
                  <li>Exportar datos de SQL Server</li>
                  <li>Transformar y cargar en MongoDB</li>
                  <li>Validar integridad con checksums</li>
                </ul>
              </li>
              <li>
                <strong>Semana 4:</strong> Índices y optimización
                <ul>
                  <li>Crear índices basados en patrones de queries</li>
                  <li>Testing de performance con datos reales</li>
                  <li>Ajuste fino de configuraciones</li>
                </ul>
              </li>
              <li>
                <strong>Semana 5:</strong> Sincronización dual-write
                <ul>
                  <li>Modificar aplicación para escribir en ambas DBs</li>
                  <li>Monitoreo de consistencia</li>
                  <li>Ajuste de lógica de negocio</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            background: 'linear-gradient(135deg, #FFB81C 0%, #F59E0B 100%)',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '8px 8px 0 0',
            margin: '0'
          }}>
            Fase 3: Testing y Validación (Semanas 6-7)
          </h3>
          <div style={{
            border: '1px solid #E5E7EB',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            padding: '1.5rem'
          }}>
            <ol style={{ margin: 0 }}>
              <li>
                <strong>Semana 6:</strong> Testing funcional
                <ul>
                  <li>Pruebas unitarias y de integración</li>
                  <li>Testing de regresión completo</li>
                  <li>Validación de casos de borde</li>
                </ul>
              </li>
              <li>
                <strong>Semana 7:</strong> Testing de performance
                <ul>
                  <li>Load testing con JMeter (100K requests)</li>
                  <li>Pruebas de failover y alta disponibilidad</li>
                  <li>Simulación de picos de tráfico</li>
                  <li>Validación de métricas vs objetivos</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

        <div>
          <h3 style={{
            background: 'linear-gradient(135deg, #E03C31 0%, #DC2626 100%)',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '8px 8px 0 0',
            margin: '0'
          }}>
            Fase 4: Go-Live (Semana 8)
          </h3>
          <div style={{
            border: '1px solid #E5E7EB',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            padding: '1.5rem'
          }}>
            <ol style={{ margin: 0 }}>
              <li>
                <strong>Cutover Weekend:</strong> Sábado 11PM
                <ul>
                  <li>Freeze de escrituras en SQL Server</li>
                  <li>Sincronización final de datos</li>
                  <li>Switch de aplicación a MongoDB Atlas</li>
                  <li>Verificación de funcionalidad crítica</li>
                  <li>Go-live oficial: Domingo 2AM</li>
                </ul>
              </li>
              <li>
                <strong>Post Go-Live:</strong>
                <ul>
                  <li>Monitoreo 24/7 durante primera semana</li>
                  <li>On-call engineer disponible</li>
                  <li>SQL Server en read-only por 2 semanas (rollback plan)</li>
                  <li>Decommission de SQL Server después de validación exitosa</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ROI Y BENEFICIOS */}
      <section className="roi">
        <h2>💎 ROI y Beneficios Esperados</h2>

        <MetricsCard
          title="Retorno de Inversión"
          variant="success"
          compact={false}
          metrics={[
            {
              label: 'Ahorro Anual',
              value: '$12,640',
              unit: 'USD',
              trend: 'down',
              description: '$28K → $15.36K'
            },
            {
              label: 'ROI Period',
              value: '6',
              unit: 'meses',
              description: 'Recuperación de inversión'
            },
            {
              label: 'Ahorro 3 Años',
              value: '$37,920',
              unit: 'USD',
              description: 'Proyección ahorro acumulado'
            }
          ]}
        />

        <h3>Beneficios Cuantificables</h3>
        <ul>
          <li>⚡ <strong>Performance:</strong> Latencia reducida de 380ms → 95ms (75% mejora)</li>
          <li>💰 <strong>Costos:</strong> Ahorro de $12,640 USD anuales (45% reducción)</li>
          <li>📈 <strong>Escalabilidad:</strong> Capacidad de 5K → 25K ops/seg (400% aumento)</li>
          <li>⏱️ <strong>Time-to-Market:</strong> Deploy de features 60% más rápido</li>
          <li>🛡️ <strong>Disponibilidad:</strong> 99.995% SLA garantizado por MongoDB Atlas</li>
        </ul>

        <h3>Beneficios Intangibles</h3>
        <ul>
          <li>🚀 Mayor agilidad en desarrollo de nuevas funcionalidades</li>
          <li>👨‍💻 Mejora en experiencia de desarrolladores (DX)</li>
          <li>📊 Insights en tiempo real con Aggregation Framework</li>
          <li>🌍 Preparado para expansión global (multi-region)</li>
          <li>🔮 Foundation para AI/ML con MongoDB Vector Search</li>
        </ul>
      </section>

      {/* PRÓXIMOS PASOS */}
      <section className="next-steps">
        <h2>🚀 Próximos Pasos</h2>

        <div style={{
          background: 'linear-gradient(135deg, #e5f7ee 0%, #d1f4e0 100%)',
          border: '2px solid #00ED64',
          borderRadius: '12px',
          padding: '2rem',
          margin: '2rem 0'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#001E2B' }}>
            📅 Timeline de Decisión
          </h3>
          <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>
              <strong>Esta Semana:</strong> Revisión de propuesta con stakeholders técnicos y de negocio
            </li>
            <li>
              <strong>Próxima Semana:</strong> Aprobación de presupuesto y firma de contrato MongoDB Atlas
            </li>
            <li>
              <strong>Semana 3:</strong> Kick-off técnico con equipo MongoDB Solutions Architect
            </li>
            <li>
              <strong>Mensual:</strong> Status meetings cada último viernes del mes
            </li>
          </ol>
        </div>

        <h3>Entregables Inmediatos</h3>
        <ul>
          <li>✅ Proof of Concept (POC) con datos reales - 2 semanas</li>
          <li>✅ Análisis detallado de costos TCO (Total Cost of Ownership)</li>
          <li>✅ Workshop de modelado de datos con equipo de desarrollo</li>
          <li>✅ Plan de capacitación para equipo técnico</li>
        </ul>
      </section>

      {/* CONTACTO */}
      <section className="contact">
        <h2>📞 Contacto y Soporte</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          margin: '2rem 0'
        }}>
          <div style={{
            background: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ color: '#5644D4', margin: '0 0 1rem 0' }}>
              🎯 Solutions Architect
            </h4>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Leo Alarcón</strong>
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              📧 <a href="mailto:leo.alarcon@mongodb.com">leo.alarcon@mongodb.com</a>
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              📱 +57 300 123 4567
            </p>
          </div>

          <div style={{
            background: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ color: '#5644D4', margin: '0 0 1rem 0' }}>
              🛟 Soporte Técnico 24/7
            </h4>
            <p style={{ margin: '0.5rem 0' }}>
              <a href="https://support.mongodb.com" target="_blank" rel="noopener noreferrer">
                support.mongodb.com
              </a>
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              Email: support@mongodb.com
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              SLA: 1 hora respuesta (Priority 1)
            </p>
          </div>

          <div style={{
            background: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ color: '#5644D4', margin: '0 0 1rem 0' }}>
              📚 Recursos
            </h4>
            <p style={{ margin: '0.5rem 0' }}>
              <a href="https://docs.mongodb.com" target="_blank" rel="noopener noreferrer">
                📖 Documentación
              </a>
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <a href="https://university.mongodb.com" target="_blank" rel="noopener noreferrer">
                🎓 MongoDB University
              </a>
            </p>
            <p style={{ margin: '0.5rem 0' }}>
              <a href="https://community.mongodb.com" target="_blank" rel="noopener noreferrer">
                💬 Community Forums
              </a>
            </p>
          </div>
        </div>
      </section>

    </ClientDocumentLayout>
  )
}

export default DocumentoDemo
