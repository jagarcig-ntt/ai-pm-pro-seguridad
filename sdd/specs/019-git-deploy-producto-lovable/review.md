# REVIEW · SPEC-019 · Producto Lovable de la sesión

*Revisión del 9-nov-2026 (T16). Evidencias en [notas.md](notas.md) y [ensayo.md](ensayo.md). Comprobaciones hechas por el agente sin publicar ni hacer commits.*

## Criterios de aceptación

| CA | Resultado | Evidencia |
|---|---|---|
| CA1 · Feedback en producción llega a Supabase; sin sesión no se lee | ✅ | Envío real en producción: `POST /rest/v1/feedback` → 201 el 3, 5 y 9-nov, también tras el workflow nuevo y tras el revert. Lectura sin sesión → 401 (`notas.md`, "Producción con Supabase" y T11) |
| CA2 · O5 y O6 con evidencia | ✅ | `notas.md`, apartados O5 y O6: `.env` solo con valores públicos y conexión por *Connectors* |
| CA3 · Ruleset exige "Comprobar el PR"; un PR en rojo queda bloqueado | ✅ | API del ruleset de `feedback-hub`: `required_status_checks: Comprobar el PR` y solo merge. PR #6 (`demo/f3-checks`) con los tres checks en rojo y sin preview. En pantalla (captura de Jaime, 9-nov, [capturas/f3_merge_bloqueado.png](capturas/f3_merge_bloqueado.png)): los dos *Comprobar el PR* marcados como *Required* y el botón *Merge pull request* desactivado. La API devuelve `unstable`, pero el ruleset bloquea igual |
| CA4 · F4 pasa los checks, falla en producción, rollback cronometrado | ✅ | PR #7 en verde; producción con *"No hemos podido enviar tu opinión"* (captura de Jaime); rollback en 3 min; revert por PR #8 y producción correcta (201) |
| CA5 · Plantilla, README y checklist en `main`; `Lab/README.md` apunta a `feedback-hub` | ✅ | `main` (`bf146ed`): `.github/pull_request_template.md`, `docs/checklist-go-live.md` y sección del README, con el mismo contenido que `Lab/` salvo líneas en blanco. `sesiones/2026-11-git-deploy/Lab/README.md` enlaza el repo, la checklist y los workflows |
| CA6 · 0 claves secretas en el historial; Lovable "In sync" | ✅ | 43 commits de todas las ramas: 0 `sb_secret_` con valor, 0 JWT, 0 tokens. La única coincidencia con `SERVICE_ROLE_KEY` es código que lee `process.env`. Lovable "In sync" tras los PR #5, #7 y #8 (Jaime, 9-nov) |
| CA7 · Tabla desde el chat llega a Supabase; anotado si afecta antes del merge | ✅ | `notas-al-d-a`: columna `categoria` en Supabase con la migración solo en `lovable-sync` y sin PR. Los cambios se aplican al pulsar *Allow* (`notas.md`, CA7) |
| CA8 · Login y lectura desde la app publicada | ✅ | `notas-al-d-a`: login en producción tras añadir la URL del Worker en Supabase; sin sesión, leer y escribir → 401 (`notas.md`, CA8) |
| CA9 · Ensayo solo con navegador, cronometrado y con capturas | ✅ | Bloques A (13 min), B y C (13 min) en `ensayo.md`; capturas en `sesiones/2026-11-git-deploy/Guia/capturas/`. Sin tiempo representativo de B por el diagnóstico del 500 |

## Constitution
| Criterio | Resultado |
|---|---|
| 3.1 Stack del alumno | ✅ Lovable, GitHub, Supabase propio y Cloudflare Workers |
| 3.2 Coste 0 € | ✅ El ensayo completo se hizo con Lovable Free, Cloudflare Free, Supabase Free y repos públicos |
| 3.3 Plan B probado | ✅ PR #6 y #7 ejecutados, rollback y revert probados, capturas |
| 3.4 Nada de secretos | ✅ CA6; capturas de la guía revisadas y Account ID tapado |
| 3.5 Reproducible desde cero | ⚠️ Ensayado por Jaime, que conoce el flujo. Falta la prueba con alguien que no lo conozca (SPEC-013, CA3) |
| 4 Convenciones | ✅ Ficheros en `snake_case`/`kebab-case`, español y Markdown |
| 5.4 Datos con fuente | ✅ Cada hallazgo cita commit, run o captura con fecha |
| 2.x (bloques, timings, portal) | No aplica: esta spec es el producto de la demo, no material de sesión |

## Tareas
T01–T15 ☑. T16 es esta revisión.

## Acciones pendientes
1. ✅ CA3 y CA6 confirmados por Jaime el 9-nov.
2. **Plan B de la demo F3:** la captura de `capturas/f3_merge_bloqueado.png`.
3. ✅ **`feedbackhub-demo` borrado por completo** (Jaime, 9-nov), junto con su proyecto de Pages. Su historial solo queda en el clon local `~/theherocamp/feedbackhub-demo` y en las notas de `07702b3`.
4. **Para la sesión (SPEC-015):** recrear `demo/f4-rompe-produccion` antes del 21-nov (`notas.md`, T12), y añadir a P1 el paso de la URL de Supabase para quien tenga login.

## Hallazgos que van a otras specs
- **SPEC-015 (guion) y teoría:** los cambios de base de datos se aplican antes del merge; producción rota antes del PR; 500 con todo en verde; URL de Supabase en `localhost`. Ya están en F2 y F4.
- **SPEC-013 (guía):** sin hallazgos nuevos que cambien la guía de casa.
- **Compilación previa de los 18 repos:** buscar `client.server` y `SUPABASE_SERVICE_ROLE_KEY` en uso.
