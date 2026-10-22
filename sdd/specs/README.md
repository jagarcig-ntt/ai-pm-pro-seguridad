# Registro de specs

Fuente de verdad del estado de cada spec. La actualizan los comandos `/sdd-*`.

| Spec | Título | Sesión | Fecha límite | Estado |
|---|---|---|---|---|
| [SPEC-000](000-constitution-sdd/spec.md) | Constitution, templates y comandos SDD | infra | 2026-10-19 | en curso |
| [SPEC-001](001-reorganizacion-repo/spec.md) | Reorganización del repo por sesiones + hub de portales ([plan](001-reorganizacion-repo/plan.md)) | infra | 2026-10-19 → tras el 21-nov | en pausa: falta T15 (probar `/security-audit`) y T18 (review). Se retoma con las specs 02x ([tasks](001-reorganizacion-repo/tasks.md)) |
| [SPEC-010](010-git-deploy-objetivos-estructura/spec.md) | Git/Deploy: objetivos de aprendizaje y estructura de 4h | 2026-11 | 2026-10-26 | aprobada (v3) |
| [SPEC-011](011-git-deploy-producto-demo/spec.md) | **Producto demo** a partir de FeedbackHub (frontend, API, datos y login), en la cuenta personal de GitHub de Jaime | 2026-11 | 2026-11-02 | en curso ([tasks](011-git-deploy-producto-demo/tasks.md)) · GitHub + Cloudflare Pages + Supabase |
| SPEC-012 | Flujo Git profesional + CI/CD con GitHub Actions | 2026-11 | 2026-11-02 | pendiente |
| SPEC-013 | Requisitos previos de los alumnos + verificación de límites gratuitos (GitHub, Cloudflare Pages, Supabase). La plataforma ya se decidió en SPEC-011 | 2026-11 | 2026-11-09 | pendiente |
| [SPEC-014](014-git-deploy-teoria-familias/spec.md) | **Teoría en 4 familias** (F1 Git, F2 Entornos y secretos, F3 CI/CD, F4 Go-live), alumnos + formador ([plan](014-git-deploy-teoria-familias/plan.md)) | 2026-11 | 2026-10-26 | **hecha** ([review](014-git-deploy-teoria-familias/review.md)) |
| SPEC-015 | Guion minuto a minuto + cheat sheet + kit (checklist go-live, chuleta Git) | 2026-11 | 2026-11-16 | pendiente |
| SPEC-016 | Portal de la sesión Git/Deploy | 2026-11 | 2026-11-16 | pendiente |
| SPEC-017 | Deployment Agent Squad **genérico** (agentes de Claude Code para cada fase del CI/CD, aplicables a cualquier producto) | 2026-11 | 2026-11-09 | pendiente |
| [SPEC-020](020-retro-junio/spec.md) | Retro sesión 26-jun ([retro](020-retro-junio/retro.md)) | 2026-12 | 2026-11-09 | borrador |
| SPEC-021 | Rediseño familias 3 y 4 | 2026-12 | 2026-11-30 | pendiente |
| SPEC-022 | Evolución del pipeline de agentes (+ check en CI; + script que regenera el zip, aplazado desde SPEC-001) | 2026-12 | 2026-11-30 | pendiente |
| SPEC-023 | Guion de 4h Seguridad v2 | 2026-12 | 2026-12-07 | pendiente |
| SPEC-024 | Portal Seguridad v2 | 2026-12 | 2026-12-07 | pendiente |

**Orden acordado el 20-oct (Git/Deploy):** teoría (014) + decisión de stack (013) → producto demo (011) + workflows (012) → squad (017) → guion y portal (015, 016) + ensayo.

Estados: `pendiente` (identificada, sin spec escrita) · `borrador` · `aprobada` · `en curso` · `hecha` · `descartada`

Hitos: ensayo Git/Deploy 10–16 nov · **sesión 21-nov** · ensayo Seguridad v2 8–10 dic · **sesión 11-dic**
