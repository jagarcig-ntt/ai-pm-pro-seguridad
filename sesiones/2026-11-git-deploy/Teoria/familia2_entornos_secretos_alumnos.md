# Familia 2 — Entornos y secretos: desarrollo, staging y producción

**Guía de referencia para el alumno**
Sesión "Git, Deployment y Producción" · AI PM Pro · The Hero Camp · 21 de noviembre de 2026

---

## Índice

1. [Antes de entrar: tres conceptos en lenguaje humano](#1-antes-de-entrar-tres-conceptos-en-lenguaje-humano)
2. [Para qué le importa a un PM](#2-para-qué-le-importa-a-un-pm)
3. [Idea 1 · Tres entornos, tres propósitos](#3-idea-1--tres-entornos-tres-propósitos)
4. [Idea 2 · La misma app, distinta configuración](#4-idea-2--la-misma-app-distinta-configuración)
5. [Idea 3 · Los secretos viven en la plataforma, no en el código](#5-idea-3--los-secretos-viven-en-la-plataforma-no-en-el-código)
6. [Cómo se ve en el producto demo](#6-cómo-se-ve-en-el-producto-demo)
7. [Caso real: Replit y SaaStr, julio de 2025](#7-caso-real-replit-y-saastr-julio-de-2025)
8. [El factor agente IA](#8-el-factor-agente-ia)
9. [Lo que el PM se lleva](#9-lo-que-el-pm-se-lleva)
10. [Fuentes](#10-fuentes)

---

## 1. Antes de entrar: tres conceptos en lenguaje humano

**Entorno.**
Cada sitio donde vive una copia de tu producto funcionando: tu ordenador, una versión de pruebas, la que usan tus clientes. Mismo producto, distinto escenario. Como un ensayo general frente al estreno. En muchas empresas los llaman *local*, *PRE* (preproducción) y *PRO*: son los mismos tres entornos que aquí llamamos development, staging y production.

**Variable de entorno.**
Un ajuste que el producto lee al arrancar y que cambia según dónde está: a qué base de datos se conecta, qué funcionalidades están encendidas, a qué servicio de pagos llama. El código no cambia; cambian sus ajustes.

**Secreto.**
Una variable de entorno que no puede ver cualquiera: la contraseña de la base de datos, la clave del servicio de pagos o la de la API de IA. Si alguien la tiene, puede actuar en nombre de tu producto.

---

## 2. Para qué le importa a un PM

Si construyes con Lovable o con un agente, es fácil que hoy tengas **un solo producto conectado a una sola base de datos**, y que pruebes los cambios directamente sobre ella. Mientras no hay usuarios no pasa nada. Cuando los hay, cada prueba se hace sobre datos reales de clientes reales.

Separar entornos es **separar el sitio donde se prueba del sitio donde se cobra**. Le da al equipo (y a los agentes) un lugar donde equivocarse sin consecuencias, y a ti un lugar donde ver el cambio funcionando antes de que lo vean tus usuarios.

Como PM no vas a configurar los entornos, pero sí decides cosas que dependen de ellos: cuándo algo está "validado en staging", qué datos se pueden usar para probar y quién tiene acceso a producción.

---

## 3. Idea 1 · Tres entornos, tres propósitos

| | **Development** | **Staging** | **Production** |
|---|---|---|---|
| **Para qué** | Construir y experimentar | Ensayo general: validar antes de salir | Servir a los usuarios |
| **Quién lo usa** | Quien desarrolla (persona o agente) | El equipo, el PM, quien valida | Los clientes |
| **Datos** | Falsos o de ejemplo | De prueba, **parecidos** a los reales | Reales |
| **Si se rompe** | No pasa nada | Molesta, pero nadie lo nota fuera | Lo notan tus usuarios |

Tres reglas que se derivan de la tabla:

- **Cada entorno tiene sus propios datos.** Desarrollo y staging nunca apuntan a la base de datos de producción.
- **Staging se parece a producción todo lo posible.** Si en staging funciona y en producción no, la diferencia entre ambos es el problema.
- **A producción solo llega lo que ha pasado por staging.** Es la promesa que hace que staging sirva para algo.

> En los planes gratuitos, "staging" suele ser una **versión de previsualización**: cada rama o cada PR se publica automáticamente en una URL propia para probarla. El concepto es el mismo, un sitio para validar antes de producción, aunque no se llame "staging".

---

## 4. Idea 2 · La misma app, distinta configuración

El código que se ejecuta en staging y en producción es **exactamente el mismo**. Lo que cambia es su configuración, que se le da desde fuera mediante variables de entorno:

| Variable | Development | Staging | Production |
|---|---|---|---|
| `DATABASE_URL` | base de datos local | proyecto de base de datos de staging | proyecto de base de datos de producción |
| `PAYMENTS_MODE` | `test` | `test` | `live` |
| `FEATURE_NUEVO_CHECKOUT` | `true` | `true` | `false` |

Esto tiene dos consecuencias:

- **Lo que validas en staging es lo que sale a producción.** No se "prepara una versión para producción": se cambia la configuración.
- **Las variables de entorno son también interruptores.** `FEATURE_NUEVO_CHECKOUT` es el *feature flag* de la Familia 1: el mismo código puede estar encendido en staging y apagado en producción hasta que decidas salir.

**Lo que esto cambia para el PM:** "¿está activado en producción?" se convierte en una pregunta con respuesta concreta, y encender una funcionalidad puede ser una decisión de producto, no un despliegue.

---

## 5. Idea 3 · Los secretos viven en la plataforma, no en el código

Las variables normales pueden estar escritas en un fichero del repositorio. **Los secretos, nunca.** Cada uno vive en un sitio:

| Dónde | Para qué | Cómo se protege |
|---|---|---|
| Fichero `.env` en tu ordenador | Desarrollo local | Está en `.gitignore`: Git lo ignora y nunca se sube |
| *Secrets* de GitHub | Que el CI (Familia 3) pueda usarlos | Cifrados; nadie los puede leer, ni siquiera tú, una vez guardados |
| Variables de la plataforma de despliegue | Staging y producción | Cifradas y separadas por entorno |

En el repositorio solo se sube un `.env.example`: **la lista de variables que hacen falta, sin valores**. Sirve de documentación para cualquier persona o agente que llegue al proyecto.

Y cada entorno tiene **sus propios secretos**: la clave de pagos de staging no es la de producción. Si algo se filtra desde staging, producción no se ve afectada.

> Qué pasa cuando un secreto se filtra, y cómo detectarlo, es el tema de la sesión de **Seguridad del 11 de diciembre**. Hoy nos quedamos en dónde vive cada cosa.

---

## 6. Cómo se ve en el producto demo

<!-- ajustar tras SPEC-011/013: plataforma de despliegue, nombres de variables y proyectos de base de datos reales -->

El producto demo tiene tres entornos:

- **Development:** se ejecuta en local con un `.env` propio y datos de ejemplo.
- **Staging:** una versión de previsualización que se publica automáticamente con su propia base de datos de pruebas.
- **Production:** la URL pública, con su propia base de datos.

En la demo veremos:
- el `.env.example` del repositorio;
- las variables configuradas en la plataforma de despliegue, separadas por entorno;
- los *secrets* de GitHub;
- un *feature flag* encendido en staging y apagado en producción.

**Tu práctica: el mapa de entornos.** Primero lo rellenas para el producto demo y después, en 5 minutos, para **tu propio producto**:

| | Development | Staging | Production |
|---|---|---|---|
| ¿Dónde se ejecuta? | | | |
| ¿Qué base de datos usa? | | | |
| ¿Qué secretos necesita y dónde viven? | | | |
| ¿Quién tiene acceso? | | | |

Si al rellenar el de tu producto descubres que dos columnas son iguales, ya sabes por dónde empezar.

---

## 7. Caso real: Replit y SaaStr, julio de 2025

Jason Lemkin, fundador de SaaStr, hizo un experimento público de 12 días construyendo una aplicación con el agente de IA de Replit. El noveno día, en plena **congelación de código** y pese a la instrucción expresa de no hacer cambios sin su aprobación, el agente ejecutó comandos que **borraron la base de datos de producción**: los registros de 1.206 directivos y de más de mil empresas.

Según el propio Lemkin, el agente le dijo después que los datos no se podían recuperar. No era cierto: los recuperó.

La respuesta del CEO de Replit, Amjad Masad, fue calificarlo de "inaceptable" y de algo que "nunca debería ser posible". Anunció dos cambios en la plataforma:

- **separación automática entre la base de datos de desarrollo y la de producción**, y
- un modo de solo planificación, en el que el agente no puede tocar nada.

**La lección para la Familia 2:** el agente se equivocó, pero el problema de fondo es que **desde donde trabajaba se podía tocar producción**. Una instrucción ("no toques nada") no es una barrera. Un entorno separado sí lo es. Es justo lo que Replit añadió después.

---

## 8. El factor agente IA

En esta fase, el agente de entornos y secretos del **Deployment Agent Squad**:

**Hace bien:**
- localizar todas las variables que usa el código y generar el `.env.example`;
- preparar la lista de lo que hay que configurar en cada entorno y en cada plataforma;
- avisar si encuentra un secreto escrito en el código o un `.env` fuera de `.gitignore`;
- comprobar que staging y producción no comparten base de datos.

**No delegues:**
- **el acceso a producción.** El agente trabaja en desarrollo y staging. Producción la toca el proceso de despliegue (Familia 3), no el agente;
- **los valores de los secretos.** No pegues claves reales en el chat de un agente: se configuran directamente en la plataforma;
- **qué datos se usan para probar.** Copiar datos reales de clientes a staging "para que sea realista" es una decisión de producto y legal, no técnica.

---

## 9. Lo que el PM se lleva

1. **Probar y cobrar no se hacen en el mismo sitio.** Cada entorno tiene sus propios datos.
2. **El código es el mismo; la configuración cambia.** Y una variable de entorno puede ser un interruptor de producto.
3. **Los secretos viven en la plataforma, nunca en el código**, y producción no está al alcance del agente.

---

## 10. Fuentes

**Caso documentado:**
- eWeek, "AI Agent Wipes Production Database, Then Lies About It": https://www.eweek.com/news/replit-ai-coding-assistant-failure/
- heise online: https://heise.de/-10499597
- The New Stack: https://thenewstack.io/?p=22830453
- AI Incident Database: https://incidentdatabase.ai/ja/entities/jason-lemkin/

**Para profundizar:**
- The Twelve-Factor App, configuración (en español): https://12factor.net/es/config
- GitHub Docs, uso de secretos en GitHub Actions: https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions
- Supabase, gestión de entornos: https://supabase.com/docs/guides/deployment/managing-environments
- Vercel, entornos: https://vercel.com/docs/deployments/environments
- Cloudflare Pages, versiones de previsualización: https://developers.cloudflare.com/pages/configuration/preview-deployments/
