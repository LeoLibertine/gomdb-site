#!/bin/bash
################################################################################
# Script para configurar cron job para generate_metrics_v2.py
# Ejecuta las métricas cada 6 horas
################################################################################

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "Configuración de Cron Job - Métricas MongoDB"
echo "=========================================="
echo ""

# Detectar la ruta del script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT_PATH="$SCRIPT_DIR/generate_metrics_v2.py"
LOG_PATH="$SCRIPT_DIR/metrics_cron.log"

# Detectar Python3
PYTHON_PATH=$(which python3)

if [ -z "$PYTHON_PATH" ]; then
    echo -e "${RED}❌ Python3 no encontrado${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Python3 encontrado en: $PYTHON_PATH"
echo -e "${GREEN}✓${NC} Script encontrado en: $SCRIPT_PATH"
echo -e "${GREEN}✓${NC} Los logs se guardarán en: $LOG_PATH"
echo ""

# Verificar que el script existe
if [ ! -f "$SCRIPT_PATH" ]; then
    echo -e "${RED}❌ Script no encontrado: $SCRIPT_PATH${NC}"
    exit 1
fi

# Dar permisos de ejecución
chmod +x "$SCRIPT_PATH"
echo -e "${GREEN}✓${NC} Permisos de ejecución configurados"
echo ""

# Crear la entrada de cron
CRON_ENTRY="0 */6 * * * $PYTHON_PATH $SCRIPT_PATH >> $LOG_PATH 2>&1"

echo "=========================================="
echo "Entrada de Cron Job:"
echo "=========================================="
echo "$CRON_ENTRY"
echo ""
echo "Esta configuración ejecutará el script:"
echo "  - Cada 6 horas (00:00, 06:00, 12:00, 18:00)"
echo "  - Los logs se guardarán en metrics_cron.log"
echo ""

# Preguntar al usuario si desea continuar
read -p "¿Desea agregar esta entrada al crontab? (s/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Ss]$ ]]; then
    # Verificar si la entrada ya existe
    if crontab -l 2>/dev/null | grep -q "$SCRIPT_PATH"; then
        echo -e "${YELLOW}⚠️  Ya existe una entrada para este script en el crontab${NC}"
        read -p "¿Desea reemplazarla? (s/n): " -n 1 -r
        echo ""

        if [[ $REPLY =~ ^[Ss]$ ]]; then
            # Eliminar entrada antigua
            crontab -l 2>/dev/null | grep -v "$SCRIPT_PATH" | crontab -
            echo -e "${GREEN}✓${NC} Entrada antigua eliminada"
        else
            echo "Operación cancelada"
            exit 0
        fi
    fi

    # Agregar nueva entrada
    (crontab -l 2>/dev/null; echo "$CRON_ENTRY") | crontab -

    echo ""
    echo -e "${GREEN}=========================================="
    echo "✅ Cron job configurado exitosamente"
    echo "==========================================${NC}"
    echo ""
    echo "Comandos útiles:"
    echo "  Ver crontab actual:       crontab -l"
    echo "  Editar crontab:           crontab -e"
    echo "  Ver logs:                 tail -f $LOG_PATH"
    echo "  Eliminar cron job:        crontab -e (y borrar la línea)"
    echo ""
    echo "El script se ejecutará automáticamente cada 6 horas."
    echo "Para probar inmediatamente, ejecuta:"
    echo "  python3 $SCRIPT_PATH"
    echo ""
else
    echo "Operación cancelada"
    echo ""
    echo "Para configurar manualmente, ejecuta:"
    echo "  crontab -e"
    echo ""
    echo "Y agrega esta línea:"
    echo "$CRON_ENTRY"
    echo ""
fi
