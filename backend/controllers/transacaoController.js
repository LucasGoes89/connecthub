const transacoes = require("../data/transacoes");

// ==============================
// LISTAR TRANSAÇÕES
// ==============================

function listarTransacoes(req, res) {

    res.json(transacoes);

}

// ==============================
// ADICIONAR TRANSAÇÃO
// ==============================

function adicionarTransacao(req, res) {

    const { descricao, valor, tipo } = req.body;

    if (!descricao || !valor || !tipo) {

        return res.status(400).json({

            erro: "Dados inválidos."

        });

    }

    const novaTransacao = {

        id: Date.now(),

        descricao,

        valor,

        tipo

    };

    transacoes.push(novaTransacao);

    res.status(201).json(novaTransacao);

}

// ==============================
// EXCLUIR TRANSAÇÃO
// ==============================

function excluirTransacao(req, res) {

    const id = Number(req.params.id);

    const indice = transacoes.findIndex(

        transacao => transacao.id === id

    );

    if (indice === -1) {

        return res.status(404).json({

            erro: "Transação não encontrada."

        });

    }

    transacoes.splice(indice, 1);

    res.json({

        mensagem: "Transação removida."

    });

}

module.exports = {

    listarTransacoes,

    adicionarTransacao,

    excluirTransacao

};