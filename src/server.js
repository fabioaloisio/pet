/**
 * @file server.js
 * @description Arquivo principal da aplicação
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const interessadosRoutes = require('./routes/interessados');
const filhotesRoutes = require('./routes/filhotes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/interessados', interessadosRoutes);
app.use('/filhotes', filhotesRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.json({ message: 'API de Fila de Espera para Filhotes' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 