# REVIEW · SPEC-026 · Replanteamiento de Seguridad v2

*T12 (verificación técnica) · T13 (`/sdd-review 026`, pendiente)*

## T12 · Verificación técnica (24-nov-2026)

| Comprobación | Resultado |
|---|---|
| `python scripts/check_links.py` | ✅ 27 enlaces locales revisados en 4 ficheros, 0 rotos |
| Frase nueva en el material de alumnos | ✅ `index.html:855` y `Guia/kit_alumno.md:84`. El PDF del kit está regenerado y la incluye (comprobado leyendo el texto del PDF) |
| La promesa antigua en `sesiones/2026-11-git-deploy/` | ✅ en el material del formador: `Teoria/GUION-SESION.md` (613, 616, 641), `Teoria/CHEAT-SHEET.md` (21, 35), `Teoria/Formador/*_profundo.md` y las notas del formador de `index.html` (636, 858). Es la sesión que ya se dio, así que se dejan tal cual. ⚠️ Fuera del material del formador quedan dos menciones (ver hallazgos) |
| Portal del 21-nov en el navegador, a 1440 px y 390 px | ✅ La sección de cierre muestra la frase nueva sin cortes en los dos anchos. A 390 px el menú superior se desplaza en horizontal, que ya era así en el diseño. **Método:** este equipo no tiene Chrome, así que se usó Edge sin ventana, con una copia temporal que fuerza que se vea el contenido animado (`.reveal`). Para 390 px se usó un marco de 390 px, porque Edge sin ventana tiene un ancho mínimo de 492 px |
| El PDF de la guía responde en su URL | ✅ Después del push (commit 3bc9c7b): 200, `application/pdf`, el mismo SHA-1 que el PDF local. El kit también responde (200). URL: `https://jagarcig-ntt.github.io/ai-pm-pro-seguridad/sesiones/2026-12-seguridad-v2/descargas/guia_seguridad_alumnos.pdf`. En local está generado (9 páginas, T10) |

### Hallazgos
1. **`sesiones/2026-11-git-deploy/Teoria/familia3_entornos_secretos_alumnos.md:102`** es teoría para alumnos (enlazada desde el README de la sesión) y dice: "es el tema de la sesión de **Seguridad del 11 de diciembre**". No es la promesa del check, pero la fecha ya no es correcta (ahora es el jueves 10 de diciembre). Ninguna tarea de SPEC-026 declara este fichero. ✅ **Corregido el 24-nov** a "Seguridad del 10 de diciembre", con el OK de Jaime.
2. **`sesiones/2026-11-git-deploy/Lab/workflows/comprobar-pr.yml:46`**: "# 11 de diciembre: aquí añadiremos el check de seguridad". ✅ **Corregido el 24-nov, solo en la plantilla** (decisión de Jaime). Ahora dice que el workflow no revisa la seguridad y remite a la guía y la checklist del 10 de diciembre. El YAML sigue siendo válido. Los alumnos que ya copiaron el workflow a su repositorio conservan el comentario antiguo.

## T13 · Revisión `/sdd-review 026` (24-nov-2026)

### Criterios de aceptación
| CA | Estado | Evidencia |
|---|---|---|
| CA1 · Constitution con versión nueva, §0 y excepción | ✅ | `sdd/constitution.md:3` (v1.9, 24-nov) · `:54` (excepción a 2.6, 2.10 y 2.12 para Seguridad v2) · `:128` (historial 1.9) |
| CA2 · Registro según §5.3 y cabeceras de 021, 023 y 024 | ⚠️ | El registro está bien (`sdd/specs/README.md:18-23`: 021 redefinida, 022 descartada, 023 2h, 024 hay que volver a aprobarla, 026 en curso). Las cabeceras de 021 y 024 están bien. **SPEC-023 no tiene carpeta ni `spec.md`:** solo existe su fila en el registro, así que no hay cabecera que actualizar. Se cumple cuando se cree la spec |
| CA3 · Escaleta de 120 min, pausa, colchón ≥ 12 min, ningún tramo > 12 min sin interacción | ⚠️ | Suma: 10+27+27+8+27+5+4+12 = 120 ✅ (`plan.md:20-27`). Pausa de 8 min en el min 64 ✅. Colchón de 12 ✅. Dentro de cada familia: 2+8+2+6+7+2 = 27 ✅. **❌ Interacción:** la pregunta de cada familia está a mitad (min ~20, ~47 y ~82). Entre la de F1 (min ~20) y la de F2 (min ~47) hay **unos 25 min**: idea 3, chequeo, lo que se lleva, el "Antes de entrar" de F2 y sus ideas 1 y 2. El plan dice "unos 10 min" (`plan.md:29`), y no es así. Pasa lo mismo entre F2 y la pausa, y entre F3 y el cierre. **Propuesta para el guion (SPEC-023):** que el chequeo en Lovable empiece con una pregunta en el chat ("¿Creéis que Lovable lo hará?"). Así la interacción queda cada ~10-13 min |
| CA4 · Guía y checklist sin VS Code, Claude Code ni terminal como requisito; funciones de Lovable con fecha | ✅ | VS Code y Claude Code solo aparecen en "Para curiosos" (`guia_seguridad_alumnos.md:230`, búsqueda de T10). Lo que la guía cuenta de Lovable (negativa con la clave, *Secrets*, Findings, *Run checks*, *Fix all*, negativa con el `console.log`) va en apartados "Lo comprobamos… el 24 de noviembre de 2026". Los puntos de configuración de la checklist son preguntas al chat, no funciones de Lovable |
| CA5 · Sin la promesa del 11-dic en el portal, el kit y el workflow; `check_links`; navegador | ✅ | Ver T12: `index.html:855`, `kit_alumno.md:84`, PDF del kit y `comprobar-pr.yml:46`. `check_links`: 0 rotos. Portal comprobado a 1440 y 390 px |
| CA6 · Jaime valida la escaleta y la guía | ⏳ | Escaleta: el plan está aprobado, pero la escaleta definitiva va en SPEC-023. Guía: T11 sin hacer |
| CA7 · Guion, portal, guía y prompts sin lenguaje figurado ni términos sin definir | ⚠️ | Guía y prompts ✅ (repaso de T10). **El guion (SPEC-023) y el portal (SPEC-024) no existen todavía**, así que hay que comprobarlos en sus specs |

### Requisitos con observaciones
- **⚠️ R7 (checklist accionable: qué mirar, dónde y qué hacer si falla).** Todos los puntos dicen qué mirar, y la mayoría dónde. "Qué hacer si falla" solo está en algunos ("pide que las quite"). En los demás hay que ir a "Qué hacer" de cada familia. ✅ **Aceptado por Jaime (24-nov):** la checklist remite a "Qué hacer" de cada familia y no se cambia.
- **⚠️ R4 ter.** Cada prompt se probó una vez, no tres, y el bloque "Formato de la respuesta" está sin probar (T06 ◐). Plan B: las capturas.
- **⚠️ R4 bis.** La demo del pipeline sigue sin probar (`/security-audit`, SPEC-001 T15). El plan B (informe pregenerado o vídeo) está en `plan.md:120`, pero no existe todavía.

### Incumplimientos o tensiones con la constitution
1. **❗ Fecha del Demo Day (constitution §0: 12-dic).** La sesión es el 10-dic, así que el Demo Day es **dos días después**, no al día siguiente. Esto produce dos problemas:
   - `plan.md:26` dice "Demo Day mañana". Hay que corregirlo en el plan y en el guion de SPEC-023.
   - **La guía es incoherente.** "Cómo usar esta guía" dice que la checklist se pasa **después de la sesión**, es decir, el 11-dic, que es la víspera. El "Aviso para el Demo Day" dice "Pasa la checklist con tiempo, no la víspera", y las reglas dicen "No apliques arreglos el día antes del Demo Day". **Propuesta:** como la guía llega hacia el 4-dic, que diga "**En cuanto la recibas:** pasa la checklist" y "**En la sesión:** resolvemos dudas", y regenerar el PDF.
2. **⚠️ 2.7 (≤ 12 min sin interacción):** ver CA3.
3. **⚠️ 2.2 ("Antes de entrar" con ≤ 3 términos):** en la guía, "Palabras que vas a ver" de F3 tiene **5 términos**, porque en T10 se añadieron "consola del navegador" y "registros". F1 y F2 tienen 3. La regla es para los bloques de la sesión, pero la guía la sigue en las otras familias. **Propuesta:** definir esos dos términos donde aparecen por primera vez y dejar la lista en 3.
4. **Resto de la constitution:**

   | Criterio | Estado | Evidencia o nota |
   |---|---|---|
   | "Para qué" antes del "qué" | ✅ | Apertura (`plan.md:20`) |
   | ≤ 3 ideas por bloque | ✅ | 3 por familia (`plan.md` §2.2) |
   | Pausa | ✅ | |
   | Timings que suman la duración exacta | ✅ | |
   | Coste 0 para el alumno | ✅ | Escáner y prompts con el plan Pro de Jaime; *Fix all*, gratis |
   | Plan B del chequeo | ✅ | 5 capturas en `capturas/` |
   | Plan B del pipeline | ⚠️ | Ver R4 bis |
   | Cifras con fuente | ✅ | Sección Fuentes de la guía; `verificacion-f1-f2.md` y `021/verificacion.md`. "La AEPD es la autoridad en España" es un dato general sin fuente en el repo |
   | Secretos (3.4) | ✅ | Clave falsa `sk-proj-FALSA-…`. ⚠️ El secreto falso sigue en *Secrets* de `prueba-cloud` hasta después de la sesión (`prueba-lovable.md` §2.6). Que no se vea en pantalla en la demo |
   | Nombres | ✅ | `prompts_chequeo_lovable.md`, `prueba-lovable.md`, `verificacion-f1-f2.md` y capturas `fN-…png` |
   | Identidad visual | ✅ | Solo cambió el texto de una línea del portal del 21-nov |

### Tareas
| Tarea | Estado |
|---|---|
| T01, T02, T03, T04, T05, T07, T08, T09, T10 | ☑ |
| T06 | ☑ (24-nov): comprobación avanzada documentada; prompt F1 ajustado y validado con el formato nuevo |
| T11 🧑 | ☑ (24-nov): OK de Jaime y push |
| T12 | ☑ (24-nov): URL del PDF comprobada |
| T13 | Esta revisión |

### Correcciones aplicadas tras la revisión (24-nov, OK de Jaime)
- **Hallazgo 1 ✅:**
  - La guía dice ahora "**En cuanto la recibas:** léela y revisa tu producto con la checklist", "En la sesión (10 de diciembre)… y resolveremos tus dudas" y "Después de la sesión: si has cambiado algo, vuelve a pasar la checklist. El Demo Day es el 12 de diciembre: no dejes los arreglos para el día 11".
  - La entradilla de la checklist y el aviso para el Demo Day dicen lo mismo.
  - `plan.md:26` ya no dice "Demo Day mañana".
- **Hallazgo 3 ✅:** "Palabras que vas a ver" de F3 vuelve a tener 3 términos. "Consola del navegador" se define en "Cómo se ve en Lovable" y "registros" en la checklist.
- **CA3 (en el plan) ✅:**
  - `plan.md:31`: cada chequeo empieza con una pregunta al chat.
  - `plan.md:29` explica por qué así se queda en unos 10 min.
  - El guion de SPEC-023 tiene que recogerlo.
- PDF regenerado (9 páginas; el texto nuevo, comprobado en el PDF).

### Veredicto
**La spec no se puede pasar a `hecha` todavía.** Hay que hacer, en este orden:
1. ~~Corregir en la guía el momento de pasar la checklist y los términos de F3; regenerar el PDF~~ ✅ hecho.
2. ~~Corregir "Demo Day mañana" en `plan.md:26`~~ ✅ hecho.
3. ~~T11 y push~~ ✅ hecho (commit 3bc9c7b).
4. ~~T12: comprobar la URL del PDF~~ ✅ hecho.
5. ~~Cerrar T06~~ ✅ hecho (24-nov).
6. Llevar a SPEC-023: la interacción al empezar cada chequeo (CA3), CA7 del guion y la fecha del Demo Day. Llevar a SPEC-024: CA7 del portal. CA2 de SPEC-023 se cumple cuando se cree su carpeta.

Con 1–5 hechos, SPEC-026 puede cerrarse. Lo que pasa a SPEC-023 y SPEC-024 queda registrado en esas specs.

### Pendiente para cerrar T12
- Que Jaime dé el OK en T11 y haga el push.
- Comprobar la URL del PDF después del push.
