# Skill 4: Auditoría de Configuración de Entornos

## Propósito

Detectar configuraciones inseguras que exponen la aplicación a ataques: CORS permisivo, endpoints sin autenticación, modo debug activo, headers de seguridad ausentes.

## Qué detecta

1. **CORS con wildcard en endpoints con datos**
   - `origin: '*'` o `Access-Control-Allow-Origin: *`
   - En endpoints que NO son públicos

2. **Endpoints sin autenticación**
   - `/admin`, `/api/admin`, `/_admin`, `/api/superuser`
   - `/debug`, `/_debug`, `/api/debug`
   - `/health` expuesto públicamente
   - Que NO tienen middleware de autenticación

3. **Variables de entorno peligrosas en defaults**
   - `process.env.DEBUG || true` (debug activado por defecto)
   - `process.env.CORS || '*'` (CORS permisivo por defecto)
   - Valores inseguros cuando la variable no está definida

4. **Headers de seguridad ausentes**
   - Content-Security-Policy (CSP)
   - Strict-Transport-Security (HSTS)
   - X-Frame-Options (clickjacking)

## Severidad

- **CRÍTICO**: CORS wildcard en endpoint autenticado, o endpoint /admin sin autenticación
- **ALTO**: Headers de seguridad ausentes, o debug activo en producción
- **MEDIO**: Configuración de desarrollo no endurecida para producción

## Patrones a buscar

- `cors({ origin: '*' })`
- `Access-Control-Allow-Origin.*\*`
- `app.get/post('/admin'` sin middleware de auth
- `DEBUG = true`
- `process.env.X || insecureDefault`
