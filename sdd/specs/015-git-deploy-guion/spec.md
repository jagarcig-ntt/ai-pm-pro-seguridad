# SPEC-015 · Guion, cheat sheet y kit de la sesión Git/Deploy

| Campo | Valor |
|---|---|
| Estado | borrador (7-nov) |
| Sesión | 2026-11 Git/Deploy (sábado 21-nov · 10:00–14:00 · Zoom) |
| Fecha límite | 2026-11-16 (antes del ensayo completo) |
| Depende de | SPEC-010 v4.1 (escaleta) · SPEC-014 v2 (teoría) · SPEC-019 (ensayo y demos) · constitution v1.6 |
| Alimenta | SPEC-016 (portal) |
| Responsable | Jaime García |

## 1. Problema / necesidad
- La escaleta v4.1 (SPEC-010, anexo A) dice qué bloques hay, pero no qué se dice ni qué se hace minuto a minuto.
- Los guiones de junio tenían **timings incoherentes** entre la tabla de contenidos, las cabeceras, los quizzes y `CHEAT-SHEET.md` (`sdd/specs/020-retro-junio/retro.md`). La constitution 1.6 exige una sola fuente de verdad.
- La teoría (`sesiones/2026-11-git-deploy/Teoria/`) es de referencia y más larga de lo que cabe: el guion debe elegir qué se cuenta en 65 minutos.
- Lo más valorado en junio fue lo guiado y paso a paso, y el kit para aplicar al día siguiente (retro, apartado 2). La checklist y el mapa de entornos han salido de la sesión y pasan al kit.
- La práctica es con 18 personas a la vez y un ayudante: hace falta decir qué hace cada uno en cada momento.

## 2. Objetivo
Que Jaime y el ayudante puedan impartir las 4 horas siguiendo un solo documento, y que cada alumno se lleve un kit que pueda usar al día siguiente.

## 3. Para quién
- **Jaime:** guion completo y cheat sheet de una página para tener delante.
- **Ayudante del Zoom:** qué vigilar en cada práctica y errores esperados.
- **Alumnos (18):** el kit.
- **SPEC-016:** el portal se deriva del guion.

## 4. Alcance
**Incluye:**
- `GUION-SESION.md`: minuto a minuto, con el formato de `sdd/templates/guion-bloque.md` y qué digo, qué hago, qué hace el alumno, cómo verifico y plan B.
- `CHEAT-SHEET.md`: una página, derivada del guion.
- Instrucciones de P1 y P2 para el alumno, en tono de guía de usuario, incluidos los prompts para Lovable.
- Pre-sesión: comprobaciones del día y preparación de la demo.
- Kit del alumno: checklist de go-live, chuleta de Git, mapa de entornos, workflows y plantilla de PR.

**No incluye:**
- La maquetación en el portal (SPEC-016).
- Los cambios de la teoría (SPEC-014 v2).
- El squad (SPEC-017): solo una mención de pasada.

## 5. Requisitos
- **R1.** Los minutos suman exactamente 240 y coinciden con el anexo A de SPEC-010. Cheat sheet y portal se derivan del guion.
- **R2.** Cada bloque sigue el patrón de la constitution 2.4, con "Antes de entrar" y máximo 3 ideas.
- **R3.** Ningún tramo expositivo pasa de 12 min sin interacción (2.7).
- **R4.** Cada bloque tiene una verificación ligera (2.9). P1 y P2 tienen puntos de control en el chat.
- **R5.** Cada práctica declara qué hace el ayudante y los errores esperados, a partir de `sdd/specs/019-git-deploy-producto-lovable/notas.md`.
- **R6.** Cada demo tiene plan B probado (3.3).
- **R7.** Ningún paso muestra un token ni un secreto en pantalla (3.4).
- **R8.** Al terminar, el alumno es capaz de:
  - abrir un PR y hacer merge con *Create a merge commit*;
  - decir dónde están sus tres entornos;
  - explicar qué pasa desde un cambio en Lovable hasta producción;
  - volver a una versión anterior, o decir cómo hacerlo.
- **R9.** El kit se puede usar sin haber asistido a la sesión.
- **R10.** Toda fuente del kit es Markdown, y los PDF se generan de ella.

## 6. Criterios de aceptación
- [ ] CA1. La suma de minutos da 240 y coincide con SPEC-010 (comprobado por script).
- [ ] CA2. El guion, la cheat sheet y la escaleta no se contradicen.
- [ ] CA3. Cada idea de F1–F4 que se cuenta está en la teoría, y cada caso lleva fuente.
- [ ] CA4. Cada práctica tiene puntos de control, errores esperados y papel del ayudante.
- [ ] CA5. Los pasos de P1 y P2 coinciden con `ensayo.md`.
- [ ] CA6. Jaime lo valida en el ensayo completo de la semana del 16-nov.

## 7. Restricciones (constitution)
1.6 una sola fuente de verdad · 2.1–2.5 patrón de bloque y lenguaje de PM · 2.7 ritmo · 2.8 timings honestos · 2.9 verificación · 2.11 kit · 2.12 dinamismo · 3.3 plan B · 3.4 nada de secretos · 4 Markdown como fuente.

## 8. Decisiones y preguntas abiertas
- [x] **Quizzes** (Jaime, 7-nov): sin quiz. Una pregunta rápida en el chat por familia.
- [ ] **Ayudante** (Jaime, 7-nov): no lleva guion, sino una **guía de cómo operar** durante la sesión. Su contenido depende del soporte que dé Gema, y Jaime lo hablará con ella.
- [ ] **Salas de Zoom para desatascar:** en espera.
- [ ] **Reto posterior** (Jaime, 7-nov): "no hace falta". Pendiente de aclarar si se elimina el reto, lo que afecta a SPEC-010 (R13) y a la constitution (2.9).
- [ ] **¿Y si los secretos no vienen de casa?** El plan B cuesta unos 10 min de P1 (SPEC-010).

## 9. Hallazgos fuera de alcance
- La frase de éxito de SPEC-010 y la constitution se mantiene, aunque la rama `staging` fija queda como extra.
