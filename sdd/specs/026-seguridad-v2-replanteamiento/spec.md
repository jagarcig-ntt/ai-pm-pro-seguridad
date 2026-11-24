# SPEC-026 · Replanteamiento de Seguridad v2: 2h de teoría + guía y checklist para Lovable

| Campo | Valor |
|---|---|
| Estado | **en curso** (24-nov) · aprobada por Jaime · [plan](plan.md) aprobado · [tasks](tasks.md) |
| Sesión | 2026-12 Seguridad v2 (**jueves 10-dic**, 2h por Zoom, con Aida; **17:00–19:00 o 19:00–21:00**, por confirmar) |
| Fecha límite | 2026-11-30 (alcance, constitution y reordenación de specs) · **2026-12-04 (guía y checklist, que se envían antes de la sesión; propuesta)** · 2026-12-07 (escaleta y guion) |
| Depende de | SPEC-025 (retro del 21-nov) · SPEC-021 T01 (`verificacion.md`, casos verificados) |
| Sustituye o redefine | SPEC-021 · SPEC-022 · SPEC-023 · SPEC-024 (ver §5.3) |
| Responsable | Jaime García |

## 1. Problema / necesidad
- **Acuerdo de coordinación (Gema, 24-nov, tras hablar con Manu):**
  - la sesión de seguridad se reduce a **2 horas el jueves 10-dic**, solo con **teoría informativa** (riesgos, ejemplos y casos);
  - se envía **material de consulta: una guía y una checklist pensadas para su producto de Lovable**;
  - no se puede eliminar porque forma parte del programa vendido;
  - la sesión de 4h del viernes 11-dic pasa a otro entrenador, con temas de negocio;
  - la decisión vale para esta edición y este perfil de alumno.
- **Por qué** (conversación con Gema del 23-nov y SPEC-025): el grupo viene 100 % de Lovable, la mayoría no había usado GitHub antes del 21-nov y el feedback de esa sesión (media 6,75, 8 respuestas) apunta a demasiados pasos y a un nivel heterogéneo. La sesión preparada (4 bloques de teoría + pipeline de agentes con Claude Code en VS Code) exige un IDE, Claude Code y conocimientos técnicos que no tienen.
- **Todo el diseño en curso da por hecha la sesión de 4h con práctica:**
  - SPEC-021 (prácticas de F3 y F4 sobre su producto);
  - SPEC-022 (pipeline y check en el CI);
  - SPEC-024 (portal con 3 rondas de práctica y escaleta de 240 min, anexo A);
  - constitution §0 (11-dic, 17:00–21:00), 2.10 (herramienta ejecutable) y 2.12 (40 % de práctica).
- **Hay una promesa publicada que ya no se cumple:** "El 11 de diciembre añadimos el check de seguridad a tu CI", en:
  - el portal del 21-nov (`sesiones/2026-11-git-deploy/index.html`, línea 855);
  - el kit (`sesiones/2026-11-git-deploy/Guia/kit_alumno.md`, línea 84);
  - el workflow que tienen los alumnos (`sesiones/2026-11-git-deploy/Lab/workflows/comprobar-pr.yml`, línea 46).
- **La guía actual está pensada para Claude Code** ("Guía de Seguridad para PMs que construyen con Claude Code", `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Entregables/guia_seguridad_alumnos.md`), no para Lovable.

## 2. Objetivo
Dejar definida y ordenada la nueva sesión de seguridad (2h de teoría el 10-dic, más una guía y una checklist para su producto de Lovable), con la constitution actualizada y las specs 021–024 redefinidas o descartadas, para producir el material sin rehacer lo que ya sirve.

## 3. Para quién
- **Alumnos (18, nivel técnico mayoritariamente bajo, 100 % Lovable):** entender los riesgos principales de un producto hecho con IA y llevarse una checklist que puedan aplicar a su producto sin instalar nada.
- **Jaime:** una sesión corta y controlada, construida sobre la teoría de junio que ya tiene pulida, sin preparar prácticas ni herramientas nuevas.
- **Gema:** saber cuándo se envía el material y qué cubre.

## 4. Alcance
**Incluye:**
- La escaleta de 120 min de la nueva sesión y qué familias y casos entran.
- La guía y la checklist de seguridad para un producto de Lovable (versión adaptada de `guia_seguridad_alumnos.md`).
- Actualizar la constitution: §0, y una excepción a 2.6, 2.10 y 2.12 para esta sesión.
- Redefinir o descartar SPEC-021 a SPEC-024 (§5.3) y actualizar el registro.
- Corregir la promesa del check de seguridad en los tres ficheros del 21-nov (cambio pequeño, pero toca un portal publicado: constitution 5.6).

**No incluye:**
- Los prompts auditores, el check de seguridad en el CI y cualquier práctica de los alumnos. El pipeline de agentes solo aparece en una demo de Jaime de unos 5 min, para que vean que existe (decisión del 24-nov).
- La sesión del viernes 11-dic (otro entrenador).
- El posicionamiento del curso para 2027 (Manu y Josu).

## 5. Requisitos

### 5.1 La sesión (10-dic)
- **R1.** Dura 120 min, suma exacta con al menos un 10 % de colchón y una pausa real (constitution 2.7 y 2.8).
- **R2.** Solo teoría informativa, pero con interacción: ningún tramo expositivo de más de 12 min sin una pregunta, quiz o mano alzada (2.7 y 2.9). La lección de SPEC-025 es que este grupo necesita pausas de comprobación.
- **R3.** Máximo 3 ideas por bloque (2.3), "Antes de entrar" con definiciones directas (2.2) y lenguaje de PM (2.5).
- **R3 bis. Lenguaje directo en toda la sesión** (Jaime, 24-nov): solo conceptos básicos, explicados de forma directa y al pie, **sin lenguaje figurado** (metáforas, analogías, imágenes del tipo "abrir la puerta", "el reloj corre" o "el portero") y sin jerga sin definir. Se aplica al guion, al portal, a la guía y a los prompts. Amplía a toda la sesión el criterio 2.2 de la constitution (v1.8).
- **R4.** Cada caso y cifra, verificado con fuente y fecha. Se reutiliza `sdd/specs/021-seguridad-v2-familias-3-4/verificacion.md` (5.4).
- **R4 bis.** Incluye una demo del pipeline de agentes de unos 5 min, hecha por Jaime y sin práctica, con su plan B (informe pregenerado o capturas, constitution 3.3).
- **R4 ter.** Tras cada familia, Jaime lanza en directo el chequeo en Lovable sobre un producto de demo: **el escáner de seguridad de Lovable y un prompt de la familia**. Cada prompt se prueba antes de la sesión sobre un proyecto real, y lo que detecta el escáner se documenta con fecha (5.4). Plan B: capturas del resultado (3.3).
- **R4 quater.** Los tres prompts van también en la guía, para que cada alumno pueda repetir el chequeo sobre su producto (2.11).
- **R5.** Objetivo de aprendizaje: el alumno es capaz de **reconocer** los riesgos principales de su producto (credenciales, datos y permisos, datos sensibles) y de **decidir qué revisar primero** con la checklist, que también cubre la configuración.

### 5.2 La guía y la checklist
- **R6.** Pensada para un producto de Lovable con Lovable Cloud (constitution 3.1). Todo se revisa desde el navegador, sin instalar nada.
- **R7.** La checklist es accionable al día siguiente (2.11): cada punto dice qué mirar, dónde se ve en Lovable, GitHub o Cloudflare y qué hacer si falla.
- **R8.** Si menciona funciones de seguridad de Lovable (escáner propio, avisos, etc.), solo las comprobadas en un proyecto real y con fecha de verificación (5.4).
- **R9.** Se publica en `descargas/` con un nombre estable (constitution 4).

### 5.3 Reordenación de specs (propuesta)
| Spec | Qué pasa |
|---|---|
| SPEC-021 | **Se redefine:** solo la teoría de F3 (3 ideas por bloque) y los casos verificados (T01, ya hecha). F4 sale de la sesión (pasa a la checklist), salen las prácticas (T06) y el kit pasa a SPEC-026 |
| SPEC-022 | **Descartada** para esta edición (pipeline y check en el CI) |
| SPEC-023 | **Se redefine:** guion de 120 min de teoría, a partir de la escaleta de SPEC-026 |
| SPEC-024 | **Se redefine:** portal con teoría, casos y descargas; sin prácticas, salas, prompts auditores ni el anexo A. Hay que volver a aprobarla |

## 6. Criterios de aceptación
- [ ] CA1. La constitution tiene versión nueva con la §0 (10-dic, 2h) y la excepción a 2.6, 2.10 y 2.12 para esta sesión, con fecha en el historial.
- [ ] CA2. El registro de specs refleja la tabla del §5.3, y SPEC-021, 023 y 024 tienen su cabecera actualizada.
- [ ] CA3. La escaleta suma 120 min, tiene una pausa y un colchón de al menos 12 min, y ningún tramo expositivo pasa de 12 min sin interacción.
- [ ] CA4. La guía y la checklist no mencionan VS Code, Claude Code ni la terminal como requisito, y cada función de Lovable citada tiene fecha de verificación.
- [ ] CA5. La promesa del check de seguridad del 11-dic ya no aparece en el portal, el kit ni el workflow del 21-nov; `python scripts/check_links.py` pasa y el portal se ha verificado en el navegador.
- [ ] CA6. Jaime valida la escaleta y la guía.
- [ ] CA7. El guion, el portal, la guía y los prompts no contienen lenguaje figurado ni términos técnicos sin definir (revisión de lectura de cada texto antes de la validación de Jaime).

## 7. Restricciones (constitution)
2.2 definiciones directas · 2.3 máximo 3 ideas · 2.5 lenguaje de PM · 2.7 ritmo · 2.8 timings honestos · 2.11 kit accionable · 3.1 stack del alumno · 4 URL estables · 5.4 no inventar datos · 5.6 portal sensible.

## 8. Preguntas abiertas
- [ ] **Hora exacta:** 17:00–19:00 o 19:00–21:00 (pendiente de Gema). La escaleta se escribe en minutos relativos hasta que se confirme.
- [ ] **Comentario de `comprobar-pr.yml` en los repos de los alumnos** (Jaime no lo sabe, 24-nov). **Recomendación:** corregirlo solo en la plantilla (`Lab/workflows/comprobar-pr.yml`) y dejar los repos de los alumnos como están. Es un comentario que no afecta al funcionamiento, y tocar 18 repos ajenos no compensa. Pendiente de confirmar.

## 8 bis. Decisiones (Jaime, 24-nov)
- [x] **Formato:** por Zoom y con Aida.
- [x] **Contenido:** **3 familias** (Jaime, 24-nov: "tenemos que acotar"). **Después de cada una, Jaime lanza el chequeo en Lovable** en directo: **el escáner de seguridad de Lovable + un prompt por familia** (Jaime, 24-nov). Selección confirmada por Jaime el 24-nov:
  - **F1 · Credenciales y secretos:** claves en el frontend y secretos de Lovable Cloud.
  - **F2 · Datos y permisos:** es la más ligada a su stack, a pesar de lo que se dijo antes. CVE-2025-48757 (Lovable generaba esquemas de Supabase sin RLS) y Moltbook 2026 (Supabase sin RLS; `verificacion.md`, línea 37).
  - **F3 · Datos sensibles:** datos personales, RGPD y 72 h, y lo que se envía a servicios de IA.
  - **Fuera, F4 · Configuración** (CORS, cabeceras, endpoints): la más técnica y la peor resuelta en junio (SPEC-020). Pasa a la checklist de la guía.
- [x] **Material de consulta:** se envía **antes** de la sesión.
- [x] **Pipeline:** Jaime lo enseña en una demo de unos 5 min, como "esto existe", sin práctica.
- [x] **La promesa del check:** se sustituye por la guía y la checklist ("en la sesión de seguridad os damos una guía y una checklist para revisar vuestro producto"). **Gema avisa al grupo** del cambio de fecha y de formato.

## 9. Hallazgos fuera de alcance
- La constitution, en su §0, sigue diciendo "En diseño · prioridad" para la sesión del 21-nov (ya anotado en SPEC-025).
- SPEC-001 T15 (probar `/security-audit`) pierde urgencia sin la demo del pipeline.

---

## Anexo A · Escaleta en borrador (24-nov)

*Provisional, en minutos relativos hasta que se confirme la hora. La fuente definitiva será el guion de SPEC-023.*

| Min | Dur. | Bloque | Contenido |
|---|---|---|---|
| 0 | 10 | Apertura | Para qué · qué os lleváis (la guía y la checklist que ya tenéis) · cómo vamos a trabajar |
| 10 | 27 | F1 · Credenciales y secretos | Teoría (~20, con una pregunta a mitad) + chequeo en Lovable (~7) |
| 37 | 27 | F2 · Datos y permisos | Teoría (~20) + chequeo en Lovable (~7) |
| 64 | 8 | Pausa | |
| 72 | 27 | F3 · Datos sensibles | Teoría (~20) + chequeo en Lovable (~7) |
| 99 | 5 | Demo del pipeline | "Esto existe": agentes revisando un producto desde Claude Code |
| 104 | 4 | Cierre | Cómo usar la checklist (incluida la configuración) · preguntas |
| 108 | 12 | Colchón | 10 % (constitution 2.8) |

**Suma:** 120 min. La pausa cae en el minuto 64 (2.7: cada 60–75 min).
