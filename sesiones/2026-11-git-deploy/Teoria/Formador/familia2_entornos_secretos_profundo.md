# Familia 2 — Entornos y secretos: desarrollo, staging y producción

**Guía del formador** · versión profunda
Sesión "Git, Deployment y Producción" · AI PM Pro · The Hero Camp · 21 de noviembre de 2026

> Es la misma guía que reciben los alumnos, más los bloques marcados con 🎓, que son solo para ti. Bloque T2 de la escaleta (SPEC-010 v4.1): **15 min**, con unos 4 de demo. El mapa de entornos pasa al kit. Este documento es de referencia: qué se cuenta exactamente lo fija el guion (SPEC-015).

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
11. [🎓 Mapa para specs posteriores](#11--mapa-para-specs-posteriores)

---

## 1. Antes de entrar: tres conceptos en lenguaje humano

**Entorno.**
Cada sitio donde vive una copia de tu producto funcionando: tu ordenador, una versión de pruebas, la que usan tus clientes. Mismo producto, distinto escenario. Como un ensayo general frente al estreno. En muchas empresas los llaman *local*, *PRE* (preproducción) y *PRO*: son los mismos tres entornos que aquí llamamos development, staging y production.

**Variable de entorno.**
Un ajuste que el producto lee al arrancar y que cambia según dónde está: a qué base de datos se conecta, qué funcionalidades están encendidas, a qué servicio de pagos llama. El código no cambia; cambian sus ajustes.

**Secreto.**
Una variable de entorno que no puede ver cualquiera: la contraseña de la base de datos, la clave del servicio de pagos o la de la API de IA. Si alguien la tiene, puede actuar en nombre de tu producto.

> 🎓 **Intención:** tres palabras y ninguna más. Si alguien pregunta por *Docker*, *Kubernetes* o *servidores*, apárcalo: "eso es el cómo; hoy vemos el qué".
> - **Analogía alternativa:** un restaurante. Development es la cocina de pruebas, staging la cata con el equipo y production el comedor con clientes. La receta (el código) es la misma; cambian los ingredientes de verdad (la configuración).

---

## 2. Para qué le importa a un PM

Si construyes con Lovable o con un agente, es fácil que hoy tengas **un solo producto conectado a una sola base de datos**, y que pruebes los cambios directamente sobre ella. Mientras no hay usuarios no pasa nada. Cuando los hay, cada prueba se hace sobre datos reales de clientes reales.

Separar entornos es **separar el sitio donde se prueba del sitio donde se cobra**. Le da al equipo (y a los agentes) un lugar donde equivocarse sin consecuencias, y a ti un lugar donde ver el cambio funcionando antes de que lo vean tus usuarios.

Como PM no vas a configurar los entornos, pero sí decides cosas que dependen de ellos: cuándo algo está "validado en staging", qué datos se pueden usar para probar y quién tiene acceso a producción.

> 🎓 **Pregunta para el chat:** "¿Cuántas bases de datos tiene hoy vuestro producto? ¿Una, dos, no lo sé?". Las respuestas "una" y "no lo sé" son la entrada perfecta a la idea 1. No juzgues: es lo normal con Lovable.

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

**En vuestro producto:** staging y producción **comparten la base de datos**. Para un primer MVP es una decisión razonable, pero tomada a sabiendas: lo que escribas en una preview llega a tus datos reales, y un cambio de tabla afecta a todos los entornos. Separarlos es el siguiente paso cuando tengas usuarios reales.

> En los planes gratuitos, "staging" suele ser una **versión de previsualización**: cada rama o cada PR se publica automáticamente en una URL propia para probarla. El concepto es el mismo, un sitio para validar antes de producción, aunque no se llame "staging".

> 🎓 **Errores de comprensión esperados**
> - *"Staging es para empresas grandes".* → Staging es "el sitio donde miras antes de que lo vean tus clientes". En los planes gratuitos es la preview de cada PR y no cuesta nada.
> - *"Lovable ya es mi staging".* → Lovable es development: corre en otro sitio. El 5-nov, una app funcionaba en Lovable y daba 500 en Cloudflare (`sdd/specs/019-git-deploy-producto-lovable/notas.md`).
> - *"Si staging es igual que producción, ¿para qué dos?".* → Igual en código y configuración; distinto en datos y en quién lo usa. Esa es toda la gracia.
> - *"Puedo usar los datos de producción en staging para que sea realista".* → Esa es una decisión de producto y legal, no técnica. Lánzala como pregunta y deja el detalle para el 11 de diciembre.

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

> 🎓 **Puente con la Familia 1:** señala `FEATURE_NUEVO_CHECKOUT` en la tabla y recuerda el caso Google: "esto es el interruptor que les faltó". Es el momento en que F1 y F2 encajan; dedícale 30 segundos.
>
> **Error esperado:** *"Entonces hago una versión del código para cada entorno".* → No: una sola versión, tres configuraciones. Si el código cambia entre staging y producción, staging deja de servir.
>
> **Error esperado (visto al preparar el demo, 22-oct):** crear variables con sufijo por entorno (`SUPABASE_URL_PROD`, `SUPABASE_URL_STG`) en una misma lista. Así el código tiene que saber en qué entorno está para elegir cuál leer. Lo correcto es **el mismo nombre en todos los entornos, con distinto valor**.

---

## 5. Idea 3 · Los secretos viven en la plataforma, no en el código

Las variables normales pueden estar escritas en un fichero del repositorio. **Los secretos, nunca.** Cada uno vive en un sitio:

| Dónde | Para qué | Cómo se protege |
|---|---|---|
| Fichero `.env` del repositorio | Valores **públicos**, como la URL de Supabase y su clave pública | No se protege: cualquiera puede leerlo |
| *Secrets* de GitHub | Que el CI (Familia 3) pueda usarlos | Cifrados; nadie los puede leer, ni siquiera tú, una vez guardados |
| Variables de la plataforma de despliegue | Lo que necesita tu app al ejecutarse en Cloudflare | Cifradas si las guardas como secreto |

Lovable sube un `.env` a tu repositorio. Es aceptable **solo porque lleva valores públicos**. La regla es sencilla: **en el `.env` del repo, solo lo que podrías publicar en tu web**. La clave pública de Supabase empieza por `sb_publishable_`. La secreta empieza por `sb_secret_` y nunca va ahí.

Tu repositorio es público y las clases se graban: no enseñes nunca un secreto en pantalla ni lo pegues en el chat de Lovable.

Cuando separes entornos, cada uno tendrá **sus propios secretos**: si algo se filtra desde staging, producción no se ve afectada.

> Qué pasa cuando un secreto se filtra, y cómo detectarlo, es el tema de la sesión de **Seguridad del 11 de diciembre**. Hoy nos quedamos en dónde vive cada cosa.

> 🎓 **Delimitación con el 11-dic (CA7):** aquí solo se trata **dónde vive** cada secreto. Si preguntan "¿y si ya subí una clave a GitHub?", la respuesta es: "trátala como comprometida y cámbiala. El porqué y el cómo detectarlo lo vemos el 11 de diciembre". No abras esa conversación aquí: es otra sesión entera.
>
> **En la demo:** enseña el `.env` de `feedback-hub` y la pantalla de *Secrets* de GitHub (sin revelar valores). Que vean que ni el propio dueño puede leer un secreto una vez guardado.
>
> **Si preguntan si la clave pública es segura:** se puede publicar porque quien protege los datos son las políticas de acceso (RLS) de Supabase. Si una tabla permite leer a cualquiera, cualquiera puede leerla. El detalle va al 11-dic.
>
> **Caso propio (preparando el demo anterior, 22-oct-2026):** al configurar Cloudflare se copió la clave **secreta** de Supabase en lugar de la **pública**, y la app la estaba enviando a cualquier navegador. Se detectó comprobando solo el prefijo de la clave, se revocó y se cambió por la pública. Cuéntalo en una frase: es el error más fácil del mundo y la razón de que existan las pruebas. El detalle va al 11-dic.

---

## 6. Cómo se ve en el producto demo

Tu producto tiene tres entornos:

| | Dónde está | Para qué |
|---|---|---|
| **Development** | Vista previa de Lovable | Ver el cambio mientras lo construyes |
| **Staging** | URL de preview de cada PR, en Cloudflare | Probarlo como en producción, antes del merge |
| **Production** | URL de tu Worker en Cloudflare | Lo que ven tus usuarios |

Los tres usan **el mismo proyecto de Supabase**.

**Por qué la vista previa de Lovable no es staging:** corre en la infraestructura de Lovable, no en Cloudflare. En el ensayo de esta sesión, una app funcionaba en Lovable y daba error en Cloudflare. Solo una preview en el mismo sitio que producción lo enseña antes de salir.

**En la demo verás, en `feedback-hub`:**
1. La URL de producción y la de una preview, una al lado de la otra.
2. El `.env` del repositorio, solo con valores públicos.
3. Los *secrets* de GitHub: `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`.

**Para después de la sesión: tu mapa de entornos.** Rellénalo para tu producto:

| | Development | Staging | Production |
|---|---|---|---|
| ¿Dónde se ejecuta? | | | |
| ¿Qué base de datos usa? | | | |
| ¿Qué secretos necesita y dónde viven? | | | |
| ¿Quién tiene acceso? | | | |

> 🎓 **En la demo enseñas** (unos 4 min, con capturas donde haya secretos):
> 1. Producción y una preview, una al lado de la otra.
> 2. El `.env` de `feedback-hub`: "esto se puede leer porque es público".
> 3. La lista de *secrets* de GitHub, sin revelar valores. **Sesión grabada:** nada de abrir la pantalla de tokens.
> 4. Avisa en voz alta: "staging y producción comparten datos; lo que probéis en la preview llega a la tabla real".
>
> **Plan B:** capturas de los tres entornos y de la lista de *secrets*.
>
> **Si preguntan por qué no separamos los datos:** va más allá de un primer MVP (acordado con Jose, 5-nov). Se puede hacer más adelante, con un segundo proyecto de Supabase.

---

## 7. Caso real: Replit y SaaStr, julio de 2025

Jason Lemkin, fundador de SaaStr, hizo un experimento público de 12 días construyendo una aplicación con el agente de IA de Replit. El noveno día, en plena **congelación de código** y pese a la instrucción expresa de no hacer cambios sin su aprobación, el agente ejecutó comandos que **borraron la base de datos de producción**: los registros de 1.206 directivos y de más de mil empresas.

Según el propio Lemkin, el agente le dijo después que los datos no se podían recuperar. No era cierto: los recuperó.

La respuesta del CEO de Replit, Amjad Masad, fue calificarlo de "inaceptable" y de algo que "nunca debería ser posible". Anunció dos cambios en la plataforma:

- **separación automática entre la base de datos de desarrollo y la de producción**, y
- un modo de solo planificación, en el que el agente no puede tocar nada.

**La lección para la Familia 2:** el agente se equivocó, pero el problema de fondo es que **desde donde trabajaba se podía tocar producción**. Una instrucción ("no toques nada") no es una barrera. Un entorno separado sí lo es. Es justo lo que Replit añadió después.

> 🎓 **Cómo contarlo (unos 3 min):**
> - Es el caso más cercano a ellos: un agente de *vibe coding*, como los que usan.
> - **Cuida el tono:** no es "la IA es peligrosa", es "una instrucción no es una barrera".
> - **Matiz que debes respetar:** el relato viene de Lemkin. Di "según el propio Lemkin" en lo del agente que "mintió".
> - **Pregunta para el chat:** "¿Vuestro agente puede llegar hoy a la base de datos de producción?". Con Lovable, la respuesta es sí. Por eso importa leer el SQL antes de aprobarlo.
> - **Reserva** (por si conocen el caso o preguntan por uno clásico): GitLab, enero de 2017. Borraron la base de datos de producción creyendo que era la secundaria, ninguno de sus cinco sistemas de copias funcionaba y les salvó una instantánea hecha para staging. Fuente: post-mortem oficial (ver `sdd/specs/014-git-deploy-teoria-familias/casos.md`).

---

## 8. El factor agente IA

En esta fase, un agente como Lovable:

**Hace bien:**
- conectar tu app con Supabase y guardar los valores públicos;
- listar las variables que usa tu producto, si se lo pides;
- preparar los cambios de la base de datos y enseñarte el SQL antes de ejecutarlo;
- avisarte si encuentra un secreto escrito en el código, si se lo pides.

**No delegues:**
- **aprobar cambios en la base de datos sin leerlos.** Lovable trabaja sobre tu única base de datos: la de verdad. Y el cambio se aplica al pulsar *Allow*, antes de cualquier PR: la rama protege el código, no los datos. Lee qué va a cambiar, y nunca apruebes un borrado o un cambio de nombre sin pensarlo;
- **los valores de los secretos.** No pegues claves reales en el chat de un agente: se configuran directamente en la plataforma;
- **qué datos se usan para probar.** Copiar datos reales de clientes a un entorno de pruebas "para que sea realista" es una decisión de producto y legal, no técnica.

> 🎓 **Conecta con Replit:** "aquí tampoco hay una barrera entre el agente y vuestros datos. Vuestra barrera es leer el SQL antes de pulsar *Allow*".

---

## 9. Lo que el PM se lleva

1. **Probar y cobrar no se hacen en el mismo sitio.** Si hoy tus entornos comparten datos, que sea una decisión consciente.
2. **El código es el mismo; la configuración cambia.** Y una variable de entorno puede ser un interruptor de producto.
3. **Los secretos viven en la plataforma, nunca en el código**, y lees lo que el agente va a cambiar en tu base de datos antes de aprobarlo.

> 🎓 **Cierre del bloque:** pide una palabra en el chat: "¿qué vais a mirar el lunes en vuestro producto?". Si sale "base de datos" o "acceso del agente", el bloque ha funcionado.

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
- Cloudflare Workers, versiones de previsualización: https://developers.cloudflare.com/workers/configuration/previews/
- Lovable, integración con Supabase: https://docs.lovable.dev/integrations/supabase

---

## 11. 🎓 Mapa para specs posteriores

Lo que el producto demo y el squad deben permitir para que esta familia se pueda enseñar como está escrita.

| Concepto | Qué debe tener el producto demo (SPEC-019) | Fase del squad (SPEC-017) |
|---|---|---|
| Tres entornos | Vista previa de Lovable, preview del PR y producción, con **una base de datos compartida** (deuda consciente) | Avisa de que staging y producción comparten base de datos |
| Misma app, distinta configuración | Valores públicos en el `.env`, que el workflow pasa al Worker | Lista las variables que usa el código y dónde configurar cada una |
| Feature flag | Solo concepto: `feedback-hub` no tiene *feature flag* | Señala funcionalidades nuevas sin flag |
| Secretos fuera del código | `.env` solo con valores públicos y *Secrets* de GitHub configurados | Avisa si encuentra secretos en el código o en el `.env` |
| Agente y datos reales | Lovable pide aprobar cada cambio de base de datos | El agente no pide ni usa secretos de producción |
| Plan B | Capturas de los tres entornos y de la lista de *secrets* | — |
