const API_URL = "http://localhost:3000";

// ===========================
// BUSCAR TRANSAÇÕES
// ===========================

export async function buscarTransacoes() {

    const resposta = await fetch(`${API_URL}/transacoes`);

    return await resposta.json();

}

// ===========================
// ADICIONAR
// ===========================

export async function adicionarTransacao(transacao) {

    await fetch(`${API_URL}/transacoes`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(transacao)

    });

}

// ===========================
// EXCLUIR
// ===========================

export async function excluirTransacao(id) {

    await fetch(`${API_URL}/transacoes/${id}`, {

        method: "DELETE"

    });

}