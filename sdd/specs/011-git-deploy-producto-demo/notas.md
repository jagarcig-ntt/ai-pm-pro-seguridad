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

**22-oct · Primeros despliegues (prod y `staging-prueba`):** cada entorno lee sus propias variables ✅ (riesgo principal del plan resuelto). Dos incidencias:
1. **Producción sin clave:** el secreto no estaba guardado cuando se desplegó. Se añadió y se volvió a desplegar ✅. Los secretos solo se aplican en el siguiente despliegue.
2. **INCIDENTE · claves secretas expuestas.** En los dos entornos se había configurado la **clave secreta** de Supabase (`sb_secret_…`) en lugar de la pública (`sb_publishable_…`), y `/api/config` la servía a cualquiera.
   - Se detectó comprobando solo el prefijo, sin mostrar el valor.
   - La base de datos estaba vacía (sin esquema), así que el impacto es bajo.
   - **Acciones:**
     - Jaime revoca las dos claves secretas en Supabase, pone las *publishable* en Cloudflare y vuelve a desplegar.
     - **Protección en el código** (`lib/config.js`, `esClaveSecreta`): si la variable contiene una clave secreta (`sb_secret_…` o una JWT con rol `service_role`), `/api/config` no la envía y devuelve un `errorConfig`. Probado con claves inventadas.
   - **Para la teoría:** caso real y propio para la versión formador de F2 (idea 3) y, sobre todo, para el 11-dic (familia de credenciales): "copié la clave equivocada del panel".

**Pendiente en T04:**
- [x] 22-oct · Verificado por el agente: los dos entornos sirven una clave `sb_publishable_` (distinta en cada uno), `errorConfig: null`, y la protección ya está desplegada (commit `c01e78d`).
- [ ] Jaime confirma que **revocó** las dos claves secretas en Supabase (el agente no lo puede comprobar sin el valor).
- [ ] Paso 3 🧑 (no bloquea SPEC-011; lo necesita SPEC-012): token de Cloudflare con permiso *Account → Cloudflare Pages → Edit*, y los secretos `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` en GitHub (los usa SPEC-012).
- [x] Primer despliegue a producción y a preview: `/api/config` devuelve `production` en uno y `staging` en el otro ✅.

## T05 · Esquema y permisos (28-oct)

Ficheros en el demo: `supabase/schema.sql` (idempotente) y `supabase/seed.sql` (solo staging).

**Diseño de permisos** (sin clave secreta en ningún sitio):

| Quién | `feedback` | `admins` |
|---|---|---|
| Cualquiera (`anon`) | Insertar (validado por los CHECK de la tabla) | Nada |
| Usuario con sesión (`authenticated`) no administrador | Insertar; leer → 0 filas | Nada |
| Administrador (su `user_id` está en `admins`) | Insertar y leer todo | Nada desde la API |
| Panel de Supabase / SQL Editor | Todo | Todo (así se dan de alta los administradores) |

- `is_admin()` es `security definer` con `search_path` vacío, para poder consultar `admins` sin que esa tabla sea legible desde la API.
- Los permisos de tabla se dan explícitamente (`revoke all` + `grant` mínimos). Así no se depende de los permisos por defecto que Supabase da a las tablas nuevas, que han ido cambiando.
- Se elimina `ip_address` del FeedbackHub original: no hace falta y es un dato personal.

## T05b · Pasos de Jaime en Supabase 🧑

**A. En los DOS proyectos** (`feedbackhub-staging` y `feedbackhub-prod`):
1. **SQL Editor → New query** → pega el contenido completo de `supabase/schema.sql` → **Run**. Debe terminar en "Success. No rows returned".
2. Comprobación, en una consulta nueva:
   ```sql
   select tablename, rowsecurity from pg_tables where schemaname = 'public';
   select tablename, policyname, cmd, roles from pg_policies where schemaname = 'public';
   ```
   Esperado: `feedback` y `admins` con `rowsecurity = true`, y 2 políticas sobre `feedback` (INSERT para `anon`/`authenticated` y SELECT para `authenticated`).
3. **Authentication → Users → Add user → Create new user**: tu email y una contraseña **distinta en cada entorno** (guárdala en tu gestor), con **Auto Confirm User** marcado.
4. Darlo de alta como administrador (SQL Editor; cambia el email):
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'TU-EMAIL-AQUI'
   on conflict do nothing;
   ```
5. **Authentication → Sign In / Providers → Email → desactivar "Allow new users to sign up"**. El panel solo lo usan administradores dados de alta a mano. Aunque se dejara abierto, los permisos (RLS) impedirían que un usuario nuevo viera el feedback; cerrarlo es simplemente no dejar puertas abiertas que no se usan.

**B. Solo en `feedbackhub-staging`:**
6. SQL Editor → pega `supabase/seed.sql` → **Run** (5 feedback de ejemplo).
7. Crea un **segundo usuario no administrador** (paso 3, sin el paso 4), por ejemplo con un alias de tu email. Sirve para probar en T09 que un usuario con sesión que no es administrador no ve nada (CA2).

**Verificación del agente después de T05b (28-oct)**, solo con la clave pública que sirve `/api/config`:

| Prueba (rol `anon`) | Staging | Producción |
|---|---|---|
| Leer `feedback` | 401 `permission denied` ✅ | 401 ✅ |
| Leer `admins` | 401 `permission denied` ✅ | 401 ✅ |
| Insertar feedback válido | 201 ✅ | 201 ✅ |
| Insertar feedback con `rating = 7` | 400 `feedback_rating_check` ✅ | 400 ✅ |

- Queda **una fila de prueba en cada entorno** (`Prueba T05 (borrar)`, `prueba-t05@example.com`). Se puede borrar desde el *Table Editor*.
- Incidencia: el `seed.sql` falló la primera vez con "syntax error at end of input" porque en el SQL Editor estaba **seleccionada** solo una parte del texto (Supabase ejecuta únicamente la selección). Con el fichero completo y sin selección, funcionó.
- El login del administrador y del usuario no administrador se verifica en T09, con el panel ya construido (T07).
