# SPEC-024 · Portal de la sesión Seguridad v2 (v2: 2h, solo teoría)

| Campo | Valor |
|---|---|
| Estado | **en curso** (25-nov) · aprobada v2 (Jaime, 24-nov) · plan aprobado (25-nov) · tasks · hub corregido (R1). La v1 (aprobada el 18-nov: 4h, salas, prácticas, prompts auditores y check en el CI) queda en el historial de git. SPEC-026 la redefinió el 24-nov |
| Sesión | 2026-12 Seguridad v2 (**jueves 10-dic · 19:00–21:00 · Zoom**) |
| Fecha límite | 2026-12-07. El hub, antes: ver R1 |
| Depende de | SPEC-023 (guion: fuente de los minutos, los textos y las preguntas) · SPEC-026 (guía publicada, prompts y capturas de la prueba en Lovable) · SPEC-016 (portal del 21-nov, modelo de estructura y de botones *Copiar*) · constitution v1.9 |
| Responsable | Jaime García |

## 1. Problema / necesidad
- **El portal de seguridad es todavía el de junio** (`sesiones/2026-12-seguridad-v2/index.html`, 1.493 líneas):
  - Tiene las secciones Hero, Para qué, Quién, Impacto, Familias (las 4 de junio), Dinámicas, Práctica, Debate y Cierre.
  - Responde a una sesión de 3h con el pipeline como práctica.
  - Nada de eso es la sesión del 10-dic: 2h, solo teoría, 3 familias y un chequeo en Lovable del formador después de cada una (constitution v1.9, §0 y la excepción de Seguridad v2).
- **El hub anuncia una fecha y una hora que ya no son ciertas.** `index.html`, línea 53, dice «11 dic 2026 · 17:00–21:00». La sesión es el jueves 10-dic de 19:00 a 21:00, y la guía ya se ha enviado a los alumnos con esa fecha.
- **El cuerpo de la v1 de esta spec describe otra sesión:** salas, 3 prácticas, prompts auditores, el check en el CI y un anexo de 240 min. Lo descartó SPEC-026 (§5.3 y §8 bis).
- **El contenido ya existe y está revisado:**
  - el guion (SPEC-023: textos, ideas, casos y preguntas, con revisión de lenguaje en T09);
  - la guía publicada (`descargas/guia_seguridad_alumnos.pdf`);
  - los prompts (`HeroCamp-Teoria/Entregables/prompts_chequeo_lovable.md`);
  - las capturas de la prueba en Lovable (`026/capturas/`).

  El portal tiene que derivarse de ahí (constitution 1.6), no escribirse de nuevo.

## 2. Objetivo
Que el portal de la sesión cuente lo mismo que el guion y la guía: los tres riesgos, el chequeo en Lovable, los prompts para copiar y la descarga de la guía, con la estructura y los componentes del portal del 21-nov y en lenguaje directo. Y que el hub anuncie la fecha y la hora correctas.

## 3. Para quién
- **Alumnos (18, nivel técnico mayoritariamente bajo):** durante la sesión, seguir en pantalla lo que cuenta Jaime. Después, volver al portal para copiar los prompts y descargar la guía.
- **Jaime:** las notas del orador (`?notas` o la tecla `N`) con las horas y las preguntas del guion. Imparte solo.

## 4. Alcance
**Incluye:**
- **Corregir la fecha y la hora en el hub** (`index.html`).
- **Reescribir en su sitio `sesiones/2026-12-seguridad-v2/index.html`,** con la estructura y los componentes del portal del 21-nov (`assets/` común, tarjetas de familia, notas del orador y botones *Copiar*). La versión de junio queda en el tag `sesion-2026-06`.
- **Secciones** (propuesta, pregunta P2):
  - Hero;
  - Para qué;
  - El día (horario de 19:00 a 21:00 y cómo participar);
  - Familias (F1, F2 y F3, cada una con su chequeo en Lovable);
  - Los tres prompts para copiar;
  - Para curiosos (el pipeline);
  - Descargas;
  - Cierre (Demo Day).
- **Capturas de la prueba del 24-nov como imágenes del chequeo,** si Jaime lo aprueba (P4).

**No incluye:**
- Prácticas, salas, prompts auditores, el check en el CI, la chuleta de la asistente, ni el anexo de la v1.
- La familia 4 como bloque. La configuración solo aparece en la checklist de la guía.
- El guion (SPEC-023), la guía ni los prompts (SPEC-026). Si el portal encuentra un error en ellos, se anota como hallazgo.
- El portal del 21-nov.

## 5. Requisitos
- **R1. Hub correcto, cuanto antes:** «Jueves 10 dic 2026 · 19:00–21:00 · Zoom». La descripción de la tarjeta también decía «cuatro familias… pipeline», y pasa a «tres riesgos… escáner de Lovable y tres prompts». ✅ **Hecho el 24-nov** (P5) y verificado en Edge a 1440 y 390 px.
- **R2. Una sola fuente** (1.6): las horas, las ideas, los términos, los casos, las preguntas y los mensajes salen del guion de SPEC-023. Si el guion cambia en su revisión (T10), el portal se ajusta.
- **R3. Cada tarjeta de familia** tiene:
  - el para qué en una frase;
  - "Antes de entrar" con 3 términos (los de la guía);
  - las 3 ideas;
  - el caso verificado con su fuente;
  - qué pasó en el chequeo en Lovable el 24-nov;
  - el mensaje;
  - lo que te llevas, con un enlace a la página de la guía.

  Máximo 3 ideas (2.3).
- **R4. Prompts con botón *Copiar*:** el texto de cada prompt es idéntico al de `prompts_chequeo_lovable.md` y al de la guía (los tres coinciden; T10 de SPEC-026). Se comprueba con un script. Sin enlaces al repositorio (decisión de SPEC-016, commit `774c2a6`).
- **R5. Lenguaje directo** (excepción v1.9): sin metáforas ni analogías, con cada término definido la primera vez y en lenguaje de PM. Se aplica también a los textos de junio que se reutilicen.
- **R6. Para curiosos:** el pipeline de agentes en un desplegable. Dice qué es (definido en una frase) y que no lo necesitan. Es el único sitio del portal donde salen VS Code y Claude Code.
- **R7. Descargas:** la guía en PDF en su URL actual (constitution 4). Qué pasa con las demás descargas de junio se decide en P3.
- **R8. Notas del orador:** en cada sección, la hora y las preguntas del guion, ocultas sin `?notas`.
- **R9. Nada de secretos en pantalla** (3.4): las capturas se revisan antes de publicarlas.
- **R10. Identidad visual de junio y `assets/` común** (3.6), sin estilos duplicados.

## 6. Criterios de aceptación
- [x] **CA1.** El hub dice «Jueves 10 dic 2026 · 19:00–21:00 · Zoom». Verificado en el navegador (24-nov).
- [ ] **CA2.** El portal tiene las secciones aprobadas en P2, usa `assets/` y no conserva secciones de junio (Impacto, Dinámicas, Práctica, Debate ni la familia 4).
- [ ] **CA3.** El horario de "El día" coincide con el guion de SPEC-023: 8 bloques, de 19:00 a 21:00.
- [ ] **CA4.** Las tres tarjetas tienen 3 términos, 3 ideas y un caso cada una, con la misma redacción que el guion y la guía. Los casos y cifras tienen fuente.
- [ ] **CA5.** Los tres botones *Copiar* funcionan en GitHub Pages y su texto es idéntico al de `prompts_chequeo_lovable.md` (comprobado con un script).
- [ ] **CA6.** Revisión de lectura: sin lenguaje figurado ni términos sin definir. VS Code y Claude Code solo aparecen en "Para curiosos".
- [ ] **CA7.** Verificado en Chrome (o Edge) a 1440 px y 390 px, con las notas ocultas sin `?notas` y visibles con él. `python scripts/check_links.py` no encuentra enlaces rotos. Las URL de `descargas/` siguen respondiendo.
- [ ] **CA8.** No se ve ningún token ni clave real en el portal ni en las capturas.

## 7. Restricciones (constitution)
- **1.6 Una sola fuente:** el guion manda.
- **2.2 y la excepción v1.9:** definiciones directas, sin analogías.
- **2.3 Máximo 3 ideas por bloque.**
- **3.4 Nada de secretos en pantalla.**
- **3.6 Portales estáticos con `assets/` común e identidad visual de junio.**
- **4 URL estables:** la del portal y las de `descargas/`.
- **5.6 El portal es sensible:** verificación en el navegador antes del commit.

## 8. Preguntas abiertas
- [x] **P1. El portal** (Jaime, 24-nov). ¿Qué se ve en pantalla durante la sesión: el portal o la guía en PDF? Hoy el guion (SPEC-023) enseña la guía en PDF.
  - **Recomendación:** el portal en pantalla, como el 21-nov. Se lee mejor por Zoom, tiene las notas del orador y los botones *Copiar*, y la guía queda como documento para después.
  - **Si dices que sí,** en T10 de SPEC-023 se cambian las ACCIÓN del guion de "la guía, página N" a "el portal, sección N", sin tocar el texto que dices.
- [x] **P2. Sí, la recomendación** (24-nov). ¿Te valen las secciones de §4?
  - Hero, Para qué, El día, Familias (3), Prompts, Para curiosos, Descargas y Cierre.
  - Sale "Quién" (ya os conocen del 21-nov).
- [x] **P3. La recomendación: solo la guía enlazada** (24-nov). ¿Qué hacemos con las otras descargas de junio? El portal enlaza hoy, además de la guía:
  - los PDF de teoría para alumnos de las 4 familias (`descargas/familia{1,2,3,4}_*_alumnos.pdf`);
  - el zip de la práctica (`descargas/materiales_practica.zip`, el pipeline).

  El PDF de F2 tiene el error del CVE (lo atribuye a "Matan Getz", con fecha del 4 de junio; hallazgo de SPEC-026 T05). F4 no se da como bloque, y el zip es de la práctica de junio.

  **Recomendación:** que el portal enlace solo la guía. Los demás ficheros se quedan en `descargas/` para no romper sus URL (constitution 4), pero sin enlace.
- [x] **P4. Sí, recortadas** (24-nov). ¿Usamos las capturas de la prueba del 24-nov como imágenes en las tarjetas?** Por ejemplo, el aviso crítico de Findings y la negativa de Lovable. Se ve el nombre de tu cuenta de Lovable y de tus proyectos. Recomendación: sí, recortadas para que solo se vea el mensaje.
- [x] **P5. Sí: corregido el 24-nov.** ¿Corrijo ya el hub (R1), antes de aprobar el resto de la spec? Es una línea y los alumnos ya pueden estar mirándolo.

## 9. Hallazgos fuera de alcance
- ~~**El hub sigue marcando la sesión del 21-nov como «En preparación»,** cuando ya se impartió.~~ **Corregido el 25-nov** (Jaime): la tarjeta del 21-nov dice «Impartida», sin resaltar, y la de seguridad, «Próxima sesión» (antes «En actualización»). Verificado en Edge a 1440 y 390 px.
- **`plan.md` de esta spec es el de la v1** (salas, prácticas, auditores) y queda obsoleto. Cuando se apruebe esta v2, se rehace con `/sdd-plan 024`.
- **El portal de junio enlaza contenido que puede no existir ya,** por ejemplo `portal_sesion.html`, que se citaba en el guion de junio como plan B. Se revisará al reescribirlo.
