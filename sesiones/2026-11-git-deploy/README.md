# Git, Deployment y Producción · 21 nov 2026

*Sábado 21-nov · 10:00–14:00 · Zoom · 18 alumnos · coordinación: Gema*

Es la bisagra del programa: los alumnos llegan con su producto construido en Lovable y salen con él publicado en producción.
- **Formato:** sesión guiada, solo con navegador. Cada alumno trabaja sobre **su propio producto** (SPEC-010 v4.1), y `feedback-hub` es la demo y el plan B.
- **Herramienta que se llevan:** los workflows de CI/CD ya instalados, la guía y la checklist de go-live. El Deployment Agent Squad es opcional, para quien trabaje desde VS Code.
- **Cierre:** cada alumno comparte sus URL, y el reto posterior cierra lo que no haya dado tiempo.

## Specs
| Spec | Qué |
|---|---|
| [SPEC-010](../../sdd/specs/010-git-deploy-objetivos-estructura/spec.md) | Objetivos de aprendizaje y escaleta de 4h |
| SPEC-013 | Guía de requisitos previos (coste 0, salvo el plan Pro de Lovable) |
| [SPEC-014](../../sdd/specs/014-git-deploy-teoria-familias/spec.md) | Teoría en 4 familias (alumnos + formador) y glosario |
| SPEC-015 | Guion minuto a minuto y cheat sheet |
| SPEC-016 | Portal de la sesión (`index.html` de esta carpeta) |
| SPEC-017 | Deployment Agent Squad (opcional) |
| [SPEC-018](../../sdd/specs/018-git-deploy-flujo-lovable/spec.md) | Validación del flujo Lovable → GitHub → Cloudflare Workers |
| [SPEC-019](../../sdd/specs/019-git-deploy-producto-lovable/spec.md) | Producto Lovable de la sesión y ensayo |

Estado actualizado en el [registro de specs](../../sdd/specs/README.md).

## Teoría
Cuatro familias, cada una con su guía para alumnos y su versión profunda para el formador (`Teoria/Formador/`):

| Familia | Bloque | Alumnos | Formador | Caso real |
|---|---|---|---|---|
| F1 · Git profesional | T1 · 20 min | [familia1_git_profesional_alumnos.md](Teoria/familia1_git_profesional_alumnos.md) | [profundo](Teoria/Formador/familia1_git_profesional_profundo.md) | Google Cloud, jun-2025 |
| F2 · Entornos y secretos | T2 · 15 min | [familia2_entornos_secretos_alumnos.md](Teoria/familia2_entornos_secretos_alumnos.md) | [profundo](Teoria/Formador/familia2_entornos_secretos_profundo.md) | Replit / SaaStr, jul-2025 |
| F3 · CI/CD y deploy | T3 · 15 min | [familia3_cicd_deploy_alumnos.md](Teoria/familia3_cicd_deploy_alumnos.md) | [profundo](Teoria/Formador/familia3_cicd_deploy_profundo.md) | CrowdStrike, jul-2024 |
| F4 · Go-live y recuperación | T4 · 15 min | [familia4_golive_recuperacion_alumnos.md](Teoria/familia4_golive_recuperacion_alumnos.md) | [profundo](Teoria/Formador/familia4_golive_recuperacion_profundo.md) | Sonos, may-2024 |

Términos comunes: [glosario.md](Teoria/glosario.md), base de la chuleta de Git (SPEC-015).

## Estructura prevista
```
2026-11-git-deploy/
├─ index.html     ← portal (SPEC-016), usa ../../assets/
├─ descargas/     ← lo que se reparte a alumnos: URLs estables, sin espacios
├─ Teoria/        ← guion, teoría alumno/formador, cheat sheet
└─ Lab/           ← producto de la sesión y workflows para copiar
```
