/**
 * @fileoverview Controlador para gerenciamento de interessados
 * @module controllers/InteressadoController
 */

const Interessado = require('../models/Interessado');

/**
 * Classe que representa o controlador de interessados
 * @class
 */
class InteressadoController {
    /**
     * Lista todos os interessados
     * @async
     * @param {Object} req - Objeto de requisição Express
     * @param {Object} res - Objeto de resposta Express
     * @param {Function} next - Função next do Express
     * @returns {Promise<void>}
     */
    static async listarTodos(req, res, next) {
        try {
            const interessados = await Interessado.findAll();
            res.json(interessados);
        } catch (error) {
            console.error('Erro ao listar interessados:', error);
            next(error);
        }
    }

    /**
     * Busca um interessado pelo ID
     * @async
     * @param {Object} req - Objeto de requisição Express
     * @param {Object} res - Objeto de resposta Express
     * @param {Function} next - Função next do Express
     * @returns {Promise<void>}
     */
    static async buscarPorId(req, res, next) {
        try {
            const { id } = req.params;
            const interessado = await Interessado.findById(id);
            
            if (!interessado) {
                return res.status(404).json({ error: 'Interessado não encontrado' });
            }
            
            res.json(interessado);
        } catch (error) {
            console.error('Erro ao buscar interessado:', error);
            next(error);
        }
    }

    /**
     * Cria um novo interessado
     * @async
     * @param {Object} req - Objeto de requisição Express
     * @param {Object} res - Objeto de resposta Express
     * @param {Function} next - Função next do Express
     * @returns {Promise<void>}
     */
    static async criar(req, res, next) {
        try {
            const { nome, cpf, email, telefone } = req.body;
            
            if (!nome || !cpf || !email || !telefone) {
                return res.status(400).json({ error: 'Nome, CPF, email e telefone são obrigatórios' });
            }
            
            const interessado = await Interessado.create({ nome, cpf, email, telefone });
            res.status(201).json(interessado);
        } catch (error) {
            console.error('Erro ao criar interessado:', error);
            next(error);
        }
    }

    /**
     * Atualiza um interessado existente
     * @async
     * @param {Object} req - Objeto de requisição Express
     * @param {Object} res - Objeto de resposta Express
     * @param {Function} next - Função next do Express
     * @returns {Promise<void>}
     */
    static async atualizar(req, res, next) {
        try {
            const { id } = req.params;
            const { nome, cpf, email, telefone } = req.body;
            
            if (!nome || !cpf || !email || !telefone) {
                return res.status(400).json({ error: 'Nome, CPF, email e telefone são obrigatórios' });
            }
            
            const interessado = await Interessado.update(id, { nome, cpf, email, telefone });
            
            if (!interessado) {
                return res.status(404).json({ error: 'Interessado não encontrado' });
            }
            
            res.json(interessado);
        } catch (error) {
            console.error('Erro ao atualizar interessado:', error);
            next(error);
        }
    }

    /**
     * Remove um interessado
     * @async
     * @param {Object} req - Objeto de requisição Express
     * @param {Object} res - Objeto de resposta Express
     * @param {Function} next - Função next do Express
     * @returns {Promise<void>}
     */
    static async remover(req, res, next) {
        try {
            const { id } = req.params;
            const removido = await Interessado.delete(id);
            
            if (!removido) {
                return res.status(404).json({ error: 'Interessado não encontrado' });
            }
            
            res.status(204).json({ mensagem: 'Interessado removido com sucesso' });
        } catch (error) {
            console.error('Erro ao remover interessado:', error);
            next(error);
        }
    }
}

module.exports = InteressadoController; 