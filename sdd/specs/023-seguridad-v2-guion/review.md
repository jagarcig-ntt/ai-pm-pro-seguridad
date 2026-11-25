# REVIEW · SPEC-023 · Guion y cheat sheet de Seguridad v2

*T09 (revisión de lectura y tiempos) · T12 (`/sdd-review 023`, pendiente)*

## T09 · Revisión de lectura y tiempos (24-nov-2026)

### Correcciones de lenguaje aplicadas (CA6)
Leído el guion completo y la cheat sheet. Se corrigieron 9 frases:

| Antes | Después | Motivo |
|---|---|---|
| "una factura que alguien podría disparar" | "esa factura puede crecer mucho si otra persona usa vuestras claves" | Figurado |
| "el riesgo que más rápido se convierte en dinero" | "el riesgo que antes os puede costar dinero" | Figurado |
| "Vuestra web habla con la base de datos" | "Vuestra web envía peticiones a la base de datos" | Personificación |
| "Os los prestan para usar vuestro producto" | "pertenecen a las personas que usan vuestro producto… Os los dan para poder usarlo" | Figurado |
| "porque corren las 72 horas" | "porque el plazo de 72 horas ya ha empezado" | Figurado (es el ejemplo "el reloj corre" que prohíbe la spec, R7) |
| "hasta dónde se puede llegar" | "qué más se puede hacer" | Figurado |
| "Pull Request… preview… merge", sin definir (F2, chequeo) | Definidos en la misma frase, como en la guía | Término sin definir |
| "dirección IP", sin definir (nota de F3) | "la dirección de internet de su conexión" | Término sin definir |
| "leer y borrar todos los datos" (clave maestra) | "leer, cambiar y borrar" | Coincide con la respuesta del prompt F1 del 24-nov |

Búsqueda final sin resultados de: "como si", "imagina", "puerta", "portero", "llave", "candado", "cerradura", "reloj" y "escudo". "Recorren Internet" es literal.

**VS Code, Claude Code y la terminal:** solo aparecen en la preparación previa (notas para Jaime) y en la demo del pipeline (20:39–20:44), donde se definen en una frase.

### Criterios
| CA | Estado | Evidencia |
|---|---|---|
| CA1 · 120 min, de 19:00 a 21:00; tabla, cabeceras y cheat sheet coinciden | ✅ | `python scripts/check_timings.py --sesion seguridad`: «8 bloques, 120 min (completo). SPEC-026: 8 bloques, 120 min. ✓ Todo coincide». La pausa es de 8 min y el colchón de 12 |
| CA2 · ningún tramo de más de 12 min sin interacción | ✅ (en el límite) | 11 preguntas en el texto: 19:08, 19:20, 19:28, 19:35, 19:47, 19:55, 20:02, 20:22, 20:30, 20:37 y 20:46. Los huecos son de 12, 8, 7, 12, 8, 7, 20, 8, 7 y 9 min. El de 20 incluye la pausa de 8, así que son 12 de exposición. El de 9 incluye la demo del pipeline. **Tres tramos están justo en 12** (plan §6, tensión 2): si una familia se alarga, toca usar los párrafos "si vas tarde" |
| CA3 · por familia: 3 términos, 3 ideas, caso verificado y comprobación ligada a R4 | ✅ con un matiz | F1, F2 y F3 tienen 3 términos y 3 ideas cada una. Casos: F1, la startup mexicana y Unit 42; F2, el CVE y Moltbook; F3, Samsung. Comprobación: F1, «una clave de tu producto, ¿pública o secreta?»; F2, «¿qué protege tus datos?» y «¿dónde mirarías?»; F3, «un dato que podrías quitar». **Matiz:** la parte del objetivo de F3 sobre las 72 h no tiene pregunta propia; se explica en la idea 3 |
| CA4 · casos y cifras verificados, con la redacción de la guía | ✅ | Todas las cifras y fechas del guion están en la guía y en `026/verificacion-f1-f2.md` o `021/verificacion.md`: 82.314 $, 180 $/mes, 11–12 feb, 3-mar-2026, menos de 5 min (Unit 42), más de 5.000 repositorios y unas 3.000 webs (Cyble), 29-may-2025, más de 170 apps, 9,3, la disputa de Lovable, 1,5 millones y 2-feb-2026 (Wiz), 6-abr-2023 (Samsung), 1.200 M€ (DLA Piper) y art. 33. Lo que se cuenta de Lovable sale de `026/prueba-lovable.md`. "La AEPD es la autoridad en España" es un dato general, como en la guía |
| CA5 · plan B de cada chequeo y del pipeline, con el fichero existente | ⏳ | Las capturas del 24-nov (`026/capturas/`, 6 ficheros) existen. **Faltan** `023/capturas/f{1,2,3}-prompt.png` (T11, la víspera) y `023/plan-b/security-report.md` (T02) |
| CA6 · lectura sin lenguaje figurado ni términos sin definir | ✅ | Ver "Correcciones de lenguaje aplicadas" |
| CA7 · coincide con la guía | ✅ | Los términos de "Antes de entrar" son iguales a "Palabras que vas a ver" en las tres familias. Los prompts se enlazan (`prompts_chequeo_lovable.md`) y no se copian. El Demo Day es el 12-dic, sin cambios grandes el 11 y con la excepción de "Si ya ocurrió". Las acciones de "Lo que te llevas" son las de "Qué hacer" de la guía |
| CA8 · la estimación de duración cabe; Jaime valida | ◐ | `--palabras`: ningún segmento por encima de su tiempo. Por bloque: apertura 3,8 de 10 · F1 10,0 de 27 · F2 10,0 de 27 · pausa 0,3 de 8 · F3 9,2 de 27 · pipeline 2,2 de 5 · cierre 1,4 de 4 · colchón 0,1 de 12. Son unas 4.810 palabras, unos 37 min de habla a 130 palabras por minuto. El resto es tiempo de preguntas, esperas de Lovable y del pipeline, pantalla y colchón. **Falta la validación de Jaime (T10)** |
| CA9 · `GUION-SESION-COMPLETO.md` no existe ni se enlaza | ✅ | Borrado en T08. `check_links.py`: 27 enlaces, 0 rotos. Solo lo mencionan specs cerradas (000, 001, 014, 015 y 020), como texto histórico |

### Pendiente
- **T10 (Jaime):**
  - leer el guion y validar el texto y las 11 preguntas;
  - decidir si el guion, que tiene unos 10 min de habla por familia, se queda así o se amplía con más explicación (sin más ideas).
- ~~Teoría de F3 de SPEC-021~~: ya no se escribe (SPEC-021 redefinida el 25-nov). F3 está alineada con la guía.
- **T02:** la duración real del pipeline, para la nota de las 20:40.
- **T11:** las capturas de las respuestas de los prompts, la víspera.
