# Skill 1: Detección de Credenciales Expuestas

## Propósito

Detectar claves de acceso, tokens de autenticación y credenciales hardcodeadas en el repositorio que puedan comprometer el proyecto si se exponen.

## Qué detecta

1. **API keys hardcodeadas en código fuente**
   - Patrones: `AIzaSy` (Google), `sk-` (OpenAI), `ghp_` (GitHub), `xoxb-` (Slack), `SG.` (SendGrid), `AKIA` (AWS)
   - Busca en archivos: `.js`, `.ts`, `.py`, `.env`, `.json`, `.config`

2. **Archivo `.env` presente en repositorio**
   - Si `.env` existe y NO está en `.gitignore`, es ALTO
   - El contenido del .env puede contener DATABASE_URL, API keys, etc.

3. **Credenciales en cadenas de conexión**
   - `postgresql://usuario:contraseña@host`
   - `mongodb+srv://usuario:contraseña@host`
   - `mysql://usuario:contraseña@host`

4. **Credenciales en historial Git**
   - Últimos 50 commits
   - Busca patrones de claves en commit messages y contenido

## Severidad

- **CRÍTICO**: Clave activa encontrada en código fuente o historial de Git
- **ALTO**: Archivo .env commiteado, o credenciales en cadena de conexión
- **MEDIO**: Patrón sospechoso que requiere verificación manual

## Salida esperada

```typescript
{
  skillName: "skill-credentials",
  findings: [
    {
      severity: "CRITICAL",
      family: 1,
      title: "API key de Gemini hardcodeada",
      location: "config.js:2",
      why: "La clave de Google Gemini está visible en el código fuente. Cualquiera con acceso al repositorio puede explotarla.",
      action: "Remueve la clave de config.js y úsala como variable de entorno en producción."
    },
    ...
  ],
  executionTimeMs: 234
}
```

## Notas de implementación

- No es necesario verificar si la clave es válida (eso es lento)
- Solo buscar patrones conocidos
- Reporting claro de ubicación (archivo:línea)
