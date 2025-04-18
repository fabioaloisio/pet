/**
 * @file Filhote.js
 * @description Modelo para a entidade Filhote
 */

const db = require('../config/database');

class Filhote {
  /**
   * @description Cria um novo filhote
   * @param {Object} filhote - Dados do filhote
   * @returns {Promise} Resultado da operação
   */
  static async create(filhote) {
    const { especie, raca } = filhote;
    const [result] = await db.execute(
      'INSERT INTO filhotes (especie, raca) VALUES (?, ?)',
      [especie, raca]
    );
    return result;
  }

  /**
   * @description Busca todos os filhotes
   * @returns {Promise} Lista de filhotes
   */
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM filhotes');
    return rows;
  }

  /**
   * @description Busca um filhote pelo ID
   * @param {number} id - ID do filhote
   * @returns {Promise} Dados do filhote
   */
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM filhotes WHERE id = ?', [id]);
    return rows[0];
  }

  /**
   * @description Atualiza os dados de um filhote
   * @param {number} id - ID do filhote
   * @param {Object} filhote - Novos dados do filhote
   * @returns {Promise} Resultado da operação
   */
  static async update(id, filhote) {
    const { especie, raca } = filhote;
    const [result] = await db.execute(
      'UPDATE filhotes SET especie = ?, raca = ? WHERE id = ?',
      [especie, raca, id]
    );
    return result;
  }

  /**
   * @description Remove um filhote
   * @param {number} id - ID do filhote
   * @returns {Promise} Resultado da operação
   */
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM filhotes WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Filhote; 