# SPEC-011 · Producto demo de la sesión Git/Deploy (a partir de FeedbackHub)

| Campo | Valor |
|---|---|
| Estado | **en curso** (aprobada el 21-oct; [plan](plan.md) aprobado el 22-oct; [tareas](tasks.md)) |
| Sesión | 2026-11 Git/Deploy (sábado 21-nov · 10:00–14:00 · Zoom) |
| Fecha límite | 2026-11-02 (semana 2 del calendario del 20-oct) |
| Depende de | SPEC-010 v3 · SPEC-014 (hecha: sus mapas son los requisitos) |
| Alimenta | SPEC-012 (Git y CI/CD), SPEC-017 (squad), SPEC-015 (guion), SPEC-016 (portal) |
| Responsable | Jaime García |

## 1. Problema / necesidad
- La sesión gira en torno a un **producto demo común** (SPEC-010 v3, R10–R11): frontend, backend y modelo de datos con login. Todavía no existe.
- Jaime decide **reutilizar uno de los productos que ya tenemos** para no complicarse (21-oct). El candidato natural es **FeedbackHub** (`sesiones/2026-12-seguridad-v2/HeroCamp-Product/feedbackhub/`):
  - es el repo trampa de la sesión de seguridad;
  - tiene formulario público (`index.html`), panel de administración (`admin.html`), API (`api/feedback.js`, `api/admin.js`) y esquema de Supabase (`supabase/schema.sql`);
  - son unas 730 líneas, pequeño y entendible.
- **Pero hoy no sirve tal cual para una sesión de Git/Deploy:**
  - **No tiene login real.** `api/feedback.js` simula al usuario (`req.user = { id: 'user-123' }`) y `api/admin.js` no tiene autenticación ("TODO").
  - **No guarda nada.** El guardado es un comentario ("Aquí iría la lógica de guardar en Supabase") y el panel de administración devuelve datos de prueba.
  - **Contradice lo que enseña la teoría:**
    - `.env` subido al repo y `.gitignore` sin `.env` ("# Nota: falta .env");
    - claves escritas en `config.js` y `app.js`;
    - `service_role` en el cliente.

    Son justo los errores que F1 y F2 dicen que no se hacen (`Teoria/familia2_entornos_secretos_alumnos.md`, idea 3).
  - **No tiene entornos, workflows ni plantilla de PR**, y su `server.js` local solo sirve ficheros.
- Los 4 "Mapas para specs posteriores" de SPEC-014 (sección 11 de cada versión formador en `sesiones/2026-11-git-deploy/Teoria/Formador/`) definen lo que el demo debe permitir enseñar.

## 2. Objetivo
Tener un repositorio **público** en la cuenta de GitHub de Jaime (`jagarcig-ntt/feedbackhub-demo`) con el producto demo funcionando en tres entornos, listo para:
- enseñar F1–F4 tal como están escritas;
- que los alumnos hagan fork y su PR;
- que el squad (SPEC-017) trabaje sobre él.

Todo a coste 0.

## 3. Para quién
- **Jaime:** un producto que conoce, estable para la demo en vivo, con ramas preparadas para cada bloque y su plan B.
- **Alumnos (≈12):** un repo que se puede hacer fork y editar desde la web sin instalar nada, con checks que funcionan en su fork sin secretos.
- **SPEC-017 (squad):** un objetivo real sobre el que construir y probar los agentes.
- **Sesión del 11-dic:** posible continuidad: "el producto que llevamos a producción en noviembre es el que auditamos en diciembre" (pregunta abierta 4).

## 4. Alcance
**Incluye:**
- **Producto:** repositorio nuevo en la cuenta personal, **sin el historial del repo trampa**. FeedbackHub adaptado:
  - login real;
  - guardado real del feedback;
  - panel de administración protegido;
  - API mínima;
  - sin secretos en el código.
- **Datos y entornos:**
  - dos proyectos de base de datos (staging y producción) en plan gratuito, más desarrollo local;
  - variables por entorno, *feature flag* y banner de staging.
- **Material de la demo:**
  - ramas de demo y plan B (`demo/commits-malos`, `demo/f1-pr-listo`, `demo/f3-checks`, `demo/f4-rompe-portada`);
  - `docs/checklist-go-live.md`;
  - README del repo con la convención de ramas y cómo hacer fork.
- Resolver las **8 marcas** `<!-- ajustar tras SPEC-011/013 -->` de la teoría con los nombres reales (acción pendiente de `sdd/specs/014-git-deploy-teoria-familias/review.md`).

**No incluye:**
- Workflows de GitHub Actions, *rulesets* de `main` ni plantilla de PR. Son la "fontanería" Git/CI de **SPEC-012**, que trabaja sobre este repo.
- La elección final de plataforma de despliegue (**SPEC-013**). Esta spec la necesita como entrada (ver apartado 8).
- El squad (SPEC-017).
- Cambiar el repo trampa de diciembre (`sesiones/2026-12-seguridad-v2/HeroCamp-Product/`). Solo se lee y se copia.

## 5. Requisitos

### Producto (piezas mínimas reales, SPEC-010 R11)
- R1. **Frontend:** formulario público de feedback (`index.html`) y panel de administración (`admin.html`), basados en los de FeedbackHub.
- R2. **Login real:** acceso al panel con Supabase Auth. Solo los usuarios administradores ven el feedback. El formulario público no requiere login.
- R3. **Backend:** API mínima con **Cloudflare Pages Functions** (`functions/`, sin Express) con al menos `GET /api/health`, `POST /api/feedback` (guarda) y `GET /api/admin/feedback` (lista, solo administradores).
- R4. **Modelo de datos:** tablas de FeedbackHub (`feedback`, `users`), simplificadas y con lo mínimo para que el login y los permisos funcionen, en un `supabase/schema.sql` aplicable a cada entorno.

### Entornos y secretos (mapa F2)
- R5. **Tres entornos** con datos separados:
  - development local con datos de ejemplo;
  - staging (preview) con su proyecto de base de datos;
  - production con el suyo.
- R6. **Configuración solo por variables de entorno.** Nada de claves en el código. `.env` en `.gitignore`, `.env.example` sin valores.
- R7. **Feature flag** `FEATURE_VALORACION` (campo "valoración de 1 a 5" en la portada, encendida en staging y apagada en producción). Es el mismo flag que usan F1, F2 y F4.
- R8. **Banner "STAGING"** visible en staging y en las previews, controlado por una variable de entorno.

### Para la demo y la práctica (mapas F1, F3 y F4)
- R9. **Repo público**, editable desde la web de GitHub. Hay al menos un texto de la portada que se cambia en un solo fichero.
- R10. **Al menos una prueba sencilla** que se pueda romper a propósito (por ejemplo, "la portada carga y muestra el título"). Se ejecuta **sin secretos**, para que funcione en los forks.
- R11. **Historial de `main` ejemplar** (mensajes con sentido) y ramas de demo: `demo/commits-malos`, `demo/f1-pr-listo`, `demo/f3-checks` (en coordinación con SPEC-012) y `demo/f4-rompe-portada` (un error visible y fácil de entender).
- R12. **`docs/checklist-go-live.md`** con la checklist de 8 puntos de F4 (`Teoria/familia4_golive_recuperacion_alumnos.md`, idea 1).
- R13. **Rollback de la plataforma** probado antes de la sesión, más **revert** por PR como alternativa.
- R14. **README del repo** para alumnos: qué es el producto, convención de ramas (`feature/`, `fix/`), cómo hacer fork y cómo activar Actions en el fork.

### Restricciones de proceso
- R15. **Coste 0:** repo público, plataforma y base de datos en plan gratuito (constitution 3.2). Los límites relevantes se documentan con fecha de verificación (en SPEC-013).
- R16. **Reproducible desde cero** (constitution 3.5): el README permite levantarlo desde una cuenta limpia. Se cronometra.

## 6. Criterios de aceptación
- [ ] CA1. El repo `jagarcig-ntt/feedbackhub-demo` existe, es público y su historial no contiene el repo trampa ni ningún secreto. Comprobación: búsqueda de patrones de claves en todo el historial.
- [ ] CA2. En producción y en staging: el formulario guarda feedback, el panel exige login, un administrador ve el feedback y un usuario no administrador no lo ve.
- [ ] CA3. Staging y producción usan proyectos de base de datos distintos. Un feedback enviado en staging no aparece en producción.
- [ ] CA4. El flag está encendido en staging y apagado en producción, y el banner STAGING solo aparece fuera de producción.
- [ ] CA5. Un fork hecho desde una cuenta de GitHub limpia permite editar la portada desde la web, abrir un PR y ejecutar la prueba sin secretos (junto con SPEC-012).
- [ ] CA6. Las 4 ramas `demo/…` existen y hacen lo que dicen. El rollback se ha probado una vez y está cronometrado.
- [ ] CA7. Cada fila de los 4 mapas de SPEC-014 que asigna algo al demo (SPEC-011/013) está cubierta o justificada.
- [ ] CA8. Las 8 marcas `ajustar tras SPEC-011/013` de la teoría están resueltas.
- [ ] CA9. Coste 0 confirmado: ningún servicio pide tarjeta ni pasa de plan gratuito.

## 7. Restricciones (constitution)
3.1 stack del curso (Supabase, GitHub, Cloudflare Pages) · 3.2 coste 0 · 3.3 plan B probado · 3.4 nada de secretos reales en el repo · 3.5 reproducible desde cero · 5.5 Jaime hace commits, push y crea las cuentas · 2.6, excepción (producto común y herramienta genérica).

## 8. Preguntas abiertas (respondidas por Jaime el 21-oct)
- [x] **Cuenta y nombre del repo:** `jagarcig-ntt/feedbackhub-demo`, público. Es la misma cuenta que este repositorio. Jaime crea el repo y hace commits y push (constitution 5.5). Las credenciales no se guardan en ningún sitio del proyecto.
- [x] **Plataforma de despliegue → GitHub + Cloudflare Pages** (confirmado por Jaime el 21-oct). Análisis:
  - **Solo GitHub (GitHub Pages)** no sirve. Solo publica ficheros estáticos (no ejecuta la API), tiene una única URL por repo (sin staging ni previews por PR) y no tiene botón de rollback. Con eso no se pueden enseñar F2, F3 ni F4.
  - **Propuesta:** el repo, los PR, los checks y **el despliegue se ven en GitHub**: el workflow "Desplegar" de GitHub Actions publica en **Cloudflare Pages**, y la API pasa a **Pages Functions** (carpeta `functions/`, sin Express; son 3 endpoints pequeños).
  - Cloudflare Pages da en el plan gratuito previews por rama y por PR (staging), variables por entorno y rollback en un clic. Permite uso comercial y es la plataforma que ya usan los alumnos (`Contexto-Proyecto.md`).
  - Con esto, **SPEC-013 se reduce a los requisitos previos de los alumnos y a verificar los límites gratuitos**. La decisión de plataforma queda aquí.
- [x] **Base de datos:** Supabase, con la cuenta creada mediante el login de GitHub de Jaime. Dos proyectos gratuitos (staging y producción). Antes de la sesión hay que reactivarlos si se han pausado (va en la checklist del ensayo, SPEC-015).
- [x] **Continuidad con el 11-dic:** el demo queda **limpio en noviembre**. En diciembre, una rama con fallos sembrados (SPEC-021/022).
- [x] **Tipo de login:** email y contraseña con Supabase Auth, con un administrador creado a mano.
- [x] **Flag:** un campo visible en la portada, "valoración de 1 a 5" (`FEATURE_VALORACION`).

## 9. Hallazgos fuera de alcance
- El README de FeedbackHub dice "Hosting: Cloudflare Pages", pero el producto tiene una API con Express que Cloudflare Pages no ejecuta sin reescribirla. No afecta a diciembre (allí solo se audita), pero conviene saberlo.
- El demo va en la misma cuenta (`jagarcig-ntt`) que este repositorio, así que el portal de noviembre (SPEC-016) enlaza dentro de la misma cuenta.
