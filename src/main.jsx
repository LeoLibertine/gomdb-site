// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import GoMDBLanding from './components/gomdblanding'  // o './pages/GomDBLanding'
import './styles/gomdb-global.css'                    // tus estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoMDBLanding />
  </React.StrictMode>
)