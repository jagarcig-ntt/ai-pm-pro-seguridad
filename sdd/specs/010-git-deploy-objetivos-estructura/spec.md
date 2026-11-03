# SPEC-010 · Git/Deploy: objetivos de aprendizaje y estructura de 4h

| Campo | Valor |
|---|---|
| Estado | borrador **v4** (2-nov) · la v3 aprobada el 20-oct queda sustituida |
| Sesión | 2026-11 Git/Deploy (sábado 21-nov · 10:00–14:00 · Zoom) |
| Fecha límite | 2026-11-06 (antes de la reunión con Gema y el entrenador) |
| Depende de | SPEC-018 (flujo Lovable validado) · SPEC-019 (producto Lovable de la sesión) · SPEC-014 (teoría) · constitution v1.5 |
| Alimenta | SPEC-013 (requisitos previos), SPEC-015 (guion), SPEC-016 (portal), SPEC-017 (squad) |
| Responsable | Jaime García · coordinación: Gema y el entrenador de las sesiones de construcción |

> **Cambios de la v4 (2-nov):**
> - **La práctica pasa a hacerse sobre el producto de Lovable de cada alumno.** El objetivo es que todos salgan con **su producto en staging y en producción**.
> - Lo hace viable SPEC-018: todos construyen con **Lovable** (misma plantilla), y se ha probado de punta a punta un proyecto real:
>   - Lovable trabaja por ramas y, con `main` protegida, desvía los cambios a `lovable-sync`;
>   - el CI/CD (Bun, compilación y Cloudflare Workers) publica cada PR en una preview y cada merge en producción.
>
>   Ver `sdd/specs/018-git-deploy-flujo-lovable/notas.md`.
> - **Estructura:** primero la teoría de las 4 familias (SPEC-014) y después dos prácticas: gestión de cambios y CI/CD.
> - **El producto de demo es el proyecto de Lovable `feedback-hub`** (SPEC-019). FeedbackHub (SPEC-011/012) se retira el 3-nov.
> - Constitution v1.5: criterios 2.6 y 2.9.

## 1. Problema / necesidad
- Es la bisagra del programa entre construir el producto y lanzarlo. Unos 12 PMs llegan con un producto propio **construido en Lovable**, con GitHub y Supabase (propuesta del entrenador, correo de Gema del 30-oct).
- Hoy Lovable escribe directamente en `main`, sin PR ni revisión, con commits tipo "Changes", y publica con su botón *Publish* en un solo entorno (`notas.md` de SPEC-018, O1).
- Les falta el criterio y el montaje profesional:
  - trabajar con ramas y PR;
  - separar entornos;
  - automatizar el despliegue;
  - decidir cuándo algo sale.
- Con un stack común, el montaje se puede hacer **en la sesión, sobre su producto**, con una única herramienta probada por el formador.

## 2. Objetivo
Dejar aprobados los objetivos de aprendizaje y la escaleta de 240 min de la nueva estructura.

**Criterio de éxito de la sesión** (constitution 2.9):
- cada alumno sale con **su producto de Lovable en staging y en producción**;
- publicado por **CI/CD desde GitHub**;
- con **`main` protegida**;
- y con **su primer cambio entrado por Pull Request**.

Quien no lo consiga en la sesión lo cierra en el reto posterior, con la guía y el squad.

## 3. Para quién
- **Alumnos (PMs):** salir con su producto profesionalizado y entendiendo cada paso. No memorizar comandos.
- **Jaime:** una estructura viable en Zoom para 12 personas a la vez, con planes B claros.
- **Gema y el entrenador:** saber qué deben traer los alumnos (requisitos previos) y qué cambia en sus sesiones de construcción.

## 4. Alcance
**Incluye:**
- objetivos;
- escaleta (anexo A);
- reparto entre teoría, demo y práctica;
- entregable visible por bloque;
- requisitos previos que la sesión necesita (el detalle va en SPEC-013);
- el papel del squad;
- planes B;
- reto posterior y puente al 11-dic.

**No incluye:** el texto de la teoría (SPEC-014, hecha), el guion minuto a minuto (SPEC-015), el portal (SPEC-016), el squad (SPEC-017) ni la guía de requisitos previos (SPEC-013).

## 5. Requisitos

### Objetivos de aprendizaje (al terminar, el alumno es capaz de…)
- **R1. Git profesional:** trabajar en una rama, entender la historia de commits y abrir, revisar y aprobar un Pull Request.
- **R2. Lovable por ramas:** conectar una rama de trabajo en Lovable y entender qué hace Lovable cuando `main` está protegida (`lovable-sync`).
- **R3. Entornos:** explicar development, staging y production y dónde viven las variables y los secretos de su producto, sin que ninguno quede en el código.
- **R4. CI/CD:** leer los dos workflows y explicar qué pasa desde que abre un PR hasta que el cambio llega a producción.
- **R5. Go-live y recuperación:** aplicar la checklist de "¿listo para producción?" a su producto y saber volver atrás (rollback o revert).
- **R6. Delegar con criterio:** usar el squad para montar el repo y el despliegue, sabiendo qué hace y qué no delegar.
- **R7. Hacerlo en su producto:** su repo con `main` protegida, los workflows, los secretos y sus URL de staging y producción.

### Estructura
- R8. La escaleta suma 240 min, con al menos un 10 % de colchón, tramos de un máximo de 75 min sin pausa, un 40 % o más de práctica o interacción, como máximo 3 ideas por bloque y ningún tramo expositivo de más de 12 min sin interacción (criterios 2.3, 2.7, 2.8 y 2.12).
- R9. **Teoría con ejemplo real:** cada familia se ilustra en pantalla con el proyecto de Lovable `feedback-hub` (SPEC-019): checks, preview, rollback y ramas de demo.
- R10. **Práctica sobre su producto, con pasos cerrados y verificables.** Cada paso tiene un "¿lo tienes?" en el chat y un punto de control. Lo que dependa de cuentas externas (Cloudflare, token, secretos) debe llegar **preparado de casa** (requisitos previos).
- R11. **Una sola herramienta para todos:**
  - los 2 workflows probados en SPEC-018 (Bun, compilación, `wrangler deploy` y `versions upload --preview-alias`);
  - la plantilla de PR;
  - la guía.

  El squad (SPEC-017) los instala por el alumno si lo pide.
- R12. Herramienta que funciona a la primera y kit para el día siguiente (criterios 2.10 y 2.11): workflows, guía paso a paso, checklist de go-live y chuleta de Git.
- R13. **Reto posterior:** cerrar lo que no dé tiempo y separar la base de datos de staging si no se hizo. Puente al 11-dic: "el día 11 añadimos el check de seguridad a vuestro CI".

## 6. Criterios de aceptación
- [ ] CA1. Cada objetivo R1–R7 está asignado a al menos un bloque con demo o práctica y una verificación.
- [ ] CA2. La escaleta suma exactamente 240 min y cumple R8. Lo comprueba `/sdd-review`.
- [ ] CA3. Cada bloque declara qué hace Jaime, qué hace el alumno y su entregable visible.
- [ ] CA4. Hay un plan B para los fallos más probables:
  - el alumno llega sin requisitos previos → sigue la práctica sobre su copia (fork) de `feedback-hub` (el check funciona sin secretos) y monta su producto en el reto;
  - falla el CI/CD en su repo → el squad diagnostica, o se usa el despliegue manual con `wrangler` como paso intermedio;
  - falla la demo en vivo → PR y despliegues ya ejecutados en `feedback-hub` (ramas de demo de SPEC-019), más capturas;
  - el alumno se queda atrás → cada práctica tiene un punto de control (por ejemplo, "PR fusionado") desde el que retomar.
- [ ] CA5. Las decisiones abiertas del apartado 8 están cerradas o tienen plan, incluidas las que dependen de la reunión con Gema y el entrenador.
- [ ] CA6. Jaime valida la escaleta, y es coherente con `propuesta-reunion.md`.

## 7. Restricciones (constitution)
2.6 (práctica sobre su producto, con stack común) · 2.9 (nuevo criterio de éxito) · 3.1 (Lovable, GitHub, Supabase y Cloudflare) · 3.2 coste 0 · 3.3 plan B probado · 2.5 lenguaje de PM.

## 8. Preguntas abiertas
- [ ] **⚠️ Repos privados y protección de `main`.** Lovable crea el repo **privado** por defecto (visto en SPEC-018). En el plan gratuito de GitHub, los *rulesets* en repos privados pueden no estar disponibles; en la prueba se usó un repo público. Opciones:
  - (a) pedir que hagan el repo **público**, si el producto no tiene secretos en el código (debe ser así: constitution 3.4);
  - (b) proteger `main` solo si su plan lo permite y, si no, trabajar por ramas por disciplina, sin bloqueo técnico.

  **Hay que verificarlo antes de cerrar los requisitos previos (SPEC-013).**
  - *Investigación (2-nov):*
    - GitHub Docs (versión Enterprise Server 3.17): los rulesets están *"available in public repositories with GitHub Free… and in public and private repositories with GitHub Pro, GitHub Team…"* (https://docs.github.com/en/enterprise-server@3.17/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets).
    - La versión github.com de la página no lo dice de forma explícita.
    - En el foro de GitHub, un usuario cuenta que en privado con Free se pueden crear pero **no se aplican** (https://github.com/orgs/community/discussions/184363).
    - **Conclusión provisional:** en repos privados con GitHub Free, la protección de `main` probablemente **no se aplica**. **Confirmación práctica pendiente:** crear un ruleset en un repo privado de prueba y ver si GitHub avisa de que no se aplicará.
- [x] **Base de datos de staging → compartida en la sesión** (decisión de Jaime, 2-nov). Staging y producción usan **el mismo proyecto de Supabase** para que la sesión quepa en 4 horas. **Separarla es parte del reto posterior** (R13).
  - Se presenta como **deuda consciente**: F2 enseña que cada entorno debería tener sus datos, y en la sesión se dice explícitamente "hoy compartimos y lo separáis en el reto". Es una buena lección de PM: decidir una deuda y apuntarla, no tenerla sin saberlo.
  - **Para la teoría (SPEC-014):** añadir esa nota en F2 (formador y alumnos) cuando se ajuste a la v4.
- [ ] **Cuenta de Cloudflare y token:** ¿llegan con la cuenta creada y el token hecho (guía), o el token se crea en la sesión? Propuesta: cuenta y token **de casa**; los secretos de GitHub, en la sesión.
- [ ] ¿Hay un ayudante en el Zoom? Con 12 personas montando su repo a la vez es lo más valioso.
- [ ] Fecha y canal del reto posterior. Propuesta: Slack del curso, hasta el 5-dic.

## 9. Hallazgos fuera de alcance
- Los proyectos de Lovable deben instalarse con **Bun** y su `bun.lock`: npm 10 falla con sus `overrides` (SPEC-018, fase 2c). Va al squad (SPEC-017) y a la guía.
- `AGENTS.md` de Lovable: no reescribir el historial de la rama conectada. El ruleset ya bloquea el force push; va también a las reglas del squad.
- **Repos privados (2-nov):** los agentes no pueden saltarse el límite del plan (lo aplica GitHub). Para SPEC-017, el squad detecta si el repo es privado y ofrece dos salidas:
  - (1) revisar que no hay secretos en el código ni en el historial → **confirmación del alumno** → hacerlo público → proteger `main`;
  - (2) mantenerlo privado: `main` → staging automático, y **producción solo al publicar una *Release*** (gratis en privados).

  Se decide tras la respuesta del entrenador.

---

## Anexo A · Escaleta v4

| Hora | Min | Bloque | Ideas (≤3) | Jaime | El alumno | Entregable |
|---|---|---|---|---|---|---|
| 10:00 | 15 | **B0 Apertura.** De "lo tengo en Lovable" a "está en producción" | Por qué importa · el mapa del día · qué os lleváis | Enseña el resultado final (un producto de Lovable con staging y producción) | En el chat: ✅ repo conectado · ✅ cuenta de Cloudflare · ✅ token | Recuento de requisitos |
| 10:15 | 25 | **T1 · F1 Git profesional** | Rama · commit con sentido · PR como punto de control | Demo en `feedback-hub`: historial de commits de Lovable ("Changes") frente a uno bueno; PR con plantilla | Preguntas en el chat (2) | — |
| 10:40 | 20 | **T2 · F2 Entornos y secretos** | Tres entornos · misma app, distinta configuración · secretos en la plataforma | Demo: variables por entorno y secretos de GitHub | Mapa de entornos de **su** producto (5 min) | Mapa de entornos |
| 11:00 | 10 | **Pausa 1** | | | | |
| 11:10 | 20 | **T3 · F3 CI/CD** | Workflow = receta · cada PR se comprueba y previsualiza · merge = producción | Demo con `feedback-hub` (Lovable): PR → check → preview → merge → producción | Preguntas en el chat | — |
| 11:30 | 15 | **T4 · F4 Go-live y volver atrás** | Checklist · rollback / revert · vigilar tras salir | Demo: rollback en Cloudflare | Checklist sobre su producto: ¿qué le falta? | Su columna de "noes" |
| 11:45 | 40 | **P1 · Gestión de cambios en su producto** | — | Guía paso a paso en pantalla | Proteger `main` → rama de trabajo en Lovable (o `lovable-sync`) → un cambio → **PR → revisar → merge** | Su primer PR fusionado |
| 12:25 | 10 | **Pausa 2** | | | | |
| 12:35 | 35 | **P2a · CI/CD en su producto** | — | Guía en pantalla; el squad, para quien lo pida | Añadir los 2 workflows (por PR) → secretos de Cloudflare en GitHub → PR → check y preview | Su URL de preview / staging |
| 13:10 | 5 | **Pausa activa** (mientras corren los primeros despliegues) | | | | |
| 13:15 | 20 | **P2b · A producción** | — | Desatasca alumno a alumno | Merge → producción → comprobar el contenido | **Su URL de producción** |
| 13:35 | 15 | **B5 Cierre** | Ronda de URL · reto · puente al 11-dic | Explica el reto y la fecha | Pega sus 2 URL en el chat | Kit descargado |
| 13:50 | 10 | **Colchón** | | | | |
| | **240** | | | | Práctica e interacción: unos 135 min (**≈56 %**). Tramos sin pausa: 60 / 75 / 35 / 45 min | |

**Plan B transversal:** quien no tenga requisitos previos o se atasque sigue P1 y P2 sobre su **copia de `feedback-hub`** (SPEC-019) y lleva su producto en el reto.

## Anexo B · Coherencia con la propuesta de la reunión
La propuesta para Gema y el entrenador (`sdd/specs/018-git-deploy-flujo-lovable/propuesta-reunion.md`) recoge esta estructura en su apartado 3. Si la reunión cambia algo (repos públicos, Supabase, ayudante), se actualiza esta spec antes de aprobarla.
