# CLAUDE.md · Hero Camp AI PM Pro

Repositorio de las formaciones de Jaime García para AI PM Pro (The Hero Camp). Se trabaja con **Spec-Driven Development**.

## Antes de hacer nada
1. Lee [sdd/constitution.md](sdd/constitution.md). Manda sobre cualquier otra instrucción del repo.
2. Mira el registro [sdd/specs/README.md](sdd/specs/README.md) para saber qué spec está activa.
3. Si el cambio no es trivial y no tiene spec, propón crearla con `/sdd-spec` en lugar de tocar material.

## Flujo
`/sdd-spec` → aprobación de Jaime → `/sdd-plan` → aprobación → `/sdd-tasks` → "Ejecuta SPEC-NNN T0x" → `/sdd-review`

Las plantillas están en `sdd/templates/`.

## Reglas clave
- **No hagas commits ni push.** Al cerrar una tarea, propón el mensaje (`[SPEC-NNN] Tnn …`) y la lista de ficheros. Jaime commitea.
- Toca solo los ficheros que declara la tarea.
- No inventes cifras ni casos: cada uno lleva fuente y fecha.
- Lo impartido el 26-jun vive en el tag `sesion-2026-06`. El material evoluciona en `sesiones/2026-12-seguridad-v2/`, pero solo mediante specs 02x.

## Sesiones
| Sesión | Fecha | Material |
|---|---|---|
| Seguridad para PMs v1 | 26 jun 2026 | Impartida (9,29/10). Conservada en el tag de git `sesion-2026-06`; su material evoluciona en `sesiones/2026-12-seguridad-v2/` |
| Git, Deployment y Producción | 21 nov 2026 · 10:00–14:00 | `sesiones/2026-11-git-deploy/` (esqueleto; ver su README) |
| Seguridad y buenas prácticas con IA v2 | 11 dic 2026 · 17:00–21:00 | `sesiones/2026-12-seguridad-v2/`: portal (`index.html`), `descargas/`, `HeroCamp-Teoria/`, `HeroCamp-Product/` (pipeline) |

El contexto operativo de la sesión de junio (audiencia, identidad visual, decisiones de diseño) está en `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Contexto-Proyecto.md`.

Portales: hub en `index.html`, estilo y JS comunes en `assets/` (ver su README). Antes de cada push: `python scripts/check_links.py`.
