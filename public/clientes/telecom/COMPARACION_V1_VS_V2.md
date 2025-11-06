# Comparación: generate_metrics.py (v1) vs generate_metrics_v2.py

## 📊 Resumen Ejecutivo

| Aspecto | v1 (Original) | v2 (Nuevo) |
|---------|--------------|------------|
| **Propósito** | Demo FinOps con simulación | Métricas reales para monitoring |
| **OPS** | ❌ Simuladas | ✅ Reales (2 snapshots) |
| **Storage** | ✅ Real | ✅ Real (más detallado) |
| **Memoria** | ❌ No incluida | ✅ Real (cacheStats) |
| **Histórico** | ❌ No | ✅ Timeseries (JSONL) |
| **Clientes** | ✅ Agrupación 3 clientes | ❌ Individual por DB |
| **Costos** | ✅ Cálculo financiero | ❌ No incluido |
| **Uso** | Dashboard demo | Monitoring producción |

## 🎯 Caso de Uso

### v1 - generate_metrics.py
**Objetivo:** Presentación de FinOps y demos comerciales

```
┌─────────────────────────────────────────────┐
│         CASO DE USO v1                      │
│                                             │
│  • Mostrar costos por cliente interno      │
│  • Simular proyecciones de facturación     │
│  • Demo para stakeholders                  │
│  • Prototipo de sistema FinOps             │
│                                             │
│  Audiencia: CFO, managers, finanzas        │
└─────────────────────────────────────────────┘
```

### v2 - generate_metrics_v2.py
**Objetivo:** Monitoring operacional y análisis de capacidad

```
┌─────────────────────────────────────────────┐
│         CASO DE USO v2                      │
│                                             │
│  • Monitoreo de carga (OPS) en real-time  │
│  • Análisis de uso de memoria              │
│  • Planificación de capacidad              │
│  • Detección de anomalías                  │
│  • Histórico de tendencias                 │
│                                             │
│  Audiencia: DevOps, SRE, DBAs              │
└─────────────────────────────────────────────┘
```

## 📋 Comparación Detallada

### 1. Métricas de OPS (Operaciones por Segundo)

#### v1 - Simuladas
```python
def calculate_simulated_metrics(storage_gb: float):
    # OPS proporcionales al tamaño
    base_ops = (storage_gb / 10) * random.uniform(0.8, 1.2)
    operations_per_sec = round(base_ops, 2)
    # ❌ No refleja carga real
```

**Características:**
- ❌ No mide actividad real
- ❌ Basada en fórmula arbitraria
- ✅ Útil para demos
- ❌ No apta para decisiones operacionales

#### v2 - Reales (2 Snapshots)
```python
def get_ops_metrics(client, interval_seconds):
    # Snapshot 1
    snapshot_1 = db.command("dbStats").get('opcounters')
    time.sleep(interval_seconds)
    # Snapshot 2
    snapshot_2 = db.command("dbStats").get('opcounters')
    # Cálculo real
    ops_per_sec = (snapshot_2 - snapshot_1) / time_delta
    # ✅ Refleja carga real
```

**Características:**
- ✅ Medición real de actividad
- ✅ Precisión configurable
- ✅ Apta para alertas
- ✅ Base para capacity planning

### 2. Métricas de Storage

#### v1
```python
# Storage básico
storage_bytes = stats.get('dataSize', 0) + stats.get('indexSize', 0)
storage_gb = storage_bytes / (1024 ** 3)
```

**Características:**
- ✅ Medición real
- ⚠️  Agregado simple
- ❌ No separa data vs indexes

#### v2
```python
# Storage detallado
data_size_gb = stats.get('dataSize', 0) / (1024 ** 3)
index_size_gb = stats.get('indexSize', 0) / (1024 ** 3)
storage_gb = data_size_gb + index_size_gb
```

**Características:**
- ✅ Medición real
- ✅ Separación data/indexes
- ✅ Análisis más granular
- ✅ Detección de índices pesados

### 3. Métricas de Memoria

#### v1
```python
# ❌ No implementado
```

#### v2
```python
# Cache/RAM real
cache_stats = stats.get('cacheStats', {})
cache_bytes = cache_stats.get('bytes currently in the cache', 0)
cache_gb_used = cache_bytes / (1024 ** 3)
```

**Características:**
- ✅ Memoria real en uso
- ✅ Working set size
- ✅ Ratio RAM/Storage
- ✅ Base para dimensionamiento

### 4. Agrupación de Datos

#### v1 - Por Cliente Interno
```json
{
  "clientes": [
    {
      "nombre": "FMS",
      "storage_gb": 600,
      "databases": ["fms_prod", "fms_analytics", "..."],
      "cost_monthly": 7250.00
    },
    {
      "nombre": "Desarrollo",
      "storage_gb": 50,
      ...
    }
  ]
}
```

**Ventajas:**
- ✅ Vista de negocio
- ✅ Cálculo de costos
- ✅ Facturación interna
- ✅ Showback/Chargeback

#### v2 - Por Base de Datos
```json
{
  "databases": [
    {
      "name": "fms_production",
      "ops_per_second": 1250.5,
      "storage_gb": 350.5,
      "cache_gb_used": 2048.3,
      ...
    }
  ]
}
```

**Ventajas:**
- ✅ Vista técnica
- ✅ Análisis individual
- ✅ Troubleshooting
- ✅ Optimización granular

### 5. Formato de Salida

#### v1 - JSON Único
```
metricas_mongodb.json
└─ Snapshot actual (se sobrescribe)
```

**Características:**
- ✅ Simple
- ✅ Fácil de leer
- ❌ No hay histórico
- ❌ No permite análisis temporal

#### v2 - Dual Output
```
metrics_latest.json
└─ Snapshot actual (dashboard)

metrics_timeseries.jsonl
└─ Histórico acumulativo (análisis)
```

**Características:**
- ✅ Best of both worlds
- ✅ Dashboard en tiempo real
- ✅ Histórico para tendencias
- ✅ Análisis retrospectivo

### 6. Simulación vs Realidad

#### v1 - Modos de Operación
```python
MODE = "demo"  # o "simulation"

if MODE == "demo":
    # Datos 100% reales sin escalar
    grouped = group_databases_by_client_demo(databases)
else:
    # Simular 3 clientes con targets específicos
    grouped = group_databases_by_client(databases)
```

**Ventajas:**
- ✅ Flexible (demo o simulación)
- ✅ Escalado a targets
- ✅ Datos dummy si no hay conexión

#### v2 - Solo Datos Reales
```python
# Sin modos - siempre datos reales
databases = get_storage_and_memory_metrics(client)
ops = get_ops_metrics(client, interval_seconds)
```

**Ventajas:**
- ✅ Siempre real
- ✅ Confiable
- ✅ Apto para producción

### 7. Costos y Facturación

#### v1 - Cálculo Financiero
```python
def calculate_cost(storage_gb, operations_millions, connections_avg):
    cost = (storage_gb * 10) + (operations_millions * 5) + (connections_avg * 2)
    return round(cost, 2)

# Genera:
{
  "cost_monthly": 7250.00,
  "totales": {
    "cost_total": 12500.00
  }
}
```

**Ventajas:**
- ✅ Modelo de costeo
- ✅ Showback/Chargeback
- ✅ Justificación de presupuesto

#### v2 - Sin Cálculo de Costos
```python
# No calcula costos
# Se enfoca en métricas técnicas
```

**Nota:** Los costos se pueden calcular externamente usando las métricas de v2

### 8. Series Temporales

#### v1 - Timeseries Simulado
```python
def generate_timeseries(operations_millions, connections_avg, points=30):
    # Genera 30 puntos con variaciones +/- 5%
    for i in range(points):
        ops_variation = random.uniform(0.95, 1.05)
        timeseries.append({...})
```

**Características:**
- ❌ No es histórico real
- ✅ Útil para mockups
- ❌ No persiste

#### v2 - Timeseries Real
```
# Archivo JSONL que acumula cada ejecución
{"timestamp":"2025-11-03T00:00:00Z", "metrics":{...}}
{"timestamp":"2025-11-03T06:00:00Z", "metrics":{...}}
{"timestamp":"2025-11-03T12:00:00Z", "metrics":{...}}
```

**Características:**
- ✅ Histórico real
- ✅ Acumulativo
- ✅ Análisis de tendencias
- ✅ Detección de anomalías

## 🔀 Cuándo Usar Cada Versión

### Usar v1 (generate_metrics.py) cuando:

1. ✅ Necesitas una **demo para stakeholders**
2. ✅ Quieres mostrar **modelo de costeo**
3. ✅ Necesitas **datos simulados** para desarrollo
4. ✅ Quieres **agrupar por cliente interno**
5. ✅ Haces una **presentación financiera**
6. ✅ Necesitas **prototipar rápido** un dashboard

### Usar v2 (generate_metrics_v2.py) cuando:

1. ✅ Necesitas **monitoring operacional**
2. ✅ Quieres **alertas basadas en métricas reales**
3. ✅ Haces **capacity planning**
4. ✅ Necesitas **histórico de tendencias**
5. ✅ Quieres **análisis de performance**
6. ✅ Optimizas **uso de memoria/cache**
7. ✅ Detectas **anomalías y picos de carga**

## 🔄 Usar Ambas Versiones

**Escenario recomendado:** Usar ambos scripts para diferentes audiencias

```
┌─────────────────────────────────────────────────────────────┐
│                      ARQUITECTURA DUAL                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  generate_metrics_v2.py (Cada 6 horas)                     │
│  └─ Genera: metrics_latest.json, metrics_timeseries.jsonl  │
│      ↓                                                      │
│  Script de transformación (opcional)                        │
│  └─ Lee v2 + aplica modelo costeo + agrupa clientes        │
│      ↓                                                      │
│  generate_metrics.py (Manual/On-demand)                     │
│  └─ Genera: metricas_mongodb.json (para demos)             │
│                                                             │
│  Resultado:                                                 │
│  • Monitoring técnico continuo (v2)                         │
│  • Reportes financieros bajo demanda (v1)                   │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Tabla Comparativa Completa

| Característica | v1 | v2 | Mejor |
|----------------|----|----|-------|
| OPS reales | ❌ | ✅ | v2 |
| OPS simuladas | ✅ | ❌ | v1 |
| Storage real | ✅ | ✅ | Empate |
| Storage detallado | ⚠️ | ✅ | v2 |
| Memoria/Cache | ❌ | ✅ | v2 |
| Histórico | ❌ | ✅ | v2 |
| Snapshot actual | ✅ | ✅ | Empate |
| Agrupación clientes | ✅ | ❌ | v1 |
| Cálculo costos | ✅ | ❌ | v1 |
| Timeseries real | ❌ | ✅ | v2 |
| Modo demo | ✅ | ❌ | v1 |
| Datos dummy | ✅ | ❌ | v1 |
| Alertas operacionales | ❌ | ✅ | v2 |
| FinOps/Showback | ✅ | ❌ | v1 |
| Capacity planning | ⚠️ | ✅ | v2 |
| Detección anomalías | ❌ | ✅ | v2 |

## 🚀 Migración de v1 a v2

Si actualmente usas v1 y quieres migrar a v2:

### Paso 1: Backup
```bash
cp generate_metrics.py generate_metrics_v1_backup.py
cp metricas_mongodb.json metricas_mongodb_backup.json
```

### Paso 2: Instalar v2
```bash
# Ya lo tienes si seguiste la guía
chmod +x generate_metrics_v2.py
```

### Paso 3: Probar v2
```bash
python3 test_metrics_v2.py
```

### Paso 4: Configurar cron
```bash
./setup_cron.sh
```

### Paso 5: Mantener v1 para demos
```bash
# v1 se ejecuta manualmente cuando necesites demos
python3 generate_metrics.py

# v2 corre automáticamente cada 6 horas vía cron
```

## 💡 Recomendación Final

**NO elimines v1** - Cada versión tiene su propósito:

- **v1:** Perfecto para presentaciones financieras y demos
- **v2:** Esencial para operaciones diarias y monitoring

Ambos scripts pueden coexistir sin problemas.
