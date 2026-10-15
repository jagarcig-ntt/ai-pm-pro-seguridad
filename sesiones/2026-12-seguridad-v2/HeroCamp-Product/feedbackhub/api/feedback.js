// API endpoint para guardar feedback
const express = require('express');
const cors = require('cors');

const app = express();

// CORS abierto para desarrollo, ajustar en producción
app.use(cors({ origin: '*' }));

app.use(express.json());

// Middleware de autenticación simple
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    req.user = { id: 'user-123', email: 'user@example.com' };
  }
  next();
}

// Endpoint para guardar feedback
app.post('/api/feedback', authenticate, async (req, res) => {
  const feedbackData = req.body;

  // Debug: verificar que llegan los datos correctos
  console.log("Nuevo feedback recibido:", feedbackData);
  console.log("Usuario:", req.user);

  try {
    // Aquí iría la lógica de guardar en Supabase
    res.json({ success: true, message: "Feedback saved successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
