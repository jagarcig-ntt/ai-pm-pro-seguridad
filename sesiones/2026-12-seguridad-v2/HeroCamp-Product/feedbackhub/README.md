# FeedbackHub

Sistema simple de recopilación de feedback de usuarios construido con:
- **Frontend**: HTML + Vanilla JavaScript
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Hosting**: Cloudflare Pages

## Estructura

```
feedbackhub/
├── index.html              # Formulario público de feedback
├── admin.html              # Panel de administración
├── app.js                  # Lógica del formulario
├── admin-script.js         # Lógica del panel admin
├── admin.js                # Cliente Supabase de admin
├── config.js               # Configuración de servicios
├── .env                    # Variables de entorno
├── .gitignore              # Git ignore (incompleto)
├── api/
│   ├── feedback.js         # Endpoint para guardar feedback
│   └── admin.js            # Endpoint de administración
├── supabase/
│   └── schema.sql          # Esquema de la base de datos
└── package.json            # Dependencias del proyecto
```

## Flujo de uso

1. **Usuario anónimo**: accede a `index.html`, envía feedback
2. **PM/Admin**: accede a `admin.html`, revisa todos los feedbacks
3. **Datos almacenados**: email, nombre, mensaje, IP, timestamp

## Instalación

```bash
npm install
npm run dev
```

## Estado de producción

⚠️ **Este proyecto está en desarrollo.** Antes de pasar a producción, revisar la lista de seguridad del documento `/docs/repo-trampa.md`.
