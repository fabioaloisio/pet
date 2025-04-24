/**
 * Módulo de manipulação da página de interessados
 * @module InteressadosPage
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const form = document.getElementById('interessadoForm');
    const table = document.getElementById('interessadosTable');
    const deleteModal = document.getElementById('deleteModal');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const cancelDeleteBtn = document.getElementById('cancelDelete');

    // Variáveis de estado
    let interessadoEmEdicao = null;

    /**
     * Carrega a lista de interessados na tabela
     */
    async function carregarInteressados() {
        try {
            const interessados = await InteressadoService.listarTodos();
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = '';

            interessados.forEach(interessado => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${interessado.cpf}</td>
                    <td>${interessado.nome}</td>
                    <td>${interessado.telefone}</td>
                    <td>${interessado.email}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editarInteressado('${interessado.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="confirmarExclusao('${interessado.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            alert('Erro ao carregar interessados: ' + error.message);
        }
    }

    /**
     * Limpa o formulário
     */
    function limparFormulario() {
        form.reset();
        interessadoEmEdicao = null;
        document.getElementById('submitBtn').textContent = 'Cadastrar';
    }

    /**
     * Preenche o formulário com os dados do interessado
     * @param {Object} interessado - Dados do interessado
     */
    function preencherFormulario(interessado) {
        document.getElementById('cpf').value = interessado.cpf;
        document.getElementById('nome').value = interessado.nome;
        document.getElementById('telefone').value = interessado.telefone;
        document.getElementById('email').value = interessado.email;
        document.getElementById('submitBtn').textContent = 'Atualizar';
    }

    /**
     * Manipula o envio do formulário
     * @param {Event} event - Evento de submit do formulário
     */
    async function handleSubmit(event) {
        event.preventDefault();

        const interessado = {
            cpf: document.getElementById('cpf').value,
            nome: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value
        };

        try {
            if (interessadoEmEdicao) {
                await InteressadoService.atualizar(interessadoEmEdicao, interessado);
                alert('Interessado atualizado com sucesso!');
            } else {
                await InteressadoService.criar(interessado);
                alert('Interessado cadastrado com sucesso!');
            }

            limparFormulario();
            carregarInteressados();
        } catch (error) {
            alert('Erro ao salvar interessado: ' + error.message);
        }
    }

    /**
     * Inicia a edição de um interessado
     * @param {string} id - ID do interessado a ser editado
     */
    window.editarInteressado = async function(id) {
        try {
            const interessado = await InteressadoService.buscarPorId(id);
            interessadoEmEdicao = id;
            preencherFormulario(interessado);
        } catch (error) {
            alert('Erro ao carregar dados do interessado: ' + error.message);
        }
    };

    /**
     * Inicia o processo de exclusão de um interessado
     * @param {string} id - ID do interessado a ser excluído
     */
    window.confirmarExclusao = function(id) {
        interessadoEmEdicao = id;
        deleteModal.style.display = 'block';
    };

    // Event Listeners
    form.addEventListener('submit', handleSubmit);

    confirmDeleteBtn.addEventListener('click', async () => {
        try {
            await InteressadoService.remover(interessadoEmEdicao);
            alert('Interessado removido com sucesso!');
            deleteModal.style.display = 'none';
            carregarInteressados();
        } catch (error) {
            alert('Erro ao remover interessado: ' + error.message);
        }
    });

    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none';
        interessadoEmEdicao = null;
    });

    // Carrega a lista inicial de interessados
    carregarInteressados();
}); 