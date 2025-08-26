const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');

// Rotas
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();

// Middlewares de segurança
app.use(helmet());

// CORS
app.use(
  cors({
    origin: [
      config.frontendUrl,
      'http://localhost:3001',
      'http://127.0.0.1:3001',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware para logging básico
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/', authRoutes);
app.use('/api/bling', apiRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor funcionando',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Rota para testar configuração
app.get('/config/check', (req, res) => {
  res.json({
    success: true,
    config: {
      blingConfigured: !!(config.bling.clientId && config.bling.clientSecret),
      jwtConfigured: !!config.jwt.secret,
      environment: config.nodeEnv,
      port: config.port,
    },
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
    path: req.originalUrl,
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);

  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    message:
      config.nodeEnv === 'development' ? error.message : 'Algo deu errado',
  });
});

// Inicialização do servidor
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`
🚀 Servidor rodando na porta ${PORT}
📁 Ambiente: ${config.nodeEnv}
🔗 Base URL: ${config.baseUrl}
🖥️  Frontend URL: ${config.frontendUrl}

📊 Status da configuração:
   ${config.bling.clientId ? '✅' : '❌'} Bling Client ID
   ${config.bling.clientSecret ? '✅' : '❌'} Bling Client Secret  
   ${config.jwt.secret ? '✅' : '❌'} JWT Secret

🔧 Para configurar o Bling OAuth:
   1. Copie .env.example para .env
   2. Configure BLING_CLIENT_ID e BLING_CLIENT_SECRET
   3. Configure JWT_SECRET

🌐 URLs disponíveis:
   GET  ${config.baseUrl}/health - Health check
   GET  ${config.baseUrl}/config/check - Verificar configuração
   GET  ${config.baseUrl}/auth - Iniciar autenticação OAuth
   GET  ${config.baseUrl}/auth/bling/callback - Callback OAuth
   POST ${config.baseUrl}/auth/refresh - Renovar token
   GET  ${config.baseUrl}/auth/check - Verificar autenticação
   POST ${config.baseUrl}/auth/logout - Logout
   
   GET  ${config.baseUrl}/api/bling/user - Info do usuário
   GET  ${config.baseUrl}/api/bling/produtos - Listar produtos
   GET  ${config.baseUrl}/api/bling/pedidos - Listar pedidos
   GET  ${config.baseUrl}/api/bling/contatos - Listar contatos
   POST ${config.baseUrl}/api/bling/custom - Requisição personalizada
  `);
});

module.exports = app;
