# 🎬 GUION COMPLETO - Sesión "Seguridad y Buenas Prácticas con IA"

**3 HORAS SEGUIDAS (17:00-20:00). Todo el mismo día. Pedagógico. Para PMs poco tech.**

---

## 📋 TABLA DE CONTENIDOS

- [Pre-Sesión](#pre-sesión)
- [BLOQUE 0: Apertura Impactante (Min 0-12)](#bloque-0-apertura-impactante-min-0-12)
- [BLOQUE 1: Familia 1 - Credenciales (Min 8-40)](#bloque-1-familia-1---credenciales-min-8-40)
- [BLOQUE 2: Familia 2 - Base de Datos (Min 40-90)](#bloque-2-familia-2---base-de-datos-min-40-90)
- [DESCANSO MENTAL (Min 90-95)](#descanso-mental-min-90-95)
- [BLOQUE 3: Familia 3 - Datos Sensibles (Min 95-145)](#bloque-3-familia-3---datos-sensibles-min-95-145)
- [BLOQUE 4: Familia 4 - Configuración (Min 145-178)](#bloque-4-familia-4---configuración-min-145-178)
- [BLOQUE 5: Cierre + Entrega (Min 178-195)](#bloque-5-cierre--entrega-min-178-195)

---

## PRE-SESIÓN

### 1 hora antes (16:00)

**Checklist técnico:**
```bash
cd /ruta/al/security-pipeline
npm run build  # ✅ Debe compilar sin errores
node dist/index.js --repo ../HeroCamp-Product/feedbackhub  # ✅ Test rápido
```

**Pantalla 1 (Tu control):**
- Este guion abierto
- VSCode abierto con pipeline listo
- Terminal con font 30+

**Pantalla 2 (Para compartir):**
- Portal en navegador (local o GitHub Pages)
- Pantalla completa, sin distracciones

**Físico:**
- Botella de agua (la vas a necesitar)
- Micrófono headset (mejor que laptop)
- 2 monitores idealmente

### 10 minutos antes (16:50)

**En Zoom:**
- Llega con 10 minutos de anticipación
- Saluda cuando llegan: "Hola, ¿tal? Vamos a empezar en 2 minutos"
- **NO compartas pantalla todavía**

---

## BLOQUE 0: APERTURA (MIN 0-12)

### MINUTO 0:00 - Saludo cálido (en cámara, sin portal)

**Pausa. Mira a cámara con sinceridad.**

> "Hola a todos. Yo soy Jaime.

> "Antes de empezar: ¿cómo estáis? ¿Todo bien? Vamos a estar tres horas juntos, así que que sea un espacio donde os sintáis cómodos. Si algo no se entiende, decís. Si queremos parar en medio, paramos. Vamos."

**Tú (mirando a cámara, sonriendo, genuino, SIN prisas):**

> Esta es la última sesión del curso, así que quería que fuera diferente. No voy a daros teoría que podáis leer en cualquier sitio. Voy a contar cosas que me han pasado a mí. Errores que cometí. Y cómo los prevenís vosotros."


**Pausa 2 segundos.**

### MINUTO 1:30 - Qué os lleváis hoy

**ACCIÓN:**
- Comparte pantalla (portal)
- Espera 2 segundos a que cargue
- Navega a sección "Qué te llevas" (#paraque)

**Tú (continuando):**

> "Antes de meternos en el rollo técnico, quiero que sepáis qué os lleváis de aquí.
>
> Voy a compartir un sitio que he preparado. Todo está aquí: casos reales, datos, herramientas. Y al final, vosotros os lleváis DOS cosas que podéis usar el lunes en vuestros proyectos."

**Pausa. El portal muestra "Qué te llevas".**

> "Número UNO: Una guía de seguridad. No es un PDF aburrido. Es un documento para tener abierto el día que vayas a desplegar algo. Te dice qué revisar, paso a paso, sin jerga.
>
> Número DOS: Un pipeline. Una herramienta que ejecutas en tu proyecto, en un segundo, y te dice si hay problemas de seguridad. Automatizado. Sin checks manuales que fallan cuando tienes prisa.
>
> Eso es lo que vamos a construir mentalmente durante estas 3 horas. Y vosotros os lo lleváis."

**Pausa. Baja el ritmo.**

> "Para llegar ahí, vamos a recorrer cuatro familias de riesgo: credenciales expuestas, permisos de base de datos, datos sensibles, y configuración de entornos. Cuatro patrones que se repiten en casi todos los proyectos construidos rápido con IA. Cuando los conozcas, los empiezas a ver en todas partes."

**Pausa 2 segundos.**

### MINUTO 3:30 - Quién soy (contexto corto)

**ACCIÓN en portal:**
- Navega a sección "Quién" (#quien)

**Tú:**

> "Rápidamente: quién soy yo. No porque sea importante mi CV, sino porque entendáis de dónde viene esto que os cuento.
>
> Llevo más de una década en banca y tecnología. 8 años en NTT DATA, creciendo de engineer a technical lead a AI lead. He dirigido equipos, he visto fallos de seguridad en producción, he cometido errores que costaron dinero.
>
> Y por eso hoy estoy aquí."

**Pausa 1 segundo.**

> "Lo que importa no viene de la teoría. Viene de haber construido con estas herramientas en proyectos reales, haber cometido estos errores, y haber visto qué pasa cuando no hay defensas.
>
> Por eso sé dónde duele. Y por eso creo que esto os va a ser útil."

**Pausa 2 segundos.**

### MINUTO 5:00 - El gancho (por qué importa)

**ACCIÓN en portal:**
- Navega a sección "Impacto" (#impacto)

**Tú:**

> "Ahora sí: ¿por qué esto importa? Voy a contar un caso real que pasó hace poco.
>
> Una startup mexicana. Tres desarrolladores. Trabajaban normal, construían rápido con IA, todo bien.
>
> Un día, uno de ellos comete un error pequeño. Uno. Un pequeño error. Mete una clave de API en el código. La clave está en el repositorio 4 horas.
>
> Cuatro minutos después de hacer push, un bot de GitHub encuentra esa clave.
>
> 48 horas después, la factura es de 82.314 dólares.
>
> ¿Sabéis cuál es la factura normal de esos tres developers? 180 dólares al mes.
>
> En 48 horas pasaron de 180 a 82 mil. Eso fue hace menos de un año. Es real. Pasó."

**PAUSA LARGA. 4 segundos. Que procese.**

**ACCIÓN: señala las cuatro tarjetas del portal mientras hablas.**

**Tú:**

> "Y ese no es el único patrón. Son cuatro. Mirad las tarjetas.
>
> Número dos: bases de datos y permisos. Lovable generó más de 170 aplicaciones con Supabase sin Row Level Security activado. 13.000 usuarios con sus datos expuestos sin autenticación. Tiene CVE oficial: mayo de 2025.
>
> Número tres: datos sensibles. Samsung tuvo tres incidentes en 20 días. Empleados copiando código propietario y diseños internos a ChatGPT. Si eso hubiese llegado al regulador: 72 horas para notificar, hasta 20 millones de euros de multa.
>
> Número cuatro: configuración. CBIZ, una empresa de servicios financieros, dejó un endpoint de API expuesto sin autenticación. Nadie lo detectó durante tres meses. 36.000 registros filtrados. Sin malware, sin ataque sofisticado. Solo un endpoint que nadie recordaba que existía."

**Pausa 2 segundos.**

> "Cuatro patrones. Cuatro formas distintas de que algo salga mal cuando construyes rápido con IA. Dinero, datos, credibilidad, o los tres a la vez.
>
> Y una herramienta que los detecta automáticamente."

**Pausa 2 segundos.**

### MINUTO 7:00 - Dinámica: Levanta la mano

**Tú:**

> "Pregunta rápida, sin juzgar: ¿alguien ha sentido alguna vez el miedo de 'ay, acabo de meter algo que no debería en Git'?"

**Pausa. Espera respuestas o levantadas de mano (30 segundos).**

*[Es muy probable que muchos levanten manos. Normaliza]:*

> "Vale, es lo más normal. Porque cuando construyes rápido, el check mental se rompe. Y eso no es negligencia, es simplemente la realidad de ir a velocidad."

**Pausa 1 segundo.**

### MINUTO 8:00 - Expectativas claras

**Tú (en cámara, serio pero cálido):**

> "Aquí viene lo importante. Esto que vais a aprender hoy no es 'si no hacéis esto, faillais.' Es 'si no tenéis defensas automáticas, va a pasar.'
>
> No confíeis en vuestro check mental cuando estáis apurados. Confiad en herramientas.
>
> Eso es todo lo que vamos a hacer hoy: construir defensas automáticas.
>
> Vamos."

**Pausa 2 segundos.**

---

## BLOQUE 1: FAMILIA 1 - CREDENCIALES (MIN 8-40)

### ANTES DE ENTRAR — Tres conceptos en lenguaje humano

> *[Referencia para el instructor. En el portal, los alumnos pueden expandir la tarjeta Familia 1 para leer estos conceptos. Puedes mostrarlos en el portal o leerlos en voz alta antes de empezar.]*

**Clave de API:**
La contraseña que tu app usa para identificarse ante un servicio externo. Si alguien la roba, puede usarla en tu nombre: gastar tu crédito, borrar tus datos, o suplantar tu aplicación.

**Archivo .env:**
El archivo donde se guardan todas las claves en local, separadas del código. Es como la caja fuerte del proyecto. El problema ocurre cuando ese archivo viaja al repositorio por error y queda visible para siempre en el historial de Git.

**Secrets / variables de entorno:**
La versión segura del .env en producción. Plataformas como Cloudflare Pages o GitHub guardan las claves cifradas fuera del código, inyectándolas solo cuando la app arranca. La clave nunca toca el repositorio.

---

### MINUTO 8:00 - PRIMERO: Explicar el concepto (en cámara, SIN portal aún)

**ACCIÓN:**
- Pausa la pantalla compartida del portal (o minimiza)
- Vuelve a cámara (como si fueses a explicar algo en persona)

**Tú (cara a cara, explicativo):**

> "FAMILIA 1: Credenciales. Voy a explicar qué es para que sea claro.
>
> Una credencial es cualquier cosa que, si alguien la ve, puede usarla para entrar a un servicio tuyo.
>
> Ejemplos: la clave de API que usáis para llamar a OpenAI, el token que os da acceso a Stripe, la contraseña de vuestra base de datos, un archivo con todos esos secretos guardados juntos.
>
> El problema es: si alguna de esas claves llega a GitHub, dos cosas pasan automáticamente.
>
> UNO: Un bot escanea GitHub de forma continua. Tiene bases de datos con los patrones exactos de más de 400 servicios: sabe cómo empieza una clave de Google, de OpenAI, de AWS, de Stripe. No busca al azar. Va directo a lo que conoce. En 4 minutos la encuentra.
>
> DOS: La valida. Intenta conectarse con ella. Si funciona, empieza a usarla.
>
> No hay tiempo de reacción. Es: push → bot → uso → factura. Se acabó.
>
> ¿Claro?"

**Pausa 2 segundos. Mira a cámara.**

### MINUTO 10:30 - Intro al caso + Demo

**Tú (continuando, en cámara):**

> "Ya sabéis el caso de la startup mexicana. Eso es exactamente lo que detecta Familia 1.
>
> Vamos a verlo en el portal y luego en la herramienta."

### MINUTO 11:00 - SEGUNDO: Abrir tarjeta en portal (referencia, no repetición)

**ACCIÓN EN PORTAL:**
- Navega a sección "Impacto"
- Localiza la tarjeta "82K$"
- Haz clic para expandir

**Tú (mientras haces la acción):**

> "Aquí en el portal tenéis la tarjeta con los detalles. Todo documentado. La podéis leer después."

**Pausa 1 segundo.**

> "Lo importante ahora es: el mecanismo es ESTE: una clave en el código → bot la encuentra en 4 minutos → explota → factura.
>
> Y es detectable. Eso es lo que vamos a ver en la herramienta en un segundo."

### MINUTO 13:00 - Dinámica: Levanta la mano

**ACCIÓN:**
- Aún con portal compartido, pero cambia el tono a conversación

**Tú:**

> "Pregunta rápida: ¿cuántos de vosotros habéis commiteado un .env alguna vez, aunque fuera por accidente? Levantad la mano o escribid 'yo' en el chat."

**Pausa. Espera respuestas (30 segundos).**

*[Es muy probable que levanten manos o escriban. Normaliza: "Vale, es lo más normal del mundo. Por eso estamos aquí. Porque es fácil de hacer, difícil de evitar."]*

### MINUTO 14:00 - Puente hacia los casos

**Tú:**

> "¿Por qué pasa tan a menudo con equipos que construyen rápido? Os lo explico con datos en un momento. Antes, dos casos reales para que veáis el rango de daño."

### MINUTO 16:30 - El caso del estudiante de Georgia: cuando tardas 3 meses en enterarte

**Tú:**

> "Os cuento otro caso, porque el de la startup mexicana podría parecer 'pasó rápido, me di cuenta en dos días'. No siempre es así.
>
> Un estudiante de Georgia, el país caucásico. Sube una clave de Gemini a GitHub el 6 de junio. Cree que el repositorio es privado. Ese verano no mira el correo de la universidad.
>
> El 7 de septiembre, un usuario de GitHub le escribe: 'oye, creo que tienes una clave expuesta.'
>
> Tres meses después.
>
> Para entonces la factura es de 55.444 dólares. Los atacantes hicieron 14.200 peticiones a la API en dos días.
>
> El ingreso diario medio en Georgia es de 15 dólares al día.
>
> Google finalmente perdonó la deuda por presión de la comunidad. Pero no siempre ocurre. La startup mexicana intentó lo mismo, y Google aplicó 'Shared Responsibility Model': nosotros protegemos nuestra infraestructura, tú proteges tus claves. Factura sin perdón.
>
> ¿Qué nos enseña esto? Que a veces te enteras en cuatro minutos. Y a veces en tres meses. No sabes cuándo va a impactar. Por eso la regla no es 'revisar si hay problema': la regla es 'tratar cualquier clave commiteada como comprometida desde el minuto uno'."

**Pausa 2 segundos.**

### MINUTO 18:30 - Tipos de claves: no todas son iguales

**Tú:**

> "Antes de la demo, quiero que diferenciéis cinco tipos de claves porque no todas tienen el mismo impacto, y como Product Managers necesitáis saber de qué habláis cuando alguien del equipo os diga 'se expuso una clave'.
>
> PRIMERO: API keys de servicios externos. OpenAI, Anthropic, Google Gemini, Stripe. Es la clave que vuestra aplicación usa para llamar a esos servicios. Si se expone, el atacante consume a cargo de vuestra cuenta, como si usara vuestra tarjeta de crédito. Aquí están los casos de 80 mil dólares.
>
> SEGUNDO: credenciales de infraestructura cloud. AWS, GCP, Azure. Son las más destructivas porque no tienen techo: con ellas se puede levantar servidores, bases de datos, lo que sea, todo a cargo vuestra. Un caso de AWS: 89.000 dólares en tres días. El atacante levantó capacidad de computación equivalente a tener cientos de servidores corriendo sin parar. Factura sin techo.
>
> TERCERO: credenciales de base de datos. Son las claves que permiten conectarse directamente a donde están vuestros datos, sin pasar por la aplicación, sin filtros, sin logs. Acceso total. El impacto aquí no es económico: son los datos de vuestros usuarios. Conecta con Familia 2 que veremos en un momento.
>
> CUARTO: tokens de autenticación. Son credenciales temporales que identifican a una persona o sistema concreto ante vuestros servicios. Si alguien tiene el token de un usuario, puede hacer todo lo que ese usuario puede hacer: leer sus datos, hacer pedidos, cambiar su contraseña. Si tiene el token de un sistema, puede actuar como ese sistema.
>
> QUINTO: secretos de aplicación. Claves que vuestra app usa internamente para funcionar: firmar sesiones de usuario, cifrar datos antes de guardarlos. No son visibles en el frontend, pero si se exponen, un atacante puede falsificar sesiones o descifrar datos que debían estar protegidos.
>
> La distinción más importante que deberéis recordar: hay claves pensadas para ser públicas, como una clave de Google Maps en el frontend, y hay claves que nunca deben salir del servidor. El problema es que esa línea se está borrando: Google cambió silenciosamente el comportamiento de algunas claves que eran 'solo identificadores públicos' y de un día para otro autenticaban contra Gemini. Sin avisar. Sin documentación. Eso es lo que le pasó a la startup mexicana.
>
> Regla práctica para llevarse a casa: cualquier clave que encontréis en vuestro código, asumid que puede hacer algo sensible. Y sacadla del código."

**Pausa 2 segundos.**

### MINUTO 21:00 - El factor agente IA: por qué con Claude Code pasa más

**Tú:**

> "Y ahora los datos. Porque esto no es intuición.
>
> GitGuardian analizó commits de 2025 y encontró que los commits co-firmados con Claude Code tuvieron una tasa de fuga de secretos del 3,2%. La línea base del resto de GitHub es 1,5%. El doble exactamente.
>
> ¿Es Claude Code malo? No. El problema es el patrón de trabajo: el agente resuelve un error, vosotros veis que funciona, aprobáis, hacéis push. El agente no tiene contexto de seguridad. No sabe qué es un archivo .gitignore. No sabe que poner una clave directamente en el código es una mala práctica. Solo sabe que el código funciona y que eso es lo que se le pidió.
>
> Y cuando tiene que elegir entre una opción que requiere configuración adicional y una opción que simplemente funciona ahora mismo, tiende a la segunda. Siempre.
>
> Eso no es negligencia vuestra. Es velocidad sin defensas automáticas. Por eso construimos el pipeline."

**Pausa 2 segundos.**

### MINUTO 22:30 - Otros patrones de Familia 1 (rápido)

**Tú:**

> "Familia 1 también detecta otros patrones que vale la pena que conozcáis:
>
> Archivos .env commiteados directamente. El .env es el archivo donde guardáis todas las claves en local, separado del código. Si en algún momento hicisteis 'subir todo' y ese archivo viajó al repositorio, está expuesto.
>
> Contraseñas visibles en la URL de conexión a base de datos. Algo como 'postgresql://usuario:contraseña@servidor/basededatos'. Esa contraseña está a la vista en el código.
>
> Y este es el que más engaña: credenciales en el historial de Git aunque las hayáis borrado después. Git funciona como una agenda donde podéis añadir páginas pero no arrancarlas. Si en la página 7 estaba vuestra clave, y en la página 10 escribís 'clave eliminada', la clave sigue en la página 7. Para siempre. Cualquiera con acceso al repositorio puede leer la página 7.
>
> Por eso la regla cuando se commitea una clave no es borrarla: es rotarla. Cambiarla inmediatamente en el servicio correspondiente, asumir que está comprometida desde el momento del commit.
>
> Todo esto lo audita el pipeline automáticamente."

### MINUTO 23:30 - DEMO del pipeline — cómo funciona y qué hace

**ACCIÓN:**
- Pausa la pantalla compartida del portal
- Alt+Tab a VSCode
- Terminal VSCode debe estar ENORME (font 30+)

**Tú (en cámara, antes de ejecutar nada):**

> "Antes de lanzarlo, os explico lo que estáis a punto de ver. Porque entender qué hace el pipeline es parte de lo que os lleváis hoy.
>
> Hay cuatro agentes. Uno por familia. Agente de credenciales, agente de base de datos, agente de datos sensibles, agente de configuración. Cada uno tiene instrucciones especializadas en lenguaje natural — los podéis leer, editar y adaptar a vuestro stack.
>
> Cuando ejecutáis el comando, los cuatro se lanzan en paralelo desde Claude Code. No esperan uno al otro. El orquestador recoge los cuatro resultados y construye el informe consolidado.
>
> Dos formas de ejecutarlo. Desde el terminal:"

**ACCIÓN — muestra el comando en el terminal:**
```bash
node dist/index.js --repo ../HeroCamp-Product/feedbackhub
```

**Tú:**

> "O directamente desde Claude Code, con el comando de skill:"

**ACCIÓN — muestra en Claude Code:**
```
/security-audit --repo ./feedbackhub
```

**Tú:**

> "En Claude Code veréis los cuatro agentes trabajando en paralelo en la misma pantalla donde escribís código. Eso es lo que os lleváis: una herramienta que se ejecuta en vuestro entorno, sobre vuestro repositorio, sin que nada salga fuera.
>
> Vamos con el repositorio de demo."

**ACCIÓN — ejecuta el comando completo:**
```bash
node dist/index.js --repo ../HeroCamp-Product/feedbackhub
```

**Espera el resultado (0.15 segundos).**

**Output esperado:**
```
❌ 10 hallazgos CRÍTICOS
⚠️  5 hallazgos ALTOS
🔶 2 hallazgos MEDIOS

Recomendación: ❌ NO DESPLEGAR HASTA RESOLVER
```

**PAUSA DE 5 SEGUNDOS. Que vean el "NO DESPLEGAR" sin interrupciones.**

**Tú:**

> "En menos de un segundo. Diez problemas críticos.
>
> El primero: 'Google API Key hardcodeada. config.js, línea 2.' La clave. En el código. Expuesta.
>
> El segundo: 'Google API Key en archivo .env commiteado.' El .env viajó al repositorio.
>
> El tercero: 'Google API Key encontrada en historial de Git.' Aunque alguien la borrara después, sigue ahí.
>
> Todo lo que hemos hablado en los últimos veinte minutos, detectado automáticamente."

**Scroll para mostrar el informe Markdown:**

> "El pipeline genera un informe detallado. Para cada hallazgo: qué encontró, dónde exactamente, por qué importa, y qué hacer. Sin jerga. Pensado para que lo lea un PM, no un ingeniero de seguridad.
>
> Ahora la pregunta importante: ¿qué hacéis cuando el pipeline encuentra esto?"

**Pausa 2 segundos.**

### MINUTO 27:00 - Cómo se arregla: las acciones concretas

**Tú (en cámara, mirando directamente):**

> "Las acciones son tres, en este orden.
>
> PRIMERO: rotad la clave inmediatamente. No investiguéis primero. No esperéis a confirmar si alguien la usó. Id al panel del proveedor — OpenAI, Google, Stripe — y generáis una clave nueva. La antigua dejad de usarla desde ese momento. Tratadla como comprometida aunque no tengáis evidencia de que alguien la usó. Porque si la encontró el bot y no lo sabéis, ya la están usando.
>
> SEGUNDO: aseguraos de que el .env está en el .gitignore. No en el próximo commit. Ahora. El .env es vuestro archivo local de claves — nunca debe viajar al repositorio. Si ya viajó, la rotación del paso uno es suficiente para el daño ya hecho. Para el futuro: .gitignore.
>
> TERCERO: usad Secrets en vuestra plataforma de despliegue. Cloudflare Pages, Vercel, GitHub Actions — todos tienen un panel donde guardáis la clave cifrada fuera del código. La plataforma la inyecta cuando la app arranca. La clave nunca toca el repositorio. Ese es el único sitio correcto para las claves en producción.
>
> El pipeline os muestra el problema. Vosotros ejecutáis estas tres acciones. Siguiente despliegue limpio."

**Pausa 2 segundos.**

### MINUTO 29:30 - Lo que el PM tiene que llevarse de Familia 1

**Tú (consolidando, tono de cierre de bloque):**

> "Lo que os lleváis de esta familia.
>
> UNO: cualquier clave que llega a GitHub hay que tratarla como comprometida desde ese momento. No desde que alguien la use. Desde el momento del push. Los bots no esperan.
>
> DOS: el .env es local, siempre. Va en el .gitignore desde el día uno. En producción, la clave vive en los Secrets de la plataforma.
>
> TRES: borrar una clave en un commit posterior no la elimina del historial. Git es append-only. La única solución es rotarla.
>
> CUATRO: el repositorio privado no protege. Los colaboradores que se van, los forks, una futura filtración del repo — tratad cualquier clave en cualquier repositorio como si fuera público.
>
> CINCO: con Claude Code la tasa de fuga es el doble que la línea base. No por negligencia: por velocidad sin defensa automática. El pipeline es esa defensa."

---

## QUIZ FAMILIA 1 — CREDENCIALES (min 33-39)

**ACCIÓN:**
- Alt+Tab al navegador (portal)
- Navega a sección "Quiz" → pestaña "01 · Credenciales"

**Tú (tono más ligero, cambia el ritmo):**

> "Cuatro preguntas para fijar lo que acabamos de ver. Escribís A, B, C o D en el chat. Sin trampa, sin nota."

---

#### Pregunta F01/1: ¿Dónde viven las claves en producción? (min 27:00)

**Tú (lees la pregunta en voz alta, CON tu propia entonación, no plana):**

> "Vuestra app usa una clave de API de Stripe. El proyecto está desplegado en Cloudflare Pages. ¿Dónde debe vivir esa clave?
>
> A — En el .env commiteado al repositorio. B — Hardcodeada en el código con un nombre de variable genérico. C — Como Secret en Cloudflare Pages, nunca en el repositorio. D — En un archivo de configuración separado, fuera del código."

**Espera 20 segundos. Lee respuestas del chat en voz alta.**

**Pulsa Revelar.**

**Tú (comentando la respuesta, no leyendo):**

> "C. Los Secrets son exactamente lo que vimos al principio: la versión de producción del .env. Cloudflare, Vercel, GitHub Actions — todos tienen este sistema. Guardáis la clave cifrada en la plataforma, ella la inyecta cuando la app arranca. La clave nunca toca el repositorio.
>
> A y D son trampas frecuentes: parece que estáis siendo ordenados, pero el archivo sigue en algún lugar del repo.
>
> B es el peor caso: visible para cualquiera que lea el código."

---

#### Pregunta F01/2: Variable de entorno, ¿suficiente? (min 28:30)

**Tú:**

> "Siguiente. Tienes la clave en una variable de entorno. ¿Es suficiente?
>
> A — Sí, es privada. B — Solo si .env no está en el repo. C — Solo con repo privado. D — Sí, no aparece en el código."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "B. La variable de entorno protege solo si el archivo .env no viajó al repositorio.
>
> El error clásico es: tenéis el .env guardado, pero en algún momento hicisteis git add . y el .env fue incluido. Git no lo borra por arte de magia aunque luego lo ignoréis. Sigue en el historial."

---

#### Pregunta F01/3: Borré la clave en el siguiente commit (min 29:45)

**Tú:**

> "Esta es la que más engaña. Subiste una clave y la borraste en el siguiente commit. ¿El problema está resuelto?
>
> A — Sí, ya no está. B — Sí si hiciste push. C — No: sigue en el historial. D — Depende del tiempo."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "C, y es importante. Git es append-only. Un commit posterior no borra los anteriores.
>
> Cualquiera que haga git log y git show sobre el commit donde estaba la clave la ve. Para siempre.
>
> La acción correcta cuando commiteas una clave no es borrarla en el siguiente commit: es rotarla inmediatamente. Tratarla como comprometida desde ese momento."

---

#### Pregunta F01/4: Repo privado = seguro (min 31:00)

**Tú:**

> "Última de esta familia. Tu repositorio es privado. ¿Las claves que contiene están seguras?
>
> A — Sí, solo tú puedes verlas. B — No del todo. C — Sí, GitHub las cifra. D — Depende del plan."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "B. El 35% de repositorios privados contienen secretos en texto plano. Los vemos constantemente.
>
> ¿Por qué no protege? Tres razones: el historial de Git, los colaboradores que se van, y una futura fuga del propio repositorio.
>
> Regla simple: trata cualquier clave en cualquier repositorio como si fuera público. El nivel de cuidado no cambia."

---

### MINUTO 33:00 - Transición a Familia 2

**Tú (mirando a cámara):**

> "Familia 1 en el mapa. La más rápida en consecuencias. La más fácil de prevenir.
>
> Ahora entramos en la que más directamente afecta al stack que usáis. Base de datos. Supabase. Esta tiene CVE con nombre propio."

**Pausa 2 segundos.**

---

## BLOQUE 2: FAMILIA 2 - BASE DE DATOS (MIN 33-90)

### ANTES DE ENTRAR — Tres conceptos en lenguaje humano

> *[Referencia para el instructor. Están en el portal, tarjeta Familia 2 expandida. Muéstralos o léelos en voz alta antes de empezar el bloque.]*

**RLS (Row Level Security):**
El portero de cada habitación de tu base de datos. Sin él, cualquiera que entre al edificio puede abrir todas las puertas. Con él, cada habitación tiene su propia cerradura. En Supabase, no se activa por defecto: hay que pedirlo explícitamente por tabla.

**Anon key:**
La llave que Supabase pone intencionadamente en la puerta de entrada de tu app — es pública y eso está bien —. El problema es si las habitaciones de dentro no tienen cerradura (RLS). Con anon key y sin RLS, cualquiera puede volcar toda la tabla con un simple curl.

**Service role key:**
La llave maestra del edificio: abre todo, ignora todos los porteros. Existe para el servidor, no para tu app. Si la metes en el código del frontend es como colgar la llave maestra en la puerta principal. Da igual lo bien que tengas configurado el RLS: esta clave lo salta todo.

---

### MINUTO 35:00 - Por qué pasa (el problema técnico)

**Tú:**

> "El problema: en Supabase, RLS NO viene activada por defecto.
>
> Cuando Lovable (la herramienta parecida a Claude Code) genera un esquema de base de datos, crea las tablas sin RLS.
>
> Así que desarrolladores que no entienden de seguridad, despliegan sin cerraduras. Literalmente, sin cerraduras."

**Pausa 2 segundos.**

> "Hace poco pasó algo: 170 aplicaciones en producción, todas sin RLS. 13.000 usuarios con datos completamente expuestos.
>
> Se llamó CVE-2025-48757. Una vulnerabilidad masiva. Todo por no activar una opción."

### MINUTO 37:00 - DOS patrones críticos

**Tú:**

> "En Familia 2 buscamos DOS cosas:
>
> UNO: Tablas sin RLS. Ya lo explicamos. Sin cerraduras.
>
> DOS: Service role key en código cliente. Service role es la llave maestra absoluta. Salta TODAS las cerraduras.
>
> Si esa clave está en JavaScript (en el navegador), cualquiera que abra DevTools la ve. Y puede acceder a TODO, sin respetar RLS."

**Pausa 2 segundos.**

> "Service role en cliente es peor que cualquier fallo de RLS. Es CRÍTICO."

### MINUTO 38:30 - Dinámica: Experiencia con Supabase

**Tú:**

> "Pregunta: ¿de vosotros, cuántos han usado Supabase? Escribid sí o no en el chat."

**Espera respuestas (30 segundos).**

*Si muchos dicen sí: "Vale, muchos. Preguntad después si habéis habilitado RLS en vuestras tablas. Porque por defecto no viene activada, y eso puede ser un agujero."*

*Si pocos: "Vale, no importa. El concepto es el mismo en cualquier base de datos con permisos."*

### MINUTO 39:30 - DEMO de Familia 2

**ACCIÓN:**
- Alt+Tab a VSCode
- Abre el informe `security-report.md` generado en la demo de Familia 1
- Scroll a la sección Familia 2

**Tú:**

> "Recordáis el informe que generó el pipeline al principio. Tenemos los resultados de las cuatro familias. Vamos a la sección de base de datos.
>
> El agente de Familia 2 auditó el proyecto en paralelo mientras el de credenciales buscaba claves. El resultado:"

**Muestra la sección Familia 2 del informe.**

**Tú:**

> "'Service role key detectada en admin.js.' La llave maestra en el código del cliente.
>
> 'Tabla feedback sin Row Level Security.' Sin portero.
>
> 'Tabla users sin Row Level Security.' Sin portero tampoco.
>
> Las tres cosas que acabamos de explicar: tablas abiertas y la llave que salta todo RLS en el sitio equivocado.
>
> Si alguien combina esos dos hallazgos: acceso total a todos los datos."

**Pausa 2 segundos.**

### MINUTO 42:00 - Cómo se arregla (rápido)

**Tú:**

> "Cómo se arregla. Tres pasos, en este orden.
>
> UNO: La service_role fuera del cliente. Si aparece en cualquier archivo JavaScript, en el código que corre en el navegador del usuario, la sacáis de ahí. Va en las variables de entorno del servidor. Nunca en el cliente. Sin excepciones.
>
> DOS: RLS activado en cada tabla. Cada tabla que tenga datos de usuarios necesita que alguien haya activado los permisos explícitamente. Por defecto no están. Security Advisor os dice cuáles lo tienen y cuáles no: lista exacta, sin tener que revisar manualmente.
>
> TRES: Políticas que filtren de verdad. No vale solo activar RLS. Tenéis que decirle al sistema quién puede ver qué. La regla básica: un usuario solo puede ver sus propios datos. El agente puede generar esas políticas si se lo pedís con ese criterio explícito.
>
> Como Product Manager, vuestra función es saber hacer las preguntas correctas al equipo o al agente: '¿Está RLS activado en esta tabla? ¿La política filtra por usuario real o permite todo? ¿Dónde está la service_role?' Si nadie puede responder esas tres preguntas, hay un agujero."

### MINUTO 43:30 - La prueba del curl: lo que haría un atacante en 30 segundos

**ACCIÓN:**
- Quédate en VSCode pero abre un archivo de texto o el terminal

**Tú:**

> "Voy a daros la prueba exacta que usaría un atacante. Una línea de terminal. La podéis hacer ahora mismo con vuestros propios proyectos cuando terminemos la sesión."

**Muestra o escribe — proyecto de demo real:**

```bash
curl 'https://nkbjjfdcrrqbinmhgvpq.supabase.co/rest/v1/users?select=*' \
  -H "apikey: sb_publishable_c5cliKROXWpb_9X0BCfPaw_FpupS0UY"
```

**[Devuelve los tres usuarios en JSON. Pausa 3 segundos. Que lo vean.]**

> "Eso es todo. Una línea. Sin contraseña. Sin hackear nada. Los datos de Carlos, Ana y Pedro.
>
> Y la anon key, ¿de dónde la saca un atacante? Abrid el inspector del navegador en cualquier aplicación Supabase. Pestaña Network, primera petición a supabase.co. La clave está en el header. En 30 segundos la tenéis.
>
> Está diseñada para ser pública. El modelo de Supabase es: la anon key puede ser pública SIEMPRE QUE el RLS esté bien configurado. Si no está configurado, la anon key equivale a las llaves de toda la casa."

**Pausa 2 segundos.**

### MINUTO 46:00 - Profundidad en RLS: lo que significa "bien configurado"

**Tú (en cámara, didáctico):**

> "Quiero que entendáis la diferencia entre RLS activado y RLS bien configurado. Porque son dos cosas distintas y el pipeline las distingue.
>
> RLS activado significa que hay una capa de permisos en esa tabla. RLS bien configurado significa que esa capa hace algo real.
>
> El error más común que produce el agente: activa RLS pero crea una política que lo permite todo. El portero está ahí, pero cuando le preguntáis '¿quién puede entrar?' responde 'todo el mundo'. Técnicamente el portero existe, el linter de Supabase no se queja, pero no protege nada. Lo llaman seguridad cosmética.
>
> Una política bien configurada es la que dice: 'solo puede ver sus datos el usuario al que pertenecen'. El portero comprueba el DNI del que entra y solo le deja ver las habitaciones que son suyas.
>
> La pregunta que deberéis haceros en vuestros proyectos: ¿mis políticas filtran por usuario real, o simplemente existen sin filtrar nada? Security Advisor no detecta esto — solo detecta si hay RLS o no. El pipeline sí lo detecta. Es la diferencia entre un check superficial y una auditoría real."

**Pausa 2 segundos.**

### MINUTO 49:00 - La service_role key: la llave maestra

**Tú:**

> "Y ahora el caso más grave. La service_role key.
>
> Si la anon key es la llave de la puerta principal de la casa, la service_role es la llave maestra de cada habitación. Salta todas las políticas RLS. Absolutamente todas. Es modo dios sobre la base de datos.
>
> Está diseñada para operaciones administrativas en el servidor. Nunca en el cliente. Nunca en JavaScript del navegador. Nunca en repositorios.
>
> El problema: el agente IA, cuando se encuentra con un error de permisos durante el desarrollo, tiende a resolver con la clave que 'simplemente funciona'. Y la service_role siempre funciona porque salta todos los obstáculos.
>
> Si vuestra service_role key aparece en un archivo de JavaScript, en un .env commiteado, o en cualquier sitio que no sea las variables de entorno del servidor, da igual lo bien que tengáis configurado el RLS. La clave lo salta todo."

**Pausa 2 segundos.**

> "Para que quede claro: si alguien tiene vuestra service_role key, tiene acceso total a toda vuestra base de datos. Sin restricciones. Sin políticas. Como si fuera Supabase el propio sistema."

**Pausa 3 segundos.**

### MINUTO 52:00 - La herramienta que ya tenéis: Supabase Security Advisor

**ACCIÓN:**
- Alt+Tab al navegador
- Abre esta URL directamente (proyecto de demo ya preparado):
  `https://supabase.com/dashboard/project/nkbjjfdcrrqbinmhgvpq/advisors/security`
- Verán esta pantalla: **3 errores · `RLS Disabled in Public` · tablas `public.events`, `public.users`, `public.metrics`**

**Tú:**

> "Supabase, después del CVE de Lovable de 2025, lanzó esta herramienta. Se llama Security Advisor. Está en el menú lateral: Advisors → Security Advisor.
>
> ¿Veis los tres errores? En rojo. Las tres tablas. Supabase os está diciendo exactamente lo mismo que acaba de decir el pipeline: ninguna de estas tablas tiene RLS activado.
>
> La diferencia: el pipeline os lo dice antes de desplegar, en un segundo, sin abrir el navegador. Security Advisor os lo dice si acordáis abrirlo. Las dos herramientas se complementan."

**Tú:**

> "Después de la sesión, hoy mismo, entrad en vuestros proyectos de Supabase y abrid Security Advisor. Es la primera cosa que deberíais hacer."

**Pausa 2 segundos.**

### MINUTO 54:00 - Momento interactivo: ¿cuántos usáis Supabase en producción?

**Tú:**

> "Pregunta directa: ¿cuántos de vosotros tenéis ahora mismo un proyecto en producción con Supabase, aunque sea con pocos usuarios? Escribid 'sí' en el chat."

**Espera 30 segundos. Lee respuestas.**

*[Si hay varios: "Bien. Para los que respondisteis sí, cuando termine la sesión, antes de cerrar el portátil: Security Advisor. Hoy. No la semana que viene. Hoy."]*

*[Si pocos o ninguno: "Perfecto. Cuando empecéis vuestro próximo proyecto con Supabase, esto va antes de publicar. No es opcional. RLS en cada tabla que tenga datos de usuarios."]*

### MINUTO 56:00 - Un vector sutil que el agente introduce sin querer

**Tú:**

> "Hay un vector más en Familia 2 que quiero mencionar porque es el menos conocido y el más silencioso.
>
> Cuando pedís al agente que cree resúmenes o vistas de vuestros datos — por ejemplo, 'muéstrame los pedidos de los últimos 7 días' — el agente puede crear una vista que hereda los permisos del administrador que la creó, no los permisos del usuario que la consulta.
>
> ¿Qué significa eso en la práctica? Que aunque la tabla de pedidos tenga RLS perfectamente configurado, la vista puede saltárselo. Un usuario que no debería ver los pedidos de otro puede verlos a través de la vista.
>
> No es el escenario más frecuente, pero ocurre exactamente cuando el agente intenta ser útil: crea atajos que parecen cómodos pero abren huecos en la seguridad que el RLS no cierra.
>
> El pipeline lo detecta. Si lo veis en el informe, es una señal de que hay vistas que necesitan revisión técnica. Pasádselo al equipo con esa etiqueta exacta: 'vista con permisos elevados sin restricción por usuario'."

**Pausa 2 segundos.**

### MINUTO 58:00 - El principio de mínimo privilegio en agentes

**Tú (en cámara, reflexivo):**

> "Quiero que entendáis por qué Familia 2 es la que más directamente afecta a la forma en que construís con Claude Code.
>
> Cuando construís con un agente IA, el agente tiene acceso a vuestra base de datos para hacer funcionar el producto. Eso es normal. El problema surge cuando al agente se le da más acceso del que necesita.
>
> La regla es simple: mínimo privilegio. El agente solo debe poder hacer lo que su función requiere.
>
> Si construís un agente que genera reportes, ese agente no necesita permisos de escritura. Si construís un asistente que lee tickets de soporte, ese agente no necesita acceso a la tabla de tokens de integración.
>
> ¿Por qué importa esto? Porque cualquier bug, cualquier error, cualquier mal uso tiene consecuencias mucho menores cuando el agente tiene acceso mínimo.
>
> Nunca deis service_role a un agente que procesa input de usuarios externos. Usad siempre el nivel de permisos más bajo que permita al agente hacer su trabajo."

**Pausa 2 segundos.**

### MINUTO 61:00 - Lo que el PM tiene que llevarse de Familia 2

**Tú (consolidando, mirando a cámara):**

> "Cinco ideas de esta familia.
>
> UNO: RLS no se activa por defecto. Asumid que cualquier tabla creada por el agente está desprotegida hasta que lo verificáis.
>
> DOS: USING (true) es seguridad cosmética. Las políticas deben filtrar por auth.uid() o una condición real que limite el acceso al usuario que corresponde.
>
> TRES: La anon key puede ser pública; la service_role jamás. Si la service_role aparece en el cliente, el proyecto está comprometido independientemente del RLS.
>
> CUATRO: Mínimo privilegio para agentes. Nunca le deis a un agente más acceso del estrictamente necesario para su función.
>
> CINCO: Security Advisor es vuestra primera línea de defensa manual. Úsadlo antes de cada despliegue."

**Pausa 2 segundos.**

### MINUTO 63:30 - Preguntas sobre Familia 2

**Tú:**

> "¿Alguna pregunta sobre esto antes de seguir? Escribid en el chat si algo no quedó claro."

**Espera 60-90 segundos. Lee y responde 1-2 preguntas del chat.**

*Algunas respuestas habituales preparadas:*
- *"¿Y si uso Supabase Auth, es suficiente?"* → "Supabase Auth gestiona quién está autenticado. RLS gestiona qué datos puede ver. Son capas distintas. Necesitáis las dos."
- *"¿Cómo sé si mis políticas están bien?"* → "La prueba del curl que vimos: si devuelve datos siendo anónimo, no están bien. Y Security Advisor te dice qué tablas no tienen RLS."
- *"¿El service_role en el servidor es seguro?"* → "En el servidor sí, siempre que el servidor no esté expuesto. En variables de entorno del servidor, nunca commiteadas. Sí."

### MINUTO 65:30 - Demo extendida: revisar el informe de Familia 2 en detalle

**ACCIÓN:**
- Alt+Tab a VSCode
- Vuelve al output del pipeline
- Scroll a la sección de Familia 2 del informe

**Tú:**

> "Volvemos al informe. En Familia 2 el pipeline encontró tres cosas.
>
> Primero: 'Service role key detectada en admin.js, línea 4.' Es CRÍTICO. Da igual el RLS. Esta clave lo salta todo.
>
> Segundo: 'Tabla feedback sin Row Level Security activado.' CRÍTICO. Cualquier curl con la anon key devuelve todos los feedbacks de todos los usuarios.
>
> Tercero: 'Tabla users sin Row Level Security activado.' CRÍTICO. Emails, datos de sesión, historial. Todo accesible.
>
> ¿Qué haríais vosotros? En este orden:
>
> Uno: sacáis la service_role del cliente. No va en JavaScript. Punto.
> Dos: activáis RLS en cada tabla: ALTER TABLE feedback ENABLE ROW LEVEL SECURITY.
> Tres: creáis políticas que filtren por usuario: USING (auth.uid() = user_id).
> Cuatro: volvéis a ejecutar el pipeline. El informe tiene que decir SAFE_TO_DEPLOY en esta sección."

**Pausa 2 segundos.**

### MINUTO 69:00 - La magnitud del problema en cifras

**Tú:**

> "Para que entendáis la escala: el CVE de Lovable que mencionamos afectó a más de 170 aplicaciones en producción. 13.000 usuarios con sus datos expuestos.
>
> Pero esos son los que detectó el investigador en su scan. El número real es mucho mayor. Cualquier usuario de Lovable que construyera con Supabase antes de junio de 2025 y no haya revisado desde entonces, probablemente tiene tablas sin RLS.
>
> Y la frase que se hizo viral en la comunidad de desarrolladores ese mes fue: 'La S de vibe coding es de Security.'
>
> Lo que quiero que os llevéis: construir rápido con agentes no implica construir mal. Implica ser más explícito sobre las cosas que el agente no revisa por defecto.
>
> El pipeline que os llevo hoy detecta esto en menos de un segundo. No tenéis que revisar manualmente tabla por tabla. El agente de seguridad lo hace por vosotros."

**Pausa 2 segundos.**

### MINUTO 72:00 - Debate: ¿cuál es el fallo de configuración que más os preocupa?

**Tú:**

> "Pregunta para reflexionar en el chat: en vuestro proyecto actual, ¿cuál de las dos os preocupa más? ¿RLS mal configurado o service_role en sitio incorrecto? Escribid A para RLS, B para service_role."

**Espera 30 segundos. Lee respuestas.**

**Tú:**

> "Los que dijeron A: lo más probable. El agente crea tablas, no activa RLS, y nadie lo revisa.
>
> Los que dijeron B: es menos frecuente pero mucho más grave cuando pasa.
>
> Los que no respondisteis: os mando la tarea de mirar el dashboard de Supabase antes de dormir."

*[Sonrisa, tono ligero.]*

---

## QUIZ FAMILIA 2 — BASES DE DATOS (min 74-80)

**ACCIÓN:**
- Alt+Tab al navegador (portal)
- Navega a sección "Quiz" → pestaña "02 · Bases de datos"

**Tú:**

> "Cuatro preguntas para fijar Familia 2. A, B, C o D en el chat."

---

#### Pregunta F02/1: ¿Quién puede leer la tabla? (min 74:00)

**Tú:**

> "Creas una tabla en Supabase con el agente. ¿Quién puede leer esos datos por defecto?
>
> A — Solo usuarios autenticados. B — Solo tú como admin. C — Cualquiera con la URL. D — Nadie hasta configurarlo."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "C. Sin configurar RLS, la clave pública que Supabase pone en vuestro código JavaScript da acceso libre a la tabla. Cualquiera puede hacer una petición HTTP y volcarla. En 30 segundos. Lo vimos con el curl."

---

#### Pregunta F02/2: ¿RLS activado = protegido? (min 75:30)

**Tú:**

> "Tienes RLS activado. ¿Significa que estás protegido?
>
> A — Sí, eso es lo que hace RLS. B — Depende de las políticas. C — Sí con la anon key. D — Solo con service_role protegida."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "B. Activar RLS es el primer paso. El segundo es que las políticas filtren de verdad.
>
> Si la política dice 'USING (true)', RLS está activado pero permite todo. Es como poner una cerradura en la puerta pero dejar la llave en el exterior. Lo llaman seguridad cosmética."

---

#### Pregunta F02/3: Anon key vs service_role (min 77:00)

**Tú:**

> "¿Cuál es la diferencia entre anon key y service_role key?
>
> A — La anon está cifrada. B — Service_role salta todo el RLS. C — Anon solo va en el frontend. D — B y C son correctas."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "D. Las dos son correctas.
>
> La anon key está pensada para ir en el código del navegador, es pública por diseño, y RLS la hace segura si está bien configurado.
>
> La service_role es la llave maestra: salta todas las políticas RLS. Si aparece en código de cliente, da igual lo bien que tengas configurado el RLS. Se salta todo."

---

#### Pregunta F02/4: Anon key pública, ¿riesgo o no? (min 78:30)

**Tú:**

> "Última de esta familia. La anon key de Supabase está diseñada para estar visible en el JavaScript del navegador. ¿Eso es un riesgo de seguridad?
>
> A — Sí siempre: ninguna clave debería ser pública. B — No si RLS está bien configurado: la clave es pública, los datos no. C — Solo si alguien inspecciona el código fuente. D — Depende de si el repo es privado."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "B. Y este es el modelo mental clave de Supabase: la anon key puede ser pública por diseño. Lo que no puede ser pública son las tablas sin RLS.
>
> La clave es el identificador del proyecto. RLS es lo que decide qué se puede ver con esa clave. Si RLS está bien configurado, alguien que tenga la anon key solo puede ver lo que su usuario tiene permiso de ver. Nada más.
>
> El riesgo no es que la clave sea pública. El riesgo es que sin RLS, esa clave pública da acceso a todo."

---

### MINUTO 80:00 - Transición al descanso

**Tú (tono de resumen):**

> "Familia 2: la más silenciosa de las cuatro porque no hay alerta inmediata. Los datos están expuestos y nadie lo sabe hasta que alguien los vende, los publica, o el regulador llama.
>
> La buena noticia: es completamente prevenible con dos pasos. RLS en cada tabla, service_role solo en servidor.
>
> El pipeline los detecta en menos de un segundo.
>
> Vamos a hacer una pausa de cinco minutos. Necesitáis agua. Yo también."

---

## DESCANSO MENTAL (MIN 88-93)

### MINUTO 88:00 - Pausa real

**Tú (cambio de ritmo):**

> "Lleváis casi hora y media. Vamos a respirar un segundo.
>
> Levantaos si queréis, tomad agua, estirad. Os doy dos minutos."

**PAUSA REAL. 2 minutos. NO hables.**

**Luego (min 90:00):**

> "Vale, vamos. Faltan dos familias. Esta es legal. Vamos."

---

## BLOQUE 3: FAMILIA 3 - DATOS SENSIBLES (MIN 93-143)

### ANTES DE ENTRAR — Tres conceptos en lenguaje humano

> *[Referencia para el instructor. Están en el portal, tarjeta Familia 3 expandida. Muéstralos o léelos antes de empezar.]*

**PII / Dato personal:**
Cualquier información que permita identificar a una persona, directa o indirectamente. No solo el nombre: una dirección IP, un user_id o un historial de compras son datos personales. El criterio del RGPD no es "identifica directamente" sino "permite identificar directa o indirectamente". Un email solo ya es dato personal.

**RGPD:**
El reglamento europeo que regula cómo se recogen, almacenan y procesan los datos personales. No es solo una ley técnica: afecta a decisiones de producto como qué datos loguear, cuánto tiempo guardarlos y a quién se los mandas. Las multas llegan al 4% de la facturación global anual. Se aplica desde el primer usuario real, no cuando llevas mil.

**Log:**
El diario de a bordo de tu aplicación: registra qué pasa, cuándo y con qué datos. Imprescindible para depurar errores, pero si logueas sin filtrar puedes estar guardando emails, contraseñas o mensajes privados de tus usuarios en texto plano, sin que nadie lo sepa.

---

### MINUTO 93:00 - PRIMERO: Explicar el concepto (cámara, SIN portal)

**Tú (cara a cara, serio):**

> "FAMILIA 3: Datos Sensibles y Privacidad. Este es diferente. No es dinero. Es leyes.
>
> En Europa existe RGPD: Reglamento General de Protección de Datos. Si tu aplicación trata datos personales de personas (emails, teléfonos, direcciones), RGPD te aplica.
>
> Y es SERIO.
>
> Si descubrís que una base de datos se filtró: 72 HORAS para notificar a la autoridad. No 72 para investigar. Para NOTIFICAR.
>
> Si no cumplís: multa adicional. Si el incidente fue culpa vuestra: multa más grande. Si ocultasteis el incidente: aún más.
>
> La multa máxima del RGPD es 20 millones de euros. O el 4% de vuestra facturación anual. Lo que sea más.
>
> Para una startup: puede significar cierre."

**Pausa 3 segundos. Que procese la seriedad.**

### MINUTO 95:30 - Dos tipos de fallos

**Tú:**

> "¿Cómo llegan datos sensibles a sitios donde no deberían estar? Hay dos formas que veo constantemente.
>
> UNO: datos reales en código. Emails reales, IPs reales, teléfonos. Pasa cuando alguien depura un problema con datos de producción y los deja commiteados 'temporalmente'. Se quedan en Git. Si el repositorio se filtra, hay una lista de datos reales de usuarios dentro.
>
> DOS: logs que imprimen demasiado. Cuando logueas el objeto completo de un usuario en lugar de solo los campos que necesitas, estás registrando email, ID de sesión y todo lo demás en los logs de producción. Si esos logs se guardan en un archivo o se envían a una herramienta de monitoreo, estáis acumulando datos personales de cada usuario con cada operación.
>
> Y hay un tercer vector que merece un caso real."

**Pausa 2 segundos.**

### MINUTO 97:30 - SEGUNDO: Abrir portal y narrar el caso Samsung

**ACCIÓN:**
- Alt+Tab al navegador (portal)
- Navega a Familia 3
- Abre la tarjeta del caso

**Tú (mientras haces esto):**

> "Voy a mostrar el caso en el portal. Está en Familia 3."

**Tú:**

> "Samsung es una empresa con propiedad intelectual muy valiosa. Semiconductores, estrategia de producto, todo confidencial.
>
> En 20 días tuvieron TRES incidentes. Todos por lo mismo: engineers copiando información sensible a herramientas externas.
>
> Día 1: código fuente propietario a ChatGPT.
> Día 5: datos de testing de semiconductores.
> Día 18: actas de reuniones internas.
>
> La respuesta de Samsung fue construir su propia IA interna para no depender de servicios externos. Y limitar cualquier uso de LLMs externos a 1.024 caracteres máximo por consulta.
>
> Para vosotros: nunca copiéis datos reales de usuarios a ningún LLM externo. Ni para debuggear, ni para limpiar formato, ni por comodidad. Una vez esos datos están ahí, no son solo vuestros."

**Pausa 2 segundos.**

### MINUTO 101:00 - Dinámica: Imaginad

**Tú:**

> "Imaginad: vosotros sois PM de una app con 100K usuarios. Descubrís que durante 3 meses, los datos de 20K usuarios estuvieron en los logs públicos. Emails, teléfonos, todo.
>
> Tenéis 72 horas para notificar a la autoridad.
>
> ¿Qué hacéis?"

**Pausa. Espera comentarios en chat (30 segundos).**

*Conecta con la respuesta: "Exacto. Abogados. Crisis. Documentación. Notificación. Multa. Prensa. Imagen. Eso es lo que pasa."*

### MINUTO 102:30 - DEMO de Familia 3

**ACCIÓN:**
- Alt+Tab a VSCode
- Abre el informe `security-report.md`
- Scroll a la sección Familia 3

**Tú:**

> "Volvemos al informe. El agente de datos sensibles auditó en paralelo mientras revisábamos base de datos. Lo que encontró:"

**Muestra la sección Familia 3 del informe.**

**Tú:**

> "'Email real en test-data.json.' Un email de una persona real commiteado en el repositorio. CRÍTICO.
>
> 'IP real en test-data.json.' Una IP también es dato personal bajo el RGPD. CRÍTICO.
>
> 'Logging de datos sensibles en api/feedback.js, línea 27.' Cada vez que alguien hace feedback, el objeto completo del usuario se imprime en los logs de producción. ALTO.
>
> Fijaos en el primero y el segundo: son exactamente la trampa de 'datos reales para pruebas'. Alguien usó datos reales en un archivo de test y los commiteo. Están en el historial de Git. Permanentemente."

**Pausa 2 segundos.**

### MINUTO 104:00 - Cómo se previene

**Tú:**

> "Cómo se previene:
>
> UNO: Nunca commitees datos reales. Usa fixtures fake. Emails tipo test@example.com. IPs de ejemplo (203.0.113.1).
>
> DOS: Nunca loguéis el objeto completo de un usuario. Solo el campo que necesitáis en ese momento. El campo, no el objeto.
>
> TRES: Si necesitas copiar datos a una herramienta, anonimiza primero. Quita emails, IPs, nombres.
>
> Eso es todo."

### MINUTO 105:00 - Los tres vectores donde los datos se escapan

**Tú (en cámara, didáctico):**

> "Quiero que tengáis claro dónde se fugan realmente los datos personales. Porque el instinto es pensar 'nos hackean y roban la base de datos'. Eso pasa. Pero hay tres vectores mucho más cotidianos.
>
> VECTOR UNO: datos en sitios donde nadie los busca.
>
> El agente IA, cuando depura un problema, tiende a añadir logs que imprimen el objeto completo del usuario: email, ID de sesión, tokens, todo.
>
> Si esos logs se guardan en un archivo, o se envían a Sentry o a cualquier servicio de monitoreo, estáis registrando sistemáticamente datos personales de cada usuario en cada operación.
>
> Técnicamente eso ya es incumplimiento del RGPD, aunque nunca haya una brecha externa. Los logs son datos personales también.
>
> El pipeline detecta exactamente este patrón: cualquier console.log que imprime objetos de usuario en código de producción."

**Pausa 2 segundos.**

> "VECTOR DOS: datos reales en entornos que no son producción.
>
> Esto es el vector más subestimado. Un estudio de Tonic.ai con 1.000 desarrolladores encontró que el 29% de las empresas usan datos de producción sin proteger en entornos de pruebas.
>
> Y el 45% de esas empresas reportó haber sufrido una brecha importante en los últimos cinco años por esta razón.
>
> ¿Cómo ocurre con el agente IA? El PM dice: 'Prueba esto con datos reales para ver si funciona.' El agente coge un snapshot de producción y lo usa en desarrollo. Los datos acaban en archivos del laptop, en el contexto del LLM, en capturas de pantalla enviadas en Slack. Y cuando el problema se resuelve, nadie vuelve a limpiarlos.
>
> Los datos quedan. Y el entorno de desarrollo tiene muchas menos protecciones que producción."

**Pausa 2 segundos.**

> "VECTOR TRES: datos enviados a LLMs externos. Shadow AI.
>
> Ya os conté el caso Samsung. Pero los números específicos son importantes: IBM reporta en su informe de 2025 que el 20% de todas las brechas de datos de ese año estuvieron relacionadas con shadow AI.
>
> Y las brechas donde hay shadow AI cuestan de media 670.000 dólares más que las brechas estándar.
>
> ¿Por qué 670.000 más? Porque cuando los datos viajan a un LLM externo, el radio de exposición es mucho mayor, la detección tarda más, y la contención es más complicada.
>
> Para vosotros: cada vez que pegáis un fragmento de datos de usuarios en Claude web, en ChatGPT, en cualquier LLM externo, estáis haciendo una transferencia de datos personales a un tercero. Vuestros usuarios no consintieron eso."

**Pausa 2 segundos.**

### MINUTO 111:00 - Lo que es PII realmente: la confusión más común

**Tú:**

> "Uno de los malentendidos más frecuentes que veo en PMs: 'yo no tengo datos sensibles porque solo guardo emails.'
>
> Un email solo, sin nombre ni apellidos, es un dato personal bajo el RGPD. Una IP también. Un user_id también. Una cookie de sesión también.
>
> El criterio del RGPD no es 'identifica directamente'. Es 'permite identificar directa o indirectamente'. Y un email identifica directamente. Sin nombres. Sin apellidos.
>
> Las implicaciones:
>
> Cualquier tabla con campos como email, user_id, ip_address, session_id contiene datos personales. Punto.
>
> Y las categorías especiales: datos de salud, datos biométricos, orientación sexual, datos de menores. Si vuestro producto puede ser usado por menores de 16 años, hay una capa extra de obligaciones.
>
> El marco mental que os propongo: si este archivo se publicara mañana en Reddit, ¿habría algún usuario que pudiera ser identificado? Si la respuesta es sí, es dato personal. Y las obligaciones aplican."

**Pausa 2 segundos.**

### MINUTO 114:00 - El RGPD en la práctica: qué tenéis que tener desde el día uno

**Tú:**

> "El RGPD no distingue entre startup de cuatro personas y multinacional. Las obligaciones son las mismas desde el primer email que recogéis.
>
> Lo que cualquier producto que recoge datos personales necesita tener:
>
> PRIMERO: base jurídica para el tratamiento. No podéis recoger datos 'porque sí'. Necesitáis una razón legal: consentimiento explícito, ejecución de contrato, interés legítimo. Para la mayoría de productos, el consentimiento o el interés legítimo son las vías. Esto implica que cualquier formulario que capture datos necesita un texto claro explicando qué se recoge y para qué.
>
> SEGUNDO: minimización. Solo podéis recoger los datos estrictamente necesarios. Si vuestro formulario de registro pide fecha de nacimiento y no la usáis para nada, ese campo extra es una obligación adicional y una superficie de exposición innecesaria.
>
> TERCERO: política de privacidad accesible. No tiene que ser perfecta. Tiene que existir y ser legible.
>
> CUARTO: mecanismo para atender derechos. Los usuarios pueden pedir acceso a sus datos, pedir que los borréis, pedir portabilidad. Tenéis que poder responder en un mes. No tiene que ser un sistema sofisticado; puede ser un email. Pero tiene que existir."

**Pausa 2 segundos.**

### MINUTO 118:00 - Las 72 horas: el reloj que no conocéis

**Tú (serio, marcado):**

> "Y ahora el número que más importa.
>
> 72 horas.
>
> Si descubrís una brecha de datos personales, tenéis 72 horas para notificar a la Agencia Española de Protección de Datos. No para investigar. No para arreglar. Para notificar.
>
> El reloj empieza cuando tenéis constancia razonable de que probablemente ha habido una brecha. No cuando ocurrió. No cuando la confirmáis. Cuando tenéis indicios suficientes para creer que probablemente sí.
>
> En la práctica: si un sábado a las 11 de la noche encontráis que vuestra base de datos estuvo expuesta, el plazo de 72 horas empieza ese sábado a las 11. No el lunes cuando vuestra abogada llega a la oficina.
>
> ¿Qué se notifica? Un formulario en la web de la AEPD. Describe qué pasó, qué datos se vieron afectados, cuántos usuarios, qué medidas habéis tomado.
>
> No necesitáis tener toda la información. Podéis notificar con información parcial y completar después. Lo que no podéis hacer es esperar a tenerlo todo antes de notificar.
>
> La multa máxima del RGPD es 20 millones de euros o el 4% de la facturación anual global, lo que sea mayor. Para una startup, eso puede significar el cierre."

**Pausa 3 segundos. Silencio real.**

### MINUTO 121:00 - El razonamiento peligroso: "solo estoy probando"

**Tú:**

> "Hay un razonamiento que escucho mucho y que quiero desactivar explícitamente.
>
> 'Estoy en fase de prototipo. Solo estoy validando si la idea funciona. No tengo usuarios reales todavía. No es para tanto si la seguridad no es perfecta.'
>
> Ese razonamiento es peligroso por tres razones.
>
> Primera: el RGPD no distingue entre prototipo y producción. En el momento en que un solo usuario real pone su email real en vuestro formulario real, ya estáis tratando datos personales. No hay modo beta regulatorio.
>
> Segunda: los atajos que se toman en fase de prototipo tienden a quedarse. El agente optimiza por 'que funcione ahora'. El PM está enfocado en validar la idea, no en revisar la arquitectura de seguridad. El resultado predecible es que el producto escala a producción con la arquitectura del prototipo.
>
> Tercera: cada vez que el agente IA tiene acceso a datos para depurar, esos datos viajan al proveedor del LLM. Vuestra solución de Claude Code que usa el MCP de Supabase tiene acceso potencial a vuestros datos de usuario en tiempo real. Cada consulta de debug crea una copia en el contexto del LLM.
>
> No os estoy diciendo que no construyáis rápido. Os estoy diciendo que usad datos sintéticos en desarrollo. user@example.com, no el email real de vuestra madre que usasteis para probar."

**Pausa 2 segundos.**

### MINUTO 109:00 - Cómo se arregla: las tres reglas operativas

**Tú:**

> "Las tres reglas que quiero que os llevéis.
>
> REGLA UNO: datos sintéticos en desarrollo siempre. user@example.com, no emails reales. IPs inventadas que no correspondan a personas reales. Si el agente os pide 'dame datos reales para reproducir el bug', la respuesta es: primero anonimizamos y luego probamos.
>
> REGLA DOS: nunca loguéis el objeto completo del usuario. Solo el campo que necesitáis. Si necesitáis depurar con más detalle en desarrollo, bien — pero antes de hacer commit, eliminad esos logs. El pipeline los detecta.
>
> REGLA TRES: lo que le dais al agente IA, se lo dais al proveedor del agente. Si usáis Claude Code con MCPs conectados a vuestra base de datos, los datos que el agente lee están en el contexto que procesa Anthropic. Revisad las políticas de retención. Configurad los agentes para operar sobre datos pseudonimizados en desarrollo."

**Pausa 2 segundos.**

### MINUTO 130:00 - Momento interactivo: ¿qué datos recoge vuestro producto?

**Tú:**

> "Pregunta para el chat, un minuto: pensad en vuestro proyecto principal ahora mismo. ¿Qué tipos de datos personales recogéis? Escribidlos.
>
> No me digáis si están bien protegidos. Solo qué datos son."

**Espera 45-60 segundos. Lee 3-4 respuestas en voz alta.**

*[Normaliza cada respuesta y añade el contexto RGPD: "Emails: sí, datos personales. Si tenéis más de X usuarios, pensad en la base jurídica. IDs de sesión: también personales. Historial de uso: también."]*

**Tú:**

> "Bien. Todo lo que habéis mencionado son datos personales. Todos tienen las mismas obligaciones. La diferencia no está en el tipo de dato; está en el volumen y el riesgo para los usuarios.
>
> Más datos, más obligaciones, más multa potencial si algo falla."

### MINUTO 133:00 - El coste real de una brecha de datos

**Tú:**

> "Para cerrar esta familia con un número que me parece importante.
>
> El tiempo medio desde que ocurre una brecha de datos hasta que se detecta y contiene es de 241 días. Ocho meses. Durante ocho meses, los datos están en manos de quien sea, usándose para lo que sea.
>
> Y el coste medio de una brecha en 2025 fue de 4,44 millones de dólares globalmente. Para una startup, la distribución es distinta: puede ser cero si nadie se entera, o puede ser el cierre si la AEPD multa y la prensa lo recoge.
>
> La buena noticia: es prevenible. Datos sintéticos, logs controlados, política de privacidad básica. No necesitáis un equipo de privacidad. Necesitáis hábitos."

**Pausa 2 segundos.**

### MINUTO 136:00 - Lo que el PM tiene que llevarse de Familia 3

**Tú (consolidando):**

> "Lo que os lleváis de esta familia.
>
> UNO: un email sin nombre es dato personal. Cualquier campo que permita identificar a alguien, directa o indirectamente, está protegido.
>
> DOS: el RGPD aplica desde el primer usuario real. No hay modo beta, no hay excepción para MVPs.
>
> TRES: los datos reales fuera de producción son la brecha invisible. Usad datos sintéticos en desarrollo, siempre.
>
> CUATRO: lo que le dais al agente IA externo, se lo dais al proveedor. Revisad qué datos fluyen por vuestro flujo de desarrollo con LLMs.
>
> CINCO: 72 horas desde que tenéis constancia de una brecha. No para investigar. Para notificar. Tened el formulario de la AEPD guardado antes de necesitarlo."

### MINUTO 138:30 - Preguntas sobre Familia 3

**Tú:**

> "Preguntas sobre datos y RGPD antes de pasar a la última familia. Escribid en el chat."

**Espera 60-90 segundos. Lee y responde 1-2 preguntas.**

*Respuestas habituales preparadas:*
- *"¿Y si estamos fuera de Europa?"* → "Si vuestros usuarios son europeos, el RGPD aplica. No depende de dónde estéis vosotros. Depende de dónde están vuestros usuarios."
- *"¿Necesitamos un abogado?"* → "Para un MVP temprano, no necesitáis un abogado de privacidad full-time. Necesitáis: política de privacidad básica, base jurídica declarada, y saber a quién llamar si algo pasa. Eso sí, cuando tengáis inversión o empecéis a escalar, esto se convierte en una conversación con un abogado."
- *"¿ChatGPT retiene mis datos?"* → "Depende del plan y la configuración. Por defecto, sí pueden usarse para mejorar el modelo. Con plan de pago y configuración explícita, no. Revisad las políticas. Y como regla general: nunca peguéis dumps de producción en ningún LLM externo."

---

## QUIZ FAMILIA 3 — DATOS SENSIBLES (min 140-146)

**ACCIÓN:**
- Alt+Tab al navegador (portal)
- Navega a sección "Quiz" → pestaña "03 · Datos sensibles"

**Tú:**

> "Familia 3 tiene la parte más legal. Cuatro preguntas para fijar los conceptos clave."

---

#### Pregunta F03/1: Email = dato personal (min 140:00)

**Tú:**

> "Un email sin nombre ni apellidos, ¿es dato personal bajo el RGPD?
>
> A — No, sin nombre no identifica. B — Sí. C — Solo combinado con otros datos. D — Depende del país."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "B. Un email solo ya es dato personal. Una IP también. Un user_id también.
>
> El criterio del RGPD no es 'identifica directamente', sino 'permite identificar directa o indirectamente'. Un email permite identificar directamente. Punto.
>
> Esto aplica desde el primer usuario real. No hace falta tener mil usuarios para que el RGPD aplique."

---

#### Pregunta F03/2: Logs que imprimen el objeto completo (min 141:30)

**Tú:**

> "El agente deja logs en producción que imprimen el objeto completo del usuario. ¿Es un problema?
>
> A — No si son logs internos. B — Solo si hay una brecha. C — Sí, registra PII de cada usuario. D — Solo con datos bancarios."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "C. Los logs que registran sistemáticamente datos personales son ya un incumplimiento del RGPD, aunque nunca haya una brecha.
>
> El agente añade console.log(user) para depurar, nadie lo revisa antes del deploy, y en producción empieza a guardar email, tokens de sesión, todo, en los logs. A veces esos logs se envían a Sentry o a un archivo. Y si ese archivo se filtra, hay incidente."

---

#### Pregunta F03/3: IA externa y datos de usuarios (min 143:00)

**Tú:**

> "Vuestra app usa un modelo de IA externo para generar resúmenes de conversaciones de soporte. Esas conversaciones contienen nombres y emails de clientes. ¿Qué problema legal puede tener esto?
>
> A — Ninguno: los datos ya están en vuestro sistema, no salís del entorno. B — Estáis transfiriendo datos personales a un tercero sin que el usuario haya consentido. C — Solo hay problema si el proveedor de IA tiene servidores fuera de Europa. D — Depende del tamaño de la empresa."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "B. Y esta es la trampa más frecuente con IA en productos: los usuarios consintieron que sus datos estuvieran en vuestro sistema. No consintieron que viajaran a OpenAI, a Anthropic, o a cualquier proveedor externo que uséis internamente.
>
> Esto no significa que no podáis usar IA externa. Significa que necesitáis declararlo en vuestra política de privacidad, elegir proveedores con los acuerdos de tratamiento de datos adecuados, y en algunos casos obtener consentimiento explícito.
>
> Como PM, la pregunta que debéis haceros cada vez que integráis un servicio externo: '¿hacia dónde viajan los datos de mis usuarios, y saben ellos que van ahí?'"

---

#### Pregunta F03/4: El plazo del RGPD (min 144:30)

**Tú:**

> "Detectáis hoy que datos de usuarios han estado expuestos sin las protecciones adecuadas. ¿Cuánto tiempo tenéis para notificar a la autoridad de protección de datos?
>
> A — 30 días desde que ocurrió. B — 72 horas desde que lo detectáis. C — Solo si hay más de 100 afectados. D — Sin obligación si no hubo un ataque externo activo."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "B. 72 horas desde que tenéis constancia. No desde que ocurrió, sino desde que lo sabéis.
>
> D es la trampa más común: la exposición de datos sin protecciones adecuadas ya es una brecha notificable, aunque nadie haya atacado activamente. No necesitáis un atacante para tener obligación de notificar. Tener datos accesibles sin control suficiente ya es la brecha.
>
> Y C también es trampa: el RGPD no tiene umbral de número de afectados para la obligación de notificar. Un usuario afectado ya puede obligar a notificar.
>
> Guardad ese número: 72 horas."

---

### MINUTO 146:00 - Transición a Familia 4

**Tú:**

> "Familia 3: la más regulatoria. La que más duele en el wallet no esta semana sino en seis meses.
>
> Última familia. Esta es la más silenciosa de las cuatro. Y la más frecuente."

---

## BLOQUE 4: FAMILIA 4 - CONFIGURACIÓN (MIN 146-178)

### ANTES DE ENTRAR — Un concepto en lenguaje humano

> *[Referencia para el instructor. Está en el portal, tarjeta Familia 4 expandida. Léelo o muéstralo antes de empezar.]*

**CORS (Cross-Origin Resource Sharing):**
El portero que decide qué webs externas pueden hablar con tu servidor. `origin: *` es decirle al portero "deja pasar a todo el mundo sin preguntar". Cómodo para desarrollar porque CORS deja de dar errores, peligroso en producción: cualquier web del mundo puede hacer peticiones a tu API, incluyendo webs maliciosas que actúen en nombre de tus usuarios logueados.

---

### MINUTO 146:00 - PRIMERO: Explicar el concepto (cámara, SIN portal)

**Tú (cara a cara):**

> "FAMILIA 4: Configuración. La más silenciosa de todas.
>
> No hay factura de 82K. No hay multa de RGPD.
>
> Hay un endpoint /api/admin que NO tiene verificación de quién eres. Expuesto 3 MESES. Cualquiera que sepa que existe, puede usarlo.
>
> CBIZ, empresa financiera grande. 36.000 registros de usuarios filtrados. Nombres, direcciones, números de seguridad social.
>
> Se descubrió porque un periodista lo reportó en redes, no por alertas internas."

**Pausa 2 segundos.**

### MINUTO 147:30 - Tres patrones

**Tú:**

> "Familia 4 audita TRES cosas:
>
> UNO: CORS mal configurado. CORS controla qué webs pueden hablar con vuestra API. Si lo configuráis para aceptar cualquier origen, cualquier sitio web del mundo puede hacer peticiones a vuestra API en nombre de vuestros usuarios. Lo explico con más detalle en un momento.
>
> DOS: Endpoints sin autenticación. /admin, /debug. Si el endpoint existe y está expuesto, se puede llamar. Sin verificación de usuario. Cualquiera que lo encuentre lo hace.
>
> TRES: Defaults inseguros. Si una variable de entorno no está definida y el código tiene un valor por defecto permisivo, en producción ese valor permisivo se activa. El agente no lo detecta porque 'funciona'. Hasta que alguien lo aprovecha."

**Pausa 2 segundos.**

### MINUTO 149:30 - SEGUNDO: Abrir portal y tarjeta

**ACCIÓN:**
- Alt+Tab al navegador (portal)
- Navega a Familia 4
- Abre la tarjeta/sección

**Tú (mientras haces esto):**

> "Voy a mostrar este en el portal. Familia 4."

### MINUTO 150:00 - TERCERO: Narra el caso (desde portal)

**Tú:**

> "CBIZ es una empresa financiera. En 2024, tenían un endpoint de API que... no había autenticación.
>
> Alguien construyó un endpoint, lo desplegó, y se olvidó de verificar permisos.
>
> Estuvo expuesto 3 MESES. Tres meses. 36.000 registros de usuarios filtrados.
>
> ¿Cómo se descubrió? No fue por logging. No fue por alertas automáticas. Un periodista lo encontró en redes y lo reportó.
>
> El mensaje en redes: 'Se atacaron a sí mismos.' Cuando la realidad es: no fue un ataque. Nada fue hackeado. Simplemente estaba ahí. Abierto."

**Pausa 2 segundos.**

### MINUTO 151:30 - Dinámica: Reconocimiento

**Tú:**

> "Pregunta: ¿cuántos de vosotros han visto CORS con '*' en código que habéis heredado o visto en proyectos?"

**Pausa. Espera respuestas.**

*Normaliza: "Es lo más común. Un developer pone '*' porque 'funciona' y después se olvida. Porque 'funciona' pero es un agujero."*

### MINUTO 152:30 - DEMO de Familia 4

**ACCIÓN:**
- Alt+Tab a VSCode
- Abre el informe `security-report.md`
- Scroll a la sección Familia 4

**Tú:**

> "Última familia en el informe. El agente de configuración auditó en paralelo con los otros tres. Lo que encontró:"

**Muestra la sección Familia 4 del informe.**

**Tú:**

> "'CORS configurado con origen wildcard.' Cualquier sitio web puede hacer peticiones a esta API.
>
> 'Headers de seguridad ausentes.' El servidor no está instruyendo al navegador cómo proteger al usuario.
>
> Eso es lo que necesitamos ver. Ambos son invisibles mientras todo funciona. Ninguno genera un error. Los dos son agujeros.
>
> La solución en los dos casos es un cambio de minutos una vez que sabéis que el problema existe: lista de dominios permitidos en CORS, y una biblioteca de seguridad HTTP que añade todas las cabeceras protectoras en una línea. El bloqueador no es la complejidad técnica — es no saber que está mal."

### MINUTO 154:00 - Profundidad en CORS: lo que significa realmente

**Tú:**

> "Quiero que entendáis CORS porque es el error más frecuente que el agente comete y el que más se normaliza.
>
> CORS son las siglas de Cross-Origin Resource Sharing. Es el mecanismo que controla qué páginas web pueden hacer peticiones a vuestra API.
>
> Cuando configuráis 'Access-Control-Allow-Origin: *', estáis diciendo: cualquier sitio web del mundo puede hacer peticiones a mi API. Sin restricciones.
>
> En desarrollo eso es cómodo porque eliminando CORS se evitan errores molestos. El agente lo pone por eso. El problema desaparece, el agente ha 'resuelto' el problema, vosotros lo aprobáis. Y eso viaja a producción.
>
> En producción, significa que alguien puede crear una web maliciosa, vuestros usuarios la visitan mientras tienen sesión abierta en vuestro producto, y esa web puede hacer peticiones en su nombre. Leer datos, modificar datos, ejecutar acciones.
>
> Eso se llama Cross-Site Request Forgery, CSRF. Y es silencioso. No hay alerta. El servidor ve una petición válida con credenciales válidas.
>
> La corrección es simple: en lugar de '*', ponéis la lista exacta de dominios que pueden hacer peticiones. Vuestro dominio de producción, vuestro localhost para desarrollo. Punto."

**Pausa 2 segundos.**

### MINUTO 157:00 - Las cabeceras de seguridad HTTP: la defensa invisible

**Tú:**

> "Hay otro vector que pocos PMs conocen pero que el pipeline detecta: cabeceras HTTP de seguridad faltantes.
>
> Cuando vuestro servidor devuelve una respuesta, puede incluir cabeceras que instruyen al navegador sobre cómo proteger al usuario. Cuando no están, el navegador queda expuesto.
>
> Tres que deberíais conocer:
>
> HSTS, HTTP Strict Transport Security: dice al navegador 'siempre conéctate a este dominio via HTTPS, nunca HTTP'. Sin esta cabecera, alguien en la misma red WiFi puede interceptar el tráfico.
>
> CSP, Content Security Policy: dice al navegador qué scripts pueden ejecutarse en vuestra página. Sin CSP, si alguien inyecta código JavaScript malicioso (XSS), el navegador lo ejecuta sin restricciones.
>
> X-Frame-Options: dice al navegador si vuestra página puede ser embebida en un iframe. Sin esta cabecera, alguien puede cargar vuestra aplicación en un iframe invisible para capturar clics del usuario.
>
> En Express, la librería 'helmet' añade todas estas cabeceras con una línea: app.use(helmet()). El agente rara vez lo añade porque no está en el flujo principal de desarrollo. El pipeline lo detecta."

**Pausa 2 segundos.**

### MINUTO 160:00 - Los endpoints que nadie sabe que tiene

**Tú:**

> "Otro patrón frecuente: endpoints que el framework expone por defecto y que nadie ha cerrado.
>
> Muchos frameworks incluyen endpoints de monitoreo, estado de salud o documentación activos por defecto. Algunos de esos endpoints devuelven las variables de entorno del servidor. Donde probablemente hay credenciales.
>
> Si tenéis documentación de API autogenerada visible: un atacante que ve vuestra documentación completa tiene el mapa de vuestro sistema: qué rutas existen, qué parámetros aceptan, qué devuelven.
>
> El PM no ha tomado ninguna decisión activa para crear estos endpoints. Vienen en la caja. Nadie los ha cerrado porque nadie sabe que están ahí.
>
> ¿Cómo los encuentran los atacantes? Con listas estándar de rutas comunes: /admin, /api-docs, /swagger, /debug, /health. Cualquier herramienta de reconocimiento las prueba automáticamente en cuestión de segundos."

**Pausa 2 segundos.**

### MINUTO 162:00 - El problema organizacional: nadie es dueño de la configuración

**Tú:**

> "Quiero mencionar algo que va más allá de lo técnico.
>
> En organizaciones tradicionales, la configuración es responsabilidad de DevOps o SRE. En startups pequeñas construyendo con Claude Code, no hay DevOps. No hay SRE. Hay un PM construyendo con un agente, y la configuración ocurre como efecto secundario del desarrollo.
>
> Nadie tiene asignada la responsabilidad de revisarla. Nadie la documenta. Nadie la audita periódicamente.
>
> La configuración es el área donde el agente IA opera con más autonomía y menos supervisión. El código funcional el PM lo revisa, lo prueba, lo aprueba. La configuración no tiene ese ciclo de revisión porque no produce errores observables cuando está mal. Todo funciona. Hasta que no funciona.
>
> Y cuando se descubren brechas por misconfiguración, la narrativa que genera prensa es siempre la más dura: 'no los atacaron; se atacaron a sí mismos.' Microsoft con BlueBleed en 2022 expuso datos de 65.000 entidades por un Azure Blob Storage mal configurado. No un ataque sofisticado. Una opción marcada de forma permisiva.
>
> Si Microsoft puede tener este problema, cualquiera puede tenerlo.
>
> La solución para vosotros no es contratar un DevOps. Es tener una checklist de configuración que revisáis antes de cada despliegue. El pipeline lo automatiza."

**Pausa 2 segundos.**

### MINUTO 165:00 - El efecto del agente IA en la configuración: mimetismo

**Tú:**

> "Un patrón específico del agente que conviene que conozcáis.
>
> El agente IA aprende del código existente. Si vuestro código tiene CORS con '*', el agente asume que 'así se hace en este proyecto' y lo replica en las nuevas rutas. Si hay 'DEBUG: true', lo mantiene. Si una variable de entorno no está definida y el código tiene un fallback permisivo, el agente hereda ese fallback.
>
> La mala configuración se propaga por mimetismo. Una mala decisión inicial se convierte en el patrón que el agente replica en todo lo que construye después.
>
> Por eso la configuración base del proyecto importa más que cualquier decisión individual. Si empezáis bien, el agente replica cosas bien. Si empezáis con atajos, el agente los industrializa.
>
> El momento más importante para revisar la configuración es al principio, no cuando ya tenéis 50 endpoints."

**Pausa 2 segundos.**

### MINUTO 167:00 - Lo que el PM tiene que llevarse de Familia 4

**Tú (consolidando, en cámara):**

> "Las ideas clave de Familia 4.
>
> UNO: la configuración es código invisible. Cada variable de entorno, cada flag, cada permiso es una decisión. Si nadie la toma conscientemente, gana el valor por defecto. Y los defaults casi siempre priorizan facilidad sobre seguridad.
>
> DOS: el 99% de los fallos de seguridad en la nube son del cliente, no del proveedor. AWS, Supabase, Cloudflare hacen bien su parte. Lo que configuráis encima, es vuestro.
>
> TRES: la configuración de desarrollo no es la de producción. Nunca. Las variables de entorno de producción tienen que fallar ruidosamente si falta alguna crítica. 'Si no está definido, usa este valor permisivo por defecto' es casi siempre un error.
>
> CUATRO: el agente no revisa la configuración por iniciativa propia. Hay que pedírselo explícitamente. El pipeline lo hace automáticamente en cada ejecución."

**Pausa 2 segundos.**

---

## QUIZ FAMILIA 4 — CONFIGURACIÓN (min 169-175)

**ACCIÓN:**
- Alt+Tab al navegador (portal)
- Navega a sección "Quiz" → pestaña "04 · Configuración"

**Tú:**

> "Última familia. Cuatro preguntas para cerrar."

---

#### Pregunta F04/1: Modo debug en producción (min 169:00)

**Tú:**

> "El agente deja el modo debug activo en producción. ¿Qué puede pasar?
>
> A — La app va más lenta. B — Los errores exponen información interna. C — Solo afecta a desarrollo. D — Nada hasta que haya un error."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "B. Con debug activo, los mensajes de error devuelven el stack trace completo: qué framework usas, qué versión, la estructura interna del código.
>
> Para un atacante es un mapa. Sabe exactamente qué explotar.
>
> El agente activa debug durante el desarrollo para ver qué pasa. Es útil. El problema es que viaja a producción porque nadie lo revisa."

---

#### Pregunta F04/2: Responsabilidad en AWS (min 170:30)

**Tú:**

> "Algo falla por mala configuración en AWS. ¿Quién es responsable?
>
> A — AWS. B — Tú, el cliente. C — 50% cada uno. D — Depende del contrato."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "B. Gartner: el 99% de los fallos de seguridad en la nube son del cliente, no del proveedor.
>
> AWS asegura su infraestructura. Lo que configuras encima es tu responsabilidad. CORS, endpoints, permisos IAM, todo lo que tocáis vosotros, es vuestro.
>
> Este dato es importante para las conversaciones con dirección: 'AWS es seguro' y 'nuestra configuración en AWS es segura' son dos frases completamente diferentes."

---

#### Pregunta F04/3: El endpoint de debug en producción (min 172:00)

**Tú:**

> "El agente crea un endpoint /api/debug durante el desarrollo que muestra logs internos del servidor. El proyecto se despliega sin eliminarlo. ¿Qué riesgo tiene?
>
> A — Ninguno: solo los desarrolladores conocen esa URL. B — Cualquiera que la encuentre puede ver información interna de la aplicación. C — Es un riesgo solo si la app tiene muchos usuarios. D — Se desactiva automáticamente en modo producción."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "B. Y A es exactamente el razonamiento que no funciona en seguridad: 'nadie sabe que existe'. Eso se llama seguridad por oscuridad, y no es seguridad.
>
> Los endpoints de debug son fáciles de encontrar: los atacantes tienen listas de rutas comunes (/debug, /api-docs, /swagger, /health, /actuator) y las prueban sistemáticamente. Si el endpoint existe y está sin protección, lo van a encontrar.
>
> Y D es otra trampa habitual: el modo producción no elimina ni desactiva endpoints. Solo los pone en un servidor con más tráfico. Si nadie los quitó explícitamente, están ahí."

---

#### Pregunta F04/4: CORS con origin * (min 173:30)

**Tú:**

> "Última pregunta. El agente añade origin: * para resolver un error de CORS. ¿Qué significa eso?
>
> A — CORS ya no dará problemas. B — Cualquier web puede hacer peticiones a tu API. C — Solo orígenes conocidos tienen acceso. D — Hay que reiniciar el servidor."

**Espera 20 segundos. Pulsa Revelar.**

**Tú:**

> "B. Origin * significa 'acepto peticiones de cualquier dominio del mundo'.
>
> Es cómodo en desarrollo porque CORS deja de dar errores. El agente lo pone por eso, porque 'el problema desaparece'. Nadie lo cambia antes del deploy.
>
> En producción, significa que cualquier sitio web puede hacer peticiones autenticadas a vuestra API. Si el usuario está logueado en vuestro producto y visita una web maliciosa, esa web puede hacer peticiones en su nombre.
>
> Se llama CSRF. Y es silencioso."

---

### MINUTO 175:00 - Síntesis de las 4 familias

**Tú (en cámara):**

> "Las 4 Familias:
>
> 1: Credenciales → Factura en 48 horas. Visible, dolorosa, inmediata.
> 2: Base de datos → Datos expuestos silenciosamente. Sin alerta. Sin aviso. Hasta que alguien los vende.
> 3: Datos sensibles → El regulador. 72 horas, 20 millones máximos, desde el primer usuario real.
> 4: Configuración → Acceso desapercibido durante meses. Sin CVE, sin factura, hasta que un periodista lo reporta.
>
> Todas detectables en menos de un segundo con el pipeline.
>
> Todas prevenibles."

---

## BLOQUE 5: CIERRE + ENTREGA (MIN 178-195)

### MINUTO 178:00 - Resumen

**ACCIÓN en portal:**
- Si hay sección "Cierre", navega ahí
- Si no, mantén el portal visible pero mira a cámara

**Tú (tono de conclusión, mirando a cámara):**

> "Tres horas. Cuatro familias. Un mensaje: la velocidad sin defensas es un accidente esperando suceder.
>
> Vosotros vais a construir rápido. Con agentes. Con IA. Eso está bien. Eso es el futuro.
>
> Pero sin defensa automática, vais a meter uno de estos cuatro fallos. Y van a costar dinero, datos, o credibilidad.
>
> Por eso construimos esto: un pipeline que ejecutáis ANTES de desplegar. Automatizado. Sin checks manuales que fallan cuando tenéis prisa."

### MINUTO 178:30 - Si ya pasó: los primeros 30 minutos

**Tú (tono práctico, cambio de ritmo, en cámara):**

> "Todo lo de hoy es prevención. Pero a veces llegamos tarde.
>
> Si descubrís ahora mismo que hay una clave expuesta o datos filtrados, aquí están los pasos. Cinco.
>
> UNO: Rotad la clave INMEDIATAMENTE. No investiguéis antes. Rota primero, investiga después. Cada minuto que la clave está activa, el atacante actúa.
>
> DOS: Evaluad el alcance. ¿Qué pudo acceder alguien? ¿Durante cuánto tiempo? No asumáis lo mejor.
>
> TRES: Si hay datos personales: llamad a vuestro abogado o DPO antes de las 72 horas. El reloj empieza cuando tenéis constancia, no cuando ocurrió el incidente.
>
> CUATRO: Documentad todo desde el minuto 1. Capturas de pantalla, logs, timestamps. Para el regulador, para el seguro, para el post-mortem.
>
> CINCO: No borréis los logs del incidente. Nunca. Eso es destrucción de evidencia.
>
> Cinco palabras para tenerlas guardadas en algún sitio: rota, evalúa, llama, documenta, no borres."

**Pausa 2 segundos.**

### MINUTO 180:00 - Los entregables

> "Os lleváis DOS cosas.
>
> UNO: Una guía de seguridad. README.md te dice cómo usar el pipeline. CLAUDE.md te explica cómo funciona si lo quieres extender.
>
> DOS: El pipeline compilado y listo. Un comando:
>
> node audit-security --repo .
>
> Lo ejecutas en tu proyecto. En menos de un segundo te dice: SAFE_TO_DEPLOY o DO_NOT_DEPLOY.
>
> Úsadlo. Antes de cada despliegue. La primera vez que vean '10 CRÍTICOS en mi código' van a entender por qué lo necesitaban."

### MINUTO 182:00 - Cierre emocional

**Tú (genuino, mirando a cámara):**

> "Hace 8 años yo commiteé el .env a un repositorio. Tardé 8 horas en darme cuenta. Tardé 3 días en arreglarlo todo.
>
> Si hubiera tenido esto entonces, habrían sido 10 segundos.
>
> Vosotros tenéis la oportunidad de aprender SIN cometer el error. Úsadlo.
>
> El repositorio está aquí [pasa link a GitHub]. Todo abierto. Preguntar si hay dudas.
>
> ¿Preguntas?"

### MINUTO 183:00 - Q&A abierto

**ACCIÓN:**
- Espera preguntas en el chat o por voz
- Responde máximo 10 minutos (hasta min 195)
- Si no hay preguntas, cerra así:

**Tú:**

> "Vale, perfecto. Os dejo el repository, el pipeline, la guía.
>
> Úsadlo el lunes. Y si algo no funciona, me lo decís.
>
> Gracias por estar aquí. Ha sido un placer. Buena suerte."

---

## REFERENCIAS RÁPIDAS

### Cifras clave (si alguien pregunta)

- **82K$**: Startup mexicana, 48 horas, clave Gemini
- **4 minutos**: Tiempo desde commit hasta bot encuentra clave
- **29 millones**: Secretos expuestos en GitHub 2025
- **70%**: Secretos de 2022 todavía activos
- **170+ apps**: Afectadas por CVE-2025-48757
- **13K usuarios**: Datos expuestos sin RLS
- **72 horas**: Plazo notificación brecha (RGPD)
- **20 millones**: Multa máxima RGPD
- **3 meses**: CBIZ con endpoint sin auth expuesto

### Frases clave (memorizar)

1. "En 4 minutos hay un bot esperando."
2. "No es paranoia. Pasó 79.000 veces el año pasado."
3. "No es un ataque sofisticado. Es que no pusieron una cerradura."
4. "La velocidad sin defensas es un accidente esperando suceder."
5. "Si dice 'DO_NOT_DEPLOY', hay riesgo AHORA MISMO."

---

## QUÉ HACER SI...

### Si el pipeline no ejecuta

**Tú (calmado):**
> "Perfecto, así veis un error real. Tengo un informe pregenerado aquí mismo."

**ACCIÓN:** Abre `security-report.md` que existe en feedbackhub.

### Si alguien pregunta off-topic

> "Buena, la anotamos para después. Mantengamos el hilo ahora."

### Si se va el micrófono

> En chat: "Un segundo, audio. Vuelvo en 10 segundos."

### Si alguien se desconecta

Ignóralo. Sigue adelante. Zoom grabará todo.

### Si falta tiempo

Salta la parte de "soluciones detalladas". Mantén casos, demos y cierre.

---

## CHECKLIST FINAL

**Antes de MINUTO 0:**
- [ ] VSCode abierto + compilado
- [ ] Portal en navegador listo (abierto en sección Hero)
- [ ] Terminal VSCode con font 30+
- [ ] Micrófono headset working
- [ ] Agua al lado
- [ ] Guion impreso o en tablet
- [ ] Chat Zoom visible
- [ ] Pantalla 1: Guion (para ti)
- [ ] Pantalla 2: Portal (para compartir)

**Durante la sesión:**
- [ ] 0-12 min: Apertura en cámara (sin portal)
- [ ] 12-33 min: Familia 1 (antes de entrar + concepto + caso en portal + demo)
- [ ] 27-33 min: Quiz Familia 1 (4 preguntas)
- [ ] 33-80 min: Familia 2 (antes de entrar + concepto + caso en portal + demo)
- [ ] 74-80 min: Quiz Familia 2 (4 preguntas)
- [ ] 88-93 min: Respira (literal, levantarse)
- [ ] 93-140 min: Familia 3 (antes de entrar + concepto + caso en portal + demo)
- [ ] 140-146 min: Quiz Familia 3 (4 preguntas)
- [ ] 146-175 min: Familia 4 (antes de entrar + concepto + caso en portal + demo)
- [ ] 169-175 min: Quiz Familia 4 (4 preguntas)
- [ ] 178-195 min: Cierre + Q&A

---

**Duración total: 195 minutos (3 horas exactas)**
**Intensidad: ALTA (3 horas seguidas)**
**Interactividad: MEDIA-ALTA (quiz después de cada familia + dináminas cada ~10 min)**
**Ritmo: ÁGIL (antes de entrar → concepto → caso → demo → quiz)**
**Pedagogía: CLARA (explicado para PMs poco tech)**

**¡LISTO PARA TU PRIMERA FORMACIÓN! 🚀**
