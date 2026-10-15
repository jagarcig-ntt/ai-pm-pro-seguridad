# Línea base · SPEC-001

*Tomada el 2026-10-15 (T02) sobre el commit `2c0b6d8`, antes de cualquier movimiento. Referencia para T07, T11 y T14.*

## 1. Hashes (SHA-256, primeros 16 caracteres)
| Fichero | SHA-256 | Bytes |
|---|---|---|
| `portal_sesion.html` | `DEDE0CF912BA2B5E` | 186 912 |
| `materiales_practica.zip` | `AA2EFDE0F645A885` | 65 234 |
| `HeroCamp-Teoria/Bloque Teorico/familia1_credenciales_alumnos.pdf` | `9AC81E1B432EF658` | 186 763 |
| `HeroCamp-Teoria/Bloque Teorico/familia2_bbdd_permisos_alumnos.pdf` | `9EAD7FCE918436DF` | 202 400 |
| `HeroCamp-Teoria/Bloque Teorico/familia3_datos_sensibles_alumnos.pdf` | `55AD2F6B2E51C0CC` | 215 857 |
| `HeroCamp-Teoria/Bloque Teorico/familia4_entornos_configuracion_alumnos.pdf` | `982490E7D15D1E7E` | 202 815 |
| `HeroCamp-Teoria/Entregables/guia_seguridad_alumnos.pdf` | `30BE946F2377C1C2` | 190 980 |

- **Tag:** `git show sesion-2026-06:portal_sesion.html` → `DEDE0CF912BA2B5E`. El tag conserva el portal impartido (R8, comprobado por adelantado).
- **Movimientos (T03/T04):** el `git mv` no debe cambiar ninguno de estos hashes. El portal sí cambiará en T06, por diseño.

## 2. Estructura del portal (`portal_sesion.html`, 2063 líneas)
| Bloque | Líneas | Destino en T05/T06 |
|---|---|---|
| `<link>` Google Fonts (preconnect ×2 + CSS) | 7–9 | se queda en el HTML |
| `<style>` | 10–488 (contenido 11–487) | `assets/portal.css` |
| SVG de ruido inline en el CSS (`data:image/svg+xml`) | 57 | viaja con el CSS |
| `<img>` logo base64 (nav) | 493 | `assets/logo-herocamp.jpg` |
| `<img>` logo base64 (pie) | 1965 | `assets/logo-herocamp.jpg` |
| `<script>` | 1969–2061 (contenido 1970–2060) | `assets/portal.js` |

- Los dos base64 del logo son **idénticos** (11 472 caracteres). Empiezan por `/9j/`, así que es JPEG, aunque el data-URI dice `image/png`.
- `@media (prefers-reduced-motion)` en la L484 desactiva las animaciones `.reveal`.

### Enlaces locales (`href`/`src` que no son `data:`, `#` ni `http`)
| Enlace actual | Destino en T06 |
|---|---|
| `HeroCamp-Teoria/Bloque Teorico/familia1_credenciales_alumnos.pdf` | `descargas/familia1_credenciales_alumnos.pdf` |
| `HeroCamp-Teoria/Bloque Teorico/familia2_bbdd_permisos_alumnos.pdf` | `descargas/familia2_bbdd_permisos_alumnos.pdf` |
| `HeroCamp-Teoria/Bloque Teorico/familia3_datos_sensibles_alumnos.pdf` | `descargas/familia3_datos_sensibles_alumnos.pdf` |
| `HeroCamp-Teoria/Bloque Teorico/familia4_entornos_configuracion_alumnos.pdf` | `descargas/familia4_entornos_configuracion_alumnos.pdf` |
| `HeroCamp-Teoria/Entregables/guia_seguridad_alumnos.pdf` | `descargas/guia_seguridad_alumnos.pdf` |
| `materiales_practica.zip` | `descargas/materiales_practica.zip` |

Enlaces externos: `fonts.googleapis.com` y `fonts.gstatic.com`. No cambian.

## 3. Capturas
Página completa, 1440 px de ancho, viewport de 900 px, con los `.reveal` forzados a visibles.

| Modo | Fichero (scratchpad, no versionado) | Alto |
|---|---|---|
| normal | `…/scratchpad/spec001-baseline/antes_normal.png` | 11 019 px |
| `?notas` | `…/scratchpad/spec001-baseline/antes_notas.png` | 12 749 px |

Ruta completa del scratchpad de esta sesión: `C:\Users\jagarcig\AppData\Local\Temp\claude\c--Users-jagarcig-theherocamp-ai-pm-pro-seguridad\2a8aac56-9be1-48ea-bc86-e0ee8bbab9e1\scratchpad\`

**Cómo se generan** (y cómo reproducirlas si se pierde el scratchpad):
- Script `shot.mjs` (Node 24, sin dependencias). Lanza Chrome headless con `--remote-debugging-port` y fija el viewport a 1440×900 vía CDP.
- Carga el portal, espera a las fuentes, añade `.in` a todos los `.reveal` y hace `Page.captureScreenshot` con `captureBeyondViewport`.
- La línea base se puede regenerar en cualquier momento con `git show sesion-2026-06:portal_sesion.html > tmp.html` (el portal original es autocontenido).

**Descartado:**
- Edge headless no genera capturas en este equipo.
- `chrome --screenshot` con ventana alta estira la portada (`min-height: 100vh`).
- `chrome --screenshot` con anclas `#seccion` devuelve páginas en blanco.

## 4. Zip de práctica (`materiales_practica.zip`)
50 entradas (12 directorios y 38 ficheros):

| Entrada | Bytes |
|---|---|
| `README.md` | 7165 |
| `.claude/CLAUDE.md` | 6943 |
| `.claude/commands/security-audit.md` | 6175 |
| `.claude/settings.local.json` | 117 |
| `.claude/agents/family-1-credentials.md` | 4604 |
| `.claude/agents/family-2-database.md` | 5107 |
| `.claude/agents/family-3-privacy.md` | 5542 |
| `.claude/agents/family-4-configuration.md` | 5768 |
| `feedbackhub/.env` | 410 |
| `feedbackhub/.gitignore` | 53 |
| `feedbackhub/admin-script.js` | 3817 |
| `feedbackhub/admin.html` | 3399 |
| `feedbackhub/admin.js` | 1594 |
| `feedbackhub/api/admin.js` | 1174 |
| `feedbackhub/api/feedback.js` | 1218 |
| `feedbackhub/app.js` | 2346 |
| `feedbackhub/config.js` | 436 |
| `feedbackhub/index.html` | 3488 |
| `feedbackhub/package-lock.json` | 35019 |
| `feedbackhub/package.json` | 458 |
| `feedbackhub/README.md` | 1548 |
| `feedbackhub/security-report.md` | 10458 |
| `feedbackhub/server.js` | 2099 |
| `feedbackhub/supabase/schema.sql` | 617 |
| `feedbackhub/test-data.json` | 479 |
| `analytics-dashboard/.env` | 650 |
| `analytics-dashboard/.gitignore` | 92 |
| `analytics-dashboard/api/admin.js` | 1892 |
| `analytics-dashboard/api/metrics.js` | 2361 |
| `analytics-dashboard/config.js` | 849 |
| `analytics-dashboard/dashboard.js` | 4929 |
| `analytics-dashboard/data/test-fixtures.json` | 1112 |
| `analytics-dashboard/index.html` | 21649 |
| `analytics-dashboard/modules/feedback/feedback.js` | 1754 |
| `analytics-dashboard/package.json` | 456 |
| `analytics-dashboard/README.md` | 2325 |
| `analytics-dashboard/server.js` | 4437 |
| `analytics-dashboard/supabase/schema.sql` | 1194 |

## 5. Hallazgos durante T02
- **El zip incluye `feedbackhub/security-report.md`** (el informe pregenerado, que es el plan B de la demo). El plan (2.6) propone excluir `security-report*.md` por defecto en `build_zip.py`, y eso haría que el zip regenerado no coincidiera con el publicado. **Propuesta para T11:** no excluirlo por defecto y permitir `--exclude` explícito.
- El script de capturas (`shot.mjs`) será necesario en T07 y en futuros cambios de portal (SPEC-016, SPEC-024). **Propuesta:** incorporarlo como `scripts/shot_portal.mjs`, dentro de T10 o en una tarea nueva. Hoy no está declarado en ninguna tarea.

## 6. Resultados posteriores
<!-- T07: comparación visual · T11: diff del zip · T14: verificación local · T17: Pages -->
