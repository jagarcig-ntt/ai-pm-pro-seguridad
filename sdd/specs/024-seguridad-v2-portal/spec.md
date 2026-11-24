# SPEC-024 · Portal de la sesión Seguridad v2

| Campo | Valor |
|---|---|
| Estado | aprobada (Jaime, 18-nov) · **redefinida por [SPEC-026](../026-seguridad-v2-replanteamiento/spec.md) el 24-nov; hay que volver a aprobarla.** Nuevo alcance: portal con teoría (F1, F2 y F3, 3 ideas cada una, lenguaje directo), casos, el chequeo en Lovable y descargas. Salen las prácticas, las salas, los prompts auditores, el check en el CI y el anexo A (lo sustituye la escaleta de SPEC-026, plan §2.1) |
| Sesión | 2026-12 Seguridad v2 (**jueves 10-dic, 2h**) |
| Fecha límite | 2026-12-07 |
| Depende de | SPEC-021 (contenido y prácticas de F3 y F4) · SPEC-022 (prompts auditores y check de seguridad en el CI, por redefinir) · SPEC-023 (guion, fuente de los minutos) · SPEC-016 (portal del 21-nov, modelo) |
| Responsable | Jaime García |

## 1. Problema / necesidad
- **El portal de seguridad es todavía el de junio** (`sesiones/2026-12-seguridad-v2/index.html`). Su estructura responde a una sesión de 3h expositiva con una práctica final: Hero, Para qué, Quién, Impacto, Familias, Dinámicas, Práctica, Debate y Cierre.
- **Gema y Jaime quieren la misma dinámica que el 21-nov** (conversación con Gema del 18-nov, que Jaime relata): teoría corta → demo de Jaime en directo → práctica en 3 salas de 6, tres veces. El portal del 21-nov (`sesiones/2026-11-git-deploy/index.html`, SPEC-016) ya resuelve esa estructura: El día con horario y reglas, tarjetas de familias con esquema, demo, prácticas con botones *Copiar*, kit y descargas.
- **La práctica de junio no sirve tal cual:** el pipeline de agentes (`HeroCamp-Product/.claude/`) se ejecuta desde VS Code y Claude Code, y los alumnos trabajan desde Lovable y el navegador (preocupación de Jaime, 18-nov). El nivel técnico de la clase es bajo, con unos 3 perfiles técnicos (Jaime, 18-nov).
- **Lo que pide la retro** (`sdd/specs/020-retro-junio/retro.md`): más práctica en F3 y F4, más dinamismo, el pipeline sobre su propio producto, y tiempo protegido para F3 y F4.
- **El puente ya está prometido:** el 21-nov se cierra con "El día 11 añadimos el check de seguridad a vuestro CI" (`sesiones/2026-11-git-deploy/Teoria/GUION-SESION.md`, cierre).

## 2. Objetivo
Que el portal de la sesión del 11-dic siga la estructura del portal del 21-nov, conserve la teoría y los conceptos de seguridad de junio, y permita hacer todas las prácticas desde el navegador y Lovable: prompts auditores copiables, la seguridad de GitHub y el check de seguridad en el CI.

## 3. Para quién
- **Alumnos (18, nivel técnico mayoritariamente bajo):** seguir cada práctica en su sala sin instalar nada, con lo que hay que pegar a un clic, sobre su propio producto publicado el 21-nov.
- **Perfiles técnicos (unos 3):** una vía opcional para ejecutar el pipeline real desde VS Code.
- **Jaime:** notas del orador con minutos, demos y plan B, igual que el 21-nov.
- **Aida (asistente, si repite):** saber qué hace cada sala y los atascos habituales.

## 4. Alcance
**Incluye:**
- Reestructurar `sesiones/2026-12-seguridad-v2/index.html` con las secciones del portal del 21-nov, usando `assets/` común.
- Las 4 tarjetas de familias, conservando el contenido de junio, sus esquemas y casos, con las ideas de F3 y F4 de SPEC-021.
- Tres rondas de demo y práctica en salas, con botones *Copiar* para los prompts auditores y para el fichero del check de seguridad.
- El kit y las descargas, con los PDF existentes en sus URL actuales.
- Una escaleta en borrador (anexo A) para que el portal tenga horario; los minutos definitivos los fija SPEC-023.
- Una chuleta para la asistente, si Jaime la quiere, como la del 21-nov.

**No incluye:**
- El contenido de la teoría de F3 y F4 (SPEC-021) ni el diseño y la prueba de los prompts auditores y del check (SPEC-022).
- El guion minuto a minuto (SPEC-023).
- Cambios en el pipeline de agentes de VS Code (SPEC-022).
- El portal del 21-nov.

## 5. Requisitos
- **R1. Estructura del 21-nov:** Hero · Para qué · Quién · El día (horario, recuento y reglas) · Familias · Demo · Práctica 1 · Práctica 2 · Práctica 3 · Kit · Descargas · Cierre. Las secciones de junio que no encajen (Impacto, Dinámicas, Debate) se integran o se retiran según la pregunta P4.
- **R2. Teoría intacta en lo esencial:** las 4 familias de junio (Credenciales, Bases de datos y permisos, Datos sensibles, Configuración de entornos), con su esquema, un caso real verificado y "lo que el PM se lleva". Máximo 3 ideas por familia (por bloque en F3, que tiene dos ejes).
- **R3. Cada práctica, desde el navegador:** el alumno es capaz de:
  - **P1:** activar en su repositorio las protecciones de seguridad de GitHub disponibles en repos públicos y lanzar los auditores de F1 y F2 en Lovable;
  - **P2:** obtener con el auditor de F3 el mapa de datos de su producto y decidir qué hacer ante una brecha en las primeras 72 horas;
  - **P3:** lanzar el auditor de F4 y añadir el check de seguridad a su CI mediante un Pull Request, con el check obligatorio en su ruleset.
- **R4. El resultado de cada práctica es una decisión de PM** (arreglar ya, aceptar o no aplica), que se comparte en la puesta en común de la sala (constitution 2.5).
- **R5. Botones *Copiar*** que traen el texto desde el repositorio, como en el portal del 21-nov, para cada prompt auditor y para el fichero del check.
- **R6. El pipeline real como demo y como vía opcional:** la demo de Jaime en VS Code y un desplegable "Para curiosos" con los pasos para ejecutarlo, sin que la práctica dependa de él.
- **R7. Plan B en cada práctica:** quien no terminó el 21-nov (sin repo conectado o sin CI) puede hacer los auditores en Lovable igualmente, y existe un producto de prueba.
- **R8. Notas del orador** con minutos, demo y plan B (`?notas` o tecla `N`). Los minutos coinciden con el guion de SPEC-023 cuando exista.
- **R9. URL estables:** se mantienen la URL del portal y los nombres de `descargas/` (constitution 4).

## 6. Criterios de aceptación
- [ ] CA1. El portal tiene las secciones de R1 y usa `assets/` sin estilos duplicados.
- [ ] CA2. El horario de "El día" coincide con el guion de SPEC-023 (o con el anexo A mientras SPEC-023 no exista), y suma 240 min.
- [ ] CA3. Cada práctica tiene sus pasos, sus botones *Copiar* funcionando en GitHub Pages, un punto de control visible y su plan B.
- [ ] CA4. Ningún paso de las prácticas exige instalar nada; la vía de VS Code está marcada como opcional.
- [ ] CA5. Las cuatro familias conservan su esquema y tienen como máximo 3 ideas por bloque; todos los casos y cifras tienen fuente (SPEC-021, `verificacion.md`).
- [ ] CA6. Ningún token ni clave real en el portal ni en las capturas.
- [ ] CA7. Verificado en Chrome a 1440 px y 390 px, con notas ocultas sin `?notas` y visibles con él; `python scripts/check_links.py` sin enlaces rotos.
- [ ] CA8. Las URL de `descargas/` que existían siguen respondiendo.

## 7. Restricciones (constitution)
- **1.6 Una sola fuente:** los minutos salen del guion (SPEC-023); el anexo A es provisional.
- **2.3 Máximo 3 ideas por bloque** y **2.4 patrón de bloque.**
- **2.5 Lenguaje de PM:** el resultado de la práctica es una decisión.
- **2.6 Práctica sobre lo suyo**, con producto de prueba como plan B.
- **2.7 Ritmo:** pausa cada 60–75 min. **2.8 Timings** que suman 240 min con colchón. **2.12** al menos un 40 % de práctica o interacción.
- **3.2 Coste 0:** nada que exija una clave de API de pago (por eso el pipeline no corre en GitHub Actions). Los límites gratuitos de GitHub y de la herramienta del check se documentan con fecha.
- **3.3 Plan B probado** y **3.4 nada de secretos en pantalla.**
- **3.6 Identidad visual** de junio y `assets/` común. **5.6** verificación en navegador antes del commit.

## 8. Preguntas abiertas
- [x] P1. **Sí** (18-nov). **¿Te encaja la escaleta del anexo A** (tres rondas, F1 y F2 juntas en la primera)? Los minutos definitivos irán a SPEC-023.
- [x] P2. **Sí, 3 salas de 6 y Aida** (18-nov). **¿Repite el formato de salas** (3 de 6) **y Aida** como asistente el 11-dic?
- [x] P3. **Se monta ya y luego se adapta** (18-nov). **¿Se construye ya el esqueleto** con las prácticas marcadas "pendiente de la prueba", o se espera a probar los prompts auditores y el check (SPEC-022)?
- [x] P4. **Sí:** Impacto entra en "Para qué"; Dinámicas y Debate se retiran (18-nov). **Secciones de junio:** ¿"Impacto" se integra en "Para qué"? ¿"Dinámicas" y "Debate" se retiran?
- [x] P5. **No hace falta** (18-nov). **El Demo Day es al día siguiente (12-dic).** ¿Quieres en el cierre un "qué arreglar esta noche y qué dejar para después"?
- [ ] P6. **Abierta:** Jaime no lo sabe aún (18-nov); se decide tras la prueba de SPEC-022 y con la lista de repos del 20-nov. **Quien no terminó el 21-nov:** ¿basta con los auditores en Lovable, o necesita un producto de prueba común?
- [x] P7. **Sí, se comprueba en la prueba técnica** (18-nov). **Supabase frente a Lovable Cloud:** la práctica de F4 de SPEC-021 usa el *Security Advisor* de Supabase, que con Lovable Cloud quizá no esté accesible. Hay que comprobar qué ofrece Lovable (posible escáner de seguridad propio) en la prueba de SPEC-022.
- [x] P8. **Sí** (18-nov). **¿Chuleta para la asistente** como la del 21-nov?

## 9. Hallazgos fuera de alcance
- **Constitution 0 y 3.1:** el horario de Seguridad v2 (17:00–21:00) y el stack siguen bien; la audiencia ya dice Lovable Cloud. Si cambia el formato de salas, no requiere cambio de constitution.
- **SPEC-021 plan:** las variantes de práctica ("con el pipeline" y "con el informe de Jaime") deberían pasar a "prompts auditores en Lovable para todos y pipeline opcional", y la práctica de F4 depende de P7.
- **SPEC-022:** reescribirla como "agentes convertidos en prompts auditores + check de seguridad en el CI". El pipeline como check de PR en GitHub Actions choca con el coste 0.
- **Registro:** SPEC-001 sigue en pausa con T15 (probar `/security-audit`), que conviene hacer antes de la demo del pipeline.

---

## Anexo A · Escaleta en borrador (18-nov)

*Provisional: la fuente de los minutos será el guion de SPEC-023. Patrón del 21-nov: teoría corta → demo de Jaime → salas. F3 y F4 con los minutos que pide la retro (unos 60 y 50).*

| Hora | Min | Bloque | Contenido |
|---|---|---|---|
| 17:00 | 15 | Apertura | Para qué · recuento (repo público con CI del 21-nov) · salas y reglas |
| 17:15 | 25 | Teoría 1 · Credenciales y base de datos (F1 y F2) | Dos familias de junio, con tiempos cerrados |
| 17:40 | 15 | Demo 1 en directo | El pipeline en VS Code · el mismo auditor como prompt en Lovable · la seguridad de GitHub |
| 17:55 | 5 | Pausa activa y reparto en salas | |
| 18:00 | 35 | Salas · Práctica 1 | Seguridad de GitHub + auditores de F1 y F2 → decisión · puesta en común |
| 18:35 | 10 | Pausa | |
| 18:45 | 20 | Teoría 2 · Datos sensibles (F3, dos ejes) | Dónde se escapan los datos · qué te exige la ley |
| 19:05 | 10 | Demo 2 en directo | El auditor de F3 sobre el producto de demo |
| 19:15 | 30 | Salas · Práctica 2 | Mapa de datos con el auditor de F3 → decisión · simulacro de brecha (72 h) · puesta en común |
| 19:45 | 10 | Pausa | |
| 19:55 | 15 | Teoría 3 · Configuración (F4) | Lo que expones · CORS · el mimetismo del agente |
| 20:10 | 10 | Demo 3 en directo | Auditor de F4 · check de seguridad en un PR |
| 20:20 | 25 | Salas · Práctica 3 | Auditor de F4 + check en el CI por PR · rescate |
| 20:45 | 10 | Cierre | Kit · Demo Day de mañana · preguntas |
| 20:55 | 5 | Colchón | |

**Suma:** 240 min. **Práctica en salas:** 90 min (37 %); con demos y puestas en común se supera el 40 % de práctica o interacción (constitution 2.12).

**Tensiones:**
- **F1 y F2 en 25 min de teoría** es menos que en junio, donde se alargaron. Hay que elegir 3 ideas por familia y cerrar tiempos (retro, decisión para SPEC-023).
- **La práctica 3 es la más ajustada:** el auditor de F4 y el check en el CI por PR en 25 min. El check sigue la mecánica de la P1 y la P2 del 21-nov, que ya conocerán.
- **El colchón es de 5 min** más la parte de rescate de la P3, por debajo del 10 % de la constitution 2.8. SPEC-023 tendrá que decidir dónde recortar.
