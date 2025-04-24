/**
 * @fileoverview Configuração para carregamento das variáveis de ambiente
 * @module config/env
 */

require('dotenv').config();

/**
 * Configurações do ambiente
 * @type {Object}
 */
const env = {
  /**
   * Porta do servidor
   * @type {number}
   */
  port: process.env.PORT || 3000,

  /**
   * Ambiente de execução (development/production)
   * @type {string}
   */
  nodeEnv: process.env.NODE_ENV || 'development',

  /**
   * Configurações do banco de dados
   * @type {Object}
   */
  database: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  }
};

module.exports = env; 