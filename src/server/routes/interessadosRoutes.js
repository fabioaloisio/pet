/**
 * @fileoverview Rotas para gerenciamento de interessados
 * @author Seu Nome
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { validarCPF, validarEmail, validarTelefone } = require('../utils/validators');

/**
 * @route GET /api/interessados
 * @description Lista todos os interessados
 * @access Public
 */
router.get('/', async (req, res) => {
    try {
        const interessados = await query('SELECT * FROM interessados ORDER BY nome');
        res.json(interessados);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar interessados' });
    }
});

/**
 * @route GET /api/interessados/:id
 * @description Busca um interessado específico
 * @access Public
 */
router.get('/:id', async (req, res) => {
    try {
        const [interessado] = await query('SELECT * FROM interessados WHERE id = ?', [req.params.id]);
        if (!interessado) {
            return res.status(404).json({ error: 'Interessado não encontrado' });
        }
        res.json(interessado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar interessado' });
    }
});

/**
 * @route POST /api/interessados
 * @description Cria um novo interessado
 * @access Public
 */
router.post('/', async (req, res) => {
    const { nome, cpf, email, telefone, observacoes } = req.body;

    // Validações
    if (!nome || !cpf || !email || !telefone) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    if (!validarCPF(cpf)) {
        return res.status(400).json({ error: 'CPF inválido' });
    }

    if (!validarEmail(email)) {
        return res.status(400).json({ error: 'Email inválido' });
    }

    if (!validarTelefone(telefone)) {
        return res.status(400).json({ error: 'Telefone inválido' });
    }

    try {
        const result = await query(
            'INSERT INTO interessados (nome, cpf, email, telefone, observacoes) VALUES (?, ?, ?, ?, ?)',
            [nome, cpf, email, telefone, observacoes]
        );
        res.status(201).json({ id: result.insertId, message: 'Interessado criado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar interessado' });
    }
});

/**
 * @route PUT /api/interessados/:id
 * @description Atualiza um interessado existente
 * @access Public
 */
router.put('/:id', async (req, res) => {
    const { nome, cpf, email, telefone, observacoes } = req.body;

    // Validações
    if (!nome || !cpf || !email || !telefone) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    if (!validarCPF(cpf)) {
        return res.status(400).json({ error: 'CPF inválido' });
    }

    if (!validarEmail(email)) {
        return res.status(400).json({ error: 'Email inválido' });
    }

    if (!validarTelefone(telefone)) {
        return res.status(400).json({ error: 'Telefone inválido' });
    }

    try {
        const result = await query(
            'UPDATE interessados SET nome = ?, cpf = ?, email = ?, telefone = ?, observacoes = ? WHERE id = ?',
            [nome, cpf, email, telefone, observacoes, req.params.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Interessado não encontrado' });
        }
        
        res.json({ message: 'Interessado atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar interessado' });
    }
});

/**
 * @route DELETE /api/interessados/:id
 * @description Remove um interessado
 * @access Public
 */
router.delete('/:id', async (req, res) => {
    try {
        const result = await query('DELETE FROM interessados WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Interessado não encontrado' });
        }
        
        res.json({ message: 'Interessado removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover interessado' });
    }
});

module.exports = router; 