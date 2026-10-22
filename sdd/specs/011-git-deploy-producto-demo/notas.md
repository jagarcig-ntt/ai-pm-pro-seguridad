# NOTAS · SPEC-011 · Producto demo

Registro de lo hecho fuera de los repos (paneles de GitHub, Supabase y Cloudflare) y de las verificaciones. **Nunca se anotan valores de claves.**

## Datos públicos del demo

| Pieza | Valor |
|---|---|
| Repo | https://github.com/jagarcig-ntt/feedbackhub-demo (público) |
| Cloudflare Pages | proyecto `feedbackhub-demo` (Direct Upload, rama de producción `main`) → https://feedbackhub-demo.pages.dev/ |
| Supabase staging | `feedbackhub-staging` → `https://dhmaurnjjfgdcacvfgmt.supabase.co` |
| Supabase producción | `feedbackhub-prod` → `https://jezrtxuhxrsxrcvbkgru.supabase.co` |

## T03 · Esqueleto (22-oct)
- Wrangler 4.151.3 (vía `npx`, sin instalar). `npx wrangler pages dev public` lee **`.env`**: comprobado con valores ficticios que `/api/config` los devuelve. **Decisión:** `.env` y `.env.example`, igual que en la teoría F2. `.dev.vars` sigue en `.gitignore` por si acaso.
- La lógica común está en `lib/` (no en `functions/_lib/`) para que Pages no la publique como ruta.
- Observación del entorno de Jaime: Node avisa de `NODE_TLS_REJECT_UNAUTHORIZED=0` (desactiva la verificación TLS, probablemente por el proxy corporativo). No afecta al demo, pero conviene no tenerlo activo fuera de la red de la empresa.

## T04 · Cloudflare Pages (en curso)

**22-oct · Proyecto creado** con `npx wrangler pages project create feedbackhub-demo --production-branch main`.

**22-oct · Variables configuradas en el panel** (*Settings → Variables and secrets*), los mismos nombres en los dos entornos:

| Variable | Tipo | Production | Preview (staging) |
|---|---|---|---|
| `APP_ENV` | Text | `production` | `staging` |
| `FEATURE_VALORACION` | Text | `false` | `true` |
| `SUPABASE_URL` | Text | URL de `feedbackhub-prod` | URL de `feedbackhub-staging` |
| `SUPABASE_ANON_KEY` | Secret | clave pública de prod | clave pública de staging |

- **Primer intento:** las 8 variables se pusieron en un solo entorno, con sufijos `_PROD` y `_STG`. Se corrigió a los mismos nombres en ambos entornos, separados por el selector *Production / Preview*.
- **Para la versión formador de F2:** es un error de comprensión muy habitual ("una variable por entorno" en lugar de "la misma variable con distinto valor por entorno"). Añadirlo a los errores esperados de la idea 2 al resolver las marcas (T13).
- **No conectar "Git repository" en el panel.** El despliegue lo hace GitHub Actions con Direct Upload (plan 2.4). Tampoco se añade `wrangler.toml` con variables: el panel queda como única fuente, para no tener dos sitios donde se configura lo mismo.

**Pendiente en T04:**
- [ ] Paso 3 🧑: token de Cloudflare con permiso *Account → Cloudflare Pages → Edit*, y los secretos `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` en GitHub (los usa SPEC-012).
- [ ] Primer despliegue a producción y a preview, cuando exista T03. Verificar que `/api/config` devuelve `production` en uno y `staging` en el otro.
