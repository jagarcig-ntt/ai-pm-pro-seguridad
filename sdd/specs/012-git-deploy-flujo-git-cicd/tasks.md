# TASKS · SPEC-012 · Flujo Git profesional y CI/CD

*Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md) (aprobado el 29-oct)*

Reglas:
- Cada tarea cabe en una sesión de trabajo (≤ 2h) y produce algo revisable.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.
- 🧑 = paso de Jaime (commits, push, PR, merge, ajustes de GitHub).
- `D/` = `C:\Users\jagarcig\theherocamp\feedbackhub-demo\`.

**Orden:**
1. Lo más arriesgado primero: que el token y el workflow publiquen de verdad, con un PR que no toca `main`.
2. Después: merge, ruleset y ramas de demo.
3. Al final: fork de alumno y revisión.

| ID | Tarea | Ficheros | Depende | Estado |
|---|---|---|---|---|
| T01 | Escribir los 2 workflows y la plantilla de PR (plan 2.1–2.3), con comentarios en castellano. Validar la sintaxis YAML en local. Sección "Despliegue" en el README del demo. *Resultado (29-oct): YAML válido (js-yaml y PyYAML); `npm test` 8/8. La URL se lee de la línea "Deployment alias URL" que imprime Wrangler 4.151.3 (comprobado en su código), con la URL única como respaldo. El nombre de la rama del PR pasa por variable de entorno, no directamente en el script: evita inyección de comandos con nombres de rama maliciosos (puente al 11-dic).* | `D/.github/workflows/comprobar-pr.yml`, `D/.github/workflows/desplegar.yml`, `D/.github/pull_request_template.md`, `D/README.md` | — | ☑ |
| T02 🧑 | Rama `feature/ci-cd` con T01 → push → **abrir el PR** usando la plantilla. | — | T01 | ☐ |
| T03 | **Verificar el PR** (CA1): check "Comprobar el PR" en verde; job de preview en verde; comentario con la URL; `/api/config` de esa URL → `staging`. Si falla, diagnosticar con los logs (token, permisos, alias). | `notas.md` | T02 | ☐ |
| T04 🧑 | **Merge** del PR `feature/ci-cd` (primer merge del flujo nuevo). | — | T03 | ☐ |
| T05 | **Verificar producción** (CA2): job de `main` en verde; producción sirve la versión nueva (contenido, no solo 200). | `notas.md` | T04 | ☐ |
| T06 🧑 | **Ruleset de `main`** (plan 2.4). Comprobar que un `git push` directo a `main` se rechaza (CA3). | — | T05 | ☐ |
| T07 | **Ramas de demo:** script para Jaime con `staging`, `demo/f3-checks` y el rebase de `demo/f1-pr-listo` y `demo/f4-rompe-portada` sobre el `main` nuevo. Instrucciones para abrir los PR de F1 y F3. | `notas.md` | T06 | ☐ |
| T08 🧑 | Ejecutar T07: push de las ramas; abrir PR de `demo/f1-pr-listo` (plantilla rellena) y de `demo/f3-checks`. | — | T07 | ☐ |
| T09 | **Verificar las ramas** (CA3, CA5): staging fijo actualizado; PR F1 en verde con preview; PR F3 en rojo y "Merging is blocked". | `notas.md` | T08 | ☐ |
| T10 [P] | **Resolver las 2 marcas** de la teoría (F1 plantilla, F3 workflows, comentario, alias con guiones, rama `staging`). | `sesiones/2026-11-git-deploy/Teoria/familia1_*`, `familia3_*` (alumnos y formador) | T09 | ☐ |
| T11 🧑 | **Fork como alumno** (CA4) con la segunda cuenta: fork → Enable workflows → editar la portada desde la web → PR en el fork → check verde, "Desplegar" saltado. Cronometrado. | — | T08 | ☐ |
| T12 | **Revisión** `/sdd-review 012`: CA1–CA8, logs sin secretos (CA6), cobertura de los mapas (CA8). | `review.md` | T09–T11 | ☐ |

Estados: ☐ pendiente · ◐ en curso · ☑ hecha · ✕ descartada

**Ruta crítica:** T01 → T02 🧑 → T03 → T04 🧑 → T05 → T06 🧑 → T07 → T08 🧑 → T09 → T12. T10 y T11 en paralelo al final.

## Commits propuestos
- T01 (repo demo, rama `feature/ci-cd`) → `[SPEC-012] T01 Workflows de comprobación y despliegue, plantilla de PR`
