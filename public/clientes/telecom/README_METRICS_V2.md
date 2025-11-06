# Script de Métricas MongoDB v2 - Documentación

## 📋 Descripción

Script mejorado para capturar métricas completas de MongoDB incluyendo:
- **OPS (Operaciones por Segundo)** por base de datos
- **Storage (Disco)** por base de datos
- **Memoria/Cache (RAM)** por base de datos

## 🎯 Características Principales

### Métricas Capturadas por Base de Datos

1. **Operaciones por Segundo (OPS)**
   - Medición real usando técnica de 2 snapshots
   - Intervalo configurable (por defecto 10 segundos)
   - Cálculo preciso del delta de operaciones

2. **Storage (Disco)**
   - Tamaño total de datos
   - Tamaño de índices
   - Tamaño combinado (data + índices)

3. **Memoria (Cache/RAM)**
   - Bytes actualmente en cache
   - Conversión a GB para facilitar análisis

4. **Información Adicional**
   - Número de colecciones
   - Número de documentos totales

### Archivos de Salida

1. **`metrics_timeseries.jsonl`**
   - Formato: JSON Lines (una línea por ejecución)
   - Propósito: Histórico completo para análisis temporal
   - Se va acumulando (append) en cada ejecución

2. **`metrics_latest.json`**
   - Formato: JSON formateado con indentación
   - Propósito: Última snapshot para dashboards
   - Se sobrescribe en cada ejecución

## 🚀 Uso

### Ejecución Manual

```bash
# Dar permisos de ejecución
chmod +x generate_metrics_v2.py

# Ejecutar el script
python3 generate_metrics_v2.py

# O directamente
./generate_metrics_v2.py
```

### Ejecución Programada con Cron

Para ejecutar cada 6 horas:

```bash
# Editar crontab
crontab -e

# Agregar esta línea (ejecuta cada 6 horas: 00:00, 06:00, 12:00, 18:00)
0 */6 * * * /usr/bin/python3 /Users/leo.alarcon/gomdb-site/public/clientes/telecom/generate_metrics_v2.py >> /Users/leo.alarcon/gomdb-site/public/clientes/telecom/metrics_cron.log 2>&1
```

### Otras Opciones de Programación

```bash
# Cada 3 horas
0 */3 * * * /usr/bin/python3 /path/to/generate_metrics_v2.py

# Cada 12 horas (mediodía y medianoche)
0 0,12 * * * /usr/bin/python3 /path/to/generate_metrics_v2.py

# Cada hora
0 * * * * /usr/bin/python3 /path/to/generate_metrics_v2.py

# Diariamente a las 3:00 AM
0 3 * * * /usr/bin/python3 /path/to/generate_metrics_v2.py
```

### Verificar Cron está Corriendo

```bash
# Ver crontab actual
crontab -l

# Ver logs del cron (macOS)
tail -f /Users/leo.alarcon/gomdb-site/public/clientes/telecom/metrics_cron.log

# Ver logs del sistema (Linux)
tail -f /var/log/syslog | grep CRON
```

## ⚙️ Configuración

### Variables Principales en el Script

```python
# URI de MongoDB
MONGO_URI = "mongodb://..."

# Directorio de salida
OUTPUT_DIR = "/Users/leo.alarcon/gomdb-site/public/clientes/telecom"

# Intervalo de medición para OPS (en segundos)
SAMPLE_INTERVAL_SECONDS = 10

# Periodo de ejecución del cron (solo informativo)
EXECUTION_PERIOD_HOURS = 6

# Bases de datos a excluir
EXCLUDED_DBS = ['admin', 'local', 'config']
```

### Ajustar el Intervalo de Medición de OPS

Si quieres más precisión en las OPS, puedes aumentar el intervalo:

```python
# Para mayor precisión (30 segundos)
SAMPLE_INTERVAL_SECONDS = 30

# Para medición rápida (5 segundos)
SAMPLE_INTERVAL_SECONDS = 5
```

**Recomendación:** 10 segundos es un buen balance entre precisión y velocidad de ejecución.

## 📊 Formato de Salida

### metrics_latest.json

```json
{
  "timestamp": "2025-11-03T10:00:00.000000+00:00",
  "period_hours": 6,
  "sample_interval_seconds": 10,
  "databases": [
    {
      "name": "fms_production",
      "ops_per_second": 1250.5,
      "storage_gb": 350.5,
      "cache_gb_used": 2048.3,
      "data_size_gb": 325.2,
      "index_size_gb": 25.3,
      "collections": 45,
      "documents": 5000000
    }
  ],
  "totals": {
    "total_databases": 7,
    "total_ops_per_second": 2500.75,
    "total_storage_gb": 670.5,
    "total_cache_gb_used": 4096.8,
    "total_collections": 116,
    "total_documents": 10500000
  }
}
```

### metrics_timeseries.jsonl

Cada línea es un JSON completo:

```json
{"timestamp": "2025-11-03T00:00:00Z", "period_hours": 6, "metrics": {...}}
{"timestamp": "2025-11-03T06:00:00Z", "period_hours": 6, "metrics": {...}}
{"timestamp": "2025-11-03T12:00:00Z", "period_hours": 6, "metrics": {...}}
```

## 🔍 Análisis de Datos

### Leer el Histórico (JSONL)

```python
import json

with open('metrics_timeseries.jsonl', 'r') as f:
    for line in f:
        entry = json.loads(line)
        print(f"Timestamp: {entry['timestamp']}")
        print(f"Total OPS: {entry['metrics']['totals']['total_ops_per_second']}")
```

### Cargar Última Snapshot (JSON)

```python
import json

with open('metrics_latest.json', 'r') as f:
    data = json.load(f)

print(f"Bases de datos: {data['totals']['total_databases']}")
print(f"OPS totales: {data['totals']['total_ops_per_second']}")

# Top 5 por storage
top_dbs = sorted(data['databases'], key=lambda x: x['storage_gb'], reverse=True)[:5]
for db in top_dbs:
    print(f"{db['name']}: {db['storage_gb']} GB")
```

## 🐛 Troubleshooting

### Error de Conexión a MongoDB

```
⚠️  Error de conexión a MongoDB: ...
```

**Solución:**
- Verificar que el URI es correcto
- Verificar conectividad de red
- Verificar credenciales
- Verificar que el Replica Set está activo

### Permisos Insuficientes

```
⚠️  No se pudo obtener stats de [db_name]: not authorized
```

**Solución:**
- Verificar que el usuario tiene permisos de lectura en las bases de datos
- Verificar rol del usuario (debería tener `readAnyDatabase` o similar)

### No se Calculan OPS

```
❌ No se pudieron obtener métricas de OPS
```

**Solución:**
- Verificar que `dbStats` incluye `opcounters`
- Verificar versión de MongoDB (debe soportar `opcounters`)
- Revisar si las bases de datos tienen actividad

### Archivo JSONL Crece Mucho

Si `metrics_timeseries.jsonl` crece demasiado, puedes rotarlo:

```bash
# Crear backup y limpiar
mv metrics_timeseries.jsonl metrics_timeseries_backup_$(date +%Y%m%d).jsonl
touch metrics_timeseries.jsonl
```

O automatizar con logrotate (Linux):

```bash
# /etc/logrotate.d/mongodb-metrics
/path/to/metrics_timeseries.jsonl {
    weekly
    rotate 4
    compress
    missingok
    notifempty
}
```

## 📈 Integración con Dashboard

### Ejemplo de Consulta para Dashboard

```javascript
// Cargar métricas en tu aplicación web
fetch('/clientes/telecom/metrics_latest.json')
  .then(response => response.json())
  .then(data => {
    // Mostrar totales
    document.getElementById('total-ops').textContent = data.totals.total_ops_per_second;
    document.getElementById('total-storage').textContent = data.totals.total_storage_gb + ' GB';
    document.getElementById('total-memory').textContent = data.totals.total_cache_gb_used + ' GB';

    // Renderizar tabla de bases de datos
    renderDatabaseTable(data.databases);
  });
```

## 🔄 Diferencias vs Script Original

| Característica | v1 (Original) | v2 (Nuevo) |
|----------------|---------------|------------|
| OPS por DB | ❌ Simuladas | ✅ Reales (2 snapshots) |
| Storage | ✅ Real | ✅ Real |
| Memoria/Cache | ❌ No incluida | ✅ Real |
| Formato salida | JSON único | JSONL + JSON |
| Histórico | ❌ No | ✅ Timeseries |
| Agrupación clientes | ✅ FMS/Dev/Test | ❌ Por DB individual |
| Simulación | ✅ Modo demo/simulation | ❌ Solo datos reales |

## 📝 Notas Importantes

1. **Tiempo de Ejecución**: El script tarda aproximadamente `SAMPLE_INTERVAL_SECONDS + 5-10 segundos` en completar.

2. **Carga en MongoDB**: La medición es muy ligera. Solo ejecuta `dbStats` 2 veces por base de datos.

3. **Bases del Sistema**: Se excluyen automáticamente `admin`, `local`, y `config`.

4. **Precisión de OPS**: La precisión mejora con intervalos más largos, pero el script tarda más.

5. **Cache/Memoria**: Solo muestra lo que está actualmente en cache. Puede variar significativamente según la carga.

## 🆘 Soporte

Si encuentras problemas:
1. Revisa los logs del script
2. Ejecuta manualmente para ver output detallado
3. Verifica permisos de MongoDB
4. Verifica conectividad de red
