# Familia 1 — Git profesional: ramas, commits y Pull Requests

**Guía del formador** · versión profunda
Sesión "Git, Deployment y Producción" · AI PM Pro · The Hero Camp · 21 de noviembre de 2026

> Es la misma guía que reciben los alumnos, más los bloques marcados con 🎓, que son solo para ti. Bloque B1 de la escaleta (SPEC-010): **50 min** = teoría 15 + práctica guiada 25 + verificación y preguntas 10.

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

Hasta ahora, muchos habéis construido vuestro producto con Lovable, Cursor o Claude Code haciendo los commits por vosotros, directamente sobre la versión principal. Funciona mientras el producto es un prototipo y solo lo tocáis vosotros.

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

Un buen commit tiene tres propiedades:

1. **Dice qué cambia y por qué**, en una frase que entiende alguien que no lo hizo.
2. **Hace una sola cosa.** Si mezcla un arreglo y una funcionalidad nueva, no se puede deshacer uno sin perder el otro.
3. **Deja el producto funcionando.** Cada foto de la historia debería poder desplegarse.

**Lo que esto cambia para el PM:** cuando algo falla en producción, la primera pregunta es "¿qué cambió?". Con una historia legible, la respuesta tarda minutos. Con `cambios`, `fix` y `update`, tarda horas.

> 🎓 **En la demo:** enseña el historial de commits del producto demo (pestaña *Commits* de GitHub). Pon al lado el de una rama con commits malos (`update`, `fix`, `cambios`) y pregunta: "Producción se ha roto esta mañana. ¿En cuál de los dos encontráis antes qué cambió?".
>
> **Error esperado:** *"El mensaje lo escribe la IA, así que da igual".* → Lo escribe la IA, pero lo lees tú y lo leerá quien investigue un incidente. Un agente escribe buenos mensajes **si se le pide**: es parte de lo que configura el squad.

---

## 5. Idea 3 · El Pull Request: la conversación antes de que algo entre

El PR es **el punto de control** entre el trabajo en la rama y el producto. Tiene tres partes:

1. **La descripción.** Qué cambia, por qué y cómo se ha probado. Es lo que lee quien revisa. Si no se entiende la descripción, no se aprueba.
2. **La revisión.** Otra persona (o un agente revisor, pero con una persona que decide) mira el cambio y hace preguntas. No solo "¿funciona?", sino también:
   - **¿Qué pasa si falla?** ¿Hay manejo de errores?
   - **¿Se puede apagar?** ¿Hay forma de desactivarlo sin desplegar de nuevo?
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

<!-- ajustar tras SPEC-011: nombres de ramas, ficheros y plantilla de PR reales del producto demo -->

En la sesión trabajamos sobre un producto de ejemplo con las piezas de cualquier producto real: una **interfaz** (frontend), una **API** (backend) y una **base de datos** con login. En esta familia:

- Partimos de `main`, que funciona y está desplegada.
- Creamos una rama para un cambio pequeño y visible, por ejemplo cambiar un texto de la página de inicio.
- Hacemos un commit con un mensaje con sentido.
- Abrimos un PR usando la **plantilla** del repositorio, que nos pide qué cambia, por qué, cómo se ha probado y qué pasa si falla.
- Lo revisamos y hacemos el merge.

**Tú lo repites en tu copia (fork) del producto demo**, desde la web de GitHub, sin instalar nada: rama → cambio → commit → PR. Al final de este bloque, cada uno tiene **su propio PR abierto**.

> 🎓 **En la demo enseñas** (unos 10 min, antes de la práctica):
> 1. `main` en GitHub y la URL de producción funcionando.
> 2. *Branch* → crear `feature/texto-portada` desde la web.
> 3. Editar el texto en la web de GitHub y hacer el commit con un mensaje con sentido.
> 4. *Compare & pull request* → la plantilla se rellena sola. Rellenar en voz alta "qué pasa si falla" y "cómo se apaga".
> 5. Revisión (aprobar) → *merge*. Enseña que `main` ha cambiado y que la historia lo cuenta.
>
> **Práctica guiada (25 min):** fork → rama → cambio → PR en su fork. Ve paso a paso, con el paso actual en pantalla. Pide que peguen **el enlace de su PR en el chat**: es la verificación del bloque (constitution 2.9).
>
> **Plan B**
> - **La demo falla** (GitHub caído o lento): rama `demo/f1-pr-listo` ya preparada con el PR abierto, más capturas de cada paso.
> - **Un alumno sin cuenta de GitHub o con el fork bloqueado:** que siga la demo y lo haga después con la guía. No pares la sala por una persona.
> - **Alguien se queda atrás:** que se una en el paso actual. El PR no tiene que ser perfecto, tiene que existir.
> - **Si ves un nivel muy bajo en la pregunta del 1 al 5:** recorta la idea 2 a la tabla y dedica ese tiempo a la práctica.

---

## 7. Caso real: Google Cloud, junio de 2025

El 29 de mayo de 2025, Google añadió una funcionalidad nueva a *Service Control*, un servicio interno de Google Cloud que comprueba cuotas y políticas en cada petición. El código nuevo tenía dos carencias:

- **no manejaba bien los errores**, y
- **no estaba detrás de un *feature flag*** (un interruptor que permite encender o apagar una funcionalidad sin desplegar de nuevo).

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

En la sesión os llevaréis el **Deployment Agent Squad**: un equipo de agentes que os acompaña en cada fase del proceso. En esta fase, el agente de rama y PR:

**Hace bien:**
- crear la rama con un nombre que describe el cambio;
- escribir mensajes de commit claros a partir de lo que ha cambiado;
- redactar la descripción del PR siguiendo la plantilla;
- resumir el cambio para quien lo revisa y señalar qué partes son delicadas.

**No delegues:**
- **la aprobación del merge.** El agente puede proponer y resumir, pero decide una persona;
- **la pregunta "¿qué pasa si falla?".** El agente la puede sugerir; tú tienes que exigir la respuesta;
- **trabajar directamente sobre `main`.** Si un agente te propone "lo cambio directamente para ir más rápido", la respuesta es no.

Los agentes generan cambios más rápido que nunca. Eso hace el punto de control **más** importante, no menos.

> 🎓 **Puente:** no enseñes el squad aquí. Solo anuncia: "En el bloque B3b veréis al agente de rama y PR hacer esto mismo solo". Así el bloque se mantiene en sus 3 ideas.
>
> **Si preguntan si un agente puede aprobar PRs:** técnicamente sí, se puede configurar. La regla del curso es que **un agente propone y una persona decide**. Es la misma lógica que el "qué no delegar" de junio.

---

## 9. Lo que el PM se lleva

1. **`main` siempre funciona.** Todo cambio va en una rama, incluidos los que hace un agente.
2. **La historia de commits es el diario del producto.** Si no se puede leer, no se puede investigar ni deshacer.
3. **El PR es tu punto de control.** Antes de aprobar, pregunta qué pasa si falla y cómo se apaga.

> 🎓 **Verificación del bloque:** cuenta los enlaces de PR en el chat. Si hay menos de la mitad de la sala, dedica 3 minutos del colchón a desatascar antes de la pausa.

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

| Concepto | Qué debe tener el producto demo (SPEC-011/012) | Fase del squad (SPEC-017) |
|---|---|---|
| `main` siempre funciona | `main` protegida (*ruleset*): no se puede hacer push directo, solo merge vía PR aprobado | El agente nunca hace commit en `main`; si se lo piden, lo rechaza y propone una rama |
| Rama con propósito | Convención de nombres documentada en el README (`feature/`, `fix/`) | Crea ramas con nombre descriptivo a partir de la tarea |
| Commit con sentido | Historial de `main` con mensajes ejemplares + una rama `demo/commits-malos` para el contraste | Escribe mensajes con la convención y una sola cosa por commit |
| PR como punto de control | `.github/pull_request_template.md` con: qué cambia, por qué, cómo se ha probado, **qué pasa si falla**, **cómo se apaga** | Rellena la plantilla y resume el cambio y las partes delicadas para quien revisa; no aprueba |
| "¿Se puede apagar?" (caso Google) | Al menos una funcionalidad detrás de un *feature flag* sencillo (variable de entorno). Conecta con la Familia 2 | Señala en el PR si el cambio no tiene forma de desactivarse |
| Práctica en fork desde la web | Repo **público**, cambio de texto editable desde la web, sin build local | — |
| Plan B de la demo | Rama `demo/f1-pr-listo` con el PR abierto y capturas del flujo | — |
