import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Cria instância do axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('bling_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e renovar token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (error.response.data?.needsRefresh) {
        try {
          await authService.refreshToken();
          // Retry da requisição original
          return api(originalRequest);
        } catch (refreshError) {
          // Se falhar ao renovar, redireciona para login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('bling_token');
            window.location.href = '/';
          }
          return Promise.reject(refreshError);
        }
      } else {
        // Token inválido, remove e redireciona
        if (typeof window !== 'undefined') {
          localStorage.removeItem('bling_token');
          window.location.href = '/';
        }
      }
    }

    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  // Inicia o processo de autenticação
  async initiateAuth() {
    const response = await api.get('/auth');
    return response.data;
  },

  // Renova o token
  async refreshToken() {
    const response = await api.post('/auth/refresh');
    if (response.data.success) {
      localStorage.setItem('bling_token', response.data.token);
    }
    return response.data;
  },

  // Verifica se está autenticado
  async checkAuth() {
    try {
      const response = await api.get('/auth/check');
      return response.data;
    } catch (error) {
      return { success: false, authenticated: false };
    }
  },

  // Faz logout
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      localStorage.removeItem('bling_token');
    }
  },

  // Salva token no localStorage
  saveToken(token) {
    localStorage.setItem('bling_token', token);
  },

  // Obtém token do localStorage
  getToken() {
    return localStorage.getItem('bling_token');
  },

  // Verifica se tem token salvo
  hasToken() {
    return !!this.getToken();
  },
};

// Serviços da API do Bling
export const blingService = {
  // Obtém informações do usuário
  async getUserInfo() {
    const response = await api.get('/api/bling/user');
    return response.data;
  },

  // Lista produtos
  async getProducts(filters = {}) {
    const response = await api.get('/api/bling/produtos', { params: filters });
    return response.data;
  },

  // Lista pedidos
  async getOrders(filters = {}) {
    const response = await api.get('/api/bling/pedidos', { params: filters });
    return response.data;
  },

  // Lista contatos
  async getContacts(filters = {}) {
    const response = await api.get('/api/bling/contatos', { params: filters });
    return response.data;
  },

  // Faz requisição personalizada
  async customRequest(endpoint, method = 'GET', data = null, params = {}) {
    const response = await api.post('/api/bling/custom', {
      endpoint,
      method,
      data,
      params,
    });
    return response.data;
  },
};

// Serviços gerais
export const generalService = {
  // Health check
  async healthCheck() {
    const response = await api.get('/health');
    return response.data;
  },

  // Verifica configuração
  async checkConfig() {
    const response = await api.get('/config/check');
    return response.data;
  },
};

export default api;
