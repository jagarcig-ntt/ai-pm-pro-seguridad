# RETRO · Seguridad para PMs · 26 jun 2026

*Spec: SPEC-020 · Fuentes: [E] encuesta y feedback de Maribel (`sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Feedback-Sesion.md`) · [G] guion (`sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/GUION-SESION-COMPLETO.md`) · [F] percepción del formador*

> **Borrador.** Pendiente de validación de Jaime (SPEC-020 CA4).

## 1. Datos
| Indicador | Valor |
|---|---|
| Nota global | **9,29 / 10** [E] |
| Asistentes / respuestas | 11 alumnos · 7 respuestas en bruto [E] |
| Nota por bloque | **No disponible.** La encuesta no desglosa por bloques. |
| Formato | 3h por Zoom, 17:00–20:00, guion de 195 min [G] |

## 2. Qué funcionó (mantener)
- **El pipeline de agentes.** Es lo más destacado: "Brutaaaal el pipeline compartido", "el security checker agent funciona a la primera" [E].
- **Sesión guiada, paso a paso.** "Súper fácil de seguir para entender conceptos nada fáciles", "muy trabajado y pensado para que cale" [E].
- **El kit de seguridad como entregable.** "Me llevo un kit completo de seguridad listo para aplicar", "kit de supervivencia de regalo" [E].
- **El patrón de bloque.** "Antes de entrar", concepto, caso real, demo, "lo que el PM se lleva" [G]. Coincide con lo que se valoró como guiado.

→ Se ha incorporado a la constitution v1.1 como criterios 2.10 (herramienta que funciona a la primera) y 2.11 (kit listo para aplicar).

## 3. Qué simplificar
Las familias 3 y 4 [F] tienen bastantes más ideas de las que permite el criterio 2.3 (máximo 3 por bloque).

**Familia 3: Datos sensibles** (min 93–146, unos 50 min). Tiene 9 ideas distintas [G, líneas 1030–1343]:
1. Dos tipos de fallos.
2. El caso Samsung.
3. Tres vectores de fuga.
4. Qué es PII.
5. El RGPD desde el día uno.
6. Las 72 horas.
7. El razonamiento de "solo estoy probando".
8. Tres reglas operativas.
9. El coste de una brecha.

Varias de ellas son listas en sí mismas ("tres vectores", "tres reglas"). Además mezcla dos ejes distintos: el técnico (logs, fixtures, respuestas de API) y el legal (RGPD, 72h).

**Familia 4: Configuración** (min 146–175, unos 30 min). Tiene 7 ideas en el bloque más corto de la sesión [G, líneas 1445–1656]:
1. Tres patrones.
2. El caso CBIZ.
3. CORS en profundidad.
4. Cabeceras HTTP.
5. Endpoints ocultos.
6. Nadie es dueño de la configuración.
7. Mimetismo del agente.

Es el contenido más técnico (CORS y cabeceras) metido en el menor tiempo y al final de la sesión, cuando hay más fatiga. Desde la pausa del minuto 88–93, F3 y F4 suman unos 80 minutos seguidos sin descanso.

## 4. Qué ampliar
- **Tiempo de práctica en F3 y F4.** Pasar de demo a ejercicio. Por ejemplo, en F3: "audita los logs y fixtures de tu producto".
- **Dinamismo.** Hubo un comentario aislado: "aburrido pero necesario / poco dinámico" [E]. Con 4h, apuntar a un 40 % de práctica (criterio 2.12).
- **Que el pipeline se use sobre su propio producto.** Los alumnos ya tendrán su producto desplegado tras el 21-nov, y ejecutar el pipeline como check en un PR conecta las dos sesiones.

## 5. Qué ha quedado obsoleto (a verificar en SPEC-021 y SPEC-022)
- Cifras y casos con fecha (Samsung, CBIZ, CVE-2025-48757, 82K$ en 48h): verificar su vigencia y si hay casos más recientes.
- `sesiones/2026-12-seguridad-v2/HeroCamp-Product/.claude/CLAUDE.md`: desde la línea 63 describe un CLI en TypeScript que no existe.
- `feedbackhub/README` apunta a `/docs/repo-trampa.md`, que no existe.
- Los modelos y la configuración de los agentes (`model: sonnet`): revisar si conviene actualizarlos.

## 6. Incidencias de ejecución (análisis del guion)
- **Duración.** El guion dice "3 horas" pero suma 195 min [G].
- **Timings incoherentes** entre la tabla de contenidos, las cabeceras, los quizzes y `CHEAT-SHEET.md`:
  - F1 aparece como min 8–40 en la tabla de contenidos y como 8–33 en las cabeceras;
  - el quiz de F1 tiene la cabecera en el min 33 pero las preguntas marcadas en el 27–31.
- **Una sección fuera de orden.** "MINUTO 109: Cómo se arregla" aparece después de "MINUTO 121" [G, línea 1266].
- **Pendiente de Jaime:** cuánto duraron realmente los bloques el día de la sesión.

## 7. Decisiones para la v2
| Decisión | Spec |
|---|---|
| F3 se divide en dos ejes, "dónde se escapan los datos" (técnico, con ejercicio) y "qué te exige la ley" (RGPD y 72h, máximo 3 ideas), con unos 60 min y una práctica | SPEC-021 |
| F4 baja a 3 ideas (endpoints expuestos, CORS explicado con analogía, mimetismo del agente). Las cabeceras pasan a la checklist del kit. Unos 50 min | SPEC-021 |
| Una pausa antes de F3 y otra antes de F4; ningún tramo de más de 75 min sin descanso | SPEC-023 |
| Los timings salen de una sola fuente (el guion) y suman 240 min | SPEC-023 |
| Verificar o actualizar todas las cifras y casos con fuente y fecha | SPEC-021 |
| Limpiar `CLAUDE.md` del pipeline y `repo-trampa.md`; ejecutar el pipeline como check de PR en GitHub Actions | SPEC-022 |
| El kit de seguridad se actualiza e incluye la checklist de configuración | SPEC-021 |
