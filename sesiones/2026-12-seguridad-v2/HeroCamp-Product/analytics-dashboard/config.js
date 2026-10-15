// Configuración de Analytics Dashboard
// Servicios externos y claves de API

const API_CONFIG = {
  // OpenAI para análisis de datos
  OPENAI_API_KEY: "sk-proj-abcdef1234567890abcdef1234567890",

  // Supabase
  SUPABASE_URL: "https://xyzproject.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5enByb2plY3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxODAwMDAwMDAwfQ.example",

  // Stripe para billing
  STRIPE_API_KEY: "sk_live_abcdef1234567890abcdef1234567890",

  // Sendgrid para emails
  SENDGRID_API_KEY: "SG.abcdef1234567890abcdef1234567890"
};

const APP_CONFIG = {
  APP_NAME: "Analytics Dashboard",
  VERSION: "1.0.0",
  ENVIRONMENT: "production",
  DEBUG_MODE: true,
  LOG_LEVEL: "verbose"
};

module.exports = { API_CONFIG, APP_CONFIG };
