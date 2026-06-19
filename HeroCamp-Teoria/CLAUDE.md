# CLAUDE.md
## Contexto operativo del proyecto: Pipeline de Seguridad para Agentes IA

Este archivo es tu contexto de trabajo. Léelo entero antes de hacer cualquier cosa.
No asumas nada que no esté aquí. Si algo no está claro, pregunta antes de construir.

---

## 1. Qué es este proyecto y para qué sirve

Estás construyendo un **pipeline de auditoría de seguridad** diseñado para Product Managers
que construyen productos con Claude Code y el stack Supabase + GitHub + Cloudflare Pages.

El pipeline se ejecuta antes de cada despliegue a producción y detecta automáticamente
los cuatro vectores de riesgo más frecuentes en proyectos construidos con asistentes IA.

El contexto de uso es una sesión de formación (3 horas, 11 alumnos Senior PM) donde:
- El pipeline se ejecuta en vivo sobre un repositorio de demostración con fallos sembrados
- Los alumnos reciben el pipeline al final de la sesión para usarlo en sus propios proyectos
- La audiencia no es de ingenieros: el output debe ser legible por perfiles no técnicos

Hay dos repositorios en este proyecto:
1. **Este repositorio**: el pipeline de seguridad (orquestador + cuatro skills)
2. **Repositorio trampa** (repo separado): proyecto vulnerable que el pipeline audita

---

## 2. Stack tecnológico

- **Agente**: Claude Code (Anthropic)
- **Lenguaje**: TypeScript / Node.js
- **Stack auditado**: Supabase (PostgreSQL + REST API), GitHub, Cloudflare Pages, Lovable
- **Formato de skills**: SKILL.md + código de ejecución en TypeScript
- **Formato de informe**: Markdown estructurado con código de severidad por hallazgo
- **Entorno de ejecución**: Terminal (macOS / Linux), sin dependencias de UI
- **Gestión de dependencias**: npm
- **Control de versiones**: Git + GitHub

---

## 3. Arquitectura del pipeline

El pipeline tiene tres capas. Construye en este orden exacto, no lo cambies:

### Capa 1: Skills (construir primero)
Cuatro skills independientes. Cada skill es autocontenida: tiene su propio SKILL.md
con instrucciones en lenguaje natural y su propio archivo de código TypeScript.
Las skills no se llaman entre sí. Solo reciben input y devuelven output estructurado.

### Capa 2: Orquestador (construir segundo)
Un único archivo que lanza las cuatro skills en paralelo, recoge sus outputs,
y construye el informe consolidado. No tiene lógica de auditoría propia.

### Capa 3: CLI de entrada (construir tercero)
Una interfaz de línea de comandos simple. El usuario ejecuta:
```
npx audit-security --repo ./ruta/al/repositorio
```
Y recibe el informe en el terminal más un archivo `security-report.md` en la raíz
del repositorio auditado.

---

## 4. Las cuatro skills: qué detecta cada una

### Skill 1: `skill-credentials`
**Propósito**: Detectar credenciales y claves de acceso expuestas.

Detecta:
- API keys hardcodeadas en código fuente (patrones: `AKIA`, `sk-`, `AIza`, `ghp_`,
  `xoxb-`, `SG.`, `key-`, y variantes comunes de otros proveedores)
- Archivos `.env` presentes en el repositorio que no están en `.gitignore`
- Cadenas de conexión a bases de datos con usuario y contraseña embebidos
- Claves en archivos de configuración de servidores MCP
- Credenciales en el historial de Git (últimos 50 commits)
- Variables de entorno con nombres sensibles sin valor de placeholder

Severidad:
- **CRÍTICO**: clave activa en código fuente o historial de Git
- **ALTO**: archivo .env commiteado o cadena de conexión expuesta
- **MEDIO**: patrón sospechoso que requiere verificación manual

### Skill 2: `skill-database`
**Propósito**: Auditar permisos y configuración de base de datos Supabase.

Detecta:
- Tablas en el esquema de Supabase sin RLS (Row Level Security) activado
- Políticas RLS con `USING (true)` (seguridad cosmética, permite todo)
- Uso de `service_role` key en código de cliente (frontend / cliente HTTP)
- Vistas con `SECURITY DEFINER` que pueden saltarse las políticas RLS
- Endpoints que exponen datos sin verificación de autenticación
- Buckets de Supabase Storage configurados como públicos

Para la verificación activa de RLS, la skill hace una petición HTTP al endpoint
REST de Supabase del proyecto usando la anon key encontrada en el código:
```
GET https://{project}.supabase.co/rest/v1/{tabla}?select=*
Headers: { apikey: {anon_key} }
```
Si la respuesta devuelve datos, la tabla no tiene RLS correctamente configurado.

Severidad:
- **CRÍTICO**: service_role key en cliente, o tabla con datos accesible sin auth
- **ALTO**: RLS desactivado en tabla con datos sensibles, o política USING (true)
- **MEDIO**: bucket público, o vista SECURITY DEFINER sin revisión

### Skill 3: `skill-data-privacy`
**Propósito**: Detectar exposición de datos sensibles y problemas de privacidad.

Detecta:
- Sentencias de logging que imprimen objetos completos de usuario
  (`console.log(user)`, `console.log(req.body)`, `logger.info(request)`, etc.)
- Respuestas de API que devuelven más campos de los necesarios
  (objetos completos cuando solo se necesita un campo)
- Datos personales en archivos de prueba o fixtures
  (emails reales, nombres reales, IPs reales)
- Variables de entorno con datos reales en lugar de placeholders
- Ausencia de política de privacidad o términos de servicio detectables
- Transferencias de datos a servicios de terceros sin indicación de consentimiento

Patrones de PII que busca:
- Emails: `[\w.-]+@[\w.-]+\.\w+`
- IPs: `\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b`
- Números de teléfono en formatos comunes
- Identificadores que parecen reales (no placeholders como `user@example.com`)

Severidad:
- **CRÍTICO**: PII real en código fuente o fixtures
- **ALTO**: logging de objetos completos de usuario en producción
- **MEDIO**: respuestas de API sobredimensionadas, ausencia de política de privacidad

### Skill 4: `skill-configuration`
**Propósito**: Auditar configuración de entornos y superficie de ataque expuesta.

Detecta:
- CORS configurado con origen wildcard (`*`) en endpoints autenticados
- Endpoints de debug o administración accesibles sin autenticación
  (`/api/admin`, `/api/debug`, `/_debug`, `/api-docs`, `/swagger`, `/actuator`)
- Variables de entorno de producción mezcladas con variables de desarrollo
- Archivos de configuración con valores por defecto inseguros
- Headers HTTP de seguridad ausentes (CSP, HSTS, X-Frame-Options)
- Modo debug activo en configuración de producción
- Repositorios o buckets con visibilidad pública no intencionada

Severidad:
- **CRÍTICO**: endpoint de admin sin autenticación, o CORS wildcard en endpoint con datos
- **ALTO**: headers de seguridad ausentes, debug activo en producción
- **MEDIO**: variables de entorno mezcladas, configuración por defecto insegura

---

## 5. Formato del informe de salida

El informe debe ser legible por un Product Manager Senior sin formación técnica profunda.
No uses jerga sin explicar. Cada hallazgo incluye qué es, por qué importa, y qué hacer.

```markdown
# Informe de seguridad
**Repositorio**: {nombre}
**Fecha**: {fecha}
**Ejecutado por**: Pipeline de Seguridad v1.0

---

## Resumen ejecutivo
- ✅ Validado: {n} comprobaciones
- ⚠️ Requiere revisión: {n} hallazgos
- ❌ Bloquea despliegue: {n} hallazgos críticos

**Recomendación**: {DESPLIEGUE SEGURO | REVISAR ANTES DE DESPLEGAR | NO DESPLEGAR}

---

## Hallazgos por familia

### 🔑 Familia 1 · Credenciales y claves de acceso
{lista de hallazgos con severidad, descripción, ubicación exacta, y acción recomendada}

### 🗄️ Familia 2 · Bases de datos y permisos
{lista de hallazgos}

### 👤 Familia 3 · Datos sensibles y privacidad
{lista de hallazgos}

### ⚙️ Familia 4 · Configuración de entornos
{lista de hallazgos}

---

## Próximos pasos
{lista priorizada de las tres acciones más urgentes}
```

Cada hallazgo individual sigue este formato:
```
**[CRÍTICO|ALTO|MEDIO]** Descripción breve del problema
- **Ubicación**: archivo:línea o tabla/endpoint
- **Por qué importa**: explicación en una frase sin jerga
- **Qué hacer**: acción concreta y específica
```

---

## 6. Estructura de carpetas del repositorio

```
security-pipeline/
├── CLAUDE.md                    ← este archivo
├── README.md                    ← instrucciones de instalación para alumnos
├── package.json
├── tsconfig.json
├── /src
│   ├── index.ts                 ← CLI de entrada
│   ├── orchestrator.ts          ← orquestador
│   └── /skills
│       ├── /skill-credentials
│       │   ├── SKILL.md         ← instrucciones en lenguaje natural
│       │   └── index.ts         ← código de ejecución
│       ├── /skill-database
│       │   ├── SKILL.md
│       │   └── index.ts
│       ├── /skill-data-privacy
│       │   ├── SKILL.md
│       │   └── index.ts
│       └── /skill-configuration
│           ├── SKILL.md
│           └── index.ts
├── /docs
│   ├── arquitectura.md          ← diagrama y decisiones de diseño
│   ├── repo-trampa.md           ← diseño del repositorio de demostración
│   └── guion-sesion.md          ← referencia del guion de clase
└── /test
    └── run-against-demo.sh      ← script para ejecutar el pipeline sobre el repo trampa
```

---

## 7. Diseño del repositorio trampa

El repositorio trampa es un proyecto separado que simula un MVP construido por
un alumno del curso. Es un gestor de feedback de usuarios con este stack:
- Frontend: HTML/JS estático (desplegable en Cloudflare Pages)
- Base de datos: Supabase (PostgreSQL)
- API: Supabase REST directa desde el cliente
- Autenticación: Supabase Auth (implementada de forma incompleta)

El repositorio trampa tiene **ocho fallos sembrados** de forma verosímil,
distribuidos una o dos por familia. Están documentados en `/docs/repo-trampa.md`.

El pipeline debe detectar los ocho. Ni más, ni menos.
Si detecta falsos positivos, ajusta los patrones de la skill correspondiente.
Si no detecta alguno de los ocho, el pipeline está incompleto.

---

## 8. Convenciones de código

- TypeScript estricto: `strict: true` en tsconfig
- Sin dependencias externas innecesarias: usa solo lo que necesitas
- Cada skill devuelve un objeto tipado `SkillResult` con esta interfaz:
```typescript
interface Finding {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  family: 1 | 2 | 3 | 4;
  title: string;
  location: string;
  why: string;
  action: string;
}

interface SkillResult {
  skillName: string;
  findings: Finding[];
  executionTimeMs: number;
  error?: string;
}
```
- El orquestador recibe `SkillResult[]` y construye el `SecurityReport`
- Los SKILL.md están escritos en español (la sesión es en español)
- Los comentarios de código están en español
- Los mensajes de error del CLI están en español

---

## 9. Orden de construcción

Sigue este orden. No empieces el siguiente paso hasta que el anterior funcione.

1. Inicializar el proyecto: `package.json`, `tsconfig.json`, estructura de carpetas
2. Definir los tipos compartidos en `/src/types.ts`
3. Construir y testar `skill-credentials` de forma aislada
4. Construir y testar `skill-database` de forma aislada
5. Construir y testar `skill-data-privacy` de forma aislada
6. Construir y testar `skill-configuration` de forma aislada
7. Construir el orquestador que llama a las cuatro en paralelo
8. Construir el CLI de entrada
9. Escribir el script `test/run-against-demo.sh`
10. Ejecutar el pipeline completo contra el repo trampa y verificar los ocho hallazgos

**No hagas el paso 10 hasta que el repo trampa exista.**
El repo trampa se construye en paralelo en una sesión separada.

---

## 10. Lo que NO debes hacer

- No instales dependencias que no sean estrictamente necesarias
- No construyas una UI web para el pipeline: es una herramienta de terminal
- No hardcodees rutas absolutas: usa rutas relativas al repositorio auditado
- No hagas llamadas a APIs externas que no sean las de Supabase del repo trampa
- No simplifiques el formato del informe: la legibilidad para no-técnicos es un requisito
- No combines la lógica de dos skills en un solo archivo
- No saltes el orden de construcción del punto 9

---

*Última actualización: mayo 2026*
*Sesión: AI PM Pro · The Hero Camp · 26 de junio de 2026*
