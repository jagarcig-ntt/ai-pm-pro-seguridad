# SPEC-018 · Validar el flujo Lovable → GitHub → Cloudflare Pages (+ Supabase)

| Campo | Valor |
|---|---|
| Estado | **aprobada** (30-oct, con las respuestas del apartado 8) |
| Sesión | 2026-11 Git/Deploy (sábado 21-nov · 10:00–14:00 · Zoom) |
| Fecha límite | 2026-11-06 (antes de la reunión con Gema y el entrenador, la semana del 2-nov) |
| Depende de | SPEC-011 (demo y Cloudflare Pages, hecha) · SPEC-012 (workflows y ruleset, en curso) |
| Alimenta | SPEC-013 (requisitos previos), SPEC-014 (puente "tu proyecto de Lovable"), SPEC-015 (guion), SPEC-017 (squad) |
| Responsable | Jaime García · interlocutores: Gema (coordinación) y el entrenador de las sesiones de construcción |

## 1. Problema / necesidad
- **Propuesta recibida (correo de Gema, 30-oct).** El entrenador de las sesiones propone *"utilizar Lovable como herramienta principal de construcción, junto con GitHub para el versionado y Supabase para backend, base de datos y autenticación"*, y quiere *"validar con Jaime el flujo completo de despliegue antes de cerrarlo"*. La reunión será la semana del 2-nov (Jaime no puede el sábado 31).
- **Encaja con lo construido:**
  - GitHub y Supabase ya son el stack del demo (`sdd/specs/011-git-deploy-producto-demo/`);
  - la teoría ya parte de que los alumnos construyen con Lovable (`sesiones/2026-11-git-deploy/Teoria/familia1_git_profesional_alumnos.md`, sección 2).
- **La propuesta no dice dónde se publica.** Jaime propondrá **Cloudflare Pages**, ya funcionando en el demo con preview por PR, staging, producción y rollback (`sdd/specs/012-git-deploy-flujo-git-cicd/notas.md`).
- **Tensión a validar:**
  - Según la FAQ oficial de Lovable, la sincronización con GitHub es **bidireccional solo con la rama principal**, y Lovable no ve commits de otras ramas hasta que se fusionan (https://lovable.dev/faq/github, consultado el 30-oct).
  - Choca con lo que enseña la sesión: ramas, PR, check obligatorio y `main` protegida (SPEC-012, ruleset `main siempre funciona`).
  - Hay fuentes de terceros que mencionan un modo experimental de ramas en Lovable, **sin confirmar** en la documentación oficial.
- **Diferencias técnicas con el demo,** según fuentes de terceros que hay que verificar:
  - los proyectos de Lovable son Vite y React, con compilación (`npm run build` → `dist/`);
  - las variables del navegador llevan el prefijo `VITE_` y se fijan **al compilar**;
  - los secretos configurados en Lovable no pasan a otro hosting.

  El demo actual no compila nada y lee su configuración en tiempo de ejecución (`/api/config`).

## 2. Objetivo
Un flujo **probado de extremo a extremo** con un proyecto real de Lovable (construir en Lovable → GitHub con PR y checks → staging y producción en Cloudflare Pages, con Supabase separado por entorno), documentado y listo para:
- enseñarlo en la reunión con Gema y el entrenador;
- convertirlo en el puente "tu proyecto de Lovable" de la sesión;
- que el squad (SPEC-017) sepa aplicarlo.

## 3. Para quién
- **Entrenador y Gema:** necesitan ver que el flujo funciona con la herramienta de los alumnos y qué cambia en sus sesiones de construcción.
- **Alumnos:** el camino concreto para llevar *su* producto de Lovable a producción después de la sesión (reto posterior, SPEC-010 R14).
- **Jaime:** un mensaje coherente entre "lo que enseño con FeedbackHub" y "lo que harás con tu Lovable".

## 4. Alcance
**Incluye:**
- Un **proyecto mínimo de prueba en Lovable**, con login de Supabase y una tabla, conectado a un repo nuevo de GitHub de Jaime.
- **Cómo convive la sincronización de Lovable con `main`** con un flujo de ramas y PR: qué pasa con `main` protegida, si existe un modo de ramas y cómo entran los cambios de Lovable.
- Un **workflow de despliegue con compilación** para proyectos Vite, derivado de `desplegar.yml`. Variables `VITE_*` por entorno: preview y staging con el proyecto Supabase de staging, producción con el de producción.
- **Supabase por entorno** en un proyecto de Lovable: cómo usar un proyecto de staging si Lovable conecta solo uno.
- **Documento de propuesta** de una página para la reunión: stack, flujo, qué cambia para el alumno y decisiones abiertas.

**No incluye:**
- Rehacer el demo FeedbackHub en Lovable: se mantiene como demo del flujo (decisión del 30-oct).
- Las sesiones de construcción del entrenador.
- El squad (SPEC-017), que recibe el resultado como entrada.

## 5. Requisitos
- **R1.** Probar con un proyecto **real** de Lovable, no con supuestos: cada afirmación del documento final cita lo observado y su fecha, o la documentación oficial (constitution 5.4).
- **R2.** Determinar con evidencia:
  - **(a)** en qué rama escribe Lovable;
  - **(b)** qué hace si `main` está protegida;
  - **(c)** si hay forma soportada de trabajar por ramas y PR;
  - **(d)** cómo vuelven a Lovable los cambios fusionados por PR.
- **R3.** Despliegue de un proyecto Vite en Cloudflare Pages desde GitHub Actions con compilación, preview por PR y producción por merge, **reutilizando el patrón de `desplegar.yml`**.
- **R4.** Variables por entorno: el mismo código con `VITE_SUPABASE_URL` y la clave pública distintas en preview, staging y producción. Nunca la clave secreta (lección del incidente del 22-oct).
- **R5.** Una propuesta de flujo para el alumno, con **qué hace en Lovable y qué hace en GitHub**, en lenguaje de PM y en un máximo de 5 pasos.
- **R6.** Coste 0 (constitution 3.2): señalar qué requiere plan de pago de Lovable, si algo lo requiere.
- **R7.** Un documento de una página para la reunión, más la propuesta de cambios en la teoría, el squad y los requisitos previos.

## 6. Criterios de aceptación
- [ ] CA1. Existe un repo de prueba conectado a Lovable y hay evidencia (capturas o commits) de las 4 preguntas de R2.
- [ ] CA2. Un PR del proyecto Lovable genera preview en Cloudflare con las variables de staging, y un merge publica en producción.
- [ ] CA3. Preview y producción del proyecto Lovable usan proyectos de Supabase distintos, o está documentado por qué no es viable y qué se propone.
- [ ] CA4. El flujo del alumno (R5) cabe en 5 pasos y no contradice F1–F4. Si las contradice, la teoría lleva un ajuste propuesto.
- [ ] CA5. El documento de la reunión está listo antes de la fecha acordada con Gema.
- [ ] CA6. Ninguna clave secreta en repos ni en el chat. Todo lo usado es gratuito, o está señalado.

## 7. Restricciones (constitution)
3.1 stack del alumno (Lovable entra como herramienta del curso) · 3.2 coste 0 · 3.4 nada de secretos · 5.4 nada de inventar datos (Lovable cambia rápido: todo con fecha de comprobación) · 5.5 Jaime crea cuentas, proyectos y commits · 2.5 lenguaje de PM.

## 8. Preguntas abiertas (respondidas por Jaime el 30-oct)
- [x] **Cuenta de Lovable:** sí, ya conectada con GitHub. Plan sin confirmar: se anotará qué funciones piden pago durante la prueba (R6).
- [x] **Repo de prueba:** `jagarcig-ntt/lovable-prueba`, nuevo y separado de `feedbackhub-demo`.
- [x] **Supabase:** una **segunda organización** solo para la prueba. Así no toca los 2 proyectos del demo.
- [x] **Cómo trabaja el entrenador con los alumnos:** se pregunta en la reunión. Va al documento de la reunión como pregunta abierta.
- [ ] **Fecha de la reunión:** la semana del 2 al 6 de noviembre, día por concretar con Gema (30-oct). La fecha límite del 6-nov se mantiene; si la reunión cae antes, el documento de la reunión (CA5) se adelanta a esa fecha.

## 9. Hallazgos fuera de alcance
- Si la conclusión es que Lovable obliga a trabajar sobre `main`, habrá que decidir si en la sesión se enseña "Lovable escribe en una rama de trabajo y tú abres el PR", o se acepta `main` sin protección con despliegue a staging como red. Es una decisión pedagógica que afecta a F1 (SPEC-014).
