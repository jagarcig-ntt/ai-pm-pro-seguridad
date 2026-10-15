# TASKS · SPEC-001 · Reorganización del repo por sesiones + hub de portales

*Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)*

Reglas:
- Cada tarea cabe en una sesión de trabajo (≤ 2h) y produce algo revisable.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.
- Al cerrar una tarea, el agente propone el mensaje de commit y Jaime hace el commit.
- 🧑 = paso de Jaime (tag, commit, push o comprobación manual).

Orden: primero lo que bloquea (movimientos y su commit), después lo más arriesgado (extraer la fontanería del portal y compararlo con la línea base) y al final lo aditivo (hub, scripts, referencias).

| ID | Tarea | Ficheros | Depende | Estado |
|---|---|---|---|---|
| T01 🧑 | Tag `sesion-2026-06` en local y en el remoto (CA6). Verificado el 15-oct: apunta a `3e6b1cc` y existe en `origin`. | — | — | ☑ |
| T02 | **Línea base.** SHA-256 de `portal_sesion.html` y lista de sus `href`/`src` locales. Capturas a página completa en Edge headless (1440 px, normal y `?notas`) en el scratchpad. Listado de entradas de `materiales_practica.zip`. Resultado: `baseline.md` en la carpeta de la spec, con hashes, rutas de las capturas y listado. | `sdd/specs/001-reorganizacion-repo/baseline.md` | T01 | ☑ |
| T03 | **Movimientos con `git mv`**, sin editar contenido. `HeroCamp-Teoria/`, `HeroCamp-Product/` → `sesiones/2026-12-seguridad-v2/`; `portal_sesion.html` → `sesiones/2026-12-seguridad-v2/index.html`; los 5 PDF de alumnos (`Bloque Teorico/familia{1-4}_*_alumnos.pdf`, `Entregables/guia_seguridad_alumnos.pdf`) y `materiales_practica.zip` → `sesiones/2026-12-seguridad-v2/descargas/`. Comprobar que `git status` los muestra como `renamed`. *Resultado: 73 renombrados, todos al 100 % (`R100`). Hashes idénticos a la línea base. La raíz queda con `.claude/`, `.github/`, `sdd/`, `sesiones/` y `CLAUDE.md`.* | los movidos | T02 | ☑ |
| T04 🧑 | **Commit solo de movimientos** (R1). Después, comprobar `git log --follow` sobre `index.html` y `GUION-SESION-COMPLETO.md` (CA4). | — | T03 | ☑ |
| T05 | **Extraer a `assets/`.** Copiar literal el CSS (L11–487) a `assets/portal.css` y el JS (L1970–2060) a `assets/portal.js`. Decodificar el logo base64 a `assets/logo-herocamp.jpg`, comprobando que los dos base64 (L493 y L1965) son el mismo. Escribir `assets/README.md` con los tokens, las funciones JS y cómo enlazar desde una sesión. *Resultado: CSS de 477 líneas y JS de 91, copiados byte a byte (CRLF conservado). Los dos base64 son idénticos → JPEG de 508×144 y 8603 bytes.* | `assets/portal.css`, `assets/portal.js`, `assets/logo-herocamp.jpg`, `assets/README.md` | T04 | ☑ |
| T06 | **Fontanería del portal.** En `sesiones/2026-12-seguridad-v2/index.html`: `<style>` → `<link ../../assets/portal.css>`; `<script>` → `<script src="../../assets/portal.js">` en la misma posición; las dos `<img>` base64 → `../../assets/logo-herocamp.jpg`; los 6 enlaces de descarga → `descargas/…`. Nada más (plan 2.2). Entregable: un `git diff` que solo contenga esas sustituciones. | `sesiones/2026-12-seguridad-v2/index.html` | T05 | ☐ |
| T07 | **Comparación visual (CA2).** Repetir las capturas de T02 sobre el portal nuevo y compararlas (diferencia de píxeles si es viable; si no, visual). Revisión en el navegador: `N` y `?notas`, acordeones de familias, `toggleDato`, quiz por familias con revelar y reiniciar, tarjetas de agentes, barra de progreso, nav activa, una descarga. Si hay diferencias, se corrigen en T05/T06 antes de seguir. Resultado anotado en `baseline.md`. | `sdd/specs/001-reorganizacion-repo/baseline.md` | T06 | ☐ |
| T08 [P] | **Redirección y `.nojekyll`.** `portal_sesion.html` en la raíz: `location.replace` conservando `search` y `hash`, más `meta refresh`, `canonical`, enlace visible y fondo oscuro. Fichero `.nojekyll` vacío. | `portal_sesion.html`, `.nojekyll` | T04 | ☐ |
| T09 | **Hub `index.html`.** Usa `assets/portal.css` y el logo. Tarjetas: noviembre ("En preparación", sin enlace) y diciembre ("En actualización", enlaza a `sesiones/2026-12-seguridad-v2/`). Pie con la edición de junio y enlace a `github.com/jagarcig-ntt/ai-pm-pro-seguridad/tree/sesion-2026-06`. Responsive. Revisión en el navegador a 1440 px y 390 px (R4). | `index.html` | T05 | ☐ |
| T10 [P] | **Script `check_links.py`** (plan 2.6). Probarlo primero con un enlace roto provocado (en una copia en el scratchpad) para ver que lo detecta. | `scripts/check_links.py` | T04 | ☐ |
| T11 [P] | **Script `build_zip.py`** (plan 2.6). Generar el zip de prueba en el scratchpad desde `sesiones/2026-12-seguridad-v2/HeroCamp-Product` y comparar su listado con el del zip publicado. Anotar las diferencias en `baseline.md`. No sustituir el zip publicado. | `scripts/build_zip.py`, `sdd/specs/001-reorganizacion-repo/baseline.md` | T04 | ☐ |
| T12 [P] | **Esqueleto de noviembre.** `sesiones/2026-11-git-deploy/README.md`: propósito, fecha, formato (Zoom), specs 010–017 y estructura prevista (`index.html`, `descargas/`, `Teoria/`, `Lab/`). | `sesiones/2026-11-git-deploy/README.md` | T04 | ☐ |
| T13 | **Referencias.** `CLAUDE.md`: tabla de sesiones y ruta de `Contexto-Proyecto.md`. Rutas de texto `HeroCamp-Teoria/…` y `HeroCamp-Product/…` → `sesiones/2026-12-seguridad-v2/…` en `sdd/specs/000-*`, `010-*` y `020-*` (`spec.md` y `retro.md`). No tocar el material de la sesión. | `CLAUDE.md`, `sdd/specs/000-constitution-sdd/spec.md`, `sdd/specs/010-git-deploy-objetivos-estructura/spec.md`, `sdd/specs/020-retro-junio/spec.md`, `sdd/specs/020-retro-junio/retro.md` | T04 | ☐ |
| T14 | **Verificación local.** `check_links.py` sin errores (CA1). Comprobar con el hash de `git show sesion-2026-06:portal_sesion.html` que el tag conserva el original (R8). Abrir en local `portal_sesion.html?notas#familias` y verificar que redirige conservando la query y el ancla. | — (anota en `baseline.md`) | T07–T13 | ☐ |
| T15 🧑 | **Verificación del pipeline (CA5).** Abrir Claude Code en `sesiones/2026-12-seguridad-v2/HeroCamp-Product/` y ejecutar `/security-audit --repo feedbackhub --family 1`. Descartar el informe generado. | — | T04 | ☐ |
| T16 🧑 | **Commit(s) y push** de T05–T14. | — | T14 | ☐ |
| T17 | **Verificación en GitHub Pages (CA3).** Tras el despliegue: `Invoke-WebRequest` a la raíz, a `/sesiones/2026-12-seguridad-v2/` y a las 6 descargas (200). En el navegador, `/portal_sesion.html?notas` aterriza en el portal con las notas visibles. | — (anota en `baseline.md`) | T16 | ☐ |
| T18 | **`/sdd-review 001`** → `review.md`. Propuesta de estado `hecha`. | `sdd/specs/001-reorganizacion-repo/review.md` | T15, T17 | ☐ |

Estados: ☐ pendiente · ◐ en curso · ☑ hecha · ✕ descartada

**Ruta crítica:** T02 → T03 → T04 🧑 → T05 → T06 → T07 → T14 → T16 🧑 → T17 → T18.

**Paralelo** después de T04: T08, T10, T11, T12, T13 (y T09 en cuanto exista T05).

## Commits propuestos
<!-- El agente añade aquí el mensaje sugerido al cerrar cada tarea -->
- T01 → (tag, sin commit)
- T02 → `[SPEC-001] T02 Línea base del portal, descargas y zip antes de la reorganización`
- T03/T04 → `[SPEC-001] T03 Mueve el material de junio a sesiones/2026-12-seguridad-v2 (solo git mv)` (solo con los 73 renombrados en staging). *Al final entró en `7145c62` junto con T02. Los renombrados siguen al 100 % y `--follow` funciona, así que CA4 se cumple.*
- T05 → `[SPEC-001] T05 Extrae CSS, JS y logo del portal a assets/`
