# 📚 Índice de Documentación - Métricas MongoDB

## 🎯 Inicio Rápido

Si es tu primera vez usando el sistema de métricas, sigue este orden:

1. **Lee primero:** [COMPARACION_V1_VS_V2.md](COMPARACION_V1_VS_V2.md) - Entiende las diferencias
2. **Configurar:** [README_METRICS_V2.md](README_METRICS_V2.md) - Guía de uso
3. **Probar:** Ejecuta `python3 test_metrics_v2.py`
4. **Automatizar:** Ejecuta `./setup_cron.sh`

---

## 📂 Archivos del Proyecto

### 🔧 Scripts Ejecutables

| Archivo | Propósito | Ejecución |
|---------|-----------|-----------|
| **generate_metrics.py** | Script original v1 - FinOps y demos | Manual |
| **generate_metrics_v2.py** | Script nuevo v2 - Monitoring real | Automático (cron) |
| **test_metrics_v2.py** | Script de testing para v2 | Manual |
| **setup_cron.sh** | Configurador automático de cron job | Una vez |

### 📖 Documentación

| Archivo | Contenido | Para quién |
|---------|-----------|------------|
| **README_METRICS_V2.md** | Guía completa de uso de v2 | Todos |
| **ARQUITECTURA_METRICAS_V2.md** | Diseño técnico y flujos | DevOps, DBAs |
| **COMPARACION_V1_VS_V2.md** | Diferencias entre versiones | Decision makers |
| **INDEX.md** | Este archivo | Navegación |

### 📊 Archivos de Datos (Generados)

| Archivo | Formato | Propósito |
|---------|---------|-----------|
| **metrics_latest.json** | JSON | Snapshot actual para dashboards |
| **metrics_timeseries.jsonl** | JSON Lines | Histórico acumulativo |
| **metrics_cron.log** | Text | Logs de ejecuciones automáticas |
| **metricas_mongodb.json** | JSON | Output de v1 (FinOps) |

---

## 📖 Guía de Documentación

### 1. README_METRICS_V2.md
**Tamaño:** ~8KB | **Nivel:** Básico-Intermedio

#### Contenido:
- ✅ Descripción del script v2
- ✅ Métricas capturadas (OPS, Storage, Memoria)
- ✅ Instrucciones de uso
- ✅ Configuración de cron
- ✅ Formato de salida
- ✅ Troubleshooting
- ✅ Ejemplos de integración

#### Cuándo leer:
- Primera vez usando el script
- Necesitas configurar el cron
- Tienes errores de ejecución
- Quieres integrar con dashboard

#### Comandos clave:
```bash
# Ejecutar manualmente
python3 generate_metrics_v2.py

# Ver configuración cron
crontab -l

# Ver logs
tail -f metrics_cron.log
```

---

### 2. ARQUITECTURA_METRICAS_V2.md
**Tamaño:** ~15KB | **Nivel:** Intermedio-Avanzado

#### Contenido:
- ✅ Diagrama de arquitectura
- ✅ Flujo de captura de métricas
- ✅ Explicación técnica de OPS (2 snapshots)
- ✅ Estructura de datos detallada
- ✅ Timeline de ejecución
- ✅ Ciclo de vida de los datos
- ✅ Casos de uso específicos
- ✅ Análisis con Python
- ✅ Mejoras futuras

#### Cuándo leer:
- Quieres entender cómo funciona internamente
- Necesitas modificar el script
- Vas a presentar a equipo técnico
- Quieres agregar nuevas métricas

#### Diagramas incluidos:
```
- Arquitectura general
- Flujo de captura de OPS
- Estructura de datos
- Timeline de ejecución
- Ciclo de vida JSONL
```

---

### 3. COMPARACION_V1_VS_V2.md
**Tamaño:** ~11KB | **Nivel:** Todos

#### Contenido:
- ✅ Tabla comparativa completa
- ✅ Caso de uso de cada versión
- ✅ Diferencias en métricas
- ✅ Ventajas/desventajas
- ✅ Cuándo usar cada una
- ✅ Estrategia dual (usar ambas)
- ✅ Guía de migración

#### Cuándo leer:
- Necesitas decidir cuál versión usar
- Quieres entender las diferencias
- Vas a presentar a management
- Planeas migrar de v1 a v2

#### Decisión rápida:
```
┌─────────────────────────────────────────┐
│ ¿Qué necesitas?                         │
├─────────────────────────────────────────┤
│ Demo financiera        → v1             │
│ Monitoring técnico     → v2             │
│ FinOps/Showback       → v1             │
│ Alertas operacionales  → v2             │
│ Capacity planning      → v2             │
│ Ambos                  → Usar los dos   │
└─────────────────────────────────────────┘
```

---

## 🚀 Flujos de Trabajo Comunes

### Flujo 1: Primera Configuración

```bash
# 1. Leer documentación
cat README_METRICS_V2.md

# 2. Probar conexión y script
python3 test_metrics_v2.py

# 3. Configurar cron automáticamente
./setup_cron.sh

# 4. Verificar que funciona
crontab -l
tail -f metrics_cron.log
```

### Flujo 2: Análisis de Métricas

```bash
# Ver última snapshot
cat metrics_latest.json | python3 -m json.tool

# Ver histórico (últimas 5 líneas)
tail -n 5 metrics_timeseries.jsonl | python3 -m json.tool

# Analizar OPS trend
python3 << EOF
import json
with open('metrics_timeseries.jsonl') as f:
    for line in f:
        data = json.loads(line)
        ops = data['metrics']['totals']['total_ops_per_second']
        print(f"{data['timestamp']}: {ops} ops/s")
EOF
```

### Flujo 3: Troubleshooting

```bash
# 1. Verificar conexión
python3 -c "from pymongo import MongoClient; print('OK' if MongoClient('mongodb://...').admin.command('ping') else 'FAIL')"

# 2. Ejecutar manualmente con output
python3 generate_metrics_v2.py

# 3. Ver logs del cron
tail -50 metrics_cron.log

# 4. Ver errores
grep -i error metrics_cron.log
```

### Flujo 4: Integración con Dashboard

```javascript
// Cargar última snapshot
fetch('/clientes/telecom/metrics_latest.json')
  .then(res => res.json())
  .then(data => {
    console.log('OPS:', data.totals.total_ops_per_second);
    console.log('Storage:', data.totals.total_storage_gb, 'GB');
    console.log('RAM:', data.totals.total_cache_gb_used, 'GB');
  });
```

---

## 🔍 Búsqueda Rápida

### ¿Cómo hacer...?

| Quiero... | Ver archivo | Sección |
|-----------|-------------|---------|
| Configurar el cron | README_METRICS_V2.md | Ejecución Programada |
| Entender OPS | ARQUITECTURA_METRICAS_V2.md | Flujo de Captura |
| Comparar v1 vs v2 | COMPARACION_V1_VS_V2.md | Tabla Comparativa |
| Resolver error de conexión | README_METRICS_V2.md | Troubleshooting |
| Analizar tendencias | ARQUITECTURA_METRICAS_V2.md | Casos de Uso |
| Integrar con web | README_METRICS_V2.md | Integración Dashboard |
| Cambiar frecuencia | README_METRICS_V2.md | Configuración |
| Ver formato JSON | ARQUITECTURA_METRICAS_V2.md | Estructura de Datos |

---

## 📊 Estructura del Proyecto

```
telecom/
├── 📜 Scripts v1 (FinOps)
│   ├── generate_metrics.py          # Script original
│   └── metricas_mongodb.json        # Output v1
│
├── 📜 Scripts v2 (Monitoring)
│   ├── generate_metrics_v2.py       # Script nuevo ⭐
│   ├── test_metrics_v2.py           # Testing
│   ├── setup_cron.sh                # Setup automático
│   ├── metrics_latest.json          # Snapshot actual
│   ├── metrics_timeseries.jsonl     # Histórico
│   └── metrics_cron.log             # Logs
│
└── 📚 Documentación
    ├── INDEX.md                     # Este archivo 📍
    ├── README_METRICS_V2.md         # Guía principal
    ├── ARQUITECTURA_METRICAS_V2.md  # Diseño técnico
    └── COMPARACION_V1_VS_V2.md      # Comparativa
```

---

## 🎓 Niveles de Conocimiento

### 👶 Nivel Básico
**Archivos recomendados:**
1. INDEX.md (este archivo)
2. README_METRICS_V2.md - Secciones: Descripción, Uso, Configuración

**Objetivo:** Ejecutar el script y configurar el cron

### 👨‍💻 Nivel Intermedio
**Archivos recomendados:**
1. README_METRICS_V2.md (completo)
2. COMPARACION_V1_VS_V2.md
3. ARQUITECTURA_METRICAS_V2.md - Secciones: Arquitectura, Flujo

**Objetivo:** Entender cómo funciona e integrar con sistemas

### 🧙 Nivel Avanzado
**Archivos recomendados:**
1. ARQUITECTURA_METRICAS_V2.md (completo)
2. Código fuente: generate_metrics_v2.py
3. COMPARACION_V1_VS_V2.md - Sección: Usar Ambas

**Objetivo:** Modificar, extender, optimizar

---

## 🆘 Ayuda y Soporte

### Problemas Comunes

| Problema | Solución | Documentación |
|----------|----------|---------------|
| No puedo conectar a MongoDB | Verificar URI y permisos | README → Troubleshooting |
| Cron no ejecuta | Verificar crontab -l | README → Ejecución Programada |
| OPS en 0 | Verificar actividad DB | ARQUITECTURA → OPS |
| Memoria no aparece | Verificar versión MongoDB | README → Troubleshooting |
| Archivo crece mucho | Rotar JSONL | README → Rotación Logs |

### Comandos Útiles

```bash
# Estado del sistema
crontab -l                    # Ver cron jobs
tail -f metrics_cron.log      # Ver logs en tiempo real
python3 test_metrics_v2.py    # Test completo

# Análisis rápido
cat metrics_latest.json | python3 -m json.tool
wc -l metrics_timeseries.jsonl  # Líneas de histórico

# Depuración
python3 generate_metrics_v2.py  # Ejecutar manual
grep error metrics_cron.log     # Buscar errores
```

---

## 📈 Roadmap y Mejoras Futuras

Ver sección "Próximos Pasos" en:
- ARQUITECTURA_METRICAS_V2.md

**Ideas en pipeline:**
- Alertas por email/Slack
- Dashboard Grafana
- API REST para consultas
- Predicción con ML
- Integración Prometheus

---

## 📝 Notas de Versión

### v2.0 (Actual)
- ✅ Métricas reales de OPS
- ✅ Métricas de memoria/cache
- ✅ Histórico en JSONL
- ✅ Dual output (JSON + JSONL)
- ✅ Documentación completa

### v1.0 (Original)
- ✅ Métricas de storage
- ✅ Simulación de OPS
- ✅ Agrupación por clientes
- ✅ Cálculo de costos
- ✅ Modo demo

---

## 🏁 Conclusión

Este proyecto proporciona dos herramientas complementarias:

- **v1:** Para presentaciones financieras y FinOps
- **v2:** Para monitoring operacional y capacity planning

Ambas pueden coexistir y servir diferentes propósitos dentro de la organización.

---

**Última actualización:** 2025-11-03

**Mantenedor:** Leo Alarcon

**Repositorio:** `/Users/leo.alarcon/gomdb-site/public/clientes/telecom/`
