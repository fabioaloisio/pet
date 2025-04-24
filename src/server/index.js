/**
 * @fileoverview Arquivo principal do servidor
 * @module server/index
 */

require('dotenv').config();
const { startServer } = require('./config/server');

// Inicia o servidor
startServer(); 