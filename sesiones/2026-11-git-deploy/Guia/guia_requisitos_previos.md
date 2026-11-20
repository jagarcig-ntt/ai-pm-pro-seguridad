# Prepárate para la sesión de Git y Deploy

**AI PM Pro · The Hero Camp · Sábado 21 de noviembre · 10:00–14:00 · Zoom**

El día 21 publicarás tu producto de Lovable en Internet, con un sistema profesional de cambios. Solo necesitas el navegador: no hay que instalar nada.

**Tiempo estimado:** unos 5 minutos.

## ¿Lo tienes?

| ✔ | Qué | Cuándo |
|---|---|---|
| ☐ | Plan Pro de Lovable activo y tu proyecto creado | Antes del 21-nov |
| ☐ | Cuenta en [github.com](https://github.com) | Antes del 21-nov |
| ☐ | Cuenta gratuita en [Cloudflare](https://dash.cloudflare.com/sign-up). Lo más cómodo: *Continue with GitHub* | Antes del 21-nov |

**Conectar Lovable con GitHub, crear el token y guardar los secretos lo hacemos juntos en la sesión** (práctica 1). Los pasos 1 a 3 de esta guía son los mismos, con capturas, por si quieres adelantarlos o repasarlos.

**Tres reglas de oro**

1. **Tu repositorio será público.** No incluyas nunca información confidencial de tu empresa ni datos reales de personas.
2. **El token es una contraseña.** No lo compartas, no lo pegues en el chat de Lovable y no lo enseñes en pantalla: las clases se graban.
3. **Lee lo que Lovable va a cambiar en tu base de datos antes de pulsar *Allow*:** se aplica en ese mismo momento.

**¿Te atascas?** Escribe a Gema por el Slack del curso, con una captura en la que no se vea ningún token.

**El día de la sesión** compartiremos el portal con todo el material: https://jagarcig-ntt.github.io/ai-pm-pro-seguridad/sesiones/2026-11-git-deploy/

<div class="salto"></div>

## Paso 1 · Conecta Lovable con GitHub

1. Crea tu proyecto en Lovable, si aún no lo tienes. **Ponle un nombre sin tildes ni eñes:** se usa para el repositorio y para tu dirección web.
2. Crea una cuenta en [github.com](https://github.com) si no la tienes.
3. En Lovable, abre *Settings → Git* y conecta tu proyecto con GitHub.
4. Comprueba que aparece **Connected** y **In sync with GitHub**.

![Proyecto conectado a GitHub](capturas/01_lovable_git.png)

5. En GitHub, abre tu repositorio y ve a *Settings → General*. Baja hasta *Danger Zone*.
6. Pulsa *Change visibility* y elige **Public**.
7. Comprueba que pone *This repository is currently public*.

![Repositorio público](capturas/02_github_publico.png)

> **No renombres ni muevas el repositorio** después de conectarlo: Lovable perdería la conexión.

> **Tu base de datos** es la de Lovable Cloud, la que configuras con Jose. No necesitas ninguna cuenta más para ella.

## Paso 2 · Prepara Cloudflare

Aquí se publicará tu producto.

1. Crea una cuenta gratuita en [cloudflare.com](https://dash.cloudflare.com/sign-up).
2. Entra en *Workers & Pages*. Déjala abierta: en la columna de la derecha está tu **Account ID**. Lo necesitarás en el paso 3.

![Dónde está el Account ID](capturas/06_cloudflare_account_id.png)

3. Haz clic en tu perfil y ve a *My Profile → API Tokens → Create Token → Create Custom Token*.
4. Rellena el formulario así:
    - **Token name:** el nombre de tu proyecto.
    - **Permissions:** `Account` · `Workers Scripts` · `Edit`.
    - **Account Resources:** `Include` · `All accounts`.
    - **Token expiration:** `1 year`.

![Permisos del token](capturas/05_cloudflare_token.png)

5. Pulsa *Continue to summary* y después *Create Token*.
6. **Copia el token.** Cloudflare solo lo enseña una vez. Si lo pierdes, crea otro.

<div class="salto"></div>

## Paso 3 · Guarda el token en GitHub

Así tu repositorio podrá publicar sin que el token aparezca en ningún sitio.

1. En tu repositorio de GitHub, ve a *Settings → Secrets and variables → Actions*.
2. Pulsa *New repository secret*.
3. **Name:** `CLOUDFLARE_API_TOKEN`. **Secret:** tu token. Pulsa *Add secret*.
4. Repite con **Name:** `CLOUDFLARE_ACCOUNT_ID` y tu Account ID como **Secret**.
5. Comprueba que ves los dos, con estos nombres exactos.

![Los dos secretos guardados](capturas/07_github_secretos.png)

**¡Ya está!** Si lo has adelantado, en la sesión empezarás directamente por el paso 4 de la práctica 1.

## Costes y límites

| Servicio | Coste | A tener en cuenta |
|---|---|---|
| Lovable | Plan Pro, 25 €/mes | Lo contrata cada alumno |
| GitHub | Gratis | Las automatizaciones son gratuitas en repositorios públicos |
| Lovable Cloud | Incluido en tu plan de Lovable | Tu base de datos y el login usan créditos de tu plan |
| Cloudflare | Gratis | 100.000 peticiones al día, de sobra para el curso |

<p class="fuentes">Datos consultados el 5-nov-2026: acuerdo del curso (Lovable), docs.github.com (Actions), docs.lovable.dev (Lovable Cloud) y panel de Cloudflare Workers.</p>
