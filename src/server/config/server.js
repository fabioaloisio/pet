/**
 * @fileoverview Configuração do servidor Express
 * @module config/server
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const env = require('./env');
const { closePool } = require('./database');

// Importar rotas
const filhotesRoutes = require('../routes/filhotes');
const interessadosRoutes = require('../routes/interessados');

/**
 * Configuração do servidor Express
 * @type {Object}
 */
const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Middleware para parsing de dados de formulário
app.use(express.urlencoded({ extended: true }));

// Configuração do CORS
app.use(cors());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../../public')));

// Rotas da API
app.use('/api/filhotes', filhotesRoutes);
app.use('/api/interessados', interessadosRoutes);

// Rotas para páginas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.get('/pages/filhotes.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/filhotes.html'));
});

app.get('/pages/interessados.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/interessados.html'));
});

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Tratamento de erros globais
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

/**
 * Inicia o servidor
 * @returns {void}
 */
const startServer = () => {
  const server = app.listen(env.port, () => {
    console.log(`Servidor rodando na porta ${env.port}`);
    console.log(`Ambiente: ${env.nodeEnv}`);
  });

  // Tratamento de encerramento gracioso
  process.on('SIGTERM', () => {
    console.log('Recebido sinal SIGTERM. Encerrando servidor...');
    server.close(() => {
      closePool();
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('Recebido sinal SIGINT. Encerrando servidor...');
    server.close(() => {
      closePool();
      process.exit(0);
    });
  });
};

module.exports = {
  app,
  startServer
}; 