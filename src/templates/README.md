# 📚 Templates - GoMDB Site

## 🎯 Propósito

Esta carpeta contiene templates que puedes copiar y usar como punto de partida para crear nuevos documentos y componentes.

---

## 📄 Plantillas Disponibles

### 1. ClientDocumentTemplate.jsx

**Qué es:** Template completo para crear documentos de cliente

**Cuándo usar:** Siempre que necesites crear un nuevo documento técnico para un cliente

**Cómo usar:**

```bash
# 1. Copiar el template a la ubicación del cliente
cp src/templates/ClientDocumentTemplate.jsx \
   src/pages/clientes/etb/NuevoDocumento.jsx

# 2. Abrir el archivo y seguir las instrucciones dentro
# 3. Actualizar props del ClientDocumentLayout
# 4. Reemplazar contenido de ejemplo
# 5. Eliminar comentarios de instrucciones
```

**Incluye:**
- ✅ Estructura completa de documento
- ✅ Todas las secciones recomendadas
- ✅ Ejemplos de uso de componentes
- ✅ Comentarios explicativos

---

## 🚀 Guía Rápida: Crear un Nuevo Documento

### Paso 1: Copiar Template

```bash
# Para cliente ETB, documento de optimización
cp src/templates/ClientDocumentTemplate.jsx \
   src/pages/clientes/etb/Optimizacion.jsx
```

### Paso 2: Editar Archivo

```jsx
// Cambiar el nombre del export
export const ETBOptimizacion = () => {
  return (
    <ClientDocumentLayout
      client="ETB"
      title="Guía de Optimización de Queries"
      subtitle="Mejores prácticas para performance"
      author="Leo Alarcón"
      date="2025-11-05"
      tags={['optimización', 'performance', 'índices']}
    >
      {/* Tu contenido aquí */}
    </ClientDocumentLayout>
  )
}
```

### Paso 3: Agregar Ruta (si es nueva página)

**En React Router (src/App.jsx o similar):**

```jsx
import { ETBOptimizacion } from './pages/clientes/etb/Optimizacion'

// Dentro de <Routes>
<Route path="/clientes/etb/optimizacion" element={<ETBOptimizacion />} />
```

**En vercel.json:**

```json
{
  "src": "/clientes/etb/optimizacion(?:/.*)?$",
  "dest": "/index.html"
}
```

### Paso 4: Probar Localmente

```bash
npm run dev
# Abrir: http://localhost:5173/clientes/etb/optimizacion
```

### Paso 5: Commit y Deploy

```bash
git add .
git commit -m "docs(etb): agrega guía de optimización de queries"
git push origin main
```

---

## 💡 Tips y Mejores Prácticas

### 1. Naming Conventions

```
✅ CORRECTO:
- ETBOptimizacion
- YapeArquitectura
- CencosudMigracion

❌ INCORRECTO:
- etbOptimizacion (camelCase para componentes)
- Etb_Optimizacion (no usar underscore)
- etb-optimizacion (kebab-case solo para archivos)
```

### 2. Estructura de Carpetas

```
src/pages/clientes/
├── etb/
│   ├── Licenciamiento.jsx
│   ├── Optimizacion.jsx
│   └── Migracion.jsx
├── yape/
│   ├── Arquitectura.jsx
│   └── Propuesta.jsx
└── cencosud/
    └── DocumentMongo.jsx
```

### 3. Usar Componentes Reutilizables

```jsx
// ✅ CORRECTO - Reutilizar componentes
import { CodeBlock, MetricsCard } from '@/components/shared'

<MetricsCard metrics={...} />
<CodeBlock language="js">{code}</CodeBlock>

// ❌ EVITAR - Reinventar la rueda
<div className="custom-code-block">
  <pre>{code}</pre>  {/* Ya tenemos CodeBlock */}
</div>
```

### 4. Secciones Obligatorias

Todo documento debe incluir:
1. ✅ Resumen Ejecutivo
2. ✅ Contexto del Cliente
3. ✅ Solución/Propuesta
4. ✅ Próximos Pasos

Secciones opcionales según el tipo:
- Ejemplos de Código (documentos técnicos)
- Sizing y Costos (propuestas comerciales)
- Plan de Implementación (proyectos)
- Mejores Prácticas (guías)

---

## 📊 Ejemplos de Uso de Componentes

### MetricsCard

```jsx
// Ejemplo 1: Métricas simples
<MetricsCard
  title="Configuración Actual"
  metrics={[
    { label: 'Cluster', value: 'M30' },
    { label: 'RAM', value: '8', unit: 'GB' },
    { label: 'Storage', value: '500', unit: 'GB' }
  ]}
/>

// Ejemplo 2: Con trends y variantes
<MetricsCard
  title="Performance Metrics"
  variant="success"
  metrics={[
    {
      label: 'Latency',
      value: '12',
      unit: 'ms',
      trend: 'down',  // ↓ Mejora
      description: 'Promedio últimas 24h'
    },
    {
      label: 'Throughput',
      value: '15K',
      unit: 'ops/s',
      trend: 'up',  // ↑ Crecimiento
      description: 'Máximo registrado'
    }
  ]}
/>
```

### CodeBlock

```jsx
// JavaScript con números de línea
<CodeBlock
  language="javascript"
  title="connection.js"
  showLineNumbers
>
{`const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);
await client.connect();`}
</CodeBlock>

// Python simple
<CodeBlock language="python">
{`from pymongo import MongoClient
client = MongoClient(uri)
db = client.get_database('mydb')`}
</CodeBlock>

// Bash/Shell commands
<CodeBlock language="bash">
{`mongosh "mongodb+srv://cluster.mongodb.net/mydb"
db.collection.createIndex({ field: 1 })`}
</CodeBlock>
```

### Imágenes y Diagramas

```jsx
// Con caption y estilos
<figure>
  <img
    src="/img/clientes/etb/arquitectura.svg"
    alt="Diagrama de arquitectura MongoDB Atlas para ETB"
    loading="lazy"
    style={{
      width: '100%',
      maxWidth: '800px',
      margin: '2rem auto',
      display: 'block'
    }}
  />
  <figcaption style={{
    textAlign: 'center',
    color: 'var(--gray-600)',
    marginTop: '0.5rem',
    fontSize: '0.875rem'
  }}>
    Figura 1: Arquitectura propuesta con MongoDB Atlas
  </figcaption>
</figure>
```

### Tablas

```jsx
<table style={{
  width: '100%',
  borderCollapse: 'collapse',
  margin: '1.5rem 0'
}}>
  <thead>
    <tr style={{
      background: 'var(--gray-100)',
      borderBottom: '2px solid var(--mongodb-green)'
    }}>
      <th style={{ padding: '0.75rem', textAlign: 'left' }}>
        Tier
      </th>
      <th style={{ padding: '0.75rem', textAlign: 'right' }}>
        RAM
      </th>
      <th style={{ padding: '0.75rem', textAlign: 'right' }}>
        Costo/mes
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={{ padding: '0.75rem' }}>M10</td>
      <td style={{ padding: '0.75rem', textAlign: 'right' }}>2 GB</td>
      <td style={{ padding: '0.75rem', textAlign: 'right' }}>$57</td>
    </tr>
    <tr>
      <td style={{ padding: '0.75rem' }}>M20</td>
      <td style={{ padding: '0.75rem', textAlign: 'right' }}>4 GB</td>
      <td style={{ padding: '0.75rem', textAlign: 'right' }}>$140</td>
    </tr>
  </tbody>
</table>
```

---

## 🎨 Personalización de Estilos

### Usar Variables CSS

```jsx
// ✅ CORRECTO - Usar variables
<div style={{ color: 'var(--mongodb-green)' }}>
  Texto verde MongoDB
</div>

// ❌ EVITAR - Colores hardcoded
<div style={{ color: '#00ED64' }}>
  Texto verde
</div>
```

### Variables Disponibles

```css
/* Colores MongoDB */
--mongodb-green: #00ED64
--mongodb-purple: #5644D4
--mongodb-dark: #001E2B
--mongodb-white: #FFFFFF

/* Colores Semánticos */
--success: #00ED64
--warning: #FFB81C
--error: #E03C31
--info: #00A0D2

/* Grises */
--gray-50: #F9FAFB
--gray-100: #F3F4F6
--gray-600: #4B5563
--gray-900: #111827

/* Espaciado */
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
```

---

## 🔍 Debugging

### Componente No Se Renderiza

1. ✅ Verificar import correcto
2. ✅ Verificar export en el componente
3. ✅ Verificar que no hay errores en console
4. ✅ Verificar que la ruta en React Router existe

### Estilos No Aplican

1. ✅ Verificar que importaste el CSS
2. ✅ Verificar nombres de clase (typos)
3. ✅ Verificar especificidad CSS
4. ✅ Verificar DevTools del navegador

### Imágenes No Cargan

1. ✅ Verificar path absoluto (`/img/...`)
2. ✅ Verificar que archivo existe en `public/`
3. ✅ Verificar Network tab en DevTools
4. ✅ Verificar case-sensitive (Linux es case-sensitive)

---

## 📞 Ayuda y Soporte

Si tienes dudas o problemas:

1. 📖 Lee [BEST_PRACTICES.md](../../BEST_PRACTICES.md)
2. 🏗️ Revisa [ARCHITECTURE.md](../../ARCHITECTURE.md)
3. ✅ Consulta [CHECKLIST.md](../../CHECKLIST.md)
4. 📧 Contacta a leo.alarcon@mongodb.com
5. 🐛 Reporta issues en GitHub

---

**Happy Coding!** 🚀

**Última actualización:** 2025-11-05
