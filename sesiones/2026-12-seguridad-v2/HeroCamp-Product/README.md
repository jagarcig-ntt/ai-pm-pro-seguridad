# Pipeline de Seguridad — Guía de uso para alumnos

> HeroCamp · AI PM Pro · Sesión de Seguridad para Agentes IA

---

## Qué es esto

Cuatro agentes IA especializados que auditan tu repositorio en busca de los errores de seguridad más frecuentes cuando se construye con Claude Code.

Cada agente cubre una familia de riesgo:

| # | Familia | Qué detecta | Consecuencia si no se revisa |
|---|---------|-------------|------------------------------|
| 1 | Credenciales | API keys en código, .env commiteado, secretos en historial Git | Factura inesperada, cuenta comprometida |
| 2 | Base de datos | RLS desactivado en Supabase, service_role en cliente | Datos de usuarios expuestos sin alerta |
| 3 | Datos sensibles | PII en archivos de test, logs que guardan datos de usuarios | Multa RGPD, brecha notificable en 72h |
| 4 | Configuración | CORS wildcard, endpoints de debug en producción, headers ausentes | Acceso silencioso durante meses |

---

## Cómo ejecutarlo

### Desde Claude Code (recomendado)

Abre Claude Code en la carpeta de este proyecto y escribe:

```
/security-audit --repo ./ruta-a-tu-proyecto
```

El orquestador te preguntará si quieres auditoría completa (4 agentes en paralelo) o familia por familia.

### Auditoría completa

```
/security-audit --repo ./mi-proyecto
→ Elige opción A
→ Genera: mi-proyecto/security-report.md
```

### Solo una familia

```
/security-audit --repo ./mi-proyecto --family 1
→ Genera: mi-proyecto/security-report-f1.md
```

Útil cuando ya tienes el informe completo y quieres volver a revisar una familia concreta después de arreglar algo.

---

## El informe

El pipeline genera un archivo Markdown en la raíz de tu proyecto auditado. Está escrito para que lo entienda un PM, no un equipo técnico.

**Estructura del informe:**

1. **¿Puedo desplegar?** — respuesta inmediata: ✅ / ⚠️ / ❌
2. **Lo más urgente** — hallazgos críticos con impacto de negocio y tiempo estimado de resolución
3. **Hallazgos por área** — desglose por familia con ubicación exacta y acción concreta
4. **Plan de acción** — esta semana / antes del siguiente sprint / a medio plazo

**Si el informe dice NO DESPLEGAR:** hay al menos un hallazgo crítico explotable ahora mismo. No es una advertencia teórica.

---

## Cómo interpretar la severidad

| Nivel | Qué significa | ¿Bloquea el deploy? |
|-------|---------------|---------------------|
| 🔴 Crítico | Explotable en minutos por cualquiera con acceso al repo | Sí |
| 🟠 Alto | Riesgo real, debe resolverse antes de lanzar | Sí |
| 🟡 Medio | Mejora recomendada, no bloquea | No |

---

## Qué hacer cuando el pipeline encuentra algo

### Familia 1 — Credencial expuesta

1. **Rota la clave inmediatamente** en el panel del proveedor (OpenAI, Stripe, Google...). No investigues primero.
2. Añade `.env` a `.gitignore` si no está.
3. Mueve la clave a los Secrets de tu plataforma de deploy (Cloudflare Pages, Vercel, GitHub Actions).

### Familia 2 — RLS desactivado

1. Activa RLS en la tabla afectada desde el panel de Supabase → Table Editor → RLS.
2. Verifica que la política filtra por usuario real, no `USING (true)` (que permite todo).
3. Comprueba que la `service_role` key no aparece en código de cliente (frontend).

### Familia 3 — Datos reales o logs con PII

1. Sustituye los datos reales en archivos de test por datos sintéticos (`user@example.com`, nombres ficticios).
2. Elimina los logs que imprimen el objeto completo del usuario antes del siguiente commit.
3. Si los datos reales ya están en el historial Git, trátalo como una brecha: evalúa si notificar.

### Familia 4 — Configuración insegura

1. Cambia el CORS wildcard (`*`) por la lista exacta de dominios permitidos.
2. Elimina o protege con autenticación los endpoints de debug antes del deploy.
3. Revisa que las variables de entorno de producción fallen ruidosamente si falta alguna crítica.

---

## Cómo adaptar los agentes a tu stack

Los agentes son archivos de texto en `.claude/agents/`. Puedes abrirlos, leerlos y modificarlos.

**Casos frecuentes de personalización:**

**Añadir un patrón de credencial que el agente no detecta:**
Abre `.claude/agents/family-1-credentials.md`, localiza la sección "Proceso de trabajo" y añade el prefijo de la clave que quieres buscar bajo el paso de Grep.

**Ajustar qué tablas de Supabase revisa el agente de base de datos:**
Abre `.claude/agents/family-2-database.md` y añade en el contexto el nombre de las tablas críticas de tu proyecto para que el agente las priorice.

**Cambiar el idioma del informe:**
El orquestador (`.claude/commands/security-audit.md`) genera el informe en español. Si trabajas con un equipo angloparlante, puedes pedir al final del archivo que genere en inglés.

---

## Preguntas frecuentes

**¿Puedo ejecutarlo en cualquier repositorio, no solo los del curso?**
Sí. Funciona en cualquier proyecto que tengas en local. Pasa la ruta relativa o absoluta con `--repo`.

**¿Los agentes ven mis datos o los envían a algún sitio?**
Los agentes leen tu código local con las mismas herramientas que usas tú en Claude Code. El análisis se procesa en el contexto de tu sesión de Claude Code y no se almacena fuera de ella.

**¿Cada cuánto debo ejecutarlo?**
Como mínimo antes de cada despliegue a producción. Idealmente lo integras como un paso habitual: codeas, revisas con el pipeline, despliegas.

**El agente encontró algo que creo que es un falso positivo. ¿Qué hago?**
Lee la evidencia que reporta (archivo + línea). Si confirmas que es falso positivo, puedes añadir una nota en el contexto del agente correspondiente para que lo ignore en futuras ejecuciones.

**¿Qué pasa si tengo un proyecto que no usa Supabase?**
Las familias 1, 3 y 4 funcionan con cualquier stack. La familia 2 está optimizada para Supabase pero detecta patrones generales de base de datos que aplican a cualquier proyecto.

---

## Referencia rápida de comandos

```bash
# Auditoría completa (recomendado antes de cada deploy)
/security-audit --repo ./mi-proyecto

# Solo credenciales
/security-audit --repo ./mi-proyecto --family 1

# Solo base de datos
/security-audit --repo ./mi-proyecto --family 2

# Solo datos sensibles y privacidad
/security-audit --repo ./mi-proyecto --family 3

# Solo configuración
/security-audit --repo ./mi-proyecto --family 4
```

---

## Archivos de este pipeline

```
.claude/
├── commands/
│   └── security-audit.md     ← El orquestador. Define el flujo completo.
└── agents/
    ├── family-1-credentials.md    ← Agente de credenciales
    ├── family-2-database.md       ← Agente de base de datos
    ├── family-3-privacy.md        ← Agente de privacidad y RGPD
    └── family-4-configuration.md  ← Agente de configuración
```

---

*HeroCamp · AI PM Pro · Sesión de Seguridad para Agentes IA*
*Para dudas o problemas: abre un issue en el repositorio del curso*
