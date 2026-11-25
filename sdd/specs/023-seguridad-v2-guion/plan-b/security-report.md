# Informe de seguridad · feedback-hub-demo

*25/11/2026 · Las cuatro familias*

## ❌ NO PUBLICAR

| Familia | Crítico | Alto | Medio |
|---|---|---|---|
| 1 · Claves y secretos | 1 | 0 | 0 |
| 2 · Datos y permisos | 1 | 0 | 0 |
| 3 · Datos personales | 0 | 2 | 1 |
| 4 · Configuración | 1 | 0 | 1 |

- **Crítico:** otra persona puede aprovecharlo con lo que hay en el código. Arréglalo antes de publicar.
- **Alto:** riesgo real que necesita alguna condición más. Revísalo antes de publicar.
- **Medio:** mejora recomendada.

## 1 · Claves y secretos

### 🔴 Crítico · Clave de OpenAI escrita en el código y enviada al navegador

- **Dónde:** `src/lib/resumen-ia.ts:1 (usada en src/lib/resumen-ia.ts:8 e importada desde src/routes/admin.tsx:3)`
- **Por qué importa:** La clave de OpenAI está escrita en el fichero y se usa en una cabecera de autorización. La página de administración importa ese fichero, así que la clave puede llegar al navegador. Quien la obtenga puede usar OpenAI a cuenta del proyecto y generar gasto. El valor parece de prueba: compruébalo.
- **Qué hacer:** 1. Mira en OpenAI si esa clave existe y está activa. Si lo está, créala de nuevo y borra la antigua. 2. Quita la clave del código. 3. Guarda la clave nueva en Secrets (el almacén de claves de Lovable) o en las variables del servidor. 4. Haz la llamada a OpenAI solo desde el servidor (la parte que no llega al navegador) y haz que la página de administración pida el resumen a ese servidor.

## 2 · Datos y permisos

**Este informe no ve las reglas de tu base de datos,** solo el código. En Lovable, compruébalas en **More → Security → Findings**.

### 🔴 Crítico · Cualquiera puede leer los nombres, emails y mensajes de feedback

- **Dónde:** `supabase/migrations/20261125000000_demo_seguridad.sql:3`
- **Por qué importa:** Según este fichero, la regla de lectura de la tabla feedback usa USING (true) y se da a anon (personas sin iniciar sesión) y a authenticated (cualquier cuenta). Cualquier persona puede leer todos los nombres, emails y mensajes que han dejado los demás visitantes. El código de la web solo inserta y no lee, así que esta lectura abierta no hace falta.
- **Qué hacer:** Pídele a Lovable en el chat: «Elimina la regla 'Leer opiniones' de la tabla feedback. Deja que cualquiera pueda crear filas, pero que solo pueda leerlas un administrador autenticado». Después, comprobar el resultado en More → Security → Findings.

## 3 · Datos personales

### 🟠 Alto · El formulario escribe nombre, email y mensaje en la consola del navegador

- **Dónde:** `src/routes/index.tsx:44`
- **Por qué importa:** Al enviar una opinión, el código escribe el nombre, el email y el mensaje de la persona en la consola del navegador. La consola es una ventana donde la web escribe mensajes técnicos. Cualquiera que use ese navegador, o una herramienta que recoja esos mensajes, puede ver los datos personales.
- **Qué hacer:** Pídele a Lovable en el chat: «Quita el console.log de src/routes/index.tsx que escribe name, email y message. No escribas datos del formulario en la consola en ningún sitio.»

### 🟠 Alto · Los mensajes de los usuarios se envían a OpenAI sin avisar

- **Dónde:** `src/lib/resumen-ia.ts:12`
- **Por qué importa:** El botón «Resumir opiniones» envía a OpenAI el texto que escribieron los usuarios. Ese texto puede incluir datos personales, porque es texto libre. La pantalla de administración no avisa de este envío, y los usuarios tampoco lo saben al rellenar el formulario.
- **Qué hacer:** Pídele a Lovable: «Añade un aviso en el formulario y en la pantalla de administración que diga que los mensajes se envían a OpenAI para generar resúmenes.» Decide si de verdad necesitas esta función. Si la mantienes, pide que no se envíen nombres ni emails dentro del texto.

### 🟡 Medio · El formulario pide nombre y email y no enlaza a ninguna política de privacidad

- **Dónde:** `src/routes/index.tsx:86`
- **Por qué importa:** El formulario recoge nombre, email y mensaje. No hay ningún enlace ni texto sobre cómo se tratan esos datos, y el proyecto no tiene ninguna página de privacidad. El RGPD, la ley europea de protección de datos, obliga a informar a las personas sobre qué datos se recogen y para qué.
- **Qué hacer:** Pídele a Lovable: «Crea una página /privacidad que explique qué datos pedimos, para qué los usamos y quién puede verlos. Añade un enlace a ella debajo del botón de enviar.» Antes, confirma para qué se usa el email. Si no hace falta, pide que se quite del formulario.

## 4 · Configuración

### 🔴 Crítico · La página de administración está abierta a cualquier visitante

- **Dónde:** `src/routes/admin.tsx:5`
- **Por qué importa:** Cualquier persona que escriba /admin en la web puede abrirla, sin iniciar sesión. Puede ver nombres y correos de quienes dieron su opinión, pulsar el botón de borrar y lanzar el resumen con IA, que gasta saldo de la cuenta. Que ahora los datos sean de ejemplo no cambia el riesgo, porque la página puede pasar a usar datos reales.
- **Qué hacer:** Pide a Lovable en el chat: 'Protege la ruta /admin. Que solo puedan entrar personas con sesión iniciada y con rol de administrador, y que si no, se les lleve al inicio de sesión. Haz esa comprobación también en el servidor para borrar opiniones y para generar el resumen con IA.'

### 🟡 Medio · El proyecto no define cabeceras de seguridad

- **Dónde:** `src/server.ts:47`
- **Por qué importa:** No hay ninguna instrucción que la web envíe al navegador para protegerse de ataques. Entre ellos están que otra web la muestre dentro de la suya para engañar a la gente, o que se ejecuten scripts no permitidos. Esto aumenta el daño si aparece otro fallo.
- **Qué hacer:** Pide a Lovable en el chat: 'Añade cabeceras de seguridad a todas las respuestas: Content-Security-Policy, X-Frame-Options, Strict-Transport-Security, X-Content-Type-Options y Referrer-Policy.'

## Qué no revisa este informe

- La base de datos real: solo el código.
- Las versiones anteriores del código (el historial de git).
- La web publicada.
- Los hallazgos los encuentra una IA a partir del código: puede equivocarse o no ver un fallo. No sustituye a una auditoría profesional.
