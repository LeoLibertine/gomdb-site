import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';

/**
 * ProtectedRoute - Wrapper para rutas privadas
 *
 * Protege contenido requiriendo una sesión activa.
 *
 * @param {ReactNode} children - Contenido a proteger
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirigir al login guardando la ruta intentada
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render protegido
  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};
