import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GoMDBLanding from './components/gomdblanding';
import DocumentMongo from './pages/Clientes/cencosud/document-mongo';
import BancolombiaDocument from './pages/Clientes/Bancolombia/document-mongo';
import { OrgChartAlvaroCarmona } from './pages/clientes/bancolombia/OrgChartAlvaroCarmona';
import DocumentoDemo from './pages/clientes/demo/DocumentoDemo';
import NotFound from './components/NotFound';
import { ProtectedRoute } from './components/auth';
import './styles/gomdb-global.css';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<GoMDBLanding />} />
      <Route path="/demo" element={<DocumentoDemo />} />
      <Route path="/clientes/demo/documento" element={<DocumentoDemo />} />

      {/* Protected Client Routes */}
      <Route
        path="/clientes/cencosud/document-mongo"
        element={
          <ProtectedRoute client="cencosud">
            <DocumentMongo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clientes/bancolombia/document-mongo"
        element={
          <ProtectedRoute client="bancolombia">
            <BancolombiaDocument />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clientes/bancolombia/orgchart-alvaro-carmona"
        element={
          <ProtectedRoute client="bancolombia">
            <OrgChartAlvaroCarmona />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
