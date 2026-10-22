# Glosario — Git, Deployment y Producción

**Guía de referencia para el alumno**
Sesión "Git, Deployment y Producción" · AI PM Pro · The Hero Camp · 21 de noviembre de 2026

Los términos de las cuatro familias, con la misma definición que en cada guía. Entre paréntesis, la familia donde se explica.

---

## Código y cambios

| Término | Qué es |
|---|---|
| **Repositorio** (F1) | La carpeta de tu producto con memoria: guarda cada versión de cada fichero, quién la cambió, cuándo y por qué. |
| **`main`** (F1) | La rama principal. La versión del producto que funciona y que se despliega. Regla: `main` siempre funciona. |
| **Rama** (F1) | Una copia de trabajo paralela del producto para hacer un cambio sin tocar `main`. Un propósito por rama y vida corta. |
| **Commit** (F1) | Una foto del producto con una explicación de qué cambió. Bueno si dice qué y por qué, hace una sola cosa y deja el producto funcionando. |
| **Pull Request (PR)** (F1) | La petición de que los cambios de una rama entren en `main`. Es el punto de control: descripción, revisión, checks y preview. |
| **Merge** (F1, F3) | Integrar los cambios de un PR en `main`. Con despliegue continuo, hacer merge es decidir salir a producción. |
| **Fork** (F1) | Una copia de un repositorio en tu propia cuenta de GitHub. En la sesión practicáis sobre un fork del producto demo. |
| **Revert** (F4) | Un commit nuevo que deshace un cambio anterior y pasa por el flujo normal (PR, checks, despliegue). |

## Entornos y configuración

| Término | Qué es |
|---|---|
| **Entorno** (F2) | Cada sitio donde vive una copia del producto funcionando. Mismo producto, distinto escenario. |
| **Development** (F2) | El entorno para construir y experimentar, con datos falsos. Si se rompe, no pasa nada. |
| **Staging** (F2) | El ensayo general: igual que producción, con datos de prueba. A producción solo llega lo que ha pasado por staging. En muchas empresas se llama **PRE** (preproducción). |
| **Production** (F2) | El entorno que usan los clientes, con datos reales. También se le llama **PRO**. |
| **Preview** (F2, F3) | Una versión del producto publicada automáticamente para un PR o una rama, en su propia URL. En los planes gratuitos hace de staging. |
| **Variable de entorno** (F2) | Un ajuste que el producto lee al arrancar y que cambia según el entorno: base de datos, funcionalidades encendidas, servicios externos. |
| **Feature flag** (F1, F2, F4) | Un interruptor (normalmente una variable de entorno) para encender o apagar una funcionalidad sin desplegar de nuevo. |
| **Secreto** (F2) | Una variable de entorno que no puede ver cualquiera: contraseñas y claves. Vive en la plataforma, nunca en el código. |
| **`.env`** (F2) | El fichero con las variables y secretos en tu ordenador. Nunca se sube al repositorio. |
| **`.gitignore`** (F2) | La lista de ficheros que Git ignora. `.env` tiene que estar en ella. |
| **`.env.example`** (F2) | La lista de variables que necesita el producto, **sin valores**. Sí se sube al repositorio, como documentación. |

## Automatización y despliegue

| Término | Qué es |
|---|---|
| **CI (integración continua)** (F3) | El control de calidad automático: cada cambio propuesto se construye y se prueba solo. |
| **CD (despliegue continuo)** (F3) | La publicación automática: un cambio aprobado llega a staging y a producción sin pasos manuales. |
| **Workflow** (F3) | El fichero con la receta automática (cuándo, qué pasos, qué necesita). En GitHub vive en `.github/workflows/`. |
| **GitHub Actions** (F3) | El sistema de GitHub que ejecuta los workflows. En los forks viene desactivado por defecto. |
| **Check** (F3) | El resultado de un workflow sobre un PR: ✅ verde o ❌ rojo. Un PR en rojo no se integra. |
| **Ruleset** (F1, F3) | Las reglas del repositorio: por ejemplo, que `main` solo acepte cambios vía PR aprobado y con checks en verde. |
| **Despliegue (deploy)** (F3) | Publicar una versión del producto en un entorno. |
| **Despliegue por fases** (F3) | Llevar un cambio por etapas (preview → staging → producción) en lugar de a todos de golpe. |

## Salida a producción y recuperación

| Término | Qué es |
|---|---|
| **Go-live** (F4) | El momento en que un cambio pasa a estar disponible para usuarios reales. Una decisión de negocio. |
| **Checklist de go-live** (F4) | Las 8 preguntas de sí o no que se responden antes de salir. |
| **Rollback** (F4) | Volver a publicar la versión anterior que funcionaba. El botón de "deshacer" de producción. |
| **Prueba de humo** (F4) | Una comprobación rápida tras desplegar: ¿cargan las páginas y responden los endpoints principales? |
| **Monitorización** (F4) | Vigilar de forma continua cómo se comporta el producto en producción. |
| **Las tres señales** (F4) | Errores, rendimiento y uso. La tercera la ve, sobre todo, el PM. |

## Agentes

| Término | Qué es |
|---|---|
| **Deployment Agent Squad** (F1–F4) | El equipo de agentes que os lleváis: uno por fase (rama y PR, entornos y secretos, CI, despliegue, go-live). Proponen y ejecutan; las decisiones las toma una persona. |
