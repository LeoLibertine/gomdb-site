import { Routes, Route } from 'react-router-dom';
import GoMDBLanding from './components/gomdblanding';
import ClientesDirectory from './pages/clientes/ClientesDirectory';
import ClientContent from './pages/clientes/ClientContent';
import DocumentMongo from './pages/clientes/cencosud/document-mongo';
import BancolombiaDocument from './pages/clientes/bancolombia/document-mongo';
import { OrgChartAlvaroCarmona } from './pages/clientes/bancolombia/OrgChartAlvaroCarmona';
import { OrgChartFidelVargas } from './pages/clientes/bancolombia/OrgChartFidelVargas';
import { OrgChartFidelVargasNegocios } from './pages/clientes/bancolombia/OrgChartFidelVargasNegocios';
import DocumentoDemo from './pages/clientes/demo/DocumentoDemo';
import Cosmica from './pages/Cosmica';
import ArquitecturaDRP from './pages/clientes/bpd/ArquitecturaDRP';
import DRPHibrido from './pages/clientes/bpd/DRPHibrido';
import DRPFailback from './pages/clientes/bpd/DRPFailback';
import { SizingSuraPersonaUnica } from './pages/clientes/sura/SizingSuraPersonaUnica';
import { DesignReviewPersonaUnica } from './pages/clientes/sura/DesignReviewPersonaUnica';
import NotFound from './components/NotFound';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import GlobalNavbar from './components/shared/GlobalNavbar';
import Login from './pages/Login/Login';

// Extraemos layout styles compartidos
import './styles/gomdb-global.css';

// Usaremos las secciones exportables para la homepage menu
import { Layers, Cpu, Code2 } from 'lucide-react';

const homeSections = [
  { id: 'arquitectura', title: 'Arquitectura', color: '#00ED64', icon: Layers },
  { id: 'sizing', title: 'Sizing', color: '#5644D4', icon: Cpu },
  { id: 'demos', title: 'Demos', color: '#00A8E1', icon: Code2 },
];

function App() {
  return (
    <>
      {/* El Navbar vive fuera de las rutas para mostrarse siempre */}
      <GlobalNavbar sections={homeSections} />

      <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<GoMDBLanding />} />
          <Route path="/demo" element={<DocumentoDemo />} />
          <Route path="/clientes/demo/documento" element={<DocumentoDemo />} />
          <Route path="/cosmica" element={<Cosmica />} />
          <Route path="/login" element={<Login />} />

          {/* Clientes Directory - Protected */}
          <Route
            path="/clientes"
            element={
              <ProtectedRoute>
                <ClientesDirectory />
              </ProtectedRoute>
            }
          />

          {/* Client Content Pages - Protected */}
          <Route 
            path="/clientes/:clientId" 
            element={
              <ProtectedRoute>
                <ClientContent />
              </ProtectedRoute>
            } 
          />

          {/* Protected Client Document Routes */}
          <Route
            path="/clientes/cencosud/document-mongo"
            element={
              <ProtectedRoute>
                <DocumentMongo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes/bancolombia/document-mongo"
            element={
              <ProtectedRoute>
                <BancolombiaDocument />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes/bancolombia/orgchart-alvaro-carmona"
            element={
              <ProtectedRoute>
                <OrgChartAlvaroCarmona />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes/bancolombia/orgchart-fidel-vargas"
            element={
              <ProtectedRoute>
                <OrgChartFidelVargas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes/bancolombia/orgchart-fidel-vargas-negocios"
            element={
              <ProtectedRoute>
                <OrgChartFidelVargasNegocios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes/bpd/arquitectura-drp"
            element={
              <ProtectedRoute>
                <ArquitecturaDRP />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes/bpd/drp-hibrido"
            element={
              <ProtectedRoute>
                <DRPHibrido />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes/bpd/drp-failback"
            element={
              <ProtectedRoute>
                <DRPFailback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes/sura/sizing-persona-unica"
            element={
              <ProtectedRoute>
                <SizingSuraPersonaUnica />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes/sura/design-review-persona-unica"
            element={
              <ProtectedRoute>
                <DesignReviewPersonaUnica />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
