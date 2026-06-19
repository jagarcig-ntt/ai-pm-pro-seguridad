# Skill 2: Auditoría de Base de Datos y Permisos

## Propósito

Detectar configuraciones peligrosas en bases de datos Supabase: tablas sin Row Level Security (RLS), políticas RLS defectuosas, y uso incorrecto de claves administrativas en el cliente.

## Qué detecta

1. **Tablas sin RLS activado**
   - Busca en `supabase/schema.sql` o archivos SQL
   - Detecta `CREATE TABLE` sin `ENABLE ROW LEVEL SECURITY`
   - Verifica activamente: hace un GET a la tabla con la anon key para confirmar que devuelve datos

2. **Service role key en código de cliente**
   - Busca en archivos `.js`, `.ts` que contengan `service_role`
   - Es CRÍTICO porque salta todas las políticas RLS

3. **Políticas RLS cosmética**
   - Detecta `USING (true)` en políticas (permite acceso a todo)
   - Detecta vistas con `SECURITY DEFINER`

4. **Buckets de almacenamiento públicos**
   - Detecta configuración de Storage con acceso público

## Severidad

- **CRÍTICO**: Service role key en cliente, o tabla sin RLS que devuelve datos con anon key
- **ALTO**: RLS desactivado en tabla con datos, o política USING (true)
- **MEDIO**: Bucket público, o vista SECURITY DEFINER

## Notas de implementación

- Para verificación activa: necesita extraer Supabase URL y ANON_KEY del código
- Los requests HTTP deben tener timeout (2 segundos máximo)
- No fallar si Supabase no está disponible, solo reportar que no se pudo verificar
