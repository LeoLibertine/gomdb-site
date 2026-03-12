import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';
import './Login.css';

const UserIcon = () => (
  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, isLoading } = useAuthUser();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/clientes";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Ingresa tu usuario y contrasena.');
      return;
    }

    const { success, error: authError } = await login(username, password);

    if (success) {
      navigate(from, { replace: true });
    } else {
      setError(authError);
    }
  };

  return (
    <div className="login-page">
      {/* Background effects */}
      <div className="login-bg">
        <div className="login-bg-glow login-bg-glow-1" />
        <div className="login-bg-glow login-bg-glow-2" />
        <div className="login-bg-grid" />
      </div>

      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo-mark">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none"/>
              <path d="M11.66 21.09c0 0-.44-2.7-.26-5.5C5.24 14.39 6.77 7.02 11.46 1.05c.14-.18.57-.18.71 0 4.69 5.96 6.22 13.34.06 14.54.18 2.8-.24 5.5-.24 5.5-.03.28-.27.28-.33 0z" fill="#00ED64"/>
            </svg>
          </div>
          <h1 className="login-title">GoMDB Portal</h1>
          <p className="login-subtitle">Acceso interno para el equipo MongoDB</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="form-field">
            <label className="form-label" htmlFor="username">Usuario</label>
            <div className="input-wrap">
              <UserIcon />
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="tu_usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="password">Contrasena</label>
            <div className="input-wrap">
              <LockIcon />
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="login-submit" disabled={isLoading}>
            {isLoading ? <span className="spinner" /> : 'Ingresar'}
          </button>
        </form>

        <div className="login-footer">
          <Link to="/" className="login-back-link">Volver al inicio</Link>
          <span className="login-notice">Solo para uso interno de MongoDB</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
