# PLAN · SPEC-024 · Portal de la sesión Seguridad v2

*Spec: [spec.md](spec.md) · Estado del plan: **obsoleto** (24-nov). Es el plan de la v1 (aprobada el 18-nov: salas, prácticas, auditores). Se rehace con `/sdd-plan 024` cuando se apruebe la spec v2*

## 1. Enfoque
- **Se reconstruye `sesiones/2026-12-seguridad-v2/index.html` en su sitio** (constitution 1.4: lo impartido sigue en el tag `sesion-2026-06`), tomando como **plantilla el portal del 21-nov** (`sesiones/2026-11-git-deploy/index.html`): sus secciones, sus estilos propios (`.tabla`, `.pasos`, `.copiable`, `.control`, `.aviso`, `.comandos`) y sus botones *Copiar*.
- **Del portal de junio se trasladan sin reescribir** el Hero, el "Para qué" (con el bloque de Impacto dentro), Quién y las **4 tarjetas de familias** con sus esquemas SVG. Los dos portales comparten clases (`fam-card`, `ent-card`, `notas-block`) y `assets/`, así que se mueven bloques enteros.
- **Primero un esqueleto, luego se adapta** (decisión de Jaime, 18-nov). Las prácticas llevan sus pasos generales y un aviso "pendiente de la prueba" donde dependen de SPEC-022 (prompts auditores y check en el CI). Las ideas de F3 y F4 se actualizan cuando SPEC-021 tenga su teoría (T02 y T03).

**Descartado:**
- Editar el portal de junio sección a sección: su estructura (Dinámicas, Práctica única, Debate) no se parece a la nueva y saldría más caro.
- Un portal nuevo en otra ruta: rompería la URL que ya conoce la promoción (constitution 4, URL estables).

## 2. Diseño

### 2.1 Secciones

| Sección | Origen | Contenido |
|---|---|---|
| Hero | Junio, adaptado | Fecha 11-dic · 17:00–21:00, formato "3 rondas en salas", sin "26 JUN" en la cabecera |
| Para qué | Junio + Impacto | Los dos entregables (guía y agentes) y el bloque de impacto, condensado |
| Quién | Junio | Igual que el 21-nov |
| **El día** | 21-nov | Horario del anexo A (15 filas), "Tres veces igual" con salas y Aida, recuento ("✅ repo público con CI · ✅ `main` protegida · ✅ producto en Lovable"), tres reglas |
| Familias | Junio | Las 4 tarjetas con su esquema. Etiqueta de hora: F1 y F2 a las 17:15 (Teoría 1), F3 a las 18:45 (Teoría 2), F4 a las 19:55 (Teoría 3). Nota del orador por familia |
| **Demo** | Nueva | Producto de demo, el pipeline en VS Code y el plan B (informe pregenerado) |
| **Práctica 1** | Nueva | Seguridad de GitHub (pasos) + auditores de F1 y F2 (pendiente) → decisión + puesta en común |
| **Práctica 2** | Nueva | Auditor de F3 (pendiente) → mapa de datos y decisión + simulacro de brecha de 72 h + puesta en común |
| **Práctica 3** | Nueva | Auditor de F4 (pendiente) + check de seguridad en el CI por PR (pendiente) |
| **Kit** | 21-nov + junio | Guía de seguridad, checklist de configuración (SPEC-021) y "para curiosos": el pipeline en VS Code |
| Descargas | Junio | Los 6 ficheros actuales de `descargas/`, con sus nombres |
| Cierre | Junio, adaptado | Lo que se llevan y despedida, sin bloque del Demo Day (P5) |

**Cada práctica** sigue el formato del 21-nov: hora y minutos en el *eyebrow*, aviso "antes de empezar", pasos numerados, bloques copiables, ✅ punto de control en el chat, tabla "si algo falla" y nota del orador con los minutos de la sala.

**Navegación:** Inicio · El día · Familias · Demo · Práctica 1 · Práctica 2 · Práctica 3 · Kit.

### 2.2 Notas del orador
Minutos de cada ronda según el anexo A, plan B de cada demo, qué hace Aida y errores esperados (se completan tras la prueba de SPEC-022). Se mantienen las notas de junio de las tarjetas que sigan siendo válidas.

### 2.3 Lo que queda "pendiente de la prueba"
- Texto de los prompts auditores (4) y su fichero de origen para el botón *Copiar*: los define SPEC-022. Ruta prevista: `sesiones/2026-12-seguridad-v2/Lab/auditores/`.
- Herramienta y fichero del check de seguridad (`seguridad.yml`): SPEC-022.
- Qué ofrecen hoy Lovable y GitHub en seguridad (escáner de Lovable, *Security Advisor*, opciones gratuitas de GitHub): prueba técnica (P7).
- Plan B para quien no terminó el 21-nov (P6).

### 2.4 Chuleta de la asistente
`sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Entregables/guia_asistente.md`, con el tono de la del 21-nov (pasos y atascos, sin horario ni instrucciones). Se escribe cuando las prácticas estén probadas. El script de PDF (`scripts/generar_guia_pdf.py`) solo trabaja con la sesión del 21-nov: hay que darle la ruta de la sesión como parámetro o generar el PDF aparte.

### 2.5 Hub
La tarjeta de la sesión en `index.html` (raíz) dice "un pipeline de agentes que audita tu código antes de cada despliegue". Se ajusta a la nueva práctica cuando esté probada.

## 3. Ficheros

| Acción | Ruta | Nota |
|---|---|---|
| modificar | `sesiones/2026-12-seguridad-v2/index.html` | Reconstrucción con la estructura del 21-nov |
| reutilizar | `sesiones/2026-11-git-deploy/index.html` | Plantilla: secciones, estilos propios y botones *Copiar* |
| reutilizar | `assets/portal.css`, `assets/portal.js` | Sin cambios |
| reutilizar | `sesiones/2026-12-seguridad-v2/descargas/*` | Mismos nombres (URL estables) |
| crear (más tarde) | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Entregables/guia_asistente.md` y su PDF | Tras la prueba |
| modificar (más tarde) | `index.html` (hub) | Texto de la tarjeta |
| modificar (más tarde) | `scripts/generar_guia_pdf.py` | Solo si se genera aquí el PDF de la chuleta |

## 4. Riesgos y plan B

| Riesgo | Probabilidad | Mitigación / plan B |
|---|---|---|
| Los prompts auditores no funcionan bien en Lovable (toca código, hallazgos pobres o muchos créditos) | media | Prueba de SPEC-022 antes de rellenar las prácticas. Plan B: informe pregenerado por Jaime con el pipeline sobre cada repo público |
| Las opciones de seguridad de GitHub no son gratuitas o cambian de sitio | baja | Se comprueban con fecha en la prueba; si no, la P1 se queda solo con los auditores |
| El check de seguridad no cabe en 25 min de la P3 | media | Mismo patrón que la P1 y la P2 del 21-nov (ya conocido). El rescate de la P3 absorbe retrasos; SPEC-023 puede mover minutos |
| Alumnos sin repo conectado o sin CI tras el 21-nov | media | Los auditores en Lovable no necesitan GitHub. Decisión pendiente (P6) |
| El esqueleto se publica con prácticas a medias | alta | Avisos visibles "pendiente de la prueba"; se publica igualmente porque la URL ya es pública y el contenido de junio sigue siendo válido |
| Casos y cifras de F1 y F2 de junio sin reverificar | media | SPEC-021 solo verifica F3 y F4. Se anota como hallazgo para SPEC-023 |

## 5. Verificación

| Criterio | Cómo se verifica |
|---|---|
| CA1 | Revisión del HTML: secciones de R1 y solo estilos propios que no estén en `assets/` |
| CA2 | Horario del portal frente al anexo A (y después frente al guion de SPEC-023); suma de 240 min |
| CA3 | Cada práctica con pasos, punto de control, plan B y botones *Copiar* probados en GitHub Pages tras el push (cuando existan los ficheros) |
| CA4 | Lectura de los pasos: ninguno exige instalar nada; el pipeline solo aparece como demo y "para curiosos" |
| CA5 | Tarjetas con esquema y como máximo 3 ideas por bloque; casos contrastados con `verificacion.md` de SPEC-021 |
| CA6 | Búsqueda de patrones de claves (`sk-`, `ghp_`, `sb_secret`…) en el HTML |
| CA7 | Chrome headless a 1440 y 390 px, con y sin `?notas`; `python scripts/check_links.py` |
| CA8 | Petición a las URL de `descargas/` en GitHub Pages tras el push |

## 6. Conformidad con la constitution
- **1.6 Una sola fuente:** el horario del portal viene del anexo A hasta que exista el guion de SPEC-023; entonces se sincroniza.
- **2.3 y 2.4:** las tarjetas mantienen "Antes de entrar", 3 ideas, caso y "lo que el PM se lleva".
- **2.7, 2.8 y 2.12:** pausas a las 18:35 y 19:45 (ningún tramo de más de 95 min), 240 min y 90 min de salas más demos y puestas en común.
- **3.2 Coste 0:** sin claves de API de pago; el pipeline solo en la máquina de Jaime.
- **3.3 Plan B** en cada práctica y **3.4** sin secretos.
- **3.6** identidad visual y `assets/` común. **5.6** verificación en navegador antes del commit.

**Tensión:** el colchón del anexo A (5 min más el rescate de la P3) queda por debajo del 10 % de la constitution 2.8. Lo resuelve SPEC-023; el portal se ajustará entonces.
