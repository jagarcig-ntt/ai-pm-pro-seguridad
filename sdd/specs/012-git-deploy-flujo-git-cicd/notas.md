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
