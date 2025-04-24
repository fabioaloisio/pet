/**
 * Serviço para gerenciamento de interessados
 * @module InteressadoService
 */

const InteressadoService = {
    /**
     * URL base da API de interessados
     * @type {string}
     */
    baseUrl: '/api/interessados',

    /**
     * Cria um novo interessado
     * @param {Object} interessado - Dados do interessado a ser criado
     * @param {string} interessado.cpf - CPF do interessado
     * @param {string} interessado.nome - Nome do interessado
     * @param {string} interessado.telefone - Telefone do interessado
     * @param {string} interessado.email - E-mail do interessado
     * @returns {Promise<Object>} - Retorna o interessado criado
     * @throws {Error} - Erro ao criar interessado
     */
    async criar(interessado) {
        try {
            const response = await fetch(this.baseUrl, {
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
            throw new Error('Erro ao criar interessado: ' + error.message);
        }
    },

    /**
     * Atualiza um interessado existente
     * @param {string} id - ID do interessado a ser atualizado
     * @param {Object} interessado - Novos dados do interessado
     * @returns {Promise<Object>} - Retorna o interessado atualizado
     * @throws {Error} - Erro ao atualizar interessado
     */
    async atualizar(id, interessado) {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
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
            throw new Error('Erro ao atualizar interessado: ' + error.message);
        }
    },

    /**
     * Remove um interessado
     * @param {string} id - ID do interessado a ser removido
     * @returns {Promise<void>}
     * @throws {Error} - Erro ao remover interessado
     */
    async remover(id) {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erro ao remover interessado');
            }
        } catch (error) {
            throw new Error('Erro ao remover interessado: ' + error.message);
        }
    },

    /**
     * Busca um interessado pelo ID
     * @param {string} id - ID do interessado a ser buscado
     * @returns {Promise<Object>} - Retorna o interessado encontrado
     * @throws {Error} - Erro ao buscar interessado
     */
    async buscarPorId(id) {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`);

            if (!response.ok) {
                throw new Error('Erro ao buscar interessado');
            }

            return await response.json();
        } catch (error) {
            throw new Error('Erro ao buscar interessado: ' + error.message);
        }
    },

    /**
     * Lista todos os interessados
     * @returns {Promise<Array>} - Retorna a lista de interessados
     * @throws {Error} - Erro ao listar interessados
     */
    async listarTodos() {
        try {
            const response = await fetch(this.baseUrl);

            if (!response.ok) {
                throw new Error('Erro ao listar interessados');
            }

            return await response.json();
        } catch (error) {
            throw new Error('Erro ao listar interessados: ' + error.message);
        }
    }
}; 