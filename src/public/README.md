# Frontend - Sistema de Gerenciamento de Filhotes

Documentação do frontend do sistema de gerenciamento de filhotes.

## 📁 Estrutura do Frontend

```
public/
├── assets/           # Recursos estáticos
│   ├── css/         # Estilos CSS
│   │   └── styles.css
│   └── js/          # Scripts JavaScript
│       ├── filhotes.js
│       └── interessados.js
│
├── pages/           # Páginas HTML
│   ├── filhotes.html
│   └── interessados.html
│
└── index.html       # Página inicial
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura das páginas
- **CSS3**: Estilização
  - Bootstrap 5
  - Bootstrap Icons
- **JavaScript**: Funcionalidades
  - ES6+
  - Fetch API
  - DOM Manipulation

## 📚 Páginas

### Página Inicial (`index.html`)
- Menu de navegação
- Links para as páginas de filhotes e interessados
- Visão geral do sistema

### Gerenciamento de Filhotes (`pages/filhotes.html`)
- Lista de filhotes
- Formulário para adicionar/editar filhotes
- Botões de ação (editar, remover)
- Modal para formulários

### Gerenciamento de Interessados (`pages/interessados.html`)
- Lista de interessados
- Formulário para adicionar/editar interessados
- Botões de ação (editar, remover)
- Modal para formulários

## 🎨 Estilos

O sistema utiliza Bootstrap 5 para estilização, com customizações em `assets/css/styles.css`:

- Cores personalizadas
- Layout responsivo
- Componentes customizados
- Animações e transições

## 📱 Responsividade

- Layout adaptativo para diferentes tamanhos de tela
- Menu de navegação responsivo
- Tabelas com scroll horizontal em telas pequenas
- Modais otimizados para mobile

## 🔄 Integração com a API

O frontend se comunica com a API através dos seguintes endpoints:

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

## 🚀 Executando o Frontend

1. Certifique-se que o servidor backend está rodando
2. Acesse a aplicação em `http://localhost:3000`
3. Navegue entre as páginas usando o menu

## 📝 Documentação do Código

O código JavaScript está documentado usando JSDoc. Para gerar a documentação:

```bash
npm install -g jsdoc
jsdoc src/public/assets/js -r -d docs
``` 