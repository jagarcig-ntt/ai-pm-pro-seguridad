# PLAN · SPEC-012 · Flujo Git profesional y CI/CD (feedbackhub-demo)

*Spec: [spec.md](spec.md) (aprobada el 29-oct) · Estado del plan: borrador · 29-oct*

## 1. Enfoque
- **El primer PR se enseña a sí mismo.** Los workflows y la plantilla entran en `main` mediante un PR (`feature/ci-cd`). En un PR del propio repo, GitHub ejecuta los workflows de la rama del PR. Ese mismo PR muestra el check en verde y deja el primer comentario con la URL de preview. Es una buena captura para el plan B de F3.
- **El ruleset va después del primer check.** GitHub solo deja elegir como obligatorio un check que ya se ha ejecutado alguna vez.
- **Dos workflows, legibles antes que ingeniosos.** Pocos pasos y comentarios en castellano en cada bloque, para leerlos en voz alta (F3, idea 1). Nada de matrices, cachés ni acciones de terceros salvo las oficiales de GitHub.
- **Despliegue con el mismo comando que se ha usado a mano** (`wrangler pages deploy`), ahora ejecutado por Actions. Así el paso de "a mano" a "automático" se ve en la demo como lo mismo, pero lo hace una máquina.
- **Descartado:**
  - `cloudflare/wrangler-action`: añade una capa que hay que explicar;
  - la integración Git nativa de Cloudflare: el despliegue no se vería en GitHub, y F3 lo enseña en la pestaña *Actions*;
  - un solo workflow con todo: menos legible.

## 2. Diseño

### 2.1 `.github/workflows/comprobar-pr.yml` · "Comprobar el PR"
```yaml
# Control de calidad automático: se ejecuta en cada Pull Request y en cada push a una rama.
# No usa ningún secreto, así que funciona igual en tu fork.
name: Comprobar el PR
on:
  pull_request:
  push:
    branches-ignore: [main]
permissions:
  contents: read
jobs:
  comprobar:
    name: Comprobar el PR          # este es el nombre del check que exige la regla de main
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4          # 1. coge el código
      - uses: actions/setup-node@v4        # 2. prepara Node
        with: { node-version: 22 }
      - run: npm test                      # 3. pasa las pruebas
      # 11-dic: aquí añadiremos el check de seguridad (sesión de Seguridad, SPEC-022)
```

### 2.2 `.github/workflows/desplegar.yml` · "Desplegar"

| Evento | A dónde publica | `--branch` de wrangler |
|---|---|---|
| push a `main` | **Producción** | `main` |
| push a `staging` | Staging fijo (`staging-prueba.feedbackhub-demo.pages.dev`) | `staging-prueba` |
| PR del propio repo | Preview de ese PR | nombre de la rama del PR |
| PR desde un fork, o cualquier cosa en un fork | **Nada** (job saltado, en gris, no en rojo) | — |

- **Guardas:**
  - `if: github.repository == 'jagarcig-ntt/feedbackhub-demo'`;
  - en PR, además, `github.event.pull_request.head.repo.full_name == github.repository`.
- **Antes de publicar se pasa `npm test` otra vez.** Lo que no está en verde no se publica, ni siquiera en `main`.
- **Comando:**
  ```
  npx --yes wrangler@4.151.3 pages deploy public --project-name feedbackhub-demo --branch <...>
  ```
  - variables de entorno `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` desde los secrets;
  - versión fijada (R10).
- **Comentario en el PR:**
  - `actions/github-script@v7` lee la "alias URL" que imprime wrangler y crea o actualiza **un único** comentario: "🔎 Preview de este PR: <url> (staging)".
  - Con `permissions: pull-requests: write` solo en ese job.
- **`concurrency`** por rama, para que dos despliegues de la misma rama no se pisen.

### 2.3 `.github/pull_request_template.md`
```markdown
## Qué cambia
## Por qué
## Cómo se ha probado
- [ ] Check "Comprobar el PR" en verde
- [ ] Probado en la URL de preview
## ¿Qué pasa si falla?
## ¿Cómo se apaga? (feature flag, rollback o revert)
```

### 2.4 Ruleset de `main` (Settings → Rules → Rulesets → New branch ruleset) 🧑

| Opción | Valor |
|---|---|
| Name | `main siempre funciona` |
| Enforcement | Active |
| Target | Default branch |
| Restrict deletions | ✅ |
| Block force pushes | ✅ |
| Require a pull request before merging | ✅, **0 aprobaciones** (respuesta 1 de la spec) |
| Require status checks to pass | ✅ `Comprobar el PR` |
| Bypass list | vacía (ni siquiera el administrador) |

### 2.5 Ramas y PR de demo

| Rama / PR | Cómo | Para qué |
|---|---|---|
| `staging` | Desde `main`; un push publica el staging fijo | Staging estable para la sesión y la teoría |
| `demo/f1-pr-listo` → PR | Rebase sobre el `main` nuevo y PR abierto con la plantilla rellena | Plan B de F1 |
| `demo/f3-checks` → PR | Desde `main`: cambia el `<h1>` de la portada ("FeedbackHub" → "Feedback Hub") → la prueba de portada falla → check en rojo y merge bloqueado | Momento clave de F3 |
| `demo/f4-rompe-portada` | Rebase sobre el `main` nuevo. **Sin PR abierto**: se abre en directo en la sesión | Simulacro de F4 |

### 2.6 Teoría (marcas `ajustar tras SPEC-012`)
- **F1 (sección 6):** contenido real de la plantilla.
- **F3 (sección 6):**
  - nombres de los workflows;
  - el comentario automático con la URL;
  - el alias con guiones (`feature/x` → `feature-x`);
  - `staging-prueba` publicado desde la rama `staging`.

## 3. Ficheros

| Acción | Ruta | Nota |
|---|---|---|
| crear (demo) | `.github/workflows/comprobar-pr.yml`, `.github/workflows/desplegar.yml`, `.github/pull_request_template.md` | En la rama `feature/ci-cd` |
| modificar (demo) | `README.md` | Sección "Despliegue" y check en el fork |
| crear (demo, ramas) | `staging`, `demo/f3-checks`; rebase de `demo/f1-pr-listo` y `demo/f4-rompe-portada` | Script de Git para Jaime |
| modificar | `sesiones/2026-11-git-deploy/Teoria/familia1_*`, `familia3_*` (alumnos y formador) | 2 marcas |
| crear | `sdd/specs/012-git-deploy-flujo-git-cicd/notas.md` (ya existe), `review.md` | Verificaciones |

## 4. Riesgos y plan B

| Riesgo | Prob. | Mitigación / plan B |
|---|---|---|
| El token no tiene permisos suficientes o la cuenta no coincide | media | El primer PR (`feature/ci-cd`) lo detecta antes de tocar `main`. Plan B: revisar el permiso *Account → Cloudflare Pages → Edit* o hacer *Roll* del token |
| Wrangler cambia el formato de la línea "alias URL" | baja | Versión fijada. Si no se encuentra el alias, el comentario usa la URL única del despliegue |
| El ruleset bloquea a Jaime un arreglo urgente el día de la sesión | baja | Es exactamente lo que se enseña. El plan B es el **rollback** en Cloudflare (no pasa por Git) o desactivar el ruleset unos minutos (Enforcement → Disabled) |
| Las previews de cada PR consumen builds del plan gratuito | baja | Direct Upload no hace build en Cloudflare. Unos 20 despliegues por día de ensayo, muy por debajo del límite (se verifica en SPEC-013) |
| En el fork del alumno, "Desplegar" aparece en rojo | media | Guardas a nivel de job → "skipped". Se verifica en CA4 con la segunda cuenta |
| Rebase de las ramas de demo con conflictos | baja | Solo cambian una línea cada una. El script lo hace paso a paso |
| GitHub Actions caído el día 21 | baja | Plan B de F3: PR `demo/f3-checks` y capturas ya ejecutadas; despliegue manual con wrangler documentado |

## 5. Verificación

| Criterio | Cómo |
|---|---|
| CA1 | PR `feature/ci-cd`: check verde + comentario con la URL, y `/api/config` de esa URL → `staging` |
| CA2 | Merge de `feature/ci-cd` → el job de producción en verde → `/api/config` y `/` de producción sirven la versión nueva (comprobación del contenido, lección de T14) |
| CA3 | `git push` directo a `main` → rechazado por el ruleset. PR `demo/f3-checks` → rojo y "Merging is blocked" |
| CA4 | Segunda cuenta: fork → Enable workflows → editar la portada desde la web → PR en el fork → check verde y "Desplegar" saltado. Cronometrado |
| CA5 | Plantilla visible al abrir un PR; PR de F1 abierto; PR de F3 en rojo |
| CA6 | Revisar los logs de Actions: secrets enmascarados (`***`). El token tiene un único permiso |
| CA7 | `grep "ajustar tras SPEC-012"` en `Teoria/` → 0 |
| CA8 | Tabla de cobertura de las 9 filas de los mapas en `review.md` |

## 6. Tensiones con la constitution
- **3.4:** los secrets solo se usan en el job de despliegue y nunca en `pull_request` de forks.
- **3.3 Plan B:** está documentado (rollback, despliegue manual, PR ya ejecutados).
- **2.5 Lenguaje de PM:** los YAML llevan comentarios en castellano, pero siguen siendo YAML. La teoría (F3) ya dice "no hay que memorizarlo, solo saber leerlo".
- **R10 "versiones fijadas":** se fijan las versiones mayores de las acciones oficiales (`@v4` y `@v7`) y la exacta de Wrangler. Fijar por SHA sería más estricto, pero hace el YAML ilegible para la audiencia. Decisión consciente.
