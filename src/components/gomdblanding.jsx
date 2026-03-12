import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  Code2,
  Layers,
  Cpu,
  GitBranch,
  Rocket,
  Factory,
  Trophy,
  Users,
  ArrowRight,
  ChevronDown,
  Shield,
  Zap,
  Globe,
  ExternalLink,
  Star,
  BookOpen,
  Lightbulb,
  Target
} from 'lucide-react';

const sections = [
  {
    id: 'arquitectura',
    title: 'Arquitectura',
    icon: Layers,
    color: '#00ED64',
    description: 'Patrones y mejores practicas para disenar soluciones escalables con MongoDB Atlas.'
  },
  {
    id: 'sizing',
    title: 'Sizing & Performance',
    icon: Cpu,
    color: '#5644D4',
    description: 'Calculadoras y herramientas para dimensionar correctamente tu infraestructura.'
  },
  {
    id: 'demos',
    title: 'Demos Interactivas',
    icon: Code2,
    color: '#00A8E1',
    description: 'Aplicaciones completas con codigo fuente para aprender implementaciones reales.'
  },
  {
    id: 'matrices',
    title: 'Matrices de Tecnologia',
    icon: GitBranch,
    color: '#F59E0B',
    description: 'Comparativas detalladas para elegir la mejor tecnologia segun tu caso de uso.'
  },
  {
    id: 'landing-zone',
    title: 'Landing Zone',
    icon: Rocket,
    color: '#EF4444',
    description: 'Automatizacion completa para despliegues enterprise con Infrastructure as Code.'
  },
  {
    id: 'modernization',
    title: 'Modernization Factory',
    icon: Factory,
    color: '#8B5CF6',
    description: 'Metodologia probada para migrar aplicaciones legacy a MongoDB.'
  },
  {
    id: 'casos-exito',
    title: 'Casos de Exito',
    icon: Trophy,
    color: '#10B981',
    description: 'Historias reales de transformacion digital con MongoDB en LATAM.'
  },
  {
    id: 'clientes',
    title: 'Portal de Clientes',
    icon: Users,
    color: '#EC4899',
    description: 'Documentacion tecnica, propuestas y casos de uso por cliente.'
  }
];

const GoMDBLanding = () => {
  useEffect(() => {
    // Scroll listener for potential future use
    const handleScroll = () => {};
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#001E2B', color: '#F9FAFB', fontFamily: 'Inter, -apple-system, sans-serif' }}>

      {/* ====== HERO ====== */}
      <section className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div className="hero-background" />
        <div className="hero-blur hero-blur-primary" />
        <div className="hero-blur hero-blur-accent" style={{ left: 'auto', right: '5%' }} />

        {/* Subtle grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
          <div className="animate-fadeIn" style={{ textAlign: 'center' }}>
            <div className="badge badge-primary mb-4" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Database size={14} />
              <span>MongoDB Architecture Portal</span>
            </div>

            <h1 className="mb-4" style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em'
            }}>
              Recursos de arquitectura para el equipo
              <span className="text-gradient" style={{ display: 'block', marginTop: '4px' }}>MongoDB LATAM</span>
            </h1>

            <p className="mb-6" style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#94A3B8',
              maxWidth: '640px',
              margin: '0 auto 2rem',
              lineHeight: 1.7
            }}>
              Portal interno con documentacion tecnica, herramientas de sizing, demos y contenido especializado para arquitectos de soluciones.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/clientes" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
                Portal de Clientes
                <ArrowRight size={18} />
              </Link>
              <a href="#secciones" className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>
                Explorar Secciones
              </a>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
          <ChevronDown className="animate-pulse" size={24} color="#64748B" />
        </div>
      </section>

      {/* ====== SECTIONS DIRECTORY ====== */}
      <section id="secciones" className="section-lg" style={{ background: 'linear-gradient(180deg, #001E2B 0%, #0A2E3F 100%)' }}>
        <div className="container">
          <div className="text-center mb-8">
            <span className="badge badge-primary mb-4" style={{ display: 'inline-flex', gap: '6px' }}>
              <BookOpen size={14} />
              <span>Directorio de Recursos</span>
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Todo lo que necesitas, organizado
            </h2>
            <p style={{ color: '#94A3B8', maxWidth: '560px', margin: '0 auto', fontSize: '1.05rem' }}>
              Navega por las diferentes secciones del portal. Cada seccion tiene recursos especializados para tu trabajo.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '16px',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isClientes = section.id === 'clientes';
              return (
                <a
                  key={section.id}
                  href={isClientes ? '/clientes' : `#${section.id}`}
                  className="card card-hover"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    gap: '16px',
                    padding: '20px',
                    alignItems: 'flex-start',
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: `${section.color}12`,
                    border: `1px solid ${section.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s'
                  }}>
                    <Icon size={20} color={section.color} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      marginBottom: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {section.title}
                      <ArrowRight size={14} style={{ color: '#64748B', transition: 'transform 0.2s' }} />
                    </h3>
                    <p style={{ color: '#94A3B8', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
                      {section.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== ARCHITECTURE ====== */}
      <section id="arquitectura" className="section-lg">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div>
              <span className="badge badge-primary mb-4" style={{ display: 'inline-flex', gap: '6px' }}>
                <Layers size={14} />
                <span>Arquitectura</span>
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Patrones probados en produccion
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Disenos de referencia validados en implementaciones reales de MongoDB Atlas en empresas latinoamericanas.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0 32px' }}>
                {[
                  { icon: Target, title: 'Microservicios', desc: 'Patrones para aplicaciones distribuidas' },
                  { icon: Zap, title: 'Event Sourcing', desc: 'Arquitecturas basadas en eventos' },
                  { icon: Lightbulb, title: 'CQRS', desc: 'Separacion de comandos y consultas' },
                  { icon: Globe, title: 'Multi-Cloud', desc: 'Estrategias hibridas y multi-nube' }
                ].map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'rgba(0, 237, 100, 0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <ItemIcon size={16} color="#00ED64" />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '2px' }}>{item.title}</h4>
                        <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link to="/clientes" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                Ver Arquitecturas
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Architecture Visual */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(10, 46, 63, 0.6), rgba(0, 30, 43, 0.8))',
              borderRadius: '20px',
              padding: '40px',
              border: '1px solid rgba(255,255,255,0.06)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: '-30%', right: '-20%',
                width: '200px', height: '200px',
                background: '#00ED64', opacity: 0.04,
                borderRadius: '50%', filter: 'blur(80px)'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  {['App A', 'App B', 'App C'].map((label) => (
                    <div key={label} style={{
                      height: '60px',
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', color: '#64748B', fontWeight: 500
                    }}>
                      {label}
                    </div>
                  ))}
                </div>

                <div style={{
                  height: '80px',
                  background: 'linear-gradient(135deg, rgba(0,237,100,0.06), rgba(86,68,212,0.04))',
                  borderRadius: '12px',
                  border: '1px solid rgba(0,237,100,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', marginBottom: '16px'
                }}>
                  <Database size={24} color="#00ED64" />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>MongoDB Atlas</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                  {['API Gateway', 'Cache Layer', 'Message Queue'].map((label) => (
                    <div key={label} style={{
                      padding: '10px', flex: 1,
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '8px', textAlign: 'center',
                      fontSize: '0.7rem', color: '#64748B', fontWeight: 500
                    }}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SIZING ====== */}
      <section id="sizing" className="section-lg" style={{ background: 'linear-gradient(180deg, #001E2B 0%, #0A2E3F 50%, #001E2B 100%)' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="text-center mb-8">
            <span className="badge badge-primary mb-4" style={{ display: 'inline-flex', gap: '6px' }}>
              <Cpu size={14} />
              <span>Sizing</span>
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Dimensiona tu cluster con precision
            </h2>
            <p style={{ color: '#94A3B8', maxWidth: '560px', margin: '0 auto', fontSize: '1.05rem' }}>
              Herramientas interactivas basadas en cargas reales de trabajo en produccion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Zap, title: 'Performance Calculator',
                desc: 'Estima IOPS, throughput y latencia esperada para tu workload.',
                tags: ['100K ops/sec', '< 10ms p99', '99.99% uptime']
              },
              {
                icon: Database, title: 'Storage Estimator',
                desc: 'Calcula almacenamiento y crecimiento proyectado con compresion.',
                tags: ['Compresion', 'Indices', 'Backup']
              },
              {
                icon: Shield, title: 'Cost Optimizer',
                desc: 'Optimiza costos con recomendaciones inteligentes de tier.',
                tags: ['Auto-scaling', 'Reserved', 'Spot']
              }
            ].map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div key={idx} className="card card-hover" style={{ textAlign: 'center', padding: '32px 24px' }}>
                  <div style={{
                    width: '56px', height: '56px',
                    background: 'linear-gradient(135deg, #00ED64, #00A846)',
                    borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 4px 16px rgba(0, 237, 100, 0.2)'
                  }}>
                    <Icon size={24} color="#001E2B" />
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>
                    {tool.title}
                  </h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '16px' }}>
                    {tool.desc}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {tool.tags.map((tag, i) => (
                      <span key={i} className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="btn btn-ghost btn-sm">
                    Usar herramienta
                    <ExternalLink size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== DEMOS ====== */}
      <section id="demos" className="section-lg">
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="text-center mb-8">
            <span className="badge badge-primary mb-4" style={{ display: 'inline-flex', gap: '6px' }}>
              <Code2 size={14} />
              <span>Demos</span>
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Demos con codigo real
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'E-commerce con MongoDB',
                tags: ['Node.js', 'React', 'Atlas Search'],
                stars: 245,
                desc: 'Aplicacion completa de comercio electronico con busqueda facetada.'
              },
              {
                title: 'Real-time Analytics',
                tags: ['Python', 'Charts', 'Time Series'],
                stars: 189,
                desc: 'Dashboard de analytics en tiempo real usando Time Series Collections.'
              },
              {
                title: 'IoT Data Pipeline',
                tags: ['Kafka', 'Atlas', 'Streams'],
                stars: 156,
                desc: 'Pipeline de procesamiento de datos IoT con Apache Kafka.'
              },
              {
                title: 'Multi-tenant SaaS',
                tags: ['Java', 'Spring Boot', 'Sharding'],
                stars: 203,
                desc: 'Arquitectura multi-tenant escalable con estrategias de sharding.'
              }
            ].map((demo, idx) => (
              <div key={idx} className="card card-hover" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{demo.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B', flexShrink: 0, marginLeft: '12px' }}>
                    <Star size={14} fill="#F59E0B" />
                    <span style={{ fontSize: '0.8rem' }}>{demo.stars}</span>
                  </div>
                </div>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem', marginBottom: '12px' }}>{demo.desc}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {demo.tags.map((tag, i) => (
                    <span key={i} style={{
                      padding: '3px 10px', fontSize: '0.7rem', fontWeight: 500,
                      background: 'rgba(0,237,100,0.06)',
                      border: '1px solid rgba(0,237,100,0.15)',
                      borderRadius: '6px', color: '#00ED64'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-primary btn-sm">Ver Demo</button>
                  <button className="btn btn-ghost btn-sm">
                    <Code2 size={14} />
                    Codigo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #001E2B 0%, #0A2E3F 100%)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="grid md:grid-cols-4 gap-5 text-center">
            {[
              { value: '500+', label: 'Arquitecturas documentadas' },
              { value: '2.5M', label: 'Docs procesados/dia' },
              { value: '150+', label: 'Empresas LATAM' },
              { value: '24/7', label: 'Soporte comunitario' }
            ].map((stat, idx) => (
              <div key={idx} className="metric">
                <div className="metric-value" style={{ fontSize: '2.5rem' }}>{stat.value}</div>
                <div className="metric-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, #00ED64, #00A846)',
            borderRadius: '20px',
            padding: 'clamp(32px, 5vw, 56px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', top: '-40%', right: '-5%',
              width: '300px', height: '300px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                fontWeight: 700, color: '#001E2B',
                letterSpacing: '-0.02em', marginBottom: '12px'
              }}>
                Accede al portal completo
              </h2>
              <p style={{
                fontSize: '1.05rem', color: 'rgba(0, 30, 43, 0.7)',
                maxWidth: '480px', margin: '0 auto 24px'
              }}>
                Documentacion tecnica, propuestas comerciales y recursos exclusivos para el equipo MongoDB.
              </p>
              <Link to="/login" className="btn btn-lg" style={{
                background: '#001E2B', color: '#00ED64',
                border: 'none', textDecoration: 'none'
              }}>
                Iniciar sesion
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 0 32px'
      }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '32px',
            marginBottom: '32px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Database size={20} color="#00ED64" />
                <span style={{ fontSize: '1rem', fontWeight: 700 }}>goMDB</span>
              </div>
              <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.6 }}>
                Portal interno de arquitectura MongoDB para el equipo LATAM.
              </p>
            </div>

            {[
              { title: 'Recursos', links: ['Arquitecturas', 'Sizing Tools', 'Demos', 'Matrices'] },
              { title: 'Portal', links: ['Clientes', 'Documentos', 'Propuestas'] },
              { title: 'Info', links: ['Uso interno', 'No afiliado a MongoDB Inc.'] }
            ].map((col, idx) => (
              <div key={idx}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', marginBottom: '12px' }}>
                  {col.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {col.links.map((link, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{link}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '20px',
            textAlign: 'center',
            color: '#475569',
            fontSize: '0.75rem'
          }}>
            2024 goMDB &mdash; Portal interno. MongoDB es marca registrada de MongoDB, Inc.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GoMDBLanding;
