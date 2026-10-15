# Analytics Dashboard

Dashboard profesional de análisis de datos y métricas integrado con módulo de feedback.

## Stack

- **Frontend**: HTML5 + Vanilla JavaScript (sin dependencias)
- **Backend**: Express.js (opcional para APIs)
- **Base de datos**: Supabase (PostgreSQL)
- **Hosting**: Cloudflare Pages / Vercel

## Características

✅ **KPIs en tiempo real**: Usuarios, eventos, conversión, ingresos
✅ **Gráficos interactivos**: Tendencias de usuarios, ingresos mensuales
✅ **Tabla de eventos**: Eventos procesados en tiempo real
✅ **Módulo integrado de Feedback**: Recopilación de opiniones desde el dashboard
✅ **Diseño responsivo**: Se adapta a cualquier tamaño de pantalla
✅ **Interfaz profesional**: Colores y espaciado para Product Managers Senior

## Estructura

```
analytics-dashboard/
├── index.html                   # Dashboard principal
├── dashboard.js                 # Lógica del frontend
├── server.js                    # Servidor local
├── config.js                    # Configuración
├── .env                         # Variables de entorno
├── .gitignore
├── api/
│   ├── metrics.js               # Endpoints de métricas
│   └── admin.js                 # Endpoints de administración
├── modules/
│   └── feedback/
│       └── feedback.js          # Módulo integrado de feedback
├── data/
│   └── test-fixtures.json       # Datos de prueba
├── supabase/
│   └── schema.sql               # Esquema de BD
└── package.json
```

## Uso

```bash
node server.js
# Abre http://localhost:3001
```

## Módulo de Feedback

El dashboard incluye un módulo integrado de feedback que permite a los usuarios:
- Calificar su experiencia (1-5 estrellas)
- Enviar comentarios específicos
- Contactar soporte directamente

Los feedbacks se almacenan en Supabase y son revisables en el panel de administración.

## Estado de producción

⚠️ **En desarrollo.** Antes de producción, revisar:
- Autenticación (endpoints `/api/admin` requieren autenticación)
- RLS en Supabase (tabla `events` sin restricciones)
- CORS configurado abiertamente (origen `*`)
- Credenciales no deben estar en `.env` commiteado
