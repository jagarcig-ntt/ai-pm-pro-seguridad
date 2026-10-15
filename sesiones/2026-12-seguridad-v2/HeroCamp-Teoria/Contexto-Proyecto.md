# CLAUDE.md
## Contexto operativo · AI PM Pro Security Session
## Léelo entero antes de hacer cualquier cosa.

*Última actualización: 17 de junio de 2026*
*Sesión: AI PM Pro · The Hero Camp · 26 de junio de 2026 · Zoom · 3 horas*

---

## 1. Qué es este proyecto

Jaime García (AI Engineering Lead, NTT DATA) imparte una sesión de formación de 3 horas sobre seguridad en desarrollo con IA para 11 Product Managers Senior del curso AI PM Pro (The Hero Camp). Coordinadora: Maribel Fernández.

El material principal de la sesión es **un portal web HTML** (`portal_sesion.html`) que sustituye a las diapositivas tradicionales. La elección es deliberada: los alumnos trabajan con herramientas web (Lovable, Supabase, Claude Code) y el portal habla su mismo lenguaje visual.

El portal está en este repositorio y se publica vía **GitHub Pages**.

---

## 2. Estado actual del portal (17 jun 2026)

### Completado ✅

- Diseño editorial técnico nocturno (Fraunces + JetBrains Mono + Manrope, fondo oscuro, acento lima `#DCEE3C`)
- Header fijo con navegación por secciones y scroll-spy
- Barra de progreso superior
- Logo Hero Camp real (PNG en base64) en header y footer — **no modificar, es el logo oficial**
- Vista de notas privadas: parámetro `?notas` en URL o tecla `N`
- Sección "Quién soy" basada en LinkedIn real de Jaime
- 3 tarjetas de impacto desplegables (82K$, 29M registros, ×2 tasa de fuga)
- 4 familias de riesgo como tarjetas expandibles con SVGs, mecanismos, datos y casos reales
- Bloque **"Antes de entrar"** al inicio de cada familia con analogías en lenguaje no técnico:
  - F1 (coral): Clave de API, .env, Secrets/variables de entorno
  - F2 (azul): RLS, Anon key, Service role key
  - F3 (jade): PII/Dato personal, RGPD, Log
  - F4 (violeta): CORS
- Quiz diagnóstico (16 preguntas, 4 por familia) colocado **antes** de las familias — funciona como "¿qué sabes ya?" antes de entrar en materia
- Sección Práctica (bloque 2 de la sesión)
- Sección Debate
- Sección Cierre con 3 compromisos

### Estructura de secciones (en orden)

```
Inicio → Quién soy → Qué te llevas → Impacto → Quiz previo → Las 4 familias → Práctica → Debate → Cierre
```

### Pendiente 🔲

- Reencuadre narrativo del bloque Práctica: presentarlo como ejercicio guiado para PM, no como tarea de engineer. Output = informe de decisión, no código. El ZIP con el entorno configurado elimina el setup en vivo.
- Ampliar notas del orador (vista `?notas`) con el script minuto a minuto de la sesión

---

## 3. Otros materiales del proyecto

| Archivo | Estado | Descripción |
|---|---|---|
| `guion_sesion.md` | ✅ Completo | Guion minuto a minuto de las 3 horas |
| `guia_seguridad_alumnos.md` | ✅ Completo | Checklist operativo entregable a alumnos |
| `CLAUDE.md` (pipeline) | ✅ Completo | Contexto para construir el pipeline de auditoría |
| `familia{1-4}_profundo.md` | ✅ Completo | Documentos de referencia por familia (~330 líneas c/u) |
| Repo trampa FeedbackHub | 🔲 Por construir | Proyecto con 8 fallos sembrados para la demo |
| Pipeline TypeScript | 🔲 Por construir | 4 skills + orquestador + CLI |
| ZIP para alumnos | 🔲 Por preparar | Entorno preconfigurado, deadline: fin de semana 21-22 jun |

---

## 4. Las cuatro familias de riesgo

**F1 · Credenciales y claves de acceso** — color: coral `#FF7A6B`
- Historia personal: Jaime subió .env a GitLab varias veces
- Caso estrella: startup mexicana, 82.314$ en 48h (Gemini, feb 2026)
- Términos clave: API key, .env, secrets/variables de entorno

**F2 · Bases de datos y permisos** — color: azul `#6B9DFF`
- Historia personal: BBDD PostgreSQL creada sin seguridad "para la demo"
- Caso estrella: CVE-2025-48757 (Lovable+Supabase, 170+ apps, 13.000 usuarios)
- Términos clave: RLS, anon key, service role key, trifecta letal (Willison)

**F3 · Datos sensibles y privacidad** — color: jade `#7FD1B9`
- Caso estrella: Samsung, 3 fugas de código propietario a ChatGPT en 20 días
- Términos clave: PII, RGPD, log
- Dato clave: 1.200M€ en multas RGPD 2025, 72h para notificar

**F4 · Configuración de entornos** — color: violeta `#A78BFA`
- Historia personal: compañeros borraron procesos enteros por permisos excesivos
- Caso estrella: CBIZ 2024, endpoint sin auth 3 meses, 36.000 registros
- Términos clave: CORS, variables de entorno, permisos excesivos

---

## 5. El pipeline de seguridad (por construir)

Arquitectura: `CLI → Orquestador → 4 Skills en paralelo → security-report.md`

- **Skill 1** `skill-credentials`: detecta claves expuestas en código e historial Git
- **Skill 2** `skill-database`: audita RLS y permisos Supabase
- **Skill 3** `skill-data-privacy`: detecta PII en logs y respuestas API
- **Skill 4** `skill-configuration`: audita configuración de entornos (CORS, headers, debug)

El repo trampa "FeedbackHub" tiene 8 fallos sembrados (5 CRÍTICOS + 3 ALTOS).
El pipeline debe detectar exactamente los 8. Ver `CLAUDE.md` del pipeline para detalle completo.

Comando de ejecución para alumnos:
```bash
npx audit-security --repo ./ruta/al/repositorio
```

---

## 6. GitHub Pages — cómo está desplegado el portal

El portal es un único archivo HTML autocontenido (`portal_sesion.html`).
No tiene dependencias externas: fuentes, logo y assets van en base64 o via CDN en el propio HTML.

Para desplegarlo:
1. El archivo `portal_sesion.html` va en la raíz del repo (o en `/docs`)
2. GitHub Pages sirve desde `main` → raíz (o `/docs`)
3. URL resultante: `https://jaimegarcia.github.io/ai-pm-pro-seguridad/portal_sesion.html`

**No renombres el archivo** sin actualizar también los enlaces que puedas haber compartido con Maribel o los alumnos.

---

## 7. Decisiones de diseño tomadas — no revertir sin consultar

- Portal web HTML en lugar de PPT: coherencia con las herramientas que usan los alumnos
- Logo Hero Camp en base64: sin dependencias externas, funciona offline y en GitHub Pages
- Quiz antes de las familias: funciona como diagnóstico "¿qué sabes ya?" — no moverlo sin motivo
- Vista `?notas`: solo visible para el formador, nunca compartir la URL con ese parámetro
- Bloques "Antes de entrar" en todas las familias: respuesta directa al feedback de Maribel
- Práctica = ejercicio guiado de PM, no tarea de engineer — el framing importa tanto como el contenido

---

## 8. Contexto de la audiencia

- 11 Product Managers Senior, perfiles heterogéneos
- Construyen con Claude Code + Lovable + Supabase + GitHub + Cloudflare Pages
- No tendrán producto propio desplegado el día de la sesión
- Algunos no tienen background técnico: las analogías y el framing son tan importantes como los datos
- El grupo funciona bien con anclar el "para qué" antes de entrar en materia (feedback Maribel)
- Sesión online por Zoom, sin salas pequeñas, debate en sala principal

---

## 9. Contactos

- **Jaime García** — formador, AI Engineering Lead NTT DATA
- **Maribel Fernández** — coordinadora del curso, The Hero Camp
- **Manu** — copiado en comunicaciones del curso
