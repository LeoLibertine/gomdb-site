# 🏗️ Arquitectura del Proyecto GoMDB Site

## 📋 Tabla de Contenidos

1. [Visión General](#vision-general)
2. [Stack Tecnológico](#stack-tecnologico)
3. [Estructura de Carpetas](#estructura-de-carpetas)
4. [Flujo de Datos](#flujo-de-datos)
5. [Componentes Clave](#componentes-clave)
6. [Patrones de Diseño](#patrones-de-diseno)
7. [Deployment](#deployment)

---

## 🎯 Visión General

GoMDB Site es una plataforma web para compartir documentación técnica, propuestas y demos interactivas con clientes de MongoDB en LATAM.

### Características Principales

- 📄 Sistema de documentación multi-cliente
- 🎨 Componentes reutilizables con MongoDB branding
- 💻 Demos interactivas (calculadoras, matrices de decisión)
- 🎮 Mini-juegos educativos (Flappy Leaf)
- 📊 Visualización de datos y métricas
- 🚀 Deploy continuo en Vercel

---

## 🛠️ Stack Tecnológico

### Frontend

```yaml
Framework: React 19
Build Tool: Vite 6
Routing: React Router DOM v7
Styling: CSS Modules + CSS Variables
Icons: Lucide React
State Management: React Context (local state)
```

### Backend

```yaml
Game API: Node.js + Express
Database: MongoDB Atlas
ODM: MongoDB Native Driver
Environment: Node.js 20 LTS
```

### DevOps

```yaml
Hosting: Vercel
CI/CD: GitHub Actions (automático con push a main)
Version Control: Git + GitHub
Monitoring: Vercel Analytics
```

---

## 📁 Estructura de Carpetas

```
gomdb-site/
│
├── public/                     # Assets estáticos
│   ├── img/                   # Imágenes y diagramas
│   │   ├── mongodb-logo.svg
│   │   └── clientes/          # Imágenes por cliente
│   ├── sizing/                # Herramientas de sizing
│   └── clientes/              # HTMLs legacy (migrar a React)
│
├── src/                       # Código fuente React
│   ├── components/           # Componentes reutilizables
│   │   ├── layouts/         # Layouts (ClientDocumentLayout)
│   │   │   ├── ClientDocumentLayout.jsx
│   │   │   ├── ClientDocumentLayout.css
│   │   │   └── index.js
│   │   ├── shared/          # Componentes compartidos
│   │   │   ├── CodeBlock.jsx
│   │   │   ├── MetricsCard.jsx
│   │   │   └── index.js
│   │   └── client/          # Componentes específicos de cliente
│   │
│   ├── pages/               # Páginas por ruta
│   │   ├── Home.jsx
│   │   ├── clientes/       # Páginas de clientes
│   │   │   ├── etb/
│   │   │   │   ├── Licenciamiento.jsx
│   │   │   │   └── Optimizacion.jsx
│   │   │   ├── yape/
│   │   │   └── cencosud/
│   │   └── demos/          # Demos interactivas
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useFetchData.js
│   │   └── useMongoDBMetrics.js
│   │
│   ├── utils/              # Funciones utilitarias
│   │   ├── calculations.js
│   │   ├── formatters.js
│   │   └── constants.js
│   │
│   ├── styles/             # Estilos globales
│   │   ├── gomdb-global.css
│   │   └── variables.css
│   │
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Entry point
│   └── index.css           # Reset + base styles
│
├── templates/              # Templates para copiar
│   ├── ClientDocumentTemplate.jsx
│   └── README.md
│
├── server/                 # Backend Node.js (API juegos)
│   ├── index.js
│   ├── package.json
│   └── .env.example
│
├── docs/                   # Documentación del proyecto
│   ├── BEST_PRACTICES.md
│   ├── ARCHITECTURE.md
│   └── CHECKLIST.md
│
├── .github/               # GitHub Actions
│   └── workflows/
│       └── deploy.yml
│
├── vercel.json           # Configuración Vercel
├── vite.config.js        # Configuración Vite
├── package.json          # Dependencies
├── README.md             # Readme principal
└── guia_colaboradores.md # Guía para colaboradores
```

---

## 🔄 Flujo de Datos

### 1. Flujo de Documentos Cliente

```
Usuario accede a URL
    ↓
React Router captura ruta (/clientes/etb/licenciamiento)
    ↓
Renderiza componente ETBLicenciamiento
    ↓
Usa ClientDocumentLayout (header, footer, metadata)
    ↓
Renderiza contenido con componentes shared (CodeBlock, MetricsCard)
    ↓
Usuario puede exportar a PDF
```

### 2. Flujo de API (Backend)

```
Cliente hace request → Express Router → Controller → MongoDB Atlas → Response JSON
```

### 3. Flujo de Deploy

```
git push origin main
    ↓
GitHub detecta cambio
    ↓
Vercel Build (npm run build)
    ↓
Vercel Deploy
    ↓
URL actualizada automáticamente
```

---

## 🧩 Componentes Clave

### 1. ClientDocumentLayout

**Ubicación:** `src/components/layouts/ClientDocumentLayout.jsx`

**Propósito:** Layout estándar para todos los documentos de cliente

**Props:**
```javascript
{
  client: string,          // Nombre del cliente
  title: string,           // Título del documento
  subtitle?: string,       // Subtítulo opcional
  author: string,          // Autor (default: "Leo Alarcón")
  date: string,            // Fecha YYYY-MM-DD
  tags: string[],          // Tags para categorización
  showExportButton: bool,  // Mostrar botón PDF
  children: ReactNode      // Contenido
}
```

**Uso:**
```jsx
<ClientDocumentLayout
  client="ETB"
  title="Guía de Licenciamiento"
  date="2025-11-05"
  tags={['licenciamiento', 'atlas']}
>
  {/* contenido */}
</ClientDocumentLayout>
```

### 2. CodeBlock

**Ubicación:** `src/components/shared/CodeBlock.jsx`

**Propósito:** Mostrar código con syntax highlighting y copiar

**Props:**
```javascript
{
  children: string,        // Código a mostrar
  language: string,        // js, python, bash, etc.
  showLineNumbers: bool,   // Mostrar números de línea
  title?: string,          // Título del bloque
  copyable: bool           // Permitir copiar (default: true)
}
```

**Uso:**
```jsx
<CodeBlock language="javascript" showLineNumbers title="connection.js">
{`const client = new MongoClient(uri);`}
</CodeBlock>
```

### 3. MetricsCard

**Ubicación:** `src/components/shared/MetricsCard.jsx`

**Propósito:** Mostrar métricas y KPIs

**Props:**
```javascript
{
  title?: string,
  metrics: Array<{
    label: string,
    value: string | number,
    unit?: string,
    trend?: 'up' | 'down',
    icon?: ReactNode,
    description?: string
  }>,
  variant: 'default' | 'success' | 'warning' | 'info',
  compact: bool
}
```

**Uso:**
```jsx
<MetricsCard
  title="Configuración Actual"
  variant="info"
  metrics={[
    { label: 'RAM', value: '8', unit: 'GB' },
    { label: 'Storage', value: '500', unit: 'GB', trend: 'up' }
  ]}
/>
```

---

## 🎨 Patrones de Diseño

### 1. Component Composition

Preferimos composición sobre herencia:

```jsx
// ✅ CORRECTO
<ClientDocumentLayout>
  <MetricsCard />
  <CodeBlock />
</ClientDocumentLayout>

// ❌ EVITAR
class MyPage extends BasePage {
  // herencia difícil de mantener
}
```

### 2. Container/Presentational Pattern

```jsx
// Container (lógica)
const ETBLicenciamientoContainer = () => {
  const { data, loading } = useFetchClientData('etb')

  if (loading) return <LoadingSpinner />
  return <ETBLicenciamiento data={data} />
}

// Presentational (UI)
const ETBLicenciamiento = ({ data }) => (
  <ClientDocumentLayout {...data}>
    {/* render */}
  </ClientDocumentLayout>
)
```

### 3. Custom Hooks para Lógica Reutilizable

```javascript
// useFetchClientData.js
export const useFetchClientData = (clientId) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData(clientId)
  }, [clientId])

  return { data, loading, error }
}
```

### 4. Barrel Exports

```javascript
// src/components/shared/index.js
export { CodeBlock } from './CodeBlock'
export { MetricsCard } from './MetricsCard'

// Uso en otros archivos
import { CodeBlock, MetricsCard } from '@/components/shared'
```

---

## 🚀 Deployment

### Vercel Configuration

**vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    {
      "src": "/clientes/etb/licenciamiento(?:/.*)?$",
      "dest": "/clientes/etb/licenciamiento.html"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Build Process

```bash
# Local development
npm run dev

# Build para producción
npm run build

# Preview build localmente
npm run preview
```

### Variables de Entorno

**En Vercel Dashboard:**
```
VITE_MONGO_URI=mongodb+srv://...
VITE_API_BASE_URL=https://api.gomdb.com
```

**En local (.env):**
```bash
VITE_MONGO_URI=mongodb://localhost:27017
VITE_API_BASE_URL=http://localhost:3000
```

---

## 🔒 Seguridad

### Best Practices Implementadas

1. **No secrets en código:**
   - ✅ Usar variables de entorno
   - ✅ .env en .gitignore
   - ✅ .env.example documentado

2. **MongoDB Atlas:**
   - ✅ IP Whitelisting
   - ✅ SCRAM-SHA-256 authentication
   - ✅ Connection strings en env vars

3. **Vercel:**
   - ✅ HTTPS automático
   - ✅ Environment variables encriptadas
   - ✅ Preview deployments en PRs

---

## 📊 Monitoreo y Analytics

### Métricas Clave

1. **Vercel Analytics:**
   - Page views por cliente
   - Tiempo de carga
   - Web Vitals (LCP, FID, CLS)

2. **MongoDB Atlas:**
   - Conexiones activas
   - Query performance
   - Storage usage

3. **Custom Metrics:**
   - Documentos más visitados
   - Demos más usadas
   - Exportaciones a PDF

---

## 🔮 Roadmap Técnico

### Corto Plazo (1-2 meses)

- [ ] Migrar HTMLs legacy a componentes React
- [ ] Implementar Tailwind CSS
- [ ] Agregar tests (Vitest + React Testing Library)
- [ ] Implementar lazy loading para imágenes

### Mediano Plazo (3-6 meses)

- [ ] Backend Python con FastAPI
- [ ] Sistema de autenticación (OAuth)
- [ ] CMS headless para contenido
- [ ] Búsqueda full-text

### Largo Plazo (6+ meses)

- [ ] Migración a Next.js 15 (SSR/SSG)
- [ ] Multi-idioma (ES/EN/PT)
- [ ] PWA (Progressive Web App)
- [ ] A/B testing

---

## 📚 Referencias

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [MongoDB Best Practices](https://www.mongodb.com/docs/manual/administration/production-notes/)
- [Vercel Documentation](https://vercel.com/docs)
- [Component Composition](https://react.dev/learn/passing-props-to-a-component)

---

**Última actualización:** 2025-11-05
**Autor:** Leo Alarcón (leo.alarcon@mongodb.com)
