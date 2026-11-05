# Lab · producto de la sesión

El producto de la sesión es un proyecto real de **Lovable**, publicado en Cloudflare Workers por CI/CD desde GitHub:

**https://github.com/jagarcig-ntt/feedback-hub** (público)

| Entorno | URL | Base de datos (Supabase) |
|---|---|---|
| Producción | https://jagarcig-ntt-feedback-hub.jagarcig.workers.dev/ | `feedbackhub-prod` |
| Staging | https://staging-jagarcig-ntt-feedback-hub.jagarcig.workers.dev/ | `feedbackhub-prod` (compartida) |
| Preview de cada PR | La publica un comentario en el PR | `feedbackhub-prod` (compartida) |

## Arquitectura (en 5 líneas)
- **App:** plantilla de Lovable (TanStack Start), construida desde el chat de Lovable.
- **Datos:** Supabase propio, conectado en *More → Connectors → Supabase*, con permisos en la base de datos (RLS).
- **Configuración:** Lovable sube un `.env` con valores públicos. Las claves secretas nunca van ahí.
- **Despliegue:** dos workflows de GitHub Actions publican en Cloudflare Workers.
- **Protección:** `main` solo acepta cambios por PR. Lovable desvía sus cambios a `lovable-sync`.

## Dónde está cada cosa
- Spec, plan, tareas y notas: [`sdd/specs/019-git-deploy-producto-lovable/`](../../../sdd/specs/019-git-deploy-producto-lovable/)
- Cómo se validó el flujo: [`sdd/specs/018-git-deploy-flujo-lovable/`](../../../sdd/specs/018-git-deploy-flujo-lovable/)
- Qué debe permitir enseñar el demo: sección 11 de cada versión formador en [`Teoria/Formador/`](../Teoria/Formador/)
