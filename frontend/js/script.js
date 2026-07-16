// ======================================================
// SMARTCASH
// Desenvolvido por Lucas de Goes
// ======================================================

// ======================================================
// AUTENTICAÇÃO (Validada logo no início para evitar erros)
// ======================================================
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// ======================================================
// CONFIGURAÇÃO DA API
// ======================================================
const API_URL = "http://localhost:3000";

// ======================================================
// DADOS DA APLICAÇÃO
// ======================================================
let transacoes = [];
let metas = [];
let grafico = null;

// ======================================================
// ELEMENTOS DO DOM
// ======================================================
const categoriaInput = document.getElementById("categoria");
const form = document.getElementById("form-transacao");
const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const tipoInput = document.getElementById("tipo");

// Lista
const listaTransacoes = document.getElementById("lista-transacoes");

// Resumo
const totalReceitas = document.getElementById("total-receitas");
const totalDespesas = document.getElementById("total-despesas");
const saldoTotal = document.getElementById("saldo-total");

// Metas
const nomeMeta = document.getElementById("nome-meta");
const objetivoMeta = document.getElementById("objetivo-meta");
const btnCriarMeta = document.getElementById("btn-criar-meta");
const listaMetas = document.getElementById("lista-metas");

// Limpar / Logout
const btnLimpar = document.getElementById("btn-limpar");
const btnLogout = document.getElementById("btn-logout");
const nomeUsuario = document.getElementById("nome-usuario");

// ======================================================
// DADOS DO USUÁRIO (JWT)
// ======================================================
function obterPayloadJWT(token) {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    } catch (erro) {
        console.error("Erro ao decodificar token:", erro);
        return null;
    }
}

const usuario = obterPayloadJWT(token);

if (nomeUsuario && usuario && usuario.nome) {
    nomeUsuario.textContent = `Olá, ${usuario.nome}`;
}

// ======================================================
// LOGOUT
// ======================================================
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
window.logout = logout;

if (btnLogout) {
    btnLogout.addEventListener("click", logout);
}

// ======================================================
// REQUISIÇÕES BASE
// ======================================================
async function requisicao(url, opcoes = {}) {
    opcoes.headers = {
        ...(opcoes.headers || {}),
        Authorization: `Bearer ${token}`
    };

    const resposta = await fetch(url, opcoes);

    if (resposta.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
    }

    return resposta;
}

// ======================================================
// chamadas da API
// ======================================================
async function buscarTransacoes() {
    try {
        const resposta = await requisicao(`${API_URL}/transacoes`);
        if (!resposta) return;
        
        transacoes = await resposta.json();
        renderizarTransacoes();
        atualizarResumo();
    } catch (erro) {
        console.error("Erro ao buscar transações:", erro);
    }
}

async function adicionarTransacaoAPI(transacao) {
    try {
        await requisicao(`${API_URL}/transacoes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transacao)
        });
    } catch (erro) {
        console.error("Erro ao adicionar transação:", erro);
    }
}

async function excluirTransacaoAPI(id) {
    try {
        await requisicao(`${API_URL}/transacoes/${id}`, {
            method: "DELETE"
        });
    } catch (erro) {
        console.error("Erro ao excluir transação:", erro);
    }
}

async function editarTransacaoAPI(id, dados) {
    try {
        await requisicao(`${API_URL}/transacoes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
    } catch (erro) {
        console.error("Erro ao editar transação:", erro);
    }
}

// ======================================================
// REGRAS DE NEGÓCIO E INTERAÇÕES (Event Listeners)
// ======================================================

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const descricao = descricaoInput.value.trim();
    const valor = Number(valorInput.value);
    const tipo = tipoInput.value;
    const categoria = categoriaInput.value;
    const data = new Date().toLocaleDateString("pt-BR");

    if (descricao === "" || valor <= 0) {
        alert("Preencha os campos corretamente.");
        return;
    }

    const novaTransacao = {
        descricao,
        valor,
        tipo,
        categoria,
        data
    };

    await adicionarTransacaoAPI(novaTransacao);
    await buscarTransacoes();
    form.reset();
});

// ======================================================
// RENDERIZAR TRANSAÇÕES
// ======================================================
function renderizarTransacoes() {
    listaTransacoes.innerHTML = "";

    transacoes.forEach((transacao) => {
        const div = document.createElement("div");
        div.classList.add("transacao", transacao.tipo);

        div.innerHTML = `
            <div>
                <h3>${transacao.descricao}</h3>
                <p>R$ ${Number(transacao.valor).toFixed(2)}</p>
                <small>${transacao.categoria}</small>
                <br>
                <small>${transacao.data}</small>
            </div>
            <div class="acoes-transacao">
                <span>
                    ${transacao.tipo === "entrada" ? "🟢 Entrada" : "🔴 Saída"}
                </span>
                <button onclick="editarTransacao(${transacao.id})">✏️ Editar</button>
                <button onclick="excluirTransacao(${transacao.id})">🗑️ Excluir</button>
            </div>
        `;
        listaTransacoes.appendChild(div);
    });
}

// ======================================================
// EXCLUIR & EDITAR TRANSAÇÃO (Ações do Usuário)
// ======================================================
async function excluirTransacao(id) {
    if (confirm("Deseja realmente excluir esta transação?")) {
        await excluirTransacaoAPI(id);
        await buscarTransacoes();
    }
}

async function editarTransacao(id) {
    const transacao = transacoes.find(t => t.id === id);
    if (!transacao) return;

    const descricao = prompt("Descrição:", transacao.descricao);
    if (descricao === null) return;

    const valor = prompt("Valor:", transacao.valor);
    if (valor === null) return;

    const dados = {
        descricao,
        valor: Number(valor),
        tipo: transacao.tipo,
        categoria: transacao.categoria,
        data: transacao.data
    };

    await editarTransacaoAPI(id, dados);
    await buscarTransacoes();
}

// Expõe as funções para uso no HTML dinâmico
window.editarTransacao = editarTransacao;
window.excluirTransacao = excluirTransacao;

// ======================================================
// RESUMO FINANCEIRO & GRÁFICO
// ======================================================
function atualizarResumo() {
    const receitas = transacoes
        .filter(t => t.tipo === "entrada")
        .reduce((acc, t) => acc + Number(t.valor), 0);

    const despesas = transacoes
        .filter(t => t.tipo === "saida")
        .reduce((acc, t) => acc + Number(t.valor), 0);

    const saldo = receitas - despesas;

    totalReceitas.textContent = `R$ ${receitas.toFixed(2)}`;
    totalDespesas.textContent = `R$ ${despesas.toFixed(2)}`;
    saldoTotal.textContent = `R$ ${saldo.toFixed(2)}`;

    atualizarGrafico(receitas, despesas);
}

function atualizarGrafico(receitas, despesas) {
    const ctx = document.getElementById("grafico-financeiro");
    if (!ctx) return; // Evita quebra se o canvas não existir no HTML atual

    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Entradas", "Saídas"],
            datasets: [{
                data: [receitas, despesas],
                backgroundColor: ["#16a34a", "#dc2626"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// ======================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ======================================================
buscarTransacoes();