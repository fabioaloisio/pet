/**
 * @fileoverview Rotas para gerenciamento de filhotes
 * @module routes/filhotes
 */

const express = require('express');
const router = express.Router();
const FilhoteController = require('../controllers/FilhoteController');

/**
 * @route GET /filhotes
 * @description Lista todos os filhotes
 * @access Public
 */
router.get('/', FilhoteController.listarTodos);

/**
 * @route GET /filhotes/:id
 * @description Busca um filhote específico pelo ID
 * @access Public
 */
router.get('/:id', FilhoteController.buscarPorId);

/**
 * @route POST /filhotes
 * @description Cria um novo filhote
 * @access Public
 */
router.post('/', FilhoteController.criar);

/**
 * @route PUT /filhotes/:id
 * @description Atualiza os dados de um filhote existente
 * @access Public
 */
router.put('/:id', FilhoteController.atualizar);

/**
 * @route DELETE /filhotes/:id
 * @description Remove um filhote do sistema
 * @access Public
 */
router.delete('/:id', FilhoteController.remover);

module.exports = router; 