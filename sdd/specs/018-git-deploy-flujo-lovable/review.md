# REVIEW · SPEC-018 · Validar el flujo Lovable → GitHub → Cloudflare

*3-nov-2026. Evidencia: `notas.md` (O1–O4 y fases 2–2c), API pública de GitHub, `wrangler deployments/versions list` (solo lectura), peticiones HTTP a producción y staging.*

| CA | Resultado | Evidencia |
|---|---|---|
| CA1 · Repo de prueba y las 4 preguntas de R2 con evidencia | ✅ | `jagarcig-ntt/feedback-hub`. O1 escribe en la rama conectada · O2 con `main` protegida desvía a `lovable-sync` · O3 selector de rama y *Create branch* · O4 los merges vuelven a Lovable. Commits y capturas en `notas.md` |
| CA2 · PR → preview y merge → producción | ✅ | PR #3: check y preview `ci-cd-…workers.dev` con comentario del bot; merge `72663e6` → despliegue automático a producción (versión `0936916d…` al 100 %). Contenido verificado. **Plataforma: Cloudflare Workers, no Pages** (los proyectos de Lovable se compilan como Worker) |
| CA3 · Supabase por entorno | ↪ **sustituido por decisión** | Jaime (2-nov): base de datos **compartida** en la sesión y separada en el reto (SPEC-010 v4). La conexión de Supabase al proyecto pasa a SPEC-019 |
| CA4 · Flujo del alumno en 5 pasos o menos, coherente con F1–F4 | ✅ | 4 pasos en `propuesta-reunion.md`. Los ajustes de la teoría van a SPEC-014 v2 |
| CA5 · Documento para la reunión | ✅ | `propuesta-reunion.md` actualizado el 2-nov con el flujo probado de punta a punta |
| CA6 · Sin secretos y coste 0 | ✅ | Búsqueda sensible a mayúsculas en todo el historial de `feedback-hub` → 0 claves. Secrets solo en GitHub. GitHub, Cloudflare y Lovable en plan gratuito |

**Hallazgos que pasan a otras specs:**
- **Bun** obligatorio en el CI (npm 10 falla con los `overrides` de Lovable) → SPEC-017 y la guía.
- **Repos privados:** la protección de `main` no se aplica en GitHub Free → SPEC-013 y SPEC-017 (dos salidas documentadas en SPEC-010).
- **Pendiente técnico** → SPEC-019: Supabase conectado, check obligatorio en el ruleset, plantilla de PR, ramas de demo, rollback de Workers.

**Veredicto:** spec **hecha** (3-nov).
