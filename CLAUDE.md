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
- El material de la sesión del 26-jun es archivo: solo se permiten arreglos de enlaces.

## Sesiones
| Sesión | Fecha | Material |
|---|---|---|
| Seguridad para PMs v1 | 26 jun 2026 | `HeroCamp-Teoria/`, `HeroCamp-Product/`, `portal_sesion.html` (pasarán a `sesiones/2026-06-seguridad/` en SPEC-001) |
| Git, Deployment y Producción | 21 nov 2026 · 10:00–14:00 | `sesiones/2026-11-git-deploy/` (por crear) |
| Seguridad y buenas prácticas con IA v2 | 11 dic 2026 · 17:00–21:00 | `sesiones/2026-12-seguridad-v2/` (por crear) |

El contexto operativo de la sesión de junio (audiencia, identidad visual, decisiones de diseño) está en `HeroCamp-Teoria/Contexto-Proyecto.md`.
