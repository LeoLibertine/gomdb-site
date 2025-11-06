import React from 'react'
import { ClientDocumentLayout } from '@/components/layouts'
import { CodeBlock, MetricsCard } from '@/components/shared'

/**
 * TEMPLATE: Documento de Cliente
 *
 * INSTRUCCIONES DE USO:
 * 1. Copiar este archivo a: src/pages/clientes/[CLIENTE]/[nombre-documento].jsx
 * 2. Renombrar el componente (ej: ETBLicenciamiento)
 * 3. Actualizar los props del ClientDocumentLayout
 * 4. Reemplazar el contenido de ejemplo con tu contenido
 * 5. Eliminar estos comentarios de instrucciones
 *
 * EJEMPLO DE RUTA FINAL:
 * src/pages/clientes/etb/Licenciamiento.jsx
 */

export const ClientDocumentTemplate = () => {
  return (
    <ClientDocumentLayout
      client="NOMBRE_CLIENTE"  // ej: "ETB"
      title="Título del Documento"  // ej: "Guía de Licenciamiento MongoDB Atlas"
      subtitle="Subtítulo opcional"  // Opcional
      author="Leo Alarcón"  // Tu nombre
      date="2025-11-05"  // Formato YYYY-MM-DD
      tags={['mongodb', 'atlas', 'arquitectura']}  // Tags relevantes
      showExportButton={true}
    >

      {/* ============================================ */}
      {/* SECCIÓN 1: RESUMEN EJECUTIVO (OBLIGATORIO) */}
      {/* ============================================ */}
      <section className="executive-summary">
        <h2>📋 Resumen Ejecutivo</h2>
        <p>
          Descripción clara y concisa del propósito de este documento.
          Debe responder: ¿Qué? ¿Para quién? ¿Por qué?
        </p>
        <p>
          Ejemplo: "Este documento presenta la propuesta de arquitectura
          MongoDB Atlas para el proyecto X de ETB, con sizing recomendado,
          estimación de costos y plan de migración."
        </p>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 2: CONTEXTO DEL CLIENTE */}
      {/* ============================================ */}
      <section className="context">
        <h2>🏢 Contexto del Cliente</h2>

        <h3>Situación Actual</h3>
        <p>Describe la situación actual del cliente...</p>

        <MetricsCard
          title="Métricas Actuales"
          variant="info"
          metrics={[
            {
              label: 'Tamaño de Datos',
              value: '500',
              unit: 'GB',
              description: 'Total de datos en producción'
            },
            {
              label: 'Operaciones/seg',
              value: '10,000',
              trend: 'up',
              description: 'Pico en horas laborales'
            },
            {
              label: 'Usuarios Concurrentes',
              value: '5,000',
              description: 'Usuarios activos promedio'
            }
          ]}
        />

        <h3>Desafíos Identificados</h3>
        <ul>
          <li>Desafío 1: Descripción...</li>
          <li>Desafío 2: Descripción...</li>
          <li>Desafío 3: Descripción...</li>
        </ul>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 3: ARQUITECTURA PROPUESTA */}
      {/* ============================================ */}
      <section className="architecture">
        <h2>🏗️ Arquitectura Propuesta</h2>

        <h3>Diagrama de Arquitectura</h3>
        <figure>
          <img
            src="/img/clientes/nombre-cliente/diagrama-arquitectura.svg"
            alt="Diagrama de arquitectura propuesta"
            style={{ width: '100%', maxWidth: '800px', margin: '2rem auto', display: 'block' }}
          />
          <figcaption style={{ textAlign: 'center', color: 'var(--gray-600)', marginTop: '0.5rem' }}>
            Figura 1: Arquitectura MongoDB Atlas propuesta
          </figcaption>
        </figure>

        <h3>Componentes Principales</h3>
        <ul>
          <li><strong>MongoDB Atlas Cluster:</strong> M30 (8GB RAM, 40GB Storage)</li>
          <li><strong>Replica Set:</strong> 3 nodos (P-S-S)</li>
          <li><strong>Región:</strong> AWS us-east-1</li>
          <li><strong>Backup:</strong> Snapshots cada 6 horas</li>
        </ul>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 4: SIZING Y COSTOS */}
      {/* ============================================ */}
      <section className="sizing">
        <h2>💰 Sizing y Estimación de Costos</h2>

        <MetricsCard
          title="Configuración Recomendada"
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
              value: '40',
              unit: 'GB'
            },
            {
              label: 'Costo Mensual',
              value: '$580',
              unit: 'USD'
            }
          ]}
        />

        <h3>Desglose de Costos</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1rem 0' }}>
          <thead>
            <tr style={{ background: 'var(--gray-100)', borderBottom: '2px solid var(--mongodb-green)' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Concepto</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Costo Mensual</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)' }}>
                Cluster M30 (3 nodos)
              </td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)', textAlign: 'right' }}>
                $480 USD
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)' }}>
                Backups (40GB retention)
              </td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)', textAlign: 'right' }}>
                $80 USD
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)' }}>
                Data Transfer
              </td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--gray-200)', textAlign: 'right' }}>
                $20 USD
              </td>
            </tr>
            <tr style={{ fontWeight: 'bold', background: 'var(--gray-50)' }}>
              <td style={{ padding: '0.75rem' }}>TOTAL</td>
              <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--mongodb-purple)' }}>
                $580 USD
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 5: EJEMPLOS DE CÓDIGO */}
      {/* ============================================ */}
      <section className="code-examples">
        <h2>💻 Ejemplos de Implementación</h2>

        <h3>Conexión a MongoDB Atlas</h3>
        <CodeBlock
          language="javascript"
          title="connection.js"
          showLineNumbers
        >
{`const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  maxPoolSize: 10,
  wtimeoutMS: 2500,
  useNewUrlParser: true
});

async function connectDB() {
  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB Atlas');
    return client.db('nombre-db');
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    process.exit(1);
  }
}

module.exports = { connectDB };`}
        </CodeBlock>

        <h3>Ejemplo de Query Optimizado</h3>
        <CodeBlock
          language="javascript"
          title="queries.js"
          showLineNumbers
        >
{`// Query con índice compuesto
async function findUsersByCity(city) {
  return await db.collection('users').find({
    city: city,
    status: 'active'
  })
  .project({ name: 1, email: 1, _id: 0 })
  .limit(100)
  .toArray();
}

// Índice recomendado:
// db.users.createIndex({ city: 1, status: 1 })`}
        </CodeBlock>

        <h3>Ejemplo en Python</h3>
        <CodeBlock
          language="python"
          title="connection.py"
          showLineNumbers
        >
{`from pymongo import MongoClient
import os

def get_database():
    uri = os.getenv('MONGODB_URI')
    client = MongoClient(uri)

    # Verificar conexión
    client.admin.command('ping')
    print('✅ Conectado a MongoDB Atlas')

    return client['nombre-db']

# Uso
db = get_database()
users = db.users.find({'status': 'active'})`}
        </CodeBlock>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 6: MEJORES PRÁCTICAS */}
      {/* ============================================ */}
      <section className="best-practices">
        <h2>✨ Mejores Prácticas</h2>

        <h3>1. Modelado de Datos</h3>
        <ul>
          <li>✅ Usar embedding para datos que se consultan juntos</li>
          <li>✅ Usar referencias para relaciones many-to-many</li>
          <li>✅ Limitar el tamaño de arrays embebidos (máx 100-200 elementos)</li>
          <li>❌ Evitar documentos mayores a 2MB</li>
        </ul>

        <h3>2. Índices</h3>
        <ul>
          <li>✅ Crear índices para queries frecuentes</li>
          <li>✅ Usar índices compuestos (ESR Rule: Equality, Sort, Range)</li>
          <li>✅ Monitorear con db.collection.explain()</li>
          <li>❌ Evitar más de 5-6 índices por colección</li>
        </ul>

        <h3>3. Seguridad</h3>
        <ul>
          <li>✅ Usar IP Whitelisting</li>
          <li>✅ Habilitar autenticación SCRAM-SHA-256</li>
          <li>✅ Rotar credenciales regularmente</li>
          <li>✅ Usar MongoDB Connection String en variables de entorno</li>
        </ul>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 7: PLAN DE IMPLEMENTACIÓN */}
      {/* ============================================ */}
      <section className="implementation-plan">
        <h2>🗓️ Plan de Implementación</h2>

        <h3>Fase 1: Preparación (Semana 1-2)</h3>
        <ol>
          <li>Crear cluster MongoDB Atlas</li>
          <li>Configurar VPC peering / Private Link</li>
          <li>Configurar usuarios y permisos</li>
          <li>Implementar monitoreo (Alerts)</li>
        </ol>

        <h3>Fase 2: Migración (Semana 3-4)</h3>
        <ol>
          <li>Exportar datos desde sistema actual</li>
          <li>Importar a MongoDB Atlas (mongoimport/mongorestore)</li>
          <li>Validar integridad de datos</li>
          <li>Crear índices optimizados</li>
        </ol>

        <h3>Fase 3: Testing y Go-Live (Semana 5-6)</h3>
        <ol>
          <li>Pruebas de carga</li>
          <li>Pruebas de failover</li>
          <li>Go-live en horario valle</li>
          <li>Monitoreo intensivo 24/7 primera semana</li>
        </ol>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 8: PRÓXIMOS PASOS (OBLIGATORIO) */}
      {/* ============================================ */}
      <section className="next-steps">
        <h2>🚀 Próximos Pasos</h2>
        <ol>
          <li>
            <strong>Revisión de esta propuesta:</strong> Agendar reunión para
            discutir detalles y aclarar dudas
          </li>
          <li>
            <strong>Aprobación de presupuesto:</strong> Confirmar sizing y
            costos con equipo financiero
          </li>
          <li>
            <strong>Kick-off técnico:</strong> Iniciar fase 1 de implementación
          </li>
          <li>
            <strong>Seguimiento semanal:</strong> Reuniones de status cada viernes
          </li>
        </ol>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 9: CONTACTO Y SOPORTE */}
      {/* ============================================ */}
      <section className="contact">
        <h2>📞 Contacto y Soporte</h2>
        <p>
          Para dudas, comentarios o soporte técnico:
        </p>
        <ul>
          <li>
            <strong>Leo Alarcón</strong> - Solutions Architect<br />
            Email: <a href="mailto:leo.alarcon@mongodb.com">leo.alarcon@mongodb.com</a>
          </li>
          <li>
            <strong>MongoDB Support:</strong> <a href="https://support.mongodb.com" target="_blank" rel="noopener noreferrer">
              support.mongodb.com
            </a>
          </li>
          <li>
            <strong>Documentación:</strong> <a href="https://docs.mongodb.com" target="_blank" rel="noopener noreferrer">
              docs.mongodb.com
            </a>
          </li>
        </ul>
      </section>

    </ClientDocumentLayout>
  )
}

export default ClientDocumentTemplate
