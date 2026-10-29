# Lab · producto demo FeedbackHub

El producto demo de la sesión vive en **su propio repositorio**, para que los alumnos puedan hacer fork de un repo limpio:

**https://github.com/jagarcig-ntt/feedbackhub-demo** (público)

| Entorno | URL | Base de datos (Supabase) |
|---|---|---|
| Production | https://feedbackhub-demo.pages.dev | `feedbackhub-prod` |
| Staging (preview) | https://staging-prueba.feedbackhub-demo.pages.dev | `feedbackhub-staging` |
| Development | `npm run dev` en local | `feedbackhub-staging` |

## Arquitectura (en 5 líneas)
- **Frontend:** HTML y JS sin compilación (`public/`). Formulario público y panel con login de Supabase.
- **API:** Cloudflare Pages Functions (`functions/`). Siempre con la clave pública de Supabase, nunca con la secreta.
- **Datos:** Supabase con permisos en la base de datos (RLS). Cualquiera envía feedback y solo los administradores lo leen.
- **Configuración:** variables por entorno en Cloudflare. El navegador las pide a `/api/config`.
- **Despliegue:** GitHub Actions → Cloudflare Pages (SPEC-012). Rollback desde el panel en unos 5 segundos.

## Dónde está cada cosa
- Spec, plan, tareas y notas: [`sdd/specs/011-git-deploy-producto-demo/`](../../../sdd/specs/011-git-deploy-producto-demo/)
- Qué debe permitir enseñar el demo: sección 11 de cada versión formador en [`Teoria/Formador/`](../Teoria/Formador/)
- Checklist de go-live: [`docs/checklist-go-live.md`](https://github.com/jagarcig-ntt/feedbackhub-demo/blob/main/docs/checklist-go-live.md) en el repo del demo

## Trazabilidad
Los commits del repo del demo llevan el mismo prefijo que los de este repo (`[SPEC-011] Tnn …`). El historial de `main` del demo es material de la Familia 1, idea 2: un commit por cambio, con mensaje con sentido.
