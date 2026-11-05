# SPEC-010 · Git/Deploy: objetivos de aprendizaje y estructura de 4h

| Campo | Valor |
|---|---|
| Estado | borrador **v4.1** (5-nov) · la v3 aprobada el 20-oct queda sustituida |
| Sesión | 2026-11 Git/Deploy (sábado 21-nov · 10:00–14:00 · Zoom) |
| Fecha límite | 2026-11-06 (antes de la reunión con Gema y el entrenador) |
| Depende de | SPEC-018 (flujo Lovable validado) · SPEC-019 (producto Lovable de la sesión) · SPEC-014 (teoría) · constitution v1.6 |
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
> - **El producto de demo es el proyecto de Lovable `feedback-hub`** (SPEC-019). El demo anterior (FeedbackHub en Pages) se retiró el 3-nov.
> - Constitution v1.5: criterios 2.6 y 2.9.

## 1. Problema / necesidad
- Es la bisagra del programa entre construir el producto y lanzarlo. **18 alumnos** (mitad perfil técnico, mitad diseño y negocio) llegan con el esqueleto de su side project **construido en Lovable** en las sesiones de Jose (7, 13, 14 y 20-nov), con GitHub y su propio proyecto de Supabase conectado desde Lovable (correo de Gema del 4-nov y decisión de Jaime del 5-nov).
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
- cada alumno sale con **su producto de Lovable en producción, y con la preview de su PR como staging**;
- publicado por **CI/CD desde GitHub**;
- con **`main` protegida**;
- y con **su primer cambio entrado por Pull Request**.

Quien no lo consiga en la sesión lo cierra en el reto posterior, con la guía.

## 3. Para quién
- **Alumnos (PMs):** salir con su producto profesionalizado y entendiendo cada paso. No memorizar comandos.
- **Jaime:** una estructura viable en Zoom para 18 personas a la vez, con planes B claros.
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
- **R6. Delegar con criterio:** saber qué se puede delegar en agentes y qué no. El squad es opcional, para quien trabaje desde VS Code: se menciona de pasada en la web y en la sesión, y no se usa en la práctica guiada.
- **R7. Hacerlo en su producto:** su repo con `main` protegida, los workflows, los secretos y sus URL de preview y producción.

### Estructura
- R8. La escaleta suma 240 min, con al menos un 10 % de colchón, tramos de un máximo de 75 min sin pausa, un 40 % o más de práctica o interacción, como máximo 3 ideas por bloque y ningún tramo expositivo de más de 12 min sin interacción (criterios 2.3, 2.7, 2.8 y 2.12).
- R9. **Teoría con ejemplo real:** cada familia se ilustra en pantalla con el proyecto de Lovable `feedback-hub` (SPEC-019): checks, preview, rollback y ramas de demo.
- R10. **Práctica sobre su producto, con pasos cerrados y verificables.** Cada paso tiene un "¿lo tienes?" en el chat y un punto de control. Lo que dependa de cuentas externas (Supabase conectado, Cloudflare, token y secretos ya guardados en GitHub) debe llegar **preparado de casa** (requisitos previos).
- R11. **Una sola herramienta para todos:**
  - los 2 workflows probados en SPEC-018 (Bun, compilación, `wrangler deploy` y `versions upload --preview-alias`);
  - la plantilla de PR;
  - la guía.

  Todo se hace desde el navegador, sin VS Code ni terminal: los workflows se copian y pegan. El squad (SPEC-017) es un extra opcional para quien trabaje desde VS Code, y se hace lo último.
- R12. Herramienta que funciona a la primera y kit para el día siguiente (criterios 2.10 y 2.11): workflows, guía paso a paso, checklist de go-live y chuleta de Git.
- R13. **Reto posterior:** cerrar lo que no dé tiempo. Puente al 11-dic: "el día 11 añadimos el check de seguridad a vuestro CI".

## 6. Criterios de aceptación
- [ ] CA1. Cada objetivo R1–R7 está asignado a al menos un bloque con demo o práctica y una verificación.
- [ ] CA2. La escaleta suma exactamente 240 min y cumple R8. Lo comprueba `/sdd-review`.
- [ ] CA3. Cada bloque declara qué hace Jaime, qué hace el alumno y su entregable visible.
- [ ] CA4. Hay un plan B para los fallos más probables:
  - el alumno llega sin requisitos previos → sigue la práctica sobre su copia (fork) de `feedback-hub` (el check funciona sin secretos) y monta su producto en el reto;
  - falla el CI/CD en su repo → se lee el error del workflow con la guía y se resuelve en el rescate; si no da tiempo, lo cierra en el reto y conserva el *Publish* de Lovable;
  - falla la demo en vivo → PR y despliegues ya ejecutados en `feedback-hub` (ramas de demo de SPEC-019), más capturas;
  - el alumno se queda atrás → cada práctica tiene un punto de control (por ejemplo, "PR fusionado") desde el que retomar.
- [ ] CA5. Las decisiones abiertas del apartado 8 están cerradas o tienen plan, incluidas las que dependen de la reunión con Gema y el entrenador.
- [ ] CA6. Jaime valida la escaleta, y es coherente con `propuesta-reunion.md`.

## 7. Restricciones (constitution)
2.6 (práctica sobre su producto, con stack común) · 2.9 (nuevo criterio de éxito) · 3.1 (Lovable, GitHub, Supabase y Cloudflare) · 3.2 coste 0 · 3.3 plan B probado · 2.5 lenguaje de PM.

## 8. Preguntas abiertas
- [x] **Repos → públicos** (acuerdo de la llamada del 4-nov), para proteger `main` con el plan gratuito. Gema avisará de no incluir información confidencial.
- [x] **Cómo trabajan:** construcción desde Lovable, plan Pro contratado por cada alumno. Quien no pague sigue la sesión viendo la pantalla.
- [x] **Dónde viven los datos → Supabase propio de cada alumno, obligatorio** (decisión de Jaime, 5-nov). Cada alumno crea su cuenta y conecta su proyecto en *More → Connectors → Supabase* **antes de crear ninguna tabla**, sin activar el backend de Lovable (Lovable Cloud). Después todo se pide desde el chat de Lovable: escribe el SQL, pide aprobación y lo ejecuta en su Supabase (https://docs.lovable.dev/integrations/supabase, consultado el 5-nov). Quien use otro backend queda fuera del flujo probado.
  - **Motivo:** es el montaje validado en SPEC-018 y SPEC-019, y permite separar los datos más adelante. Pasar después de Lovable Cloud a Supabase propio no es automático.
  - **Jose, avisado (Slack, 5-nov).** El token que mencionó el 5-nov era solo para conectar otras herramientas y no forma parte del flujo del alumno.
- [x] **Base de datos de staging → compartida en la sesión** (decisión de Jaime, 2-nov). Staging y producción usan **el mismo proyecto de Supabase y un único modelo de datos**. Acordado con Jose (Slack, 5-nov): separarlos va más allá de un primer MVP, así que se explica como teoría y **no se pide ni en la sesión ni en el reto**. Queda como mejora opcional para quien quiera.
  - Se presenta como **deuda consciente**: F2 enseña que cada entorno debería tener sus datos, y en la sesión se dice explícitamente "hoy compartimos, y separarlo es el siguiente paso cuando el producto tenga usuarios reales". Es una buena lección de PM: decidir una deuda y apuntarla, no tenerla sin saberlo.
  - **Para la teoría (SPEC-014):** añadir esa nota en F2 (formador y alumnos) cuando se ajuste a la v4.
- [x] **Sesión solo con navegador** (Jaime, 5-nov): sin VS Code ni terminal. Los dos workflows se entregan para copiar y pegar con la guía; el squad (SPEC-017) pasa a ser un extra opcional para perfiles técnicos. R6, R11, la escaleta y los planes B ya están ajustados.
- [x] **Orden al crear el Worker** (Jaime, 5-nov): workflows directamente en `main`, la primera publicación crea el Worker y `main` se protege después. En `feedback-hub` el Worker ya existía antes del primer PR, así que este orden se valida en el ensayo solo con navegador (SPEC-019, CA9).
- [ ] **Riesgo de que el Worker no funcione a los 18** (Jaime, 5-nov). Propuesta: al ser repos públicos, compilar los 18 antes de la sesión, sin publicar nada. Hay que pedir a Gema la lista de repos.
- [x] **Cuenta de Cloudflare, token y secretos → de casa** (Jaime, 5-nov). Llegan con la cuenta creada y los dos secretos guardados en GitHub, con la guía. **Plan B si Gema no puede pedirlo:** el token sigue viniendo hecho de casa (correo del 4-nov) y los secretos se guardan al empezar P1, unos 10 min, sin compartir pantalla.
- [x] **Ayudante en el Zoom: sí** (Jaime, 5-nov). Con 18 personas montando su repo a la vez es lo más valioso. Falta saber quién es para pasarle la guía antes de la sesión.
- [ ] Fecha y canal del reto posterior. Demo Day: 12-dic, con una sesión de dudas de 2h con Fer Guirao antes. Propuesta: Slack del curso, hasta el 5-dic.
- [x] **Tokens en una sesión grabada:** al venir de casa, no aparecen en la sesión. Jaime enseña ese paso con capturas.

## 9. Hallazgos fuera de alcance
- Los proyectos de Lovable deben instalarse con **Bun** y su `bun.lock`: npm 10 falla con sus `overrides` (SPEC-018, fase 2c). Va al squad (SPEC-017) y a la guía.
- `AGENTS.md` de Lovable: no reescribir el historial de la rama conectada. El ruleset ya bloquea el force push; va también a las reglas del squad.
- **Repos privados (2-nov):** los agentes no pueden saltarse el límite del plan (lo aplica GitHub). Para SPEC-017, el squad detecta si el repo es privado y ofrece dos salidas:
  - (1) revisar que no hay secretos en el código ni en el historial → **confirmación del alumno** → hacerlo público → proteger `main`;
  - (2) mantenerlo privado: `main` → staging automático, y **producción solo al publicar una *Release*** (gratis en privados).

  Se decide tras la respuesta del entrenador.

---

## Anexo A · Escaleta v4.1 (5-nov)

Validada por Jaime el 5-nov; se afina con el portal y el guion. **Idea central:** todos en producción a las 12:00, un solo ciclo de PR y lo arriesgado primero. El mapa de entornos y el ejercicio de checklist pasan al kit.

| Hora | Min | Bloque | Ideas (≤3) | Jaime | El alumno | Entregable |
|---|---|---|---|---|---|---|
| 10:00 | 15 | **B0 Apertura.** De "lo tengo en Lovable" a "está en producción" | Por qué importa · el mapa del día · qué os lleváis | Enseña el resultado final (un producto de Lovable con preview y producción) | En el chat: ✅ repo público · ✅ Supabase conectado · ✅ secretos guardados en GitHub | Recuento de requisitos |
| 10:15 | 20 | **T1 · F1 Git profesional** | Rama · commit con sentido · PR como punto de control | Demo en `feedback-hub`: historial de commits de Lovable ("Changes") frente a uno bueno; PR con plantilla | Preguntas en el chat (2) | — |
| 10:35 | 15 | **T2 · F2 Entornos y secretos** | Tres entornos · misma app, distinta configuración · secretos en la plataforma | Demo con capturas: secretos ya guardados. Avisa de que staging y producción comparten datos | Pregunta en el chat | — |
| 10:50 | 15 | **T3 · F3 CI/CD** | Workflow = receta · cada PR se comprueba y previsualiza · merge = producción | Demo con `feedback-hub`: PR → check → preview → merge → producción | Preguntas en el chat | — |
| 11:05 | 10 | **Pausa 1** | | | | |
| 11:15 | 45 | **P1 · Primer despliegue** | — | Guía paso a paso en pantalla | Pegar los 2 workflows en `main` desde GitHub → la Action publica y crea el Worker → comprobar la web | **Su URL de producción** |
| 12:00 | 10 | **Pausa 2** | | | | |
| 12:10 | 45 | **P2 · Gestión de cambios** | — | Guía en pantalla; desatasca alumno a alumno | Proteger `main` → cambio en Lovable (rama o `lovable-sync`) → **PR → check → preview → merge** → producción actualizada | **Su URL de preview** y su primer PR fusionado |
| 12:55 | 15 | **T4 · F4 Go-live y volver atrás** | Checklist · rollback / revert · vigilar tras salir | Demo: rollback en Cloudflare. Los rezagados siguen con P2 | Preguntas en el chat | — |
| 13:10 | 5 | **Pausa activa** | | | | |
| 13:15 | 25 | **Rescate** | — | Alumno a alumno | Quien va atrasado cierra P1 y P2; quien acabó crea la rama `staging` o repasa la checklist | Sus 2 URL |
| 13:40 | 15 | **B5 Cierre** | Ronda de URL · reto · puente al 11-dic | Explica el reto y la fecha | Pega sus 2 URL en el chat | Kit descargado |
| 13:55 | 5 | **Colchón** | | | | |
| | **240** | | | | Práctica: 115 min (**≈48 %**). Teoría: 65 min. Margen: el rescate de 25 min y 5 de colchón (12,5 %). Tramos sin pausa: 65 / 45 / 60 / 45 min | |

**Plan B transversal:** quien no tenga requisitos previos o se atasque sigue P1 y P2 sobre su **copia de `feedback-hub`** (SPEC-019) y lleva su producto en el reto.

## Anexo B · Coherencia con la propuesta de la reunión
La propuesta para Gema y el entrenador (`sdd/specs/018-git-deploy-flujo-lovable/propuesta-reunion.md`) recoge esta estructura en su apartado 3. Si la reunión cambia algo (repos públicos, Supabase, ayudante), se actualiza esta spec antes de aprobarla.
