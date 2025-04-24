/**
 * @fileoverview Modelo de dados para os interessados
 * @module models/Interessado
 */

const db = require('../config/database');

/**
 * Classe que representa o modelo de dados para os interessados
 * @class
 */
class Interessado {
    /**
     * Cria uma nova instância do modelo Interessado
     * @param {Object} data - Dados do interessado
     * @param {string} data.nome - Nome do interessado
     * @param {string} data.email - Email do interessado
     * @param {string} data.telefone - Telefone do interessado
     * @param {string} data.cpf - CPF do interessado
     */
    constructor(data) {
        this.id = data.id;
        this.nome = data.nome;
        this.email = data.email;
        this.telefone = data.telefone;
        this.cpf = data.cpf;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    /**
     * Busca todos os interessados cadastrados
     * @async
     * @static
     * @returns {Promise<Array<Interessado>>} Lista de interessados
     * @throws {Error} Erro ao buscar interessados
     */
    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM interessados ORDER BY nome');
            return rows.map(row => new Interessado(row));
        } catch (error) {
            console.error('Erro ao buscar interessados:', error);
            throw new Error('Erro ao buscar interessados');
        }
    }

    /**
     * Busca um interessado pelo ID
     * @async
     * @static
     * @param {number} id - ID do interessado
     * @returns {Promise<Interessado|null>} Dados do interessado ou null se não encontrado
     * @throws {Error} Erro ao buscar interessado
     */
    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM interessados WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return new Interessado(rows[0]);
        } catch (error) {
            console.error('Erro ao buscar interessado:', error);
            throw new Error('Erro ao buscar interessado');
        }
    }

    /**
     * Cria um novo interessado
     * @async
     * @static
     * @param {Object} data - Dados do interessado
     * @param {string} data.nome - Nome do interessado
     * @param {string} data.email - Email do interessado
     * @param {string} data.telefone - Telefone do interessado
     * @param {string} data.cpf - CPF do interessado
     * @returns {Promise<Interessado>} Dados do interessado criado
     * @throws {Error} Erro ao criar interessado
     */
    static async create(data) {
        try {
            const { nome, cpf, email, telefone } = data;
            const [result] = await db.query(
                'INSERT INTO interessados (nome, cpf, email, telefone) VALUES (?, ?, ?, ?)',
                [nome, cpf, email, telefone]
            );
            return this.findById(result.insertId);
        } catch (error) {
            console.error('Erro ao criar interessado:', error);
            throw new Error('Erro ao criar interessado');
        }
    }

    /**
     * Atualiza os dados de um interessado
     * @async
     * @static
     * @param {number} id - ID do interessado
     * @param {Object} data - Dados atualizados do interessado
     * @param {string} data.nome - Nome do interessado
     * @param {string} data.email - Email do interessado
     * @param {string} data.telefone - Telefone do interessado
     * @param {string} data.cpf - CPF do interessado
     * @returns {Promise<Interessado|null>} Dados do interessado atualizado ou null se não encontrado
     * @throws {Error} Erro ao atualizar interessado
     */
    static async update(id, data) {
        try {
            const { nome, cpf, email, telefone } = data;
            const [result] = await db.query(
                'UPDATE interessados SET nome = ?, cpf = ?, email = ?, telefone = ? WHERE id = ?',
                [nome, cpf, email, telefone, id]
            );
            
            if (result.affectedRows === 0) {
                return null;
            }
            
            return this.findById(id);
        } catch (error) {
            console.error('Erro ao atualizar interessado:', error);
            throw new Error('Erro ao atualizar interessado');
        }
    }

    /**
     * Remove um interessado
     * @async
     * @static
     * @param {number} id - ID do interessado
     * @returns {Promise<boolean>} true se removido com sucesso, false caso contrário
     * @throws {Error} Erro ao remover interessado
     */
    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM interessados WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao remover interessado:', error);
            throw new Error('Erro ao remover interessado');
        }
    }
}

module.exports = Interessado; 