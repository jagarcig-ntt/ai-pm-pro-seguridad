# GUION · Seguridad y buenas prácticas con IA (v2)

**Jueves 10 de diciembre de 2026 · 19:00–21:00 · Zoom · 18 alumnos**
*Spec: SPEC-023 · Escaleta: SPEC-026, plan §2.1 · Fuente única de los minutos: la cheat sheet y el portal salen de aquí. Comprobación: `python scripts/check_timings.py --sesion seguridad --palabras`.*
*El guion de junio (3h, 4 familias) está en el tag de git `sesion-2026-06`.*

**Cómo leer este guion**
- **Las líneas de cita (`>`)** son el texto que dices, completo. Puedes leerlo tal cual: está escrito en frases cortas y directas, sin metáforas ni analogías.
- **ACCIÓN:** lo que haces en pantalla.
- **Pregunta:** la pregunta literal, por chat o en voz (micrófono abierto). No hay encuestas.
- **🎓** notas solo para ti. **Plan B:** qué hacer si algo falla. **Si vas tarde:** el párrafo que puedes saltarte.
- **El mensaje de toda la sesión:** Lovable protege una parte; la decisión es tuya.
- **Los alumnos no hacen nada en directo.** Ya tienen la guía, que se envió antes de la sesión: `descargas/guia_seguridad_alumnos.pdf`. Todo lo que cuentas está en ella, con las mismas palabras.
- Impartes solo. Aida está en la sesión, pero no tiene papel.

**Bloques**

| Hora | Min | Bloque |
|---|---|---|
| 19:00 | 10 | Apertura |
| 19:10 | 27 | F1 · Claves y secretos |
| 19:37 | 27 | F2 · Datos y permisos |
| 20:04 | 8 | Pausa |
| 20:12 | 27 | F3 · Datos personales |
| 20:39 | 5 | Demo del pipeline de agentes |
| 20:44 | 4 | Cierre |
| 20:48 | 12 | Colchón |

**Interacciones** (como máximo 12 min entre una y la siguiente, sin contar la pausa ni la demo del pipeline)

| Hora | Bloque | Pregunta |
|---|---|---|
| 19:08 | Apertura | ¿Habéis abierto la guía? Escribid sí o no |
| 19:20 | F1 | ¿Dónde has pegado alguna vez una clave? ¿En un chat, en un documento? |
| 19:28 | F1 · chequeo | ¿Creéis que Lovable pondrá una clave secreta en la web si se lo pido? |
| 19:35 | F1 · comprobación | Escribe una clave que use tu producto y si es pública o secreta |
| 19:47 | F2 | Si tu clave pública está en la web, ¿qué protege tus datos? |
| 19:55 | F2 · chequeo | ¿Qué creéis que dirá el escáner de una tabla que cualquiera puede leer? |
| 20:02 | F2 · comprobación | ¿Dónde mirarías hoy si tu producto tiene un aviso crítico? |
| 20:22 | F3 | ¿Qué datos pide tu formulario de registro? |
| 20:30 | F3 · chequeo | ¿Creéis que Lovable me avisará de que pido datos de más? |
| 20:37 | F3 · comprobación | Di un dato que tu producto pide y que podrías quitar |
| 20:46 | Cierre | ¿Qué vas a revisar primero en tu producto? |

🎓 Las preguntas son una propuesta del plan (SPEC-023, plan §2.3). Se validan en T10.

---

## PRE-SESIÓN

### Los días antes
1. [ ] **Prueba del pipeline de agentes** (SPEC-023 T02, antes del 5-dic):
   - Comprobar que las claves de `feedbackhub` son falsas o están revocadas.
   - Ejecutar `/security-audit --repo feedbackhub`, opción A, desde Claude Code en `sesiones/2026-12-seguridad-v2/HeroCamp-Product/`.
   - Cronometrarlo.
   - Guardar el informe en `sdd/specs/023-seguridad-v2-guion/plan-b/security-report.md`. Es el plan B de la demo.
2. [ ] **`prueba-cloud` sigue como el 24-nov** (`sdd/specs/026-seguridad-v2-replanteamiento/prueba-lovable.md` §2.5):
   - la tabla `notas_publicas` con el aviso crítico en **More → Security → Findings**;
   - el formulario de registro con DNI, teléfono y fecha de nacimiento;
   - en el chat, el mensaje en el que Lovable se negó a poner la clave en la web.
3. [ ] **La víspera (9-dic): lanzar los tres prompts y guardar las capturas** de las respuestas en `sdd/specs/023-seguridad-v2-guion/capturas/` (`f1-prompt.png`, `f2-prompt.png` y `f3-prompt.png`). Son el plan B de cada chequeo.
4. [ ] **Localizar en el chat de `prueba-cloud` el mensaje de la negativa de F1** y apuntar cómo llegar a él (cuánto hay que subir), para no buscarlo en directo.
5. [ ] **No limpiar `prueba-cloud` hasta después de la sesión** (§2.6 de la prueba).

### Una hora antes (18:00)
**Pestañas abiertas, en este orden:**
1. La guía en PDF: https://jagarcig-ntt.github.io/ai-pm-pro-seguridad/sesiones/2026-12-seguridad-v2/descargas/guia_seguridad_alumnos.pdf
2. Lovable, **`prueba-cloud`**, en el chat (comprueba el nombre arriba a la izquierda).
3. Lovable, `prueba-cloud`, en **More → Security → Findings**.
4. La vista previa de `prueba-cloud`, en el formulario de registro.
5. Los prompts para copiar: `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Entregables/prompts_chequeo_lovable.md`.
6. La carpeta del plan B: `sdd/specs/026-seguridad-v2-replanteamiento/capturas/`, `sdd/specs/023-seguridad-v2-guion/capturas/` y `sdd/specs/023-seguridad-v2-guion/plan-b/security-report.md`.

**VS Code**, aparte:
- Abierto en `sesiones/2026-12-seguridad-v2/HeroCamp-Product/`, con Claude Code preparado.
- Letra grande (28 o más).

**Comprobaciones:**
- [ ] ***Secrets* cerrado** y ninguna pantalla con valores de claves. En `prueba-cloud` hay guardado un secreto falso, `OPENAI_API_KEY`: se puede ver su nombre, nunca su valor.
- [ ] El chat de Zoom, visible para ti.
- [ ] La grabación de Zoom, activada.
- [ ] Este guion en otra pantalla.
- [ ] Agua.

### Diez minutos antes (18:50)
- Compartir pantalla con la portada de la guía en PDF.
- Abrir la sala y saludar a quien vaya entrando.

---

## APERTURA · 19:00–19:10 (10 min)

### 19:00 — Saludo y para qué sirve esta sesión (3 min)
**ACCIÓN:** pantalla compartida con la portada de la guía en PDF.

> Hola a todos. Bienvenidos a la sesión de seguridad. Ya nos conocemos del 21 de noviembre: aquel día pusisteis vuestro producto en producción. Hoy vamos a hablar de qué puede salir mal cuando ese producto tiene usuarios reales, y de qué podéis revisar vosotros para evitarlo.
>
> Empiezo por el para qué. El 12 de diciembre presentáis vuestro producto en el Demo Day. Desde el momento en que una persona real se registra en vuestra web, tenéis datos de otra persona a vuestro cargo. Y si vuestro producto usa servicios de pago, como una IA, esa factura puede crecer mucho si otra persona usa vuestras claves.
>
> La seguridad no es solo un tema de ingenieros. Muchas de las decisiones de seguridad son decisiones de producto: qué datos pedís, quién puede ver qué, dónde guardáis las claves. Esas decisiones las tomáis vosotros, aunque el código lo escriba Lovable.
>
> Hoy no vais a programar nada ni a tocar nada. Es una sesión para entender tres riesgos y saber dónde mirar en vuestro producto.

### 19:03 — Qué os lleváis y el plan de hoy (3 min)
**ACCIÓN:** pasar por el índice de la guía mientras hablas.

> Qué os lleváis. Ya tenéis una guía, que os enviamos antes de la sesión. Tiene tres partes. Primero, los tres riesgos, explicados con un caso real cada uno. Segundo, tres prompts que podéis pegar en el chat de vuestro proyecto de Lovable para que revise vuestro producto. Esos prompts no cambian nada: solo revisan y os explican lo que encuentran. Tercero, una checklist de una página para revisar vuestro producto antes del Demo Day.
>
> El plan de hoy. Vamos a ver tres riesgos. El primero, las claves y los secretos. El segundo, los datos y los permisos. El tercero, los datos personales. Después de cada riesgo, lo compruebo en directo en un proyecto de Lovable del curso que se llama `prueba-cloud`. Es un proyecto de prueba, como los vuestros, en el que he metido fallos a propósito. Así veis qué hace Lovable y qué tenéis que decidir vosotros.
>
> A las ocho y cuatro minutos hacemos una pausa de ocho minutos. Al final os enseño, durante cinco minutos, una herramienta que revisa un proyecto entero de forma automática. Terminamos a las nueve.

### 19:06 — Cómo vamos a participar (2 min)
> Cómo vamos a participar. En cada riesgo os voy a hacer tres preguntas. Podéis responder por el chat o abrir el micrófono y decirlo en voz alta. Las respuestas son cortas: una palabra o una frase. No hay respuestas tontas. Me sirven para saber si me estoy explicando bien.
>
> Si tenéis una duda mientras hablo, escribidla en el chat. Si es del tema, la respondo en ese momento. Si se sale del tema, la apunto y la vemos al final: hay doce minutos reservados para preguntas.

### 19:08 — ¿Habéis abierto la guía? (2 min)
**Pregunta (chat):** «¿Habéis abierto la guía? Escribid sí o no.»

> Primera pregunta, muy fácil. ¿Habéis abierto la guía? Escribid en el chat sí o no.

🎓 Espera unos 30 segundos. Lee en voz alta cuántos sí y cuántos no hay.

**ACCIÓN:** pega en el chat el enlace de la guía.

> Gracias. Si no la habéis abierto, no pasa nada: todo lo que cuento hoy está en ella, con las mismas palabras. Os acabo de pegar el enlace en el chat. Podéis tenerla abierta mientras hablo. Empezamos con el primer riesgo.

---

## F1 · CLAVES Y SECRETOS · 19:10–19:37 (27 min)

*Ideas:*
1. No todas las claves son iguales.
2. Lovable guarda las secretas en *Secrets* y se niega a ponerlas en la web, pero solo protege lo que pasa por Lovable.
3. Una clave publicada se usa en minutos.

*Antes de entrar:* clave, clave pública, clave secreta.

### 19:10 — Para qué y "Antes de entrar" (3 min)
**ACCIÓN:** la página 1 de la guía, "Claves y secretos", en "Palabras que vas a ver".

> Primer riesgo: las claves y los secretos. Para qué os importa: si una clave secreta de vuestro producto se publica, otra persona puede usar un servicio en vuestro nombre, y la factura os llega a vosotros. Es el riesgo que antes os puede costar dinero.
>
> Antes de entrar, tres palabras. Son las mismas que tenéis en la guía.
>
> Primera palabra: **clave**. Una clave es un código que permite a vuestro producto usar un servicio. Por ejemplo, la base de datos, una IA o un servicio de pagos. El servicio mira la clave y decide si deja pasar la petición.
>
> Segunda palabra: **clave pública**. Es una clave que puede estar en la web. Por sí sola no da acceso a nada privado.
>
> Tercera palabra: **clave secreta**. Es una clave que nunca debe estar en la web. Quien la tenga puede usar el servicio en vuestro nombre, y pagáis vosotros.

### 19:13 — Idea 1 y 2 · No todas las claves son iguales; lo que protege Lovable (7 min)
> Primera idea: no todas las claves son iguales.
>
> Vuestro producto de Lovable tiene, como mínimo, dos tipos de claves. La primera es la clave pública de la base de datos. Vuestra web la necesita para leer y guardar datos, así que está en el código que se descarga el navegador de cada usuario. Cualquiera que abra vuestra web puede verla. Y es normal: está pensada para eso.
>
> La segunda es una clave secreta. Por ejemplo, la clave maestra de la base de datos, que permite leer, cambiar y borrar todos los datos de todos los usuarios. O la clave de una IA, como OpenAI, que cobra por cada uso. Esas claves solo pueden estar en el servidor. El servidor es la parte de vuestra app que funciona en los ordenadores del proveedor, y que el usuario no ve ni puede descargar.
>
> Ya habéis manejado una clave secreta. El 21 de noviembre creasteis un token de Cloudflare y lo guardasteis en los secretos de GitHub. Ese token es una clave secreta: con él, cualquiera podría publicar o cambiar vuestra web. Por eso lo guardasteis como secreto y no en el código.
>
> La regla es sencilla: una clave pública puede estar en la web. Una clave secreta, nunca.
>
> Segunda idea: Lovable guarda las claves secretas en un sitio protegido, pero solo protege lo que pasa por Lovable.
>
> Lovable tiene un almacén para las claves secretas que se llama *Secrets*. Lo que guardáis ahí lo usa el servidor, y no llega nunca al navegador del usuario.
>
> El 24 de noviembre lo probé en `prueba-cloud`. Le pedí a Lovable que pusiera una clave secreta de OpenAI directamente en el código de la web. La clave era falsa. Lovable se negó: me dijo que eso la expondría a cualquiera y me propuso usarla desde el servidor. Además, como yo había pegado el valor de la clave en el chat, Lovable la guardó por su cuenta en *Secrets*. Es una buena noticia: dentro de Lovable, estáis protegidos.
>
> Pero Lovable solo protege lo que pasa por Lovable. No puede proteger una clave que pegáis en otro sitio. Por ejemplo: en un fichero de vuestro repositorio de GitHub, en un documento compartido, en un correo, en el chat de otra herramienta de IA o en una captura de pantalla.
>
> Y aquí hay un detalle importante. El 21 de noviembre, vuestro repositorio de GitHub quedó público. Eso significa que cualquier persona puede leer todos sus ficheros. Si alguna vez una clave secreta acaba escrita en un fichero de ese repositorio, la puede copiar cualquiera.
>
> *Si vas tarde, salta este párrafo.* No es un problema raro. Un estudio de febrero de 2026, de la empresa de seguridad Cyble, encontró más de cinco mil repositorios de GitHub y unas tres mil webs con claves de OpenAI escritas en su código.

### 19:20 — Pregunta (2 min)
**Pregunta (chat o voz):** «¿Dónde has pegado alguna vez una clave? ¿En un chat, en un documento?»

> Pregunta para vosotros. ¿Dónde habéis pegado alguna vez una clave? Puede ser una clave de cualquier servicio, en el trabajo o en vuestro proyecto. En un chat, en un documento, en un correo. Escribidlo en el chat o decidlo en voz alta.

🎓 Lee dos o tres respuestas en voz alta. Para cada una, di si ese sitio está protegido o no. Si nadie responde en 30 segundos, pon tu ejemplo: «Yo, por ejemplo, alguna vez he pegado una clave en un documento para no perderla. Eso es justo lo que no hay que hacer».

> Gracias. Fijaos en que ninguno de esos sitios es *Secrets*. Esos son los sitios donde Lovable no os puede proteger.

### 19:22 — Idea 3 · Una clave publicada se usa en minutos (6 min)
> Tercera idea: una clave secreta publicada se usa en minutos, no en días.
>
> Hay programas automáticos que recorren Internet todo el tiempo buscando claves publicadas: en repositorios de GitHub, en el código de las webs y en documentos abiertos. Cuando encuentran una, la prueban. Si funciona, la usan.
>
> ¿Cuánto tardan? La empresa de seguridad Unit 42, de Palo Alto Networks, lo estudió en 2023. En el caso que estudiaron, las claves publicadas en GitHub se empezaron a usar en menos de cinco minutos.

**ACCIÓN:** la guía, en "Caso real" de la familia 1.

> Ahora, un caso real. Una startup mexicana, en febrero de 2026. Era un equipo de tres personas. Gastaban unos 180 dólares al mes en servicios de Google. Entre el 11 y el 12 de febrero, alguien usó su clave para generar texto e imágenes con Gemini, la IA de Google. La factura llegó a 82.314 dólares. En 48 horas.

🎓 Pausa de tres segundos después de la cifra.

> Google respondió que proteger las claves es responsabilidad del cliente. Lo publicó The Register el 3 de marzo de 2026.
>
> Fijaos en lo que significa para vosotros. No hace falta que alguien os ataque a propósito. Basta con que una clave secreta acabe en un sitio público. Un programa la encuentra, la usa, y vosotros os enteráis cuando llega la factura.
>
> Por eso hay dos cosas que conviene tener hechas antes de que pase nada. La primera, poner un límite de gasto en cada servicio que cobra por uso. Algunos servicios solo os avisan cuando llegáis a la cifra y siguen cobrando, así que comprobad qué hace cada uno y, como mínimo, activad el aviso. La segunda, saber qué hacer si una clave se publica: cambiarla en ese momento. Se crea una nueva en el servicio, se borra la antigua y se guarda la nueva en *Secrets*. La antigua deja de funcionar, y quien la tenga ya no puede usarla.

### 19:28 — Chequeo en Lovable (7 min)
**Pregunta (chat o voz):** «¿Creéis que Lovable pondrá una clave secreta en la web si se lo pido?»

> Vamos a comprobarlo en Lovable. Antes, una pregunta. Si yo le pido a Lovable que ponga una clave secreta en el código de la web, ¿creéis que lo hará? Escribid sí o no.

🎓 Espera unos 20 segundos y lee cuántos sí y cuántos no hay. No des la respuesta todavía.

**ACCIÓN:** pestaña de `prueba-cloud`, en el chat. Copia el prompt 1 de `prompts_chequeo_lovable.md`, pégalo y envíalo. Anota la hora.

> Ahora le pido a Lovable que revise las claves de este proyecto. Es el primer prompt de vuestra guía, el mismo que podéis usar en vuestro producto. Empieza diciendo «No cambies nada: solo revisa e informa». Lovable va a tardar un poco en responder.

**ACCIÓN:** mientras responde, sube en el historial del chat hasta la negativa del 24-nov (apuntada en la pre-sesión).

> Mientras responde, os enseño la respuesta a la pregunta. Esto es lo que pasó el 24 de noviembre, cuando le pedí que pusiera una clave secreta en el código de la web. Lovable contestó que no había cambiado el código, porque poner la clave de OpenAI en el código de la web la expondría a cualquiera, y me propuso usarla desde el servidor. Los que habéis dicho que no, acertáis.

**ACCIÓN:** vuelve al final del chat. Si ya ha respondido, lee en voz alta el resumen de dos frases y señala la tabla.

> Aquí está la respuesta. Leo el resumen del principio.

🎓 Lee las dos frases tal cual. El 24-nov dijo: «No hay ninguna clave secreta en el código que recibe el navegador: todas están bien guardadas».

> En la tabla veis cada clave del proyecto: de qué servicio es, si es pública o secreta y dónde está. La clave pública de la base de datos está en el navegador, y es normal. Las secretas están en *Secrets* o en los secretos de GitHub.

**Plan B:** si a los 4 min no ha respondido, abre `023/capturas/f1-prompt.png`: «Lovable está tardando; os enseño la respuesta que dio ayer con el mismo prompt». Si no encuentras el mensaje en el historial, abre `026/capturas/f1-chat-lovable-rechaza-clave.png`.

> El mensaje de este riesgo es este: Lovable os protege si la clave pasa por Lovable. Fuera de Lovable, nadie os protege.

### 19:35 — Lo que te llevas y comprobación (2 min)
**Pregunta (chat o voz):** «Escribe una clave que use tu producto y si es pública o secreta.»

> Lo que os lleváis de este riesgo son tres cosas. Uno: las claves secretas, solo en *Secrets*. Dos: un límite de gasto, o como mínimo un aviso, en cada servicio que cobra por uso. Tres: si una clave secreta se publica, se cambia en ese momento. Lo tenéis en la página de «Claves y secretos» de la guía, en «Qué hacer», y en la checklist.
>
> Última pregunta de este riesgo. Escribid en el chat una clave que use vuestro producto y si es pública o secreta. Por ejemplo: «la clave de la base de datos, pública».

🎓 Lee dos o tres respuestas. Si alguien se equivoca, corrígelo con la regla: «Si con ella se puede gastar dinero o ver todos los datos, es secreta».

---

## F2 · DATOS Y PERMISOS · 19:37–20:04 (27 min)

*Ideas:*
1. Con la clave pública cualquiera puede consultar tu base de datos.
2. RLS decide qué filas ve cada usuario.
3. Lovable crea las tablas con RLS, pero si tú pides algo inseguro lo hace y te avisa: la decisión es tuya.

*Antes de entrar:* base de datos, tabla, RLS.

### 19:37 — Para qué y "Antes de entrar" (3 min)
**ACCIÓN:** la página 2 de la guía, "Datos y permisos", en "Palabras que vas a ver".

> Segundo riesgo: los datos y los permisos. En el riesgo anterior hemos visto que la clave pública de la base de datos está en la web y que es normal. Ahora la pregunta es: si cualquiera puede ver esa clave, ¿qué impide que cualquiera vea los datos de vuestros usuarios?
>
> Para qué os importa: aquí están los emails, los mensajes y las notas de las personas que usan vuestro producto. Si este riesgo falla, no perdéis dinero: exponéis los datos de otras personas.
>
> Antes de entrar, tres palabras.
>
> Primera palabra: **base de datos**. Es donde vuestro producto guarda la información. En vuestro caso, en Lovable Cloud.
>
> Segunda palabra: **tabla**. Es una parte de la base de datos con filas y columnas. Por ejemplo, una tabla de usuarios o de notas, con una fila por cada usuario o por cada nota.
>
> Tercera palabra: **RLS**. Son las siglas de *Row Level Security*, que en español es seguridad por fila. Son las reglas que deciden qué filas puede ver, crear, cambiar o borrar cada usuario.

### 19:40 — Idea 1 y 2 · La clave pública y las reglas RLS (7 min)
> Primera idea: con la clave pública, cualquiera puede consultar vuestra base de datos.
>
> Vuestra web envía peticiones a la base de datos usando la clave pública. Esa clave está en el código que se descarga el navegador. Una persona que sepa un poco de programación puede copiarla y usarla para enviar peticiones a vuestra base de datos directamente, sin pasar por las pantallas de vuestra web. Por ejemplo, puede pedir todas las filas de la tabla de usuarios.
>
> Esto no es un fallo: la clave pública funciona así por diseño. La clave no protege los datos. Solo identifica a vuestro producto ante la base de datos.
>
> Segunda idea: lo que protege los datos son las reglas RLS.
>
> Cada vez que llega una petición a la base de datos, las reglas RLS de esa tabla deciden qué filas devuelve. Una regla típica dice: «cada usuario solo puede ver sus propias filas». Con esa regla, si alguien pide todas las notas, la base de datos solo le devuelve las suyas. Si no ha iniciado sesión, no le devuelve ninguna.
>
> Por tanto, la seguridad de vuestros datos no depende de esconder la clave. Depende de que cada tabla tenga sus reglas, y de que esas reglas no dejen ver más de lo necesario.
>
> Hay dos situaciones peligrosas. La primera, una tabla sin reglas. La segunda, una tabla con una regla que deja leerlo todo a cualquiera, aunque no haya iniciado sesión. En los dos casos, cualquier persona con la clave pública puede leer todas las filas de esa tabla.
>
> Un ejemplo con un producto como los vuestros. Una app de reservas tiene una tabla de reservas, con el nombre, el email y el teléfono de cada cliente. Si esa tabla tiene la regla «cada usuario ve solo sus reservas», un cliente solo ve las suyas, y alguien sin sesión no ve ninguna. Si esa tabla no tiene reglas, cualquiera con la clave pública puede descargar el nombre, el email y el teléfono de todos los clientes, sin entrar en la app.
>
> Esto os afecta directamente. Vuestro producto de Lovable funciona así: la web con la clave pública, y los datos protegidos por reglas RLS en Lovable Cloud. La pregunta que tenéis que poder responder es: ¿qué tablas tiene mi producto, y quién puede leer cada una?

### 19:47 — Pregunta (2 min)
**Pregunta (chat o voz):** «Si tu clave pública está en la web, ¿qué protege tus datos?»

> Pregunta para comprobar que me he explicado bien. Si vuestra clave pública está en la web, ¿qué protege vuestros datos? Escribidlo en el chat con una o dos palabras.

🎓 La respuesta que buscas: las reglas RLS. Si alguien dice «la contraseña» o «el login», aclara: «El login dice quién eres. Las reglas RLS deciden qué filas puedes ver con ese usuario».

> Exacto: las reglas RLS. La clave puede ser pública. Las reglas, no pueden faltar.

### 19:49 — Idea 3 · Lovable avisa, la decisión es tuya (6 min)
> Tercera idea: Lovable crea las tablas con reglas RLS, pero si vosotros le pedís algo inseguro, lo hace y os avisa. La decisión es vuestra.

**ACCIÓN:** la guía, en "Caso real" de la familia 2.

> Primero, un caso real. El 29 de mayo de 2025, el investigador Matt Palmer publicó que muchas apps hechas con Lovable tenían reglas RLS insuficientes. Cualquier persona, sin iniciar sesión, podía leer o escribir datos de sus tablas. Según el investigador, afectaba a más de 170 apps. Se registró como un fallo de seguridad de gravedad crítica, con un 9,3 sobre 10, con el código CVE-2025-48757. Lovable no está de acuerdo con esa clasificación: dice que cada cliente es responsable de proteger los datos de su app.
>
> Fijaos en esa última frase. La plataforma dice que la responsabilidad es del cliente. Es decir, vuestra.
>
> *Si vas tarde, salta este párrafo.* Otro caso, de enero de 2026: Moltbook, una red social, tenía una base de datos sin RLS bien configurada. Dejó expuestas alrededor de un millón y medio de claves de acceso a servicios. Lo publicó la empresa de seguridad Wiz el 2 de febrero de 2026.
>
> ¿Qué pasa hoy en Lovable? El 24 de noviembre lo probé en `prueba-cloud`. La tabla de notas que había creado Lovable ya tenía reglas RLS: cada usuario solo ve sus propias notas. Eso está bien.
>
> Después le pedí a Lovable algo inseguro a propósito: una tabla nueva, llamada `notas_publicas`, con una regla que deja leer todas las filas sin iniciar sesión. Lovable lo hizo. Hace lo que le pedís. Me avisó de que mis notas privadas seguían protegidas, pero creó la tabla abierta.
>
> Y en ese momento, el escáner de seguridad de Lovable la marcó como crítica. El escáner es una revisión automática que busca fallos de seguridad en vuestro proyecto. Ahora os lo enseño.
>
> El mensaje es este: Lovable os avisa, pero no decide por vosotros. Si una tabla tiene que ser pública, porque es contenido que quiere ver todo el mundo, está bien. Pero entonces esa tabla no puede guardar datos personales.

### 19:55 — Chequeo en Lovable (7 min)
**Pregunta (chat o voz):** «¿Qué creéis que dirá el escáner de una tabla que cualquiera puede leer?»

> Antes de enseñarlo, una pregunta. ¿Qué creéis que dirá el escáner de Lovable de esa tabla que cualquiera puede leer? ¿Lo marcará como grave, como leve o no dirá nada?

🎓 Espera unos 20 segundos y lee algunas respuestas. No des la respuesta todavía.

**ACCIÓN:** pestaña de `prueba-cloud`, en el chat. Copia el prompt 2 de `prompts_chequeo_lovable.md`, pégalo y envíalo. Anota la hora.

> Lanzo el segundo prompt de la guía, el de datos y permisos. Le pide a Lovable que revise cada tabla: qué datos guarda, si tiene RLS y quién puede leerla. Tampoco cambia nada.

**ACCIÓN:** mientras responde, pestaña de **More → Security → Findings**.

> Mientras responde, os enseño el escáner. Está en el menú **More**, en **Security**, en **Findings**. Aquí aparecen los avisos de seguridad del proyecto. Hay uno, marcado como **Critical**, que significa crítico. Dice: «Anyone can read every record in notas_publicas». En español: cualquiera puede leer todas las filas de `notas_publicas`. Es justo la tabla que pedí.
>
> Este mismo aviso también apareció en el chat, en cuanto se creó la tabla. Con el botón **Run checks** se vuelve a lanzar la revisión. Con el botón **Fix all**, Lovable propone un arreglo. No lo pulso: primero hay que leer el aviso y decidir. Y si se arregla, se hace con un Pull Request, que es la propuesta de cambio que revisáis antes de publicarla, y se comprueba la preview, la versión de prueba, antes del merge, que es unir el cambio a la versión publicada. Como el 21 de noviembre.

🎓 No pulses *Fix all* ni *Run checks*: la comprobación avanzada tarda unos 8 minutos.

**ACCIÓN:** vuelve al chat. Si ya ha respondido, lee en voz alta el resumen de dos frases y señala la tabla.

> Aquí está la respuesta del prompt. Leo el resumen.

🎓 Lee las dos frases tal cual. El 24-nov puso `notas_publicas` como la tabla de mayor riesgo y la tabla de notas como protegida. **Si dice que el comprobador automático no encontró incidencias** (lo dijo el 24-nov), aclara: «Fijaos: aquí dice que no hay incidencias, pero Findings marca un crítico. Lo que vale es Findings».

> En la tabla veis cada tabla del proyecto, ordenadas de mayor a menor riesgo. Arriba, `notas_publicas`: la puede leer cualquiera. Debajo, la tabla de notas: cada usuario solo ve las suyas.

**Plan B:** si a los 4 min no ha respondido, abre `023/capturas/f2-prompt.png`. Si Findings no carga, abre `026/capturas/f2-escaner-hallazgo-critico.png`.

> El mensaje de este riesgo: Lovable os avisa, pero la decisión es vuestra. Leed los avisos de Security antes de publicar.

### 20:02 — Lo que te llevas y comprobación (2 min)
**Pregunta (chat o voz):** «¿Dónde mirarías hoy si tu producto tiene un aviso crítico?»

> Lo que os lleváis de este riesgo son tres cosas. Uno: antes de publicar, abrid **More**, **Security**, **Findings** y lanzad **Run checks**. Dos: leed cada aviso crítico y decidid. Si una tabla tiene que ser pública, comprobad que no guarda datos personales. Tres: si no entendéis un aviso, usad el segundo prompt de la guía para que Lovable os lo explique.
>
> Última pregunta de este riesgo. ¿Dónde miraríais hoy si vuestro producto tiene un aviso crítico? Escribid la ruta en el chat.

🎓 La respuesta: More → Security → Findings. Si alguien duda, repite la ruta despacio.

> Después de la pausa, el tercer riesgo: los datos personales.

---

## PAUSA · 20:04–20:12 (8 min)

### 20:04 — Pausa (8 min)
> Hacemos una pausa de ocho minutos. Volvemos a las ocho y doce. Si tenéis alguna duda de lo que hemos visto, dejadla en el chat y la respondo a la vuelta o al final.

🎓 Deja en pantalla la portada de la guía. Lee el chat durante la pausa y apunta las preguntas para el colchón. A las 20:12, en punto:

> Seguimos. Vamos con el tercer riesgo.

---

## F3 · DATOS PERSONALES · 20:12–20:39 (27 min)

*Ideas:*
1. Pide solo lo que necesitas: ninguna herramienta lo decide por ti.
2. Dónde acaban los datos sin que lo sepas: registros, consola, IA.
3. 72 horas para avisar si hay una brecha.

*Antes de entrar:* dato personal, RGPD, brecha.

🎓 Escrito el 24-nov con las ideas validadas (spec P4) y la guía publicada. Cuando esté la teoría de F3 de SPEC-021 (30-nov), se revisa que use los mismos términos y casos, sin cambiar las 3 ideas.

### 20:12 — Para qué y "Antes de entrar" (3 min)
**ACCIÓN:** la página 3 de la guía, "Datos personales", en "Palabras que vas a ver".

> Tercer riesgo: los datos personales. En el riesgo anterior hablamos de quién puede leer vuestras tablas. Ahora hablamos de qué datos guardáis en ellas y adónde van.
>
> Para qué os importa: los datos personales pertenecen a las personas que usan vuestro producto, no a vosotros. Os los dan para poder usarlo. Y la ley os dice qué podéis hacer con ellos y qué tenéis que hacer si algo sale mal.
>
> Antes de entrar, tres palabras.
>
> Primera palabra: **dato personal**. Es cualquier dato que identifica a una persona o permite identificarla. Por ejemplo, el nombre, el email, el teléfono, la dirección, una foto o el DNI.
>
> Segunda palabra: **RGPD**. Es el Reglamento General de Protección de Datos, la ley europea de protección de datos. Se aplica desde vuestro primer usuario real.
>
> Tercera palabra: **brecha**. Una brecha es cuando datos personales llegan a quien no debería tenerlos, por un error o por un ataque. Por ejemplo, una tabla con emails que cualquiera puede leer.

### 20:15 — Idea 1 y 2 · Pide solo lo que necesitas; dónde acaban los datos (7 min)
> Primera idea: pedid solo los datos que necesitáis. Ninguna herramienta lo decide por vosotros.
>
> Cada dato que pedís es un dato que tenéis que proteger. Si hay una brecha, cuantos más datos tengáis, más grave es. Si vuestro producto solo guarda el email, una brecha expone emails. Si además guarda el DNI y la fecha de nacimiento, expone mucho más.
>
> Por eso el RGPD os obliga a pedir solo los datos que necesitáis para lo que hace vuestro producto. Es una decisión de producto, y la tomáis vosotros.
>
> El 24 de noviembre lo probé en `prueba-cloud`, que es una app de notas. Le pedí a Lovable un formulario de registro con nombre, email, teléfono, DNI y fecha de nacimiento. Una app de notas no necesita el DNI ni la fecha de nacimiento. Lovable añadió todos los campos sin avisar. Y el escáner de seguridad no lo marcó, ni en la revisión rápida ni en la avanzada.
>
> Es lógico: Lovable no sabe para qué sirve vuestro producto. Vosotros sí. La pregunta que tenéis que haceros con cada dato es: ¿para qué lo uso? Si no tenéis respuesta, quitadlo.
>
> Segunda idea: los datos acaban en sitios donde nadie los busca.
>
> Hay tres sitios que conviene conocer.
>
> El primero, la **consola del navegador**. Es una ventana del navegador donde la web escribe mensajes técnicos. Cualquier persona que use vuestra web puede abrirla. Si vuestra web escribe ahí los datos de un formulario, los puede ver cualquiera que esté delante de ese ordenador.
>
> El segundo, los **registros**, también llamados *logs*. Son los mensajes que vuestro producto guarda sobre lo que hace, por ejemplo cada vez que alguien se registra. Si guardan datos personales, esos datos quedan copiados en otro sitio, y también hay que protegerlos.
>
> En la prueba del 24 de noviembre, le pedí a Lovable que escribiera en la consola todos los datos del formulario. Se negó, «por privacidad». Otra buena noticia.
>
> El tercero, la **IA**. Si vuestro producto envía datos a una IA, esos datos salen de vuestro producto y van a otro servicio. Y lo mismo pasa cuando vosotros pegáis datos reales de vuestros usuarios en el chat de Lovable o de otra IA para que os ayude a resolver algo.

### 20:22 — Pregunta (2 min)
**Pregunta (chat o voz):** «¿Qué datos pide tu formulario de registro?»

> Pregunta para vosotros. ¿Qué datos pide el formulario de registro de vuestro producto? Escribidlos en el chat. Si no tenéis formulario de registro, escribid «ninguno».

🎓 Lee algunas respuestas. Para cada dato que no sea el email, pregunta en voz alta «¿para qué lo usas?». No hace falta que respondan: la pregunta es el ejercicio.

> Fijaos en lo que habéis escrito. Para cada dato, la pregunta es la misma: ¿para qué lo uso? Lo vamos a comprobar en Lovable dentro de unos minutos.

### 20:24 — Idea 3 · 72 horas para avisar (6 min)
**ACCIÓN:** la guía, en "Caso real" de la familia 3.

> Antes de la tercera idea, un caso real sobre la IA. Samsung, en 2023. En pocas semanas, empleados de Samsung pegaron en ChatGPT código interno y notas de reuniones para que la IA les ayudara. Esa información se envió a un servicio externo, fuera del control de la empresa. Samsung limitó el uso de estas herramientas y después lo prohibió. Lo publicó la prensa coreana, y lo recogió The Register el 6 de abril de 2023.
>
> Lo mismo vale para vuestro producto. Si pegáis datos reales de vuestros usuarios en un chat de IA, esos datos salen de vuestro producto.
>
> Tercera idea: si hay una brecha, tenéis 72 horas para avisar.
>
> El artículo 33 del RGPD dice que, si hay una brecha de datos personales, hay que avisar a la autoridad de protección de datos en un máximo de 72 horas. En España, esa autoridad es la AEPD, la Agencia Española de Protección de Datos. Las 72 horas se cuentan desde que sabéis que ha habido una brecha, no desde que ocurrió. Y no hace falta tener toda la información para avisar.
>
> *Si vas tarde, salta este párrafo.* Las autoridades europeas se toman esto en serio. En 2025 pusieron unos 1.200 millones de euros en multas por incumplir el RGPD. Lo publicó el despacho DLA Piper en enero de 2026.
>
> ¿Qué hacéis si os pasa? La guía tiene un apartado: «Si ya ocurrió: los primeros 30 minutos». Son cinco pasos, en este orden. Uno: si es una clave, cambiarla en ese momento. Dos: cerrar el acceso a los datos. Tres: averiguar qué se vio y desde cuándo. Cuatro: si hay datos personales, avisar ya a quien lleve los temas legales, porque el plazo de 72 horas ya ha empezado. Cinco: apuntar todo con fecha y hora, y no borrar nada.

### 20:30 — Chequeo en Lovable (7 min)
**Pregunta (chat o voz):** «¿Creéis que Lovable me avisará de que pido datos de más?»

> Vamos a comprobarlo. Pregunta: en mi app de notas, el formulario pide el DNI y la fecha de nacimiento. ¿Creéis que Lovable me avisará de que pido datos de más? Escribid sí o no.

🎓 Espera unos 20 segundos y lee cuántos sí y cuántos no hay. No des la respuesta todavía.

**ACCIÓN:** pestaña de `prueba-cloud`, en el chat. Copia el prompt 3 de `prompts_chequeo_lovable.md`, pégalo y envíalo. Anota la hora.

> Lanzo el tercer prompt de la guía, el de datos personales. Le pide a Lovable que diga qué datos personales pide el producto, dónde se guardan, si alguno se escribe en la consola o en los registros, si alguno se envía a otro servicio y si hay alguno que no hace falta.

**ACCIÓN:** mientras responde, pestaña de la vista previa de `prueba-cloud`, en el formulario de registro.

> Mientras responde, este es el formulario. Nombre, email, teléfono, DNI y fecha de nacimiento. Todo obligatorio. Para una app de notas.
>
> Ya os he contado que Lovable no avisó al crearlo, y que el escáner tampoco lo marca. Veamos qué dice el prompt.

**ACCIÓN:** vuelve al chat. Si ya ha respondido, lee en voz alta el resumen de dos frases y señala la tabla.

> Aquí está la respuesta. Leo el resumen.

🎓 Lee las dos frases tal cual. El 24-nov dijo que el nombre, el teléfono, el DNI y la fecha de nacimiento son obligatorios pero no se usan, y recomendó quitarlos, empezando por el DNI. Si menciona otros hallazgos (el 24-nov habló de Google Fonts, que envía a Google la dirección IP del usuario, es decir, la dirección de internet de su conexión), léelos y di que también son datos que salen del producto.

> En la tabla veis cada dato, dónde se pide y qué recomienda hacer. Lo que el escáner no ve, el prompt sí lo ve, porque se lo hemos preguntado. Los que habéis dicho que no avisaría, acertáis: Lovable no avisa, hay que preguntarle.

**Plan B:** si a los 4 min no ha respondido, abre `023/capturas/f3-prompt.png`. Si la vista previa no carga, abre `026/capturas/f3-chat-rechaza-console-log.png`.

> El mensaje de este riesgo: ninguna herramienta decide por vosotros qué datos necesita vuestro producto. Es una decisión de producto.

### 20:37 — Lo que te llevas y comprobación (2 min)
**Pregunta (chat o voz):** «Di un dato que tu producto pide y que podrías quitar.»

> Lo que os lleváis de este riesgo. Uno: para cada dato que pide vuestro producto, preguntaos para qué lo usáis. Si no tenéis respuesta, quitadlo. Dos: no peguéis datos reales de vuestros usuarios en el chat de Lovable ni en otra IA. Tres: tened una política de privacidad que diga qué datos pedís y para qué. Y cuatro: si hay una brecha, tenéis 72 horas para avisar. Lo tenéis en la página de «Datos personales» de la guía, en «Qué hacer», y en la checklist.
>
> Última pregunta de este riesgo. Escribid un dato que vuestro producto pide y que podríais quitar. Si creéis que no sobra ninguno, escribid «ninguno».

🎓 Lee varias respuestas. Si alguien escribe «ninguno», está bien: la pregunta ya la ha hecho.

---

## DEMO DEL PIPELINE DE AGENTES · 20:39–20:44 (5 min)

🎓 Es el único momento de la sesión en el que salen VS Code y Claude Code. No es para que lo usen: es para que vean que estas revisiones se pueden automatizar.

### 20:39 — Qué vais a ver (1 min)
**ACCIÓN:** cambia a VS Code, abierto en `sesiones/2026-12-seguridad-v2/HeroCamp-Product/`, con letra grande.

> Antes de cerrar, os quiero enseñar algo durante cinco minutos. No lo necesitáis para vuestro producto. Es para que veáis qué más se puede hacer.
>
> Esto es VS Code, un programa para trabajar con el código desde el ordenador, fuera de Lovable. Dentro tengo Claude Code, un asistente de IA que puede leer y revisar el código de un proyecto entero. Y con él he montado un pipeline de agentes. Un agente es un programa de IA que recibe una tarea, decide qué pasos dar y los ejecuta por su cuenta: leer ficheros, buscar fallos y escribir un informe. Un pipeline es una secuencia de pasos que se lanzan juntos.

### 20:40 — Lanzar el pipeline y leer el informe (3 min)
**ACCIÓN:** en Claude Code, escribe `/security-audit --repo feedbackhub` y elige la opción **A**. Anota la hora.

> El proyecto que va a revisar se llama `feedbackhub`. Es un proyecto de prueba, como `prueba-cloud`, con fallos metidos a propósito y claves falsas.
>
> Lanzo cuatro agentes a la vez. Cada uno revisa una familia de riesgos. Tres son las que hemos visto hoy: claves y secretos, datos y permisos, y datos personales. El cuarto revisa la configuración: por ejemplo, si hay archivos o páginas de prueba que cualquiera puede abrir. La configuración la tenéis en la checklist de la guía.

🎓 Según el fichero del comando (`.claude/commands/security-audit.md`), la opción A tarda unos 60 segundos. Usa la duración real de tu prueba de los días antes (T02). Mientras corre, el texto de arriba ocupa ese tiempo.

**ACCIÓN:** cuando termine, abre `security-report.md`. Enseña el resumen y la recomendación del principio, y baja por las cuatro familias.

> Aquí está el informe. Arriba, el resumen: cuántos problemas hay y cómo de graves son. Debajo, una sección por familia. Cada problema dice qué es, dónde está, por qué importa y qué hacer.

🎓 Lee el resumen y la recomendación tal como salgan. No cites cifras que no estén en pantalla.

**Plan B:** si a los 2 min no ha terminado, o si falla, abre `sdd/specs/023-seguridad-v2-guion/plan-b/security-report.md`: «Os enseño el informe que generó hace unos días sobre el mismo proyecto».

### 20:43 — Qué significa para vosotros (1 min)
> ¿Qué significa esto para vosotros? Que no lo necesitáis. Para vuestro producto de Lovable, con el escáner de Lovable, los tres prompts y la checklist de la guía tenéis lo necesario. Lo que habéis visto es la misma revisión, automatizada, para cuando un día trabajéis con el código fuera de Lovable. Lo tenéis en el recuadro «Para curiosos» de la guía.

---

## CIERRE · 20:44–20:48 (4 min)

### 20:44 — La guía, la checklist y el Demo Day (2 min)
**ACCIÓN:** vuelve a la guía en PDF, en "Checklist antes de publicar".

> Para cerrar, qué hacer ahora. Todo está en la guía.
>
> Si ya habéis pasado la checklist, perfecto. Si no, pasadla. Es una página: claves y secretos, datos y permisos, datos personales y configuración.
>
> Y una advertencia para el Demo Day, que es el 12 de diciembre. Mañana es día 11. No hagáis cambios grandes mañana: un arreglo sin probar puede romper vuestro producto el día de la demo. Hay una excepción. Si encontráis algo grave, como una clave secreta publicada o una tabla con datos personales que cualquiera puede leer, eso se arregla ya. Para eso, la guía tiene un apartado: «Si ya ocurrió: los primeros 30 minutos». Lo demás, después del Demo Day.
>
> Y en la demo, usad datos de prueba, no datos reales de vuestros usuarios, y no enseñéis en pantalla *Secrets* ni ninguna clave.

### 20:46 — Pregunta final y despedida (2 min)
**Pregunta (chat o voz):** «¿Qué vas a revisar primero en tu producto?»

> Última pregunta de la sesión. ¿Qué vais a revisar primero en vuestro producto? Escribidlo en el chat: una frase.

🎓 Lee varias respuestas. Si alguien dice algo que se arregla en un minuto (un límite de gasto, mirar Findings), anímale a hacerlo hoy.

> Gracias. Resumo la sesión en una frase: Lovable protege una parte, la decisión es vuestra. Mucha suerte en el Demo Day. Me quedo unos minutos para las preguntas que tengáis.

---

## COLCHÓN · 20:48–21:00 (12 min)

### 20:48 — Preguntas abiertas (12 min)
> Ahora, preguntas. Primero, las que habéis dejado en el chat durante la sesión. Después, las que queráis hacer.

🎓 Primero responde las preguntas que apuntaste durante la sesión. Si una familia se alargó, este tiempo ya está gastado: despídete a las 21:00 aunque queden preguntas, y diles que lo que preguntan está en la guía.

🎓 **Preguntas probables y qué responder:**
- **«¿El escáner de Lovable cuesta créditos?»** El botón *Fix all* aparece como gratuito. Si *Run checks* gasta créditos no lo he comprobado. Que lo miren en su saldo antes y después.
- **«Mi repositorio de GitHub es público, ¿es un problema?»** No, mientras no tenga claves secretas. El fichero `.env` que sube Lovable solo lleva valores públicos (lo vimos el 21 de noviembre). El primer prompt de la guía lo comprueba.
- **«¿Acepto el Fix all?»** Primero, leer el aviso y entenderlo. Si lo aceptan, con un Pull Request y probando la preview antes del merge. Y no mañana, salvo que sea grave.
- **«Mi producto no tiene login, ¿me afecta F2?»** Si guarda datos, sí: cualquiera puede leer las tablas que no tengan reglas RLS. Que lancen el segundo prompt.
- **«¿Tengo que tener política de privacidad para el Demo Day?»** Si recogen datos de usuarios reales, sí: la guía lo pide en la checklist. No hace falta que sea perfecta, pero tiene que existir.
- **Una pregunta que no sabes responder:** «No lo sé. Lo miro y os lo paso por el canal del curso».

---

## SI ALGO FALLA

| Problema | Qué haces |
|---|---|
| Lovable tarda en responder un prompt | A los 4 min del chequeo, captura de la víspera (`023/capturas/fN-prompt.png`): «Lovable está tardando; os enseño la respuesta que dio ayer con el mismo prompt.» |
| La respuesta del prompt sale larga o técnica | Lee solo el resumen de dos frases del principio. Si no lo tiene, enseña la captura |
| Lovable no carga o se cae | Todo el chequeo con capturas: `026/capturas/` (escáner, chat y formulario) y `023/capturas/` (respuestas) |
| `prueba-cloud` ha cambiado (falta un fallo plantado) | Captura del 24-nov de ese fallo, en `026/capturas/` |
| El pipeline tarda más de 2 min o falla | Informe de la prueba: `023/plan-b/security-report.md` |
| Aparece en pantalla un valor de una clave | Deja de compartir pantalla. Después de la sesión, cambia la clave (aunque sea falsa, comprueba cuál era) |
| Nadie responde en el chat | Espera 30 s, pide respuesta en voz o responde tú con un ejemplo y sigue |
| Una pregunta técnica que se sale de la sesión | «Está en la guía» o «La apunto y la vemos al final, en las preguntas abiertas» |
| Vas tarde | Salta el párrafo marcado «Si vas tarde» de la familia. El colchón de las 20:48 absorbe el resto |
