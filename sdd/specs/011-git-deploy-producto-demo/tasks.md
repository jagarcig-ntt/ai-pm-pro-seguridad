# TASKS · SPEC-011 · Producto demo de la sesión Git/Deploy

*Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md) (aprobado el 22-oct)*

Reglas:
- Cada tarea cabe en una sesión de trabajo (≤ 2h) y produce algo revisable.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.
- Al cerrar una tarea, el agente propone el mensaje de commit y Jaime hace el commit.
- 🧑 = paso de Jaime (cuentas, paneles, claves, commits y push). Ninguna clave pasa por el chat ni se escribe en ningún repo.

**Repos:**
- `D/` = repo del demo, `C:\Users\jagarcig\theherocamp\feedbackhub-demo\` (`jagarcig-ntt/feedbackhub-demo`).
- Las rutas sin prefijo son de este repo.
- Los commits del demo llevan también el prefijo `[SPEC-011] Tnn`.
- **El historial de `main` del demo es material de la sesión (F1 idea 2):** un commit por tarea, con mensaje con sentido.

**Datos no secretos** (las URLs de proyecto son públicas):
- `feedbackhub-staging` → `https://dhmaurnjjfgdcacvfgmt.supabase.co`
- `feedbackhub-prod` → `https://jezrtxuhxrsxrcvbkgru.supabase.co`

**Orden:**
1. Lo más arriesgado primero: un esqueleto mínimo desplegado en Cloudflare, para verificar las variables por entorno, el uso de `.env` o `.dev.vars` y Direct Upload antes de construir nada encima.
2. Después, base de datos, API, frontend y pruebas: lo que desbloquea SPEC-012 y SPEC-017 antes del 2-nov.
3. Al final, material de la demo y verificación (hasta el 9-nov).

| ID | Tarea | Ficheros | Depende | Estado |
|---|---|---|---|---|
| T01 🧑 | Crear `jagarcig-ntt/feedbackhub-demo` (público) y clonarlo en `D/`. *Resultado: hecho el 22-oct; se eliminó un `git init` vacío que había quedado en la carpeta de fuera.* | — | — | ☑ |
| T02 🧑 | Crear en Supabase (login con GitHub, plan Free, misma organización) `feedbackhub-staging` y `feedbackhub-prod`. *Resultado: hecho el 22-oct; URLs arriba.* | — | — | ☑ |
| T03 | **Esqueleto mínimo, sin dependencias:**<br>• `package.json` (solo scripts: `dev` = `npx wrangler pages dev public`, `test` = `node --test`)<br>• `.gitignore` (`.env`, `.dev.vars`, `node_modules/`, `.wrangler/`)<br>• `.dev.vars.example`<br>• `functions/_lib/config.js` (lectura de variables → objeto de configuración, función pura)<br>• `functions/api/health.js` y `functions/api/config.js`<br>• `public/index.html` provisional, que pinta `APP_ENV`<br>Probar en local. **Verificar si Wrangler lee `.env`** además de `.dev.vars` (riesgo del plan) y anotarlo. *Resultado (22-oct): Wrangler 4.151.3 **lee `.env`** (probado con valores ficticios), así que se usa `.env` / `.env.example` como dice la teoría y no `.dev.vars`. La lógica común va en `lib/` en lugar de `functions/_lib/`, para que no se convierta en una ruta. En local, `/api/config`, `/api/health` y `/` responden 200.* | `D/package.json`, `D/.gitignore`, `D/.env.example`, `D/lib/config.js`, `D/functions/api/health.js`, `D/functions/api/config.js`, `D/public/index.html` | T01 | ☑ |
| T04 🧑 | **Cloudflare Pages (Direct Upload).** Con las instrucciones paso a paso que prepara el agente:<br>1. `npx wrangler login`.<br>2. `npx wrangler pages project create feedbackhub-demo --production-branch main`.<br>3. Variables de *Production* y *Preview* en el panel (plan 2.3), copiando URL y clave pública de cada proyecto de Supabase directamente al panel.<br>4. Primer despliegue a producción (`npx wrangler pages deploy public --branch main`) y otro a preview (`--branch staging-prueba`).<br>**Verificación:** `/api/config` devuelve `production` en uno y `staging` en el otro. Resultado anotado; si falla, se aplica el plan B del plan (riesgo 2). | — (Cloudflare) · resultado en `sdd/specs/011-git-deploy-producto-demo/notas.md` | T03 | ☐ |
| T05 | **Esquema y permisos.** `supabase/schema.sql`: tablas `feedback` y `admins`, RLS (insert público validado, select solo administradores, `admins` no legible). `supabase/seed.sql`: datos de ejemplo para staging. Instrucciones para Jaime: aplicar el esquema en los 2 proyectos, aplicar la semilla solo en staging y crear un usuario administrador por entorno. | `D/supabase/schema.sql`, `D/supabase/seed.sql`, `sdd/specs/011-git-deploy-producto-demo/notas.md` | T02 | ☐ |
| T05b 🧑 | Aplicar `schema.sql` en los 2 proyectos y `seed.sql` en staging (SQL Editor). Crear el usuario administrador (Authentication → Add user) e insertar su `user_id` en `admins`, en cada entorno. | — (Supabase) | T05 | ☐ |
| T06 [P] | **API:**<br>• `functions/_lib/feedback.js` (validación pura)<br>• `functions/api/feedback.js` (POST → inserta vía PostgREST con la clave pública)<br>• `functions/api/admin/feedback.js` (GET con el token del usuario; 401 sin token, lista filtrada por RLS)<br>Sin `service_role`. Errores en JSON sin datos personales. | `D/functions/_lib/feedback.js`, `D/functions/api/feedback.js`, `D/functions/api/admin/feedback.js` | T03, T05 | ☐ |
| T07 [P] | **Frontend** a partir del de FeedbackHub (solo estructura y estilo):<br>• `public/index.html` + `public/app.js`: formulario, campo "valoración 1–5" visible solo con `FEATURE_VALORACION`, banner STAGING si `APP_ENV != production`<br>• `public/admin.html` + `public/admin.js`: login email/contraseña con `supabase-js` desde CDN (versión fijada) y lista de feedback<br>• `public/styles.css`<br>La configuración llega de `/api/config`, nunca escrita en el código. | `D/public/index.html`, `D/public/app.js`, `D/public/admin.html`, `D/public/admin.js`, `D/public/styles.css` | T03 | ☐ |
| T08 | **Pruebas sin secretos ni red** (`node --test`):<br>• `tests/portada.test.js`: la portada contiene el título del producto; es la que se rompe en la demo de F3<br>• `tests/feedback.test.js`: validación del feedback y lectura de flags<br>`npm test` en verde. | `D/tests/portada.test.js`, `D/tests/feedback.test.js` | T06, T07 | ☐ |
| T09 | **Verificación funcional en los 3 entornos** (CA2, CA3, CA4). Despliegue manual a preview y a producción. Comprobar:<br>• enviar feedback;<br>• login de administrador frente a no administrador;<br>• separación de datos staging/prod;<br>• flag y banner por entorno.<br>Capturas y resultado en `notas.md`. | `sdd/specs/011-git-deploy-producto-demo/notas.md` | T04, T05b, T08 | ☐ |
| T10 [P] | **README del demo y checklist:**<br>• `README.md` para alumnos: qué es, arquitectura en 5 líneas, convención de ramas, cómo hacer fork, activar Actions en el fork y levantarlo en local<br>• `docs/checklist-go-live.md`: los 8 puntos de F4 | `D/README.md`, `D/docs/checklist-go-live.md` | T09 | ☐ |
| T11 | **Ramas de demo** (R11):<br>• `demo/commits-malos`: los mismos cambios de un tramo de `main` con mensajes inútiles<br>• `demo/f1-pr-listo`: cambio del texto de la portada<br>• `demo/f4-rompe-portada`: error visible en la portada<br>`demo/f3-checks` se crea en SPEC-012, cuando exista el workflow. El agente prepara los cambios; Jaime crea las ramas y hace push. | `D/` (ramas) | T10 | ☐ |
| T12 [P] | **Enlace desde este repo:** `sesiones/2026-11-git-deploy/Lab/README.md` con el enlace a `jagarcig-ntt/feedbackhub-demo`, la arquitectura y las URLs públicas de producción y staging. | `sesiones/2026-11-git-deploy/Lab/README.md` | T09 | ☐ |
| T13 [P] | **Resolver las 8 marcas `ajustar tras SPEC-0xx`** de la teoría (sección 6 de F1–F4, alumnos y formador) con los nombres reales: Cloudflare Pages, nombres de variables, `.env` o `.dev.vars` según T03, ramas `demo/…` (CA8). | `sesiones/2026-11-git-deploy/Teoria/*_alumnos.md`, `sesiones/2026-11-git-deploy/Teoria/Formador/*_profundo.md` | T09 | ☐ |
| T14 🧑 | **Probar el rollback** desde el panel de Cloudflare (Deployments → versión anterior → *Rollback*), cronometrado. Necesita al menos 2 despliegues a producción. Anotar el tiempo y si funciona con Direct Upload (riesgo 3 del plan). | `sdd/specs/011-git-deploy-producto-demo/notas.md` | T09 | ☐ |
| T15 | **Verificación y `/sdd-review 011`:**<br>• CA1: búsqueda de patrones de claves en todo el historial del demo<br>• CA6: ramas y rollback<br>• CA7: tabla de cobertura de los mapas de SPEC-014<br>• CA8: `grep` de las marcas<br>• CA9: coste 0, con capturas de facturación de Jaime<br>• CA5 (fork limpio con check en verde) queda **pendiente de SPEC-012**, que crea el workflow; se marca así en la revisión. | `sdd/specs/011-git-deploy-producto-demo/review.md` | T11–T14 | ☐ |

Estados: ☐ pendiente · ◐ en curso · ☑ hecha · ✕ descartada

**Ruta crítica:** T03 → T04 🧑 → T09 → T15. En paralelo: T05 → T05b 🧑 y T06/T07 → T08.

**Fechas:** T03–T09 antes del **2-nov** (desbloquean SPEC-012 y SPEC-017). T10–T15 antes del **9-nov**.

## Commits propuestos
<!-- El agente añade aquí el mensaje sugerido al cerrar cada tarea -->
- T01, T02 → (pasos de Jaime en GitHub y Supabase, sin commit)
- T03 (repo demo) → `[SPEC-011] T03 Esqueleto: configuración por entorno vía /api/config y health check`
