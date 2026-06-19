# Informe de Seguridad — FeedbackHub

> Auditado el 19 de junio de 2026 por 4 agentes IA especializados (HeroCamp Security Pipeline)

---

## ¿Puedo desplegar este proyecto?

### ❌ NO DESPLEGAR HASTA RESOLVER LOS CRÍTICOS

**Resumen**: FeedbackHub tiene las llaves de tu base de datos y de tus servicios en el código fuente. Cualquier persona que vea el repositorio puede acceder a todos los datos de tus usuarios ahora mismo.

| Nivel | Cantidad | Qué significa |
|-------|----------|---------------|
| 🔴 Crítico | 5 | Explotable ahora mismo. Para un atacante es un trabajo de minutos. |
| 🟠 Alto | 7 | Riesgo real que debe resolverse antes de lanzar. |
| 🟡 Medio | 3 | Mejora recomendada, no bloquea el lanzamiento. |

---

## Lo más urgente (resuelve esto esta semana)

### 1. Tus credenciales están en el repositorio — rotarlas YA
El archivo `.env` con contraseñas reales está siendo guardado en Git. Cualquier persona con acceso al repositorio (actual o histórico) tiene las claves de tu base de datos, de Supabase y de Gemini.

**Impacto de negocio**: Un atacante puede vaciar tu base de datos, suplantar tu identidad ante Supabase, y generar facturas en tu cuenta de Google Cloud. Esto es una brecha de seguridad activa, no un riesgo futuro.

**Esfuerzo**: 2-4 horas. **Responsable**: Dev + acceso a los paneles de Supabase y Google Cloud.

### 2. La base de datos está completamente abierta
La protección de filas de Supabase (RLS) está desactivada con un comentario "pendiente". Combinado con que la clave de acceso está en el frontend, cualquier usuario puede leer los emails, nombres e IPs de todos los usuarios.

**Impacto de negocio**: Exposición total de datos de usuarios. Posible sanción por incumplimiento del RGPD. Pérdida de confianza de clientes.

**Esfuerzo**: 1-2 horas. **Responsable**: Dev con acceso a Supabase.

### 3. El panel de administración no tiene contraseña
Los endpoints de admin están sin proteger con un comentario "TODO". Cualquiera que conozca la URL puede listar todos los feedbacks o borrarlos.

**Impacto de negocio**: Pérdida o manipulación de todos los datos del producto. Sin trazabilidad de quién lo hizo.

**Esfuerzo**: 3-5 horas. **Responsable**: Dev.

### 4. Hay datos reales de personas en los archivos de prueba
El archivo `test-data.json` contiene el email real, nombre completo e IP pública de una persona identificable, además de una contraseña escrita por un usuario como mensaje.

**Impacto de negocio**: Violación del RGPD con datos personales reales en el código. Riesgo de sanción regulatoria.

**Esfuerzo**: 30 minutos. **Responsable**: Dev + revisar historial de Git.

---

## Hallazgos por área

### 🔑 Credenciales y Secretos

**Archivo `.env` con contraseñas trackeado por Git**
- 📍 Dónde: `.env` (falta en `.gitignore`)
- 💥 Qué puede pasar: Todas las credenciales del proyecto (base de datos, Supabase, Gemini) son visibles para cualquier persona con acceso al repositorio. Si el repo es público, están expuestas en internet.
- 🛠️ Qué hacer: Añadir `.env` al `.gitignore` ahora mismo. Ejecutar `git rm --cached .env`. Rotar TODAS las credenciales en Supabase y Google Cloud. Tiempo estimado: 2 horas.

**Clave `service_role` de Supabase en código de frontend**
- 📍 Dónde: `admin.js` línea 10
- 💥 Qué puede pasar: Esta clave es equivalente a tener acceso root a tu base de datos. Con ella, alguien puede leer, modificar o borrar los datos de todos tus usuarios, saltándose cualquier control de seguridad.
- 🛠️ Qué hacer: Eliminar del frontend inmediatamente. Rotar la clave en el dashboard de Supabase. Moverla a un backend seguro (nunca en código que llegue al navegador). Tiempo estimado: 1-2 horas.

**API key de Gemini y credenciales de Supabase duplicadas en código fuente**
- 📍 Dónde: `config.js` líneas 2-4, `app.js` línea 10, `admin-script.js` línea 6
- 💥 Qué puede pasar: Un atacante puede hacer llamadas a Gemini con tu cuenta (generando costes) y acceder a tu proyecto de Supabase. Las credenciales están en 3 archivos distintos, lo que complica la rotación.
- 🛠️ Qué hacer: Centralizar en variables de entorno. Rotar las claves comprometidas. Tiempo estimado: 1 hora.

---

### 🗄️ Base de Datos y Permisos

**Row Level Security (RLS) desactivado en Supabase**
- 📍 Dónde: `supabase/schema.sql` línea 12 (comentado como "pendiente")
- 💥 Qué puede pasar: Cualquier usuario con la clave anónima de Supabase (que está en el frontend) puede hacer `SELECT * FROM feedback` y ver los datos de todos los usuarios: emails, nombres e IPs.
- 🛠️ Qué hacer: Descomentar `ALTER TABLE feedback ENABLE ROW LEVEL SECURITY` y crear políticas que restrinjan el acceso. Tiempo estimado: 1-2 horas.

**El sistema de login no valida realmente los tokens**
- 📍 Dónde: `api/feedback.js` líneas 13-18
- 💥 Qué puede pasar: El middleware de autenticación acepta cualquier texto después de "Bearer " como válido y asigna siempre el mismo usuario ficticio. Alguien puede escribir `Bearer hola` y quedar "autenticado".
- 🛠️ Qué hacer: Reemplazar por validación real del token usando el SDK de Supabase Auth. Tiempo estimado: 2-3 horas.

**XSS: el panel de admin puede ejecutar código malicioso**
- 📍 Dónde: `admin.js` líneas 41-47
- 💥 Qué puede pasar: Si un usuario envía feedback con código HTML malicioso (ej. `<script>robar_sesión()</script>`), ese código se ejecutará en el navegador del administrador cuando lo visualice. Esto puede robar la sesión del admin o modificar la página.
- 🛠️ Qué hacer: Escapar el contenido HTML antes de insertarlo en el DOM. Tiempo estimado: 1 hora.

---

### 👤 Datos de Usuarios y Privacidad

**Datos reales de una persona en los archivos de prueba**
- 📍 Dónde: `test-data.json` líneas 4-14
- 💥 Qué puede pasar: El archivo contiene el email real `maria.garcia.lopez@gmail.com`, nombre completo, IP pública y una contraseña escrita como mensaje. Si el repo se comparte o es público, se viola el RGPD con datos de una persona real identificable.
- 🛠️ Qué hacer: Reemplazar por datos ficticios (`usuario@ejemplo.com`, `192.0.2.1`). Revisar historial de Git. Tiempo estimado: 30 minutos.

**Los logs de producción guardan emails y nombres de usuarios**
- 📍 Dónde: `api/feedback.js` línea 26
- 💥 Qué puede pasar: `console.log(feedbackData)` imprime el email, nombre e IP del usuario en los logs. En producción, estos logs acaban en herramientas de monitorización (Datadog, CloudWatch) accesibles por el equipo, incumpliendo el principio de minimización de datos del RGPD.
- 🛠️ Qué hacer: Cambiar por `console.log('Nuevo feedback recibido, id:', result.id)`. Tiempo estimado: 15 minutos.

**Se recoge la IP del usuario sin informarle**
- 📍 Dónde: `app.js` líneas 30-37
- 💥 Qué puede pasar: La aplicación llama a `api.ipify.org` para obtener la IP del usuario y la guarda en la base de datos. La IP es un dato personal bajo el RGPD. No hay política de privacidad ni aviso de consentimiento en la web.
- 🛠️ Qué hacer: Evaluar si la IP es realmente necesaria. Si se mantiene, añadir aviso de privacidad visible antes del envío del formulario. Tiempo estimado: 2-4 horas.

---

### ⚙️ Configuración y Entornos

**Panel de administración accesible desde cualquier URL sin contraseña**
- 📍 Dónde: `admin.html`, `api/admin.js` endpoints GET y DELETE
- 💥 Qué puede pasar: Cualquier persona que escriba `/admin.html` accede al panel de gestión. Puede ver todos los feedbacks con datos de usuarios y borrar cualquier registro. No hay ningún control de acceso.
- 🛠️ Qué hacer: Añadir autenticación obligatoria al panel antes de cualquier despliegue. Verificar que el usuario tenga rol de administrador. Tiempo estimado: 3-5 horas.

**CORS abierto: cualquier web puede hacer peticiones a tu API**
- 📍 Dónde: `api/feedback.js` línea 8
- 💥 Qué puede pasar: `origin: '*'` permite que cualquier sitio web en internet haga peticiones a tu API. Un sitio malicioso podría enviar feedback falso de forma masiva o explotar otras vulnerabilidades de forma remota.
- 🛠️ Qué hacer: Cambiar `'*'` por la lista de dominios permitidos: `['https://tu-dominio.com']`. Tiempo estimado: 15 minutos.

**Sin headers de seguridad HTTP (no tiene Helmet)**
- 📍 Dónde: `api/feedback.js`, `api/admin.js`
- 💥 Qué puede pasar: La ausencia de headers como `Content-Security-Policy` o `X-Frame-Options` expone la aplicación a ataques de clickjacking (incrustar tu app en un iframe malicioso) y ejecución de scripts externos.
- 🛠️ Qué hacer: Añadir `app.use(helmet())` en el servidor Express. `npm install helmet`. Tiempo estimado: 30 minutos.

**Sin límite de peticiones en el formulario de feedback**
- 📍 Dónde: `api/feedback.js` endpoint POST
- 💥 Qué puede pasar: Un bot puede enviar miles de feedbacks en segundos, llenando la base de datos de spam y agotando la cuota de llamadas a Gemini (generando costes).
- 🛠️ Qué hacer: Añadir `express-rate-limit` limitando a 10 peticiones por IP cada 15 minutos. Tiempo estimado: 1 hora.

---

## Plan de acción sugerido

### Esta semana — bloquea el despliegue si no se resuelve

1. **Rotar todas las credenciales** en Supabase y Google Cloud (Gemini). Tiempo: 2 horas.
2. **Sacar `.env` de Git** (`git rm --cached .env`, añadir a `.gitignore`). Tiempo: 30 minutos.
3. **Eliminar la `service_role` key del frontend** (`admin.js`). Tiempo: 30 minutos.
4. **Activar RLS en Supabase** y crear políticas básicas. Tiempo: 1-2 horas.
5. **Proteger el panel de admin** con autenticación real. Tiempo: 3-5 horas.
6. **Reemplazar datos de prueba** con datos ficticios en `test-data.json`. Tiempo: 30 minutos.

### Antes del siguiente sprint

- Implementar validación real de tokens en `api/feedback.js`
- Añadir `helmet()` a los servidores Express
- Restringir CORS a dominios específicos
- Añadir aviso de privacidad en el formulario (RGPD)
- Escapar HTML en el panel de administración

### A medio plazo

- Añadir rate limiting en todos los endpoints públicos
- Auditar logs para eliminar PII
- Documentar política de privacidad accesible desde la web
- Configurar alertas de seguridad en Supabase

---

> Informe generado por HeroCamp Security Pipeline · 4 agentes IA especializados
> Para resolver dudas sobre cualquier hallazgo, consulta con tu equipo de desarrollo.
