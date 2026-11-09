# PLAN · SPEC-015 · Guion, cheat sheet y kit de la sesión Git/Deploy

*Spec: [spec.md](spec.md) · Estado del plan: borrador (9-nov)*

## 1. Enfoque
- **El guion es la única fuente de los minutos:** la cheat sheet, el portal y la guía de la práctica se derivan de él.
- **Se escribe con el formato de `sdd/templates/guion-bloque.md` y el tono del guion de junio**, que funcionó: frases en cámara, acciones y pausas (`sesiones/2026-12-seguridad-v2/HeroCamp-Teoria/GUION-SESION-COMPLETO.md`).
- **El contenido sale de la teoría v2:** de cada familia se cuenta lo que cabe en su bloque, sin inventar nada nuevo.
- **Las prácticas salen del ensayo** (`sdd/specs/019-git-deploy-producto-lovable/ensayo.md`), que ya tiene pasos reales, tiempos y errores.
- **Un script comprueba que los minutos suman 240** y coinciden con la escaleta de SPEC-010.

**Descartado:**
- Un guion por bloque en ficheros separados: complica mantener los minutos en un solo sitio.
- Quizzes: decisión de Jaime del 7-nov.

## 2. Diseño

### 2.1 Escaleta detallada (240 min, igual que SPEC-010 v4.1)

| Hora | Bloque | Segmentos (min) | Interacción | Verificación |
|---|---|---|---|---|
| 10:00 | **B0 Apertura** (15) | Saludo y para qué (3) · qué os lleváis: el producto de Lovable en producción (3) · recuento de requisitos en el chat (5) · mapa del día y reglas de la sesión grabada (4) | Chat: ✅ repo público · ✅ Supabase conectado · ✅ secretos guardados | Recuento de requisitos |
| 10:15 | **T1 · F1 Git** (20) | Antes de entrar: repositorio, rama, PR (2) · para qué (2) · rama y rama conectada en Lovable (4) · commit con sentido: historial real de "Changes" (4) · PR y caso Google Cloud (6) · lo que se lleva (2) | Chat: "del 1 al 5, ¿cuánto habéis tocado Git?" · "¿qué preguntaríais en este PR?" | Respuestas en el chat |
| 10:35 | **T2 · F2 Entornos** (15) | Antes de entrar (1,5) · para qué (2) · tres entornos y por qué Lovable no es staging, con el 500 (4) · misma app, distinta configuración, y el `.env` público (4) · Replit y nuestra producción rota antes del PR: "lee el SQL" (3) · lo que se lleva (0,5) | Chat: "¿cuántas bases de datos tiene vuestro producto?" | Respuestas en el chat |
| 10:50 | **T3 · F3 CI/CD** (15) | Antes de entrar (1,5) · para qué (2) · el workflow leído en voz alta (3) · demo: PR en verde con preview y PR #6 en rojo y bloqueado (4) · CrowdStrike (3) · lo que se lleva y anuncio de P1 (1,5) | Chat: "¿cómo llega hoy un cambio a vuestros usuarios?" | Respuestas en el chat |
| 11:05 | **Pausa** (10) | | | |
| 11:15 | **P1 · Primer despliegue** (45) | Instrucciones en pantalla (5) · los 3 prompts en Lovable (15) · Actions en verde (10) · abrir la web y, quien tenga login, añadir su URL en Supabase (8) · margen (7) | Ayudante con los atascos | ✅ "ficheros en GitHub" · **URL de producción en el chat** |
| 12:00 | **Pausa** (10) | | | |
| 12:10 | **P2 · Gestión de cambios** (45) | Demo del ruleset y sus tres trampas: *Disabled*, sin rama objetivo y métodos de merge (5) · crear el ruleset (10) · cambio en Lovable y aviso naranja (7) · PR con plantilla, checks y preview (10) · merge commit y producción (8) · margen (5) | Ayudante con los atascos | ✅ ruleset *Active* · **enlace del PR en el chat** · producción actualizada |
| 12:55 | **T4 · F4 Go-live** (15) | Antes de entrar (1) · para qué (1,5) · la checklist, que va al kit (3) · simulacro F4: merge, web rota, rollback y revert (6) · Sonos (2,5) · lo que se lleva (1) | Chat: "¿qué hacemos?" durante el simulacro | Respuestas en el chat |
| 13:10 | **Pausa activa** (5) | | | |
| 13:15 | **Rescate** (25) | Alumno a alumno. Quien terminó: rama `staging` fija o checklist sobre su producto | | Las 2 URL de cada alumno |
| 13:40 | **B5 Cierre** (15) | Ronda de URL en el chat (5) · el kit (3) · el reto y el squad, de pasada (2) · puente al 11-dic (1) · preguntas y despedida (4) | Chat: pegar las dos URL | Recuento de URL |
| 13:55 | **Colchón** (5) | | | |

- **Suma:** 240 min.
- **Práctica:** 115 min (P1, P2 y rescate), un 48 %.
- **Tramos sin pausa:** 65, 45, 60 y 45 min.
- **Exposición más larga sin interacción:** 6 min (PR y caso Google Cloud, con pregunta al final).

### 2.2 Contenido de cada bloque
- **Teoría:** máximo 3 ideas, las de la teoría v2. Lo que no cabe se queda en el documento de referencia.
- **Casos propios del ensayo:**
  - F2: el 500 con todo en verde y la producción rota antes del PR.
  - F3: Lovable escribiendo código que no compila.
  - F4: el rollback en 3 minutos y el revert con un botón.
- **Demos:** en `feedback-hub`, con el PR #6 y la rama F4 recreada. Cada demo tiene captura como plan B.

### 2.3 Prácticas
**Guía de la práctica para el alumno.** Se proyecta y se enlaza en el portal. Sale de `ensayo.md`, con el tono de la guía de requisitos:
- **P1:**
  1. Los 3 prompts, con un enlace a cada fichero.
  2. Comprobar la ejecución en *Actions*.
  3. Copiar la URL y abrir la web.
  4. Quien tenga login: añadir la URL de producción en Supabase.
- **P2:**
  1. Crear el ruleset: *Active*, rama por defecto, check obligatorio y solo merge.
  2. Pedir un cambio en Lovable.
  3. Abrir el PR con el enlace `compare/main...lovable-sync`.
  4. Revisar los checks y la preview.
  5. Hacer el merge con *Create a merge commit*.
- **Errores esperados**, para Jaime y el ayudante: los de las notas de SPEC-019, como el ruleset sin rama, el aviso naranja, el login que lleva a `localhost` o los secretos mal puestos.

### 2.4 Kit del alumno
Un único documento, con fuente en Markdown y PDF generado:
1. **El ciclo de cada cambio**, en 5 pasos.
2. **Mapa de entornos** para rellenar, sacado de F2.
3. **Checklist de go-live**, que reutiliza `Lab/feedback-hub/checklist-go-live.md`.
4. **Chuleta de Git sin terminal:** vocabulario del glosario y dónde está cada botón en GitHub y Lovable.
5. **Los 3 ficheros** y el enlace a `Lab/workflows/`.
6. **El reto**, como mención y sin fecha (decisión del 8-nov).

### 2.5 Cheat sheet
Una página: horario, URL de las demos, frases puente, errores esperados y planes B.

## 3. Ficheros
| Acción | Ruta | Nota |
|---|---|---|
| crear | `sesiones/2026-11-git-deploy/Teoria/GUION-SESION.md` | Fuente única de los minutos |
| crear | `sesiones/2026-11-git-deploy/Teoria/CHEAT-SHEET.md` | Derivada del guion |
| crear | `sesiones/2026-11-git-deploy/Guia/guia_practica_sesion.md` | P1 y P2 para el alumno |
| crear | `sesiones/2026-11-git-deploy/Guia/kit_alumno.md` | El kit |
| crear | `scripts/check_timings.py` | Suma los minutos del guion y los compara con SPEC-010 |
| modificar | `scripts/generar_guia_pdf.py` | Que genere también los PDF de la guía de práctica y del kit |
| crear (generado) | `sesiones/2026-11-git-deploy/descargas/guia_practica_sesion.pdf`, `kit_alumno.pdf` | |
| reutilizar | Teoría v2, `ensayo.md`, `notas.md` de SPEC-019, `Lab/workflows/`, `Lab/feedback-hub/checklist-go-live.md`, `Guia/capturas/` | |
| más adelante | Guía de cómo operar para el ayudante | Cuando Jaime hable con Gema |

## 4. Riesgos y plan B
| Riesgo | Prob. | Mitigación / plan B |
|---|---|---|
| Los secretos no vienen hechos de casa | media | Variante en P1: +10 min para guardarlos, sin compartir pantalla. Se recorta el margen de P1 y el rescate |
| No se sabe aún qué soporte da el ayudante | media | El guion marca qué hace "el ayudante" en cada práctica. Si no hay, lo absorbe el rescate y se prioriza a quien está más atrás |
| Lovable cambia su comportamiento antes del 21-nov | baja | Ensayo completo la semana del 16-nov con un proyecto nuevo |
| GitHub, Lovable o Cloudflare caídos el día 21 | baja | Capturas de cada paso; la práctica se sigue sobre `feedback-hub` en pantalla y cada alumno la hace después con la guía |
| Algún alumno usa el backend de Lovable en lugar de Supabase propio | media | Queda fuera del flujo probado: sigue la sesión y conserva el *Publish* de Lovable |
| La demo F4 rompe producción de `feedback-hub` durante la sesión | intencionado | Rollback ensayado en 3 min y revert por PR. Recrear la rama antes del 21 (`notas.md`, T12) |
| Nombres de repo muy largos para la URL de preview | baja | Se detecta al compilar los 18 repos antes de la sesión |

## 5. Verificación
| Criterio | Cómo se verifica |
|---|---|
| CA1 | `python scripts/check_timings.py`: suma 240 y coincide hora a hora con SPEC-010 |
| CA2 | El script compara también las horas de la cheat sheet; revisión manual del portal en SPEC-016 |
| CA3 | Cada caso del guion enlaza a su familia de la teoría, y cada caso propio a `notas.md` |
| CA4 | Revisión de P1 y P2: puntos de control, errores esperados y papel del ayudante |
| CA5 | Comparación paso a paso de la guía de práctica con `ensayo.md` |
| CA6 | Ensayo completo cronometrado la semana del 16-nov |

## 6. Conformidad con la constitution
- **2.3 Máximo 3 ideas por bloque:** ✅ las de la teoría v2.
- **2.7 Ritmo:** ✅ pausas cada 45–65 min, y ningún tramo expositivo pasa de 6 min sin interacción.
- **2.8 Timings honestos:** ✅ 240 min.
- **2.12 Práctica:** ✅ 48 %.
- **3.2 Coste 0:** ✅ todo en planes gratuitos, salvo Lovable Pro.
- **3.3 Plan B:** ✅ captura o alternativa para cada demo y cada práctica.

**Tensión:** el 10 % de colchón (2.8) se cumple contando el rescate (25 min) más el colchón final (5 min), un 12,5 %. Pero el rescate también es práctica, así que esos minutos cuentan para las dos cosas. Si el ensayo lo pide, se puede subir el colchón final recortando el cierre.
