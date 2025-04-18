/**
 * @file InteressadoController.js
 * @description Controller para gerenciar as operações relacionadas aos interessados
 */

const Interessado = require('../models/Interessado');

class InteressadoController {
  /**
   * @description Cria um novo interessado
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  static async create(req, res) {
    try {
      const result = await Interessado.create(req.body);
      res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar interessado' });
    }
  }

  /**
   * @description Lista todos os interessados
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  static async findAll(req, res) {
    try {
      const interessados = await Interessado.findAll();
      res.json(interessados);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar interessados' });
    }
  }

  /**
   * @description Busca um interessado pelo ID
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  static async findById(req, res) {
    try {
      const interessado = await Interessado.findById(req.params.id);
      if (!interessado) {
        return res.status(404).json({ error: 'Interessado não encontrado' });
      }
      res.json(interessado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar interessado' });
    }
  }

  /**
   * @description Atualiza um interessado
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  static async update(req, res) {
    try {
      const result = await Interessado.update(req.params.id, req.body);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Interessado não encontrado' });
      }
      res.json({ id: req.params.id, ...req.body });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar interessado' });
    }
  }

  /**
   * @description Remove um interessado
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  static async delete(req, res) {
    try {
      const result = await Interessado.delete(req.params.id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Interessado não encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover interessado' });
    }
  }
}

module.exports = InteressadoController; 