# Directorio de Clientes MongoDB LATAM

Este directorio contiene los casos de éxito de clientes MongoDB en Latinoamérica, con un diseño moderno inspirado en [mongodb.com/solutions/customer-case-studies](https://www.mongodb.com/solutions/customer-case-studies).

## 📁 Estructura

```
clientes/
├── clientes.html              # Página principal con todos los casos
├── clients-data.json          # Metadata de todos los clientes
├── _template.html             # Plantilla para nuevas páginas de cliente
├── README.md                  # Este archivo
├── bancolombia/               # Directorio del cliente
│   ├── queryflux-stream.html
│   └── ...
├── yape/
│   ├── index.html
│   └── ...
└── [cliente]/                 # Otros directorios de clientes
```

## ✨ Características del Diseño

### Página Principal (clientes.html)
- **Filtrado dinámico** por industria (Fintech, Banca, Pagos, Retail, Telecom, Seguros)
- **Cards interactivas** con hover effects y animaciones
- **Diseño responsive** adaptado a móviles, tablets y desktop
- **Color palette** MongoDB oficial:
  - Verde: `#00ED64`
  - Dark Navy: `#001E2B`
  - Navy: `#213542`
- **Tipografía**: Euclid Circular A + Source Serif Pro

### Plantilla Individual (_template.html)
- **Hero section** con gradiente y logo del cliente
- **Stats cards** para métricas clave
- **Challenge/Solution layout** en dos columnas
- **Customer quote** destacada con diseño editorial
- **Results section** con 3 métricas de impacto
- **Technology stack** cards

## 🚀 Cómo Agregar un Nuevo Cliente

### Paso 1: Actualizar `clients-data.json`

Agrega un nuevo objeto al array `clients`:

```json
{
  "id": "nombre-cliente",
  "name": "Nombre del Cliente",
  "country": "País",
  "logo_color": "#FFFFFF",
  "logo_bg": "#COLOR_BRAND",
  "logo_letter": "X",
  "industries": ["banking", "fintech"],
  "description": "Breve descripción de 2-3 líneas sobre el caso de éxito.",
  "url": "clientes/nombre-cliente/index.html",
  "use_cases": ["Use Case 1", "Use Case 2", "Use Case 3"],
  "tech_stack": ["MongoDB Atlas", "Tech 2", "Tech 3"],
  "featured": true,
  "status": "active"
}
```

**Industrias disponibles:**
- `fintech`
- `banking`
- `payments`
- `retail`
- `telecom`
- `insurance`

### Paso 2: Actualizar `clientes.html`

Agrega un nuevo card en la sección `<!-- Client Cases Grid -->`:

```html
<!-- Nuevo Cliente -->
<a href="clientes/nombre-cliente/index.html" class="client-card rounded-2xl p-6 flex flex-col justify-between" data-industries="banking fintech">
    <div>
        <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 bg-[COLOR] rounded-lg flex items-center justify-center">
                <span class="text-2xl font-bold text-white">X</span>
            </div>
            <span class="industry-tag tag-banking">Banca</span>
        </div>
        <h3 class="text-xl font-bold mb-3">Nombre del Cliente</h3>
        <p class="text-sm text-gray-300 leading-relaxed line-clamp-3">
            Descripción breve del caso de éxito...
        </p>
    </div>
    <div class="mt-4 pt-4 border-t border-white/10">
        <div class="flex items-center justify-between text-xs text-gray-400">
            <span>Categoría</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </div>
    </div>
</a>
```

### Paso 3: Crear Directorio del Cliente

```bash
mkdir -p clientes/nombre-cliente
```

### Paso 4: Crear Página Individual

Copia `_template.html` y reemplaza los placeholders:

```bash
cp clientes/_template.html clientes/nombre-cliente/index.html
```

**Placeholders a reemplazar:**

| Placeholder | Descripción | Ejemplo |
|-------------|-------------|---------|
| `[CLIENT_NAME]` | Nombre del cliente | Bancolombia |
| `[COUNTRY]` | País | Colombia |
| `[INDUSTRY]` | Industria principal | Banca |
| `[CLIENT_COLOR]` | Color de marca | #FFDD00 |
| `[BRIEF_DESCRIPTION]` | Descripción breve | Implementación de Atlas... |
| `[TECH_1]`, `[TECH_2]` | Tecnologías | Stream Processing |
| `[STAT_X_VALUE]` | Valor de métrica | 900/seg |
| `[STAT_X_LABEL]` | Label de métrica | Eventos procesados |
| `[CHALLENGE_DESCRIPTION]` | Descripción del desafío | El cliente enfrentaba... |
| `[PAIN_POINT_X]` | Puntos de dolor | Latencia alta en consultas |
| `[SOLUTION_DESCRIPTION]` | Descripción de solución | MongoDB Atlas Stream... |
| `[SOLUTION_POINT_X]` | Puntos de solución | Procesamiento en tiempo real |
| `[CUSTOMER_QUOTE]` | Cita del cliente | MongoDB nos permitió... |
| `[PERSON_NAME]` | Nombre del contacto | Juan Pérez |
| `[PERSON_TITLE]` | Cargo | CTO |
| `[RESULT_X_VALUE]` | Resultado métrica | 10x |
| `[RESULT_X_LABEL]` | Label de resultado | Mejora en rendimiento |
| `[TECH_STACK_X]` | Tecnología MongoDB | Atlas Search |
| `[TECH_DESCRIPTION_X]` | Descripción técnica | Motor de búsqueda... |

## 🎨 Guía de Estilo

### Colores de Industrias

Usa estos colores en los tags y elementos:

- **Fintech**: `#00A0DC` (azul claro)
- **Banking**: `#00ED64` (verde MongoDB)
- **Payments**: `#64C8FF` (azul cielo)
- **Retail**: `#FF69B4` (rosa)
- **Telecom**: `#8A2BE2` (púrpura)
- **Insurance**: `#FFA500` (naranja)

### Iconos Lucide

Los iconos más usados:

- `database` - Base de datos
- `activity` - Monitoreo/métricas
- `shield` - Seguridad
- `trending-up` - Crecimiento
- `zap` - Rendimiento
- `users` - Usuarios
- `arrow-right` - Navegación

## 📊 Ejemplos de Métricas

### Stats Cards (Hero)
- **Volumen**: "900/seg", "10M+", "5TB"
- **Mejora**: "10x", "50%", "3 meses"
- **Alcance**: "20M usuarios", "5 países", "24/7"
- **Rendimiento**: "<10ms", "99.99%", "100K TPS"

### Results Cards
- **Rendimiento**: "+200% velocidad", "10x más rápido"
- **Ahorro**: "-60% costos", "$500K ahorrados"
- **Escalabilidad**: "5x crecimiento", "De 1M a 10M usuarios"

## 🔗 Links y Navegación

Todas las páginas individuales deben incluir:
- Link de retorno a `clientes.html`
- CTAs a contacto de MongoDB
- Links a documentación técnica (opcional)

## 📝 Checklist para Nuevo Cliente

- [ ] Actualizado `clients-data.json`
- [ ] Agregado card en `clientes.html`
- [ ] Creado directorio del cliente
- [ ] Copiado y personalizado `_template.html`
- [ ] Reemplazados todos los placeholders
- [ ] Verificado que los filtros funcionan
- [ ] Revisado diseño responsive
- [ ] Probado links de navegación
- [ ] Optimizadas imágenes (si aplica)

## 🚀 Deployment

Después de agregar nuevos clientes:

1. Revisar en local que todo funcione
2. Verificar responsive design
3. Hacer commit de los cambios
4. Deploy a producción

## 💡 Tips

- **Mantén consistencia** en el tono y formato de las descripciones
- **Usa métricas reales** siempre que sea posible
- **Citas auténticas** de los clientes agregan credibilidad
- **Imágenes de alta calidad** mejoran la presentación
- **SEO**: Usa títulos descriptivos y meta descriptions
- **Accesibilidad**: Verifica contraste de colores y alt texts

## 🔧 Mantenimiento

### Actualizar un cliente existente
1. Edita `clients-data.json` con nuevos datos
2. Actualiza el card en `clientes.html` si es necesario
3. Modifica la página individual del cliente

### Archivar un cliente
1. Cambia `"status": "active"` a `"status": "archived"` en JSON
2. Comenta el card en `clientes.html` o elimínalo
3. Mantén los archivos por historial

---

**Última actualización**: Noviembre 2024
**Contacto**: [tu-email]@mongodb.com
