# Sesión 21-nov · Git, Deployment y Producción
## Propuesta de stack y flujo de despliegue

*Para: Gema y el entrenador de las sesiones de construcción · De: Jaime García · Reunión de coordinación, semana del 2-nov*
*Flujo probado el 30-oct con un proyecto real de Lovable.*

---

### 1. Stack

| Para qué | Herramienta |
|---|---|
| **Construir** el producto | **Lovable**, como propone el entrenador |
| **Versionar** y revisar cambios | **GitHub** (ramas, Pull Requests, checks) |
| **Datos, login y permisos** | **Supabase** |
| **Publicar** con entornos de pruebas y producción | **Cloudflare Pages**, gratuito, con una URL de pruebas por cambio y vuelta atrás en segundos |

El botón *Publish* de Lovable publica un único entorno. Para salir a producción con criterio hace falta un entorno de pruebas antes, y eso es lo que añade el despliegue.

### 2. Lo que hemos comprobado con Lovable (30-oct)

| Pregunta | Resultado |
|---|---|
| ¿Dónde guarda Lovable los cambios en GitHub? | En la **rama conectada** (por defecto `main`), con un commit por cambio |
| ¿Puede trabajar en otra rama? | **Sí.** *Settings → Git → Branch* permite elegir la rama o crearla desde Lovable |
| ¿Qué pasa si protegemos `main` para que solo entre por Pull Request? | **No se rompe nada.** Lovable guarda el cambio en una rama `lovable-sync` y avisa: *"Some changes were saved on a sync branch"* |
| ¿Lo que se aprueba en GitHub vuelve a Lovable? | **Sí.** El merge aparece en el historial de Lovable y en su vista previa |

**Conclusión:** Lovable encaja con un flujo profesional sin cambiar la forma de construir. Protegiendo `main`, el propio Lovable lleva al alumno a trabajar en una rama y a aprobar los cambios por Pull Request.

### 3. El flujo del alumno (4 pasos)

1. **Una vez:** conectar el proyecto de Lovable con GitHub y proteger `main` (2 minutos, con guía).
2. **Construir en Lovable** como siempre. Los cambios se guardan en una rama, no directamente en producción.
3. **Abrir un Pull Request en GitHub:** se comprueba solo y se publica en una URL de pruebas para verlo antes de salir.
4. **Aprobar (merge):** sale a producción y Lovable lo recoge solo.

### 4. Cómo se ve en la sesión del 21-nov

- El flujo completo se enseña con un **producto de ejemplo** que ya funciona, con pruebas, producción y vuelta atrás. Cada alumno practica sobre su copia.
- Un bloque **"Tu proyecto de Lovable"** muestra los 4 pasos anteriores sobre un proyecto de Lovable real.
- Después de la sesión, un **reto**: llevar su propio producto a producción con este flujo.

### 5. Qué ayudaría desde las sesiones de construcción

- Que cada alumno tenga su proyecto de Lovable **conectado a GitHub** antes del 21-nov.
- Usar **Supabase con un proyecto propio** del alumno. Si es posible, con un segundo proyecto para pruebas: el plan gratuito permite dos.

### 6. Preguntas para el entrenador

1. ¿Los alumnos editan **solo desde Lovable**, o también desde GitHub o un editor?
2. ¿Usan **Supabase propio** o el backend integrado de Lovable?
3. ¿En qué plan de Lovable están? ¿Pueden conectar GitHub sin coste?
4. ¿Hay algo del flujo que choque con cómo trabajáis en vuestras sesiones?
