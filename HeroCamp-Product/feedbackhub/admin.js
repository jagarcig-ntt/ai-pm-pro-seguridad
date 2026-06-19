// Panel de administración para revisar feedback

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://xyzproject.supabase.co";

// Cliente Supabase para operaciones de admin
const supabaseAdmin = createClient(
  SUPABASE_URL,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5enByb2plY3QiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE4MDAwMDAwMDB9.service_role_key_here"
  // Usamos service_role para que el admin pueda ver todo
);

// Cargar feedback desde la base de datos
async function loadFeedback() {
  try {
    const { data, error } = await supabaseAdmin
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error loading feedback:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Exception loading feedback:", err);
    return [];
  }
}

// Renderizar tabla de feedback en HTML
async function renderFeedbackTable() {
  const feedbackList = await loadFeedback();

  let html = '<table border="1"><tr><th>Email</th><th>Nombre</th><th>Mensaje</th><th>IP</th><th>Fecha</th></tr>';

  feedbackList.forEach(fb => {
    html += `<tr>
      <td>${fb.user_email}</td>
      <td>${fb.user_name}</td>
      <td>${fb.message}</td>
      <td>${fb.ip_address}</td>
      <td>${new Date(fb.created_at).toLocaleString()}</td>
    </tr>`;
  });

  html += '</table>';
  return html;
}

module.exports = { loadFeedback, renderFeedbackTable };
