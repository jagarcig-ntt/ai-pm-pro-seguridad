# CLAUDE.md — Pipeline de Auditoría de Seguridad

## Qué es esto

Un pipeline de 4 skills independientes que audita repositorios en busca de vulnerabilidades de seguridad comunes en proyectos construidos con IA (Claude Code, Lovable, etc.).

Está diseñado para:
- Ejecutarse en <200ms
- Sin dependencias externas (cero API calls excepto HTTP a Supabase)
- Output legible para PMs sin formación técnica
- Ser usado en sesiones de formación en vivo

## Stack

- **TypeScript** estricto
- **Node.js** 18+
- **CLI** único: `npx audit-security --repo ./ruta`

## Arquitectura

```
index.ts (CLI)
    ↓
orchestrator.ts (orquestador)
    ↓
[4 skills en paralelo]
    ├── skill-credentials (Familia 1)
    ├── skill-database (Familia 2)
    ├── skill-data-privacy (Familia 3)
    └── skill-configuration (Familia 4)
    ↓
SecurityReport (Markdown)
```

Cada skill:
- Es **independiente** (no se llaman entre sí)
- Devuelve un `SkillResult` tipado
- Reporta severidad (CRITICAL/HIGH/MEDIUM)

## Las 4 Familias

### Familia 1: Credenciales y Secretos
**Detecta**: API keys, .env commiteado, DATABASE_URL expuesta, credenciales en Git

**Skills**: 
- Patrones regex para prefijos conocidos (AIzaSy, sk-, ghp_, AKIA, etc.)
- Búsqueda en archivos JS/TS/JSON
- Historial Git (últimos 50 commits)

### Familia 2: Bases de Datos y Permisos
**Detecta**: Tablas sin RLS, service_role en cliente, vistas SECURITY DEFINER

**Skills**:
- Parse SQL para CREATE TABLE y ALTER TABLE
- HTTP requests a Supabase REST (verificación activa)
- Detección de service_role en JS/TS cliente

### Familia 3: Datos Sensibles y Privacidad
**Detecta**: PII en código/fixtures, logging de objetos usuario, ausencia de política de privacidad

**Skills**:
- Patrones PII: emails reales, IPs públicas, teléfonos, contraseñas
- console.log/logger.info con objetos sensibles
- Búsqueda en archivos de test/fixtures

### Familia 4: Configuración de Entornos
**Detecta**: CORS wildcard, endpoints sin autenticación, defaults inseguros, headers ausentes

**Skills**:
- CORS con `origin: '*'`
- Endpoints `/admin`, `/debug` sin auth
- Variables de entorno con defaults permisivos
- Ausencia de headers de seguridad (Helmet, etc.)

## Cómo ejecutar

```bash
# Instalar
npm install
npm run build

# Usar
node dist/index.js --repo ../HeroCamp-Product/feedbackhub
node dist/index.js --repo ./mi-proyecto --output reporte.md
node dist/index.js --repo ./mi-proyecto --json  # JSON output
```

## Cómo extender

### Añadir una nueva skill

1. Crear carpeta `/src/skills/skill-nueva/`
2. Crear `SKILL.md` (documentación en lenguaje natural)
3. Crear `index.ts` con función `async export auditNueva(repoPath: string): Promise<SkillResult>`
4. Importar en `orchestrator.ts` y añadir a `Promise.all()`

### Ajustar patrones

Los patrones están en cada skill. Ejemplos:

```typescript
// En skill-credentials/index.ts
const CREDENTIAL_PATTERNS = [
  { name: 'Google API Key', regex: /AIzaSy[A-Za-z0-9_-]{20,40}/g, provider: 'Google' },
  // Añade patrones nuevos aquí
];
```

## Output esperado

```markdown
# 🔒 Informe de Seguridad

**Repositorio**: ./feedbackhub
**Fecha**: 18/6/2026, 22:47:43
**Ejecutado por**: Pipeline de Seguridad v1.0

---

## Resumen Ejecutivo

❌ **10 hallazgos CRÍTICOS**
⚠️  **5 hallazgos ALTOS**
🔶 **2 hallazgos MEDIOS**

**Recomendación**: ❌ **NO DESPLEGAR HASTA RESOLVER**

---

## Hallazgos Detallados
[...]
```

Exit code:
- `0` = Recomendación "SAFE_TO_DEPLOY"
- `1` = Recomendación "DO_NOT_DEPLOY" (hay CRÍTICOS)

## Para la sesión del 26

El pipeline se ejecutará **en vivo en VSCode**:

```
Minuto 45 (Familia 1):
  - Terminal integrada en VSCode
  - $ node dist/index.js --repo ./feedbackhub
  - Parar en cada hallazgo CRÍTICO
  - Conectar con el bloque teórico

Minuto 60 (Familia 2):
  - Mostrar el archivo security-report.md generado
  
Minuto 120 (Final):
  - Resumen de los 4 hallazgos principales
```

## Debugging

Si un skill falla:

```bash
# Ejecutar solo la skill (modificar orchestrator.ts temporalmente)
const skillResult = await auditCredentials('../HeroCamp-Product/feedbackhub');
console.log(JSON.stringify(skillResult, null, 2));
```

## Notas técnicas

- **No hay timeouts** en búsqueda de archivos: confía en que el repositorio es pequeño (~<1000 archivos)
- **Regex case-insensitive** donde es posible (patrones de ataque pueden variar en mayúsculas)
- **Errores silenciosos** en HTTP requests (timeout de Supabase no bloquea el pipeline)
- **No valida claves**: solo busca patrones. Una key "válida" no es responsabilidad del pipeline

## Performance esperado

| Repositorio | Archivos | Tiempo |
|-------------|----------|--------|
| feedbackhub | 15 | 0.15s |
| Proyecto típico | 100 | 0.3s |
| Proyecto grande | 500+ | 0.5-1s |

---

*Última actualización: 18 de junio de 2026*
*Sesión: AI PM Pro · The Hero Camp*
