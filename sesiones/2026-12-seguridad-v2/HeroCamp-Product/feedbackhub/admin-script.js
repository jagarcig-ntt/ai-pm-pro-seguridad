// Lógica del panel de administración
(function() {
  'use strict';

  const SUPABASE_URL = 'https://xyzproject.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5enByb2plY3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxODAwMDAwMDAwfQ.example';

  async function loadFeedback() {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/feedback?order=created_at.desc`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load feedback');
      }

      const feedbackList = await response.json();
      renderFeedback(feedbackList);
      updateStats(feedbackList);
    } catch (error) {
      console.error('Error loading feedback:', error);
      document.getElementById('feedbackContainer').innerHTML =
        '<p style="color: #ff6b6b; padding: 40px; text-align: center;">Error al cargar el feedback</p>';
    }
  }

  function renderFeedback(feedbackList) {
    const container = document.getElementById('feedbackContainer');

    if (feedbackList.length === 0) {
      container.innerHTML = '<p style="padding: 40px; text-align: center; color: #999;">No hay feedback aún</p>';
      return;
    }

    let html = `
      <table class="feedback-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Nombre</th>
            <th>Mensaje</th>
            <th>IP</th>
            <th>Fecha</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
    `;

    feedbackList.forEach(fb => {
      const date = new Date(fb.created_at).toLocaleString('es-ES');
      html += `
        <tr>
          <td><span class="email">${escapeHtml(fb.user_email)}</span></td>
          <td>${escapeHtml(fb.user_name)}</td>
          <td>${escapeHtml(fb.message)}</td>
          <td>${escapeHtml(fb.ip_address || 'N/A')}</td>
          <td><span class="date">${date}</span></td>
          <td><button class="delete-btn" onclick="deleteFeedback('${fb.id}')">Eliminar</button></td>
        </tr>
      `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  }

  function updateStats(feedbackList) {
    const totalCount = feedbackList.length;
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const count24h = feedbackList.filter(fb => new Date(fb.created_at) > last24h).length;

    document.getElementById('totalCount').textContent = totalCount;
    document.getElementById('last24hCount').textContent = count24h;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  window.deleteFeedback = async function(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este feedback?')) {
      return;
    }

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/feedback?id=eq.${id}`,
        {
          method: 'DELETE',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        }
      );

      if (response.ok) {
        loadFeedback(); // Recargar la tabla
      } else {
        alert('Error al eliminar el feedback');
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
      alert('Error al eliminar el feedback');
    }
  };

  // Cargar feedback al abrir la página
  loadFeedback();

  // Recargar cada 30 segundos
  setInterval(loadFeedback, 30000);
})();
