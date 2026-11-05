# Ensayo solo con navegador · SPEC-019 (CA9)

Se hace como lo haría un alumno: **sin VS Code, sin terminal y sin clonar nada**. Esta lista es el borrador de la guía (SPEC-013).

**Antes de empezar:**
- Pon en marcha un cronómetro por bloque y anota los minutos en la tabla del final.
- Haz captura de cada paso marcado con 📸.
- **Nunca captures un token ni el valor de un secreto.** Tapa la pantalla o haz la captura antes de que aparezca.
- Si algo falla, no lo arregles a tu manera: para, haz captura y me lo pasas. Los fallos son lo que buscamos.

**Cuentas:** usa una **cuenta de Cloudflare nueva**, porque la tuya ya tiene el subdominio creado y no probaría lo que le pasará a un alumno. GitHub, Lovable y Supabase pueden ser los tuyos.

---

## Bloque A · De casa (T02)
*En la sesión real, esto llega hecho.*

**A1. Proyecto en Lovable**
1. Crea un proyecto nuevo. Prompt: *"Crea una app sencilla de notas: un formulario con título y texto, y una lista debajo."*
2. Conéctalo a GitHub: *Settings → Git*. 📸
3. **No renombres ni muevas el repo después.**

**A2. Repo público**
1. En GitHub: *Settings → General → Danger Zone → Change visibility → Public*. 📸
2. Comprueba que Lovable sigue sincronizado.

**A3. Supabase, antes de crear ninguna tabla**
1. En Lovable: *More → Connectors → Supabase*. **No uses *Database*, que es el backend de Lovable.** 📸
2. Autoriza y elige `feedbackhub-staging`. 📸
3. Pide en el chat: *"Guarda las notas en una tabla nueva de Supabase llamada `notas_ensayo`. Cualquiera puede añadir y leer notas."*
4. Lovable te enseñará el SQL: apruébalo. 📸
5. Si sale *Build unsuccessful*, pulsa *Fix build*. Anótalo.
6. Crea una nota en la vista previa de Lovable.

**A4. Cloudflare**
1. Crea la cuenta nueva y entra una vez en *Workers & Pages*. 📸 Anota si te pide elegir un subdominio.
2. Crea el token: *My Profile → API Tokens → Create Token*, con el permiso **Account · Workers Scripts · Edit**. 📸 de los permisos, **no del token**.
3. Copia el *Account ID*. 📸 de dónde está, sin que se vea el valor.

**A5. Secretos en GitHub**
1. En tu repo: *Settings → Secrets and variables → Actions → New repository secret*.
2. Crea `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`. 📸 de la lista final, donde los valores no se ven.

---

## Bloque B · Primer despliegue (T02) = P1 de la sesión
*Objetivo de la escaleta: 45 min.*

**B1. Workflow de comprobación**
1. En GitHub, en `main`: *Add file → Create new file*. 📸
2. Como nombre escribe `.github/workflows/comprobar-pr.yml`.
3. Pega el contenido de [`Lab/workflows/comprobar-pr.yml`](../../../sesiones/2026-11-git-deploy/Lab/workflows/comprobar-pr.yml).
4. *Commit changes*, directamente en `main`.

**B2. Workflow de despliegue**
1. Repite con `.github/workflows/desplegar.yml` y [`Lab/workflows/desplegar.yml`](../../../sesiones/2026-11-git-deploy/Lab/workflows/desplegar.yml).
2. Al hacer el commit empieza la publicación.

**B3. Ver la publicación**
1. Abre la pestaña *Actions*. 📸
2. Espera al check verde de **Desplegar**.
3. Abre el run y copia la URL de *Publicado en*. 📸
4. Abre la URL y crea una nota. Comprueba que aparece. 📸

**Pásame la URL del repo y la de producción, y me pongo con T03.**

---

## Bloque C · Gestión de cambios (T04) = P2 de la sesión
*Objetivo de la escaleta: 45 min. Empieza cuando yo cierre T03.*

**C1. Proteger `main`**
1. *Settings → Rules → Rulesets → New branch ruleset*. 📸
2. Nombre: `main siempre funciona`. *Enforcement status*: **Active**.
3. *Target branches*: añade la rama por defecto.
4. Marca **Restrict deletions**, **Block force pushes** y **Require a pull request before merging**.
5. Marca **Require status checks to pass** y añade `Comprobar el PR`. 📸
6. Guarda y comprueba que aparece como activo.

**C2. Cambio en Lovable**
1. Pide: *"Cambia el título de la página a Mis notas del ensayo."*
2. Debería salir el aviso *Some changes were saved on a sync branch*. 📸

**C3. Pull Request**
1. En GitHub, abre el PR de `lovable-sync` a `main`. 📸
2. Espera a **Comprobar el PR** y **Desplegar** en verde. 📸
3. Abre la URL de preview del comentario. 📸 Comprueba que sale el título nuevo y que **producción aún no ha cambiado**.

**C4. Merge**
1. Haz *Merge pull request*. 📸
2. Espera a que **Desplegar** termine en `main`.
3. Comprueba que producción muestra el título nuevo. 📸
4. Comprueba que Lovable sigue sincronizado. 📸

**Avísame y cierro el ensayo (T05).**

---

## Tiempos y tropiezos

| Bloque | Objetivo | Real | ¿Dónde te has atascado? |
|---|---|---|---|
| A · De casa | Sin límite | | |
| B · Primer despliegue | 45 min | | |
| C · Gestión de cambios | 45 min | | |

Jaime conoce el flujo y un alumno no: si un bloque te lleva más de **20 min**, los 45 de la sesión van justos.

## Qué estamos comprobando

| Pregunta | Dónde se ve |
|---|---|
| ¿Pide algo más una cuenta nueva de Cloudflare, como el subdominio? | A4 |
| ¿Se crea el Worker en la primera publicación, sin deploy previo? | B3 |
| ¿Funciona el nombre del Worker generado desde el repo? | B3 |
| ¿Cabe la URL de preview? El alias y el nombre del Worker van juntos, y un usuario o repo largo podría no caber | C3 |
| ¿Llegan las variables de Supabase a la app publicada sin configurar nada? | B3 |
| ¿Sigue Lovable sincronizado tras pegar los workflows y tras el merge? | B3 y C4 |
