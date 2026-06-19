// API endpoint de administración
const express = require('express');

const app = express();

app.use(express.json());

// Endpoint para obtener todos los feedback
// TODO: añadir autenticación antes de producción
app.get('/api/admin/feedback', async (req, res) => {
  try {
    // En producción, esto viene de Supabase
    const mockData = [
      {
        id: '123',
        user_email: 'user@example.com',
        user_name: 'Test User',
        message: 'Great product!',
        created_at: new Date(),
        ip_address: '192.168.1.1'
      }
    ];

    res.json(mockData);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

// Endpoint para eliminar feedback
app.delete('/api/admin/feedback/:id', async (req, res) => {
  // TODO: añadir autenticación antes de producción
  try {
    const { id } = req.params;
    // Aquí iría la lógica de eliminar
    res.json({ success: true, deleted: id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete feedback" });
  }
});

module.exports = app;
