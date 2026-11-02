# NOTAS · SPEC-018 · Prueba Lovable → GitHub

Observaciones con fecha y evidencia (constitution 5.4). Solo cuenta lo observado o la documentación oficial de Lovable.

**Cambio de alcance (30-oct, Jaime: "mucho lío"):** versión mínima. Un proyecto de Lovable conectado a GitHub y tres pruebas sobre ramas. Sin segunda organización de Supabase, sin Cloudflare nuevo y sin workflow de compilación, salvo que la reunión lo pida. El flujo completo se enseña con `feedbackhub-demo`.

## Montaje · 30-oct
- Proyecto de Lovable (cuenta "Jaime's Lovable") conectado a GitHub. Lovable **creó el repo** `jagarcig-ntt/feedback-hub` (no importa repos existentes, según su documentación: https://docs.lovable.dev/integrations/git-sync-overview.md).
- El repo se creó **privado**; Jaime lo pasó a **público** para poder usar el ruleset gratis y para que el agente lo inspeccione.
- *Settings → Git* de Lovable muestra: repositorio, **selector "Branch: main"**, estado "In sync with GitHub" y el botón "Check for saved Lovable work".

## Observaciones

### O1 · ¿En qué rama escribe Lovable? → **en la rama conectada, por defecto `main`, directamente** (30-oct)
Commits en `main` (API de GitHub):

| Commit | Autor | Mensaje |
|---|---|---|
| `dad00cb` | Lovable | `template: tanstack_start_ts_current-…` (plantilla del 16-oct) |
| `0a29732` | gpt-engineer-app[bot] | `Work in progress` |
| `055719c`, `ec45973` | gpt-engineer-app[bot] | `Changes` |
| `ae0baca` | gpt-engineer-app[bot] | `Creado FeedbackHub` |
| `4d56e83` | Lovable | `Add project README` |
| `eebb294` | gpt-engineer-app[bot] | `Changes` |
| `1589a42` | gpt-engineer-app[bot] | `Oscureció el fondo` |

- Cada cambio de Lovable es un commit en `main`, sin PR. Una sola rama (`main`).
- **Para F1, idea 2:** los mensajes de commit de Lovable (`Changes`, `Work in progress`) son el ejemplo real de "commit inútil", y es lo que los alumnos tienen ya en sus repos.

### O3 · ¿Hay forma de trabajar por ramas? → **SÍ** (30-oct, verificado)
- Selector **"Branch"** en *Settings → Git* de Lovable.
- `AGENTS.md`, generado por Lovable en el repo: *"Commits you push to the connected branch sync back to Lovable"*. Lovable habla de "rama conectada", no solo de `main`.
- **30-oct · Selector de rama confirmado:** *Settings → Git → Branch* despliega la lista de ramas del repo (`main` ✓ y `lovable-cambios`), con buscador y botón **"Create branch"**. Lovable deja **elegir la rama conectada** y **crear ramas** desde su interfaz.
- Primer intento: Jaime creó `lovable-cambios` en GitHub, pero la rama conectada seguía siendo `main`, así que el cambio "Cambió el título a FeedbackHub Lovable" (`e2a3743`, precedido de un `Changes` `4f8d2fb`) fue a `main`. **Error esperado** para la sesión: crear la rama en GitHub no basta; hay que **conectarla en Lovable**.
- **30-oct · Verificado:** con `lovable-cambios` conectada en Lovable, el cambio "Cambió texto del botón" (`d5ab4c7`, precedido de `Changes` `d2da033`) cayó **solo en `lovable-cambios`**. `main` siguió en `e2a3743`. Diff: `src/routes/index.tsx` (+1/−1). GitHub ofreció *Compare & pull request*.
- **Conclusión:** el **flujo A** es viable: Lovable escribe en una rama de trabajo y el cambio llega a `main` por PR.

### Hallazgo técnico · stack del proyecto de Lovable (30-oct)
- Plantilla **TanStack Start** (React 19, TypeScript, Vite 8, Tailwind), con `bun.lock`.
- `vite.config.ts` usa `@lovable.dev/vite-tanstack-config`, que incluye **nitro con Cloudflare como destino por defecto al compilar** e inyección de variables `VITE_*` (comentario del propio fichero).
- Conclusión provisional: los proyectos actuales de Lovable **no son una SPA estática**; compilan una app con servidor (SSR) pensada para Cloudflare. Desplegarlos en Cloudflare encaja, pero probablemente como **Worker** y no como Pages estático. **Sin verificar**: solo hace falta si la reunión pide el despliegue.
- `.gitignore` ya ignora `.wrangler/` y `.dev.vars`.
- `AGENTS.md` avisa: **no reescribir historial publicado** (force push, rebase, amend) en la rama conectada, porque se pierde el historial en Lovable. Es relevante para el ruleset (bloquear force push encaja) y para el squad (SPEC-017: nunca reescribir la rama conectada).

### O2 · ¿Qué pasa con `main` protegida? → **Lovable no rompe nada: desvía el cambio a una rama `lovable-sync`** (30-oct, verificado)
- Ruleset en `main` (API): `deletion`, `non_fast_forward`, `pull_request`.
- Con `main` conectada, se pidió *"Cambia el subtítulo a Lo leemos todo, de verdad"*. Resultado:
  - **`main` intacta** (`a75a463`, el merge del PR #1);
  - Lovable **creó solo la rama `lovable-sync`** con el cambio (`94cb8cc` *Changes* + `af3e035` *Cambio subtítulo…*, +1/−1 en `src/routes/index.tsx`), 2 commits por delante de `main`;
  - en Lovable aparece un **aviso naranja**: *"Some changes were saved on a sync branch"*, con los botones **Review sync** y **Dismiss**; la vista previa muestra el cambio.
- **Conclusión:** con `main` protegida, Lovable no pierde trabajo ni falla. Lleva al alumno al flujo A por sí mismo: el cambio queda en una rama y entra en `main` por PR.
- **Cierre del ciclo (30-oct):** PR #2 (`main` ← `lovable-sync`, "Able to merge", *"at least 0 approving reviews are required"*: el ruleset en acción) → merge `b0ffd5c`. GitHub ofrece borrar `lovable-sync`.
- **Pendiente (opcional):** qué hace el aviso de Lovable tras el merge y si el siguiente cambio vuelve a `lovable-sync` o crea otra rama.
### O4 · ¿Vuelven a Lovable los merges hechos por PR? → **SÍ** (30-oct, verificado)
- Antes del merge, Lovable conectado a `main` (aviso *"Branch switched on project · Now using branch: main"*) mostraba el título nuevo (estaba en `main`) y el botón **"Enviar feedback"**: el cambio de la rama aún no estaba en `main`.
- Merge del PR #1 (`lovable-cambios` → `main`) en GitHub → en el chat de Lovable aparece **"Merge pull request #1 from jagarcig-ntt/lova…"** como un paso más del historial, con su *Preview*, y la vista previa pasa a **"Enviar opinión"**.
- Lovable recoge los merges hechos en GitHub y los muestra en su propio historial.
- **Detalle útil para la sesión:** cambiar de rama en Lovable cambia la vista previa. Es otra forma de "previsualizar antes de salir".

## Fase 2 · Despliegue de un proyecto Lovable en Cloudflare (30-oct, tras el cambio de enfoque de la sesión)

**Validado en local por el agente** (clon de `feedback-hub` en `b0ffd5c`, carpeta temporal; sin publicar nada):
- `npm install` (582 paquetes; el repo trae `bun.lock`, no `package-lock.json`, así que en CI va `npm install` y no `npm ci`, o bien Bun) → `npm run build` ✅ en menos de 1 s.
- El build genera un **Cloudflare Worker**, no una web estática:
  - `.output/nitro.json` → `"preset": "cloudflare-module"`, con `deploy: "npx wrangler --cwd ./ deploy"`;
  - `.output/server/wrangler.json` (generado): Worker `jagarcig-ntt-feedback-hub`, `main: index.mjs`, `assets` en `.output/public` con binding `ASSETS`, `nodejs_compat`;
  - `.wrangler/deploy/config.json` redirige a ese `wrangler.json`, así que `npx wrangler deploy` funciona **desde la raíz del repo, sin configuración extra**.
- `npx wrangler@4.151.3 deploy --dry-run` ✅: 18 módulos, 1.064 KiB (gzip 237 KiB) más 7 assets. Solo binding `ASSETS`.
- `wrangler versions upload` admite **`--preview-alias <nombre>`**: el equivalente en Workers a las previews por rama de Pages.
- **Conclusión:** Lovable genera proyectos **listos para Cloudflare Workers**. El CI/CD de los alumnos es el patrón de `desplegar.yml` con 3 cambios:
  1. `npm install && npm run build`;
  2. producción con `wrangler deploy`;
  3. preview y staging con `wrangler versions upload --preview-alias <rama>`.

  **No usa Cloudflare Pages.**
- **2-nov · Publicación real de Jaime** (comprobado por el agente con `wrangler deployments list` y `versions list`, solo lectura):
  - Worker `jagarcig-ntt-feedback-hub` creado. Despliegue de **producción** el 2-nov a las 08:55 UTC con la versión `54d72aac…` al **100 %**.
  - **Versión de preview** subida a las 08:56 UTC con `versions upload` (`d863a643…`, *Source: version_upload*). No está desplegada: vive solo en su URL de preview.
  - **URL verificadas por el agente (2-nov):**
    - **Producción:** `https://jagarcig-ntt-feedback-hub.jagarcig.workers.dev/` → 200;
    - **Staging (alias de preview):** `https://staging-jagarcig-ntt-feedback-hub.jagarcig.workers.dev/` → 200.
  - Las dos sirven la app **renderizada en el servidor** (el HTML ya trae el formulario), con "FeedbackHub Lovable", "Lo leemos todo, de verdad" y "Enviar opinión" = `main` en `b0ffd5c`.
  - El formato del alias es `<alias>-<worker>.<subdominio>.workers.dev`. Las URL de preview vienen activas por defecto (no hizo falta tocar el panel).
  - **CA2 de SPEC-018 (parte de despliegue) ✅:** un proyecto real de Lovable se publica en Cloudflare con staging y producción separados, sin tocar su código.
  - **Pendiente:**
    - el workflow de GitHub Actions que lo automatiza (patrón de `desplegar.yml` + compilación + `wrangler deploy` / `versions upload --preview-alias`);
    - las variables de Supabase por entorno cuando el proyecto use Supabase (hoy no lo usa);
    - probar el rollback de Workers (`wrangler rollback` o panel).

