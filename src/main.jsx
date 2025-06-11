import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoMDBLanding from './components/gomdblanding';
import DocumentMongo from './pages/Clientes/cencosud/document-mongo';
import BancolombiaDocument from './pages/Clientes/bancolombia/document-mongo';
import './styles/gomdb-global.css';
import NotFound from './components/NotFound';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GoMDBLanding />} />
        <Route path="/clientes/cencosud/document-mongo" element={<DocumentMongo />} />
        <Route path="/clientes/bancolombia/document-mongo" element={<BancolombiaDocument />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);