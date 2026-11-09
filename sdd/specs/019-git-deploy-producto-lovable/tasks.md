# TASKS · SPEC-019 · Producto Lovable de la sesión

*Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)*

Reglas:
- Cada tarea cabe en una sesión de trabajo (≤ 2h) y produce algo revisable.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.
- Al cerrar una tarea, el agente propone el mensaje de commit y Jaime hace el commit.
- 🧑 = la hace Jaime, porque necesita sus cuentas. El agente verifica después, sin publicar nada.

**Ya hecho antes de estas tareas (3-nov):** Supabase conectado, CI/CD con Supabase, CA1 y CA2 (`notas.md`).

**Orden:**
1. Primero el ensayo solo con navegador: es lo más arriesgado y bloquea la guía del 12-nov.
2. Después las comprobaciones de datos y login, que los alumnos necesitarán.
3. Al final, el material de la demo.

| ID | Tarea | Ficheros | Depende | Estado |
|---|---|---|---|---|
| T01 | **Preparar el ensayo:** los 2 workflows listos para copiar y una lista de pasos, tal como los haría un alumno desde el navegador. | `sesiones/2026-11-git-deploy/Lab/workflows/comprobar-pr.yml`, `sesiones/2026-11-git-deploy/Lab/workflows/desplegar.yml`, `ensayo.md` | — | ☑ |
| T02 🧑 | **Ensayo, parte 1 (CA9):** proyecto nuevo de Lovable, repo público, conectar su Supabase por *Connectors*, token y secretos en GitHub, pegar los workflows en `main`. Cronometrar y hacer capturas. | — | T01 | ☑ |
| T03 | **Verificar la parte 1:** la Action crea el Worker en la primera publicación y la URL de producción sirve la app. Si falla, diagnosticar y corregir la lista de pasos. | `notas.md`, `ensayo.md`, `Lab/workflows/desplegar.yml` | T02 | ☑ |
| T04 🧑 | **Ensayo, parte 2 (CA9):** proteger `main`, cambio en Lovable, PR, check, preview y merge. Cronometrar y hacer capturas. | — | T03 | ☑ |
| T05 | **Cerrar el ensayo:** comprobar por contenido preview y producción, comparar los tiempos con P1 y P2 de la escaleta y anotar qué pasa a la guía (SPEC-013). | `notas.md`, `ensayo.md` | T04 | ☑ |
| T06 🧑 [P] | **Tabla desde el chat (CA7):** en `feedback-hub`, con una rama conectada, pedir una tabla de prueba y aprobar el SQL. | — | — | ☑ |
| T07 | **Verificar CA7:** si la tabla llega a Supabase antes del merge y si aparece en `supabase/migrations/`. Anotar el mensaje para F2 y borrar la tabla de prueba. | `notas.md` | T06 | ☑ |
| T08 🧑 | **Login desde la app publicada (CA8):** pedir a Lovable un acceso con login que lea `feedback`, por PR, y añadir la URL de producción a las redirecciones de Supabase. | — | T07 | ☑ |
| T09 | **Verificar CA8:** el login y la lectura funcionan en la URL de producción y, sin sesión, no se lee nada. Anotar qué va a la guía. | `notas.md` | T08 | ☑ |
| T10 | **Plantilla de PR, checklist, README y workflow actualizado:** preparar los ficheros para que entren por prompts de Lovable y PR, como haría un alumno (CA5). *Hecho el 8-nov: la plantilla y `desplegar.yml` ya estaban en `Lab/workflows/`; se añaden la checklist y la sección del README.* | `sesiones/2026-11-git-deploy/Lab/feedback-hub/checklist-go-live.md`, `sesiones/2026-11-git-deploy/Lab/feedback-hub/README-seccion.md` | T05 | ☑ |
| T11 🧑 | **Abrir y fusionar ese PR, y añadir "Comprobar el PR" al ruleset de `main`.** | — | T10 | ☑ |
| T12 | **Ramas de demo:** preparar `demo/f3-checks` y `demo/f4-rompe-produccion` (plan 2.4), con script e instrucciones para Jaime. | `feedback-hub`: ramas de demo · `notas.md` | T11 | ☐ |
| T13 🧑 | **Subir las ramas de demo, abrir sus PR y probar el rollback** en el panel de Cloudflare, cronometrado. | — | T12 | ☐ |
| T14 | **Verificar CA3 y CA4:** F3 en rojo y merge bloqueado; F4 en verde y con error visible en producción; el rollback la recupera, comprobado por contenido. | `notas.md` | T13 | ☐ |
| T15 🧑 [P] | **Limpieza:** archivar `feedbackhub-demo`, borrar su proyecto de Pages y las filas de prueba de `feedbackhub-prod`. | — | T14 | ☐ |
| T16 | **Revisión** `/sdd-review 019`: CA1–CA9, búsqueda de claves (CA6) y Lovable "In sync". | `review.md` | T05, T09, T14 | ☐ |

Estados: ☐ pendiente · ◐ en curso · ☑ hecha · ✕ descartada

**Ruta crítica para el 12-nov:** T01 → T02 🧑 → T03 → T04 🧑 → T05. T06–T09 van en paralelo; T10–T14 pueden acabar después sin bloquear la guía.

**`Lab/README.md`** ya apunta a `feedback-hub` (5-nov). Falta enlazar la checklist cuando exista (T10).

## Commits propuestos
<!-- El agente añade aquí el mensaje sugerido al cerrar cada tarea -->
- T01 → `[SPEC-019] T01 Workflows para copiar y lista de pasos del ensayo solo con navegador`
- T03 → `[SPEC-019] T03 Ensayo bloques A y B: workflows desde Lovable, variables de Supabase en el Worker y comprobación de la web`
- T05 → `[SPEC-019] T05 Ensayo solo con navegador cerrado: bloque C y lecciones para la guía`
- T07 → `[SPEC-019] T07 Los cambios de tabla de Lovable se aplican antes del merge (CA7)`
- T09 → `[SPEC-019] T09 Login en producción (CA8): URL de Supabase y producción rota antes del merge`
- T10 → `[SPEC-019] T10 Checklist de go-live y sección del README para feedback-hub`
- T11 → `[SPEC-019] T11 feedback-hub con plantilla, checklist, README y workflow nuevo; check obligatorio`
