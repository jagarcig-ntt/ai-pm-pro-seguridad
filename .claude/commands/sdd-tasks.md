---
description: Descompone el plan de una spec en tareas ejecutables (uso: /sdd-tasks <NNN>)
argument-hint: <NNN>
---

Spec objetivo: $ARGUMENTS

1. Lee `sdd/constitution.md`, `spec.md` y `plan.md` de `sdd/specs/<NNN>-*/`. Si el plan no está aprobado, detente.
2. Crea `tasks.md` a partir de `sdd/templates/tasks.md`. Cada tarea:
   - dura ≤ 2h;
   - declara los ficheros que toca;
   - declara sus dependencias;
   - produce algo revisable.

   Marca con `[P]` las que pueden ir en paralelo. Incluye al final las tareas de verificación del plan (ensayo, cuenta limpia, navegador).
3. Ordena las tareas para que lo más arriesgado o lo que más bloquea vaya primero.
4. Pon la spec en estado `en curso` en `spec.md` y en el registro.
5. No ejecutes ninguna tarea ni hagas commits. Termina con la lista de tareas y el mensaje de commit sugerido.

Para ejecutar una tarea después: "Ejecuta SPEC-NNN T0x".
- Lee la constitution, la spec, el plan y las tareas.
- Toca solo los ficheros declarados.
- Marca la tarea como ☑.
- Añade el commit propuesto en `tasks.md`.
- No hagas commit: lo hace Jaime.
