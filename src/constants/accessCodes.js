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
  // Active Clients (13)
  'bancolombia': 'BCO2025',
  'yape': 'YAPE2024',
  'cencosud': 'CEN2025',
  'etb': 'ETB2025',
  'kushki': 'KUSH2025',
  'segurosbolivar': 'SEG2025',
  'payway': 'PAY2025',
  'bdp': 'BDP2025',
  'coppel': 'COP2025',
  'falape': 'FAL2025',
  'bintec': 'BIN2025',

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
