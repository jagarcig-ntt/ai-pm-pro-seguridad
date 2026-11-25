# FALLOS PLANTADOS · `feedback-hub`, rama `demo/seguridad` · SPEC-027

*T02 · 25-nov-2026 · Base: `main` en `ac8d7df` · Clon local: `C:\Users\jaime\feedback-hub-demo` · Sin commit ni push (T09)*

**La rama no se une nunca a `main` ni a `lovable-sync`, y no se abre ningún Pull Request con ella:** un Pull Request publica una preview.

| Familia | Fichero | Qué se plantó | Qué debe decir el informe |
|---|---|---|---|
| F1 · Claves y secretos | `src/lib/resumen-ia.ts`, línea 1 | Una clave con formato de OpenAI, claramente falsa, en código que llega al navegador | Clave secreta de OpenAI en el código del navegador, sin mostrar su valor. Guardarla en *Secrets*, usarla desde el servidor y cambiarla |
| F2 · Datos y permisos | `supabase/migrations/20261125000000_demo_seguridad.sql` | Una regla que deja leer todas las filas de `feedback` (nombre, email y mensaje) sin iniciar sesión | Cualquiera puede leer todas las filas de `feedback`. Cambiar la regla |
| F3 · Datos personales | `src/routes/index.tsx`, en `onSubmit` | El nombre, el email y el mensaje se escriben en la consola del navegador al enviar | Datos personales en la consola. Quitar esa línea |
| F4 · Configuración | `src/routes/admin.tsx` | La página `/admin` se abre sin iniciar sesión, con opiniones y un botón para borrarlas | Página de administración sin comprobar la sesión. Pedir que se inicie sesión |

`src/routeTree.gen.ts` cambia porque la compilación añade la ruta `/admin`. No es un fallo.

## Por qué no hacen daño
- **F1:** la clave es inventada. El botón «Resumir opiniones» llamaría a OpenAI con ella y OpenAI la rechazaría.
- **F2:** el SQL es solo un fichero. **No se aplica a la base de datos.** No pedir a Lovable que ejecute las migraciones de esta rama.
- **F3:** solo escribe en la consola de quien rellena el formulario.
- **F4:** los datos están escritos en el código, con direcciones de `example.com`. No usa la base de datos, y «Borrar» solo los quita de la pantalla.

El código no lleva comentarios que señalen los fallos.

## Comprobado el 25-nov
- Pruebas: 1 de 1. Compilación: correcta.
- **Con npm, no con Bun,** en una copia temporal: las versiones de las dependencias pueden no ser las de `bun.lock`. El CI lo comprueba con Bun al subir la rama (T09).
- La clave falsa y el `console.log` están en los ficheros compilados que recibe el navegador.

## Posibles hallazgos secundarios
- La página `/admin` enseña emails ficticios: F3 podría mencionarlos. No es uno de los 4 fallos.
- `/admin` envía los mensajes a OpenAI: F3 podría avisar de datos que se envían a otro servicio. Es correcto.
