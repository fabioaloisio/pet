/**
 * @fileoverview Script para gerenciamento de interessados
 * @module public/assets/js/interessados
 */

document.addEventListener('DOMContentLoaded', () => {
    const API_URL = '/api/interessados';
    const modal = new bootstrap.Modal(document.getElementById('interessadoModal'));
    const form = document.getElementById('interessadoForm');
    const salvarBtn = document.getElementById('salvarInteressado');

    // Carregar interessados ao iniciar
    carregarInteressados();

    // Event listener para salvar interessado
    salvarBtn.addEventListener('click', salvarInteressado);

    // Event listener para limpar formulário quando o modal é fechado
    document.getElementById('interessadoModal').addEventListener('hidden.bs.modal', limparFormulario);

    /**
     * Carrega a lista de interessados
     */
    async function carregarInteressados() {
        try {
            console.log('Iniciando carregamento de interessados...');
            const tbody = document.getElementById('interessadosTableBody');
            if (!tbody) {
                console.error('Elemento tbody não encontrado');
                return;
            }

            // Adiciona indicador de carregamento
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Carregando...</span>
                        </div>
                        <p class="mt-2">Carregando interessados...</p>
                    </td>
                </tr>
            `;

            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Erro ao carregar interessados: ${response.status}`);
            }

            const interessados = await response.json();
            console.log('Interessados carregados:', interessados);

            if (!interessados || interessados.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center">
                            <div class="alert alert-info">
                                <i class="bi bi-info-circle"></i>
                                Nenhum interessado cadastrado
                            </div>
                        </td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = '';
            interessados.forEach(interessado => {
                if (!interessado) return; // Pula itens nulos

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${interessado.nome || '-'}</td>
                    <td>${formatarCPF(interessado.cpf) || '-'}</td>
                    <td>${interessado.email || '-'}</td>
                    <td>${formatarTelefone(interessado.telefone) || '-'}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button class="btn btn-sm btn-primary" data-id="${interessado.id}" onclick="window.editarInteressado(${interessado.id})">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button class="btn btn-sm btn-danger" data-id="${interessado.id}" onclick="window.removerInteressado(${interessado.id})">
                                <i class="bi bi-trash"></i> Remover
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Erro ao carregar interessados:', error);
            const tbody = document.getElementById('interessadosTableBody');
            if (tbody) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center">
                            <div class="alert alert-danger">
                                <i class="bi bi-exclamation-triangle"></i>
                                Erro ao carregar interessados. Tente novamente mais tarde.
                            </div>
                        </td>
                    </tr>
                `;
            }
            showAlert('Erro ao carregar interessados. Verifique se o servidor está rodando.', 'danger');
        }
    }

    /**
     * Edita um interessado existente
     * @param {number} id - ID do interessado
     */
    window.editarInteressado = async function(id) {
        try {
            console.log('Editando interessado:', id);
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error(`Erro ao carregar interessado: ${response.status}`);
            }
            const interessado = await response.json();
            console.log('Dados do interessado:', interessado);
            
            document.getElementById('interessadoId').value = interessado.id;
            document.getElementById('nome').value = interessado.nome || '';
            document.getElementById('cpf').value = formatarCPF(interessado.cpf) || '';
            document.getElementById('email').value = interessado.email || '';
            document.getElementById('telefone').value = interessado.telefone || '';
            
            document.getElementById('modalTitle').textContent = 'Editar Interessado';
            modal.show();
        } catch (error) {
            console.error('Erro ao carregar dados do interessado:', error);
            showAlert('Erro ao carregar dados do interessado. Verifique se o servidor está rodando.', 'danger');
        }
    };

    /**
     * Remove um interessado
     * @param {number} id - ID do interessado
     */
    window.removerInteressado = async function(id) {
        if (!confirm('Tem certeza que deseja remover este interessado?')) {
            return;
        }

        try {
            console.log('Removendo interessado:', id);
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Erro ao remover interessado: ${response.status}`);
            }

            await carregarInteressados();
            showAlert('Interessado removido com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao remover interessado:', error);
            showAlert('Erro ao remover interessado. Tente novamente.', 'danger');
        }
    };

    /**
     * Salva um interessado (criar ou atualizar)
     */
    async function salvarInteressado() {
        const id = document.getElementById('interessadoId').value;
        const nome = document.getElementById('nome').value.trim();
        const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();

        if (!nome || !cpf || !email || !telefone) {
            showAlert('Por favor, preencha todos os campos obrigatórios.', 'warning');
            return;
        }

        if (!validarCPF(cpf)) {
            showAlert('Por favor, insira um CPF válido.', 'warning');
            return;
        }

        const interessado = {
            nome,
            cpf,
            email,
            telefone
        };

        try {
            const url = id ? `${API_URL}/${id}` : API_URL;
            const method = id ? 'PUT' : 'POST';
            
            console.log(`Enviando requisição ${method} para ${url}`, interessado);
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(interessado)
            });

            if (!response.ok) {
                throw new Error(`Erro ao salvar interessado: ${response.status}`);
            }

            const modal = bootstrap.Modal.getInstance(document.getElementById('interessadoModal'));
            modal.hide();
            
            limparFormulario();
            await carregarInteressados();
            
            showAlert(id ? 'Interessado atualizado com sucesso!' : 'Interessado cadastrado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro:', error);
            showAlert('Erro ao salvar interessado. Tente novamente.', 'danger');
        }
    }

    /**
     * Limpa o formulário de interessado
     */
    function limparFormulario() {
        document.getElementById('interessadoId').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('cpf').value = '';
        document.getElementById('email').value = '';
        document.getElementById('telefone').value = '';
        document.getElementById('modalTitle').textContent = 'Novo Interessado';
    }

    /**
     * Mostra um alerta na tela
     * @param {string} message - Mensagem a ser exibida
     * @param {string} type - Tipo do alerta (success, danger, warning, info)
     */
    function showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }

    /**
     * Função para formatar o CPF no padrão XXX.XXX.XXX-XX
     * @param {string} cpf - CPF a ser formatado
     * @returns {string} CPF formatado
     */
    function formatarCPF(cpf) {
        if (!cpf) return '';
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11) return cpf;
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    /**
     * Função para validar o CPF
     * @param {string} cpf - CPF a ser validado
     * @returns {boolean} true se o CPF for válido, false caso contrário
     */
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        
        if (cpf.length !== 11) return false;
        
        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cpf)) return false;
        
        // Validação do primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digitoVerificador1 = resto > 9 ? 0 : resto;
        
        // Validação do segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digitoVerificador2 = resto > 9 ? 0 : resto;
        
        return digitoVerificador1 === parseInt(cpf.charAt(9)) && 
               digitoVerificador2 === parseInt(cpf.charAt(10));
    }

    // Adiciona evento para formatar CPF enquanto digita
    document.getElementById('cpf').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        e.target.value = formatarCPF(value);
    });

    /**
     * Formata o número de telefone
     * @param {string} telefone - Número de telefone a ser formatado
     * @returns {string} Telefone formatado
     */
    function formatarTelefone(telefone) {
        if (!telefone) return '';
        telefone = telefone.replace(/\D/g, '');
        if (telefone.length === 11) {
            return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        return telefone;
    }
}); 