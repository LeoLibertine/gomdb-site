import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || 'cosmica'

if (!uri) {
  throw new Error('MONGODB_URI is not defined in environment variables')
}

let cached = global._mongoClientPromise

if (!cached) {
  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000
  })
  cached = global._mongoClientPromise = client.connect()
}

/**
 * Returns the MongoDB client (cached singleton across serverless invocations)
 * @returns {Promise<MongoClient>}
 */
export async function getClient() {
  return cached
}

/**
 * Returns the cosmica database instance
 * @returns {Promise<import('mongodb').Db>}
 */
export async function getDb() {
  const client = await cached
  return client.db(dbName)
}

/**
 * Returns a specific collection from the cosmica database
 * @param {string} name - Collection name
 * @returns {Promise<import('mongodb').Collection>}
 */
export async function getCollection(name) {
  const db = await getDb()
  return db.collection(name)
}

/**
 * Ensures all required indexes exist (idempotent, safe to call repeatedly)
 */
export async function ensureIndexes() {
  const db = await getDb()
  await Promise.all([
    db.collection('clientes').createIndex({ numero_cliente: 1 }, { unique: true }),
    db.collection('clientes').createIndex({ telefono_principal: 1 }, { unique: true }),
    db.collection('clientes').createIndex({ vendedor: 1 }),
    db.collection('clientes').createIndex({ estado: 1 }),
    db.collection('clientes').createIndex({ fecha_registro: -1 }),
    db.collection('vendedores').createIndex({ nombre: 1 }, { unique: true }),
    db.collection('vendedores').createIndex({ activo: 1, orden: 1 }),
    db.collection('giros').createIndex({ nombre: 1 }, { unique: true }),
    db.collection('giros').createIndex({ activo: 1, orden: 1 }),
    db.collection('tipos_cliente').createIndex({ nombre: 1 }, { unique: true }),
    db.collection('tipos_cliente').createIndex({ activo: 1, orden: 1 })
  ])
}
