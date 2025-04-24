/**
 * @fileoverview Modelo para gerenciamento de filhotes
 * @module models/Filhote
 */

const db = require('../config/database');

/**
 * Classe que representa o modelo de filhotes
 * @class
 */
class Filhote {
    /**
     * Busca todos os filhotes
     * @async
     * @returns {Promise<Array>} Lista de filhotes
     */
    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM filhotes ORDER BY created_at DESC');
            return rows;
        } catch (error) {
            console.error('Erro ao buscar filhotes:', error);
            throw error;
        }
    }

    /**
     * Busca um filhote pelo ID
     * @async
     * @param {number} id - ID do filhote
     * @returns {Promise<Object|null>} Filhote encontrado ou null se não existir
     */
    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM filhotes WHERE id = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Erro ao buscar filhote por ID:', error);
            throw error;
        }
    }

    /**
     * Cria um novo filhote
     * @async
     * @param {Object} dados - Dados do filhote
     * @param {string} dados.especie - Espécie do filhote
     * @param {string} dados.raca - Raça do filhote
     * @returns {Promise<Object>} Filhote criado
     */
    static async create(dados) {
        try {
            const { especie, raca } = dados;
            const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
            
            const [result] = await db.query(
                'INSERT INTO filhotes (especie, raca, created_at) VALUES (?, ?, ?)',
                [especie, raca, now]
            );
            
            return this.findById(result.insertId);
        } catch (error) {
            console.error('Erro ao criar filhote:', error);
            throw error;
        }
    }

    /**
     * Atualiza um filhote existente
     * @async
     * @param {number} id - ID do filhote
     * @param {Object} dados - Dados do filhote
     * @param {string} dados.especie - Espécie do filhote
     * @param {string} dados.raca - Raça do filhote
     * @returns {Promise<Object>} Filhote atualizado
     */
    static async update(id, dados) {
        try {
            const { especie, raca } = dados;
            const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
            
            await db.query(
                'UPDATE filhotes SET especie = ?, raca = ?, updated_at = ? WHERE id = ?',
                [especie, raca, now, id]
            );
            
            return this.findById(id);
        } catch (error) {
            console.error('Erro ao atualizar filhote:', error);
            throw error;
        }
    }

    /**
     * Remove um filhote
     * @async
     * @param {number} id - ID do filhote
     * @returns {Promise<boolean>} True se o filhote foi removido
     */
    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM filhotes WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao remover filhote:', error);
            throw error;
        }
    }
}

module.exports = Filhote; 