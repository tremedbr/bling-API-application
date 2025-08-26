/**
 * Utilitários para formatação de respostas da API
 */

/**
 * Formata resposta de sucesso
 * @param {*} data
 * @param {string} message
 * @returns {Object}
 */
const successResponse = (data, message = 'Sucesso') => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Formata resposta de erro
 * @param {string} error
 * @param {number} status
 * @param {*} details
 * @returns {Object}
 */
const errorResponse = (error, status = 400, details = null) => {
  return {
    success: false,
    error,
    status,
    details,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Formata resposta paginada
 * @param {Array} data
 * @param {Object} pagination
 * @returns {Object}
 */
const paginatedResponse = (data, pagination) => {
  return {
    success: true,
    data,
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || 100,
      total: pagination.total || data.length,
      totalPages: Math.ceil(
        (pagination.total || data.length) / (pagination.limit || 100)
      ),
    },
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse,
};
