# NOTAS · SPEC-012 · Flujo Git y CI/CD

Registro de pasos en paneles (GitHub, Cloudflare) y verificaciones. **Nunca se anotan valores de claves.**

## Paso previo 🧑 · Token de Cloudflare y secrets de GitHub ✅ (29-oct)

**A. Token en Cloudflare** (dash.cloudflare.com):
1. Arriba a la derecha, icono de usuario → **My Profile** → **API Tokens** → **Create Token**.
2. Al final de la lista de plantillas → **Create Custom Token** → *Get started*.
3. **Token name:** `github-actions-feedbackhub-demo`.
4. **Permissions:** una sola fila → `Account` · `Cloudflare Pages` · `Edit`.
5. **Account Resources:** `Include` · tu cuenta.
6. (Opcional) **TTL:** hasta el 31-dic-2026, para que caduque solo tras las sesiones.
7. **Continue to summary** → **Create Token** → **copia el token**. Solo se muestra una vez; no lo pegues en el chat.

**B. Account ID:** *Workers & Pages* (menú izquierdo) → columna derecha **Account ID** → copiar. No es secreto, pero va como secret por comodidad.

**C. Secrets en GitHub** (`github.com/jagarcig-ntt/feedbackhub-demo`):
1. **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
2. `CLOUDFLARE_API_TOKEN` = el token de A.
3. `CLOUDFLARE_ACCOUNT_ID` = el ID de B.

**Comprobación:** en *Settings → Secrets and variables → Actions* aparecen los 2 nombres (los valores no se ven). El agente verifica el resto cuando se ejecute el primer workflow.

**29-oct · Hecho.** `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` están en *Repository secrets* de GitHub.
- Primer intento: se crearon como variables del proyecto en **Cloudflare** (*Variables and secrets*). Es el sitio equivocado: Actions no los lee de ahí y el token quedaba dentro de la app.
- Se repitieron en GitHub. Pendiente de confirmar que se borraron de Cloudflare.
- **Error esperado para F2/F3 (formador):** confundir "secrets de la plataforma de despliegue" (los usa la app) con "secrets de GitHub Actions" (los usa el workflow que despliega).

## T03 · Primer PR (#1, `feature/ci-cd`) · 29-oct · CA1 ✅
| Check | Resultado |
|---|---|
| Comprobar el PR (push) | ✅ 6 s |
| Comprobar el PR (pull_request) | ✅ 8 s |
| Desplegar / Publicar en Cloudflare Pages | ✅ 26 s (6 pasos en verde) |
| Comentario del bot | ✅ `https://feature-ci-cd.feedbackhub-demo.pages.dev` |
| `/api/config` de la preview | ✅ `staging`, flag on, proyecto de staging, clave publishable |

- **Alias:** `feature/ci-cd` → `feature-ci-cd` (Cloudflare cambia `/` por `-`). Va a la teoría de F3 en T10.
- **Para la sesión:** en un PR salen **dos** "Comprobar el PR" (uno por el push a la rama y otro por el PR). Es normal; si alguien pregunta, son el mismo control ejecutado por dos motivos.
- **Plantilla:** no sale en el primer PR porque GitHub la lee de `main`. Desde el merge, sí.

## T04–T05 · Primer despliegue automático a producción · 29-oct · CA2 ✅
- Merge del PR #1 → `855fcb7` → workflow "Desplegar" (push a `main`) ✅, sin comandos manuales.
- Producción: `/api/config` → `production`, flag off, `jezrt…`; `/admin` sirve el login.
- **Desde aquí no se vuelve a desplegar a mano.** `wrangler pages deploy` desde el ordenador queda solo como plan B.

## T06 · Ruleset de `main` · 29-oct · CA3 (push directo) ✅
- Ruleset `main siempre funciona`, **Active**, con target la rama por defecto. La API (`/rules/branches/main`) muestra: `deletion`, `non_fast_forward`, `pull_request` (0 aprobaciones) y `required_status_checks` (`Comprobar el PR`).
- **Evidencia:** `git push --force origin main` del dueño del repo, rechazado por GitHub:
  `GH013: Repository rule violations found` · `Cannot force-push to this branch` · `Changes must be made through a pull request`.
  Captura para la demo de F1: "ni el dueño del repo se la salta".
- **Incidencias por el camino** (útiles como errores esperados en el formador de F1):
  1. El primer intento de ruleset no llegó a guardarse (no se pulsó *Create*), y dos push de prueba entraron en `main` (`33a9ddd`, `191dee4`).
  2. Un `git push` rechazado con "non-fast-forward / behind" **no** es la regla: es Git avisando de que la copia local está por detrás. El rechazo de la regla se reconoce por `GH013` y `remote rejected`.
- ✅ 29-oct · `main` limpiada a `855fcb7` (regla desactivada un momento → force push → regla reactivada; verificado con `git ls-remote` y la API).

## T07–T08 · Ramas de demo (script para Jaime, Git Bash)
```bash
cd ~/theherocamp/feedbackhub-demo
git switch main && git pull

# 1) staging fijo → publica en staging-prueba.feedbackhub-demo.pages.dev
git switch -c staging
git push -u origin staging

# 2) F1: rebase sobre el main nuevo (las ramas demo/… no están protegidas)
git switch demo/f1-pr-listo && git rebase main && git push --force-with-lease

# 3) F4: rebase sobre el main nuevo (SIN PR: se abre en directo en la sesión)
git switch demo/f4-rompe-portada && git rebase main && git push --force-with-lease

# 4) F3: cambio que rompe la prueba de la portada
git switch -c demo/f3-checks main
sed -i 's#<h1>FeedbackHub</h1>#<h1>Feedback Hub</h1>#' public/index.html
git diff                                  # una línea: FeedbackHub → Feedback Hub
git commit -am "Separa el nombre del producto en la portada para que se lea mejor"
git push -u origin demo/f3-checks

git switch main
```
**PR a abrir en GitHub** (*Pull requests → New pull request*, base `main`):
- `demo/f1-pr-listo`: título "Cambia el subtítulo de la portada para invitar a proponer mejoras". Rellena la plantilla, que ya aparece. **No hacer merge**: es el plan B de F1.
- `demo/f3-checks`: título "Separa el nombre del producto en la portada". El check debe salir en **rojo** y el merge, bloqueado. **No cerrar**: es el plan B de F3.

## T08–T09 · Ramas y PR de demo · 29-oct
- Ramas en GitHub: `staging` (= `855fcb7`), `demo/f1-pr-listo` (`23bdb42`, rebase), `demo/f4-rompe-portada` (`3f68de2`, rebase), `demo/f3-checks` (`250ad7b`).
- `staging`: el push publicó solo `staging-prueba` (checks "Publicar" en verde; `/api/config` → `staging`) ✅.
- **PR de F3** (`demo/f3-checks`) · **CA3 (merge bloqueado) ✅**: "All checks have failed". Los 2 × "Comprobar el PR" en rojo con **Required**, y "Desplegar" también en rojo: las pruebas fallan antes de publicar, así que **no se publica ni la preview**. "Merge pull request" deshabilitado. Captura de Jaime = material para el plan B de F3.
  - Frase para la demo: la plantilla dice "Solo cambia un texto de la portada" y el check dice otra cosa.
- **PR de F1** (#2, `demo/f1-pr-listo`) · **CA5 ✅**: 3 checks en verde; comentario del bot con `https://demo-f1-pr-listo.feedbackhub-demo.pages.dev`. Esa preview sirve el subtítulo nuevo ("Cuéntanos qué mejorarías…") con `staging`, mientras producción sigue con el antiguo: el cambio se prueba **antes** de llegar a producción. Merge disponible. **No se hace merge**: es el plan B de F1.
- **Mejora para la demo:** el PR #2 tiene la plantilla a medias (sin "¿Cómo se apaga?" y con el texto de ayuda de "¿Qué pasa si falla?"). Para la sesión conviene completarla, como ejemplo de PR bien hecho frente al de F3.
- Nota técnica: la API pública de GitHub sin autenticar permite 60 consultas por hora; un bucle de verificación la agotó. Para la sesión, no depender de la API.

