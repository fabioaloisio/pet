/**
 * @file FilhoteController.js
 * @description Controller para gerenciar as operações relacionadas aos filhotes
 */

const Filhote = require('../models/Filhote');

class FilhoteController {
  /**
   * @description Cria um novo filhote
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  static async create(req, res) {
    try {
      const result = await Filhote.create(req.body);
      res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar filhote' });
    }
  }

  /**
   * @description Lista todos os filhotes
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  static async findAll(req, res) {
    try {
      const filhotes = await Filhote.findAll();
      res.json(filhotes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar filhotes' });
    }
  }

  /**
   * @description Busca um filhote pelo ID
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  static async findById(req, res) {
    try {
      const filhote = await Filhote.findById(req.params.id);
      if (!filhote) {
        return res.status(404).json({ error: 'Filhote não encontrado' });
      }
      res.json(filhote);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar filhote' });
    }
  }

  /**
   * @description Atualiza um filhote
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  static async update(req, res) {
    try {
      const result = await Filhote.update(req.params.id, req.body);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Filhote não encontrado' });
      }
      res.json({ id: req.params.id, ...req.body });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar filhote' });
    }
  }

  /**
   * @description Remove um filhote
   * @param {Object} req - Requisição HTTP
   * @param {Object} res - Resposta HTTP
   */
  static async delete(req, res) {
    try {
      const result = await Filhote.delete(req.params.id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Filhote não encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover filhote' });
    }
  }
}

module.exports = FilhoteController; 