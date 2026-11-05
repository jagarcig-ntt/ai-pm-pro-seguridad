# Registro de specs

Fuente de verdad del estado de cada spec. La actualizan los comandos `/sdd-*`.

| Spec | Título | Sesión | Fecha límite | Estado |
|---|---|---|---|---|
| [SPEC-000](000-constitution-sdd/spec.md) | Constitution, templates y comandos SDD | infra | 2026-10-19 | en curso |
| [SPEC-001](001-reorganizacion-repo/spec.md) | Reorganización del repo por sesiones + hub de portales ([plan](001-reorganizacion-repo/plan.md)) | infra | 2026-10-19 → tras el 21-nov | en pausa: falta T15 (probar `/security-audit`) y T18 (review). Se retoma con las specs 02x ([tasks](001-reorganizacion-repo/tasks.md)) |
| [SPEC-010](010-git-deploy-objetivos-estructura/spec.md) | Git/Deploy: objetivos y estructura de 4h · **v4: práctica sobre el producto de Lovable de cada alumno** (staging + producción) | 2026-11 | 2026-11-06 | borrador v4 |
| [SPEC-011](011-git-deploy-producto-demo/spec.md) | ~~Producto demo FeedbackHub~~ (GitHub + Cloudflare Pages + Supabase) | 2026-11 | 2026-11-02 | **hecha · retirada** (3-nov) → sustituida por SPEC-019 |
| [SPEC-012](012-git-deploy-flujo-git-cicd/spec.md) | ~~Flujo Git + CI/CD en feedbackhub-demo~~ (patrón reutilizado en 018/019) | 2026-11 | 2026-11-02 | **retirada** (3-nov) con T01–T10 hechas |
| SPEC-013 | **Requisitos previos** de los alumnos (Lovable conectado a GitHub, repo público, Supabase propio por *Connectors*, cuenta de Cloudflare y secretos en GitHub) + límites gratuitos. Envío 48 h antes (19-nov) | 2026-11 | 2026-11-12 | pendiente · reescribir para la v4 |
| [SPEC-014](014-git-deploy-teoria-familias/spec.md) | **Teoría en 4 familias** (F1 Git, F2 Entornos y secretos, F3 CI/CD, F4 Go-live), alumnos + formador ([plan](014-git-deploy-teoria-familias/plan.md)) | 2026-11 | 2026-10-26 | **hecha** ([review](014-git-deploy-teoria-familias/review.md)) · **v2 pendiente: sección 6 de F1–F4 al producto Lovable** |
| SPEC-015 | Guion minuto a minuto + cheat sheet + kit (checklist go-live, chuleta Git) | 2026-11 | 2026-11-16 | pendiente |
| SPEC-016 | Portal de la sesión Git/Deploy | 2026-11 | 2026-11-16 | pendiente |
| SPEC-017 | **Deployment Agent Squad para proyectos de Lovable** (extra opcional desde el 5-nov; la práctica va solo con navegador): instala los workflows (Bun + Workers), secretos, `main` protegida o alternativa para repos privados, `lovable-sync` | 2026-11 | 2026-11-12 | pendiente · enfocar a Lovable |
| [SPEC-018](018-git-deploy-flujo-lovable/spec.md) | **Validar el flujo Lovable → GitHub → Cloudflare Workers** y propuesta para Gema y el entrenador | 2026-11 | 2026-11-06 | **hecha** ([review](018-git-deploy-flujo-lovable/review.md)) |
| [SPEC-019](019-git-deploy-producto-lovable/spec.md) | **Producto Lovable de la sesión** (`feedback-hub`): Supabase, check obligatorio, plantilla de PR, ramas de demo, rollback, README ([plan](019-git-deploy-producto-lovable/plan.md)) | 2026-11 | 2026-11-12 | aprobada · plan en borrador |
| [SPEC-020](020-retro-junio/spec.md) | Retro sesión 26-jun ([retro](020-retro-junio/retro.md)) | 2026-12 | 2026-11-09 | borrador |
| SPEC-021 | Rediseño familias 3 y 4 | 2026-12 | 2026-11-30 | pendiente |
| SPEC-022 | Evolución del pipeline de agentes (+ check en CI; + script que regenera el zip, aplazado desde SPEC-001) | 2026-12 | 2026-11-30 | pendiente |
| SPEC-023 | Guion de 4h Seguridad v2 | 2026-12 | 2026-12-07 | pendiente |
| SPEC-024 | Portal Seguridad v2 | 2026-12 | 2026-12-07 | pendiente |

**Orden (3-nov, v4):** SPEC-019 (producto Lovable, empezando por Supabase) + SPEC-014 v2 en paralelo → SPEC-013 y SPEC-017 → guion y portal (015, 016) → ensayo la semana del 16-nov · reunión con Gema y el entrenador la semana del 2-nov.

Estados: `pendiente` (identificada, sin spec escrita) · `borrador` · `aprobada` · `en curso` · `hecha` · `descartada`

Hitos: ensayo Git/Deploy 10–16 nov · **sesión 21-nov** · ensayo Seguridad v2 8–10 dic · **sesión 11-dic**
