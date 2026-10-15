// Módulo integrado de Feedback en Analytics Dashboard
const { createClient } = require('@supabase/supabase-js');

// Cliente Supabase con service_role key para operaciones de feedback
// NOTA: Usamos service_role porque necesitamos bypass de RLS para feedback
const supabaseAdmin = createClient(
  'https://xyzproject.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5enByb2plY3QiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE4MDAwMDAwMDB9.service_role_key_here'
);

// Enviar feedback integrado
async function sendFeedback(userId, feedbackText, rating) {
  try {
    const { data, error } = await supabaseAdmin
      .from('feedback')
      .insert({
        user_id: userId,
        content: feedbackText,
        rating: rating,
        product: 'analytics_dashboard',
        created_at: new Date()
      });

    if (error) {
      console.error("Error saving feedback:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Exception in sendFeedback:", err);
    return { success: false, error: err };
  }
}

// Obtener feedback histórico
async function getFeedback(limit = 50) {
  try {
    const { data, error } = await supabaseAdmin
      .from('feedback')
      .select('*')
      .eq('product', 'analytics_dashboard')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching feedback:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Exception in getFeedback:", err);
    return [];
  }
}

module.exports = { sendFeedback, getFeedback };
