# Git, Deployment y Producción · 21 nov 2026

*Sábado 21-nov · 10:00–14:00 · Zoom · unos 12 PMs Senior · coordinación: Gema*

Es la bisagra del programa: los alumnos llegan con un producto funcional en GitHub (login, endpoints, interfaz) y salen entendiendo el camino profesional hasta producción.
- **Formato:** sesión guiada. Jaime hace la demo en vivo y los alumnos repiten los pasos de bajo riesgo en su repo.
- **Herramienta que se llevan:** el Deployment Agent Squad.
- **Cierre:** un reto asíncrono en el que cada alumno comparte su URL de producción.

## Specs
| Spec | Qué |
|---|---|
| [SPEC-010](../../sdd/specs/010-git-deploy-objetivos-estructura/spec.md) | Objetivos de aprendizaje y escaleta de 4h |
| SPEC-011 | Producto de demo (con login, endpoints y UI) |
| SPEC-012 | Flujo Git profesional + CI/CD con GitHub Actions |
| SPEC-013 | Entornos, estrategia de deploy y requisitos previos (coste 0) |
| SPEC-014 | Teoría y entregables (guía, checklist de go-live, chuleta de Git) |
| SPEC-015 | Guion minuto a minuto y cheat sheet |
| SPEC-016 | Portal de la sesión (`index.html` de esta carpeta) |
| SPEC-017 | Deployment Agent Squad |

Estado actualizado en el [registro de specs](../../sdd/specs/README.md).

## Estructura prevista
```
2026-11-git-deploy/
├─ index.html     ← portal (SPEC-016), usa ../../assets/
├─ descargas/     ← lo que se reparte a alumnos: URLs estables, sin espacios
├─ Teoria/        ← guion, teoría alumno/formador, cheat sheet
└─ Lab/           ← producto de demo y Deployment Agent Squad
```
