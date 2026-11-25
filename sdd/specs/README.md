# Registro de specs

Fuente de verdad del estado de cada spec. La actualizan los comandos `/sdd-*`.

| Spec | Título | Sesión | Fecha límite | Estado |
|---|---|---|---|---|
| [SPEC-000](000-constitution-sdd/spec.md) | Constitution, templates y comandos SDD | infra | 2026-10-19 | en curso |
| [SPEC-001](001-reorganizacion-repo/spec.md) | Reorganización del repo por sesiones + hub de portales ([plan](001-reorganizacion-repo/plan.md)) | infra | 2026-10-19 → tras el 21-nov | en pausa: falta T15 (probar `/security-audit`) y T18 (review). Se retoma con las specs 02x ([tasks](001-reorganizacion-repo/tasks.md)) |
| [SPEC-010](010-git-deploy-objetivos-estructura/spec.md) | Git/Deploy: objetivos y estructura de 4h · **v4.1: producción primero, un solo ciclo de PR y solo navegador** | 2026-11 | 2026-11-06 | borrador v4.1 · escaleta validada por Jaime el 5-nov |
| [SPEC-013](013-git-deploy-guia-requisitos/spec.md) | **Guía de requisitos previos** de los alumnos (Lovable y GitHub, Supabase propio por *Connectors*, Cloudflare y token), en tono de guía de usuario | 2026-11 | 2026-11-12 | **en curso** · borrador de la guía listo |
| [SPEC-014](014-git-deploy-teoria-familias/spec.md) | **Teoría en 4 familias** (F1 Git, F2 CI/CD, F3 Entornos y secretos, F4 Go-live; renumeradas el 18-nov), alumnos + formador ([plan](014-git-deploy-teoria-familias/plan.md)) | 2026-11 | 2026-10-26 | **hecha** ([review](014-git-deploy-teoria-familias/review.md)) · **[v2](014-git-deploy-teoria-familias/v2.md) en curso: F1–F4 al producto Lovable** (12-nov) |
| [SPEC-015](015-git-deploy-guion/spec.md) | Guion minuto a minuto + cheat sheet + kit (checklist go-live, chuleta Git, mapa de entornos) ([plan](015-git-deploy-guion/plan.md) · [tasks](015-git-deploy-guion/tasks.md)) | 2026-11 | 2026-11-16 | **en curso** |
| [SPEC-016](016-git-deploy-portal/spec.md) | **Portal de la sesión Git/Deploy** (pieza clave para Jaime): derivado del guion, con prácticas copiables y kit ([plan](016-git-deploy-portal/plan.md) · [tasks](016-git-deploy-portal/tasks.md)) | 2026-11 | 2026-11-16 | **en curso** · portal listo para revisar |
| SPEC-017 | ~~Deployment Agent Squad~~ | 2026-11 | — | **descartada para el 21-nov** (Jaime, 10-nov): el proceso se interioriza a mano, sin agentes. Se puede retomar para el 11-dic |
| [SPEC-018](018-git-deploy-flujo-lovable/spec.md) | **Validar el flujo Lovable → GitHub → Cloudflare Workers** y propuesta para Gema y el entrenador | 2026-11 | 2026-11-06 | **hecha** ([review](018-git-deploy-flujo-lovable/review.md)) |
| [SPEC-019](019-git-deploy-producto-lovable/spec.md) | **Producto Lovable de la sesión** (`feedback-hub`) y **ensayo solo con navegador**: comprobaciones, check obligatorio, plantilla de PR, ramas de demo, rollback, README ([plan](019-git-deploy-producto-lovable/plan.md) · [tasks](019-git-deploy-producto-lovable/tasks.md)) | 2026-11 | 2026-11-12 | **hecha** ([review](019-git-deploy-producto-lovable/review.md)) |
| [SPEC-020](020-retro-junio/spec.md) | Retro sesión 26-jun ([retro](020-retro-junio/retro.md) · [review](020-retro-junio/review.md)) | 2026-12 | 2026-11-09 | **hecha** (11-nov) |
| [SPEC-021](021-seguridad-v2-familias-3-4/spec.md) | **Preguntas difíciles para el formador** (Seguridad v2; antes: rediseño de las familias 3 y 4): respuestas verificadas de F1, F2 y F3, del escáner de Lovable y de la configuración, en lugar de teoría de F3 ([plan obsoleto](021-seguridad-v2-familias-3-4/plan.md) · [tasks](021-seguridad-v2-familias-3-4/tasks.md)) | 2026-12 | 2026-11-30 | **en curso · redefinida (25-nov):** T02 hecha (`PREGUNTAS-DIFICILES.md`); falta la revisión de Jaime (T03) |
| SPEC-022 | ~~Evolución del pipeline de agentes (+ check en CI; + script que regenera el zip, aplazado desde SPEC-001)~~ | 2026-12 | — | **descartada para esta edición** (SPEC-026, 24-nov) |
| [SPEC-023](023-seguridad-v2-guion/spec.md) | Guion y cheat sheet de **2h** de Seguridad v2 (jueves 10-dic · 19:00–21:00): F1, F2 y F3 con chequeo en Lovable y demo del pipeline ([plan](023-seguridad-v2-guion/plan.md)) | 2026-12 | 2026-12-07 | **en curso** (24-nov) · plan aprobado · [tasks](023-seguridad-v2-guion/tasks.md) |
| [SPEC-024](024-seguridad-v2-portal/spec.md) | **Portal Seguridad v2, v2** (jueves 10-dic · 19:00–21:00): F1, F2 y F3 con su chequeo en Lovable, prompts para copiar, guía en descargas y hub con la fecha corregida; se deriva del guion de SPEC-023 ([plan](024-seguridad-v2-portal/plan.md) · [tasks](024-seguridad-v2-portal/tasks.md)) | 2026-12 | 2026-12-07 | **en curso** (25-nov) · hub corregido · plan aprobado · tasks |
| [SPEC-025](025-retro-git-deploy/spec.md) | Retro de la sesión Git/Deploy del 21-nov ([retro](025-retro-git-deploy/retro.md)): encuesta de 8 respuestas, media 6,75 | 2026-11 → 2026-12 | 2026-11-27 | borrador |
| [SPEC-026](026-seguridad-v2-replanteamiento/spec.md) | **Replanteamiento de Seguridad v2** (acuerdo con Gema y Manu del 24-nov): 2h de teoría el **jueves 10-dic** (F1, F2 y F3, con chequeo en Lovable tras cada una) + guía y checklist para su producto de Lovable. Redefine SPEC-021, 023 y 024 y descarta SPEC-022 ([plan](026-seguridad-v2-replanteamiento/plan.md) · [tasks](026-seguridad-v2-replanteamiento/tasks.md)) | 2026-12 | 2026-11-30 (alcance) · 2026-12-04 (guía) · 2026-12-07 (guion) | **en curso** (24-nov) |

**Orden (5-nov):** SPEC-019 (ensayo primero) → SPEC-013 (guía, 12-nov) → SPEC-014 v2 → guion y portal (015, 016) → ensayo completo la semana del 16-nov → compilar los repos de los alumnos tras el 20-nov → SPEC-017 si da tiempo.

**SPEC-011 y SPEC-012** (demo FeedbackHub en Pages) se borraron el 5-nov: las sustituyen SPEC-018 y SPEC-019. Siguen en git (`07702b3`), y las menciones en specs cerradas son históricas.

Estados: `pendiente` (identificada, sin spec escrita) · `borrador` · `aprobada` · `en curso` · `hecha` · `descartada`

Hitos: ensayo Git/Deploy 10–16 nov · **sesión 21-nov** (impartida) · guía de seguridad a Gema 4-dic · ensayo Seguridad v2 antes del 10-dic (fecha por fijar) · **sesión jueves 10-dic (2h)**
