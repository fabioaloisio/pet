/**
 * @fileoverview Controlador para gerenciamento de filhotes
 * @module controllers/FilhoteController
 */

const Filhote = require('../models/Filhote');

/**
 * Classe que representa o controlador de filhotes
 * @class
 */
class FilhoteController {
    /**
     * Lista todos os filhotes
     * @async
     * @param {Object} req - Objeto de requisição Express
     * @param {Object} res - Objeto de resposta Express
     * @param {Function} next - Função next do Express
     * @returns {Promise<void>}
     */
    static async listarTodos(req, res, next) {
        try {
            const filhotes = await Filhote.findAll();
            res.json(filhotes);
        } catch (error) {
            console.error('Erro ao listar filhotes:', error);
            next(error);
        }
    }

    /**
     * Busca um filhote pelo ID
     * @async
     * @param {Object} req - Objeto de requisição Express
     * @param {Object} res - Objeto de resposta Express
     * @param {Function} next - Função next do Express
     * @returns {Promise<void>}
     */
    static async buscarPorId(req, res, next) {
        try {
            const { id } = req.params;
            console.log('Buscando filhote com ID:', id);
            
            const filhote = await Filhote.findById(id);
            console.log('Filhote encontrado:', filhote);
            
            if (!filhote) {
                console.log('Filhote não encontrado');
                return res.status(404).json({ 
                    error: 'Filhote não encontrado',
                    message: 'O filhote solicitado não existe no sistema'
                });
            }
            
            res.json(filhote);
        } catch (error) {
            console.error('Erro ao buscar filhote:', error);
            next(error);
        }
    }

    /**
     * Cria um novo filhote
     * @async
     * @param {Object} req - Objeto de requisição Express
     * @param {Object} res - Objeto de resposta Express
     * @param {Function} next - Função next do Express
     * @returns {Promise<void>}
     */
    static async criar(req, res, next) {
        try {
            const { especie, raca } = req.body;
            
            // Validação apenas dos campos essenciais
            if (!especie || !raca) {
                return res.status(400).json({ error: 'Espécie e raça são obrigatórios' });
            }
            
            // Criar filhote apenas com os campos obrigatórios
            const filhote = await Filhote.create({
                especie,
                raca
            });
            
            res.status(201).json(filhote);
        } catch (error) {
            console.error('Erro ao criar filhote:', error);
            next(error);
        }
    }

    /**
     * Atualiza um filhote existente
     * @async
     * @param {Object} req - Objeto de requisição Express
     * @param {Object} res - Objeto de resposta Express
     * @param {Function} next - Função next do Express
     * @returns {Promise<void>}
     */
    static async atualizar(req, res, next) {
        try {
            const { id } = req.params;
            const { especie, raca } = req.body;
            
            // Validação apenas dos campos essenciais
            if (!especie || !raca) {
                return res.status(400).json({ error: 'Espécie e raça são obrigatórios' });
            }
            
            // Verificar se o filhote existe
            const filhoteExistente = await Filhote.findById(id);
            if (!filhoteExistente) {
                return res.status(404).json({ error: 'Filhote não encontrado' });
            }
            
            // Atualizar filhote apenas com os campos obrigatórios
            const filhote = await Filhote.update(id, {
                especie,
                raca
            });
            
            res.json(filhote);
        } catch (error) {
            console.error('Erro ao atualizar filhote:', error);
            next(error);
        }
    }

    /**
     * Remove um filhote
     * @async
     * @param {Object} req - Objeto de requisição Express
     * @param {Object} res - Objeto de resposta Express
     * @param {Function} next - Função next do Express
     * @returns {Promise<void>}
     */
    static async remover(req, res, next) {
        try {
            const { id } = req.params;
            const removido = await Filhote.delete(id);
            
            if (!removido) {
                return res.status(404).json({ error: 'Filhote não encontrado' });
            }
            
            res.status(204).send();
        } catch (error) {
            console.error('Erro ao remover filhote:', error);
            next(error);
        }
    }
}

module.exports = FilhoteController; 