# NOTAS · SPEC-019 · Producto Lovable de la sesión

Registro de pasos y observaciones con fecha. **Nunca se anotan valores de claves.**

## Supabase en Lovable · 3-nov

### O6 · ¿Deja conectar un Supabase propio? → **SÍ, y deja elegir un proyecto existente**
- Ruta: **More → Connectors → Supabase** (*External Supabase*). El chat de Lovable no conecta por sí solo: remite a *More → Connectors* o a escribir `@`.
- Tras autorizar con OAuth, la pantalla *Supabase* de Lovable muestra **"Connected"** con el proyecto **`feedbackhub-prod`** (reutilizado del demo anterior) y accesos directos a *Manage users*, *SQL editor*, *Edge functions*, *Manage secrets*, más *Disconnect* y *Manage organizations*.
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
- **CA1 (parte de envío) ✅.** Falta: el merge y la misma prueba en producción. La lectura bloqueada sin sesión ya se verificó en el demo anterior con el mismo RLS.

## Producción con Supabase · 3-nov · **CA1 ✅**
- Merge del PR #4 (`lovable-sync` → `main`, 7 commits de Lovable) → `91c68b8` → despliegue automático. Cloudflare: versión `cc193d17…` al 100 % (11:56 UTC).
- **Envío real en producción** (`https://jagarcig-ntt-feedback-hub.jagarcig.workers.dev/`, Chrome headless): `POST /rest/v1/feedback` → **201 Created**, mensaje de agradecimiento y 0 errores.
- **Recorrido completo con el producto de Lovable:** cambio en Lovable → `lovable-sync` → PR con checks → preview → merge → producción → **los datos llegan a Supabase**.
- Filas de prueba en `feedbackhub-prod` para borrar: "Prueba Lovable" y 2 × "Prueba agente SPEC-019 (borrar)". En la segunda, el mensaje salió con las tildes mal codificadas por un fallo del script de prueba, no de la app.

## Rescatado del demo anterior (borrado el 5-nov)
- **Caso real para F2 (formador) y el 11-dic:** el 22-oct se configuró por error la clave secreta de Supabase (`sb_secret_…`) en lugar de la pública (`sb_publishable_…`), y el demo la servía a cualquiera. Se detectó comprobando solo el prefijo, se revocó y se cambió por la pública. La base de datos estaba vacía, así que el impacto fue bajo. Mensaje: "copié la clave equivocada del panel".
- **Los secretos solo se aplican en el siguiente despliegue.**
- **En un PR salen dos "Comprobar el PR"** (uno por el push y otro por el PR). Es normal.
- **El detalle completo** sigue en git: `git show 07702b3:sdd/specs/011-git-deploy-producto-demo/notas.md` y `…/012-git-deploy-flujo-git-cicd/notas.md`.

## Ensayo solo con navegador · bloque A · 5-nov
**13 minutos, sin atascos**, con una cuenta nueva de Cloudflare (Jaime conoce el flujo; un alumno tardará más). Repo `jagarcig-ntt/notas-al-d-a`, público.

Comprobado por el agente en el repo y en las capturas:
- **Cloudflare nuevo:** el subdominio `workers.dev` ya aparece en *Workers & Pages*, sin pedir elegirlo.
- **Supabase:** se creó el proyecto `notas-al-d-a` desde *Connect project → Create Project*, en lugar de `feedbackhub-staging`. Es más realista. Con Supabase conectado, *Database*, *Users* y *Storage* salen en gris.
- **Tabla desde el chat:** Lovable enseña el SQL en *Modify Supabase database* (*Allow* / *Skip*), la crea tras aprobar y guarda la migración en `supabase/migrations/`. Cubre parte de CA7, en `main`: falta verlo en una rama.
- **`.env` en el repo:** las 6 variables habituales, con clave `sb_publishable_`. Ninguna clave secreta en el código.
- **El plan gratuito de Lovable basta para todo el bloque.**

Para la guía (SPEC-013):
- **Nombre del proyecto sin tildes:** "Notas al Día" generó el repo `notas-al-d-a`. No rompe nada, pero queda feo y no se debe renombrar después.
- **Lovable empezó guardando en el navegador:** sin pedir backend usó `localStorage`. Los datos solo existen en Supabase si se conecta y se pide. Mensaje para Jose: conectar antes de crear tablas.
- **Token:** se creó sin caducidad. En la guía, decidir cuál se recomienda.
- **Capturas:** en la de *Workers & Pages* se ve el Account ID. No es una clave, pero se tapa en la guía.
- **Commits reales para F1:** `Changes`, `Work in progress`, `Lovable update`, junto a otros útiles como `Guardó notas en tabla pública`.

El aviso de `feedbackhub-prod` en *Connect project* indica que ese proyecto ya está en uso (Jaime, 5-nov). Sigue respondiendo (auth 200) y la lectura sin sesión sigue bloqueada (401). Lovable también menciona "dos avisos de seguridad" de Supabase: revisarlos para el 11-dic.

## Ensayo solo con navegador · bloque B · 5-nov
**Workflows desde Lovable: funciona.** Se pidió a Lovable crear los dos ficheros con su contenido exacto. Llegaron a `main` en GitHub, idénticos byte a byte a los originales (comprobado por hash). Lovable sí puede escribir en `.github/workflows`, así que el alumno quizá no necesite tocar GitHub para esto.

**Worker en cuenta nueva: funciona.** La Action "Desplegar" (run `42029907392`, 38 s, en verde) creó `jagarcig-ntt-notas-al-d-a` sin ninguna publicación previa desde local.

**⚠️ Pero la web daba 500, con todo en verde.** Es el hallazgo más importante del ensayo:
- **Causa:** esta app lee Supabase desde el **servidor** (`createServerFn`, `process.env.SUPABASE_URL`), y el Worker no tiene esas variables. `feedback-hub` no falló porque su formulario llama a Supabase desde el navegador, con las variables `VITE_*` del build.
- **Reproducido en local** (`wrangler dev`, sin publicar): sin variables, 500 con "La conexión con Supabase no está configurada"; con ellas, 200 y la app carga. Ojo: `wrangler dev` carga el `.env` por su cuenta, y hubo que quitarlo de la copia para ver el fallo.
- **Coincide con la documentación:** las variables del servidor *"are not in the repository"* como variables del host (https://docs.lovable.dev/tips-tricks/external-deployment-hosting).
- **Arreglo en `desplegar.yml`:** lee `SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY` del `.env` del repo y las pasa con `--var` a `wrangler deploy` y a `versions upload`. Son valores públicos y no pide nada al alumno. Probado con `--dry-run` en los dos modos: las dos variables aparecen, con el valor oculto en los logs. El código de salida 1 del dry-run es esperado: no hay URL que leer.

**Consecuencias:**
- **Para F4:** caso real y propio de "verde no significa que funcione": pruebas, build y despliegue en verde, y web caída.
- **`feedback-hub`** debe llevar el mismo workflow, para que todos usen uno solo (T10).
- **Riesgo que sigue abierto:** si la app de un alumno usa `SUPABASE_SERVICE_ROLE_KEY` en el servidor, esa clave es secreta y este arreglo no la cubre. La compilación previa de los 18 repos debe buscar `client.server`.
- **Propuesta pendiente:** añadir al workflow una comprobación final de que la web responde, para que un 500 salga en rojo.

**Arreglo confirmado en la web real (5-nov).** Con el `--var` en el workflow, la publicación terminó en verde, la web pasó de 500 a 200 y, en Chrome headless, una nota creada en producción sigue ahí tras recargar (0 errores). Queda una fila "Prueba agente ensayo…" en `notas_ensayo`.

**Paso 9 añadido y probado:** el workflow comprueba que la web responde y sale en rojo si da 5xx o no contesta. Probado en local con web buena, con 500 y sin respuesta; en el repo, run `42053327046` en verde. Se usa después del comentario de la preview, para que la URL se publique también si falla.

**Lovable y la fidelidad:** 3 de 4 pegados fueron idénticos byte a byte. El último llegó con otra codificación de fin de línea, sin ninguna diferencia de contenido y sin efecto en la ejecución. La guía debe pedir comprobar que el workflow funciona, no que sea idéntico.

## Ensayo solo con navegador · bloque C · 5-nov
**13 minutos.** Comprobado por el agente con la API de GitHub y en las URL, por contenido:
- **Ruleset activo** sobre la rama por defecto: `deletion`, `non_fast_forward`, `pull_request` y `required_status_checks` con `Comprobar el PR`, sin excepciones.
- **PR #1** (`lovable-sync` → `main`): checks en verde, comentario con la preview y merge.
- **Preview:** `https://lovable-sync-jagarcig-ntt-notas-al-d-a.jaimegarcia1991.workers.dev` → 200, con el título nuevo. Confirma el arreglo de las variables también en `versions upload`.
- **Producción:** 200, con el título nuevo, 38 s después del merge.
- **Duración de las Actions:** unos 40 s cada publicación y unos 20 s cada comprobación.
- **Nombres largos:** el alias más el Worker caben con este repo. Sigue sin saberse el límite con nombres más largos.

**Error real, muy útil para la sesión:** el ruleset se creó sin rama objetivo, y GitHub avisó de que no protegía nada. Por eso el primer cambio de título entró directo en `main` (`735ec07`, publicado a las 15:22) sin pasar por PR. Con la rama añadida, el segundo cambio fue a `lovable-sync`. En *Enforcement status*, el valor por defecto es *Disabled*. Son los dos errores que debe prevenir la guía.

**Segundo cambio tras el merge (Jaime, 5-nov):** `lovable-sync` no se borra y Lovable la reutiliza. Vuelve a salir *"Some changes were saved on a sync branch"* y, en *Settings → Git*, *"Lovable is 2 commits ahead of GitHub"*.
- **El PR no se crea solo:** ni Lovable ni GitHub lo abren. El alumno debe abrirlo cada vez, de `lovable-sync` a `main`.
- **Aviso de Lovable, importante para la guía:** *"Merge that branch into "main" in your Git provider using a merge commit. Do not squash or rebase: drafts need the original commits."* El botón del PR debe ser **Create a merge commit**, nunca *Squash* ni *Rebase*.

**Cierre del ensayo (CA9, 5-nov):** PR #2 fusionado con merge commit (`5020b36`), publicación en verde, web 200 y Lovable en "In sync" (Jaime). `lovable-sync` se reutiliza en cada cambio. Tiempos: A 13 min y C 13 min; B sin dato representativo por el diagnóstico del 500. Falta repetirlo con alguien que no conozca el flujo (CA3 de SPEC-013).

## CA7 · Cambio de tabla desde una rama · 7-nov
Con `main` protegida, se pidió a Lovable añadir una columna `categoria` a `notas_ensayo`, y Jaime aprobó el SQL. Comprobado por el agente **sin abrir ningún PR**:
- **En el repo,** el cambio solo está en `lovable-sync`: commit `192bb53` con la migración `ALTER TABLE public.notas_ensayo ADD COLUMN categoria text;` y los tipos actualizados. `main` no lo tiene y no hay PR abierto.
- **En Supabase,** la columna **ya existe**: `select id,categoria` con la clave pública devuelve 200 y `categoria: null`.
- **Conclusión, CA7 ✅:** los cambios de base de datos de Lovable se aplican al aprobar el SQL, **antes del PR y del merge**. La rama protege el código, no los datos. Con una base de datos compartida, el cambio afecta a producción en el momento.

**Para F2 y la guía de la sesión:** un cambio de tabla no espera al PR. Esta columna opcional no rompe nada, pero borrar o renombrar una columna rompería producción al instante. Por eso, antes de pulsar *Allow*, hay que leer el SQL, y nunca aprobar un `DROP` o un `RENAME` sin pensarlo. Encaja con el caso Replit y con "No delegues" de F2.

## CA8 · Login · 8-nov · ⚠️ producción rota antes del merge
Se pidió a Lovable registro por email y notas privadas. El cambio de código está en `lovable-sync`: 15 ficheros y la migración, sin PR. El SQL añade `user_id`, **borra las políticas públicas** (`DROP POLICY "Anyone can read/add notes"`), quita los permisos a `anon` y crea políticas por usuario.

**Comprobado por el agente antes de cualquier merge:**
- Sin sesión, leer `notas_ensayo` devuelve 401 (`42501`, sin permisos): las políticas nuevas ya están aplicadas.
- **La web de producción da 500.** Su código, el de `main`, sigue leyendo las notas sin sesión, y la base de datos ya no lo permite.

**Es el riesgo de CA7 hecho realidad:** al aprobar el SQL, producción se rompió aunque el PR no existía. Ningún check lo detectó, porque no hubo despliegue. Caso propio para F2 ("la rama protege el código, no los datos") y para F4 (un cambio que no se puede deshacer con un rollback del Worker: volver a la versión anterior no devuelve las políticas).

**Lección para alumnos y para Jose:** cuando Lovable proponga borrar políticas o permisos (`DROP POLICY`, `REVOKE`), hay que hacer el PR y el merge inmediatamente después de aprobar, o producción queda rota entre medias.

**Login en la vista previa de Lovable: funciona** (Jaime, 8-nov): registro, correo de confirmación de Supabase e inicio de sesión. Las notas anteriores ya no se ven, porque no tienen `user_id`.

**URL de autenticación en Supabase (captura de Jaime, 8-nov):** Lovable configuró solo, en *Authentication → URL Configuration*, cinco URL suyas (`*.lovableproject.com` y `*.lovable.app`). La **Site URL quedó en `http://localhost:3000`** y **no incluye la URL de Cloudflare**. El código registra con `emailRedirectTo: window.location.origin`, pero Supabase solo respeta las URL de la lista. Desde producción, el enlace del correo llevaría a `localhost`.
- **Arreglo:** Site URL = URL del Worker, más dos Redirect URLs: `https://<worker>.<subdominio>.workers.dev/**` y `https://*-<worker>.<subdominio>.workers.dev/**` para las previews.
- **Para la sesión:** paso de P1 para quien tenga login, porque la URL de producción no existe hasta P1. No puede ir en la guía de casa.

**CA8 ✅ (8-nov).** Jaime añadió la URL del Worker en Supabase e hizo el merge del PR #4 (`362e7bb`), con la publicación en verde. Comprobado por el agente: producción `/` → 200 y `/auth` → 200, con "Iniciar sesión" y "Crear cuenta". Sin sesión, leer y escribir en `notas_ensayo` → 401. Jaime confirma que todo funciona en producción.

## Plantilla, checklist y README por prompts de Lovable · 8-nov
Por error se hicieron en el repo del ensayo (`notas-al-d-a`, PR #5) en lugar de en `feedback-hub`. Sirve como prueba del camino del alumno:
- `desplegar.yml` llegó idéntico.
- La plantilla de PR, la checklist y la sección del README llegaron **con líneas en blanco de más y sin ningún cambio de contenido**: el resultado en pantalla es el mismo.
- El PR #5 todavía no muestra la plantilla, porque GitHub la lee de `main`. Saldrá en el siguiente PR.
- **`feedback-hub`:** el ruleset ya tiene el check obligatorio `Comprobar el PR` y solo admite **merge** (comprobado por la API). Faltan los 4 ficheros.

## T11 en `feedback-hub` · 9-nov · CA5 ✅ (parte de ficheros)
PR #5 fusionado (`bf146ed`) y publicación en verde. Comprobado por el agente:
- `desplegar.yml`, la plantilla de PR, `docs/checklist-go-live.md` y la sección del README están en `main`, con el mismo contenido (salvo líneas en blanco).
- El ruleset exige `Comprobar el PR` y solo admite merge (CA3, parte del ruleset).
- **Producción con el workflow nuevo:** web 200 y envío real del formulario en Chrome headless → `POST /rest/v1/feedback` **201**, mensaje de agradecimiento y 0 errores. Queda otra fila "Prueba agente SPEC-019 (borrar)" en `feedbackhub-prod`.
- **Falta de CA5:** `Lab/README.md` ya apunta a `feedback-hub`, pero no enlaza la checklist.

## T12 · Ramas de demo · 9-nov
| Rama | Cambio | Qué enseña | Comprobado en local (copia de `main`) |
|---|---|---|---|
| `demo/f3-checks` | `src/routes/index.tsx` importa `@/components/no-existe` | F3: el check en rojo bloquea el merge y no se publica la preview. Es el mismo tipo de error que Lovable cometió el 3-nov | Prueba y compilación fallan: *"Failed to resolve import "@/components/no-existe""* |
| `demo/f4-rompe-produccion` | El formulario escribe en `feedbacks` en lugar de `feedback` | F4: todo sale en verde y la web carga, pero el envío falla. Ni la comprobación final del workflow lo ve | Prueba y compilación en verde. El fallo al enviar se verifica en T14 |

**Comandos para Jaime** (Git Bash en VS Code). Crean las dos ramas desde `main` sin tocarlo:

```bash
cd ~/theherocamp/feedback-hub
git fetch origin

git switch -C demo/f3-checks origin/main
sed -i 's#^import { supabase } from "@/integrations/supabase/client";#&\nimport "@/components/no-existe";#' src/routes/index.tsx
git commit -am "Demo F3: importa un componente que no existe"
git push -u origin demo/f3-checks

git switch -C demo/f4-rompe-produccion origin/main
sed -i 's#from("feedback")#from("feedbacks")#' src/routes/index.tsx
git commit -am "Demo F4: el formulario escribe en una tabla que no existe"
git push -u origin demo/f4-rompe-produccion

git switch main
```

**Para la sesión:** tras el ensayo de F4 (merge, rollback y revert), la rama queda gastada. El día 21 se recrea con el mismo bloque y `git push -f origin demo/f4-rompe-produccion`. El force push está permitido en ramas que no son `main`.

## T13 · Ensayo de F3 y F4 · 9-nov
- **PR #6, F3, abierto:** los tres checks en rojo (`Comprobar el PR` ×2 y `Publicar en Cloudflare Workers`) y sin comentario de preview. **La plantilla de PR sale rellena** (primera prueba real en `feedback-hub`). La API devuelve `mergeable_state: unstable` en lugar de `blocked`: pendiente de confirmar en pantalla que GitHub bloquea el merge.
- **PR #7, F4, fusionado:** checks en verde, comentario con la preview y plantilla con las dos casillas marcadas. En producción el formulario mostró *"No hemos podido enviar tu opinión"* (captura de Jaime).
- **Rollback en el panel de Cloudflare: 3 minutos** (Jaime, incluida la navegación). Comprobado por el agente: producción vuelve a guardar feedback (`POST /rest/v1/feedback` → 201, 0 errores).
- **⚠️ Revert pendiente:** `main` (`461d4b7`) sigue con `from("feedbacks")`. El rollback solo cambió la versión publicada: **el próximo merge en `main` volvería a publicar el fallo**. Es la diferencia entre rollback y revert, vista en real.

**Revert hecho (9-nov):** botón *Revert* del PR #7 → PR #8 fusionado con merge commit (`ac8d7df`), publicación en verde. Comprobado por el agente: `main` vuelve a `from("feedback")` y producción guarda feedback (201, 0 errores). **CA4 ✅.**

**Ciclo completo para F4:** merge con fallo → producción rota → rollback en 3 min → revert por PR → `main` y producción correctos. Todo desde el navegador, sin terminal: el revert lo crea GitHub con un botón.
