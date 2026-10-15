---
description: Revisa una spec implementada contra sus criterios de aceptación y la constitution (uso: /sdd-review <NNN>)
argument-hint: <NNN>
---

Spec objetivo: $ARGUMENTS

1. Lee `sdd/constitution.md` y `spec.md`, `plan.md` y `tasks.md` de `sdd/specs/<NNN>-*/`.
2. Para cada criterio de aceptación, verifícalo de verdad: abre los ficheros, cuenta los minutos del guion, comprueba que los enlaces resuelven, ejecuta scripts de verificación si existen. Marca ✅, ❌ o ⚠️ con la evidencia (ruta:línea o salida).
3. Comprueba la conformidad con la constitution:
   - "para qué" antes del "qué";
   - "Antes de entrar" con ≤ 3 términos;
   - ≤ 3 ideas por bloque;
   - ningún tramo expositivo de más de 12 min sin interacción;
   - pausas;
   - timings que suman la duración exacta;
   - coste 0;
   - plan B;
   - cifras con fuente;
   - nada de secretos reales;
   - convenciones de nombres;
   - identidad visual del portal.
4. Comprueba que todas las tareas están ☑ o justificadas como ✕.
5. Escribe el resultado en `sdd/specs/<NNN>-*/review.md`:
   - tabla de criterios;
   - incumplimientos de la constitution;
   - acciones pendientes.
6. Si todo está ✅, propone pasar la spec a `hecha`, pero no cambies el estado sin confirmación de Jaime. No hagas commits.
