# SPEC-010 · Git/Deploy: objetivos de aprendizaje y estructura de 4h

| Campo | Valor |
|---|---|
| Estado | borrador (v2, con la revisión de Jaime del 15-oct) |
| Sesión | 2026-11 Git/Deploy (sábado 21-nov · 10:00–14:00 · Zoom) |
| Fecha límite | 2026-10-26 |
| Depende de | SPEC-000 · alimenta SPEC-011 a SPEC-017 |
| Responsable | Jaime García · coordinación: Gema |

## 1. Problema / necesidad
- Es una sesión nueva desde cero. Es la bisagra del programa entre construir el producto y lanzarlo.
- Unos 12 PMs llegan con un producto funcional en GitHub: login, endpoints, interfaz y funcionalidad principal.
- Les falta el criterio profesional para llevarlo a producción: trabajar con ramas y PR, separar entornos, gestionar secretos, automatizar el deploy y decidir cuándo algo está listo para salir.
- Con 12 personas en Zoom, sin salas separadas, no es realista que todos desplieguen en directo. La sesión es **guiada por el formador**: él enseña el proceso completo en vivo y los alumnos se llevan una guía y un **Deployment Agent Squad** que automatiza ese proceso sobre su producto.

## 2. Objetivo
Dejar aprobados los objetivos de aprendizaje y la escaleta de 240 min.

Criterio de éxito de la sesión:
- **Cada alumno sale entendiendo el flujo completo** (rama → PR → staging → producción).
- **Sale con la guía y el Deployment Agent Squad instalados en su repo.**
- **Ha dado al menos el primer paso sobre su producto:** rama y PR abiertos.

Desplegar en la sesión es opcional, para quien vaya bien. El despliegue completo se hace después, con la guía y el squad, y se cierra con un reto asíncrono coordinado con Gema.

## 3. Para quién
- **Alumnos (PMs):** necesitan entender el flujo y saber qué decidir, no memorizar comandos.
- **Jaime:** necesita una estructura sobre la que escribir el guion y montar la demo en vivo.
- **Gema:** necesita saber qué se cubre, qué tienen que traer los alumnos y cómo hacer el seguimiento del reto posterior.

## 4. Alcance
**Incluye:** objetivos, escaleta, reparto entre demo, práctica e interacción, momentos de verificación, entregables por bloque, el papel del Deployment Agent Squad en la sesión, el reto posterior y la relación con la sesión de seguridad del 11-dic.

**No incluye:**
- La elección de plataforma y los límites de coste (SPEC-013).
- El producto de demo (SPEC-011).
- Los workflows (SPEC-012).
- La teoría y la guía (SPEC-014).
- El guion (SPEC-015).
- El diseño del squad (SPEC-017).

## 5. Requisitos

### Objetivos de aprendizaje (al terminar, el alumno es capaz de…)
- **R1. Git profesional.** Trabajar en una rama, hacer commits con mensajes con sentido, abrir un Pull Request con descripción y revisarlo antes de integrarlo en `main`.
- **R2. Entornos.** Explicar para qué sirve cada entorno (development, staging, production) y qué variables y secretos van en cada uno, sin que ninguno quede en el código.
- **R3. CI/CD.** Leer un workflow de GitHub Actions y explicar qué ocurre desde que se abre un PR hasta que el cambio llega a producción.
- **R4. Decisión de go-live.** Aplicar una checklist de "¿listo para producción?" y decidir si sale o no.
- **R5. Recuperarse.** Saber qué hacer si un deploy rompe producción: rollback o revert.
- **R6. Delegar con criterio.** Usar el Deployment Agent Squad para automatizar el proceso sabiendo qué hace cada agente, qué revisar de su trabajo y qué decisiones no delegar.

### Estructura
- R7. La escaleta suma 240 min, con al menos un 10 % de colchón, pausas que no dejan tramos de más de 75 min y un 40 % o más de práctica o interacción (criterios 2.7, 2.8 y 2.12).
- R8. Ningún bloque tiene más de 3 ideas (criterio 2.3). Cada bloque tiene un "Antes de entrar" y una verificación (criterio 2.9).
- R9. **Formato demo + seguimiento.** Jaime ejecuta cada paso en vivo sobre el producto de demo (SPEC-011). Los alumnos repiten los pasos de bajo riesgo sobre su propio repo: rama, PR, revisión. Los pasos que pueden romper algo (secretos, producción) se ven en la demo y se aplican después con la guía.
- R10. Se entrega una herramienta que funciona a la primera (criterio 2.10): el Deployment Agent Squad y la plantilla de workflows. También un kit para aplicar al día siguiente (criterio 2.11): la guía paso a paso, la checklist de go-live y una chuleta de Git.
- R11. **Reto posterior.** Fecha límite y canal (Slack o Gema) para compartir la URL de producción. Conecta con el 11-dic: "el día 11 añadimos el check de seguridad a vuestro CI".

## 6. Criterios de aceptación
- [ ] CA1. Cada objetivo R1–R6 está asignado a al menos un bloque con demo o práctica y una verificación.
- [ ] CA2. La escaleta suma exactamente 240 min y cumple R7–R8. Lo comprueba `/sdd-review`.
- [ ] CA3. Cada bloque declara qué hace Jaime en vivo, qué hace el alumno y su entregable visible.
- [ ] CA4. Hay un plan B definido para los cuatro puntos de fallo más probables:
  - falla la demo en vivo;
  - el alumno no tiene acceso a su repo;
  - el squad falla;
  - el alumno se queda atrás (en Zoom).
- [ ] CA5. Jaime valida la escaleta. Se comparte con Gema.

## 7. Restricciones (constitution)
Coste 0 € (3.2), stack del alumno (3.1), plan B probado (3.3), reproducible desde cero (3.5), lenguaje de PM (2.5).

## 8. Preguntas abiertas
- [x] ~~Formato~~ → **Zoom**.
- [ ] ¿Hay un ayudante en el Zoom? Ayudaría a atender el chat mientras Jaime hace la demo.
- [ ] Qué stack tiene cada producto: ¿Lovable + Supabase, backend propio, ya publicado? Lo resuelve SPEC-013 con una encuesta previa vía Gema.
- [ ] ¿Qué cubrió Fito en "Autenticación y APIs"? Hay que saberlo para no repetir lo básico de Git.
- [ ] Fecha y formato del reto posterior. Hay que acordarlo con Gema.

## 9. Hallazgos fuera de alcance
- GitHub Pages da 404 en la raíz porque no hay `index.html`, pero `portal_sesion.html` funciona (200). Lo resuelve SPEC-001.

---

## Anexo · Escaleta propuesta (v2)

| Hora | Min | Bloque | Ideas (≤3) | Jaime en vivo | El alumno | Entregable |
|---|---|---|---|---|---|---|
| 10:00 | 15 | **B0 Apertura.** De "funciona en mi máquina" a "está en producción" | Por qué importa · el mapa del día · qué os lleváis | — | Encuesta rápida en el chat: ¿dónde está hoy tu producto? | — |
| 10:15 | 50 | **B1 Git profesional** | Rama · commit con sentido · Pull Request como conversación | Rama → cambio → PR con plantilla → revisión | **Lo repite en su repo** (25 min guiados) | Su PR abierto (enlace en el chat) |
| 11:05 | 10 | **Pausa 1** | | | | |
| 11:15 | 40 | **B2 Entornos y secretos** | Dev / staging / prod · variables por entorno · secretos nunca en el código | Configura staging y prod con secretos separados en la demo | Rellena "mapa de entornos" de su producto (qué va en cada uno) | Mapa de entornos |
| 11:55 | 35 | **B3a CI/CD: la receta automática** | Workflow = receta · preview por PR · merge = producción | Añade el workflow → PR → CI verde → URL de preview → merge | Lee el workflow con preguntas guiadas | — |
| 12:30 | 10 | **Pausa 2** (el deploy a prod de la demo corre durante la pausa) | | | | |
| 12:40 | 25 | **B3b Deployment Agent Squad** | Qué hace cada agente · qué revisas tú · qué no delegas | Lanza el squad sobre otro producto: ejecuta el proceso completo | Instala el squad en su repo; los que van bien lo ejecutan hasta staging | Squad instalado |
| 13:05 | 30 | **B4 ¿Listo para producción?** | Checklist go-live · rollback · qué vigilar tras salir | Simulacro: rompe prod en la demo y hace rollback | Aplica la checklist a su producto | Checklist rellena |
| 13:35 | 15 | **B5 Cierre** | Guía + squad + reto · puente al 11-dic | Explica el reto y la fecha | Ronda: "mi siguiente paso es…" | Kit descargado |
| 13:50 | 10 | **Colchón** | | | | |
| | **240** | | | | Práctica e interacción: unos 110 min (≈46 %). Tramos sin pausa: 65 / 75 / 70 min | |
