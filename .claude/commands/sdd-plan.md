---
description: Diseña el plan de implementación de una spec aprobada (uso: /sdd-plan <NNN>)
argument-hint: <NNN>
---

Spec objetivo: $ARGUMENTS

1. Lee `sdd/constitution.md` y `sdd/specs/<NNN>-*/spec.md`.
   - Si la spec no está en estado `aprobada`, detente y dilo.
   - Si tiene preguntas abiertas sin responder que bloqueen el diseño, enuméralas y detente.
2. Explora el material existente que se pueda reutilizar: portal de junio, `assets/`, guiones, teoría, productos de prueba, pipeline de agentes. Prefiere reutilizar a crear.
3. Crea `plan.md` en la misma carpeta a partir de `sdd/templates/plan.md`:
   - enfoque;
   - diseño (con minutos si es material de sesión);
   - tabla de ficheros;
   - riesgos con su plan B;
   - verificación de cada criterio de aceptación.
4. Comprueba que el plan respeta la constitution:
   - máximo 3 ideas por bloque;
   - coste 0;
   - plan B para cada demo;
   - timings que suman la duración exacta.

   Señala cualquier tensión.
5. Actualiza el registro. No crees tareas, no modifiques material, no hagas commits.
6. Termina con un resumen y el mensaje de commit sugerido.
