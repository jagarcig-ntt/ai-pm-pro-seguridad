# CHEAT SHEET · Seguridad v2 · jueves 10-dic · 19:00–21:00

*Sale de `GUION-SESION.md` (SPEC-023). Si no coinciden, manda el guion. Mensaje de la sesión: **Lovable protege una parte; la decisión es tuya.***

| Hora | Min | Bloque | Preguntas (chat o voz) |
|---|---|---|---|
| 19:00 | 10 | Apertura | 19:08 ¿Habéis abierto la guía? → pega el enlace |
| 19:10 | 27 | F1 · Claves y secretos | 19:20 · 19:28 · 19:35 |
| 19:37 | 27 | F2 · Datos y permisos | 19:47 · 19:55 · 20:02 |
| 20:04 | 8 | Pausa | Apunta las dudas del chat |
| 20:12 | 27 | F3 · Datos personales | 20:22 · 20:30 · 20:37 |
| 20:39 | 5 | Demo del pipeline de agentes | — |
| 20:44 | 4 | Cierre | 20:46 ¿Qué vas a revisar primero? |
| 20:48 | 12 | Colchón | Preguntas. Fin a las 21:00 |

**Cada familia (27 min):** +0 Para qué y Antes de entrar (3) · +3 Ideas 1 y 2 (7) · +10 Pregunta (2) · +12 Idea 3 y caso (6) · +18 Chequeo (7) · +25 Lo que te llevas y pregunta (2)

**En el portal, no bajes de «Caso real» antes del chequeo:** la tarjeta ya cuenta lo que pasó.

**Chequeo (7 min):** pregunta de predicción → prompt en directo → mientras responde, lo ya hecho → resumen de dos frases → mensaje. **Sin respuesta a los 4 min → captura** (`023/capturas/fN-prompt.png`).

| | Antes de entrar | Ideas | Caso | Preguntas | Chequeo: qué enseñar | Mensaje |
|---|---|---|---|---|---|---|
| **F1** | clave · clave pública · clave secreta | 1) No todas las claves son iguales. 2) Lovable guarda las secretas en *Secrets*, pero solo protege lo que pasa por Lovable. 3) Una clave publicada se usa en minutos | Startup mexicana: 82.314 $ en 48 h (feb-2026). Unit 42: menos de 5 min | ¿Dónde has pegado una clave? · ¿Lovable pondrá la clave en la web? · Una clave de tu producto: ¿pública o secreta? | Prompt 1 + la negativa del 24-nov en el historial del chat | Lovable te protege si la clave pasa por Lovable. Fuera, nadie |
| **F2** | base de datos · tabla · RLS | 1) Con la clave pública cualquiera puede consultar tu base de datos. 2) RLS decide qué filas ve cada usuario. 3) Lovable crea con RLS; si pides algo inseguro, lo hace y avisa | CVE-2025-48757 (Matt Palmer, 29-may-2025; Lovable lo disputa). *Moltbook (saltable)* | ¿Qué protege tus datos? · ¿Qué dirá el escáner? · ¿Dónde mirarías un aviso crítico? | Prompt 2 + **More → Security → Findings** (crítico de `notas_publicas`). **No pulsar** *Fix all* ni *Run checks* | Lovable avisa; la decisión es tuya |
| **F3** | dato personal · RGPD · brecha | 1) Pide solo lo que necesitas. 2) Dónde acaban los datos: consola, registros, IA. 3) 72 h para avisar (AEPD) | Samsung y ChatGPT (2023). *Multas de 2025, unos 1.200 M€ (saltable)* | ¿Qué datos pide tu registro? · ¿Lovable avisará de los datos de más? · Un dato que podrías quitar | Prompt 3 + vista previa del formulario (DNI, teléfono, fecha de nacimiento) | Ninguna herramienta decide por ti qué datos necesitas |

**Si vas tarde:** salta Cyble (F1), Moltbook (F2) y las multas (F3). El colchón absorbe el resto.

**Pipeline (20:39):** VS Code en `herocamp-security-pipeline`, terminal Git Bash → `bash auditar.sh https://github.com/jagarcig-ntt/feedback-hub --rama demo/seguridad` → `security-report.md`. 36–72 s. **Sin terminar a los 2 min o familia «No revisada» → `023/plan-b/security-report.md`.** Mensaje: no lo necesitáis; es la misma revisión, automatizada.

**Cierre (20:44):** checklist de la guía · Demo Day el 12-dic: mañana (11) nada de cambios grandes, salvo algo grave ("Si ya ocurrió") · datos de prueba en la demo, nada de *Secrets* en pantalla.

**Una hora antes (18:00):** pestañas: portal (sin `?notas`) · chat de `prueba-cloud` · Findings · vista previa del formulario · portal en `#prompts` · carpeta del plan B. VS Code con letra 28 o más y la orden escrita. ***Secrets* cerrado.** Chat de Zoom visible. Grabación activada. Agua.
