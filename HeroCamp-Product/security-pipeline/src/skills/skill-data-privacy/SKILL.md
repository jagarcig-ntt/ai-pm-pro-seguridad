# Skill 3: Detección de Datos Sensibles y Privacidad

## Propósito

Detectar exposición de datos personales e información sensible que violen RGPD y puedan comprometer la privacidad de usuarios.

## Qué detecta

1. **Logging de datos sensibles**
   - `console.log(user)`, `console.log(req)`, `logger.info(userData)`
   - Objetos completos de usuario/request que contienen PII
   - Patrones: `console.log`, `console.error`, `logger.info/warn/debug`

2. **PII (Personally Identifiable Information) en código/fixtures**
   - Emails reales (no placeholders como user@example.com)
   - IPs reales (no 127.0.0.1 o 0.0.0.0)
   - Números de teléfono
   - Nombres reales de personas
   - Contraseñas en texto plano

3. **Datos reales en archivos de prueba**
   - test-data.json, fixtures/, test-fixtures.json
   - Cualquier datos que parezcan reales (no sintéticos)

4. **Ausencia de política de privacidad**
   - No hay privacy.md o términos de servicio detectables

## Severidad

- **CRÍTICO**: PII real en código fuente o fixtures públicamente accesibles
- **ALTO**: Logging de objetos completos de usuario, o datos sensibles en respuestas API
- **MEDIO**: Ausencia de política de privacidad, o respuestas API sobredimensionadas

## Patrones PII

- Email real: `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}` (pero no @example.com, @test.com)
- IP: `\b(?:\d{1,3}\.){3}\d{1,3}\b` (pero no 127.0.0.1, 0.0.0.0, 192.168.*)
- Teléfono: patrones comunes españoles/internacionales
- Contraseña: `password\s*[:=]\s*["']([^"']+)["']`
