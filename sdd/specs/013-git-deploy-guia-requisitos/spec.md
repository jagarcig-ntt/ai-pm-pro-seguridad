# SPEC-013 · Guía de requisitos previos para los alumnos

| Campo | Valor |
|---|---|
| Estado | **en curso** · aprobada por Jaime el 5-nov |
| Sesión | 2026-11 Git/Deploy (sábado 21-nov · 10:00–14:00 · Zoom) |
| Fecha límite | 2026-11-12 (entrega a Gema, según su correo del 4-nov) |
| Depende de | SPEC-010 v4.1 · SPEC-019 (ensayo, `ensayo.md` y `notas.md`) · constitution v1.6 |
| Alimenta | SPEC-015 (guion), SPEC-016 (portal) |
| Responsable | Jaime García |

## 1. Problema / necesidad
- La escaleta v4.1 (SPEC-010) solo cabe en 4 horas si las cuentas externas llegan preparadas de casa (R10).
- En el correo del 4-nov, Gema pide una guía de una página con capturas para el 12-nov. Los alumnos deben llegar con GitHub conectado, Supabase y cuenta de Cloudflare con token.
- Hay que decidirlo antes de la sesión de base de datos de Jose (13-nov): pasar después de Lovable Cloud a Supabase propio no es automático (SPEC-010, apartado 8).
- El ensayo del 5-nov ya dio pasos reales, tiempos y capturas: bloque A en 13 minutos (`sdd/specs/019-git-deploy-producto-lovable/notas.md`).

## 2. Objetivo
Que cada alumno, siguiendo solo la guía, llegue al 21-nov con su proyecto de Lovable conectado a GitHub y a su Supabase, y con su cuenta y su token de Cloudflare listos.

## 3. Para quién
- **Alumnos (18):** mitad perfil técnico, mitad diseño y negocio. Necesitan pasos cerrados, sin conocimientos previos de Git.
- **Gema:** la reenvía y la usa para comprobar quién está listo.
- **Jose:** conoce qué parte debe estar hecha antes de crear tablas.
- **Ayudante del Zoom:** la usa para desatascar.

## 4. Alcance
**Incluye:**
- Tono de **guía de usuario**: pasos numerados, directos y en imperativo, con una captura por paso clave. Sin teoría.
- Lovable (plan Pro) conectado a GitHub, con repo público.
- Supabase propio conectado por *More → Connectors → Supabase*, antes de crear tablas.
- Cuenta de Cloudflare, token (*Account · Workers Scripts · Edit*) y Account ID.
- Lista final de "¿lo tienes?".
- Avisos del ensayo: nombre sin tildes, no renombrar el repo, no activar el backend de Lovable y no subir información confidencial.
- Límites gratuitos relevantes, verificados con fuente y fecha (constitution 3.2).

**No incluye:**
- Los pasos de la sesión: workflows, protección de `main` y PR. Van en el portal y el guion (SPEC-015 y SPEC-016).
- Teoría (SPEC-014).
- El squad (SPEC-017).

## 5. Requisitos
- **R1.** Al terminar, el alumno es capaz de enseñar en su repo de GitHub que es público y está sincronizado con Lovable.
- **R2.** Es capaz de mostrar en Lovable su proyecto de Supabase como *Connected*.
- **R3.** Es capaz de guardar el token y el Account ID sin que nadie los vea, y sabe que no se comparten ni se pegan en el chat de Lovable.
- **R4.** Cada paso con riesgo de error tiene un aviso, a partir de lo visto en SPEC-018 y SPEC-019.
- **R5.** Todas las capturas son reales y no muestran tokens, Account ID, claves ni correos.
- **R6.** La fuente es Markdown y el PDF se genera a partir de ella (constitution, apartado 4). Se publica en `sesiones/2026-11-git-deploy/descargas/`, con URL estable.
- **R7.** Incluye a quién pedir ayuda y hasta qué fecha.

## 6. Criterios de aceptación
- [ ] CA1. Cabe en la extensión acordada con Gema.
- [ ] CA2. Cada paso coincide con lo ejecutado en el bloque A de `ensayo.md`.
- [ ] CA3. Una persona que no conozca el flujo la completa sin ayuda, cronometrada (constitution 3.5).
- [ ] CA4. 0 capturas con valores sensibles, comprobado una a una.
- [ ] CA5. Cada límite gratuito citado lleva fuente y fecha.
- [ ] CA6. Jaime la aprueba antes de enviarla a Gema.

## 7. Restricciones (constitution)
2.5 lenguaje de PM · 3.2 coste 0 salvo Lovable Pro · 3.3 plan B · 3.4 nada de secretos reales · 3.5 reproducible desde cero · 4 URL estables y PDF generado · 5.4 nada de inventar datos.

## 8. Decisiones (Jaime, 5-nov)
- [x] **Extensión:** una página resumen con la lista "¿lo tienes?" y, detrás, el paso a paso.
- [x] **Secretos en GitHub:** último paso de la guía, si Gema lo acepta. Plan B: al empezar P1 (unos 10 min).
- [x] **Calendario:** todo antes del 21-nov (Jaime, 7-nov). Se mantiene la regla de conectar Supabase antes de crear tablas.
- [x] **Token:** caducidad de 1 año.
- [x] **Prueba sin conocer el flujo (CA3):** alguien de Gema o el ayudante.
- [x] **Publicación:** PDF en `sesiones/2026-11-git-deploy/descargas/`, con enlace desde el portal cuando exista.
- [ ] **Dudas:** el borrador dice "Gema, por el Slack del curso". Pendiente de confirmar.

## 9. Plan y tareas
Es un solo documento, así que plan y tareas van aquí.

| ID | Tarea | Ficheros | Estado |
|---|---|---|---|
| T01 | Capturas del ensayo, recortadas y con los datos sensibles tapados. | `sesiones/2026-11-git-deploy/Guia/capturas/` | ☑ |
| T02 | Texto de la guía y generador del PDF. | `sesiones/2026-11-git-deploy/Guia/guia_requisitos_previos.md`, `scripts/generar_guia_pdf.py`, `sesiones/2026-11-git-deploy/descargas/guia_requisitos_previos.pdf` | ☑ |
| T03 🧑 | Jaime revisa la guía y confirma el canal de dudas. | — | ☐ |
| T04 🧑 | Prueba con alguien que no conozca el flujo (CA3). | — | ☐ |
| T05 | Ajustes tras la prueba y envío a Gema (lo hace Jaime). | guía y PDF | ☐ |

## 10. Hallazgos
- **Supabase gratis pausa los proyectos tras 1 semana de inactividad** (https://supabase.com/pricing, consultado el 5-nov). Va en la guía, y hay que recordarlo antes del Demo Day.
