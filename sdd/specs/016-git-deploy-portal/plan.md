# PLAN · SPEC-016 · Portal de la sesión Git/Deploy

*Spec: [spec.md](spec.md) (aprobada el 9-nov) · Estado del plan: **aprobado** (9-nov) · [tareas](tasks.md)*

## 1. Enfoque
- **Se parte del portal de junio** (`sesiones/2026-12-seguridad-v2/index.html`): misma estructura de página, mismos componentes y `assets/` sin cambios.
- **El contenido no se inventa:** cada sección sale de un bloque del guion, con su texto, sus casos y sus notas 🎓, que pasan a ser notas del orador.
- **Componentes de junio que se reutilizan:**
  - `fam-card`, que se despliega con `toggleFamily`, para F1–F4;
  - `notas-block` para las notas del orador;
  - `eyebrow` y `reveal` para cabeceras y animaciones;
  - `comp-card` para el cierre.
- **Lo único nuevo:** los botones de copiar prompts, con un `<script>` pequeño dentro de este portal, sin tocar `assets/` (decisión del 9-nov).

**Descartado:**
- Generar el portal desde el Markdown con un script: más trabajo que valor para un portal único, y junio no lo hizo así.
- Incrustar los PDF: se enlazan como descarga.

## 2. Diseño

### 2.1 Secciones, en el orden del guion

| # | Sección (`id`) | Bloque del guion | Contenido | Nota del orador |
|---|---|---|---|---|
| 1 | Inicio (`#hero`) | B0 10:00 | "De Lovable a producción", fecha, 4h, Zoom | Saludar en cámara antes de compartir |
| 2 | Qué os lleváis (`#paraque`) | B0 10:03 | Producto en producción, ficheros, guía y kit | — |
| 3 | Quién (`#quien`) | B0 10:00 | Versión corta de junio | Máximo 1 min |
| 4 | El día (`#dia`) | B0 10:06–10:11 | Horario de los 13 bloques, recuento de requisitos y las 3 reglas de la sesión grabada | Qué hacer según lo que falte |
| 5 | Las 4 familias (`#familias`) | T1–T4 | 4 `fam-card` desplegables: "Antes de entrar" (3 términos), 3 ideas, caso real, caso propio y lo que el PM se lleva | Errores esperados, matices de cada caso ("no digas…") |
| 6 | La demo (`#demo`) | T1–T4 | `feedback-hub`: producción, repo, PR #4 y #6, y rollback | Plan B con capturas |
| 7 | Práctica 1 (`#p1`) | P1 11:15 | Los 3 prompts con botón de copiar, enlaces a los ficheros, puntos de control, URL en Supabase y tabla de "si algo falla" | Papel del ayudante y qué significa cada rojo |
| 8 | Práctica 2 (`#p2`) | P2 12:10 | Ruleset con sus 3 trampas, cambio, enlace `compare`, preview, merge commit y tabla de "si algo falla" | Errores esperados |
| 9 | Kit (`#kit`) | B5 13:45 | Ciclo de cada cambio, mapa de entornos, checklist y chuleta | — |
| 10 | Descargas (`#descargas`) | — | Los 3 PDF y los 3 ficheros | — |
| 11 | Cierre (`#cierre`) | B5 13:40–13:55 | Tres cosas para esta semana (`comp-card`), pausa de Supabase, puente al 11-dic y reto como mención | Squad solo si SPEC-017 está hecho |

**Navegación:** Inicio · El día · Familias · Demo · Práctica 1 · Práctica 2 · Kit · Descargas · Cierre.

**Cabecera:** "AI PM PRO · 21 NOV".

### 2.2 Botones de copiar
- Cada prompt y cada URL de plantilla (`compare`, Redirect URLs) van en un bloque `<pre>` con un botón **Copiar**.
- Se usa `navigator.clipboard`. Si el navegador no lo permite, se selecciona el texto.
- El código va en un `<script>` corto al final del portal, después de `portal.js`.

### 2.3 Hub y enlaces
- La tarjeta del hub (`index.html`) cambia al texto aprobado y enlaza a `sesiones/2026-11-git-deploy/`.
- La guía de requisitos menciona el portal:
  1. una línea en `Guia/guia_requisitos_previos.md`;
  2. regenerar su PDF.

  Es un cambio fuera de este portal, pero lo pide la decisión 3 de la spec.

### 2.4 Coherencia con el guion
Las horas del portal se copian del guion. `check_timings.py` ya compara la cheat sheet. Para el portal se revisa a mano, porque lleva HTML y no tablas Markdown.

## 3. Ficheros
| Acción | Ruta | Nota |
|---|---|---|
| crear | `sesiones/2026-11-git-deploy/index.html` | Portal de la sesión |
| modificar | `index.html` (hub) | Tarjeta de la sesión |
| modificar | `sesiones/2026-11-git-deploy/Guia/guia_requisitos_previos.md` y su PDF | Mención del portal |
| modificar | `sesiones/2026-11-git-deploy/README.md` | Enlace al portal |
| reutilizar sin cambios | `assets/portal.css`, `assets/portal.js`, `assets/logo-herocamp.jpg` | Base común |
| reutilizar | `Teoria/GUION-SESION.md`, teoría v2, `Guia/guia_practica_sesion.md`, `Guia/kit_alumno.md`, `descargas/`, `Lab/workflows/` | Fuentes del contenido |
| reutilizar | `shot.mjs` del scratchpad (Chrome headless) | Capturas de verificación |

## 4. Riesgos y plan B
| Riesgo | Prob. | Mitigación / plan B |
|---|---|---|
| Algún componente de junio no encaja (horario, tabla de errores) | media | Estilos locales en el propio `index.html`, sin tocar `assets/` |
| El portal y el guion se desalinean tras el ensayo | media | T13 de SPEC-015 actualiza los dos a la vez; revisión de horas en la review |
| GitHub Pages tarda en publicar el día 21 | baja | Hacer push como tarde el 19-nov. Plan B: compartir los PDF |
| `navigator.clipboard` bloqueado | baja | Selección automática del texto y "Ctrl+C" |
| El texto es demasiado pequeño al compartir pantalla en Zoom | media | Captura a 1440 px y zoom del navegador al 125 % en el ensayo |

## 5. Verificación
| Criterio | Cómo se verifica |
|---|---|
| CA1 | Tabla del apartado 2.1 contra el guion: secciones, orden y horas |
| CA2 | `python scripts/check_links.py` con el portal nuevo y el hub |
| CA3 | Capturas con Chrome headless a 1440 px y 390 px, con `?notas`, y prueba del botón de copiar con CDP |
| CA4 | Búsqueda en el HTML de `sb_secret_`, claves JWT, tokens, Account ID y correos |
| CA5 | Cada cifra y caso del portal se busca en la teoría, la guía y el kit |
| CA6 | Ensayo completo de la semana del 16-nov |

## 6. Conformidad con la constitution
- **2.3 Máximo 3 ideas por familia:** ✅ las de la teoría v2.
- **3.2 Coste 0:** ✅ HTML estático en GitHub Pages.
- **3.3 Plan B:** ✅ capturas de la demo y PDF de las guías.
- **3.6 Identidad de junio y `assets/`:** ✅ sin cambios en `assets/`.
- **5.6 Portal sensible:** ✅ verificado en el navegador antes del commit.
- **2.8 Timings:** los fija el guion; el portal solo los muestra.

**Tensión:** el portal de junio tiene más de 1.400 líneas. Este tendrá más texto de práctica y menos datos de impacto. Si queda demasiado largo, las prácticas se pueden mostrar plegadas, como las familias.
