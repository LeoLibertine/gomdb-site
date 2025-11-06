#!/bin/bash
# Script para abrir el dashboard y preparar los datos para actualizar

echo "🚀 Iniciando Demo FinOps Dashboard..."
echo ""

# Verificar que existe el JSON
if [ ! -f "metricas_mongodb.json" ]; then
    echo "⚠️  No se encuentra metricas_mongodb.json"
    echo "📊 Generando métricas..."
    ./run_metrics.sh
fi

# Copiar JSON al portapapeles si es posible
if command -v pbcopy &> /dev/null; then
    cat metricas_mongodb.json | pbcopy
    echo "✅ JSON copiado al portapapeles"
    echo ""
fi

# Abrir el dashboard en el navegador
echo "🌐 Abriendo dashboard en el navegador..."
open dashboard.html

echo ""
echo "📝 Para actualizar el dashboard:"
echo "   1. Haz clic en '🔄 Actualizar Métricas'"
echo "   2. Pega el JSON (Cmd+V si está en el portapapeles)"
echo "   3. Haz clic en 'Cargar Datos'"
echo ""
echo "🔄 Para regenerar métricas: ./run_metrics.sh"
