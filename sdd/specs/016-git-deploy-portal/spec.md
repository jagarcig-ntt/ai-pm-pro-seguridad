# SPEC-016 · Portal de la sesión Git/Deploy

| Campo | Valor |
|---|---|
| Estado | **en curso** · aprobada por Jaime el 9-nov |
| Sesión | 2026-11 Git/Deploy (sábado 21-nov · 10:00–14:00 · Zoom) |
| Fecha límite | 2026-11-16 (antes del ensayo completo) |
| Depende de | SPEC-015 (guion, guía de la práctica y kit) · SPEC-014 v2 (teoría) · SPEC-001 (`assets/` y hub) · constitution v1.6 |
| Responsable | Jaime García |

## 1. Problema / necesidad
- **Es la pieza clave para Jaime (9-nov):** es lo que comparte en pantalla durante las 4 horas y lo que los alumnos consultan después.
- `sesiones/2026-11-git-deploy/` no tiene `index.html`. El README de la sesión ya lo prevé como `index.html` de esa carpeta, apoyado en `../../assets/`.
- El portal de junio (`sesiones/2026-12-seguridad-v2/index.html`, 1.493 líneas) funcionó. Su estilo y comportamiento ya están extraídos a `assets/` (`assets/README.md`): tokens, tarjetas por familia, acordeones, notas del orador con `?notas` o la tecla `N`, y barra de progreso.
- Todo el contenido ya existe: el guion (`Teoria/GUION-SESION.md`), la teoría v2, la guía de la práctica y el kit (`Guia/`), las descargas (`descargas/`) y los ficheros (`Lab/workflows/`). La constitution (1.6) pide que el portal se derive del guion y no lo contradiga.
- La tarjeta de esta sesión en el hub (`index.html`) aún habla del Deployment Agent Squad como herramienta central, y eso ya no es así.

## 2. Objetivo
Un portal que acompaña el guion bloque a bloque, que Jaime puede proyectar con sus notas, y que los alumnos pueden seguir sin haber asistido.

## 3. Para quién
- **Jaime:** lo proyecta en Zoom en el orden del guion, con notas del orador ocultas para los alumnos.
- **Alumnos (18):** durante la práctica copian prompts y ficheros; después lo usan como referencia.
- **Ayudante:** lo usa para orientar a quien se atasca.

## 4. Alcance
**Incluye:**
- `sesiones/2026-11-git-deploy/index.html`, con `assets/` y la identidad de junio (constitution 3.6).
- Secciones en el orden del guion:
  1. de Lovable a producción;
  2. qué os lleváis;
  3. el mapa del día;
  4. F1–F4, con "Antes de entrar", 3 ideas, caso real y lo que el PM se lleva;
  5. la demo con `feedback-hub`;
  6. P1 y P2;
  7. el kit;
  8. descargas;
  9. cierre.
- Notas del orador, derivadas de las notas 🎓 del guion.
- Prácticas copiables: prompts y enlaces a los ficheros.
- Actualizar la tarjeta de la sesión en el hub.

**No incluye:**
- Contenido nuevo: todo sale del guion, la teoría, la guía y el kit.
- Cambios en `assets/` que afecten al portal de diciembre, salvo que se justifiquen.
- El squad (SPEC-017), más allá de una mención de pasada.

## 5. Requisitos
- **R1.** El portal sigue el orden y los nombres de bloque del guion. Las horas que muestra coinciden con él.
- **R2.** Durante la práctica, el alumno es capaz de copiar cada prompt y abrir cada fichero desde el portal, sin buscar en el repo.
- **R3.** Las notas del orador solo se ven con `?notas` o la tecla `N`.
- **R4.** Identidad de junio: fondo oscuro, acento `#DCEE3C`, Fraunces, Manrope y JetBrains Mono, y el logo de Hero Camp sin modificar. Estilo común desde `assets/`.
- **R5.** Enlaces estables (constitution 4): portal en la URL limpia de la sesión y descargas en `descargas/`.
- **R6.** Funciona en el navegador sin servidor (HTML estático en GitHub Pages) y se lee bien al compartir pantalla en Zoom.
- **R7.** Ningún dato sensible en el portal ni en sus capturas.

## 6. Criterios de aceptación
- [ ] CA1. Cada bloque del guion tiene su sección, en el mismo orden y con la misma hora.
- [ ] CA2. `python scripts/check_links.py` sin enlaces rotos, incluidos los del portal nuevo y el hub.
- [ ] CA3. Verificado en el navegador con capturas: escritorio, móvil, modo notas y una prueba de copiar un prompt (constitution 5.6).
- [ ] CA4. 0 datos sensibles en el HTML.
- [ ] CA5. Contenido coherente con la teoría, la guía y el kit: sin cifras ni casos que no estén allí.
- [ ] CA6. Jaime lo valida en el ensayo completo de la semana del 16-nov.

## 7. Restricciones (constitution)
1.6 una sola fuente de verdad · 2.1–2.4 patrón de bloque · 3.4 nada de secretos · 3.6 portales estáticos con base común e identidad de junio · 4 URL estables · 5.6 el portal es sensible: verificación en el navegador antes del commit.

## 8. Decisiones (Jaime, 9-nov)
- [x] **Uso en la sesión:** hilo conductor proyectado; se salta a GitHub, Lovable o Cloudflare para las demos.
- [x] **Práctica:** dentro del portal, con botones para copiar cada prompt; el PDF como descarga.
- [x] **Enlace:** se comparte al empezar la sesión y lo menciona la guía de requisitos.
- [x] **"Quién soy":** se reutiliza de junio en versión corta.
- [x] **Tarjeta del hub:** "Tu producto de Lovable en producción: ramas, Pull Requests, entornos y CI/CD con GitHub y Cloudflare".
- [x] **Botones de copiar:** solo en este portal; `assets/` no se toca.
