/**
 * @file Interessado.js
 * @description Modelo para a entidade Interessado
 */

const db = require('../config/database');

class Interessado {
  /**
   * @description Cria um novo interessado
   * @param {Object} interessado - Dados do interessado
   * @returns {Promise} Resultado da operação
   */
  static async create(interessado) {
    const { cpf, nome, telefone, email } = interessado;
    const [result] = await db.execute(
      'INSERT INTO interessados (cpf, nome, telefone, email) VALUES (?, ?, ?, ?)',
      [cpf, nome, telefone, email]
    );
    return result;
  }

  /**
   * @description Busca todos os interessados
   * @returns {Promise} Lista de interessados
   */
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM interessados');
    return rows;
  }

  /**
   * @description Busca um interessado pelo ID
   * @param {number} id - ID do interessado
   * @returns {Promise} Dados do interessado
   */
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM interessados WHERE id = ?', [id]);
    return rows[0];
  }

  /**
   * @description Atualiza os dados de um interessado
   * @param {number} id - ID do interessado
   * @param {Object} interessado - Novos dados do interessado
   * @returns {Promise} Resultado da operação
   */
  static async update(id, interessado) {
    const { cpf, nome, telefone, email } = interessado;
    const [result] = await db.execute(
      'UPDATE interessados SET cpf = ?, nome = ?, telefone = ?, email = ? WHERE id = ?',
      [cpf, nome, telefone, email, id]
    );
    return result;
  }

  /**
   * @description Remove um interessado
   * @param {number} id - ID do interessado
   * @returns {Promise} Resultado da operação
   */
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM interessados WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Interessado; 