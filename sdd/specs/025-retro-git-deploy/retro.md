# RETRO · Git, Deployment y Producción · 21 nov 2026

*Spec: SPEC-025 · Fuentes: [E] encuesta anonimizada enviada por Gema el 23-nov (8 respuestas, CSV fuera del repo) · [G] guion (`sesiones/2026-11-git-deploy/Teoria/GUION-SESION.md`) · [F] percepción del formador y de coordinación*

> **Borrador.** Pendiente de validación por Jaime (SPEC-025 CA4).

## 1. Datos
| Indicador | Valor |
|---|---|
| Notas | 3 · 5 · 6 · 7 · 7 · 8 · 9 · 9 [E] |
| Media / mediana | **6,75 / 7** (calculadas sobre las 8 respuestas) |
| Asistentes / respuestas | 18 alumnos [G, línea 3] · 8 respuestas (44 %) [E] |
| Criterio de éxito (2.9) | Todos menos una persona con su producto en producción [F] |
| Nota por bloque | **No disponible.** La encuesta no desglosa por bloques. |
| Formato | 4h por Zoom, 3 rondas de teoría → demo → salas de 6, rescate y cierre [G, líneas 15–30] |

Referencia: junio, 9,29 con 7 respuestas de 11 (SPEC-020). No son comparables directamente: otro contenido, otra promoción y una sesión mucho más práctica.

## 2. Qué funcionó (mantener)
- **El formador.** Ningún comentario critica las explicaciones. Varios las destacan: "explicó muy bien diferencias de herramientas y casuística", "contenido técnico muy bien explicado", "muy cercano, amable", "valorar su actitud positiva" (4 respuestas) [E].
- **El portal con todos los pasos**, para revisarlo en cualquier momento, con imágenes o vídeos en algunos pasos (1 respuesta explícita) [E].
- **Las PR y GitHub como aprendizaje** valioso: "hacer las PR es muy chulo", "poder usar GitHub" (2 respuestas) [E].
- **La temática**, importante y necesaria en esta parte del curso (3 respuestas) [E].
- **El criterio de éxito se cumplió** casi al completo [F]. Es la prueba de que el contenido era alcanzable.

## 3. Qué simplificar
- **Demasiados pasos en una sola sesión.** "Muy compleja", "hay muchos pasos de configuración", "dividir en más clases", "se tendría que haber dividido en dos" (3 respuestas) [E]. La práctica 1 encadena siete pasos en cuatro herramientas: conectar con GitHub, token de Cloudflare, secretos, tres prompts, publicación, URL y login [G, líneas 229–300].
- **La teoría de F1 y F2, comprimida.** Push/pull, `main`, Pull Request, workflow y dos entornos caben en 15 min [G, líneas 131–205]. Cumple el máximo de 3 ideas de F1, pero añade F2 en el mismo bloque. Una respuesta lo nota: "seguimos pasos, pero a nivel conceptos no he entendido casi nada" [E].

## 4. Qué ampliar (o cambiar)
- **Hacer las prácticas a la vez, no como demo completa y luego réplica.** Es la lección más concreta: en la práctica 1, la demo de 15 min [G, líneas 225–300] y la réplica posterior en salas hicieron que se perdiera el hilo; en la práctica 2, hecha "al mismo tiempo", fue "más eficiente" (2 respuestas explícitas) [E].
- **Pausas de comprobación tras cada paso importante**, y el objetivo claro antes de ir a las salas. Una respuesta propone la secuencia "objetivo → qué es → pasos" [E].
- **Acompañamiento uno a uno para quien se atasca.** Los más rápidos se frustraron esperando a que se resolvieran errores individuales en la sala principal, y se quedaron sin el "bonus" anunciado (1 respuesta) [E]. El guion ya preveía a Aida en las salas y un rescate al final [G, líneas 11 y 581–590], pero la encuesta indica que no bastó.
- **Instrucciones y salas más claras.** "Las instrucciones tenían algunas fallas", "al ir a las salas no quedaba del todo claro qué había que hacer" (2 respuestas) [E].
- **Adaptar el ritmo a un grupo heterogéneo**, con gente que nunca había usado GitHub (1 respuesta) [E] y [F].

## 5. Qué ha quedado obsoleto
- Nada detectado en la encuesta. Que la interfaz de Cloudflare cambiara antes de la sesión (SPEC-015) confirma que el token es el paso más frágil [F]. Ver la sección 6.

## 6. Incidencias de ejecución
- **Tiempos reales:** sin datos todavía (pregunta abierta de la spec).
- **Formato de la práctica 2:** la encuesta dice que se hizo a la vez, y el guion preveía demo y luego salas [G, líneas 434–497]. Hay que confirmar si cambió sobre la marcha [F].
- **El bonus** se perdió por falta de tiempo [E]. No figura en el guion.
- **Una persona no llegó a producción** [F]. Falta saber en qué paso se quedó.

**Conclusión provisional:** la dureza percibida viene del formato y del volumen de pasos, no del contenido ni del formador. Hacer la demo completa antes de la réplica, con 7 pasos encadenados en 4 herramientas y un grupo muy heterogéneo, hace que el primer bloqueo arrastre al resto. La práctica 2, hecha a la vez, apunta a la solución.

## 7. Decisiones para la siguiente versión
*Propuestas, pendientes de que Jaime las valide. Las que afectan al 11-dic dependen de la decisión de Gema y Manu.*

| Decisión | Spec o cambio |
|---|---|
| Las prácticas se hacen a la vez que el formador, paso a paso, con un punto de control al final de cada paso. Sin demo completa previa | Constitution (nuevo criterio 2.x) · SPEC-023 si se imparte el 11-dic |
| Antes de cada sala: objetivo → qué es → pasos, en una sola diapositiva o sección del portal | Constitution 2.4 (patrón de bloque) · SPEC-024 |
| Tope de pasos por práctica (p. ej. 4) y de herramientas nuevas por práctica (p. ej. 2) | Constitution (nuevo criterio 2.x) |
| Errores individuales, a una sala de rescate con la asistente desde el primer bloqueo, no en la sala principal | SPEC-023 |
| Requisitos previos con comprobación verificable antes de la sesión (no solo "crea las cuentas") | SPEC-023 · guía de requisitos de la sesión que toque |
| Tener en cuenta este feedback en la decisión sobre el 11-dic: nivel heterogéneo y bajo, y un alumno que pide "haberlo unido con Claude" | Conversación con Gema y Manu (sin spec) |
