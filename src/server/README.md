# Backend - Sistema de Gerenciamento de Filhotes

Documentação do backend do sistema de gerenciamento de filhotes.

## 📁 Estrutura do Backend

```
server/
├── config/           # Configurações
│   ├── database.js  # Configuração do banco de dados
│   ├── env.js       # Variáveis de ambiente
│   └── server.js    # Configuração do servidor
│
├── controllers/      # Controladores
│   ├── FilhoteController.js
│   └── InteressadoController.js
│
├── models/          # Modelos
│   ├── Filhote.js
│   └── Interessado.js
│
├── routes/          # Rotas da API
│   ├── filhotes.js
│   └── interessados.js
│
├── database/        # Configuração do banco
│   └── schema.sql   # Script de criação do banco
│
└── index.js         # Ponto de entrada
```

## 🛠️ Configuração

### Banco de Dados

1. Crie um banco de dados MySQL
2. Configure as variáveis de ambiente em .env:
```
# Configurações do Servidor
PORT=3000

# Configurações do Banco de Dados MySQL
DB_USER=root
DB_HOST=localhost
DB_NAME=pet_shop
DB_PASSWORD=sua_senha_aqui
DB_PORT=3306

# Configurações de Ambiente
NODE_ENV=development

# Configurações de CORS
CORS_ORIGIN=* 
```

3. Execute o script de criação do banco:
```bash
# deverá ter uma senha
mysql -u seu_usuario -p nome_do_banco < src/server/database/schema.sql
```

### Servidor

O servidor é configurado em `config/server.js` e inclui:
- Middleware para CORS
- Parsing de JSON
- Serviço de arquivos estáticos
- Rotas da API
- Tratamento de erros

## 📚 API Endpoints

### Filhotes

- `GET /api/filhotes` - Lista todos os filhotes
- `GET /api/filhotes/:id` - Busca um filhote específico
- `POST /api/filhotes` - Cria um novo filhote
- `PUT /api/filhotes/:id` - Atualiza um filhote
- `DELETE /api/filhotes/:id` - Remove um filhote

### Interessados

- `GET /api/interessados` - Lista todos os interessados
- `GET /api/interessados/:id` - Busca um interessado específico
- `POST /api/interessados` - Cria um novo interessado
- `PUT /api/interessados/:id` - Atualiza um interessado
- `DELETE /api/interessados/:id` - Remove um interessado

## 🔍 Documentação do Código

O código está documentado usando JSDoc. Para gerar a documentação:

```bash
npm install --save-dev jsdoc
npx jsdoc src/server -r -d docs
```

## 🚀 Executando o Servidor

```bash
node src/server/index.js
# ou npm start
```

O servidor estará disponível em `http://localhost:3000`. 