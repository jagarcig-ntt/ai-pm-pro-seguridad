# SPEC-027 · Pipeline de agentes portable y fallos plantados en `feedback-hub`

| Campo | Valor |
|---|---|
| Estado | **en curso** (25-nov) · aprobada por Jaime · plan aprobado · tasks · P1–P7 respondidas |
| Sesión | 2026-12 Seguridad v2 (jueves 10-dic · 19:00–21:00): demo del pipeline de las 20:39 (5 min) |
| Fecha límite | 2026-12-04, para que SPEC-023 T02 (prueba del pipeline, antes del 5-dic) se haga sobre esto |
| Depende de | SPEC-023 (guion: la demo de las 20:39 y su plan B) · SPEC-026 (alcance de la sesión) · constitution v1.9. Retoma parte de SPEC-022 (descartada el 24-nov) y cubre SPEC-001 T15 (probar `/security-audit`) |
| Responsable | Jaime García |

## 1. Problema / necesidad
- **El pipeline de junio solo funciona dentro de este repositorio y abierto en Claude Code.** Está en `sesiones/2026-12-seguridad-v2/HeroCamp-Product/`:
  - el orquestador `.claude/commands/security-audit.md`, que pregunta en modo interactivo «¿A o B?»;
  - 4 agentes, `.claude/agents/family-1…4-*.md`, de unas 100 líneas cada uno;
  - dos proyectos trampa locales, `feedbackhub/` y `analytics-dashboard/`.

  No se puede clonar aparte ni lanzar desde la terminal contra cualquier repositorio.
- **Los agentes están escritos para el stack de junio:** Supabase propio, `server.js`, `service_role` y Claude Code (`HeroCamp-Product/README.md`, `.claude/CLAUDE.md`). Los alumnos de esta promoción construyen con Lovable y Lovable Cloud (constitution, §0 y 3.1). Si el pipeline no conoce ese stack, puede marcar como crítico lo que la guía dice que es normal, como la clave pública de la base de datos en la web (guía, F1 y F2).
- **La demo de las 20:39 audita hoy la copia local `feedbackhub`** (guion, 20:40; SPEC-023 plan §2.5). Jaime quiere auditar `feedback-hub`, el proyecto de Lovable real del curso (https://github.com/jagarcig-ntt/feedback-hub, público, rama `main`; el portal del 21-nov lo enlaza). Ese proyecto no tiene fallos plantados.
- **En la sesión se dice que hay «cuatro agentes a la vez», uno por familia** (guion, 20:40). El portal lo cuenta igual (`#curiosos`).
- **En este equipo no estaban al escribir la spec** (instalados el 25-nov: Claude Code 2.1.330, Node.js 26.13.1 y `gh` 2.105.0; `gh` con sesión de `jagarcig-ntt`):
  - **la terminal de Claude Code:** `claude` no está en el PATH, solo la extensión de VS Code;
  - **Node.js;**
  - **`gh`:** Jaime lo instala (25-nov).

## 2. Objetivo
Un repositorio aparte con el pipeline (un orquestador y 4 agentes) que cualquiera puede clonar y lanzar desde la terminal contra cualquier repositorio, local o de GitHub. Además, `feedback-hub` con un fallo plantado por familia, que el pipeline detecta, para la demo del 10-dic.

## 3. Para quién
- **Jaime:** la demo de 5 minutos de las 20:39, lanzada desde VS Code, con un informe que puede leer en voz alta y un plan B guardado.
- **Alumnos curiosos** (si el repositorio es público, P2): clonarlo y probarlo con su propio producto. No lo necesitan (guía, «Para curiosos»; portal, `#curiosos`).
- **SPEC-023:** T02 (prueba y cronometraje), la nota de las 20:40 y el plan B (`023/plan-b/security-report.md`).

## 4. Alcance
**Incluye:**
- **El repositorio nuevo del pipeline:**
  - el orquestador;
  - los 4 agentes, a partir de los de junio;
  - un script de entrada para la terminal;
  - un README en español.
- **Adaptar los agentes al stack del curso** (Lovable, Lovable Cloud, Cloudflare y GitHub), sin que dejen de funcionar con otros repositorios.
- **Un modo sin preguntas** para la terminal: las 4 familias en paralelo, como la opción A de junio. Se mantiene la opción de lanzar una sola familia.
- **Los fallos plantados en `feedback-hub`,** uno por familia, con claves falsas, en el sitio que decida P1. Se documentan en esta carpeta, con lo que el pipeline debe detectar.
- **La prueba completa:**
  - el pipeline contra `feedback-hub` con los fallos y sin ellos;
  - contra un segundo repositorio;
  - cronometrado;
  - con el informe guardado como plan B.

**No incluye:**
- El check en el CI, la práctica de los alumnos ni el zip de junio (SPEC-022, descartada).
- **Cambios en el guion** (SPEC-023: T02 usa esto y T10 ajusta la nota de las 20:40) **y en el portal** (SPEC-024: si se enlaza el repositorio desde `#curiosos`, P2). Se anotan como hallazgos.
- Revisar la base de datos real de un proyecto. Los agentes leen el código: no se conectan a Lovable Cloud ni a ningún servicio.
- Un programa propio que llame a la API de Anthropic (necesita una clave de API y cuesta dinero; propuesta del agente, no recomendada).

## 5. Requisitos
- **R1. Repositorio aparte** (nombre y visibilidad en P2), autocontenido:
  - `.claude/agents/` (4 agentes);
  - el orquestador;
  - el script de entrada;
  - `README.md`;
  - una carpeta de ejemplos de informe.

  No depende de nada de este repositorio.
- **R2. Uso desde la terminal:** `./auditar.sh <ruta-o-URL> [--rama <rama>] [--familia <1-4>]`.
  - Si recibe una URL de GitHub, clona solo la última versión en una carpeta temporal.
  - Lanza Claude Code sin interfaz, con las 4 familias en paralelo.
  - Deja `security-report.md` en la carpeta desde la que se lanza, no dentro del repositorio auditado.
  - Muestra en la terminal el resumen y la ruta del informe.
- **R3. Solo lectura:**
  - Los agentes no modifican el repositorio auditado.
  - No hacen peticiones de red al proyecto auditado ni a sus servicios. Los agentes de junio ya lo prohíben. (Corregido el 25-nov: la spec decía que el agente 2 consultaba la API de Supabase. Eso era el diseño de `HeroCamp-Teoria/CLAUDE.md`, no el agente.)
  - Las herramientas se limitan a leer, buscar y `git log` (para el historial).
- **R4. Agentes que conocen el stack del curso,** con criterios que no contradigan la guía:
  - **F1:** clave pública frente a clave secreta. La clave pública de Lovable Cloud y el `.env` con valores públicos que sube Lovable no son críticos.
  - **F2:** reglas RLS, incluidas las que dejan leer todo.
  - **F3:** datos personales que se piden, se escriben en la consola o en los registros, o se envían a otros servicios.
  - **F4:** páginas de administración o de prueba sin login, CORS abierto, cabeceras de seguridad.
- **R5. Genéricos:** el pipeline sigue funcionando con un repositorio que no sea de Lovable (por ejemplo, la copia local `feedbackhub` de junio), aunque los criterios de R4 estén pensados para Lovable (constitution 2.6: «la herramienta que se entrega debe ser genérica»).
- **R6. Informe para un PM, en lenguaje directo** (excepción v1.9):
  - arriba, el resumen y la recomendación;
  - después, una sección por familia, con los mismos nombres de familia que la guía;
  - por cada hallazgo, qué es, dónde está, por qué importa y qué hacer.

  **Nunca muestra el valor de una clave** (3.4): solo su tipo y dónde está.
- **R7. Fallos plantados en `feedback-hub`,** uno por familia. Propuesta, a validar en P3:
  - **F1:** una clave secreta falsa (`sk-proj-FALSA-…`) en el código que llega al navegador.
  - **F2:** un fichero de migración SQL con una regla RLS que deja leer todas las filas de una tabla con datos personales. Solo en el código: no se aplica a la base de datos.
  - **F3:** un formulario o una función que escribe en la consola los datos personales que recibe.
  - **F4:** una ruta de administración que se abre sin iniciar sesión.

  Todos, con datos y claves claramente falsos. Se documentan en `fallos-plantados.md` (esta carpeta): fichero, qué se plantó y qué debe decir el informe.
- **R8. Detección:**
  - Con los fallos, el informe recoge los 4, cada uno en su familia.
  - Sin los fallos (`main`), no aparece ningún hallazgo crítico falso.

  Lo que salga de más se revisa a mano y se anota.
- **R9. Cronometrado y con plan B:** se mide la duración real con los 4 agentes en paralelo (el guion dispone de 3 minutos, con corte a los 2). El informe de la prueba se guarda como plan B en `sdd/specs/023-seguridad-v2-guion/plan-b/security-report.md`, la ruta que usa el guion.
- **R10. README en español:**
  - requisitos (git y Claude Code para la terminal, con la cuenta de quien lo use);
  - instalación, uso y qué revisa cada agente;
  - limitaciones: lee el código, no la base de datos real, y no sustituye a una auditoría profesional.
- **R11. Reproducible:** se prueba desde cero, clonando el repositorio nuevo en una carpeta limpia y siguiendo solo el README (3.5).

## 6. Criterios de aceptación
- [ ] **CA1.** El repositorio nuevo existe con la estructura de R1. Clonado en una carpeta limpia y siguiendo solo el README, `auditar.sh` funciona a la primera.
- [ ] **CA2.** `./auditar.sh https://github.com/jagarcig-ntt/feedback-hub` (con la rama o el repositorio de P1) genera un informe con los 4 fallos de `fallos-plantados.md`, cada uno en su familia.
- [ ] **CA3.** Contra `main` de `feedback-hub`, el informe no marca como crítico nada que la guía considere normal: la clave pública ni el `.env` con valores públicos. Los demás hallazgos se revisan a mano y se anotan.
- [ ] **CA4.** Funciona contra un segundo repositorio que no sea de Lovable (la copia local `HeroCamp-Product/feedbackhub`).
- [ ] **CA5.** Después de cada ejecución, el repositorio auditado no cambia (`git status` limpio). Ningún informe contiene el valor de una clave. Los agentes no hacen peticiones de red al proyecto auditado.
- [ ] **CA6.** La duración está medida y anotada, y el plan B está guardado en la ruta del guion.
- [ ] **CA7.** Los fallos plantados usan claves falsas y no llegan a producción: la URL publicada de `feedback-hub` no cambia y `main` sigue igual (salvo que P1 decida otra cosa).
- [ ] **CA8.** El informe y el README se leen sin lenguaje figurado y con los términos definidos.

## 7. Restricciones (constitution)
- **1.1 Spec antes que material**, y **5.5: los commits y los push los hace Jaime.** El agente prepara los ficheros en local. Crear el repositorio en GitHub y subir la rama de `feedback-hub` son publicaciones: los hace Jaime, o el agente con `gh` solo con su confirmación explícita.
- **2.6:** herramienta genérica.
- **3.1:** Claude Code forma parte del stack del curso.
- **3.2 Coste 0:** el pipeline usa la cuenta de Claude Code de quien lo lanza. Para Jaime, su plan actual. Los alumnos no lo necesitan.
- **3.3:** plan B (informe guardado).
- **3.4:** claves falsas y ningún valor en pantalla ni en el informe.
- **3.5:** reproducible desde cero.
- **5.4:** el informe no inventa datos.

## 8. Preguntas abiertas
- [x] **P1. Respuesta (25-nov): Sí: rama `demo/seguridad`, sin unir a `main` y sin PR.**
  **Pregunta: ¿Dónde se plantan los fallos?** `feedback-hub` es público y está publicado en Cloudflare.
  - **Recomendación: una rama `demo/seguridad` que nunca se une a `main`,** como las ramas `demo/f3-checks` y `demo/f4-rompe-produccion` que ya existen. El workflow `desplegar.yml` solo publica con un push a `main` o `staging` o con un Pull Request (comprobado el 25-nov): esa rama no se publica mientras no se abra un PR.
  - **Otras opciones:**
    - un repositorio copia, `feedback-hub-trampa`;
    - `main`, que no recomiendo: se publicaría, y se mezclaría con lo que vieron el 21-nov.
- [x] **P2. Respuesta (25-nov): Sí: `herocamp-security-pipeline`, público y enlazado desde `#curiosos` (cambio de SPEC-024).**
  **Pregunta: Nombre y visibilidad del repositorio nuevo.** Propuesta: `herocamp-security-pipeline`, público, para que los curiosos lo puedan clonar. Si es público, ¿se enlaza desde `#curiosos` del portal? Sería un cambio de SPEC-024 que habría que hacer antes de compartir el portal o, si no, después.
- [x] **P3. Respuesta (25-nov): Sí, los 4.**
  **Pregunta: Los 4 fallos de R7:** ¿te valen? En especial F2: la migración queda solo en el código y no se aplica a la base de datos.
- [x] **P4. Respuesta (25-nov): Instalado el 25-nov. `claude -p` responde con la sesión de Jaime.**
  **Pregunta: Claude Code en la terminal:** hoy solo está la extensión de VS Code. Para `auditar.sh` hace falta instalar Claude Code para la terminal (el comando `claude`). ¿Lo instalas? Si no, la demo se lanza como en junio, con `/security-audit` desde la extensión, y el script queda para quien tenga la terminal.
- [x] **P5. Respuesta (25-nov): Sí: `C:\Users\jaime\herocamp-security-pipeline`, y lo crea el agente con `gh` cuando Jaime lo confirme, ya con los ficheros listos.**
  **Pregunta: ¿Dónde preparo el repositorio nuevo en tu equipo** antes de subirlo? Propuesta: `C:\Users\jaime\herocamp-security-pipeline`, fuera de este repositorio. Y con `gh` instalado: ¿lo creo yo en GitHub cuando me lo confirmes, o lo creas tú?
- [x] **P6. Respuesta (25-nov): Sí: se queda hasta el 10-dic; después su README apunta al repositorio nuevo.**
  **Pregunta: ¿Qué pasa con `HeroCamp-Product/` de este repositorio?** Recomendación: se queda hasta el 10-dic como plan B (y como el segundo repositorio de CA4). Después, su README apunta al repositorio nuevo, para no tener dos pipelines (1.6).
- [x] **P7. Respuesta (25-nov): Solo `bash`, sin versión para PowerShell.**
  **Pregunta: Script para Windows:** recomiendo un solo script `bash`, que funciona en Git Bash (lo tienes), macOS y Linux. ¿Hace falta también una versión para PowerShell?

## 9. Hallazgos fuera de alcance
- **Las claves de los `.env` de los proyectos trampa de junio no llevan ninguna marca de falsas.** Están en `HeroCamp-Product/feedbackhub/.env` y `analytics-dashboard/.env`, que están en este repositorio, público:
  - `SUPABASE_SERVICE_ROLE_KEY`;
  - `GEMINI_API_KEY`;
  - `DATABASE_URL`;
  - `OPENAI_API_KEY`;
  - `STRIPE_API_KEY`;
  - `SENDGRID_API_KEY`;
  - `JWT_SECRET`.

  No se han mostrado ni usado los valores. Ninguno lleva una marca de falso, pero por su forma parecen inventados (revisión local del 25-nov):
  - **Supabase:** la firma del JWT tiene 21 caracteres (una HS256 tiene 43), el identificador de proyecto tiene 10 (uno real, 20) y las fechas son redondas (1700000000 y 1800000000).
  - **OpenAI, Stripe y SendGrid:** contienen una secuencia de 9 caracteres consecutivos.
  - **Gemini:** 38 caracteres (una clave `AIza` tiene 39).
  - **`DATABASE_URL` y `JWT_SECRET`:** la forma no permite decidirlo.

  **Jaime lo confirma** (3.4; SPEC-023 T02). Lo que no reconozca se trata como real y se revoca.
- **SPEC-023:** cuando esta spec esté hecha, la demo de las 20:40 audita `feedback-hub` y no `feedbackhub`. Cambian la ACCIÓN, el texto («El proyecto que va a revisar se llama…») y la nota de duración. Lo hacen T02 y T10.
- **SPEC-024:** P2 decide enlazar el repositorio: cambia `#curiosos` del portal. El enlace se añade cuando el repositorio exista.
- **La guía dice que los programas del pipeline revisan «uno detrás de otro»; el guion, «cuatro agentes a la vez»** (anotado en SPEC-024). Con esta spec se confirma: a la vez. Corregir la guía es de SPEC-026.
