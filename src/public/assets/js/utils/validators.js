/**
 * Funções de validação
 */
const validators = {
    /**
     * Valida um CPF
     * @param {string} cpf - CPF a ser validado
     * @returns {boolean} true se válido, false caso contrário
     */
    cpf(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');
        
        if (cpf.length !== 11) return false;
        
        // Verifica CPFs com dígitos iguais
        if (/^(\d)\1{10}$/.test(cpf)) return false;
        
        // Validação dos dígitos verificadores
        let soma = 0;
        let resto;
        
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
        }
        
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
        }
        
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        
        return true;
    },

    /**
     * Valida um email
     * @param {string} email - Email a ser validado
     * @returns {boolean} true se válido, false caso contrário
     */
    email(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Valida um telefone
     * @param {string} telefone - Telefone a ser validado
     * @returns {boolean} true se válido, false caso contrário
     */
    telefone(telefone) {
        const re = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        return re.test(telefone);
    },

    /**
     * Valida campos obrigatórios
     * @param {Object} form - Formulário a ser validado
     * @returns {boolean} true se válido, false caso contrário
     */
    required(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        return isValid;
    },

    /**
     * Formata um CPF
     * @param {string} cpf - CPF a ser formatado
     * @returns {string} CPF formatado
     */
    formatCPF(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    },

    /**
     * Formata um telefone
     * @param {string} telefone - Telefone a ser formatado
     * @returns {string} Telefone formatado
     */
    formatTelefone(telefone) {
        return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
}; 