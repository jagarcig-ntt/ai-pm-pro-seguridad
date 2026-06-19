# 🔒 Informe de Seguridad

**Repositorio**: ../feedbackhub
**Fecha**: 19/6/2026, 0:27:39
**Ejecutado por**: Pipeline de Seguridad v1.0

---

## Resumen Ejecutivo

❌ **3 hallazgos CRÍTICOS**
⚠️  **1 hallazgos ALTOS**

**Recomendación**: ❌ **NO DESPLEGAR HASTA RESOLVER**

---

## Hallazgos Detallados

### 🔑 Familia 1 · Credenciales y Secretos

❌ **[CRITICAL]** Google API Key hardcodeada
- **Ubicación**: config.js:2
- **Por qué importa**: La clave de Google está visible en el código fuente. Cualquiera con acceso al repositorio puede usarla para explotar tus servicios.
- **Qué hacer**: Remueve la clave de config.js y configúrala como variable de entorno en producción. Rota la clave inmediatamente en Google.

❌ **[CRITICAL]** Google API Key en archivo .env commiteado
- **Ubicación**: .env
- **Por qué importa**: El .env contiene una clave de Google y está en el repositorio. Esta es una exposición crítica.
- **Qué hacer**: Elimina el archivo .env del repositorio, rota la clave en Google inmediatamente.

❌ **[CRITICAL]** Google API Key encontrada en historial de Git
- **Ubicación**: Commit e607abf
- **Por qué importa**: Una clave de Google fue commiteada en algún momento. Incluso si se removió después, está en el historial de Git.
- **Qué hacer**: Esta clave está comprometida. Rota inmediatamente en Google. Para limpiar el historial, usa: git filter-branch --tree-filter 'git rm -rf .env' HEAD

⚠️  **[HIGH]** Archivo .env presente en el repositorio
- **Ubicación**: .env
- **Por qué importa**: El archivo .env está siendo tracked por Git pero está en .gitignore. Las variables de entorno contienen credenciales sensibles.
- **Qué hacer**: Remueve .env del historial de Git con: git rm --cached .env && git commit -m "Remove .env from tracking"

---

## Próximos Pasos Recomendados

1. **Inmediatamente**: Resuelve todos los hallazgos CRÍTICOS
   - Google API Key hardcodeada
   - Google API Key en archivo .env commiteado
   - Google API Key encontrada en historial de Git

2. **Esta semana**: Resuelve los hallazgos ALTOS
   - Archivo .env presente en el repositorio

3. **Antes de desplegar**: Ejecuta nuevamente este pipeline
