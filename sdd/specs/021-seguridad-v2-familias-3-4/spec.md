# SPEC-021 · Rediseño de las familias 3 y 4 (Seguridad v2)

| Campo | Valor |
|---|---|
| Estado | borrador (11-nov) |
| Sesión | 2026-12 Seguridad v2 (jueves 11-dic · 17:00–21:00) |
| Fecha límite | 2026-11-30 |
| Depende de | SPEC-020 (retro validada el 11-nov) · SPEC-022 (pipeline: formato de los agentes de F3 y F4) · constitution v1.6 |
| Alimenta | SPEC-023 (guion de 4h) · SPEC-024 (portal) |
| Responsable | Jaime García |

## 1. Problema / necesidad
- **La retro de junio, validada por Jaime el 11-nov** (`sdd/specs/020-retro-junio/retro.md`), identifica F3 y F4 como las partes peor resueltas:
  - **F3, datos sensibles:** 9 ideas en unos 50 minutos, mezclando un eje técnico (logs, datos de prueba, respuestas de API) y otro legal (RGPD, 72 horas).
  - **F4, configuración:** 7 ideas en el bloque más corto, con lo más técnico (CORS y cabeceras) al final y sin pausa.
  - **Duración real:** F3 y F4 sumaron alrededor de 1 hora porque F1 y F2 se alargaron.
- **Teoría actual** en `sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/Bloque Teorico/`:
  - `familia3_datos_sensibles_alumnos.md`: 336 líneas y 4 casos (Samsung 2023, multas RGPD 2025, estadística de datos reales en pruebas e IBM 2025).
  - `familia4_entornos_configuracion_alumnos.md`: 297 líneas y 4 casos (CBIZ 2024, bucket S3 indio 2025, BlueBleed 2022 y Spring Boot Actuator 2025).
  - Sus versiones de formador están en `Formador/`.
- **La audiencia ha cambiado:** 18 alumnos, mitad técnicos y mitad diseño y negocio, que el 11-dic tendrán **su producto de Lovable con Supabase publicado en Cloudflare** tras la sesión del 21-nov. En junio se trabajó sobre productos de prueba (`feedbackhub`).
- **Retro, apartado 5:** cifras y casos con fecha que hay que verificar o actualizar.

## 2. Objetivo
Que F3 y F4 respeten el máximo de 3 ideas por bloque, tengan tiempo protegido y una práctica sobre el producto de cada alumno, y que cada cifra y caso esté verificado con fuente y fecha.

## 3. Para quién
- **Alumnos:** guía de referencia en lenguaje de PM y una práctica sobre su producto.
- **Jaime:** versión de formador con qué enfatizar, errores esperados y plan B.
- **SPEC-022, 023 y 024:** qué deben detectar los agentes de F3 y F4, qué entra en el guion y qué en el portal.

## 4. Alcance
**Incluye:**
- **F3 en dos ejes**, cada uno con máximo 3 ideas (decisión de la retro):
  - *Dónde se escapan los datos*, técnico y con ejercicio.
  - *Qué te exige la ley*: RGPD y 72 horas.
- **F4 con 3 ideas:** endpoints expuestos, CORS explicado con una analogía y el mimetismo del agente. Las cabeceras pasan a la checklist del kit (decisión de la retro).
- Versiones de alumnos y de formador, con el patrón de bloque y la sección "cómo se ve en tu producto", como en la teoría de noviembre.
- **Una práctica por familia** sobre el producto de Lovable de cada alumno, con dos variantes: quien ejecuta el pipeline y quien trabaja con el informe preparado por Jaime.
- Verificación o sustitución de cada cifra y caso, con fuente y fecha.
- La parte del kit de seguridad que corresponde a F3 y F4, incluida la checklist de configuración.

**No incluye:**
- F1 y F2 (ver preguntas abiertas).
- El pipeline (SPEC-022), el guion y los tiempos finales (SPEC-023) ni el portal (SPEC-024).

## 5. Requisitos

### Objetivos de aprendizaje
- **F3 · datos:** el alumno es capaz de señalar en su producto dónde pueden escaparse datos personales (lo que guarda, lo que registra y lo que envía a servicios de IA) y de decidir cuál arreglar primero.
- **F3 · ley:** el alumno es capaz de explicar qué le obliga a hacer el RGPD si su producto sufre una brecha, incluido el plazo de 72 horas, y quién tiene que decidir qué.
- **F4:** el alumno es capaz de identificar en su producto un endpoint o una configuración expuesta, explicar con una analogía qué protege CORS y reconocer cuándo el agente ha copiado una configuración insegura.

### Formato
- **R1.** Máximo 3 ideas por bloque (constitution 2.3). F3 se divide en dos bloques de 3.
- **R2.** Patrón de bloque y "Antes de entrar" con un máximo de 3 términos (2.2 y 2.4).
- **R3.** La práctica se hace sobre el producto de Lovable del alumno, y existe un producto de prueba como plan B (2.6 y 3.3).
- **R4.** Cada cifra y caso lleva fuente y fecha. Lo que no se pueda verificar, sale (5.4).
- **R5.** Lenguaje de PM: el resultado de la práctica es una decisión, no código (2.5).
- **R6.** Las prácticas funcionan para la mitad no técnica, sin instalar nada (variante con informe).

## 6. Criterios de aceptación
- [ ] CA1. F3 y F4 tienen como máximo 3 ideas por bloque, comprobado en el índice de cada fichero.
- [ ] CA2. Cada objetivo de aprendizaje tiene su práctica y una verificación visible.
- [ ] CA3. Cada cifra y caso tiene fuente y fecha comprobadas en una tabla de verificación. Ninguno queda sin fuente.
- [ ] CA4. La práctica se ha probado sobre un producto de Lovable con Supabase real (`feedback-hub` o `notas-al-d-a`), en las dos variantes.
- [ ] CA5. Las versiones de alumnos y de formador no se contradicen.
- [ ] CA6. Jaime revisa F3 como prototipo antes de hacer F4.

## 7. Restricciones (constitution)
2.3 máximo 3 ideas · 2.4 patrón de bloque · 2.5 lenguaje de PM · 2.6 práctica sobre lo suyo · 2.7 ritmo · 3.2 coste 0 · 3.3 plan B · 3.4 nada de secretos reales · 5.4 nada de inventar datos.

## 8. Preguntas abiertas
- [ ] **¿Y F1 y F2?** Funcionaron mejor, pero se alargaron y se comieron el tiempo de F3 y F4. Propuesta: no rediseñarlas aquí. En SPEC-023 tendrán tiempos cerrados, se actualizarán sus cifras y se añadirán los casos propios de noviembre (la clave secreta copiada por error el 22-oct, el `.env` público de Lovable o la tabla abierta a cualquiera).
- [ ] **¿Tiempos?** La retro propone unos 60 minutos para F3 y unos 50 para F4. Propuesta: mantenerlos como objetivo y cerrarlos en SPEC-023.
- [ ] **¿Casos?** Propuesta: conservar los que se puedan verificar y sustituir, si hay alternativas documentadas, los que estén lejos de un producto como el suyo (por ejemplo, Spring Boot Actuator), por casos cercanos al ecosistema de Lovable y Supabase.
- [ ] **¿Cuánto RGPD?** Propuesta: solo lo que decide un PM (qué datos guardas, para qué y qué haces si hay una brecha), sin entrar en detalle legal.
- [ ] **¿La práctica de F3 se basa en lo que envían a servicios de IA?** Depende de si sus productos usan IA. Propuesta: preguntarlo en la encuesta de Gema o con la lista de repos, y tener una práctica alternativa.
