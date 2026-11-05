# NOTAS · SPEC-019 · Producto Lovable de la sesión

Registro de pasos y observaciones con fecha. **Nunca se anotan valores de claves.**

## Supabase en Lovable · 3-nov

### O6 · ¿Deja conectar un Supabase propio? → **SÍ, y deja elegir un proyecto existente**
- Ruta: **More → Connectors → Supabase** (*External Supabase*). El chat de Lovable no conecta por sí solo: remite a *More → Connectors* o a escribir `@`.
- Tras autorizar con OAuth, la pantalla *Supabase* de Lovable muestra **"Connected"** con el proyecto **`feedbackhub-prod`** (reutilizado de SPEC-011) y accesos directos a *Manage users*, *SQL editor*, *Edge functions*, *Manage secrets*, más *Disconnect* y *Manage organizations*.
- Con un Supabase externo conectado, las secciones del backend propio de Lovable (*Database*, *Users*, *Storage*) aparecen en gris: se gestionan en Supabase.
- **Para la sesión y los requisitos previos (SPEC-013):** el alumno conecta **su** Supabase en *More → Connectors → Supabase*, no en *Database*, que es Lovable Cloud.

### O5 · ¿Dónde guarda Lovable la URL y la clave? → **en un `.env` que SÍ sube al repo, solo con valores públicos** (3-nov)
- Con `main` protegida, Lovable dejó la conexión en **`lovable-sync`** (3 commits: `d10d2c2` *Connect to Supabase project*, `d193f1a` *Work in progress*, `033fedc` *Lovable update*). En Lovable apareció el aviso "Some changes were saved on a sync branch".
- Ficheros nuevos (+613 líneas):
  - **`.env`** (subido al repo público);
  - `src/integrations/supabase/{client.ts, client.server.ts, auth-middleware.ts, previewAuthStorage.ts, types.ts}`;
  - `supabase/config.toml` (`project_id` = `jezrtxuhxrsxrcvbkgru`, el de `feedbackhub-prod`).
- **Contenido de `.env`** (clasificado por el agente sin mostrar valores):
  - `SUPABASE_URL` / `VITE_SUPABASE_URL` → URL del proyecto;
  - `SUPABASE_PUBLISHABLE_KEY` / `VITE_SUPABASE_PUBLISHABLE_KEY` → **clave pública** (`sb_publishable_`);
  - `SUPABASE_PROJECT_ID` / `VITE_SUPABASE_PROJECT_ID`.

  **Ninguna clave secreta.** Las 3 coincidencias de "sb_secret_" en el diff son código que *comprueba* el tipo de clave, no claves.
- `client.ts` (navegador y SSR) lee `import.meta.env.VITE_SUPABASE_*` con respaldo en `process.env.SUPABASE_*`, y solo la clave pública. **El build del CI tomará los valores del `.env` del repo**, así que no hacen falta variables en GitHub.
- ⚠️ **`client.server.ts` está preparado para usar `SUPABASE_SERVICE_ROLE_KEY`** (`process.env`, solo en el servidor). Hoy no lo importa nadie y la variable no existe en ningún sitio. Si Lovable lo usara en el futuro, esa clave **nunca** debe ir al `.env`: tendría que ser un *secret* del Worker en Cloudflare.
- **Para la teoría (F2) y el 11-dic:** Lovable sube un `.env` al repo. Es aceptable **solo porque contiene valores públicos**. La regla para el PM: "en el `.env` del repo, solo lo que podrías publicar en tu web; la clave secreta, en los secrets de la plataforma". Es un caso real y muy bueno para la sesión de seguridad.

## Formulario conectado a Supabase · 3-nov
- Prompt a Lovable: usar `client.ts` con la clave pública, insertar en `public.feedback` y no crear tablas, no tocar RLS ni usar claves de servicio. Lovable lo hizo (`105889e` *Conectó formulario a feedback*, `src/routes/index.tsx` +20/−4) y lo anotó: *"insert without .select() since anon can't read rows"*. **Respeta el RLS existente.**
- **Build roto en Lovable ("Build unsuccessful").** El agente compiló `lovable-sync` en local: `Rolldown failed to resolve import "@supabase/supabase-js"`. Lovable escribió el código de Supabase **sin añadir la dependencia** al `package.json` ni al `bun.lock`; las pruebas fallaban por lo mismo.
- **Arreglo:** *Fix build (free)* en Lovable → `f1d2113` *Update dependencies* (con su `Changes` `2fc7e2e`). Comprobado por el agente: dependencia en `package.json` y `bun.lock`; `bun install --frozen-lockfile` OK; pruebas 1/1 en verde; build OK.
- **Para F3 (formador) y el 11-dic:** caso real. *"La IA escribió código que no compila; si se hubiera abierto el PR, el check rojo lo habría parado antes de producción."* Con `main` protegida y CI, un fallo así de Lovable nunca llega a los usuarios.

## PR `lovable-sync` → `main` · 3-nov
- 3 checks en verde: "Comprobar el PR" (pull_request 12 s, push 13 s) y "Desplegar / Publicar en Cloudflare Workers" (25 s).
- Preview: `https://lovable-sync-jagarcig-ntt-feedback-hub.jagarcig.workers.dev/` → 200.
- **Envío real desde la preview** (el agente, en Chrome headless, rellenando el formulario como un usuario):
  - petición a Supabase `POST /rest/v1/feedback` → **201 Created** (antes, la comprobación previa de CORS → 200);
  - la app muestra "¡Gracias, Prueba agente SPEC-019 (borrar)! Hemos recibido tu feedback";
  - 0 errores de consola.
- Queda una fila de prueba en `feedbackhub-prod` ("Prueba agente SPEC-019 (borrar)"), además de la "Prueba Lovable" del propio Lovable.
- **CA1 (parte de envío) ✅.** Falta: el merge y la misma prueba en producción. La lectura bloqueada sin sesión ya se verificó en SPEC-011 con el mismo RLS.

## Producción con Supabase · 3-nov · **CA1 ✅**
- Merge del PR #4 (`lovable-sync` → `main`, 7 commits de Lovable) → `91c68b8` → despliegue automático. Cloudflare: versión `cc193d17…` al 100 % (11:56 UTC).
- **Envío real en producción** (`https://jagarcig-ntt-feedback-hub.jagarcig.workers.dev/`, Chrome headless): `POST /rest/v1/feedback` → **201 Created**, mensaje de agradecimiento y 0 errores.
- **Recorrido completo con el producto de Lovable:** cambio en Lovable → `lovable-sync` → PR con checks → preview → merge → producción → **los datos llegan a Supabase**.
- Filas de prueba en `feedbackhub-prod` para borrar: "Prueba Lovable" y 2 × "Prueba agente SPEC-019 (borrar)". En la segunda, el mensaje salió con las tildes mal codificadas por un fallo del script de prueba, no de la app.

