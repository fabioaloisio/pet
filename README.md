# Sistema de Gerenciamento de Filhotes

Sistema web para gerenciamento de filhotes e interessados em adoção.

## 🚀 Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express.js
  - MySQL
  - JSDoc para documentação

- **Frontend**:
  - HTML5
  - CSS3 (Bootstrap 5)
  - JavaScript (ES6+)
  - Bootstrap Icons

## 📁 Estrutura do Projeto

```
pet/
├── src/
│   ├── public/              # Frontend
│   │   ├── assets/         # Recursos estáticos
│   │   │   ├── css/       # Estilos CSS
│   │   │   └── js/        # Scripts JavaScript
│   │   ├── pages/         # Páginas HTML
│   │   └── index.html     # Página inicial
│   │
│   └── server/            # Backend
│       ├── config/        # Configurações
│       ├── controllers/   # Controladores
│       ├── models/        # Modelos
│       ├── routes/        # Rotas
│       ├── database/      # Configuração do banco
│       └── index.js       # Ponto de entrada
│
├── package.json
└── README.md
```

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/fabioaloisio/pet.git
cd pet
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
- Crie um banco de dados MySQL
- Configure as variáveis de ambiente em .env
```bash
cp .env.example .env
```

4. Inicie o servidor:
```bash
node src/server/index.js 
# ou npm start
```

5. Acesse a aplicação:
- Frontend: http://localhost:3000
- API: http://localhost:3000/api

## 📚 Documentação

- [Documentação do Backend](src/server/README.md)
- [Documentação do Frontend](src/public/README.md)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 