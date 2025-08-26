const express = require('express');
const blingController = require('../controllers/blingController');
const { authMiddleware } = require('../middleware/auth');
const { apiLimiter, strictLimiter } = require('../middleware/rateLimiting');

const router = express.Router();

// Todas as rotas da API do Bling requerem autenticação
router.use(authMiddleware);

// Informações do usuário
router.get('/user', apiLimiter, blingController.getUserInfo);

// Produtos
router.get('/produtos', apiLimiter, blingController.getProducts);

// Pedidos
router.get('/pedidos', apiLimiter, blingController.getOrders);

// Contatos
router.get('/contatos', apiLimiter, blingController.getContacts);

// Requisição personalizada (com rate limiting mais rigoroso)
router.post('/custom', strictLimiter, blingController.customRequest);

module.exports = router;
