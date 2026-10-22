# Constitution · Hero Camp AI PM Pro

*Versión 1.4 · 20 de octubre de 2026 · Responsable: Jaime García*

Principios y reglas que gobiernan todo el material formativo de este repositorio.
Ninguna spec, plan o tarea puede contradecirla. Si algo choca con ella, se cambia la constitution primero (con su propia versión y fecha), nunca se ignora.

---

## 0. Alcance

| Sesión | Fecha | Horario | Estado |
|---|---|---|---|
| Seguridad para PMs (v1) | 26 jun 2026 | 17:00–20:00 (3h, Zoom) | Impartida · 9,29/10 · conservada en el tag de git `sesion-2026-06` |
| Git, Deployment y Producción | 21 nov 2026 | 10:00–14:00 (4h, Zoom) | En diseño · **prioridad** |
| Seguridad y buenas prácticas con IA (v2) | 11 dic 2026 | 17:00–21:00 (4h) | Evoluciona directamente el material de junio |

Audiencia: unos 12 Product Managers Senior del curso AI PM Pro (The Hero Camp). Perfiles heterogéneos, parte sin background técnico. Construyen con Lovable, Supabase, GitHub, Cloudflare Pages / Vercel y Claude Code. Llegan con un producto propio funcional en GitHub.

Coordinación: Maribel Fernández (sesión de junio) · Gema (sesión del 21-nov).

---

## 1. Principios generales

1. **Spec antes que material.** Todo cambio relevante (bloque, ejercicio, producto de prueba, sección de portal, agente) nace de una spec en `sdd/specs/`. Cambios triviales (erratas, enlaces rotos, formato) no requieren spec.
2. **Flujo fijo:** `spec → plan → tasks → implementación → review`. No se empieza el plan sin la spec aprobada, ni las tareas sin el plan aprobado.
3. **Trazabilidad.** Cada commit que implementa una tarea lleva el identificador en el mensaje: `[SPEC-010] T03 Añade escaleta del bloque 2`. El registro de specs (`sdd/specs/README.md`) refleja el estado real.
4. **Lo impartido vive en git, no en carpetas.** Al cerrar una sesión se marca con un tag (`sesion-AAAA-MM`, p. ej. `sesion-2026-06`). El material de una sesión que se repite evoluciona en su sitio: el de junio está en `sesiones/2026-12-seguridad-v2/` y es la base de diciembre. Nunca se duplica material para archivarlo. Para ver lo impartido, se consulta el tag.
5. **Fecha manda.** Cada spec declara la sesión a la que sirve y su fecha límite. Si no llega, se recorta alcance, no calidad: mejor un bloque menos que un bloque a medias.
6. **Una sola fuente de verdad.** Los timings viven en el guion. La cheat sheet, el portal y las notas del orador se derivan de él y nunca lo contradicen.

---

## 2. Criterios pedagógicos

Heredados de lo que funcionó el 26-jun y del feedback de coordinación.

1. **El "para qué" antes del "qué".** Cada bloque abre anclando por qué le importa a un PM (feedback de Maribel).
2. **"Antes de entrar".** Cada bloque empieza con un máximo de 3 términos clave explicados con analogías no técnicas.
3. **Máximo 3 ideas por bloque.** Lección de las familias 3 y 4 de junio: la densidad mata la comprensión. Si un bloque necesita más de 3 ideas, se divide o se recorta.
4. **Patrón de bloque:** concepto en cámara → caso real → momento interactivo → demo o práctica → cómo se arregla o se hace bien → "lo que el PM se lleva".
5. **Lenguaje de PM, no de ingeniero.** El output de cualquier práctica es una decisión o un criterio, no código. Se explica el comando, pero no se exige dominarlo.
6. **Práctica sobre lo suyo cuando sea posible.** Si los alumnos tienen producto propio, se practica sobre él. Siempre existe un producto de prueba como plan B. **Excepción:** cuando trabajar sobre 12 productos distintos en directo hace inviable la sesión (por ejemplo, en Git/Deploy por Zoom), se practica sobre un producto de ejemplo común y la herramienta que se entrega debe ser genérica, aplicable después a su producto.
7. **Ritmo.** Pausa real cada 60–75 min. Ningún bloque expositivo de más de 12 min sin interacción.
8. **Timings honestos.** Los minutos del guion suman exactamente la duración de la sesión (240 min en las sesiones de 4h), con al menos un 10 % de colchón distribuido.
9. **Comprobación de aprendizaje.** Cada bloque tiene una verificación ligera (quiz, mano alzada, entregable visible). En la sesión de Git, el criterio de éxito es que **cada alumno salga entendiendo el flujo completo sobre el producto de ejemplo, habiendo abierto su propio PR en él, y con la guía y el Deployment Agent Squad listos para aplicarlos a su producto**. El despliegue de su producto se hace después, con un reto asíncrono.
10. **Herramienta que funciona a la primera.** Lo más valorado en junio fue el pipeline de agentes ("funcionó a la primera"). Cada sesión entrega una herramienta ejecutable (pipeline, workflow, plantilla de repo) probada desde cero antes de la sesión.
11. **Kit listo para aplicar.** El segundo punto más valorado fue el kit de seguridad. Cada sesión cierra con un entregable accionable al día siguiente (checklist, guía, plantillas), no solo con teoría.
12. **Dinamismo sin perder la guía.** Lo guiado y paso a paso funcionó, pero hubo un comentario de "poco dinámico". En las sesiones de 4h, al menos el 40 % del tiempo es práctica o interacción.

---

## 3. Criterios técnicos

1. **Stack del alumno primero.** Ejemplos, labs y demos usan el stack del curso (GitHub, Supabase, Cloudflare Pages / Vercel, Claude Code, Lovable). No se introduce tecnología nueva sin justificar en la spec.
2. **Coste 0 €.** Todo lo que el alumno haga debe funcionar en planes gratuitos. Los límites relevantes (minutos de CI, proyectos, builds) se documentan en la spec correspondiente con fecha de verificación.
3. **Plan B probado.** Toda demo o práctica en vivo tiene una alternativa ensayada: repo de prueba, captura, informe pregenerado.
4. **Nada de secretos reales.** Las claves de los productos trampa son falsas o están revocadas. Los secretos reales van en variables de entorno o secrets de GitHub, nunca en el repo.
5. **Reproducible desde cero.** Cada lab se valida desde una cuenta limpia siguiendo solo la guía del alumno, cronometrado.
6. **Portales estáticos con base común.** Los portales son HTML estático servidos por GitHub Pages. Comparten `assets/` (CSS, JS y logo), que es la única fuente del estilo y del comportamiento común. El contenido de cada sesión va en su propio `index.html`. Se mantiene la identidad visual de junio: fondo oscuro, acento lima `#DCEE3C`, Fraunces, Manrope y JetBrains Mono, logo oficial de Hero Camp sin modificar. Las notas del orador van con `?notas` o la tecla `N`.

---

## 4. Convenciones del repositorio

```
/
├─ CLAUDE.md                # punto de entrada para agentes
├─ index.html               # hub de sesiones (GitHub Pages)
├─ assets/                  # CSS/JS/logo compartidos por los portales
├─ sdd/
│  ├─ constitution.md       # este documento
│  ├─ templates/            # plantillas de spec, plan, tasks y material
│  └─ specs/NNN-slug/       # spec.md, plan.md, tasks.md (+ notas)
└─ sesiones/AAAA-MM-tema/   # material de cada sesión
   ├─ index.html            # portal de la sesión → URL limpia <pages>/sesiones/AAAA-MM-tema/
   ├─ descargas/            # lo que se enlaza a alumnos (PDF, zip), nombres sin espacios
   └─ Teoria/, Product/ o Lab/ …
```

- **URLs estables.** Todo enlace que se reparta a alumnos (portal y descargas) se considera permanente desde que se comparte. Las descargas viven en `descargas/` con nombres en `snake_case` sin espacios, y no se mueven ni se renombran. Si hay que moverlas, se deja una redirección (HTML) o una copia.

- **Numeración de specs:**
  - `000–009` infraestructura del repo y SDD.
  - `010–019` sesión Git/Deploy.
  - `020–029` sesión Seguridad v2.
  - `030+` futuras.
- **Nombres:** carpetas en `kebab-case`. Ficheros de material en `snake_case` o `MAYÚSCULAS` según el patrón ya existente (`GUION-SESION.md`, `familia3_datos_sensibles_alumnos.md`).
- **Idioma:** español en todo el material y en los commits.
- **Formatos:** Markdown es la fuente. Los PDF se generan a partir de él y nunca se editan a mano. Los zip de alumnos se regeneran por script, no a mano.
- **Versiones alumno/formador:** sufijos `_alumnos` y `_profundo` (en `Formador/`), como en junio.
- **Estados de una spec:** `borrador → aprobada → en curso → hecha` (o `descartada`).

---

## 5. Reglas para trabajar con agentes e IA

1. **Contexto obligatorio.** Antes de crear o modificar material, el agente lee esta constitution y la spec activa. Si no hay spec para el cambio y no es trivial, propone crearla (`/sdd-spec`) en lugar de improvisar.
2. **Alcance estricto.** El agente solo toca los ficheros que la tarea declara. Si descubre algo fuera de alcance, lo anota en la spec como "Hallazgos" y no lo arregla.
3. **El formador decide.** Todo contenido pedagógico (guion, teoría, casos, quiz) generado por IA es un borrador hasta que Jaime lo revisa. Las cifras y casos reales llevan fuente verificable.
4. **Nada de inventar datos.** Las cifras de casos reales (multas, registros filtrados, CVEs) se citan con fuente y fecha. Sin fuente, no entran.
5. **Los commits los hace Jaime.** Los agentes no hacen commit, push ni despliegue. Al terminar una tarea, el agente propone el mensaje de commit (`[SPEC-xxx] Tnn Descripción`) y enumera los ficheros tocados para que Jaime lo haga manualmente.
6. **El portal es sensible.** Ningún cambio en los portales publicados sin spec, y se verifica en el navegador antes del commit.
7. **Revisión.** Antes de marcar una spec como hecha se ejecuta `/sdd-review`, que comprueba la conformidad con esta constitution y los criterios de aceptación.

---

## Historial

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-10-15 | Versión inicial (SPEC-000) |
| 1.1 | 2026-10-15 | Audiencia (~12, producto propio en GitHub), coordinación de Gema, criterios 2.10–2.12 a partir del feedback de junio (SPEC-020) |
| 1.2 | 2026-10-15 | 2.9: la sesión de Git es guiada por el formador (Zoom); éxito = flujo entendido + guía y squad + primer PR; el deploy completo pasa a un reto posterior |
| 1.3 | 2026-10-15 | 1.4: junio evoluciona en su sitio hacia diciembre y lo impartido se conserva con un tag de git · 3.6: `assets/` compartido · 4: portal = `index.html` de la sesión, `descargas/` y URLs estables (SPEC-001 v2) |
| 1.4 | 2026-10-20 | 2.6: excepción de producto de ejemplo común + herramienta genérica · 2.9: nuevo criterio de éxito de Git/Deploy (SPEC-010 v3) |