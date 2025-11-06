# Project: GoMDB Site - MongoDB Client Portal

## Core Principles

**IMPORTANT**: This project follows established patterns and best practices for maintainability and scalability.

### Mandatory Practices
1. **Component Reusability**: Use existing components (`ClientDocumentLayout`, `CodeBlock`, `MetricsCard`) before creating new ones
2. **Template-First Development**: Always start from `ClientDocumentTemplate.jsx` for new client documents
3. **Consistency**: Follow MongoDB branding guidelines (colors, typography, spacing)
4. **Documentation**: Every complex function needs JSDoc comments
5. **No Hardcoded Secrets**: All credentials in environment variables with `VITE_` prefix

### Read Before Starting
- **[BEST_PRACTICES.md](./BEST_PRACTICES.md)** - Complete development guide (REQUIRED READING)
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and patterns
- **[CHECKLIST.md](./CHECKLIST.md)** - Pre-commit and pre-deploy checklists
- **[guia_colaboradores.md](./guia_colaboradores.md)** - Basic Git workflow

---

## Development Workflow

### For New Client Documents
1. **Copy template**: `cp src/templates/ClientDocumentTemplate.jsx src/pages/clientes/[cliente]/[NuevoDoc].jsx`
2. **Rename component**: Change export name to match document (e.g., `ETBLicenciamiento`)
3. **Update metadata**: Set `client`, `title`, `date`, `tags` in `ClientDocumentLayout`
4. **Replace content**: Follow template structure, delete instruction comments
5. **Add route**: Update `vercel.json` if creating new URL route
6. **Test locally**: `npm run dev` and verify in browser
7. **Verify checklist**: Review `CHECKLIST.md` before commit
8. **Commit**: Use format `docs([cliente]): descriptive message`

### For New Components
1. **Verify necessity**: Component will be used 2+ times?
2. **Create in correct location**:
   - `src/components/shared/` for global components
   - `src/components/client/` for client-specific
   - `src/components/layouts/` for layout components
3. **Include CSS file**: `ComponentName.jsx` + `ComponentName.css`
4. **Define PropTypes**: Required for all props
5. **Add JSDoc**: Document component purpose and props
6. **Export in index**: Add to barrel export in `index.js`
7. **Test with various props**: Edge cases, empty data, long strings

### Git Branch Strategy
- **Feature branches**: `feature/[cliente]-[descripcion]` or `docs/[cliente]-[documento]`
- **Bug fixes**: `fix/[descripcion-breve]`
- **Refactoring**: `refactor/[componente]`
- **Main branch**: Always deployable, protected

---

## Architecture Overview

### Frontend Stack
- **Framework**: React 19.1.0 with Vite 6.3.5
- **Routing**: React Router DOM 7.6.2
- **Styling**: CSS Modules + CSS Variables (MongoDB brand colors)
- **Icons**: Lucide React
- **State Management**: React Context (local state only, no global state manager needed yet)

### Backend Stack
- **Runtime**: Node.js 20 LTS
- **Framework**: Express 4.18 (currently only for Flappy Leaf game API)
- **Database**: MongoDB Atlas
- **ODM**: MongoDB Native Driver 6.3

### Deployment
- **Platform**: Vercel
- **CI/CD**: Automatic deployment on push to `main`
- **Environment**: Production variables in Vercel Dashboard
- **Build**: `npm run build` → static site in `/dist`

### Key Technologies NOT Used
- ❌ TypeScript (plain JavaScript for now)
- ❌ Testing frameworks (in roadmap: Vitest)
- ❌ Tailwind CSS (in roadmap, currently CSS Modules)
- ❌ Next.js (using Vite SPA for simplicity)

---

## Code Standards

### Naming Conventions
```javascript
// Components - PascalCase
export const ClientDocumentLayout = () => {}

// Functions - camelCase
export const calculateMongoDBSizing = () => {}

// Constants - SCREAMING_SNAKE_CASE
export const MONGODB_COLORS = {
  PRIMARY_GREEN: '#00ED64'
}

// CSS Classes - kebab-case
.client-document-layout {}

// Files - Match component name
ClientDocumentLayout.jsx
ClientDocumentLayout.css
```

### Component Structure (MANDATORY)
```javascript
import React from 'react'
import PropTypes from 'prop-types'
import './ComponentName.css'

/**
 * JSDoc documentation
 * @param {string} propName - Description
 */
export const ComponentName = ({ propName }) => {
  // 1. Hooks first
  const [state, setState] = React.useState(null)

  // 2. Helper functions
  const handleClick = () => {}

  // 3. Early returns
  if (!propName) return null

  // 4. Main render
  return <div>{propName}</div>
}

// 5. PropTypes (REQUIRED)
ComponentName.propTypes = {
  propName: PropTypes.string.isRequired
}

// 6. Default props (optional)
ComponentName.defaultProps = {
  propName: 'default'
}
```

### CSS Standards
```css
/* ALWAYS use CSS variables, NEVER hardcode colors */
.component {
  color: var(--mongodb-green);        /* ✅ CORRECT */
  color: #00ED64;                     /* ❌ WRONG */
}

/* Use 8px spacing system */
.component {
  padding: var(--spacing-md);         /* ✅ CORRECT (16px) */
  padding: 15px;                      /* ❌ WRONG (odd number) */
}
```

### Import Order
```javascript
// 1. React and external libraries
import React from 'react'
import PropTypes from 'prop-types'

// 2. Internal components (absolute imports)
import { ClientDocumentLayout } from '@/components/layouts'
import { CodeBlock, MetricsCard } from '@/components/shared'

// 3. Utils and constants
import { calculateSizing } from '@/utils/calculations'
import { MONGODB_COLORS } from '@/constants'

// 4. Styles (always last)
import './ComponentName.css'
```

---

## Client Document Structure

### Required Sections (in order)
1. **Resumen Ejecutivo** - Executive summary (2-3 paragraphs)
2. **Contexto del Cliente** - Client context and current situation
3. **Arquitectura/Solución Propuesta** - Proposed solution with diagrams
4. **Ejemplos de Código** - Implementation examples (if technical)
5. **Próximos Pasos** - Next steps and action items
6. **Contacto** - Contact information

### Optional Sections (use as needed)
- Sizing y Costos - MongoDB Atlas sizing and pricing
- Mejores Prácticas - Best practices recommendations
- Plan de Implementación - Detailed implementation timeline
- Comparativas - Technology comparisons (Oracle vs MongoDB, etc.)

### Always Include
- ✅ `<ClientDocumentLayout>` wrapper with complete metadata
- ✅ `<MetricsCard>` for displaying metrics and KPIs
- ✅ `<CodeBlock>` for all code examples (never plain `<pre>`)
- ✅ Proper image optimization (WebP, lazy loading, alt text)
- ✅ Semantic HTML (`<section>`, `<h2>`, `<h3>`)

---

## File Organization

### Component Locations
```
src/components/
├── layouts/
│   ├── ClientDocumentLayout.jsx    # Standard document layout
│   ├── ClientDocumentLayout.css
│   └── index.js                     # Barrel export
├── shared/
│   ├── CodeBlock.jsx                # Code display component
│   ├── CodeBlock.css
│   ├── MetricsCard.jsx              # Metrics display
│   ├── MetricsCard.css
│   └── index.js                     # Barrel export
└── client/
    └── [specific components]        # Client-specific components
```

### Page Structure
```
src/pages/clientes/
├── bancolombia/
│   ├── Licenciamiento.jsx
│   └── Optimizacion.jsx
├── yape/
│   └── Arquitectura.jsx
├── etb/
│   └── Migracion.jsx
└── ejemplo/
    └── DocumentoEjemplo.jsx         # Reference example
```

### Static Assets
```
public/
├── img/
│   ├── mongodb-logo.svg
│   └── clientes/
│       ├── etb/                     # Client-specific images
│       ├── yape/
│       └── bancolombia/
├── sizing/                          # Sizing tools
└── clientes/                        # Legacy HTML (migrating to React)
```

---

## Quality Gates

### Before Every Commit
- [ ] Run `npm run dev` and verify changes work
- [ ] No `console.log()` or `debugger` statements
- [ ] No hardcoded credentials or secrets
- [ ] All images optimized (WebP preferred)
- [ ] PropTypes defined for all components
- [ ] Review `CHECKLIST.md` appropriate section

### Before Push to Main
- [ ] Run `npm run build` successfully
- [ ] Run `npm run lint` passes without errors
- [ ] Preview build with `npm run preview`
- [ ] Update `vercel.json` with new routes (if applicable)
- [ ] No merge conflicts with main branch
- [ ] Commit message follows convention

### Commit Message Format
```bash
# Format: type(scope): description
feat(etb): agrega guía de optimización de índices
fix(shared): corrige bug en CodeBlock con líneas largas
docs(yape): actualiza propuesta de arquitectura
refactor(layouts): simplifica ClientDocumentLayout
style: actualiza colores MongoDB brand
chore: actualiza dependencias React
```

---

## Common Patterns

### Using Existing Components

#### ClientDocumentLayout
```javascript
import { ClientDocumentLayout } from '@/components/layouts'

<ClientDocumentLayout
  client="ETB"
  title="Guía de Licenciamiento MongoDB Atlas"
  subtitle="Comparativa de modelos y pricing"
  author="Leo Alarcón"
  date="2025-11-05"
  tags={['licenciamiento', 'atlas', 'pricing']}
  showExportButton={true}
>
  {/* Your content sections here */}
</ClientDocumentLayout>
```

#### CodeBlock
```javascript
import { CodeBlock } from '@/components/shared'

// JavaScript with line numbers
<CodeBlock language="javascript" showLineNumbers title="connection.js">
{`const client = new MongoClient(uri);
await client.connect();`}
</CodeBlock>

// Python simple
<CodeBlock language="python">
{`from pymongo import MongoClient
client = MongoClient(uri)`}
</CodeBlock>
```

#### MetricsCard
```javascript
import { MetricsCard } from '@/components/shared'

<MetricsCard
  title="Configuración Actual"
  variant="info"
  metrics={[
    { label: 'Cluster Tier', value: 'M30' },
    { label: 'RAM', value: '8', unit: 'GB' },
    { label: 'Storage', value: '500', unit: 'GB', trend: 'up' }
  ]}
/>
```

---

## MongoDB Branding Guidelines

### Colors (ALWAYS use variables)
```css
--mongodb-green: #00ED64     /* Primary brand color */
--mongodb-purple: #5644D4    /* Secondary brand color */
--mongodb-dark: #001E2B      /* Dark backgrounds */
--mongodb-white: #FFFFFF     /* Light backgrounds */
```

### Typography
```css
--font-primary: 'Euclid Circular A', -apple-system, sans-serif
--font-mono: 'MongoDB Value Serif', 'Courier New', monospace
```

### Spacing System (8px base)
```css
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
```

---

## Environment Variables

### Required Format
```bash
# MUST start with VITE_ prefix for Vite to expose to client
VITE_MONGO_URI=mongodb+srv://...
VITE_API_BASE_URL=https://api.gomdb.com

# Backend only (no VITE_ prefix)
MONGODB_URI=mongodb+srv://...
PORT=3000
```

### Never Commit
- ❌ `.env` file (in .gitignore)
- ❌ Hardcoded connection strings
- ❌ API keys or tokens
- ✅ `.env.example` with placeholder values

---

## Current State & Roadmap

### ✅ Available Now
- React 19 + Vite build system
- 3 reusable components (ClientDocumentLayout, CodeBlock, MetricsCard)
- Complete template system
- 13+ active clients with content
- Comprehensive documentation

### 🚧 In Progress
- Migrating legacy HTML files to React components
- Building component library

### 🔮 Future (Roadmap)
- Tailwind CSS implementation
- Testing framework (Vitest)
- TypeScript migration
- Backend Python with FastAPI
- Authentication system

---

## Troubleshooting

### Build Fails
```bash
rm -rf node_modules dist .vite
npm install
npm run build
```

### Component Not Found
- Verify import path uses `@/` alias
- Check barrel export in `index.js`
- Ensure component is exported correctly

### Styles Not Applying
- Verify CSS file is imported
- Check CSS variable names (case-sensitive)
- Inspect element in DevTools

### Images Not Loading
- Use absolute paths: `/img/...` not `./img/...`
- Verify file exists in `public/` directory
- Check Vercel deployment logs for 404s

---

## Quick Reference

### Start Development
```bash
npm run dev                  # Start dev server (port 5173)
```

### Build & Preview
```bash
npm run build               # Build for production
npm run preview            # Preview production build
```

### Lint
```bash
npm run lint               # Run ESLint
```

### Useful Commands
```bash
# Create new document from template
cp src/templates/ClientDocumentTemplate.jsx src/pages/clientes/[cliente]/[Doc].jsx

# Find all console.logs (should be zero before commit)
grep -r "console.log" src/

# Check file size
du -sh public/img/clientes/[cliente]/*
```

---

## Key Contacts

- **Leo Alarcón** - Solutions Architect MongoDB
- **Email**: leo.alarcon@mongodb.com
- **Issues**: [GitHub Issues](https://github.com/LeoLibertine/gomdb-site/issues)

---

## Additional Resources

- 📘 [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Complete guide
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- ✅ [CHECKLIST.md](./CHECKLIST.md) - Development checklists
- 📚 [React Docs](https://react.dev)
- 📚 [Vite Docs](https://vitejs.dev)
- 📚 [MongoDB Docs](https://docs.mongodb.com)

---

**Last Updated**: 2025-11-05
**Project Status**: Active Development
**Tech Stack**: React 19 • Vite 6 • MongoDB Atlas • Vercel
