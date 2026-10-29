# SPEC-012 · Flujo Git profesional y CI/CD con GitHub Actions (feedbackhub-demo)

| Campo | Valor |
|---|---|
| Estado | **aprobada** (29-oct, con las respuestas del apartado 8) |
| Sesión | 2026-11 Git/Deploy (sábado 21-nov · 10:00–14:00 · Zoom) |
| Fecha límite | 2026-11-02 |
| Depende de | SPEC-011 (hecha: producto, entornos, ramas `demo/…`) · SPEC-014 (mapas F1 y F3) |
| Alimenta | SPEC-017 (squad), SPEC-015 (guion y planes B), SPEC-016 (portal) |
| Responsable | Jaime García |

## 1. Problema / necesidad
- **Hoy el demo se despliega a mano.** Jaime lanza `npx wrangler pages deploy …` desde su ordenador (`sdd/specs/011-git-deploy-producto-demo/notas.md`, T04 y T09). Es exactamente lo que F3 dice que no se hace: *"nunca se despliega a mano desde un ordenador"* (`sesiones/2026-11-git-deploy/Teoria/familia3_cicd_deploy_alumnos.md`, idea 3).
- **`main` no está protegida.** Cualquiera con permisos puede hacer push directo, y F1 enseña que *"`main` siempre funciona"* y que todo entra por PR (`familia1_git_profesional_alumnos.md`, ideas 1 y 3).
- **No hay plantilla de PR ni checks.** F1 (idea 3) y F3 (idea 2) se apoyan en ambos.
- **Quedan entradas pendientes de SPEC-011** (`sdd/specs/011-git-deploy-producto-demo/review.md`, apartado 5):
  - CA5 (fork limpio con check en verde);
  - rama `demo/f3-checks`;
  - abrir el PR de `demo/f1-pr-listo`;
  - token de Cloudflare y secrets de GitHub;
  - las 2 marcas `ajustar tras SPEC-012` de la teoría (plantilla de PR en F1, nombres de workflows en F3).
- Los mapas de SPEC-014 (sección 11 de `Teoria/Formador/familia1_…` y `familia3_…`) asignan a esta spec 9 filas: ruleset, plantilla de PR, workflows legibles, check obligatorio, preview por PR, merge = producción, fork-friendly, `demo/f3-checks` y el puente al 11-dic.

## 2. Objetivo
En `jagarcig-ntt/feedbackhub-demo`:
- **Todo cambio entra por PR,** con el check "Comprobar el PR" obligatorio y una plantilla que pregunta qué pasa si falla y cómo se apaga.
- **Cada PR se publica solo en su URL de preview** (staging).
- **Hacer merge a `main` publica solo en producción.**
- **Un alumno puede hacer fork,** abrir un PR en su copia y ver el check en verde sin configurar nada más que activar Actions.

## 3. Para quién
- **Jaime:** la demo de F1 (B1) y F3 (B3a) funciona en directo, con sus ramas de plan B.
- **Alumnos:** leen dos workflows cortos y comentados en castellano; su fork funciona sin secretos.
- **SPEC-017 (squad):** el agente de CI parte de estos workflows y de estas reglas.

## 4. Alcance
**Incluye (repo `feedbackhub-demo`):**
- `.github/workflows/comprobar-pr.yml`: en cada PR y push a ramas que no son `main`, ejecuta `npm test` sin secretos.
- `.github/workflows/desplegar.yml`:
  - en push a `main`: despliega a producción;
  - en PR del propio repo: despliega a preview y deja la URL en el PR.

  Solo se ejecuta en el repo original (`if: github.repository == 'jagarcig-ntt/feedbackhub-demo'`).
- `.github/pull_request_template.md`.
- **Ruleset de `main`:** sin push directo ni force push, PR obligatorio y check "Comprobar el PR" obligatorio.
- `demo/f3-checks`: PR con la prueba de portada rota (check en rojo, merge bloqueado).
- Abrir el PR de `demo/f1-pr-listo` con la plantilla.
- Token de Cloudflare (permiso solo de Pages) y secrets `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` en GitHub (pasos de Jaime).
- Resolver las 2 marcas `ajustar tras SPEC-012` de la teoría.
- Prueba de fork desde una cuenta de GitHub distinta (CA5 de SPEC-011).

**No incluye:**
- El squad (SPEC-017).
- El check de seguridad en el CI. Es el puente al 11-dic (SPEC-022); aquí solo se deja anunciado con un comentario en el workflow.
- Cambios en el producto, salvo que una prueba lo exija.
- Requisitos previos de los alumnos (SPEC-013).

## 5. Requisitos
- **R1. Workflows legibles.** Ficheros cortos y comentados en castellano, que se puedan leer en voz alta como el ejemplo de F3 (idea 1). Nombres visibles: "Comprobar el PR" y "Desplegar".
- **R2. Check sin secretos ni red.** Funciona igual en un fork (mapa F3 "fork-friendly").
- **R3. Despliegue solo en el repo original.** En los forks, el workflow de despliegue se salta sin fallar (no aparece en rojo).
- **R4. Preview por PR:** URL `<rama>.feedbackhub-demo.pages.dev` con las variables *Preview*, publicada como **comentario automático** en el PR. Push a la rama `staging` → alias fijo `staging-prueba` *(ver plan)*.
- **R5. Merge = producción**, sin pasos manuales. Ningún despliegue más desde el ordenador de Jaime, salvo como plan B documentado.
- **R6. Ruleset de `main`:** bloquea push directo y force push; exige PR y el check "Comprobar el PR" en verde. **Sin aprobación obligatoria** (respuesta 1).
- **R7. Plantilla de PR** con: qué cambia, por qué, cómo se ha probado, **qué pasa si falla**, **cómo se apaga** (F1, idea 3).
- **R8. Ramas de demo:** `demo/f3-checks` (check en rojo y merge bloqueado) y el PR de `demo/f1-pr-listo` abierto con la plantilla rellena.
- **R9. Token de Cloudflare con mínimo privilegio** (solo *Cloudflare Pages: Edit* sobre la cuenta). Nunca en el repo ni en el chat.
- **R10. Versiones fijadas** de las acciones y de Wrangler en los workflows, para que la demo no cambie sola antes del 21-nov.
- **R11. Coste 0:** repo público (minutos de Actions sin límite práctico).

## 6. Criterios de aceptación
- [ ] CA1. Un PR del propio repo muestra el check "Comprobar el PR" en verde y una URL de preview que funciona con la configuración de staging.
- [ ] CA2. Un merge a `main` publica en producción sin intervención manual. `/api/config` de producción responde con la versión nueva.
- [ ] CA3. Push directo a `main` → rechazado. PR con el check en rojo → botón de merge bloqueado (`demo/f3-checks`).
- [ ] CA4. Desde una cuenta de GitHub distinta: fork → *Enable workflows* → PR en el fork editando la portada desde la web → check en verde; el despliegue no se ejecuta. Cronometrado (constitution 3.5).
- [ ] CA5. Existen la plantilla de PR, el PR abierto de `demo/f1-pr-listo` y el PR de `demo/f3-checks` en rojo.
- [ ] CA6. Ningún secreto en el repo ni en los logs de Actions. El token tiene solo permiso de Pages.
- [ ] CA7. 0 marcas `ajustar tras SPEC-012` en la teoría.
- [ ] CA8. Cada fila de los mapas de SPEC-014 asignada a SPEC-012 está cubierta o justificada.

## 7. Restricciones (constitution)
- 3.2 coste 0 · 3.3 plan B probado · 3.4 nada de secretos reales · 3.5 reproducible desde cero.
- 5.5: Jaime hace commits, push, crea el token y configura el ruleset.
- 2.5: lenguaje de PM en los comentarios de los workflows.

## 8. Preguntas abiertas (respondidas por Jaime el 29-oct)
- [x] **Aprobación en los PR → opción (a):** el ruleset exige PR y check en verde, **sin aprobación obligatoria**.
  - Jaime dudaba entre (a) y (c). Se elige (a) porque con (c) cada merge de la demo pasaría por "saltarse los requisitos como administrador", justo el gesto que la sesión enseña a no normalizar.
  - Si más adelante hay un segundo revisor, se cambia el ruleset a 1 aprobación.
- [x] **URL de preview:** comentario automático del workflow en el PR (`pull-requests: write`, solo en el repo original).
- [x] **`staging-prueba`:** se mantiene como staging fijo, desplegado desde una rama `staging`.
- [x] **Segunda cuenta de GitHub:** Jaime la crea para CA4 (fork como alumno).
- [x] **Token de Cloudflare y secrets:** creados en GitHub el 29-oct (`notas.md`).

## 9. Hallazgos fuera de alcance
- Cloudflare convierte los nombres de rama con `/` en alias con `-` (`feature/texto-portada` → `feature-texto-portada.feedbackhub-demo.pages.dev`). Hay que verificarlo en el plan y reflejarlo en F3 si la URL se enseña.
- Si un alumno abre un PR **contra el repo original** (y no dentro de su fork), GitHub no le pasa los secrets. El despliegue debe saltarse sin errores. Ya está cubierto por R3, pero conviene probarlo.
