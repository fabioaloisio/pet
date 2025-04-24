/**
 * @fileoverview Funções utilitárias para formatação e validação de dados
 * @module public/assets/js/utils
 */

/**
 * Formata um número de CPF
 * @param {string} cpf - CPF a ser formatado
 * @returns {string} CPF formatado (XXX.XXX.XXX-XX)
 * @example
 * formatarCPF('12345678900') // retorna '123.456.789-00'
 */
function formatarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
    
    // Aplica a máscara
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Formata um número de telefone
 * @param {string} telefone - Telefone a ser formatado
 * @returns {string} Telefone formatado ((XX) XXXXX-XXXX)
 * @example
 * formatarTelefone('11987654321') // retorna '(11) 98765-4321'
 */
function formatarTelefone(telefone) {
    // Remove caracteres não numéricos
    telefone = telefone.replace(/\D/g, '');
    
    // Verifica se é um celular (11 dígitos) ou telefone fixo (10 dígitos)
    if (telefone.length === 11) {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (telefone.length === 10) {
        return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return telefone;
}

/**
 * Remove caracteres não numéricos de uma string
 * @param {string} str - String a ser limpa
 * @returns {string} String contendo apenas números
 * @example
 * limparNumeros('123.456.789-00') // retorna '12345678900'
 */
function limparNumeros(str) {
    return str.replace(/\D/g, '');
}

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

// Exporta as funções
window.utils = {
    formatarCPF,
    formatarTelefone,
    limparNumeros,
    validarCPF,
    validarEmail,
    validarTelefone
}; 