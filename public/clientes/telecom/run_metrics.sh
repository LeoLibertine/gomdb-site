#!/bin/bash
# Script wrapper para ejecutar generate_metrics.py con el entorno virtual

# Ir al directorio del script
cd "$(dirname "$0")"

# Activar entorno virtual y ejecutar script
source venv/bin/activate && python generate_metrics.py
