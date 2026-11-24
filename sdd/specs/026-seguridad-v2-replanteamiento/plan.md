# PLAN · SPEC-026 · Replanteamiento de Seguridad v2: 2h de teoría + guía y checklist para Lovable

*Spec: [spec.md](spec.md) · Estado del plan: **aprobado** (Jaime, 24-nov)*

## 1. Enfoque
Se reutiliza la teoría de junio de F1, F2 y F3, recortada a 3 ideas por familia, y se cambia el "lo hago en directo" por un **chequeo en Lovable** (escáner + prompt) sobre un producto de demo con fallos plantados. La guía de junio se reescribe en su sitio para Lovable, con una checklist de una página y los tres prompts, para que el alumno repita el chequeo sobre su producto. Antes que nada se fijan las reglas (constitution y registro) y se corrige la promesa del check, para que el aviso de Gema al grupo coincida con lo publicado. Lo que depende de Lovable (escáner, prompts y producto de demo) se prueba primero, porque es lo único que no controla Jaime y condiciona la guía.

**Descartado:**
- *Crear una guía nueva desde cero:* la de junio ya tiene la estructura (familias, checklist, "si ya ocurrió") y su PDF tiene una URL publicada.
- *Hacer el chequeo sobre `prueba-cloud` tal cual:* es un proyecto sano, el escáner no encontraría nada que enseñar.
- *Que los alumnos ejecuten el chequeo en directo:* lo excluye el acuerdo del 24-nov (solo teoría). Pueden seguirlo con su guía si quieren, sin depender de ello.

## 2. Diseño

### 2.1 Escaleta (120 min, minutos relativos hasta confirmar 17:00 o 19:00)
Sustituye al anexo A de la spec. La fuente definitiva de los minutos será el guion de SPEC-023 (constitution 1.6).

| Min | Dur. | Bloque | Contenido | Interacción |
|---|---|---|---|---|
| 0 | 10 | Apertura | Para qué le importa a un PM · qué os lleváis (la guía que ya tenéis) · el plan: 3 riesgos y, tras cada uno, lo comprobamos en Lovable | Chat: "¿Habéis abierto la guía?" (recuento) |
| 10 | 27 | **F1 · Credenciales y secretos** | Antes de entrar → 3 ideas → caso → **chequeo en Lovable** → lo que el PM se lleva | Pregunta a mitad (min ~20) |
| 37 | 27 | **F2 · Datos y permisos** | Ídem | Pregunta a mitad (min ~47) |
| 64 | 8 | Pausa | | |
| 72 | 27 | **F3 · Datos sensibles** | Ídem | Pregunta a mitad (min ~82) |
| 99 | 5 | Demo del pipeline | "Esto existe": agentes revisando un producto desde Claude Code | |
| 104 | 4 | Cierre | Cómo usar la checklist esta semana (incluida la configuración, F4) · aviso: el Demo Day es el 12-dic, no dejéis arreglos para el 11 ni arregléis nada sin probarlo · preguntas | Chat: "¿Qué vas a revisar primero?" |
| 108 | 12 | Colchón | 10 % (2.8). Si sobra, preguntas | |

**Suma:** 120 min. **Pausa** en el min 64 (2.7). **Tramo expositivo máximo:** unos 10 min entre interacciones (2.7: ≤ 12), gracias a la pregunta al empezar cada chequeo. Sin ella, entre la pregunta de una familia y la de la siguiente habría unos 25 min (corregido tras la revisión, 24-nov).

**Cada familia, por dentro (27 min):** Antes de entrar, máx. 3 términos (2 min) → ideas 1 y 2 (8) → pregunta al chat (2) → idea 3 con el caso (6) → chequeo en Lovable: empieza con una pregunta al chat ("¿Creéis que Lovable lo hará?" o "¿Qué creéis que encontrará?") y sigue con el escáner + el prompt de la familia (7) → lo que el PM se lleva (2). Es el patrón de bloque de 2.4, con el chequeo como demo.

### 2.2 Las 3 ideas por familia (2.3)
Salen de la teoría de junio (`HeroCamp-Teoria/Bloque Teorico/familia{1,2,3}_*_alumnos.md`) y de SPEC-021. Son una propuesta para que la valide Jaime en la revisión del guion (SPEC-023).

**Lenguaje (spec R3 bis):** solo conceptos básicos, dichos de forma directa, sin metáforas ni analogías. La teoría de junio usa imágenes ("trifecta letal", "el portero", "silenciosamente catastrófica"), y al pasar a la sesión se reescriben como frases literales. Cada término técnico que aparezca se define en una frase la primera vez.

**F1 · Credenciales y secretos** *(Antes de entrar: clave pública, clave secreta, secreto)*
1. **No todas las claves son iguales:** la clave pública de Lovable Cloud puede ir en la web; las secretas (la de servicio, las de IA o de pago) nunca (F1, §2).
2. **La IA puede poner una clave secreta en el código de la web,** y cualquiera que abra la web puede verla. También pasa si la pegas en el chat (F1, §3 y §9).
3. **Una clave expuesta se usa en pocas horas:** hay programas automáticos que buscan claves publicadas. Caso de la startup mexicana, 82.314 $ en 48 h (feb-2026, F1, §8), **pendiente de verificar** (T03).

**F2 · Datos y permisos** *(Antes de entrar: base de datos, RLS, política)*
1. **Con la clave pública cualquiera puede consultar tu base de datos.** Es así por diseño: la clave no protege los datos (F2, §2).
2. **RLS son las reglas que deciden qué filas puede ver cada usuario.** Sin RLS, cualquiera con la clave pública ve todas las filas (F2, §2 y §3).
3. **La IA puede crear tablas sin RLS:** CVE-2025-48757, en el que Lovable generaba tablas sin RLS (F2, §8, **pendiente de verificar**, T03), y Moltbook 2026 (verificado: `021/verificacion.md`, línea 37).

**F3 · Datos sensibles** *(Antes de entrar: dato personal, minimización, brecha)*
1. **Pide solo lo que necesitas:** la minimización es una decisión de producto (SPEC-021, plan 2.2, idea 1).
2. **Dónde acaban los datos sin que lo sepas:** en los registros, en respuestas que devuelven más campos de los necesarios y en lo que se envía a una IA. Caso Samsung 2023 (verificado: `021/verificacion.md`, línea 16).
3. **Si hay una brecha, tienes 72 horas para notificarla** a la autoridad de protección de datos (RGPD, art. 33). Contexto: 1.200 M€ en multas en 2025 (verificado, DLA Piper, línea 9).

### 2.3 El chequeo en Lovable
- **Producto de demo: `demo-seguridad`**, un proyecto nuevo de Lovable con Lovable Cloud y login, creado por Jaime. Tiene tres fallos plantados, **todos con claves falsas o revocadas** (3.4):
  - **F1:** una clave secreta falsa en el código de la web;
  - **F2:** una tabla sin RLS, o con una política que deja leerlo todo;
  - **F3:** un formulario que pide más datos de los necesarios y los registra o los envía a una IA.
- **Escáner de Lovable:** se documenta qué detecta de cada fallo, dónde se lanza, si consume créditos y la fecha de la prueba (R8).
- **Tres prompts, uno por familia,** **de solo lectura**: "revisa y explícame, no cambies nada". Devuelven una lista en lenguaje de PM: qué pasa, qué riesgo tiene y qué decisión tomar (2.5). Se prueban 3 veces cada uno para ver si dan resultados estables.
- **Plan B:** capturas del escáner y de la respuesta de cada prompt, tomadas en la prueba (3.3).

### 2.4 La guía y la checklist
- **Se reescribe en su sitio** `HeroCamp-Teoria/Entregables/guia_seguridad_alumnos.md` y su PDF conserva la URL (`descargas/guia_seguridad_alumnos.pdf`, constitution 4). La versión de junio queda en el tag `sesion-2026-06` (1.4).
- **Estructura** (corta, para nivel bajo):
  1. Cómo usar esta guía (antes de la sesión y después).
  2. F1, F2 y F3: una página cada una, con qué es, cómo se ve en Lovable y el prompt para copiar.
  3. **Checklist de una página**, con F1 a F3 y la configuración (F4: almacenamiento público, endpoints de prueba y cabeceras, a partir de SPEC-021): qué mirar, dónde y qué hacer si falla (R7).
  4. Si ya ocurrió: los primeros 30 minutos (se adapta el apartado de junio).
  5. **Aviso para el Demo Day:** no apliquéis arreglos el día antes sin probarlos por PR.
- **Sin** VS Code, Claude Code ni terminal como requisito (CA4). El pipeline aparece solo en un recuadro "Para curiosos".
- **PDF:** `scripts/generar_guia_pdf.py` hoy solo conoce la sesión de Git/Deploy (línea 17). Se le añade la guía de seguridad.

### 2.5 Reglas y reordenación
- **Constitution v1.9:**
  - §0: el 21-nov pasa a impartida; Seguridad v2 pasa al jueves 10-dic, 2h, Zoom; el 11-dic lo lleva otro entrenador;
  - excepción para esta sesión a 2.6 (práctica sobre lo suyo), 2.10 (herramienta ejecutable) y 2.12 (40 % de práctica): la sustituyen el chequeo en directo y la guía;
  - entrada en el historial.
- **Specs:** se aplica la tabla de la spec (§5.3) en el registro y en las cabeceras de SPEC-021 y SPEC-024. SPEC-022 queda descartada y SPEC-023 sigue pendiente, con el nuevo alcance.
- **La promesa del check:** se sustituye en los materiales del alumno del 21-nov por "En la sesión de seguridad os damos una guía y una checklist para revisar vuestro producto" (decisión del 24-nov). El guion y la cheat sheet del formador del 21-nov son históricos y no se tocan.

### 2.6 Orden y fechas
| Paso | Qué | Para |
|---|---|---|
| 1 | Constitution, registro, cabeceras y promesa del check | 26-nov (antes de que Gema avise al grupo) |
| 2 🧑 | `demo-seguridad`, prueba del escáner y de los prompts, capturas | 28-nov |
| 3 | Verificar los casos de F1 y F2 | 28-nov (en paralelo al 2) |
| 4 | Guía y checklist | 2-dic |
| 5 🧑 | Revisión de Jaime y PDF | 4-dic → Gema la envía |
| 6 | Escaleta definitiva en el guion | SPEC-023, 7-dic |

## 3. Ficheros
| Acción | Ruta | Nota |
|---|---|---|
| modificar | `sdd/constitution.md` | v1.9 (§2.5 de este plan) |
| modificar | `sdd/specs/README.md` | Tabla de la spec (§5.3) y estado de SPEC-026 |
| modificar | `sdd/specs/021-seguridad-v2-familias-3-4/spec.md` | Cabecera: redefinida (solo teoría de F3) |
| modificar | `sdd/specs/024-seguridad-v2-portal/spec.md` | Cabecera: redefinida, hay que volver a aprobarla |
| modificar | `sesiones/2026-11-git-deploy/index.html` | Línea 855: la promesa del check (portal publicado: 5.6) |
| modificar | `sesiones/2026-11-git-deploy/Guia/kit_alumno.md` | Línea 84, más regenerar `descargas/kit_alumno.pdf` |
| modificar | `sesiones/2026-11-git-deploy/Lab/workflows/comprobar-pr.yml` | Línea 46: solo la plantilla (recomendación pendiente de confirmar) |
| crear | `sdd/specs/026-seguridad-v2-replanteamiento/prueba-lovable.md` | Resultado del escáner y de los prompts, con fecha |
| crear | `sdd/specs/026-seguridad-v2-replanteamiento/capturas/` | Plan B del chequeo, sin claves reales |
| crear | `sdd/specs/026-seguridad-v2-replanteamiento/verificacion-f1-f2.md` | Casos de F1 y F2 con fuente y fecha |
| crear | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Entregables/prompts_chequeo_lovable.md` | Los 3 prompts, fuente única para la guía y, más tarde, el portal |
| modificar | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Entregables/guia_seguridad_alumnos.md` | Reescrita para Lovable |
| modificar | `scripts/generar_guia_pdf.py` | Que también genere la guía de seguridad |
| regenerar | `sesiones/2026-12-seguridad-v2/descargas/guia_seguridad_alumnos.pdf` | Misma URL |
| reutilizar | `HeroCamp-Teoria/Bloque Teorico/familia{1,2,3}_*_alumnos.md` | Ideas y casos (§2.2) |
| reutilizar | `sdd/specs/021-seguridad-v2-familias-3-4/verificacion.md` | Casos de F3 y candidatos de F4 para la checklist |
| reutilizar | `HeroCamp-Product/.claude/` | Pipeline para la demo de 5 min, sin cambios |
| fuera del repo | Proyecto de Lovable `demo-seguridad` | Lo crea Jaime; su repo, si lo tiene, no se enlaza a los alumnos |

## 4. Riesgos y plan B
| Riesgo | Probabilidad | Mitigación / plan B |
|---|---|---|
| El escáner de Lovable no detecta los fallos plantados, o funciona distinto de lo esperado | media | El prompt de la familia cubre el chequeo; se enseña lo que sí detecta, documentado con fecha. Capturas como plan B |
| Lovable se niega a crear el fallo (p. ej. una tabla sin RLS) o lo corrige solo | media | Plantarlo con una migración o un cambio manual. Si no se puede, la idea 3 de F2 se cuenta con el CVE y una captura. Es una buena noticia para la sesión: "Lovable ya lo protege, pero comprobadlo" |
| Los prompts dan respuestas distintas en directo | media | Se prueban 3 veces; capturas de la mejor respuesta; se lanzan antes del bloque y se enseña el resultado si tarda |
| Un alumno aplica un arreglo de Lovable la víspera del Demo Day y rompe su producto | media | Prompts de solo lectura, el aviso en la guía y en el cierre ("no arregléis nada sin probarlo por PR") |
| La demo del pipeline falla (`/security-audit` no se ha probado: SPEC-001 T15) | media | Informe pregenerado o vídeo corto de una ejecución previa |
| El escáner o los prompts consumen créditos de Lovable | baja | Se documenta en la prueba; la demo usa el plan Pro de Jaime (coste 0 para el alumno, 3.2) |
| Un caso de F1 o F2 no se puede verificar | media | Sale (5.4). F2 ya tiene Moltbook verificado; F1 tiene alternativas en su teoría (§8) |
| La hora no se confirma a tiempo | baja | La escaleta está en minutos relativos |
| Una clave real en pantalla durante el chequeo | baja | Claves falsas o revocadas en `demo-seguridad`; se revisan las capturas antes de guardarlas (3.4) |

## 5. Verificación
| Criterio | Cómo se verifica |
|---|---|
| CA1 | La constitution dice v1.9 con fecha; la §0 y la excepción están escritas y aparecen en el historial |
| CA2 | El registro coincide con la tabla de la spec (§5.3); las cabeceras de SPEC-021 y SPEC-024 lo reflejan |
| CA3 | La escaleta del guion (SPEC-023) suma 120 min, con la pausa en el 64, 12 min de colchón e interacción cada ≤ 12 min. `python scripts/check_timings.py`, si se puede adaptar; si no, revisión manual |
| CA4 | Buscar "VS Code", "Claude Code" y "terminal" en la guía: solo pueden aparecer en el recuadro "Para curiosos". Cada función de Lovable citada aparece en `prueba-lovable.md` con fecha |
| CA5 | Buscar la promesa en `sesiones/2026-11-git-deploy/` (solo puede quedar en el guion y la cheat sheet del formador), `python scripts/check_links.py` y el portal del 21-nov visto en Chrome |
| CA6 | Jaime revisa la guía (paso 5) y la escaleta (SPEC-023) |
| CA7 | Revisión de lectura de cada texto (guion, portal, guía y prompts) buscando metáforas, analogías y términos sin definir, antes de pasarlo a Jaime |

## 6. Conformidad con la constitution
| Regla | Estado |
|---|---|
| 2.3 Máximo 3 ideas por bloque | ✅ 3 por familia (§2.2) |
| 2.7 y 2.8 Ritmo y timings | ✅ 120 min exactos, pausa en el min 64, colchón del 10 %, interacción cada ≤ 12 min |
| 3.2 Coste 0 | ✅ Para el alumno, todo en su plan Pro de Lovable. Hay que confirmar si el escáner consume créditos |
| 3.3 Plan B en cada demo | ✅ Capturas para el chequeo; informe o vídeo para el pipeline |
| 3.4 Nada de secretos reales | ✅ Claves falsas en `demo-seguridad` |
| 4 URL estables | ✅ La guía conserva su URL de PDF |
| **Tensión · 2.6, 2.10 y 2.12** | La sesión no tiene práctica de los alumnos ni herramienta ejecutable, y no llega al 40 % de práctica. Se resuelve con la excepción de la v1.9; lo compensan el chequeo en directo y los prompts de la guía |
| **Tensión · 1.6 Una sola fuente** | La escaleta vive aquí hasta que exista el guion de SPEC-023; entonces el guion manda |
| **Tensión · 2.4 Patrón de bloque** | El "cómo se arregla" se queda en la guía (los alumnos no arreglan en directo). En el bloque se cubre con "lo que el PM se lleva" |
