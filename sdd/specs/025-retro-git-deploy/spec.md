# SPEC-025 · Retro de la sesión Git/Deploy del 21-nov

| Campo | Valor |
|---|---|
| Estado | borrador |
| Sesión | 2026-11 Git/Deploy (retro) · alimenta 2026-12 Seguridad v2 y futuras ediciones |
| Fecha límite | 2026-11-27 (propuesta) |
| Depende de | — |
| Responsable | Jaime García |

> **Numeración.** Va en el rango 02x por decisión de Jaime (23-nov), aunque analiza una sesión 01x: sus lecciones se aplican sobre todo a la sesión del 11-dic.

## 1. Problema / necesidad
La sesión del 21-nov cumplió en gran parte su criterio de éxito (constitution 2.9): según Jaime, todos menos una persona dejaron su producto en producción. Aun así, la percepción que llegó por coordinación fue de una sesión "dura e intensa", muy lejos del 9,29 de junio. Hay tres fuentes:
- la encuesta anonimizada que envió Gema el 23-nov (8 respuestas; CSV fuera del repo, `Feedback_4.5_Jaime_Garcia.csv`);
- la percepción del formador y de coordinación (conversación con Gema, 23-nov);
- el guion impartido (`sesiones/2026-11-git-deploy/Teoria/GUION-SESION.md`, escaleta v5).

Además, la decisión sobre si se imparte la sesión del 11-dic (y en qué formato) está abierta, y necesita estas evidencias.

## 2. Objetivo
Un documento de retro (`retro.md`) que separe lo que dice la encuesta de lo que es percepción, identifique las causas de la dureza percibida y proponga decisiones concretas, cada una enlazada a la spec que la implementaría.

## 3. Para quién
- Jaime, para la conversación con Gema y Manu sobre el 11-dic y para diseñar cualquier sesión práctica futura.
- Los agentes que trabajen en SPEC-021 a SPEC-024, como contexto obligatorio si la sesión del 11-dic sigue adelante.

## 4. Alcance
**Incluye:** análisis de la encuesta, contraste con la estructura del guion (formato de las prácticas, tiempos de teoría) y decisiones propuestas.

**No incluye:**
- Rehacer el material de Git/Deploy (la sesión no tiene una repetición prevista).
- Decidir si se imparte la sesión del 11-dic: lo deciden Gema y Manu.
- Subir la encuesta en bruto al repo (ver la pregunta abierta).

## 5. Requisitos
- R1. Separar lo que dice la encuesta [E] de la percepción del formador o de coordinación [F] y del análisis del guion [G].
- R2. Agrupar los comentarios por patrón y contar cuántas respuestas apoyan cada uno.
- R3. Contrastar los patrones con el diseño del guion (demo completa → salas, minutos de teoría por familia).
- R4. Proponer decisiones concretas, cada una asignada a una spec o a un cambio de la constitution.
- R5. Citar a los alumnos sin datos identificables y parafrasear los comentarios sobre compañeros.

## 6. Criterios de aceptación
- [ ] CA1. `retro.md` sigue `sdd/templates/retro.md`.
- [ ] CA2. Cada afirmación cita su fuente: [E], [G] (con línea) o [F].
- [ ] CA3. Cada decisión de la sección 7 tiene una spec o un cambio de constitution asignado, o queda marcada como condicionada a la decisión sobre el 11-dic.
- [ ] CA4. Jaime valida el documento.

## 7. Restricciones (constitution)
Criterios 2.3 (máximo 3 ideas por bloque), 2.7 (ritmo), 2.9 (criterio de éxito de Git), 5.3 (el formador decide) y 5.4 (no inventar datos).

## 8. Preguntas abiertas
- [ ] ¿Cuántos tiempos reales se desviaron del guion? Sobre todo: ¿cuánto duraron la demo 1 y la práctica 1? ¿Se usó el rescate?
- [ ] La encuesta dice que la práctica 2 se hizo "al mismo tiempo" que tú, pero el guion prevé demo 2 y luego salas [G, líneas 434–497]. ¿Cambiaste el formato sobre la marcha?
- [ ] ¿Qué era el "bonus" que anunciaste al inicio y no dio tiempo a hacer? No aparece en el guion.
- [ ] ¿Quién es la persona que no llegó a producción y en qué paso se quedó? ¿Hay más alumnos sin el PR?
- [ ] ¿Hay nota global oficial de Hero Camp (con las 18 personas) o solo estas 8 respuestas?
- [ ] ¿Guardamos la encuesta en bruto en el repo, como en junio (`Feedback-Sesion.md`)? Si el repo es público, propongo no hacerlo, o hacerlo sin los comentarios sobre compañeros.

## 9. Hallazgos fuera de alcance
- El registro de specs sigue marcando SPEC-010, 013, 014 v2, 015 y 016 como en curso o en borrador, aunque la sesión ya se impartió.
- La constitution (§0) sigue diciendo "En diseño · prioridad" para la sesión del 21-nov.
