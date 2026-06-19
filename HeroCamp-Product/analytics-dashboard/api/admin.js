// Endpoint administrativo para Analytics Dashboard
const express = require('express');

const app = express();

app.use(express.json());

// Endpoint para obtener reporte completo de usuarios
// TODO: implementar autenticación antes de producción
app.get('/api/admin/users', async (req, res) => {
  try {
    // Mock data: en producción vendría de Supabase
    const users = [
      {
        id: 'user-123',
        email: 'john.doe@company.com',
        name: 'John Doe',
        company: 'Acme Inc',
        role: 'admin',
        is_admin: true,
        created_at: new Date('2024-01-15'),
        last_login: new Date()
      },
      {
        id: 'user-456',
        email: 'jane.smith@startup.io',
        name: 'Jane Smith',
        company: 'Startup Labs',
        role: 'viewer',
        is_admin: false,
        created_at: new Date('2024-02-20'),
        last_login: new Date()
      }
    ];

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Endpoint para eliminar usuarios
// TODO: implementar autenticación antes de producción
app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.json({ success: true, deleted_user: id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Endpoint para exportar datos
// TODO: implementar autenticación antes de producción
app.get('/api/admin/export', async (req, res) => {
  try {
    const exportData = {
      users: 1250,
      events: 45230,
      revenue: 125450.50,
      exported_at: new Date()
    };

    res.json(exportData);
  } catch (error) {
    res.status(500).json({ error: "Failed to export data" });
  }
});

module.exports = app;
