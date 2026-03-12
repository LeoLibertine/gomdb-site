import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Lock, LogOut, Compass } from 'lucide-react';
import { useAuthUser } from '../../hooks/useAuthUser';
import './GlobalNavbar.css';

const navLinks = [
  { to: '/', label: 'Inicio', description: 'Pagina principal' },
  { to: '/demo', label: 'Demos', description: 'Demos interactivas' },
  { to: '/cosmica', label: 'Cosmica', description: 'Cosmica DB' },
];

const GlobalNavbar = ({ sections = [] }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthUser();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`global-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img
            src="/mongodb-logo.svg"
            alt="GoMDB"
            className="logo-img"
          />
          <span className="brand-badge">Internal</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-desktop">
          <div className="nav-links-group">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/clientes"
              className={`nav-link ${isActive('/clientes') ? 'active' : ''}`}
            >
              <Lock size={12} />
              Clientes
            </Link>

            {/* Dropdown for sections on homepage */}
            {isHome && sections.length > 0 && (
              <div className="nav-dropdown">
                <button className="nav-dropdown-trigger">
                  <Compass size={14} />
                  Explorar
                  <ChevronDown size={14} />
                </button>
                <div className="nav-dropdown-menu">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="dropdown-item"
                      >
                        <span className="dropdown-icon-wrap" style={{ '--accent': section.color }}>
                          <Icon size={16} />
                        </span>
                        <span className="dropdown-text">
                          <span className="dropdown-label">{section.title}</span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Auth */}
          <div className="nav-auth">
            {isAuthenticated ? (
              <button onClick={logout} className="nav-btn nav-btn-logout">
                <LogOut size={14} />
                Salir
              </button>
            ) : (
              <Link to="/login" className="nav-btn nav-btn-login">
                Acceder
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-inner">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="mobile-link">
                {link.label}
              </Link>
            ))}
            <Link to="/clientes" className="mobile-link">
              <Lock size={14} />
              Clientes
            </Link>

            <div className="mobile-divider" />

            {isAuthenticated ? (
              <button onClick={logout} className="mobile-link mobile-logout">
                <LogOut size={14} />
                Cerrar Sesion
              </button>
            ) : (
              <Link to="/login" className="mobile-link mobile-login">
                Acceder al Portal
              </Link>
            )}

            {isHome && sections.length > 0 && (
              <>
                <div className="mobile-section-label">Secciones</div>
                {sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className="mobile-link mobile-hash">
                    {section.title}
                  </a>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default GlobalNavbar;
