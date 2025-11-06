import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './CodeBlock.css'

/**
 * Componente para mostrar bloques de código con syntax highlighting
 * y funcionalidad de copiar al portapapeles
 *
 * @param {string} children - Código a mostrar
 * @param {string} language - Lenguaje de programación (js, python, bash, json, etc.)
 * @param {boolean} showLineNumbers - Mostrar números de línea
 * @param {string} title - Título opcional del bloque
 * @param {boolean} copyable - Permitir copiar código
 */
export const CodeBlock = ({
  children,
  language = 'javascript',
  showLineNumbers = false,
  title,
  copyable = true
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  const lines = children.split('\n')

  return (
    <div className="code-block-container">
      {/* Header */}
      <div className="code-block-header">
        <div className="code-block-info">
          <span className="code-language">{language}</span>
          {title && <span className="code-title">{title}</span>}
        </div>

        {copyable && (
          <button
            onClick={handleCopy}
            className="copy-button"
            aria-label="Copiar código"
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copiado!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copiar
              </>
            )}
          </button>
        )}
      </div>

      {/* Code Content */}
      <pre className={`code-block ${showLineNumbers ? 'with-line-numbers' : ''}`}>
        <code className={`language-${language}`}>
          {showLineNumbers ? (
            <table>
              <tbody>
                {lines.map((line, index) => (
                  <tr key={index}>
                    <td className="line-number">{index + 1}</td>
                    <td className="line-content">{line || '\n'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            children
          )}
        </code>
      </pre>
    </div>
  )
}

CodeBlock.propTypes = {
  children: PropTypes.string.isRequired,
  language: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  title: PropTypes.string,
  copyable: PropTypes.bool
}
