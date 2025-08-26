require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Configurações do Bling OAuth
  bling: {
    clientId: process.env.BLING_CLIENT_ID,
    clientSecret: process.env.BLING_CLIENT_SECRET,
    redirectUri: process.env.BLING_REDIRECT_URI,
    scope: process.env.BLING_SCOPE || 'profile,read,write',
    authUrl:
      process.env.BLING_AUTH_URL ||
      'https://bling.com.br/Api/v3/oauth/authorize',
    tokenUrl:
      process.env.BLING_TOKEN_URL || 'https://bling.com.br/Api/v3/oauth/token',
    apiBaseUrl: process.env.BLING_API_BASE_URL || 'https://bling.com.br/Api/v3',
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h',
  },

  // URLs
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3001',
};

// Validações
if (!config.bling.clientId || !config.bling.clientSecret) {
  console.warn(
    '⚠️  ATENÇÃO: Configure BLING_CLIENT_ID e BLING_CLIENT_SECRET no arquivo .env'
  );
}

if (!config.jwt.secret) {
  console.warn('⚠️  ATENÇÃO: Configure JWT_SECRET no arquivo .env');
}

module.exports = config;
