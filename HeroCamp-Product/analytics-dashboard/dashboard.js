// Lógica del Analytics Dashboard
(function() {
  'use strict';

  // ============================================================
  // PROGRESS BAR
  // ============================================================
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progressBar.style.width = (scrolled * 100) + '%';
  });

  // ============================================================
  // REVEAL ON SCROLL (IntersectionObserver)
  // ============================================================
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // Configuración
  const API_URL = 'http://localhost:3001/api';
  const SUPABASE_URL = 'https://xyzproject.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5enByb2plY3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxODAwMDAwMDAwfQ.example';

  // Elementos del DOM
  const feedbackModal = document.getElementById('feedbackModal');
  const feedbackForm = document.getElementById('feedbackForm');

  // Modal functions
  window.openFeedbackModal = function() {
    feedbackModal.classList.add('active');
  };

  window.closeFeedbackModal = function() {
    feedbackModal.classList.remove('active');
    feedbackForm.reset();
  };

  // Cerrar modal al clickear fuera
  feedbackModal.addEventListener('click', function(e) {
    if (e.target === feedbackModal) {
      closeFeedbackModal();
    }
  });

  // Enviar feedback
  feedbackForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('feedbackEmail').value;
    const rating = document.getElementById('feedbackRating').value;
    const text = document.getElementById('feedbackText').value;

    try {
      // Enviar al endpoint local
      const response = await fetch(
        `${API_URL}/feedback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            rating: parseInt(rating),
            content: text,
            product: 'analytics_dashboard'
          })
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log('Feedback enviado:', result);

        // Mostrar mensaje de éxito con estilo
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(127, 209, 185, 0.95);
          color: #0A0E1A;
          padding: 16px 24px;
          border-radius: 6px;
          font-weight: 600;
          z-index: 9999;
          animation: slideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        `;
        successMsg.textContent = '✓ ¡Gracias por tu feedback!';
        document.body.appendChild(successMsg);

        // Limpiar
        closeFeedbackModal();
        setTimeout(() => successMsg.remove(), 3000);
      } else {
        alert('Error al enviar feedback. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Error de conexión. Intenta de nuevo.');
    }
  });

  // Cargar métricas al iniciar
  async function loadMetrics() {
    try {
      const response = await fetch(`${API_URL}/metrics/summary`, {
        headers: {
          'Authorization': 'Bearer mock-token-123'
        }
      });

      if (response.ok) {
        const metrics = await response.json();
        console.log('Métricas cargadas:', metrics);
      }
    } catch (error) {
      console.warn('No se pudieron cargar métricas:', error);
    }
  }

  // Cargar eventos
  async function loadEvents() {
    try {
      const response = await fetch(`${API_URL}/metrics/events`, {
        headers: {
          'Authorization': 'Bearer mock-token-123'
        }
      });

      if (response.ok) {
        const events = await response.json();
        console.log('Eventos cargados:', events);
      }
    } catch (error) {
      console.warn('No se pudieron cargar eventos:', error);
    }
  }

  // Inicializar
  loadMetrics();
  loadEvents();

  // Recargar cada 30 segundos
  setInterval(() => {
    loadMetrics();
    loadEvents();
  }, 30000);
})();
