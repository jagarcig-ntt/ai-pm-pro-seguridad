# PLAN · SPEC-027 · Pipeline de agentes portable y fallos plantados en `feedback-hub`

*Spec: [spec.md](spec.md) (aprobada el 25-nov) · Estado del plan: **aprobado** (Jaime, 25-nov) · [tareas](tasks.md)*

## 1. Enfoque
- **Cuatro procesos reales de Claude Code en paralelo.** `auditar.sh` lanza `claude -p` una vez por familia, cada uno con su fichero de instrucciones. Cada agente devuelve un JSON.
- **Un script de Node une los cuatro JSON y escribe el informe.** No interviene la IA: no puede inventar hallazgos al redactarlo y tapa los valores de las claves siempre igual.
- **Se reutilizan los cuatro agentes de junio** (`HeroCamp-Product/.claude/agents/`): rol, reglas de evidencia, formato JSON y pasos. Se adaptan al stack de Lovable.

**Descartado:**
- **Un orquestador de IA que lanza subagentes** (como `/security-audit`): el informe cambiaría de redacción en cada ejecución.
- **Programa propio con la API de Anthropic:** necesita una clave y cuesta dinero.

## 2. Diseño

### 2.1 Repositorio `herocamp-security-pipeline`
Se prepara en `C:\Users\jaime\herocamp-security-pipeline` (P5).

| Fichero | Qué es |
|---|---|
| `auditar.sh` | Entrada |
| `agentes/familia-1-claves.md` … `familia-4-configuracion.md` | Instrucciones de cada agente |
| `scripts/informe.mjs` | Convierte los JSON en `security-report.md`, sin dependencias |
| `ejemplos/security-report.md` | Informe de la prueba contra `demo/seguridad` |
| `pruebas/` | JSON de ejemplo para probar `informe.mjs` sin gastar uso |
| `README.md`, `.gitignore` | |

### 2.2 `auditar.sh <ruta-o-URL> [--rama X] [--familia 1-4]`
1. **Comprueba** que existen `git`, `claude` y `node`. Si falta uno, dice cuál y cómo instalarlo.
2. **Copia** el repositorio a una carpeta temporal: `git clone --depth 1` si es una URL; si es una ruta, una copia sin `.git` ni `node_modules`. Siempre se audita una copia, así que el original no cambia.
3. **Lanza los agentes en paralelo,** con la copia como carpeta de trabajo, y enseña cuándo empieza y termina cada uno, con sus segundos.
4. **Si un agente falla o pasa de 150 s,** el informe dice que esa familia no se ha revisado. No la da por correcta.
5. **Escribe `security-report.md`** en la carpeta desde la que se lanza (`security-report-fN.md` si es una sola familia), muestra el resumen y borra la copia.

### 2.3 Aislamiento (R3)
El repositorio auditado es de otra persona: su `CLAUDE.md`, sus hooks o un comentario podrían dar órdenes a los agentes.

| Medida | Opción de `claude` |
|---|---|
| No carga `CLAUDE.md`, hooks, skills ni MCP | `--safe-mode --strict-mcp-config` |
| Solo leer y buscar: sin Bash, sin escribir y sin red | `--tools "Read,Glob,Grep"` |
| No lee fuera de la copia | `--restricted` (según su ayuda; se prueba en la primera tarea) |
| No guarda la sesión | `--no-session-persistence` |
| El texto del repositorio son datos, nunca instrucciones | Regla escrita en los cuatro agentes |

**Sin historial de git:** un agente sin Bash no puede usar `git log`, y el clon trae solo la última versión. El README y el informe lo dicen (tensión 1).

### 2.4 Agentes (R4, R5)
| Agente | Se añade | Se quita o cambia |
|---|---|---|
| F1 | La clave pública y el `.env` que solo lleva valores públicos son normales: ni críticos ni altos | — |
| F2 | Políticas `USING (true)`; cliente de servidor (`client.server.ts`) frente a cliente de navegador | «Supabase + Next.js» como único stack |
| F3 | Datos personales en la consola; datos que se piden y no se usan | La regla que exige contraseñas o tokens para avisar de un registro |
| F4 | Rutas de TanStack (`src/routes/`) sin comprobar la sesión | Next.js y Express como únicos stacks: quedan como alternativas |

En los cuatro: español directo, sin metáforas; nunca el valor de una clave; sin ficheros, líneas ni datos inventados.

### 2.5 Informe (R6)
Resumen y recomendación, tabla de gravedad por familia, las cuatro familias (qué es, dónde, por qué importa, qué hacer) y qué no se ha revisado. `informe.mjs` sustituye cualquier cadena con forma de clave por `[clave oculta]`, aunque el agente la haya copiado.

### 2.6 Fallos en `feedback-hub`, rama `demo/seguridad` (R7)
| Familia | Fichero | Fallo |
|---|---|---|
| F1 | `src/lib/resumen-ia.ts` | Clave `sk-proj-FALSA-…` en código del navegador |
| F2 | `supabase/migrations/20261125000000_demo_seguridad.sql` | Política de lectura `USING (true)` para `anon` sobre `feedback` (nombre y email). No se aplica |
| F3 | `src/routes/index.tsx` | `console.log` del nombre, el email y el mensaje al enviar |
| F4 | `src/routes/admin.tsx` | Página `/admin` sin comprobar la sesión, con datos ficticios (`example.com`). No usa la base de datos |

F4 usa datos ficticios a propósito: si alguien abriera un Pull Request por error, la preview no enseñaría datos reales. Los comentarios del código no señalan el fallo: el agente lo tiene que encontrar.

### 2.7 La demo (5 min, la escaleta no cambia)
20:39 qué vais a ver (1) · 20:40 lanzar y leer (3) · 20:43 qué significa (1).

**Medido el 25-nov:** un agente (F1, instrucciones de junio) sobre `feedback-hub`, 42 s en total; dio JSON válido, no cambió el repositorio y no marcó la clave pública como crítica. Los cuatro a la vez no se han medido; el corte del guion es a los 2 min.

## 3. Ficheros
| Acción | Ruta | Nota |
|---|---|---|
| crear | `C:\Users\jaime\herocamp-security-pipeline\` | §2.1 |
| crear | `C:\Users\jaime\feedback-hub-demo\` | Clon con la rama `demo/seguridad`; el push lo hace Jaime |
| crear | `sdd/specs/027-seguridad-v2-pipeline-portable/fallos-plantados.md`, `review.md` | Lo esperado y los resultados |
| crear | `sdd/specs/023-seguridad-v2-guion/plan-b/security-report.md` | R9 |
| modificar | `sesiones/2026-12-seguridad-v2/index.html` | Enlace en `#curiosos` (P2), como tarea de SPEC-024 |
| no tocar | `sesiones/2026-12-seguridad-v2/HeroCamp-Product/` | Hasta el 10-dic (P6) |

## 4. Riesgos y plan B
| Riesgo | Probabilidad | Mitigación / plan B |
|---|---|---|
| Un agente no detecta su fallo en alguna ejecución | media | Tres ejecuciones antes de darlo por bueno. Plan B: informe guardado |
| Los cuatro a la vez tardan más de 2 min | media | Medirlo; modelo más rápido; lanzarlo a las 20:39. Plan B: informe guardado |
| Límite de uso de la cuenta el día 10 | baja | No lanzar pruebas esa tarde. Plan B: informe guardado |
| El repositorio auditado da órdenes al agente | media | §2.3 y una prueba con un repositorio que lo intenta |
| GitHub bloquea el push por la clave falsa | baja | Cambiar el formato de la clave, sin saltarse la protección |
| Alguien abre un PR de `demo/seguridad` y se publica una preview | baja | F4 sin datos reales, clave falsa y SQL sin aplicar. Cerrar el PR |
| La rama llega a Lovable o a la base de datos | baja | No se une a `main` ni a `lovable-sync`. Se comprueba tras el push (CA7) |
| Un alumno lo usa sin cuenta de Claude Code | media | El README lo dice al principio; la guía dice que no lo necesitan |

## 5. Verificación
| Criterio | Cómo se verifica |
|---|---|
| CA1 | Clonar en una carpeta vacía y seguir solo el README, cronometrado |
| CA2 | Tres ejecuciones contra `demo/seguridad`: los 4 fallos, en su familia, en las tres |
| CA3 | Una ejecución contra `main`: ningún crítico falso; el resto se revisa a mano |
| CA4 | Contra `HeroCamp-Product/feedbackhub` |
| CA5 | `git status` y hash de los ficheros antes y después; búsqueda en el informe de cada valor plantado; herramientas sin Bash ni red; repositorio de prueba con instrucciones hostiles |
| CA6 | Segundos por agente y total en `review.md`; plan B en su ruta |
| CA7 | `main` con el mismo commit; sin PR ni despliegue de la rama; la URL de producción responde igual |
| CA8 | Lectura y búsqueda de expresiones figuradas, como en SPEC-023 T09 |

## 6. Conformidad con la constitution
- ✅ **2.3:** el pipeline no añade ideas a la sesión.
- ✅ **3.2 Coste 0:** sin clave de API. El uso cuenta en el límite de la cuenta de Claude Code. La herramienta estima 0,07 $ de API para la prueba del 25-nov.
- ✅ **3.3:** informe guardado como plan B.
- ✅ **3.4:** claves falsas y valores tapados.
- ✅ **5.5:** los commits y push los hace Jaime. El repositorio se crea con `gh`, con su confirmación y los ficheros listos.
- ✅ **Timings:** 1 + 3 + 1 = 5 min.

**Tensiones:**
1. **Historial de git.** R3 permitía `git log`; el plan lo quita para que los agentes no puedan ejecutar comandos. Se pierde la detección de claves borradas en versiones anteriores.
2. **Node.js como requisito.** R10 nombraba solo git y Claude Code. Node evita que una IA redacte el informe.
3. **CI de `feedback-hub`.** Un push a `demo/seguridad` no lanza `desplegar.yml`, pero sí `comprobar-pr.yml`, que se ejecuta en toda rama que no sea `main`. Solo prueba y compila, sin secretos. El código plantado tiene que compilar.
4. **Claves de junio sin confirmar.** `HeroCamp-Product/feedbackhub` es el segundo repositorio de prueba: Jaime confirma antes `DATABASE_URL` (y `JWT_SECRET`, en el otro proyecto).
