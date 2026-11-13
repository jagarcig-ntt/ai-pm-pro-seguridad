# TASKS · SPEC-021 · Rediseño de las familias 3 y 4

*Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)*

Reglas:
- Cada tarea cabe en una sesión de trabajo (≤ 2h) y produce algo revisable.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.
- Al cerrar una tarea, el agente propone el mensaje de commit y Jaime hace el commit.
- 🧑 = la hace Jaime.

**Orden:** primero la verificación, porque decide qué casos y cifras entran; después F3 como prototipo, y F4 tras la revisión de Jaime.

| ID | Tarea | Ficheros | Depende | Estado |
|---|---|---|---|---|
| T01 | **Verificar cifras y casos** de F3 y F4 de junio y buscar candidatos del entorno de Lovable y Supabase. Resultado por cada uno: se mantiene, se actualiza o sale. | `verificacion.md` | — | ☑ |
| T02 | **F3 (prototipo):** F3a y F3b, alumnos y formador, con la práctica del mapa de datos y el simulacro de brecha. | `Bloque Teorico/familia3_datos_sensibles_alumnos.md`, `Bloque Teorico/Formador/familia3_datos_sensibles_profundo.md` | T01 | ☐ |
| T03 🧑 | Jaime revisa F3 (CA6). | — | T02 | ☐ |
| T04 | **F4:** alumnos y formador, con la práctica "¿qué expone tu producto?". | `Bloque Teorico/familia4_entornos_configuracion_alumnos.md`, `Bloque Teorico/Formador/familia4_entornos_configuracion_profundo.md` | T03 | ☐ |
| T05 [P] | **Kit:** secciones de datos y configuración, incluida la checklist de configuración con las cabeceras. | `Entregables/guia_seguridad_alumnos.md` | T02 | ☐ |
| T06 🧑 | **Probar las prácticas** sobre `notas-al-d-a` y `feedback-hub`: *Security Advisor* de Supabase, buckets y funciones. El agente comprueba desde fuera lo que se pueda. | `notas.md` | T04 | ☐ |
| T07 | **Revisión** `/sdd-review 021`: CA1–CA6. | `review.md` | T05, T06 | ☐ |

Estados: ☐ pendiente · ◐ en curso · ☑ hecha · ✕ descartada

## Commits propuestos
<!-- El agente añade aquí el mensaje sugerido al cerrar cada tarea -->
- T01 → `[SPEC-021] T01 Verificación de cifras y casos de F3 y F4`
