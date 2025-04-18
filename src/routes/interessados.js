/**
 * @file interessados.js
 * @description Rotas para a entidade Interessado
 */

const express = require('express');
const router = express.Router();
const InteressadoController = require('../controllers/InteressadoController');

// Rota para criar um novo interessado
router.post('/', InteressadoController.create);

// Rota para listar todos os interessados
router.get('/', InteressadoController.findAll);

// Rota para buscar um interessado pelo ID
router.get('/:id', InteressadoController.findById);

// Rota para atualizar um interessado
router.put('/:id', InteressadoController.update);

// Rota para remover um interessado
router.delete('/:id', InteressadoController.delete);

module.exports = router; 