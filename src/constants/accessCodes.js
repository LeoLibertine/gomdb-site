/**
 * Access Codes for Client Documents
 *
 * SECURITY: These codes protect all content under /clientes/[cliente]/
 *
 * Usage:
 * - One code per client grants access to ALL their documents
 * - MongoDB master code grants universal access
 * - Codes are stored in browser localStorage (permanent)
 * - Share codes via secure channel (WhatsApp, Email) separate from document link
 *
 * To add new client:
 * 1. Add entry: 'clientname': 'CODE2025'
 * 2. Create documents under /clientes/clientname/
 * 3. Test with new code
 * 4. Share code with client
 *
 * To rotate code:
 * 1. Update code here
 * 2. Deploy
 * 3. Notify client of new code
 */

export const ACCESS_CODES = {
  // Active Clients (13) - Códigos sofisticados con hash SHA-like format
  'bancolombia': 'BCO-7k9m2Lx4Pq-2025',
  'yape': 'YAPE-3n8Hw5Zt6Vr-2024',
  'cencosud': 'CEN-9Qw4Js7Km2Fx-2025',
  'etb': 'ETB-6Hx3Mn9Rp5Tw-2025',
  'kushki': 'KUSH-2Lp8Xv4Qn7Js-2025',
  'segurosbolivar': 'SEG-5Zt9Km3Vx8Lw-2025',
  'payway': 'PAY-4Np7Qr2Xt5Mw-2025',
  'bpd': 'BPD-8Lm3Zv6Qx9Kp-2025',
  'coppel': 'COP-7Xw5Mn4Rt8Lp-2025',
  'falape': 'FAL-3Qv9Kx2Np7Tm-2025',
  'bintec': 'BIN-6Lw4Zt8Mx3Vp-2025',

  // MongoDB Internal (Master Code - Universal Access)
  'mongodb': 'MDB-MASTER-2025',

  // Demo (Public - No protection)
  'demo': null  // Demo content is public
}

/**
 * Get all client names (excluding internal)
 * @returns {string[]} Array of client names
 */
export const getClientNames = () => {
  return Object.keys(ACCESS_CODES).filter(
    client => client !== 'mongodb' && client !== 'demo'
  )
}

/**
 * Check if a client code exists
 * @param {string} client - Client name
 * @returns {boolean}
 */
export const hasClientCode = (client) => {
  return ACCESS_CODES.hasOwnProperty(client) && ACCESS_CODES[client] !== null
}

/**
 * Validate access code for a client
 * @param {string} client - Client name
 * @param {string} code - Access code to validate
 * @returns {boolean} True if code is valid
 */
export const validateAccessCode = (client, code) => {
  if (!code || !client) return false

  // Check if it's the master code
  if (code === ACCESS_CODES['mongodb']) {
    return true
  }

  // Check if it's the client's code
  return ACCESS_CODES[client] === code
}
