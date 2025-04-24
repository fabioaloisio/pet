/**
 * Serviços para gerenciamento de filhotes
 */
const FilhoteService = {
    /**
     * Lista todos os filhotes
     * @returns {Promise} Lista de filhotes
     */
    async listarTodos() {
        return await api.get('/filhotes');
    },

    /**
     * Busca um filhote pelo ID
     * @param {number} id - ID do filhote
     * @returns {Promise} Dados do filhote
     */
    async buscarPorId(id) {
        return await api.get(`/filhotes/${id}`);
    },

    /**
     * Cria um novo filhote
     * @param {Object} filhote - Dados do filhote
     * @returns {Promise} Filhote criado
     */
    async criar(filhote) {
        return await api.post('/filhotes', filhote);
    },

    /**
     * Atualiza um filhote
     * @param {number} id - ID do filhote
     * @param {Object} filhote - Novos dados do filhote
     * @returns {Promise} Filhote atualizado
     */
    async atualizar(id, filhote) {
        return await api.put(`/filhotes/${id}`, filhote);
    },

    /**
     * Remove um filhote
     * @param {number} id - ID do filhote
     * @returns {Promise} Resultado da operação
     */
    async remover(id) {
        return await api.delete(`/filhotes/${id}`);
    }
}; 