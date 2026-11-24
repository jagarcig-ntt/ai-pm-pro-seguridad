# SPEC-023 · Guion y cheat sheet de Seguridad v2 (2h, 10-dic)

| Campo | Valor |
|---|---|
| Estado | **en curso** (24-nov) · aprobada por Jaime · plan aprobado · [tasks](tasks.md) |
| Sesión | 2026-12 Seguridad v2 (**jueves 10-dic · 19:00–21:00 · Zoom**) |
| Fecha límite | 2026-12-07 |
| Depende de | SPEC-026: escaleta (`plan.md` §2.1), prueba en Lovable (`prueba-lovable.md`), casos verificados (`verificacion-f1-f2.md`) y guía publicada · SPEC-021: teoría de F3 (fecha límite 30-nov) · SPEC-001 T15: prueba del pipeline · constitution v1.9 |
| Alimenta | SPEC-024 (portal reducido, que se deriva del guion: constitution 1.6) |
| Responsable | Jaime García |

## 1. Problema / necesidad
- **El guion que existe es el de junio y no sirve para el 10-dic.**
  - `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/GUION-SESION.md` (300 líneas) está pensado para 3h y 4 familias, con un quiz previo y el pipeline como hilo conductor ("MINUTO 50-105: FAMILIA 1", "MINUTO 105-160: FAMILIA 2, 3, 4").
  - `GUION-SESION-COMPLETO.md` (1.937 líneas) y `CHEAT-SHEET.md` siguen el mismo esquema.
- **Los guiones de junio tenían timings incoherentes** entre la tabla, las cabeceras y la cheat sheet (`sdd/specs/020-retro-junio/retro.md`). La constitution 1.6 exige que los minutos vivan solo en el guion.
- **El formato nuevo está decidido, pero no está escrito qué se dice y qué se hace en cada minuto.** Son 2h, solo teoría, 3 familias y un chequeo en Lovable del formador después de cada una, más una demo del pipeline de 5 min (SPEC-026 §8 bis; escaleta en `026/plan.md` §2.1).
- **La prueba en Lovable del 24-nov cambia el mensaje de dos ideas del plan** (`026/prueba-lovable.md` §2.4):
  - Lovable se negó a poner una clave secreta en el código de la web.
  - Las tablas que crea tienen RLS por defecto.
  - Las ideas "La IA puede poner una clave secreta en el código de la web" (F1) y "La IA puede crear tablas sin RLS" (F2) del `026/plan.md` §2.2 ya no describen lo que verán en Lovable.
- **Este grupo necesita comprobar que entiende antes de seguir.** Sabe poco de lo técnico y es heterogéneo, y el 21-nov "siguieron los pasos sin entender los conceptos" (`sdd/specs/025-retro-git-deploy/retro.md`). En la revisión de SPEC-026 (`026/review.md`, CA3) apareció un hueco de unos 25 min sin interacción, que se corrigió en el plan con una pregunta al empezar cada chequeo. El guion tiene que concretarla.
- **El guion tiene que coincidir con la guía que ya tienen los alumnos.** Publicada el 24-nov en `descargas/guia_seguridad_alumnos.pdf`, usa los mismos términos, casos, prompts y mensajes.

## 2. Objetivo
Que Jaime pueda impartir las 2h siguiendo un solo documento: el texto completo que dice, qué enseña en pantalla y qué pregunta en cada minuto, con plan B para cada demo. Y que una cheat sheet de una página, derivada de ese documento, le sirva durante la sesión.

## 3. Para quién
- **Jaime (formador):** el guion minuto a minuto con el texto completo, la preparación previa y qué hacer si algo falla. Imparte solo: Aida está en la sesión, pero no tiene papel (P1).
- **Alumnos (18):** no leen el guion, pero lo notan en el ritmo, la claridad y la coincidencia con la guía.
- **SPEC-024 (portal):** necesita del guion la estructura, los textos y las anclas de cada bloque.

## 4. Alcance
**Incluye:**
- **`GUION-SESION.md`, reescrito en su sitio:** las 2h minuto a minuto (19:00–21:00), con el texto completo, la preparación previa y "si algo falla".
- **Borrar `GUION-SESION-COMPLETO.md`** (junio, 1.937 líneas; queda en el tag `sesion-2026-06`), para que haya un solo guion (1.6; P2).
- **`CHEAT-SHEET.md`, reescrita en su sitio:** una página derivada del guion.
- **El texto de cada familia (F1, F2 y F3):** para qué, "Antes de entrar", 3 ideas, caso, preguntas, chequeo en Lovable y lo que el PM se lleva.
- **El guion de cada chequeo en Lovable sobre `prueba-cloud`:** qué pantalla, qué se pide, qué se espera y su plan B con capturas.
- **El guion de la demo del pipeline (5 min) y su plan B.**
- **La revisión de las 3 ideas por familia** del `026/plan.md` §2.2, a la luz de la prueba del 24-nov.

**No incluye:**
- El portal (SPEC-024).
- La guía, la checklist y los prompts (SPEC-026, publicados). Si el guion encuentra un error en ellos, se anota como hallazgo.
- La teoría de alumnos y de formador de las familias (`Bloque Teorico/`): F3 es de SPEC-021. F1 y F2 se quedan como referencia; ver §9.
- Preparar o limpiar `prueba-cloud`. Su estado y la limpieza posterior están en `026/prueba-lovable.md` §2.5 y §2.6.
- Probar el pipeline (SPEC-001 T15).

## 5. Requisitos

### 5.1 Estructura y tiempos
- **R1.** El guion es la única fuente de los minutos (1.6). Suma exactamente 120 min con hora real (19:00–21:00), una pausa y al menos 12 min de colchón (2.7 y 2.8), y parte de la escaleta del `026/plan.md` §2.1. Cualquier cambio de esa escaleta se justifica en el plan.
- **R2.** **Ningún tramo de más de 12 min sin interacción** (2.7). Cada interacción lleva:
  - su hora;
  - la pregunta literal;
  - el canal: chat de Zoom o en voz, con el micrófono abierto (P5). Sin encuestas de Zoom;
  - qué hace Jaime con las respuestas.
- **R3.** Cada familia sigue el patrón del `026/plan.md` §2.1 (27 min):
  1. Para qué.
  2. "Antes de entrar", con 3 términos como máximo.
  3. Ideas 1 y 2.
  4. Pregunta.
  5. Idea 3 con el caso.
  6. Chequeo, que empieza con una pregunta.
  7. Lo que el PM se lleva.

### 5.2 Contenido
- **R4. Objetivos de aprendizaje (observables)**. Al terminar, el alumno es capaz de:
  - **F1:** distinguir una clave pública de una secreta y decir dónde debe guardarse cada una en Lovable (*Secrets*).
  - **F2:** explicar con sus palabras que lo que protege los datos son las reglas RLS, no la clave pública, y encontrar los avisos en **More → Security → Findings**.
  - **F3:** señalar en un formulario qué datos personales no necesita su producto, y decir cuánto tiempo hay para avisar a la autoridad si hay una brecha (72 h).
  - **En general:** decir qué va a revisar primero en su producto con la checklist de la guía.
- **R5. Máximo 3 ideas por familia** (2.3): las validadas por Jaime en P4 (24-nov). El mensaje de la sesión es "Lovable protege una parte, la decisión es tuya" (`026/prueba-lovable.md` §2.4). F3 se alinea con la teoría de SPEC-021 (P8).
- **R6. Solo casos y cifras verificados**, con la misma redacción que la guía (5.4):
  - `026/verificacion-f1-f2.md`;
  - `021/verificacion.md`.

  Los que salieron en la verificación (estudiante de Georgia, AWS-Medium, CBIZ con los datos de junio) no aparecen.
- **R7. Lenguaje directo** (excepción de la constitution v1.9, que amplía 2.2):
  - conceptos básicos;
  - sin metáforas ni analogías;
  - cada término técnico definido en una frase la primera vez;
  - lenguaje de PM (2.5).

  Se aplica también a las frases clave y a las notas para Jaime.
- **R8. Coherencia con la guía publicada:**
  - los mismos términos de "Palabras que vas a ver";
  - los mismos casos;
  - los mismos prompts (`prompts_chequeo_lovable.md`, sin copiarlos: se enlazan);
  - el mismo mensaje del Demo Day: es el 12-dic y no se dejan arreglos para el 11.

### 5.3 Demos y plan B
- **R9. Chequeo en Lovable de cada familia**, sobre `prueba-cloud` (`026/prueba-lovable.md` §2.5). Para cada uno, el guion dice:
  - qué pantalla se abre;
  - qué se escribe o se pulsa;
  - qué se espera ver;
  - qué se dice del resultado;
  - el plan B con su captura en `026/capturas/` (3.3).

  **El prompt se lanza en directo, al final de cada familia, en el chequeo** (P6). El guion dice qué explica Jaime mientras Lovable responde, y a partir de cuántos minutos de espera pasa a la captura. La comprobación avanzada del escáner (unos 8 min) no se lanza: se enseña el resultado ya hecho.
- **R10. Demo del pipeline de agentes (5 min, sin práctica), en directo desde VS Code, como momento sorpresa** (P7):
  - qué se enseña y qué se dice: "esto se puede automatizar fuera de Lovable", como en el recuadro "Para curiosos" de la guía;
  - Jaime lo lanza unos días antes para probarlo (SPEC-001 T15), y **el informe de esa prueba es el plan B**.
- **R11. Nada de secretos en pantalla (3.4):**
  - La preparación previa incluye cerrar *Secrets* y cualquier pantalla con valores.
  - En `prueba-cloud` está guardado el secreto falso `OPENAI_API_KEY`: se puede ver su nombre, nunca su valor.
  - La sesión se graba.

### 5.4 Documentos
- **R12.** **`GUION-SESION.md`**:
  - Una tabla resumen con hora, duración, bloque, interacción y plan B.
  - Una sección por bloque con:
    - **el texto completo que dice Jaime** (P3): directo, sin rodeos y con cada concepto explicado con claridad;
    - lo que enseña en pantalla;
    - la pregunta;
    - las notas 🎓.
  - "Preparación (1 h antes)".
  - "Si algo falla".

  La estructura es la del guion del 21-nov (`sesiones/2026-11-git-deploy/Teoria/GUION-SESION.md`), con el texto completo en lugar de frases clave.
- **R12 bis. El texto cabe en su tiempo:** como no hay ensayo (P9), la duración de cada bloque se estima con el número de palabras a unas 130 palabras por minuto, más el tiempo de las demos y las preguntas. El total cabe en los minutos de la escaleta.
- **R13.** **`CHEAT-SHEET.md`** cabe en una página. Sus horas coinciden con las del guion.

## 6. Criterios de aceptación
- [ ] **CA1.** La tabla del guion suma 120 min, de 19:00 a 21:00, con una pausa y un colchón de 12 min o más. Las horas de la tabla, de las cabeceras y de la cheat sheet coinciden. Se comprueba con un script o tabla de comprobación en la revisión.
- [ ] **CA2.** La lista de interacciones (hora y pregunta) no deja ningún tramo de más de 12 min sin interacción.
- [ ] **CA3.** Cada familia tiene 3 términos o menos en "Antes de entrar", 3 ideas o menos, un caso verificado y una pregunta de comprobación ligada a su objetivo de R4.
- [ ] **CA4.** Cada caso y cifra del guion está en `026/verificacion-f1-f2.md` o en `021/verificacion.md`, con la misma redacción que la guía.
- [ ] **CA5.** Cada chequeo y la demo del pipeline tienen su plan B, y el fichero existe: las capturas en `026/capturas/` y el informe de la prueba del pipeline.
- [ ] **CA6.** Hay una revisión de lectura del guion y de la cheat sheet: sin lenguaje figurado ni términos sin definir. VS Code, Claude Code y la terminal solo aparecen en la demo del pipeline.
- [ ] **CA7.** Los términos, prompts y mensajes coinciden con la guía publicada.
- [ ] **CA8.** La estimación de duración por bloque (R12 bis) cabe en la escaleta y se anota en `review.md`. Jaime valida el guion. No hay ensayo (P9).
- [ ] **CA9.** `GUION-SESION-COMPLETO.md` ya no existe y ningún fichero del repo lo enlaza.

## 7. Restricciones (constitution)
- **Una sola fuente de verdad** para los minutos (1.6).
- **Criterios pedagógicos:** "para qué" primero (2.1), "Antes de entrar" con 3 términos o menos (2.2), 3 ideas por bloque (2.3), patrón de bloque (2.4), lenguaje de PM (2.5), ritmo y pausas (2.7), timings honestos con colchón (2.8) y comprobación ligera por bloque (2.9).
- **Excepción de Seguridad v2** (v1.9): sin práctica ni herramienta ejecutable, con lenguaje directo en todo.
- **Plan B probado** (3.3) y **nada de secretos en pantalla** (3.4).
- **El formador decide** (5.3): las ideas, las frases y las preguntas son un borrador hasta que Jaime las valida. **Nada de inventar datos** (5.4).
- **Lo impartido vive en git** (1.4): el guion de junio queda en el tag `sesion-2026-06` y se reescribe en su sitio.

## 8. Preguntas abiertas
*Respondidas por Jaime el 24-nov.*
- [x] **P1. Papel de Aida:** ninguno.
- [x] **P2. `GUION-SESION-COMPLETO.md`:** se borra.
- [x] **P3. Nivel de detalle:** texto completo, directo, sin rodeos y con los conceptos bien claros.
- [x] **P4. Las 3 ideas por familia:** validadas tal cual:
  - **F1:**
    1. No todas las claves son iguales: la pública puede ir en la web; las secretas, nunca.
    2. **Lovable guarda las claves secretas en *Secrets* y se niega a ponerlas en la web, pero solo protege lo que pasa por Lovable**: GitHub, documentos o capturas quedan fuera.
    3. Una clave publicada se usa en minutos: caso de la startup mexicana, 82.314 $ en 48 h.
  - **F2:**
    1. Con la clave pública cualquiera puede consultar tu base de datos.
    2. RLS decide qué filas ve cada usuario.
    3. **Lovable crea las tablas con RLS, pero si tú pides algo inseguro lo hace y te avisa como crítico: la decisión es tuya.** Casos: CVE-2025-48757, con la redacción corregida, y Moltbook.
  - **F3:**
    1. Pide solo lo que necesitas: **ninguna herramienta lo decide por ti, y el escáner no lo detecta**.
    2. Dónde acaban los datos sin que lo sepas: registros, IA. Caso Samsung.
    3. 72 h para avisar si hay una brecha.
- [x] **P5. Canal:** chat de Zoom o en voz. Sin encuestas.
- [x] **P6. Prompts:** en directo, al final de cada familia. Riesgo: en la prueba del 24-nov, Lovable tardó en responder. El plan tiene que fijar a partir de cuántos minutos se pasa a la captura.
- [x] **P7. Pipeline de agentes:** Jaime lo lanza unos días antes desde VS Code, y en la sesión es el momento sorpresa. El informe de esa prueba es el plan B.
- [x] **P8. Teoría de F3 (SPEC-021):** es necesaria. Se mantiene, con fecha límite el 30-nov, y el guion de F3 se alinea con ella.
- [x] **P9. Ensayo:** no hay. Se sustituye por la estimación de duración del texto (R12 bis).

## 9. Hallazgos fuera de alcance
- **`026/plan.md` §2.2 está desactualizado:**
  - Todavía marca como "pendiente de verificar" el caso de 82.314 $ y el CVE, que ya están verificados en T05.
  - Describe el CVE como "Lovable generaba tablas sin RLS", y la redacción verificada es otra (Matt Palmer, 29-may-2025, más de 170 apps según el investigador, y Lovable disputa el CVE).
  - §2.3 habla de `demo-seguridad`, pero se usó `prueba-cloud`.
  - El guion debe usar la versión verificada.
- **La teoría de F2 de junio** (`Bloque Teorico/familia2_bbdd_permisos_alumnos.md`, §1 y §8) atribuye el CVE a "Matan Getz" y le pone fecha del 4 de junio (hallazgo de `026/tasks.md`). Si el portal (SPEC-024) usa esa teoría, hay que corregirla antes.
- **`HeroCamp-Teoria/CLAUDE.md`** sigue describiendo el pipeline de junio (3h, 11 alumnos).
