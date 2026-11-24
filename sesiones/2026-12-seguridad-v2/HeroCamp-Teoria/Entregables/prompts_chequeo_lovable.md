# Prompts para revisar la seguridad de tu producto en Lovable

*Sesión de Seguridad · 10 de diciembre de 2026 · SPEC-026 · Probados en Lovable el 24-nov-2026 (`sdd/specs/026-seguridad-v2-replanteamiento/prueba-lovable.md`). El bloque "Formato de la respuesta" y la versión actual del prompt 1 se ajustaron el 24-nov tras una segunda prueba; el prompt 1 ajustado cumple el formato (tercera prueba, 24-nov).*

Son tres prompts, uno por cada riesgo de la sesión. Copia uno, pégalo en el chat de tu proyecto de Lovable y envíalo.

**Antes de usarlos:**
- **Estos prompts no cambian nada.** Piden a Lovable que revise tu proyecto y te explique lo que encuentra. Si Lovable propone arreglar algo, no lo aceptes todavía: primero lee el informe y decide.
- **Si arreglas algo, hazlo con un Pull Request** (una propuesta de cambio que revisas antes de publicarla). Comprueba la preview (la versión de prueba) antes del merge (unir el cambio a la versión publicada), como en la sesión del 21 de noviembre. No apliques arreglos el día antes del Demo Day sin probarlos.
- **No pegues claves reales en el chat.** Los prompts no las necesitan.

---

## 1. Claves y secretos

Una **clave** es un código que permite a tu producto usar un servicio (por ejemplo, la base de datos o una IA). Hay claves **públicas**, que pueden estar en la web, y claves **secretas**, que nunca deben estar en la web porque quien las tenga puede usar el servicio en tu nombre.

```text
Revisa este proyecto y busca las claves de los servicios que usa (base de datos, IA, pagos, publicación). No cambies nada: solo revisa e informa.

Para cada clave que encuentres, dime:
1. De qué servicio es.
2. Si es pública (puede estar en la web) o secreta (no debe estar en la web).
3. Si está en el código que se envía al navegador del usuario o guardada en Secrets.
4. Qué podría hacer otra persona si la copia.
5. Qué me recomiendas hacer.

No incluyas las contraseñas de los usuarios, las sesiones ni los datos de prueba.
Si no encuentras ninguna clave secreta en el código del navegador, dilo claramente.

Formato de la respuesta:
- Empieza con un resumen de dos frases: si hay algo que arreglar y qué es lo más urgente.
- Después, una tabla de 5 filas como máximo, con lo más importante primero. Si hay más, agrupa en una fila las que tengan el mismo riesgo.
- Nombra cada cosa como la ve el usuario del producto (por ejemplo, "clave de OpenAI" o "formulario de registro"), sin rutas de ficheros ni nombres de variables.
- En español, con frases cortas. Explica cualquier término técnico en una frase.
```

## 2. Datos y permisos

Tu producto guarda los datos en **tablas**, con filas y columnas: por ejemplo, una fila por cada usuario. **RLS** (*Row Level Security*) son las reglas que deciden qué filas puede ver o cambiar cada usuario. Sin esas reglas, cualquiera con la clave pública puede leer todas las filas.

```text
Revisa la base de datos de este proyecto. No cambies nada: solo revisa e informa.

Para cada tabla, dime:
1. Qué datos guarda.
2. Si tiene RLS activado.
3. Quién puede leer sus filas, quién puede crearlas, cambiarlas y borrarlas: cualquier persona sin iniciar sesión, cualquier usuario con sesión o solo el dueño de cada fila.
4. Si alguna regla permite más de lo necesario.
5. Qué me recomiendas hacer.

Ordena las tablas de mayor a menor riesgo.

Formato de la respuesta:
- Empieza con un resumen de dos frases: si hay algo que arreglar y qué es lo más urgente.
- Después, una tabla de 5 filas como máximo, con lo más importante primero. Si hay más, agrupa en una fila las que tengan el mismo riesgo.
- Nombra cada cosa como la ve el usuario del producto (por ejemplo, "clave de OpenAI" o "formulario de registro"), sin rutas de ficheros ni nombres de variables.
- En español, con frases cortas. Explica cualquier término técnico en una frase.
```

## 3. Datos personales

Un **dato personal** es cualquier dato que identifica a una persona o permite identificarla: nombre, email, teléfono, dirección, foto o DNI. La ley (RGPD) te obliga a pedir solo los datos que necesitas y a protegerlos.

```text
Revisa qué datos personales recoge y usa este proyecto. No cambies nada: solo revisa e informa.

Dime:
1. Qué datos personales pide el producto y en qué pantalla.
2. Dónde se guardan.
3. Si alguno se escribe en los registros (logs) o en la consola del navegador.
4. Si alguno se envía a otro servicio, por ejemplo a una IA, y a cuál.
5. Si hay algún dato que el producto pide pero no necesita para funcionar.
6. Qué me recomiendas hacer.

Formato de la respuesta:
- Empieza con un resumen de dos frases: si hay algo que arreglar y qué es lo más urgente.
- Después, una tabla de 5 filas como máximo, con lo más importante primero. Si hay más, agrupa en una fila las que tengan el mismo riesgo.
- Nombra cada cosa como la ve el usuario del producto (por ejemplo, "clave de OpenAI" o "formulario de registro"), sin rutas de ficheros ni nombres de variables.
- En español, con frases cortas. Explica cualquier término técnico en una frase.
```
