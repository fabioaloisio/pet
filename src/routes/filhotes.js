/**
 * @file filhotes.js
 * @description Rotas para a entidade Filhote
 */

const express = require('express');
const router = express.Router();
const FilhoteController = require('../controllers/FilhoteController');

// Rota para criar um novo filhote
router.post('/', FilhoteController.create);

// Rota para listar todos os filhotes
router.get('/', FilhoteController.findAll);

// Rota para buscar um filhote pelo ID
router.get('/:id', FilhoteController.findById);

// Rota para atualizar um filhote
router.put('/:id', FilhoteController.update);

// Rota para remover um filhote
router.delete('/:id', FilhoteController.delete);

module.exports = router; 