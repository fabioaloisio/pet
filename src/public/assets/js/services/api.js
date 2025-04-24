/**
 * Configuração base da API
 */
const API_URL = 'http://localhost:3000';

/**
 * Funções utilitárias para requisições HTTP
 */
const api = {
    /**
     * Realiza uma requisição GET
     * @param {string} endpoint - Endpoint da API
     * @returns {Promise} Resposta da API
     */
    async get(endpoint) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`);
            if (!response.ok) throw new Error('Erro na requisição');
            return await response.json();
        } catch (error) {
            console.error('Erro GET:', error);
            throw error;
        }
    },

    /**
     * Realiza uma requisição POST
     * @param {string} endpoint - Endpoint da API
     * @param {Object} data - Dados a serem enviados
     * @returns {Promise} Resposta da API
     */
    async post(endpoint, data) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Erro na requisição');
            return await response.json();
        } catch (error) {
            console.error('Erro POST:', error);
            throw error;
        }
    },

    /**
     * Realiza uma requisição PUT
     * @param {string} endpoint - Endpoint da API
     * @param {Object} data - Dados a serem atualizados
     * @returns {Promise} Resposta da API
     */
    async put(endpoint, data) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Erro na requisição');
            return await response.json();
        } catch (error) {
            console.error('Erro PUT:', error);
            throw error;
        }
    },

    /**
     * Realiza uma requisição DELETE
     * @param {string} endpoint - Endpoint da API
     * @returns {Promise} Resposta da API
     */
    async delete(endpoint) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Erro na requisição');
            return await response.json();
        } catch (error) {
            console.error('Erro DELETE:', error);
            throw error;
        }
    }
}; 