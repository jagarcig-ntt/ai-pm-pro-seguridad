# Plan B · Si los alumnos llegan con Lovable Cloud

*SPEC-010 · 10-nov · **Activado el 13-nov:** todo apunta a que el backend se queda en Lovable Cloud.*

## Contexto
- **Jose (Slack, 10-nov):** en su fase de prototipado, cada alumno trabaja con Lovable Cloud, sin Supabase propio y sin migrar por ahora.
- **Gema (10-nov):** en la sesión del 21-nov se usa Supabase.
- **Pregunta abierta a Gema:** ¿llegan al 21 ya conectados a Supabase, o se hace al empezar la sesión?
- **Lo validado** (SPEC-018 y SPEC-019) es con Supabase propio. Con Lovable Cloud no hay nada probado.
- **Pasar de Lovable Cloud a Supabase no es automático:** hay que exportar y restaurar los datos, y rehacer el login, los ficheros y los secretos (https://lovable.dev/faq/backend/supabase/export-cloud-to-supabase, consultado el 5-nov).

## La prueba: proyecto nuevo, unos 30–40 minutos de Jaime
No se hace en Notas al Día: va en sentido contrario al de los alumnos y es la referencia probada de la sesión.

**Parte 1 · Lovable Cloud publicado en Cloudflare**
1. 🧑 Proyecto nuevo en Lovable **con Lovable Cloud** (*Database*, no *Connectors*). Nombre sin tildes.
2. 🧑 Pedir una tabla y login con email, como en la sesión de Jose.
3. 🧑 Conectar a GitHub, hacer el repo público y guardar los secretos de Cloudflare.
4. 🧑 Práctica 1 tal cual: los 3 prompts del portal.
5. **Agente:** comprobar si el `.env` del repo trae `SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY`, si la web publicada responde (paso 9 del workflow) y si guarda datos.
6. 🧑 Probar el login desde la URL de producción y ver dónde se añade esa URL sin panel de Supabase.

**Parte 2 · Pasar a Supabase**
7. 🧑 Conectar Supabase a ese proyecto (*Connectors*) y anotar qué pide Lovable, qué pasa con los datos y con los usuarios, y cuánto se tarda.
8. **Agente:** volver a comprobar la publicación y el login.

## Qué cambiaría según el resultado

| Pieza | Si llegan con Lovable Cloud |
|---|---|
| `desplegar.yml` | Nada, si el `.env` trae los dos valores. Si no, darlos al Worker de otra forma (pendiente de la prueba) |
| Paso 4 de P1 (login) | Donde se añada la URL en Lovable Cloud |
| Guía de requisitos | Sin cuenta de Supabase y sin paso 2 |
| Guion y portal | Frases de F2 y de P1 que citan Supabase. Estructura y tiempos sin cambios |
| Constitution 3.1 y SPEC-010 | Stack: backend de Lovable en lugar de Supabase propio |
| Lección de los datos | Igual: los cambios se aplican al pulsar *Allow* |

**Si se pasa a Supabase al empezar la sesión:** hay que reservarle tiempo en la escaleta, que hoy no lo tiene. Saldría del rescate o de la teoría, y es una decisión de Jaime.

## Plazo
La prueba, como tarde antes del ensayo completo de la semana del 16-nov.

## Resultado de la prueba, parte 1 · 13-nov
Proyecto `jagarcig-ntt/prueba-cloud`, con Lovable Cloud, login por email y notas por usuario. Comprobado por el agente:
- **`.env` del repo:** las mismas 6 variables que con Supabase propio (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` y `SUPABASE_PROJECT_ID`, con y sin `VITE_`), con clave `sb_publishable_`. La URL apunta a `*.lovable.cloud`, un proxy de Lovable sobre Supabase. Ninguna clave secreta en el código.
- **`desplegar.yml` y `comprobar-pr.yml`:** llegaron idénticos. **El workflow funciona sin cambios:** pasos 0 a 9 en verde, incluida la comprobación de la web.
- **Producción:** `https://jagarcig-ntt-prueba-cloud.jaimegarcia1991.workers.dev/` → 200, con la app.
- **Datos:** migraciones en `drizzle/migrations/` (no en `supabase/migrations/`). RLS activado con políticas por usuario. Sin sesión, leer `notes` devuelve 200 con lista vacía: no se ve nada.
- **Login:** registro por email activo y con confirmación obligatoria, como en Supabase propio.
- **⚠️ La plantilla de PR llegó sin formato:** Lovable quitó los `##`, las casillas `- [ ]` y los comentarios. Queda texto plano. Probablemente el chat de Lovable interpreta el Markdown al pegarlo. Con Supabase propio no pasó, porque llegó solo con líneas en blanco de más.

## Resultado de la prueba, login · 13-nov
- **Sin configurar nada:** el enlace del correo de confirmación llevaba a la vista previa de Lovable (`id-preview--…lovable.app`).
- **Añadir `…/**` y el comodín de previews** en *More → Users → Settings → Advanced → Allowed URLs* **no bastó**. La app registra con `emailRedirectTo: window.location.origin`, es decir, la dirección exacta sin barra final.
- **Funcionó** al añadir también la dirección exacta (Jaime, con captura): el enlace ya lleva a la web de Cloudflare.
- **Conclusión:** el paso 4 de P1 añade tres direcciones (la exacta, `/**` y el comodín de previews) y, si existe el campo, la *Site URL*.

## Material adaptado · 13-nov
Guía de requisitos (sin cuenta de Supabase ni paso 2; pasos renumerados), guía de la práctica (paso 4: *Allowed URLs* en Lovable), kit, portal (recuento, esquema de F2, paso del login, cierre), guion, cheat sheet, teoría F2, constitution v1.7 y SPEC-010. PDF regenerados: 0 menciones a Supabase. **Pendiente:** la plantilla de PR, que Lovable pega sin formato.
