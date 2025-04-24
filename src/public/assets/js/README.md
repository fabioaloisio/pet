# Documentação do JavaScript

Este arquivo contém a documentação das funções JavaScript utilizadas no sistema de gerenciamento de interessados.

## Funções de Validação

### `validarCPF(cpf)`
Valida um CPF utilizando o algoritmo oficial de validação.

**Parâmetros:**
- `cpf` (string): CPF a ser validado

**Retorno:**
- `boolean`: `true` se o CPF for válido, `false` caso contrário

**Exemplo:**
```javascript
const cpfValido = validarCPF('123.456.789-00');
```

### `validarEmail(email)`
Valida um endereço de email utilizando expressão regular.

**Parâmetros:**
- `email` (string): Email a ser validado

**Retorno:**
- `boolean`: `true` se o email for válido, `false` caso contrário

**Exemplo:**
```javascript
const emailValido = validarEmail('usuario@dominio.com');
```

### `validarTelefone(telefone)`
Valida um número de telefone no formato brasileiro.

**Parâmetros:**
- `telefone` (string): Telefone a ser validado

**Retorno:**
- `boolean`: `true` se o telefone for válido, `false` caso contrário

**Exemplo:**
```javascript
const telefoneValido = validarTelefone('(11) 98765-4321');
```

## Funções de Formatação

### `formatarCPF(cpf)`
Formata um CPF no padrão XXX.XXX.XXX-XX.

**Parâmetros:**
- `cpf` (string): CPF a ser formatado

**Retorno:**
- `string`: CPF formatado

**Exemplo:**
```javascript
const cpfFormatado = formatarCPF('12345678900');
// Resultado: '123.456.789-00'
```

### `formatarTelefone(telefone)`
Formata um telefone no padrão (XX) XXXXX-XXXX.

**Parâmetros:**
- `telefone` (string): Telefone a ser formatado

**Retorno:**
- `string`: Telefone formatado

**Exemplo:**
```javascript
const telefoneFormatado = formatarTelefone('11987654321');
// Resultado: '(11) 98765-4321'
```

## Funções de Gerenciamento

### `adicionarInteressado(interessado)`
Adiciona um novo interessado ao armazenamento local.

**Parâmetros:**
- `interessado` (object): Objeto com os dados do interessado
  - `cpf` (string): CPF do interessado
  - `nome` (string): Nome do interessado
  - `telefone` (string): Telefone do interessado
  - `email` (string): Email do interessado

**Exemplo:**
```javascript
adicionarInteressado({
    cpf: '123.456.789-00',
    nome: 'João Silva',
    telefone: '(11) 98765-4321',
    email: 'joao@email.com'
});
```

### `removerInteressado(cpf)`
Remove um interessado do armazenamento local.

**Parâmetros:**
- `cpf` (string): CPF do interessado a ser removido

**Exemplo:**
```javascript
removerInteressado('123.456.789-00');
```

### `atualizarTabela()`
Atualiza a tabela de interessados na interface.

**Exemplo:**
```javascript
atualizarTabela();
```

## Event Listeners

O arquivo JavaScript inclui os seguintes event listeners:

1. **Formatação de CPF durante digitação:**
   - Monitora o campo de CPF e formata automaticamente enquanto o usuário digita

2. **Formatação de telefone durante digitação:**
   - Monitora o campo de telefone e formata automaticamente enquanto o usuário digita

3. **Manipulação do formulário:**
   - Captura o evento de submit do formulário
   - Valida todos os campos
   - Adiciona o novo interessado se todas as validações passarem
   - Limpa o formulário após o cadastro
   - Atualiza a tabela

## Armazenamento Local

O sistema utiliza o `localStorage` do navegador para persistir os dados. A chave utilizada é 'interessados' e o valor é um array de objetos JSON.

**Estrutura dos dados:**
```javascript
[
    {
        cpf: "123.456.789-00",
        nome: "João Silva",
        telefone: "(11) 98765-4321",
        email: "joao@email.com"
    },
    // ... outros interessados
]
```

## Inicialização

O sistema é inicializado quando o DOM é carregado, através do evento `DOMContentLoaded`. Durante a inicialização:

1. Os event listeners são configurados
2. A tabela é populada com os dados existentes no localStorage
3. Os campos de CPF e telefone são configurados para formatação automática 