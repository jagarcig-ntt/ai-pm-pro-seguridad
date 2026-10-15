// Servidor local simple para desarrollar FeedbackHub
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
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
});

server.listen(PORT, () => {
  console.log(`\n🚀 FeedbackHub levantado en http://localhost:${PORT}`);
  console.log(`\n📝 Formulario: http://localhost:${PORT}/`);
  console.log(`📊 Panel admin: http://localhost:${PORT}/admin.html\n`);
  console.log('⚠️  Nota: Los datos no se guardarán (Supabase no está configurado)');
  console.log('   Pero puedes ver la UI y hacer clic en los botones.\n');
});
