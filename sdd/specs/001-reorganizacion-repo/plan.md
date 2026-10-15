# PLAN · SPEC-001 · Reorganización del repo por sesiones + hub de portales

*Spec: [spec.md](spec.md) (v2) · Estado del plan: borrador v2*

## 1. Enfoque
1. **Congelar junio con un tag** (`sesion-2026-06`). Es la única copia de archivo, y no hay duplicados en carpetas.
2. **Mover todo a `sesiones/2026-12-seguridad-v2/` con `git mv`**, renombrando el portal a `index.html`. Así diciembre evoluciona el mismo material y el historial lo conecta con junio.
3. **Extraer la fontanería del portal:**
   - el CSS, el JS y el logo pasan a `assets/`;
   - las descargas pasan a `descargas/` con nombres estables.

   El contenido no se toca, y el render debe quedar idéntico (lo comprueba una comparación con capturas).
4. **Raíz:** hub `index.html`, redirección `portal_sesion.html` y `.nojekyll`.

Alternativas descartadas:
- *Mantener junio en una carpeta de archivo y copiarlo a diciembre*: duplica material y portal. Lo descarta la constitution v1.3 (apartado 1.4).
- *Dejar el CSS y el JS dentro del portal*: noviembre tendría que copiarlos y los dos portales divergirían.
- *Cambiar el contenido del portal ya en esta spec*: mezclaría la reorganización con decisiones pedagógicas, que corresponden a SPEC-021 y SPEC-024.

## 2. Diseño

### 2.1 Estructura resultante
```
/
├─ index.html                          ← NUEVO hub
├─ portal_sesion.html                  ← NUEVO stub de redirección a /sesiones/2026-12-seguridad-v2/
├─ .nojekyll                           ← NUEVO
├─ assets/
│  ├─ portal.css                       ← extraído de L11–487 (literal, sin reescribir)
│  ├─ portal.js                        ← extraído de L1970–2060 (literal)
│  ├─ logo-herocamp.jpg                ← decodificado del base64 (es JPEG)
│  └─ README.md                        ← tokens, funciones JS y cómo enlazarlos
├─ scripts/
│  ├─ check_links.py                   ← CA1
│  └─ build_zip.py                     ← R7
├─ sesiones/
│  ├─ 2026-11-git-deploy/
│  │  └─ README.md                     ← esqueleto (specs 010–017); descargas/ se creará en SPEC-014/016
│  └─ 2026-12-seguridad-v2/
│     ├─ index.html                    ← git mv de portal_sesion.html + extracción
│     ├─ descargas/
│     │  ├─ guia_seguridad_alumnos.pdf
│     │  ├─ familia1_credenciales_alumnos.pdf … familia4_entornos_configuracion_alumnos.pdf
│     │  └─ materiales_practica.zip
│     ├─ HeroCamp-Teoria/              ← git mv (sin los 5 PDF de alumnos, que pasan a descargas/)
│     └─ HeroCamp-Product/             ← git mv (incluye .claude/ del pipeline)
├─ sdd/ …                              ← rutas de texto actualizadas
└─ CLAUDE.md                           ← tabla de sesiones actualizada
```

### 2.2 Cambios dentro del portal (solo fontanería)
| Antes | Después |
|---|---|
| `<style>` L10–488 | `<link rel="stylesheet" href="../../assets/portal.css">` |
| `<script>` L1969–2061 | `<script src="../../assets/portal.js"></script>`, al final del `body` y en la misma posición, para que el orden de ejecución no cambie |
| `<img src="data:image/png;base64,…">` (L493 y L1965) | `<img src="../../assets/logo-herocamp.jpg">`, con los mismos atributos y clases |
| `href="HeroCamp-Teoria/Bloque Teorico/familiaN_…pdf"` (×4), `…/Entregables/guia_seguridad_alumnos.pdf`, `materiales_practica.zip` | `href="descargas/…"` |

- Se queda igual en el HTML: el SVG de ruido inline del CSS (L57) y todos los `style=""` en línea del contenido.
- Las rutas a `assets/` son relativas (`../../assets/`), así que funcionan tanto en Pages como al abrir el fichero en local.
- En la cabecera se mantiene "AI PM PRO · 26 JUN". La actualizará SPEC-024.

### 2.3 Redirección (`/portal_sesion.html`)
- `location.replace('sesiones/2026-12-seguridad-v2/' + location.search + location.hash)`. Conserva `?notas` y las anclas.
- Respaldo sin JS: `<meta http-equiv="refresh">`, `<link rel="canonical">` y un enlace visible.
- Fondo oscuro, para que no haya fogonazo blanco.

### 2.4 Hub (`/index.html`)
- Carga `assets/portal.css` (tokens, fuentes y componentes). Unos pocos estilos propios del hub van inline.
- **Cabecera:** logo, "AI PM Pro · The Hero Camp" y "Sesiones de Jaime García".
- **Tarjetas de sesión:**

  | Sesión | Fecha | Estado | Enlace |
  |---|---|---|---|
  | Git, Deployment y Producción | 21 nov · 10:00–14:00 | "En preparación" | Sin enlace (lo activa SPEC-016) |
  | Seguridad y buenas prácticas con IA | 11 dic · 17:00–21:00 | "En actualización" | Al portal `sesiones/2026-12-seguridad-v2/` |

- **Pie:** "Edición anterior: Seguridad para PMs · 26 jun 2026 · 9,29/10", con enlace a la versión impartida en GitHub (`/tree/sesion-2026-06`).
- **Diseño:** responsive, con 16 px de margen lateral en móvil. Sin notas del orador.

### 2.5 Descargas
- Los 5 PDF de alumnos y el zip se mueven con `git mv` a `descargas/`. Los nombres actuales ya están en `snake_case` y sin espacios, así que se mantienen.
- Los `.md` fuente se quedan en `HeroCamp-Teoria/`. Los PDF son salidas generadas y viven donde se publican (constitution, apartado 4).
- Las versiones del formador (`Formador/*_profundo.pdf`) **no** van a `descargas/`, porque no se reparten.

### 2.6 Scripts (Python stdlib; Python 3.13 está instalado)
- **`scripts/check_links.py [ficheros…]`:**
  - Por defecto revisa `index.html`, `portal_sesion.html` y `sesiones/*/index.html`.
  - Revisa `href` y `src` locales, decodifica `%20` y resuelve rutas relativas.
  - Sigue el destino de la redirección.
  - Ignora `data:`, `#`, `http(s):` y `mailto:`.
  - Informa de cada enlace roto con fichero y línea, y sale con código ≠ 0 si hay alguno.
- **`scripts/build_zip.py <origen> <zip> [--exclude …]`:**
  - Incluye ficheros ocultos, con rutas `/`.
  - Excluye por defecto `node_modules/`, `.git/`, `.DS_Store` y `security-report*.md`.
  - Al terminar, lista las entradas.
  - En esta spec **solo se valida**: se genera en el scratchpad y se compara con el zip actual. El zip publicado no se sustituye hasta SPEC-022, cuando cambie el pipeline.

### 2.7 Referencias a actualizar
- `CLAUDE.md`: tabla de sesiones y ruta de `Contexto-Proyecto.md`.
- `sdd/specs/000…`, `010…`, `020…`: rutas de texto `HeroCamp-Teoria/…` → `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/…`.
- Las rutas internas del material (`../HeroCamp-Product/feedbackhub` en el guion) siguen siendo válidas porque las dos carpetas se mueven juntas. El resto de textos obsoletos dentro del material (URL antigua en `Contexto-Proyecto.md`, `node dist/index.js`) se tratan en SPEC-021, SPEC-022 y SPEC-023.

### 2.8 Orden de ejecución (guía para `/sdd-tasks`)
1. **Jaime:** `git tag sesion-2026-06` sobre el HEAD actual y `git push origin sesion-2026-06`.
2. **Línea base:**
   - capturas en Edge del portal actual (normal y `?notas`), por secciones;
   - listado del zip.
3. `git mv` de las carpetas, del portal (→ `index.html`), de los PDF y del zip a sus destinos. **Pausa: Jaime hace un commit solo de movimientos** (R1).
4. Extracción a `assets/` y edición de la fontanería del portal (2.2).
5. Comparación visual con la línea base (CA2). Si hay diferencias, se corrigen antes de seguir.
6. Redirección, `.nojekyll` y hub.
7. Esqueleto de noviembre y scripts.
8. Referencias (2.7).
9. Verificación completa y `/sdd-review 001`.

## 3. Ficheros
| Acción | Ruta | Nota |
|---|---|---|
| tag (Jaime) | `sesion-2026-06` | Antes de cualquier cambio |
| mover | `portal_sesion.html` → `sesiones/2026-12-seguridad-v2/index.html` | Luego se edita su fontanería |
| mover | `HeroCamp-Teoria/`, `HeroCamp-Product/` → `sesiones/2026-12-seguridad-v2/` | |
| mover | 5 PDF de alumnos + `materiales_practica.zip` → `sesiones/2026-12-seguridad-v2/descargas/` | |
| modificar | `sesiones/2026-12-seguridad-v2/index.html` | Solo los cambios de 2.2 |
| crear | `assets/portal.css`, `assets/portal.js`, `assets/logo-herocamp.jpg`, `assets/README.md` | |
| crear | `index.html`, `portal_sesion.html`, `.nojekyll` (raíz) | |
| crear | `scripts/check_links.py`, `scripts/build_zip.py` | |
| crear | `sesiones/2026-11-git-deploy/README.md` | |
| modificar | `CLAUDE.md`; rutas de texto en `sdd/specs/000-*`, `010-*`, `020-*` | |

## 4. Riesgos y plan B
| Riesgo | Probabilidad | Mitigación / plan B |
|---|---|---|
| La extracción cambia el render: orden de carga, `@import` de fuentes, scripts ejecutados antes de tiempo | media | El CSS se extrae literal y el `<link>` va en la misma posición que el `<style>`. El script va donde estaba, al final del `body`. Se comparan capturas (paso 5). Plan B: revertir a la versión anterior desde el commit de movimientos y volver a extraer por partes. |
| Las animaciones de aparición al hacer scroll esconden contenido en las capturas sin interacción | alta | Revisión manual en el navegador, sección por sección. Las capturas automáticas sirven solo de apoyo. |
| Git no detecta los renombrados (`index.html` cambia de nombre y de contenido) | media | Commit solo de movimientos (paso 3), antes de editar. Se comprueba `git log --follow` en ese momento. |
| `/security-audit` no se encuentra | baja | Claude Code lee `.claude/` del directorio de trabajo, y la carpeta se mueve entera (CA5). |
| Pages tarda en publicar o se queda con una versión antigua en caché | baja | Esperar a que termine el despliegue de Pages y recargar sin caché. |
| Hay otra sesión de Claude editando `sdd/` en paralelo | media | Ejecutar SPEC-001 con una sola sesión abierta. |

## 5. Verificación
| Criterio | Cómo se verifica |
|---|---|
| CA1 | `python scripts/check_links.py` → 0 enlaces rotos |
| CA2 | Capturas de antes y después en Edge, por sección, normal y `?notas`. Revisión manual en el navegador: notas con `N`, quiz, acordeones de familias, tarjetas de agentes, barra de progreso y una descarga |
| CA3 | Tras el push de Jaime, `Invoke-WebRequest` → 200 en la raíz, en `/sesiones/2026-12-seguridad-v2/` y en las 6 descargas. En el navegador, `/portal_sesion.html?notas` aterriza en el portal con las notas visibles |
| CA4 | `git log --follow --oneline` sobre `sesiones/2026-12-seguridad-v2/index.html` y sobre `GUION-SESION-COMPLETO.md` muestra los commits anteriores al movimiento |
| CA5 | Jaime abre Claude Code en `sesiones/2026-12-seguridad-v2/HeroCamp-Product/` y ejecuta `/security-audit --repo feedbackhub --family 1`. Se descarta el informe generado |
| CA6 | `git ls-remote --tags origin sesion-2026-06` |
| R4 | Hub en el navegador a 1440 px y 390 px: sin scroll horizontal y con la identidad de la constitution (3.6) |
| R7 | El listado del zip generado por el script coincide con el zip actual. Las diferencias se documentan en `review.md` |
| R8 | `git show sesion-2026-06:portal_sesion.html` es igual al portal original (comparando hash) |

## 6. Conformidad con la constitution (v1.3)
- **Máximo 3 ideas por bloque, timings y plan B de demo:** no aplican, porque es una spec de infraestructura.
- **Coste 0:** sí.
- **1.4:** junio queda en el tag y su material evoluciona en `2026-12-seguridad-v2`, sin duplicados.
- **3.6:** `assets/` pasa a ser la única fuente del estilo común.
- **4:** URLs limpias (`/sesiones/…/`) y `descargas/` estable a partir de esta spec.
- **5.5:** Jaime hace el tag, los commits y el push, con una pausa obligada tras los movimientos.

**Tensión residual:** el portal de diciembre muestra hasta SPEC-024 el contenido de junio ("26 JUN", 3h). Es intencionado, porque esta spec solo cambia la fontanería. El hub lo marca como "En actualización".
