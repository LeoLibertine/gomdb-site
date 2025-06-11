import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GoMDBLanding from './components/gomdblanding';
import DocumentMongo from './pages/clientes/cencosud/document-mongo';
import BancolombiaDocument from './pages/clientes/bancolombia/document-mongo';
import NotFound from './components/NotFound';
import './styles/gomdb-global.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GoMDBLanding />} />
      <Route path="/clientes/cencosud/document-mongo" element={<DocumentMongo />} />
      <Route path="/clientes/bancolombia/document-mongo" element={<BancolombiaDocument />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;