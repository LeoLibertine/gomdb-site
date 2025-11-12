import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GoMDBLanding from './components/gomdblanding';
import ClientesDirectory from './pages/clientes/ClientesDirectory';
import ClientContent from './pages/clientes/ClientContent';
import DocumentMongo from './pages/clientes/cencosud/document-mongo';
import BancolombiaDocument from './pages/clientes/bancolombia/document-mongo';
import { OrgChartAlvaroCarmona } from './pages/clientes/bancolombia/OrgChartAlvaroCarmona';
import { OrgChartFidelVargas } from './pages/clientes/bancolombia/OrgChartFidelVargas';
import DocumentoDemo from './pages/clientes/demo/DocumentoDemo';
import Cosmica from './pages/Cosmica';
import ArquitecturaDRP from './pages/clientes/bdp/ArquitecturaDRP';
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
      <Route path="/cosmica" element={<Cosmica />} />

      {/* Clientes Directory - Public (list of clients) */}
      <Route path="/clientes" element={<ClientesDirectory />} />

      {/* Client Content Pages - Protected internally by client ID */}
      <Route path="/clientes/:clientId" element={<ClientContent />} />

      {/* Protected Client Document Routes */}
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
      <Route
        path="/clientes/bancolombia/orgchart-fidel-vargas"
        element={
          <ProtectedRoute client="bancolombia">
            <OrgChartFidelVargas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clientes/bdp/arquitectura-drp"
        element={
          <ProtectedRoute client="bdp">
            <ArquitecturaDRP />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
