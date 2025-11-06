# Arquitectura del Sistema de Métricas MongoDB v2

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                         CRON SCHEDULER                          │
│                    (Cada 6 horas: 0, 6, 12, 18)                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   generate_metrics_v2.py                        │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  1. Conexión a MongoDB Replica Set                       │ │
│  └───────────────────────────────────────────────────────────┘ │
│                             │                                   │
│  ┌──────────────────────────┴──────────────────────────────┐   │
│  │                                                          │   │
│  ▼                          ▼                              ▼   │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐      │
│  │ OPS Metrics  │  │   Storage    │  │ Memory/Cache    │      │
│  │ (2 Snapshots)│  │   Metrics    │  │    Metrics      │      │
│  └──────────────┘  └──────────────┘  └─────────────────┘      │
│         │                  │                    │              │
│         └──────────────────┴────────────────────┘              │
│                             │                                   │
│                             ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  Consolidación de Métricas por Base de Datos             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                             │                                   │
│                    ┌────────┴────────┐                          │
│                    │                 │                          │
│                    ▼                 ▼                          │
│         ┌──────────────────┐  ┌──────────────────┐             │
│         │ metrics_         │  │ metrics_latest   │             │
│         │ timeseries.jsonl │  │ .json            │             │
│         │ (Histórico)      │  │ (Snapshot)       │             │
│         └──────────────────┘  └──────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                    │                         │
                    ▼                         ▼
         ┌──────────────────┐      ┌──────────────────┐
         │  Análisis        │      │  Dashboard       │
         │  Time Series     │      │  Web (Tiempo     │
         │  (Tendencias)    │      │  Real)           │
         └──────────────────┘      └──────────────────┘
```

## 📊 Flujo de Captura de Métricas

### 1. OPS (Operaciones por Segundo)

```
T=0s                          T=10s
┌─────────────────┐           ┌─────────────────┐
│   SNAPSHOT 1    │           │   SNAPSHOT 2    │
│                 │           │                 │
│  dbStats()      │  Esperar  │  dbStats()      │
│  ├─ opcounters  │  ────────>│  ├─ opcounters  │
│  │  ├─ insert  │  10 segs  │  │  ├─ insert   │
│  │  ├─ query   │           │  │  ├─ query    │
│  │  ├─ update  │           │  │  ├─ update   │
│  │  └─ delete  │           │  │  └─ delete   │
└─────────────────┘           └─────────────────┘
        │                              │
        └──────────────┬───────────────┘
                       ▼
              ┌─────────────────┐
              │  OPS Calculation│
              │                 │
              │  (ops₂ - ops₁)  │
              │  ─────────────  │
              │   time_delta    │
              └─────────────────┘
```

**Fórmula:**
```
OPS = (total_operations_snapshot2 - total_operations_snapshot1) / time_elapsed
```

### 2. Storage y Memoria

```
┌─────────────────────────────────────────────────────────────┐
│                    dbStats() Command                        │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
         ┌──────────────────┐  ┌──────────────────┐
         │  Storage (Disco) │  │  Memory (Cache)  │
         │                  │  │                  │
         │  • dataSize      │  │  • cacheStats    │
         │  • indexSize     │  │  • bytes in      │
         │  • total         │  │    cache         │
         └──────────────────┘  └──────────────────┘
                    │                   │
                    └─────────┬─────────┘
                              ▼
                   ┌──────────────────┐
                   │  Conversión a GB │
                   └──────────────────┘
```

## 🗂️ Estructura de Datos

### Base de Datos Individual

```json
{
  "name": "fms_production",
  "ops_per_second": 1250.5,           // Calculado (2 snapshots)
  "storage_gb": 350.5,                // dataSize + indexSize
  "cache_gb_used": 2048.3,            // bytes in cache
  "data_size_gb": 325.2,              // Solo datos
  "index_size_gb": 25.3,              // Solo índices
  "collections": 45,                  // Número de colecciones
  "documents": 5000000                // Total de documentos
}
```

### Totales Agregados

```json
{
  "total_databases": 7,
  "total_ops_per_second": 2500.75,
  "total_storage_gb": 670.5,
  "total_cache_gb_used": 4096.8,
  "total_collections": 116,
  "total_documents": 10500000
}
```

## 📁 Formatos de Salida

### metrics_timeseries.jsonl (Histórico)

Cada línea = 1 snapshot completo

```
{"timestamp":"2025-11-03T00:00:00Z","period_hours":6,"metrics":{...}}
{"timestamp":"2025-11-03T06:00:00Z","period_hours":6,"metrics":{...}}
{"timestamp":"2025-11-03T12:00:00Z","period_hours":6,"metrics":{...}}
{"timestamp":"2025-11-03T18:00:00Z","period_hours":6,"metrics":{...}}
```

**Ventajas:**
- Fácil de procesar línea por línea
- No carga toda la memoria
- Ideal para big data / análisis temporal
- Fácil de rotar (logrotate)

### metrics_latest.json (Snapshot Actual)

JSON formateado estándar

```json
{
  "timestamp": "2025-11-03T18:00:00Z",
  "period_hours": 6,
  "sample_interval_seconds": 10,
  "databases": [...],
  "totals": {...}
}
```

**Ventajas:**
- Fácil de leer por humanos
- Ideal para dashboards en tiempo real
- Formato estándar para APIs REST
- Fácil de integrar con JavaScript/web

## ⏱️ Timeline de Ejecución

```
00:00 ──────> Script ejecuta (toma ~15 segundos)
   │
   ├─ [0s-10s]  Captura OPS (2 snapshots)
   ├─ [10s-13s] Captura Storage y Memoria
   ├─ [13s-15s] Consolida y guarda datos
   │
   └─ [15s]     ✅ Finaliza

06:00 ──────> Script ejecuta nuevamente
   │
   ⋮

12:00 ──────> Script ejecuta
   │
   ⋮

18:00 ──────> Script ejecuta
   │
   └─ Y así cada 6 horas...
```

## 🔄 Ciclo de Vida de los Datos

```
┌────────────────────────────────────────────────────────────────┐
│                    Primera Ejecución                           │
└────────────────────────────────────────────────────────────────┘
              │
              ▼
   metrics_timeseries.jsonl: [línea 1]
   metrics_latest.json: {snapshot 1}

┌────────────────────────────────────────────────────────────────┐
│                    Segunda Ejecución                           │
└────────────────────────────────────────────────────────────────┘
              │
              ▼
   metrics_timeseries.jsonl: [línea 1, línea 2]  ← Append
   metrics_latest.json: {snapshot 2}              ← Sobrescribe

┌────────────────────────────────────────────────────────────────┐
│                    Tercera Ejecución                           │
└────────────────────────────────────────────────────────────────┘
              │
              ▼
   metrics_timeseries.jsonl: [línea 1, línea 2, línea 3]
   metrics_latest.json: {snapshot 3}

   ... y así sucesivamente
```

## 🎯 Casos de Uso

### Caso 1: Dashboard en Tiempo Real

```javascript
// Cargar última snapshot
fetch('metrics_latest.json')
  .then(res => res.json())
  .then(data => {
    renderDashboard(data);
  });
```

**Archivo:** `metrics_latest.json`

### Caso 2: Análisis de Tendencias

```python
import json

# Leer todo el histórico
metrics_history = []
with open('metrics_timeseries.jsonl', 'r') as f:
    for line in f:
        metrics_history.append(json.loads(line))

# Analizar tendencias de OPS
ops_trend = [m['metrics']['totals']['total_ops_per_second']
             for m in metrics_history]

# Graficar
import matplotlib.pyplot as plt
plt.plot(ops_trend)
plt.title('OPS Trend - Last 7 days')
plt.show()
```

**Archivo:** `metrics_timeseries.jsonl`

### Caso 3: Alertas Automáticas

```python
# Monitorear picos de OPS
with open('metrics_latest.json', 'r') as f:
    data = json.load(f)

for db in data['databases']:
    if db['ops_per_second'] > 5000:
        send_alert(f"High OPS in {db['name']}: {db['ops_per_second']}")

    if db['cache_gb_used'] > 100:
        send_alert(f"High RAM usage in {db['name']}: {db['cache_gb_used']} GB")
```

## 🔧 Configuración Avanzada

### Cambiar Frecuencia de Ejecución

```bash
# Cada 3 horas
0 */3 * * * python3 /path/to/generate_metrics_v2.py

# Cada hora
0 * * * * python3 /path/to/generate_metrics_v2.py

# Cada 30 minutos
*/30 * * * * python3 /path/to/generate_metrics_v2.py
```

### Ajustar Precisión de OPS

```python
# En el script, línea ~34
SAMPLE_INTERVAL_SECONDS = 30  # Mayor precisión (más lento)
SAMPLE_INTERVAL_SECONDS = 5   # Menor precisión (más rápido)
```

### Rotación de Logs

```bash
# Crear script de rotación
cat > rotate_metrics.sh << 'EOF'
#!/bin/bash
mv metrics_timeseries.jsonl \
   metrics_timeseries_$(date +%Y%m%d).jsonl
gzip metrics_timeseries_$(date +%Y%m%d).jsonl
EOF

# Ejecutar mensualmente
0 0 1 * * /path/to/rotate_metrics.sh
```

## 📈 Métricas y KPIs

### Indicadores Clave

1. **OPS por Segundo**
   - Mide: Carga de trabajo de la base de datos
   - Rango normal: 100-5000 ops/s (depende del caso de uso)
   - Alerta: > 10000 ops/s

2. **Storage (GB)**
   - Mide: Espacio en disco usado
   - Crecimiento esperado: Varía según negocio
   - Alerta: Crecimiento > 20% por día

3. **Cache/RAM (GB)**
   - Mide: Datos "calientes" en memoria
   - Ideal: 60-80% de working set en RAM
   - Alerta: < 30% del storage en RAM (mal performance)

## 🚀 Próximos Pasos / Mejoras Futuras

1. **Métricas adicionales:**
   - Latencia de queries
   - Índices no utilizados
   - Locks y bloqueos
   - Replication lag

2. **Visualización:**
   - Dashboard Grafana
   - Alertas por Slack/Email
   - Reportes PDF automáticos

3. **Análisis predictivo:**
   - Predicción de crecimiento de storage
   - Detección de anomalías con ML
   - Recomendaciones de optimización

4. **Integración:**
   - API REST para consultar métricas
   - Webhook para eventos
   - Integración con Prometheus/DataDog
