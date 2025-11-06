# 🍃 GoMDB.com

¡Bienvenido al sitio oficial de GoMDB!

Este proyecto es una plataforma web profesional para compartir documentación técnica, propuestas, demos interactivas y recursos con clientes de MongoDB en LATAM.

[![Deploy Status](https://vercel.com/button)](https://gomdb.com)

---

## 🎯 ¿Qué es GoMDB?

GoMDB es una experiencia web moderna construida con **React 19 + Vite**, desplegada en **Vercel**, que sirve como:

- 📄 **Portal de Documentación** - Guías técnicas y propuestas para 13+ clientes
- 🎨 **Sistema de Diseño** - Componentes reutilizables con MongoDB branding
- 💻 **Demos Interactivas** - Calculadoras de sizing, matrices de decisión, visualizaciones
- 🎮 **Contenido Educativo** - Mini-juegos y experiencias interactivas
- 📊 **MongoDB Charts** - Dashboards y reportes embebidos

---

## ✨ Características Destacadas

- ✅ **13+ Clientes Activos** - Bancolombia, Yape, Cencosud, ETB, Kushki, y más
- ✅ **1200+ líneas** de código en componente de matriz de decisión interactiva
- ✅ **Sistema de diseño cohesivo** - Paleta MongoDB, componentes reutilizables
- ✅ **API Backend** - Node.js + Express + MongoDB Atlas para demos
- ✅ **CI/CD Automático** - Deploy en Vercel con cada push a main
- ✅ **100+ Rutas** configuradas con URLs limpias
- ✅ **Documentación Completa** - Guías, templates, ejemplos

---

## 🛠️ Stack Tecnológico

### Frontend
```
React 19.1.0
Vite 6.3.5
React Router DOM 7.6.2
CSS Modules + Variables
Lucide React (iconos)
```

### Backend
```
Node.js 20 LTS
Express 4.18
MongoDB Atlas
MongoDB Native Driver 6.3
```

### DevOps
```
Vercel (hosting + CI/CD)
GitHub (version control)
GitHub Actions (automation)
```

---

## 📁 Estructura del Proyecto

```
gomdb-site/
├── public/                    # Assets estáticos
│   ├── img/                  # Imágenes, logos, diagramas SVG
│   ├── sizing/               # Herramientas de sizing
│   └── clientes/             # Contenido por cliente (legacy HTML)
│
├── src/                      # Código fuente React
│   ├── components/          # Componentes reutilizables
│   │   ├── layouts/        # ClientDocumentLayout, etc.
│   │   ├── shared/         # CodeBlock, MetricsCard, etc.
│   │   └── client/         # Componentes específicos
│   ├── pages/              # Páginas por ruta
│   │   └── clientes/      # Páginas de clientes
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Funciones utilitarias
│   └── styles/             # Estilos globales
│
├── templates/               # Templates para copiar
│   ├── ClientDocumentTemplate.jsx
│   └── README.md
│
├── server/                  # Backend API (Flappy Leaf game)
│   ├── index.js
│   └── package.json
│
├── docs/                    # 📚 DOCUMENTACIÓN COMPLETA
│   ├── BEST_PRACTICES.md   # ⭐ Guía de mejores prácticas
│   ├── ARCHITECTURE.md     # 🏗️ Arquitectura del proyecto
│   └── CHECKLIST.md        # ✅ Checklists de desarrollo
│
├── vercel.json             # Configuración Vercel
├── vite.config.js          # Configuración Vite
├── package.json            # Dependencies
├── guia_colaboradores.md   # Guía básica para colaboradores
└── README.md               # Este archivo
```

---

## 🚀 Quick Start

### Prerrequisitos

- Node.js 20+ LTS
- npm 10+
- Git

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/LeoLibertine/gomdb-site.git
cd gomdb-site

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (opcional)
cp .env.example .env
# Editar .env con tus credenciales

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir en navegador
# http://localhost:5173
```

### Build para Producción

```bash
# Build
npm run build

# Preview del build
npm run preview

# Deploy (automático con push a main)
git push origin main
```

---

## 📚 Documentación Completa

### Para Desarrolladores

| Documento | Descripción |
|-----------|-------------|
| **[BEST_PRACTICES.md](./BEST_PRACTICES.md)** | 📘 **Guía completa de mejores prácticas** - Naming conventions, patterns, security, performance |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | 🏗️ **Arquitectura del proyecto** - Stack, componentes clave, flujo de datos, deployment |
| **[CHECKLIST.md](./CHECKLIST.md)** | ✅ **Checklists de desarrollo** - Para documentos, componentes, funcionalidades, deploys |
| **[guia_colaboradores.md](./guia_colaboradores.md)** | 👥 **Guía básica para colaboradores** - Git, estructura, workflow simple |

### Templates y Ejemplos

| Archivo | Uso |
|---------|-----|
| `src/templates/ClientDocumentTemplate.jsx` | Template completo para nuevos documentos de cliente |
| `src/pages/clientes/ejemplo/DocumentoEjemplo.jsx` | Ejemplo práctico con todos los componentes |
| `src/templates/README.md` | Guía de uso de templates |

---

## 🎨 Componentes Reutilizables

### ClientDocumentLayout

Layout estándar para documentos de cliente con header, metadata, breadcrumbs y footer.

```jsx
import { ClientDocumentLayout } from '@/components/layouts'

<ClientDocumentLayout
  client="ETB"
  title="Guía de Licenciamiento"
  date="2025-11-05"
  tags={['licenciamiento', 'atlas']}
>
  {/* contenido */}
</ClientDocumentLayout>
```

### CodeBlock

Bloques de código con syntax highlighting y botón de copiar.

```jsx
import { CodeBlock } from '@/components/shared'

<CodeBlock language="javascript" showLineNumbers>
{`const client = new MongoClient(uri);`}
</CodeBlock>
```

### MetricsCard

Tarjetas para mostrar métricas y KPIs.

```jsx
import { MetricsCard } from '@/components/shared'

<MetricsCard
  title="Métricas Actuales"
  metrics={[
    { label: 'RAM', value: '8', unit: 'GB' },
    { label: 'Storage', value: '500', unit: 'GB', trend: 'up' }
  ]}
/>
```

**Ver más:** [BEST_PRACTICES.md](./BEST_PRACTICES.md) y [templates/README.md](./src/templates/README.md)

---

## 🌟 Clientes Activos

El sitio incluye contenido para 13+ clientes:

- 🏦 **Bancolombia** - 30+ páginas (BDTL, DF, Bintec2025, reportes)
- 💳 **Yape** - Propuestas de arquitectura y comparativas
- 🛒 **Cencosud** - Matriz de decisión MongoDB vs DocumentDB (1200+ líneas)
- 📡 **ETB** - Guías de licenciamiento y optimización
- 💰 **Kushki** - MoneyFlow, OpenSearch comparativas
- 🛡️ **Seguros Bolívar** - POCs y documentación
- 💳 **PayWay** - Kafka, Salesforce, paginación
- 📊 **BDP** - Replicación y arquitectura
- 🏪 **Coppel** - Matriz universal de decisión
- 🗣️ **FalaPe** - Documentación técnica
- 🏢 **Bintec** - Setup local y fraud detection demos
- Y más...

---

## 🔧 Desarrollo

### Agregar Nuevo Documento de Cliente

```bash
# 1. Copiar template
cp src/templates/ClientDocumentTemplate.jsx \
   src/pages/clientes/[cliente]/[NuevoDoc].jsx

# 2. Editar el archivo siguiendo las instrucciones internas

# 3. Agregar ruta en vercel.json
# {
#   "src": "/clientes/[cliente]/[nuevo-doc](?:/.*)?$",
#   "dest": "/index.html"
# }

# 4. Test local
npm run dev

# 5. Commit y push
git add .
git commit -m "docs([cliente]): agrega [descripción]"
git push origin main
```

### Agregar Nuevo Componente

```bash
# 1. Crear archivos
touch src/components/shared/NuevoComponente.jsx
touch src/components/shared/NuevoComponente.css

# 2. Implementar componente con PropTypes

# 3. Agregar a barrel export
# src/components/shared/index.js
export { NuevoComponente } from './NuevoComponente'

# 4. Usar en tus páginas
import { NuevoComponente } from '@/components/shared'
```

**Ver:** [CHECKLIST.md](./CHECKLIST.md) para flujos completos

---

## 🎯 Roadmap

### ✅ Completado

- [x] Migración a React 19 + Vite
- [x] Sistema de componentes reutilizables
- [x] Documentación completa (BEST_PRACTICES, ARCHITECTURE, CHECKLIST)
- [x] Templates y ejemplos
- [x] 13+ clientes con contenido

### 🚧 En Progreso

- [ ] Migrar HTMLs legacy a componentes React
- [ ] Implementar Tailwind CSS
- [ ] Agregar tests (Vitest)

### 🔮 Futuro

- [ ] Backend Python con FastAPI
- [ ] Sistema de autenticación
- [ ] Búsqueda full-text
- [ ] Migración a Next.js 15

---

## 🤝 Contribuir

### Guía Rápida

1. Lee [guia_colaboradores.md](./guia_colaboradores.md) para lo básico
2. Lee [BEST_PRACTICES.md](./BEST_PRACTICES.md) para mejores prácticas
3. Usa [CHECKLIST.md](./CHECKLIST.md) antes de hacer commits
4. Sigue las naming conventions y estructura del proyecto
5. Prueba localmente antes de hacer push

### Workflow Git

```bash
# 1. Crear branch
git checkout -b docs/cliente-nuevo-documento

# 2. Hacer cambios

# 3. Commit descriptivo
git add .
git commit -m "docs(cliente): descripción clara"

# 4. Push
git push origin docs/cliente-nuevo-documento

# 5. Crear PR en GitHub (si aplica)
```

---

## 🐛 Troubleshooting

### Build Fails

```bash
rm -rf node_modules dist .vite
npm install
npm run build
```

### Variables de Entorno No Funcionan

- Verificar prefijo `VITE_`
- Verificar configuradas en Vercel
- Re-deploy después de cambios

### Más ayuda

- 📖 [CHECKLIST.md - Troubleshooting](./CHECKLIST.md#troubleshooting)
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md)
- 📧 leo.alarcon@mongodb.com

---

## 📞 Contacto y Soporte

- **Leo Alarcón** - Solutions Architect MongoDB
- 📧 Email: leo.alarcon@mongodb.com
- 🐛 Issues: [GitHub Issues](https://github.com/LeoLibertine/gomdb-site/issues)
- 📚 Docs: [MongoDB Docs](https://docs.mongodb.com)

---

## 📄 Licencia

Este proyecto es propiedad de MongoDB Inc. y se utiliza internamente para compartir contenido con clientes.

---

## 🙏 Agradecimientos

Construido con ❤️ por el equipo de MongoDB LATAM

**Stack:** React • Vite • MongoDB Atlas • Vercel

**Última actualización:** 2025-11-05