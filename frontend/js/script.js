// ======================================================
// SMARTCASH
// Desenvolvido por Lucas de Goes
// ======================================================

// ======================================================
// CONFIGURAÇÃO DA API
// ======================================================

const API_URL = "http://localhost:3000";

const categoriaInput =
document.getElementById("categoria");

// ======================================================
// DADOS DA APLICAÇÃO
// ======================================================

let transacoes = [];
let metas = [];

let grafico = null;

// ======================================================
// ELEMENTOS DO DOM
// ======================================================

// Formulário
const form = document.getElementById("form-transacao");

const descricaoInput =
document.getElementById("descricao");

const valorInput =
document.getElementById("valor");

const tipoInput =
document.getElementById("tipo");

// Lista

const listaTransacoes =
document.getElementById("lista-transacoes");

// Resumo

const totalReceitas =
document.getElementById("total-receitas");

const totalDespesas =
document.getElementById("total-despesas");

const saldoTotal =
document.getElementById("saldo-total");

// Metas

const nomeMeta =
document.getElementById("nome-meta");

const objetivoMeta =
document.getElementById("objetivo-meta");

const btnCriarMeta =
document.getElementById("btn-criar-meta");

const listaMetas =
document.getElementById("lista-metas");

// Limpar

const btnLimpar =
document.getElementById("btn-limpar");

// ======================================================
// API
// ======================================================

async function buscarTransacoes() {

    try {

        const resposta =
        await fetch(`${API_URL}/transacoes`);

        transacoes =
        await resposta.json();

        renderizarTransacoes();

        atualizarResumo();

    }

    catch (erro) {

        console.error("Erro:", erro);

    }

}

// ------------------------------------------------------

async function adicionarTransacaoAPI(transacao){

    try{

        await fetch(`${API_URL}/transacoes`,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(transacao)

        });

    }

    catch(erro){

        console.error(erro);

    }

}

// ------------------------------------------------------

async function excluirTransacaoAPI(id){

    try{

        await fetch(`${API_URL}/transacoes/${id}`,{

            method:"DELETE"

        });

    }

    catch(erro){

        console.error(erro);

    }

}

// ======================================================
// NOVA TRANSAÇÃO
// ======================================================

form.addEventListener("submit", async (event)=>{

    event.preventDefault();

    const descricao =
    descricaoInput.value.trim();

    const valor =
    Number(valorInput.value);

    const tipo =
    tipoInput.value;

    const categoria =
    categoriaInput.value;

    const data =
    new Date().toLocaleDateString("pt-BR");

    if(descricao==="" || valor<=0){

        alert("Preencha corretamente.");

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

        div.classList.add("transacao");
        div.classList.add(transacao.tipo);

        div.innerHTML = `
            <div>
                <h3>${transacao.descricao}</h3>
                    <p>

                    R$ ${Number(transacao.valor).toFixed(2)}

                    </p>

                    <small>

                    ${transacao.categoria}

                    </small>

                    <br>

                    <small>

                    ${transacao.data}

                    </small>            </div>

            <div class="acoes-transacao">

                <span>
                    ${transacao.tipo === "entrada"
                        ? "🟢 Entrada"
                        : "🔴 Saída"}
                </span>
                    
                <button onclick="editarTransacao(${transacao.id})">

                ✏️ Editar

                </button>
                <button onclick="excluirTransacao(${transacao.id})">
                    Excluir
                </button>

            </div>
        `;

        listaTransacoes.appendChild(div);

    });

}

// ======================================================
// EXCLUIR TRANSAÇÃO
// ======================================================

async function excluirTransacao(id){

    await excluirTransacaoAPI(id);

    await buscarTransacoes();

}

// ======================================================
// RESUMO FINANCEIRO
// ======================================================

function atualizarResumo(){

    const receitas = transacoes

        .filter(t => t.tipo === "entrada")

        .reduce((acc,t)=> acc + Number(t.valor),0);

    const despesas = transacoes

        .filter(t => t.tipo === "saida")

        .reduce((acc,t)=> acc + Number(t.valor),0);

    const saldo = receitas - despesas;

    totalReceitas.textContent =
        `R$ ${receitas.toFixed(2)}`;

    totalDespesas.textContent =
        `R$ ${despesas.toFixed(2)}`;

    saldoTotal.textContent =
        `R$ ${saldo.toFixed(2)}`;

    atualizarGrafico(receitas,despesas);

}

// ======================================================
// GRÁFICO
// ======================================================

function atualizarGrafico(receitas,despesas){

    const ctx =
    document.getElementById("grafico-financeiro");

    if(grafico){

        grafico.destroy();

    }

    grafico = new Chart(ctx,{

        type:"doughnut",

        data:{

            labels:["Entradas","Saídas"],

            datasets:[{

                data:[receitas,despesas],

                backgroundColor:[

                    "#16a34a",
                    "#dc2626"

                ]

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false

        }

    });

}

// ======================================================
// INICIAR
// ======================================================

buscarTransacoes();

async function editarTransacaoAPI(id, dados){

    await fetch(`${API_URL}/transacoes/${id}`,{

        method:"PUT",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(dados)

    });

}

async function editarTransacao(id){

    const transacao =
    transacoes.find(t => t.id === id);

    const descricao =
    prompt("Descrição:", transacao.descricao);

    if(descricao===null) return;

    const valor =
    prompt("Valor:", transacao.valor);

    if(valor===null) return;

    const dados={

        descricao,

        valor:Number(valor),

        tipo:transacao.tipo,

        categoria:transacao.categoria,

        data:transacao.data

    };

    await editarTransacaoAPI(id,dados);

    await buscarTransacoes();

}

// Disponibiliza para os botões HTML
window.editarTransacao = editarTransacao;
window.excluirTransacao = excluirTransacao;