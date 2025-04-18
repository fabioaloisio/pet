# Sistema de Fila de Espera para Filhotes

Este é um sistema de cadastro de fila de espera para filhotes em pet shop, desenvolvido com Node.js, Express e MySQL.

## Requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 5.7 ou superior)
- NPM ou Yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Execute
```bash
cp env.example .env
```

Com isso, você criará um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=pet_shop
PORT=3000
```

4. Execute o script SQL para criar o banco de dados e as tabelas:
```bash
mysql -u seu_usuario -p < src/database/schema.sql
```

5. Inicie o servidor:
```bash
npm start
```

Para desenvolvimento, use:
```bash
npm run dev
```

## Endpoints da API

### Interessados

- `GET /interessados` - Lista todos os interessados
- `GET /interessados/:id` - Busca um interessado pelo ID
- `POST /interessados` - Cria um novo interessado
- `PUT /interessados/:id` - Atualiza um interessado
- `DELETE /interessados/:id` - Remove um interessado

### Filhotes

- `GET /filhotes` - Lista todos os filhotes
- `GET /filhotes/:id` - Busca um filhote pelo ID
- `POST /filhotes` - Cria um novo filhote
- `PUT /filhotes/:id` - Atualiza um filhote
- `DELETE /filhotes/:id` - Remove um filhote

## Estrutura do Projeto

```
src/
  ├── config/
  │   └── database.js
  ├── controllers/
  │   ├── InteressadoController.js
  │   └── FilhoteController.js
  ├── models/
  │   ├── Interessado.js
  │   └── Filhote.js
  ├── routes/
  │   ├── interessados.js
  │   └── filhotes.js
  ├── database/
  │   └── schema.sql
  └── server.js
```

## Exemplos de Uso

### Criar um novo interessado
```bash
curl -X POST http://localhost:3000/interessados \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "123.456.789-00",
    "nome": "João Silva",
    "telefone": "(11) 99999-9999",
    "email": "joao@email.com"
  }'
```

### Criar um novo filhote
```bash
curl -X POST http://localhost:3000/filhotes \
  -H "Content-Type: application/json" \
  -d '{
    "especie": "Cachorro",
    "raca": "Labrador"
  }'
``` 