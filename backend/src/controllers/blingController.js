const blingService = require('../services/blingService');

class BlingController {
  /**
   * Obtém informações do usuário
   */
  async getUserInfo(req, res) {
    try {
      const result = await blingService.getUserInfo(req.user.accessToken);

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json({
        success: true,
        data: result.data,
      });
    } catch (error) {
      console.error('Erro ao obter info do usuário:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Lista produtos
   */
  async getProducts(req, res) {
    try {
      const filters = {
        limite: req.query.limite || 100,
        pagina: req.query.pagina || 1,
        criterio: req.query.criterio || 1, // 1 = ID, 2 = Nome
        tipo: req.query.tipo || '', // P = Produto, S = Serviço
        situacao: req.query.situacao || 'Ativo',
      };

      const result = await blingService.getProducts(
        req.user.accessToken,
        filters
      );

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json({
        success: true,
        data: result.data,
      });
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Lista pedidos
   */
  async getOrders(req, res) {
    try {
      const filters = {
        limite: req.query.limite || 100,
        pagina: req.query.pagina || 1,
        dataInicial: req.query.dataInicial,
        dataFinal: req.query.dataFinal,
        situacao: req.query.situacao,
      };

      const result = await blingService.getOrders(
        req.user.accessToken,
        filters
      );

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json({
        success: true,
        data: result.data,
      });
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Lista contatos
   */
  async getContacts(req, res) {
    try {
      const filters = {
        limite: req.query.limite || 100,
        pagina: req.query.pagina || 1,
        tipo: req.query.tipo, // C = Cliente, F = Fornecedor
        situacao: req.query.situacao || 'Ativo',
      };

      const result = await blingService.getContacts(
        req.user.accessToken,
        filters
      );

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json({
        success: true,
        data: result.data,
      });
    } catch (error) {
      console.error('Erro ao listar contatos:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Faz uma requisição personalizada para qualquer endpoint da API
   */
  async customRequest(req, res) {
    try {
      const { endpoint, method = 'GET', data = null, params = {} } = req.body;

      if (!endpoint) {
        return res.status(400).json({
          success: false,
          error: 'Endpoint é obrigatório',
        });
      }

      const result = await blingService.makeAuthenticatedRequest(
        endpoint,
        req.user.accessToken,
        { method, data, params }
      );

      res.json(result);
    } catch (error) {
      console.error('Erro na requisição personalizada:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }
}

module.exports = new BlingController();
