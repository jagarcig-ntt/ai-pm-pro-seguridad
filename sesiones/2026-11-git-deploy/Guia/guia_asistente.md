# Chuleta de las prácticas · Salas

**AI PM Pro · The Hero Camp · Sesión "Git, Deployment y Producción" · 21 de noviembre de 2026**

Un resumen de lo que hacen los alumnos en cada práctica y de los atascos que salieron al prepararla, por si te sirve en las salas. Los pasos completos, con los botones *Copiar*, están en el portal: https://jagarcig-ntt.github.io/ai-pm-pro-seguridad/sesiones/2026-11-git-deploy/

## Práctica 1 · Primer despliegue

1. **Lovable:** abrir su proyecto y comprobar el nombre arriba a la izquierda.
2. **Conectar con GitHub:** en Lovable, *Settings → Git* hasta ver **Connected**. Después, en GitHub, *Settings → General → Danger Zone → Change visibility → Public*.
3. **Token de Cloudflare**, sin compartir pantalla: *My Profile → API Tokens → Create Custom Token*, con `Account · Workers Scripts · Edit` y *All accounts*. El **Account ID** está en *Workers & Pages*, columna derecha.
4. **Secretos en GitHub**, sin compartir pantalla: *Settings → Secrets and variables → Actions*, con `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`.
5. **Los tres prompts:** botón *Copiar* del portal → chat de Lovable → enviar. Uno a uno, esperando a que Lovable termine.
6. **GitHub → *Actions* → Desplegar:** en verde en 1–3 minutos. La URL aparece en el resumen, en **Publicado en**.
7. **Abrir la web** y probar lo principal del producto.
8. **Si tiene login:** en Lovable, *More → Users → Settings → Advanced → Allowed URLs*, las tres direcciones del portal.

Al acabar, pegan su URL de producción en el chat.

## Práctica 2 · Primer cambio por Pull Request

1. **Proteger `main`:** GitHub → *Settings → Rules → Rulesets → New branch ruleset*. Nombre `main siempre funciona`, **Active**, *Include default branch*, las reglas del portal y **Create**.
2. **Un cambio pequeño en Lovable.** Sale el aviso naranja *"Some changes were saved on a sync branch"*: es lo esperado.
3. **Abrir el Pull Request** con el enlace del portal (`compare/main...lovable-sync`) y rellenar la plantilla.
4. **Checks en verde** y abrir la **preview** del comentario.
5. **Merge** con **Create a merge commit**, sin borrar la rama.
6. **Abrir producción** y ver el cambio.

Al acabar, pegan el enlace de su Pull Request en el chat.

## Atascos habituales

| Lo que pasa | Lo que suele resolverlo |
|---|---|
| En *Settings → Git* de Lovable no sale su cuenta | Autorizar a Lovable en GitHub, en su cuenta personal |
| Ha perdido el token antes de guardarlo | Crear otro: Cloudflare solo lo enseña una vez |
| Comparte pantalla con el token visible | Que deje de compartir, revoque ese token y cree otro |
| Los tres prompts pegados en un solo mensaje | Pegarlos de nuevo, uno a uno |
| Está en otro proyecto de Lovable | Abrir el suyo y repetir los prompts |
| En GitHub no aparece `.github/workflows/` | Repetir el prompt en Lovable |
| Rojo en el paso **0** de Desplegar | Falta un secreto o el nombre no coincide, letra a letra |
| Rojo en el paso **5** | No compila: *Fix build* en Lovable |
| Rojo en el paso **7** | Token sin permiso *Workers Scripts · Edit* o Account ID equivocado: crear otro token y sustituir el secreto |
| Rojo en el paso **9** | Publicado, pero la web da error: lo miramos en el rescate |
| El correo de confirmación lleva a la vista previa de Lovable | Falta el paso del login (*Allowed URLs*); registrarse de nuevo con otro email |
| El cambio entra directo, sin aviso naranja | El ruleset está en *Disabled* o sin rama |
| No aparece `Comprobar el PR` en el ruleset | Escribirlo igualmente |
| Ofrece *Squash* o *Rebase* | Solo **Create a merge commit**: Lovable no admite los otros |
| Checks del PR en rojo | Mirar en qué paso, como en las filas de arriba |

¡Gracias por la ayuda!
