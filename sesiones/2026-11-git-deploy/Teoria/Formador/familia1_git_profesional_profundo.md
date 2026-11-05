# Familia 1 — Git profesional: ramas, commits y Pull Requests

**Guía del formador** · versión profunda
Sesión "Git, Deployment y Producción" · AI PM Pro · The Hero Camp · 21 de noviembre de 2026

> Es la misma guía que reciben los alumnos, más los bloques marcados con 🎓, que son solo para ti. Bloque T1 de la escaleta (SPEC-010 v4.1): **20 min**, con unos 5 de demo. La práctica de esta familia va en P2, a las 12:10. Este documento es de referencia: qué se cuenta exactamente lo fija el guion (SPEC-015).

---

## Índice

1. [Antes de entrar: tres conceptos en lenguaje humano](#1-antes-de-entrar-tres-conceptos-en-lenguaje-humano)
2. [Para qué le importa a un PM](#2-para-qué-le-importa-a-un-pm)
3. [Idea 1 · La rama: trabajar sin romper lo que funciona](#3-idea-1--la-rama-trabajar-sin-romper-lo-que-funciona)
4. [Idea 2 · El commit con sentido: una historia que se puede leer y deshacer](#4-idea-2--el-commit-con-sentido-una-historia-que-se-puede-leer-y-deshacer)
5. [Idea 3 · El Pull Request: la conversación antes de que algo entre](#5-idea-3--el-pull-request-la-conversación-antes-de-que-algo-entre)
6. [Cómo se ve en el producto demo](#6-cómo-se-ve-en-el-producto-demo)
7. [Caso real: Google Cloud, junio de 2025](#7-caso-real-google-cloud-junio-de-2025)
8. [El factor agente IA](#8-el-factor-agente-ia)
9. [Lo que el PM se lleva](#9-lo-que-el-pm-se-lleva)
10. [Fuentes](#10-fuentes)
11. [🎓 Mapa para specs posteriores](#11--mapa-para-specs-posteriores)

---

## 1. Antes de entrar: tres conceptos en lenguaje humano

**Repositorio.**
La carpeta de tu producto con memoria. Guarda cada versión de cada fichero, quién la cambió, cuándo y por qué. En GitHub, además, es el sitio donde el equipo (personas y agentes) se coordina.

**Rama.**
Una copia de trabajo paralela del producto. Puedes cambiar lo que quieras en ella sin tocar la versión que funciona, que vive en la rama principal (`main`). Es como trabajar sobre un borrador del documento en lugar de editar el original.

**Pull Request (PR).**
La petición formal de "quiero que mis cambios entren en `main`". No es un trámite: es el momento en el que alguien revisa qué cambia, por qué y qué podría salir mal, antes de que llegue al producto.

> 🎓 **Intención:** que nadie se quede fuera por el vocabulario. Son 2 minutos, en cámara y sin portal.
> - **Si la analogía del borrador no engancha:** "Google Docs con sugerencias. La rama es el modo sugerencia, el PR es pedir que acepten tus sugerencias y `main` es el documento final".
> - **Pregunta para el chat:** "Del 1 al 5, ¿cuánto habéis tocado Git directamente, sin que Lovable o Cursor lo hagan por vosotros?". Te da el nivel real de la sala para calibrar el resto del bloque.

---

## 2. Para qué le importa a un PM

Hasta ahora, Lovable ha ido haciendo los commits por vosotros, directamente sobre `main`, sin PR ni revisión. Funciona mientras el producto es un prototipo y solo lo tocáis vosotros.

En cuanto hay usuarios reales, otra persona en el equipo o un agente que hace cambios por su cuenta, trabajar así es como editar el contrato firmado en lugar de un borrador. Cualquier error llega directo al producto, nadie lo ha mirado antes y es difícil saber qué cambió y cuándo.

Git profesional no es una cuestión de ingenieros. Es **el sistema de control de cambios de tu producto**: decide qué entra, quién lo revisa y cómo se vuelve atrás. Como PM no necesitas dominar los comandos, pero sí saber qué preguntar y qué exigir.

> 🎓 **Intención:** el "para qué" antes del "qué" (constitution 2.1). Tiene que quedar que Git es **control de cambios del producto**, no una herramienta de programadores.
> - **Pregunta para el chat:** "¿Dónde hacéis hoy los cambios de vuestro producto: directamente en la versión publicada o en algún sitio aparte?". La mayoría dirá lo primero. Esa es la entrada a la idea 1.

---

## 3. Idea 1 · La rama: trabajar sin romper lo que funciona

La regla es sencilla: **`main` siempre funciona**. Todo cambio, por pequeño que sea, se hace en una rama.

- Cada rama tiene **un propósito**: una funcionalidad, un arreglo, un experimento. Su nombre lo dice: `feature/login-con-google`, `fix/precio-con-iva`.
- Mientras trabajas en la rama, `main` sigue intacta. Si el experimento sale mal, se borra la rama y no ha pasado nada.
- Las ramas son **de vida corta**: días, no meses. Cuanto más tiempo vive una rama, más se aleja de `main` y más difícil es juntarlas después.
- **En Lovable,** los cambios van a la *rama conectada* (*Settings → Git → Branch*). Crear una rama en GitHub no basta: hay que conectarla en Lovable. Con `main` protegida, Lovable usa sola la rama `lovable-sync`.

**Lo que esto cambia para el PM:** puedes pedir "pruébalo en una rama" sin miedo. Una idea arriesgada deja de ser un riesgo para el producto.

> 🎓 **Errores de comprensión esperados**
> - *"Las ramas son para equipos grandes; yo trabajo solo".* → Trabajas con un agente que hace cambios por su cuenta. Ya sois dos.
> - *"Una rama es una copia entera del proyecto que ocupa espacio".* → No: Git solo guarda las diferencias. Crear una rama es instantáneo y gratis.
> - *"Si el agente ya prueba lo que hace, no necesito rama".* → El agente prueba lo que cree que tiene que probar. La rama te protege de lo que no ha previsto.

---

## 4. Idea 2 · El commit con sentido: una historia que se puede leer y deshacer

Un *commit* es una foto del producto con una explicación de qué cambió. La historia de commits es **el diario de tu producto**. Puede ser útil o inútil:

| Commit inútil | Commit con sentido |
|---|---|
| `cambios` | `Añade validación del email en el registro` |
| `fix` | `Corrige el cálculo del total cuando hay descuento` |
| `wip`, `asdf`, `update` | `Elimina el endpoint de pruebas /debug` |

Mira tu repo: Lovable firma muchos commits como `Changes` o `Work in progress`. No eliges esos mensajes, pero sí el **título y la descripción de tu PR**. Ahí es donde cuentas la historia.

Un buen commit tiene tres propiedades:

1. **Dice qué cambia y por qué**, en una frase que entiende alguien que no lo hizo.
2. **Hace una sola cosa.** Si mezcla un arreglo y una funcionalidad nueva, no se puede deshacer uno sin perder el otro.
3. **Deja el producto funcionando.** Cada foto de la historia debería poder desplegarse.

**Lo que esto cambia para el PM:** cuando algo falla en producción, la primera pregunta es "¿qué cambió?". Con una historia legible, la respuesta tarda minutos. Con `cambios`, `fix` y `update`, tarda horas.

> 🎓 **En la demo:** enseña el historial real de `feedback-hub` (pestaña *Commits* de GitHub), con los `Changes` y `Work in progress` de Lovable, y pregunta: "Producción se ha roto esta mañana. ¿Cuál de estos commits miraríais primero?". Después enseña un PR con buena descripción: es lo que sí controlan.
>
> **Error esperado:** *"El mensaje lo escribe la IA, así que da igual".* → Lo escribe la IA, pero lo lees tú y lo leerá quien investigue un incidente. Por eso el título y la descripción del PR importan más con Lovable, no menos.

---

## 5. Idea 3 · El Pull Request: la conversación antes de que algo entre

El PR es **el punto de control** entre el trabajo en la rama y el producto. Tiene tres partes:

1. **La descripción.** Qué cambia, por qué y cómo se ha probado. Es lo que lee quien revisa. Si no se entiende la descripción, no se aprueba.
2. **La revisión.** Otra persona (o un agente revisor, pero con una persona que decide) mira el cambio y hace preguntas. No solo "¿funciona?", sino también:
   - **¿Qué pasa si falla?** ¿Hay manejo de errores?
   - **¿Se puede apagar?** ¿Hay forma de desactivarlo sin cambiar el código?
   - **¿Toca algo que no debería?** ¿Datos, permisos, configuración?
3. **Las comprobaciones automáticas.** Pruebas y verificaciones que se ejecutan solas en cada PR. Las veremos en la Familia 3.

Solo cuando las tres cosas están en verde se hace el *merge*: los cambios entran en `main`.

**Lo que esto cambia para el PM:** el PR es donde puedes intervenir sin ser técnico. Puedes leer la descripción, preguntar "¿qué pasa si esto falla?" y exigir que esas preguntas tengan respuesta antes de aprobar.

> 🎓 **Intención:** es la idea más importante del bloque y la que conecta con el caso. El PM sale sabiendo que **puede revisar un PR sin leer código**.
> - **Error esperado:** *"Revisar un PR es leer código y yo no sé".* → Revisar es leer la descripción y hacer las tres preguntas. Si la descripción no responde, no se aprueba. Eso es criterio de producto, no de ingeniería.
> - **Pregunta para el chat** (con un PR del demo en pantalla): "¿Qué le preguntaríais a quien ha hecho este cambio antes de aprobarlo?". Recoge 2 o 3 respuestas y conéctalas con las tres preguntas.
> - **Anticipa:** las comprobaciones automáticas solo se mencionan aquí. El detalle va en la Familia 3; no lo abras ahora.

---

## 6. Cómo se ve en el producto demo

La demo de la sesión es **`feedback-hub`**, un proyecto real de Lovable con las mismas piezas que el tuyo: una **interfaz**, **datos** en Supabase y una publicación en Cloudflare. Su repositorio es público: `github.com/jagarcig-ntt/feedback-hub`. En esta familia:

- Partimos de `main`, que funciona y está publicada. Está protegida: GitHub no deja entrar nada que no venga por PR y con el check en verde. Ni siquiera al dueño del repositorio.
- Pedimos a Lovable un cambio pequeño y visible.
- Lovable no puede escribir en `main`, así que no falla ni pierde el trabajo: lo guarda en la rama `lovable-sync` y avisa con *"Some changes were saved on a sync branch"*.
- Abrimos un PR de `lovable-sync` a `main`. GitHub rellena sola la **plantilla** del repositorio (`.github/pull_request_template.md`) con cinco apartados: **qué cambia**, **por qué**, **cómo se ha probado** (dos casillas: check en verde y probado en la URL de preview), **¿qué pasa si falla?** y **¿cómo se apaga?**. <!-- ajustar tras el ensayo: confirmar si el alumno añade la plantilla a su repo -->
- Lo revisamos y hacemos el merge. El cambio vuelve solo a Lovable.

**Tú lo repites en tu propio producto en la segunda práctica**, desde el navegador y sin instalar nada: proteger `main` → cambio en Lovable → PR → merge. Al final, cada uno tiene **su primer PR fusionado**.

> 🎓 **En la demo enseñas** (unos 5 min; el flujo completo lo verán en F3 y lo harán en P2):
> 1. `main` en GitHub y la URL de producción funcionando.
> 2. Un PR ya hecho de `lovable-sync` a `main`: la plantilla rellena, sobre todo "qué pasa si falla" y "cómo se apaga".
> 3. El *merge* y cómo aparece también en el historial de Lovable.
>
> **Práctica:** va en P2. Pide que peguen **el enlace de su PR en el chat**: es la verificación (constitution 2.9).
>
> **Plan B**
> - **La demo falla** (GitHub caído o lento): capturas del PR #4 de `feedback-hub`, ya fusionado.
> - **Un alumno sin requisitos previos:** que siga la demo y lo cierre en el reto con la guía. No pares la sala por una persona.
> - **Alguien se queda atrás en P2:** que se una en el paso actual; el ayudante y el rescate de las 13:15 están para eso. El PR no tiene que ser perfecto, tiene que existir.
> - **Si ves un nivel muy bajo en la pregunta del 1 al 5:** recorta la idea 2 a la tabla.
>
> **Errores esperados en P2** (vistos en SPEC-018):
> - **Crear la rama en GitHub y esperar que Lovable escriba en ella.** Hay que conectarla en *Settings → Git → Branch*. En el 30-oct, un cambio fue a `main` por esto.
> - **Asustarse con el aviso *"Some changes were saved on a sync branch"*.** No es un error: es la protección de `main` funcionando.
> - **Crear el ruleset y no aplicarlo:** sin pulsar *Create*, en estado *Disabled* o sin *Target branches*. Se comprueba en *Settings → Rules*.
> - **Reescribir el historial de la rama conectada.** El `AGENTS.md` de Lovable avisa de que se pierde el historial en Lovable. El ruleset ya bloquea el force push en `main`.

---

## 7. Caso real: Google Cloud, junio de 2025

El 29 de mayo de 2025, Google añadió una funcionalidad nueva a *Service Control*, un servicio interno de Google Cloud que comprueba cuotas y políticas en cada petición. El código nuevo tenía dos carencias:

- **no manejaba bien los errores**, y
- **no estaba detrás de un *feature flag*** (un interruptor que permite encender o apagar una funcionalidad sin cambiar el código).

El despliegue se hizo región a región, como manda el buen proceso, pero el código defectuoso no se activó durante ese despliegue y nadie lo vio.

El 12 de junio, una actualización de políticas con campos vacíos se replicó en segundos a todas las regiones. Activó el código nuevo, que no sabía manejar ese caso, y el servicio entró en un bucle de caídas **en todo el mundo**. Durante varias horas, muchos servicios de Google Cloud y de clientes que dependen de ellos dejaron de funcionar.

En su informe, Google lo dice claramente: **si el cambio hubiera estado protegido por un flag, el problema se habría detectado en staging.**

**La lección para la Familia 1:** el PR es el punto de control. "¿Funciona?" no basta. Las preguntas que habrían evitado esto eran dos: **¿qué pasa si falla?** y **¿se puede apagar?** No hace falta ser ingeniero para hacerlas.

> 🎓 **Cómo contarlo (unos 3 min):**
> - Cuéntalo como historia, no como informe técnico. No entres en Spanner ni en *null pointers*: con "un dato vacío que el código no sabía manejar" basta.
> - **Lo que no debes decir:** una duración exacta. Las "7 horas" solo aparecen en medios secundarios; di "varias horas".
> - **Pregunta para cerrar:** "Si hubierais estado en ese PR como PM, ¿qué habríais preguntado?". Las respuestas que buscas son "¿qué pasa si falla?" y "¿se puede apagar?".
> - **Puente:** el caso también enlaza con la Familia 2 (staging) y con la Familia 3 (despliegue por fases). Menciónalo en una frase y no lo desarrolles.

---

## 8. El factor agente IA

**Lovable ya es tu primer agente:** escribe el código y hace los commits por ti. En esta fase, un agente:

**Hace bien:**
- hacer el cambio en una rama, sin tocar `main`;
- explicar qué ha cambiado, si se lo pides;
- redactar la descripción del PR siguiendo la plantilla;
- resumir el cambio para quien lo revisa y señalar qué partes son delicadas.

**No delegues:**
- **la aprobación del merge.** El agente puede proponer y resumir, pero decide una persona;
- **la pregunta "¿qué pasa si falla?".** El agente la puede sugerir; tú tienes que exigir la respuesta;
- **trabajar directamente sobre `main`.** Si un agente te propone "lo cambio directamente para ir más rápido", la respuesta es no.

Los agentes generan cambios más rápido que nunca. Eso hace el punto de control **más** importante, no menos.

> 🎓 **Puente:** el squad es opcional, para quien trabaje desde VS Code. Menciónalo como mucho en una frase, o no lo menciones. <!-- ajustar tras SPEC-017 -->
>
> **Si preguntan si un agente puede aprobar PRs:** técnicamente sí, se puede configurar. La regla del curso es que **un agente propone y una persona decide**. Es la misma lógica que el "qué no delegar" de junio.

---

## 9. Lo que el PM se lleva

1. **`main` siempre funciona.** Todo cambio va en una rama, incluidos los que hace un agente.
2. **La historia de commits es el diario del producto.** Si no se puede leer, no se puede investigar ni deshacer.
3. **El PR es tu punto de control.** Antes de aprobar, pregunta qué pasa si falla y cómo se apaga.

> 🎓 **Verificación del bloque:** las dos preguntas para el chat de este bloque. La verificación real llega en P2, con los enlaces de PR.

---

## 10. Fuentes

**Caso documentado:**
- Google Cloud, informe oficial del incidente del 12 de junio de 2025: https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW
- ByteByteGo, análisis del incidente: https://blog.bytebytego.com/p/how-the-google-cloud-outage-crashed

**Para profundizar:**
- GitHub Docs, sobre ramas: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches
- GitHub Docs, sobre Pull Requests: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests
- Conventional Commits (convención de mensajes de commit, en español): https://www.conventionalcommits.org/es/v1.0.0/

---

## 11. 🎓 Mapa para specs posteriores

Lo que el producto demo y el squad deben permitir para que esta familia se pueda enseñar como está escrita.

| Concepto | Qué debe tener el producto demo (SPEC-019) | Fase del squad (SPEC-017) |
|---|---|---|
| `main` siempre funciona | `main` protegida (*ruleset*): no se puede hacer push directo, solo merge vía PR aprobado | El agente nunca hace commit en `main`; si se lo piden, lo rechaza y propone una rama |
| Rama con propósito | Rama conectada en Lovable y `lovable-sync` documentadas en el README | Crea ramas con nombre descriptivo a partir de la tarea |
| Commit con sentido | Historial real de Lovable (`Changes`, `Work in progress`) frente a un PR con buena descripción | Escribe mensajes con la convención y una sola cosa por commit |
| PR como punto de control | `.github/pull_request_template.md` con: qué cambia, por qué, cómo se ha probado, **qué pasa si falla**, **cómo se apaga** | Rellena la plantilla y resume el cambio y las partes delicadas para quien revisa; no aprueba |
| "¿Se puede apagar?" (caso Google) | Solo concepto: `feedback-hub` no tiene *feature flag*. La respuesta práctica es rollback o revert (Familia 4) | Señala en el PR si el cambio no tiene forma de desactivarse |
| Práctica en su producto | Repo **público** de cada alumno, todo desde el navegador | — |
| Plan B de la demo | PR #4 de `feedback-hub`, ya fusionado, y capturas del flujo | — |
