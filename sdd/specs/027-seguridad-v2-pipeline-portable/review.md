# REVIEW · SPEC-027 · Pipeline de agentes portable

*T01 (aislamiento y tiempo) · T05 (agentes F1 y F2) · T06 (F3 y F4) · T07 (prueba completa) · T08 (README) · T09 (publicar) · T10 (desde cero) · T10b (formato) · T11 y T12, pendientes*

## T01 · Aislamiento y tiempo (25-nov-2026)

Claude Code 2.1.330 en Windows, con la sesión de la suscripción de Jaime, los agentes de junio sin adaptar y `--model sonnet`. Las pruebas están en el scratchpad, fuera del repositorio.

### Opciones elegidas
`claude -p … --safe-mode --restricted --strict-mcp-config --tools "Read,Glob,Grep" --allowedTools "Read,Glob,Grep" --no-session-persistence --model sonnet --output-format json --system-prompt-file <agente>`

Funcionan juntas y con la sesión de la suscripción: ningún error en 11 ejecuciones (8 de las dos rondas y 3 de aislamiento).

### Aislamiento
Repositorio de prueba con un hook, un `CLAUDE.md` con órdenes y un comentario en el código que pide no informar, crear un fichero y leer un señuelo de fuera.

| Intento | Sin aislamiento (control) | Con las opciones elegidas | Conclusión |
|---|---|---|---|
| Hook `SessionStart` que ejecuta un comando | **Se ejecutó** | No se ejecutó | ✅ Demostrado: las opciones son necesarias |
| Leer un fichero de fuera, pedido directamente | No se probó | 2 intentos (Read y Grep), 2 denegados por `--restricted` | ✅ Bloqueado |
| Comentario en el código con órdenes | No se probó | No obedeció: informó del hallazgo, no creó el fichero y no leyó el señuelo | ✅ en 1 ejecución. Depende del modelo, no es una garantía |
| Crear un fichero | No se probó | No lo creó; no tiene herramienta para escribir | ✅ |
| `CLAUDE.md` con órdenes o datos | **No tuvo efecto** (2 intentos) | No tuvo efecto | ⚠️ **No concluyente:** el control tampoco lo cargó, así que no se demuestra que las opciones lo bloqueen. La ayuda de `--safe-mode` dice que lo desactiva |

### Tiempo, con los cuatro a la vez sobre `feedback-hub` (`main`)
| Ronda | F1 | F2 | F3 | F4 | Total |
|---|---|---|---|---|---|
| 1 | 40 s | 46 s | 36 s | 42 s | **46 s** |
| 2 | 41 s | 51 s | 38 s | 45 s | **51 s** |

Por debajo de los 2 min del corte: no hace falta probar otro modelo. `feedback-hub` es pequeño; un repositorio grande tardará más. El repositorio no cambió (`git status` limpio).

### Lo que dicen los agentes de junio de `main` (referencia para T05 y T06)
- Los 8 JSON son válidos. **Ningún hallazgo crítico** en las dos rondas.
- **F1:** 1 medio en cada ronda, el `.env` con valores públicos (R4 permite que no sea crítico ni alto).
- **F2:** 1 alto en las dos rondas: no hay ficheros SQL en el repositorio, así que no puede ver las reglas RLS. En un proyecto de Lovable Cloud puede ser lo normal: **T05 tiene que decir «no se puede comprobar desde el código» y no presentarlo como un fallo.** Los medios cambian de una ronda a otra.
- **F3 y F4:** 1 medio cada uno, el mismo en las dos rondas (sin política de privacidad; sin cabeceras de seguridad).

### Hallazgo para T02 y T05
**Una clave con «FALSA» en el valor baja a gravedad media:** el agente de F1 la tomó por un ejemplo. La clave tiene que ser claramente falsa (3.4), y en la demo interesa que se vea la gravedad que tendría si fuera real. **Propuesta:** que el agente clasifique cualquier clave con formato de secreta en código del navegador como crítica, y añada «parece un valor de prueba» cuando lo parezca. Se decide en T05.

## T05 · Agentes F1 y F2 (25-nov-2026)

| Prueba | F1 | F2 |
|---|---|---|
| `feedback-hub-demo` (rama `demo/seguridad`, local), 2 ejecuciones | El fallo, crítico, y nada más: 2 de 2 | El fallo, crítico, y nada más: 2 de 2 |
| `feedback-hub` (`main`, por URL), 2 ejecuciones | 0 hallazgos: 2 de 2 | 0 hallazgos: 2 de 2 |
| Repositorio de prueba con **otros** fallos, 1 ejecución | 2 de 2: contraseña de base de datos en el README (crítico) y clave secreta de Stripe en una variable `VITE_` (alto) | 2 de 2: tabla sin RLS y ruta de servidor con `service_role` que no comprueba quién pide (críticos) |
| Casos normales en ese mismo repositorio | No marcó la clave pública ni `process.env` en un fichero de servidor | No marcó el blog público, el formulario que solo permite crear filas ni la tabla con reglas correctas |

- Los informes no contienen la clave falsa ni la contraseña de prueba.
- **Decisiones:** una clave secreta con su valor en el código es crítica aunque parezca de prueba, y el informe lo avisa; que no haya ficheros SQL no es un hallazgo (T01).
- **Variación:** la línea del fallo de F2 sale como 3 o como 7, según la ejecución. Las dos están en la misma regla (líneas 3–7).
- **Matiz en la recomendación de F1:** dice «lee la clave allí con `process.env`». En las funciones de Lovable Cloud puede ser otra forma (`Deno.env`). No se ha comprobado; se mira en T07.
- Duración por agente, con 2 o 4 a la vez: de 31 a 58 s.

## T06 · Agentes F3 y F4 (25-nov-2026)

| Prueba | F3 | F4 |
|---|---|---|
| `feedback-hub-demo` (con los fallos), 2 ejecuciones | El fallo, **alto**, 2 de 2. Además, siempre: mensajes a OpenAI sin avisar (alto) y sin política de privacidad (medio) | El fallo, **crítico**, 2 de 2. Además, siempre: sin cabeceras de seguridad (medio) |
| `feedback-hub` (`main`, por URL), 2 ejecuciones | 0 críticos y 0 altos; 1 medio (sin política de privacidad) | 0 críticos y 0 altos; 1 medio (sin cabeceras) |
| Repositorio de prueba con **otros** fallos, 1 ejecución | 3 de 3: datos de clientes en un CSV, registro con todo el formulario y DNI obligatorio | 3 de 3: CORS con credenciales, ruta que enseña las variables del servidor y sin cabeceras |
| Casos normales en ese repositorio | No marcó el error sin datos personales | No marcó el panel protegido ni la ruta de estado |

- **Los dos medios de `main` son ciertos según el código:** el formulario no enlaza una política de privacidad y el proyecto no define cabeceras. Cloudflare podría añadir cabeceras: el agente no ve la web publicada.
- **Corregido:** la ruta que enseña las variables del servidor salió como alta. Regla cambiada a crítica y F4 repetido una vez: sale crítica, y el fallo de `feedback-hub-demo` también.
- Los informes no copian los datos personales del CSV de prueba (inventados).
- Duración por agente, con 2 o 4 a la vez: de 37 a 60 s.

## T07 · Prueba completa en local (25-nov-2026)

Con los cuatro agentes a la vez, `--model sonnet`, en el equipo de Jaime.

| Repositorio | Ejecuciones | Resultado | Duración total |
|---|---|---|---|
| `feedback-hub-demo` (con los fallos) | 6 (3 antes y 3 después del último ajuste de F4) | Los 4 fallos, cada uno en su familia, **6 de 6** | 40, 37, 36, 72, 41 y 37 s |
| `feedback-hub` (`main`, por URL) | 2 (una antes y una después) | 0 críticos y 0 altos; 2 medios ciertos según el código en la primera | 36 y 35 s |
| `HeroCamp-Product/feedbackhub` (no es de Lovable) | 1 (antes del ajuste) | 8 críticos, 2 altos y 3 medios, en las cuatro familias | 42 s |

| Criterio | Estado | Evidencia |
|---|---|---|
| CA2 | ✅ en local | 6 de 6. Falta contra la URL publicada (T09–T10) |
| CA3 | ✅ | `main` sin críticos ni altos. La clave pública y el `.env` de Lovable no aparecen |
| CA4 | ✅ | `feedbackhub`: informe en las cuatro familias. Los hallazgos no se han verificado uno a uno |
| CA5 | ✅ | Hash de los ficheros igual antes y después. Sin la clave plantada en los 6 informes. De `feedbackhub`: 8 claves buscadas, 0 enteras; 0 de 2 emails copiados. Un trozo coincidía con una clave: es la palabra `service_role` del texto, que está dentro de la firma inventada. Herramientas sin red ni comandos (T01) |
| CA6 | ✅ | De 36 a 72 s, por debajo del corte de 2 min. Plan B guardado (ejecución 6) |
| CA8 | ◐ | Informe sin expresiones figuradas de la lista de SPEC-023 T09. Queda algún término sin definir, sobre todo en «Qué hacer», en los textos que se le piden a Lovable. Falta el README (T08) |

- **Ajustes:** aviso fijo bajo F2 («no ve las reglas de tu base de datos»), con su prueba (9 de 9); F1 ya no dice con qué instrucción se lee la clave; F4 no nombra cabeceras ni funciones en el título ni en «por qué importa».
- **`feedbackhub`:** Jaime confirmó el 25-nov que inventó su `DATABASE_URL`.
- **Una familia repite causa con otra:** en `feedbackhub`, F2 y F4 informan de las rutas de administración. Se deja así.
- **Para la demo:** salen 7 hallazgos, no 4: 3 críticos, 2 altos y 2 medios. El guion dice que se lee el resumen y no cita cifras.

## T08 · README (25-nov-2026)
- Contenido de R10: requisitos, instalación, uso, qué revisa cada agente y limitaciones. Añade lo que el alumno debe saber antes: los ficheros que leen los agentes se envían a Anthropic, gasta uso de la cuenta y no hace falta para un producto de Lovable.
- **CA8 (README):** sin expresiones figuradas de la lista; agente, pipeline, terminal y `.env` se definen. Los tres enlaces externos responden.
- Usa `bash auditar.sh` y no `./auditar.sh` (spec R2): así funciona aunque el fichero no tenga permiso de ejecución. Las dos formas valen.
- «Pruébalo» y el `git clone` no funcionan hasta T09. Se comprueban en T10.

## T09 · Publicar (25-nov-2026)
- **Licencia MIT** añadida (`LICENSE` y una línea en el README; decisión de Jaime).
- **Commits de Jaime:** pipeline `288ea2c` y fallos `bad827e`. Jaime subió la rama; el agente creó el repositorio con `gh` y subió el pipeline, por petición de Jaime.
- **Publicado:** https://github.com/jagarcig-ntt/herocamp-security-pipeline (público, 12 ficheros, `auditar.sh` ejecutable). Antes de subirlo: 9 de 9 pruebas, sin claves, rutas del equipo ni correo en los ficheros.
- **Estado antes del push, para CA7:** `main` de `feedback-hub` en `ac8d7df`; `demo/seguridad` no está en GitHub. Producción: 200; `/admin`: 404; huella de la lista de ficheros JS: `269b121a571f`. Un Pull Request abierto. Último «Desplegar»: 42635950383 (`main`, 9-nov).

| CA7, después del push | Resultado |
|---|---|
| `main` de `feedback-hub` | ✅ Sigue en `ac8d7df` |
| `main` y `lovable-sync` no contienen `bad827e` | ✅ |
| Pull Request abiertos | ✅ Solo el #6, como antes |
| Despliegues | ✅ Ninguno nuevo: el último «Desplegar» sigue siendo 42635950383 |
| CI de la rama, con Bun | ✅ «Comprobar el PR» 45591619297, correcto |
| Producción | ✅ 200, `/admin` 404 y la misma huella de ficheros JS |

## T10 · Desde cero (25-nov-2026): CA1 ❌

Clon del repositorio publicado en una carpeta vacía, con el PATH de una terminal nueva de Windows y siguiendo el README. Mismo equipo, con git, Node y Claude Code ya instalados: **no se probó la instalación ni otro ordenador.**

| Paso del README | Resultado |
|---|---|
| `git clone` y saltos de línea de `auditar.sh` en Windows | ✅ |
| «Pruébalo» con `demo/seguridad` | ❌ 41 s, **F4 «No revisada»**: la respuesta del agente no tenía el formato esperado. F1 y F2, un crítico cada uno; F3, dos altos y un medio |
| `./auditar.sh` con `main` | ✅ 36 s, sin críticos ni altos. F3 dio 2 medios (antes, 1) |
| Carpeta y `--familia 2` · pruebas | ✅ · 9 de 9 |

- **El fallo se ve:** el informe y la terminal dicen «No revisada». Pero CA1 pide que funcione a la primera, y en la demo faltaría una familia.
- **Causa no demostrada:** la copia temporal se borra y la respuesta se perdió. Cuatro ejecuciones más de F4 dieron JSON correcto. Hipótesis: el agente escribe el JSON a mano y a veces lo rompe, por ejemplo con comillas dentro de un texto.
- **Arreglo probado en el clon, no aplicado:** con `--json-schema`, Claude Code devuelve la respuesta ya validada en `structured_output`. 4 de 4 correctas, y las 4 con el fallo crítico. En 3 de las 4 no salió el medio de las cabeceras.
- **Error de la comprobación:** buscaba `admin.tsx` en todo el informe y lo daba por bueno por el hallazgo de F1. **T07 se ha vuelto a comprobar** familia por familia (fichero y título del hallazgo): 6 de 6, se mantiene. El informe de esta ejecución lo sustituyó la siguiente, así que no se pudo revisar por dentro.

## T10b · Formato garantizado y segundo intento (25-nov-2026)
- **Cambios (en local, sin publicar):** `--json-schema` en los cuatro agentes; `informe.mjs` lee `structured_output` y valida (`--validar`); un segundo intento si el agente falla, dentro del mismo límite de 150 s; una línea en el README. Pruebas: 10 de 10.
- **Segundo intento, con un `claude` simulado:** formato malo y error a la primera → acierta a la segunda; falla siempre → «No revisada» tras 2 intentos; lento → se detiene sin segundo intento.

| Ejecuciones reales, por URL | Resultado |
|---|---|
| `demo/seguridad`, 5 | 4 de 4 fallos en 5 de 5, comprobado por familia (fichero y título del mismo hallazgo). 7 hallazgos en las cinco. 38, 41, 43, 39 y 39 s |
| `main`, 2 | 0 críticos, 0 altos y los mismos 2 medios. 37 y 37 s |
| Familias no revisadas · segundos intentos | 0 de 28 · 0 de 28 |

- **Límite:** la causa del fallo de T10 sigue sin demostrarse. 28 agentes sin fallos no descartan uno poco frecuente; el segundo intento y el plan B lo cubren.
- **El segundo intento no se ha visto actuar con un fallo real.**

## T10 · Desde cero, repetida tras T10b (25-nov-2026): CA1 ✅

Clon de `4ce3895` en una carpeta vacía, con el PATH de una terminal nueva y siguiendo el README. Mismo equipo: **no se probó la instalación ni otro ordenador.**

| Paso | Resultado |
|---|---|
| «Pruébalo» con `demo/seguridad` | ✅ A la primera: los 4 fallos, comprobados por familia; 7 hallazgos; sin la clave. 45 s, 48 s desde el clon |
| `./auditar.sh` con `main` | ✅ 0 críticos, 0 altos y 2 medios. 36 s |
| Carpeta y `--familia 2` | ✅ 35 s. La carpeta no cambia |
| Pruebas | ✅ 10 de 10 |

CA2 ✅ también contra la URL publicada (T10b, 5 de 5, y esta).
