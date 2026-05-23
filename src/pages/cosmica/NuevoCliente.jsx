import React from 'react'
import { Sparkles } from 'lucide-react'
import { ClientForm } from './components/ClientForm'
import { CosmicaNavbar } from './components/CosmicaNavbar'
import './styles/cosmica-theme.css'
import './components/ClientForm.css'

/**
 * Page: register a new client.
 */
const NuevoCliente = () => (
  <div className="cosmica-app">
    <div className="stars-bg" aria-hidden="true" />
    <CosmicaNavbar />
    <div className="cosmica-container">
      <div className="cosmica-page-header">
        <div>
          <h1 className="cosmica-page-title">
            <Sparkles size={24} style={{ verticalAlign: 'middle', marginRight: 8 }} />
            Nuevo cliente
          </h1>
          <p className="cosmica-page-subtitle">
            El número de cliente y la fecha se generan automáticamente al guardar.
          </p>
        </div>
      </div>

      <ClientForm mode="create" />
    </div>
  </div>
)

export default NuevoCliente
