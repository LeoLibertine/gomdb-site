import { useState, useEffect } from 'react';

// Credenciales mockeadas para el directorio interno
// En un entorno de producción, esto debería validar contra el backend en server/index.js
const INTERNAL_USER = 'mongodb_internal';
const INTERNAL_PASS = 'MongoDB2026!';

export const useAuthUser = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    try {
      const session = localStorage.getItem('gomdb_session');
      if (session === 'active') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking session:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    setIsLoading(true);
    
    // Simulate network delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (username === INTERNAL_USER && password === INTERNAL_PASS) {
      localStorage.setItem('gomdb_session', 'active');
      setIsAuthenticated(true);
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Credenciales inválidas. Por favor contacta al administrador.' };
  };

  const logout = () => {
    localStorage.removeItem('gomdb_session');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkSession
  };
};
