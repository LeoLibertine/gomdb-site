# 📊 Notas Importantes sobre OPS (Operaciones por Segundo)

## ⚠️ Limitación Importante de MongoDB

### MongoDB no proporciona OPS por base de datos individual

MongoDB **solo proporciona contadores de operaciones (`opcounters`) a nivel de servidor**, no a nivel de base de datos individual.

```
✅ Disponible: opcounters a nivel servidor (serverStatus)
❌ No disponible: opcounters por base de datos (dbStats)
```

### ¿Qué significa esto?

El script `generate_metrics_v2.py` hace lo siguiente:

1. **Captura OPS totales del servidor** usando `serverStatus`
2. **Distribuye proporcionalmente** las OPS entre las bases de datos según su tamaño de storage

```python
# Fórmula de distribución proporcional:
ops_db = ops_totales_servidor × (storage_db / storage_total)
```

### Ejemplo

```
Servidor MongoDB:
├─ OPS totales: 1000 ops/s
│
├─ DB "production" (900 GB - 90% del storage)
│  └─ OPS estimadas: 900 ops/s (90% de 1000)
│
├─ DB "staging" (90 GB - 9% del storage)
│  └─ OPS estimadas: 90 ops/s (9% de 1000)
│
└─ DB "test" (10 GB - 1% del storage)
   └─ OPS estimadas: 10 ops/s (1% de 1000)
```

## 🎯 ¿Es precisa esta aproximación?

### Depende del caso de uso:

| Escenario | Precisión | Recomendación |
|-----------|-----------|---------------|
| **DB de tamaños similares con carga similar** | ⚠️ Moderada | Usar con precaución |
| **DB de tamaños muy diferentes** | ⚠️ Puede ser engañosa | Interpretar con cuidado |
| **Una sola DB grande (>80% storage)** | ✅ Buena | Confiable |
| **Servidor con 1 DB de producción + DBs pequeñas de test** | ✅ Aceptable | La DB grande tendrá la mayoría de OPS |

### ¿Por qué no es 100% precisa?

Una base de datos **pequeña** puede tener **muchas operaciones** si:
- Tiene datos muy accedidos frecuentemente
- Tiene índices eficientes que reducen el storage pero aumentan las queries
- Es una DB de cache/sesiones con alto throughput

Una base de datos **grande** puede tener **pocas operaciones** si:
- Es un archivo histórico consultado raramente
- Está en modo read-only o de respaldo
- Contiene datos fríos

## 🔍 Alternativas para OPS más Precisas por DB

### 1. MongoDB Atlas (Recomendado)

Si usas MongoDB Atlas, tienes métricas detalladas por DB:

```
Atlas UI → Metrics → Database → Operations
```

### 2. Profiler de MongoDB

Activar el profiler por base de datos:

```javascript
// Activar profiler
db.setProfilingLevel(1, { slowms: 100 })

// Consultar operaciones
db.system.profile.find().limit(10)
```

**Desventaja:** Overhead de performance + storage adicional

### 3. Application-Level Monitoring

Instrumentar tu aplicación:

```python
# Ejemplo con decorador
@track_db_operations("production")
def query_users():
    return db.users.find()
```

### 4. MongoDB Monitoring Tools

Usar herramientas externas:
- **Percona PMM** - Monitoreo completo
- **MongoDB Ops Manager** - Official tool
- **Datadog MongoDB Integration**
- **Prometheus + mongodb_exporter**

### 5. Parsing de Logs

Analizar logs de MongoDB:

```bash
# Contar operaciones por DB en logs
grep "command:" /var/log/mongodb/mongod.log | \
  awk '{print $4}' | \
  sort | uniq -c
```

## 💡 Recomendaciones de Uso

### Para el script generate_metrics_v2.py:

#### ✅ Úsalo como indicador general
```
"La base de datos X representa el 80% del storage,
probablemente tiene la mayoría de las operaciones"
```

#### ✅ Úsalo para tendencias temporales
```
"Las OPS del servidor aumentaron 50% esta semana"
```

#### ✅ Úsalo para alertas a nivel servidor
```
if total_ops_per_second > 10000:
    alert("Servidor sobrecargado")
```

#### ⚠️ No lo uses para:
- Facturación exacta por base de datos
- SLAs estrictos por aplicación
- Análisis de performance detallado por DB

### Mejora: Combinar con otras métricas

```python
# Heurística mejorada
def estimate_ops_per_db(db):
    base_ops = ops_totales × (storage_db / storage_total)

    # Ajustar por conexiones activas
    if db.connections > avg_connections:
        base_ops *= 1.5

    # Ajustar por cache hit ratio
    if db.cache_ratio > 0.8:
        base_ops *= 1.2  # Más acceso = más OPS

    return base_ops
```

## 📈 Interpretación de los Datos

### Ejemplo de Output del Script

```json
{
  "databases": [
    {
      "name": "production",
      "ops_per_second": 850.5,  // ← Estimación proporcional
      "storage_gb": 900.0
    },
    {
      "name": "analytics",
      "ops_per_second": 100.3,  // ← Estimación proporcional
      "storage_gb": 90.0
    }
  ],
  "totals": {
    "total_ops_per_second": 950.8  // ← ✅ DATO REAL del servidor
  }
}
```

### Cómo interpretar:

✅ **Confiable:**
- `totals.total_ops_per_second` - OPS reales del servidor

⚠️ **Estimación:**
- `databases[].ops_per_second` - Distribución proporcional

## 🔮 Mejoras Futuras

### Posibles mejoras al script:

1. **Agregar peso por conexiones activas**
```python
weight = (storage_ratio * 0.7) + (connections_ratio * 0.3)
```

2. **Usar histórico de queries del profiler**
```python
# Si el profiler está activo
recent_queries = db.system.profile.count_documents({
    'ts': {'$gt': timestamp_1_hour_ago}
})
```

3. **Monitorear conexiones por DB**
```python
# serverStatus incluye conexiones, pero no por DB
# Usar db.currentOp() para ver operaciones activas
```

4. **Integrar con MongoDB Atlas API**
```python
# Si usas Atlas, usar su API para OPS reales
atlas_client.get_database_metrics(db_name)
```

## 📝 Conclusión

El script `generate_metrics_v2.py` proporciona:

✅ **OPS totales del servidor** - 100% precisas
✅ **Storage por DB** - 100% preciso
✅ **Memoria por DB** - 100% preciso
⚠️ **OPS por DB** - Estimación proporcional (útil pero no exacta)

Para la mayoría de los casos de uso de **capacity planning**, **alertas** y **análisis de tendencias**, esta aproximación es **suficiente y útil**.

Para **facturación exacta** o **SLAs estrictos**, considera usar MongoDB Atlas o herramientas de monitoring especializadas.

---

**Última actualización:** 2025-11-03

**Relacionado:**
- `generate_metrics_v2.py` - Script principal
- `README_METRICS_V2.md` - Documentación general
- `ARQUITECTURA_METRICAS_V2.md` - Diseño técnico
