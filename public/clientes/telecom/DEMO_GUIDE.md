# 🚀 Guía Rápida de Demo - FinOps MongoDB

Esta guía te muestra cómo ejecutar la demo completa de FinOps con datos reales de MongoDB.

## 📁 Archivos del Proyecto

```
/Users/leo.alarcon/gomdb-site/public/clientes/telecom/
├── generate_metrics.py      # Script Python para extraer métricas de MongoDB
├── run_metrics.sh           # Wrapper para ejecutar el generador
├── open_dashboard.sh        # Script para abrir dashboard con datos
├── dashboard.html           # Dashboard web interactivo
├── metricas_mongodb.json    # Métricas generadas (actualizable)
├── README.md                # Documentación completa
├── DEMO_GUIDE.md           # Esta guía
└── venv/                   # Entorno virtual con pymongo
```

---

## ⚡ Quick Start (3 pasos)

### 1. Generar Métricas
```bash
./run_metrics.sh
```

**Qué hace:**
- Conecta a MongoDB Replica Set en AWS
- Extrae métricas reales de todas las bases de datos
- Simula 3 clientes: FMS (600GB), Desarrollo (50GB), Testing (20GB)
- Genera `metricas_mongodb.json`

**Salida esperada:**
```
============================================================
🚀 GENERADOR DE MÉTRICAS MONGODB - FINOPS DEMO
============================================================
🔌 Conectando a MongoDB Replica Set...
✅ Conexión exitosa a MongoDB
📚 Encontradas X bases de datos

📋 Cliente FMS:
   Storage: 600.00 GB
   Bases: 4
   Costo mensual: $6,900.65

✅ Métricas generadas: 670.0GB, Costo: $7,715.05
============================================================
```

### 2. Abrir Dashboard
```bash
./open_dashboard.sh
```

**Qué hace:**
- Copia el JSON al portapapeles automáticamente
- Abre `dashboard.html` en tu navegador
- Muestra instrucciones en consola

### 3. Cargar Datos en Dashboard

1. En el navegador, haz clic en **"🔄 Actualizar Métricas"**
2. Pega el JSON con `Cmd+V` (ya está en el portapapeles)
3. Haz clic en **"Cargar Datos"**

**¡Listo!** El dashboard ahora muestra tus datos reales de MongoDB.

---

## 🎯 Demo en Presentación

### Antes de la Presentación

```bash
# 1. Generar métricas frescas
./run_metrics.sh

# 2. Abrir dashboard
./open_dashboard.sh

# 3. Cargar datos (ver paso 3 arriba)
```

### Durante la Presentación

#### Mostrar Cards de Clientes
- **FMS**: Cliente principal con 600GB y mayor costo
- **Desarrollo**: Cliente mediano con 50GB
- **Testing**: Cliente pequeño con 20GB

Destacar:
- Storage real en GB
- Operaciones mensuales en millones
- Conexiones promedio
- **Costo mensual por cliente**

#### Mostrar Gráfico de Costos
- Barras con colores por cliente
- Comparación visual de costos
- Modelo de pricing visible

#### Mostrar Gráfico de Tiempo Real
- Series temporales de últimos 30 minutos
- Operaciones por segundo por cliente
- Visualización de carga en tiempo real

#### Mostrar Tabla de Desglose
- Costos desglosados por componente:
  - Storage: $10/GB
  - Operaciones: $5/millón
  - Conexiones: $2/conexión
- Totales por cliente
- **Total general**: $7,715.05/mes

#### Simular Escenarios

**Escenario 1: Aumento de carga en FMS**
```
Haz clic en "📊 Simular Carga"
```
- Añade +10% a todas las métricas de FMS
- Muestra impacto inmediato en costos
- Útil para demostrar elasticidad de costos

**Escenario 2: Actualizar con datos frescos**
```bash
# En otra terminal
./run_metrics.sh

# Copiar nuevo JSON
cat metricas_mongodb.json | pbcopy

# En el dashboard: "🔄 Actualizar Métricas" y pegar
```

---

## 📊 Estructura de Datos

El JSON generado tiene esta estructura:

```json
{
  "timestamp": "2025-10-30T01:54:30Z",
  "clientes": [
    {
      "nombre": "FMS",
      "storage_gb": 600.0,
      "operations_millions": 125.71,
      "connections_avg": 43,
      "cost_monthly": 6714.55,
      "databases": ["fms_production", "fms_analytics", ...],
      "database_details": [...],
      "color": "#00ED64",
      "timeseries": [
        {
          "timestamp": "2025-10-30T01:24:30Z",
          "operations": 125.2,
          "connections": 44
        },
        // ... 30 puntos
      ]
    }
  ],
  "totales": {
    "storage_total": 670.0,
    "cost_total": 7514.45,
    "clients_count": 3
  }
}
```

---

## 🔧 Troubleshooting

### No se puede conectar a MongoDB
**Problema:** Error de conexión al Replica Set

**Solución:**
- El script usa datos dummy automáticamente
- La demo funciona igual con datos simulados
- Mensaje: "📊 Generando datos dummy completos..."

### JSON inválido en el dashboard
**Problema:** Error al cargar JSON en el dashboard

**Solución:**
```bash
# Validar JSON
python3 -m json.tool metricas_mongodb.json

# Si es válido, volver a copiar
cat metricas_mongodb.json | pbcopy
```

### Dashboard no se abre
**Problema:** `open dashboard.html` no funciona

**Solución:**
```bash
# Abrir manualmente en navegador
# Arrastra dashboard.html a Chrome/Firefox/Safari
```

---

## 💡 Tips para la Demo

### Preparación
1. **Prueba todo antes**: Ejecuta la demo completa al menos 1 vez
2. **Ten el JSON listo**: Copia `metricas_mongodb.json` a un lugar accesible
3. **Browser zoom**: Ajusta zoom del navegador para proyector (120-150%)

### Durante la Demo
1. **Pantalla completa**: F11 en el navegador
2. **Narración clara**: Explica cada panel mientras lo muestras
3. **Interacción**: Usa "Simular Carga" para mostrar dinamismo

### Puntos Clave a Destacar
- ✅ **Datos reales** de MongoDB en producción
- ✅ **Chargeback automático** por cliente interno
- ✅ **Métricas en tiempo real** (últimos 30 min)
- ✅ **Modelo de costos transparente** (Storage + Ops + Conn)
- ✅ **Actualizable en segundos** (ejecutar script + pegar JSON)

---

## 🎬 Script de Presentación (Sugerido)

```
1. "Tenemos MongoDB corriendo en AWS con múltiples clientes internos"
   → Mostrar header del dashboard con timestamp

2. "Aquí vemos los 3 clientes principales y sus métricas"
   → Mostrar cards de FMS, Desarrollo, Testing

3. "FMS es nuestro cliente más grande con 600GB y $6,700/mes"
   → Destacar card de FMS

4. "El costo se calcula con un modelo transparente"
   → Mostrar tabla de desglose

5. "Podemos ver el comportamiento en tiempo real"
   → Mostrar gráfico de operaciones

6. "Si FMS aumenta su carga en 10%, el costo sube proporcionalmente"
   → Clic en "Simular Carga", mostrar cambio en costos

7. "Estas métricas se actualizan ejecutando un script Python"
   → Mostrar terminal con ./run_metrics.sh

8. "Y se cargan en el dashboard en segundos"
   → Demostrar actualización con JSON fresco
```

---

## 📞 Soporte

Si tienes problemas:
1. Revisa `README.md` para documentación completa
2. Verifica logs en la terminal al ejecutar scripts
3. Valida estructura del JSON con `python3 -m json.tool`

---

## 🎉 ¡Listo para Demostrarlo!

Ahora tienes todo configurado para una demo profesional de FinOps con MongoDB.

**Comando único para empezar:**
```bash
./open_dashboard.sh
```

¡Buena suerte con tu presentación! 🚀
