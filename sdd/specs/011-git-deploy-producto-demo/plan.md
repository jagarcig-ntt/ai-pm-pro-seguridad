# PLAN · SPEC-011 · Producto demo de la sesión Git/Deploy (a partir de FeedbackHub)

*Spec: [spec.md](spec.md) (aprobada el 21-oct) · Estado del plan: borrador · 21-oct*

## 1. Enfoque
- **Repo nuevo y limpio.** `jagarcig-ntt/feedbackhub-demo` se crea vacío y se construye desde cero, **copiando solo la interfaz** de FeedbackHub (`index.html`, `admin.html` y sus estilos). La lógica, la API, el esquema y la configuración se reescriben. Así no se arrastra ni el historial ni ninguna de las vulnerabilidades sembradas.
- **Sin paso de compilación y sin dependencias de npm.**
  - El frontend es HTML y JS normales; el cliente de Supabase se carga desde CDN.
  - Las funciones llaman a la API REST de Supabase con `fetch`.
  - Las pruebas usan el `node --test` que trae Node.

  Es lo que permite editar desde la web de GitHub, que el check funcione en un fork sin instalar nada y que el squad tenga poco que adivinar.
- **Sin clave maestra.** La API nunca usa la `service_role` de Supabase.
  - El panel de administración llama a la API con el token del usuario que ha iniciado sesión, y los permisos los aplica la base de datos (RLS).
  - En producción solo hace falta la clave pública (`anon`) y la URL de cada proyecto. Es coherente con F2 ("los secretos viven en la plataforma") y deja el tema de las claves maestras para el 11-dic.
- **Toda la configuración llega por `/api/config`.** El frontend no lleva ninguna URL ni clave: las pide al arrancar. Es la idea 2 de F2 ("misma app, distinta configuración") hecha visible.
- **Alternativas descartadas:**
  - Partir del repo trampa y "arreglarlo": arrastra historial con claves y 15 hallazgos.
  - Usar Express: Cloudflare Pages no lo ejecuta.
  - Usar un framework con compilación (React o Vite): rompe la edición desde la web y añade complejidad sin valor pedagógico.

## 2. Diseño

### 2.1 Arquitectura
```
Navegador ── index.html (formulario público) ──► POST /api/feedback ─┐
          └─ admin.html (login Supabase Auth) ─► GET  /api/admin/feedback (Bearer = token del usuario) ─┤
                     ▲                                                                                 ▼
                     └──── GET /api/config  ◄── variables de entorno de Cloudflare Pages      Supabase (PostgREST + Auth + RLS)
```

| Pieza | Implementación | Ficheros |
|---|---|---|
| Frontend | HTML + JS sin compilación; `@supabase/supabase-js` desde CDN (versión fijada) solo para el login | `public/index.html`, `public/admin.html`, `public/app.js`, `public/admin.js`, `public/styles.css` |
| API | Cloudflare **Pages Functions** | `functions/api/health.js`, `functions/api/config.js`, `functions/api/feedback.js`, `functions/api/admin/feedback.js` |
| Lógica común testeable | Validación del feedback y lectura de flags como funciones puras | `functions/_lib/feedback.js`, `functions/_lib/config.js` |
| Datos | Supabase: tablas `feedback` y `admins`, con RLS | `supabase/schema.sql`, `supabase/seed.sql` (datos de ejemplo, solo dev y staging) |
| Pruebas | `node --test`, sin secretos ni red | `tests/portada.test.js`, `tests/feedback.test.js` |

### 2.2 Modelo de datos y permisos
- `feedback(id uuid, created_at, name text, email text, message text, rating int null)`.
  - Se elimina `ip_address` del original: no hace falta y es un dato personal (puente al 11-dic, F3 de seguridad).
- `admins(user_id uuid → auth.users)`: quién es administrador. Se rellena a mano; un administrador por entorno.
- **RLS:**
  - `feedback` permite `insert` a cualquiera, con validación de longitudes;
  - `select` solo si `auth.uid()` está en `admins`;
  - `admins` no es legible desde fuera.
- El mismo `schema.sql` se aplica a los dos proyectos (staging y producción). Desarrollo local usa el proyecto de staging. Para el alcance de la sesión no hace falta Supabase local, que requiere Docker.

### 2.3 Entornos y variables

| Variable | Development (`.dev.vars` local) | Staging (*Preview* en Cloudflare) | Production |
|---|---|---|---|
| `SUPABASE_URL` | proyecto staging | proyecto staging | proyecto producción |
| `SUPABASE_ANON_KEY` | de staging | de staging | de producción |
| `APP_ENV` | `development` | `staging` | `production` |
| `FEATURE_VALORACION` | `true` | `true` | `false` |

- El banner STAGING se muestra cuando `APP_ENV != production`.
- **Staging = previews de Cloudflare Pages:** cada rama o PR desplegada fuera de `main` usa las variables *Preview*.
- **Desarrollo local:** `npx wrangler pages dev public`. Necesita Node; Wrangler se descarga con `npx`, sin instalación global.
- Ficheros: `.gitignore` (incluye `.dev.vars` y `.env`) y `.dev.vars.example` sin valores (el `.env.example` de la teoría).
- La teoría (F2) habla de `.env`. Cloudflare usa `.dev.vars` por convención. Se resuelve en las marcas "ajustar" de la teoría: es el mismo concepto con otro nombre de fichero (ver riesgos).

### 2.4 Despliegue (frontera con SPEC-012)
- Proyecto de Cloudflare Pages de tipo **Direct Upload**: lo publica un workflow de GitHub Actions con `wrangler pages deploy`. Así el despliegue es visible en GitHub (pestaña *Actions*), como enseña F3.
  - push o merge a `main` → producción;
  - otras ramas o PR → preview (staging).
- **SPEC-011** deja el proyecto creado, las variables configuradas y un primer despliegue manual verificado. **SPEC-012** escribe los workflows, el ruleset de `main` y la plantilla de PR.
- Los workflows de despliegue solo se ejecutan en el repo original (`if: github.repository == 'jagarcig-ntt/feedbackhub-demo'`). En los forks solo corre el check, que no necesita secretos. Lo implementa SPEC-012; se fija aquí como requisito de diseño.

### 2.5 Material para la demo

| Rama o fichero | Qué contiene | Familia |
|---|---|---|
| Historial de `main` | Commits pequeños, con mensajes con sentido, contando cómo se construyó | F1 idea 2 |
| `demo/commits-malos` | Los mismos cambios con mensajes `update`, `fix`, `cambios` | F1 idea 2 |
| `demo/f1-pr-listo` | Cambio del texto de portada con el PR ya abierto (plan B de F1) | F1 |
| `demo/f3-checks` | Un PR con la prueba de portada rota (check en rojo); se coordina con SPEC-012 | F3 |
| `demo/f4-rompe-portada` | Cambio que provoca un error visible en la portada en producción, para el simulacro de rollback | F4 |
| `docs/checklist-go-live.md` | Checklist de 8 puntos (copia de F4 idea 1) | F4 |
| `README.md` | Qué es, convención de ramas, cómo hacer fork, activar Actions y levantarlo en local | F1, F3 |

### 2.6 Dónde vive el código
- El repo del demo se clona **fuera** de este repositorio, en `C:\Users\jagarcig\theherocamp\feedbackhub-demo\`, para no anidar repositorios. El agente trabaja allí y Jaime hace commits y push (constitution 5.5).
- En este repo, `sesiones/2026-11-git-deploy/Lab/README.md` enlaza al repo del demo y resume su arquitectura.

### 2.7 Pasos que solo puede hacer Jaime 🧑
1. Crear el repo vacío `jagarcig-ntt/feedbackhub-demo` (público) y clonarlo en la ruta de 2.6.
2. Supabase (login con GitHub): crear dos proyectos (`feedbackhub-staging` y `feedbackhub-prod`), aplicar `schema.sql` y crear un usuario administrador en cada uno.
3. Cloudflare:
   - crear el proyecto Pages `feedbackhub-demo` (Direct Upload);
   - configurar las variables de 2.3 en Production y Preview;
   - crear un API token con permiso de Pages para GitHub Actions y guardarlo como *secret* del repo (lo usa SPEC-012).
4. Probar el rollback desde el panel de Cloudflare una vez, cronometrado.

Ningún valor de clave se escribe en el repo ni en la conversación. El agente prepara las instrucciones paso a paso.

## 3. Ficheros

| Acción | Ruta | Nota |
|---|---|---|
| crear (repo demo) | `public/*`, `functions/**`, `supabase/*.sql`, `tests/*`, `docs/checklist-go-live.md`, `README.md`, `.gitignore`, `.dev.vars.example`, `package.json` (solo scripts, sin dependencias) | En `C:\Users\jagarcig\theherocamp\feedbackhub-demo\` |
| reutilizar (leer) | `sesiones/2026-12-seguridad-v2/HeroCamp-Product/feedbackhub/index.html`, `admin.html` | Solo la estructura y el estilo visual |
| reutilizar | `sesiones/2026-11-git-deploy/Teoria/Formador/*_profundo.md` (sección 11) | Los mapas son la lista de comprobación del CA7 |
| crear | `sesiones/2026-11-git-deploy/Lab/README.md` | Enlace al repo y resumen |
| modificar | `sesiones/2026-11-git-deploy/Teoria/**` (sección 6, 8 marcas) | Resolver los "ajustar tras SPEC-011/013" (CA8) |
| no tocar | `sesiones/2026-12-seguridad-v2/HeroCamp-Product/**` | Repo trampa de diciembre |

## 4. Riesgos y plan B

| Riesgo | Prob. | Mitigación / plan B |
|---|---|---|
| Los proyectos gratuitos de Supabase se pausan si no se usan | alta | Reactivarlos 48h antes y la mañana de la sesión (checklist del ensayo, SPEC-015). Plan B: capturas y vídeo de la demo |
| Variables de entorno en un proyecto Direct Upload: comportamiento en Preview y Production | media | Verificarlo en el primer despliegue (CA4). Plan B: pasar los valores con `wrangler pages deploy` por entorno o usar integración Git |
| El rollback del panel no funciona igual en Direct Upload | media | Probarlo en T-rollback (CA6). Plan B: revert por PR, que también enseña F4 |
| `.dev.vars` frente a `.env` (la teoría dice `.env`) | baja | Verificar si Wrangler lee `.env`. Si sí, usar `.env` y la teoría no cambia; si no, ajustar la marca de F2 ("en Cloudflare se llama `.dev.vars`") |
| Los alumnos no pueden ejecutar el check en su fork | media | La prueba no usa secretos ni red; los workflows de despliegue se saltan en forks. Plan B de F3: verlo en la pantalla de Jaime |
| CDN de `supabase-js` caído durante la sesión | baja | Versión fijada en jsDelivr, con unpkg como alternativa; el formulario público no depende de ella |
| El tiempo: rehacer la API + Auth + RLS + entornos en 1 semana (fecha límite 2-nov) | media | Primero lo mínimo que bloquea a SPEC-012 y SPEC-017 (repo + 3 entornos + API + check). Las ramas `demo/…` y los ajustes de la teoría pueden ir hasta el 9-nov |
| Límites del plan gratuito (builds, peticiones, proyectos) | baja | Se documentan con fecha en SPEC-013. El uso de una sesión de 12 personas está muy por debajo de cualquier plan gratuito |

## 5. Verificación

| Criterio | Cómo se verifica |
|---|---|
| CA1 | El repo es público en GitHub. `git log -p` con búsqueda de patrones de claves (`eyJ`, `sk-`, `AIza`, `service_role`) en todo el historial: 0 resultados |
| CA2 | Prueba manual en producción y staging: enviar feedback → 200; `/admin.html` sin login → pide login; administrador → ve la lista; usuario no administrador → 403 o lista vacía |
| CA3 | Enviar un feedback marcado en staging y comprobar que no aparece en producción, y al revés |
| CA4 | `GET /api/config` en cada entorno: `APP_ENV` y `FEATURE_VALORACION` correctos. Captura de la portada con y sin banner y campo de valoración |
| CA5 | Desde una cuenta de GitHub de prueba: fork → editar la portada en la web → PR → *Enable workflows* → check en verde (con SPEC-012) |
| CA6 | Cada rama `demo/…` se revisa a mano. Rollback desde el panel de Cloudflare, cronometrado y anotado |
| CA7 | Tabla de comprobación con cada fila de los mapas de la sección 11 de F1–F4 → cubierto / justificado |
| CA8 | `grep "ajustar tras SPEC-011"` en `Teoria/` → 0 |
| CA9 | Las cuentas de GitHub, Cloudflare y Supabase siguen en plan gratuito y ninguna pide tarjeta (captura de la página de facturación) |

## 6. Tensiones con la constitution
- **3.4 Nada de secretos reales:** se cumple por diseño. No hay `service_role`; las claves solo viven en Cloudflare y en `.dev.vars` local (ignorado).
- **3.2 Coste 0:** sí, en GitHub (repo público), Cloudflare Pages Free y Supabase Free. Las cifras de límites se verifican en SPEC-013, no se inventan aquí.
- **3.3 Plan B:** cada riesgo de la demo tiene alternativa. Las ramas `demo/…` son el plan B de cada bloque.
- **2.8 Timings:** no aplica (sin minutos de sesión en esta spec).
- **Tensión menor:** la teoría usa `.env`; Cloudflare, `.dev.vars`. Se resuelve en las marcas "ajustar" (CA8) tras verificarlo.
