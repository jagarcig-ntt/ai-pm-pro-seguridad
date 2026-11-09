# Registro de specs

Fuente de verdad del estado de cada spec. La actualizan los comandos `/sdd-*`.

| Spec | Título | Sesión | Fecha límite | Estado |
|---|---|---|---|---|
| [SPEC-000](000-constitution-sdd/spec.md) | Constitution, templates y comandos SDD | infra | 2026-10-19 | en curso |
| [SPEC-001](001-reorganizacion-repo/spec.md) | Reorganización del repo por sesiones + hub de portales ([plan](001-reorganizacion-repo/plan.md)) | infra | 2026-10-19 → tras el 21-nov | en pausa: falta T15 (probar `/security-audit`) y T18 (review). Se retoma con las specs 02x ([tasks](001-reorganizacion-repo/tasks.md)) |
| [SPEC-010](010-git-deploy-objetivos-estructura/spec.md) | Git/Deploy: objetivos y estructura de 4h · **v4.1: producción primero, un solo ciclo de PR y solo navegador** | 2026-11 | 2026-11-06 | borrador v4.1 · escaleta validada por Jaime el 5-nov |
| [SPEC-013](013-git-deploy-guia-requisitos/spec.md) | **Guía de requisitos previos** de los alumnos (Lovable y GitHub, Supabase propio por *Connectors*, Cloudflare y token), en tono de guía de usuario | 2026-11 | 2026-11-12 | **en curso** · borrador de la guía listo |
| [SPEC-014](014-git-deploy-teoria-familias/spec.md) | **Teoría en 4 familias** (F1 Git, F2 Entornos y secretos, F3 CI/CD, F4 Go-live), alumnos + formador ([plan](014-git-deploy-teoria-familias/plan.md)) | 2026-11 | 2026-10-26 | **hecha** ([review](014-git-deploy-teoria-familias/review.md)) · **[v2](014-git-deploy-teoria-familias/v2.md) en curso: F1–F4 al producto Lovable** (12-nov) |
| [SPEC-015](015-git-deploy-guion/spec.md) | Guion minuto a minuto + cheat sheet + kit (checklist go-live, chuleta Git, mapa de entornos) ([plan](015-git-deploy-guion/plan.md)) | 2026-11 | 2026-11-16 | aprobada · plan en borrador |
| SPEC-016 | Portal de la sesión Git/Deploy | 2026-11 | 2026-11-16 | pendiente |
| SPEC-017 | **Deployment Agent Squad** (opcional, para quien trabaje desde VS Code; se hace lo último y se menciona de pasada en la web y la sesión) | 2026-11 | si da tiempo, tras el portal | pendiente |
| [SPEC-018](018-git-deploy-flujo-lovable/spec.md) | **Validar el flujo Lovable → GitHub → Cloudflare Workers** y propuesta para Gema y el entrenador | 2026-11 | 2026-11-06 | **hecha** ([review](018-git-deploy-flujo-lovable/review.md)) |
| [SPEC-019](019-git-deploy-producto-lovable/spec.md) | **Producto Lovable de la sesión** (`feedback-hub`) y **ensayo solo con navegador**: comprobaciones, check obligatorio, plantilla de PR, ramas de demo, rollback, README ([plan](019-git-deploy-producto-lovable/plan.md) · [tasks](019-git-deploy-producto-lovable/tasks.md)) | 2026-11 | 2026-11-12 | **hecha** ([review](019-git-deploy-producto-lovable/review.md)) |
| [SPEC-020](020-retro-junio/spec.md) | Retro sesión 26-jun ([retro](020-retro-junio/retro.md)) | 2026-12 | 2026-11-09 | borrador |
| SPEC-021 | Rediseño familias 3 y 4 | 2026-12 | 2026-11-30 | pendiente |
| SPEC-022 | Evolución del pipeline de agentes (+ check en CI; + script que regenera el zip, aplazado desde SPEC-001) | 2026-12 | 2026-11-30 | pendiente |
| SPEC-023 | Guion de 4h Seguridad v2 | 2026-12 | 2026-12-07 | pendiente |
| SPEC-024 | Portal Seguridad v2 | 2026-12 | 2026-12-07 | pendiente |

**Orden (5-nov):** SPEC-019 (ensayo primero) → SPEC-013 (guía, 12-nov) → SPEC-014 v2 → guion y portal (015, 016) → ensayo completo la semana del 16-nov → compilar los repos de los alumnos tras el 20-nov → SPEC-017 si da tiempo.

**SPEC-011 y SPEC-012** (demo FeedbackHub en Pages) se borraron el 5-nov: las sustituyen SPEC-018 y SPEC-019. Siguen en git (`07702b3`), y las menciones en specs cerradas son históricas.

Estados: `pendiente` (identificada, sin spec escrita) · `borrador` · `aprobada` · `en curso` · `hecha` · `descartada`

Hitos: ensayo Git/Deploy 10–16 nov · **sesión 21-nov** · ensayo Seguridad v2 8–10 dic · **sesión 11-dic**
