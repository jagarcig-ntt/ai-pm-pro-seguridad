# Git, Deployment y Producción · 21 nov 2026

*Sábado 21-nov · 10:00–14:00 · Zoom · unos 12 PMs Senior · coordinación: Gema*

Es la bisagra del programa: los alumnos llegan con un producto funcional en GitHub (login, endpoints, interfaz) y salen entendiendo el camino profesional hasta producción.
- **Formato:** sesión guiada sobre un **producto demo común** (frontend, backend y datos). Jaime hace la demo en vivo y los alumnos repiten los pasos de bajo riesgo en su **fork del producto demo** (SPEC-010 v3).
- **Herramienta que se llevan:** el Deployment Agent Squad, genérico y aplicable después a su producto.
- **Cierre:** un reto asíncrono en el que cada alumno comparte su URL de producción.

## Specs
| Spec | Qué |
|---|---|
| [SPEC-010](../../sdd/specs/010-git-deploy-objetivos-estructura/spec.md) | Objetivos de aprendizaje y escaleta de 4h |
| SPEC-011 | Producto de demo (con login, endpoints y UI) |
| SPEC-012 | Flujo Git profesional + CI/CD con GitHub Actions |
| SPEC-013 | Entornos, estrategia de deploy y requisitos previos (coste 0) |
| [SPEC-014](../../sdd/specs/014-git-deploy-teoria-familias/spec.md) | Teoría en 4 familias (alumnos + formador) y glosario |
| SPEC-015 | Guion minuto a minuto y cheat sheet |
| SPEC-016 | Portal de la sesión (`index.html` de esta carpeta) |
| SPEC-017 | Deployment Agent Squad |

Estado actualizado en el [registro de specs](../../sdd/specs/README.md).

## Teoría
Cuatro familias, cada una con su guía para alumnos y su versión profunda para el formador (`Teoria/Formador/`):

| Familia | Bloque | Alumnos | Formador | Caso real |
|---|---|---|---|---|
| F1 · Git profesional | B1 · 50 min | [familia1_git_profesional_alumnos.md](Teoria/familia1_git_profesional_alumnos.md) | [profundo](Teoria/Formador/familia1_git_profesional_profundo.md) | Google Cloud, jun-2025 |
| F2 · Entornos y secretos | B2 · 40 min | [familia2_entornos_secretos_alumnos.md](Teoria/familia2_entornos_secretos_alumnos.md) | [profundo](Teoria/Formador/familia2_entornos_secretos_profundo.md) | Replit / SaaStr, jul-2025 |
| F3 · CI/CD y deploy | B3a+B3b · 35+25 min | [familia3_cicd_deploy_alumnos.md](Teoria/familia3_cicd_deploy_alumnos.md) | [profundo](Teoria/Formador/familia3_cicd_deploy_profundo.md) | CrowdStrike, jul-2024 |
| F4 · Go-live y recuperación | B4 · 30 min | [familia4_golive_recuperacion_alumnos.md](Teoria/familia4_golive_recuperacion_alumnos.md) | [profundo](Teoria/Formador/familia4_golive_recuperacion_profundo.md) | Sonos, may-2024 |

Términos comunes: [glosario.md](Teoria/glosario.md), base de la chuleta de Git (SPEC-015).

## Estructura prevista
```
2026-11-git-deploy/
├─ index.html     ← portal (SPEC-016), usa ../../assets/
├─ descargas/     ← lo que se reparte a alumnos: URLs estables, sin espacios
├─ Teoria/        ← guion, teoría alumno/formador, cheat sheet
└─ Lab/           ← producto de demo y Deployment Agent Squad
```
