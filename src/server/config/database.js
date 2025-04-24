/**
 * @fileoverview Configuração de conexão com o banco de dados MySQL
 * @module config/database
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Configuração do pool de conexões com o MySQL
 * @type {Pool}
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
});

/**
 * Testa a conexão com o banco de dados
 * @async
 * @returns {Promise<void>}
 */
async function testConnection() {
    let connection;
    try {
        connection = await pool.getConnection();
        // console.log('Conexão com o banco de dados estabelecida com sucesso');
        connection.release();
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
        // Não encerrar o processo em ambiente de teste
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1);
        }
    }
}

/**
 * Fecha todas as conexões do pool
 * @async
 * @returns {Promise<void>}
 */
async function closePool() {
    try {
        await pool.end();
        console.log('Pool de conexões fechado com sucesso');
    } catch (error) {
        console.error('Erro ao fechar o pool de conexões:', error);
    }
}

// Executa o teste de conexão apenas se não estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
    testConnection();
}

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
    closePool,
    testConnection
}; 