const blingService = require('../services/blingService');
const jwt = require('jsonwebtoken');
const config = require('../config');

class AuthController {
  /**
   * Inicia o processo de autenticação OAuth
   */
  async initiateAuth(req, res) {
    try {
      const { authUrl, state } = blingService.getAuthorizationUrl();

      // Salva o state na sessão para validação posterior
      req.session = req.session || {};
      req.session.oauthState = state;

      res.json({
        success: true,
        authUrl,
        message: 'Redirecione o usuário para esta URL para autorização',
      });
    } catch (error) {
      console.error('Erro ao iniciar autenticação:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Processa o callback do OAuth
   */
  async handleCallback(req, res) {
    try {
      const { code, state, error, error_description } = req.query;

      // Verifica se houve erro na autorização
      if (error) {
        return res.status(400).json({
          success: false,
          error: error_description || error,
          redirect: `${
            config.frontendUrl
          }/auth/error?message=${encodeURIComponent(
            error_description || error
          )}`,
        });
      }

      // Verifica se code e state foram fornecidos
      if (!code || !state) {
        return res.status(400).json({
          success: false,
          error: 'Parâmetros obrigatórios ausentes',
          redirect: `${config.frontendUrl}/auth/error?message=Parametros%20obrigatorios%20ausentes`,
        });
      }

      // Valida o state
      if (!blingService.validateState(state)) {
        return res.status(400).json({
          success: false,
          error: 'State inválido ou expirado',
          redirect: `${config.frontendUrl}/auth/error?message=State%20invalido%20ou%20expirado`,
        });
      }

      // Troca o código por tokens
      const tokenResult = await blingService.exchangeCodeForTokens(code);

      if (!tokenResult.success) {
        return res.status(400).json({
          success: false,
          error: tokenResult.error,
          redirect: `${
            config.frontendUrl
          }/auth/error?message=${encodeURIComponent(tokenResult.error)}`,
        });
      }

      const { access_token, refresh_token, expires_in } = tokenResult.data;

      // Obtém informações do usuário
      const userResult = await blingService.getUserInfo(access_token);

      if (!userResult.success) {
        return res.status(400).json({
          success: false,
          error: 'Erro ao obter informações do usuário',
          redirect: `${config.frontendUrl}/auth/error?message=Erro%20ao%20obter%20informacoes%20do%20usuario`,
        });
      }

      // Cria JWT com as informações
      const jwtPayload = {
        userId: userResult.data.id || userResult.data.usuario?.id,
        email: userResult.data.email || userResult.data.usuario?.email,
        name: userResult.data.name || userResult.data.usuario?.nome,
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: new Date(Date.now() + expires_in * 1000),
      };

      const token = jwt.sign(jwtPayload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });

      // Retorna sucesso com redirecionamento
      res.json({
        success: true,
        token,
        user: {
          id: jwtPayload.userId,
          email: jwtPayload.email,
          name: jwtPayload.name,
        },
        expiresAt: jwtPayload.expiresAt,
        redirect: `${config.frontendUrl}/dashboard?token=${token}`,
      });
    } catch (error) {
      console.error('Erro no callback OAuth:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        redirect: `${config.frontendUrl}/auth/error?message=Erro%20interno%20do%20servidor`,
      });
    }
  }

  /**
   * Renova o access token
   */
  async refreshToken(req, res) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          error: 'Token não fornecido',
        });
      }

      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, config.jwt.secret);

      const refreshResult = await blingService.refreshAccessToken(
        decoded.refreshToken
      );

      if (!refreshResult.success) {
        return res.status(401).json({
          success: false,
          error: refreshResult.error,
        });
      }

      const { access_token, refresh_token, expires_in } = refreshResult.data;

      // Cria novo JWT
      const newJwtPayload = {
        ...decoded,
        accessToken: access_token,
        refreshToken: refresh_token || decoded.refreshToken,
        expiresAt: new Date(Date.now() + expires_in * 1000),
      };

      const newToken = jwt.sign(newJwtPayload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });

      res.json({
        success: true,
        token: newToken,
        expiresAt: newJwtPayload.expiresAt,
      });
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      res.status(401).json({
        success: false,
        error: 'Token inválido',
      });
    }
  }

  /**
   * Verifica se o usuário está autenticado
   */
  async checkAuth(req, res) {
    try {
      // O middleware de autenticação já validou o token
      const user = req.user;

      res.json({
        success: true,
        authenticated: true,
        user: {
          id: user.userId,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Faz logout (invalida o token)
   */
  async logout(req, res) {
    try {
      // Em uma implementação completa, você adicionaria o token a uma blacklist
      res.json({
        success: true,
        message: 'Logout realizado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }
}

module.exports = new AuthController();
