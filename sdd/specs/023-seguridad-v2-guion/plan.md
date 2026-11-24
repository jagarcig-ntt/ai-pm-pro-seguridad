# PLAN · SPEC-023 · Guion y cheat sheet de Seguridad v2 (2h, 10-dic)

*Spec: [spec.md](spec.md) · Estado del plan: **aprobado** (Jaime, 24-nov) · [tasks](tasks.md)*

## 1. Enfoque
- **El guion se escribe con la estructura del guion del 21-nov** (`sesiones/2026-11-git-deploy/Teoria/GUION-SESION.md`): cabeceras `## BLOQUE · HH:MM–HH:MM (N min)` y `### HH:MM — Segmento (N min)`, pre-sesión, "Si algo falla" y notas 🎓. La diferencia es que lleva **el texto completo que dice Jaime** (spec P3).
- **El contenido ya existe.** Sale de:
  - la escaleta y las ideas validadas (`026/plan.md` §2.1 y spec P4);
  - la guía publicada (los términos, los casos y los mensajes, con la misma redacción);
  - la prueba en Lovable (`026/prueba-lovable.md`: qué se ve y qué se dice);
  - la teoría de junio de F1 y F2, solo como fuente de explicaciones y siempre con los casos de `026/verificacion-f1-f2.md`;
  - la teoría nueva de F3 de SPEC-021.
- **`scripts/check_timings.py` se amplía** para comprobar este guion (horas, segmentos y cheat sheet) y para **estimar la duración del texto** (R12 bis), sin cambiar lo que comprueba en Git/Deploy.

**Descartado:**
- **Adaptar el guion de junio:** es de 3h, 4 familias y con el pipeline como hilo, y tiene timings incoherentes (`020/retro.md`). Se reescribe.
- **Usar `sdd/templates/guion-bloque.md` tal cual:** su "Antes de entrar" pide "Analogía para un PM", y la constitution v1.9 lo prohíbe para esta sesión. Se usa su orden, con definiciones directas.

## 2. Diseño

### 2.1 Escaleta con hora real (fuente: `026/plan.md` §2.1, minuto 0 = 19:00)
| Hora | Min | Bloque | Interacción (hora · canal) |
|---|---|---|---|
| 19:00 | 10 | Apertura | 19:08 · chat: "¿Habéis abierto la guía? Escribid sí o no" |
| 19:10 | 27 | F1 · Claves y secretos | 19:20 · 19:28 · 19:35 |
| 19:37 | 27 | F2 · Datos y permisos | 19:47 · 19:55 · 20:02 |
| 20:04 | 8 | Pausa | |
| 20:12 | 27 | F3 · Datos personales | 20:22 · 20:30 · 20:37 |
| 20:39 | 5 | Demo del pipeline de agentes | (momento sorpresa, sin pregunta) |
| 20:44 | 4 | Cierre | 20:46 · chat o voz: "¿Qué vas a revisar primero en tu producto?" |
| 20:48 | 12 | Colchón | Preguntas abiertas si sobra |

**Suma:** 120 min (19:00–21:00). La **pausa** empieza en el min 64 (2.7: cada 60–75 min). El **colchón** es de 12 min (10 %, 2.8). **El mayor tramo sin interacción es de 12 min** (de 19:08 a 19:20 y de cada pregunta de cierre de familia a la primera de la siguiente), que es el límite de 2.7. La pausa y la demo del pipeline quedan fuera de esa cuenta.

**Cambio respecto a `026/plan.md`:** se añade una **tercera interacción por familia**, en "Lo que te llevas". Es la comprobación de 2.9, ligada al objetivo R4. Sin ella habría unos 19 min sin interacción entre el chequeo y la primera pregunta de la familia siguiente.

### 2.2 Cada familia por dentro (27 min)
| + min | Dur. | Segmento | Interacción |
|---|---|---|---|
| +0 | 3 | **Para qué y "Antes de entrar"**: por qué le importa a un PM y 3 términos con definición directa, los mismos de "Palabras que vas a ver" de la guía | |
| +3 | 7 | **Ideas 1 y 2** | |
| +10 | 2 | **Pregunta** sobre las ideas 1 y 2 | chat o voz |
| +12 | 6 | **Idea 3 con el caso** verificado | |
| +18 | 7 | **Chequeo en Lovable**: empieza con una pregunta de predicción y sigue con el prompt en directo (§2.4) | chat o voz, al empezar |
| +25 | 2 | **Lo que te llevas y comprobación**: una pregunta ligada al objetivo R4 y el remite a la guía (página de la familia y checklist) | chat o voz |

**Presupuesto de texto (R12 bis, a unas 130 palabras por minuto):**
- Antes de entrar: unas 350 palabras.
- Ideas 1 y 2: unas 850.
- Idea 3 con el caso: unas 700.
- Chequeo: unas 350, porque el resto del tiempo es pantalla y espera.
- Lo que te llevas: unas 150.
- Preguntas: la pregunta y la transición, unas 80 cada una, porque el resto del tiempo es escuchar.

En total, unas **2.500 palabras por familia** y unas **9.000 en todo el guion**.

### 2.3 Contenido por familia (ideas validadas en la spec, P4)
| | Antes de entrar (= guía) | Ideas | Caso (redacción de la guía) | Pregunta +10 | Comprobación +25 (R4) |
|---|---|---|---|---|---|
| **F1** | Clave · clave pública · clave secreta | 1) No todas las claves son iguales. 2) Lovable guarda las secretas en *Secrets* y se niega a ponerlas en la web, pero solo protege lo que pasa por Lovable. 3) Una clave publicada se usa en minutos | Startup mexicana, 82.314 $ en 48 h (The Register, 3-mar-2026), y Unit 42, menos de 5 min | "¿Dónde has pegado alguna vez una clave? Chat o documento" | "Escribe una clave que use tu producto y si es pública o secreta" |
| **F2** | Base de datos · tabla · RLS | 1) Con la clave pública cualquiera puede consultar tu base de datos. 2) RLS decide qué filas ve cada usuario. 3) Lovable crea las tablas con RLS, pero si tú pides algo inseguro lo hace y te avisa: la decisión es tuya | CVE-2025-48757 (Matt Palmer, 29-may-2025, más de 170 apps según el investigador; Lovable lo disputa) y Moltbook (Wiz, 2-feb-2026) | "Si tu clave pública está en la web, ¿qué protege tus datos?" | "¿Dónde mirarías hoy si tu producto tiene un aviso crítico?" (Security → Findings) |
| **F3** | Dato personal · RGPD · brecha | 1) Pide solo lo que necesitas: ninguna herramienta lo decide por ti. 2) Dónde acaban los datos sin que lo sepas: registros, consola, IA. 3) 72 h para avisar si hay una brecha | Samsung y ChatGPT (prensa coreana, The Register, 6-abr-2023) y multas RGPD de 2025, unos 1.200 M€ (DLA Piper) | "¿Qué datos pide tu formulario de registro?" | "Di un dato que tu producto pide y que podrías quitar" |

Las preguntas son una propuesta. Las valida Jaime al revisar el guion (5.3). F3 se ajusta a la teoría de SPEC-021 cuando esté (30-nov), sin cambiar sus 3 ideas.

### 2.4 Chequeo en Lovable (7 min, sobre `prueba-cloud`)
Mismo orden en las tres familias:
1. **Pregunta de predicción** (1 min).
2. **Lanzar el prompt de la familia en directo** (P6), copiado de `prompts_chequeo_lovable.md`.
3. **Mientras Lovable responde, se enseña lo que ya está hecho** (2–3 min).
4. **Leer el resumen y la tabla de la respuesta** (2 min).
5. **El mensaje de la familia** (1 min), de `026/prueba-lovable.md` §2.4.

| | Pregunta de predicción | Qué se enseña mientras responde | Mensaje |
|---|---|---|---|
| F1 | "¿Creéis que Lovable pondrá una clave secreta en la web si se lo pido?" | **La negativa del 24-nov en el historial del chat**, sin repetir la petición (ver la tensión 1 del §6) | Lovable te protege si la clave pasa por Lovable. Fuera, nadie |
| F2 | "¿Qué creéis que dirá el escáner de una tabla que cualquiera puede leer?" | **More → Security → Findings**, con el crítico de `notas_publicas` | Lovable avisa, la decisión es tuya |
| F3 | "¿Creéis que Lovable me avisará de que pido datos de más?" | **La vista previa del formulario** con DNI, teléfono y fecha de nacimiento | Ninguna herramienta decide por ti qué datos necesitas |

**Corte del plan B:** si a los **4 min** del chequeo Lovable no ha respondido, Jaime pasa a la captura de la respuesta preparada y lo dice en voz alta: "Lovable está tardando; os enseño la respuesta que dio ayer con el mismo prompt". **Las capturas de las respuestas con el formato nuevo no existen todavía:** se toman la víspera (T-prep en el §3).

### 2.5 Demo del pipeline de agentes (5 min, 20:39–20:44)
- **Qué se hace:** VS Code con Claude Code en `sesiones/2026-12-seguridad-v2/HeroCamp-Product/` y el comando `/security-audit --repo feedbackhub`, opción **A** (4 agentes en paralelo, unos 60 s según el comando). Se enseña el informe `security-report.md`.
- **Texto:** qué es un agente (definido en una frase), qué revisa cada uno (las mismas familias de la sesión, más la configuración) y que no lo necesitan para su producto de Lovable, como en el recuadro "Para curiosos" de la guía.
- **Plan B:** el informe de la prueba que Jaime hace unos días antes (P7), guardado en `sdd/specs/023-seguridad-v2-guion/plan-b/security-report.md`. Se abre si el comando tarda más de 2 min o falla.
- **3.4:** `feedbackhub` es el repo trampa de junio. Antes de la prueba hay que comprobar que sus claves son falsas o están revocadas, porque el informe las muestra.

### 2.6 Pre-sesión y "Si algo falla"
- **Los días antes (Jaime):**
  - prueba del pipeline y su informe de plan B (P7);
  - comprobar que `prueba-cloud` sigue con los tres fallos plantados (`026/prueba-lovable.md` §2.5);
  - **lanzar los tres prompts y guardar las capturas** `f1-prompt.png`, `f2-prompt.png` y `f3-prompt.png`.
- **Una hora antes:**
  - las pestañas en orden: guía en PDF, `prueba-cloud` en el chat, Findings, la vista previa del formulario y VS Code;
  - los tres prompts listos para copiar;
  - **cerrar *Secrets* y cualquier pantalla con valores** (R11);
  - comprobar que el Zoom graba.
- **Si algo falla:**
  - Lovable no responde o va lento: captura.
  - Se cae Lovable: todas las capturas del chequeo.
  - Falla el pipeline: el informe de plan B.
  - Pocas respuestas en el chat: pedirlas en voz y nombrar a alguien que haya escrito antes.
  - Una pregunta técnica que se sale de la sesión: "lo tienes en la guía" o apuntarla para el final.

### 2.7 Cheat sheet (una página)
- La tabla de horas (§2.1).
- Por familia: los 3 términos, las 3 ideas en una línea, el caso, las preguntas con su hora, el mensaje del chequeo y el corte de 4 min.
- El plan B del pipeline.
- La lista de "una hora antes".

### 2.8 `check_timings.py` para esta sesión
- **Argumento nuevo `--sesion seguridad`.** Sin argumento, comprueba Git/Deploy como hasta ahora:
  - **Rutas:** guion y cheat sheet de `HeroCamp-Teoria/`.
  - **Horario:** de 19:00 a 21:00.
  - **Escaleta de referencia:** la tabla de `026/plan.md` §2.1, con minutos relativos que se pasan a hora.
- **Argumento `--palabras`.** Para cada segmento, cuenta las palabras del texto de Jaime (las líneas de cita `>`), las divide entre 130 y avisa si la estimación supera los minutos del segmento. Así se comprueba R12 bis y CA8.

## 3. Ficheros
| Acción | Ruta | Nota |
|---|---|---|
| reescribir | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/GUION-SESION.md` | Las 2h con el texto completo. Junio queda en el tag `sesion-2026-06` |
| reescribir | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/CHEAT-SHEET.md` | Una página, derivada del guion |
| borrar | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/GUION-SESION-COMPLETO.md` | P2. Solo lo mencionan specs cerradas (000, 001, 014, 015 y 020), como texto y no como enlace. Esas menciones son históricas y no se tocan |
| modificar | `scripts/check_timings.py` | `--sesion seguridad` y `--palabras` (§2.8) |
| crear | `sdd/specs/023-seguridad-v2-guion/plan-b/security-report.md` | Informe de la prueba del pipeline (Jaime, P7) |
| crear | `sdd/specs/023-seguridad-v2-guion/capturas/` | `f1-prompt.png`, `f2-prompt.png` y `f3-prompt.png` (Jaime, la víspera) |
| crear | `sdd/specs/023-seguridad-v2-guion/review.md` | Estimación de duración por bloque (CA8) y revisión |
| reutilizar | `sdd/specs/026-seguridad-v2-replanteamiento/plan.md` §2.1 | Escaleta |
| reutilizar | `sdd/specs/026-seguridad-v2-replanteamiento/prueba-lovable.md` y `capturas/` | Qué se ve en cada chequeo, los mensajes y el plan B de la parte estática |
| reutilizar | `sdd/specs/026-seguridad-v2-replanteamiento/verificacion-f1-f2.md` · `sdd/specs/021-seguridad-v2-familias-3-4/verificacion.md` | Casos y cifras |
| reutilizar | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Entregables/guia_seguridad_alumnos.md` · `prompts_chequeo_lovable.md` | Términos, redacción de los casos, prompts y mensaje del Demo Day |
| reutilizar | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Bloque Teorico/familia1_*` y `familia2_*` (alumnos y profundo) | Explicaciones de apoyo. **No** se usan los casos de F2 de junio sin corregir (atribución del CVE) |
| reutilizar | Teoría de F3 de SPEC-021 (cuando esté, 30-nov) | Alineación de F3 |
| reutilizar | `sesiones/2026-12-seguridad-v2/HeroCamp-Product/` (`.claude/commands/security-audit.md`, `feedbackhub/`) | Demo del pipeline, sin cambios |
| reutilizar | `sesiones/2026-11-git-deploy/Teoria/GUION-SESION.md` | Estructura y cabeceras |

## 4. Riesgos y plan B
| Riesgo | Probabilidad | Mitigación / plan B |
|---|---|---|
| Lovable tarda en responder el prompt en directo (el 24-nov usó varias herramientas antes de responder) | alta | Corte a los 4 min con la captura de la víspera (§2.4). Mientras tanto se enseña lo que ya está hecho, así que la espera no deja la pantalla vacía |
| La respuesta en directo es distinta de la de la prueba, o vuelve a salir técnica | media | Se lee solo el resumen de dos frases. Si sale técnica, se dice "así responde a veces; por eso el prompt pide formato corto" y se enseña la captura |
| El pipeline falla o tarda en directo | media | El informe de la prueba de los días antes (§2.5), con corte a los 2 min |
| El texto completo no cabe en su tiempo y no hay ensayo para detectarlo | media | `check_timings.py --palabras` por segmento, más 12 min de colchón. Cada familia marca qué párrafo se puede saltar si va con retraso (nota 🎓 "si vas tarde") |
| Pocas respuestas en el chat (grupo de nivel bajo, horario de tarde) | media | Las preguntas se pueden contestar con una palabra o con "sí/no". Si no hay respuesta en 30 s, Jaime responde con un ejemplo y sigue |
| `prueba-cloud` cambia antes del 10-dic (alguien lo toca, o Lovable corrige solo) | baja | Comprobación de los días antes (§2.6). Si un fallo ya no está, se usan las capturas del 24-nov |
| Se ve un secreto en pantalla (Secrets, informe del pipeline) | baja | Lista de "una hora antes" y comprobación de las claves de `feedbackhub` (§2.5) |
| La teoría de F3 de SPEC-021 llega tarde (30-nov) | baja | El guion de F3 se escribe con las ideas validadas y la guía. La teoría solo ajusta las explicaciones |

## 5. Verificación
| Criterio | Cómo se verifica |
|---|---|
| CA1 | `python scripts/check_timings.py --sesion seguridad`: bloques seguidos de 19:00 a 21:00, segmentos que suman su bloque, la cheat sheet coincide con el guion y el guion coincide con la escaleta de `026/plan.md`. Pausa y colchón de 12 min, a la vista en la tabla |
| CA2 | Lista de interacciones extraída del guion (hora y pregunta) en `review.md`, con la diferencia entre cada una y la siguiente ≤ 12 min, salvo en la pausa y la demo del pipeline |
| CA3 | Por familia: cuenta de términos en "Antes de entrar" (3), ideas (3), caso con fuente y pregunta de comprobación ligada a R4 |
| CA4 | Cada caso y cifra del guion, buscado en `026/verificacion-f1-f2.md` y `021/verificacion.md`, y comparado con la redacción de la guía |
| CA5 | Existen `026/capturas/` (parte estática), `023/capturas/f{1,2,3}-prompt.png` y `023/plan-b/security-report.md` |
| CA6 | Revisión de lectura: búsqueda de metáforas y comparaciones ("como si", "imagina", "puerta", "portero"…), de términos sin definir y de VS Code, Claude Code o terminal fuera de la demo del pipeline |
| CA7 | Términos de "Antes de entrar" = "Palabras que vas a ver" de la guía. Los prompts se enlazan y no se copian. Mismo mensaje del Demo Day |
| CA8 | `python scripts/check_timings.py --sesion seguridad --palabras`: ningún segmento por encima de su tiempo. Resultado por bloque en `review.md` y OK de Jaime |
| CA9 | `GUION-SESION-COMPLETO.md` no existe y `check_links.py` no encuentra enlaces rotos. Las menciones en specs cerradas son texto histórico |

## 6. Conformidad con la constitution
- ✅ **2.3 Máximo 3 ideas por bloque:** 3 por familia (§2.3).
- ✅ **2.2 "Antes de entrar":** 3 términos con definición directa, sin analogías (excepción v1.9).
- ✅ **2.7 Ritmo:** pausa en el min 64 y como máximo 12 min sin interacción (§2.1), justo en el límite.
- ✅ **2.8 Timings:** 120 min exactos, con 12 de colchón.
- ✅ **2.9 Comprobación:** una pregunta por familia ligada a R4 (+25).
- ✅ **3.2 Coste 0:** `prueba-cloud` y el pipeline van con las cuentas de Jaime. El alumno no hace nada.
- ✅ **3.3 Plan B:** capturas de cada chequeo y de cada respuesta, e informe del pipeline.
- ✅ **3.4 Secretos:** cerrar *Secrets*; claves de `feedbackhub` falsas o revocadas.
- ✅ **1.6 Una sola fuente:** el guion manda. La cheat sheet y el portal (SPEC-024) salen de él, y `check_timings.py` lo comprueba.

**Tensiones:**
1. **F1 sin petición en directo.** `026/prueba-lovable.md` §2.5 proponía pedir en directo que Lovable pusiera la clave falsa en la web. Con el prompt también en directo (P6), son dos esperas de Lovable en 7 min. Además, repetir la petición podría volver a guardar el valor como secreto. **Propuesta:** enseñar la negativa del 24-nov en el historial del chat y lanzar solo el prompt. Si Jaime prefiere la petición en directo, se quita el paso 3 del chequeo de F1.
2. **2.7 justo en el límite:** varios tramos son de exactamente 12 min. Si una familia se alarga, se pasa. Mitigación: el párrafo "si vas tarde" de cada familia.
3. **El chequeo como demo del patrón 2.4:** se sigue el patrón concepto → caso → interacción → demo → lo que te llevas, sin "cómo se arregla" en directo. Lo cubre la sección "Qué hacer" de la guía, a la que se remite en "Lo que te llevas". Es coherente con la excepción v1.9, que deja la sesión sin práctica.
