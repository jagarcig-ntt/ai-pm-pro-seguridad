// Servidor local para Analytics Dashboard
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Log de la petición
  console.log(`${req.method} ${req.url}`);

  // Ruta por defecto
  let filePath = req.url === '/' ? '/index.html' : req.url;

  // Servir archivos estáticos
  if (filePath.startsWith('/api/')) {
    handleAPI(filePath, req, res);
  } else {
    serveFile(filePath, req, res);
  }
});

function serveFile(filePath, req, res) {
  filePath = path.join(__dirname, filePath);

  // Evitar acceso fuera del directorio
  const realPath = fs.realpathSync(__dirname);
  if (!fs.realpathSync(filePath).startsWith(realPath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Leer archivo
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Archivo no encontrado');
        console.log(`  → 404`);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 - Error del servidor');
        console.log(`  → 500`);
      }
      return;
    }

    // Determinar MIME type
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(content);
    console.log(`  → 200 ${mimeType}`);
  });
}

// Almacenamiento en memoria para feedback
const feedbackStorage = [];

function handleAPI(pathname, req, res) {
  // Configurar headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Endpoint de feedback
  if (pathname === '/api/feedback' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const feedback = JSON.parse(body);
        feedback.id = `feedback-${Date.now()}`;
        feedback.created_at = new Date().toISOString();
        feedbackStorage.push(feedback);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          id: feedback.id,
          message: '¡Gracias por tu feedback!'
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // Mock endpoints
  if (pathname === '/api/metrics/summary') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      totalUsers: 1250,
      activeUsers: 687,
      totalEvents: 45230,
      conversionRate: 0.342,
      revenue: 125450.50
    }));
  } else if (pathname === '/api/metrics/events') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
      { id: '1', event_type: 'page_view', user_id: 'user-456', timestamp: new Date() },
      { id: '2', event_type: 'button_click', user_id: 'user-789', timestamp: new Date() }
    ]));
  } else if (pathname === '/api/admin/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
      { id: 'user-123', email: 'john@company.com', name: 'John Doe' }
    ]));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
  }
}

server.listen(PORT, () => {
  console.log(`\n🚀 Analytics Dashboard levantado en http://localhost:${PORT}`);
  console.log(`\n📊 Dashboard: http://localhost:${PORT}/`);
  console.log('\n⚠️  Nota: Los datos son mockeados. Supabase no está configurado.\n');
});
