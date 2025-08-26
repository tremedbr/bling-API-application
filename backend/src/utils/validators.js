/**
 * Utilitários para validação de dados
 */

/**
 * Valida se um email é válido
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida se uma data está no formato correto
 * @param {string} dateString
 * @returns {boolean}
 */
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

/**
 * Valida parâmetros obrigatórios
 * @param {Object} data
 * @param {Array} required
 * @returns {Object}
 */
const validateRequired = (data, required) => {
  const missing = [];

  for (const field of required) {
    if (!data[field] || data[field] === '') {
      missing.push(field);
    }
  }

  return {
    isValid: missing.length === 0,
    missing,
  };
};

/**
 * Sanitiza string removendo caracteres especiais
 * @param {string} str
 * @returns {string}
 */
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

/**
 * Valida número inteiro positivo
 * @param {*} value
 * @returns {boolean}
 */
const isPositiveInteger = (value) => {
  const num = parseInt(value);
  return !isNaN(num) && num > 0 && num.toString() === value.toString();
};

module.exports = {
  isValidEmail,
  isValidDate,
  validateRequired,
  sanitizeString,
  isPositiveInteger,
};
