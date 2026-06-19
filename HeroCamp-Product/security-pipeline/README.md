# 🔒 Pipeline de Auditoría de Seguridad

Una herramienta que audita tu repositorio en busca de las 4 vulnerabilidades más comunes en proyectos construidos con IA.

**Tiempo de ejecución**: <1 segundo  
**Dependencias**: Ninguna (excepto Node.js 18+)  
**Output**: Informe Markdown claro y accionable

---

## Instalación rápida

```bash
# Opción 1: Clonar y ejecutar localmente
git clone <repo-url> security-pipeline
cd security-pipeline
npm install
npm run build

# Opción 2: npx directo (después de publicar a npm)
npx audit-security --repo ./mi-proyecto
```

---

## Uso

### En VSCode (recomendado para PMs)

1. Abre tu proyecto en VSCode
2. Abre terminal integrada: `Ctrl+` ` (backtick)
3. Ejecuta:
   ```bash
   node /ruta/al/pipeline/dist/index.js --repo .
   ```
4. Se genera `security-report.md` en la raíz de tu proyecto
5. Abre el archivo y léelo en el editor

### Desde línea de comandos

```bash
# Auditar tu proyecto
node dist/index.js --repo ./mi-proyecto

# Guardar en archivo específico
node dist/index.js --repo ./mi-proyecto --output mi-reporte.md

# JSON para procesar programáticamente
node dist/index.js --repo ./mi-proyecto --json
```

---

## Lo que detecta

### 🔑 Familia 1: Credenciales y Secretos
- API keys hardcodeadas (Google, OpenAI, AWS, etc.)
- Archivos `.env` commiteados
- Cadenas de conexión con contraseñas
- Claves en historial de Git

**Riesgo**: Factura de $82.000+ en 48 horas si se expone una clave

---

### 🗄️ Familia 2: Bases de Datos y Permisos
- Tablas Supabase sin RLS (Row Level Security)
- Service role key en código de cliente
- Vistas con `SECURITY DEFINER` mal configuradas

**Riesgo**: Cualquiera puede leer TODOS tus datos de usuario

---

### 👤 Familia 3: Datos Sensibles y Privacidad
- PII real en código/fixtures (emails, IPs, teléfonos)
- `console.log(user)` que registra datos personales
- Ausencia de política de privacidad

**Riesgo**: Multa RGPD de hasta 20 millones de euros

---

### ⚙️ Familia 4: Configuración de Entornos
- CORS configurado con `*` (acepta cualquier origen)
- Endpoints sin autenticación (`/admin`, `/debug`)
- Headers de seguridad ausentes
- Variables de entorno con defaults inseguros

**Riesgo**: Acceso no autorizado a endpoints críticos

---

## Entender el informe

```markdown
# 🔒 Informe de Seguridad

**Resumen Ejecutivo**
❌ **10 hallazgos CRÍTICOS** → Bloquean despliegue
⚠️  **5 hallazgos ALTOS** → Revisar antes de desplegar
🔶 **2 hallazgos MEDIOS** → Arreglar pronto

**Recomendación**: ❌ NO DESPLEGAR HASTA RESOLVER
```

### Cómo leer cada hallazgo

```markdown
❌ **[CRITICAL]** Google API Key hardcodeada
- **Ubicación**: config.js:2
- **Por qué importa**: La clave está visible. Cualquiera puede usarla.
- **Qué hacer**: Mueve la clave a una variable de entorno.
```

Prioridades:
1. **CRÍTICOS** → Arregla AHORA
2. **ALTOS** → Arregla esta semana
3. **MEDIOS** → Arregla cuando tengas tiempo

---

## Próximos pasos típicos

### Si el informe dice "NO DESPLEGAR"

1. **Abre el informe** (`security-report.md`)
2. **Enfócate en CRÍTICOS** (ignora MEDIOS por ahora)
3. **Por cada hallazgo**:
   - Lee "Por qué importa" (entender el riesgo)
   - Sigue "Qué hacer" (pasos concretos)
   - Ejecuta los pasos
4. **Vuelve a ejecutar el pipeline**:
   ```bash
   node dist/index.js --repo .
   ```
5. **Repite** hasta que el informe diga "DESPLIEGUE SEGURO"

### Si el informe dice "REVISAR ANTES DE DESPLEGAR"

- Tienes hallazgos ALTOS pero sin CRÍTICOS
- Arregla los ALTOS antes de hacer push a producción
- Los MEDIOS pueden esperar

### Si el informe dice "DESPLIEGUE SEGURO"

- ✅ Estás listo para producción
- Aún así, revisa que los MEDIOS se solucionen pronto
- Ejecuta el pipeline regularmente (cada semana, cada mes)

---

## Ejemplos de correcciones rápidas

### Fallo: API key hardcodeada

**Antes** (❌ MAL):
```javascript
const GEMINI_API_KEY = "AIzaSyD-9tSrke72...";
```

**Después** (✅ BIEN):
```javascript
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// En .env: GEMINI_API_KEY=AIzaSyD-9tSrke72...
// Y en .gitignore: .env
```

---

### Fallo: Tabla sin RLS

**Antes** (❌ MAL):
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL
);
```

**Después** (✅ BIEN):
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own data"
ON users
FOR SELECT
USING (auth.uid() = id);
```

---

### Fallo: console.log de usuario

**Antes** (❌ MAL):
```javascript
console.log("Usuario:", req.user);
```

**Después** (✅ BIEN):
```javascript
console.log("Usuario autenticado con ID:", req.user.id);
```

---

### Fallo: CORS wildcard

**Antes** (❌ MAL):
```javascript
app.use(cors({ origin: '*' }));
```

**Después** (✅ BIEN):
```javascript
app.use(cors({
  origin: ['https://tundominio.com', 'https://app.tundominio.com']
}));
```

---

## Preguntas frecuentes

**P: ¿Por qué dice que mi .env está mal si está en .gitignore?**  
R: Porque Git ya has commiteado. Aunque lo pongas en .gitignore ahora, sigue en el historial. Solución: `git rm --cached .env && git commit -m "Remove .env from tracking"`

**P: ¿Qué pasa si mi tabla de Supabase sí tiene RLS pero el pipeline dice que no?**  
R: El pipeline busca `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` en el SQL. Si activaste RLS a través del dashboard de Supabase, no aparecerá en tu código SQL. Solución: Añade la línea SQL al archivo `schema.sql` para que el pipeline la detecte.

**P: ¿Es obligatorio arreglar todos los hallazgos antes de desplegar?**  
R: Los CRÍTICOS sí. Los ALTOS deberían arreglarse antes de ir a producción. Los MEDIOS pueden esperar pero hazlo pronto.

**P: ¿Puedo ignorar algunos hallazgos?**  
R: Solo si tienes razones muy específicas. Documéntalo y avisa al equipo. Mejor: usa el pipeline regularmente para reducir deuda de seguridad.

---

## Recursos adicionales

- **Guía completa de seguridad**: `../TheHeroCamp/Entregables/guia_seguridad_alumnos.md`
- **Bloques teóricos profundos**: `../TheHeroCamp/Bloque Teorico/familia*_profundo.md`
- **Supabase RLS docs**: https://supabase.com/docs/guides/database/postgres/row-level-security
- **OWASP Top 10**: https://owasp.org/Top10/

---

## Reportar problemas

Si el pipeline detecta algo que crees que está bien, o no detecta algo que debería detectar:

1. Crea un issue en el repositorio
2. Include:
   - Tu `security-report.md`
   - Snippet del código que lo causa
   - Por qué crees que está incorrecto

---

## Para desarrolladores

¿Quieres modificar o extender el pipeline?

- Lee `CLAUDE.md` (documentación técnica)
- Modifica las skills en `/src/skills/skill-*/index.ts`
- Ajusta patrones regex según necesites
- Ejecuta `npm run build` y testea contra tu repositorio

---

**Última actualización**: 18 de junio de 2026  
**Sesión**: AI PM Pro · The Hero Camp  
**Versión**: 1.0.0
