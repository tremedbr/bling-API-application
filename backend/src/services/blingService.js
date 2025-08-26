const axios = require('axios');
const config = require('../config');
const { v4: uuidv4 } = require('uuid');

class BlingService {
  constructor() {
    this.config = config.bling;
    this.sessions = new Map(); // Em produção, use Redis ou banco de dados
  }

  /**
   * Gera URL de autorização OAuth do Bling
   * @returns {Object} URL de autorização e state
   */
  getAuthorizationUrl() {
    const state = uuidv4();

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scope,
      state: state,
    });

    const authUrl = `${this.config.authUrl}?${params.toString()}`;

    // Armazena o state para validação posterior
    this.sessions.set(state, {
      createdAt: new Date(),
      used: false,
    });

    return {
      authUrl,
      state,
    };
  }

  /**
   * Valida o state retornado pelo OAuth
   * @param {string} state
   * @returns {boolean}
   */
  validateState(state) {
    const session = this.sessions.get(state);

    if (!session || session.used) {
      return false;
    }

    // Verifica se não expirou (5 minutos)
    const now = new Date();
    const diffMinutes = (now - session.createdAt) / (1000 * 60);

    if (diffMinutes > 5) {
      this.sessions.delete(state);
      return false;
    }

    // Marca como usado
    session.used = true;
    this.sessions.set(state, session);

    return true;
  }

  /**
   * Troca o código de autorização por tokens
   * @param {string} code
   * @returns {Object} Tokens de acesso
   */
  async exchangeCodeForTokens(code) {
    try {
      const response = await axios.post(
        this.config.tokenUrl,
        {
          grant_type: 'authorization_code',
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          redirect_uri: this.config.redirectUri,
          code: code,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(
        'Erro ao trocar código por tokens:',
        error.response?.data || error.message
      );

      return {
        success: false,
        error:
          error.response?.data?.error_description || 'Erro ao obter tokens',
        details: error.response?.data,
      };
    }
  }

  /**
   * Atualiza o access token usando refresh token
   * @param {string} refreshToken
   * @returns {Object} Novos tokens
   */
  async refreshAccessToken(refreshToken) {
    try {
      const response = await axios.post(
        this.config.tokenUrl,
        {
          grant_type: 'refresh_token',
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: refreshToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(
        'Erro ao renovar token:',
        error.response?.data || error.message
      );

      return {
        success: false,
        error:
          error.response?.data?.error_description || 'Erro ao renovar token',
        details: error.response?.data,
      };
    }
  }

  /**
   * Faz uma requisição autenticada para a API do Bling
   * @param {string} endpoint
   * @param {string} accessToken
   * @param {Object} options
   * @returns {Object} Resposta da API
   */
  async makeAuthenticatedRequest(endpoint, accessToken, options = {}) {
    try {
      const { method = 'GET', data = null, params = {} } = options;

      const response = await axios({
        method,
        url: `${this.config.apiBaseUrl}${endpoint}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data,
        params,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(
        `Erro na requisição ${endpoint}:`,
        error.response?.data || error.message
      );

      return {
        success: false,
        error: error.response?.data?.error?.description || 'Erro na requisição',
        status: error.response?.status,
        details: error.response?.data,
      };
    }
  }

  /**
   * Obtém informações do usuário autenticado
   * @param {string} accessToken
   * @returns {Object} Dados do usuário
   */
  async getUserInfo(accessToken) {
    return this.makeAuthenticatedRequest('/me', accessToken);
  }

  /**
   * Lista produtos
   * @param {string} accessToken
   * @param {Object} filters
   * @returns {Object} Lista de produtos
   */
  async getProducts(accessToken, filters = {}) {
    return this.makeAuthenticatedRequest('/produtos', accessToken, {
      params: filters,
    });
  }

  /**
   * Lista pedidos
   * @param {string} accessToken
   * @param {Object} filters
   * @returns {Object} Lista de pedidos
   */
  async getOrders(accessToken, filters = {}) {
    return this.makeAuthenticatedRequest('/pedidos/vendas', accessToken, {
      params: filters,
    });
  }

  /**
   * Lista contatos
   * @param {string} accessToken
   * @param {Object} filters
   * @returns {Object} Lista de contatos
   */
  async getContacts(accessToken, filters = {}) {
    return this.makeAuthenticatedRequest('/contatos', accessToken, {
      params: filters,
    });
  }
}

module.exports = new BlingService();
