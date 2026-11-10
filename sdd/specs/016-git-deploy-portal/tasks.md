# TASKS · SPEC-016 · Portal de la sesión Git/Deploy

*Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)*

Reglas:
- Cada tarea cabe en una sesión de trabajo (≤ 2h) y produce algo revisable.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.
- Al cerrar una tarea, el agente propone el mensaje de commit y Jaime hace el commit.
- 🧑 = la hace Jaime.

| ID | Tarea | Ficheros | Depende | Estado |
|---|---|---|---|---|
| T01 | **Portal completo:** las 11 secciones del plan con sus notas del orador, y los botones de copiar (prompt y fichero en un clic). | `sesiones/2026-11-git-deploy/index.html` | — | ☑ |
| T02 [P] | **Hub, README de la sesión y guía de requisitos:** tarjeta del hub, enlace al portal y mención del portal en la guía, con su PDF regenerado. | `index.html`, `sesiones/2026-11-git-deploy/README.md`, `sesiones/2026-11-git-deploy/Guia/guia_requisitos_previos.md`, `sesiones/2026-11-git-deploy/descargas/guia_requisitos_previos.pdf` | — | ☑ |
| T03 | **Verificación:** capturas a 1440 px y 390 px, modo notas, prueba del botón de copiar, `check_links.py`, búsqueda de datos sensibles y comparación con el guion (CA1–CA5). | `notas.md` | T01, T02 | ☑ |
| T04 🧑 | Jaime revisa el portal en el navegador. | — | T03 | ☐ |
| T05 🧑 | Push como tarde el 19-nov y comprobación en GitHub Pages, incluidos los botones de copiar. | — | T04 | ☐ |
| T06 🧑 | Validación en el ensayo completo (CA6), junto con SPEC-015 T12. | — | T05 | ☐ |
| T07 | Ajustes tras el ensayo y revisión `/sdd-review 016`. | `index.html`, `review.md` | T06 | ☐ |

Estados: ☐ pendiente · ◐ en curso · ☑ hecha · ✕ descartada

## Commits propuestos
<!-- El agente añade aquí el mensaje sugerido al cerrar cada tarea -->
- T01-T03 → `[SPEC-016] T01-T03 Portal de la sesión Git/Deploy, hub actualizado y verificación en el navegador`
