# TASKS · SPEC-023 · Guion y cheat sheet de Seguridad v2 (2h, 10-dic)

*Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)*

Reglas:
- Cada tarea cabe en una sesión de trabajo (≤ 2h) y produce algo revisable.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.
- 🧑 indica que la hace Jaime (Lovable, VS Code, revisión o decisión).
- Al cerrar una tarea, el agente propone el mensaje de commit y Jaime hace el commit.
- **Lenguaje:** texto completo, directo, sin metáforas ni analogías y con cada término definido la primera vez (spec R7, P3).
- **Cabeceras:** `## BLOQUE · HH:MM–HH:MM (N min)` y `### HH:MM — Segmento (N min)`, para que las lea `check_timings.py`. El texto que dice Jaime va en líneas de cita (`>`) para que `--palabras` lo cuente.

**Orden:**
1. Primero, lo que permite comprobar el guion mientras se escribe: el script y el esqueleto con todas las horas.
2. En paralelo, lo que depende de Jaime y de herramientas externas: el pipeline.
3. Después, el texto de cada familia. F3 va al final, porque se ajusta a la teoría de SPEC-021 (30-nov).
4. Por último, la cheat sheet, la revisión y lo de la víspera.

| ID | Tarea | Ficheros | Depende | Estado |
|---|---|---|---|---|
| T01 | **Script de tiempos.** `--sesion seguridad`: rutas de `HeroCamp-Teoria/`, de 19:00 a 21:00, y comparación con la escaleta de `026/plan.md` §2.1, pasando los minutos relativos a hora. `--palabras`: palabras de las citas `>` de cada segmento ÷ 130, con aviso si superan los minutos. Sin argumentos, Git/Deploy sigue dando el mismo resultado que antes | `scripts/check_timings.py` | — | ☑ 24-nov · Git/Deploy da la misma salida que antes (comparada); probado con un guion de prueba |
| T02 🧑 [P] | **Prueba del pipeline de agentes** (plan §2.5, P7). Comprobar que las claves de `feedbackhub` son falsas o están revocadas (3.4). Abrir Claude Code en `HeroCamp-Product/` y ejecutar `/security-audit --repo feedbackhub`, opción A. Cronometrarlo y copiar el informe como plan B. Cubre también SPEC-001 T15. **Antes del 5-dic** | `sdd/specs/023-seguridad-v2-guion/plan-b/security-report.md` (crear) | — | ☐ |
| T03 | **Esqueleto del guion.** Se reescribe `GUION-SESION.md` en su sitio con: cabecera; "Cómo leer este guion"; la tabla de bloques; **todas las cabeceras de bloque y segmento con hora y minutos** (plan §2.1 y §2.2); la lista de interacciones; la pre-sesión (los días antes, una hora antes, diez minutos antes); y "Si algo falla" (plan §2.6). Los segmentos de las familias quedan con un marcador "texto en T04/T05/T06". `check_timings.py --sesion seguridad` pasa (sin la cheat sheet) | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/GUION-SESION.md` | T01 | ☑ 24-nov · `check_timings.py --sesion seguridad`: 8 bloques, 120 min, todo coincide. 11 interacciones, máximo 12 min entre una y otra sin contar la pausa |
| T04 | **Apertura y F1 · Claves y secretos**, con el texto completo (plan §2.3 y §2.4): para qué, "Antes de entrar", las ideas, el caso, las tres preguntas, el chequeo (negativa en el historial, prompt en directo, corte a los 4 min con la captura), lo que te llevas, la nota 🎓 "si vas tarde" y el plan B. `--palabras` sin avisos en estos bloques | `…/HeroCamp-Teoria/GUION-SESION.md` | T03 | ☑ 24-nov · apertura: unas 490 palabras (≈ 3,8 de 10 min); F1: unas 1.320 (≈ 10 de 27 min). Sin avisos |
| T05 | **F2 · Datos y permisos**, con el texto completo y la misma estructura. El caso CVE-2025-48757 se cuenta con la redacción verificada (no la de la teoría de junio). El chequeo enseña Findings | `…/HeroCamp-Teoria/GUION-SESION.md` | T04 | ☑ 24-nov · F2: unas 1.270 palabras (≈ 10 de 27 min). Sin avisos |
| T06 | **Pausa y F3 · Datos personales**, con el texto completo y la misma estructura, alineado con la teoría de F3 de SPEC-021. El chequeo enseña la vista previa del formulario | `…/HeroCamp-Teoria/GUION-SESION.md` | T05 · SPEC-021 (teoría F3, 30-nov) | ☑ 24-nov · F3: unas 1.190 palabras (≈ 9 de 27 min). Escrito antes de la teoría de F3 de SPEC-021, con las ideas validadas y la guía. **Cuando exista esa teoría, se revisa que use los mismos términos y casos (en T09 o T10)** |
| T07 | **Demo del pipeline, cierre y colchón**, con el texto completo. El pipeline: qué es un agente, qué revisa cada uno, que no lo necesitan y el plan B con corte a los 2 min. El cierre: la checklist de la guía, el Demo Day del 12-dic (sin arreglos el 11) y la pregunta final | `…/HeroCamp-Teoria/GUION-SESION.md` | T03 (T02 para la duración real del pipeline) | ☑ 24-nov · pipeline: unas 285 palabras (≈ 2,2 de 5 min); cierre: unas 185 (≈ 1,4 de 4 min); colchón con preguntas probables. Falta la duración real del pipeline (T02) |
| T08 | **Cheat sheet y limpieza.** Se reescribe `CHEAT-SHEET.md` en una página (plan §2.7) y se borra `GUION-SESION-COMPLETO.md` (P2). `check_timings.py --sesion seguridad` pasa con la cheat sheet y `check_links.py` sale limpio | `…/HeroCamp-Teoria/CHEAT-SHEET.md` · `…/HeroCamp-Teoria/GUION-SESION-COMPLETO.md` (borrar) | T04–T07 | ☑ 24-nov · cheat sheet: unas 620 palabras, con sus 8 filas iguales a la escaleta. `GUION-SESION-COMPLETO.md` borrado (sigue en el tag `sesion-2026-06`). `check_timings` y `check_links` (0 rotos), correctos |
| T09 | **Revisión de lectura y tiempos.** Repaso de lenguaje (CA6). Coincidencia con la guía (CA7). Casos contra las verificaciones (CA4). Términos, ideas y preguntas por familia (CA3). Lista de interacciones con sus huecos (CA2). Estimación de palabras por bloque con `--palabras` (CA8). Se corrige lo que falle y el resultado se anota en `review.md` | `…/HeroCamp-Teoria/GUION-SESION.md` · `…/HeroCamp-Teoria/CHEAT-SHEET.md` · `sdd/specs/023-seguridad-v2-guion/review.md` (crear) | T08 | ☑ 24-nov · 9 frases corregidas (lenguaje figurado y términos sin definir). CA1, CA2, CA3, CA4, CA6, CA7 y CA9 ✅; CA5 ⏳ (T02 y T11); CA8 ◐ (falta T10) |
| T10 🧑 | **Jaime revisa el guion** (5.3, CA8): el texto, las preguntas de cada familia y el chequeo de F1 sin petición en directo. Los cambios que pida se aplican en la misma tarea. **Objetivo: 7-dic** | `…/HeroCamp-Teoria/GUION-SESION.md` · `…/HeroCamp-Teoria/CHEAT-SHEET.md` | T09 | ☐ |
| T11 🧑 | **La víspera (9-dic).** Comprobar que `prueba-cloud` sigue con los tres fallos plantados (`026/prueba-lovable.md` §2.5). Lanzar los tres prompts y guardar las capturas de las respuestas (plan B del chequeo). Revisar que no se ve ningún secreto | `sdd/specs/023-seguridad-v2-guion/capturas/` (crear: `f1-prompt.png`, `f2-prompt.png`, `f3-prompt.png`) | T10 | ☐ |
| T12 | **Revisión** `/sdd-review 023`: CA1–CA9, con `check_timings.py --sesion seguridad --palabras` y `check_links.py` | `sdd/specs/023-seguridad-v2-guion/review.md` | T02, T10, T11 | ☐ |

Estados: ☐ pendiente · ◐ en curso · ☑ hecha · ✕ descartada

**Decisión de SPEC-024 (P1, Jaime, 24-nov):** en la sesión se enseña **el portal**, no la guía en PDF. En T10 se cambian las ACCIÓN del guion ("la guía, página N" → "el portal, sección N") y la pestaña 1 de la pre-sesión, sin tocar el texto que dice Jaime. Las anclas del portal salen del plan de SPEC-024.

**Decisión al aprobar el plan (Jaime, 24-nov):** en F1, el chequeo enseña la negativa del 24-nov en el historial del chat y no repite la petición en directo (plan §6, tensión 1).

**Fechas:** T01–T05 esta semana (hasta el 30-nov) · T06 después de la teoría de F3 (a partir del 30-nov) · T07–T09 del 1 al 4-dic · T02 antes del 5-dic · T10 hasta el 7-dic · T11 el 9-dic · T12 antes del 10-dic.

## Commits propuestos
<!-- El agente añade aquí el mensaje sugerido al cerrar cada tarea -->
- T01 → `[SPEC-023] T01 check_timings.py comprueba también el guion de Seguridad v2 (--sesion seguridad) y estima la duración del texto (--palabras)`
- T03 → `[SPEC-023] T03 Esqueleto del guion de Seguridad v2: horas de 19:00 a 21:00, interacciones, pre-sesión y "Si algo falla"`
- T04 → `[SPEC-023] T04 Guion: apertura y F1 (claves y secretos) con el texto completo`
- T05 → `[SPEC-023] T05 Guion: F2 (datos y permisos) con el texto completo`
- T07 → `[SPEC-023] T07 Guion: demo del pipeline, cierre y colchón con el texto completo`
- T06 → `[SPEC-023] T06 Guion: pausa y F3 (datos personales) con el texto completo`
- T08 → `[SPEC-023] T08 Cheat sheet de Seguridad v2 en una página; se borra el guion completo de junio (queda en el tag)`
- T09 → `[SPEC-023] T09 Revisión del guion: 9 frases corregidas (lenguaje figurado y términos sin definir); tiempos, casos y coincidencia con la guía comprobados`
