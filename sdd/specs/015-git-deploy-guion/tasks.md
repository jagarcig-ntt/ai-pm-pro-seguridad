# TASKS · SPEC-015 · Guion, cheat sheet y kit de la sesión Git/Deploy

*Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)*

Reglas:
- Cada tarea cabe en una sesión de trabajo (≤ 2h) y produce algo revisable.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.
- Al cerrar una tarea, el agente propone el mensaje de commit y Jaime hace el commit.
- 🧑 = la hace Jaime.

**Orden:**
1. Primero las prácticas: son lo más arriesgado y el guion depende de ellas.
2. Después el guion, empezando por un bloque prototipo para fijar el tono.
3. Al final, lo derivado (cheat sheet y kit) y el ensayo.

| ID | Tarea | Ficheros | Depende | Estado |
|---|---|---|---|---|
| T01 | **Guía de la práctica (P1 y P2)** para el alumno, a partir de `ensayo.md`, con prompts, enlaces, puntos de control, errores esperados y la variante si los secretos no vienen de casa. | `sesiones/2026-11-git-deploy/Guia/guia_practica_sesion.md` | — | ☑ |
| T02 [P] | **Script de timings:** suma los minutos del guion, comprueba 240 y compara hora a hora con el anexo A de SPEC-010 y con la cheat sheet. | `scripts/check_timings.py` | — | ☑ |
| T03 | **Guion, prototipo:** pre-sesión, B0 y T1 (F1), con el formato de `guion-bloque.md`. Jaime revisa el tono antes de seguir. | `sesiones/2026-11-git-deploy/Teoria/GUION-SESION.md` | T01 | ☑ |
| T04 🧑 | Jaime revisa el tono del prototipo. | — | T03 | ☑ |
| T05 | **Guion:** T2 (F2), T3 (F3) y la pausa. | `GUION-SESION.md` | T04 | ☑ |
| T06 | **Guion:** P1, pausa y P2, enlazando la guía de la práctica, con el papel del ayudante y los puntos de control. | `GUION-SESION.md` | T05 | ☑ |
| T07 | **Guion:** T4 (F4) con el simulacro, rescate, cierre (reto y squad de pasada, puente al 11-dic) y colchón. "Qué hacer si…" al final. | `GUION-SESION.md` | T06 | ☑ |
| T08 | **Cheat sheet** de una página, derivada del guion. `check_timings.py` en verde. | `sesiones/2026-11-git-deploy/Teoria/CHEAT-SHEET.md` | T02, T07 | ☑ |
| T09 [P] | **Kit del alumno:** ciclo de cada cambio, mapa de entornos, checklist, chuleta de Git sin terminal, ficheros y reto. | `sesiones/2026-11-git-deploy/Guia/kit_alumno.md` | T01 | ☑ |
| T10 | **PDF** de la guía de la práctica y del kit, revisando que no aparezca ningún dato sensible. | `scripts/generar_guia_pdf.py`, `sesiones/2026-11-git-deploy/descargas/guia_practica_sesion.pdf`, `sesiones/2026-11-git-deploy/descargas/kit_alumno.pdf` | T01, T09 | ☑ |
| T11 🧑 | **Recrear `demo/f4-rompe-produccion`** con los comandos de `notas.md` de SPEC-019 (T12) y comprobar que el PR #6 sigue abierto y en rojo. | — | — | ☐ |
| T12 🧑 | **Ensayo completo cronometrado** la semana del 16-nov, siguiendo el guion con un proyecto nuevo de Lovable y apuntando los minutos reales de cada bloque (CA6). | — | T08, T10, T11 | ☐ |
| T13 | **Ajustes tras el ensayo** y revisión `/sdd-review 015`: CA1–CA6, con `check_timings.py` en verde. | guion, cheat sheet, guía, kit, `review.md` | T12 | ☐ |

Estados: ☐ pendiente · ◐ en curso · ☑ hecha · ✕ descartada

**Ruta crítica:** T01 → T03 → T04 🧑 → T05 → T06 → T07 → T08 → T12 🧑 → T13. T02, T09–T11 en paralelo.

**Fuera de esta spec, pendiente de Gema:** la guía de cómo operar para el ayudante.

## Commits propuestos
<!-- El agente añade aquí el mensaje sugerido al cerrar cada tarea -->
- T01 → `[SPEC-015] T01 Guía de la práctica P1 y P2 para el alumno`
- T02 → `[SPEC-015] T02 Script que comprueba los minutos del guion`
- T03 → `[SPEC-015] T03 Guion prototipo: pre-sesión, apertura y F1`
- T05-T07 → `[SPEC-015] T05-T07 Guion completo: F2, F3, prácticas, F4, rescate y cierre (240 min)`
- T08-T10 → `[SPEC-015] T08-T10 Cheat sheet, kit del alumno y PDF de las guías`
