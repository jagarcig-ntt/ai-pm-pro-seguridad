# REVIEW · SPEC-014 · Teoría de la sesión Git/Deploy en 4 familias

*Ejecutado el 20-oct-2026 con `/sdd-review 014` (T10). Evidencia: script de comprobación de estructura, comprobación HTTP de las fuentes, lectura de las páginas bloqueadas con un agente web y `scripts/check_links.py`.*

## 1. Criterios de aceptación

| CA | Resultado | Evidencia |
|---|---|---|
| CA1 · 8 ficheros con la estructura de R2 | ✅ | Existen los 4 `familiaN_*_alumnos.md` y los 4 `Formador/familiaN_*_profundo.md`. Las 10 secciones del plan 2.2 están presentes y en orden en las 4 familias. |
| CA2 · ≤3 ideas y ≤3 términos en "Antes de entrar" | ✅ | Las 4 familias tienen 3 secciones "Idea N", 3 términos en "Antes de entrar" y 3 frases en "Lo que el PM se lleva". |
| CA3 · Objetivos R1–R7 de SPEC-010 cubiertos | ✅ | Ver la tabla del apartado 2. |
| CA4 · Casos y cifras con fuente y fecha | ✅ con nota | Los 4 casos están verificados (`casos.md`). Fuentes por familia: F1 5, F2 9, F3 7 y F4 11 URLs. 28 de 29 responden. **eWeek (F2)** bloquea a bots (403); su contenido lo corroboran heise, The New Stack y AI Incident Database, que sí cargan. En Sonos (F4), AOL (404) y PhoneArena (403) se han **sustituido** por Reuters vía BusinessDay y Slashdot/The Verge, leídas y comprobadas: 20–30 M$, 100 puestos, "empieza por mí", "mi ejecución se quedó corta", "volver a publicarla empeoraría los problemas" y salida del CEO. |
| CA5 · Formador con los elementos de R3 y mapa de R7 | ✅ | 12 bloques 🎓 por familia (intención, preguntas para el chat, errores esperados, "en la demo enseñas", plan B) y sección 11 "Mapa para specs posteriores" en las 4 familias. |
| CA6 · Extensión según R4 | ✅ | Alumnos: 164 / 184 / 182 / 169 líneas (rango 150–200). Formador: +67 / +59 / +62 / +62 (rango +50–100). |
| CA7 · Delimitación con el 11-dic | ✅ | 0 menciones de CORS ni de endpoints expuestos en las versiones de alumnos. F2 remite al 11 de diciembre para "qué pasa si se filtra". En el formador de F4 está la frase puente ("el check de seguridad en vuestro CI") y la instrucción de aparcar CORS. |
| CA8 · Validación de Jaime | ✅ | F1 validada el 20-oct (T04) y F2–F4 el 21-oct (T11): "la teoría la damos por buena". Los ajustes que surjan al volcarla al portal van en SPEC-016. |

## 2. Trazabilidad de objetivos (SPEC-010)

| Objetivo | Familia · sección |
|---|---|
| R1 Git profesional | F1 · ideas 1–3 + práctica (PR en el fork) |
| R2 Entornos | F2 · ideas 1–3 |
| R3 CI/CD | F3 · ideas 1–3 (lectura del workflow en voz alta) |
| R4 Decisión de go-live | F4 · idea 1 (checklist de 8 puntos) |
| R5 Recuperarse | F4 · idea 2 (apagar, rollback, revert) + simulacro |
| R6 Delegar con criterio | Sección 8 "El factor agente IA" en F1–F4 (hace bien / no delegues) |
| R7 Transferir a su producto | F2 · mapa de entornos de su producto · F4 · columna "¿podría responderlo con mi producto?" |

## 3. Conformidad con la constitution

| Principio | Resultado | Nota |
|---|---|---|
| 2.1 "Para qué" antes del "qué" | ✅ | Sección 2 en todas las familias, antes de las ideas. |
| 2.2 "Antes de entrar" ≤3 términos | ✅ | Ahora está en la teoría, no solo en el guion. Era una carencia de junio. |
| 2.3 Máximo 3 ideas | ✅ | "Lo que el PM se lleva" baja de 5 frases (junio) a 3. |
| 2.7 Ningún tramo expositivo de más de 12 min sin interacción | ✅ en diseño | Cada familia reparte teoría (12–15 min) con preguntas en el chat intercaladas en los bloques 🎓. Se confirma en el guion (SPEC-015). |
| 2.8 Timings | ✅ | 50 + 40 + 60 + 30 = 180 min de familias; con B0, B5, pausas y colchón suman 240 (escaleta de SPEC-010). |
| 3.2 Coste 0 | ✅ | No aplica al contenido. Los mapas exigen repo público y planes gratuitos (F3, SPEC-013). |
| 3.3 Plan B | ✅ | Plan B por bloque en el formador (ramas `demo/…` preparadas, capturas, vídeo del simulacro). Se ensaya en SPEC-015. |
| 5.4 Cifras con fuente | ✅ | Las 2 afirmaciones sin fuente que aparecieron al escribir se corrigieron (sectores de CrowdStrike) o se verificaron (funciones eliminadas en Sonos). |
| 3.4 Nada de secretos reales | ✅ | 0 patrones de clave (`sk-`, `eyJ…`, `AKIA`, `ghp_`) en `Teoria/`. Los nombres de variables de los ejemplos son genéricos. |
| 4 Convenciones de nombres | ✅ | `familiaN_<slug>_alumnos.md` y `Formador/…_profundo.md`, como en junio. |
| 3.6 Identidad visual del portal | n/a | Sin portal en esta spec (SPEC-016). |

## 4. Tareas

T01–T11 ☑. **Spec hecha el 21-oct.**

## 5. Acciones pendientes
1. ~~Validación de Jaime~~ → hecha el 21-oct.
2. **Tras SPEC-011/013:** resolver las **8 marcas** `<!-- ajustar tras SPEC-0xx -->` (sección 6 de cada familia, versiones alumnos y formador) con los nombres reales del producto demo y de la plataforma. Se recomienda una tarea en SPEC-011.
3. **SPEC-011 y SPEC-017** deben partir de los 4 "Mapas para specs posteriores" (sección 11 de cada versión formador). Son sus requisitos.
4. (Opcional) Algún caso propio de Jaime (NTT DATA, banca) en la revisión.
