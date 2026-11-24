# TASKS · SPEC-026 · Replanteamiento de Seguridad v2: 2h de teoría + guía y checklist para Lovable

*Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)*

Reglas:
- Cada tarea cabe en una sesión de trabajo (≤ 2h) y produce algo revisable.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.
- 🧑 indica que la hace Jaime (Lovable, revisión o decisión).
- Al cerrar una tarea, el agente propone el mensaje de commit y Jaime hace el commit.
- **Lenguaje (R3 bis):** todo texto para alumnos (guía, prompts y la promesa corregida) se escribe con conceptos básicos, frases directas, sin metáforas ni analogías y con cada término técnico definido la primera vez.

**Orden:** primero lo que desbloquea la prueba en Lovable, que es lo más arriesgado, junto con las reglas y la promesa del check, que tienen fecha (26-nov, antes del aviso de Gema). Después, la guía.

| ID | Tarea | Ficheros | Depende | Estado |
|---|---|---|---|---|
| T01 | **Prompts y protocolo de prueba.** Borrador de los 3 prompts (F1, F2 y F3), de solo lectura y con respuesta en lenguaje de PM. Protocolo para Jaime: cómo crear `demo-seguridad` con los 3 fallos plantados y claves falsas, qué anotar del escáner (dónde se lanza, qué detecta, si consume créditos) y qué capturas tomar | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Entregables/prompts_chequeo_lovable.md` (crear) · `sdd/specs/026-seguridad-v2-replanteamiento/prueba-lovable.md` (crear: protocolo y tabla de resultados vacía) | — | ☑ |
| T02 [P] | **Reglas y registro.** Constitution v1.9 (§0: 21-nov impartida, Seguridad v2 el jueves 10-dic, 2h, Zoom; el 11-dic con otro entrenador; excepción a 2.6, 2.10 y 2.12 para esta sesión; historial). Registro según la tabla de la spec (§5.3). Cabeceras de SPEC-021 y SPEC-024 | `sdd/constitution.md` · `sdd/specs/README.md` · `sdd/specs/021-seguridad-v2-familias-3-4/spec.md` · `sdd/specs/024-seguridad-v2-portal/spec.md` | — | ☑ |
| T03 [P] | **La promesa del check.** Sustituir "El 11 de diciembre añadimos el check de seguridad a tu CI" por "En la sesión de seguridad os damos una guía y una checklist para revisar vuestro producto" en el portal y el kit del 21-nov, y regenerar el PDF del kit. En la plantilla del workflow, solo si Jaime confirma la recomendación (spec §8) | `sesiones/2026-11-git-deploy/index.html` (línea 855) · `sesiones/2026-11-git-deploy/Guia/kit_alumno.md` (línea 84) · `sesiones/2026-11-git-deploy/descargas/kit_alumno.pdf` · `sesiones/2026-11-git-deploy/Lab/workflows/comprobar-pr.yml` (línea 46, condicional) | — | ☑ 24-nov · PDF del kit regenerado con la frase nueva · comentario del workflow cambiado solo en la plantilla (decisión de Jaime) |
| T04 🧑 | **Prueba en Lovable.** Jaime crea `demo-seguridad` siguiendo el protocolo de T01, lanza el escáner y cada prompt 3 veces, y guarda capturas sin claves reales. Si Lovable no deja plantar un fallo, se anota tal cual | Proyecto de Lovable `prueba-cloud` (fuera del repo; decisión de Jaime) · `sdd/specs/026-seguridad-v2-replanteamiento/capturas/` (crear) | T01 | ☑ 24-nov (un intento por prompt) |
| T05 [P] | **Verificar los casos de F1 y F2** con fuente primaria y fecha: 82.314 $ en 48 h (F1), CVE-2025-48757 (F2) y los demás casos de sus teorías que pueda usar la guía. Resultado: mantener, actualizar o sale. Moltbook ya está verificado (`021/verificacion.md`) | `sdd/specs/026-seguridad-v2-replanteamiento/verificacion-f1-f2.md` (crear) | — | ☑ |
| T06 | **Consolidar la prueba.** Pasar a `prueba-lovable.md` lo que detectó el escáner y lo que devolvió cada prompt, con fecha. Ajustar los prompts si dieron resultados inestables o en lenguaje técnico. Decidir el plan B de cada chequeo | `sdd/specs/026-seguridad-v2-replanteamiento/prueba-lovable.md` · `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Entregables/prompts_chequeo_lovable.md` | T04 | ☑ 24-nov · comprobación avanzada: solo `notas_publicas`; no detecta los datos de más. Prompt F1 ajustado (servicio, sin contraseñas ni sesiones) y bloque de formato con agrupación: en la tercera prueba cumple el formato (resumen + 5 filas). Sin comprobar: si *Run checks* gasta créditos y la estabilidad de F2 y F3 con el formato nuevo |
| T07 [P] | **Script del PDF.** Que `generar_guia_pdf.py` acepte también la guía de seguridad (fuente en `HeroCamp-Teoria/Entregables/` y PDF en `sesiones/2026-12-seguridad-v2/descargas/`) sin cambiar lo que ya genera para Git/Deploy | `scripts/generar_guia_pdf.py` | — | ☑ probado el 24-nov con `kit_alumno`. En este equipo no hay Chrome: el script usa Edge si no encuentra Chrome |
| T08 | **Guía, parte 1:** "Cómo usar esta guía" y una página por familia (F1, F2 y F3): qué es, cómo se ve en Lovable, un caso verificado y el prompt para copiar. Se reescribe en su sitio (la versión de junio queda en el tag) | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Entregables/guia_seguridad_alumnos.md` | T05, T06 | ☑ |
| T09 | **Guía, parte 2:** checklist de una página (F1 a F3 + configuración de F4, a partir de `021/verificacion.md` y del plan de SPEC-021), "Si ya ocurrió: los primeros 30 minutos", aviso para el Demo Day y recuadro "Para curiosos" con el pipeline | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Entregables/guia_seguridad_alumnos.md` | T08 | ☑ |
| T10 | **Repaso del lenguaje y PDF.** Revisión de lectura de la guía y de los prompts (CA7: sin metáforas ni analogías, términos definidos, nada de VS Code, Claude Code ni terminal fuera de "Para curiosos": CA4) y generar el PDF | `guia_seguridad_alumnos.md` · `prompts_chequeo_lovable.md` · `sesiones/2026-12-seguridad-v2/descargas/guia_seguridad_alumnos.pdf` | T07, T09 | ☑ 24-nov · PDF de 9 páginas. Fuera de lo declarado: `scripts/generar_guia_pdf.py` (faltaba `fenced_code`; los prompts salían como texto suelto con ```) |
| T11 🧑 | **Jaime revisa la guía** (CA6) y da el OK para que Gema la envíe. Objetivo: 4-dic | — | T10 | ☑ 24-nov · Jaime da el OK; publicado en el commit 3bc9c7b |
| T12 | **Verificación técnica:** `python scripts/check_links.py`; búsqueda de la promesa en `sesiones/2026-11-git-deploy/` (solo puede quedar en el guion y la cheat sheet del formador); portal del 21-nov en Chrome a 1440 y 390 px; el PDF de la guía responde en su URL una vez publicado | — (comprobaciones; resultado en `review.md`) | T03, T11 | ☑ 24-nov: enlaces, búsqueda de la promesa y portal a 1440 y 390 px, todo correcto. Teoría F3 del 21-nov corregida a "10 de diciembre" (OK de Jaime). El PDF publicado responde (200, `application/pdf`) y coincide con el local |
| T13 | **Revisión** `/sdd-review 026`: CA1–CA7. CA3 se comprueba sobre la escaleta del plan, y otra vez cuando exista el guion de SPEC-023 | `sdd/specs/026-seguridad-v2-replanteamiento/review.md` (crear) | T02, T12 | ☑ 24-nov · veredicto: aún no `hecha`. Corregidos el 24-nov: el momento de pasar la checklist en la guía (el Demo Day es el 12-dic), los términos de F3 y la interacción al empezar cada chequeo en el plan. Faltan T06, T11 y T12 (`review.md`) |

Estados: ☐ pendiente · ◐ en curso · ☑ hecha · ✕ descartada

**Fuera de esta spec** (siguen en sus specs): las 3 ideas por familia pasan al guion de 120 min (SPEC-023) y al portal reducido (SPEC-024, pendiente de nueva aprobación), con la misma regla de lenguaje directo.

## Commits propuestos
<!-- El agente añade aquí el mensaje sugerido al cerrar cada tarea -->
- T01 → `[SPEC-026] T01 Prompts de chequeo en Lovable (borrador) y protocolo de prueba de demo-seguridad`
- T02 → `[SPEC-026] T02 Constitution v1.9 (Seguridad v2: 10-dic, 2h, solo teoría) y reordenación de SPEC-021 a 024`
- T03 → `[SPEC-026] T03 La promesa del check del 11-dic pasa a "guía y checklist de seguridad" en el portal y el kit del 21-nov` (incluye `descargas/kit_alumno.pdf` y `Lab/workflows/comprobar-pr.yml`)
- T05 → `[SPEC-026] T05 Verificación de los casos de F1 y F2 (salen Georgia y AWS-Medium; CVE-2025-48757 corregido)`
- T07 → `[SPEC-026] T07 generar_guia_pdf.py genera también la guía de seguridad (por nombre) y usa Edge si no hay Chrome`
- T08 → `[SPEC-026] T08 Guía de seguridad para Lovable, parte 1: cómo usarla y las tres familias con su prompt`
- T09 → `[SPEC-026] T09 Guía de seguridad, parte 2: checklist, primeros 30 minutos, aviso para el Demo Day y recuadro del pipeline`
- T10 → `[SPEC-026] T10 Repaso del lenguaje de la guía y los prompts; PDF de la guía de seguridad (y fenced_code en el script)`
- T12 → `[SPEC-026] T12 Verificación técnica: enlaces, promesa y portal del 21-nov; la teoría F3 apunta al 10-dic` (incluye `sesiones/2026-11-git-deploy/Teoria/familia3_entornos_secretos_alumnos.md`)
- T13 → `[SPEC-026] T13 Revisión: CA1, CA4 y CA5 cumplidos; pendientes la fecha del Demo Day en la guía, la interacción en la escaleta y T06, T11 y T12`
- Correcciones de la revisión → `[SPEC-026] T13 Guía: checklist en cuanto se recibe y Demo Day el 12-dic; plan: pregunta al empezar cada chequeo`
- T04 + T06 → `[SPEC-026] T04 T06 Prueba en Lovable: bloquea F1 y F3, avisa de F2 como crítico; prompts con formato corto`

**Hallazgo de T05:** la teoría de F2 de junio (`familia2_bbdd_permisos_alumnos.md`, §1 y §8) atribuye el CVE-2025-48757 a "Matan Getz" y lo fecha el 4 de junio; según el NVD y el blog del investigador, es Matt Palmer y el 29 de mayo de 2025. Además, no menciona que Lovable disputa el CVE.

**Hallazgos durante T01–T03 (fuera de alcance):**
- `CLAUDE.md` (raíz) sigue diciendo "Seguridad y buenas prácticas con IA v2 · 11 dic 2026 · 17:00–21:00" en su tabla de sesiones.
- `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/CLAUDE.md` describe el pipeline de junio (CLI en TypeScript, 3h, 11 alumnos). Ya lo señaló la retro de junio; no afecta a esta sesión.
