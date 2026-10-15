// Lógica del formulario de feedback
(function() {
  'use strict';

  const form = document.getElementById('feedbackForm');
  const messageDiv = document.getElementById('message');

  // Configuración de Supabase (desde config.js)
  const SUPABASE_URL = 'https://xyzproject.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5enByb2plY3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxODAwMDAwMDAwfQ.example';

  function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
  }

  function clearMessage() {
    messageDiv.style.display = 'none';
  }

  async function submitFeedback(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Obtener IP del usuario (esto es una aproximación)
    let userIP = 'unknown';
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      userIP = ipData.ip;
    } catch (err) {
      console.warn('Could not fetch user IP:', err);
    }

    const feedbackData = {
      user_email: email,
      user_name: name,
      message: message,
      ip_address: userIP
    };

    try {
      // Enviar a la API de Supabase directamente
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/feedback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify(feedbackData)
        }
      );

      if (response.ok) {
        showMessage('¡Gracias por tu feedback!', 'success');
        form.reset();
      } else {
        showMessage('Error al guardar el feedback. Intenta de nuevo.', 'error');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showMessage('Error de conexión. Intenta de nuevo.', 'error');
    }
  }

  form.addEventListener('submit', submitFeedback);
})();
