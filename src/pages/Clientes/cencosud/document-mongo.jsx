import React, { useState, useEffect } from 'react';
import '../../../styles/gomdb-global.css';
import { 
  Database, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ChevronRight,
  Filter,
  BarChart3,
  Zap,
  Shield,
  DollarSign,
  Users,
  Cloud,
  Settings,
  TrendingUp,
  Award,
  ArrowRight,
  Sparkles,
  HelpCircle,
  RefreshCw,
  Star,
  Search,
  Tool,
  Code,
  Clock,
  GitBranch,
  
} from 'lucide-react';

// Helper para estilizar la recomendación según MongoDB vs DocumentDB
const getRecommendationStyle = (recommendation) => {
    const color = recommendation === 'MongoDB' ? '#00ED64' : '#FF9900';
    return {
      background: `linear-gradient(135deg, ${color}20, ${color}10)`,
      border: `2px solid ${color}`,
      borderRadius: '12px',
      padding: '16px',
    };
  };

const CencosudDecisionMatrix = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [animatedScore, setAnimatedScore] = useState({ mongodb: 0, documentdb: 0 });
  
  // Datos para el diagrama de radar
  const radarData = [
    { label: 'Compatibilidad', mongodb: 5, documentdb: 2 },
    { label: 'Agregaciones', mongodb: 5, documentdb: 2 },
    { label: 'Transacciones', mongodb: 5, documentdb: 1 },
    { label: 'Rendimiento', mongodb: 5, documentdb: 3 },
    { label: 'Gestión', mongodb: 2, documentdb: 5 },
    { label: 'Costos', mongodb: 3, documentdb: 4 },
    { label: 'Integración AWS', mongodb: 2, documentdb: 5 },
    { label: 'Escalabilidad', mongodb: 3, documentdb: 5 }
  ];
  
  // Calcular puntuación promedio
  const calculateAverageScore = (db) => {
    const sum = radarData.reduce((acc, item) => acc + item[db], 0);
    return sum / radarData.length;
  };
  
  
  
  // ------------------
  // 2. Sustituye tu `comparisonData` por este:
  // ------------------
  const comparisonData = [
    {
      id: 1,
      category: 'compatibility',
      question: '¿Tu aplicación requiere compatibilidad total con la API de MongoDB 8.0 y futuras versiones?',
      documentdb: 'Compatibilidad parcial hasta v3.6/4.0/5.0; nuevas features tardan en llegar.',
      mongodb: 'Compatibilidad completa con API actual y roadmap garantizado.',
      recommendation: 'MongoDB',
      importance: 'alta',
      icon: Database
    },
    {
      id: 2,
      category: 'performance',
      question: '¿Necesitas pipelines de agregación complejos ($lookup, $merge, stages personalizadas)?',
      documentdb: 'Soporte limitado a etapas básicas; no soporta $merge ni JS en el pipeline.',
      mongodb: 'Soporte completo de pipelines avanzados, stages personalizados y optimizaciones automáticas.',
      recommendation: 'MongoDB',
      importance: 'alta',
      icon: BarChart3
    },
    {
      id: 3,
      category: 'transactions',
      question: '¿Son críticas las transacciones ACID multi-documento?',
      documentdb: 'No soporta transacciones ACID fuera de una sola partición.',
      mongodb: 'Transacciones completas ACID entre múltiples documentos y colecciones desde v4.0.',
      recommendation: 'MongoDB',
      importance: 'crítica',
      icon: Shield
    },
    {
      id: 4,
      category: 'performance',
      question: '¿Buscas un motor de ejecución nativo y optimizado (C++ con cache interno)?',
      documentdb: 'Backend emulado, sin optimizaciones nativas.',
      mongodb: 'Motor nativo en C++ con caching, locking fino y optimización de I/O.',
      recommendation: 'MongoDB',
      importance: 'media',
      icon: Zap
    },
    {
      id: 5,
      category: 'scalability',
      question: '¿Requieres sharding horizontal transparente para escalar a petabytes?',
      documentdb: 'Escalado vertical únicamente; no hay sharding distribuido.',
      mongodb: 'Sharding automático nativo con balanceo de carga y auto-healing.',
      recommendation: 'MongoDB',
      importance: 'alta',
      icon: TrendingUp
    },
    {
      id: 6,
      category: 'availability',
      question: '¿Necesitas replicación y failover multirregional con baja latencia?',
      documentdb: 'Réplicas de lectura solo dentro de una misma región (AZs).',
      mongodb: 'Clusters globales Atlas con lectura/escritura en múltiples regiones.',
      recommendation: 'MongoDB',
      importance: 'alta',
      icon: Cloud
    },
    {
      id: 7,
      category: 'governance',
      question: '¿Tu proyecto requiere validación de esquema y controles de cambios?',
      documentdb: 'No soporta validadores avanzados.',
      mongodb: 'Validación con JSON Schema, versionado de esquemas y auditoría.',
      recommendation: 'MongoDB',
      importance: 'media',
      icon: Settings
    },
    {
      id: 8,
      category: 'indexes',
      question: '¿Necesitas índices de texto, geoespaciales, wildcard y TTL?',
      documentdb: 'Solo índices de campo y compuesto básicos.',
      mongodb: 'Índices de texto completo, geo-, wildcard, TTL y compuestos múltiples.',
      recommendation: 'MongoDB',
      importance: 'alta',
      icon: BarChart3
    },
    {
      id: 9,
      category: 'search',
      question: '¿Requieres búsqueda de texto completo con scoring, facetas y sugerencias?',
      documentdb: 'Sin motor de búsqueda integrado.',
      mongodb: 'Atlas Search (Lucene): relevancia, facetas, autocomplete y más.',
      recommendation: 'MongoDB',
      importance: 'alta',
      icon: Search
    },
    {
      id: 10,
      category: 'tools',
      question: '¿Valoras herramientas gráficas y SDKs robustos para tu equipo?',
      documentdb: 'Herramientas limitadas y sin UI especializada.',
      mongodb: 'Compass, Charts, mongosh, Realm SDKs, Integraciones CI/CD.',
      recommendation: 'MongoDB',
      importance: 'media',
      icon: Tool
    },
    {
      id: 11,
      category: 'drivers',
      question: '¿Necesitas drivers oficiales actualizados para múltiples lenguajes?',
      documentdb: 'Drivers MongoDB con restrictions y delays.',
      mongodb: 'Drivers nativos, actualizaciones regulares y certificación de compatibilidad.',
      recommendation: 'MongoDB',
      importance: 'alta',
      icon: Code
    },
    {
      id: 12,
      category: 'security',
      question: '¿Requieres cifrado en reposo, TLS y encriptación a nivel de campo?',
      documentdb: 'Cifrado KMS y TLS; no hay cifrado de campo ni DLS avanzado.',
      mongodb: 'AES-256 en reposo, TLS, Queryable Encryption y RBAC granular.',
      recommendation: 'MongoDB',
      importance: 'crítica',
      icon: Shield
    },
    {
      id: 13,
      category: 'lifecycle',
      question: '¿Necesitas políticas automáticas de TTL, archivado y retención?',
      documentdb: 'TTL limitado; archivado manual bajo demanda.',
      mongodb: 'TTL, Online Archive, Atlas Data Lake y políticas de retención basadas en etiquetas.',
      recommendation: 'MongoDB',
      importance: 'media',
      icon: Clock
    },
    {
      id: 14,
      category: 'portability',
      question: '¿Importa que sea open source y portable on-premise o multi-cloud?',
      documentdb: 'Vendor lock-in dentro de AWS.',
      mongodb: 'Open source, ejecutable on-premise, multi-cloud y edge.',
      recommendation: 'MongoDB',
      importance: 'media',
      icon: GitBranch
    },
    {
      id: 15,
      category: 'cost',
      question: '¿Buscas optimizar costos y TCO con modelos flexibles?',
      documentdb: 'Costos elevados por instancias y almacenamiento provisionado.',
      mongodb: 'Modele consumo en Atlas, instancias reservadas y optimización de I/O.',
      recommendation: 'MongoDB',
      importance: 'alta',
      icon: DollarSign
    }
  ];

  const categories = [
  { id: 'all',            name: 'Todos',               color: '#00ED64' },
  { id: 'compatibility',  name: 'Compatibilidad',      color: '#5644D4' },
  { id: 'performance',    name: 'Rendimiento',         color: '#F59E0B' },
  { id: 'transactions',   name: 'Transacciones',       color: '#EF4444' },
  { id: 'scalability',    name: 'Escalabilidad',       color: '#8B5CF6' },
  { id: 'availability',   name: 'Alta Disponibilidad', color: '#3B82F6' },
  { id: 'governance',     name: 'Gobernanza',          color: '#10B981' },
  { id: 'indexes',        name: 'Índices',             color: '#EF4444' },
  { id: 'search',         name: 'Búsqueda',            color: '#EAB308' },
  { id: 'tools',          name: 'Herramientas',        color: '#6366F1' },
  { id: 'drivers',        name: 'Drivers',             color: '#1D4ED8' },
  { id: 'security',       name: 'Seguridad',           color: '#EF4444' },
  { id: 'lifecycle',      name: 'Ciclo de Vida',       color: '#10B981' },
  { id: 'portability',    name: 'Portabilidad',        color: '#8B5CF6' },
  { id: 'cost',           name: 'Costos y TCO',        color: '#EC4899' }
];

  const filteredData = activeFilter === 'all' 
    ? comparisonData 
    : comparisonData.filter(item => item.category === activeFilter);

  // Calcular puntuaciones
  useEffect(() => {
    const mongoScore = comparisonData.filter(item => item.recommendation === 'MongoDB').length;
    const docScore = comparisonData.filter(item => item.recommendation === 'DocumentDB').length;
    
    // Animación de puntuaciones
    const animateScores = () => {
      let currentMongo = 0;
      let currentDoc = 0;
      const interval = setInterval(() => {
        if (currentMongo < mongoScore) currentMongo++;
        if (currentDoc < docScore) currentDoc++;
        
        setAnimatedScore({ mongodb: currentMongo, documentdb: currentDoc });
        
        if (currentMongo >= mongoScore && currentDoc >= docScore) {
          clearInterval(interval);
        }
      }, 200);
    };
    
    animateScores();
  }, []);

  const getImportanceColor = (importance) => {
    switch(importance) {
      case 'crítica': return '#EF4444';
      case 'alta': return '#F59E0B';
      case 'media': return '#00ED64';
      default: return '#00ED64';
    }
  };

  // Componente del Cuestionario
  const QuizSection = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);

    const questions = [
      {
        id: 'q1',
        question: '¿Cuál es el tamaño estimado de tu base de datos?',
        icon: Database,
        options: [
          { id: 'a', text: 'Menos de 100 GB', points: { mongodb: 1, documentdb: 1 } },
          { id: 'b', text: '100 GB - 1 TB', points: { mongodb: 2, documentdb: 2 } },
          { id: 'c', text: 'Más de 1 TB', points: { mongodb: 3, documentdb: 1 } }
        ]
      },
      {
        id: 'q2',
        question: '¿Qué tan críticas son las transacciones ACID multi-documento para tu aplicación?',
        icon: Shield,
        options: [
          { id: 'a', text: 'No las necesito', points: { mongodb: 0, documentdb: 3 } },
          { id: 'b', text: 'Sería útil tenerlas', points: { mongodb: 2, documentdb: 1 } },
          { id: 'c', text: 'Son absolutamente críticas', points: { mongodb: 3, documentdb: 0 } }
        ]
      },
      {
        id: 'q3',
        question: '¿Tu equipo tiene experiencia administrando bases de datos?',
        icon: Users,
        options: [
          { id: 'a', text: 'Sí, tenemos DBAs especializados', points: { mongodb: 3, documentdb: 1 } },
          { id: 'b', text: 'Experiencia básica/media', points: { mongodb: 2, documentdb: 2 } },
          { id: 'c', text: 'Preferimos no administrar infraestructura', points: { mongodb: 0, documentdb: 3 } }
        ]
      },
      {
        id: 'q4',
        question: '¿Dónde está alojada tu infraestructura actual?',
        icon: Cloud,
        options: [
          { id: 'a', text: '100% en AWS', points: { mongodb: 1, documentdb: 3 } },
          { id: 'b', text: 'Multi-cloud o híbrida', points: { mongodb: 3, documentdb: 1 } },
          { id: 'c', text: 'On-premise o otro proveedor', points: { mongodb: 2, documentdb: 0 } }
        ]
      },
      {
        id: 'q5',
        question: '¿Qué tipo de consultas realizarás principalmente?',
        icon: BarChart3,
        options: [
          { id: 'a', text: 'Consultas simples (CRUD básico)', points: { mongodb: 1, documentdb: 3 } },
          { id: 'b', text: 'Agregaciones moderadas', points: { mongodb: 2, documentdb: 2 } },
          { id: 'c', text: 'Agregaciones complejas con $lookup, $merge', points: { mongodb: 3, documentdb: 0 } }
        ]
      },
      {
        id: 'q6',
        question: '¿Cuál es tu prioridad principal?',
        icon: Star,
        options: [
          { id: 'a', text: 'Facilidad de gestión y operación', points: { mongodb: 0, documentdb: 3 } },
          { id: 'b', text: 'Máximo rendimiento y control', points: { mongodb: 3, documentdb: 0 } },
          { id: 'c', text: 'Balance entre ambos', points: { mongodb: 2, documentdb: 2 } }
        ]
      },
      {
        id: 'q7',
        question: '¿Qué modelo de costos prefieres?',
        icon: DollarSign,
        options: [
          { id: 'a', text: 'Pago por uso (instancias)', points: { mongodb: 1, documentdb: 3 } },
          { id: 'b', text: 'Licencias + infraestructura propia', points: { mongodb: 3, documentdb: 0 } },
          { id: 'c', text: 'Servicio administrado con precio predecible', points: { mongodb: 2, documentdb: 3 } }
        ]
      },
      {
        id: 'q8',
        question: '¿Necesitas compatibilidad con versiones recientes de MongoDB (6.0+)?',
        icon: Settings,
        options: [
          { id: 'a', text: 'Sí, es fundamental', points: { mongodb: 3, documentdb: 0 } },
          { id: 'b', text: 'No es crítico', points: { mongodb: 1, documentdb: 2 } },
          { id: 'c', text: 'Usamos características básicas', points: { mongodb: 1, documentdb: 3 } }
        ]
      }
    ];

    const handleAnswer = (questionId, option) => {
      setAnswers({ ...answers, [questionId]: option });
      
      if (currentQuestion < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
        }, 300);
      } else {
        setTimeout(() => {
          setShowResults(true);
        }, 500);
      }
    };

    const calculateResults = () => {
      let mongoScore = 0;
      let docdbScore = 0;

      Object.entries(answers).forEach(([questionId, option]) => {
        mongoScore += option.points.mongodb;
        docdbScore += option.points.documentdb;
      });

      const total = mongoScore + docdbScore;
      const mongoPercentage = Math.round((mongoScore / total) * 100);
      const docdbPercentage = Math.round((docdbScore / total) * 100);

      return {
        mongoScore,
        docdbScore,
        mongoPercentage,
        docdbPercentage,
        recommendation: mongoScore > docdbScore ? 'MongoDB' : 'DocumentDB'
      };
    };

    const resetQuiz = () => {
      setCurrentQuestion(0);
      setAnswers({});
      setShowResults(false);
      setQuizStarted(false);
    };

    if (!quizStarted) {
      return (
        <section className="section">
          <div className="container">
            <div className="card card-gradient" style={{
              background: 'linear-gradient(135deg, #0D2A3D, rgba(13,42,61,0.5))',
              textAlign: 'center',
              padding: '80px 40px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '400px',
                height: '400px',
                background: '#00ED64',
                opacity: 0.1,
                borderRadius: '50%',
                filter: 'blur(100px)'
              }}></div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <HelpCircle size={64} color="#00ED64" style={{ margin: '0 auto 24px' }} />
                <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>
                  Cuestionario de Decisión Personalizado
                </h2>
                <p style={{ 
                  fontSize: '1.25rem', 
                  color: '#B8C4CE',
                  maxWidth: '600px',
                  margin: '0 auto 32px'
                }}>
                  Responde 8 preguntas rápidas y te ayudaremos a elegir entre MongoDB y DocumentDB
                  basándonos en tus necesidades específicas.
                </p>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => setQuizStarted(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  Comenzar Cuestionario
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (showResults) {
      const results = calculateResults();
      const recommendationColor = results.recommendation === 'MongoDB' ? '#00ED64' : '#FF9900';
      
      return (
        <section className="section">
          <div className="container">
            <div className="card card-gradient animate-fadeIn" style={{
              background: 'linear-gradient(135deg, #0D2A3D, rgba(13,42,61,0.5))',
              padding: '48px',
              textAlign: 'center'
            }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '32px' }}>
                Resultados de tu Evaluación
              </h2>
              
              {/* Barras de progreso */}
              <div style={{ maxWidth: '600px', margin: '0 auto 48px' }}>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ fontWeight: '600', color: '#00ED64' }}>MongoDB</span>
                    <span style={{ fontWeight: '700', fontSize: '1.5rem', color: '#00ED64' }}>
                      {results.mongoPercentage}%
                    </span>
                  </div>
                  <div style={{
                    height: '24px',
                    background: '#0D2A3D',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${results.mongoPercentage}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #00ED64, #00D757)',
                      borderRadius: '12px',
                      transition: 'width 1s ease-out'
                    }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ fontWeight: '600', color: '#FF9900' }}>DocumentDB</span>
                    <span style={{ fontWeight: '700', fontSize: '1.5rem', color: '#FF9900' }}>
                      {results.docdbPercentage}%
                    </span>
                  </div>
                  <div style={{
                    height: '24px',
                    background: '#0D2A3D',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${results.docdbPercentage}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #FF9900, #FF6600)',
                      borderRadius: '12px',
                      transition: 'width 1s ease-out'
                    }}></div>
                  </div>
                </div>
              </div>
              
              {/* Recomendación */}
              <div style={{
                background: `linear-gradient(135deg, ${recommendationColor}20, ${recommendationColor}10)`,
                border: `2px solid ${recommendationColor}`,
                borderRadius: '16px',
                padding: '32px',
                marginBottom: '32px'
              }}>
                <Award size={48} color={recommendationColor} style={{ margin: '0 auto 16px' }} />
                <h3 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: '700',
                  color: recommendationColor,
                  marginBottom: '16px'
                }}>
                  Recomendamos: {results.recommendation}
                </h3>
                <p style={{ color: '#B8C4CE', fontSize: '1.125rem' }}>
                  Basándonos en tus respuestas, {results.recommendation} se alinea mejor con 
                  tus necesidades y prioridades actuales.
                </p>
              </div>
              
              {/* Acciones */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  className="btn btn-primary"
                  onClick={resetQuiz}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <RefreshCw size={20} />
                  Realizar de nuevo
                </button>
                <button className="btn btn-secondary">
                  Descargar informe
                </button>
              </div>
            </div>
          </div>
        </section>
      );
    }

    // Pregunta actual
    const question = questions[currentQuestion];
    const Icon = question.icon;
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <section className="section">
        <div className="container">
          <div className="card card-gradient" style={{
            background: 'linear-gradient(135deg, #0D2A3D, rgba(13,42,61,0.5))',
            padding: '48px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {/* Barra de progreso */}
            <div style={{ marginBottom: '48px' }}>
              <div className="flex justify-between items-center mb-2">
                <span style={{ color: '#B8C4CE', fontSize: '0.875rem' }}>
                  Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <span style={{ color: '#00ED64', fontWeight: '600' }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div style={{
                height: '8px',
                background: '#001E2B',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #00ED64, #00D757)',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>

            {/* Pregunta */}
            <div className="text-center mb-8">
              <Icon size={48} color="#00ED64" style={{ margin: '0 auto 24px' }} />
              <h3 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '16px' }}>
                {question.question}
              </h3>
            </div>

            {/* Opciones */}
            <div className="grid gap-4">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(question.id, option)}
                  className="card-hover"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '24px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '2px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#00ED64';
                    e.currentTarget.style.background = 'rgba(0,237,100,0.1)';
                    e.currentTarget.style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: '1.125rem', color: '#FFFFFF' }}>
                      {option.text}
                    </span>
                    <ChevronRight size={20} color="#00ED64" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#001E2B', 
      color: '#FFFFFF',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hero Section */}
      <section className="hero" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div className="hero-background"></div>
        <div className="hero-blur hero-blur-primary" style={{ top: '10%', left: '5%' }}></div>
        <div className="hero-blur hero-blur-accent" style={{ bottom: '10%', right: '10%' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center animate-fadeIn">
            <div className="badge badge-primary mb-4" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} />
              <span>Herramienta de Decisión para Cencosud</span>
            </div>
            
            <h1 className="mb-4" style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
              fontWeight: '800',
              lineHeight: 1.1
            }}>
              MongoDB vs DocumentDB
              <br />
              <span className="gradient-text">Matriz de Decisión Inteligente</span>
            </h1>
            
            <p className="mb-6" style={{ 
              fontSize: '1.25rem', 
              color: '#B8C4CE',
              maxWidth: '800px',
              margin: '0 auto 48px'
            }}>
              Analiza criterios clave para elegir la base de datos ideal para tu proyecto.
              Basado en necesidades reales de arquitectura empresarial.
            </p>
          </div>
        </div>
      </section>

      {/* Diagrama de Radar - Comparación Visual */}
      <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="card card-gradient" style={{
            background: 'linear-gradient(135deg, #0D2A3D, rgba(13,42,61,0.5))',
            padding: '48px',
            marginBottom: '48px'
          }}>
            <h2 className="text-center mb-6" style={{ fontSize: '2rem', fontWeight: '700' }}>
              Análisis Comparativo Multidimensional
            </h2>
            
            <p className="text-center mb-8" style={{ 
              color: '#B8C4CE', 
              fontSize: '1.125rem',
              maxWidth: '800px',
              margin: '0 auto 48px'
            }}>
              Este diagrama de radar muestra las fortalezas y debilidades de cada tecnología en 8 dimensiones clave.
              Un área más grande indica mejor desempeño general en los criterios evaluados.
            </p>
            
            {/* Contenedor del Radar */}
            <div style={{ 
              position: 'relative', 
              maxWidth: '600px', 
              height: '600px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* SVG del Radar */}
              <svg viewBox="0 0 500 500" style={{ width: '100%', height: '100%' }}>
                {/* Definir gradientes */}
                <defs>
                  <radialGradient id="mongoGradient">
                    <stop offset="0%" stopColor="#00ED64" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00ED64" stopOpacity="0.2" />
                  </radialGradient>
                  <radialGradient id="docdbGradient">
                    <stop offset="0%" stopColor="#FF9900" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FF9900" stopOpacity="0.2" />
                  </radialGradient>
                </defs>
                
                {/* Círculos de fondo */}
                {[1, 2, 3, 4, 5].map((level) => (
                  <circle
                    key={level}
                    cx="250"
                    cy="250"
                    r={level * 40}
                    fill="none"
                    stroke="#2A4E5C"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                ))}
                
                {/* Líneas radiales */}
                {radarData.map((_, index) => {
                  const angle = (index * 2 * Math.PI) / radarData.length - Math.PI / 2;
                  const x = 250 + 200 * Math.cos(angle);
                  const y = 250 + 200 * Math.sin(angle);
                  return (
                    <line
                      key={index}
                      x1="250"
                      y1="250"
                      x2={x}
                      y2={y}
                      stroke="#2A4E5C"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  );
                })}
                
                {/* Polígono DocumentDB */}
                <polygon
                  points={radarData.map((item, index) => {
                    const angle = (index * 2 * Math.PI) / radarData.length - Math.PI / 2;
                    const radius = (item.documentdb / 5) * 200;
                    const x = 250 + radius * Math.cos(angle);
                    const y = 250 + radius * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="url(#docdbGradient)"
                  stroke="#FF9900"
                  strokeWidth="2"
                  opacity="0.7"
                />
                
                {/* Polígono MongoDB */}
                <polygon
                  points={radarData.map((item, index) => {
                    const angle = (index * 2 * Math.PI) / radarData.length - Math.PI / 2;
                    const radius = (item.mongodb / 5) * 200;
                    const x = 250 + radius * Math.cos(angle);
                    const y = 250 + radius * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="url(#mongoGradient)"
                  stroke="#00ED64"
                  strokeWidth="2"
                  opacity="0.7"
                />
                
                {/* Etiquetas */}
                {radarData.map((item, index) => {
                  const angle = (index * 2 * Math.PI) / radarData.length - Math.PI / 2;
                  const x = 250 + 230 * Math.cos(angle);
                  const y = 250 + 230 * Math.sin(angle);
                  return (
                    <text
                      key={index}
                      x={x}
                      y={y}
                      fill="#B8C4CE"
                      fontSize="12"
                      fontWeight="500"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {item.label}
                    </text>
                  );
                })}
                
                {/* Puntos de datos */}
                {radarData.map((item, index) => {
                  const angle = (index * 2 * Math.PI) / radarData.length - Math.PI / 2;
                  const mongoRadius = (item.mongodb / 5) * 200;
                  const docdbRadius = (item.documentdb / 5) * 200;
                  const mongoX = 250 + mongoRadius * Math.cos(angle);
                  const mongoY = 250 + mongoRadius * Math.sin(angle);
                  const docdbX = 250 + docdbRadius * Math.cos(angle);
                  const docdbY = 250 + docdbRadius * Math.sin(angle);
                  
                  return (
                    <g key={index}>
                      <circle cx={mongoX} cy={mongoY} r="4" fill="#00ED64" />
                      <circle cx={docdbX} cy={docdbY} r="4" fill="#FF9900" />
                    </g>
                  );
                })}
              </svg>
              
              {/* Leyenda */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '24px',
                background: 'rgba(0, 30, 43, 0.9)',
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '3px', background: '#00ED64' }}></div>
                  <span style={{ fontSize: '0.875rem', color: '#FFFFFF' }}>MongoDB</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '3px', background: '#FF9900' }}></div>
                  <span style={{ fontSize: '0.875rem', color: '#FFFFFF' }}>DocumentDB</span>
                </div>
              </div>
            </div>
            
            {/* Métricas debajo del radar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div style={{
                background: 'rgba(0,237,100,0.1)',
                border: '1px solid rgba(0,237,100,0.3)',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#00ED64', fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>
                  MongoDB
                </h4>
                <p style={{ color: '#FFFFFF', fontSize: '2rem', fontWeight: '700' }}>
                  {calculateAverageScore('mongodb').toFixed(1)}/5.0
                </p>
                <p style={{ color: '#B8C4CE', fontSize: '0.875rem' }}>
                  Puntuación promedio
                </p>
              </div>
              
              <div style={{
                background: 'rgba(255,153,0,0.1)',
                border: '1px solid rgba(255,153,0,0.3)',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#FF9900', fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>
                  DocumentDB
                </h4>
                <p style={{ color: '#FFFFFF', fontSize: '2rem', fontWeight: '700' }}>
                  {calculateAverageScore('documentdb').toFixed(1)}/5.0
                </p>
                <p style={{ color: '#B8C4CE', fontSize: '0.875rem' }}>
                  Puntuación promedio
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros de Categoría */}
      <section className="section" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="container">
          <div className="flex items-center gap-3 mb-6" style={{ overflowX: 'auto', paddingBottom: '8px' }}>
            <Filter size={20} color="#B8C4CE" />
            <div className="flex gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`btn ${activeFilter === cat.id ? 'btn-primary' : 'btn-ghost'} btn-sm`}
                  style={{
                    backgroundColor: activeFilter === cat.id ? cat.color : 'transparent',
                    borderColor: cat.color,
                    color: activeFilter === cat.id ? '#001E2B' : cat.color,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Matriz de Comparación */}
      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="grid gap-4">
            {filteredData.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedCriteria === item.id;
              
              return (
                <div
                  key={item.id}
                  className="card card-bordered card-hover"
                  style={{
                    background: isSelected ? 'rgba(0,237,100,0.1)' : 'rgba(13,42,61,0.3)',
                    border: isSelected ? '2px solid #00ED64' : '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    animationDelay: `${index * 100}ms`
                  }}
                  onClick={() => setSelectedCriteria(isSelected ? null : item.id)}
                >
                  {/* Header con pregunta */}
                  <div className="flex items-start gap-4 mb-4">
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: `linear-gradient(135deg, ${categories.find(c => c.id === item.category)?.color}20, ${categories.find(c => c.id === item.category)?.color}40)`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={24} color={categories.find(c => c.id === item.category)?.color} />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '8px' }}>
                        {item.question}
                      </h3>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        fontSize: '0.75rem',
                        borderRadius: '6px',
                        background: `${getImportanceColor(item.importance)}20`,
                        color: getImportanceColor(item.importance),
                        fontWeight: '500'
                      }}>
                        Importancia {item.importance}
                      </span>
                    </div>
                  </div>

                  {/* Comparación expandible */}
                  <div style={{
                    maxHeight: isSelected ? '400px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease'
                  }}>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {/* DocumentDB */}
                      <div style={{
                        padding: '20px',
                        background: 'rgba(255,153,0,0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,153,0,0.3)'
                      }}>
                        <div className="flex items-center gap-2 mb-3">
                          <Cloud size={20} color="#FF9900" />
                          <h4 style={{ fontWeight: '600', color: '#FF9900' }}>DocumentDB</h4>
                        </div>
                        <p style={{ color: '#B8C4CE', fontSize: '0.95rem' }}>{item.documentdb}</p>
                      </div>

                      {/* MongoDB */}
                      <div style={{
                        padding: '20px',
                        background: 'rgba(0,237,100,0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(0,237,100,0.3)'
                      }}>
                        <div className="flex items-center gap-2 mb-3">
                          <Database size={20} color="#00ED64" />
                          <h4 style={{ fontWeight: '600', color: '#00ED64' }}>MongoDB</h4>
                        </div>
                        <p style={{ color: '#B8C4CE', fontSize: '0.95rem' }}>{item.mongodb}</p>
                      </div>
                    </div>

                    {/* Recomendación */}
                    <div style={{
                      padding: '16px',
                      borderRadius: '12px',
                      ...getRecommendationStyle(item.recommendation),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div className="flex items-center gap-3">
                        <Award size={24} />
                        <div>
                          <p style={{ fontWeight: '600', marginBottom: '2px' }}>
                            Recomendación: {item.recommendation}
                          </p>
                          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                            Basado en este criterio específico
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={20} />
                    </div>
                  </div>

                  {/* Indicador de expansión */}
                  {!isSelected && (
                    <div className="text-center mt-3" style={{ color: '#B8C4CE', fontSize: '0.875rem' }}>
                      Click para ver detalles
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resumen y Recomendaciones */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Cuándo elegir MongoDB */}
            <div className="card card-gradient" style={{
              background: 'linear-gradient(135deg, rgba(0,237,100,0.1), rgba(0,237,100,0.05))',
              border: '1px solid rgba(0,237,100,0.3)'
            }}>
              <div className="flex items-center gap-3 mb-4">
                <Database size={32} color="#00ED64" />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#00ED64' }}>
                  Elige MongoDB cuando:
                </h3>
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Necesitas compatibilidad total con la última versión',
                  'Requieres operaciones de agregación complejas',
                  'Las transacciones ACID son críticas',
                  'Buscas máximo rendimiento y control',
                  'Tienes equipo con experiencia en administración'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 mb-3">
                    <CheckCircle size={20} color="#00ED64" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: '#B8C4CE' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cuándo elegir DocumentDB */}
            <div className="card card-gradient" style={{
              background: 'linear-gradient(135deg, rgba(255,153,0,0.1), rgba(255,153,0,0.05))',
              border: '1px solid rgba(255,153,0,0.3)'
            }}>
              <div className="flex items-center gap-3 mb-4">
                <Cloud size={32} color="#FF9900" />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#FF9900' }}>
                  Elige DocumentDB cuando:
                </h3>
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Prefieres una solución totalmente administrada',
                  'Tu infraestructura ya está en AWS',
                  'Buscas reducir la carga operativa',
                  'Necesitas escalado automático sin configuración',
                  'El modelo de precios por instancia te conviene'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 mb-3">
                    <CheckCircle size={20} color="#FF9900" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: '#B8C4CE' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cuestionario Interactivo */}
      <QuizSection />

      {/* CTA Final */}
      <section className="section">
        <div className="container">
          <div className="card" style={{
            background: 'linear-gradient(135deg, #00ED64, #00D757)',
            textAlign: 'center',
            padding: '48px'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
              fontWeight: '700',
              color: '#001E2B',
              marginBottom: '16px'
            }}>
              ¿Necesitas una evaluación personalizada?
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: '#001E2B',
              marginBottom: '32px',
              opacity: 0.9
            }}>
              Nuestro equipo de arquitectos puede ayudarte a tomar la mejor decisión para Cencosud
            </p>
            <button className="btn btn-lg" style={{
              background: '#001E2B',
              color: '#00ED64',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Solicitar Consultoría
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '32px 0',
        marginTop: '80px'
      }}>
        <div className="container text-center">
          <p style={{ color: '#718096', fontSize: '0.875rem' }}>
            © 2024 Cencosud - Matriz de Decisión MongoDB vs DocumentDB | Powered by gomDB
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CencosudDecisionMatrix;