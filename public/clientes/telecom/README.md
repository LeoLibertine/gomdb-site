# Generador de Métricas MongoDB - FinOps Demo

Script Python para extraer métricas reales de MongoDB y generar datos simulados para demo de FinOps.

## Características

- Conecta a MongoDB Replica Set en AWS
- Extrae métricas reales de todas las bases de datos
- Simula 3 clientes internos (FMS, Desarrollo, Testing)
- Genera métricas de operaciones, conexiones y costos
- Crea series temporales de 30 minutos
- Maneja errores y usa datos dummy si no hay conexión

## Requisitos

- Python 3.8+
- pymongo (instalado en venv)

## Instalación

El entorno virtual ya está configurado con pymongo instalado.

## Uso

### Opción 1: Script wrapper (recomendado)
```bash
./run_metrics.sh
```

### Opción 2: Ejecución directa
```bash
source venv/bin/activate
python generate_metrics.py
```

## Salida

El script genera el archivo `metricas_mongodb.json` con la siguiente estructura:

```json
{
  "timestamp": "2025-10-30T01:53:37Z",
  "clientes": [
    {
      "nombre": "FMS",
      "storage_gb": 600.0,
      "operations_millions": 162.93,
      "connections_avg": 43,
      "cost_monthly": 6900.65,
      "databases": ["fms_production", "fms_analytics", ...],
      "database_details": [...],
      "color": "#00ED64",
      "timeseries": [...]
    }
  ],
  "totales": {
    "storage_total": 670.0,
    "cost_total": 7715.05,
    "clients_count": 3
  }
}
```

## Modelo de Costos

El costo mensual se calcula con la fórmula:

```
Costo = (Storage_GB × $10) + (Operaciones_Millones × $5) + (Conexiones_Avg × $2)
```

## Configuración de Clientes

- **FMS**: 600 GB (60% del total) - Bases más grandes
- **Desarrollo**: 50 GB (30% del total) - Bases medianas
- **Testing**: 20 GB (10% del total) - Bases pequeñas

## Métricas Simuladas

Las métricas de operaciones y conexiones se calculan proporcionalmente al storage:

- `operations_per_sec = (storage_gb / 10) × random(0.8, 1.2)`
- `connections_avg = int(storage_gb / 15) + random(1, 5)`

## Series Temporales

Se generan 30 puntos de datos (últimos 30 minutos) con variaciones aleatorias de ±5% para simular métricas en tiempo real.

## Manejo de Errores

- Si no puede conectarse a MongoDB, usa datos dummy completos
- Si una base no responde, la skipea y continúa
- Si hay menos de 3 bases reales, complementa con datos dummy
- Logging claro del progreso y errores

## Ejecución Continua

El script puede ejecutarse múltiples veces. Cada ejecución:
- Actualiza el timestamp
- Genera nuevas variaciones aleatorias (±5%)
- Mantiene la estructura de datos consistente

---

## Dashboard Web Interactivo

Se incluye un dashboard web profesional para visualizar las métricas en tiempo real.

### Archivos del Dashboard

- `dashboard.html` - Dashboard web completo (React + Recharts)
- `open_dashboard.sh` - Script para abrir el dashboard y copiar JSON

### Características del Dashboard

- **Visualización en tiempo real** de métricas de MongoDB
- **3 cards interactivos** con métricas por cliente
- **Gráficos profesionales**:
  - Barras: Costo mensual por cliente
  - Líneas: Operaciones en tiempo real (últimos 30 min)
- **Tabla detallada** con desglose de costos
- **Actualización manual**: Carga JSON desde el portapapeles
- **Simulación de carga**: Añade +10% a FMS temporalmente
- **Tema oscuro profesional** estilo MongoDB/Grafana

### Uso del Dashboard

#### Opción 1: Script automático (recomendado)
```bash
./open_dashboard.sh
```
Este script:
1. Genera métricas actualizadas si no existen
2. Copia el JSON al portapapeles (macOS)
3. Abre el dashboard en tu navegador
4. Muestra instrucciones en consola

#### Opción 2: Manual
```bash
# 1. Generar métricas
./run_metrics.sh

# 2. Copiar JSON (macOS)
cat metricas_mongodb.json | pbcopy

# 3. Abrir dashboard
open dashboard.html

# 4. En el dashboard: clic en "🔄 Actualizar Métricas" y pegar
```

### Actualizar Métricas en el Dashboard

1. Ejecuta `./run_metrics.sh` para generar nuevas métricas
2. Copia el contenido de `metricas_mongodb.json`
3. En el dashboard, haz clic en "🔄 Actualizar Métricas"
4. Pega el JSON en el textarea
5. Haz clic en "Cargar Datos"

### Funcionalidades Adicionales

- **Botón "📊 Simular Carga"**: Aumenta métricas de FMS en 10% temporalmente
- **Indicador de tiempo**: Muestra cuándo fue la última actualización
- **Notificaciones**: Feedback visual al actualizar o simular
- **Responsive**: Funciona en desktop, tablet y móvil

### Stack Técnico

- React 18 (hooks: useState, useEffect, useMemo)
- Recharts (gráficos interactivos)
- Tailwind CSS (diseño responsive)
- Babel standalone (transpilación en navegador)

### Datos de Demostración

El dashboard incluye datos dummy iniciales para demostración. Para usar datos reales de tu MongoDB, simplemente actualiza con el JSON generado por `generate_metrics.py`.
