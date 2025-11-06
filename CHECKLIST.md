# ✅ Checklist de Desarrollo - GoMDB Site

## 📋 Tabla de Contenidos

1. [Checklist: Nuevo Documento de Cliente](#nuevo-documento-cliente)
2. [Checklist: Nuevo Componente](#nuevo-componente)
3. [Checklist: Nueva Funcionalidad](#nueva-funcionalidad)
4. [Checklist: Pre-Deploy](#pre-deploy)
5. [Checklist: Code Review](#code-review)

---

## 📄 Nuevo Documento de Cliente

### Antes de Empezar

- [ ] Tengo claro el objetivo del documento
- [ ] Sé quién es la audiencia (técnico, ejecutivo, mixto)
- [ ] Tengo todos los assets necesarios (diagramas, código, datos)
- [ ] Revisé documentos similares para mantener consistencia

### Desarrollo

- [ ] Copié `ClientDocumentTemplate.jsx` a la ubicación correcta
  ```bash
  cp src/templates/ClientDocumentTemplate.jsx src/pages/clientes/[cliente]/[NombreDoc].jsx
  ```

- [ ] Renombré el componente apropiadamente
  ```javascript
  // ❌ export const ClientDocumentTemplate
  // ✅ export const ETBLicenciamiento
  ```

- [ ] Actualicé los props del `ClientDocumentLayout`:
  - [ ] `client` - Nombre del cliente
  - [ ] `title` - Título descriptivo
  - [ ] `date` - Fecha en formato YYYY-MM-DD
  - [ ] `tags` - Al menos 2-3 tags relevantes

- [ ] Incluí las secciones obligatorias:
  - [ ] Resumen Ejecutivo
  - [ ] Contexto del Cliente
  - [ ] Solución/Propuesta
  - [ ] Ejemplos de código (si aplica)
  - [ ] Próximos Pasos
  - [ ] Contacto

- [ ] Usé componentes reutilizables:
  - [ ] `<CodeBlock>` para código
  - [ ] `<MetricsCard>` para métricas
  - [ ] HTML semántico (`<section>`, `<h2>`, `<h3>`)

- [ ] Optimicé imágenes:
  - [ ] Convertí a WebP (si es posible)
  - [ ] Agregué `alt` text descriptivo
  - [ ] Agregué `loading="lazy"`
  - [ ] Especifiqué width y height

- [ ] Verifiqué links:
  - [ ] Todos los links funcionan
  - [ ] Links externos tienen `target="_blank"` y `rel="noopener noreferrer"`
  - [ ] Links internos usan rutas relativas correctas

### Configuración de Routing

- [ ] Agregué la ruta en `vercel.json`:
  ```json
  {
    "src": "/clientes/etb/licenciamiento(?:/.*)?$",
    "dest": "/clientes/etb/licenciamiento.html"
  }
  ```

- [ ] Agregué la ruta en React Router (si aplica):
  ```jsx
  <Route path="/clientes/etb/licenciamiento" element={<ETBLicenciamiento />} />
  ```

### Testing Local

- [ ] Corrí el sitio localmente:
  ```bash
  npm run dev
  ```

- [ ] Verifiqué en el navegador:
  - [ ] El documento se renderiza correctamente
  - [ ] No hay errores en la consola
  - [ ] Las imágenes cargan
  - [ ] Los links funcionan
  - [ ] El botón de exportar PDF funciona
  - [ ] Se ve bien en mobile (responsive)

- [ ] Construí para producción:
  ```bash
  npm run build
  npm run preview
  ```

### Pre-Commit

- [ ] Eliminé `console.log()` de debugging
- [ ] Eliminé código comentado innecesario
- [ ] Verifiqué que no hay credenciales hardcodeadas
- [ ] Revisé spelling y gramática
- [ ] Formateé el código (Prettier/ESLint)

### Commit y Push

- [ ] Creé branch descriptivo:
  ```bash
  git checkout -b docs/etb-licenciamiento
  ```

- [ ] Commit con mensaje descriptivo:
  ```bash
  git add .
  git commit -m "docs(etb): agrega guía de licenciamiento MongoDB Atlas"
  git push origin docs/etb-licenciamiento
  ```

- [ ] Creé Pull Request en GitHub (si aplica)

---

## 🧩 Nuevo Componente

### Planning

- [ ] El componente es verdaderamente reutilizable (usado 2+ veces)
- [ ] Definí claramente sus props
- [ ] Decidí si es `shared` o `client` specific

### Desarrollo

- [ ] Creé el archivo en la ubicación correcta:
  - `src/components/shared/` - Componentes globales
  - `src/components/client/` - Componentes de cliente específico
  - `src/components/layouts/` - Layouts

- [ ] Estructura del componente:
  - [ ] Imports organizados
  - [ ] JSDoc documentation
  - [ ] PropTypes definidos
  - [ ] Default props (si aplica)
  - [ ] Export al final

- [ ] Creé archivo CSS correspondiente:
  ```
  ComponentName.jsx
  ComponentName.css
  ```

- [ ] Usé naming conventions:
  - [ ] PascalCase para nombre de componente
  - [ ] camelCase para props
  - [ ] kebab-case para clases CSS

- [ ] Implementé accesibilidad:
  - [ ] `aria-label` en botones con iconos
  - [ ] `alt` text en imágenes
  - [ ] Contraste de colores adecuado
  - [ ] Keyboard navigation funciona

- [ ] Agregué al barrel export:
  ```javascript
  // src/components/shared/index.js
  export { NuevoComponente } from './NuevoComponente'
  ```

### Testing

- [ ] Probé con diferentes props
- [ ] Probé edge cases (datos vacíos, strings largos, etc.)
- [ ] Verifiqué responsive design
- [ ] Probé en Chrome, Firefox, Safari (si es posible)

### Documentación

- [ ] Actualicé `BEST_PRACTICES.md` (si aplica)
- [ ] Agregué ejemplo de uso en JSDoc
- [ ] Documenté props complejos

---

## ⚙️ Nueva Funcionalidad

### Planning

- [ ] Definí claramente el objetivo
- [ ] Identifiqué componentes/archivos a modificar
- [ ] Consideré impacto en performance
- [ ] Verifiqué que no existe algo similar

### Desarrollo

- [ ] Seguí los patrones existentes del proyecto
- [ ] Mantuve componentes pequeños y enfocados
- [ ] Separé lógica de UI
- [ ] Usé custom hooks para lógica reutilizable

### Testing

- [ ] Probé la funcionalidad completa
- [ ] Probé casos error (network fail, datos inválidos)
- [ ] Verifiqué que no rompí funcionalidad existente
- [ ] Probé en mobile

### Performance

- [ ] Implementé lazy loading (si aplica)
- [ ] Optimicé imágenes
- [ ] Evité re-renders innecesarios
- [ ] Usé `useMemo`/`useCallback` apropiadamente

---

## 🚀 Pre-Deploy

### Code Quality

- [ ] No hay `console.log()` en producción
- [ ] No hay `debugger` statements
- [ ] No hay TODOs críticos sin resolver
- [ ] ESLint pasa sin errores
  ```bash
  npm run lint
  ```

### Build

- [ ] Build de producción exitoso:
  ```bash
  npm run build
  ```

- [ ] No hay warnings críticos en el build
- [ ] Tamaño del bundle es razonable (<500KB ideal)

### Testing Final

- [ ] Probé con `npm run preview`
- [ ] Verifiqué todas las páginas principales
- [ ] Probé en mobile (Chrome DevTools)
- [ ] Verifiqué que imágenes cargan
- [ ] Probé funcionalidad interactiva

### Seguridad

- [ ] No hay credenciales en el código
- [ ] `.env` está en `.gitignore`
- [ ] Variables de entorno configuradas en Vercel
- [ ] No hay data sensible en commits

### SEO (si aplica)

- [ ] Títulos descriptivos (`<title>`)
- [ ] Meta descriptions
- [ ] Open Graph tags (para compartir en redes)

### Vercel Config

- [ ] `vercel.json` actualizado con nuevas rutas
- [ ] Variables de entorno configuradas
- [ ] Build settings correctos

### Git

- [ ] Branch sincronizado con main:
  ```bash
  git checkout main
  git pull origin main
  git checkout mi-branch
  git merge main
  ```

- [ ] Sin conflictos de merge
- [ ] Commits con mensajes descriptivos

### Deploy

- [ ] Push a main (o merge PR):
  ```bash
  git push origin main
  ```

- [ ] Vercel detecta cambio y hace deploy
- [ ] Verifiqué deploy exitoso en Vercel Dashboard
- [ ] Probé la URL de producción

### Post-Deploy

- [ ] Verifiqué que el sitio funciona en producción
- [ ] Probé las páginas nuevas/modificadas
- [ ] No hay errores en Vercel logs
- [ ] Métricas de performance aceptables (Web Vitals)

---

## 👀 Code Review

### Para el Autor

- [ ] Probé todo localmente
- [ ] Documenté cambios complejos
- [ ] Agregué screenshots en PR (si hay cambios visuales)
- [ ] Limpié código de debugging
- [ ] Build pasa sin warnings

### Para el Reviewer

#### General

- [ ] El código sigue las convenciones del proyecto
- [ ] Los nombres son descriptivos
- [ ] La lógica es clara y fácil de entender
- [ ] No hay código duplicado innecesario

#### React Specific

- [ ] Componentes son pequeños y enfocados
- [ ] Props tienen PropTypes
- [ ] No hay lógica compleja en render
- [ ] Hooks usados correctamente
- [ ] No hay memory leaks (useEffect cleanup)

#### Styling

- [ ] Usa variables CSS (no colores hardcoded)
- [ ] Responsive design implementado
- [ ] No hay inline styles innecesarios
- [ ] Accesibilidad considerada

#### Performance

- [ ] Imágenes optimizadas
- [ ] No hay operaciones costosas en render
- [ ] Lazy loading implementado (si aplica)
- [ ] Code splitting apropiado

#### Security

- [ ] No hay credenciales expuestas
- [ ] Inputs sanitizados (si aplica)
- [ ] Links externos seguros

#### Testing

- [ ] Código probado manualmente
- [ ] Edge cases considerados
- [ ] Error handling apropiado

---

## 📝 Templates de Commit Messages

```bash
# Features
feat(cliente): agrega nuevo documento de licenciamiento
feat(shared): agrega componente MetricsCard

# Bug Fixes
fix(etb): corrige enlace roto en documento
fix(layout): corrige responsive en mobile

# Documentación
docs: actualiza guía de mejores prácticas
docs(readme): agrega instrucciones de instalación

# Refactoring
refactor(shared): simplifica lógica de CodeBlock
refactor: migra componente a TypeScript

# Styling
style(client): actualiza colores MongoDB brand
style: formatea código con Prettier

# Performance
perf(images): optimiza imágenes a WebP
perf: implementa lazy loading

# Chores
chore: actualiza dependencias
chore(config): actualiza vercel.json con nuevas rutas
```

---

## 🆘 Troubleshooting Common Issues

### Build Fails

```bash
# Limpiar cache y node_modules
rm -rf node_modules dist .vite
npm install
npm run build
```

### Routing No Funciona en Vercel

- Verificar `vercel.json` tiene la ruta
- Verificar pattern regex correcto
- Verificar orden de rutas (más específico primero)

### Imágenes No Cargan

- Verificar path correcto (`/img/...` no `./img/...`)
- Verificar archivo existe en `public/`
- Verificar Vercel logs para 404s

### Variables de Entorno No Funcionan

- Verificar prefijo `VITE_` en variable
- Verificar configuradas en Vercel Dashboard
- Re-deploy después de agregar variables

---

## 📚 Referencias Rápidas

- [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Mejores prácticas detalladas
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura del proyecto
- [guia_colaboradores.md](./guia_colaboradores.md) - Guía básica
- [React Docs](https://react.dev)
- [Vercel Docs](https://vercel.com/docs)

---

**Última actualización:** 2025-11-05
**Mantenido por:** Leo Alarcón (leo.alarcon@mongodb.com)
