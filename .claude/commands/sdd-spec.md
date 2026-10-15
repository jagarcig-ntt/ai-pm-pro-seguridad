---
description: Crea una nueva spec SDD a partir de una necesidad (uso: /sdd-spec <NNN> <slug> <descripción>)
argument-hint: <NNN> <slug> <descripción de la necesidad>
---

Vas a crear una spec siguiendo el flujo SDD del repo.

Argumentos: $ARGUMENTS

1. Lee `sdd/constitution.md` entero y `sdd/specs/README.md` (registro de specs).
2. Si no se da número, asigna el siguiente libre del rango que corresponda:
   - `000–009` infraestructura;
   - `010–019` Git/Deploy;
   - `020–029` Seguridad v2.
3. Crea `sdd/specs/NNN-slug/spec.md` copiando `sdd/templates/spec.md` y rellénalo:
   - Problema, objetivo y audiencia, anclados en evidencias del repo (guiones, teoría, portal, contexto). Cita las rutas.
   - Requisitos numerados. Si es material pedagógico, objetivos con verbos observables.
   - Criterios de aceptación verificables.
   - Restricciones de la constitution que apliquen.
   - Preguntas abiertas: todo lo que no puedas deducir. **No inventes datos, cifras ni decisiones del formador.**
4. Estado `borrador`. Añade la fila al registro `sdd/specs/README.md`.
5. No crees plan ni tareas. No modifiques material. No hagas commits.
6. Termina con:
   - un resumen de 5 líneas;
   - las preguntas abiertas que Jaime debe responder para aprobarla;
   - el mensaje de commit sugerido.
