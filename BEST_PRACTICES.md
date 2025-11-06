# 📘 Mejores Prácticas - GoMDB Site

## 🎯 Propósito
Este documento define las mejores prácticas para desarrollar contenido consistente, mantenible y profesional en el sitio GoMDB.

---

## 📐 Arquitectura y Estructura

### 1. Organización de Archivos

```
src/
├── components/          # Componentes reutilizables
│   ├── shared/         # Componentes compartidos entre todos los clientes
│   ├── client/         # Componentes específicos de clientes
│   └── layouts/        # Layouts y estructuras base
├── pages/              # Páginas por cliente
│   └── clientes/
│       └── [cliente]/
├── hooks/              # Custom hooks React
├── utils/              # Funciones utilitarias
├── constants/          # Constantes y configuración
└── styles/             # Estilos globales y temas
```

### 2. Naming Conventions

**Archivos:**
```
✅ CORRECTO:
- ClientHeader.jsx
- useFetchData.js
- calculateSizing.js
- CLIENTE_CONSTANTS.js

❌ INCORRECTO:
- clientheader.jsx
- fetchData.js (sin prefijo use para hooks)
- calc-sizing.js (mezcla de convenciones)
```

**Componentes:**
```javascript
// ✅ PascalCase para componentes
export const ClientDocumentLayout = () => {}

// ✅ camelCase para funciones
export const calculateMongoDBSizing = () => {}

// ✅ SCREAMING_SNAKE_CASE para constantes
export const MONGODB_COLORS = {
  PRIMARY_GREEN: '#00ED64',
  PRIMARY_PURPLE: '#5644D4'
}
```

---

## 🎨 Sistema de Diseño

### 1. Paleta de Colores (MongoDB Brand)

```css
/* SIEMPRE usar variables CSS */
:root {
  /* Colores primarios MongoDB */
  --mongodb-green: #00ED64;
  --mongodb-purple: #5644D4;
  --mongodb-dark: #001E2B;
  --mongodb-white: #FFFFFF;

  /* Colores secundarios */
  --success: #00ED64;
  --warning: #FFB81C;
  --error: #E03C31;
  --info: #00A0D2;

  /* Grises */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-700: #374151;
  --gray-900: #111827;
}
```

### 2. Tipografía

```css
:root {
  /* Fuentes MongoDB */
  --font-primary: 'Euclid Circular A', -apple-system, sans-serif;
  --font-mono: 'MongoDB Value Serif', 'Courier New', monospace;

  /* Tamaños */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
}
```

### 3. Espaciado Consistente

```javascript
// Usar sistema de espaciado 8px
const SPACING = {
  xs: '4px',   // 0.5 unit
  sm: '8px',   // 1 unit
  md: '16px',  // 2 units
  lg: '24px',  // 3 units
  xl: '32px',  // 4 units
  '2xl': '48px', // 6 units
  '3xl': '64px'  // 8 units
}
```

---

## ⚛️ Componentes React - Mejores Prácticas

### 1. Estructura de Componente

```javascript
import React from 'react'
import PropTypes from 'prop-types'

/**
 * Descripción clara del componente
 * @param {string} title - Título del documento
 * @param {string} client - Nombre del cliente
 * @param {ReactNode} children - Contenido del documento
 */
export const ClientDocument = ({ title, client, children }) => {
  // 1. Hooks primero
  const [isLoading, setIsLoading] = React.useState(false)

  // 2. Funciones helpers
  const handleExport = () => {
    // lógica
  }

  // 3. Early returns
  if (isLoading) return <LoadingSpinner />

  // 4. Render principal
  return (
    <div className="client-document">
      <header>
        <h1>{title}</h1>
        <span className="client-badge">{client}</span>
      </header>
      <main>{children}</main>
    </div>
  )
}

// 5. PropTypes para validación
ClientDocument.propTypes = {
  title: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

// 6. Default props si aplica
ClientDocument.defaultProps = {
  title: 'Documento sin título'
}
```

### 2. Custom Hooks

```javascript
// useFetchClientData.js
import { useState, useEffect } from 'react'

/**
 * Hook para obtener datos del cliente
 * @param {string} clientId - ID del cliente
 * @returns {Object} { data, loading, error }
 */
export const useFetchClientData = (clientId) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/clients/${clientId}`)
        const json = await response.json()
        setData(json)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (clientId) fetchData()
  }, [clientId])

  return { data, loading, error }
}
```

### 3. Composition sobre Inheritance

```javascript
// ✅ CORRECTO - Composition
const ClientPage = ({ client }) => (
  <PageLayout>
    <ClientHeader client={client} />
    <ClientContent client={client} />
    <ClientFooter client={client} />
  </PageLayout>
)

// ❌ EVITAR - Inheritance
class ClientPage extends BasePage {
  render() {
    return super.render() // difícil de mantener
  }
}
```

---

## 📝 Contenido y Documentación

### 1. Estructura de Documento Cliente

**Template estándar:**
```jsx
import { ClientDocumentLayout } from '@/components/layouts'
import { CodeBlock, Diagram, MetricsCard } from '@/components/shared'

export const ETBLicenciamiento = () => {
  return (
    <ClientDocumentLayout
      client="ETB"
      title="Guía de Licenciamiento MongoDB Atlas"
      author="Leo Alarcón"
      date="2025-11-05"
      tags={['licenciamiento', 'atlas', 'costos']}
    >
      {/* 1. Resumen Ejecutivo */}
      <section className="executive-summary">
        <h2>Resumen Ejecutivo</h2>
        <p>Descripción clara en 2-3 párrafos</p>
      </section>

      {/* 2. Contexto */}
      <section className="context">
        <h2>Contexto del Cliente</h2>
        <MetricsCard
          title="Métricas Actuales"
          metrics={[
            { label: 'Cluster Size', value: 'M30' },
            { label: 'Data Size', value: '500 GB' }
          ]}
        />
      </section>

      {/* 3. Solución Propuesta */}
      <section className="solution">
        <h2>Solución Propuesta</h2>
        <Diagram src="/img/etb/arquitectura.svg" />
      </section>

      {/* 4. Código/Ejemplos */}
      <section className="examples">
        <h2>Ejemplos de Implementación</h2>
        <CodeBlock language="javascript" showLineNumbers>
          {`// Código de ejemplo
const client = new MongoClient(uri);`}
        </CodeBlock>
      </section>

      {/* 5. Próximos Pasos */}
      <section className="next-steps">
        <h2>Próximos Pasos</h2>
        <ol>
          <li>Action item 1</li>
          <li>Action item 2</li>
        </ol>
      </section>
    </ClientDocumentLayout>
  )
}
```

### 2. Documentación de Código

```javascript
/**
 * Calcula el sizing recomendado para MongoDB Atlas
 *
 * @param {Object} params - Parámetros del workload
 * @param {number} params.dataSize - Tamaño de datos en GB
 * @param {number} params.operationsPerSecond - Ops/sec esperadas
 * @param {string} params.workloadType - Tipo: 'read-heavy' | 'write-heavy' | 'balanced'
 * @returns {Object} Configuración recomendada
 *
 * @example
 * const config = calculateSizing({
 *   dataSize: 500,
 *   operationsPerSecond: 10000,
 *   workloadType: 'read-heavy'
 * })
 * // Returns: { clusterTier: 'M30', ram: '32GB', storage: '1TB' }
 */
export function calculateSizing({ dataSize, operationsPerSecond, workloadType }) {
  // Implementación
}
```

---

## 🔒 Seguridad y Privacidad

### 1. Datos Sensibles

```javascript
// ❌ NUNCA hacer esto
const config = {
  mongoUri: 'mongodb+srv://user:password@cluster.mongodb.net',
  apiKey: 'sk_live_abc123'
}

// ✅ SIEMPRE usar variables de entorno
const config = {
  mongoUri: process.env.VITE_MONGO_URI,
  apiKey: process.env.VITE_API_KEY
}

// ✅ Validar que existen
if (!process.env.VITE_MONGO_URI) {
  throw new Error('VITE_MONGO_URI no está configurada')
}
```

### 2. .env.example

```bash
# Crear siempre un .env.example
# /home/user/gomdb-site/.env.example

# MongoDB
VITE_MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# APIs
VITE_API_BASE_URL=https://api.gomdb.com

# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

---

## 🚀 Performance

### 1. Lazy Loading de Componentes

```javascript
import { lazy, Suspense } from 'react'

// ✅ Lazy load para páginas grandes
const ETBLicenciamiento = lazy(() => import('./pages/clientes/etb/Licenciamiento'))

export const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <ETBLicenciamiento />
  </Suspense>
)
```

### 2. Optimización de Imágenes

```jsx
// ✅ CORRECTO - Imágenes optimizadas
<img
  src="/img/etb/diagram.webp"  // Usar WebP
  alt="Arquitectura ETB"
  loading="lazy"
  width="800"
  height="600"
/>

// ❌ EVITAR - Imágenes grandes sin optimizar
<img src="/img/etb/diagram.png" />  // PNG sin comprimir
```

### 3. Code Splitting

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'charts': ['recharts'],
          'utils': ['./src/utils']
        }
      }
    }
  }
})
```

---

## ✅ Testing (Próximo Sprint)

### 1. Unit Tests

```javascript
// ClientDocument.test.jsx
import { render, screen } from '@testing-library/react'
import { ClientDocument } from './ClientDocument'

describe('ClientDocument', () => {
  it('renderiza el título correctamente', () => {
    render(
      <ClientDocument title="Test Doc" client="ETB">
        Contenido
      </ClientDocument>
    )
    expect(screen.getByText('Test Doc')).toBeInTheDocument()
  })
})
```

---

## 📋 Checklist Pre-Deploy

Antes de hacer push a main:

- [ ] El código sigue las naming conventions
- [ ] Los componentes tienen PropTypes o TypeScript types
- [ ] No hay console.log() en producción
- [ ] No hay credenciales hardcodeadas
- [ ] Las imágenes están optimizadas (WebP)
- [ ] Los componentes son lazy-loaded si son grandes
- [ ] Hay documentación JSDoc en funciones complejas
- [ ] Se actualizó vercel.json con nuevas rutas
- [ ] Se probó localmente con `npm run build`
- [ ] El commit message es descriptivo

---

## 🔄 Workflow Git

```bash
# 1. Crear rama por feature
git checkout -b feature/etb-nueva-guia

# 2. Hacer cambios atómicos
git add src/pages/clientes/etb/NuevaGuia.jsx
git commit -m "feat(etb): agrega guía de optimización de índices"

# 3. Push y PR
git push origin feature/etb-nueva-guia
# Crear PR en GitHub

# 4. Después del merge, limpiar
git checkout main
git pull origin main
git branch -d feature/etb-nueva-guia
```

### Convenciones de Commits

```
feat(cliente): nueva funcionalidad
fix(cliente): corrección de bug
docs(cliente): actualización de documentación
style: cambios de formato (no afectan lógica)
refactor: refactorización de código
perf: mejoras de performance
test: agregar o modificar tests
chore: tareas de mantenimiento
```

---

## 📚 Recursos

- [React Docs](https://react.dev)
- [MongoDB Best Practices](https://www.mongodb.com/docs/manual/best-practices/)
- [Vite Guide](https://vitejs.dev/guide/)
- [GoMDB Guía de Colaboradores](./guia_colaboradores.md)

---

**Última actualización:** 2025-11-05
**Mantenido por:** Leo Alarcón (leo.alarcon@mongodb.com)
