# Sesión 21-nov · Git, Deployment y Producción
## Propuesta de stack, flujo de despliegue y estructura de la sesión

*Para: Gema y el entrenador de las sesiones de construcción · De: Jaime García · Reunión de coordinación, semana del 2-nov*
*Flujo con Lovable probado el 30-oct y su despliegue el 2-nov, con un proyecto real.*

---

### 1. Stack

| Para qué | Herramienta |
|---|---|
| **Construir** el producto | **Lovable**, como propone el entrenador |
| **Versionar** y revisar cambios | **GitHub** (ramas, Pull Requests, checks) |
| **Datos, login y permisos** | **Supabase** |
| **Publicar** con entornos de pruebas y producción | **Cloudflare Pages / Workers**, gratuito, con una URL de pruebas por cambio y vuelta atrás en segundos |

El botón *Publish* de Lovable publica un único entorno. Para salir a producción con criterio hace falta un entorno de pruebas antes, y eso es lo que añade el despliegue.

### 2. Lo que hemos comprobado con Lovable (30-oct)

| Pregunta | Resultado |
|---|---|
| ¿Dónde guarda Lovable los cambios en GitHub? | En la **rama conectada** (por defecto `main`), con un commit por cambio |
| ¿Puede trabajar en otra rama? | **Sí.** *Settings → Git → Branch* permite elegir la rama o crearla desde Lovable |
| ¿Qué pasa si protegemos `main` para que solo entre por Pull Request? | **No se rompe nada.** Lovable guarda el cambio en una rama `lovable-sync` y avisa: *"Some changes were saved on a sync branch"* |
| ¿Lo que se aprueba en GitHub vuelve a Lovable? | **Sí.** El merge aparece en el historial de Lovable y en su vista previa |

**Conclusión:** Lovable encaja con un flujo profesional sin cambiar la forma de construir. Protegiendo `main`, el propio Lovable lleva al alumno a trabajar en una rama y a aprobar los cambios por Pull Request.

**Despliegue de un proyecto de Lovable: probado el 2-nov.** El proyecto de prueba de Lovable se publica en Cloudflare **sin tocar su código**, con dos entornos:
- **Producción:** `jagarcig-ntt-feedback-hub.jagarcig.workers.dev`;
- **Pruebas (staging):** `staging-jagarcig-ntt-feedback-hub.jagarcig.workers.dev`.

Lovable ya genera sus proyectos preparados para Cloudflare. Como todos los alumnos parten de la misma plantilla, se prepara **un único proceso automático, probado por nosotros**, que cada alumno copia en su proyecto.

### 3. Estructura de la sesión: **cada alumno sale con su propio producto en staging y en producción**

| Parte | Contenido |
|---|---|
| **Teoría** · 4 familias | Git profesional · Entornos y secretos · CI/CD y despliegue · Salir a producción y volver atrás. Con un producto de ejemplo en pantalla |
| **Práctica 1** · Gestión de cambios | Sobre **su producto de Lovable**: proteger `main` → trabajar en una rama desde Lovable (o editar desde GitHub) → abrir un Pull Request → revisar → aprobar |
| **Práctica 2** · Despliegue automático | Añadir a su repositorio el proceso de despliegue que les damos → abrir un Pull Request → verlo en su URL de pruebas (staging) → aprobar → **su producto en producción** |
| **Cierre** | Cada alumno comparte su URL de staging y de producción |

Para acompañar a 12 personas a la vez, los alumnos cuentan con un **equipo de agentes de IA** que les ayuda a configurar su repositorio y el despliegue. Si alguien se atasca, sigue la práctica sobre una copia del producto de ejemplo, que ya funciona.

### 4. El flujo del alumno (4 pasos)

1. **Una vez:** proteger `main` y añadir el proceso de despliegue (en la sesión, con guía).
2. **Construir en Lovable** como siempre. Los cambios se guardan en una rama, no directamente en producción.
3. **Abrir un Pull Request en GitHub:** se comprueba solo y se publica en una URL de pruebas para verlo antes de salir.
4. **Aprobar (merge):** sale a producción y Lovable lo recoge solo.

### 5. Requisitos previos (imprescindibles para que la práctica funcione)

En una sesión de 4 horas por Zoom no hay tiempo de resolver altas de cuentas. Cada alumno debería llegar con:

- [ ] Su **proyecto de Lovable conectado a GitHub** (*Settings → Git*).
- [ ] Una **cuenta de Cloudflare** (gratuita).
- [ ] Su producto usando **Supabase** con un proyecto propio. Ideal: un segundo proyecto para pruebas; el plan gratuito permite dos. Si no, en la sesión staging y producción comparten base de datos y separarla queda como reto posterior.

Os paso una guía de una página para enviarla 48 horas antes.

### 6. Preguntas para el entrenador

1. ¿Los alumnos editan **solo desde Lovable**, o también desde GitHub o un editor?
2. ¿Usan **Supabase propio** o el backend integrado de Lovable?
3. ¿En qué plan de Lovable están? ¿Pueden conectar GitHub sin coste?
4. ¿Se puede pedir en vuestras sesiones que **conecten GitHub y creen la cuenta de Cloudflare** antes del 21-nov?
5. ¿Hay algo del flujo que choque con cómo trabajáis en vuestras sesiones?
