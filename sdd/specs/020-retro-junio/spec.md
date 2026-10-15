# SPEC-020 · Retro de la sesión de seguridad del 26-jun

| Campo | Valor |
|---|---|
| Estado | borrador |
| Sesión | 2026-12 Seguridad v2 |
| Fecha límite | 2026-11-09 |
| Depende de | — |
| Responsable | Jaime García |

## 1. Problema / necesidad
La v2 del 11-dic debe partir de evidencias, no de impresiones. Hay tres fuentes:
- el feedback de coordinación y la encuesta en bruto (`sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Feedback-Sesion.md`, 7 respuestas);
- la percepción del formador (las familias 3 y 4 se entendieron peor);
- el propio guion de junio.

## 2. Objetivo
Un documento de retro (`retro.md`) que diga qué mantener, qué simplificar, qué ampliar y qué está obsoleto, con cada decisión enlazada a la spec que la implementa.

## 3. Para quién
- Jaime, para diseñar la v2.
- Los agentes que trabajen en las SPEC-021 a SPEC-024, como contexto obligatorio.

## 4. Alcance
**Incluye:** análisis del feedback, análisis estructural del guion (densidad y timings por bloque) y decisiones para la v2.

**No incluye:** reescribir material (SPEC-021 a SPEC-024) ni verificar la vigencia de cada cifra y caso (SPEC-021).

## 5. Requisitos
- R1. Separar lo que dice la encuesta de lo que es percepción del formador.
- R2. Medir la densidad real de las familias 3 y 4: ideas por bloque y minutos.
- R3. Listar las incoherencias de timing del guion de junio.
- R4. Proponer decisiones concretas para la v2, cada una asignada a una spec.

## 6. Criterios de aceptación
- [ ] CA1. `retro.md` sigue `sdd/templates/retro.md`.
- [ ] CA2. Cada afirmación cita su fuente: encuesta, guion (con línea) o formador.
- [ ] CA3. Cada decisión de la sección 7 tiene una spec asignada.
- [ ] CA4. Jaime valida el documento.

## 7. Restricciones (constitution)
Criterios 2.3 (máximo 3 ideas por bloque), 2.8 (timings honestos) y 5.4 (no inventar datos).

## 8. Preguntas abiertas
- [ ] ¿Hay nota por bloque o algún comentario oral de los alumnos sobre las familias 3 y 4? La encuesta no lo recoge.
- [ ] ¿Cuánto duraron de verdad las familias 3 y 4 frente a lo previsto en el guion?

## 9. Hallazgos fuera de alcance
- La memoria del proyecto decía "bloques 3 y 4 peor valorados" como si fuera un dato de la encuesta. No lo es (ver retro).
