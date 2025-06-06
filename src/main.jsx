// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'

// Importa el componente correcto:
import EscenarioOptimizacion from './pages/Clientes/SegurosBolivar/EscenarioOptimizacion.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<App />} />

        {/* Ruta para el componente EscenarioOptimizacion */}
        <Route
          path="/clientes/segurosbolivar/escenarioOptimizacion"
          element={<EscenarioOptimizacion />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)