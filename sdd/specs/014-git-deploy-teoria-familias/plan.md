# PLAN · SPEC-014 · Teoría de la sesión Git/Deploy en 4 familias

*Spec: [spec.md](spec.md) · Estado del plan: borrador · 20-oct*

## 1. Enfoque
- **F1 como prototipo.** Se escribe F1 completa (alumnos y formador) y se para para que Jaime la revise. Fija el tono, la extensión y el nivel antes de escribir F2–F4. Así evitamos rehacer cuatro familias si el formato no convence.
- **F2–F4 siguen el formato ya validado.** Se pueden escribir en paralelo.
- **Reutilizamos de junio el esqueleto, no el volumen.** Se mantienen el "Antes de entrar", "lo que el PM se lleva" y las fuentes con URL. Se eliminan las secciones de magnitud, velocidad, severidad y a quién afecta, que eran propias de un tema de riesgo y en Git/Deploy no aportan.
- **Casos reales:** se investigan y verifican con búsqueda web antes de escribirlos. Sin fuente no entran (constitution 5.4).
- **Alternativas descartadas:**
  - Escribir las 4 a la vez: si el formato no gusta, hay que rehacerlas todas.
  - Adaptar la familia 4 de junio: es otra sesión y otro enfoque (riesgo frente a proceso).

## 2. Diseño

### 2.1 Ficheros
Los ficheros van en `sesiones/2026-11-git-deploy/Teoria/` (spec R1):

| Familia | Alumnos | Formador (`Formador/`) |
|---|---|---|
| F1 Git profesional | `familia1_git_profesional_alumnos.md` | `familia1_git_profesional_profundo.md` |
| F2 Entornos y secretos | `familia2_entornos_secretos_alumnos.md` | `familia2_entornos_secretos_profundo.md` |
| F3 CI/CD y deploy | `familia3_cicd_deploy_alumnos.md` | `familia3_cicd_deploy_profundo.md` |
| F4 Go-live y recuperación | `familia4_golive_recuperacion_alumnos.md` | `familia4_golive_recuperacion_profundo.md` |

Además, `glosario.md`: términos comunes a las 4 familias, base de la chuleta de Git (SPEC-015).

### 2.2 Estructura de cada fichero
**Versión alumnos** (spec R2). Unas 150–200 líneas:
1. Cabecera (título, "Guía de referencia para el alumno", sesión) e índice, como en junio.
2. **Antes de entrar:** 3 términos con analogía no técnica.
3. **Para qué le importa a un PM:** un párrafo.
4. **Las 3 ideas clave:** una sección por idea.
5. **Cómo se ve en el producto demo:** escrito sobre el demo previsto (frontend, backend, datos con login) y agnóstico de plataforma. Marcado con `<!-- ajustar tras SPEC-011/013 -->` donde dependa de decisiones pendientes.
6. **Caso real:** 1–2, con fecha y fuente.
7. **El factor agente IA:** qué hace bien el squad en esta fase y qué no se delega.
8. **Lo que el PM se lleva:** 3 frases, una por idea. En junio eran 5; se reduce para cumplir el criterio 2.3.
9. **Fuentes.**

**Versión formador** (spec R3). Es la de alumnos más estas secciones, marcadas con 🎓:
- Intención pedagógica: qué tiene que quedar sí o sí.
- Preguntas para el chat (2–3).
- Errores de comprensión esperados y cómo resolverlos.
- "En la demo, en este punto enseñas…"
- Plan B si falla la demo del bloque.
- **Mapa para specs posteriores** (spec R7): concepto → qué debe tener el demo → fase del squad.

### 2.3 Contenido por familia (máximo 3 ideas; tiempos de la escaleta de SPEC-010)

| Familia · bloque · min | Antes de entrar (3) | Ideas clave (≤3) | Caso candidato (*a verificar*) | Fase del squad |
|---|---|---|---|---|
| **F1 Git profesional** · B1 · 50 | Repositorio · rama · Pull Request | 1. La rama: trabajar sin romper lo que funciona. 2. El commit con sentido: una historia que se puede leer y deshacer. 3. El PR como conversación y punto de control (revisión + checks) | Un cambio que llegó a producción sin revisión ni historial claro | Rama y PR |
| **F2 Entornos y secretos** · B2 · 40 | Entorno · variable de entorno · secreto | 1. Tres entornos, tres propósitos (dev / staging / prod). 2. La misma app con distinta configuración: variables por entorno. 3. Los secretos viven en la plataforma, no en el código | GitLab, enero 2017: comando ejecutado en producción creyendo que era otro entorno; recuperación fallida | Entornos y secretos |
| **F3 CI/CD y deploy** · B3a+B3b · 35+25 | CI · CD · workflow | 1. El workflow: una receta que se ejecuta sola. 2. Cada PR se comprueba y se previsualiza antes de entrar. 3. Merge a `main` = producción | CrowdStrike, julio 2024: actualización desplegada a la vez a toda la flota, sin despliegue escalonado | CI y deploy |
| **F4 Go-live y recuperación** · B4 · 30 | Go-live · rollback · monitorización | 1. Salir es una decisión: checklist go-live. 2. Plan de vuelta atrás antes de salir: rollback frente a revert. 3. Después de salir: vigilar 3 señales (errores, rendimiento, uso) | Knight Capital, agosto 2012: despliegue incompleto y sin forma rápida de volver atrás | Go-live |

**Delimitación con el 11-dic** (spec CA7):
- F2 trata dónde viven los secretos; qué pasa si se filtran queda para el 11-dic.
- F4 no entra en CORS ni en endpoints expuestos.
- La versión formador de F4 incluye la frase puente: "el 11 añadimos el check de seguridad a vuestro CI".

**Cuadre de tiempos:** F1 50 + F2 40 + F3 60 + F4 30 = 180 min de bloques de familia. Con B0 15, B5 15, pausas 20 y colchón 10 suman **240** ✓ (escaleta de SPEC-010).

## 3. Ficheros

| Acción | Ruta | Nota |
|---|---|---|
| crear | `sesiones/2026-11-git-deploy/Teoria/familia{1-4}_*_alumnos.md` | 4 ficheros |
| crear | `sesiones/2026-11-git-deploy/Teoria/Formador/familia{1-4}_*_profundo.md` | 4 ficheros |
| crear | `sesiones/2026-11-git-deploy/Teoria/glosario.md` | Base de la chuleta (SPEC-015) |
| reutilizar | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Bloque Teorico/familia1_credenciales_alumnos.md` | Cabecera, índice y formato de fuentes |
| reutilizar | `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/GUION-SESION-COMPLETO.md` (L194–208) | Formato del "Antes de entrar" |
| reutilizar | `sdd/specs/010-git-deploy-objetivos-estructura/spec.md` (anexo A) | Objetivos R1–R7 y tiempos por bloque |
| modificar | `sesiones/2026-11-git-deploy/README.md` | Enlace a `Teoria/` |
| no tocar | Material de seguridad (`sesiones/2026-12-seguridad-v2/`) | Solo se lee |

## 4. Riesgos y plan B

| Riesgo | Probabilidad | Mitigación / plan B |
|---|---|---|
| Un caso candidato no se puede verificar con fuente fiable, o los detalles no encajan con la idea | media | Se sustituye por otro caso o se queda en "ejemplo ilustrativo" sin cifras. Nunca se inventa (5.4) |
| La teoría va por delante del demo (orden acordado): la sección "Cómo se ve en el producto demo" puede no cuadrar con lo que se construya | alta | Se escribe sobre el demo **previsto** y se marca `ajustar tras SPEC-011`. El mapa del formador sirve de requisito para el demo, de modo que el demo se adapta a la teoría y no al revés |
| Densidad: la tentación de meter más de 3 ideas, como pasó en junio | media | Cada familia cierra con "Lo que el PM se lleva" de 3 frases. Si algo no cabe, va al glosario o a la versión formador |
| F4 en 30 min con 3 ideas va justo | media | La idea 3 (vigilar tras salir) es la más corta y se puede reducir a la checklist si falta tiempo. Se decide en el guion (SPEC-015) |
| Plataforma no decidida (SPEC-013) | alta | Teoría agnóstica: se habla de "la plataforma de despliegue" y los ejemplos se marcan `ajustar tras SPEC-013` |
| La revisión de Jaime (CA8) se retrasa y bloquea F2–F4 | media | Solo F1 bloquea. F2–F4 se escriben después con el formato aprobado y se revisan juntas |

**Plan B de las demos:** esta spec no tiene demos en vivo. El plan B de cada demo de bloque se **define** en la versión formador (spec R3) y se ensaya en SPEC-015.

## 5. Verificación

| Criterio | Cómo se verifica |
|---|---|
| CA1 | Existen los 8 ficheros. `grep` de los encabezados de sección de cada fichero de alumnos frente a la estructura del apartado 2.2 |
| CA2 | Conteo de ideas en la sección "Ideas clave" (≤3) y de términos en "Antes de entrar" (≤3), por familia |
| CA3 | Tabla de trazabilidad en `review.md`: objetivo de SPEC-010 (R1–R7) → familia → sección |
| CA4 | Cada caso y cada cifra tiene URL y fecha en "Fuentes". Se abre cada URL (comprobación de que responde) durante la revisión |
| CA5 | `grep` de las marcas 🎓 y de la tabla "Mapa para specs posteriores" en los 4 ficheros de formador |
| CA6 | `wc -l` por fichero frente a R4 (alumnos 150–200; formador = alumnos + 50–100) |
| CA7 | Revisión de F2 y F4: no aparecen CORS ni endpoints expuestos, y está la frase puente |
| CA8 | Jaime valida F1 (prototipo) y después F2–F4. Queda anotado en `tasks.md` |

## 6. Tensiones con la constitution
- **2.3 (máximo 3 ideas):** se cumple por diseño. "Lo que el PM se lleva" baja de 5 frases (junio) a 3.
- **5.4 (nada de inventar):** los 4 casos candidatos son conocidos, pero sus detalles y cifras se verifican con fuente antes de escribirlos. Si alguno no se sostiene, se cambia.
- **2.8 (timings):** cuadran con la escaleta (240 min). Los minutos finos los fija el guion, no esta spec.
- **Coste 0:** no aplica a esta spec. Solo es contenido.
