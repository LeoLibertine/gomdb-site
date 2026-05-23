import { getDb } from './mongodb.js'

/**
 * Atomically generates the next sequence number for a given counter.
 * Uses MongoDB's findOneAndUpdate with $inc for guaranteed uniqueness
 * even under concurrent writes.
 *
 * @param {string} counterName - The counter identifier (e.g., "clientes")
 * @returns {Promise<number>} The next sequence number
 */
export async function getNextSequence(counterName) {
  const db = await getDb()
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: counterName },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: 'after' }
  )
  return result.seq
}
