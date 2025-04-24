-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS pet_shop;
USE pet_shop;

-- Criação da tabela de interessados
CREATE TABLE IF NOT EXISTS interessados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_interessados_nome ON interessados(nome);
CREATE INDEX idx_interessados_email ON interessados(email);

-- Comentários
COMMENT ON TABLE interessados IS 'Tabela que armazena os dados dos interessados em filhotes';
COMMENT ON COLUMN interessados.id IS 'Identificador único do interessado';
COMMENT ON COLUMN interessados.nome IS 'Nome completo do interessado';
COMMENT ON COLUMN interessados.email IS 'Endereço de email do interessado';
COMMENT ON COLUMN interessados.telefone IS 'Número de telefone do interessado';
COMMENT ON COLUMN interessados.data_cadastro IS 'Data e hora do cadastro do interessado';

-- Criação da tabela de filhotes
CREATE TABLE IF NOT EXISTS filhotes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  especie VARCHAR(50) NOT NULL,
  raca VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); 