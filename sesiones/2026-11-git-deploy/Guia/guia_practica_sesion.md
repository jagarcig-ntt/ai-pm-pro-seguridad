# Práctica: tu producto en producción

**AI PM Pro · The Hero Camp · Sesión "Git, Deployment y Producción" · 21 de noviembre**

Dos prácticas sobre **tu propio producto**, solo con el navegador:

- **Práctica 1 (11:15):** tu primer despliegue. Al terminar, tu producto está en Internet.
- **Práctica 2 (12:10):** tu primer cambio por Pull Request, con `main` protegida.

En los pasos verás dos datos tuyos:

- `<usuario>`: tu usuario de GitHub;
- `<repo>`: el nombre de tu repositorio.

**Antes de empezar:** abre tu proyecto en Lovable y **comprueba su nombre arriba a la izquierda**. Si tienes varios, es fácil equivocarse.

---

## Práctica 1 · Tu primer despliegue

### Paso 1 · Pide a Lovable los tres ficheros
Pide los tres ficheros **uno a uno**, en tres mensajes. Para copiar cada fichero, ábrelo y pulsa el botón de copiar (*Copy raw file*).

**1.1 Comprobación de cada cambio.** Escribe en el chat de Lovable y pega el contenido de [comprobar-pr.yml](../Lab/workflows/comprobar-pr.yml) a continuación:

> Crea el fichero `.github/workflows/comprobar-pr.yml` en la raíz del repositorio con este contenido exacto. No cambies nada, ni comentarios ni espacios, y no toques ningún otro fichero:

**1.2 Publicación automática.** Repite con [desplegar.yml](../Lab/workflows/desplegar.yml):

> Crea el fichero `.github/workflows/desplegar.yml` en la raíz del repositorio con este contenido exacto. No cambies nada, ni comentarios ni espacios, y no toques ningún otro fichero:

En cuanto llegue a GitHub, **empieza tu primera publicación**.

**1.3 Plantilla de Pull Request.** Repite con [pull_request_template.md](../Lab/workflows/pull_request_template.md):

> Crea el fichero `.github/pull_request_template.md` con este contenido exacto. No cambies nada y no toques ningún otro fichero:

✅ **En el chat de Zoom:** escribe "ficheros".

### Paso 2 · Mira cómo se publica
1. En GitHub, abre tu repositorio y la pestaña **Actions**.
2. Espera a que **Desplegar** salga con el círculo verde ✅. Tarda alrededor de un minuto.
3. Haz clic en **Desplegar**. En el resumen verás **Publicado en:** y tu dirección. Tiene esta forma: `https://<usuario>-<repo>.<tu-subdominio>.workers.dev`.

✅ **En el chat de Zoom:** pega tu URL de producción.

### Paso 3 · Prueba tu web
1. Abre tu URL.
2. **Haz lo principal de tu producto**: crear algo, guardar o enviar un formulario. Abrirla no basta: verde no significa que funcione.

### Paso 4 · Solo si tu producto tiene inicio de sesión
Sin este paso, el enlace del correo de confirmación lleva a una página que no existe.

1. En Supabase, abre tu proyecto y ve a **Authentication → URL Configuration**.
2. En **Site URL**, sustituye `http://localhost:3000` por tu URL de producción y pulsa *Save changes*.
3. En **Redirect URLs**, pulsa *Add URL* y añade estas dos direcciones:
    - `https://<usuario>-<repo>.<tu-subdominio>.workers.dev/**`
    - `https://*-<usuario>-<repo>.<tu-subdominio>.workers.dev/**`

   La segunda sirve para las previews de tus Pull Requests.
4. **No borres las URL de Lovable** que ya hay: son las que hacen funcionar su vista previa.

### Si algo falla en la práctica 1

| Lo que ves | Qué significa | Qué hacer |
|---|---|---|
| No aparece nada en *Actions* | Los ficheros no han llegado a GitHub | Busca `.github/workflows/` en tu repositorio. Si no está, repite el paso 1 |
| **Desplegar** en rojo en el paso "0. Comprobar que existen los secretos" | Falta un secreto o tiene otro nombre | *Settings → Secrets and variables → Actions*: deben ser exactamente `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` |
| En rojo en "5. Compilar" | El código de Lovable no compila | En Lovable, pulsa *Fix build* si aparece. Si no, avisa |
| En rojo en "7. Publicar" | El token o el Account ID no son correctos | Revisa los permisos del token: `Account · Workers Scripts · Edit` |
| En rojo en "9. Comprobar que la web responde" | Se ha publicado, pero la web da error | Avisa: lo vemos juntos |
| El correo de confirmación lleva a `localhost` | Falta el paso 4 | Haz el paso 4 y regístrate de nuevo |

**¿No guardaste los secretos en GitHub antes de la sesión?** Hazlo antes del paso 1, siguiendo el paso 4 de la guía de requisitos previos. **No compartas pantalla mientras pegas el token.**

---

## Práctica 2 · Tu primer cambio por Pull Request

### Paso 1 · Protege `main`
1. En GitHub, en tu repositorio: **Settings → Rules → Rulesets → New ruleset → New branch ruleset**.
2. **Ruleset Name:** `main siempre funciona`.
3. **Enforcement status:** cámbialo a **Active**. Viene en *Disabled*, y así no protege nada.
4. **Target branches:** *Add target → Include default branch*. Sin esto, GitHub avisa de que no protege nada.
5. Marca estas reglas:
    - **Restrict deletions**;
    - **Require a pull request before merging**. Dentro, en *Allowed merge methods*, deja solo **Merge**;
    - **Require status checks to pass**. Pulsa *Add checks* y escribe `Comprobar el PR`, aunque todavía no aparezca en la lista;
    - **Block force pushes**.
6. Pulsa **Create**.

✅ **En el chat de Zoom:** escribe "Active".

### Paso 2 · Pide un cambio en Lovable
1. Pide algo pequeño y visible, por ejemplo: *"Cambia el texto del botón principal"*.
2. Lovable avisará con *"Some changes were saved on a sync branch"*. **No es un error:** es la protección funcionando. Tu cambio espera en la rama `lovable-sync`.

### Paso 3 · Abre el Pull Request
1. Abre esta dirección, con tus datos: `https://github.com/<usuario>/<repo>/compare/main...lovable-sync`
2. Pulsa **Create pull request**.
3. Rellena la plantilla, sobre todo **¿Qué pasa si falla?** y **¿Cómo se apaga?**
4. Pulsa **Create pull request** otra vez.

✅ **En el chat de Zoom:** pega el enlace de tu Pull Request.

### Paso 4 · Revisa antes de aprobar
1. Espera a que los checks salgan en verde ✅. Tardan alrededor de un minuto.
2. Abre la **URL de preview** que aparece en un comentario del Pull Request.
3. Prueba tu cambio como lo haría un usuario. Si va bien, marca las dos casillas de la plantilla.

### Paso 5 · Haz el merge
1. Pulsa **Merge pull request**. Debe poner **Create a merge commit**: nunca uses *Squash* ni *Rebase*, porque Lovable perdería la sincronización.
2. Pulsa **Confirm merge**. Si GitHub ofrece *Delete branch*, **no lo uses**: Lovable reutiliza `lovable-sync`.
3. En *Actions*, espera a que **Desplegar** salga en verde y abre tu URL de producción: debe tener el cambio.
4. En Lovable, *Settings → Git* debe decir **In sync with GitHub**.

✅ **En el chat de Zoom:** escribe "producción".

### Si algo falla en la práctica 2

| Lo que ves | Qué significa | Qué hacer |
|---|---|---|
| El cambio entra directo en `main`, sin aviso naranja | El ruleset no está activo | Revisa el paso 1: *Active* y *Include default branch* |
| Los checks salen en rojo | El cambio rompe algo | Abre el check en rojo y mira en qué paso falla. Si es "Compilar", pide a Lovable que lo arregle |
| No aparece el comentario con la preview | La publicación de la preview ha fallado | Abre *Actions → Desplegar* de ese Pull Request |
| Lovable dice "X commits ahead of GitHub" | Tus cambios esperan el merge | Es normal hasta el paso 5 |

---

## Tres cosas para el día a día
1. **Cada cambio sigue el mismo ciclo:** lo pides en Lovable, abres el Pull Request, revisas la preview y haces el merge.
2. **Los cambios de base de datos se aplican al pulsar *Allow* en Lovable**, antes del Pull Request. Lee el SQL antes de aprobarlo. Y si borra o cambia permisos, termina el ciclo enseguida.
3. **Después de cada salida, abre tu web.** Verde no significa que funcione.
