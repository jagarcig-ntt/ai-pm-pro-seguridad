# Kit: tu producto en producción

**AI PM Pro · The Hero Camp · Sesión "Git, Deployment y Producción" · 21 de noviembre de 2026**

Todo lo que necesitas para seguir trabajando como hoy, sin haber estado en la sesión.

## 1. El ciclo de cada cambio

1. **Pides el cambio en Lovable.** Como `main` está protegida, Lovable lo guarda en la rama `lovable-sync` y avisa con *"Some changes were saved on a sync branch"*.
2. **Abres un Pull Request:** `https://github.com/<usuario>/<repo>/compare/main...lovable-sync`. Rellena la plantilla, sobre todo *¿Qué pasa si falla?* y *¿Cómo se apaga?*
3. **Esperas los checks en verde** y pruebas el cambio en la **URL de preview** del comentario. Haz lo principal de tu producto, no solo abrir la página.
4. **Haces el merge** con **Create a merge commit**, nunca *Squash* ni *Rebase*. No borres `lovable-sync`.
5. **Abres tu web de producción** y compruebas el cambio. Verde no significa que funcione.

**Cuidado con la base de datos:** Lovable aplica los cambios de base de datos en cuanto pulsas *Allow*, antes del Pull Request. Lee el SQL antes de aprobarlo. Y si borra o cambia permisos, termina el ciclo enseguida.

## 2. Tu mapa de entornos

| | Development | Staging | Production |
|---|---|---|---|
| **Dónde** | Vista previa de Lovable | URL de preview de cada Pull Request | URL de tu Worker en Cloudflare |
| ¿Qué base de datos usa? | | | |
| ¿Qué secretos necesita y dónde viven? | | | |
| ¿Quién tiene acceso? | | | |

En tu producto, los tres entornos **comparten la base de datos**: lo que escribas en una preview llega a tus datos reales. Separarla es el siguiente paso cuando tengas usuarios reales.

<div class="salto"></div>

## 3. Checklist de go-live

Antes de un cambio importante, responde **sí o no**. Si hay un "no", decide a sabiendas: lo arreglas, aceptas el riesgo o no sales.

| # | Pregunta | Sí / No |
|---|---|---|
| 1 | ¿Lo que sale ha pasado por un PR revisado, con checks en verde? | |
| 2 | ¿Se ha probado en la preview del PR, con el flujo principal de usuario de principio a fin? | |
| 3 | ¿Están configuradas en producción todas las variables y secretos que necesita? | |
| 4 | ¿Cambia algo en la base de datos? Si es así, ¿se puede deshacer? | |
| 5 | ¿Sabemos cómo volver atrás y cuánto se tarda? | |
| 6 | ¿Hay forma de apagarlo sin cambiar el código (*feature flag*)? | |
| 7 | ¿Alguien estará mirando las señales durante la primera hora tras salir? | |
| 8 | ¿Saben soporte y los usuarios afectados lo que cambia? | |

**Volver atrás:**

- **Rollback**, para recuperar el servicio ya: Cloudflare → *Workers & Pages → tu Worker → Deployments → versión anterior → Rollback*. No deshace los cambios de base de datos.
- **Revert**, para dejar el código bien: en el Pull Request que causó el fallo, botón **Revert**. GitHub crea un Pull Request nuevo que lo deshace; haz el merge.

## 4. Chuleta de Git sin terminal

| Palabra | Qué es | Dónde lo ves |
|---|---|---|
| Repositorio | La carpeta de tu producto con memoria | GitHub, tu repo |
| `main` | La versión que funciona y que ven tus usuarios | GitHub, rama por defecto |
| Rama | Una copia de trabajo para cambiar sin tocar `main` | GitHub, selector de ramas |
| Rama conectada | Donde escribe Lovable | Lovable, *Settings → Git* |
| `lovable-sync` | Donde Lovable guarda tus cambios si `main` está protegida | GitHub, ramas |
| Commit | Una foto del producto con una explicación | GitHub, pestaña *Commits* |
| Pull Request (PR) | La petición de que un cambio entre en `main` | GitHub, pestaña *Pull requests* |
| Check | La comprobación automática de un PR: verde o rojo | El propio PR, abajo |
| Preview | Tu cambio publicado en su propia URL antes del merge | Comentario automático del PR |
| Merge | Integrar el cambio en `main`: es decidir salir a producción | Botón del PR |
| Ruleset | Las reglas que protegen `main` | GitHub, *Settings → Rules* |
| Workflow | La receta automática que comprueba y publica | `.github/workflows/` y pestaña *Actions* |
| Secreto | Una clave que nadie puede leer una vez guardada | GitHub, *Settings → Secrets and variables → Actions* |
| Rollback | Volver a publicar la versión anterior | Cloudflare, *Deployments* |
| Revert | Un cambio nuevo que deshace otro | Botón del PR ya fusionado |

## 5. Los ficheros

Los tres ficheros que pediste a Lovable están en la carpeta [`Lab/workflows/`](../Lab/workflows/) de este portal:

- `comprobar-pr.yml`: comprueba cada cambio.
- `desplegar.yml`: publica en Cloudflare y comprueba que la web responde.
- `pull_request_template.md`: la plantilla de tus Pull Requests.

La práctica completa, paso a paso, está en la **guía de la práctica**.

## 6. Si no te dio tiempo

Termínalo por tu cuenta antes del Demo Day con la guía de la práctica. Y un aviso: **Supabase gratis pausa los proyectos tras una semana sin uso**. Entra en tu web unos días antes del Demo Day y, si no funciona, reactívalo desde el panel de Supabase.

El 11 de diciembre añadimos el check de seguridad a tu CI.
