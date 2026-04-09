# Presentación Juan Carlos Sepúlveda — Query Model Evolution
## Plan de contenido para mind map y página de presentación

---

## Audiencia
**Juan Carlos Sepúlveda** — Owner de estrategia de datos en Bancolombia. Visión transversal de gobierno de datos, dominios y pilares de información. No es el dueño técnico del sizing, sino el sponsor estratégico que necesita ver cómo QM encaja en la arquitectura de datos del banco.

---

## Estructura propuesta de la presentación

### 1. Visión Estratégica: Los 3 Pilares de Datos
- **CDP** (Customer Data Platform) — Pilar analítico
- **Data Access Layer** — Pilar operacional / APIs
- **Query Model (QM)** — Pilar transaccional / consultas en tiempo real

> QM no es un componente aislado: es uno de los tres pilares fundamentales de la estrategia de datos del banco.

### 2. Dos Tracks del Query Model

#### Track 1: QM Contingencia → Acceso Permanente en Tiempo Real
- **Estado actual**: QM de contingencia ante caídas del core bancario (iSeries)
- **Evolución**: De contingencia a capa de acceso permanente en tiempo real
- **Pipeline**: iSeries → CDC Extractor → Kafka → Stream Processor → MongoDB Atlas
- **Alcance**: ~20M cuentas de depósitos + productos existentes
- **Objetivo**: Reducir dependencia directa del core para consultas
- **Pendiente**: Post-review del QM actual (colecciones, modelo de datos, índices)

#### Track 2: QM Core Bancario Modernizado (Bonos como piloto)
- **Contexto**: Nuevo core bancario arranca con producto Bonos
- **Filosofía**: "Lo que hacemos en Bonos sienta las bases para todos los demás productos"
- **Pipeline**: Nuevo core → CDC → Kafka → Stream Processor → MongoDB Atlas
- **Colecciones**: Cuentas (account state) + Postings (movimientos)
- **Sizing inicial**: ~100K cuentas, crecimiento a millones cuando migren más productos

### 3. Convergencia de los Tracks
- Cuando Depósitos migre al nuevo core bancario, el QM de contingencia se retira
- El QM modernizado (Track 2) absorbe todo
- Resultado final: **una sola arquitectura QM** para todos los productos
- Diagrama de línea temporal: contingencia → transición → QM unificado

### 4. Arquitectura de Referencia (Genérica)
**Componentes — usar nombres genéricos, NO marcas específicas:**

| Componente | Nombre genérico | Función |
|---|---|---|
| Fuente | Core Bancario (iSeries / Nuevo Core) | Sistema de origen |
| Captura de cambios | CDC Extractor | Captura eventos de cambio |
| Bus de eventos | Kafka | Transporte de eventos |
| Procesamiento | Stream Processor | Transformación y enriquecimiento |
| Destino | MongoDB Atlas | Query Model (lectura optimizada) |
| Archivo | Online Archive → S3 | Datos históricos (3-6 meses hot) |

> **IMPORTANTE**: No mencionar Informatica ni Apache Flink. Usar "CDC Extractor" y "Stream Processor".

### 5. Modelo de Dominio y Gobierno de Datos
- Cada dominio bancario (Bonos, CDT, Depósitos, etc.) tiene responsabilidad sobre sus propios datos
- QM respeta la separación por dominios — no es un monolito
- Alineado con patrón de **Data Mesh / Data Products**
- Sepúlveda como owner transversal de la estrategia de gobierno

### 6. Capacidades Habilitadas por QM
- **Consulta en tiempo real**: Saldos, movimientos, estado de cuenta sin impactar el core
- **Autorización mejorada**: Reducción de tiempo de respuesta en autorizaciones cross-producto
- **Resiliencia**: QM como path primario de lectura, no como fallback
- **Snapshots diarios de saldos**: Nueva colección para conciliación (~20-30M cuentas × 60 días)
- **Archivo inteligente**: Online Archive a S3 después de 3-6 meses

### 7. Decisiones Arquitectónicas Clave
- **QM es path primario** de lectura, no fallback del core
- **Latencia CDC aceptable**: ≤200ms
- **SLA objetivo**: 99.9%
- **Multi-región**: En evaluación, no es prioridad corto plazo
- **Sharding**: No necesario fase 1, planificado antes de fase 2
- **Operación**: Equipo interno del banco (no managed por MongoDB)

### 8. Roadmap de Evolución

| Fase | Alcance | QM Contingencia | QM Modernizado |
|---|---|---|---|
| **Actual** | Depósitos en contingencia | Activo (contingencia) | — |
| **Fase 1** | Bonos en nuevo core | Activo (evolucionando) | Bonos live |
| **Fase 2** | CDT, Inv. Virtual migran | Activo (reduciendo scope) | Bonos + CDT + InvVirtual |
| **Fase 3** | Depósitos migra a nuevo core | Se retira | Todos los productos |
| **Final** | QM unificado | Retirado | Arquitectura única |

---

## Cambios requeridos en las páginas existentes

### Mind Map (`qm-mindmap.html`)
- Agregar nodo de "Estrategia de Datos" con los 3 pilares (CDP, DAL, QM)
- Agregar nodo de "Gobierno de Datos" conectado a Sepúlveda
- Reflejar los dos tracks (Contingencia y Modernización)
- Mostrar convergencia futura
- Reemplazar cualquier mención de Informatica → "CDC Extractor"
- Reemplazar cualquier mención de Apache Flink → "Stream Processor"

### Página de Presentación (`qm-evolution_1.html`)
- Agregar sección de los 3 pilares de datos
- Agregar timeline visual de convergencia de tracks
- Agregar sección de capacidades habilitadas
- Agregar roadmap de evolución por fases
- Eliminar referencias a Informatica y Apache Flink
- Agregar contexto de gobierno de datos y data mesh

---

## Fuentes de información
- Transcripción de reunión con equipo Bancolombia (incluyendo Sepúlveda)
- Cuestionario QM Core Bancario completado por el banco
- Documentación existente de QM contingencia
