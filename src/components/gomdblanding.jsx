import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Code2, 
  Layers, 
  Cpu, 
  BarChart3, 
  GitBranch, 
  Rocket, 
  Factory, 
  Trophy, 
  Users, 
  ArrowRight,
  ChevronDown,
  Sparkles,
  Shield,
  Zap,
  Globe,
  Menu,
  X,
  ExternalLink,
  CheckCircle,
  Star
} from 'lucide-react';

// Helper function para descripciones
const getSectionDescription = (sectionId) => {
  const descriptions = {
    'arquitectura': 'Patrones y mejores prácticas para diseñar soluciones escalables con MongoDB Atlas.',
    'sizing': 'Calculadoras y herramientas para dimensionar correctamente tu infraestructura.',
    'demos': 'Aplicaciones completas con código fuente para aprender implementaciones reales.',
    'matrices': 'Comparativas detalladas para elegir la mejor tecnología según tu caso de uso.',
    'landing-zone': 'Automatización completa para despliegues enterprise con IaC.',
    'modernization': 'Metodología probada para migrar aplicaciones legacy a MongoDB.',
    'casos-exito': 'Historias reales de transformación digital con MongoDB en LATAM.',
    'clientes': 'Empresas líderes que confían en nuestras arquitecturas MongoDB.'
  };
  return descriptions[sectionId] || '';
};

const GoMDBLanding = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(index);
        }
      });
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const sections = [
    { id: 'arquitectura', title: 'Arquitectura', icon: Layers, color: '#00ED64' },
    { id: 'sizing', title: 'Sizing', icon: Cpu, color: '#5644D4' },
    { id: 'demos', title: 'Demos', icon: Code2, color: '#00A8E1' },
    { id: 'matrices', title: 'Matrices de Tecnología', icon: GitBranch, color: '#F59E0B' },
    { id: 'landing-zone', title: 'Landing Zone', icon: Rocket, color: '#EF4444' },
    { id: 'modernization', title: 'Modernization Factory', icon: Factory, color: '#8B5CF6' },
    { id: 'casos-exito', title: 'Casos de Éxito', icon: Trophy, color: '#10B981' },
    { id: 'clientes', title: 'Clientes', icon: Users, color: '#EC4899' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#001E2B', color: '#FFFFFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      
      {/* Custom Styles */}
      <style jsx>{`
        @import url('./gomdb-global.css');
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #00ED64 0%, #5644D4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        .section-indicator {
          transition: all 0.3s ease;
        }
        
        .nav-blur {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .glow-effect {
          filter: drop-shadow(0 0 30px rgba(0, 237, 100, 0.5));
        }
        
        .parallax-bg {
          transform: translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px);
          transition: transform 0.1s ease-out;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled nav-blur' : ''}`}>
        <div className="container navbar-container">
          <div className="flex items-center gap-3">
            <div className="navbar-logo">
            <img 
                src="/mongodb-logo.svg" 
                alt="gomDB Logo" 
                style={{ width: '200px', height: '200px' }}
                className="glow-effect"
                />
              
            </div>
            <span className="badge badge-secondary" style={{ fontSize: '11px', padding: '2px 8px' }}>
              No oficial
            </span>
          </div>
          
          <div className="navbar-links" style={{ display: 'none' }}>
            {sections.slice(0, 5).map((section, index) => (
              <a 
                key={section.id}
                href={`#${section.id}`} 
                className="navbar-link"
                style={{
                  color: activeSection === index ? '#00ED64' : '#B8C4CE',
                  borderBottom: activeSection === index ? '2px solid #00ED64' : 'none',
                  paddingBottom: '4px',
                  fontSize: '0.95rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {section.title}
              </a>
            ))}
            <div style={{ position: 'relative' }}>
              <button 
                className="navbar-link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#B8C4CE'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
                onMouseLeave={(e) => {
                  setTimeout(() => {
                    if (!e.currentTarget.nextElementSibling.matches(':hover')) {
                      e.currentTarget.nextElementSibling.style.display = 'none';
                    }
                  }, 100);
                }}
              >
                Más
                <ChevronDown size={16} />
              </button>
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: 'rgba(0, 30, 43, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '8px',
                  minWidth: '200px',
                  display: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.display = 'block'}
                onMouseLeave={(e) => e.currentTarget.style.display = 'none'}
              >
                {sections.slice(5).map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      color: '#B8C4CE',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                      fontSize: '0.95rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0,237,100,0.1)';
                      e.currentTarget.style.color = '#00ED64';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#B8C4CE';
                    }}
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Desktop Menu - Visible */}
          <div style={{ 
            display: window.innerWidth > 768 ? 'flex' : 'none',
            gap: '24px',
            alignItems: 'center'
          }}>
            {sections.slice(0, 5).map((section, index) => (
              <a 
                key={section.id}
                href={`#${section.id}`} 
                className="navbar-link"
                style={{
                  color: activeSection === index ? '#00ED64' : '#B8C4CE',
                  borderBottom: activeSection === index ? '2px solid #00ED64' : 'none',
                  paddingBottom: '4px',
                  fontSize: '0.95rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {section.title}
              </a>
            ))}
            <div style={{ position: 'relative' }}>
              <button 
                className="navbar-link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#B8C4CE',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,237,100,0.1)';
                  e.currentTarget.style.color = '#00ED64';
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#B8C4CE';
                  setTimeout(() => {
                    if (!e.currentTarget.nextElementSibling.matches(':hover')) {
                      e.currentTarget.nextElementSibling.style.display = 'none';
                    }
                  }, 100);
                }}
              >
                Más
                <ChevronDown size={16} />
              </button>
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '12px',
                  background: 'rgba(0, 30, 43, 0.98)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '8px',
                  minWidth: '220px',
                  display: 'none',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  zIndex: 1000
                }}
                onMouseEnter={(e) => e.currentTarget.style.display = 'block'}
                onMouseLeave={(e) => e.currentTarget.style.display = 'none'}
              >
                {sections.slice(5).map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        color: '#B8C4CE',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        transition: 'all 0.2s',
                        fontSize: '0.95rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0,237,100,0.1)';
                        e.currentTarget.style.color = '#00ED64';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#B8C4CE';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <Icon size={18} style={{ color: section.color }} />
                      {section.title}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            style={{ 
              display: window.innerWidth <= 768 ? 'block' : 'none',
              background: 'none', 
              border: 'none', 
              color: '#FFF', 
              cursor: 'pointer',
              padding: '8px'
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(0, 30, 43, 0.98)',
            backdropFilter: 'blur(16px)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '16px',
            zIndex: 1000
          }}>
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    color: activeSection === index ? '#00ED64' : '#B8C4CE',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    marginBottom: '4px',
                    backgroundColor: activeSection === index ? 'rgba(0,237,100,0.1)' : 'transparent'
                  }}
                >
                  <Icon size={20} style={{ color: section.color }} />
                  {section.title}
                </a>
              );
            })}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-background"></div>
        <div className="hero-blur hero-blur-primary parallax-bg"></div>
        <div className="hero-blur hero-blur-accent parallax-bg" style={{ left: 'auto', right: '10%' }}></div>
        
        {/* Floating MongoDB Shapes */}
        <div className="floating-element" style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          opacity: 0.1
        }}>
          <Database size={120} />
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="animate-fadeIn">
            <div className="badge badge-primary mb-4" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} />
              <span>Arquitectura MongoDB para LATAM</span>
            </div>
            
            <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: '800', lineHeight: 1.1 }}>
              Diseña el futuro con
              <br />
              <span className="gradient-text">MongoDB Atlas</span>
            </h1>
            
            <p className="mb-6" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: '#B8C4CE', maxWidth: '800px' }}>
              Portal especializado en arquitectura empresarial MongoDB. 
              Recursos, herramientas y mejores prácticas adaptadas al contexto latinoamericano.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <button className="btn btn-primary btn-lg" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Explorar Arquitecturas
                <ArrowRight size={20} />
              </button>
              <button className="btn btn-secondary btn-lg">
                Ver Demos en Vivo
              </button>
            </div>
            
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} color="#00ED64" />
                <span style={{ color: '#B8C4CE' }}>100% en Español</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} color="#00ED64" />
                <span style={{ color: '#B8C4CE' }}>Casos Reales LATAM</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} color="#00ED64" />
                <span style={{ color: '#B8C4CE' }}>Código Abierto</span>
              </div>
            </div>
          </div>
          
          <div className="text-center" style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)' }}>
            <ChevronDown className="animate-pulse" size={32} color="#00ED64" />
          </div>
        </div>
      </section>

      {/* Secciones Overview */}
      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <div className="text-center mb-6">
            <h2 className="mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '700' }}>
              Todo lo que necesitas para <span className="gradient-text">arquitectura MongoDB</span>
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#B8C4CE', maxWidth: '800px', margin: '0 auto' }}>
              Herramientas profesionales y recursos especializados para diseñar, implementar y optimizar soluciones MongoDB en producción.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="card card-gradient card-hover"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    border: '1px solid rgba(255,255,255,0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '200px',
                    height: '200px',
                    background: section.color,
                    opacity: 0.1,
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                  }}></div>
                  
                  <div className="flex items-start gap-4" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: `linear-gradient(135deg, ${section.color}20, ${section.color}40)`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={28} color={section.color} />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h3 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                        {section.title}
                      </h3>
                      <p style={{ color: '#B8C4CE', marginBottom: '16px' }}>
                        {getSectionDescription(section.id)}
                      </p>
                      <span className="inline-flex items-center gap-2" style={{ color: section.color, fontWeight: '500' }}>
                        Explorar
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Arquitectura Section */}
      <section id="arquitectura" className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-5 items-center">
            <div className="animate-slideInLeft">
              <span className="badge badge-primary mb-4" style={{ display: 'inline-flex' }}>
                <Layers size={16} />
                <span>Arquitectura</span>
              </span>
              <h2 className="mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '700' }}>
                Patrones de arquitectura <span className="gradient-text">probados en producción</span>
              </h2>
              <p className="mb-6" style={{ fontSize: '1.125rem', color: '#B8C4CE' }}>
                Diseños de referencia validados en implementaciones reales de MongoDB Atlas en empresas latinoamericanas. 
                Desde microservicios hasta event-driven architecture.
              </p>
              
              <div className="grid gap-4 mb-6">
                {[
                  { title: 'Microservicios', desc: 'Patrones para aplicaciones distribuidas' },
                  { title: 'Event Sourcing', desc: 'Arquitecturas basadas en eventos' },
                  { title: 'CQRS', desc: 'Separación de comandos y consultas' },
                  { title: 'Multi-Cloud', desc: 'Estrategias híbridas y multi-nube' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle size={20} color="#00ED64" style={{ marginTop: '2px' }} />
                    <div>
                      <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>{item.title}</h4>
                      <p style={{ color: '#B8C4CE', fontSize: '0.875rem' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="btn btn-primary">
                Ver Catálogo de Arquitecturas
                <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="animate-slideInRight" style={{ position: 'relative' }}>
              <div style={{
                background: 'linear-gradient(135deg, #0D2A3D, #001E2B)',
                borderRadius: '24px',
                padding: '48px',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-20%',
                  right: '-20%',
                  width: '200px',
                  height: '200px',
                  background: '#00ED64',
                  opacity: 0.1,
                  borderRadius: '50%',
                  filter: 'blur(60px)'
                }}></div>
                
                {/* Architecture Diagram Placeholder */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} style={{
                        height: '80px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Database size={24} color="#00ED64" />
                      </div>
                    ))}
                  </div>
                  
                  <div style={{
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(0,237,100,0.1), rgba(86,68,212,0.1))',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                  }}>
                    <div className="text-center">
                      <Globe size={32} color="#00ED64" className="mb-2" />
                      <p style={{ fontWeight: '600' }}>MongoDB Atlas</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    {['API', 'Cache', 'Queue'].map((label) => (
                      <div key={label} style={{
                        padding: '12px 24px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sizing Section */}
      <section id="sizing" className="section" style={{ background: 'linear-gradient(180deg, #001E2B 0%, #0D2A3D 100%)' }}>
        <div className="container">
          <div className="text-center mb-6">
            <span className="badge badge-primary mb-4" style={{ display: 'inline-flex' }}>
              <Cpu size={16} />
              <span>Sizing</span>
            </span>
            <h2 className="mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '700' }}>
              Calcula el tamaño perfecto para tu <span className="gradient-text">cluster MongoDB</span>
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#B8C4CE', maxWidth: '800px', margin: '0 auto' }}>
              Herramientas interactivas para dimensionar correctamente tu infraestructura MongoDB basadas en cargas reales de trabajo.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Zap,
                title: 'Performance Calculator',
                desc: 'Estima IOPS, throughput y latencia esperada',
                metrics: ['100K ops/sec', '< 10ms p99', '99.99% uptime']
              },
              {
                icon: Database,
                title: 'Storage Estimator',
                desc: 'Calcula almacenamiento y crecimiento proyectado',
                metrics: ['Compresión', 'Índices', 'Backup']
              },
              {
                icon: Shield,
                title: 'Cost Optimizer',
                desc: 'Optimiza costos con recomendaciones inteligentes',
                metrics: ['Auto-scaling', 'Reserved', 'Spot']
              }
            ].map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div key={idx} className="card card-bordered card-hover" style={{
                  background: 'rgba(13,42,61,0.3)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #00ED64, #00D757)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px'
                  }}>
                    <Icon size={36} color="#001E2B" />
                  </div>
                  
                  <h3 className="mb-3" style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                    {tool.title}
                  </h3>
                  <p className="mb-4" style={{ color: '#B8C4CE' }}>
                    {tool.desc}
                  </p>
                  
                  <div className="flex justify-center gap-3 flex-wrap mb-4">
                    {tool.metrics.map((metric, i) => (
                      <span key={i} className="badge badge-secondary" style={{ fontSize: '0.75rem' }}>
                        {metric}
                      </span>
                    ))}
                  </div>
                  
                  <button className="btn btn-ghost btn-sm">
                    Usar herramienta
                    <ExternalLink size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demos Section */}
      <section id="demos" className="section">
        <div className="container">
          <div className="text-center mb-6">
            <span className="badge badge-primary mb-4" style={{ display: 'inline-flex' }}>
              <Code2 size={16} />
              <span>Demos</span>
            </span>
            <h2 className="mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '700' }}>
              Demos interactivas con <span className="gradient-text">código real</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: 'E-commerce con MongoDB',
                tags: ['Node.js', 'React', 'Atlas Search'],
                stars: 245,
                desc: 'Aplicación completa de comercio electrónico con búsqueda facetada, carrito y checkout.'
              },
              {
                title: 'Real-time Analytics Dashboard',
                tags: ['Python', 'Charts', 'Time Series'],
                stars: 189,
                desc: 'Dashboard de analytics en tiempo real usando MongoDB Time Series Collections.'
              },
              {
                title: 'IoT Data Pipeline',
                tags: ['Kafka', 'Atlas', 'Stream Processing'],
                stars: 156,
                desc: 'Pipeline de procesamiento de datos IoT con MongoDB Atlas y Apache Kafka.'
              },
              {
                title: 'Multi-tenant SaaS',
                tags: ['Java', 'Spring Boot', 'Sharding'],
                stars: 203,
                desc: 'Arquitectura multi-tenant escalable con estrategias de sharding.'
              }
            ].map((demo, idx) => (
              <div key={idx} className="card card-bordered card-hover" style={{
                background: 'rgba(13,42,61,0.3)'
              }}>
                <div className="flex justify-between items-start mb-4">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                    {demo.title}
                  </h3>
                  <div className="flex items-center gap-1" style={{ color: '#F59E0B' }}>
                    <Star size={16} fill="#F59E0B" />
                    <span style={{ fontSize: '0.875rem' }}>{demo.stars}</span>
                  </div>
                </div>
                
                <p className="mb-4" style={{ color: '#B8C4CE' }}>
                  {demo.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {demo.tags.map((tag, i) => (
                    <span key={i} style={{
                      padding: '4px 12px',
                      background: 'rgba(0,237,100,0.1)',
                      border: '1px solid rgba(0,237,100,0.3)',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      color: '#00ED64'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <button className="btn btn-primary btn-sm">
                    Ver Demo
                  </button>
                  <button className="btn btn-ghost btn-sm">
                    <Code2 size={16} />
                    Código
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #001E2B 0%, #0D2A3D 100%)' }}>
        <div className="container">
          <div className="grid md:grid-cols-4 gap-5 text-center">
            {[
              { value: '500+', label: 'Arquitecturas documentadas' },
              { value: '2.5M', label: 'Documentos procesados/día' },
              { value: '150+', label: 'Empresas LATAM' },
              { value: '24/7', label: 'Soporte comunitario' }
            ].map((stat, idx) => (
              <div key={idx} className="animate-fadeIn" style={{ animationDelay: `${idx * 100}ms` }}>
                <h3 className="metric-value" style={{ fontSize: '3rem', marginBottom: '8px' }}>
                  {stat.value}
                </h3>
                <p style={{ color: '#B8C4CE' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card" style={{
            background: 'linear-gradient(135deg, #00ED64 0%, #00D757 100%)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-10%',
              width: '300px',
              height: '300px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%'
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 className="mb-4" style={{ 
                fontSize: 'clamp(2rem, 5vw, 3rem)', 
                fontWeight: '700',
                color: '#001E2B'
              }}>
                Únete a la comunidad de arquitectos MongoDB
              </h2>
              <p className="mb-6" style={{ 
                fontSize: '1.25rem', 
                color: '#001E2B',
                maxWidth: '600px',
                margin: '0 auto 32px'
              }}>
                Accede a recursos exclusivos, participa en eventos y conecta con expertos MongoDB en Latinoamérica.
              </p>
              <button className="btn btn-lg" style={{
                background: '#001E2B',
                color: '#00ED64',
                border: 'none'
              }}>
                Comenzar ahora - Es gratis
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#001E2B',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '48px 0 24px'
      }}>
        <div className="container">
          <div className="grid md:grid-cols-4 gap-5 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Database size={24} color="#00ED64" />
                <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>goMDB</span>
              </div>
              <p style={{ color: '#B8C4CE', fontSize: '0.875rem' }}>
                Portal no oficial de arquitectura MongoDB para la comunidad latinoamericana.
              </p>
            </div>
            
            {[
              {
                title: 'Recursos',
                links: ['Arquitecturas', 'Sizing Tools', 'Demos', 'Blog']
              },
              {
                title: 'Comunidad',
                links: ['Discord', 'GitHub', 'Twitter', 'YouTube']
              },
              {
                title: 'Legal',
                links: ['Términos', 'Privacidad', 'No afiliado a MongoDB Inc.']
              }
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="mb-4" style={{ fontWeight: '600' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {col.links.map((link, i) => (
                    <li key={i} className="mb-2">
                      <a href="#" className="navbar-link" style={{ fontSize: '0.875rem' }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '24px',
            textAlign: 'center',
            color: '#718096',
            fontSize: '0.875rem'
          }}>
            © 2024 gomDB. Hecho con 💚 para la comunidad LATAM. MongoDB es marca registrada de MongoDB, Inc.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GoMDBLanding;