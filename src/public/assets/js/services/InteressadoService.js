/**
 * @fileoverview Serviço para gerenciamento de interessados
 * @module services/InteressadoService
 */

/**
 * Classe responsável por gerenciar as operações relacionadas aos interessados
 * @class
 */
export class InteressadoService {
    /**
     * URL base para as requisições de interessados
     * @private
     * @type {string}
     */
    static #baseUrl = '/interessados';

    /**
     * Lista todos os interessados cadastrados
     * @async
     * @returns {Promise<Array>} Lista de interessados
     * @throws {Error} Erro ao buscar interessados
     */
    static async listarTodos() {
        try {
            const response = await fetch(this.#baseUrl);
            if (!response.ok) {
                throw new Error('Erro ao buscar interessados');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao listar interessados:', error);
            throw error;
        }
    }

    /**
     * Busca um interessado pelo ID
     * @async
     * @param {number} id - ID do interessado
     * @returns {Promise<Object>} Dados do interessado
     * @throws {Error} Erro ao buscar interessado
     */
    static async buscarPorId(id) {
        try {
            const response = await fetch(`${this.#baseUrl}/${id}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar interessado');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar interessado:', error);
            throw error;
        }
    }

    /**
     * Cria um novo interessado
     * @async
     * @param {Object} interessado - Dados do interessado
     * @returns {Promise<Object>} Dados do interessado criado
     * @throws {Error} Erro ao criar interessado
     */
    static async criar(interessado) {
        try {
            const response = await fetch(this.#baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(interessado)
            });
            if (!response.ok) {
                throw new Error('Erro ao criar interessado');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao criar interessado:', error);
            throw error;
        }
    }

    /**
     * Atualiza um interessado existente
     * @async
     * @param {number} id - ID do interessado
     * @param {Object} interessado - Dados atualizados do interessado
     * @returns {Promise<Object>} Dados do interessado atualizado
     * @throws {Error} Erro ao atualizar interessado
     */
    static async atualizar(id, interessado) {
        try {
            const response = await fetch(`${this.#baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(interessado)
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar interessado');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar interessado:', error);
            throw error;
        }
    }

    /**
     * Remove um interessado
     * @async
     * @param {number} id - ID do interessado
     * @returns {Promise<void>}
     * @throws {Error} Erro ao remover interessado
     */
    static async remover(id) {
        try {
            const response = await fetch(`${this.#baseUrl}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao remover interessado');
            }
        } catch (error) {
            console.error('Erro ao remover interessado:', error);
            throw error;
        }
    }
} 