# GUION · Git, Deployment y Producción

**Sábado 21 de noviembre de 2026 · 10:00–14:00 · Zoom · 18 alumnos**
*Spec: SPEC-015 · Fuente única de los minutos: la cheat sheet y el portal salen de aquí. Comprobación: `python scripts/check_timings.py`.*

**Cómo leer este guion**
- **Tú:** lo que dices, en cámara o sobre la pantalla. Es una guía de tono, no un texto para leer palabra por palabra.
- **ACCIÓN:** lo que haces en pantalla.
- **🎓** notas solo para ti; **Plan B:** qué hacer si algo falla.
- Cada bloque cita su familia de la teoría (`Teoria/familiaN_*`). Lo que no está aquí, está allí como referencia.

**Bloques**

| Hora | Min | Bloque |
|---|---|---|
| 10:00 | 15 | B0 · Apertura |
| 10:15 | 20 | T1 · F1 Git profesional |
| 10:35 | 15 | T2 · F2 Entornos y secretos |
| 10:50 | 15 | T3 · F3 CI/CD |
| 11:05 | 10 | Pausa |
| 11:15 | 45 | P1 · Primer despliegue |
| 12:00 | 10 | Pausa |
| 12:10 | 45 | P2 · Gestión de cambios |
| 12:55 | 15 | T4 · F4 Go-live |
| 13:10 | 5 | Pausa activa |
| 13:15 | 25 | Rescate |
| 13:40 | 15 | B5 · Cierre |
| 13:55 | 5 | Colchón |

---|---|---|
| 10:00 | B0 · Apertura | Escrito |
| 10:15 | T1 · F1 Git profesional | Escrito |
| 10:35 | T2 · F2 Entornos y secretos | Pendiente (T05) |
| 10:50 | T3 · F3 CI/CD | Pendiente (T05) |
| 11:05 | Pausa | Pendiente (T05) |
| 11:15 | P1 · Primer despliegue | Pendiente (T06) |
| 12:00 | Pausa | Pendiente (T06) |
| 12:10 | P2 · Gestión de cambios | Pendiente (T06) |
| 12:55 | T4 · F4 Go-live | Pendiente (T07) |
| 13:10 | Pausa activa | Pendiente (T07) |
| 13:15 | Rescate | Pendiente (T07) |
| 13:40 | B5 · Cierre | Pendiente (T07) |
| 13:55 | Colchón | Pendiente (T07) |

---

## PRE-SESIÓN

### El día antes
- [ ] Recrear la rama de la demo F4 (`sdd/specs/019-git-deploy-producto-lovable/notas.md`, apartado T12) y comprobar que el PR #6 de F3 sigue abierto y en rojo.
- [ ] Producción de `feedback-hub` guardando feedback: https://jagarcig-ntt-feedback-hub.jagarcig.workers.dev
- [ ] La guía de la práctica y el kit, publicados y con enlaces que funcionan.
- [ ] Capturas del plan B a mano: `sdd/specs/019-git-deploy-producto-lovable/capturas/` y `sesiones/2026-11-git-deploy/Guia/capturas/`.

### Una hora antes (9:00)
**Pestañas abiertas, en este orden:**
1. Portal de la sesión.
2. `feedback-hub` en GitHub: pestaña *Commits*, PR #6 y pestaña *Actions*.
3. Producción de `feedback-hub`.
4. Lovable, proyecto **Feedback Hub** (comprueba el nombre arriba a la izquierda).
5. Cloudflare: *Workers & Pages → jagarcig-ntt-feedback-hub → Deployments*.
6. Guía de la práctica y cheat sheet.

**Sesión grabada:**
- **Cierra cualquier pestaña con claves:** *API Tokens* de Cloudflare, *API Keys* de Supabase y *Secrets* de GitHub en modo edición.
- Silencia las notificaciones del sistema.

### Diez minutos antes (9:50)
- Entra en Zoom con el chat visible. **No compartas pantalla todavía.**
- Repasa con el ayudante quién hace qué en las prácticas.
- Saluda a quien llegue: "Hola, ¿qué tal? Empezamos en unos minutos".

---

## B0 · APERTURA · 10:00–10:15 (15 min)

*Ideas: 1) de "lo tengo en Lovable" a "está en producción"; 2) lo que os lleváis; 3) cómo vamos a trabajar.*

### 10:00 — Saludo y para qué (3 min)

**En cámara, sin compartir pantalla.**

**Tú:**
> "Buenos días a todos. Gracias por venir un sábado por la mañana.
>
> Rápidamente, quién soy: llevo más de una década en banca y tecnología. 8 años en NTT DATA, creciendo de engineer a technical lead a AI lead.
>
> Hasta hoy habéis construido vuestro producto con Lovable. Funciona, lo veis en la vista previa, y quizá ya le habéis dado a *Publish*. Hoy damos el paso que hay entre 'lo tengo en Lovable' y 'está en producción, con un proceso profesional detrás'.
>
> No es una sesión de ingenieros. Es la sesión en la que decidís **qué entra en vuestro producto, quién lo revisa y cómo se vuelve atrás** si algo sale mal."

### 10:03 — Qué os lleváis (3 min)

**ACCIÓN:** comparte pantalla. Abre la producción de `feedback-hub`, después su PR #4 en GitHub y la pestaña *Actions*.

**Tú:**
> "Esto es lo que vais a tener a las doce, cada uno con su producto. Una web en Internet, en vuestra propia cuenta de Cloudflare. Un historial de cambios. Y una máquina que comprueba cada cambio y lo publica sola cuando lo aprobáis.
>
> Y os lleváis tres cosas para el lunes: los ficheros que lo hacen funcionar, la guía paso a paso y un kit con la checklist para decidir si algo está listo para salir."

### 10:06 — ¿Venís preparados? (5 min)

**Tú:**
> "Antes de nada, comprobamos que venís preparados. Escribid en el chat, en un solo mensaje, cuáles de estas tres tenéis:
> ✅ repo público · ✅ Supabase conectado · ✅ secretos guardados en GitHub."

**ACCIÓN:** espera las respuestas. El ayudante las cuenta.

🎓 **Según lo que veas:**
- **Le falta el repo público:** que lo haga ahora, en un minuto. Es el paso 1 de la guía de requisitos.
- **Le faltan los secretos:** los guardará al empezar P1. Hay 10 minutos previstos para ello.
- **No tiene Supabase conectado:** puede seguir. Su web se publicará, aunque no guarde datos.
- **Usa el backend de Lovable en lugar de Supabase:** queda fuera del flujo probado. Que siga la sesión y conserve el *Publish* de Lovable.

### 10:11 — Cómo vamos a trabajar (4 min)

**ACCIÓN:** portal, sección del mapa del día.

**Tú:**
> "El plan: una hora de ideas, cuatro bloques cortos. Después, dos prácticas de 45 minutos sobre vuestro propio producto. Y al final, tiempo para que nadie se vaya sin su URL.
>
> Tres reglas:
> 1. **La sesión se graba y vuestros repos son públicos.** Ningún token ni ninguna clave en pantalla ni en el chat. Si tenéis que pegar uno, dejad de compartir pantalla.
> 2. **Las dudas, en el chat.** [Nombre del ayudante] os atiende mientras yo sigo.
> 3. **Si os atascáis en la práctica, decidlo pronto.** Hay tiempo para todos al final."

---

## T1 · F1 GIT PROFESIONAL · 10:15–10:35 (20 min)

*Teoría: `Teoria/familia1_git_profesional_alumnos.md` · Ideas: 1) la rama; 2) el commit con sentido; 3) el Pull Request.*

**ANTES DE ENTRAR**

| Término | Analogía para un PM |
|---|---|
| Repositorio | La carpeta de tu producto con memoria: cada versión, quién la cambió y por qué |
| Rama | Un borrador del documento, en lugar de editar el original |
| Pull Request | Pedir que acepten tus sugerencias antes de que entren en el documento final |

### 10:15 — Antes de entrar (2 min)

**Tú:**
> "Tres palabras y nada más. Imaginad un Google Docs con sugerencias. La **rama** es el modo sugerencia. El **Pull Request** es pedir que acepten vuestras sugerencias. Y `main` es el documento final, el que ven vuestros usuarios.
>
> Pregunta rápida para el chat: del 1 al 5, ¿cuánto habéis tocado Git directamente, sin que Lovable lo haga por vosotros?"

🎓 Te da el nivel real de la sala. Si casi todo son unos y doses, recorta la idea 2 a la tabla.

### 10:17 — Para qué (2 min)

**Tú:**
> "Hasta ahora, Lovable ha ido haciendo los cambios directamente sobre la versión principal, sin que nadie los revise. Mientras el producto es un prototipo y solo lo tocáis vosotros, funciona.
>
> En cuanto hay usuarios reales, trabajar así es como editar el contrato firmado en lugar de un borrador. Git profesional es **el sistema de control de cambios de vuestro producto**. No necesitáis dominar los comandos. Necesitáis saber qué preguntar y qué exigir."

### 10:19 — Idea 1 · La rama (4 min)

**Tú:**
> "La regla es sencilla: **`main` siempre funciona**. Todo cambio, por pequeño que sea, se hace aparte. Si sale mal, se tira y no ha pasado nada.
>
> En Lovable esto tiene una forma concreta. Lovable escribe en la *rama conectada*, que se elige en *Settings → Git*. Y lo bonito es lo que pasa cuando protegéis `main`: Lovable no puede escribir ahí, así que no falla ni pierde vuestro trabajo. Lo guarda solo en una rama que se llama `lovable-sync`. Lo vais a ver en la segunda práctica."

**ACCIÓN:** enseña en Lovable *Settings → Git*, con la rama conectada.

🎓 **Error esperado** (`notas.md` de SPEC-018): crear una rama en GitHub y esperar que Lovable escriba en ella. Hay que conectarla en Lovable. Menciónalo en una frase.

### 10:23 — Idea 2 · El commit con sentido (4 min)

**ACCIÓN:** abre la pestaña *Commits* de `feedback-hub`.

**Tú:**
> "Esto es el diario de un producto real, hecho con Lovable. Mirad los mensajes: *Changes*, *Work in progress*... Ahora imaginad que producción se ha roto esta mañana. ¿Cuál miraríais primero?
>
> Un buen commit dice qué cambia y por qué, hace una sola cosa y deja el producto funcionando. Con Lovable no elegís esos mensajes, pero sí el **título y la descripción de vuestro Pull Request**. Ahí es donde contáis la historia."

### 10:27 — Idea 3 · El Pull Request, y Google Cloud (6 min)

**ACCIÓN:** abre el PR #6 de `feedback-hub`, solo la descripción. No bajes hasta los checks.

**Tú:**
> "Esto es un Pull Request: el punto de control entre el trabajo aparte y el producto. GitHub rellena una plantilla con cinco preguntas. Las dos que importan a un PM: **¿qué pasa si falla?** y **¿cómo se apaga?** No hace falta leer código para hacerlas.
>
> Lo rojo de abajo lo vemos en la familia 3."

**Caso real, unos 3 minutos** (teoría, sección 7):
> "Junio de 2025. Google añade una funcionalidad nueva a un servicio interno de Google Cloud. El código no manejaba bien los errores ni tenía un interruptor para apagarlo. Días después, un dato vacío lo activó, y el servicio se cayó en todo el mundo durante varias horas. El propio informe de Google dice que, con un interruptor, se habría detectado antes."

**Tú:**
> "Pregunta para el chat: si hubierais estado en ese Pull Request como PM, ¿qué habríais preguntado?"

🎓 Buscas "¿qué pasa si falla?" y "¿se puede apagar?". **No digas una duración exacta:** las "7 horas" solo salen en medios secundarios.

### 10:33 — Lo que el PM se lleva (2 min)

**Tú:**
> "Tres ideas:
> 1. **`main` siempre funciona.** Todo cambio va aparte, también los de Lovable.
> 2. **La historia de cambios es el diario del producto.** Si no se puede leer, no se puede investigar.
> 3. **El Pull Request es vuestro punto de control.** Antes de aprobar, preguntad qué pasa si falla y cómo se apaga.
>
> Ahora, una pregunta incómoda: cuando probáis un cambio, ¿dónde lo probáis?"

🎓 Es el puente a F2.

**Plan B del bloque:** si GitHub va lento, capturas del historial de commits y del PR #6.

---

## T2 · F2 ENTORNOS Y SECRETOS · 10:35–10:50 (15 min)

*Teoría: `Teoria/familia2_entornos_secretos_alumnos.md` · Ideas: 1) tres entornos, tres propósitos; 2) la misma app, distinta configuración; 3) los secretos viven en la plataforma.*

**ANTES DE ENTRAR**

| Término | Analogía para un PM |
|---|---|
| Entorno | El ensayo general frente al estreno: mismo espectáculo, distinto escenario |
| Variable de entorno | Un ajuste que cambia según dónde está el producto, sin tocar el código |
| Secreto | Una llave que, si alguien la tiene, actúa en nombre de tu producto |

### 10:35 — Antes de entrar (1 min)

**Tú:**
> "Tres palabras. **Entorno:** cada sitio donde vive una copia de vuestro producto. **Variable de entorno:** un ajuste que cambia según el sitio. **Secreto:** una variable que no puede ver cualquiera, porque quien la tiene actúa en vuestro nombre."

### 10:36 — Para qué (2 min)

**Tú:**
> "Pregunta para el chat: ¿cuántas bases de datos tiene vuestro producto? ¿Una, dos, no lo sé?"

**ACCIÓN:** deja 30 segundos para responder.

**Tú:**
> "Lo normal con Lovable es una. Y está bien para empezar. Pero separar entornos es **separar el sitio donde se prueba del sitio donde se cobra**. Como PM no vais a configurarlos, pero sí decidís cuándo algo está 'validado' y quién toca producción."

### 10:38 — Idea 1 · Tres entornos (4 min)

**ACCIÓN:** abre, una al lado de la otra, la vista previa de Lovable y la producción de `feedback-hub`.

**Tú:**
> "Vuestro producto ya tiene tres entornos, aunque no lo sepáis:
> - **Development** es la vista previa de Lovable, donde construís.
> - **Staging** será la preview de cada Pull Request, en Cloudflare. Ahí probáis antes de aprobar.
> - **Producción** es la URL de vuestro Worker, la que ven vuestros usuarios.
>
> ¿Por qué no vale la vista previa de Lovable como staging? Porque corre en otro sitio. Preparando esta sesión, una app funcionaba perfecta en Lovable y daba error en Cloudflare. Solo una preview en el mismo sitio que producción lo enseña antes de salir.
>
> Y una cosa que tenéis que saber: en vuestro producto, **los tres entornos comparten la base de datos**. Para un primer producto es razonable, pero lo que escribáis en una preview llega a vuestros datos reales."

🎓 Fuente del caso: `sdd/specs/019-git-deploy-producto-lovable/notas.md`, bloque B del ensayo (5-nov). Si preguntan por qué no se separan los datos: va más allá de un primer MVP (acordado con Jose).

### 10:42 — Ideas 2 y 3 · Configuración y secretos (4 min)

**ACCIÓN:** abre el `.env` de `feedback-hub` en GitHub y después la lista de *Secrets* de GitHub (*Settings → Secrets and variables → Actions*), **sin abrir ninguno**.

**Tú:**
> "El código es el mismo en los tres entornos. Lo que cambia es la configuración, que se le da desde fuera.
>
> Lovable sube este fichero, el `.env`, a vuestro repositorio público. ¿Es un problema? No, **porque solo lleva valores públicos**: la dirección de Supabase y su clave pública. La regla: en el `.env` del repo, solo lo que podríais publicar en vuestra web.
>
> Los secretos de verdad viven aquí, en la plataforma. Fijaos: ni siquiera yo puedo ver su valor una vez guardados."

🎓 **Si preguntan si la clave pública es segura:** lo que protege los datos son las políticas de acceso de Supabase. El detalle, el 11 de diciembre.

### 10:46 — Caso real: Replit, y el nuestro (3 min)

**Tú (teoría, sección 7):**
> "Julio de 2025. Jason Lemkin, fundador de SaaStr, construía una app con el agente de IA de Replit. En plena congelación de código, el agente borró la base de datos de producción: más de mil empresas. Según el propio Lemkin, el agente le dijo que no se podía recuperar. No era cierto.
>
> La lección: **una instrucción no es una barrera. Un entorno separado sí lo es.**
>
> Y ahora el nuestro. Preparando esta sesión, pedí a Lovable que añadiera login. Al aprobar su cambio, modificó los permisos de la base de datos en ese momento, antes de que existiera ningún Pull Request. La web publicada se cayó. ¿Por qué? Porque **la rama protege el código, no los datos**. Vuestra barrera es leer lo que Lovable va a cambiar antes de pulsar *Allow*."

🎓 **Cuida el tono:** no es "la IA es peligrosa", es "una instrucción no es una barrera". Fuente del caso propio: `notas.md`, CA8 (8-nov).

### 10:49 — Lo que el PM se lleva (1 min)

**Tú:**
> "Tres ideas: probar y cobrar no se hacen en el mismo sitio, y si lo compartís, que sea a sabiendas. El código es el mismo y la configuración cambia. Y los secretos, en la plataforma; antes de aprobar un cambio de datos, leedlo."

---

## T3 · F3 CI/CD · 10:50–11:05 (15 min)

*Teoría: `Teoria/familia3_cicd_deploy_alumnos.md` · Ideas: 1) el workflow, una receta que se ejecuta sola; 2) cada PR se comprueba y se previsualiza; 3) merge a `main` = producción, por fases.*

**ANTES DE ENTRAR**

| Término | Analogía para un PM |
|---|---|
| CI | El control de calidad automático que no se cansa |
| CD | La publicación automática: nadie tiene que acordarse de "subirlo" |
| Workflow | La receta escrita de ese proceso |

### 10:50 — Antes de entrar (1 min)

**Tú:**
> "CI es el control de calidad automático. CD es la publicación automática. Y el workflow es la receta escrita de las dos cosas, que vive dentro de vuestro repositorio."

### 10:51 — Para qué (2 min)

**Tú:**
> "Para el chat, en una palabra: ¿cómo llega hoy un cambio a vuestros usuarios? Publico, subo, no lo sé…"

**ACCIÓN:** lee dos o tres respuestas.

**Tú:**
> "Si la respuesta depende de que alguien se acuerde, vuestro proceso depende de la memoria de alguien. CI/CD lo convierte en una receta que se ejecuta siempre igual. Y en cada cambio veis, en verde o en rojo, si está listo."

### 10:53 — Idea 1 · El workflow (3 min)

**ACCIÓN:** abre `.github/workflows/desplegar.yml` en `feedback-hub` y señala los nombres de los pasos.

**Tú:**
> "No hay que memorizarlo, solo saber leerlo en voz alta. *Cuando* se abre un Pull Request o se hace merge, *en* una máquina limpia de GitHub: coge el código, instálalo, pásale las pruebas, compílalo, publícalo y comprueba que la web responde.
>
> Esto es lo que vais a pedir a Lovable en la primera práctica. Lo mismo para todos."

### 10:56 — Idea 2 · Cada PR se comprueba y se previsualiza (4 min)

**ACCIÓN:** abre el PR #4 de `feedback-hub` (en verde y con el comentario de la preview) y después el PR #6, ahora sí hasta abajo.

**Tú:**
> "Un Pull Request en verde: los checks han pasado, y un comentario automático trae la URL de la preview. La abrís y lo probáis como lo vería un usuario.
>
> Y este es el que os dejé a medias: está en rojo. El cambio importa un fichero que no existe, así que ni compila. Mirad el botón de merge: **bloqueado**. Y no hay preview, porque lo que no pasa las pruebas ni siquiera se publica.
>
> Esto nos pasó de verdad: Lovable escribió código que no compilaba porque olvidó una dependencia. Con este control, un fallo así no llega a vuestros usuarios."

**Plan B:** captura del merge bloqueado: `sdd/specs/019-git-deploy-producto-lovable/capturas/f3_merge_bloqueado.png`.

### 11:00 — Caso real: CrowdStrike (3 min)

**Tú:**
> "Antes, una pregunta: ¿alguien se vio afectado el 19 de julio de 2024? Vuelos, bancos…"

**ACCIÓN:** deja que lo cuenten. Engancha más que tu relato.

**Tú (teoría, sección 7):**
> "CrowdStrike envió una actualización a su software para Windows. Esperaba 20 campos de datos y le llegaron 21. Los ordenadores se bloquearon con la pantalla azul. Y llegó **a la vez a todos los equipos**: Microsoft estimó 8,5 millones de dispositivos. Entre sus cambios posteriores: desplegar por fases.
>
> Automatizar es bueno. Automatizar sin fases convierte un error en un error para todos a la vez."

🎓 **No digas** que fue un ciberataque. La única cifra segura es la de Microsoft.

### 11:03 — Lo que el PM se lleva y lo que viene (2 min)

**Tú:**
> "Tres ideas: el proceso de calidad es una receta escrita. Ningún Pull Request entra en rojo, y antes de aprobar lo probáis en su preview. Y **hacer merge es decidir salir a producción**.
>
> Diez minutos de pausa. A la vuelta, cada uno publica su producto. Si no guardasteis los secretos en GitHub, id abriendo la guía de requisitos, paso 4."

---

## PAUSA · 11:05–11:15 (10 min)

**ACCIÓN:** deja en pantalla la guía de la práctica, abierta en la práctica 1.

🎓 Usa la pausa para preguntar al ayudante cuántos alumnos no tienen los secretos guardados.

---

## P1 · PRIMER DESPLIEGUE · 11:15–12:00 (45 min)

*Guía del alumno: `Guia/guia_practica_sesion.md`, práctica 1 · Ensayo: bloque B de `ensayo.md`.*

### 11:15 — Instrucciones (5 min)

**ACCIÓN:** comparte la guía de la práctica, en la práctica 1.

**Tú:**
> "Vamos a pedir a Lovable tres ficheros, uno a uno. Cuando lleguen a GitHub, vuestro producto se publicará solo. Cuatro avisos:
> 1. **Comprobad el nombre de vuestro proyecto en Lovable**, arriba a la izquierda. Preparando esto, yo mismo me equivoqué de proyecto.
> 2. Pedid el contenido **exacto**, con el prompt de la guía.
> 3. Quien no tenga los secretos en GitHub: primero el paso 4 de la guía de requisitos, **sin compartir pantalla**. [Nombre del ayudante] os acompaña.
> 4. Cuando terminéis cada paso, escribidlo en el chat."

### 11:20 — Los tres prompts (15 min)

**ACCIÓN:** hazlo tú a la vez en `feedback-hub`, o enseña el paso en la guía mientras ellos lo hacen.

✅ **Punto de control:** "ficheros" en el chat. El ayudante lleva la cuenta.

🎓 **Errores esperados:**
- Se equivocan de proyecto en Lovable.
- Pegan los tres ficheros en un solo mensaje.
- El fichero no aparece en `.github/workflows/` en GitHub: que repitan el prompt.

### 11:35 — La publicación en verde (10 min)

**Tú:**
> "Abrid la pestaña *Actions* de vuestro repositorio. Veréis **Desplegar** en marcha. En un minuto, círculo verde. Entrad y copiad la dirección que pone **Publicado en**. Pegadla en el chat."

✅ **Punto de control:** la URL de producción en el chat.

🎓 **Qué significa cada rojo** (tabla de la guía):

| Paso en rojo | Causa probable |
|---|---|
| 0 | Falta un secreto o tiene otro nombre |
| 5 | El código de Lovable no compila: *Fix build* en Lovable |
| 7 | Token sin el permiso *Workers Scripts · Edit*, o Account ID equivocado |
| 9 | Publicado, pero la web da error: ¿usa una clave secreta en el servidor? Va al rescate |

### 11:45 — Probar la web y el login (8 min)

**Tú:**
> "Abrid vuestra URL y **haced lo principal de vuestro producto**: crear algo, guardar algo. Abrirla no basta: verde no significa que funcione.
>
> Si vuestro producto tiene login, falta un paso, el 4 de la guía. Supabase deja como dirección `localhost`, y el correo de confirmación os llevaría a una página que no existe. Añadid vuestra URL en *Authentication → URL Configuration*."

### 11:53 — Margen (7 min)

**ACCIÓN:** lee el chat. Ayuda en pantalla con el error más repetido.

🎓 **Quien no tenga su URL a las 12:00 no se queda atrás:** sigue en P2 con la parte de proteger `main`, y lo recupera en el rescate.

**Plan B de P1:**
- **GitHub, Lovable o Cloudflare caídos:** enseña el flujo con las capturas del ensayo y que lo hagan después con la guía.
- **Muchos alumnos atascados en el mismo paso:** para la sala y hazlo en pantalla.

---

## PAUSA · 12:00–12:10 (10 min)

**ACCIÓN:** en pantalla, el recuento de URL del chat.

**Tú:**
> "Mirad cuántas URL de producción hay en el chat. Diez minutos de pausa, y a la vuelta, vuestro primer cambio profesional."

---

## P2 · GESTIÓN DE CAMBIOS · 12:10–12:55 (45 min)

*Guía del alumno: `Guia/guia_practica_sesion.md`, práctica 2 · Ensayo: bloque C de `ensayo.md` (13 min para Jaime).*

### 12:10 — Proteger `main`: las tres trampas (5 min)

**ACCIÓN:** crea el ruleset en pantalla, en un repo de ensayo, o enséñalo con las capturas.

**Tú:**
> "Vamos a hacer que `main` siempre funcione. Tres trampas que me pasaron a mí preparando esto:
> 1. El ruleset viene en **Disabled**. Hay que cambiarlo a **Active**.
> 2. Hay que añadir la rama: *Include default branch*. Sin eso, GitHub os avisa de que no protege nada. A mí me pasó: mi primer cambio entró directo, sin Pull Request.
> 3. En *Allowed merge methods*, dejad solo **Merge**. Lovable no admite los otros."

### 12:15 — Crear el ruleset (10 min)

✅ **Punto de control:** "Active" en el chat.

🎓 **Errores esperados:**
- No guardan con *Create*.
- `Comprobar el PR` no aparece en la lista de checks: que lo escriban igualmente.

### 12:25 — Un cambio en Lovable (7 min)

**Tú:**
> "Pedid a Lovable un cambio pequeño y visible, por ejemplo el texto de un botón. Veréis un aviso naranja: *Some changes were saved on a sync branch*. **No es un error:** es vuestra protección funcionando."

🎓 **Si el cambio entra directo, sin aviso:** el ruleset no está activo. Que revisen *Active* y la rama.

### 12:32 — Pull Request, checks y preview (10 min)

**Tú:**
> "Abrid la dirección de la guía, con vuestro usuario y vuestro repo, y pulsad *Create pull request*. Rellenad la plantilla, sobre todo **qué pasa si falla** y **cómo se apaga**. Cuando salgan los checks en verde, abrid la preview y probad vuestro cambio."

✅ **Punto de control:** el enlace del Pull Request en el chat.

### 12:42 — Merge y producción (8 min)

**Tú:**
> "Pulsad *Merge pull request*. Tiene que poner **Create a merge commit**. Si GitHub os ofrece borrar la rama, no lo hagáis: Lovable la reutiliza. En un minuto, vuestro cambio está en producción. Comprobadlo, y mirad que Lovable diga *In sync*."

✅ **Punto de control:** "producción" en el chat.

### 12:50 — Margen (5 min)

🎓 Los que van atrasados siguen durante F4: el simulacro se puede seguir sin mirar todo el rato.

**Plan B de P2:** capturas de los PR #1 y #2 del ensayo, en `notas-al-d-a`.

---

## T4 · F4 GO-LIVE Y RECUPERACIÓN · 12:55–13:10 (15 min)

*Teoría: `Teoria/familia4_golive_recuperacion_alumnos.md` · Ideas: 1) salir es una decisión: la checklist; 2) el plan de vuelta atrás, antes de salir; 3) después de salir, vigilar tres señales.*

**ANTES DE ENTRAR**

| Término | Analogía para un PM |
|---|---|
| Go-live | Abrir la puerta a los clientes: una decisión de negocio |
| Rollback | El botón de deshacer de producción |
| Monitorización | El cuadro de mandos del coche |

### 12:55 — Antes de entrar (1 min)

**Tú:**
> "Esta familia es la más vuestra. **Go-live:** abrir la puerta a los usuarios. **Rollback:** el botón de deshacer. **Monitorización:** el cuadro de mandos."

### 12:56 — Para qué (1 min)

**Tú:**
> "¿Alguna vez habéis salido con algo sabiendo que no estaba listo? Respuesta honesta en el chat."

### 12:57 — Idea 1 · La checklist (3 min)

**ACCIÓN:** abre `docs/checklist-go-live.md` en `feedback-hub`.

**Tú:**
> "Ocho preguntas de sí o no antes de salir. Fijaos que cada una sale de una de las familias de hoy: es el resumen de la sesión. No está para cumplir un trámite, sino para que las alarmas que alguien ya conoce se digan en voz alta **antes**. Está en vuestro kit."

### 13:00 — Ideas 2 y 3 · Simulacro de incidente (6 min)

**ACCIÓN:**
1. Abre el PR de `demo/f4-rompe-produccion`: todo en verde y la plantilla con las casillas marcadas.
2. Haz el merge. Mientras se publica, alrededor de un minuto:

**Tú:**
> "Todo en verde, casillas marcadas. ¿Lo habríais aprobado? Mirad la respuesta a 'qué pasa si falla': *la página seguiría viéndose bien*."

3. En producción, envía el formulario: *"No hemos podido enviar tu opinión"*.

**Tú:**
> "Producción rota, y todo en verde. Rápido, en el chat: ¿qué hacemos?"

4. **Rollback** en Cloudflare: *Deployments → versión anterior → Rollback*. Comprueba que el formulario vuelve a funcionar.

**Tú:**
> "El rollback devuelve la versión anterior. Pero `main` sigue teniendo el cambio malo: si mañana alguien hace merge, vuelve el fallo. Por eso después va el **revert**: este botón del Pull Request crea uno nuevo que lo deshace. ¿Y qué falló? La tabla nunca se renombró en Supabase, y 'lo probé en la preview' era abrirla, no enviar el formulario."

🎓 **Haz el merge del revert durante el rescate,** para dejar `main` correcto. Si el rollback tarda (en el ensayo fueron 3 minutos con la navegación), cuéntalo mientras carga.

**Plan B:** si el despliegue o el rollback se atascan, cuéntalo con las capturas del ensayo del 9-nov.

### 13:06 — Caso real: Sonos (3 min)

**Tú (teoría, sección 7):**
> "Mayo de 2024. Sonos lanza su app rediseñada sin funciones que la gente usaba a diario, como las alarmas. Estudian volver a la anterior y concluyen que no pueden: no había vuelta atrás. Según la propia compañía, arreglarla costó entre 20 y 30 millones de dólares, y su CEO acabó dejando la empresa. Su frase: 'nuestra ejecución, **mi ejecución**, se quedó corta'."

**ACCIÓN:** silencio de dos segundos.

### 13:09 — Lo que el PM se lleva (1 min)

**Tú:**
> "Salir es una decisión, con una checklist. El plan de vuelta atrás se conoce antes de salir. Y el go-live termina cuando sabéis que va bien, no cuando se publica."

---

## PAUSA ACTIVA · 13:10–13:15 (5 min)

**Tú:**
> "Cinco minutos para levantaros. Quien ya tenga sus dos URL, enhorabuena. Quien no, a la vuelta vamos a por ello."

---

## RESCATE · 13:15–13:40 (25 min)

**ACCIÓN:** pide en el chat quién no tiene aún su URL de producción o su primer Pull Request.

- **Prioridad:** primero quien no tenga producción y después quien no tenga el Pull Request.
- **Tú y el ayudante:** os repartís a los alumnos. Que compartan pantalla **solo** cuando no haya secretos a la vista.
- **Quien ya terminó:**
  - opcional, crear la rama `staging` en GitHub, que publica un staging fijo;
  - o recorrer la checklist con su producto.
- 🎓 **Haz el merge del revert de F4** si no se hizo antes.

---

## B5 · CIERRE · 13:40–13:55 (15 min)

### 13:40 — Ronda de URL (5 min)

**Tú:**
> "Pegad en el chat vuestras dos URL: la de producción y la de vuestro Pull Request."

**ACCIÓN:** abre dos o tres al azar. Celébralo.

### 13:45 — El kit (3 min)

**ACCIÓN:** abre el kit en el portal.

**Tú:**
> "Esto os lleváis: el ciclo de cada cambio, vuestro mapa de entornos, la checklist, una chuleta de Git sin terminal y los ficheros. Todo en el portal."

### 13:48 — Lo que queda (2 min)

**Tú:**
> "Si no os ha dado tiempo a terminar, la guía y el kit sirven para hacerlo por vuestra cuenta antes del Demo Day.
>
> Un aviso para el Demo Day: **Supabase gratis pausa los proyectos tras una semana sin uso**. Entrad en vuestra web unos días antes."


### 13:50 — Puente al 11 de diciembre (1 min)

**Tú:**
> "Hoy vuestro sistema comprueba que el código funciona y que la web responde. **El día 11 añadimos el check de seguridad a vuestro CI.**"

### 13:51 — Preguntas y despedida (4 min)

**Tú:**
> "¿Alguna pregunta? … Gracias por la mañana. Habéis empezado con un producto en Lovable y os vais con un producto en producción y un proceso profesional detrás."

---

## COLCHÓN · 13:55–14:00 (5 min)

Para lo que se haya alargado. Si no hace falta, termina antes.

---

## QUÉ HACER SI…

| Situación | Qué hacer |
|---|---|
| **Vas 10 minutos tarde a las 11:15** | Recorta Sonos a una frase y el simulacro de F4 a las capturas. No toques P1 ni P2 |
| **Vas adelantado** | Más tiempo en el rescate. No añadas contenido nuevo |
| **Más de la mitad sin secretos guardados** | Añade 10 min al inicio de P1, sacados del margen de P1 y del rescate |
| **Cae GitHub, Lovable o Cloudflare** | Sigue con las capturas del ensayo. Los alumnos lo hacen después con la guía |
| **Un alumno comparte pantalla con un token visible** | Pídele que deje de compartir. Cuando acabe la sesión, que revoque el token y cree uno nuevo |
| **Un alumno usa el backend de Lovable** | Fuera del flujo probado: que siga la sesión y conserve el *Publish* de Lovable |
| **Pregunta de seguridad (CORS, claves, ataques)** | "Lo vemos el 11 de diciembre" |
