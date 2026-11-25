# PLAN · SPEC-024 · Portal de la sesión Seguridad v2 (v2: 2h, solo teoría)

*Spec: [spec.md](spec.md) (v2, aprobada el 24-nov) · Estado del plan: **aprobado** (Jaime, 25-nov) · [tasks](tasks.md). El plan de la v1 (18-nov: salas, prácticas, auditores) queda en el historial de git*

## 1. Enfoque
- **El portal se reescribe en su sitio a partir del portal del 21-nov** (`sesiones/2026-11-git-deploy/index.html`, SPEC-016), que ya resuelve lo mismo con `assets/` común. De él se reutilizan:
  - la cabecera, la navegación y el hero;
  - la tabla de "El día";
  - las tarjetas de familia desplegables (`fam-card`, `fam-block`);
  - los desplegables (`details`);
  - los bloques `copiable` con su script *Copiar*;
  - las notas del orador (`notas-block`);
  - el cierre y el pie.
- **El contenido no se escribe de nuevo: se resume del guion** (SPEC-023, revisado en T09). Sale del guion y de la guía:
  - en cada tarjeta, los 3 términos, las 3 ideas, el caso, lo que pasó en Lovable el 24-nov, el mensaje y lo que te llevas;
  - en las notas, las horas y las preguntas.
- **Los prompts van inline**, con el texto de `prompts_chequeo_lovable.md`. Un script nuevo comprueba que el portal, la guía y el fichero de prompts tienen los tres prompts idénticos.
- **De junio se conservan solo los colores de las familias:** F1 azul, F2 coral y F3 jade (`data-c`), para mantener la identidad de la sesión. El resto del portal de junio se sustituye. Queda en el tag `sesion-2026-06`.

**Descartado:**
- **Adaptar el portal de junio sección a sección:** tiene 1.493 líneas, estilos propios ya pasados a `assets/` y 6 de sus 9 secciones salen.
- **Copiar los prompts con `data-fichero` (leerlos del repositorio al copiar):** SPEC-016 quitó los enlaces al repositorio (commit `774c2a6`), y desde `file://` no funciona. Inline y comprobados con un script es más simple.

## 2. Diseño

### 2.1 Secciones y anclas
Las anclas son las que usará el guion en sus ACCIÓN (SPEC-023 T10, decisión P1).

| Ancla | Sección | Contenido (fuente) | Hora del guion |
|---|---|---|---|
| `#inicio` | Hero | «Seguridad y buenas prácticas con IA» · jueves 10-dic · 19:00–21:00 · Zoom · el mensaje de la sesión: «Lovable protege una parte; la decisión es tuya» | 18:50 (portada) |
| `#paraque` | Para qué | 3 párrafos cortos de la apertura del guion (19:00) y qué os lleváis: la guía, los prompts y la checklist (19:03) | 19:00–19:06 |
| `#dia` | El día | Tabla de 8 bloques, de 19:00 a 21:00 (= guion). Cómo participar: chat o voz, tres preguntas por riesgo y dudas al final. Enlace a la guía | 19:03–19:08 |
| `#familias` | Los tres riesgos | Tres `fam-card`: `#f1` Claves y secretos (azul), `#f2` Datos y permisos (coral) y `#f3` Datos personales (jade). Ver §2.2 | 19:10–20:39 |
| `#prompts` | Revisa tu producto | Los 3 prompts en bloques `copiable`, con una frase de qué revisa cada uno y las tres reglas de la guía: no cambian nada, arreglar por PR y nada de arreglos el día 11 | Al final de cada familia |
| `#curiosos` | Para curiosos | Desplegable: qué es un pipeline de agentes (definido en una frase), qué revisa y que no lo necesitan. Único sitio con VS Code y Claude Code | 20:39 |
| `#descargas` | Descargas | **Solo** la guía en PDF (`descargas/guia_seguridad_alumnos.pdf`, P3). Los demás ficheros siguen en `descargas/`, sin enlace | 20:44 |
| `#cierre` | Cierre | La checklist de la guía · Demo Day el 12-dic: el 11, nada de cambios grandes, salvo algo grave («Si ya ocurrió») · datos de prueba en la demo, nada de *Secrets* en pantalla | 20:44–20:48 |

**Navegación:** Inicio · El día · Riesgos · Prompts · Descargas · Cierre. Sale «Quién» (P2).

### 2.2 Cada tarjeta de familia (R3)
Mismo orden que el guion, con frases cortas resumidas de su texto:

| Bloque de la tarjeta | F1 · Claves y secretos | F2 · Datos y permisos | F3 · Datos personales |
|---|---|---|---|
| Cabecera (`fam-tag`, `fam-desc`) | 19:10 · Para qué en una frase | 19:37 | 20:12 |
| Antes de entrar | clave · clave pública · clave secreta | base de datos · tabla · RLS | dato personal · RGPD · brecha |
| Tres ideas | Las del guion (spec de SPEC-023, P4) | ídem | ídem |
| Caso real | Startup mexicana, 82.314 $ en 48 h (The Register, 3-mar-2026) · Unit 42 | CVE-2025-48757 (Matt Palmer, 29-may-2025; Lovable lo disputa) · Moltbook (Wiz, 2-feb-2026) | Samsung y ChatGPT (The Register, 6-abr-2023) · 72 h (RGPD, art. 33; AEPD) |
| Lo que pasó en Lovable (24-nov) | Se negó a poner la clave en la web y la guardó en *Secrets*. Imagen recortada de `f1-chat-lovable-rechaza-clave.png` | Creó `notas_publicas` porque se lo pedí y el escáner la marcó como crítica. Imagen recortada de `f2-escaner-hallazgo-critico.png` | Añadió el DNI y la fecha de nacimiento sin avisar, el escáner no lo marcó y se negó al `console.log`. Imagen recortada de `f3-chat-rechaza-console-log.png` |
| Mensaje | Lovable te protege si la clave pasa por Lovable. Fuera, nadie | Lovable avisa; la decisión es tuya | Ninguna herramienta decide por ti qué datos necesitas |
| Lo que te llevas | Las acciones de «Qué hacer» de la guía y un enlace al prompt de `#prompts` | ídem | ídem |

**Imágenes (P4):**
- Se recortan con Pillow (`pip install pillow`, gratuito) para que solo se vea el mensaje, sin el nombre de la cuenta ni la lista de proyectos.
- Se guardan en `sesiones/2026-12-seguridad-v2/img/` con nombres en `snake_case`: `f1_lovable_rechaza_clave.png`, `f2_escaner_critico.png` y `f3_lovable_rechaza_consola.png`.
- Llevan `alt` descriptivo.
- Se revisan a mano antes de publicar (3.4).

### 2.3 Notas del orador (R8)
En cada sección, un `notas-block` con la hora y las preguntas del guion. Por ejemplo, en `#f1`: «19:10 · preguntas a las 19:20, 19:28 (chequeo) y 19:35 · chequeo: prompt 1 y la negativa en el historial del chat · corte a los 4 min». Ocultas sin `?notas` (`assets/portal.js`).

### 2.4 Comprobación de los prompts: `scripts/check_prompts.py` (nuevo)
- Extrae los tres prompts de:
  - `prompts_chequeo_lovable.md` (bloques ```text);
  - `guia_seguridad_alumnos.md` (bloques ```text);
  - el portal (bloques `.copiable` de `#prompts`, quitando el botón y deshaciendo las entidades HTML).
- Sale con código 1 si alguno no es idéntico.
- Se ejecuta también antes de cada push, junto a `check_links.py`.

### 2.5 Ajustes del guion (SPEC-023 T10, no de esta spec)
Con las anclas de §2.1, el guion cambia sus ACCIÓN de «la guía, página N» a «el portal, `#fN`», y la pestaña 1 de la pre-sesión pasa a ser el portal. Lo hace T10 de SPEC-023. Aquí solo se fija el contrato: las anclas.

## 3. Ficheros
| Acción | Ruta | Nota |
|---|---|---|
| reescribir | `sesiones/2026-12-seguridad-v2/index.html` | Base: el portal del 21-nov. Junio queda en el tag |
| crear | `sesiones/2026-12-seguridad-v2/img/f1_lovable_rechaza_clave.png`, `f2_escaner_critico.png`, `f3_lovable_rechaza_consola.png` | Recortes de `026/capturas/` (P4) |
| crear | `scripts/check_prompts.py` | §2.4 |
| hecho | `index.html` (hub) | R1, el 24-nov |
| reutilizar | `sesiones/2026-11-git-deploy/index.html` | Estructura, estilos propios (`.tabla`, `.copiable`, `.copiar`) y script *Copiar* |
| reutilizar | `assets/portal.css`, `portal.js`, `logo-herocamp.jpg` | Sin cambios |
| reutilizar | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/GUION-SESION.md` | Textos, horas y preguntas |
| reutilizar | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Entregables/guia_seguridad_alumnos.md` · `prompts_chequeo_lovable.md` | «Qué hacer», casos y prompts |
| reutilizar | `sdd/specs/026-seguridad-v2-replanteamiento/capturas/` | Origen de las imágenes |
| sin enlace | `sesiones/2026-12-seguridad-v2/descargas/familia*_alumnos.pdf`, `materiales_practica.zip` | Se quedan en su URL (constitution 4), sin enlace (P3) |

## 4. Riesgos y plan B
| Riesgo | Probabilidad | Mitigación / plan B |
|---|---|---|
| El guion cambia en la revisión de Jaime (SPEC-023 T10, hasta el 7-dic) y el portal se queda desfasado | media | El portal se construye después de la revisión del guion, o se ajusta en la misma tarea. Las horas del portal se comprueban contra el guion (CA3) |
| Un prompt del portal difiere del de la guía al copiarlo | baja | `check_prompts.py` (CA5) |
| En una imagen recortada sigue viéndose algo privado (cuenta, proyectos, un valor) | baja | Revisión a mano de cada recorte (CA8). Si hay duda, la imagen sale y queda solo el texto |
| El portal falla en directo (GitHub Pages caído, sin conexión) | baja | Abrir el portal en local (`file://`), que se ve igual salvo el *Copiar* de ficheros, que no se usa. Último recurso: la guía en PDF |
| El efecto de aparición (`.reveal`) esconde contenido al compartir pantalla o en las comprobaciones sin ventana | baja | Se verifica en el navegador real. Para las capturas automáticas, la copia temporal que fuerza el contenido visible (método de SPEC-026 T12) |
| Texto reutilizado de junio con lenguaje figurado | media | No se reutiliza texto de junio, solo el del guion revisado. Revisión de lectura (CA6) |

## 5. Verificación
| Criterio | Cómo se verifica |
|---|---|
| CA1 | Hecho el 24-nov: el hub en Edge a 1440 y 390 px |
| CA2 | Lista de `<section id>` del portal = §2.1. Ni `quien`, `impacto`, `dinamicas`, `practica`, `debate` ni una cuarta familia. Solo `<style>` propio para lo que no está en `assets/` |
| CA3 | Las filas de la tabla de `#dia` = la escaleta del guion (las 8 horas y los minutos), comparadas con un script (las funciones de `check_timings.py`) |
| CA4 | Por tarjeta: 3 términos, 3 ideas y un caso, cotejados con el guion y la guía. Las cifras y fechas, buscadas en `026/verificacion-f1-f2.md` y `021/verificacion.md` |
| CA5 | `python scripts/check_prompts.py` sale con código 0. El botón *Copiar* se prueba en GitHub Pages después del push |
| CA6 | Lectura completa, con la misma búsqueda de expresiones figuradas que SPEC-023 T09. VS Code y Claude Code solo en `#curiosos` |
| CA7 | Edge a 1440 y 390 px (en este equipo no hay Chrome), con y sin `?notas`. `python scripts/check_links.py`. Las URL de `descargas/` responden (curl después del push) |
| CA8 | Revisión a mano de las tres imágenes y búsqueda de patrones de clave en el HTML (`sk-`, `eyJ`, `AKIA`, `ghp_`) |

## 6. Conformidad con la constitution
- ✅ **1.6 Una sola fuente:** horas, ideas y preguntas salen del guion. El portal no fija minutos propios.
- ✅ **2.3 Máximo 3 ideas por bloque:** 3 por tarjeta.
- ✅ **2.2 y la excepción v1.9:** definiciones directas y texto del guion ya revisado.
- ✅ **3.2 Coste 0:** HTML estático en GitHub Pages; Pillow es gratuito y solo se usa en local.
- ✅ **3.3 Plan B:** el portal en local y la guía en PDF (§4). El portal no tiene demos propias: los chequeos y el pipeline tienen su plan B en el guion.
- ✅ **3.4 Nada de secretos:** imágenes recortadas y revisadas, y búsqueda de patrones (CA8).
- ✅ **3.6 `assets/` común e identidad de junio:** sin estilos duplicados; colores de familia de junio.
- ✅ **4 URL estables:** la del portal no cambia y las de `descargas/` siguen ahí (P3: sin enlace, no borradas).
- ✅ **5.6 Verificación en el navegador** antes del commit.
- **Timings:** no aplica como suma propia; la tabla de `#dia` es una copia de la del guion, que ya suma 120 min (SPEC-023 T09, CA1).

**Tensiones:**
1. **Orden con SPEC-023 T10.** El portal depende del texto final del guion, y el guion depende de las anclas del portal para sus ACCIÓN. Se resuelve fijando las anclas en este plan (§2.1). Así T10 puede cambiar las ACCIÓN aunque el portal no esté construido.
2. **Fecha límite común (7-dic)** para el portal y la revisión del guion. Si el guion cambia el 6 o el 7, el portal tiene que ajustarse ese mismo día.
