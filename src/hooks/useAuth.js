import { useState, useEffect } from 'react'
import { validateAccessCode, hasClientCode } from '../constants/accessCodes'

/**
 * Custom hook for managing access control
 *
 * Handles:
 * - Checking if user has access to client content
 * - Validating access codes
 * - Storing/retrieving codes from localStorage
 * - Master code detection for MongoDB users
 *
 * @param {string} client - Client name (e.g., 'bancolombia', 'yape')
 * @returns {Object} { hasAccess, validateCode, clearAccess, hasMasterAccess }
 *
 * @example
 * const { hasAccess, validateCode } = useAuth('bancolombia')
 *
 * if (!hasAccess) {
 *   return <AccessModal onSubmit={validateCode} />
 * }
 */
export const useAuth = (client) => {
  const [hasAccess, setHasAccess] = useState(false)
  const [hasMasterAccess, setHasMasterAccess] = useState(false)

  /**
   * Check if user has access on component mount
   */
  useEffect(() => {
    checkAccess()
  }, [client])

  /**
   * Check if user has stored access code
   */
  const checkAccess = () => {
    // Check if this client requires protection
    if (!hasClientCode(client)) {
      // Public content (like demo)
      setHasAccess(true)
      return
    }

    try {
      // Check for master code first (MongoDB universal access)
      const masterCode = localStorage.getItem('access_mongodb_master')
      if (masterCode && validateAccessCode('mongodb', masterCode)) {
        setHasAccess(true)
        setHasMasterAccess(true)
        return
      }

      // Check for client-specific code
      const clientCode = localStorage.getItem(`access_${client}`)
      if (clientCode && validateAccessCode(client, clientCode)) {
        setHasAccess(true)
        return
      }

      // No valid code found
      setHasAccess(false)
    } catch (error) {
      console.error('Error checking access:', error)
      setHasAccess(false)
    }
  }

  /**
   * Validate and store access code
   * @param {string} code - Access code to validate
   * @returns {boolean} True if code is valid
   */
  const validateCode = (code) => {
    if (!code) return false

    // Validate the code
    const isValid = validateAccessCode(client, code)

    if (isValid) {
      try {
        // Check if it's the master code
        if (code === 'MDB-MASTER-2025') {
          localStorage.setItem('access_mongodb_master', code)
          setHasMasterAccess(true)
        } else {
          // Store client-specific code
          localStorage.setItem(`access_${client}`, code)
        }

        setHasAccess(true)
        return true
      } catch (error) {
        console.error('Error storing access code:', error)
        return false
      }
    }

    return false
  }

  /**
   * Clear access for current client
   * Useful for testing or logout
   */
  const clearAccess = () => {
    try {
      localStorage.removeItem(`access_${client}`)
      localStorage.removeItem('access_mongodb_master')
      setHasAccess(false)
      setHasMasterAccess(false)
    } catch (error) {
      console.error('Error clearing access:', error)
    }
  }

  /**
   * Get stored code for debugging (dev only)
   * @returns {string|null}
   */
  const getStoredCode = () => {
    if (process.env.NODE_ENV !== 'development') return null

    try {
      const masterCode = localStorage.getItem('access_mongodb_master')
      if (masterCode) return `Master: ${masterCode}`

      const clientCode = localStorage.getItem(`access_${client}`)
      if (clientCode) return `Client: ${clientCode}`

      return null
    } catch (error) {
      return null
    }
  }

  return {
    hasAccess,
    hasMasterAccess,
    validateCode,
    clearAccess,
    checkAccess,
    getStoredCode
  }
}
