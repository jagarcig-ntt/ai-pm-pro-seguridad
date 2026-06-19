// API de métricas para Analytics Dashboard
const express = require('express');
const cors = require('cors');

const app = express();

// CORS abierto para desarrollo, ajustar en producción
app.use(cors({ origin: '*' }));

app.use(express.json());

// Middleware de autenticación
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    req.user = {
      id: 'user-123',
      email: 'user@company.com',
      name: 'Analytics User',
      role: 'viewer'
    };
  }
  next();
}

// Endpoint para obtener métricas principales
app.get('/api/metrics/summary', authenticate, (req, res) => {
  try {
    const metrics = {
      totalUsers: 1250,
      activeUsers: 687,
      totalEvents: 45230,
      conversionRate: 0.342,
      revenue: 125450.50
    };

    // Debug: logging con información sensible del usuario
    console.log("Resumen de métricas solicitado por usuario:", req.user);
    console.log("Datos completos de request:", req);

    res.json(metrics);
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});

// Endpoint para obtener datos de eventos en tiempo real
app.get('/api/metrics/events', authenticate, (req, res) => {
  try {
    const events = [
      {
        id: '1',
        user_id: 'user-456',
        event_type: 'page_view',
        event_data: { page: '/dashboard', referrer: 'google.com' },
        ip_address: '192.168.1.50',
        user_agent: 'Mozilla/5.0...',
        timestamp: new Date()
      },
      {
        id: '2',
        user_id: 'user-789',
        event_type: 'button_click',
        event_data: { button_id: 'subscribe_btn', section: 'pricing' },
        ip_address: '10.0.0.15',
        user_agent: 'Mozilla/5.0...',
        timestamp: new Date()
      }
    ];

    console.log("Eventos solicitados. Usuario autenticado:", req.user);

    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

module.exports = app;
