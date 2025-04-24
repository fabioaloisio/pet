/**
 * @fileoverview Funções de validação para dados de interessados
 * @module utils/validators
 */

/**
 * Remove caracteres não numéricos de uma string
 * @param {string} str - String a ser limpa
 * @returns {string} String contendo apenas números
 */
const limparNumeros = (str) => str.replace(/\D/g, '');

/**
 * Valida um número de CPF
 * @param {string} cpf - CPF a ser validado
 * @returns {boolean} true se o CPF for válido, false caso contrário
 * @example
 * validarCPF('123.456.789-00') // retorna true
 * validarCPF('111.111.111-11') // retorna false
 */
function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = limparNumeros(cpf);

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto > 9 ? 0 : resto;
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto > 9 ? 0 : resto;
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) return false;

    return true;
}

/**
 * Valida um endereço de email
 * @param {string} email - Email a ser validado
 * @returns {boolean} true se o email for válido, false caso contrário
 * @example
 * validarEmail('usuario@dominio.com') // retorna true
 * validarEmail('email.invalido') // retorna false
 */
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

/**
 * Valida um número de telefone
 * @param {string} telefone - Telefone a ser validado
 * @returns {boolean} true se o telefone for válido, false caso contrário
 * @example
 * validarTelefone('(11) 98765-4321') // retorna true
 * validarTelefone('11987654321') // retorna true
 * validarTelefone('123') // retorna false
 */
function validarTelefone(telefone) {
    // Remove caracteres não numéricos
    const numero = limparNumeros(telefone);
    
    // Verifica se tem entre 10 e 11 dígitos (com ou sem DDD)
    return numero.length >= 10 && numero.length <= 11;
}

module.exports = {
    validarCPF,
    validarEmail,
    validarTelefone
}; 