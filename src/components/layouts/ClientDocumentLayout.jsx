import React from 'react'
import PropTypes from 'prop-types'
import './ClientDocumentLayout.css'

/**
 * Layout estándar para documentos de cliente
 * Incluye: header, breadcrumbs, metadata, contenido y footer
 *
 * @param {string} client - Nombre del cliente (ej: "ETB", "Yape", "Cencosud")
 * @param {string} title - Título del documento
 * @param {string} subtitle - Subtítulo opcional
 * @param {string} author - Autor del documento (default: "Leo Alarcón")
 * @param {string} date - Fecha en formato YYYY-MM-DD
 * @param {Array<string>} tags - Tags para categorización
 * @param {boolean} showExportButton - Mostrar botón de exportar PDF
 * @param {ReactNode} children - Contenido del documento
 */
export const ClientDocumentLayout = ({
  client,
  title,
  subtitle,
  author = 'Leo Alarcón',
  date,
  tags = [],
  showExportButton = true,
  children
}) => {
  const handleExportPDF = () => {
    window.print()
  }

  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="client-document-layout">
      {/* Header con branding MongoDB */}
      <header className="document-header">
        <div className="header-content">
          <div className="brand">
            <img
              src="/img/mongodb-logo.svg"
              alt="MongoDB"
              className="mongodb-logo"
            />
            <span className="separator">|</span>
            <span className="client-name">{client}</span>
          </div>

          {showExportButton && (
            <button
              onClick={handleExportPDF}
              className="export-button"
              aria-label="Exportar a PDF"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Exportar PDF
            </button>
          )}
        </div>
      </header>

      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Inicio</a></li>
          <li><a href={`/clientes/${client.toLowerCase()}`}>{client}</a></li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>

      {/* Metadata Section */}
      <section className="document-metadata">
        <div className="title-section">
          <h1 className="document-title">{title}</h1>
          {subtitle && <p className="document-subtitle">{subtitle}</p>}
        </div>

        <div className="metadata-grid">
          <div className="metadata-item">
            <span className="metadata-label">Cliente:</span>
            <span className="metadata-value">{client}</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">Autor:</span>
            <span className="metadata-value">{author}</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">Fecha:</span>
            <span className="metadata-value">{formattedDate}</span>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Main Content */}
      <main className="document-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="document-footer">
        <div className="footer-content">
          <p>© 2025 MongoDB, Inc. - Información confidencial para {client}</p>
          <p className="footer-contact">
            Contacto: <a href="mailto:leo.alarcon@mongodb.com">leo.alarcon@mongodb.com</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

ClientDocumentLayout.propTypes = {
  client: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  showExportButton: PropTypes.bool,
  children: PropTypes.node.isRequired
}
