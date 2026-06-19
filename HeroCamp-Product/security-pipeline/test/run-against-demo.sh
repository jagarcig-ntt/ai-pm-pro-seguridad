#!/bin/bash

# Script para testear el pipeline contra el repositorio trampa (feedbackhub)

echo "🔍 Security Pipeline - Test contra feedbackhub"
echo "=============================================="
echo ""

# Ir a la carpeta del pipeline
cd "$(dirname "$0")/.."

# Verificar que existe
if [ ! -d "dist" ]; then
  echo "❌ Error: No encontré la carpeta 'dist'"
  echo "Ejecuta primero: npm run build"
  exit 1
fi

# Ruta al feedbackhub
FEEDBACKHUB="../HeroCamp-Product/feedbackhub"

if [ ! -d "$FEEDBACKHUB" ]; then
  echo "❌ Error: No encontré el feedbackhub en: $FEEDBACKHUB"
  exit 1
fi

echo "✅ Configuración OK"
echo ""
echo "Ejecutando auditoría contra: $FEEDBACKHUB"
echo ""

# Ejecutar el pipeline
node dist/index.js --repo "$FEEDBACKHUB"

# Capturar exit code
EXIT_CODE=$?

echo ""
echo "=============================================="

if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ RESULTADO: Proyecto seguro para desplegar"
else
  echo "❌ RESULTADO: Hay hallazgos críticos. No desplegar."
fi

echo "=============================================="
echo ""
echo "Informe guardado en: $FEEDBACKHUB/security-report.md"
echo "Revisar con: cat $FEEDBACKHUB/security-report.md"

exit $EXIT_CODE
