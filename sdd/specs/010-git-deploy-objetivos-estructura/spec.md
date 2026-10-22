# SPEC-010 · Git/Deploy: objetivos de aprendizaje y estructura de 4h

| Campo | Valor |
|---|---|
| Estado | **aprobada** v3 (20-oct) |
| Sesión | 2026-11 Git/Deploy (sábado 21-nov · 10:00–14:00 · Zoom) |
| Fecha límite | 2026-10-26 |
| Depende de | SPEC-000 · constitution v1.4 · alimenta SPEC-011 a SPEC-017 |
| Responsable | Jaime García · coordinación: Gema |

> **Cambios de la v3:**
> - La sesión gira en torno a un **producto de ejemplo común** (frontend, backend y modelo de datos), no al repo de cada alumno. Trabajar con 12 repos distintos en directo sería inmanejable.
> - El **Deployment Agent Squad es genérico**: acompaña cada fase del CI/CD en cualquier producto.
> - No hay encuesta previa. A Gema se le envía la propuesta como email (ver anexo B).

## 1. Problema / necesidad
- Es una sesión nueva desde cero. Es la bisagra del programa entre construir el producto y lanzarlo.
- Unos 12 PMs llegan con un producto funcional en GitHub, cada uno con su propio stack y su propia configuración.
- Les falta el criterio profesional para llevarlo a producción: trabajar con ramas y PR, separar entornos, gestionar secretos, automatizar el deploy y decidir cuándo algo está listo para salir.
- En Zoom y en 4 horas no es viable trabajar sobre 12 productos distintos. La sesión es una **demo guiada sobre un producto de ejemplo**, y lo que se llevan (la guía y el squad) está pensado para aplicarlo después a su producto.

## 2. Objetivo
Dejar aprobados los objetivos de aprendizaje y la escaleta de 240 min.

Criterio de éxito de la sesión (constitution 2.9):
- **Cada alumno sale entendiendo el flujo completo** sobre el producto de ejemplo: rama → PR → CI → staging → producción.
- **Ha abierto su propio PR** en su copia del producto de ejemplo.
- **Se lleva la guía y el Deployment Agent Squad** listos para aplicarlos a su producto.

El despliegue de su propio producto se hace después, con un reto asíncrono coordinado con Gema.

## 3. Para quién
- **Alumnos (PMs):** necesitan entender el flujo y saber qué decidir, no memorizar comandos.
- **Jaime:** necesita una estructura sobre la que escribir el guion y montar la demo.
- **Gema:** necesita saber qué se cubre, qué tienen que traer los alumnos y cómo hacer el seguimiento del reto.

## 4. Alcance
**Incluye:** objetivos, escaleta, reparto entre demo, práctica e interacción, momentos de verificación, entregables por bloque, el papel del squad en la sesión, el reto posterior y el puente con el 11-dic.

**No incluye:**
- El producto de ejemplo (SPEC-011).
- Los workflows (SPEC-012).
- La plataforma, los entornos y el coste (SPEC-013).
- La teoría y la guía (SPEC-014).
- El guion (SPEC-015).
- El portal (SPEC-016).
- El squad (SPEC-017).

## 5. Requisitos

### Objetivos de aprendizaje (al terminar, el alumno es capaz de…)
- **R1. Git profesional.** Trabajar en una rama, hacer commits con mensajes con sentido, abrir un Pull Request con descripción y revisarlo antes de integrarlo en `main`.
- **R2. Entornos.** Explicar para qué sirve cada entorno (development, staging, production) y qué variables y secretos van en cada uno, sin que ninguno quede en el código.
- **R3. CI/CD.** Leer un workflow de GitHub Actions y explicar qué ocurre desde que se abre un PR hasta que el cambio llega a producción.
- **R4. Decisión de go-live.** Aplicar una checklist de "¿listo para producción?" y decidir si sale o no.
- **R5. Recuperarse.** Saber qué hacer si un deploy rompe producción: rollback o revert.
- **R6. Delegar con criterio.** Usar el Deployment Agent Squad sabiendo qué hace cada agente en cada fase, qué revisar de su trabajo y qué decisiones no delegar.
- **R7. Transferir.** Identificar en su propio producto el frontend, el backend, el modelo de datos y los secretos, y saber por dónde empezar a aplicar la guía.

### Estructura
- R8. La escaleta suma 240 min, con al menos un 10 % de colchón, pausas que no dejan tramos de más de 75 min y un 40 % o más de práctica o interacción (criterios 2.7, 2.8 y 2.12).
- R9. Ningún bloque tiene más de 3 ideas (criterio 2.3). Cada bloque tiene un "Antes de entrar" y una verificación (criterio 2.9).
- R10. **Formato demo + seguimiento sobre el producto de ejemplo** (constitution 2.6, excepción):
  - Jaime ejecuta cada fase en vivo.
  - Los alumnos siguen sobre su **fork** del producto de ejemplo, con pasos de bajo riesgo hechos desde la web de GitHub: rama, cambio, PR y ver el CI.
  - Los pasos que dependen de cuentas externas (secretos, deploy a staging y producción) solo se ven en la demo.
- R11. **Producto de ejemplo con las piezas mínimas reales:** frontend, backend (API) y modelo de datos con login. Lo resuelve SPEC-011.
- R12. **Squad genérico.** Cubre las fases rama/PR → CI → entornos y secretos → deploy → go-live. No depende del producto de ejemplo: lo diseña SPEC-017.
- R13. Se entrega una herramienta que funciona a la primera (criterio 2.10), que es el squad y la plantilla de workflows. También un kit para aplicar al día siguiente (criterio 2.11): la guía paso a paso, la checklist de go-live y una chuleta de Git.
- R14. **Reto posterior.** Fecha límite y canal para compartir la URL de producción de su producto. Conecta con el 11-dic: "el día 11 añadimos el check de seguridad a vuestro CI".

## 6. Criterios de aceptación
- [ ] CA1. Cada objetivo R1–R7 está asignado a al menos un bloque con demo o práctica y una verificación.
- [ ] CA2. La escaleta suma exactamente 240 min y cumple R8–R9. Lo comprueba `/sdd-review`.
- [ ] CA3. Cada bloque declara qué hace Jaime en vivo, qué hace el alumno y su entregable visible.
- [ ] CA4. Hay un plan B definido para los cuatro puntos de fallo más probables:
  - falla la demo en vivo → grabación o capturas de cada fase y una rama con el estado final ya preparada;
  - el alumno no puede hacer fork o no tiene cuenta → sigue la demo y hace el PR después con la guía;
  - el squad falla → ejecución pregrabada e informe pregenerado;
  - el alumno se queda atrás en Zoom → cada fase empieza desde una rama "punto de control" del producto de ejemplo.
- [ ] CA5. Jaime valida la escaleta. Se envía la propuesta a Gema (anexo B).

## 7. Restricciones (constitution)
Excepción de 2.6 (producto de ejemplo común y herramienta genérica), coste 0 € (3.2), stack del curso (3.1), plan B probado (3.3), reproducible desde cero (3.5), lenguaje de PM (2.5).

## 8. Preguntas abiertas
- [x] ~~Formato~~ → **Zoom**.
- [x] ~~Encuesta de stack a los alumnos~~ → **descartada**: la sesión trabaja sobre el producto de ejemplo.
- [x] **¿Los alumnos siguen la demo en su fork o solo miran?** → **Fork** (aprobado el 20-oct). Propuesta: fork, porque mantiene la interacción en el 40 % y les deja un PR propio. Riesgo: en los forks, GitHub Actions viene desactivado por defecto y hay que activarlo (lo resuelve SPEC-012). Alternativa: solo demo con preguntas guiadas en el chat, con un 25–30 % de interacción, por debajo del criterio 2.12.
- [ ] ¿El producto de ejemplo es feedbackhub corregido (continuidad con el 11-dic) o uno nuevo? Lo resuelve SPEC-011.
- [ ] ¿Hay un ayudante en el Zoom? Ayudaría a atender el chat durante la demo.
- [ ] ¿Qué cubrió Fito en "Autenticación y APIs"? Hay que saberlo para no repetir lo básico de Git.
- [ ] Fecha y canal del reto posterior. Propuesta: Slack del curso, hasta el 5-dic.

## 9. Hallazgos fuera de alcance
- (vacío)

---

## Anexo A · Escaleta propuesta (v3)

| Hora | Min | Bloque | Ideas (≤3) | Jaime en vivo | El alumno | Entregable |
|---|---|---|---|---|---|---|
| 10:00 | 15 | **B0 Apertura.** De "funciona en mi máquina" a "está en producción" | Por qué importa · el mapa del día · el producto de ejemplo | Presenta el producto: frontend, backend, datos | Mano alzada en el chat: ¿dónde está hoy tu producto? | — |
| 10:15 | 50 | **B1 Git profesional** | Rama · commit con sentido · Pull Request como conversación | Rama → cambio → PR con plantilla → revisión | Fork → rama → cambio pequeño → **su PR** (25 min guiados, desde la web) | Enlace a su PR en el chat |
| 11:05 | 10 | **Pausa 1** | | | | |
| 11:15 | 40 | **B2 Entornos y secretos** | Dev / staging / prod · variables por entorno · secretos nunca en el código | Configura staging y prod con secretos separados | Rellena el "mapa de entornos" **del producto de ejemplo** y después, en 5 min, el de su producto (R7) | Dos mapas de entornos |
| 11:55 | 35 | **B3a CI/CD: la receta automática** | Workflow = receta · preview por PR · merge = producción | Añade el workflow → PR → CI verde → URL de preview → merge | Activa Actions en su fork y ve pasar el CI en su PR | CI verde en su PR |
| 12:30 | 10 | **Pausa 2** (el deploy a prod de la demo corre durante la pausa) | | | | |
| 12:40 | 25 | **B3b Deployment Agent Squad** | Qué hace cada agente en cada fase · qué revisas tú · qué no delegas | Ejecuta el squad fase a fase sobre el producto de ejemplo | Preguntas guiadas: "¿qué revisarías aquí?" | — |
| 13:05 | 30 | **B4 ¿Listo para producción?** | Checklist go-live · rollback · qué vigilar tras salir | Simulacro: rompe prod y hace rollback | Aplica la checklist al producto de ejemplo y marca qué le falta al suyo | Checklist rellena |
| 13:35 | 15 | **B5 Cierre** | Guía + squad + reto · puente al 11-dic | Cómo aplicar el squad a tu producto; reto y fecha | Ronda: "mi primer paso con mi producto es…" | Kit descargado |
| 13:50 | 10 | **Colchón** | | | | |
| | **240** | | | | Práctica e interacción: B0 5 + B1 25 + B2 15 + B3a 15 + B3b 10 + B4 15 + B5 10 = **95 min (≈40 %), justo en el límite del criterio 2.12**. Se gana margen con preguntas en el chat durante las demos. Tramos sin pausa: 65 / 75 / 70 min | |

## Anexo B · Email a Gema (propuesta, enviado por Jaime)

> **Asunto:** Propuesta sesión 21-nov · Git, Deployment y Producción
>
> Hola Gema:
>
> Te adelanto cómo estoy planteando la sesión del sábado 21 de noviembre (10:00–14:00, Zoom).
>
> La idea es que cada alumno entienda el camino profesional de un producto hasta producción:
> - ramas;
> - Pull Requests;
> - entornos de desarrollo, pruebas y producción;
> - despliegue automático con GitHub.
>
> Lo veremos en una demo guiada sobre un producto de ejemplo con las piezas básicas de cualquier producto real: frontend, backend y modelo de datos. Se llevarán una guía y un equipo de agentes de IA que les ayuda a recorrer cada fase del proceso. Los agentes están pensados para aplicarse después sobre su propio producto.
>
> Cualquier comentario, me dices.
>
> ¡Gracias!
> Jaime
