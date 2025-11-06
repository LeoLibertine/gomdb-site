import React from 'react'
import { ClientDocumentLayout } from '../../../components/layouts'
import { CodeBlock, MetricsCard } from '../../../components/shared'

/**
 * EJEMPLO PRÁCTICO: Documento de Cliente
 *
 * Este es un ejemplo completo mostrando cómo usar todos los componentes
 * y mejores prácticas del proyecto.
 *
 * 🎯 Objetivo: Demostrar el uso de:
 * - ClientDocumentLayout
 * - CodeBlock
 * - MetricsCard
 * - Estructura de secciones
 * - Estilos consistentes
 */

export const DocumentoEjemplo = () => {
  return (
    <ClientDocumentLayout
      client="Cliente Ejemplo"
      title="Guía de Migración a MongoDB Atlas"
      subtitle="De Oracle a MongoDB - Paso a paso"
      author="Leo Alarcón"
      date="2025-11-05"
      tags={['migración', 'atlas', 'oracle', 'arquitectura']}
      showExportButton={true}
    >

      {/* ============================================ */}
      {/* RESUMEN EJECUTIVO */}
      {/* ============================================ */}
      <section className="executive-summary">
        <h2>📋 Resumen Ejecutivo</h2>
        <p>
          Este documento presenta el plan de migración de la base de datos Oracle
          actual a MongoDB Atlas para el sistema de gestión de clientes. La migración
          permitirá una reducción del 40% en costos operativos y un aumento del 300%
          en velocidad de consultas.
        </p>
        <p>
          <strong>Duración estimada:</strong> 6 semanas<br />
          <strong>Inversión:</strong> $580 USD/mes en MongoDB Atlas<br />
          <strong>ROI esperado:</strong> Recuperación en 3 meses
        </p>
      </section>

      {/* ============================================ */}
      {/* CONTEXTO */}
      {/* ============================================ */}
      <section className="context">
        <h2>🏢 Contexto del Cliente</h2>

        <h3>Situación Actual</h3>
        <p>
          El cliente actualmente opera con una base de datos Oracle 12c que
          presenta los siguientes desafíos:
        </p>
        <ul>
          <li>Costos de licenciamiento elevados ($15,000 USD/año)</li>
          <li>Queries lentas en tablas con más de 10M registros</li>
          <li>Dificultad para escalar horizontalmente</li>
          <li>Esquema rígido que dificulta iteración rápida</li>
        </ul>

        <MetricsCard
          title="Métricas Actuales (Oracle)"
          variant="warning"
          metrics={[
            {
              label: 'Tamaño DB',
              value: '500',
              unit: 'GB',
              description: 'Datos en producción'
            },
            {
              label: 'Latency P95',
              value: '250',
              unit: 'ms',
              trend: 'up',
              description: 'Queries complejos'
            },
            {
              label: 'Costo Anual',
              value: '$15,000',
              unit: 'USD',
              description: 'Solo licencias'
            },
            {
              label: 'Downtime/mes',
              value: '4',
              unit: 'horas',
              description: 'Mantenimiento'
            }
          ]}
        />

        <h3>Objetivos de la Migración</h3>
        <ol>
          <li>Reducir latencia de queries en 70%</li>
          <li>Reducir costos operativos en 40%</li>
          <li>Eliminar downtime de mantenimiento</li>
          <li>Habilitar desarrollo ágil con esquema flexible</li>
        </ol>
      </section>

      {/* ============================================ */}
      {/* ARQUITECTURA */}
      {/* ============================================ */}
      <section className="architecture">
        <h2>🏗️ Arquitectura Propuesta</h2>

        <h3>MongoDB Atlas - Configuración</h3>

        <MetricsCard
          title="Sizing Recomendado"
          variant="success"
          metrics={[
            {
              label: 'Cluster Tier',
              value: 'M30'
            },
            {
              label: 'RAM',
              value: '8',
              unit: 'GB'
            },
            {
              label: 'Storage',
              value: '80',
              unit: 'GB',
              description: 'Con 40% buffer'
            },
            {
              label: 'Réplicas',
              value: '3',
              description: 'Alta disponibilidad'
            }
          ]}
        />

        <h3>Comparativa Oracle vs MongoDB</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          margin: '1.5rem 0'
        }}>
          <thead>
            <tr style={{
              background: 'var(--gray-100)',
              borderBottom: '2px solid var(--mongodb-green)'
            }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Aspecto</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Oracle 12c</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>MongoDB Atlas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)' }}>
                <strong>Costo Anual</strong>
              </td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)' }}>
                $15,000 USD
              </td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)', color: 'var(--success)' }}>
                $6,960 USD (53% menos)
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)' }}>
                <strong>Latency P95</strong>
              </td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)' }}>
                250 ms
              </td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)', color: 'var(--success)' }}>
                75 ms (70% mejora)
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)' }}>
                <strong>Escalabilidad</strong>
              </td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)' }}>
                Vertical (costoso)
              </td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)', color: 'var(--success)' }}>
                Horizontal (sharding)
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}>
                <strong>Mantenimiento</strong>
              </td>
              <td style={{ padding: '0.75rem' }}>
                4h/mes downtime
              </td>
              <td style={{ padding: '0.75rem', color: 'var(--success)' }}>
                0h (rolling upgrades)
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ============================================ */}
      {/* EJEMPLOS DE CÓDIGO */}
      {/* ============================================ */}
      <section className="code-examples">
        <h2>💻 Migración de Datos - Ejemplos</h2>

        <h3>1. Schema Mapping: Oracle → MongoDB</h3>

        <p><strong>Tabla Oracle (Relacional):</strong></p>
        <CodeBlock language="sql" showLineNumbers title="customers.sql">
{`CREATE TABLE customers (
  customer_id NUMBER PRIMARY KEY,
  first_name VARCHAR2(50),
  last_name VARCHAR2(50),
  email VARCHAR2(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  order_id NUMBER PRIMARY KEY,
  customer_id NUMBER REFERENCES customers(customer_id),
  total DECIMAL(10,2),
  status VARCHAR2(20),
  order_date TIMESTAMP
);`}
        </CodeBlock>

        <p><strong>Documento MongoDB (Embedding):</strong></p>
        <CodeBlock language="json" showLineNumbers title="customers.json">
{`{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan.perez@example.com",
  "createdAt": ISODate("2025-01-15T10:30:00Z"),
  "orders": [
    {
      "orderId": 1001,
      "total": 150.50,
      "status": "completed",
      "orderDate": ISODate("2025-01-20T14:30:00Z")
    },
    {
      "orderId": 1002,
      "total": 89.99,
      "status": "pending",
      "orderDate": ISODate("2025-01-22T09:15:00Z")
    }
  ],
  "totalOrders": 2,
  "lifetimeValue": 240.49
}`}
        </CodeBlock>

        <h3>2. Conexión a MongoDB Atlas</h3>

        <CodeBlock language="javascript" showLineNumbers title="db/connection.js">
{`const { MongoClient } = require('mongodb');

// Connection string desde variable de entorno
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 60000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

async function connectDB() {
  try {
    await client.connect();

    // Test connection
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Conectado a MongoDB Atlas');

    return client.db('production');
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    process.exit(1);
  }
}

module.exports = { connectDB };`}
        </CodeBlock>

        <h3>3. Migración de Datos con Python</h3>

        <CodeBlock language="python" showLineNumbers title="migration/oracle_to_mongo.py">
{`import oracledb
from pymongo import MongoClient
from datetime import datetime
import os

# Conexión Oracle
oracle_conn = oracledb.connect(
    user=os.getenv('ORACLE_USER'),
    password=os.getenv('ORACLE_PASS'),
    dsn=os.getenv('ORACLE_DSN')
)

# Conexión MongoDB
mongo_client = MongoClient(os.getenv('MONGODB_URI'))
db = mongo_client['production']

def migrate_customers():
    """Migra customers con sus orders embebidos"""

    oracle_cursor = oracle_conn.cursor()

    # Query Oracle con JOIN
    query = """
        SELECT
            c.customer_id, c.first_name, c.last_name,
            c.email, c.created_at,
            o.order_id, o.total, o.status, o.order_date
        FROM customers c
        LEFT JOIN orders o ON c.customer_id = o.customer_id
        ORDER BY c.customer_id, o.order_date DESC
    """

    oracle_cursor.execute(query)

    current_customer = None
    customer_doc = None
    batch = []

    for row in oracle_cursor:
        customer_id = row[0]

        # Nuevo cliente
        if customer_id != current_customer:
            # Insertar el anterior si existe
            if customer_doc:
                batch.append(customer_doc)

            # Iniciar nuevo documento
            customer_doc = {
                '_id': customer_id,
                'firstName': row[1],
                'lastName': row[2],
                'email': row[3],
                'createdAt': row[4],
                'orders': [],
                'totalOrders': 0,
                'lifetimeValue': 0.0
            }
            current_customer = customer_id

        # Agregar order si existe
        if row[5]:  # order_id
            order = {
                'orderId': row[5],
                'total': float(row[6]),
                'status': row[7],
                'orderDate': row[8]
            }
            customer_doc['orders'].append(order)
            customer_doc['totalOrders'] += 1
            customer_doc['lifetimeValue'] += order['total']

        # Batch insert cada 1000 documentos
        if len(batch) >= 1000:
            db.customers.insert_many(batch)
            print(f"✅ Migrados {len(batch)} customers")
            batch = []

    # Insertar últimos documentos
    if customer_doc:
        batch.append(customer_doc)
    if batch:
        db.customers.insert_many(batch)
        print(f"✅ Migrados {len(batch)} customers (final)")

    oracle_cursor.close()
    print("🎉 Migración completada!")

if __name__ == '__main__':
    migrate_customers()`}
        </CodeBlock>

        <h3>4. Queries Optimizados en MongoDB</h3>

        <CodeBlock language="javascript" showLineNumbers title="queries/customers.js">
{`// Query 1: Buscar customer por email
async function findCustomerByEmail(email) {
  return await db.collection('customers').findOne(
    { email: email },
    { projection: { orders: 0 } }  // Excluir orders si no son necesarios
  );
}

// Índice recomendado:
// db.customers.createIndex({ email: 1 }, { unique: true })

// Query 2: Top 10 customers por lifetime value
async function getTopCustomers() {
  return await db.collection('customers')
    .find()
    .sort({ lifetimeValue: -1 })
    .limit(10)
    .project({
      firstName: 1,
      lastName: 1,
      email: 1,
      lifetimeValue: 1,
      totalOrders: 1
    })
    .toArray();
}

// Índice recomendado:
// db.customers.createIndex({ lifetimeValue: -1 })

// Query 3: Aggregate - Revenue por mes
async function getMonthlyRevenue(year) {
  return await db.collection('customers').aggregate([
    { $unwind: '$orders' },
    {
      $match: {
        'orders.orderDate': {
          $gte: new Date(\`\${year}-01-01\`),
          $lt: new Date(\`\${year + 1}-01-01\`)
        }
      }
    },
    {
      $group: {
        _id: {
          month: { $month: '$orders.orderDate' },
          year: { $year: '$orders.orderDate' }
        },
        totalRevenue: { $sum: '$orders.total' },
        orderCount: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]).toArray();
}`}
        </CodeBlock>
      </section>

      {/* ============================================ */}
      {/* PLAN DE IMPLEMENTACIÓN */}
      {/* ============================================ */}
      <section className="implementation-plan">
        <h2>🗓️ Plan de Implementación (6 semanas)</h2>

        <h3>Fase 1: Preparación (Semana 1-2)</h3>
        <ol>
          <li>
            <strong>Crear cluster MongoDB Atlas</strong>
            <ul>
              <li>Configurar M30 en AWS us-east-1</li>
              <li>Habilitar VPC Peering</li>
              <li>Configurar usuarios y roles</li>
            </ul>
          </li>
          <li>
            <strong>Análisis de esquema Oracle</strong>
            <ul>
              <li>Documentar todas las tablas</li>
              <li>Identificar relaciones</li>
              <li>Decidir estrategia: embedding vs referencing</li>
            </ul>
          </li>
          <li>
            <strong>Desarrollar scripts de migración</strong>
            <ul>
              <li>Script Python para ETL</li>
              <li>Validaciones de integridad</li>
              <li>Rollback plan</li>
            </ul>
          </li>
        </ol>

        <h3>Fase 2: Migración Inicial (Semana 3-4)</h3>
        <ol>
          <li>
            <strong>Migración de datos históricos</strong>
            <ul>
              <li>Exportar datos de Oracle</li>
              <li>Transformar e importar a MongoDB</li>
              <li>Validar integridad (checksums)</li>
            </ul>
          </li>
          <li>
            <strong>Crear índices optimizados</strong>
            <ul>
              <li>Índices single-field</li>
              <li>Índices compuestos según queries</li>
              <li>Verificar con explain()</li>
            </ul>
          </li>
          <li>
            <strong>Configurar sincronización dual-write</strong>
            <ul>
              <li>Modificar aplicación para escribir en ambas DBs</li>
              <li>Validar consistencia</li>
            </ul>
          </li>
        </ol>

        <h3>Fase 3: Testing (Semana 5)</h3>
        <ol>
          <li>
            <strong>Pruebas de performance</strong>
            <ul>
              <li>Load testing con JMeter</li>
              <li>Comparar latencias vs Oracle</li>
              <li>Validar queries complejos</li>
            </ul>
          </li>
          <li>
            <strong>Pruebas de failover</strong>
            <ul>
              <li>Simular caída de nodo primario</li>
              <li>Verificar elección automática</li>
              <li>Tiempo de recuperación</li>
            </ul>
          </li>
        </ol>

        <h3>Fase 4: Go-Live (Semana 6)</h3>
        <ol>
          <li>
            <strong>Cutover en horario valle</strong> (Domingo 2AM)
            <ul>
              <li>Detener escrituras en Oracle</li>
              <li>Sincronización final de datos</li>
              <li>Switch de aplicación a MongoDB</li>
            </ul>
          </li>
          <li>
            <strong>Monitoreo intensivo 24/7</strong>
            <ul>
              <li>Alertas en Slack</li>
              <li>On-call engineer</li>
              <li>Rollback plan ready</li>
            </ul>
          </li>
          <li>
            <strong>Mantener Oracle read-only por 2 semanas</strong>
            <ul>
              <li>Backup de seguridad</li>
              <li>Comparación de datos</li>
              <li>Decommission después de validación</li>
            </ul>
          </li>
        </ol>
      </section>

      {/* ============================================ */}
      {/* PRÓXIMOS PASOS */}
      {/* ============================================ */}
      <section className="next-steps">
        <h2>🚀 Próximos Pasos</h2>
        <ol>
          <li>
            <strong>Esta semana:</strong> Revisión y aprobación de esta propuesta
          </li>
          <li>
            <strong>Próxima semana:</strong> Kick-off técnico y creación de cluster Atlas
          </li>
          <li>
            <strong>Semana 3:</strong> Inicio de desarrollo de scripts de migración
          </li>
          <li>
            <strong>Semanal:</strong> Reunión de status cada viernes 10AM
          </li>
        </ol>
      </section>

      {/* ============================================ */}
      {/* CONTACTO */}
      {/* ============================================ */}
      <section className="contact">
        <h2>📞 Contacto y Soporte</h2>
        <p>
          Para cualquier duda o consulta técnica:
        </p>
        <ul>
          <li>
            <strong>Leo Alarcón</strong> - Solutions Architect MongoDB<br />
            📧 <a href="mailto:leo.alarcon@mongodb.com">leo.alarcon@mongodb.com</a>
          </li>
          <li>
            <strong>MongoDB Support 24/7:</strong>{' '}
            <a href="https://support.mongodb.com" target="_blank" rel="noopener noreferrer">
              support.mongodb.com
            </a>
          </li>
          <li>
            <strong>Documentación:</strong>{' '}
            <a href="https://docs.mongodb.com" target="_blank" rel="noopener noreferrer">
              docs.mongodb.com
            </a>
          </li>
        </ul>
      </section>

    </ClientDocumentLayout>
  )
}

export default DocumentoEjemplo
