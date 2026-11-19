# GUION · Git, Deployment y Producción

**Sábado 21 de noviembre de 2026 · 10:00–14:00 · Zoom · 18 alumnos · 3 salas de 6**
*Spec: SPEC-015 · Escaleta v5 (SPEC-010, 17-nov) · Fuente única de los minutos: la cheat sheet y el portal salen de aquí. Comprobación: `python scripts/check_timings.py`.*

**Cómo leer este guion**
- **Tú:** lo que dices, en cámara o sobre la pantalla. Es una guía de tono, no un texto para leer palabra por palabra.
- **ACCIÓN:** lo que haces en pantalla.
- **🎓** notas solo para ti; **Plan B:** qué hacer si algo falla.
- **El patrón, tres veces:** teoría corta → **lo haces tú en directo** → ellos lo hacen en salas. El nivel técnico de la clase es bajo: cuanto menos teoría y más "mirad cómo lo hago", mejor.
- **Aida**, la asistente, pasa por las salas resolviendo dudas. Tú te quedas en la sala principal y entras en una sala si hay un atasco grande. Su guía: `Guia/guia_asistente.md`.

**Bloques**

| Hora | Min | Bloque |
|---|---|---|
| 10:00 | 15 | Apertura |
| 10:15 | 15 | Teoría 1 · De Lovable a producción |
| 10:30 | 15 | Demo 1 en directo |
| 10:45 | 5 | Pausa activa y reparto en salas |
| 10:50 | 35 | Salas · Práctica 1 |
| 11:25 | 10 | Pausa |
| 11:35 | 15 | Teoría 2 · Entornos y secretos |
| 11:50 | 15 | Demo 2 en directo |
| 12:05 | 40 | Salas · Práctica 2 |
| 12:45 | 10 | Pausa |
| 12:55 | 20 | Teoría 3 · Salir y volver atrás |
| 13:15 | 25 | Salas · Rescate |
| 13:40 | 15 | Cierre |
| 13:55 | 5 | Colchón |

---

## PRE-SESIÓN

### Los días antes · preparar el proyecto de las demos
Haces lo mismo que un alumno en casa, dos veces: un proyecto para el **ensayo** y otro igual que **no tocas hasta el día 21**.

1. [ ] **Crear el proyecto en Lovable**, con **Lovable Cloud**. Nombre sin tildes ni eñes, por ejemplo `demo-tareas` (el del ensayo, `demo-tareas-ensayo`). Prompt:
    > Crea una app sencilla de lista de tareas en español. Inicio de sesión con email y contraseña. Cada usuario ve, añade, marca como hecha y borra solo sus propias tareas. Diseño limpio, una sola página tras el login.
2. [ ] **Aprobar con *Allow*** los cambios de base de datos que pida Lovable y comprobar en su vista previa que el registro y las tareas funcionan.
3. [ ] **No conectarlo a GitHub.** Eso se hace en directo.
4. [ ] **Token de Cloudflare** (paso 2 de la guía de requisitos): *My Profile → API Tokens → Create Token → Create Custom Token* · permisos `Account · Workers Scripts · Edit` · *All accounts* · 1 año. Guárdalo, junto con el **Account ID** (*Workers & Pages*, columna derecha), donde puedas copiarlos **sin que se vean en pantalla**. Usa la misma cuenta que `prueba-cloud`.
5. [ ] **Ensayo con el primer proyecto:** las demos 1 y 2 enteras, siguiendo este guion y **cronometradas** (15 min cada una). Si algo de la guía no coincide con la pantalla, se corrige antes del 21.
6. [ ] **No borrar `prueba-cloud`:** es el plan B de las dos demos (ya está desplegado y con login).

### Los días antes · el resto
- [ ] Recrear la rama de la demo de F4 en `feedback-hub` (`sdd/specs/019-git-deploy-producto-lovable/notas.md`, apartado T12) y comprobar que el PR #6 sigue en rojo.
- [ ] Producción de `feedback-hub` guardando feedback: https://jagarcig-ntt-feedback-hub.jagarcig.workers.dev
- [ ] Pasar a Aida su chuleta (`Guia/guia_asistente.md`).
- [ ] Capturas del plan B a mano: `sdd/specs/019-git-deploy-producto-lovable/capturas/` y `sesiones/2026-11-git-deploy/Guia/capturas/`.

### Una hora antes (9:00)
**Pestañas abiertas, en este orden:**
1. Portal de la sesión, en la sección Práctica 1.
2. Lovable, **`demo-tareas`** (comprueba el nombre arriba a la izquierda).
3. GitHub, con tu sesión iniciada (ahí aparecerá el repositorio nuevo).
4. `feedback-hub` en GitHub: pestaña *Actions*, PR #4 y PR #6.
5. Producción de `feedback-hub`.
6. Cloudflare: *Workers & Pages → jagarcig-ntt-feedback-hub → Deployments*.
7. Plan B: el repositorio de `prueba-cloud` y su producción, https://jagarcig-ntt-prueba-cloud.jaimegarcia1991.workers.dev
8. Guía de la práctica y cheat sheet.

**Ten a mano, fuera de la pantalla compartida:** el token, el Account ID y un email que no hayas usado para registrarte en `demo-tareas` (para probar el login en la demo 1).

### Diez minutos antes (9:50)
- Entra en Zoom con el chat visible. **No compartas pantalla todavía.**
- Comprueba con Aida que puede moverse entre salas (rol de coanfitriona).
- Saluda a quien llegue: "Hola, ¿qué tal? Empezamos en unos minutos".

---

## B0 · APERTURA · 10:00–10:15 (15 min)

*Orden: quién soy → qué os lleváis y el plan del día → cómo vamos a trabajar → ¿venís preparados? Después, directos a la teoría.*

### 10:00 — Saludo y quién soy (3 min)

**En cámara, sin compartir pantalla.**

**Tú:**
> "Buenos días a todos. Gracias por venir un sábado por la mañana.
>
> Rápidamente, quién soy: llevo más de una década en banca y tecnología. 8 años en NTT DATA, creciendo de engineer a technical lead a Project Manager.
>
> Hasta hoy habéis construido vuestro producto con Lovable. Funciona, lo veis en la vista previa. Hoy damos el paso que hay entre 'lo tengo en Lovable' y 'está en Internet, con un proceso profesional detrás'. No es una sesión de ingenieros, y no hace falta instalar nada: todo se hace desde el navegador."

### 10:03 — Qué os lleváis y el plan del día (4 min)

**ACCIÓN:** comparte pantalla. Abre la producción de `feedback-hub` y su pestaña *Actions*. Después, el portal en la sección "El día".

**Tú:**
> "Esto es lo que vais a tener hoy, cada uno con su producto: una web en Internet, en vuestra propia cuenta de Cloudflare, y una máquina que comprueba cada cambio y lo publica sola cuando lo aprobáis. Y os lleváis la guía paso a paso y un kit con una checklist para decidir si algo está listo para salir.
>
> El plan, en tres rondas:
> 1. **Cómo llega un cambio de Lovable a producción.** Al terminar, vuestra web publicada.
> 2. **Entornos y secretos.** Al terminar, vuestro primer cambio entrado por Pull Request.
> 3. **Salir y volver atrás.** Y después, un rato de rescate para que nadie se vaya sin su web.
>
> Cerramos a las 13:40, con pausas entre ronda y ronda."

### 10:07 — Cómo vamos a trabajar (4 min)

**ACCIÓN:** portal, sección "El día".

**Tú:**
> "Las tres rondas son iguales: os cuento una idea corta, **lo hago yo delante de vosotros** y después **lo hacéis vosotros en salas de seis**.
>
> En las salas os acompaña **Aida**: pasará por las tres resolviendo dudas. Yo estaré en la sala principal, y si algo se complica, entro.
>
> Tres reglas:
> 1. **La sesión se graba y vuestros repos son públicos.** Ningún token ni ninguna clave en pantalla ni en el chat. Si tenéis que pegar uno, dejad de compartir pantalla.
> 2. **En las salas, todo está en el portal:** cada paso tiene un botón para copiar lo que hay que pegar.
> 3. **Si os atascáis, decidlo pronto.** Al final hay tiempo para que nadie se vaya sin su web."

### 10:11 — ¿Venís preparados? (4 min)

**Tú:**
> "Escribid en el chat, en un solo mensaje, cuáles de estas tres tenéis:
> ✅ repo público · ✅ token de Cloudflare · ✅ secretos guardados en GitHub."

**ACCIÓN:** espera las respuestas. Aida las cuenta.

🎓 **Según lo que veas:**
- **Le falta el repo público:** lo hará en su sala, al empezar (paso 1 de la guía de requisitos).
- **Le falta el token o los secretos:** lo hará en su sala, al empezar la práctica 1, sin compartir pantalla. Aida le acompaña.

---

## TEORÍA 1 · DE LOVABLE A PRODUCCIÓN · 10:15–10:30 (15 min)

*Teoría: `Teoria/familia1_git_profesional_alumnos.md` y `familia2_cicd_deploy_alumnos.md` · Dos familias, cada una con sus tres términos y sus tres ideas. **F1 · Git:** push y pull, `main` siempre funciona, el Pull Request. **F2 · CI/CD:** la receta, dos entornos (preview y producción) y dónde pasa cada cosa. Sin casos reales: están en el portal, en un desplegable.*

**ANTES DE ENTRAR · F1 Git**

| Término | Qué es |
|---|---|
| Repositorio | La carpeta de tu producto en GitHub: todo el código y el historial de cada cambio |
| Commit | Un cambio guardado, con fecha, autor y una nota de qué cambió |
| Rama | Una línea de trabajo paralela. `main` es la principal, la que se publica |

### 10:15 — Antes de entrar · Git (3 min)

**ACCIÓN:** portal, tarjeta de la familia 1.

**Tú:**
> "Cuatro palabras que vais a oír toda la mañana.
>
> El **repositorio** es la carpeta de vuestro producto en GitHub: todo el código y el historial de cada cambio. Ya lo tenéis.
>
> Un **commit** es un cambio guardado, con fecha, autor y una nota de qué cambió. Cada vez que pedís algo a Lovable, Lovable hace un commit.
>
> Una **rama** es una línea de trabajo paralela. La principal se llama `main`, y es la que se publica. En las demás se puede cambiar sin tocarla.
>
> La cuarta palabra, el **Pull Request**, os la cuento en un minuto."

### 10:18 — Idea 1 · Push y pull: cómo viajan los cambios (3 min)

**ACCIÓN:** portal, esquema de la familia 1, franja de arriba: Lovable ⇄ GitHub → Cloudflare.

**Tú:**
> "Vuestro código vive en dos sitios: **Lovable**, donde lo construís, y **GitHub**, donde está el repositorio.
>
> **Push** significa empujar: Lovable empuja cada commit a GitHub, solo, cada vez que pedís un cambio. **Pull** significa tirar: Lovable trae lo que ha cambiado en GitHub, por ejemplo cuando aprobáis un cambio allí. Lovable hace las dos cosas por vosotros. Por eso, en sus ajustes, veis *In sync with GitHub*: los dos sitios tienen lo mismo.
>
> Y de ahí viene el nombre **Pull Request**: es la petición de que *tiren* de vuestra rama y unan sus cambios a `main`, revisándolos antes."

### 10:21 — Idea 2 · `main` siempre funciona (2 min)

**ACCIÓN:** portal, esquema "Así fluye cada cambio".

**Tú:**
> "La regla es sencilla: **`main` siempre funciona**, porque es lo que ven vuestros usuarios. Todo cambio se hace aparte.
>
> Cuando protejamos `main`, Lovable no podrá escribir ahí, así que guardará vuestros cambios en una rama que se llama `lovable-sync`. No falla ni pierde nada: espera a que vosotros decidáis."

### 10:23 — Idea 3 · El Pull Request, el punto de control (3 min)

**Tú:**
> "El Pull Request es el punto de control entre 'lo he cambiado' y 'lo ven mis usuarios'. Tiene una plantilla con dos preguntas que importan a un PM: **¿qué pasa si falla?** y **¿cómo se apaga?** No hace falta leer código para hacerlas.
>
> Y fijaos en una cosa: en el Pull Request vais a **ver vuestro cambio funcionando antes de que llegue a vuestros usuarios**, en una copia aparte de la web. A eso se le llama un **entorno**, y ahora os cuento de dónde sale."

**Tú:**
> "En el chat: ¿qué os gustaría saber antes de aprobar un cambio en vuestro producto?"

🎓 Buscas "¿qué pasa si falla?", "¿se puede apagar?" y "¿lo puedo probar antes?". La última te lleva a la familia 2.

**ANTES DE ENTRAR · F2 CI/CD**

| Término | Qué es |
|---|---|
| CI/CD | La comprobación automática (CI) y la publicación automática (CD) de cada cambio |
| Workflow | El fichero con los pasos que GitHub ejecuta solo en cada cambio |
| Entorno | Cada sitio donde está publicada una copia de tu producto: la preview y producción |

### 10:26 — F2 · Del Pull Request a producción: la receta (2 min)

**ACCIÓN:** portal, tarjeta de la familia 2, esquema del workflow.

**Tú:**
> "Si el Pull Request es la puerta, el **workflow** es quien revisa en la puerta. Es un fichero con los pasos que GitHub ejecuta solo en cada Pull Request y en cada merge: instala, pasa las pruebas, compila, publica y comprueba que la web responde. Revisar es la parte de **CI**; publicar, la de **CD**. Si algo falla, no se publica."

### 10:28 — Dos entornos, y dónde pasa cada cosa (2 min)

**ACCIÓN:** portal, tarjeta de la familia 2, tabla "Dónde pasa cada cosa".

**Tú:**
> "La receta publica en dos sitios. Si es un Pull Request, en una **preview**: una copia aparte para probar el cambio. Si es un merge, en **producción**: vuestra web. A las 11:35 vemos los entornos con calma.
>
> Y para que no os perdáis, dónde pasa cada cosa:"

| Dónde | Qué pasa | Quién lo hace |
|---|---|---|
| **Lovable** | Pedís el cambio. Lovable hace el commit, el push a GitHub y el pull de vuelta | Vosotros pedís; Lovable lo hace |
| **GitHub** | El repositorio, las ramas, el Pull Request, los checks del workflow, el merge y los secretos | Vosotros abrís el PR y decidís el merge; el workflow comprueba |
| **Cloudflare** | Donde vive la web: la preview de cada Pull Request y producción | El workflow publica, solo |

**Tú:**
> "Esa receta es lo que vais a pedirle a Lovable ahora mismo. Os lo enseño."

---

## DEMO 1 EN DIRECTO · 10:30–10:45 (15 min)

*Proyecto: `demo-tareas`, sin conectar. Haces lo mismo que los alumnos: pasos 1 y 3 de la guía de requisitos y práctica 1 de la guía de la práctica.*

### 10:30 — Conectar con GitHub y repo público (4 min)

**Tú:**
> "Este es un proyecto de Lovable recién creado, como el vuestro. Primero, lo que ya traéis hecho de casa: conectarlo a GitHub y hacerlo público."

**ACCIÓN, paso a paso** (paso 1 de la guía de requisitos):
1. [ ] Lovable: comprueba el nombre `demo-tareas` arriba a la izquierda.
2. [ ] *Settings → Git* → conectar con GitHub → elegir tu cuenta → crear el repositorio.
3. [ ] Espera a ver **Connected** e **In sync with GitHub**.
4. [ ] Abre el repositorio en GitHub → *Settings → General* → baja a *Danger Zone*.
5. [ ] *Change visibility* → **Public** → confirma.
6. [ ] Comprueba *This repository is currently public*.

🎓 **No renombres ni muevas el repositorio** después de conectarlo.

### 10:34 — Guardar los secretos (2 min)

**Tú:**
> "Ahora dejo de compartir pantalla, porque voy a pegar mi token. Es lo que haréis vosotros si no los traéis guardados."

**ACCIÓN** (paso 3 de la guía de requisitos):
1. [ ] **Deja de compartir pantalla.**
2. [ ] Repositorio → *Settings → Secrets and variables → Actions* → *New repository secret*.
3. [ ] **Name:** `CLOUDFLARE_API_TOKEN` · **Secret:** el token → *Add secret*.
4. [ ] *New repository secret* · **Name:** `CLOUDFLARE_ACCOUNT_ID` · **Secret:** el Account ID → *Add secret*.
5. [ ] **Vuelve a compartir** y enseña la lista: dos secretos con esos nombres exactos y sin valor visible.

**Tú:**
> "Aquí están: dos secretos, y ni siquiera yo puedo ver su valor."

### 10:36 — Los tres prompts (4 min)

**Tú:**
> "En el portal, cada paso tiene un botón **Copiar**, que copia el mensaje con el fichero dentro. Lo pego en Lovable, lo envío y espero a que termine. **Uno a uno.**"

**ACCIÓN** (práctica 1, paso 1):
1. [ ] Portal → Práctica 1 → *Copiar* del **1.1 `comprobar-pr.yml`** → pega en el chat de Lovable → envía → espera a que termine.
2. [ ] *Copiar* del **1.2 `desplegar.yml`** → pega → envía → espera. "En cuanto llega a GitHub, empieza la publicación."
3. [ ] *Copiar* del **1.3 plantilla de PR** → pega → envía → espera.
4. [ ] En GitHub, enseña que existe la carpeta `.github/workflows/` con los dos ficheros.

🎓 Mientras Lovable trabaja, señala en el portal qué hace cada fichero.

### 10:40 — La publicación, la URL y el login (5 min)

**ACCIÓN** (práctica 1, pasos 2 a 4):
1. [ ] GitHub → pestaña **Actions** → **Desplegar** en marcha. Mientras tanto, explica los pasos con el esquema de F2.
2. [ ] Círculo verde ✅ → clic en **Desplegar** → en el resumen, **Publicado en:** → copia la URL.
3. [ ] Abre la URL. "Verde no significa que funcione": **regístrate** con el email de reserva.
4. [ ] Antes de abrir el correo: Lovable → **More → Users → Settings → Advanced → Allowed URLs** → *Add URL*, y añade las tres direcciones con los botones *Copiar* del portal:
    - `https://jagarcig-ntt-demo-tareas.<subdominio>.workers.dev` (sin barra al final);
    - la misma terminada en `/**`;
    - `https://*-jagarcig-ntt-demo-tareas.<subdominio>.workers.dev/**`.
5. [ ] Si aparece el campo **Site URL**, pon la URL de producción. **No borres las URL de Lovable.**
6. [ ] Abre el correo de confirmación: debe llevar a tu web de Cloudflare. Crea una tarea.

**Tú:**
> "Aquí está mi dirección, y mi producto funcionando. Ahora os toca a vosotros."

🎓 Si el correo tarda, no esperes: "en el ensayo llegó en un minuto; lo comprobamos al volver de las salas".

**Plan B:** si algo falla y no se arregla en un minuto, pasa a `prueba-cloud` (repositorio, *Actions*, producción y *Allowed URLs*) y sigue con la demo 2 sobre él. Último recurso: capturas del ensayo (`Guia/capturas/`).

---

## PAUSA ACTIVA Y REPARTO · 10:45–10:50 (5 min)

**Tú:**
> "Ahora os toca. Os paso a las salas. Abrid el portal en la Práctica 1 y seguid los pasos. Cuando tengáis vuestra URL, volved con ella."

**ACCIÓN:** abre las 3 salas de 6. Envía por difusión el enlace del portal.

---

## SALAS · PRÁCTICA 1 · 10:50–11:25 (35 min)

*Guía del alumno: `Guia/guia_practica_sesion.md`, práctica 1 · Guía de Aida: `Guia/guia_asistente.md`.*

### 10:50 — Arranque en las salas (2 min)

🎓 Aida entra en la primera sala. Tú, en la sala principal, atento a las peticiones de ayuda.

### 10:52 — Los tres prompts (13 min)

🎓 **Errores esperados:**
- Se equivocan de proyecto en Lovable.
- Pegan los tres ficheros en un solo mensaje.
- El fichero no aparece en `.github/workflows/` en GitHub: que repitan el prompt.
- Quien no traía los secretos los guarda ahora, sin compartir pantalla.

### 11:05 — La publicación en verde (10 min)

🎓 **Qué significa cada rojo:**

| Paso en rojo | Causa probable |
|---|---|
| 0 | Falta un secreto o tiene otro nombre |
| 5 | El código de Lovable no compila: *Fix build* en Lovable |
| 7 | Token sin el permiso *Workers Scripts · Edit*, o Account ID equivocado |
| 9 | Publicado, pero la web da error. Al rescate |

### 11:15 — Probar la web y el login (7 min)

🎓 Si el correo de confirmación lleva a la vista previa de Lovable, falta añadir su web en *Allowed URLs* (las tres direcciones del paso 4).

### 11:22 — Vuelta a la sala principal (3 min)

**ACCIÓN:** cierra las salas con aviso de 1 minuto.

**Tú:**
> "Pegad en el chat vuestra URL de producción. Si aún no la tenéis, no pasa nada: en el rescate lo terminamos."

✅ **Punto de control:** URL de producción en el chat.

**Plan B de P1:** si cae GitHub, Lovable o Cloudflare, sigue con las capturas del ensayo y que lo hagan después con la guía.

---

## PAUSA · 11:25–11:35 (10 min)

**ACCIÓN:** en pantalla, el recuento de URL del chat.

🎓 Pregunta a Aida qué errores se han repetido. Si alguno afecta a muchos, lo comentas al volver en una frase.

---

## TEORÍA 2 · ENTORNOS Y SECRETOS · 11:35–11:50 (15 min)

*Teoría: `Teoria/familia3_entornos_secretos_alumnos.md` · Ideas: 1) tres entornos; 2) el `.env` público y los secretos; 3) la rama protege el código, no los datos.*

**ANTES DE ENTRAR**

| Término | Analogía para un PM |
|---|---|
| Entorno | El ensayo general frente al estreno |
| Variable de entorno | Un ajuste que cambia según dónde está el producto |
| Secreto | Una llave que, si alguien la tiene, actúa en tu nombre |

### 11:35 — Antes de entrar (1 min)

**Tú:**
> "Tres palabras. **Entorno:** cada sitio donde vive una copia de vuestro producto. **Variable:** un ajuste que cambia según el sitio. **Secreto:** una llave que, si alguien la tiene, actúa en vuestro nombre."

### 11:36 — Para qué (2 min)

**Tú:**
> "Ya tenéis vuestra web en Internet. Pregunta para el chat: ¿dónde probáis un cambio antes de que lo vean vuestros usuarios?"

### 11:38 — Idea 1 · Tres entornos (4 min)

**ACCIÓN:** portal, tarjeta de la familia 3, esquema de entornos.

**Tú:**
> "Esta mañana os adelanté dos entornos: la preview y producción. En realidad, vuestro producto tiene tres: la **vista previa de Lovable**, donde construís; la **preview de cada Pull Request**, donde probáis el cambio antes de aprobarlo; y **producción**, vuestra web.
>
> ¿Por qué la vista previa de Lovable no basta? Porque corre en otro sitio. Preparando esta sesión, una app funcionaba perfecta en Lovable y daba error en Cloudflare. Solo una preview en el mismo sitio que producción lo enseña antes de salir.
>
> Y una cosa importante: **los tres comparten la base de datos**. Lo que escribáis en una preview llega a vuestros datos reales."

### 11:42 — Idea 2 · El `.env` público y los secretos (3 min)

**ACCIÓN:** abre el `.env` de tu proyecto de demostración en GitHub, y después la lista de secretos, sin abrir ninguno.

**Tú:**
> "Lovable sube este fichero a vuestro repositorio público. ¿Problema? No, **porque solo lleva valores públicos**. La regla: en el `.env`, solo lo que podríais publicar en vuestra web. Los secretos de verdad, como el token de Cloudflare, viven aquí, donde nadie puede leerlos."

### 11:45 — Idea 3 · La rama protege el código, no los datos (5 min)

**Tú:**
> "Nos pasó preparando esta sesión: pedí a Lovable que añadiera login. Al aprobar su cambio, modificó los permisos de la base de datos en ese mismo momento, antes de ningún Pull Request, y la web publicada se cayó.
>
> **La rama protege el código, no los datos.** Los cambios de base de datos se aplican cuando pulsáis *Allow* en Lovable. Antes de pulsarlo, leed qué va a cambiar."

**Tú:**
> "En el chat: ¿qué buscaríais en ese aviso antes de pulsar *Allow*?"

🎓 Buscas "si borra algo" y "si cambia quién puede ver qué". **Cuida el tono:** no es "la IA es peligrosa", es "una instrucción no es una barrera".

---

## DEMO 2 EN DIRECTO · 11:50–12:05 (15 min)

*Proyecto: el mismo `demo-tareas`, ya desplegado. Práctica 2 de la guía de la práctica.*

### 11:50 — Proteger `main`: las tres trampas (5 min)

**Tú:**
> "Tres trampas que me pasaron a mí: viene en **Disabled**; sin añadir la rama no protege nada; y en los métodos de merge, solo **Merge**, porque Lovable no admite los otros."

**ACCIÓN** (práctica 2, paso 1):
1. [ ] Repositorio → **Settings → Rules → Rulesets → New ruleset → New branch ruleset**.
2. [ ] **Ruleset Name:** `main siempre funciona`.
3. [ ] **Enforcement status:** **Active** (trampa 1).
4. [ ] **Target branches:** *Add target → Include default branch* (trampa 2).
5. [ ] Marca **Restrict deletions**.
6. [ ] Marca **Require a pull request before merging** → en *Allowed merge methods*, solo **Merge** (trampa 3).
7. [ ] Marca **Require status checks to pass** → *Add checks* → escribe `Comprobar el PR`, aunque no aparezca en la lista.
8. [ ] Marca **Block force pushes**.
9. [ ] **Create**. Enseña que el ruleset sale como *Active*.

### 11:55 — Un cambio en Lovable (3 min)

**ACCIÓN** (práctica 2, paso 2):
1. [ ] Lovable → pide algo pequeño y visible: *"Cambia el texto del botón principal"*.
2. [ ] Enseña el aviso naranja *"Some changes were saved on a sync branch"*.

**Tú:**
> "**No es un error:** es la protección funcionando. Mi cambio espera en `lovable-sync`."

🎓 Si el cambio entra sin aviso naranja, el ruleset no está *Active* o no tiene la rama: revísalo en directo, también enseña.

### 11:58 — Pull Request, checks y preview (4 min)

**ACCIÓN** (práctica 2, pasos 3 y 4):
1. [ ] Abre `https://github.com/jagarcig-ntt/demo-tareas/compare/main...lovable-sync` (botón *Copiar* del portal, con tus datos).
2. [ ] **Create pull request**.
3. [ ] Rellena la plantilla en voz alta: qué cambia, **¿qué pasa si falla?**, **¿cómo se apaga?**
4. [ ] **Create pull request** otra vez.
5. [ ] Espera los checks en verde ✅ (alrededor de un minuto).
6. [ ] Abre la **URL de preview** del comentario: el cambio está ahí, y producción sigue sin tocar (enséñalo en otra pestaña).
7. [ ] Marca las dos casillas de la plantilla.

### 12:02 — Merge y producción (3 min)

**ACCIÓN** (práctica 2, paso 5):
1. [ ] **Merge pull request**: comprueba que pone **Create a merge commit**.
2. [ ] **Confirm merge**. Si ofrece *Delete branch*, **no lo pulses**.
3. [ ] *Actions* → **Desplegar** en verde → abre producción: tiene el cambio.
4. [ ] Lovable → *Settings → Git*: **In sync with GitHub**.

**Tú:**
> "Hacer merge es decidir salir a producción. Vuestro turno."

**Plan B:** si no da tiempo a que termine Desplegar, abre las salas y enseña producción al volver. Si falla, haz la demo sobre `prueba-cloud` o con las capturas de los PR #1 y #2 de `notas-al-d-a`.

---

## SALAS · PRÁCTICA 2 · 12:05–12:45 (40 min)

*Guía del alumno: práctica 2 · Guía de Aida.*

### 12:05 — Arranque en las salas (2 min)

**ACCIÓN:** abre las salas. Difusión: "Portal → Práctica 2".

### 12:07 — Proteger `main` (10 min)

🎓 **Errores esperados:** no guardan con *Create*; lo dejan en *Disabled* o sin rama; no ven `Comprobar el PR` en la lista (que lo escriban igualmente).

### 12:17 — Un cambio en Lovable (6 min)

🎓 **Si el cambio entra directo, sin aviso naranja:** el ruleset no está activo.

### 12:23 — Pull Request, checks y preview (10 min)

🎓 Que rellenen de verdad "qué pasa si falla" y "cómo se apaga". Si los checks salen en rojo, que miren en qué paso.

### 12:33 — Merge y producción (8 min)

🎓 Solo *Create a merge commit*, y sin borrar `lovable-sync`.

### 12:41 — Vuelta a la sala principal (4 min)

**Tú:**
> "Pegad en el chat el enlace de vuestro Pull Request."

✅ **Punto de control:** enlace del PR en el chat.

**Plan B de P2:** capturas de los PR #1 y #2 de `notas-al-d-a`.

---

## PAUSA · 12:45–12:55 (10 min)

🎓 Recuento de enlaces de PR con Aida: quién necesita el rescate.

---

## TEORÍA 3 · SALIR Y VOLVER ATRÁS · 12:55–13:15 (20 min)

*Teoría: `Teoria/familia4_golive_recuperacion_alumnos.md` · Ideas: 1) salir es una decisión: la checklist; 2) rollback y revert; 3) verde no significa que funcione.*

### 12:55 — Antes de entrar (1 min)

**Tú:**
> "**Go-live:** abrir la puerta a los usuarios. **Rollback:** el botón de deshacer de producción. **Revert:** un cambio nuevo que deshace otro."

### 12:56 — Idea 1 · La checklist (3 min)

**ACCIÓN:** abre `docs/checklist-go-live.md` en `feedback-hub`.

**Tú:**
> "Ocho preguntas de sí o no antes de salir. Cada una sale de algo que hemos visto hoy. No es un trámite: es para que las alarmas que ya conocéis se digan **antes**. Está en vuestro kit."

### 12:59 — Simulacro de incidente (8 min)

**ACCIÓN:**
1. Abre el PR de `demo/f4-rompe-produccion`: todo en verde y la plantilla con las casillas marcadas.
2. Haz el merge. Mientras se publica: "¿Lo habríais aprobado? Mirad la respuesta a 'qué pasa si falla': *la página seguiría viéndose bien*."
3. En producción, envía el formulario: *"No hemos podido enviar tu opinión"*. "Producción rota, y todo en verde. En el chat: ¿qué hacemos?"
4. **Rollback** en Cloudflare: *Deployments → versión anterior → Rollback*. Comprueba que vuelve a funcionar.

**Plan B:** capturas del ensayo del 9-nov.

### 13:07 — Idea 2 · Rollback y revert (6 min)

**ACCIÓN:** portal, tarjeta de la familia 4, esquema de rollback y revert.

**Tú:**
> "El rollback vuelve a publicar la versión anterior, y ha recuperado el servicio en minutos. Pero `main` sigue teniendo el cambio malo: el próximo merge volvería a publicarlo. Por eso después va el **revert**, con este botón del Pull Request.
>
> Y no todo se puede deshacer: un cambio en la base de datos o un dato ya enviado a vuestros usuarios no vuelven con un botón. Por eso el plan de vuelta atrás se piensa **antes** de salir."

**Tú:**
> "En el chat: ¿cuándo usaríais el rollback y cuándo el revert?"

🎓 Rollback: recuperar el servicio ya. Revert: dejar `main` bien para que no vuelva a salir.

🎓 Haz el merge del revert durante el rescate, para dejar `main` correcto.

### 13:13 — Lo que el PM se lleva (2 min)

**Tú:**
> "Tres ideas de hoy: `main` siempre funciona y todo entra por Pull Request. Los secretos, en la plataforma, y leed lo que Lovable cambia en vuestros datos. Y salir es una decisión: con la checklist, sabiendo cómo volver, y abriendo la web después. Verde no significa que funcione."

---

## SALAS · RESCATE · 13:15–13:40 (25 min)

**ACCIÓN:** abre las salas. Pide en el chat que vayan a la sala de Aida quienes no tengan su URL o su PR. Tú entra en otra sala con quien necesite más ayuda.

- **Prioridad:** primero quien no tenga producción y después quien no tenga el Pull Request.
- Que compartan pantalla **solo** cuando no haya secretos a la vista.
- **Quien ya terminó:** opcional, crear la rama `staging` en GitHub, que publica un staging fijo; o recorrer la checklist con su producto.
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
> "Esto os lleváis: el ciclo de cada cambio, vuestro mapa de entornos, la checklist, una chuleta sin terminal y los ficheros. Todo en el portal."

### 13:48 — Lo que queda (2 min)

**Tú:**
> "Si no os ha dado tiempo a terminar, la guía sirve para hacerlo por vuestra cuenta antes del Demo Day. Y un consejo: entrad en vuestra web unos días antes y comprobad que lo principal funciona."

### 13:50 — Puente al 11 de diciembre (1 min)

**Tú:**
> "Hoy vuestro sistema comprueba que el código funciona y que la web responde. **El día 11 añadimos el check de seguridad a vuestro CI.**"

### 13:51 — Preguntas y despedida (4 min)

**Tú:**
> "¿Alguna pregunta? … Gracias por la mañana, y gracias a Aida. Habéis empezado con un producto en Lovable y os vais con un producto en Internet y un proceso profesional detrás."

---

## COLCHÓN · 13:55–14:00 (5 min)

Para lo que se haya alargado. Si no hace falta, termina antes.

---

## QUÉ HACER SI…

| Situación | Qué hacer |
|---|---|
| **Vas 10 minutos tarde** | Recorta el simulacro a las capturas y quita las preguntas al chat de la teoría. No toques las salas |
| **Vas adelantado** | Más tiempo en las salas. No añadas contenido nuevo |
| **Una sala se atasca entera** | Entra tú en esa sala y Aida pasa a las otras dos |
| **Más de la mitad sin secretos guardados** | Que los guarden al empezar la práctica 1; el rescate absorbe el retraso |
| **Cae GitHub, Lovable o Cloudflare** | Sigue con las capturas del ensayo. Lo hacen después con la guía |
| **Un alumno comparte pantalla con un token visible** | Pídele que deje de compartir. Al acabar, que revoque el token y cree uno nuevo |
| **Pregunta de seguridad (CORS, claves, ataques)** | "Lo vemos el 11 de diciembre" |
