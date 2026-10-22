# TASKS · SPEC-014 · Teoría de la sesión Git/Deploy en 4 familias

*Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md) (aprobado el 20-oct)*

Reglas:
- Cada tarea cabe en una sesión de trabajo (≤ 2h) y produce algo revisable.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.
- Al cerrar una tarea, el agente propone el mensaje de commit y Jaime hace el commit.
- 🧑 = paso de Jaime (revisión o validación).

Orden:
1. Lo más arriesgado: los casos, porque sin fuente no entran.
2. Lo que más bloquea: F1 como prototipo y su revisión.
3. F2–F4 en paralelo.
4. Glosario, verificación y revisión.

Ruta de los ficheros: `sesiones/2026-11-git-deploy/Teoria/` (abreviado `Teoria/`).

| ID | Tarea | Ficheros | Depende | Estado |
|---|---|---|---|---|
| T01 | **Verificar los casos reales** (plan 2.3, constitution 5.4). Para cada candidato (GitLab 2017, CrowdStrike 2024, Knight Capital 2012, más uno para F1), buscar 2 fuentes fiables, preferiblemente el post-mortem oficial más un medio. Anotar qué pasó, fecha, cifras con su fuente y qué idea de la familia ilustra. Proponer sustituto si alguno no se sostiene. **Para F1 aún no hay caso:** proponer 2 opciones verificadas. *Resultado: elegidos por Jaime el 20-oct: F1 Google Cloud 2025 · F2 Replit/SaaStr 2025 · F3 CrowdStrike 2024 · F4 Sonos 2024. En reserva: GitLab 2017, Knight 2012, Cloudflare 2019 y nov-2025, DataTalks 2026.* | `sdd/specs/014-git-deploy-teoria-familias/casos.md` | — | ☑ |
| T02 | **F1 alumnos (prototipo).** `familia1_git_profesional_alumnos.md` con la estructura del plan 2.2: Antes de entrar (repositorio, rama, PR) · para qué le importa a un PM · 3 ideas · cómo se ve en el demo (marcado `ajustar tras SPEC-011`) · caso de T01 · factor agente IA · lo que el PM se lleva (3 frases) · fuentes. Extensión: 150–200 líneas. *Resultado: 164 líneas; 5/5 URLs responden 200.* | `Teoria/familia1_git_profesional_alumnos.md` | T01 | ☑ |
| T03 | **F1 formador (prototipo).** `Formador/familia1_git_profesional_profundo.md` = alumnos + secciones 🎓 (intención, preguntas para el chat, errores esperados, "en la demo enseñas…", plan B) + tabla "Mapa para specs posteriores". *Resultado: 231 líneas (alumnos 164 + 67), 12 bloques 🎓, mapa de 7 filas.* | `Teoria/Formador/familia1_git_profesional_profundo.md` | T02 | ☑ |
| T04 🧑 | **Revisión de F1 por Jaime** (CA8): tono, nivel, extensión y formato. Los cambios que pida se aplican aquí y se anotan como **formato validado** para F2–F4. *Resultado: Jaime valida F1 alumnos ("ha quedado genial") y formador ("perfecto") el 20-oct. Formato fijado.* | los de T02–T03 | T03 | ☑ |
| T05 | **F2 Entornos y secretos** (alumnos + formador) con el formato validado. Delimitación CA7: dónde viven los secretos, sin entrar en qué pasa si se filtran. *Resultado: alumnos 184 líneas, formador 243; caso Replit 2025 (GitLab 2017 en reserva, en formador).* | `Teoria/familia2_entornos_secretos_alumnos.md`, `Teoria/Formador/familia2_entornos_secretos_profundo.md` | T04 | ☑ |
| T06 [P] | **F3 CI/CD y deploy** (alumnos + formador). Workflow solo para leer, sin conceptos internos de Actions (spec, apartado 8). *Resultado: alumnos 182 líneas, formador 244; caso CrowdStrike 2024; YAML de ejemplo comentado en castellano.* | `Teoria/familia3_cicd_deploy_alumnos.md`, `Teoria/Formador/familia3_cicd_deploy_profundo.md` | T04 | ☑ |
| T07 [P] | **F4 Go-live y recuperación** (alumnos + formador). Sin CORS ni endpoints expuestos; con la frase puente al 11-dic en la versión formador (CA7). *Resultado: alumnos 168 líneas, formador 230; caso Sonos 2024 (funciones eliminadas verificadas); frase puente al 11-dic en formador.* | `Teoria/familia4_golive_recuperacion_alumnos.md`, `Teoria/Formador/familia4_golive_recuperacion_profundo.md` | T04 | ☑ |
| T08 | **Glosario.** Unificar los términos del "Antes de entrar" y los que aparezcan en las 4 familias, con la misma definición en todas. Base de la chuleta de Git (SPEC-015). *Resultado: `glosario.md` con 34 términos en 5 grupos, misma definición que en las familias.* | `Teoria/glosario.md` | T05–T07 | ☑ |
| T09 [P] | **Enlace en el README de la sesión.** Añadir una sección "Teoría" con las 4 familias y el glosario. *Resultado: sección "Teoría" con tabla de familias y enlace al glosario; formato corregido a "fork del producto demo" (SPEC-010 v3).* | `sesiones/2026-11-git-deploy/README.md` | T05–T07 | ☑ |
| T10 | **Verificación** (plan, apartado 5): estructura por fichero (CA1), ≤3 ideas y ≤3 términos (CA2), trazabilidad R1–R7 (CA3), URLs que responden (CA4), marcas 🎓 y mapas (CA5), `wc -l` frente a R4 (CA6), delimitación con el 11-dic (CA7). Resultado en `review.md` mediante `/sdd-review 014`. *Resultado: `review.md`. CA1–CA7 ✅; CA8 pendiente de T11. Fuentes de Sonos de AOL y PhoneArena sustituidas por Reuters/BusinessDay y Slashdot/The Verge.* | `sdd/specs/014-git-deploy-teoria-familias/review.md` | T08, T09 | ☑ |
| T11 🧑 | **Validación final de Jaime** de F2–F4 (CA8). Con todo ✅, la spec pasa a `hecha`. *Resultado: Jaime da la teoría por buena el 21-oct; los ajustes que salgan al volcarla al portal irán en SPEC-016.* | — | T10 | ☑ |

Estados: ☐ pendiente · ◐ en curso · ☑ hecha · ✕ descartada

**Ruta crítica:** T01 → T02 → T03 → T04 🧑 → T05/T06/T07 → T08 → T10 → T11 🧑.

**Sin demo en vivo:** esta spec solo produce contenido. El plan B de cada bloque se escribe en la versión formador y se ensaya en SPEC-015.

## Commits propuestos
<!-- El agente añade aquí el mensaje sugerido al cerrar cada tarea -->
- T01 → `[SPEC-014] T01 Casos reales verificados: Google Cloud, Replit, CrowdStrike y Sonos`
- T02 → `[SPEC-014] T02 F1 Git profesional, versión alumnos (prototipo)`
- T03 → `[SPEC-014] T03 F1 Git profesional, versión formador (prototipo)`
- T04 → (revisión, sin commit)
- T05–T07 → `[SPEC-014] T05–T07 F2 Entornos y secretos, F3 CI/CD y F4 Go-live (alumnos + formador)`
- T08–T10 → `[SPEC-014] T08–T10 Glosario, enlace en el README de la sesión y revisión (CA1–CA7 OK)`
- T11 → `[SPEC-014] Teoría validada por Jaime: spec hecha`
