# SPEC-013 · Guía de requisitos previos para los alumnos

| Campo | Valor |
|---|---|
| Estado | borrador (5-nov) |
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

## 8. Preguntas abiertas
- [ ] **¿Una página de verdad?** Gema pide una página, pero con capturas no cabe. Propuesta: una página resumen con la lista "¿lo tienes?" y, detrás, el paso a paso.
- [ ] **¿Se piden los secretos en GitHub de casa?** Jaime intentará pedirlo a Gema. Propuesta: incluirlos como último paso. Plan B: se hacen al empezar P1 (unos 10 min).
- [ ] **¿Cuándo hacen cada parte?** Propuesta: cuentas antes del 13-nov, y Supabase conectado al empezar la sesión de Jose.
- [ ] **Caducidad del token.** Propuesta: 1 año, para no dejarlo sin fecha y que no caduque antes del Demo Day.
- [ ] **¿Quién atiende las dudas y por qué canal?** Hace falta para R7.
- [ ] **¿Quién hace CA3?** Propuesta: alguien sin experiencia en el flujo, si Gema o el ayudante pueden.
- [ ] **¿Dónde se publica?** Propuesta: PDF en `descargas/`, con enlace desde el portal cuando exista.

## 9. Hallazgos fuera de alcance
- La plantilla de PR no está en los pasos del alumno, aunque SPEC-010 (R11) la incluye en su kit. Falta decidir si va como tercer prompt (ver SPEC-019).
