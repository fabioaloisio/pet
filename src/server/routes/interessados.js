/**
 * @fileoverview Rotas para gerenciamento de interessados
 * @module routes/interessados
 */

const express = require('express');
const router = express.Router();
const InteressadoController = require('../controllers/InteressadoController');

/**
 * @route GET /interessados
 * @description Lista todos os interessados
 * @access Public
 */
router.get('/', InteressadoController.listarTodos);

/**
 * @route GET /interessados/:id
 * @description Busca um interessado pelo ID
 * @access Public
 */
router.get('/:id', InteressadoController.buscarPorId);

/**
 * @route POST /interessados
 * @description Cria um novo interessado
 * @access Public
 */
router.post('/', InteressadoController.criar);

/**
 * @route PUT /interessados/:id
 * @description Atualiza um interessado existente
 * @access Public
 */
router.put('/:id', InteressadoController.atualizar);

/**
 * @route DELETE /interessados/:id
 * @description Remove um interessado
 * @access Public
 */
router.delete('/:id', InteressadoController.remover);

module.exports = router; 