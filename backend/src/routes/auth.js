const express = require('express');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiting');

const router = express.Router();

// Rotas de autenticação OAuth
router.get('/auth', authLimiter, authController.initiateAuth);
router.get('/auth/bling/callback', authLimiter, authController.handleCallback);
router.post('/auth/refresh', authLimiter, authController.refreshToken);
router.get('/auth/check', authMiddleware, authController.checkAuth);
router.post('/auth/logout', authMiddleware, authController.logout);

module.exports = router;
