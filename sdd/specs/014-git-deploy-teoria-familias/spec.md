# SPEC-014 · Teoría de la sesión Git/Deploy en 4 familias

| Campo | Valor |
|---|---|
| Estado | **hecha** (21-oct; [review](review.md)) |
| Sesión | 2026-11 Git/Deploy (sábado 21-nov · 10:00–14:00 · Zoom) |
| Fecha límite | 2026-10-26 (semana 1 del calendario acordado el 20-oct) |
| Depende de | SPEC-010 v3 (aprobada) · constitution v1.4 |
| Alimenta | SPEC-011 (producto demo), SPEC-017 (squad), SPEC-015 (guion), SPEC-016 (portal) |
| Responsable | Jaime García |

## 1. Problema / necesidad
- La sesión del 21-nov no tiene contenido teórico todavía. La escaleta aprobada en SPEC-010 (anexo A) define 4 bloques de contenido (B1–B4), pero no qué se cuenta en cada uno.
- Jaime quiere repetir el modelo de junio: **teoría organizada en familias**, con versión para alumnos y versión para el formador, como base de la que salen después el portal, el guion y las herramientas. Está en `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Bloque Teorico/`: 4 ficheros `familiaN_*_alumnos.md` y 4 `Formador/familiaN_*_profundo.md`.
- Lo que muestra el material de junio:
  - **Estructura común de 11 secciones** por familia: por qué importa, definiciones, mecanismo, magnitud, velocidad, severidad, a quién afecta, casos reales, factor agente IA, lo que el PM tiene que interiorizar y fuentes (p. ej. `familia1_credenciales_alumnos.md`, 304 líneas).
  - **Versión formador casi idéntica a la de alumnos**: `familia1_credenciales_profundo.md` tiene 337 líneas, apenas unos párrafos de intención pedagógica más. No aporta mucho como guía del formador.
  - **El "Antes de entrar" no está en la teoría.** Solo aparece en el guion (`GUION-SESION-COMPLETO.md`), aunque la constitution (2.2) lo exige por bloque.
  - **La densidad fue el problema de las familias 3 y 4** (`sdd/specs/020-retro-junio/retro.md`, apartado 3). Por eso la constitution 2.3 fija un máximo de 3 ideas por bloque.
- **Solape con diciembre.** La familia 4 de junio ya trata "Entornos, despliegues y configuración" (`familia4_entornos_configuracion_alumnos.md`). Las nuevas F2 y F4 tocan terreno vecino y hay que delimitarlo.

## 2. Objetivo
Dejar escritas y revisadas las 4 familias teóricas de la sesión Git/Deploy, en versión alumnos y versión formador. Deben estar listas para que de ellas salgan el producto demo, el squad, el guion y el portal sin tener que reinventar contenido.

## 3. Para quién
- **Alumnos (≈12 PMs senior):** una guía de referencia que puedan releer al aplicar el proceso a su producto. Lenguaje de PM, no de ingeniero (constitution 2.5).
- **Jaime (formador):** una versión que, además del contenido, diga qué enfatizar, qué preguntar, qué errores de comprensión esperar y cómo enlazar con la demo.
- **Specs posteriores:**
  - SPEC-011 y SPEC-017 necesitan saber qué conceptos debe poder enseñar el demo y qué fases debe cubrir el squad.
  - SPEC-015 y SPEC-016 vuelcan la teoría al guion y al portal.

## 4. Alcance
**Incluye:**
- Las 4 familias, cada una en versión alumnos y versión formador:
  - **F1 · Git profesional:** ramas, commits con sentido, el Pull Request como conversación y revisión.
  - **F2 · Entornos y secretos:** development / staging / production, variables por entorno, secretos fuera del código.
  - **F3 · CI/CD y deploy:** el workflow como receta automática, checks y previews por PR, merge = producción.
  - **F4 · Go-live y recuperación:** checklist "¿listo para producción?", rollback y revert, qué vigilar tras salir.
- Por cada familia, un **mapa de conceptos → piezas** que el producto demo debe permitir enseñar y la fase del squad que le corresponde. Es la entrada para SPEC-011 y SPEC-017.
- Un borrador del **glosario** común a las 4 familias, como base de la chuleta de Git de SPEC-010 R13.

**No incluye:**
- El guion minuto a minuto (SPEC-015) ni el portal (SPEC-016).
- La checklist de go-live y la guía paso a paso como entregables finales: aquí se define su contenido, y su maquetación como kit se hace en SPEC-015 y SPEC-016.
- La elección de plataforma (Vercel o Cloudflare) ni los límites de coste (SPEC-013). La teoría es agnóstica; los ejemplos concretos se ajustan cuando SPEC-013 decida.
- El quiz por familia. Va con el guion (SPEC-015), como en junio.
- Los PDF. Se generan al final a partir de los `.md` (constitution, apartado 4).

## 5. Requisitos

### Objetivos de aprendizaje por familia (el alumno es capaz de…)
Son los objetivos R1–R7 de SPEC-010, repartidos por familia:
- **F1 (R1):** explicar para qué sirve una rama, distinguir un commit con sentido de uno inútil y describir qué tiene que tener un buen Pull Request y qué mira quien lo revisa.
- **F2 (R2, R7):** explicar la diferencia entre development, staging y production; decir qué variables y secretos van en cada uno y por qué nunca en el código; identificar los secretos de su propio producto.
- **F3 (R3, R6):** leer un workflow sencillo de GitHub Actions y contar en voz alta qué pasa desde que se abre un PR hasta que el cambio llega a producción; decir qué fase del proceso puede delegar en un agente y cuál no.
- **F4 (R4, R5, R7):** aplicar una checklist de go-live y tomar la decisión de salir o no; explicar la diferencia entre rollback y revert y cuándo usar cada uno; decir qué tres señales vigilar tras salir.

### Formato (heredado de junio, con los ajustes de la retro)
- **R1. Ficheros:** 8 ficheros en `sesiones/2026-11-git-deploy/Teoria/`:
  - `familiaN_<slug>_alumnos.md` (N = 1–4);
  - `Formador/familiaN_<slug>_profundo.md`;
  - con los mismos sufijos que en junio (constitution, apartado 4).
- **R2. Estructura por familia (alumnos).** Basada en la de junio, recortada a lo esencial:
  1. Antes de entrar (≤ 3 términos con analogía no técnica, constitution 2.2);
  2. Para qué le importa a un PM (2.1);
  3. Las ideas clave (**máximo 3**, constitution 2.3);
  4. Cómo se ve en el producto demo;
  5. Caso real con fuente;
  6. El factor agente IA (qué hace bien el squad y qué no delegar);
  7. Lo que el PM se lleva;
  8. Fuentes.
- **R3. La versión formador aporta algo de verdad, no es una copia.** Añade a la de alumnos:
  - intención pedagógica;
  - preguntas para lanzar en el chat;
  - errores de comprensión esperados y cómo resolverlos;
  - el enlace con la demo ("en este punto enseñas…");
  - el plan B si falla la demo de ese bloque.
- **R4. Extensión orientativa:**
  - versión alumnos de unas 150–200 líneas por familia, la mitad que en junio;
  - versión formador como versión alumnos + 50–100 líneas.
- **R5. Casos reales.** 1–2 por familia, con fuente y fecha verificables (constitution 5.4). Sin fuente, no entran.
- **R6. Lenguaje de PM.** Cada término técnico se explica la primera vez que aparece. Se muestran comandos y fragmentos de YAML solo como ilustración, nunca como algo a memorizar (constitution 2.5).
- **R7. Mapa para specs posteriores.** Al final de cada familia (versión formador), una tabla "concepto → qué debe tener el producto demo → fase del squad".
- **R8. Coherencia con la escaleta.** Cada familia cabe en el tiempo de su bloque de SPEC-010 (anexo A): F1 50 min, F2 40, F3 35+25, F4 30. Si una idea no cabe, se recorta.

## 6. Criterios de aceptación
- [ ] CA1. Existen los 8 ficheros de R1 y cada familia de alumnos sigue la estructura de R2.
- [ ] CA2. Ninguna familia tiene más de 3 ideas clave. El "Antes de entrar" tiene ≤ 3 términos.
- [ ] CA3. Cada objetivo de aprendizaje del apartado 5 aparece cubierto en su familia. Lo comprueba `/sdd-review`.
- [ ] CA4. Cada caso real y cada cifra lleva fuente y fecha comprobables.
- [ ] CA5. La versión formador incluye los elementos de R3 en las 4 familias y la tabla de R7.
- [ ] CA6. La extensión está dentro de R4, o la desviación está justificada.
- [ ] CA7. El solape con la familia 4 de la sesión de seguridad (configuración, CORS, endpoints expuestos) está delimitado: qué se trata aquí, qué se deja para el 11-dic y cómo se anuncia el puente.
- [ ] CA8. Jaime revisa y valida las 4 familias (constitution 5.3).

## 7. Restricciones (constitution)
- 2.1 "para qué" antes del "qué" · 2.2 "Antes de entrar" · 2.3 máximo 3 ideas · 2.5 lenguaje de PM.
- 2.6, excepción: todo se ilustra sobre el producto de ejemplo común.
- 5.3 el formador decide · 5.4 nada de inventar datos.
- Apartado 4, convenciones: `.md` como fuente y sufijos `_alumnos` / `_profundo`.

## 8. Preguntas abiertas (resueltas el 20-oct, con las propuestas por defecto)
- [x] **Casos reales:** casos públicos verificados con fuente y fecha. Si Jaime aporta casos propios, se añaden en la revisión (CA8).
- [x] **Nivel de partida en Git:** cero ("Lovable hace los commits por mí"). Se ajusta si se sabe qué vieron con Fito.
- [x] **Profundidad de F3:** leer un workflow, con 3 ideas. Sin entrar en jobs, steps ni triggers como conceptos que haya que dominar.
- [x] **Staging en F2:** se explica el concepto; el "cómo" lo decide SPEC-013.
- [x] **Solape con el 11-dic:** F2 = dónde viven los secretos según el entorno; seguridad = qué pasa cuando se filtran. F4 no entra en CORS ni en endpoints expuestos y deja el puente al check de seguridad en el CI.
- [x] **Versión formador:** ficheros aparte (convención de junio), pero de verdad más rica (R3).

## 9. Hallazgos fuera de alcance
- La versión formador de junio es casi una copia de la de alumnos (`familia1_credenciales_profundo.md`, 337 líneas, frente a `familia1_credenciales_alumnos.md`, 304). Conviene tenerlo en cuenta en SPEC-021, al rehacer las familias 3 y 4.
- El "Antes de entrar" de junio vive solo en el guion, no en la teoría. Mismo comentario para SPEC-021.
