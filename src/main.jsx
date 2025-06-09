import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoMDBLanding from './components/gomdblanding';
import DocumentMongo from './pages/Clientes/cencosud/document-mongo';
import './styles/gomdb-global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GoMDBLanding />} />
        <Route path="/clientes/cencosud/document-mongo" element={<DocumentMongo />} />
        {/* aquí puedes seguir agregando más rutas según tus páginas */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);