# TASKS · SPEC-021 · Rediseño de las familias 3 y 4

*Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)*

Reglas:
- Cada tarea cabe en una sesión de trabajo (≤ 2h) y produce algo revisable.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.
- Al cerrar una tarea, el agente propone el mensaje de commit y Jaime hace el commit.
- 🧑 = la hace Jaime.

**Redefinición del 25-nov (spec §0):** el entregable es la página de preguntas difíciles. T02 cambia de contenido; T04, T05 y T06 se descartan.

**Orden:** primero la verificación, que decide qué casos y cifras entran; después la página y la revisión de Jaime.

| ID | Tarea | Ficheros | Depende | Estado |
|---|---|---|---|---|
| T01 | **Verificar cifras y casos** de F3 y F4 de junio y buscar candidatos del entorno de Lovable y Supabase. Resultado por cada uno: se mantiene, se actualiza o sale. | `verificacion.md` | — | ☑ |
| T02 | **Preguntas difíciles** (spec §0). Una página para Jaime con las preguntas probables, la respuesta directa y la fuente de cada dato. El colchón del guion pasa a enlazarla en lugar de repetir las respuestas | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/PREGUNTAS-DIFICILES.md` (crear) · `…/HeroCamp-Teoria/GUION-SESION.md` (colchón, 20:48) | T01 | ☑ 25-nov · 21 preguntas: 5 de Lovable y el escáner, 5 de F1, 3 de F2, 6 de F3 y 2 de pipeline y configuración. Incluye las 5 que tenía el colchón. Cada una con fuente (guía, prueba del 24-nov o verificaciones). Lo no comprobado se dice así (créditos de *Run checks*, pasos de límite de gasto de cada servicio). `check_timings --sesion seguridad --palabras` sigue en ✓ |
| T03 🧑 | Jaime revisa la página de preguntas difíciles (CA-D) y añade las preguntas que espere de su grupo | `…/PREGUNTAS-DIFICILES.md` | T02 | ☐ |
| T04 | ~~F4: alumnos y formador~~ | — | — | ✕ 25-nov (spec §0; ya lo había sacado SPEC-026) |
| T05 [P] | ~~Kit: secciones de datos y configuración~~ | — | — | ✕ 25-nov: la checklist de configuración ya está en la guía (SPEC-026 T09) |
| T06 🧑 | ~~Probar las prácticas~~ | — | — | ✕ 25-nov: no hay prácticas (SPEC-026) |
| T07 | **Revisión** `/sdd-review 021`: CA3, CA5 y CA-A–CA-D de spec §0 | `review.md` | T03 | ☐ |

Estados: ☐ pendiente · ◐ en curso · ☑ hecha · ✕ descartada

## Commits propuestos
<!-- El agente añade aquí el mensaje sugerido al cerrar cada tarea -->
- T01 → `[SPEC-021] T01 Verificación de cifras y casos de F3 y F4`
- T02 → `[SPEC-021] Redefinida: preguntas difíciles para el formador en lugar de teoría de F3; T02 hecha (21 preguntas con fuente; el colchón del guion la enlaza)`
