# TASKS · SPEC-027 · Pipeline de agentes portable y fallos plantados en `feedback-hub`

*Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)*

Reglas:
- Cada tarea cabe en una sesión de trabajo (≤ 2h) y produce algo revisable.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.
- 🧑 indica que la hace Jaime o que necesita su confirmación (push, publicar, decidir).
- Al cerrar una tarea, el agente propone el mensaje de commit y Jaime hace el commit.
- **Claves:** solo falsas. Ningún valor, tampoco falso, en la conversación ni en los informes.
- **Publicar:** el agente no crea el repositorio en GitHub ni sube ramas sin la confirmación de Jaime en ese momento.
- Rutas cortas: `PIPE/` = `C:\Users\jaime\herocamp-security-pipeline\`; `FH/` = `C:\Users\jaime\feedback-hub-demo\`; `027/` = esta carpeta.

**Orden:** primero lo que puede tumbar el diseño (el aislamiento y el tiempo con los cuatro agentes); después los fallos y los agentes, que se prueban entre sí en local antes de publicar nada; al final, publicar y verificar.

| ID | Tarea | Ficheros | Depende | Estado |
|---|---|---|---|---|
| T01 | **Prueba de aislamiento y de tiempo** (plan §2.3, §2.7). Con los agentes de junio sobre una copia de `feedback-hub`: (a) las opciones `--safe-mode --restricted --strict-mcp-config --tools` juntas, con la sesión de la suscripción; (b) un repositorio de prueba con instrucciones hostiles en `CLAUDE.md`, en un hook y en un comentario, y un fichero señuelo fuera de la copia que el agente no debe poder leer; (c) los cuatro a la vez, cronometrados. Si el total pasa de 2 min, se prueba otro modelo. Resultado y opciones elegidas en `review.md` | `027/review.md` (crear) | — | ☐ |
| T02 [P] | **Fallos plantados, en local** (plan §2.6). Clonar `feedback-hub`, crear la rama `demo/seguridad` y escribir los 4 fallos. Comprobar que pasa las pruebas y compila, como en `comprobar-pr.yml` (si hace falta Bun, se avisa antes de instalarlo). `fallos-plantados.md`: fichero, qué se plantó y qué debe decir el informe. Sin push | `FH/src/lib/resumen-ia.ts`, `FH/supabase/migrations/20261125000000_demo_seguridad.sql`, `FH/src/routes/admin.tsx` (crear) · `FH/src/routes/index.tsx`, `FH/src/routeTree.gen.ts` (lo regenera la compilación) · `027/fallos-plantados.md` (crear) | — | ☐ |
| T03 | **`informe.mjs`** (plan §2.5): JSON de los agentes → `security-report.md`; tapa las claves; marca la familia sin revisar si su JSON falta o no es válido. Con JSON de ejemplo: normal, sin hallazgos, agente caído y clave copiada en un hallazgo | `PIPE/scripts/informe.mjs`, `PIPE/pruebas/` (crear) | — | ☐ |
| T04 | **`auditar.sh`** (plan §2.2) con las opciones de T01: ruta o URL, `--rama`, `--familia`, límite de 150 s, progreso y limpieza de la copia. Probado con una ruta, una URL, una ruta que no existe y sin `claude` en el PATH | `PIPE/auditar.sh`, `PIPE/.gitignore` (crear) | T01, T03 | ☐ |
| T05 | **Agentes F1 y F2** adaptados (plan §2.4) y probados con `--familia` contra `FH/`, con los fallos y en `main` | `PIPE/agentes/familia-1-claves.md`, `PIPE/agentes/familia-2-datos.md` (crear) | T02, T04 | ☐ |
| T06 [P] | **Agentes F3 y F4** adaptados y probados igual | `PIPE/agentes/familia-3-datos-personales.md`, `PIPE/agentes/familia-4-configuracion.md` (crear) | T02, T04 | ☐ |
| T07 | **Prueba completa en local** (CA2–CA6, CA8): tres ejecuciones contra `demo/seguridad`, una contra `main` y una contra `HeroCamp-Product/feedbackhub`. Duración por agente y total, `git status` y hash antes y después, búsqueda de los valores plantados en los informes. Se ajustan los agentes si alguno falla. Se guardan el ejemplo y el plan B | `PIPE/agentes/*.md` (ajustes) · `PIPE/ejemplos/security-report.md` · `sdd/specs/023-seguridad-v2-guion/plan-b/security-report.md` (crear) · `027/review.md` | T05, T06 · Jaime confirma `DATABASE_URL` de `feedbackhub` | ☐ |
| T08 | **README** (R10), con la duración medida y las limitaciones | `PIPE/README.md` (crear) | T07 | ☐ |
| T09 🧑 | **Publicar, con confirmación de Jaime:** (a) Jaime revisa y hace commit en `PIPE/` y `FH/`; (b) se crea `jagarcig-ntt/herocamp-security-pipeline`, público, con `gh`; (c) Jaime sube la rama `demo/seguridad`, sin PR. Después se comprueba CA7: `main` con el mismo commit, sin PR, sin despliegue y la URL de producción igual | `027/review.md` | T08 | ☐ |
| T10 | **Desde cero** (CA1, 3.5): clonar el repositorio publicado en una carpeta vacía y seguir solo el README contra la URL de `feedback-hub` con `--rama demo/seguridad`, cronometrado | `027/review.md` | T09 | ☐ |
| T11 🧑 | **Ensayo de Jaime desde VS Code:** la demo de las 20:39 con el guion delante. Cubre SPEC-023 T02 y SPEC-001 T15. **Antes del 5-dic** | `027/review.md` | T10 | ☐ |
| T12 | **Revisión** `/sdd-review 027`: CA1–CA8. Se pasan los cambios pendientes a SPEC-023 T10 (`feedback-hub` en la ACCIÓN y el texto de las 20:40) y a SPEC-024 (enlace en `#curiosos`) | `027/review.md` | T11 | ☐ |

Estados: ☐ pendiente · ◐ en curso · ☑ hecha · ✕ descartada

**Fechas:** T01–T03 hasta el 27-nov · T04–T07 hasta el 1-dic · T08–T10 hasta el 3-dic · T11 el 4-dic · T12 antes del 7-dic.

**Si no llega:** se recorta alcance (1.5). Con T01, T02 y T07 sin cerrar el 3-dic, la demo se hace con el pipeline de junio y `HeroCamp-Product/feedbackhub`, como dice hoy el guion.

## Commits propuestos
<!-- El agente añade aquí el mensaje sugerido al cerrar cada tarea -->
