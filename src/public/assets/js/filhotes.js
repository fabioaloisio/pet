/**
 * @fileoverview Script para gerenciamento de filhotes
 * @module public/assets/js/filhotes
 */

// Elementos do DOM
let filhotesTable;
let filhoteForm;
let filhoteModal;

document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000/filhotes';
    const modal = new bootstrap.Modal(document.getElementById('filhoteModal'));
    const form = document.getElementById('filhoteForm');
    const salvarBtn = document.getElementById('salvarFilhote');

    if (!form || !salvarBtn) {
        console.error('Elementos do formulário não encontrados');
        return;
    }

    // Carregar filhotes ao iniciar
    carregarFilhotes();

    // Event listener para salvar filhote
    salvarBtn.addEventListener('click', salvarFilhote);

    // Event listener para limpar formulário quando o modal é fechado
    document.getElementById('filhoteModal').addEventListener('hidden.bs.modal', limparFormulario);

    /**
     * Carrega a lista de filhotes
     */
    async function carregarFilhotes() {
        try {
            const table = document.getElementById('filhotesTable');
            const tbody = table.getElementsByTagName('tbody')[0];

            // Adiciona indicador de carregamento
            tbody.innerHTML = `
                <tr>
                    <td colspan="3" class="text-center">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Carregando...</span>
                        </div>
                        <p class="mt-2">Carregando filhotes...</p>
                    </td>
                </tr>
            `;

            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`Erro ao carregar filhotes: ${response.status}`);
            }
            
            const filhotes = await response.json();

            if (!filhotes || filhotes.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="3" class="text-center">
                            <div class="alert alert-info">
                                <i class="bi bi-info-circle"></i>
                                Nenhum filhote cadastrado
                            </div>
                        </td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = '';
            filhotes.forEach(filhote => {
                if (!filhote) return;

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${filhote.especie || '-'}</td>
                    <td>${filhote.raca || '-'}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button class="btn btn-sm btn-primary" data-id="${filhote.id}" onclick="window.editarFilhote(${filhote.id})">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button class="btn btn-sm btn-danger" data-id="${filhote.id}" onclick="window.removerFilhote(${filhote.id})">
                                <i class="bi bi-trash"></i> Remover
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Erro ao carregar filhotes:', error);
            const tbody = document.getElementById('filhotesTable')?.getElementsByTagName('tbody')[0];
            if (tbody) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="3" class="text-center">
                            <div class="alert alert-danger">
                                <i class="bi bi-exclamation-triangle"></i>
                                Erro ao carregar filhotes. Tente novamente mais tarde.
                            </div>
                        </td>
                    </tr>
                `;
            }
            showAlert('Erro ao carregar filhotes. Verifique se o servidor está rodando.', 'danger');
        }
    }

    /**
     * Edita um filhote existente
     * @param {number} id - ID do filhote
     */
    window.editarFilhote = async function(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error(`Erro ao carregar filhote: ${response.status}`);
            }
            const filhote = await response.json();
            
            document.getElementById('filhoteId').value = filhote.id;
            document.getElementById('especie').value = filhote.especie || '';
            document.getElementById('raca').value = filhote.raca || '';
            
            document.getElementById('modalTitle').textContent = 'Editar Filhote';
            modal.show();
        } catch (error) {
            console.error('Erro ao carregar dados do filhote:', error);
            showAlert('Erro ao carregar dados do filhote. Verifique se o servidor está rodando.', 'danger');
        }
    };

    /**
     * Remove um filhote
     * @param {number} id - ID do filhote
     */
    window.removerFilhote = async function(id) {
        if (!confirm('Tem certeza que deseja remover este filhote?')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Erro ao remover filhote: ${response.status}`);
            }

            await carregarFilhotes();
            showAlert('Filhote removido com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao remover filhote:', error);
            showAlert('Erro ao remover filhote. Tente novamente.', 'danger');
        }
    };

    /**
     * Salva um filhote (criar ou atualizar)
     */
    async function salvarFilhote() {
        const id = document.getElementById('filhoteId').value;
        const especie = document.getElementById('especie').value.trim();
        const raca = document.getElementById('raca').value.trim();

        if (!especie || !raca) {
            showAlert('Por favor, preencha todos os campos obrigatórios.', 'warning');
            return;
        }

        const filhote = {
            especie,
            raca
        };

        try {
            const url = id ? `${API_URL}/${id}` : API_URL;
            const method = id ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filhote)
            });

            if (!response.ok) {
                throw new Error(`Erro ao salvar filhote: ${response.status}`);
            }

            const modal = bootstrap.Modal.getInstance(document.getElementById('filhoteModal'));
            modal.hide();
            
            limparFormulario();
            await carregarFilhotes();
            
            showAlert(id ? 'Filhote atualizado com sucesso!' : 'Filhote cadastrado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro:', error);
            showAlert('Erro ao salvar filhote. Tente novamente.', 'danger');
        }
    }

    /**
     * Limpa o formulário de filhote
     */
    function limparFormulario() {
        document.getElementById('filhoteId').value = '';
        document.getElementById('especie').value = '';
        document.getElementById('raca').value = '';
        document.getElementById('modalTitle').textContent = 'Novo Filhote';
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
});

/**
 * Carrega a lista de interessados para o select
 * @async
 */
async function carregarInteressados() {
    try {
        const response = await fetch('/api/interessados');
        const interessados = await response.json();
        
        const select = document.getElementById('interessadoId');
        if (select) {
            select.innerHTML = '<option value="">Selecione um interessado</option>';
            
            interessados.forEach(interessado => {
                const option = document.createElement('option');
                option.value = interessado.id;
                option.textContent = `${interessado.nome} (${interessado.cpf})`;
                select.appendChild(option);
            });
        } else {
            console.log('Elemento select não encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar interessados:', error);
    }
}

/**
 * Format the date
 * @param {string} date - Date in ISO format
 * @returns {string} - Formatted date
 */
function formatarData(date) {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR');
} 